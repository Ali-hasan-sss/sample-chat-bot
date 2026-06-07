"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatTheme } from "./ChatThemeContext";

export interface ChatInputHandle {
  refocusIfEngaged: () => void;
}

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isSending?: boolean;
}

export const ChatInput = memo(
  forwardRef<ChatInputHandle, ChatInputProps>(function ChatInput(
    { onSend, disabled, isSending },
    ref
  ) {
    const { theme } = useChatTheme();
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const userEngagedRef = useRef(false);
    const keepKeyboardRef = useRef(false);
    const wasSendingRef = useRef(false);

    const maintainFocus = useCallback(() => {
      if (!keepKeyboardRef.current) return;
      const el = textareaRef.current;
      if (!el) return;
      el.focus({ preventScroll: true });
      requestAnimationFrame(() => {
        el.focus({ preventScroll: true });
        window.setTimeout(() => el.focus({ preventScroll: true }), 50);
      });
    }, []);

    const refocusIfEngaged = useCallback(() => {
      if (!userEngagedRef.current) return;
      keepKeyboardRef.current = true;
      maintainFocus();
    }, [maintainFocus]);

    useImperativeHandle(ref, () => ({ refocusIfEngaged }));

    const handleSubmit = useCallback(() => {
      const trimmed = value.trim();
      if (!trimmed || disabled || isSending) return;
      userEngagedRef.current = true;
      keepKeyboardRef.current = true;
      onSend(trimmed);
      setValue("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      maintainFocus();
    }, [value, disabled, isSending, onSend, maintainFocus]);

    useEffect(() => {
      if (isSending && keepKeyboardRef.current) maintainFocus();
      if (wasSendingRef.current && !isSending && keepKeyboardRef.current) {
        maintainFocus();
      }
      wasSendingRef.current = Boolean(isSending);
    }, [isSending, maintainFocus]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    const preventBlur = useCallback((e: React.MouseEvent | React.PointerEvent) => {
      e.preventDefault();
      keepKeyboardRef.current = true;
      userEngagedRef.current = true;
    }, []);

    useEffect(() => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 100)}px`;
      }
    }, [value]);

    const canSend = value.trim() && !disabled && !isSending;

    return (
      <footer className="shrink-0 border-t border-[#EFEFEF] bg-white px-3 py-2.5">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              if (isSending) return;
              setValue(e.target.value);
            }}
            onFocus={(e) => {
              userEngagedRef.current = true;
              keepKeyboardRef.current = true;
              e.currentTarget.style.borderColor = theme.accentSoft;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#E0E0E0";
              window.setTimeout(() => {
                if (document.activeElement === textareaRef.current) return;
                if (keepKeyboardRef.current && isSending) {
                  maintainFocus();
                  return;
                }
                keepKeyboardRef.current = false;
                userEngagedRef.current = false;
              }, 100);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={disabled}
            rows={1}
            enterKeyHint="send"
            className={cn(
              "flex-1 resize-none rounded-lg border border-[#E0E0E0] bg-white px-3 py-2 text-sm text-[#2B2B2B] chat-message-text",
              "placeholder:text-[#9B9B9B] focus:outline-none disabled:opacity-50 max-h-[100px] overflow-y-auto scrollbar-none",
              isSending && "opacity-80"
            )}
          />

          <button
            type="button"
            onClick={handleSubmit}
            onMouseDown={preventBlur}
            onPointerDown={preventBlur}
            onTouchEnd={(e) => {
              e.preventDefault();
              maintainFocus();
            }}
            disabled={!canSend}
            aria-label="Send message"
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-opacity",
              canSend ? "opacity-100" : "opacity-35 cursor-not-allowed"
            )}
            style={{ backgroundColor: theme.accent }}
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </footer>
    );
  })
);
