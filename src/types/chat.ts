export type RichReplyType = "room-cards";

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
  /** Auto-play once when assistant voice bubble appears (not persisted) */
  autoPlayVoice?: boolean;
  /** User selected a new reply language (flag bubble) */
  langSwitch?: import("@/lib/reply-language").ReplyLanguage;
  /** Bot confirmation after language change — excluded from AI history */
  languageConfirmation?: boolean;
  /** Structured in-chat reply (e.g. room cards carousel) */
  richReply?: RichReplyType;
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
