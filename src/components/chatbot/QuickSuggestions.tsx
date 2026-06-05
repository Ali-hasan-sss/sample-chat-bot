"use client";

import { memo } from "react";
import { Badge } from "@/components/ui/badge";

interface QuickSuggestionsProps {
  suggestions: readonly string[];
  onSelect: (suggestion: string) => void;
  disabled?: boolean;
}

export const QuickSuggestions = memo(function QuickSuggestions({
  suggestions,
  onSelect,
  disabled,
}: QuickSuggestionsProps) {
  return (
    <div className="border-t border-white/10 px-3 pt-3 pb-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-1">
        Quick messages
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(suggestion)}
            className="shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Badge
              variant="default"
              className="cursor-pointer hover:bg-white/15 transition-colors whitespace-nowrap text-xs px-3 py-1.5"
            >
              {suggestion}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
});
