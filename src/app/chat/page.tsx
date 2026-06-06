"use client";

import { ChatPanel } from "@/components/chatbot/ChatPanel";

export default function ChatPage() {
  return (
    <ChatPanel
      variant="expanded"
      onClose={() => window.close()}
    />
  );
}
