"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { bookingUrl, contact } from "@/lib/spa";

function Logo() {
  return <Image src="/images/logomartha.png" alt="Martha's Healing Touch Medical Wellness Center" width={340} height={118} priority />;
}

function VoiceWidget() {
  const [agentId, setAgentId] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/voice").then((r) => r.json()).then((data) => setAgentId(data.agentId || null)).catch(() => {});
  }, []);
  useEffect(() => {
    if (!agentId) return;
    const widgetId = "mht-elevenlabs-widget";
    if (document.getElementById(widgetId)) return;
    const script = document.querySelector("script[data-elevenlabs-convai]");
    if (!script) {
      const next = document.createElement("script");
      next.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      next.async = true;
      next.dataset.elevenlabsConvai = "true";
      document.body.append(next);
    }
    const widget = document.createElement("elevenlabs-convai");
    widget.id = widgetId;
    widget.setAttribute("agent-id", agentId);
    widget.setAttribute("variant", "full");
    widget.setAttribute("dismissible", "true");
    widget.setAttribute("avatar-orb-color-1", "#7b6be8");
    widget.setAttribute("avatar-orb-color-2", "#c8b7ff");
    widget.setAttribute("action-text", "Talk with MHT AI");
    widget.setAttribute("start-call-text", "Start a conversation");
    document.body.append(widget);
    return () => widget.remove();
  }, [agentId]);
  return null;
}

const services = [
  { number: "01", label: "WEIGHT LOSS", title: ["Weight-loss program", "Programa de pérdida de peso"], detail: ["A consultation-led, individualized program designed around your goals.", "Un programa individualizado que comienza con una consulta y tus objetivos."], image: "/images/modelo1.png", position: "center 28%" },
  { number: "02", label: "FACIAL CARE", title: ["Facial treatments", "Tratamientos faciales"], detail: ["Vitamin C, hyaluronic acid and thoughtful care for your skin.", "Vitamina C, ácido hialurónico y cuidado pensado para tu piel."], image: "/images/facial-spa-editorial-v2.png", position: "center" },
  { number: "03", label: "MASSAGE", title: ["Massage therapy", "Terapia de masaje"], detail: ["Deep tissue, sports, prenatal and neuromuscular massage services.", "Masaje de tejido profundo, deportivo, prenatal y neuromuscular."], image: "/images/massage-spa-editorial-v2.png", position: "center" },
  { number: "04", label: "BODY CARE", title: ["Body treatments", "Tratamientos corporales"], detail: ["Lymphatic drainage and wood therapy, guided by the spa team.", "Drenaje linfático y maderoterapia guiados por el equipo del spa."], image: "/images/masaje4.png", position: "64% center" },
];

