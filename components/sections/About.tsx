"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { getAboutImages } from "@/lib/data";

const LAYOUT = [0, 7, 1, 4, 6, 5, 3, 2] as const;
const HEIGHTS = [220, 180, 260, 200, 240, 200, 240, 220] as const;
/** LCP image (RC_DSC_9376_1-1-scaled.jpg) is at layout index 2 */
const LCP_LAYOUT_INDEX = 2;

export default function About() {
  const images = getAboutImages();
  const IMAGES =
    images.length >= 8
      ? LAYOUT.map((i, idx) => ({ src: images[i].src, alt: images[i].alt, grayscale: images[i].grayscale, h: HEIGHTS[idx] }))
      : images.map((img, idx) => ({ src: img.src, alt: img.alt, grayscale: img.grayscale, h: HEIGHTS[idx % HEIGHTS.length] }));
  return (
    <section
      id="home-page-section-c"
      className="group/home-page-section-c relative z-[5] bg-bg overflow-hidden py-16 sm:py-24 md:py-28"
    >
      <Container>
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <p className="max-w-[72.25rem] mx-auto text-base sm:text-body-lg leading-relaxed text-foreground">
            We understand hospitality at its core. We&apos;ll shape your story,
            hone your vision and grow your audience. From our offices in New
            York, Los Angeles and London, we help create the places people talk
            about.
          </p>
          <div className="pt-6 sm:pt-8">
            <Link
              href="/about"
              className="inline-flex items-center justify-center min-w-[160px] sm:min-w-[170px] px-6 py-3 text-sm font-medium uppercase tracking-nav bg-surface text-foreground-inverse border border-surface hover:bg-foreground-inverse hover:text-surface transition-colors duration-300"
            >
              ABOUT US
            </Link>
          </div>
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-6 [column-fill:balance]">
          {IMAGES.map(({ src, alt, grayscale, h }, idx) => (
            <div
              key={idx}
              className="break-inside-avoid mb-4 sm:mb-6 w-full overflow-hidden rounded-sm"
            >
              <div
                className={`w-full overflow-hidden relative ${grayscale ? "grayscale" : ""}`}
                style={{ aspectRatio: `220 / ${h}` }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-center"
                  loading={idx < 4 ? "eager" : "lazy"}
                  fetchPriority={idx === LCP_LAYOUT_INDEX ? "high" : undefined}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
