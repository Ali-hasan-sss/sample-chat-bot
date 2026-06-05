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
