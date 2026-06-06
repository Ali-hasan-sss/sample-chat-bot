"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type ReplyLanguage,
  REPLY_LANGUAGE_STORAGE_KEY,
  getDefaultReplyLanguage,
  isReplyLanguage,
} from "@/lib/reply-language";

export function useReplyLanguage() {
  const [replyLanguage, setReplyLanguageState] = useState<ReplyLanguage>("en");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(REPLY_LANGUAGE_STORAGE_KEY);
      setReplyLanguageState(
        isReplyLanguage(stored) ? stored : getDefaultReplyLanguage()
      );
    } catch {
      setReplyLanguageState(getDefaultReplyLanguage());
    } finally {
      setIsReady(true);
    }
  }, []);

  const setReplyLanguage = useCallback((lang: ReplyLanguage) => {
    setReplyLanguageState(lang);
    try {
      localStorage.setItem(REPLY_LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore storage errors
    }
  }, []);

  return { replyLanguage, setReplyLanguage, isReady };
}
