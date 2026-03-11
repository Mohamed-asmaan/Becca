"use client";

import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Container, Button } from "@/components/ui";
import { getParrishContent } from "@/lib/data";

export default function ParrishCoPage() {
  const parrish = getParrishContent();
  return (
    <MainLayout>
      {/* Hero — dark bg, PRESENTING PARRISH CO + image strip */}
      <section
        className="relative bg-bg pt-10 sm:pt-14 md:pt-16 min-h-screen flex flex-col overflow-hidden"
        aria-labelledby="parrish-hero-heading"
      >
        <Container className="flex-1 flex flex-col justify-center items-center py-12 sm:py-20 md:py-24">
          <h1
            id="parrish-hero-heading"
            className="font-display text-center text-pink"
          >
            <span className="block text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-2 sm:mb-4">
              {parrish.hero.eyebrow}
            </span>
            <span className="flex items-baseline justify-center gap-0 sm:gap-1">
              <span className="text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[14rem] 2xl:text-[18rem] font-bold uppercase tracking-tight max-w-full">
                {parrish.hero.title}
              </span>
              <span className="text-[0.6em] sm:text-[0.6em] -translate-y-[0.28em] pl-[0.1em] tracking-[0.025em] uppercase">
                {parrish.hero.titleSup}
              </span>
            </span>
          </h1>
        </Container>

        {/* Horizontal image strip */}
        <div className="flex gap-2 sm:gap-5 overflow-x-auto px-[var(--container-padding-x)] pb-10 sm:pb-16">
          {parrish.heroImages.map((src, i) => (
            <div
              key={src}
              className="relative flex-shrink-0 w-[13.5rem] sm:w-[32rem] h-[13.5rem] sm:h-[31.875rem] overflow-hidden"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 216px, 512px"
              />
            </div>
          ))}
        </div>

        {/* Tagline + description */}
        <Container className="pb-10 sm:pb-20">
          <div className="max-w-[45rem]">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-foreground">
              {parrish.hero.tagline}
            </h2>
            <p className="mt-5 sm:mt-6 text-body-lg text-foreground-muted max-w-[44rem]">
              {parrish.hero.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Foundational Growth — dark bg */}
      <section
        className="relative bg-bg py-20 sm:py-40 overflow-hidden"
        aria-labelledby="parrish-foundational-heading"
      >
        <Container>
          <div className="max-w-[73.5rem] mx-auto">
            <p className="text-label text-foreground mb-10 sm:mb-16">
              {parrish.foundational.eyebrow}
            </p>
            <h2
              id="parrish-foundational-heading"
              className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-pink mb-8 sm:mb-20"
            >
              {parrish.foundational.heading}
            </h2>
            <p className="text-body-lg text-foreground-muted max-w-[44rem] mb-12 sm:mb-20">
              {parrish.foundational.description}
            </p>

            <div className="pt-8 sm:pt-20 border-t border-foreground/20">
              <p className="text-label text-foreground mb-8 sm:mb-10">
                {parrish.foundational.servicesEyebrow}
              </p>
              <ul className="grid sm:grid-cols-2 sm:gap-x-[2.3rem] gap-y-3 text-foreground sm:w-fit">
                {parrish.foundational.services.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Work — salmon pink bg */}
      <section
        className="relative bg-pink py-12 sm:py-24 md:py-36 overflow-hidden"
        aria-labelledby="parrish-work-heading"
      >
        <Container>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10 sm:mb-24">
            <p className="text-label text-foreground-inverse">
              {parrish.work.eyebrow}
            </p>
            <Link
              href={parrish.work.viewAllHref}
              className="font-display text-sm font-medium uppercase tracking-nav text-foreground-inverse hover:text-accent transition-colors duration-200"
            >
              {parrish.work.viewAllLabel}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5">
            {parrish.work.projects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="group block overflow-hidden transition-opacity duration-300 hover:opacity-95"
              >
                <div className="relative aspect-[20/13] sm:aspect-[46.875/30] overflow-hidden">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[var(--image-zoom)]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex items-center justify-between mt-4 sm:mt-5 gap-4">
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground-inverse line-clamp-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="flex-shrink-0 text-foreground-inverse" aria-hidden>
                    <svg
                      viewBox="0 0 54 54"
                      fill="none"
                      className="w-6 h-6 sm:w-9 sm:h-9"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.7194 0.5H53.5001V37.0877H50.5001V5.62132L3.06077 53.0607L0.939453 50.9393L48.3788 3.5H14.7194V0.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA — dark green */}
      <section
        className="relative bg-cta-bg py-24 sm:py-32 overflow-hidden"
        aria-labelledby="parrish-cta-heading"
      >
        <Container>
          <div className="flex flex-col items-center text-center">
            <h2
              id="parrish-cta-heading"
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-accent max-w-[23rem] sm:max-w-[83rem] whitespace-pre-line"
            >
              {parrish.cta.heading}
            </h2>
            <div className="mt-10 sm:mt-20">
              <Button
                href={parrish.cta.buttonHref}
                variant="primary"
                className="!bg-surface !text-foreground-inverse !border-surface"
              >
                {parrish.cta.buttonLabel}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
