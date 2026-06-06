const GREETING_PATTERNS = [
  /^(hi|hello|hey|hola|bonjour|guten tag|ciao)\b/i,
  /^(good\s+(morning|afternoon|evening|night))/i,
  /^(who are you|what are you|who is this|what can you do|what do you do|help me)/i,
  /^(thanks|thank you|merci|danke)/i,
  /^(bye|goodbye|see you|tschüss|au revoir)/i,
];

export function isConversationalMessage(message: string): boolean {
  const trimmed = message.trim();
  if (trimmed.length > 80) return false;
  return GREETING_PATTERNS.some((pattern) => pattern.test(trimmed));
}

export const BASE_ASSISTANT_CONTEXT = `[Assistant Identity]
You are the FU.life Berlin co-living assistant at Kurfürstendamm 69, 10707 Berlin.
You help with move-in, daily living, community, and local area questions.
Book stays at https://fu.life/. Emergency: +49 1511 4622046 (24/7).
Keep answers short — 3 to 4 lines maximum in the first reply.`;
