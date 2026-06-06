"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";

const FAQ_ITEMS = [
  {
    question: "How does the AI assistant know about our hotel?",
    answer:
      "You provide your hotel documentation — policies, amenities, services, and FAQs. Our RAG system indexes this content and retrieves relevant information for each guest question, ensuring accurate, property-specific answers.",
  },
  {
    question: "Can the chatbot make reservations?",
    answer:
      "The AI assistant provides information and directs guests to the appropriate booking channels (concierge, front desk, or online). It does not process payments or access real-time availability to ensure data security.",
  },
  {
    question: "What languages are supported?",
    answer:
      "HotelMind supports English, Arabic, and German for replies, with per-message translation. Voice messages and text chat work seamlessly across all three languages.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most properties go live within 3-5 business days. Upload your documentation, customize the chat widget appearance, and deploy. Our team provides onboarding support throughout the process.",
  },
  {
    question: "Is guest data secure?",
    answer:
      "Yes. We follow OWASP security best practices including input sanitization, rate limiting, and prompt injection prevention. No guest personal data is stored in chat conversations, and API keys remain server-side only.",
  },
  {
    question: "What happens when the AI can't answer a question?",
    answer:
      'When information isn\'t in your knowledge base, the assistant responds politely and can direct guests to contact staff for further assistance.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-6">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about HotelMind."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 backdrop-blur-sm data-[state=open]:border-primary/30 data-[state=open]:bg-white/[0.06] transition-colors"
                >
                  <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
