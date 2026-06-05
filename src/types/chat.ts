export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
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

export interface ChatErrorResponse {
  error: string;
}
