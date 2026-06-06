import Image from "next/image";
import { cn } from "@/lib/utils";

interface SiteImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function SiteImage({
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: SiteImageProps) {
  return (
    <div className={cn("relative overflow-hidden fu-rounded", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
