import Link from "next/link";
import { cn } from "@/lib/utils";

type FuButtonVariant = "mint" | "outline" | "orange";

interface FuButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: FuButtonVariant;
  className?: string;
  external?: boolean;
  small?: boolean;
}

export function FuButton({
  href,
  children,
  variant = "mint",
  className,
  external,
  small,
}: FuButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-opacity hover:opacity-90",
    small ? "px-5 py-2 text-xs rounded-full" : "px-7 py-3 text-sm rounded-full",
    variant === "mint" && "bg-[#7D99AA] text-white",
    variant === "orange" && "bg-[#F15A24] text-white",
    variant === "outline" &&
      "border border-[#2B2B2B] text-[#2B2B2B] bg-transparent hover:bg-[#2B2B2B]/5",
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
