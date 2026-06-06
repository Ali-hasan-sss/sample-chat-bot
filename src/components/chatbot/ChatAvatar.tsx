"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const AVATARS = {
  assistant: "/avatars/meridian-assistant.svg",
  guest: "/avatars/guest.svg",
} as const;

type AvatarSize = "sm" | "md" | "lg";

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

interface ChatAvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
}

export function ChatAvatar({
  src,
  alt,
  size = "sm",
  online = false,
  className,
}: ChatAvatarProps) {
  const px = sizeMap[size];

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: px, height: px }}
    >
      <Image
        src={src}
        alt={alt}
        width={px}
        height={px}
        className="rounded-full object-cover ring-2 ring-white/10"
        unoptimized
      />
      {online && (
        <span
          className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background"
          aria-label="Online"
        />
      )}
    </div>
  );
}
