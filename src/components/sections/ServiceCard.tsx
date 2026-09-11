"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  video?: string;
}

export function ServiceCard({ title, description, price, video }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.article
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-sage-100/60 bg-ivory-50 shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sage-100/30">
        {video ? (
          <video
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            muted
            loop
            playsInline
            autoPlay={hovered}
            preload="none"
            poster="/images/service-placeholder.jpg"
            aria-hidden="true"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-sage-100 to-eucalyptus-300/40">
            <span className="font-serif text-4xl text-sage-700/40">{title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent" />
      </div>

      <div className="p-6 md:p-8">
        <p className="font-sans text-xs tracking-[0.2em] text-gold-600 uppercase">{price}</p>
        <h3 className="mt-2 font-serif text-2xl text-charcoal-900">{title}</h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-700/80">{description}</p>
      </div>
    </motion.article>
  );
}
