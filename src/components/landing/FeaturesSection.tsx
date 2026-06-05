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

const FEATURES = [
  {
    icon: Building2,
    title: "Hotel Information Assistant",
    description:
      "Instant answers about rooms, amenities, check-in times, and hotel policies from your knowledge base.",
  },
  {
    icon: Headphones,
    title: "Guest Support",
    description:
      "24/7 automated support for common guest requests, reducing front desk call volume significantly.",
  },
  {
    icon: Heart,
    title: "Wellness Information",
    description:
      "Guide guests to spa services, sauna, yoga classes, and wellness facilities with accurate details.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant Information",
    description:
      "Share dining hours, menus, dress codes, and reservation procedures seamlessly.",
  },
  {
    icon: CalendarDays,
    title: "Event Information",
    description:
      "Inform guests about conferences, weddings, and on-property events with up-to-date details.",
  },
  {
    icon: Stethoscope,
    title: "Medical Assistance Information",
    description:
      "Provide clear guidance on emergency procedures, nearest hospitals, and on-call physician services.",
  },
  {
    icon: Bot,
    title: "Smart AI Chatbot",
    description:
      "RAG-powered conversational AI that answers only from your curated hotel knowledge base.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary mb-3 block">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything Your Guests Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive AI assistant covering every aspect of the guest
            journey, from arrival to departure.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <Card className="h-full hover:border-primary/30 hover:bg-white/[0.07] transition-all duration-300 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
