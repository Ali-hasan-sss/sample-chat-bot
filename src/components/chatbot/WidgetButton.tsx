"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { useChatTheme } from "./ChatThemeContext";

interface WidgetButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const WidgetButton = memo(function WidgetButton({
  children,
  onClick,
  disabled,
  selected,
  fullWidth = true,
  className,
  style,
  ariaLabel,
}: WidgetButtonProps) {
  const { theme } = useChatTheme();

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={selected}
      style={
        selected
          ? {
              ...style,
              borderColor: theme.accent,
              boxShadow: `0 0 0 1px ${theme.accentSoft}`,
            }
          : style
      }
      className={cn(
        "rounded-lg border border-[#D8D8D8] bg-white text-[#2B2B2B]",
        "transition-colors hover:bg-[#FAFAFA] active:bg-[#F5F5F5] disabled:opacity-50",
        fullWidth
          ? "w-full px-3 py-2.5 text-left text-[13px]"
          : "w-auto shrink-0 px-3 py-1.5 text-xs whitespace-nowrap",
        className
      )}
    >
      {children}
    </button>
  );
});
