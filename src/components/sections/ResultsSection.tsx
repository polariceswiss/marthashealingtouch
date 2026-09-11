"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { results } from "@/lib/site-config";

export function ResultsSection() {
  const [active, setActive] = useState(0);
  const current = results[active];

  return (
    <section id="resultados" className="bg-charcoal-900 py-24 text-ivory-50 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-xs tracking-[0.35em] text-gold-200 uppercase">
              Resultados reales
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              Transformaciones que se ven y se sienten
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-ivory-100/80">
              Cada resultado refleja un protocolo personalizado. Sin promesas vacías:
              seguimiento profesional, constancia y técnicas que funcionan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {results.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`rounded-full border px-5 py-2 font-sans text-sm transition ${
                    active === index
                      ? "border-gold-400 bg-gold-400/20 text-gold-200"
                      : "border-ivory-50/20 text-ivory-100/70 hover:border-ivory-50/40"
                  }`}
                >
                  {item.category}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {(["before", "after"] as const).map((type) => (
                  <div key={type} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <Image
                      src={current[type]}
                      alt={`${type === "before" ? "Antes" : "Después"} — ${current.category}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 45vw, 25vw"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-charcoal-900/70 px-3 py-1 font-sans text-xs tracking-wide uppercase backdrop-blur-sm">
                      {type === "before" ? "Antes" : "Después"}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center font-sans text-sm text-gold-200">{current.caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
