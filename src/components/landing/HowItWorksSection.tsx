"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, Zap } from "lucide-react";
import { AnimatedBackground } from "./AnimatedBackground";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Guest Asks a Question",
    description:
      "Guests interact via chat widget, voice message, or in-room tablet — in their preferred language.",
  },
  {
    icon: Search,
    step: "02",
    title: "AI Searches Knowledge Base",
    description:
      "Our RAG engine retrieves the most relevant information using semantic search from your curated content.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Instant Accurate Answer",
    description:
      "The AI generates a precise, context-aware response in seconds — consistent every time, available 24/7.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 relative overflow-hidden">
      <AnimatedBackground variant="section" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label="How It Works"
          title="Three Steps to Better Service"
          description="Deploy intelligent guest support in minutes, not months."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
          <div className="hidden md:block absolute top-[4.5rem] left-[18%] right-[18%] h-px overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            />
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl relative shadow-lg group-hover:border-primary/40 group-hover:shadow-primary/20 transition-all duration-300"
              >
                <step.icon className="h-8 w-8 text-primary" />
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15, type: "spring" }}
                  className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30"
                >
                  {step.step}
                </motion.span>
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
