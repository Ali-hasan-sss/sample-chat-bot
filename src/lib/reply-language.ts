export type ReplyLanguage = "en" | "de" | "fr";

export const REPLY_LANGUAGE_STORAGE_KEY = "fulife-reply-language";

export const REPLY_LANGUAGE_OPTIONS: {
  code: ReplyLanguage;
  label: string;
  nativeLabel: string;
}[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "de", label: "German", nativeLabel: "Deutsch" },
  { code: "fr", label: "French", nativeLabel: "Français" },
];

export function isReplyLanguage(value: unknown): value is ReplyLanguage {
  return value === "en" || value === "de" || value === "fr";
}

/** Default is always English on first open */
export function getDefaultReplyLanguage(): ReplyLanguage {
  return "en";
}

export function getReplyLanguageInstruction(lang: ReplyLanguage): string {
  const names: Record<ReplyLanguage, string> = {
    en: "English",
    de: "German",
    fr: "French",
  };

  return `REPLY LANGUAGE (HIGHEST PRIORITY):
- The guest selected ${names[lang]} via the language selector.
- Write your ENTIRE response in ${names[lang]} only.
- Never mix languages unless quoting a proper noun or address.`;
}

export function getFallbackMessage(lang: ReplyLanguage): string {
  switch (lang) {
    case "de":
      return "Dazu liegen mir in meiner Wissensdatenbank keine Informationen vor. Bitte kontaktieren Sie uns unter +49 1511 4622046.";
    case "fr":
      return "Je n'ai pas cette information dans ma base de connaissances. Contactez-nous au +49 1511 4622046.";
    default:
      return "I don't have that information in my knowledge base. Please contact us at +49 1511 4622046.";
  }
}

export function pickTtsVoiceForLanguage(lang: ReplyLanguage): string {
  const configured = process.env.OPENAI_TTS_VOICE;
  if (configured) return configured;

  switch (lang) {
    case "de":
      return "onyx";
    case "fr":
      return "nova";
    default:
      return "alloy";
  }
}
