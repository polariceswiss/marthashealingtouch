"use client";

import Image from "next/image";
import { LeadRequest } from "@/components/LeadRequest";
import { ScrollFilm } from "@/components/ScrollFilm";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { bookingUrl, contact, treatments, type Language } from "@/lib/spa";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}
function Logo({ animated = false }: { animated?: boolean }) {
  return (
    <span
      className={`brand-logo ${animated ? "brand-animated" : ""}`}
      role="img"
      aria-label="Martha's Healing Touch — Medical Wellness Center"
    >
      <span className="logo-type" />
      <span className="logo-fairy" />
    </span>
  );
}
function Intro({ lang, onDone }: { lang: Language; onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    const timer = setTimeout(onDone, reduce ? 500 : 7000);
    const interval = setInterval(
      () => setPhase((p) => Math.min(p + 1, 3)),
      1650,
    );
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = prev;
    };
  }, [onDone, reduce]);
  const lines =
    lang === "en"
      ? [
          "Warming up a little welcome.",
          "Asking your shoulders to clock out.",
          "Making room for your main-character moment.",
          "Your moment is ready.",
        ]
      : [
          "Preparando una bienvenida con cariño.",
          "Dándole el día libre a tus hombros.",
          "Guardando un momento solo para ti.",
          "Tu momento está listo.",
        ];
  return (
    <div
      className="intro"
      aria-label={
        lang === "en" ? "Welcome animation" : "Animación de bienvenida"
      }
    >
      <div className="intro-light" />
      <div className="intro-rings" />
      <div className="intro-center">
        <span className="eyebrow">A LITTLE MOMENT, JUST FOR YOU</span>
        <Logo animated />
        <div
          className="intro-copy"
          role="status"
          aria-live="polite"
          key={phase}
        >
          {lines[phase]}
        </div>
        <div className="intro-track">
          <span />
        </div>
        <span className="intro-foot">
          MARTHA’S HEALING TOUCH · PEMBROKE PINES
        </span>
      </div>
      <button className="intro-skip" onClick={onDone}>
        {lang === "en" ? "Enter the experience" : "Entrar a la experiencia"}
        <Arrow />
      </button>
    </div>
  );
}
function Concierge({ lang, onBook }: { lang: Language; onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const end = useRef<HTMLDivElement>(null);
  const [voice, setVoice] = useState(false);
  const [voiceId, setVoiceId] = useState<string | null>(null);
  const [lead, setLead] = useState(false);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [messages, busy]);
  async function send(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || busy) return;
    const next = [
      ...messages,
      { role: "user" as const, content: input.trim() },
    ];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10), language: lang }),
        signal: AbortSignal.timeout(25000),
      });
      const data = await r.json();
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            data.reply ||
            (lang === "es"
              ? "No pude conectar. Puedes llamar al spa o reservar en Booksy."
              : "I couldn't connect. You can call the spa or book on Booksy."),
        },
      ]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            lang === "es"
              ? "La conexión se tomó una pausa. Puedes reservar en Booksy o llamar al (954) 639-3226."
              : "The connection took a little pause. You can book on Booksy or call (954) 639-3226.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }
  async function startVoice() {
    const r = await fetch("/api/voice");
    const data = await r.json();
    if (data.agentId) {
      setVoiceId(data.agentId);
      setVoice(true);
      if (!document.querySelector("script[data-eleven]")) {
        const s = document.createElement("script");
        s.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
        s.async = true;
        s.dataset.eleven = "true";
        document.body.append(s);
      }
    } else
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            lang === "es"
              ? "La voz todavía no está disponible. Con gusto te ayudo por aquí."
              : "Voice is not available yet. I’m happy to help right here.",
        },
      ]);
  }
  return (
    <>
      <button
        className="concierge-launch"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="concierge"
      >
        <span className="concierge-symbol">✧</span>
        <span>{lang === "en" ? "A little guidance?" : "¿Te orientamos?"}</span>
        <span className="launch-plus">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <aside
          id="concierge"
          className="concierge-panel"
          aria-label={
            lang === "en"
              ? "AI wellness concierge"
              : "Asistente de bienestar con IA"
          }
        >
          <div className="concierge-head">
            <Logo />
            <div>
              <strong>Martha&apos;s Healing Touch AI</strong>
              <small>
                {lang === "en"
                  ? "Your AI wellness concierge"
                  : "Tu asistente de bienestar con IA"}
              </small>
            </div>
            <button
              aria-label={lang === "en" ? "Close chat" : "Cerrar chat"}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="chat-messages" aria-live="polite">
            <p className="chat-bubble assistant">
              {lang === "en"
                ? "Hello, I’m Martha’s Healing Touch AI. A little glow, a little relaxation, or a fresh start? Let’s find your kind of care."
                : "Hola, soy Martha’s Healing Touch AI. ¿Un poco de luminosidad, una pausa o un nuevo comienzo? Vamos a encontrar tu tipo de cuidado."}
            </p>
            {messages.map((m, i) => (
              <p key={i} className={`chat-bubble ${m.role}`}>
                {m.content}
              </p>
            ))}
            {busy && (
              <p className="chat-bubble assistant">
                {lang === "en" ? "One little moment…" : "Un momentito…"}
              </p>
            )}
            <div ref={end} />
          </div>
          <div className="chat-actions">
            <button onClick={onBook}>
              {lang === "en" ? "Book an appointment" : "Reservar cita"}
              <Arrow />
            </button>
            <button onClick={startVoice}>
              {lang === "en" ? "Talk to MHT AI" : "Hablar con MHT AI"}
            </button>
            <button onClick={() => setLead(true)}>
              {lang === "en" ? "Request a call" : "Pedir una llamada"}
            </button>
          </div>
          {lead && <LeadRequest lang={lang} onClose={() => setLead(false)} />}
          {voice && voiceId && (
            <div className="voice-host">
              {/* Custom element loaded only after explicit interaction. */}
              <div
                ref={(el) => {
                  if (el && !el.firstChild) {
                    const w = document.createElement("elevenlabs-convai");
                    w.setAttribute("agent-id", voiceId);
                    el.append(w);
                  }
                }}
              />
            </div>
          )}
          <form onSubmit={send}>
            <input
              aria-label={lang === "en" ? "Your message" : "Tu mensaje"}
              placeholder={
                lang === "en"
                  ? "What would feel good today?"
                  : "¿Qué te vendría bien hoy?"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1500}
            />
            <button
              disabled={busy || !input.trim()}
              aria-label={lang === "en" ? "Send message" : "Enviar mensaje"}
            >
              <Arrow />
            </button>
          </form>
          <small className="chat-disclosure">
            {lang === "en"
              ? "AI assistance, not medical advice. Please don’t share private health details."
              : "Asistencia de IA, no consejo médico. Evita compartir datos de salud privados."}
          </small>
        </aside>
      )}
    </>
  );
}
export function SpaExperience() {
  const [lang, setLang] = useState<Language>("en");
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const [booking, setBooking] = useState(false);
  const [embed, setEmbed] = useState(false);
  const [email, setEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.18]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const firstOpacity = useTransform(
    scrollYProgress,
    [0, 0.33, 0.48],
    [1, 1, 0],
  );
  const secondOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.55, 0.9, 1],
    [0, 1, 1, 0],
  );
  const firstY = useTransform(scrollYProgress, [0, 0.5], [0, -90]);
  const imageBrightness = useTransform(
    scrollYProgress,
    [0, 1],
    ["brightness(1)", "brightness(.65)"],
  );
  const en = lang === "en";
  const t = (a: string, b: string) => (en ? a : b);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    if (booking) dialog.current?.showModal();
    else dialog.current?.close();
  }, [booking]);
  useEffect(() => {
    const f = () => setLoading(false);
    if (sessionStorage.getItem("martha-intro")) {
      const id = setTimeout(f, 0);
      return () => clearTimeout(id);
    }
  }, []);
  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem("martha-intro", "seen");
    } catch {}
    setLoading(false);
  }, []);
  return (
    <>
      {loading && <Intro lang={lang} onDone={finishIntro} />}
      <a className="skip-link" href="#care">
        {t("Skip to treatments", "Saltar a tratamientos")}
      </a>
      <header className="site-header" inert={loading}>
        <a href="#" aria-label="Martha's Healing Touch home">
          <Logo />
        </a>
        <nav
          className={menu ? "nav open" : "nav"}
          aria-label={t("Main navigation", "Navegación principal")}
        >
          <a href="#care" onClick={() => setMenu(false)}>
            {t("Our treatments", "Tratamientos")}
          </a>
          <a href="#approach" onClick={() => setMenu(false)}>
            {t("Our approach", "Nuestra esencia")}
          </a>
          <a href="#visit" onClick={() => setMenu(false)}>
            {t("Visit us", "Visítanos")}
          </a>
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Language / Idioma">
            <button
              className={en ? "active" : ""}
              aria-pressed={en}
              onClick={() => setLang("en")}
            >
              <span aria-hidden="true">🇺🇸</span> EN
            </button>
            <span>/</span>
            <button
              className={!en ? "active" : ""}
              aria-pressed={!en}
              onClick={() => setLang("es")}
            >
              <span aria-hidden="true">🇪🇸</span> ES
            </button>
          </div>
          <button
            className="button button-small header-book"
            onClick={() => setBooking(true)}
          >
            {t("Reserve your moment", "Reserva tu momento")}
            <Arrow diagonal />
          </button>
          <button
            className="menu-button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-label={t("Toggle menu", "Abrir menú")}
          >
            {menu ? "×" : "☰"}
          </button>
        </div>
      </header>
      <main inert={loading}>
        <section
          className="hero-scroll"
          ref={hero}
          aria-label={t("A moment for yourself", "Un momento para ti")}
        >
          <div className="hero-sticky">
            <motion.div
              className="hero-visual"
              style={reduce ? {} : { scale, x, filter: imageBrightness }}
            >
              <Image
                src="/images/hero-cinematic.webp"
                alt={t(
                  "A serene moment of facial care, editorial illustration",
                  "Un momento de cuidado facial, imagen editorial ilustrativa",
                )}
                fill
                priority
                sizes="100vw"
                quality={90}
              />
                <ScrollFilm />
            </motion.div>
            <div className="hero-shade" />
            <div className="hero-grain" />
            <motion.div
              className="hero-content"
              style={reduce ? {} : { opacity: firstOpacity, y: firstY }}
            >
              <div className="eyebrow hero-eyebrow">
                <span /> MEDICAL WELLNESS · PEMBROKE PINES, FL
              </div>
              <h1>
                {t("Come back", "Vuelve")}
                <br />
                {t("to", "a")} <em>{t("yourself.", "ti.")}</em>
              </h1>
              <p>
                {t(
                  "A healing touch. A quieter mind.",
                  "Un toque que cuida. Una mente en calma.",
                )}
                <br />
                {t(
                  "A moment that is entirely yours.",
                  "Un momento que es solo tuyo.",
                )}
              </p>
              <button className="button" onClick={() => setBooking(true)}>
                {t("Find your moment", "Encuentra tu momento")}
                <Arrow diagonal />
              </button>
              <a className="hero-explore" href="#care">
                {t("Explore our treatments", "Explora nuestros tratamientos")}
                <span>↓</span>
              </a>
            </motion.div>
            <motion.div
              className="hero-second"
              style={{ opacity: reduce ? 0 : secondOpacity }}
              aria-hidden="true"
            >
              <span className="eyebrow">
                {t(
                  "LET THE WORLD WAIT A LITTLE",
                  "QUE EL MUNDO ESPERE UN POCO",
                )}
              </span>
              <h2>
                {t("Breathe in.", "Inhala.")}
                <br />
                <em>{t("Let go.", "Suelta.")}</em>
              </h2>
              <p>
                {t(
                  "Care for your skin. Space for your soul.",
                  "Cuidado para tu piel. Espacio para tu alma.",
                )}
              </p>
            </motion.div>
            <div className="hero-bottom">
              <span>
                {t("SCROLL TO SLOW DOWN", "DESLIZA Y BAJA EL RITMO")}
                <span className="scroll-line" />
              </span>
              <div className="hero-chapter">
                <span>01</span>
                <div className="chapter-track">
                  <motion.i style={{ scaleX: scrollYProgress }} />
                </div>
                <span>03</span>
              </div>
              <span className="hero-location">26° N · SOUTH FLORIDA</span>
            </div>
            <div className="hero-side">THE ART OF FEELING WELL</div>
          </div>
        </section>
        <div className="care-ribbon">
          <span>{t("Intentional care", "Cuidado consciente")}</span>
          <i>✧</i>
          <span>{t("A personal approach", "Atención personal")}</span>
          <i>✧</i>
          <span>{t("Your own kind of glow", "Tu propia luz")}</span>
          <i>✧</i>
          <span>{t("English & Español", "Español & English")}</span>
        </div>
        <section className="intro-section section-wrap" id="care">
          <span className="eyebrow">
            {t("THE HEALING TOUCH COLLECTION", "LA COLECCIÓN HEALING TOUCH")}
          </span>
          <div className="section-heading">
            <h2>
              {t("Feel good.", "Siéntete bien.")}
              <br />
              <em>{t("Beautifully.", "Naturalmente.")}</em>
            </h2>
            <p>
              {t(
                "Good care begins with you. Explore thoughtful treatments for your skin, body and wellbeing, with room to simply exhale.",
                "El buen cuidado comienza contigo. Explora tratamientos para tu piel, tu cuerpo y tu bienestar, con espacio para respirar.",
              )}
            </p>
          </div>
        </section>
        <section
          className="treatments section-wrap"
          aria-label={t("Treatments", "Tratamientos")}
        >
          {treatments.map((item, i) => (
            <article
              className={`treatment ${i % 2 ? "reverse" : ""}`}
              key={item.id}
            >
              <div className="treatment-image">
                <Image
                  src={item.image}
                  alt={en ? item.altEn : item.altEs}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
                <div className="image-caption">
                  <span>0{i + 1} / THE COLLECTION</span>
                  <span>MARTHA’S HEALING TOUCH</span>
                </div>
              </div>
              <div className="treatment-copy">
                <span className="eyebrow">
                  {en ? item.labelEn : item.labelEs}
                </span>
                <h2>{en ? item.en : item.es}</h2>
                <p>{en ? item.descriptionEn : item.descriptionEs}</p>
                <div className="treatment-tags">
                  {(en ? item.tagsEn : item.tagsEs).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <button
                  className="text-button"
                  onClick={() => setBooking(true)}
                >
                  {t("Make time for yourself", "Haz tiempo para ti")}
                  <Arrow diagonal />
                </button>
              </div>
            </article>
          ))}
        </section>
        <section className="weight-section section-wrap" id="approach">
          <div className="weight-intro">
            <span className="eyebrow">
              {t("A MORE PERSONAL PATH", "UN CAMINO MÁS PERSONAL")}
            </span>
            <h2>
              {t("Your next chapter,", "Tu siguiente capítulo,")}
              <br />
              <em>{t("at your pace.", "a tu ritmo.")}</em>
            </h2>
            <p>
              {t(
                "Our weight-loss program begins with a conversation with a medical practitioner. Together, you review your history and shape a plan around you.",
                "Nuestro programa de pérdida de peso comienza con una consulta con un profesional médico. Juntos revisan tu historial y crean un plan pensado para ti.",
              )}
            </p>
            <button className="button" onClick={() => setBooking(true)}>
              {t("Explore a consultation", "Consulta sobre el programa")}
              <Arrow diagonal />
            </button>
          </div>
          <div className="approach-steps">
            {[
              [
                t("First, we listen.", "Primero, te escuchamos."),
                t(
                  "Your goals, your questions, your starting point.",
                  "Tus objetivos, tus dudas, tu punto de partida.",
                ),
              ],
              [
                t("Care becomes personal.", "El cuidado se vuelve personal."),
                t(
                  "A medical consultation to discuss a plan that fits you.",
                  "Una consulta médica para hablar de un plan para ti.",
                ),
              ],
              [
                t("One step at a time.", "Un paso a la vez."),
                t(
                  "Discuss next steps and follow-up with your practitioner.",
                  "Define los siguientes pasos y el seguimiento con tu profesional.",
                ),
              ],
            ].map(([a, b], i) => (
              <div key={a}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{a}</h3>
                  <p>{b}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="pause-section">
          <Image src="/images/hero-cinematic.webp" alt="" fill sizes="100vw" />
          <div />
          <span className="eyebrow">
            {t(
              "NOT ANOTHER THING TO DO. A MOMENT TO BE.",
              "MENOS PENDIENTES. MÁS PRESENTE.",
            )}
          </span>
          <h2>
            {t("You owe yourself", "Te mereces")}
            <br />
            <em>{t("this moment.", "este momento.")}</em>
          </h2>
          <button className="button" onClick={() => setBooking(true)}>
            {t("Let’s make it yours", "Hagámoslo tuyo")}
            <Arrow diagonal />
          </button>
        </section>
        <section className="visit-section section-wrap" id="visit">
          <div>
            <span className="eyebrow">
              {t(
                "YOUR LITTLE ESCAPE, CLOSE TO HOME",
                "TU PEQUEÑA ESCAPADA, CERCA DE CASA",
              )}
            </span>
            <h2>
              {t("We’ll be", "Te estaremos")}
              <br />
              <em>{t("right here.", "esperando.")}</em>
            </h2>
            <p>
              {contact.address}
              <br />
              {contact.city}
            </p>
            <a
              className="text-button"
              href={contact.maps}
              target="_blank"
              rel="noreferrer"
            >
              {t("Get directions", "Cómo llegar")}
              <Arrow diagonal />
            </a>
          </div>
          <div className="visit-details">
            <div>
              <span className="eyebrow">{t("LET’S CONNECT", "HABLEMOS")}</span>
              <a className="phone-link" href={contact.phoneHref}>
                {contact.phone}
              </a>
              <button
                className="email-link"
                onClick={() => setEmail(!email)}
                aria-expanded={email}
              >
                {contact.email}
                <Arrow diagonal />
              </button>
              {email && (
                <div className="email-options">
                  <a href={`mailto:${contact.email}`}>
                    {t("Default email app", "Mi aplicación de correo")}
                  </a>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Gmail ↗
                  </a>
                  <a
                    href={`https://outlook.live.com/mail/0/deeplink/compose?to=${contact.email}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Outlook / Hotmail ↗
                  </a>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(contact.email);
                        setCopied(true);
                      } catch {
                        setCopied(false);
                      }
                    }}
                  >
                    {copied
                      ? t("Copied", "Copiado")
                      : t("Copy email", "Copiar correo")}
                  </button>
                </div>
              )}
            </div>
            <div className="visit-hours">
              <span className="eyebrow">
                {t("PLAN YOUR VISIT", "PLANEA TU VISITA")}
              </span>
              <p>
                {t(
                  "Find current availability and treatment details on Booksy. For opening hours or a little guidance, give us a call.",
                  "Consulta disponibilidad y tratamientos en Booksy. Para confirmar horarios o recibir orientación, llámanos.",
                )}
              </p>
              <button className="text-button" onClick={() => setBooking(true)}>
                {t("See appointment times", "Ver citas disponibles")}
                <Arrow diagonal />
              </button>
            </div>
            <div className="social-links">
              <a href={contact.instagram} target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
              <a href={contact.facebook} target="_blank" rel="noreferrer">
                Facebook ↗
              </a>
              <a href={contact.tiktok} target="_blank" rel="noreferrer">
                TikTok ↗
              </a>
            </div>
          </div>
        </section>
        <section className="faq section-wrap">
          <span className="eyebrow">
            {t("A LITTLE CLARITY", "UN POCO DE CLARIDAD")}
          </span>
          {[
            [
              t("Not sure where to start?", "¿No sabes por dónde empezar?"),
              t(
                "Tell our team what you’re looking for. We can explain the available treatments and help you choose a consultation. Martha’s Healing Touch AI can also answer general questions or prepare a verified call-back request.",
                "Cuéntale al equipo qué estás buscando. Podemos explicarte los tratamientos y orientarte hacia una consulta. Martha’s Healing Touch AI también responde preguntas generales o prepara una solicitud de llamada verificada.",
              ),
            ],
            [
              t("How do I make an appointment?", "¿Cómo reservo una cita?"),
              t(
                "Use Reserve your moment to open our Booksy booking page. Choose your service and complete your reservation there. You can also call (954) 639-3226.",
                "Usa Reserva tu momento para abrir Booksy. Elige tu servicio y completa allí la reserva. También puedes llamar al (954) 639-3226.",
              ),
            ],
            [
              t(
                "What if I am pregnant or recovering from surgery?",
                "¿Y si estoy embarazada o recuperándome de una cirugía?",
              ),
              t(
                "Please speak with your treating clinician and our team before booking. Treatment suitability and any required medical clearance must be discussed individually.",
                "Consulta a tu profesional de salud y a nuestro equipo antes de reservar. La idoneidad del tratamiento y cualquier autorización médica se revisan individualmente.",
              ),
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      </main>
      <footer className="site-footer" inert={loading}>
        <a href="#" aria-label="Martha's Healing Touch">
          <Logo />
        </a>
        <p>
          {t("Care that feels personal.", "Cuidado que se siente personal.")}
          <br />
          <span>© {new Date().getFullYear()} Martha’s Healing Touch</span>
          <br />
          <button
            className="replay-intro"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "instant" });
              setLoading(true);
            }}
          >
            {t("Replay the welcome", "Repetir la bienvenida")}
          </button>
        </p>
        <a href={bookingUrl} target="_blank" rel="noreferrer">
          {t("Your next moment awaits", "Tu próximo momento te espera")}
          <Arrow diagonal />
        </a>
      </footer>
      {!loading && <Concierge lang={lang} onBook={() => setBooking(true)} />}
      <dialog
        ref={dialog}
        className="booking-dialog"
        onCancel={() => setBooking(false)}
        onClick={(e) => {
          if (e.target === dialog.current) setBooking(false);
        }}
      >
        <div className="booking-top">
          <div>
            <span className="eyebrow">MARTHA’S HEALING TOUCH</span>
            <h2>
              {t("Your moment starts here.", "Tu momento comienza aquí.")}
            </h2>
          </div>
          <button
            onClick={() => setBooking(false)}
            aria-label={t("Close booking", "Cerrar reservas")}
          >
            ×
          </button>
        </div>
        <p>
          {t(
            "Choose and confirm your appointment securely with Booksy.",
            "Elige y confirma tu cita de forma segura con Booksy.",
          )}
        </p>
        {booking && embed && (
          <iframe
            title={t(
              "Booksy appointment booking",
              "Reserva de citas en Booksy",
            )}
            src={bookingUrl}
            allow="payment"
          />
        )}
        <div className="booking-choice">
          <span className="booking-mark">✧</span>
          <p>
            {t("Your treatment. Your time.", "Tu tratamiento. Tu momento.")}
          </p>
          <span>
            {t(
              "Browse services and available appointments with our booking partner.",
              "Consulta servicios y citas disponibles con nuestra plataforma de reservas.",
            )}
          </span>
        </div>
        <a
          className="button"
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
        >
          {t("Continue to Booksy", "Continuar en Booksy")}
          <Arrow diagonal />
        </a>
        <button className="embed-toggle" onClick={() => setEmbed(!embed)}>
          {embed
            ? t("Hide embedded booking", "Ocultar reserva integrada")
            : t(
                "Try booking without leaving this page",
                "Intentar reservar sin salir de esta página",
              )}
        </button>
        <small>
          {t(
            "Booksy may open separately for the best booking experience. You can also call the spa.",
            "Booksy puede abrirse por separado para completar la reserva. También puedes llamar al spa.",
          )}
        </small>
      </dialog>
    </>
  );
}
