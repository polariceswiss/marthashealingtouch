"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutMarthaSection() {
  return (
    <section id="sobre-martha" className="bg-sage-100/20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/martha-portrait.svg"
              alt="Martha Martinez, fundadora de Martha's Healing Touch"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="font-sans text-xs tracking-[0.35em] text-gold-600 uppercase">
              Sobre Martha
            </p>
            <h2 className="mt-4 font-serif text-4xl text-charcoal-900 md:text-5xl">
              Cuidado profesional con alma
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-charcoal-700/80">
              Martha Martinez fundó Martha&apos;s Healing Touch con una convicción clara:
              cada persona merece resultados reales en un ambiente donde se sienta
              escuchada, cuidada y segura. Con años de experiencia en tratamientos
              corporales, drenaje linfático y protocolos de medical spa, combina
              precisión técnica con calidez humana.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-charcoal-700/80">
              Habla español e inglés, y acompaña a cada clienta — y cliente — con
              atención personalizada desde la primera consulta hasta la transformación
              completa.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { label: "Cuidado", desc: "Trato humano en cada sesión" },
                { label: "Resultados", desc: "Protocolos con seguimiento real" },
                { label: "Confianza", desc: "Supervisión profesional constante" },
              ].map((value) => (
                <div key={value.label} className="border-l-2 border-gold-400 pl-4">
                  <p className="font-serif text-lg text-charcoal-900">{value.label}</p>
                  <p className="mt-1 font-sans text-sm text-charcoal-700/70">{value.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
