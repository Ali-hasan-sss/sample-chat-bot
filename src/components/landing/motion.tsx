"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Positive = moves up on scroll (fu.life parallax-down style) */
  offset?: number;
  direction?: "up" | "down";
}

export function Parallax({
  children,
  className,
  offset = 80,
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = direction === "up" ? [offset, -offset] : [-offset, offset];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInUp({ children, className, delay = 0 }: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
