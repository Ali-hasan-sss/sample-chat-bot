import type { ReplyLanguage } from "@/lib/reply-language";

export async function translateMessage(
  text: string,
  targetLanguage: ReplyLanguage
): Promise<string> {
  const response = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, targetLanguage }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Could not translate message.");
  }

  return data.translation as string;
}
