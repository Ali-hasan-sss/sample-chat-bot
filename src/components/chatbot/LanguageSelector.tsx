"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import {
  REPLY_LANGUAGE_OPTIONS,
  type ReplyLanguage,
} from "@/lib/reply-language";
import { LanguageFlag } from "./LanguageFlag";
import { FU } from "@/lib/fulife-theme";

interface LanguageSelectorProps {
  value: ReplyLanguage;
  onChange: (lang: ReplyLanguage) => void;
  disabled?: boolean;
  variant?: "default" | "header";
}

export const LanguageSelector = memo(function LanguageSelector({
  value,
  onChange,
  disabled,
  variant = "default",
}: LanguageSelectorProps) {
  const isHeader = variant === "header";

  return (
    <div
      className="flex items-center gap-1.5"
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
              "rounded-full px-2.5 py-1 text-xs transition-all duration-200 disabled:opacity-50",
              isHeader
                ? selected
                  ? "bg-white text-[#2B2B2B] shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
                : selected
                  ? "shadow-md"
                  : "shadow-sm hover:shadow-md"
            )}
            style={
              !isHeader
                ? {
                    backgroundColor: selected ? FU.lightGray : "#fff",
                  }
                : undefined
            }
          >
            <LanguageFlag language={option.code} showLabel />
          </button>
        );
      })}
    </div>
  );
});
