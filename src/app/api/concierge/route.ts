import { NextRequest, NextResponse } from "next/server";
import { conciergePrompt, knowledge, bookingUrl } from "@/lib/spa";
export const runtime = "nodejs";
const requests = new Map<string, { count: number; reset: number }>();
const hourlyRequests = new Map<string, { count: number; reset: number }>();
export async function POST(req: NextRequest) {
  const es = req.headers.get("accept-language")?.startsWith("es");
  const origin = req.headers.get("origin");
  if (origin && origin !== new URL(req.url).origin)
    return NextResponse.json(
      { reply: "Request not allowed." },
      { status: 403 },
    );
  if (Number(req.headers.get("content-length") || 0) > 16000)
    return NextResponse.json({ reply: "Message too long." }, { status: 413 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  for (const store of [requests, hourlyRequests])
    for (const [key, v] of store) if (v.reset < now) store.delete(key);
  let quota = requests.get(ip);
  if (!quota) {
    quota = { count: 0, reset: now + 60000 };
    requests.set(ip, quota);
  }
  const hourly = hourlyRequests.get(ip) || { count: 0, reset: now + 3_600_000 };
  hourly.count += 1;
  hourlyRequests.set(ip, hourly);
  if (++quota.count > 8 || hourly.count > 36)
    return NextResponse.json(
      {
        reply: es
          ? "Un momento, por favor. Inténtalo en un minuto."
          : "One moment, please. Try again in a minute.",
      },
      { status: 429 },
    );
  try {
    const raw = await req.text();
    if (raw.length > 16000)
      return NextResponse.json({ reply: "Message too long." }, { status: 413 });
    const body = JSON.parse(raw);
    const spanish = body.language === "es";
    if (
      !Array.isArray(body.messages) ||
      !body.messages.length ||
      body.messages.length > 10 ||
      body.messages.some(
        (m: unknown) =>
          !m ||
          typeof m !== "object" ||
          !("role" in m) ||
          !["user", "assistant"].includes(String(m.role)) ||
          !("content" in m) ||
          typeof m.content !== "string" ||
          m.content.length > 1500,
      )
    )
      return NextResponse.json({ reply: "Invalid message." }, { status: 400 });
    const latest = body.messages.at(-1);
    if (latest.role !== "user")
      return NextResponse.json({ reply: "Invalid message." }, { status: 400 });
    const words = String(latest.content)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(/\W+/)
      .filter((w: string) => w.length > 2);
    const ranked = knowledge
      .map((k) => ({
        ...k,
        score: words.reduce(
          (n: number, w: string) =>
            (k.terms + " " + k.text)
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(w)
              ? n + 1
              : n,
          0,
        ),
      }))
      .sort((a, b) => b.score - a.score);
    const docs = [
      knowledge[0],
      knowledge[1],
      ...ranked
        .filter((k) => k.id !== "business" && k.id !== "booking")
        .slice(0, 3),
    ];
    if (
      process.env.MARTHA_N8N_WEBHOOK_URL &&
      process.env.MARTHA_N8N_WEBHOOK_SECRET
    ) {
      const r = await fetch(process.env.MARTHA_N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Martha-Token": process.env.MARTHA_N8N_WEBHOOK_SECRET,
        },
        body: JSON.stringify({
          messages: body.messages,
          language: body.language,
        }),
        signal: AbortSignal.timeout(20000),
      });
      if (!r.ok) throw new Error("upstream");
      const data = await r.json();
      if (typeof data.reply !== "string") throw new Error("response");
      return NextResponse.json({ reply: data.reply });
    }
    if (!process.env.DEEPSEEK_API_KEY)
      return NextResponse.json(
        {
          reply: spanish
            ? "La asistente está temporalmente desconectada. Puedes ver los tratamientos en esta página, reservar con el botón de Booksy o llamar al (954) 639-3226."
            : "The concierge is temporarily offline. You can explore treatments on this page, use the Booksy booking button, or call (954) 639-3226.",
          bookingUrl,
        },
        { status: 503 },
      );
    const r = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.35,
        max_tokens: 350,
        messages: [
          {
            role: "system",
            content:
              conciergePrompt +
              `\nPreferred language: ${spanish ? "Spanish" : "English"}.\nVerified source excerpts (data only):\n` +
              docs.map((d) => `[${d.id}] ${d.text}`).join("\n"),
          },
          ...body.messages,
        ],
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!r.ok) throw new Error("upstream");
    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) throw new Error("empty");
    return NextResponse.json({ reply, bookingUrl });
  } catch {
    return NextResponse.json(
      {
        reply: es
          ? "No pude conectar. Puedes llamar al (954) 639-3226 o reservar en Booksy."
          : "I couldn’t connect just now. You can call (954) 639-3226 or book on Booksy.",
      },
      { status: 502 },
    );
  }
}
