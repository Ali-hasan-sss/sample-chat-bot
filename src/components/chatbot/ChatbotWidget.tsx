"use client";

import { useState, memo } from "react";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";
import { ChatThemeProvider } from "./ChatThemeContext";

export const ChatbotWidget = memo(function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <ChatThemeProvider>
      {!open && <ChatButton onClick={() => setOpen(true)} />}
      <ChatWindow open={open} onOpenChange={setOpen} />
    </ChatThemeProvider>
  );
});
