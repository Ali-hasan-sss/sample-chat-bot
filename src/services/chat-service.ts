import type {
  ChatMessage,
  ChatResponse,
  VoiceChatResponse,
  ChatErrorResponse,
  ChatHistoryItem,
} from "@/types/chat";
import type { ReplyLanguage } from "@/lib/reply-language";
import { messageToHistoryContent } from "@/lib/chat-process";
import { generateId } from "@/lib/utils";

export async function sendChatMessage(
  message: string,
  conversationId?: string,
  history?: ChatHistoryItem[],
  replyLanguage?: ReplyLanguage
): Promise<ChatResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, conversationId, history, replyLanguage }),
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
  history?: ChatHistoryItem[],
  replyLanguage?: ReplyLanguage
): Promise<VoiceChatResponse> {
  const formData = new FormData();
  const ext = audio.type.includes("mp4") ? "mp4" : "webm";
  formData.append("audio", audio, `voice.${ext}`);
  if (conversationId) formData.append("conversationId", conversationId);
  if (history) formData.append("history", JSON.stringify(history));
  if (replyLanguage) formData.append("replyLanguage", replyLanguage);

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
  role: ChatMessage["role"],
  audioId: string,
  audioUrl: string,
  duration: number,
  options?: { transcript?: string; autoPlayVoice?: boolean }
): ChatMessage {
  return {
    id: generateId(),
    role,
    type: "audio",
    content: options?.transcript ?? "",
    timestamp: Date.now(),
    audioId,
    audioUrl,
    duration,
    transcript: options?.transcript,
    autoPlayVoice: options?.autoPlayVoice,
  };
}

export async function fetchSpeechAudio(
  text: string,
  replyLanguage?: ReplyLanguage
): Promise<Blob> {
  const response = await fetch("/api/speech", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, replyLanguage }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      (data as { error?: string }).error ?? "Could not generate AI voice."
    );
  }

  return response.blob();
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
  return messages.map(
    ({ audioUrl: _, autoPlayVoice: __, ...rest }) => rest
  );
}
