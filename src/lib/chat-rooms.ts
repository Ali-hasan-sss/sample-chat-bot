import type { ReplyLanguage } from "@/lib/reply-language";
import { FU_BOOK_URL } from "@/lib/fulife-theme";
import { SITE_IMAGES } from "@/lib/site-images";

export type ChatRoomCard = {
  id: string;
  image: string;
  name: Record<ReplyLanguage, string>;
  specs: Record<ReplyLanguage, string[]>;
};

export const ROOMS_REPLY_INTRO: Record<ReplyLanguage, string> = {
  en: "Here are our available room types at FU.life Berlin:",
  de: "Das sind unsere verfügbaren Zimmertypen bei FU.life Berlin:",
  fr: "Voici nos types de chambres disponibles chez FU.life Berlin :",
};

export const ROOM_BOOK_LABEL: Record<ReplyLanguage, string> = {
  en: "Book",
  de: "Buchen",
  fr: "Réserver",
};

export const CHAT_ROOM_CARDS: ChatRoomCard[] = [
  {
    id: "fire",
    image: SITE_IMAGES.roomFire,
    name: { en: "Fire", de: "Fire", fr: "Fire" },
    specs: {
      en: ["Warm & energizing", "Private bathroom", "Fully furnished"],
      de: ["Warm & energiegeladen", "Eigenes Bad", "Voll möbliert"],
      fr: ["Chaleureux & dynamique", "Salle de bain privée", "Entièrement meublé"],
    },
  },
  {
    id: "earth",
    image: SITE_IMAGES.roomEarth,
    name: { en: "Earth", de: "Earth", fr: "Earth" },
    specs: {
      en: ["Calm & focused", "Desk workspace", "Kitchen access"],
      de: ["Ruhig & fokussiert", "Schreibtisch", "Küchenzugang"],
      fr: ["Calme & concentré", "Bureau", "Accès cuisine"],
    },
  },
  {
    id: "wind",
    image: SITE_IMAGES.roomWind,
    name: { en: "Wind", de: "Wind", fr: "Wind" },
    specs: {
      en: ["Airy & light", "Stress-free vibe", "Smart-TV & Wi‑Fi"],
      de: ["Luftig & hell", "Entspannte Atmosphäre", "Smart-TV & WLAN"],
      fr: ["Aéré & lumineux", "Ambiance détendue", "Smart-TV & Wi‑Fi"],
    },
  },
  {
    id: "water",
    image: SITE_IMAGES.roomWater,
    name: { en: "Water", de: "Water", fr: "Water" },
    specs: {
      en: ["Calming & minimal", "Deep-focus space", "Cleaning included"],
      de: ["Beruhigend & minimal", "Fokus-Rückzugsort", "Reinigung inklusive"],
      fr: ["Apaisant & minimal", "Espace concentration", "Ménage inclus"],
    },
  },
];

export function getRoomsReplyIntro(lang: ReplyLanguage): string {
  return ROOMS_REPLY_INTRO[lang] ?? ROOMS_REPLY_INTRO.en;
}

export { FU_BOOK_URL };
