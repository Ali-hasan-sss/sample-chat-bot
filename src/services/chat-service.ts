import type {
  ChatMessage,
  ChatResponse,
  VoiceChatResponse,
  ChatErrorResponse,
  ChatHistoryItem,
} from "@/types/chat";
import { messageToHistoryContent } from "@/lib/chat-process";
import { generateId } from "@/lib/utils";

export async function sendChatMessage(
  message: string,
  conversationId?: string,
  history?: ChatHistoryItem[]
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

export async function sendVoiceMessage(
  audio: Blob,
  conversationId?: string,
  history?: ChatHistoryItem[]
): Promise<VoiceChatResponse> {
  const formData = new FormData();
  const ext = audio.type.includes("mp4") ? "mp4" : "webm";
  formData.append("audio", audio, `voice.${ext}`);
  if (conversationId) formData.append("conversationId", conversationId);
  if (history) formData.append("history", JSON.stringify(history));

  const response = await fetch("/api/chat/voice", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to send voice message");
  }

  return data as VoiceChatResponse;
}

export function createTextMessage(
  role: ChatMessage["role"],
  content: string
): ChatMessage {
  return {
    id: generateId(),
    role,
    type: "text",
    content,
    timestamp: Date.now(),
  };
}

export function createAudioMessage(
  audioId: string,
  audioUrl: string,
  duration: number
): ChatMessage {
  return {
    id: generateId(),
    role: "user",
    type: "audio",
    content: "",
    timestamp: Date.now(),
    audioId,
    audioUrl,
    duration,
  };
}

export function buildHistoryFromMessages(
  messages: ChatMessage[]
): ChatHistoryItem[] {
  return messages.slice(-10).map((m) => ({
    role: m.role,
    content: messageToHistoryContent(m),
  }));
}

/** Strip runtime-only fields before persisting to IndexedDB */
export function serializeMessagesForStorage(
  messages: ChatMessage[]
): ChatMessage[] {
  return messages.map(({ audioUrl: _, ...rest }) => rest);
}
