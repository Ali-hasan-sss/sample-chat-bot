import type { ReplyLanguage } from "@/lib/reply-language";
import { FU_BOOK_URL } from "@/lib/fulife-theme";

export type ChatMode = "ai" | "simple";

export const NAV_CARDS = [
  {
    id: "hotel",
    title: "Our Hotel",
    prompt: "Tell me about FU.life Berlin and what's included in my stay.",
  },
  {
    id: "around",
    title: "Getting Around",
    prompt: "How do I get around Berlin from Kurfürstendamm 69?",
  },
  {
    id: "community",
    title: "Community",
    prompt: "What community events and co-living benefits does FU.life offer?",
  },
] as const;

export const WELCOME_COPY: Record<
  ReplyLanguage,
  { greeting: string; perks: string }
> = {
  en: {
    greeting: "Hi! 👋 I'm your FU.life assistant — how can I help?",
    perks:
      "Your stay includes a furnished room, Wi‑Fi, cleaning & community spaces.",
  },
  de: {
    greeting: "Hi! 👋 Ich bin dein FU.life Assistent — wie kann ich helfen?",
    perks:
      "Dein Aufenthalt: möbliertes Zimmer, WLAN, Reinigung & Community-Bereiche.",
  },
  fr: {
    greeting:
      "Hi! 👋 Je suis votre assistant FU.life — comment puis-je vous aider?",
    perks:
      "Votre séjour : chambre meublée, Wi‑Fi, ménage & espaces communautaires.",
  },
};

/** Simple mode: instant answers without AI for common topics */
export const SIMPLE_ANSWERS: Record<
  string,
  Partial<Record<ReplyLanguage, string>>
> = {
  hotel: {
    en: "FU.life Berlin at Ku'damm 69 is fully furnished co-living with private kitchen, 24/7 self check-in, cleaning, Wi‑Fi, and community spaces. Book at fu.life.",
    de: "FU.life Berlin am Ku'damm 69 ist voll möbliertes Co-Living mit privater Küche, 24/7 Self-Check-in, Reinigung, WLAN und Community-Bereichen. Buchen auf fu.life.",
    fr: "FU.life Berlin au Ku'damm 69 est un co-living entièrement meublé avec cuisine privée, self check-in 24h/24, ménage, Wi‑Fi et espaces communautaires. Réservez sur fu.life.",
  },
  around: {
    en: "We're at Kurfürstendamm 69 — U-Bahn and buses are steps away. Street parking is paid (~€4/h). Nearby garages: Q-Park Fürst, Galeria Ku'damm, CONTIPARK Los Angeles Platz.",
    de: "Wir sind am Kurfürstendamm 69 — U-Bahn und Busse in der Nähe. Straßenparken kostenpflichtig (~4 €/h). Garagen: Q-Park Fürst, Galeria Ku'damm, CONTIPARK Los Angeles Platz.",
    fr: "Nous sommes au Kurfürstendamm 69 — métro et bus à proximité. Parking rue payant (~4 €/h). Parkings: Q-Park Fürst, Galeria Ku'damm, CONTIPARK Los Angeles Platz.",
  },
  community: {
    en: "Live with like-minded people in a private room with real community — events, co-working, and shared spaces. Join at your pace, no pressure.",
    de: "Leben Sie mit Gleichgesinnten in einem privaten Zimmer mit echter Community — Events, Co-Working und Gemeinschaftsräume. In Ihrem Tempo.",
    fr: "Vivez avec des personnes partageant les mêmes idées dans une chambre privée — événements, co-working et espaces communs. À votre rythme.",
  },
  checkin: {
    en: "Check-in from 3:00 PM, check-out by 10:00 AM. Self check-in is available 24/7. Building access via the Häfele Access app on your phone.",
    de: "Check-in ab 15:00, Check-out bis 10:00. Self-Check-in 24/7. Gebäudezugang über die Häfele Access App.",
    fr: "Arrivée à partir de 15h, départ avant 10h. Self check-in 24h/24. Accès bâtiment via l'app Häfele Access.",
  },
  furnished: {
    en: "Yes — fully furnished: bed, desk, chair, wardrobe, private bathroom, and kitchen or kitchenette. Just bring your personal items.",
    de: "Ja — voll möbliert: Bett, Schreibtisch, Stuhl, Kleiderschrank, eigenes Bad und Küche oder Kochnische. Nur persönliche Sachen mitbringen.",
    fr: "Oui — entièrement meublé : lit, bureau, chaise, armoire, salle de bain privée et cuisine ou kitchenette. Apportez vos affaires personnelles.",
  },
  access: {
    en: "Use the Häfele Access app on your smartphone to enter the building. Self check-in is available 24/7.",
    de: "Gebäudezugang über die Häfele Access App auf dem Smartphone. Self-Check-in rund um die Uhr.",
    fr: "Accès au bâtiment via l'app Häfele Access sur votre smartphone. Self check-in 24h/24.",
  },
  cleaning: {
    en: "Full cleaning on arrival. Long stays: every 14 days. Short stays: weekly cleaning.",
    de: "Grundreinigung bei Ankunft. Langzeitaufenthalt: alle 14 Tage. Kurzaufenthalt: wöchentlich.",
    fr: "Grand ménage à l'arrivée. Long séjour : tous les 14 jours. Court séjour : chaque semaine.",
  },
  emergency: {
    en: "For emergencies (power, heating, water leaks) call +49 1511 4622046 — available 24/7. Lost phone? Same number for alternative access.",
    de: "Notfälle (Strom, Heizung, Wasser): +49 1511 4622046 — 24/7. Telefon verloren? Gleiche Nummer für Zugang.",
    fr: "Urgences (électricité, chauffage, fuites): +49 1511 4622046 — 24h/24. Téléphone perdu? Même numéro pour l'accès.",
  },
};

export function getSimpleAnswer(
  key: string,
  lang: ReplyLanguage
): string | undefined {
  const entry = SIMPLE_ANSWERS[key];
  return entry?.[lang] ?? entry?.en;
}

export type QuickSuggestionDef = {
  id: string;
  label: Record<ReplyLanguage, string>;
  /** Opens externally instead of an in-chat reply */
  href?: string;
};

export const QUICK_SUGGESTIONS: QuickSuggestionDef[] = [
  {
    id: "checkin",
    label: {
      en: "Check-in times?",
      de: "Check-in Zeiten?",
      fr: "Horaires d'arrivée ?",
    },
  },
  {
    id: "furnished",
    label: {
      en: "Furnished apartment?",
      de: "Möbliert?",
      fr: "Appartement meublé ?",
    },
  },
  {
    id: "access",
    label: {
      en: "Building access",
      de: "Gebäudezugang",
      fr: "Accès bâtiment",
    },
  },
  {
    id: "cleaning",
    label: {
      en: "Cleaning schedule",
      de: "Reinigung",
      fr: "Ménage",
    },
  },
  {
    id: "emergency",
    label: {
      en: "Emergency contact",
      de: "Notfallkontakt",
      fr: "Contact urgence",
    },
  },
  {
    id: "book",
    label: {
      en: "Book Now",
      de: "Jetzt buchen",
      fr: "Réserver",
    },
    href: FU_BOOK_URL,
  },
];

export function getQuickSuggestionLabel(
  id: string,
  lang: ReplyLanguage
): string {
  const item = QUICK_SUGGESTIONS.find((s) => s.id === id);
  return item?.label[lang] ?? item?.label.en ?? id;
}
