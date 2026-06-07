"use client";

import { cn } from "@/lib/utils";
import {
  REPLY_LANGUAGE_OPTIONS,
  TWEMOJI_FLAG_BASE,
  type ReplyLanguage,
} from "@/lib/reply-language";

interface LanguageFlagProps {
  language: ReplyLanguage;
  className?: string;
  showLabel?: boolean;
  size?: number;
}

export function LanguageFlag({
  language,
  className,
  showLabel = false,
  size = 18,
}: LanguageFlagProps) {
  const option = REPLY_LANGUAGE_OPTIONS.find((item) => item.code === language);

  if (!option) return null;

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 text-sm leading-none", className)}
    >
      <img
        src={`${TWEMOJI_FLAG_BASE}/${option.twemoji}.svg`}
        alt=""
        width={size}
        height={size}
        className="shrink-0 object-contain"
        draggable={false}
        loading="lazy"
        aria-hidden
      />
      {showLabel && <span>{option.nativeLabel}</span>}
    </span>
  );
}

export function getLanguageDisplay(language: ReplyLanguage): string {
  const option = REPLY_LANGUAGE_OPTIONS.find((item) => item.code === language);
  if (!option) return language;
  return `${option.flag} ${option.nativeLabel}`;
}
