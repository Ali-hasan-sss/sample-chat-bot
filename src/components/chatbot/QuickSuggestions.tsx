"use client";

import { memo } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="px-3 pt-3 pb-2 bg-gradient-to-t from-background/80 to-transparent"
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-1">
        Quick messages
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {suggestions.map((suggestion, i) => (
          <motion.button
            key={suggestion}
            type="button"
            disabled={disabled}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(suggestion)}
            className="shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Badge
              variant="default"
              className="cursor-pointer hover:bg-primary/15 transition-all whitespace-nowrap text-xs px-3 py-1.5 shadow-md shadow-black/15"
            >
              {suggestion}
            </Badge>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
});
