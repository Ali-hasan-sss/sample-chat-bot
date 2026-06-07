export type ChatThemeId = "orange" | "green";

export const CHAT_THEME_STORAGE_KEY = "fulife-chat-theme";

export type ChatThemeTokens = {
  id: ChatThemeId;
  accent: string;
  accentSoft: string;
};

export const CHAT_THEMES: Record<ChatThemeId, ChatThemeTokens> = {
  orange: {
    id: "orange",
    accent: "#F15A24",
    accentSoft: "rgba(241, 90, 36, 0.5)",
  },
  green: {
    id: "green",
    accent: "#16A34A",
    accentSoft: "rgba(22, 163, 74, 0.5)",
  },
};

export function isChatThemeId(value: unknown): value is ChatThemeId {
  return value === "orange" || value === "green";
}

export function getDefaultChatTheme(): ChatThemeId {
  return "orange";
}
