"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  requestMicrophoneAccess,
  getSupportedAudioMimeType,
  isVoiceRecordingSupported,
  isSecureContext,
  mapMicrophoneError,
} from "@/lib/speech";

type VoiceStatus = "idle" | "recording" | "processing";

interface UseVoiceInputOptions {
  onVoiceMessage: (blob: Blob, duration: number, mimeType: string) => void;
  onError?: (message: string) => void;
  maxDurationMs?: number;
}

export function useVoiceInput({
  onVoiceMessage,
  onError,
  maxDurationMs = 60_000,
}: UseVoiceInputOptions) {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const durationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordStartRef = useRef<number>(0);
  const mimeTypeRef = useRef<string>("");
  const cancelOnStopRef = useRef(false);
  const abortStartRef = useRef(false);
  const isRecordingRef = useRef(false);
  const supported = isVoiceRecordingSupported();

  const cleanupStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    isRecordingRef.current = false;
  }, []);

  const cancelRecording = useCallback(() => {
    cancelOnStopRef.current = true;
    abortStartRef.current = true;
    chunksRef.current = [];

    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    } else {
      cleanupStream();
      setStatus("idle");
      setRecordingDuration(0);
    }
  }, [cleanupStream]);

  const finishRecording = useCallback(() => {
    abortStartRef.current = false;
    cancelOnStopRef.current = false;

    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    } else if (!isRecordingRef.current) {
      abortStartRef.current = true;
    }
  }, []);

  const beginRecording = useCallback(async () => {
    if (isRecordingRef.current || status === "processing") return;

    if (!isSecureContext()) {
      onError?.(
        "Microphone requires HTTPS or localhost. Open via http://localhost:3000"
      );
      return;
    }

    const mimeType = getSupportedAudioMimeType();
    if (!mimeType) {
      onError?.("Voice recording is not supported in this browser.");
      return;
    }

    mimeTypeRef.current = mimeType;
    abortStartRef.current = false;

    try {
      cleanupStream();
      chunksRef.current = [];

      const stream = await requestMicrophoneAccess();
      if (abortStartRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;
      const recorder = new MediaRecorder(stream, { mimeType });
      recorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        cleanupStream();
        const wasCancelled = cancelOnStopRef.current;
        cancelOnStopRef.current = false;

        if (wasCancelled) {
          chunksRef.current = [];
          setStatus("idle");
          setRecordingDuration(0);
          return;
        }

        const blob = new Blob(chunksRef.current, { type: mimeTypeRef.current });
        chunksRef.current = [];
        const duration = Math.max(
          1,
          Math.round((Date.now() - recordStartRef.current) / 1000)
        );
        setRecordingDuration(0);

        if (blob.size > 0) {
          onVoiceMessage(blob, duration, mimeTypeRef.current);
        } else {
          onError?.("No audio captured. Please try again.");
        }
        setStatus("idle");
      };

      recorder.onerror = () => {
        cleanupStream();
        setStatus("idle");
        setRecordingDuration(0);
        onError?.("Recording failed. Please try again.");
      };

      recordStartRef.current = Date.now();
      recorder.start(250);
      isRecordingRef.current = true;
      setStatus("recording");
      setRecordingDuration(0);

      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration(
          Math.floor((Date.now() - recordStartRef.current) / 1000)
        );
      }, 200);

      timerRef.current = setTimeout(() => {
        finishRecording();
      }, maxDurationMs);
    } catch (error) {
      cleanupStream();
      setStatus("idle");
      setRecordingDuration(0);
      onError?.(mapMicrophoneError(error));
    }
  }, [
    status,
    cleanupStream,
    onVoiceMessage,
    onError,
    maxDurationMs,
    finishRecording,
  ]);

  useEffect(() => {
    return () => {
      abortStartRef.current = true;
      if (recorderRef.current?.state === "recording") {
        cancelOnStopRef.current = true;
        recorderRef.current.stop();
      }
      cleanupStream();
    };
  }, [cleanupStream]);

  return {
    supported,
    isRecording: status === "recording",
    isProcessing: status === "processing",
    isBusy: status !== "idle",
    recordingDuration,
    beginRecording,
    finishRecording,
    cancelRecording,
  };
}
