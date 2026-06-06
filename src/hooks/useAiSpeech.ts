"use client";

import { useCallback, useRef, useState, useEffect } from "react";

export function useAiSpeech() {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const supported = true;

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    cleanup();
    setSpeakingId(null);
    setLoadingId(null);
  }, [cleanup]);

  const speak = useCallback(
    async (text: string, messageId: string) => {
      if (speakingId === messageId || loadingId === messageId) {
        stopSpeaking();
        return;
      }

      cleanup();
      setError(null);
      setLoadingId(messageId);

      try {
        const response = await fetch("/api/speech", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error ?? "Could not generate AI voice.");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        urlRef.current = url;

        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          setSpeakingId(null);
          cleanup();
        };

        audio.onerror = () => {
          setError("Could not play audio.");
          setSpeakingId(null);
          cleanup();
        };

        setLoadingId(null);
        setSpeakingId(messageId);
        await audio.play();
      } catch (err) {
        setLoadingId(null);
        setSpeakingId(null);
        setError(
          err instanceof Error ? err.message : "Could not play AI voice."
        );
      }
    },
    [speakingId, loadingId, stopSpeaking, cleanup]
  );

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return {
    supported,
    speakingId,
    loadingId,
    error,
    speak,
    stopSpeaking,
  };
}
