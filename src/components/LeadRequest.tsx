"use client";

import { FormEvent, useState } from "react";
import type { Language } from "@/lib/spa";

type Lead = { name: string; phone: string; interest: string };

export function LeadRequest({ lang, onClose }: { lang: Language; onClose: () => void }) {
  const [lead, setLead] = useState<Lead>({ name: "", phone: "", interest: "" });
  const [review, setReview] = useState(false);
  const [sending, setSending] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);
  const en = lang === "en";
  const update = (key: keyof Lead, value: string) => setLead((current) => ({ ...current, [key]: value }));
  const valid = lead.name.trim().length >= 2 && /^[+()\s\d-]{7,22}$/.test(lead.phone.trim());

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!valid || sending) return;
    if (!review) {
      setReview(true);
      return;
    }
    setSending(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, language: lang, confirmed: true }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok || typeof data.whatsAppUrl !== "string") throw new Error("lead");
      setWhatsAppUrl(data.whatsAppUrl);
    } catch {
      setWhatsAppUrl(null);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="lead-card" aria-live="polite">
      <div className="lead-card-head">
        <span className="lead-kicker">MHT AI</span>
        <button onClick={onClose} aria-label={en ? "Close request form" : "Cerrar formulario"}>×</button>
      </div>
      {!whatsAppUrl ? (
        <form onSubmit={submit}>
          <h3>{en ? "Let’s make the handoff easy." : "Hagamos fácil el siguiente paso."}</h3>
          <p>{en ? "Tell us how the team can reach you. You will review every detail before a WhatsApp message is prepared." : "Dinos cómo puede contactarte el equipo. Revisarás cada dato antes de preparar el mensaje de WhatsApp."}</p>
          <label>
            {en ? "Your name" : "Tu nombre"}
            <input value={lead.name} onChange={(e) => update("name", e.target.value)} maxLength={80} autoComplete="name" required />
          </label>
          <label>
            {en ? "Best call-back number" : "Mejor número para llamarte"}
            <input value={lead.phone} onChange={(e) => update("phone", e.target.value)} inputMode="tel" autoComplete="tel" maxLength={22} required />
          </label>
          <label>
            {en ? "What are you interested in?" : "¿Qué te interesa?"}
            <input value={lead.interest} onChange={(e) => update("interest", e.target.value)} maxLength={220} placeholder={en ? "For example: a facial consultation" : "Por ejemplo: una consulta facial"} />
          </label>
          {review && (
            <div className="lead-review">
              <strong>{en ? "Please check this carefully" : "Revisa esto con cuidado"}</strong>
              <span>{lead.name.trim()} · {lead.phone.trim()}</span>
              <small>{en ? "This is the spelling and number our team will see. If a B/V or any digit needs correcting, edit it now." : "Esta es la ortografía y el número que verá el equipo. Si una B/V o algún dígito necesita corrección, edítalo ahora."}</small>
            </div>
          )}
          <button className="lead-submit" disabled={!valid || sending}>
            {sending ? (en ? "Preparing…" : "Preparando…") : review ? (en ? "Yes, prepare WhatsApp" : "Sí, preparar WhatsApp") : (en ? "Review my details" : "Revisar mis datos")}
          </button>
          <small>{en ? "Submitting prepares a message in your own WhatsApp. It is sent only when you tap Send there." : "Al confirmar se prepara un mensaje en tu propio WhatsApp. Solo se envía cuando presionas Enviar allí."}</small>
        </form>
      ) : (
        <div className="lead-success">
          <h3>{en ? "Everything looks right." : "Todo se ve correcto."}</h3>
          <p>{en ? "Your message is ready for Martha’s team, with your name and call-back number included. WhatsApp will open next; tap Send there and the team can call you back." : "Tu mensaje para el equipo de Martha está listo, con tu nombre y número incluidos. Se abrirá WhatsApp; toca Enviar allí y el equipo podrá devolverte la llamada."}</p>
          <a className="lead-submit" href={whatsAppUrl} target="_blank" rel="noreferrer">{en ? "Open WhatsApp message" : "Abrir mensaje de WhatsApp"}</a>
        </div>
      )}
    </div>
  );
}
