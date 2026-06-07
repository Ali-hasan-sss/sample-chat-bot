"use client";

import { cn } from "@/lib/utils";
import { formatMessageTimestamp } from "@/lib/format-message-time";

interface MessageTimestampProps {
  timestamp: number;
  className?: string;
}

export function MessageTimestamp({
  timestamp,
  className,
}: MessageTimestampProps) {
  return (
    <time
      dateTime={new Date(timestamp).toISOString()}
      className={cn(
        "mt-0.5 px-1 text-[10px] font-light tracking-wide text-[#B0B0B0]",
        className
      )}
    >
      {formatMessageTimestamp(timestamp)}
    </time>
  );
}
