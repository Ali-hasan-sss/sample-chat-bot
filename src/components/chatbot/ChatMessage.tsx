"use client";

import { memo } from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export const ChatMessageBubble = memo(function ChatMessageBubble({
  message,
}: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

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
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-white/10 border border-white/10 rounded-tl-sm"
        )}
      >
        {message.content}
      </div>
    </div>
  );
});
