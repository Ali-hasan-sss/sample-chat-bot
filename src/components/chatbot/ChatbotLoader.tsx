"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ChatbotWidget = dynamic(
  () =>
    import("@/components/chatbot/ChatbotWidget").then((m) => m.ChatbotWidget),
  { ssr: false }
);

export function ChatbotLoader() {
  const pathname = usePathname();

  if (pathname === "/chat") {
    return null;
  }

  return <ChatbotWidget />;
}
