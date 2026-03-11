"use client";

import { cn } from "@/lib/utils";

/** Chevron icons — dark (#282828) for light bg, light (#fff) for dark bg */
const CHEVRON_DARK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23282828' stroke-width='2'%3E%3Cpath d='m12 14.536-.045.043.045-.043-5.3-5.114 5.3 5.114 5.3-5.114-5.3 5.114.045.043Z'/%3E%3C/svg%3E\")";
const CHEVRON_LIGHT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3E%3Cpath d='m12 14.536-.045.043.045-.043-5.3-5.114 5.3 5.114 5.3-5.114-5.3 5.114.045.043Z'/%3E%3C/svg%3E\")";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly FilterOption[];
  ariaLabel: string;
  className?: string;
  /** light = surface bg, dark = dark bg, responsive = dark on mobile / light on sm+ (news section B) */
  variant?: "light" | "dark" | "responsive";
}

export default function FilterSelect({
  value,
  onChange,
  options,
  ariaLabel,
  className,
  variant = "light",
}: FilterSelectProps) {
  const borderBgClasses =
    variant === "light"
      ? "border border-foreground-inverse/30 bg-surface text-foreground-inverse"
      : variant === "dark"
        ? "border border-foreground-inverse/30 bg-transparent text-foreground-inverse"
        : "border border-foreground sm:border-foreground-inverse/30 bg-transparent text-foreground sm:text-foreground-inverse";
  const chevronStyle =
    variant === "responsive"
      ? undefined
      : { backgroundImage: variant === "light" ? CHEVRON_DARK : CHEVRON_LIGHT };
  return (
    <label className="block">
      <span className="sr-only">{ariaLabel}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className={cn(
          "w-full min-h-[2.2rem] sm:min-h-[2.55rem] px-4 pr-10 text-sm font-medium uppercase tracking-nav cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-accent appearance-none bg-no-repeat bg-[length:1rem] bg-[right_0.5rem_center]",
          "transition-colors duration-200 hover:border-accent/50",
          borderBgClasses,
          className
        )}
        style={chevronStyle}
        data-variant={variant}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
