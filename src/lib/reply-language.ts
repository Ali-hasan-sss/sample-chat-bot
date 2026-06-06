export type ReplyLanguage = "en" | "ar" | "de";

export const REPLY_LANGUAGE_STORAGE_KEY = "meridian-reply-language";

export const REPLY_LANGUAGE_OPTIONS: {
  code: ReplyLanguage;
  flag: string;
  label: string;
  nativeLabel: string;
}[] = [
  { code: "en", flag: "🇬🇧", label: "English", nativeLabel: "English" },
  { code: "ar", flag: "🇸🇦", label: "Arabic", nativeLabel: "العربية" },
  { code: "de", flag: "🇩🇪", label: "German", nativeLabel: "Deutsch" },
];

export function isReplyLanguage(value: unknown): value is ReplyLanguage {
  return value === "en" || value === "ar" || value === "de";
}

export function getDefaultReplyLanguage(): ReplyLanguage {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language?.split("-")[0]?.toLowerCase();
  if (lang === "ar" || lang === "de") return lang;
  return "en";
}

export function getReplyLanguageInstruction(lang: ReplyLanguage): string {
  const names: Record<ReplyLanguage, string> = {
    en: "English",
    ar: "Arabic (Modern Standard Arabic)",
    de: "German",
  };

  return `REPLY LANGUAGE (HIGHEST PRIORITY):
- The guest selected ${names[lang]} as the reply language via the language selector.
- Write your ENTIRE response in ${names[lang]} only — even if the guest writes in another language.
- Never mix languages unless quoting a proper noun (hotel name, restaurant name, phone number).`;
}

export function getFallbackMessage(lang: ReplyLanguage): string {
  switch (lang) {
    case "ar":
      return "عذراً، لا تتوفر لدي معلومات عن ذلك في قاعدة معرفة الفندق الحالية. يرجى التواصل مع الاستقبال للمساعدة.";
    case "de":
      return "Dazu liegen mir in meiner aktuellen Hotel-Wissensdatenbank keine Informationen vor. Bitte wenden Sie sich an die Rezeption.";
    default:
      return "I don't have information about that in my current hotel knowledge base.";
  }
}

export function pickTtsVoiceForLanguage(lang: ReplyLanguage): string {
  const configured = process.env.OPENAI_TTS_VOICE;
  if (configured) return configured;

  switch (lang) {
    case "ar":
      return "nova";
    case "de":
      return "onyx";
    default:
      return "alloy";
  }
}
