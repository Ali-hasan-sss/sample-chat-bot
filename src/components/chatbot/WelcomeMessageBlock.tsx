"use client";

import { memo } from "react";
import type { ReplyLanguage } from "@/lib/reply-language";
import { REPLY_LANGUAGE_OPTIONS } from "@/lib/reply-language";
import { NAV_CARDS, WELCOME_COPY } from "@/lib/fulife-chat";
import { SystemBubble } from "./SystemBubble";
import { WidgetButton } from "./WidgetButton";
import { WidgetButtonGroup } from "./WidgetButtonGroup";
import { LanguageFlag } from "./LanguageFlag";

interface WelcomeMessageBlockProps {
  language: ReplyLanguage;
  showActions?: boolean;
  onLanguageChange: (lang: ReplyLanguage) => void;
  onNavSelect: (prompt: string, simpleKey?: string, displayText?: string) => void;
  disabled?: boolean;
}

export const WelcomeMessageBlock = memo(function WelcomeMessageBlock({
  language,
  showActions = true,
  onLanguageChange,
  onNavSelect,
  disabled,
}: WelcomeMessageBlockProps) {
  const copy = WELCOME_COPY[language];
  const otherLanguages = REPLY_LANGUAGE_OPTIONS.filter(
    (option) => option.code !== language
  );

  return (
    <div className="pb-1">
      <SystemBubble>
        <p>{copy.greeting}</p>
      </SystemBubble>

      <SystemBubble>
        <p>{copy.perks}</p>
      </SystemBubble>

      {showActions && (
        <WidgetButtonGroup>
          {NAV_CARDS.map((card) => (
            <WidgetButton
              key={card.id}
              disabled={disabled}
              onClick={() => onNavSelect(card.prompt, card.id, card.title)}
            >
              {card.title}
            </WidgetButton>
          ))}

          {otherLanguages.map((option) => (
            <WidgetButton
              key={option.code}
              disabled={disabled}
              ariaLabel={`Switch to ${option.label}`}
              className="flex items-center justify-center !py-2 text-sm [&_img]:h-5 [&_img]:w-5"
              onClick={() => onLanguageChange(option.code)}
            >
              <LanguageFlag language={option.code} showLabel />
            </WidgetButton>
          ))}
        </WidgetButtonGroup>
      )}
    </div>
  );
});
