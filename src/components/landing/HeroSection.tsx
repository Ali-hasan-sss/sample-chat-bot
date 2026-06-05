"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl animate-pulse [animation-delay:1s]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered Hospitality Technology
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Elevate Every
          <br />
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Guest Experience
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed"
        >
          Intelligent AI assistants that deliver instant, accurate answers to
          guest inquiries — reducing staff workload while elevating service
          quality around the clock.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <a href="#contact">
              Request a Demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#how-it-works">
              <Play className="h-4 w-4" />
              See How It Works
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 mx-auto max-w-4xl"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-1 shadow-2xl shadow-primary/5">
            <div className="rounded-xl bg-background/80 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <span className="text-xs text-muted-foreground">
                  HotelMind Assistant
                </span>
              </div>
              <div className="space-y-3 text-left text-sm">
                <div className="flex gap-3">
                  <div className="rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2 max-w-[80%]">
                    What wellness facilities are available?
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="rounded-2xl rounded-tr-sm bg-primary/90 text-primary-foreground px-4 py-2 max-w-[80%]">
                    Our wellness center on the 5th floor offers spa treatments,
                    yoga studio, thermal suite, and meditation room — open daily
                    6 AM to 10 PM.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
