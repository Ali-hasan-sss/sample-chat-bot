"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface WidgetButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  layout?: "stack" | "inline";
}

export const WidgetButtonGroup = memo(function WidgetButtonGroup({
  children,
  className,
  layout = "stack",
}: WidgetButtonGroupProps) {
  return (
    <div
      className={cn(
        "px-4 pb-1 pt-1.5",
        layout === "stack" ? "space-y-2" : "flex flex-wrap gap-2",
        className
      )}
    >
      {children}
    </div>
  );
});
