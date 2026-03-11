"use client";

import { useState } from "react";
import { Container, NewsletterForm } from "@/components/ui";

interface NewsletterProps {
  heading?: string;
  subline?: string;
  placeholder?: string;
}

export default function Newsletter({ heading = "Get our newsletter", subline = "Subscribe to Short Order.", placeholder = "Enter your email" }: NewsletterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative bg-accent py-16 sm:py-20 text-accent-dark">
      <Container>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-10 text-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
        >
          <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight">
            {heading}
          </h3>
          <svg
            width="43"
            height="25"
            viewBox="0 0 43 25"
            fill="none"
            className={`mx-auto sm:mx-0 transition-transform duration-300 ${isOpen ? "-scale-y-100" : "scale-y-100"}`}
          >
            <path
              d="M1.8335 2L21.5002 22L41.1668 2"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </button>
        <p className="text-center max-w-md mx-auto mt-4 sm:hidden text-body">
          {subline}
        </p>
        <div
          className={`grid transition-all duration-300 ease-out overflow-hidden ${
            isOpen ? "grid-rows-[1fr] mt-6 sm:mt-10" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <NewsletterForm
              variant="accent"
              placeholder={placeholder}
              className="pt-6 sm:pt-5 pb-0 sm:pb-24 max-w-[77rem] mx-auto"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
