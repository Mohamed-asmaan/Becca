"use client";

import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Button, Container } from "@/components/ui";
import { CTA } from "@/components/sections";
import { getServicesContent, getHomeContent } from "@/lib/data";

export default function ServicesPage() {
  const content = getServicesContent();
  const homeContent = getHomeContent();
  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative bg-bg pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-20 md:pb-24"
        aria-labelledby="services-hero-heading"
      >
        <Container>
          <h1
            id="services-hero-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-foreground text-center"
          >
            {content.hero.title}
          </h1>
        </Container>
      </section>

      {/* What We Do */}
      <section
        className="relative bg-surface"
        aria-labelledby="what-we-do-heading"
      >
        <Container className="pt-8 sm:pt-20 md:pt-40 pb-0">
          <p
            id="what-we-do-heading"
            className="text-label text-foreground-inverse mb-8 sm:mb-14 md:mb-20"
          >
            What We Do
          </p>
        </Container>

        <div className="divide-y divide-foreground-inverse/10">
          {content.whatWeDo.map((service) => (
            <article
              key={service.title}
              className="py-10 sm:py-20 first:pt-0"
            >
              <Container>
                <div className="overflow-hidden rounded-sm mb-6 sm:mb-14 md:mb-20">
                  <div className="relative aspect-[345/215] sm:aspect-[1776/688] w-full">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 1920px"
                      quality={70}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-12 md:gap-20">
                  <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground-inverse">
                    {service.title}
                  </h2>
                  <div className="sm:max-w-[45rem]">
                    <p className="text-body text-foreground-inverse">
                      {service.description}
                    </p>
                    <ul className="mt-5 list-none space-y-2">
                      {(service.bullets ?? []).map((b) => (
                        <li
                          key={b}
                          className="text-body text-foreground-inverse"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 sm:mt-10">
                      <Button href={service.href} variant="outline">
                        Explore Work
                      </Button>
                    </div>
                  </div>
                </div>
              </Container>
            </article>
          ))}
        </div>
      </section>

      {/* Parrish Co */}
      <section
        className="relative bg-bg py-10 sm:py-20"
        aria-labelledby="parrish-heading"
      >
        <Container>
          <div className="overflow-hidden rounded-sm mb-8 sm:mb-20">
            <div className="relative aspect-[345/215] sm:aspect-[1776/688] w-full">
              <Image
                src={content.parrish.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 1920px"
                quality={70}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-8 sm:gap-20">
            <h2
              id="parrish-heading"
              className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-pink"
            >
              {content.parrish.title}
            </h2>
            <div className="sm:max-w-[45rem]">
              <p className="text-body text-foreground">
                {content.parrish.description}
              </p>
              <div className="mt-8 sm:mt-10">
                <Button href={content.parrish.href} variant="outline-inverse">
                  Explore Work
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Work */}
      <section
        className="relative bg-surface py-10 sm:py-20"
        aria-labelledby="work-heading"
      >
        <Container>
          <h2
            id="work-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-foreground-inverse text-center"
          >
            {content.work.heading}
          </h2>
          <p className="mt-8 sm:mt-10 text-body text-foreground-inverse text-center max-w-[68rem] mx-auto">
            {content.work.intro}
          </p>

          <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {content.work.images.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-sm aspect-[625/645] ${
                  i === 4 ? "sm:-mt-8" : ""
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  quality={70}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-20 flex justify-center">
            <Button href={content.work.ctaHref} variant="outline">
              {content.work.ctaLabel}
            </Button>
          </div>
        </Container>
      </section>

      {/* Our Clients */}
      <section
        className="relative bg-bg py-12 sm:py-20 md:py-28"
        aria-labelledby="clients-heading"
      >
        <Container>
          <h2
            id="clients-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-foreground text-center mb-6 sm:mb-16 md:mb-28"
          >
            our clients
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 min-[1000px]:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-4 sm:gap-y-6">
            {homeContent.clients.map((client) => (
              <li
                key={client}
                className="text-sm sm:text-base font-medium text-foreground py-2 sm:py-4 border-b border-foreground/20"
              >
                {client}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Marketing Explained */}
      <section
        className="relative bg-surface py-10 sm:py-20"
        aria-labelledby="marketing-heading"
      >
        <Container>
          <h2
            id="marketing-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-foreground-inverse text-center"
          >
            {content.marketing.heading}
          </h2>
          <p className="mt-8 sm:mt-10 text-body text-foreground-inverse text-center max-w-[68rem] mx-auto">
            {content.marketing.intro}
          </p>

          <div className="mt-10 sm:mt-16 max-w-[73.5rem] mx-auto">
            <div className="relative aspect-[375/220] sm:aspect-[1176/647] overflow-hidden rounded-sm">
              <video
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster={content.marketing.thumbnail}
              >
                <source
                  src={content.marketing.videoDesktop}
                  type="video/mp4"
                  media="(min-width: 641px)"
                />
                <source
                  src={content.marketing.videoMobile}
                  type="video/mp4"
                  media="(max-width: 640px)"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Store */}
      <section
        className="relative bg-bg py-10 sm:py-20"
        aria-labelledby="store-heading"
      >
        <Container>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:pb-20">
            <p
              id="store-heading"
              className="text-label text-foreground"
            >
              {content.store.heading}
            </p>
            <p className="text-body text-foreground max-w-[35rem] sm:text-right">
              {content.store.intro}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="max-sm:hidden flex flex-col">
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground mb-10">
                shop becca
              </h3>
              <Button href={content.store.ctaHref} variant="outline-inverse">
                {content.store.ctaLabel}
              </Button>
            </div>
            {content.store.products.map((product) => (
              <Link
                key={product.title}
                href={product.href}
                target={product.external ? "_blank" : undefined}
                rel={product.external ? "noopener noreferrer" : undefined}
                className="group block transition-opacity duration-300 hover:opacity-95"
              >
                <div className="relative aspect-[165/232] sm:aspect-[427/600] overflow-hidden rounded-sm mb-3 sm:mb-5 group-hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    quality={70}
                  />
                </div>
                <p className="text-label text-foreground group-hover:text-accent transition-colors line-clamp-3">
                  {product.title}
                </p>
              </Link>
            ))}
            <Link
              href={content.store.ctaHref}
              className="sm:hidden flex flex-col items-center justify-center aspect-[165/232] bg-accent rounded-sm text-accent-dark font-display font-bold uppercase tracking-tight transition-opacity duration-300 hover:opacity-90"
            >
              {content.store.ctaLabel}
            </Link>
          </div>
        </Container>
      </section>

      <CTA />
    </MainLayout>
  );
}
