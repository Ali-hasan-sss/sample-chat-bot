"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
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
        "fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full",
        "bg-gradient-to-br from-primary to-cyan-400 text-primary-foreground",
        "shadow-[0_8px_32px_rgba(34,211,238,0.35)]",
        "hover:shadow-[0_12px_40px_rgba(34,211,238,0.5)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "cursor-pointer transition-shadow duration-300",
        isOpen && "rotate-0"
      )}
      initial={{ opacity: 0, scale: 0.5, y: 40 }}
      animate={{
        opacity: 1,
        scale: isOpen ? 0.92 : 1,
        y: 0,
        rotate: isOpen ? 0 : 0,
      }}
      whileHover={{ scale: isOpen ? 0.95 : 1.08 }}
      whileTap={{ scale: 0.88 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 22,
        delay: isOpen ? 0 : 0.8,
      }}
    >
      <AnimatePresence>
        {!isOpen && (
          <motion.span
            key="pulse"
            className="absolute inset-0 rounded-full bg-primary"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ scale: [1, 1.45, 1], opacity: [0.45, 0, 0.45] }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            <X className="h-6 w-6" />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
