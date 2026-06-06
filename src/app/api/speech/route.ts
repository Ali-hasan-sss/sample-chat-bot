import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getOpenAIClient } from "@/lib/openai";
import { detectLangFromText } from "@/lib/speech";
import { sanitizeUserInput } from "@/lib/sanitize";
import {
  pickTtsVoiceForLanguage,
  type ReplyLanguage,
} from "@/lib/reply-language";
import { replyLanguageSchema } from "@/lib/validations";

export const runtime = "nodejs";

const speechRequestSchema = z.object({
  text: z.string().min(1).max(4096),
  replyLanguage: replyLanguageSchema.optional(),
});

function pickVoice(text: string, replyLanguage?: ReplyLanguage): string {
  if (replyLanguage) {
    return pickTtsVoiceForLanguage(replyLanguage);
  }

  const configured = process.env.OPENAI_TTS_VOICE;
  if (configured) return configured;

  const lang = detectLangFromText(text);
  if (lang === "ar") return "nova";
  return "alloy";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(ip, 20, 60_000);
    if (!limit.success) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Speech service unavailable." },
        { status: 503 }
      );
    }

    const body: unknown = await request.json();
    const parsed = speechRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const text = sanitizeUserInput(parsed.data.text);
    if (!text) {
      return NextResponse.json({ error: "Empty text." }, { status: 400 });
    }

    const openai = getOpenAIClient();
    const model = process.env.OPENAI_TTS_MODEL ?? "tts-1";
    const voice = pickVoice(text, parsed.data.replyLanguage);

    const response = await openai.audio.speech.create({
      model,
      voice: voice as "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer",
      input: text,
      response_format: "mp3",
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[speech API error]", error);
    return NextResponse.json(
      { error: "Could not generate speech." },
      { status: 500 }
    );
  }
}
