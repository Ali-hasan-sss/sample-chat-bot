"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ChatMessage, ChatConversation } from "@/types/chat";
import { useChatPersistence } from "@/hooks/useChatPersistence";
import { sendChatMessage, createMessage } from "@/services/chat-service";
import { generateId } from "@/lib/utils";

export const QUICK_SUGGESTIONS = [
  "What are the meal times?",
  "Are there available rooms?",
  "What wellness facilities exist?",
  "Hotel contact details",
  "Does the hotel have a pool?",
  "مواعيد الوجبات",
  "الغرف المتاحة",
  "معلومات الفندق",
] as const;

type ChatStatus = "idle" | "loading" | "error";

export function useChat() {
  const { conversation, isLoaded, saveConversation, clearConversation } =
    useChatPersistence();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const conversationIdRef = useRef<string>("");
  const initializedRef = useRef(false);

  useEffect(() => {
    if (isLoaded && conversation && !initializedRef.current) {
      setMessages(conversation.messages);
      conversationIdRef.current = conversation.id;
      initializedRef.current = true;
    } else if (isLoaded && !conversation && !initializedRef.current) {
      conversationIdRef.current = generateId();
      initializedRef.current = true;
    }
  }, [isLoaded, conversation]);

  const persist = useCallback(
    (updatedMessages: ChatMessage[]) => {
      const conv: ChatConversation = {
        id: conversationIdRef.current,
        messages: updatedMessages,
        createdAt: conversation?.createdAt ?? Date.now(),
        updatedAt: Date.now(),
      };
      saveConversation(conv);
    },
    [conversation, saveConversation]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || status === "loading") return;

      const userMessage = createMessage("user", trimmed);
      const updatedWithUser = [...messages, userMessage];
      setMessages(updatedWithUser);
      setStatus("loading");
      setError(null);

      try {
        const history = messages.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await sendChatMessage(
          trimmed,
          conversationIdRef.current,
          history
        );

        conversationIdRef.current = response.conversationId;
        const assistantMessage = createMessage("assistant", response.message);
        const finalMessages = [...updatedWithUser, assistantMessage];
        setMessages(finalMessages);
        persist(finalMessages);
        setStatus("idle");
      } catch (err) {
        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Something went wrong. Please try again."
        );
      }
    },
    [messages, status, persist]
  );

  const handleClear = useCallback(async () => {
    conversationIdRef.current = generateId();
    setMessages([]);
    setStatus("idle");
    setError(null);
    await clearConversation();
  }, [clearConversation]);

  return {
    messages,
    status,
    error,
    isLoaded,
    sendMessage,
    clearConversation: handleClear,
  };
}
