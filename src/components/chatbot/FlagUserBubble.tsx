"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { ReplyLanguage } from "@/lib/reply-language";
import { LanguageFlag } from "./LanguageFlag";
import { MessageRow } from "./ChatAvatar";
import { FU } from "@/lib/fulife-theme";

interface FlagUserBubbleProps {
  language: ReplyLanguage;
}

export const FlagUserBubble = memo(function FlagUserBubble({
  language,
}: FlagUserBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <MessageRow role="user">
        <div
          className="inline-flex items-center justify-center rounded-2xl rounded-tr-sm px-3 py-2 shadow-sm"
          style={{ backgroundColor: FU.orange }}
        >
          <LanguageFlag language={language} size={24} />
        </div>
      </MessageRow>
    </motion.div>
  );
});
