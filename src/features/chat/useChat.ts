"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ChatMessage, ChatConversation } from "@/types/chat";
import { useChatPersistence } from "@/hooks/useChatPersistence";
import {
  sendChatMessage,
  sendVoiceMessage,
  createTextMessage,
  createAudioMessage,
  buildHistoryFromMessages,
  serializeMessagesForStorage,
} from "@/services/chat-service";
import {
  saveAudioBlob,
  getAudioBlob,
  createAudioObjectUrl,
  deleteAllAudioBlobs,
} from "@/lib/audio-storage";
import { generateId } from "@/lib/utils";

export const QUICK_SUGGESTIONS = [
  "What are your operating hours?",
  "What is today's dish of the day?",
  "Breakfast & meal schedule",
  "Are there available rooms?",
  "Hotel services & facilities",

] as const;

type ChatStatus = "idle" | "loading" | "error";

async function hydrateAudioMessages(messages: ChatMessage[]): Promise<ChatMessage[]> {
  return Promise.all(
    messages.map(async (msg) => {
      if (msg.type === "audio" && msg.audioId && !msg.audioUrl) {
        const blob = await getAudioBlob(msg.audioId);
        if (blob) {
          return { ...msg, audioUrl: createAudioObjectUrl(blob) };
        }
      }
      return msg;
    })
  );
}

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
      hydrateAudioMessages(conversation.messages).then(setMessages);
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
        messages: serializeMessagesForStorage(updatedMessages),
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

      const userMessage = createTextMessage("user", trimmed);
      const updatedWithUser = [...messages, userMessage];
      setMessages(updatedWithUser);
      setStatus("loading");
      setError(null);

      try {
        const history = buildHistoryFromMessages(messages);
        const response = await sendChatMessage(
          trimmed,
          conversationIdRef.current,
          history
        );

        conversationIdRef.current = response.conversationId;
        const assistantMessage = createTextMessage("assistant", response.message);
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

  const sendVoiceMessageHandler = useCallback(
    async (audio: Blob, duration: number) => {
      if (status === "loading") return;

      const audioId = generateId();
      const audioUrl = createAudioObjectUrl(audio);
      const userMessage = createAudioMessage(audioId, audioUrl, duration);

      const updatedWithUser = [...messages, userMessage];
      setMessages(updatedWithUser);
      setStatus("loading");
      setError(null);

      try {
        await saveAudioBlob(audioId, audio);

        const history = buildHistoryFromMessages(messages);
        const response = await sendVoiceMessage(
          audio,
          conversationIdRef.current,
          history
        );

        conversationIdRef.current = response.conversationId;

        const userMessageWithTranscript: ChatMessage = {
          ...userMessage,
          content: response.transcript ?? "",
          transcript: response.transcript,
        };

        const withTranscript = updatedWithUser.map((m) =>
          m.id === userMessage.id ? userMessageWithTranscript : m
        );

        const assistantMessage: ChatMessage = {
          ...createTextMessage("assistant", response.message),
          replyWithVoice: true,
        };
        const finalMessages = [...withTranscript, assistantMessage];
        setMessages(finalMessages);
        persist(finalMessages);
        setStatus("idle");
      } catch (err) {
        setMessages(messages);
        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Could not send voice message."
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
    await deleteAllAudioBlobs();
  }, [clearConversation]);

  return {
    messages,
    status,
    error,
    isLoaded,
    sendMessage,
    sendVoiceMessage: sendVoiceMessageHandler,
    clearConversation: handleClear,
  };
}
