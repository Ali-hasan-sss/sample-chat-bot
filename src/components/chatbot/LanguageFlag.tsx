"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import type { ReplyLanguage } from "@/lib/reply-language";

const FLAG_IDS: Record<ReplyLanguage, "gb" | "de" | "fr"> = {
  en: "gb",
  de: "de",
  fr: "fr",
};

interface LanguageFlagProps {
  language: ReplyLanguage;
  className?: string;
  size?: number;
}

export function LanguageFlag({
  language,
  className,
  size = 20,
}: LanguageFlagProps) {
  const clipId = useId().replace(/:/g, "");
  const id = FLAG_IDS[language];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-full shadow-sm",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {id === "gb" && <FlagGB size={size} clipId={clipId} />}
      {id === "de" && <FlagDE size={size} clipId={clipId} />}
      {id === "fr" && <FlagFR size={size} clipId={clipId} />}
    </span>
  );
}

function FlagGB({ size, clipId }: { size: number; clipId: string }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      <clipPath id={clipId}>
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="60" fill="#012169" />
        <path d="M0 0 L60 60 M60 0 L0 60" stroke="#fff" strokeWidth="10" />
        <path d="M0 0 L60 60 M60 0 L0 60" stroke="#C8102E" strokeWidth="6" />
        <path d="M30 0 V60 M0 30 H60" stroke="#fff" strokeWidth="16" />
        <path d="M30 0 V60 M0 30 H60" stroke="#C8102E" strokeWidth="10" />
      </g>
    </svg>
  );
}

function FlagDE({ size, clipId }: { size: number; clipId: string }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      <clipPath id={clipId}>
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="20" fill="#000" />
        <rect width="60" height="20" y="20" fill="#DD0000" />
        <rect width="60" height="20" y="40" fill="#FFCE00" />
      </g>
    </svg>
  );
}

function FlagFR({ size, clipId }: { size: number; clipId: string }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size}>
      <clipPath id={clipId}>
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="20" height="60" fill="#002395" />
        <rect width="20" height="60" x="20" fill="#fff" />
        <rect width="20" height="60" x="40" fill="#ED2939" />
      </g>
    </svg>
  );
}
