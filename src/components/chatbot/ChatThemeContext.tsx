"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CHAT_THEME_STORAGE_KEY,
  CHAT_THEMES,
  getDefaultChatTheme,
  isChatThemeId,
  type ChatThemeId,
  type ChatThemeTokens,
} from "@/lib/chat-theme";

interface ChatThemeContextValue {
  themeId: ChatThemeId;
  theme: ChatThemeTokens;
  setThemeId: (id: ChatThemeId) => void;
}

const ChatThemeContext = createContext<ChatThemeContextValue | null>(null);

export function ChatThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ChatThemeId>(getDefaultChatTheme);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CHAT_THEME_STORAGE_KEY);
      if (isChatThemeId(stored)) setThemeIdState(stored);
    } catch {
      // ignore storage errors
    } finally {
      setReady(true);
    }
  }, []);

  const setThemeId = useCallback((id: ChatThemeId) => {
    setThemeIdState(id);
    try {
      localStorage.setItem(CHAT_THEME_STORAGE_KEY, id);
    } catch {
      // ignore storage errors
    }
  }, []);

  const theme = CHAT_THEMES[themeId];

  const value = useMemo(
    () => ({ themeId, theme, setThemeId }),
    [themeId, theme, setThemeId]
  );

  return (
    <ChatThemeContext.Provider value={value}>
      <div
        className="chat-theme-root contents"
        style={
          {
            "--chat-accent": theme.accent,
            "--chat-accent-soft": theme.accentSoft,
          } as React.CSSProperties
        }
        data-chat-theme={ready ? themeId : undefined}
      >
        {children}
      </div>
    </ChatThemeContext.Provider>
  );
}

export function useChatTheme(): ChatThemeContextValue {
  const context = useContext(ChatThemeContext);
  if (!context) {
    throw new Error("useChatTheme must be used within ChatThemeProvider");
  }
  return context;
}
