"use client";

import { memo, useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceMessagePlayerProps {
  src: string;
  duration?: number;
  isUser?: boolean;
  autoPlay?: boolean;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const VoiceMessagePlayer = memo(function VoiceMessagePlayer({
  src,
  duration = 0,
  isUser = false,
  autoPlay = false,
}: VoiceMessagePlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoPlayedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setTotalDuration(audio.duration);
      }
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onended = () => {
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  useEffect(() => {
    autoPlayedRef.current = false;
  }, [src]);

  useEffect(() => {
    if (!autoPlay || autoPlayedRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;

    autoPlayedRef.current = true;
    const tryPlay = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    };

    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      tryPlay();
    } else {
      audio.addEventListener("canplay", tryPlay, { once: true });
    }
  }, [autoPlay, src]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }, [playing]);

  return (
    <div
      className={cn(
        "flex items-center gap-3 min-w-[200px] max-w-[260px]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <button
        type="button"
        onClick={togglePlay}
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
          isUser
            ? "bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground"
            : "bg-white/10 hover:bg-white/20 text-foreground"
        )}
        aria-label={playing ? "Pause" : "Play voice message"}
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "h-1 rounded-full overflow-hidden mb-1",
            isUser ? "bg-primary-foreground/20" : "bg-white/10"
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-150",
              isUser ? "bg-primary-foreground" : "bg-primary"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-0.5 items-end h-4">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className={cn(
                  "w-0.5 rounded-full",
                  isUser ? "bg-primary-foreground/60" : "bg-primary/60",
                  playing ? "animate-pulse" : ""
                )}
                style={{ height: `${30 + ((i * 7) % 70)}%` }}
              />
            ))}
          </div>
          <span
            className={cn(
              "text-[10px] tabular-nums shrink-0",
              isUser ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {formatTime(currentTime || 0)} / {formatTime(totalDuration || duration)}
          </span>
        </div>
      </div>
    </div>
  );
});
