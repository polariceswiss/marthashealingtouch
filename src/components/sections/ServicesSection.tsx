"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services } from "@/lib/site-config";

export function ServicesSection() {
  return (
    <section id="servicios" className="bg-ivory-100 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="font-sans text-xs tracking-[0.35em] text-gold-600 uppercase">Servicios</p>
          <h2 className="mt-4 font-serif text-4xl text-charcoal-900 md:text-5xl">
            Tratamientos que transforman
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-charcoal-700/80">
            Desde pérdida de peso con supervisión médica hasta maderoterapia y drenaje
            linfático. Cada protocolo combina precisión clínica con una experiencia
            sensorial de spa de lujo.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                price={service.price}
                video={service.video}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
