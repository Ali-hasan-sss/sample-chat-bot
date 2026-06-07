export type ReplyLanguage = "en" | "de" | "fr";

export const REPLY_LANGUAGE_STORAGE_KEY = "fulife-reply-language";

/** Unicode flag emoji — may not render on Windows without an emoji font */
export const LANGUAGE_FLAG_EMOJI: Record<ReplyLanguage, string> = {
  en: String.fromCodePoint(0x1f1ec, 0x1f1e7),
  de: String.fromCodePoint(0x1f1e9, 0x1f1ea),
  fr: String.fromCodePoint(0x1f1eb, 0x1f1f7),
};

/** Twemoji asset ids for cross-platform flag display (same Unicode emoji) */
export const LANGUAGE_FLAG_TWEMOJI: Record<ReplyLanguage, string> = {
  en: "1f1ec-1f1e7",
  de: "1f1e9-1f1ea",
  fr: "1f1eb-1f1f7",
};

export const TWEMOJI_FLAG_BASE =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg";

export const REPLY_LANGUAGE_OPTIONS: {
  code: ReplyLanguage;
  label: string;
  nativeLabel: string;
  flag: string;
  twemoji: string;
}[] = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    flag: LANGUAGE_FLAG_EMOJI.en,
    twemoji: LANGUAGE_FLAG_TWEMOJI.en,
  },
  {
    code: "de",
    label: "German",
    nativeLabel: "Deutsch",
    flag: LANGUAGE_FLAG_EMOJI.de,
    twemoji: LANGUAGE_FLAG_TWEMOJI.de,
  },
  {
    code: "fr",
    label: "French",
    nativeLabel: "Français",
    flag: LANGUAGE_FLAG_EMOJI.fr,
    twemoji: LANGUAGE_FLAG_TWEMOJI.fr,
  },
];

export function isReplyLanguage(value: unknown): value is ReplyLanguage {
  return value === "en" || value === "de" || value === "fr";
}

/** Default is always English on first open */
export function getDefaultReplyLanguage(): ReplyLanguage {
  return "en";
}

export function getLanguageSwitchConfirmation(lang: ReplyLanguage): string {
  const option = REPLY_LANGUAGE_OPTIONS.find((item) => item.code === lang);
  const name = option?.nativeLabel ?? lang;

  switch (lang) {
    case "de":
      return `Die Antwortsprache wurde auf ${name} geändert.`;
    case "fr":
      return `La langue des réponses a été changée en ${name}.`;
    default:
      return `Reply language has been changed to ${name}.`;
  }
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
