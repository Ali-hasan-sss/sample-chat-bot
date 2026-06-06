"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import type { ReplyLanguage } from "@/lib/reply-language";

const FLAG_IDS: Record<ReplyLanguage, "gb" | "sa" | "de"> = {
  en: "gb",
  ar: "sa",
  de: "de",
};

interface LanguageFlagProps {
  language: ReplyLanguage;
  className?: string;
  size?: number;
}

/** SVG flags — reliable on Windows where emoji flags show as GB/SA/DE */
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
      {id === "sa" && <FlagSA size={size} clipId={clipId} />}
      {id === "de" && <FlagDE size={size} clipId={clipId} />}
    </span>
  );
}

function FlagGB({ size, clipId }: { size: number; clipId: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
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

function FlagSA({ size, clipId }: { size: number; clipId: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id={clipId}>
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="60" fill="#006C35" />
        <rect x="14" y="26" width="32" height="3" rx="1" fill="#fff" />
        <rect x="14" y="31" width="24" height="3" rx="1" fill="#fff" />
        <path
          d="M30 18 L34 24 L41 24 L35.5 28.5 L37.5 35.5 L30 31.5 L22.5 35.5 L24.5 28.5 L19 24 L26 24 Z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

function FlagDE({ size, clipId }: { size: number; clipId: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id={clipId}>
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="20" y="0" fill="#000" />
        <rect width="60" height="20" y="20" fill="#DD0000" />
        <rect width="60" height="20" y="40" fill="#FFCE00" />
      </g>
    </svg>
  );
}
