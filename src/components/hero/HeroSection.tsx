"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/hero/SplitText";
import { siteConfig } from "@/lib/site-config";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    if (!section || !overlay) return;

    const ctx = gsap.context(() => {
      gsap.to(overlay, {
        opacity: 0.95,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const videoSrc = isMobile ? "/videos/hero-mobile.mp4" : "/videos/hero-desktop.mp4";
  const webmSrc = isMobile ? "/videos/hero-mobile.webm" : "/videos/hero-desktop.webm";

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      aria-label="Presentación principal"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.svg"
          aria-hidden="true"
        >
          <source src={webmSrc} type="video/webm" />
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/40 via-transparent to-transparent" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 font-sans text-xs tracking-[0.35em] text-gold-200 uppercase md:text-sm"
            >
              {siteConfig.subTagline}
            </motion.p>

            <h1 className="font-serif text-4xl leading-[1.1] font-light text-ivory-50 sm:text-5xl md:text-6xl lg:text-7xl">
              <SplitText text={siteConfig.tagline} delay={0.15} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-6 max-w-xl font-sans text-base leading-relaxed text-ivory-100/90 md:text-lg"
            >
              Medical spa de lujo en Pembroke Pines. Resultados reales con
              supervisión profesional, técnicas avanzadas y una experiencia que
              renueva cuerpo y mente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button href={siteConfig.booksy} external size="lg" ariaLabel="Reservar cita en Booksy">
                Reservar ahora
              </Button>
              <Button href="#resultados" variant="secondary" size="lg">
                Ver resultados reales
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 text-gold-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-sans text-sm text-ivory-100/80">
                <span className="font-medium text-ivory-50">{siteConfig.rating.score}</span>
                {" · "}
                {siteConfig.rating.count}+ reseñas
                {" · "}
                <span className="text-gold-200">
                  {siteConfig.rating.monthlyRenewals} personas se sintieron renovadas este mes
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <button
        type="button"
        onClick={toggleVideo}
        className="absolute right-6 bottom-6 z-20 rounded-full border border-ivory-50/30 bg-charcoal-900/40 px-4 py-2 font-sans text-xs tracking-wide text-ivory-50 backdrop-blur-md transition hover:bg-charcoal-900/60 focus-visible:ring-2 focus-visible:ring-gold-400"
        aria-label={isPaused ? "Reproducir video de fondo" : "Pausar video de fondo"}
        aria-pressed={isPaused}
      >
        {isPaused ? "▶ Reproducir" : "⏸ Pausar video"}
      </button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-ivory-50/60"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-ivory-50/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
