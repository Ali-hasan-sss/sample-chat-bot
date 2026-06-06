"use client";

import { useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatAvatar, AVATARS } from "./ChatAvatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChatMessageBubble } from "./ChatMessage";
import { ChatInput, type ChatInputHandle } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickSuggestions } from "./QuickSuggestions";
import { LanguageSelector } from "./LanguageSelector";
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
  const {
    messages,
    status,
    error,
    sendMessage,
    sendVoiceMessage,
    clearConversation,
    isLoaded,
    replyLanguage,
    setReplyLanguage,
  } = useChat();
  const { supported: ttsSupported, speakingId, loadingId, speak } =
    useAiSpeech();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<ChatInputHandle>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    if (!open || !isLoaded) return;
    scrollToBottom();
  }, [open, isLoaded, messages, status, scrollToBottom]);

  const handleQuickSuggestion = useCallback(
    (text: string) => {
      sendMessage(text);
      inputRef.current?.refocusIfEngaged();
    },
    [sendMessage]
  );

  const isLoading = status === "loading";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        hideClose
        className="p-0 gap-0 overflow-hidden sm:my-4 sm:mr-4 sm:h-[calc(100%-2rem)] sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl sm:inset-y-auto sm:top-4 sm:bottom-4 sm:right-4 sm:left-auto shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-32 -left-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <SheetHeader className="relative pb-4 pt-5 px-5 bg-gradient-to-r from-primary/10 via-background/80 to-violet-500/10 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.2)] rounded-b-2xl mx-2 mt-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <ChatAvatar
                src={AVATARS.assistant}
                alt="Meridian Assistant"
                size="md"
                online
              />
              <div className="min-w-0">
                <SheetTitle className="flex items-center gap-2">
                  Meridian Assistant
                  <Sparkles className="h-3.5 w-3.5 text-primary/80" />
                </SheetTitle>
                <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Online · متصل
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    Reply in
                  </span>
                  <LanguageSelector
                    value={replyLanguage}
                    onChange={setReplyLanguage}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => clearConversation()}
                  aria-label="Clear conversation"
                  className="h-8 w-8 rounded-xl hover:bg-red-500/10 hover:text-red-400 shadow-sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close chat"
                  className="h-8 w-8 rounded-xl hover:bg-white/10 shadow-sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetHeader>

        <div
          ref={scrollRef}
          className="relative flex-1 overflow-y-auto py-4 space-y-0.5 scrollbar-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.04), transparent 50%)",
          }}
        >
          {!isLoaded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-32 text-sm text-muted-foreground"
            >
              Loading conversation...
            </motion.div>
          ) : messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="px-6 py-10 text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shadow-lg shadow-primary/15"
              >
                <Sparkles className="h-6 w-6 text-primary" />
              </motion.div>
              <p className="text-sm font-medium text-foreground mb-1">
                Welcome to Grand Meridian Hotel
              </p>
              <p className="text-xs text-muted-foreground/80 mb-1">
                مرحباً بك في فندق Grand Meridian
              </p>
              <p className="text-xs text-muted-foreground/70 max-w-[260px] mx-auto leading-relaxed">
                Hold the mic to send a voice message — the assistant replies
                with a voice message too.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2 max-w-[260px] mx-auto leading-relaxed">
                اضغط مطولاً على الميكروفون — يردّ المساعد برسالة صوتية مباشرة.
              </p>
            </motion.div>
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

          <AnimatePresence>
            {isLoading && <TypingIndicator key="typing" />}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.96 }}
                className="mx-4 mt-2 rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-300 shadow-lg shadow-red-500/10"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
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
          disabled={!isLoaded}
          isSending={isLoading}
        />
      </SheetContent>
    </Sheet>
  );
});
