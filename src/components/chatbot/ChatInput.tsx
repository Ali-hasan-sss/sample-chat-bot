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
  focus: () => void;
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

    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
    }));

    const handleVoiceMessage = useCallback(
      (blob: Blob, duration: number) => {
        setVoiceError(null);
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

    const refocusInput = useCallback(() => {
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }, []);

    const handleSubmit = useCallback(() => {
      const trimmed = value.trim();
      if (!trimmed || disabled || isSending) return;
      onSend(trimmed);
      setValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      refocusInput();
    }, [value, disabled, isSending, onSend, refocusInput]);

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
        holdingRef.current = true;
        setIsHolding(true);
        setIsCancelActive(false);
        pointerStartRef.current = { x: e.clientX, y: e.clientY };
        micRef.current?.setPointerCapture(e.pointerId);
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

    useEffect(() => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
      }
    }, [value]);

    const showRecordUi = isHolding || isRecording;
    const inputDisabled = disabled || isBusy || isSending || isProcessing;

    return (
      <div className="relative border-t border-white/10 p-4">
        {showRecordUi && (
          <div className="absolute inset-x-0 bottom-full mb-1 px-4 pb-2 pointer-events-none">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-background/95 backdrop-blur-md px-4 py-3 shadow-lg">
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

        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message or hold mic..."
            disabled={inputDisabled || showRecordUi}
            rows={1}
            className={cn(
              "flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm",
              "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50",
              "disabled:opacity-50 disabled:cursor-not-allowed max-h-[120px]",
              "overflow-y-auto scrollbar-none",
              showRecordUi && "border-primary/40 ring-1 ring-primary/30"
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
            disabled={inputDisabled || showRecordUi || !value.trim()}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  })
);
