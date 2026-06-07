"use client";

import { ChatPanel } from "@/components/chatbot/ChatPanel";
import { ChatThemeProvider } from "@/components/chatbot/ChatThemeContext";

export default function ChatPage() {
  return (
    <ChatThemeProvider>
      <div className="min-h-dvh bg-white lg:px-[12.5vw]">
        <ChatPanel
          variant="expanded"
          onClose={() => window.close()}
        />
      </div>
    </ChatThemeProvider>
  );
}
