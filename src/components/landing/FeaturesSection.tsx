"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Headphones,
  Heart,
  UtensilsCrossed,
  CalendarDays,
  Stethoscope,
  Bot,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedBackground } from "./AnimatedBackground";
import { SectionHeading } from "./SectionHeading";

const FEATURES = [
  {
    icon: Building2,
    title: "Hotel Information Assistant",
    description:
      "Instant answers about rooms, amenities, check-in times, and hotel policies from your knowledge base.",
    color: "from-cyan-500/20 to-primary/5",
  },
  {
    icon: Headphones,
    title: "Guest Support",
    description:
      "24/7 automated support for common guest requests, reducing front desk call volume significantly.",
    color: "from-violet-500/20 to-primary/5",
  },
  {
    icon: Heart,
    title: "Wellness Information",
    description:
      "Guide guests to spa services, sauna, yoga classes, and wellness facilities with accurate details.",
    color: "from-pink-500/20 to-primary/5",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant Information",
    description:
      "Share dining hours, menus, dress codes, and reservation procedures seamlessly.",
    color: "from-amber-500/20 to-primary/5",
  },
  {
    icon: CalendarDays,
    title: "Event Information",
    description:
      "Inform guests about conferences, weddings, and on-property events with up-to-date details.",
    color: "from-emerald-500/20 to-primary/5",
  },
  {
    icon: Stethoscope,
    title: "Medical Assistance Information",
    description:
      "Provide clear guidance on emergency procedures, nearest hospitals, and on-call physician services.",
    color: "from-red-500/20 to-primary/5",
  },
  {
    icon: Bot,
    title: "Smart AI Chatbot",
    description:
      "RAG-powered conversational AI that answers only from your curated hotel knowledge base.",
    color: "from-primary/20 to-violet-500/5",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-28 relative overflow-hidden">
      <AnimatedBackground variant="section" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Features"
          title="Everything Your Guests Need"
          description="A comprehensive AI assistant covering every aspect of the guest journey, from arrival to departure."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="h-full"
              >
                <Card className="relative h-full overflow-hidden border-white/10 bg-white/[0.03] hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.25)] transition-all duration-400 group">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                  <CardHeader className="relative">
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors"
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="section-divider mx-auto max-w-3xl mt-28" />
    </section>
  );
}
