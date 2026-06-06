import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sanitizeUserInput } from "@/lib/sanitize";
import { translateMessageText } from "@/lib/translate";
import { replyLanguageSchema } from "@/lib/validations";

export const runtime = "nodejs";

const translateRequestSchema = z.object({
  text: z.string().min(1).max(4096),
  targetLanguage: replyLanguageSchema,
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(ip, 30, 60_000);
    if (!limit.success) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Translation service unavailable." },
        { status: 503 }
      );
    }

    const body: unknown = await request.json();
    const parsed = translateRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const text = sanitizeUserInput(parsed.data.text);
    if (!text) {
      return NextResponse.json({ error: "Empty text." }, { status: 400 });
    }

    const translation = await translateMessageText(
      text,
      parsed.data.targetLanguage
    );

    return NextResponse.json({ translation });
  } catch (error) {
    console.error("[translate API error]", error);
    return NextResponse.json(
      { error: "Could not translate message." },
      { status: 500 }
    );
  }
}
