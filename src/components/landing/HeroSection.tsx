"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "./AnimatedBackground";

const CHAT_DEMO = [
  {
    user: "What are your operating hours?",
    bot: "Our front desk and guest support are available 24/7. Restaurants and spa have specific hours — ask me anytime!",
  },
  {
    user: "What's today's dish of the day?",
    bot: "Today's Chef's Special at Azure Restaurant is Pan-seared Scallops with cauliflower purée. Vegetarian options available too.",
  },
  {
    user: "هل الغرف متاحة؟",
    bot: "لدينا 312 غرفة. للتوفر الفوري والحجز، تواصل مع الاستقبال على +1 (555) 234-8900.",
  },
];

export function HeroSection() {
  const [demoIndex, setDemoIndex] = useState(0);
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    setShowReply(false);
    const showTimer = setTimeout(() => setShowReply(true), 900);
    const cycleTimer = setTimeout(() => {
      setShowReply(false);
      setDemoIndex((i) => (i + 1) % CHAT_DEMO.length);
    }, 5800);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(cycleTimer);
    };
  }, [demoIndex]);

  const demo = CHAT_DEMO[demoIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground variant="hero" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-md mb-8 shadow-lg shadow-primary/5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
            AI-Powered Hospitality Technology
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          Elevate Every
          <br />
          <span className="text-gradient animate-gradient-text">
            Guest Experience
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          Intelligent AI assistants that deliver instant, accurate answers —
          reducing staff workload while elevating service quality around the
          clock.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="group min-w-[180px]" asChild>
            <a href="#contact">
              Request a Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="min-w-[180px]" asChild>
            <a href="#how-it-works">See How It Works</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 mx-auto max-w-lg"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/40 via-violet-500/30 to-primary/40 blur-xl opacity-60 animate-glow-pulse" />

            <div className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-1 glow-ring">
              <div className="rounded-xl bg-background/90 p-5 sm:p-6 text-left">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    Meridian Assistant · Live Demo
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
                    Online
                  </span>
                </div>

                <div className="space-y-3 min-h-[120px] text-sm">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`user-${demoIndex}`}
                      initial={{ opacity: 0, x: -16, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.35 }}
                      className="flex gap-2"
                    >
                      <div className="rounded-2xl rounded-tl-sm bg-white/10 border border-white/5 px-4 py-2.5 max-w-[88%] leading-relaxed">
                        {demo.user}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence>
                    {showReply && (
                      <motion.div
                        key={`bot-${demoIndex}`}
                        initial={{ opacity: 0, x: 16, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="flex gap-2 justify-end"
                      >
                        <div className="rounded-2xl rounded-tr-sm bg-primary/90 text-primary-foreground px-4 py-2.5 max-w-[88%] leading-relaxed shadow-lg shadow-primary/20">
                          {demo.bot}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!showReply && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-1.5 px-2 py-1"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                          className="h-2 w-2 rounded-full bg-primary/60"
                        />
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.a
          href="#features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="inline-flex flex-col items-center gap-1 mt-14 text-muted-foreground hover:text-primary transition-colors animate-scroll-hint"
          aria-label="Scroll to features"
        >
          <span className="text-[10px] uppercase tracking-widest">Explore</span>
          <ChevronDown className="h-5 w-5" />
        </motion.a>
      </div>
    </section>
  );
}
