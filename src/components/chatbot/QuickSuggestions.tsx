"use client";

import { memo, useMemo } from "react";
import type { ReplyLanguage } from "@/lib/reply-language";
import { REPLY_LANGUAGE_OPTIONS } from "@/lib/reply-language";
import type { QuickSuggestionDef } from "@/lib/fulife-chat";
import { WidgetButton } from "./WidgetButton";
import { WidgetButtonGroup } from "./WidgetButtonGroup";
import { LanguageFlag } from "./LanguageFlag";
import { FU } from "@/lib/fulife-theme";

interface QuickSuggestionsProps {
  suggestions: readonly QuickSuggestionDef[];
  replyLanguage: ReplyLanguage;
  onSelect: (id: string) => void;
  onLanguageChange: (lang: ReplyLanguage) => void;
  showLanguageFlags?: boolean;
  disabled?: boolean;
}

export const QuickSuggestions = memo(function QuickSuggestions({
  suggestions,
  replyLanguage,
  onSelect,
  onLanguageChange,
  showLanguageFlags = false,
  disabled,
}: QuickSuggestionsProps) {
  const otherLanguages = useMemo(
    () => REPLY_LANGUAGE_OPTIONS.filter((option) => option.code !== replyLanguage),
    [replyLanguage]
  );

  return (
    <WidgetButtonGroup layout="inline">
      {suggestions.map((item) => (
        <WidgetButton
          key={item.id}
          fullWidth={false}
          disabled={disabled}
          className={item.id === "book" ? "font-medium hover:opacity-90" : undefined}
          style={item.id === "book" ? { backgroundColor: FU.orange, color: "#fff", borderColor: FU.orange } : undefined}
          onClick={() => onSelect(item.id)}
        >
          {item.label[replyLanguage] ?? item.label.en}
        </WidgetButton>
      ))}

      {showLanguageFlags &&
        otherLanguages.map((option) => (
          <WidgetButton
            key={option.code}
            fullWidth={false}
            disabled={disabled}
            ariaLabel={`Switch to ${option.label}`}
            className="flex items-center justify-center !px-2.5 !py-1.5"
            onClick={() => onLanguageChange(option.code)}
          >
            <LanguageFlag language={option.code} size={20} />
          </WidgetButton>
        ))}
    </WidgetButtonGroup>
  );
});
