interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const DEFAULT_MAX = 20;
const DEFAULT_WINDOW_MS = 60_000;

export function rateLimit(
  identifier: string,
  max: number = DEFAULT_MAX,
  windowMs: number = DEFAULT_WINDOW_MS
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: max - 1, resetAt: now + windowMs };
  }

  if (entry.count >= max) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { success: true, remaining: max - entry.count, resetAt: entry.resetAt };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
