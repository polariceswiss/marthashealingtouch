import { NextRequest, NextResponse } from "next/server";
import { contact } from "@/lib/spa";

export const runtime = "nodejs";
const requests = new Map<string, { count: number; reset: number }>();

function limited(ip: string) {
  const now = Date.now();
  for (const [key, value] of requests) if (value.reset < now) requests.delete(key);
  const value = requests.get(ip) || { count: 0, reset: now + 10 * 60_000 };
  value.count += 1;
  requests.set(ip, value);
  return value.count > 4;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ error: "Please wait a few minutes before another request." }, { status: 429 });
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim().replace(/\s+/g, " ") : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const interest = typeof body.interest === "string" ? body.interest.trim().replace(/\s+/g, " ") : "";
    const language = body.language === "es" ? "es" : "en";
    if (!body.confirmed || name.length < 2 || name.length > 80 || !/^[+()\s\d-]{7,22}$/.test(phone) || interest.length > 220) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const ownerPhone = (process.env.MARTHA_WHATSAPP_OWNER_PHONE || contact.phoneHref.replace("tel:+", "")).replace(/\D/g, "");
    const subject = interest || (language === "es" ? "una cita o consulta" : "an appointment or consultation");
    const message = language === "es"
      ? `Hola Martha's Healing Touch, soy ${name}. Me interesa ${subject}. Mi mejor número para devolver la llamada es ${phone}. Confirmé que estos datos están correctos.`
      : `Hello Martha's Healing Touch, I’m ${name}. I’m interested in ${subject}. My best call-back number is ${phone}. I confirmed these details are correct.`;
    const whatsAppUrl = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
    if (process.env.MARTHA_N8N_LEAD_WEBHOOK_URL && process.env.MARTHA_N8N_LEAD_WEBHOOK_SECRET) {
      await fetch(process.env.MARTHA_N8N_LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Martha-Token": process.env.MARTHA_N8N_LEAD_WEBHOOK_SECRET },
        body: JSON.stringify({ name, phone, interest: interest || null, language, confirmed: true, source: "website" }),
        signal: AbortSignal.timeout(8000),
      });
    }
    return NextResponse.json({ whatsAppUrl });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
