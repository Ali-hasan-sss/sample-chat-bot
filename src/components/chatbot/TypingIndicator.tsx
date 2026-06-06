"use client";

import { motion } from "framer-motion";
import { MessageRow } from "./ChatAvatar";
import { FU } from "@/lib/fulife-theme";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <MessageRow role="assistant">
        <div
          className="inline-flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-3"
          style={{ backgroundColor: FU.lightGray }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-[#9B9B9B]"
              animate={{ y: [0, -3, 0], opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: i * 0.14,
              }}
            />
          ))}
        </div>
      </MessageRow>
    </motion.div>
  );
}
