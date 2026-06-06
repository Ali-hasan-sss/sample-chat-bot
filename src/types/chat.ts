export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  type: "text" | "audio";
  content: string;
  timestamp: number;
  /** Reference to audio blob in IndexedDB */
  audioId?: string;
  /** Runtime-only playback URL (not persisted) */
  audioUrl?: string;
  /** Duration in seconds */
  duration?: number;
  /** Internal transcript for chat history (audio messages) */
  transcript?: string;
  /** Auto-play AI voice when this assistant message appears */
  replyWithVoice?: boolean;
}

export interface ChatConversation {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  message: string;
  conversationId: string;
}

export interface VoiceChatResponse extends ChatResponse {
  /** Used internally for conversation history — not displayed to user */
  transcript?: string;
}

export interface ChatErrorResponse {
  error: string;
}

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}
