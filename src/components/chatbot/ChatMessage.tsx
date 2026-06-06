"use client";

import { memo } from "react";
import { Bot, User, Volume2, VolumeX, Loader2, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";
import { VoiceMessagePlayer } from "./VoiceMessagePlayer";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  speak?: (text: string, messageId: string) => void;
  isSpeaking?: boolean;
  isLoadingVoice?: boolean;
  ttsSupported?: boolean;
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
  const displayText = isAudio
    ? message.transcript || message.content
    : message.content;

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-2",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary/20 text-primary" : "bg-white/10 text-foreground"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex flex-col gap-1 max-w-[85%]">
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-white/10 border border-white/10 rounded-tl-sm"
          )}
        >
          {isAudio ? (
            <div className="space-y-2">
              {displayText ? (
                <p>{displayText}</p>
              ) : (
                <p className="text-xs opacity-70 italic">
                  Transcribing voice...
                </p>
              )}
              {message.audioUrl && (
                <div className="pt-1 border-t border-primary-foreground/20">
                  <div className="flex items-center gap-1.5 text-[10px] opacity-70 mb-1">
                    <Mic className="h-3 w-3" />
                    <span>Original recording</span>
                  </div>
                  <VoiceMessagePlayer
                    src={message.audioUrl}
                    duration={message.duration}
                    isUser={isUser}
                  />
                </div>
              )}
            </div>
          ) : (
            message.content
          )}
        </div>
        {!isUser && ttsSupported && speak && message.content && (
          <button
            type="button"
            onClick={() => speak(message.content, message.id)}
            disabled={isLoadingVoice}
            className={cn(
              "self-start flex items-center gap-1 text-[10px] text-muted-foreground",
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
    </div>
  );
});
