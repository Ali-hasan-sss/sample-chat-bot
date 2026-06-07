"use client";

import { memo, useRef } from "react";
import { MessageBubbleRow } from "./MessageBubbleRow";
import { FU } from "@/lib/fulife-theme";

interface SystemBubbleProps {
  children: React.ReactNode;
  timestamp?: number;
}

export const SystemBubble = memo(function SystemBubble({
  children,
  timestamp,
}: SystemBubbleProps) {
  const defaultTimestamp = useRef(Date.now()).current;

  return (
    <MessageBubbleRow timestamp={timestamp ?? defaultTimestamp}>
      <div
        className="chat-message-text inline-block max-w-full rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[13px] leading-relaxed text-[#2B2B2B]"
        style={{ backgroundColor: FU.lightGray }}
      >
        {children}
      </div>
    </MessageBubbleRow>
  );
});
