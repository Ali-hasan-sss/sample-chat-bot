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
import { Send, Mic, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useVoiceInput } from "@/hooks/useVoiceInput";

export interface ChatInputHandle {
  /** Only refocus if the user had already focused the input */
  refocusIfEngaged: () => void;
}

interface ChatInputProps {
  onSend: (message: string) => void;
  onVoiceMessage: (blob: Blob, duration: number) => void;
  disabled?: boolean;
  isSending?: boolean;
}

const CANCEL_DRAG_PX = 72;

export const ChatInput = memo(
  forwardRef<ChatInputHandle, ChatInputProps>(function ChatInput(
    { onSend, onVoiceMessage, disabled, isSending },
    ref
  ) {
    const [value, setValue] = useState("");
    const [voiceError, setVoiceError] = useState<string | null>(null);
    const [isHolding, setIsHolding] = useState(false);
    const [isCancelActive, setIsCancelActive] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const micRef = useRef<HTMLButtonElement>(null);
    const pointerStartRef = useRef({ x: 0, y: 0 });
    const holdingRef = useRef(false);
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
      if (!userEngagedRef.current || !textareaRef.current) return;
      keepKeyboardRef.current = true;
      maintainFocus();
    }, [maintainFocus]);

    useImperativeHandle(ref, () => ({
      refocusIfEngaged,
    }));

    const handleVoiceMessage = useCallback(
      (blob: Blob, duration: number) => {
        setVoiceError(null);
        userEngagedRef.current = false;
        keepKeyboardRef.current = false;
        onVoiceMessage(blob, duration);
      },
      [onVoiceMessage]
    );

    const {
      supported,
      isRecording,
      isProcessing,
      isBusy,
      recordingDuration,
      beginRecording,
      finishRecording,
      cancelRecording,
    } = useVoiceInput({
      onVoiceMessage: handleVoiceMessage,
      onError: setVoiceError,
    });

    const handleSubmit = useCallback(() => {
      const trimmed = value.trim();
      if (!trimmed || disabled || isSending) return;

      userEngagedRef.current = true;
      keepKeyboardRef.current = true;
      onSend(trimmed);
      setValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      maintainFocus();
    }, [value, disabled, isSending, onSend, maintainFocus]);

    useEffect(() => {
      if (isSending && keepKeyboardRef.current) {
        maintainFocus();
      }
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

    const resetHoldState = useCallback(() => {
      holdingRef.current = false;
      setIsHolding(false);
      setIsCancelActive(false);
    }, []);

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled || isSending || isProcessing || isBusy) return;
        e.preventDefault();
        userEngagedRef.current = false;
        keepKeyboardRef.current = false;
        holdingRef.current = true;
        setIsHolding(true);
        setIsCancelActive(false);
        pointerStartRef.current = { x: e.clientX, y: e.clientY };
        micRef.current?.setPointerCapture(e.pointerId);
        textareaRef.current?.blur();
        beginRecording();
      },
      [disabled, isSending, isProcessing, isBusy, beginRecording]
    );

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
      if (!holdingRef.current) return;
      const dx = pointerStartRef.current.x - e.clientX;
      const dy = pointerStartRef.current.y - e.clientY;
      setIsCancelActive(dx > CANCEL_DRAG_PX || dy > CANCEL_DRAG_PX);
    }, []);

    const handlePointerUp = useCallback(
      (e: React.PointerEvent) => {
        if (!holdingRef.current) return;
        micRef.current?.releasePointerCapture(e.pointerId);

        const dx = pointerStartRef.current.x - e.clientX;
        const dy = pointerStartRef.current.y - e.clientY;
        const shouldCancel = dx > CANCEL_DRAG_PX || dy > CANCEL_DRAG_PX;

        if (shouldCancel) {
          cancelRecording();
        } else {
          finishRecording();
        }
        resetHoldState();
      },
      [cancelRecording, finishRecording, resetHoldState]
    );

    const handlePointerCancel = useCallback(
      (e: React.PointerEvent) => {
        if (!holdingRef.current) return;
        micRef.current?.releasePointerCapture(e.pointerId);
        cancelRecording();
        resetHoldState();
      },
      [cancelRecording, resetHoldState]
    );

    const preventBlur = useCallback((e: React.MouseEvent | React.PointerEvent) => {
      e.preventDefault();
      keepKeyboardRef.current = true;
      userEngagedRef.current = true;
    }, []);

    useEffect(() => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
      }
    }, [value]);

    const showRecordUi = isHolding || isRecording;
    const textareaLocked = disabled || isBusy || isProcessing || showRecordUi;

    return (
      <div className="relative p-4 pt-2 bg-gradient-to-t from-background via-background/95 to-transparent">
        {showRecordUi && (
          <div className="absolute inset-x-0 bottom-full mb-1 px-4 pb-2 pointer-events-none">
            <div className="flex items-center justify-between rounded-2xl bg-background/95 backdrop-blur-md px-4 py-3 shadow-xl shadow-black/30">
              <div
                className={cn(
                  "flex items-center gap-2 transition-all duration-150",
                  isCancelActive
                    ? "scale-110 text-red-500"
                    : "text-muted-foreground"
                )}
              >
                <Trash2 className="h-5 w-5" />
                <span className="text-lg tracking-widest">...</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                <span className="tabular-nums">{recordingDuration}s</span>
              </div>
            </div>
          </div>
        )}

        {voiceError && (
          <p className="mb-2 text-xs text-red-400 px-1">{voiceError}</p>
        )}

        <div className="flex items-end gap-2 rounded-2xl bg-white/[0.05] p-2 shadow-lg shadow-black/20">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              if (isSending) return;
              setValue(e.target.value);
            }}
            onFocus={() => {
              userEngagedRef.current = true;
              keepKeyboardRef.current = true;
            }}
            onBlur={() => {
              if (showRecordUi) return;
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
            placeholder="Type a message or hold mic..."
            disabled={textareaLocked}
            rows={1}
            enterKeyHint="send"
            className={cn(
              "flex-1 resize-none rounded-xl bg-white/[0.06] px-4 py-2.5 text-sm",
              "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
              "disabled:opacity-50 disabled:cursor-not-allowed max-h-[120px]",
              "overflow-y-auto scrollbar-none transition-all duration-200",
              "shadow-inner shadow-black/10",
              isSending && "opacity-80",
              showRecordUi && "ring-2 ring-primary/25 shadow-md shadow-primary/10"
            )}
          />
          {supported && (
            <Button
              ref={micRef}
              type="button"
              size="icon"
              variant={showRecordUi ? "default" : "outline"}
              disabled={disabled || isSending || isProcessing}
              aria-label="Hold to record voice message"
              className={cn(
                "touch-none select-none",
                showRecordUi &&
                  "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 scale-110",
                isCancelActive && "bg-red-500 hover:bg-red-600 border-red-500"
              )}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="icon"
            onClick={handleSubmit}
            onMouseDown={preventBlur}
            onPointerDown={preventBlur}
            onTouchEnd={(e) => {
              e.preventDefault();
              maintainFocus();
            }}
            disabled={disabled || isSending || showRecordUi || isBusy || !value.trim()}
            aria-label="Send message"
            className={cn(
              value.trim() &&
                !disabled &&
                !isSending &&
                "shadow-lg shadow-primary/30"
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  })
);
