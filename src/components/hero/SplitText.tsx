"use client";

import { motion, type Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay },
  }),
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SplitText({ text, className, delay = 0.2 }: SplitTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
