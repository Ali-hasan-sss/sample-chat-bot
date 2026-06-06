"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { FU } from "@/lib/fulife-theme";

interface ChatButtonProps {
  onClick: () => void;
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="rounded-2xl bg-white px-4 py-2.5 text-sm text-[#2B2B2B] shadow-lg shadow-black/15 max-w-[220px]"
      >
        Need help with your stay?
      </motion.div>

      <motion.button
        onClick={onClick}
        aria-label="Open chat assistant"
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full",
          "text-white cursor-pointer",
          "shadow-lg shadow-black/20 hover:shadow-xl transition-shadow"
        )}
        style={{ backgroundColor: FU.orange }}
        initial={{ opacity: 0, scale: 0.5, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 22, delay: 0.8 }}
      >
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"
        >
          <Search className="h-5 w-5" strokeWidth={2.5} />
        </motion.span>
      </motion.button>
    </div>
  );
}
