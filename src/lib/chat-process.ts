import {
  sanitizeUserInput,
  detectPromptInjection,
  escapeForPrompt,
} from "@/lib/sanitize";
import {
  retrieveRelevantChunks,
  buildContextFromChunks,
} from "@/lib/rag/retrieval";
import {
  generateChatResponse,
  generateFallbackResponse,
  type ChatHistoryItem,
} from "@/lib/openai";
import { BASE_ASSISTANT_CONTEXT } from "@/lib/conversation";
import type { ReplyLanguage } from "@/lib/reply-language";

export async function processChatMessage(
  rawMessage: string,
  history: ChatHistoryItem[] = [],
  replyLanguage?: ReplyLanguage
): Promise<string> {
  const sanitized = sanitizeUserInput(rawMessage);

  if (!sanitized) {
    return await generateFallbackResponse(undefined, replyLanguage);
  }

  if (detectPromptInjection(sanitized)) {
    return await generateFallbackResponse(sanitized, replyLanguage);
  }

  const chunks = retrieveRelevantChunks(sanitized);
  const ragContext = buildContextFromChunks(chunks);
  const context = [BASE_ASSISTANT_CONTEXT, ragContext].filter(Boolean).join("\n\n");
  const safeMessage = escapeForPrompt(sanitized);
  const safeHistory = history.map((item) => ({
    role: item.role,
    content: escapeForPrompt(item.content),
  }));

  return generateChatResponse(
    safeMessage,
    context || BASE_ASSISTANT_CONTEXT,
    safeHistory,
    replyLanguage
  );
}

export function messageToHistoryContent(message: {
  type: string;
  content: string;
  transcript?: string;
}): string {
  if (message.type === "audio") {
    return message.transcript || message.content || "[Voice message]";
  }
  return message.content;
}
