"use client";

import { memo, useRef } from "react";
import { motion } from "framer-motion";
import type { ReplyLanguage } from "@/lib/reply-language";
import { LanguageFlag } from "./LanguageFlag";
import { MessageBubbleRow } from "./MessageBubbleRow";
import { useChatTheme } from "./ChatThemeContext";

interface FlagUserBubbleProps {
  language: ReplyLanguage;
}

export const FlagUserBubble = memo(function FlagUserBubble({
  language,
}: FlagUserBubbleProps) {
  const { theme } = useChatTheme();
  const timestamp = useRef(Date.now()).current;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <MessageBubbleRow isUser timestamp={timestamp}>
        <div
          className="inline-flex items-center rounded-2xl rounded-tr-sm px-3.5 py-2 text-sm text-white shadow-sm [&_span]:text-white"
          style={{ backgroundColor: theme.accent }}
        >
          <LanguageFlag language={language} showLabel size={20} />
        </div>
      </MessageBubbleRow>
    </motion.div>
  );
});
