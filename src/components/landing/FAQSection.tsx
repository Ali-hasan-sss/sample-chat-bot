"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      "HotelMind supports English, Spanish, French, German, and Mandarin out of the box. Additional languages can be configured based on your property's guest demographics.",
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
      'When information isn\'t in your knowledge base, the assistant responds: "I don\'t have information about that in my current hotel knowledge base." and can direct guests to contact staff for further assistance.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary mb-3 block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about HotelMind.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
