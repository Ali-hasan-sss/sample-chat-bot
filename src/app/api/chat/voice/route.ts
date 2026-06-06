import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getOpenAIClient } from "@/lib/openai";
import { processChatMessage } from "@/lib/chat-process";
import { generateId } from "@/lib/utils";
import type { ChatHistoryItem } from "@/types/chat";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const historySchema = z.array(
  z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().max(2000),
  })
);

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
        { error: "Chat service is temporarily unavailable." },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("audio");
    const conversationId =
      (formData.get("conversationId") as string) || generateId();
    const historyRaw = formData.get("history") as string | null;

    if (!file || !(file instanceof Blob) || file.size === 0) {
      return NextResponse.json({ error: "No audio received." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Voice message too long. Max 60 seconds." },
        { status: 400 }
      );
    }

    let history: ChatHistoryItem[] = [];
    if (historyRaw) {
      try {
        const parsed = historySchema.safeParse(JSON.parse(historyRaw));
        if (parsed.success) history = parsed.data;
      } catch {
        // ignore invalid history
      }
    }

    const mimeType = file.type || "audio/webm";
    const ext = mimeType.includes("mp4") ? "mp4" : "webm";
    const openai = getOpenAIClient();
    const audioFile = new File([file], `voice.${ext}`, { type: mimeType });

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      response_format: "text",
    });

    const transcript =
      typeof transcription === "string"
        ? transcription.trim()
        : String(transcription).trim();

    if (!transcript) {
      return NextResponse.json(
        { error: "No speech detected in recording." },
        { status: 400 }
      );
    }

    const reply = await processChatMessage(transcript, history);

    return NextResponse.json({
      message: reply,
      conversationId,
      transcript,
    });
  } catch (error) {
    console.error("[chat voice API error]", error);
    return NextResponse.json(
      { error: "Could not process voice message." },
      { status: 500 }
    );
  }
}
