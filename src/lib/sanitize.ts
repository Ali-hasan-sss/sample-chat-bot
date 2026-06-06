const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?)/i,
  /disregard\s+(all\s+)?(previous|prior|above)/i,
  /you\s+are\s+now\s+/i,
  /act\s+as\s+(if\s+)?(you\s+)?(are|were)\s+/i,
  /pretend\s+(you\s+)?(are|to\s+be)/i,
  /system\s*:\s*/i,
  /\[INST\]/i,
  /<\|im_start\|>/i,
  /jailbreak/i,
  /DAN\s+mode/i,
];

const MAX_MESSAGE_LENGTH = 2000;

export function sanitizeUserInput(input: string): string {
  let sanitized = input.trim().slice(0, MAX_MESSAGE_LENGTH);
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  sanitized = sanitized.replace(/<[^>]*>/g, "");
  return sanitized;
}

export function detectPromptInjection(input: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

export function escapeForPrompt(text: string): string {
  return text.replace(/```/g, "'''").replace(/\n{3,}/g, "\n\n");
}

/** Strip Markdown so chat bubbles show plain conversational text */
export function formatAssistantReply(text: string): string {
  let result = text.replace(/\r\n/g, "\n");

  result = result.replace(/```[\s\S]*?```/g, (block) =>
    block.replace(/```\w*\n?/g, "").replace(/```/g, "").trim()
  );
  result = result.replace(/`([^`\n]+)`/g, "$1");
  result = result.replace(/\*\*([^*\n]+)\*\*/g, "$1");
  result = result.replace(/__([^_\n]+)__/g, "$1");
  result = result.replace(/\*([^*\n]+)\*/g, "$1");
  result = result.replace(/(?<![\w])_([^_\n]+)_(?!\w)/g, "$1");
  result = result.replace(/~~([^~\n]+)~~/g, "$1");
  result = result.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  result = result.replace(/^#{1,6}\s+/gm, "");
  result = result.replace(/^[\t ]*[-*+]\s+/gm, "");
  result = result.replace(/^[\t ]*\d+[.)]\s+/gm, "");
  result = result.replace(/\*\*/g, "");
  result = result.replace(/(?<=\s)\*(?=\s)/g, "");
  result = result.replace(/\n{3,}/g, "\n\n");

  return result.trim();
}
