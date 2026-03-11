"use client";

import { cn } from "@/lib/utils";

interface PaginationDotsProps {
  count: number;
  activeIndex: number;
  onSelect?: (index: number) => void;
  /** "dark" = dots on dark bg (white dots), "light" = dots on light bg (dark dots) */
  variant?: "dark" | "light";
  className?: string;
}

export default function PaginationDots({
  count,
  activeIndex,
  onSelect,
  variant = "dark",
  className,
}: PaginationDotsProps) {
  return (
    <div className={cn("flex gap-2", className)} role="tablist">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === activeIndex}
          onClick={() => onSelect?.(i)}
          className={cn(
            "h-2 w-2 rounded-full transition-colors duration-normal",
            variant === "dark"
              ? i === activeIndex
                ? "bg-foreground"
                : "bg-foreground/40 hover:bg-foreground/60"
              : i === activeIndex
                ? "bg-foreground-inverse"
                : "bg-foreground-inverse/40 hover:bg-foreground-inverse/60"
          )}
        />
      ))}
    </div>
  );
}
