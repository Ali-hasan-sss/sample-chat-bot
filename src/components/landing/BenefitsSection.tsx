"use client";

import { motion } from "framer-motion";
import {
  TrendingDown,
  Clock,
  CheckCircle2,
  Globe,
  Rocket,
} from "lucide-react";

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
      "Serve international guests in their native language with built-in translation capabilities.",
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
    <section id="benefits" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-primary mb-3 block">
              Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Transform Your
              <br />
              Hospitality Operations
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              HotelMind empowers your team to deliver exceptional service at
              scale. Reduce costs, increase satisfaction, and stay ahead of
              guest expectations.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "70%", label: "Fewer inquiries" },
                { value: "24/7", label: "Availability" },
                { value: "<2s", label: "Response time" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm hover:border-primary/20 transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
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
    </section>
  );
}
