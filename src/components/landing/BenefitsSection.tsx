"use client";

import { motion } from "framer-motion";
import {
  TrendingDown,
  Clock,
  CheckCircle2,
  Globe,
  Rocket,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { AnimatedCounter } from "./AnimatedCounter";

const BENEFITS = [
  {
    icon: TrendingDown,
    title: "Reduce Staff Workload",
    description:
      "Automate up to 70% of repetitive guest inquiries, freeing your team for high-value interactions.",
  },
  {
    icon: Clock,
    title: "24/7 Guest Support",
    description:
      "Provide round-the-clock assistance without additional staffing costs or shift scheduling.",
  },
  {
    icon: CheckCircle2,
    title: "Consistent Answers",
    description:
      "Every guest receives the same accurate information, eliminating inconsistencies across shifts.",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description:
      "Serve international guests in English, Arabic, German, and more with built-in translation.",
  },
  {
    icon: Rocket,
    title: "Fast Onboarding",
    description:
      "Upload your hotel documentation and go live in days, not weeks. No complex integrations required.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-28 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeading
              align="left"
              label="Benefits"
              title={
                <>
                  Transform Your
                  <br />
                  <span className="text-gradient">Hospitality Operations</span>
                </>
              }
              description="HotelMind empowers your team to deliver exceptional service at scale. Reduce costs, increase satisfaction, and stay ahead of guest expectations."
            />

            <div className="grid grid-cols-3 gap-3">
              <AnimatedCounter value="70%" label="Fewer inquiries" delay={0.1} />
              <AnimatedCounter value="24/7" label="Availability" delay={0.2} />
              <AnimatedCounter value="<2s" label="Response time" delay={0.3} />
            </div>
          </motion.div>

          <div className="space-y-3">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm hover:border-primary/25 hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mx-auto max-w-3xl mt-28" />
    </section>
  );
}
