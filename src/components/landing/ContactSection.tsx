"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.info("[contact form]", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-primary mb-3 block">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              Ready to Transform
              <br />
              Your Guest Experience?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Schedule a personalized demo and see how HotelMind can reduce
              staff workload while delivering exceptional guest service.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Email:</strong>{" "}
                hello@hotelmind.io
              </p>
              <p>
                <strong className="text-foreground">Phone:</strong> +1 (555)
                100-2000
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-5"
            >
              {submitted && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Thank you! We&apos;ll be in touch shortly.
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@hotel.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company (optional)</Label>
                <Input
                  id="company"
                  placeholder="Your hotel or company"
                  {...register("company")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your property and needs..."
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
