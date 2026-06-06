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
      className={isCenter ? "text-center mb-12" : "mb-8"}
    >
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F15A24] mb-3">
        {label}
      </span>

      <h2
        className={
          isCenter
            ? "text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B2B2B] mb-4 leading-snug"
            : "text-2xl sm:text-3xl font-bold text-[#2B2B2B] mb-4"
        }
      >
        {title}
      </h2>

      {description && (
        <p
          className={
            isCenter
              ? "text-[#6B6B6B] max-w-2xl mx-auto text-base leading-relaxed"
              : "text-[#6B6B6B] text-base leading-relaxed max-w-lg"
          }
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
