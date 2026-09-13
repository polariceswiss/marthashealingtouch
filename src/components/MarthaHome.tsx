"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { bookingUrl, contact } from "@/lib/spa";

function Logo() {
  return <Image src="/images/logomartha.png" alt="Martha's Healing Touch Medical Wellness Center" width={340} height={118} priority />;
}

function VoiceWidget() {
  const [agentId, setAgentId] = useState<string | null>(null);
  const widgetHost = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetch("/api/voice").then((r) => r.json()).then((data) => setAgentId(data.agentId || null)).catch(() => {});
  }, []);
  if (!agentId) return null;
  const openVoice = () => widgetHost.current?.querySelector("elevenlabs-convai")?.shadowRoot?.querySelector<HTMLButtonElement>('button[aria-label^="Talk"]')?.click();
  return <><button className="mht-orb" aria-label="Talk with Martha's Healing Touch AI" onClick={openVoice}><span /><i>Talk with MHT AI</i></button><div className="mht-voice" aria-label="Martha's Healing Touch AI" ref={widgetHost}><div ref={(node) => {
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
  }} /></div></>;
}

const services = [
  { number: "01", label: "WEIGHT LOSS", title: ["Weight-loss program", "Programa de pérdida de peso"], detail: ["A consultation-led, individualized program designed around your goals.", "Un programa individualizado que comienza con una consulta y tus objetivos."], image: "/images/modelo1.png", position: "center 28%" },
  { number: "02", label: "FACIAL CARE", title: ["Facial treatments", "Tratamientos faciales"], detail: ["Vitamin C, hyaluronic acid and thoughtful care for your skin.", "Vitamina C, ácido hialurónico y cuidado pensado para tu piel."], image: "/images/facial-spa-editorial-v2.png", position: "center" },
  { number: "03", label: "MASSAGE", title: ["Massage therapy", "Terapia de masaje"], detail: ["Deep tissue, sports, prenatal and neuromuscular massage services.", "Masaje de tejido profundo, deportivo, prenatal y neuromuscular."], image: "/images/massage-spa-editorial-v2.png", position: "center" },
  { number: "04", label: "BODY CARE", title: ["Body treatments", "Tratamientos corporales"], detail: ["Lymphatic drainage and wood therapy, guided by the spa team.", "Drenaje linfático y maderoterapia guiados por el equipo del spa."], image: "/images/masaje4.png", position: "64% center" },
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
          <div className="mht-hero-scene mht-hero-scene-one"><Image src="/images/masaje2.png" alt="Personalized body treatment at Martha's Healing Touch" fill priority sizes="100vw" /></div>
          <div className="mht-hero-scene mht-hero-scene-two"><Image src="/images/masaje6.png" alt="Wood therapy in progress at Martha's Healing Touch" fill priority sizes="100vw" /></div>
          <div className="mht-hero-wash" />
          <div className="mht-hero-copy mht-copy-one">
            <p>{en ? "MARTHA'S HEALING TOUCH" : "MARTHA'S HEALING TOUCH"}</p><h1>{en ? <>Wellness,<br /><i>in your rhythm.</i></> : <>Bienestar,<br /><i>a tu ritmo.</i></>}</h1>
            <span>{en ? "A considered space for body treatments, facial care, massage and personalized weight-loss support." : "Un espacio pensado para tratamientos corporales, cuidado facial, masajes y apoyo personalizado de peso."}</span>
            <a href={bookingUrl} target="_blank" rel="noreferrer">{en ? "MAKE AN APPOINTMENT" : "RESERVAR UNA CITA"} <b>↗</b></a>
          </div>
          <div className="mht-hero-copy mht-copy-two">
            <p>{en ? "THE BODY RITUAL" : "EL RITUAL CORPORAL"}</p><h2>{en ? <>Expert touch.<br /><i>Quiet confidence.</i></> : <>Manos expertas.<br /><i>Confianza serena.</i></>}</h2>
            <span>{en ? "Explore lymphatic drainage, wood therapy and massage in a calm, private setting." : "Explora drenaje linfático, maderoterapia y masaje en un ambiente tranquilo y privado."}</span>
          </div>
          <div className="mht-hero-index"><span>01</span><i /><span>02</span><b>{en ? "SCROLL TO EXPLORE" : "DESLIZA PARA EXPLORAR"}</b></div>
        </div>
      </section>
      <section className="mht-intro" id="services"><p>{en ? "WHAT WE DO" : "LO QUE HACEMOS"}</p><h2>{en ? <>Wellness, with<br /><i>real intention.</i></> : <>Bienestar, con<br /><i>intención real.</i></>}</h2><span>{en ? "Martha’s Healing Touch brings together aesthetic care, massage therapy, body treatments and a medical weight-loss program in Pembroke Pines." : "Martha’s Healing Touch reúne cuidado estético, masajes, tratamientos corporales y un programa médico de pérdida de peso en Pembroke Pines."}</span></section>
      <section className="mht-services" aria-label={en ? "Martha's Healing Touch services" : "Servicios de Martha's Healing Touch"}>{services.map((service) => <article key={service.number} className="mht-service-card"><div className="mht-service-photo"><Image src={service.image} alt={service.title[en ? 0 : 1]} fill sizes="(max-width: 760px) 50vw, 25vw" style={{ objectPosition: service.position }} /></div><div className="mht-service-shade" /><div className="mht-service-copy"><small>{service.number} · {service.label}</small><h3>{service.title[en ? 0 : 1]}</h3><p>{service.detail[en ? 0 : 1]}</p><a href={bookingUrl} target="_blank" rel="noreferrer">{en ? "Book with Booksy" : "Reservar en Booksy"} <b>↗</b></a></div></article>)}</section>
      <section className="mht-wood" aria-label={en ? "Wood therapy" : "Maderoterapia"}>
        <div className="mht-wood-sticky"><div className="mht-wood-media"><Image src="/images/masaje6.png" alt="Wood therapy at Martha's Healing Touch" fill sizes="100vw" priority /><div className="mht-wood-veil" /></div><div className="mht-wood-copy"><p>04 · {en ? "BODY RITUAL" : "RITUAL CORPORAL"}</p><h2>{en ? <>Wood therapy,<br /><i>in motion.</i></> : <>Maderoterapia,<br /><i>en movimiento.</i></>}</h2><span>{en ? "A hands-on body treatment, presented with care in a calm, private setting." : "Un tratamiento corporal manual, presentado con cuidado en un ambiente tranquilo y privado."}</span><a href={bookingUrl} target="_blank" rel="noreferrer">{en ? "Explore appointment options" : "Explorar opciones de cita"} <b>↗</b></a></div><div className="mht-wood-progress"><span>SCROLL</span><i /><span>01 / 01</span></div></div>
      </section>
      <section className="mht-contact" id="contact"><p>{en ? "COME SEE US" : "VEN A VERNOS"}</p><h2>{en ? <>Your next<br /><i>reset awaits.</i></> : <>Tu próximo<br /><i>momento te espera.</i></>}</h2><div><a href={contact.phoneHref}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><span>{contact.address}<br />{contact.city}</span></div><a className="mht-primary" href={bookingUrl} target="_blank" rel="noreferrer">{en ? "BOOK ON BOOKSY" : "RESERVAR EN BOOKSY"} ↗</a></section>
    </main>
    <footer className="mht-footer"><Logo /><span>© {new Date().getFullYear()} Martha&apos;s Healing Touch</span><a href={bookingUrl} target="_blank" rel="noreferrer">Make an appointment ↗</a></footer>
    <VoiceWidget />
  </>;
}
