const GREETING_PATTERNS = [
  /^(hi|hello|hey|hola|bonjour|guten tag|salam|marhaba|ciao)\b/i,
  /^(good\s+(morning|afternoon|evening|night))/i,
  /^(مرحبا|مرحباً|اهلا|أهلا|السلام|سلام|هاي|صباح|مساء|الخير)/,
  /^(who are you|what are you|who is this|what can you do|what do you do|help me|مساعدة|من انت|من أنت|مين انت|من هذا|ماذا تفعل)/i,
  /^(thanks|thank you|شكرا|شكراً|merci|gracias)/i,
  /^(bye|goodbye|see you|مع السلامة|وداعا|وداعاً)/i,
];

export function isConversationalMessage(message: string): boolean {
  const trimmed = message.trim();
  if (trimmed.length > 80) return false;
  return GREETING_PATTERNS.some((pattern) => pattern.test(trimmed));
}

export const BASE_ASSISTANT_CONTEXT = `[Assistant Identity]
You are Meridian, the AI assistant for Grand Meridian Hotel — a five-star luxury hotel at 42 Oceanview Boulevard, Marina Bay.
You help guests with hotel information, dining, rooms, wellness, events, and general inquiries.
You speak multiple languages and always respond in the guest's language.
You cannot make reservations or confirm real-time room availability — direct guests to front desk (+1 555-234-8900) or reservations@grandmeridian.com for bookings.`;
