import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message too long"),
  conversationId: z.string().max(100).optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      })
    )
    .max(12)
    .optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(254),
  company: z.string().max(100).optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
