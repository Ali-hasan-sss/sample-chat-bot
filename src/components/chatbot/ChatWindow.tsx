"use client";

import { memo } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChatPanel } from "./ChatPanel";

interface ChatWindowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChatWindow = memo(function ChatWindow({
  open,
  onOpenChange,
}: ChatWindowProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        hideClose
        nonModal
        className="p-0 gap-0 overflow-hidden sm:my-4 sm:mr-4 sm:h-[calc(100%-2rem)] sm:max-h-[calc(100dvh-2rem)] sm:rounded-2xl sm:inset-y-auto sm:top-4 sm:bottom-4 sm:right-4 sm:left-auto shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-[#E8E8E8]"
      >
        <SheetTitle className="sr-only">FU.life Assistant Chat</SheetTitle>
        <ChatPanel
          variant="sheet"
          onClose={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
});
