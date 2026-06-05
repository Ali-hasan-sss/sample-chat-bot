"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { ChatConversation } from "@/types/chat";

const DB_NAME = "meridian-chat";
const DB_VERSION = 1;
const STORE_NAME = "conversations";
const CONVERSATION_KEY = "current";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
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

        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(CONVERSATION_KEY);

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

  const saveConversation = useCallback(
    async (conv: ChatConversation) => {
      setConversation(conv);
      try {
        const db = dbRef.current ?? (await openDB());
        dbRef.current = db;
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).put(conv, CONVERSATION_KEY);
      } catch {
        // IndexedDB unavailable — state still held in memory
      }
    },
    []
  );

  const clearConversation = useCallback(async () => {
    setConversation(null);
    try {
      const db = dbRef.current ?? (await openDB());
      dbRef.current = db;
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).delete(CONVERSATION_KEY);
    } catch {
      // silent fail
    }
  }, []);

  return { conversation, isLoaded, saveConversation, clearConversation };
}
