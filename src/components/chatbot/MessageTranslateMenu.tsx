"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  REPLY_LANGUAGE_OPTIONS,
  type ReplyLanguage,
} from "@/lib/reply-language";

interface MessageTranslateMenuProps {
  activeLanguage: ReplyLanguage | null;
  loadingLanguage: ReplyLanguage | null;
  onSelect: (lang: ReplyLanguage) => void;
  align?: "start" | "end";
  disabled?: boolean;
}

export const MessageTranslateMenu = memo(function MessageTranslateMenu({
  activeLanguage,
  loadingLanguage,
  onSelect,
  align = "start",
  disabled,
}: MessageTranslateMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open]);

  const handleSelect = useCallback(
    (lang: ReplyLanguage) => {
      onSelect(lang);
      setOpen(false);
    },
    [onSelect]
  );

  const isLoading = loadingLanguage !== null;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled || isLoading}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-1 text-[10px] px-1 py-0.5 rounded transition-colors disabled:opacity-50",
          open || activeLanguage
            ? "text-primary"
            : "text-muted-foreground hover:text-primary"
        )}
        aria-label="Translate message"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {isLoading ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Languages className="h-3 w-3" />
        )}
        Translate
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute bottom-full z-50 mb-1 flex items-center gap-1 rounded-2xl",
            "bg-background/95 backdrop-blur-md p-1.5 shadow-xl shadow-black/35",
            align === "end" ? "right-0" : "left-0"
          )}
        >
          {REPLY_LANGUAGE_OPTIONS.map((option) => {
            const selected = activeLanguage === option.code;
            const loading = loadingLanguage === option.code;

            return (
              <button
                key={option.code}
                type="button"
                role="menuitem"
                title={`${option.label} · ${option.nativeLabel}`}
                aria-label={`Translate to ${option.label}`}
                disabled={isLoading}
                onClick={() => handleSelect(option.code)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-sm leading-none",
                  "transition-all disabled:opacity-50",
                  selected
                    ? "bg-primary/25 shadow-md shadow-primary/25"
                    : "bg-white/10 shadow-sm shadow-black/15 hover:bg-white/15"
                )}
              >
                {loading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <span aria-hidden>{option.flag}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});
