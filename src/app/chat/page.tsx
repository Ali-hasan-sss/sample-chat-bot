"use client";

import { ChatPanel } from "@/components/chatbot/ChatPanel";
import { ChatThemeProvider } from "@/components/chatbot/ChatThemeContext";

export default function ChatPage() {
  return (
    <ChatThemeProvider>
      <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-white lg:px-[12.5vw]">
        <ChatPanel
          variant="expanded"
          onClose={() => window.close()}
        />
      </div>
    </ChatThemeProvider>
  );
}
