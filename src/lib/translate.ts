import { getOpenAIClient, getModel } from "@/lib/openai";
import { formatAssistantReply } from "@/lib/sanitize";
import type { ReplyLanguage } from "@/lib/reply-language";

const LANGUAGE_NAMES: Record<ReplyLanguage, string> = {
  en: "English",
  de: "German",
  fr: "French",
};

export async function translateMessageText(
  text: string,
  targetLanguage: ReplyLanguage
): Promise<string> {
  const openai = getOpenAIClient();
  const target = LANGUAGE_NAMES[targetLanguage];

  const response = await openai.responses.create({
    model: getModel(),
    instructions: `You are a professional translator for FU.life Berlin co-living chat.
Translate the message to ${target}.
Rules:
- Output ONLY the translation — no quotes, labels, or explanations
- Plain text only — no Markdown symbols
- Preserve meaning, tone, numbers, phone numbers, and proper nouns`,
    input: text,
    max_output_tokens: 900,
    temperature: 0.2,
  });

  const output = response.output_text?.trim();
  if (!output) {
    throw new Error("Empty translation from OpenAI");
  }

  return formatAssistantReply(output);
}
