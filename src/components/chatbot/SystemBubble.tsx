"use client";

import { memo } from "react";
import { MessageRow } from "./ChatAvatar";
import { FU } from "@/lib/fulife-theme";

interface SystemBubbleProps {
  children: React.ReactNode;
}

export const SystemBubble = memo(function SystemBubble({
  children,
}: SystemBubbleProps) {
  return (
    <MessageRow role="assistant">
      <div
        className="inline-block max-w-full rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[13px] leading-relaxed text-[#2B2B2B]"
        style={{ backgroundColor: FU.lightGray }}
      >
        {children}
      </div>
    </MessageRow>
  );
});
