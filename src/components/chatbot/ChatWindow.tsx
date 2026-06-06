"use client";

import { useRef, useEffect, useCallback, memo } from "react";
import { Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChatMessageBubble } from "./ChatMessage";
import { ChatInput, type ChatInputHandle } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickSuggestions } from "./QuickSuggestions";
import { useChat, QUICK_SUGGESTIONS } from "@/features/chat/useChat";
import { useAiSpeech } from "@/hooks/useAiSpeech";

interface ChatWindowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChatWindow = memo(function ChatWindow({
  open,
  onOpenChange,
}: ChatWindowProps) {
  const { messages, status, error, sendMessage, sendVoiceMessage, clearConversation, isLoaded } =
    useChat();
  const { supported: ttsSupported, speakingId, loadingId, speak } =
    useAiSpeech();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<ChatInputHandle>(null);
  const autoSpokenRef = useRef<Set<string>>(new Set());

  const scrollToBottom = useCallback((instant = false) => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({
        behavior: instant ? "instant" : "smooth",
        block: "end",
      });
    });
  }, []);

  useEffect(() => {
    if (!open || !isLoaded) return;
    scrollToBottom(true);
  }, [open, isLoaded, messages, status, scrollToBottom]);

  useEffect(() => {
    if (open && isLoaded && status === "idle") {
      inputRef.current?.focus();
    }
  }, [open, isLoaded, status]);

  useEffect(() => {
    if (status !== "idle" || messages.length < 2) return;

    const last = messages[messages.length - 1];
    if (last.role !== "assistant" || !last.replyWithVoice) return;
    if (autoSpokenRef.current.has(last.id)) return;

    autoSpokenRef.current.add(last.id);
    speak(last.content, last.id);
  }, [messages, status, speak]);

  const handleQuickSuggestion = useCallback(
    (text: string) => {
      sendMessage(text);
      inputRef.current?.focus();
    },
    [sendMessage]
  );

  const isLoading = status === "loading";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-0 sm:max-w-md">
        <SheetHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between pr-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <SheetTitle>Meridian Assistant</SheetTitle>
                <p className="text-xs text-muted-foreground">
                  AI · Grand Meridian Hotel
                </p>
              </div>
            </div>
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  autoSpokenRef.current.clear();
                  clearConversation();
                }}
                aria-label="Clear conversation"
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SheetHeader>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto py-4 space-y-1 scrollbar-none"
        >
          {!isLoaded ? (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
              Loading conversation...
            </div>
          ) : messages.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Welcome to Grand Meridian Hotel
              </p>
              <p className="text-xs text-muted-foreground/70 mb-1">
                مرحباً بك في فندق Grand Meridian
              </p>
              <p className="text-xs text-muted-foreground/70">
                Speak with the mic — your words appear as text and the assistant
                replies with AI voice.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                تحدّث بالميكrophone — يُحوَّل صوتك لنص ويردّ المساعد بصوت ذكاء
                اصطناعي.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessageBubble
                key={msg.id}
                message={msg}
                speak={speak}
                isSpeaking={speakingId === msg.id}
                isLoadingVoice={loadingId === msg.id}
                ttsSupported={ttsSupported}
              />
            ))
          )}

          {isLoading && (
            <div className="px-4 py-2">
              <TypingIndicator />
            </div>
          )}

          {error && (
            <div className="mx-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div ref={bottomRef} aria-hidden className="h-px shrink-0" />
        </div>

        {isLoaded && (
          <QuickSuggestions
            suggestions={QUICK_SUGGESTIONS}
            onSelect={handleQuickSuggestion}
            disabled={isLoading}
          />
        )}

        <ChatInput
          ref={inputRef}
          onSend={sendMessage}
          onVoiceMessage={sendVoiceMessage}
          disabled={isLoading || !isLoaded}
          isSending={isLoading}
        />
      </SheetContent>
    </Sheet>
  );
});
