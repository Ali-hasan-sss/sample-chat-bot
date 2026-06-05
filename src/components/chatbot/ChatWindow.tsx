"use client";

import { useRef, useEffect, memo } from "react";
import { Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChatMessageBubble } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickSuggestions } from "./QuickSuggestions";
import { useChat, QUICK_SUGGESTIONS } from "@/features/chat/useChat";

interface ChatWindowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChatWindow = memo(function ChatWindow({
  open,
  onOpenChange,
}: ChatWindowProps) {
  const { messages, status, error, sendMessage, clearConversation, isLoaded } =
    useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

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
                onClick={clearConversation}
                aria-label="Clear conversation"
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SheetHeader>

        <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-1">
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
                Ask about meals, rooms, wellness, or hotel services — in any language.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessageBubble key={msg.id} message={msg} />
            ))
          )}

          {status === "loading" && <TypingIndicator />}

          {error && (
            <div className="mx-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </div>

        {isLoaded && (
          <QuickSuggestions
            suggestions={QUICK_SUGGESTIONS}
            onSelect={sendMessage}
            disabled={status === "loading"}
          />
        )}

        <ChatInput
          onSend={sendMessage}
          disabled={status === "loading" || !isLoaded}
        />
      </SheetContent>
    </Sheet>
  );
});
