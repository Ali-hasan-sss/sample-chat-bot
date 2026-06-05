"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full",
        "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
        "hover:shadow-primary/50 transition-shadow cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {!isOpen && (
        <motion.span
          className="absolute inset-0 rounded-full bg-primary"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <MessageCircle className="h-6 w-6 relative z-10" />
    </motion.button>
  );
}
