"use client";

import { useRef, useEffect, useCallback, memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessageBubble } from "./ChatMessage";
import { ChatInput, type ChatInputHandle } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickSuggestions } from "./QuickSuggestions";
import { WelcomeMessageBlock } from "./WelcomeMessageBlock";
import { FlagUserBubble } from "./FlagUserBubble";
import { useChat } from "@/features/chat/useChat";
import { FU, FU_BOOK_URL } from "@/lib/fulife-theme";
import type { ReplyLanguage } from "@/lib/reply-language";
import {
  getSimpleAnswer,
  QUICK_SUGGESTIONS,
  getQuickSuggestionLabel,
} from "@/lib/fulife-chat";

type WelcomeSegment =
  | { id: string; type: "welcome"; lang: ReplyLanguage }
  | { id: string; type: "lang-switch"; lang: ReplyLanguage };

let segmentCounter = 0;
function createSegment(
  segment: Omit<WelcomeSegment, "id">
): WelcomeSegment {
  segmentCounter += 1;
  return { ...segment, id: `${segment.type}-${segmentCounter}` };
}

interface ChatPanelProps {
  variant?: "sheet" | "expanded";
  onClose?: () => void;
  onExpand?: () => void;
}

export const ChatPanel = memo(function ChatPanel({
  variant = "sheet",
  onClose,
  onExpand,
}: ChatPanelProps) {
  const {
    messages,
    status,
    error,
    sendMessage,
    sendSimpleExchange,
    clearConversation,
    isLoaded,
    replyLanguage,
    setReplyLanguage,
  } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<ChatInputHandle>(null);
  const [welcomeSegments, setWelcomeSegments] = useState<WelcomeSegment[]>(() => [
    createSegment({ type: "welcome", lang: replyLanguage }),
  ]);
  const [conversationLangSwitches, setConversationLangSwitches] = useState<
    { id: string; lang: ReplyLanguage }[]
  >([]);

  const hasConversation = messages.length > 0;
  const isExpanded = variant === "expanded";
  const isLoading = status === "loading";

  const lastWelcomeIndex = welcomeSegments.reduce(
    (last, segment, index) => (segment.type === "welcome" ? index : last),
    -1
  );

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    scrollToBottom();
  }, [isLoaded, messages, status, welcomeSegments, conversationLangSwitches, scrollToBottom]);

  const handleSend = useCallback(
    (text: string) => {
      sendMessage(text);
      inputRef.current?.refocusIfEngaged();
    },
    [sendMessage]
  );

  const handleNavSelect = useCallback(
    (prompt: string, simpleKey?: string) => {
      if (simpleKey) {
        const answer = getSimpleAnswer(simpleKey, replyLanguage);
        if (answer) {
          sendSimpleExchange(prompt, answer);
          return;
        }
      }
      sendMessage(prompt);
    },
    [replyLanguage, sendSimpleExchange, sendMessage]
  );

  const handleQuickSuggestion = useCallback(
    (id: string) => {
      const item = QUICK_SUGGESTIONS.find((s) => s.id === id);
      if (item?.href) {
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }

      const userText = getQuickSuggestionLabel(id, replyLanguage);
      const answer = getSimpleAnswer(id, replyLanguage);
      if (answer) {
        sendSimpleExchange(userText, answer);
      }
    },
    [replyLanguage, sendSimpleExchange]
  );

  const handleLanguageChange = useCallback(
    (lang: ReplyLanguage) => {
      if (lang === replyLanguage || isLoading) return;

      if (hasConversation) {
        setConversationLangSwitches((prev) => [
          ...prev,
          { id: createSegment({ type: "lang-switch", lang }).id, lang },
        ]);
        setReplyLanguage(lang);
        return;
      }

      setWelcomeSegments((prev) => [
        ...prev,
        createSegment({ type: "lang-switch", lang }),
        createSegment({ type: "welcome", lang }),
      ]);
      setReplyLanguage(lang);
    },
    [replyLanguage, isLoading, setReplyLanguage, hasConversation]
  );

  const handleClear = useCallback(async () => {
    await clearConversation();
    setConversationLangSwitches([]);
    setWelcomeSegments([
      createSegment({ type: "welcome", lang: replyLanguage }),
    ]);
  }, [clearConversation, replyLanguage]);

  const handleExpand = useCallback(() => {
    if (onExpand) {
      onExpand();
      return;
    }
    window.open(`${window.location.origin}/chat`, "_blank", "noopener,noreferrer");
  }, [onExpand]);

  const lastMessage = messages[messages.length - 1];
  const showQuickSuggestions =
    hasConversation &&
    !isLoading &&
    lastMessage?.role === "assistant";

  const shellClass = isExpanded
    ? "flex h-dvh w-full flex-col bg-white text-[#2B2B2B]"
    : "flex h-full min-h-0 flex-col bg-white text-[#2B2B2B]";

  return (
    <div className={shellClass}>
      <header className="flex items-center justify-between gap-2 px-4 py-3 shrink-0 border-b border-[#EFEFEF] bg-white">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="flex h-9 items-center justify-center rounded-md px-2.5 text-white text-xs font-bold tracking-wide"
            style={{ backgroundColor: FU.orange }}
          >
            Berlin
          </div>
          <span className="text-sm font-medium text-[#2B2B2B] truncate">
            FU.life
          </span>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {!isExpanded && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExpand}
              aria-label="Expand chat"
              className="h-8 w-8 text-[#6B6B6B] hover:bg-[#EFEFEF] rounded-lg"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
          {hasConversation && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => void handleClear()}
              aria-label="Clear conversation"
              className="h-8 w-8 text-[#6B6B6B] hover:bg-[#EFEFEF] rounded-lg"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close chat"
              className="h-8 w-8 text-[#6B6B6B] hover:bg-[#EFEFEF] rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </header>

      <div
        ref={scrollRef}
        className="relative flex-1 overflow-y-auto scrollbar-none bg-white"
      >
        {!isLoaded ? (
          <p className="flex items-center justify-center h-32 text-sm text-[#6B6B6B]">
            Loading...
          </p>
        ) : (
          <div className="pt-2 pb-1">
            {welcomeSegments.map((segment, index) => {
              if (segment.type === "lang-switch") {
                return (
                  <FlagUserBubble key={segment.id} language={segment.lang} />
                );
              }
              return (
                <WelcomeMessageBlock
                  key={segment.id}
                  language={segment.lang}
                  showActions={!hasConversation && index === lastWelcomeIndex}
                  onLanguageChange={handleLanguageChange}
                  onNavSelect={handleNavSelect}
                  disabled={isLoading}
                />
              );
            })}

            {hasConversation && (
              <div className="py-1">
                {messages.map((msg) => (
                  <ChatMessageBubble key={msg.id} message={msg} />
                ))}
                {conversationLangSwitches.map((segment) => (
                  <FlagUserBubble
                    key={segment.id}
                    language={segment.lang}
                  />
                ))}
              </div>
            )}

            {showQuickSuggestions && (
              <QuickSuggestions
                suggestions={QUICK_SUGGESTIONS}
                onSelect={handleQuickSuggestion}
                replyLanguage={replyLanguage}
                onLanguageChange={handleLanguageChange}
                showLanguageFlags
                disabled={isLoading}
              />
            )}
          </div>
        )}

        <AnimatePresence>
          {isLoading && <TypingIndicator key="typing" />}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-4 mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {!hasConversation && isLoaded && (
          <p className="px-4 py-3 text-[10px] leading-relaxed text-[#9B9B9B]">
            By using this chat you agree to our{" "}
            <a
              href="https://fu.life/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#6B6B6B]"
            >
              privacy policy
            </a>
            .
          </p>
        )}
      </div>

      {!hasConversation && isLoaded && (
        <div className="shrink-0 px-3 pb-2">
          <a
            href={FU_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-lg py-2.5 text-sm font-medium text-white"
            style={{ backgroundColor: FU.orange }}
          >
            Book Now
          </a>
        </div>
      )}

      <ChatInput
        ref={inputRef}
        onSend={handleSend}
        disabled={!isLoaded}
        isSending={isLoading}
      />
    </div>
  );
});
