"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={isCenter ? "text-center mb-16" : "mb-8"}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={
          isCenter
            ? "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-4 backdrop-blur-sm"
            : "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-3 backdrop-blur-sm"
        }
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
        {label}
      </motion.span>

      <h2
        className={
          isCenter
            ? "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            : "text-3xl sm:text-4xl font-bold tracking-tight mb-4"
        }
      >
        {title}
      </h2>

      {description && (
        <p
          className={
            isCenter
              ? "text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
              : "text-muted-foreground text-base leading-relaxed max-w-lg"
          }
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
