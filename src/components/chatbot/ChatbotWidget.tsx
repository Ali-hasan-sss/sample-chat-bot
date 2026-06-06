"use client";

import { useState, memo } from "react";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";

export const ChatbotWidget = memo(function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && <ChatButton onClick={() => setOpen(true)} />}
      <ChatWindow open={open} onOpenChange={setOpen} />
    </>
  );
});
