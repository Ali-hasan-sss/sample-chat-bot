"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  variant?: "hero" | "section" | "page";
}

export const AnimatedBackground = memo(function AnimatedBackground({
  variant = "hero",
}: AnimatedBackgroundProps) {
  const isHero = variant === "hero";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={
          isHero
            ? "absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(34,211,238,0.18),transparent_55%)]"
            : "absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(34,211,238,0.08),transparent_60%)]"
        }
      />

      <div className="absolute inset-0 grid-pattern opacity-60" />

      <motion.div
        animate={
          isHero
            ? { x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }
            : { opacity: [0.3, 0.5, 0.3] }
        }
        transition={{
          duration: isHero ? 18 : 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={
          isHero
            ? "absolute top-[15%] -left-24 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[120px]"
            : "absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[80px]"
        }
      />

      <motion.div
        animate={
          isHero
            ? { x: [0, -35, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }
            : { opacity: [0.2, 0.4, 0.2] }
        }
        transition={{
          duration: isHero ? 22 : 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className={
          isHero
            ? "absolute bottom-[10%] -right-24 h-[36rem] w-[36rem] rounded-full bg-violet-500/15 blur-[120px]"
            : "absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-[90px]"
        }
      />

      {isHero && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-primary/5 animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full border border-violet-500/5 animate-spin-slow [animation-direction:reverse] [animation-duration:30s]" />
        </>
      )}
    </div>
  );
});
