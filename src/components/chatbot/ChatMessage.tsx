"use client";

import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatAssistantReply } from "@/lib/sanitize";
import { splitReadMore } from "@/lib/openai";
import type { ChatMessage } from "@/types/chat";
import { VoiceMessagePlayer } from "./VoiceMessagePlayer";
import { MessageRow } from "./ChatAvatar";
import { FU } from "@/lib/fulife-theme";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

function getSourceText(message: ChatMessage, isUser: boolean): string {
  if (message.type === "audio") {
    return message.transcript || message.content || "";
  }
  return isUser ? message.content : formatAssistantReply(message.content);
}

export const ChatMessageBubble = memo(function ChatMessageBubble({
  message,
}: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const isAudio = message.type === "audio";
  const sourceText = useMemo(
    () => getSourceText(message, isUser),
    [message, isUser]
  );

  const { preview, extra } = useMemo(
    () =>
      isUser ? { preview: sourceText, extra: null } : splitReadMore(sourceText),
    [isUser, sourceText]
  );

  const [expanded, setExpanded] = useState(false);
  const displayText = expanded && extra ? `${preview}\n${extra}` : preview;

  const showText = isAudio
    ? Boolean(displayText) || !sourceText
    : Boolean(displayText);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <MessageRow role={isUser ? "user" : "assistant"}>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap",
            isUser
              ? "rounded-tr-sm text-white"
              : "rounded-tl-sm text-[#2B2B2B]"
          )}
          style={{
            backgroundColor: isUser ? FU.orange : FU.lightGray,
          }}
        >
          {isAudio ? (
            <div className="space-y-2">
              {showText && displayText && <p>{displayText}</p>}
              {message.audioUrl && (
                <div className={showText && displayText ? "pt-1" : ""}>
                  {isUser && (
                    <div className="mb-1 flex items-center gap-1 text-[10px] opacity-70">
                      <Mic className="h-3 w-3" />
                      <span>Voice</span>
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
        </div>

        {!isUser && extra && !expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="self-start px-1 text-[11px] font-medium"
            style={{ color: FU.orange }}
          >
            Read More
          </button>
        )}
      </MessageRow>
    </motion.div>
  );
});
