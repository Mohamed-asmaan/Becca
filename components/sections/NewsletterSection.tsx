"use client";

import { cn } from "@/lib/utils";
import { Container, NewsletterForm } from "@/components/ui";

interface NewsletterSectionProps {
  heading: string;
  subheading: string;
  placeholder?: string;
  /** CTA dark green bg vs accent light green */
  variant?: "cta" | "accent";
  /** Use full-width container (no max-width) — e.g. on news page */
  containerVariant?: "full" | "content";
}

export default function NewsletterSection({
  heading,
  subheading,
  placeholder = "Enter your email",
  variant = "cta",
  containerVariant = "content",
}: NewsletterSectionProps) {
  const isCta = variant === "cta";
  return (
    <section
      className={isCta ? "relative bg-cta-bg py-16 sm:py-24 md:py-32 overflow-clip" : "relative bg-accent py-16 sm:py-20 overflow-clip"}
      aria-labelledby="newsletter-section-heading"
    >
      <Container variant={containerVariant}>
        <div className="flex flex-col items-center text-center">
          <h2
            id="newsletter-section-heading"
            className={cn(
              "font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight max-w-[23rem] sm:max-w-[83rem]",
              isCta ? "text-accent" : "text-accent-dark"
            )}
          >
            {heading}
          </h2>
          <p
            className={cn(
              "mt-5 sm:mt-6 max-w-[15.8rem] sm:max-w-[83rem] text-body-lg",
              isCta ? "text-foreground" : "text-accent-dark"
            )}
          >
            {subheading}
          </p>
          <NewsletterForm
            variant={variant}
            placeholder={placeholder}
            className="w-full sm:max-w-[77.4rem] mt-10 sm:mt-20"
          />
        </div>
      </Container>
    </section>
  );
}
