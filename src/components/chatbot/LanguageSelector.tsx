"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import {
  REPLY_LANGUAGE_OPTIONS,
  type ReplyLanguage,
} from "@/lib/reply-language";
import { LanguageFlag } from "./LanguageFlag";

interface LanguageSelectorProps {
  value: ReplyLanguage;
  onChange: (lang: ReplyLanguage) => void;
  disabled?: boolean;
}

export const LanguageSelector = memo(function LanguageSelector({
  value,
  onChange,
  disabled,
}: LanguageSelectorProps) {
  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Reply language"
    >
      {REPLY_LANGUAGE_OPTIONS.map((option) => {
        const selected = value === option.code;
        return (
          <button
            key={option.code}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${option.label} — ${option.nativeLabel}`}
            title={`${option.label} · ${option.nativeLabel}`}
            disabled={disabled}
            onClick={() => onChange(option.code)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full p-0.5",
              "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
              selected
                ? "bg-primary/25 shadow-lg shadow-primary/30 scale-105"
                : "bg-white/10 shadow-md shadow-black/15 hover:bg-white/15 hover:shadow-lg"
            )}
          >
            <LanguageFlag language={option.code} size={22} />
          </button>
        );
      })}
    </div>
  );
});
