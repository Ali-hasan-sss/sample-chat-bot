import type { ChatMessage, ChatResponse, ChatErrorResponse } from "@/types/chat";
import { generateId } from "@/lib/utils";

export async function sendChatMessage(
  message: string,
  conversationId?: string,
  history?: Pick<ChatMessage, "role" | "content">[]
): Promise<ChatResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, conversationId, history }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData = data as ChatErrorResponse;
    throw new Error(errorData.error ?? "Failed to send message");
  }

  return data as ChatResponse;
}

export function createMessage(
  role: ChatMessage["role"],
  content: string
): ChatMessage {
  return {
    id: generateId(),
    role,
    content,
    timestamp: Date.now(),
  };
}
