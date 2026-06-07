"use client";

import { cn } from "@/lib/utils";
import { MessageTimestamp } from "./MessageTimestamp";

interface MessageBubbleRowProps {
  isUser?: boolean;
  timestamp?: number;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

export function MessageBubbleRow({
  isUser = false,
  timestamp,
  children,
  className,
  wide = false,
}: MessageBubbleRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col px-4 py-1",
        isUser ? "items-end" : "items-start",
        className
      )}
    >
      <div
        className={cn(
          "flex min-w-0 flex-col gap-1",
          wide ? "w-full max-w-[min(100%,540px)]" : "max-w-[88%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        {children}
      </div>
      {timestamp != null && (
        <MessageTimestamp
          timestamp={timestamp}
          className={isUser ? "self-end" : "self-start"}
        />
      )}
    </div>
  );
}
