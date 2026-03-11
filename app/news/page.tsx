"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/layouts";
import { Container } from "@/components/ui";
import { NewsFilters, NewsletterSection } from "@/components/sections";
import { getNewsContent, filterNewsArticles } from "@/lib/data";

export default function NewsPage() {
  const content = getNewsContent();
  const [category, setCategory] = useState("");
  const [industry, setIndustry] = useState("");

  const filteredListing = useMemo(
    () => filterNewsArticles(content.listing, category, industry),
    [content.listing, category, industry]
  );

  return (
    <MainLayout>
      {/* Section A — Hero + Featured articles */}
      <section
        id="news-page-section-a"
        className="group/news-page-section-a bg-surface pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 md:pb-40 overflow-clip"
        aria-labelledby="news-hero-heading"
      >
        <Container className="pt-8 sm:pt-12 md:pt-[6.25rem] pb-12 sm:pb-16 md:pb-[4.97rem]">
          <h1
            id="news-hero-heading"
            className="text-center mb-8 sm:mb-14 md:mb-[9.97rem] font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-foreground-inverse"
          >
            {content.hero.title}
          </h1>

          {/* Featured articles — alternating image left/right */}
          <div className="featured-articles">
            {content.featured.map((article, i) => (
              <Link
                key={article.href}
                href={article.href}
                prefetch={i < 2}
                className={`group/card flex max-sm:flex-col overflow-clip transition-opacity duration-300 hover:opacity-95 [&:hover_*]:duration-500 [&_*]:duration-300 ${
                  i > 0 ? "mt-12 sm:mt-20 md:mt-32 lg:mt-40" : ""
                }`}
              >
                <div
                  className={`image order-1 sm:w-[45%] aspect-[375/280] sm:aspect-[877/600] overflow-hidden max-sm:-mx-[var(--container-padding-x)] max-sm:w-[calc(100%+2*var(--container-padding-x))] ${
                    i % 2 === 1 ? "sm:order-2" : ""
                  }`}
                >
                  <div className="image-wrapper relative h-full overflow-hidden">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover/card:scale-[1.05]"
                      sizes="(max-width: 700px) 100vw, 700px"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : undefined}
                      quality={70}
                    />
                  </div>
                </div>
                <div
                  className={`info-wrapper flex-1 order-2 flex flex-col justify-center sm:pl-8 md:pl-12 lg:pl-[8.55rem] sm:pr-0 ${
                    i % 2 === 1 ? "sm:order-1 sm:pl-0 sm:pr-8 md:pr-12 lg:pr-[8.55rem]" : ""
                  }`}
                >
                  <div className="meta-wrapper flex flex-wrap items-center gap-x-4 sm:gap-x-[1.87rem] my-5 sm:my-0 sm:mb-10">
                    <span className="date eyebrow-text text-foreground-inverse">
                      {article.date}
                    </span>
                    <span className="eyebrow-text border border-foreground-inverse rounded px-2 sm:px-5 py-1 sm:py-2.5 text-foreground-inverse">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="gradient-default group-hover/card:gradient-hover font-display text-xl sm:text-4xl md:text-5xl lg:text-[6.25rem] font-bold uppercase tracking-tight line-clamp-4 sm:line-clamp-4 leading-tight">
                    {article.title}
                  </h2>
                  <div className="featured-in flex flex-wrap gap-2 sm:gap-2.5 max-sm:flex-col mt-5 sm:mt-[1.375rem]">
                    <span className="eyebrow-text text-foreground-inverse">
                      Featured In
                    </span>
                    <span className="font-display text-lg sm:text-2xl md:text-[2.5rem] font-medium text-foreground-inverse">
                      {article.featuredIn}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Section B — Filters + Listing */}
      <section
        id="news-page-section-b"
        className="group/news-page-section-b bg-bg max-sm:[&_h4]:!text-white sm:bg-surface sm:text-foreground-inverse overflow-clip"
        aria-labelledby="news-listing-heading"
      >
        <Container variant="full" className="pt-8 sm:pt-12 md:pt-[4.97rem] pb-12 sm:pb-16 md:pb-[10rem]">
          <NewsFilters
            category={category}
            industry={industry}
            onCategoryChange={setCategory}
            onIndustryChange={setIndustry}
            categories={content.filterCategories}
            industries={content.filterIndustries}
          />

          <h2 id="news-listing-heading" className="sr-only">
            All news articles
          </h2>
          <div className="listing">
            {filteredListing.map((article, i) => (
              <div key={`${article.href}-${i}`} className="contents">
                {/* Desktop card */}
                <Link
                  href={article.href}
                  title={article.title}
                  prefetch={i < 4}
                  className="desktop hidden sm:flex group/card transition-opacity duration-300 hover:opacity-95 [&:hover_*]:duration-500 [&_*]:duration-300 pb-10 sm:pb-20 border-b border-foreground-inverse mb-10 sm:mb-20"
                >
                  <div className="date eyebrow-text px-0 sm:py-2.5 sm:pl-0 sm:w-fit text-foreground sm:text-foreground-inverse">
                    {article.date}
                  </div>
                  <div className="category sm:pl-10 sm:w-[calc(20rem*var(--x-1))]">
                    <span className="eyebrow-text border border-foreground sm:border-foreground-inverse rounded px-2 sm:px-5 py-1 sm:py-2.5 text-foreground sm:text-foreground-inverse">
                      {article.category}
                    </span>
                  </div>
                  <div className="heading flex-1 sm:px-12">
                    <h3 className="gradient-default sm:group-hover/card:gradient-hover font-display text-xl sm:text-4xl md:text-[4.2rem] font-bold uppercase tracking-tight line-clamp-3">
                      {article.title}
                    </h3>
                    <div className="featured-in flex flex-wrap gap-2 sm:gap-2.5 max-sm:flex-col mt-5 sm:mt-[1.375rem]">
                      <span className="eyebrow-text text-foreground/80 sm:text-foreground-inverse/80">
                        Featured In
                      </span>
                      <h4 className="font-display text-lg sm:text-2xl md:text-[2.5rem] font-medium text-foreground sm:text-foreground-inverse">
                        {article.featuredIn}
                      </h4>
                    </div>
                  </div>
                  <div className="image sm:h-[12.4rem] sm:aspect-[1500/1072] overflow-hidden flex-shrink-0">
                    <div className="image-wrapper relative h-full overflow-hidden">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover/card:scale-[1.05]"
                        sizes="(max-width: 700px) 100vw, 300px"
                        loading="lazy"
                        quality={70}
                      />
                    </div>
                  </div>
                </Link>

                {/* Mobile card */}
                <Link
                  href={article.href}
                  prefetch={i < 2}
                  className={`mobile sm:hidden group/card block transition-opacity duration-300 hover:opacity-95 [&:hover_*]:duration-500 [&_*]:duration-300 ${
                    i === 0 ? "pt-0" : "py-10 border-t border-foreground"
                  }`}
                >
                  <div className="image relative aspect-[345/150] overflow-hidden">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover/card:scale-[1.05]"
                      sizes="100vw"
                      loading="lazy"
                      quality={70}
                    />
                  </div>
                  <div className="info-wrapper [&_*]:text-white">
                    <div className="meta-wrapper flex items-center gap-x-4 sm:gap-x-[1.87rem] my-5">
                      <span className="date eyebrow-text">{article.date}</span>
                      <span className="eyebrow-text border border-white rounded px-2 sm:px-5 py-1 sm:py-2.5">
                        {article.category}
                      </span>
                    </div>
                    <div className="wrapper">
                      <h4 className="max-w-[48rem] gradient-default line-clamp-3 font-display text-xl font-bold uppercase tracking-tight text-white">
                        {article.title}
                      </h4>
                      <div className="featured-in flex flex-wrap gap-2 max-sm:flex-col mt-5">
                        <span className="eyebrow-text text-white/80">
                          Featured In
                        </span>
                        <h4 className="font-display text-base font-medium text-white">
                          {article.featuredIn}
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section C — Newsletter */}
      <NewsletterSection
        heading={content.newsletter.heading}
        subheading={content.newsletter.subheading}
        placeholder={content.newsletter.placeholder}
        variant="cta"
      />
    </MainLayout>
  );
}
