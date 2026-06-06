"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export const AVATARS = {
  assistant: "/logo.svg",
  user: "user",
} as const;

type AvatarSize = "sm" | "md" | "lg";

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

const iconSizeMap: Record<AvatarSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

interface ChatAvatarProps {
  role: "assistant" | "user";
  size?: AvatarSize;
  className?: string;
}

export function ChatAvatar({
  role,
  size = "sm",
  className,
}: ChatAvatarProps) {
  const px = sizeMap[size];
  const isAssistant = role === "assistant";

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        isAssistant
          ? "border border-[#EFEFEF] bg-white"
          : "bg-[#EFEFEF]",
        className
      )}
      style={{ width: px, height: px }}
      aria-hidden
    >
      {isAssistant ? (
        <Image
          src={AVATARS.assistant}
          alt=""
          width={px}
          height={px}
          className="h-[78%] w-auto object-contain"
          priority
        />
      ) : (
        <User
          className={cn(iconSizeMap[size], "text-[#6B6B6B]")}
          strokeWidth={2}
          aria-hidden
        />
      )}
    </div>
  );
}

interface MessageRowProps {
  role: "assistant" | "user";
  children: React.ReactNode;
  className?: string;
}

export function MessageRow({ role, children, className }: MessageRowProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-2 px-4 py-1",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      <ChatAvatar role={role} className="mt-0.5" />
      <div
        className={cn(
          "flex min-w-0 max-w-[calc(100%-2.5rem)] flex-col gap-1",
          isUser ? "items-end" : "items-start"
        )}
      >
        {children}
      </div>
    </div>
  );
}
