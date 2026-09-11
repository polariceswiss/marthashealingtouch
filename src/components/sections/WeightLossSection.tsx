"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { siteConfig, weightLossTimeline } from "@/lib/site-config";

export function WeightLossSection() {
  return (
    <section className="relative overflow-hidden bg-ivory-50 py-24 md:py-32">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-sage-100/40 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-xs tracking-[0.35em] text-gold-600 uppercase">
              Programa destacado
            </p>
            <h2 className="mt-4 font-serif text-4xl text-charcoal-900 md:text-5xl">
              Pérdida de peso con supervisión médica
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-charcoal-700/80">
              Un plan integral diseñado para resultados rápidos y sostenibles. Martha
              acompaña cada fase con evaluación profesional, ajustes personalizados y
              el respaldo de un medical spa de confianza.
            </p>

            <ul className="mt-8 space-y-3 font-sans text-sm text-charcoal-800">
              {[
                "Evaluación médica inicial y plan personalizado",
                "Seguimiento semanal de progreso",
                "Combinación de tratamientos corporales complementarios",
                "Enfoque holístico: cuerpo, hábitos y bienestar",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href={siteConfig.booksy} external size="lg">
                Agendar consulta de pérdida de peso
              </Button>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 h-full w-px bg-sage-300/60 md:left-6" aria-hidden="true" />
            <div className="space-y-8">
              {weightLossTimeline.map((step, index) => (
                <motion.div
                  key={step.week}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12 md:pl-16"
                >
                  <span className="absolute left-2.5 flex h-3 w-3 rounded-full border-2 border-gold-600 bg-ivory-50 md:left-[18px]" />
                  <p className="font-sans text-xs tracking-[0.2em] text-gold-600 uppercase">
                    {step.week}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-charcoal-900">{step.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal-700/80">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
