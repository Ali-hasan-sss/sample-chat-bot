"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = memo(function ChatInput({
  onSend,
  disabled,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }, [value]);

  return (
    <div className="flex items-end gap-2 border-t border-white/10 p-4">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about our hotel..."
        disabled={disabled}
        rows={1}
        className={cn(
          "flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm",
          "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50",
          "disabled:opacity-50 disabled:cursor-not-allowed max-h-[120px]",
          "overflow-y-auto scrollbar-none"
        )}
      />
      <Button
        size="icon"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        {disabled ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
});
