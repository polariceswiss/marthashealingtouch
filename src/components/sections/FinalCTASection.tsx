"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sage-700 via-sage-900 to-charcoal-900 py-24 text-ivory-50 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,169,98,0.15),transparent_60%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">
            Tu momento de transformación empieza aquí
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-ivory-100/85 md:text-lg">
            Reserva tu cita hoy y descubre cómo se siente un medical spa donde los
            resultados son reales y la experiencia, inolvidable.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={siteConfig.booksy} external size="lg">
              Reservar en Booksy
            </Button>
            <Button href={siteConfig.social.whatsapp} external variant="secondary" size="lg">
              Escribir por WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
