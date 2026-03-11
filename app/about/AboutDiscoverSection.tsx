"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui";
const INTERVAL_MS = 6000;

export default function AboutDiscoverSection({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section
      id="about-page-section-e"
      className="group/about-page-section-e relative bg-bg min-h-screen flex flex-col justify-center text-foreground overflow-hidden"
      aria-labelledby="discover-heading"
    >
      <Container className="py-0">
        <p className="eyebrow-text text-center absolute top-16 sm:top-24 md:top-40 left-0 w-full text-foreground-muted">
          our approach
        </p>

        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
          {/* Rotating heading */}
          <div className="overflow-hidden relative w-full h-14 sm:h-16 md:h-20">
            <div
              className="will-change-transform transition-transform duration-500 ease-out [--slide-h:3.5rem] sm:[--slide-h:4rem] md:[--slide-h:5rem]"
              style={{
                transform: `translateY(calc(-${index} * var(--slide-h, 4rem)))`,
              }}
            >
              {items.map((item) => (
                <h1
                  key={item.title}
                  id="discover-heading"
                  className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tight text-center w-full h-14 sm:h-16 md:h-20 flex items-center justify-center"
                >
                  {item.title}
                </h1>
              ))}
            </div>
          </div>

          {/* Rotating description */}
          <div className="relative w-full flex justify-center mt-3 sm:mt-12">
            {items.map((item, i) => (
              <p
                key={item.title}
                className={`absolute w-full max-w-[18.9375rem] sm:max-w-[73rem] text-center text-base sm:text-lg leading-relaxed transition-opacity duration-500 ${
                  i === index ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {item.description}
              </p>
            ))}
          </div>
        </div>
      </Container>

      {/* Progress indicator */}
      <div
        className="absolute top-4 sm:top-8 right-4 sm:right-12 w-8 h-8 sm:w-24 sm:h-24 opacity-0 sm:opacity-100"
        aria-hidden
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M 50,50 m 0,-25 a 25,25 0 1 1 0,50 a 25,25 0 1 1 0,-50"
            stroke="#474747"
            strokeWidth="50"
            fill="none"
          />
          <path
            d="M 50,50 m 0,-25 a 25,25 0 1 1 0,50 a 25,25 0 1 1 0,-50"
            stroke="#ffffff"
            strokeWidth="50"
            fill="none"
            strokeDasharray="157.102 157.102"
            strokeDashoffset={157.102 - (157.102 * (index + 1)) / items.length}
            className="transition-[stroke-dashoffset] duration-500"
          />
        </svg>
      </div>
    </section>
  );
}
