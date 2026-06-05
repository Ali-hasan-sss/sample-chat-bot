import { NextResponse } from "next/server";
import { chatRequestSchema } from "@/lib/validations";
import {
  sanitizeUserInput,
  detectPromptInjection,
  escapeForPrompt,
} from "@/lib/sanitize";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  retrieveRelevantChunks,
  buildContextFromChunks,
} from "@/lib/rag/retrieval";
import {
  generateChatResponse,
  generateFallbackResponse,
} from "@/lib/openai";
import {
  BASE_ASSISTANT_CONTEXT,
} from "@/lib/conversation";
import { generateId } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
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

    const sanitized = sanitizeUserInput(parsed.data.message);

    if (!sanitized) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    if (detectPromptInjection(sanitized)) {
      const fallback = await generateFallbackResponse(sanitized);
      return NextResponse.json({
        message: fallback,
        conversationId: parsed.data.conversationId ?? generateId(),
      });
    }

    const chunks = retrieveRelevantChunks(sanitized);
    const ragContext = buildContextFromChunks(chunks);

    const context = [BASE_ASSISTANT_CONTEXT, ragContext]
      .filter(Boolean)
      .join("\n\n");

    const safeMessage = escapeForPrompt(sanitized);
    const history = (parsed.data.history ?? []).map((item) => ({
      role: item.role,
      content: escapeForPrompt(item.content),
    }));

    const reply = await generateChatResponse(
      safeMessage,
      context || BASE_ASSISTANT_CONTEXT,
      history
    );

    return NextResponse.json({
      message: reply,
      conversationId: parsed.data.conversationId ?? generateId(),
    });
  } catch (error) {
    console.error("[chat API error]", error);

    return NextResponse.json(
      {
        message: await generateFallbackResponse(),
        conversationId: generateId(),
      },
      { status: 200 }
    );
  }
}
