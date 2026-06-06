"use client";

import { motion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  delay?: number;
}

export function AnimatedCounter({ value, label, delay = 0 }: AnimatedCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.35)]"
    >
      <div className="text-2xl sm:text-3xl font-bold text-gradient animate-gradient-text">
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-2">{label}</div>
    </motion.div>
  );
}
