"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, Zap } from "lucide-react";

const STEPS = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Guest Asks a Question",
    description:
      "Guests interact with the AI assistant via chat widget, mobile app, or in-room tablet — in their preferred language.",
  },
  {
    icon: Search,
    step: "02",
    title: "AI Searches Knowledge Base",
    description:
      "Our RAG engine retrieves the most relevant information from your curated hotel knowledge base using semantic search.",
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
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Three Steps to Better Service
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Deploy intelligent guest support in minutes, not months.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl relative">
                <step.icon className="h-8 w-8 text-primary" />
                <span className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>
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
