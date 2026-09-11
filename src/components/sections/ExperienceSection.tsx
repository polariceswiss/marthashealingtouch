"use client";

import { motion } from "framer-motion";
import { experiencePoints } from "@/lib/site-config";

export function ExperienceSection() {
  return (
    <section className="bg-ivory-100 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-sans text-xs tracking-[0.35em] text-gold-600 uppercase">
            La experiencia
          </p>
          <h2 className="mt-4 font-serif text-4xl text-charcoal-900 md:text-5xl">
            Por qué elegirnos
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {experiencePoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-sage-100/60 bg-ivory-50 p-8 shadow-soft"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage-100/60">
                <span className="font-serif text-xl text-sage-700">{index + 1}</span>
              </div>
              <h3 className="font-serif text-xl text-charcoal-900">{point.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-700/80">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
