"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Loader2, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatAssistantReply } from "@/lib/sanitize";
import type { ChatMessage } from "@/types/chat";
import type { ReplyLanguage } from "@/lib/reply-language";
import { translateMessage } from "@/services/translation-service";
import { VoiceMessagePlayer } from "./VoiceMessagePlayer";
import { ChatAvatar, AVATARS } from "./ChatAvatar";
import { MessageTranslateMenu } from "./MessageTranslateMenu";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  speak?: (text: string, messageId: string) => void;
  isSpeaking?: boolean;
  isLoadingVoice?: boolean;
  ttsSupported?: boolean;
}

function getSourceText(message: ChatMessage, isUser: boolean): string {
  if (message.type === "audio") {
    return message.transcript || message.content || "";
  }
  return isUser ? message.content : formatAssistantReply(message.content);
}

export const ChatMessageBubble = memo(function ChatMessageBubble({
  message,
  speak,
  isSpeaking = false,
  isLoadingVoice = false,
  ttsSupported = false,
}: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const isAudio = message.type === "audio";
  const sourceText = useMemo(
    () => getSourceText(message, isUser),
    [message, isUser]
  );

  const [activeLanguage, setActiveLanguage] = useState<ReplyLanguage | null>(
    null
  );
  const [translations, setTranslations] = useState<
    Partial<Record<ReplyLanguage, string>>
  >({});
  const [loadingLanguage, setLoadingLanguage] =
    useState<ReplyLanguage | null>(null);
  const [translateError, setTranslateError] = useState<string | null>(null);

  const displayText =
    activeLanguage && translations[activeLanguage]
      ? translations[activeLanguage]
      : sourceText;

  const showText = isAudio
    ? isUser
      ? Boolean(displayText) || !sourceText
      : Boolean(displayText) || activeLanguage !== null
    : Boolean(displayText);

  const handleTranslate = useCallback(
    async (lang: ReplyLanguage) => {
      if (!sourceText) return;

      if (activeLanguage === lang) {
        setActiveLanguage(null);
        setTranslateError(null);
        return;
      }

      if (translations[lang]) {
        setActiveLanguage(lang);
        setTranslateError(null);
        return;
      }

      setLoadingLanguage(lang);
      setTranslateError(null);

      try {
        const translation = await translateMessage(sourceText, lang);
        setTranslations((prev) => ({ ...prev, [lang]: translation }));
        setActiveLanguage(lang);
      } catch (err) {
        setTranslateError(
          err instanceof Error ? err.message : "Could not translate."
        );
      } finally {
        setLoadingLanguage(null);
      }
    },
    [activeLanguage, sourceText, translations]
  );

  const canTranslate = Boolean(sourceText);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
        x: isUser ? 24 : -24,
        scale: 0.94,
      }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 28,
        mass: 0.8,
      }}
      className={cn(
        "flex gap-2.5 px-4 py-1.5",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 22,
          delay: 0.05,
        }}
      >
        <ChatAvatar
          src={isUser ? AVATARS.guest : AVATARS.assistant}
          alt={isUser ? "Guest" : " Assistant"}
          size="sm"
          online={!isUser}
        />
      </motion.div>
      <div className="flex flex-col gap-1 max-w-[85%]">
        <motion.div
          layout
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-md bg-gradient-to-br from-primary to-cyan-400/90 text-primary-foreground shadow-lg shadow-primary/25"
              : "rounded-tl-md bg-white/[0.08] shadow-lg shadow-black/25 backdrop-blur-sm"
          )}
        >
          {isAudio ? (
            <div className="space-y-2">
              {showText &&
                (displayText ? (
                  <p>{displayText}</p>
                ) : (
                  <p className="text-xs opacity-70 italic">
                    Transcribing voice...
                  </p>
                ))}
              {message.audioUrl && (
                <div
                  className={cn(
                    showText &&
                      displayText &&
                      (isUser ? "pt-2 mt-1" : "pt-2 mt-1")
                  )}
                >
                  {isUser && (
                    <div className="flex items-center gap-1.5 text-[10px] opacity-70 mb-1">
                      <Mic className="h-3 w-3" />
                      <span>Original recording</span>
                    </div>
                  )}
                  <VoiceMessagePlayer
                    src={message.audioUrl}
                    duration={message.duration}
                    isUser={isUser}
                    autoPlay={!isUser && message.autoPlayVoice}
                  />
                </div>
              )}
            </div>
          ) : (
            displayText
          )}
        </motion.div>

        <div
          className={cn(
            "flex items-center gap-2",
            isUser ? "self-end flex-row-reverse" : "self-start"
          )}
        >
          {canTranslate && (
            <MessageTranslateMenu
              activeLanguage={activeLanguage}
              loadingLanguage={loadingLanguage}
              onSelect={handleTranslate}
              align={isUser ? "end" : "start"}
              disabled={loadingLanguage !== null}
            />
          )}
          {!isUser &&
            message.type !== "audio" &&
            ttsSupported &&
            speak &&
            displayText && (
              <button
                type="button"
                onClick={() => speak(displayText, message.id)}
                disabled={isLoadingVoice}
                className={cn(
                  "flex items-center gap-1 text-[10px] text-muted-foreground",
                  "hover:text-primary transition-colors px-1 py-0.5 rounded disabled:opacity-50",
                  (isSpeaking || isLoadingVoice) && "text-primary"
                )}
                aria-label={
                  isLoadingVoice
                    ? "Generating AI voice"
                    : isSpeaking
                      ? "Stop"
                      : "Listen with AI voice"
                }
              >
                {isLoadingVoice ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : isSpeaking ? (
                  <VolumeX className="h-3 w-3" />
                ) : (
                  <Volume2 className="h-3 w-3" />
                )}
                {isLoadingVoice
                  ? "Generating voice..."
                  : isSpeaking
                    ? "Stop"
                    : "AI Voice"}
              </button>
            )}
        </div>

        {translateError && (
          <p
            className={cn(
              "text-[10px] text-red-400",
              isUser ? "self-end text-right" : "self-start"
            )}
          >
            {translateError}
          </p>
        )}
      </div>
    </motion.div>
  );
});
