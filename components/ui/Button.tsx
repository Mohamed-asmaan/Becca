import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "outline-inverse";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "outline",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-nav transition-colors duration-normal";
  const variants = {
    primary:
      "bg-surface text-foreground-inverse border border-surface hover:opacity-90 hover:border-foreground-inverse/20",
    outline: "border border-foreground text-foreground hover:bg-foreground hover:text-bg",
    "outline-inverse":
      "border border-foreground-inverse text-foreground-inverse hover:bg-foreground-inverse hover:text-surface",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
