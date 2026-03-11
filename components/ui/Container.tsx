import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** content = 80rem (default), full = no max-width, narrow = 65ch, wide = 90rem */
  variant?: "full" | "content" | "narrow" | "wide";
}

export default function Container({
  children,
  className,
  variant = "content",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-[var(--container-padding-x)]",
        variant === "content" && "max-w-[var(--content-max-width)]",
        variant === "full" && "",
        variant === "narrow" && "max-w-[65ch]",
        variant === "wide" && "max-w-[90rem]",
        className
      )}
    >
      {children}
    </div>
  );
}
