"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ScrollFilm } from "@/components/ScrollFilm";
import { bookingUrl, contact } from "@/lib/spa";

function Logo() {
  return <Image src="/images/logo-original.png" alt="Martha's Healing Touch Medical Wellness Center" width={330} height={111} priority />;
}

function VoiceWidget() {
  const [agentId, setAgentId] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/voice").then((r) => r.json()).then((data) => setAgentId(data.agentId || null)).catch(() => {});
  }, []);
  if (!agentId) return null;
  return <div className="mht-voice" aria-label="Martha's Healing Touch AI"><div ref={(node) => {
    if (!node || node.firstChild) return;
    const script = document.querySelector("script[data-elevenlabs-convai]");
    if (!script) {
      const next = document.createElement("script");
      next.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      next.async = true;
      next.dataset.elevenlabsConvai = "true";
      document.body.append(next);
    }
    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", agentId);
    node.append(widget);
  }} /></div>;
}

const services = [
  ["01", "Weight-loss program", "A consultation-led, individualized program with a medical practitioner.", "WEIGHT LOSS"],
  ["02", "Facial treatments", "Vitamin C, hyaluronic acid and thoughtful care for your skin.", "FACIAL CARE"],
  ["03", "Massage therapy", "Deep tissue, sports, prenatal and neuromuscular massage services.", "MASSAGE"],
  ["04", "Body treatments", "Lymphatic drainage and wood therapy, guided by the spa team.", "BODY CARE"],
];

export function MarthaHome() {
  const [language, setLanguage] = useState<"EN" | "ES">("EN");
  const en = language === "EN";
  return <>
    <div className="mht-topbar">
      <a href={contact.phoneHref}>Call · {contact.phone}</a><span>2228 N. Flamingo Road, Suite 127, Pembroke Pines, FL 33028</span>
      <div><a href={contact.facebook} target="_blank" rel="noreferrer">Facebook</a><a href={contact.tiktok} target="_blank" rel="noreferrer">TikTok</a><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={`https://wa.me/19546393226`} target="_blank" rel="noreferrer">WhatsApp</a></div>
    </div>
    <header className="mht-header">
      <a className="mht-logo" href="#top"><Logo /></a>
      <nav><a href="#services">Services</a><a href={bookingUrl} target="_blank" rel="noreferrer">Bookings</a><a href="#contact">Contact</a></nav>
      <div className="mht-header-end"><button onClick={() => setLanguage("EN")} className={en ? "selected" : ""}>🇺🇸 EN</button><span>/</span><button onClick={() => setLanguage("ES")} className={!en ? "selected" : ""}>🇪🇸 ES</button><a className="mht-search" href="#services" aria-label="Explore services">⌕</a></div>
    </header>
    <main id="top">
      <section className="mht-hero">
        <div className="mht-hero-sticky">
          <Image className="mht-hero-poster" src="/images/hero-consultation-v2.png" alt="Wellness consultation at Martha's Healing Touch" fill priority sizes="100vw" />
          <ScrollFilm />
          <div className="mht-hero-wash" />
          <div className="mht-hero-copy mht-copy-one">
            <p>{en ? "WELCOME TO OUR" : "BIENVENIDA A"}</p><h1>{en ? <>Beauty <i>&amp;</i> health</> : <>Belleza <i>&amp;</i> bienestar</>}</h1>
            <span>{en ? "Care that listens first, then feels personal." : "Cuidado que primero escucha y luego se vuelve personal."}</span>
            <a href={bookingUrl} target="_blank" rel="noreferrer">{en ? "MAKE AN APPOINTMENT" : "RESERVAR UNA CITA"} <b>↗</b></a>
          </div>
          <div className="mht-hero-copy mht-copy-two">
            <p>{en ? "A CALMER WAY FORWARD" : "UNA FORMA MÁS SERENA DE AVANZAR"}</p><h2>{en ? <>Your care,<br /><i>in good hands.</i></> : <>Tu cuidado,<br /><i>en buenas manos.</i></>}</h2>
            <span>{en ? "Facial care, body treatments, massage and a personalized weight-loss program." : "Cuidado facial, tratamientos corporales, masajes y un programa de peso personalizado."}</span>
          </div>
          <div className="mht-hero-index"><span>01</span><i /><span>02</span><b>{en ? "SCROLL TO EXPLORE" : "DESLIZA PARA EXPLORAR"}</b></div>
        </div>
      </section>
      <section className="mht-intro" id="services"><p>{en ? "WHAT WE DO" : "LO QUE HACEMOS"}</p><h2>{en ? <>Wellness, with<br /><i>real intention.</i></> : <>Bienestar, con<br /><i>intención real.</i></>}</h2><span>{en ? "Martha’s Healing Touch brings together aesthetic care, massage therapy, body treatments and a medical weight-loss program in Pembroke Pines." : "Martha’s Healing Touch reúne cuidado estético, masajes, tratamientos corporales y un programa médico de pérdida de peso en Pembroke Pines."}</span></section>
      <section className="mht-services">{services.map(([number, title, detail, label]) => <article key={number}><small>{number} · {label}</small><h3>{title}</h3><p>{detail}</p><a href={bookingUrl} target="_blank" rel="noreferrer">Book with Booksy <b>↗</b></a></article>)}</section>
      <section className="mht-feature"><div><Image src="/images/hero-wood-therapy-v2.png" alt="Wood therapy preparation in a premium wellness suite" fill sizes="(max-width: 800px) 100vw, 55vw" /></div><aside><p>{en ? "YOUR TIME, YOUR WAY" : "TU TIEMPO, A TU MANERA"}</p><h2>{en ? <>A moment made<br /><i>for you.</i></> : <>Un momento hecho<br /><i>para ti.</i></>}</h2><span>{en ? "Whether you are exploring a facial, massage, lymphatic drainage, wood therapy or a weight-loss consultation, the first step is a real conversation." : "Ya sea que explores un facial, masaje, drenaje linfático, maderoterapia o una consulta de peso, el primer paso es una conversación real."}</span><a href={bookingUrl} target="_blank" rel="noreferrer">{en ? "View appointment options" : "Ver opciones de citas"} <b>↗</b></a></aside></section>
      <section className="mht-contact" id="contact"><p>{en ? "COME SEE US" : "VEN A VERNOS"}</p><h2>{en ? <>Your next<br /><i>reset awaits.</i></> : <>Tu próximo<br /><i>momento te espera.</i></>}</h2><div><a href={contact.phoneHref}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><span>{contact.address}<br />{contact.city}</span></div><a className="mht-primary" href={bookingUrl} target="_blank" rel="noreferrer">{en ? "BOOK ON BOOKSY" : "RESERVAR EN BOOKSY"} ↗</a></section>
    </main>
    <footer className="mht-footer"><Logo /><span>© {new Date().getFullYear()} Martha&apos;s Healing Touch</span><a href={bookingUrl} target="_blank" rel="noreferrer">Make an appointment ↗</a></footer>
    <VoiceWidget />
  </>;
}
