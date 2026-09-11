"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/site-config";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section className="bg-charcoal-900 py-24 text-ivory-50 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <p className="font-sans text-xs tracking-[0.35em] text-gold-200 uppercase">
          Testimonios
        </p>
        <h2 className="mt-4 font-serif text-4xl md:text-5xl">
          Lo que dicen quienes confiaron en nosotros
        </h2>

        <div className="relative mt-16 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-2xl"
            >
              <p className="font-serif text-2xl leading-relaxed italic md:text-3xl">
                &ldquo;{current.text}&rdquo;
              </p>
              <footer className="mt-8">
                <cite className="not-italic">
                  <span className="font-sans text-sm font-medium text-gold-200">
                    {current.name}
                  </span>
                  <span className="mx-2 text-ivory-100/40">·</span>
                  <span className="font-sans text-sm text-ivory-100/70">
                    {current.service}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1))}
            className="rounded-full border border-ivory-50/20 px-4 py-2 font-sans text-sm transition hover:border-gold-400"
            aria-label="Testimonio anterior"
          >
            ←
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all ${
                  active === index ? "w-8 bg-gold-400" : "w-2 bg-ivory-50/30"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1))}
            className="rounded-full border border-ivory-50/20 px-4 py-2 font-sans text-sm transition hover:border-gold-400"
            aria-label="Testimonio siguiente"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
