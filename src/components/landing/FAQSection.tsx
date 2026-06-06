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
    question: "Is the apartment fully furnished?",
    answer:
      "Yes — bed, desk, chair, wardrobe, private bathroom, and kitchen or kitchenette. Bring only your personal items.",
  },
  {
    question: "What are check-in and check-out times?",
    answer:
      "Check-in from 3:00 PM, check-out by 10:00 AM. Self check-in is available 24/7. Early check-in and late check-out on request.",
  },
  {
    question: "How does building access work?",
    answer:
      "Use the Häfele Access app on your smartphone to enter the building at Kurfürstendamm 69.",
  },
  {
    question: "Is there a minimum stay?",
    answer: "No minimum stay requirement at FU.life Berlin.",
  },
  {
    question: "Are pets allowed?",
    answer: "Yes, pets are welcome at FU.life Berlin.",
  },
  {
    question: "What if I need help during my stay?",
    answer:
      "Use the chat assistant on this page, or call our emergency hotline +49 1511 4622046 (24/7) for urgent issues.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#EFEFEF]">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          label="FAQ"
          title="Questions about your stay"
          description="Quick answers about FU.life Berlin co-living."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-[#E0E0E0] bg-white px-5 shadow-sm"
              >
                <AccordionTrigger className="text-left text-[#2B2B2B] hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#6B6B6B] text-sm leading-relaxed pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
