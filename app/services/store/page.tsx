"use client";

import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Button, Container } from "@/components/ui";
import { getServicesContent } from "@/lib/data";

export default function StorePage() {
  const content = getServicesContent();
  const { store } = content;

  return (
    <MainLayout>
      <section
        className="relative bg-bg pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32"
        aria-labelledby="store-heading"
      >
        <Container>
          <h1
            id="store-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-foreground text-center mb-6"
          >
            {store.heading}
          </h1>
          <p className="text-body text-foreground-muted text-center max-w-[35rem] mx-auto mb-12 sm:mb-20">
            {store.intro}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10">
            {store.products.map((product) => (
              <Link
                key={product.title}
                href={product.href}
                target={product.external ? "_blank" : undefined}
                rel={product.external ? "noopener noreferrer" : undefined}
                className="group block overflow-hidden transition-opacity duration-300 hover:opacity-95"
              >
                <div className="relative aspect-[165/232] sm:aspect-[427/600] overflow-hidden rounded-sm mb-3 sm:mb-5 [&_img]:transition-transform [&_img]:duration-300 group-hover:[&_img]:scale-[1.02]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    quality={70}
                  />
                </div>
                <p className="text-label text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-3">
                  {product.title}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 sm:mt-20 text-center">
            <Button href="/connect" variant="outline">
              Get in touch
            </Button>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
