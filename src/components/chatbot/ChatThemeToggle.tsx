"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { CHAT_THEMES, type ChatThemeId } from "@/lib/chat-theme";
import { useChatTheme } from "./ChatThemeContext";

const THEME_ORDER: ChatThemeId[] = ["orange", "green"];

export const ChatThemeToggle = memo(function ChatThemeToggle() {
  const { themeId, setThemeId } = useChatTheme();

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Chat color theme"
    >
      {THEME_ORDER.map((id) => {
        const selected = themeId === id;
        const color = CHAT_THEMES[id].accent;

        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={id === "orange" ? "Orange theme" : "Green theme"}
            onClick={() => setThemeId(id)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              selected ? "bg-[#EFEFEF]" : "hover:bg-[#F5F5F5]"
            )}
          >
            <span
              className={cn(
                "rounded-full transition-transform",
                selected ? "h-3.5 w-3.5 ring-2 ring-offset-1" : "h-3 w-3"
              )}
              style={{
                backgroundColor: color,
                ...(selected
                  ? ({ ringColor: color } as React.CSSProperties)
                  : {}),
              }}
            />
          </button>
        );
      })}
    </div>
  );
});