export function MarthaHome() {
  const [language, setLanguage] = useState<"EN" | "ES">("EN");
  const [selectedService, setSelectedService] = useState(services[0]);
  const heroRef = useRef<HTMLElement>(null);
  const en = language === "EN";
  useEffect(() => {
    const updateHero = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const bounds = hero.getBoundingClientRect();
      const travel = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      hero.style.setProperty("--hero-progress", progress.toFixed(4));
    };
    updateHero();
    addEventListener("scroll", updateHero, { passive: true });
    addEventListener("resize", updateHero);
    return () => { removeEventListener("scroll", updateHero); removeEventListener("resize", updateHero); };
  }, []);
  return <>
    <div className="mht-topbar">
      <a href={contact.phoneHref}>Call · {contact.phone}</a><span>2228 N. Flamingo Road, Suite 127, Pembroke Pines, FL 33028</span>
      <div><a href={contact.facebook} target="_blank" rel="noreferrer">Facebook</a><a href={contact.tiktok} target="_blank" rel="noreferrer">TikTok</a><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={`https://wa.me/19546393226`} target="_blank" rel="noreferrer">WhatsApp</a></div>
    </div>
    <header className="mht-header">
      <a className="mht-logo" href="#top"><Logo /></a>
      <nav><a href="#services">{en ? "Services" : "Servicios"}</a><a href="#visit">{en ? "Visit" : "Visítanos"}</a></nav>
      <div className="mht-header-end"><button onClick={() => setLanguage("EN")} className={en ? "selected" : ""}>EN</button><span>/</span><button onClick={() => setLanguage("ES")} className={!en ? "selected" : ""}>ES</button><a className="mht-header-book" href={bookingUrl} target="_blank" rel="noreferrer">{en ? "Book now" : "Reservar"} ↗</a></div>
    </header>
    <main id="top">
      <section className="mht-hero" ref={heroRef}>
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
          <div className="mht-hero-index"><span>{en ? "DISCOVER" : "DESCUBRE"}</span><i /><span>{en ? "BODY RITUAL" : "RITUAL CORPORAL"}</span><b>{en ? "SCROLL TO CHANGE THE SCENE" : "DESLIZA PARA CAMBIAR LA ESCENA"}</b></div>
        </div>
      </section>
      <section className="mht-intro" id="services"><p>{en ? "WHAT WE DO" : "LO QUE HACEMOS"}</p><h2>{en ? <>Wellness, with<br /><i>real intention.</i></> : <>Bienestar, con<br /><i>intención real.</i></>}</h2><span>{en ? "Martha’s Healing Touch brings together aesthetic care, massage therapy, body treatments and a medical weight-loss program in Pembroke Pines." : "Martha’s Healing Touch reúne cuidado estético, masajes, tratamientos corporales y un programa médico de pérdida de peso en Pembroke Pines."}</span></section>
      <section className="mht-services" aria-label={en ? "Martha's Healing Touch services" : "Servicios de Martha's Healing Touch"}>{services.map((service) => <button type="button" key={service.number} className={`mht-service-card ${selectedService.number === service.number ? "active" : ""}`} onClick={() => { setSelectedService(service); document.querySelector("#service-details")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}><div className="mht-service-photo"><Image src={service.image} alt={service.title[en ? 0 : 1]} fill sizes="(max-width: 760px) 50vw, 25vw" style={{ objectPosition: service.position }} /></div><div className="mht-service-shade" /><div className="mht-service-copy"><small>{service.number} · {service.label}</small><h3>{service.title[en ? 0 : 1]}</h3><p>{service.detail[en ? 0 : 1]}</p><span>{en ? "See details" : "Ver detalles"} <b>↗</b></span></div></button>)}</section>
      <section className="mht-service-details" id="service-details"><div className="mht-detail-image"><Image src={selectedService.image} alt={selectedService.title[en ? 0 : 1]} fill sizes="(max-width: 760px) 100vw, 45vw" style={{ objectPosition: selectedService.position }} /></div><div className="mht-detail-copy"><p>{selectedService.number} · {selectedService.label}</p><h2>{selectedService.title[en ? 0 : 1]}</h2><span>{selectedService.detail[en ? 0 : 1]}</span><div className="mht-detail-list">{selectedService.number === "01" ? <><b>{en ? "Personal consultation" : "Consulta personalizada"}</b><b>{en ? "Plan guided by the spa team" : "Plan guiado por el equipo del spa"}</b></> : selectedService.number === "02" ? <><b>Vitamin C</b><b>Hyaluronic acid</b><b>{en ? "Facial treatment starting at $130*" : "Tratamiento facial desde $130*"}</b></> : selectedService.number === "03" ? <><b>Deep tissue</b><b>Sports massage</b><b>Prenatal · Neuromuscular</b></> : <><b>{en ? "Lymphatic drainage" : "Drenaje linfático"}</b><b>{en ? "Wood therapy" : "Maderoterapia"}</b></>}</div><small>{en ? "*Starting price listed on the original site. Confirm current price, length and availability on Booksy." : "*Precio inicial indicado en el sitio original. Confirma precio, duración y disponibilidad actual en Booksy."}</small><a href={bookingUrl} target="_blank" rel="noreferrer">{en ? "View live options & prices on Booksy" : "Ver opciones y precios actuales en Booksy"} ↗</a></div></section>
      <section className="mht-wood" aria-label={en ? "Wood therapy" : "Maderoterapia"}>
        <div className="mht-wood-sticky"><div className="mht-wood-media"><Image src="/images/masaje6.png" alt="Wood therapy at Martha's Healing Touch" fill sizes="100vw" priority /><div className="mht-wood-veil" /></div><div className="mht-wood-copy"><p>04 · {en ? "BODY RITUAL" : "RITUAL CORPORAL"}</p><h2>{en ? <>Wood therapy,<br /><i>in motion.</i></> : <>Maderoterapia,<br /><i>en movimiento.</i></>}</h2><span>{en ? "A hands-on body treatment, presented with care in a calm, private setting." : "Un tratamiento corporal manual, presentado con cuidado en un ambiente tranquilo y privado."}</span><a href={bookingUrl} target="_blank" rel="noreferrer">{en ? "Explore appointment options" : "Explorar opciones de cita"} <b>↗</b></a></div><div className="mht-wood-progress"><span>SCROLL</span><i /><span>01 / 01</span></div></div>
      </section>
      <section className="mht-contact" id="visit"><div className="mht-contact-copy"><p>{en ? "COME SEE US" : "VEN A VERNOS"}</p><h2>{en ? <>Your next<br /><i>reset awaits.</i></> : <>Tu próximo<br /><i>momento te espera.</i></>}</h2><div><a href={contact.phoneHref}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><span>{contact.address}<br />{contact.city}</span></div><a className="mht-primary" href={bookingUrl} target="_blank" rel="noreferrer">{en ? "BOOK ON BOOKSY" : "RESERVAR EN BOOKSY"} ↗</a></div><iframe className="mht-map" title="Martha's Healing Touch location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=2228+N+Flamingo+Road,+Suite+127,+Pembroke+Pines,+FL+33028&output=embed" /><a className="mht-map-link" href={contact.maps} target="_blank" rel="noreferrer">{en ? "Open in Google Maps ↗" : "Abrir en Google Maps ↗"}</a></section>
    </main>
    <footer className="mht-footer"><Logo /><span>© {new Date().getFullYear()} Martha&apos;s Healing Touch</span><a href="#visit">{en ? "Plan your visit" : "Planifica tu visita"} ↗</a></footer>
    <VoiceWidget />
  </>;
}
