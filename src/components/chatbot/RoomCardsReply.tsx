"use client";

import { memo } from "react";
import Image from "next/image";
import type { ReplyLanguage } from "@/lib/reply-language";
import {
  CHAT_ROOM_CARDS,
  FU_BOOK_URL,
  ROOM_BOOK_LABEL,
  getRoomsReplyIntro,
} from "@/lib/chat-rooms";
import { useChatTheme } from "./ChatThemeContext";

interface RoomCardsReplyProps {
  language: ReplyLanguage;
}

export const RoomCardsReply = memo(function RoomCardsReply({
  language,
}: RoomCardsReplyProps) {
  const { theme } = useChatTheme();

  return (
    <div className="w-full min-w-0">
      <p className="mb-3 text-[13px] leading-relaxed text-[#2B2B2B]">
        {getRoomsReplyIntro(language)}
      </p>

      <div className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-1 -mx-0.5 px-0.5">
        {CHAT_ROOM_CARDS.map((room) => (
          <article
            key={room.id}
            className="flex w-[152px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-[#E8E8E8] bg-white shadow-sm"
          >
            <div className="relative aspect-[3/4] w-full bg-[#F5F5F5]">
              <Image
                src={room.image}
                alt={room.name[language] ?? room.name.en}
                fill
                className="object-cover"
                sizes="152px"
              />
            </div>

            <div className="flex flex-1 flex-col p-2.5">
              <h4
                className="text-sm font-semibold"
                style={{ color: theme.accent }}
              >
                {room.name[language] ?? room.name.en}
              </h4>

              <ul className="mt-2 flex-1 space-y-1 text-[11px] leading-snug text-[#6B6B6B]">
                {room.specs[language]?.map((spec) => (
                  <li key={spec} className="flex gap-1.5">
                    <span className="shrink-0 text-[#B0B0B0]">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              <a
                href={FU_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block rounded-lg py-2 text-center text-[11px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.accent }}
              >
                {ROOM_BOOK_LABEL[language] ?? ROOM_BOOK_LABEL.en}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
});
