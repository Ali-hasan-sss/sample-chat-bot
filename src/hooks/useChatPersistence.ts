"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { ChatConversation } from "@/types/chat";

const DB_NAME = "meridian-chat";
const DB_VERSION = 2;
const CONVERSATION_STORE = "conversations";
const CONVERSATION_KEY = "current";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(CONVERSATION_STORE)) {
        db.createObjectStore(CONVERSATION_STORE);
      }
      if (!db.objectStoreNames.contains("audio-blobs")) {
        db.createObjectStore("audio-blobs");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function useChatPersistence() {
  const [conversation, setConversation] = useState<ChatConversation | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const dbRef = useRef<IDBDatabase | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const db = await openDB();
        if (!mounted) return;
        dbRef.current = db;

        const tx = db.transaction(CONVERSATION_STORE, "readonly");
        const request = tx.objectStore(CONVERSATION_STORE).get(CONVERSATION_KEY);

        request.onsuccess = () => {
          if (mounted && request.result) {
            setConversation(request.result as ChatConversation);
          }
          if (mounted) setIsLoaded(true);
        };

        request.onerror = () => {
          if (mounted) setIsLoaded(true);
        };
      } catch {
        if (mounted) setIsLoaded(true);
      }
    }

    load();

    return () => {
      mounted = false;
      dbRef.current?.close();
    };
  }, []);

  const saveConversation = useCallback(async (conv: ChatConversation) => {
    setConversation(conv);
    try {
      const db = dbRef.current ?? (await openDB());
      dbRef.current = db;
      const tx = db.transaction(CONVERSATION_STORE, "readwrite");
      tx.objectStore(CONVERSATION_STORE).put(conv, CONVERSATION_KEY);
    } catch {
      // silent fail
    }
  }, []);

  const clearConversation = useCallback(async () => {
    setConversation(null);
    try {
      const db = dbRef.current ?? (await openDB());
      dbRef.current = db;
      const tx = db.transaction(CONVERSATION_STORE, "readwrite");
      tx.objectStore(CONVERSATION_STORE).delete(CONVERSATION_KEY);
    } catch {
      // silent fail
    }
  }, []);

  return { conversation, isLoaded, saveConversation, clearConversation };
}
