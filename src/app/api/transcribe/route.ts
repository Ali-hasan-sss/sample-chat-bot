import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getOpenAIClient } from "@/lib/openai";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(ip, 15, 60_000);
    if (!limit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Voice service is temporarily unavailable." },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("audio");

    if (!file || !(file instanceof Blob) || file.size === 0) {
      return NextResponse.json({ error: "No audio received." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Recording too long. Keep it under 60 seconds." },
        { status: 400 }
      );
    }

    const mimeType = file.type || "audio/webm";

    const ext = mimeType.includes("mp4")
      ? "mp4"
      : mimeType.includes("ogg")
        ? "ogg"
        : "webm";

    const openai = getOpenAIClient();
    const audioFile = new File([file], `voice.${ext}`, { type: mimeType });

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      response_format: "text",
    });

    const text =
      typeof transcription === "string"
        ? transcription.trim()
        : String(transcription).trim();

    if (!text) {
      return NextResponse.json(
        { error: "No speech detected. Please speak clearly and try again." },
        { status: 400 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("[transcribe API error]", error);
    return NextResponse.json(
      { error: "Could not process voice message. Please try again." },
      { status: 500 }
    );
  }
}
