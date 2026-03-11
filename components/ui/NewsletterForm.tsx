"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const ARROW_ICON = (
  <svg width="24" height="24" viewBox="0 0 54 54" fill="none" aria-hidden>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.7194 0.5H53.5001V37.0877H50.5001V5.62132L3.06077 53.0607L0.939453 50.9393L48.3788 3.5H14.7194V0.5Z"
      fill="currentColor"
    />
  </svg>
);

export type NewsletterStatus = "idle" | "loading" | "success" | "error";

interface NewsletterFormProps {
  placeholder?: string;
  /** CTA bg (dark) vs accent (light green) */
  variant?: "cta" | "accent";
  onSubmit?: (email: string) => Promise<void>;
  className?: string;
}

export default function NewsletterForm({
  placeholder = "Enter your email",
  variant = "cta",
  onSubmit: onSubmitProp,
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>("idle");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!trimmed) return;
      setStatus("loading");
      try {
        if (onSubmitProp) {
          await onSubmitProp(trimmed);
        } else {
          await new Promise((r) => setTimeout(r, 800));
        }
        setStatus("success");
        setEmail("");
      } catch {
        setStatus("error");
      }
    },
    [email, onSubmitProp]
  );

  const isCta = variant === "cta";
  const statusId = "newsletter-form-status";

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div
        className={cn(
          "relative flex items-center border-b-2 pb-4 sm:pb-5",
          isCta ? "border-foreground" : "border-accent-dark"
        )}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === "loading"}
          required
          aria-invalid={status === "error"}
          aria-describedby={status !== "idle" ? statusId : undefined}
          className={cn(
            "w-full bg-transparent border-none outline-none text-label py-2 pr-12 sm:pr-20 disabled:opacity-60",
            isCta
              ? "text-foreground placeholder-foreground/40"
              : "text-accent-dark placeholder-accent-dark/40"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "absolute right-0 top-0 p-2 cursor-pointer transition-opacity duration-200 hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed",
            isCta ? "text-foreground" : "text-accent-dark"
          )}
          aria-label="Subscribe"
        >
          {ARROW_ICON}
        </button>
      </div>
      <p
        id={statusId}
        className={cn(
          "mt-3 text-body",
          isCta ? "text-foreground" : "text-accent-dark"
        )}
        role="status"
      >
        {status === "success" && "Thanks! You're subscribed."}
        {status === "error" && "Something went wrong. Please try again."}
        {status === "loading" && "Subscribing…"}
      </p>
    </form>
  );
}
