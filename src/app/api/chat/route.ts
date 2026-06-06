import { NextResponse } from "next/server";
import { chatRequestSchema } from "@/lib/validations";
import { sanitizeUserInput } from "@/lib/sanitize";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { processChatMessage } from "@/lib/chat-process";
import { generateFallbackResponse } from "@/lib/openai";
import { escapeForPrompt } from "@/lib/sanitize";
import { generateId } from "@/lib/utils";
import type { ReplyLanguage } from "@/lib/reply-language";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let replyLanguage: ReplyLanguage | undefined;

  try {
    const ip = getClientIp(request);
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX ?? "20", 10);
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "60000", 10);
    const limit = rateLimit(ip, maxRequests, windowMs);

    if (!limit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((limit.resetAt - Date.now()) / 1000)
            ),
          },
        }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Chat service is temporarily unavailable." },
        { status: 503 }
      );
    }

    const body: unknown = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    replyLanguage = parsed.data.replyLanguage;

    const sanitized = sanitizeUserInput(parsed.data.message);
    if (!sanitized) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    const history = (parsed.data.history ?? []).map((item) => ({
      role: item.role,
      content: escapeForPrompt(item.content),
    }));

    const reply = await processChatMessage(
      sanitized,
      history,
      parsed.data.replyLanguage
    );

    return NextResponse.json({
      message: reply,
      conversationId: parsed.data.conversationId ?? generateId(),
    });
  } catch (error) {
    console.error("[chat API error]", error);
    return NextResponse.json(
      {
        message: await generateFallbackResponse(undefined, replyLanguage),
        conversationId: generateId(),
      },
      { status: 200 }
    );
  }
}
