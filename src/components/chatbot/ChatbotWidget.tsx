"use client";

import { useState, memo } from "react";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";

export const ChatbotWidget = memo(function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatButton onClick={() => setOpen(true)} isOpen={open} />
      <ChatWindow open={open} onOpenChange={setOpen} />
    </>
  );
});
