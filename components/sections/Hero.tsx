"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  headline1?: string;
  headline2?: string;
  tagline?: string;
}

export default function Hero({ headline1 = "Hospitality", headline2 = "Reimagined", tagline = "We set the table for cultural connection and build legacies that last." }: HeroProps) {
  const [entrance, setEntrance] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hospitalityRef = useRef<HTMLHeadingElement>(null);
  const reimaginedRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Lock scroll: inline script in layout adds class before React
  useLayoutEffect(() => {
    document.documentElement.classList.add("hero-entrance-lock");
    return () => document.documentElement.classList.remove("hero-entrance-lock");
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const videoWrap = videoWrapRef.current;
    const overlay = overlayRef.current;
    const hospitality = hospitalityRef.current;
    const reimagined = reimaginedRef.current;
    const tagline = taglineRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !videoWrap || !overlay || !hospitality || !reimagined || !tagline) return;

    const headerEl = document.querySelector<HTMLElement>("[data-hero-header]");

    const preventScroll = (e: Event) => e.preventDefault();
    document.addEventListener("wheel", preventScroll, { passive: false, capture: true });
    document.addEventListener("touchmove", preventScroll, { passive: false, capture: true });

    const unlockScroll = () => {
      document.removeEventListener("wheel", preventScroll, { capture: true });
      document.removeEventListener("touchmove", preventScroll, { capture: true });
      document.documentElement.classList.remove("hero-entrance-lock");
      setEntrance(false);
    };

    gsap.set(hospitality, { opacity: 0, y: 40 });
    gsap.set(reimagined, { opacity: 0, y: 30 });
    gsap.set(tagline, { opacity: 0, y: 20 });
    if (scrollHint) gsap.set(scrollHint, { opacity: 0, y: 20 });

    const setupScrollTimeline = () => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300dvh",
          pin: true,
          scrub: 1.5,
          onUpdate: (self) => {
            document.documentElement.dataset.heroVideoFull =
              self.progress > 0.2 ? "true" : "";
            if (headerEl) {
              headerEl.style.pointerEvents = self.progress > 0.5 ? "none" : "";
            }
          },
        },
      });
      if (headerEl) {
        tl.to(headerEl, { yPercent: -100, duration: 0.5, ease: "power2.inOut", overwrite: "auto" }, 0);
      }
      tl.fromTo(videoWrap, { width: "1px", height: "1px" }, { width: "100vw", height: "100dvh", duration: 0.5, ease: "power2.inOut" }, 0);
      tl.to(overlay, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0.1);
      tl.to(hospitality, { yPercent: -120, opacity: 0, duration: 0.45, ease: "power2.in", overwrite: "auto" }, 0);
      tl.to(reimagined, { yPercent: 120, opacity: 0, duration: 0.45, ease: "power2.in", overwrite: "auto" }, 0);
      tl.to(tagline, { opacity: 0, duration: 0.3 }, 0);
      if (scrollHint) tl.to(scrollHint, { opacity: 0, duration: 0.3 }, 0.1);
      tl.to({}, { duration: 0.5 }, 0.5);
    };

    const entranceTl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        unlockScroll();
        requestAnimationFrame(() => {
          setupScrollTimeline();
        });
      },
    });
    entranceTl.to(hospitality, { opacity: 1, y: 0, duration: 0.8 }, 0);
    entranceTl.to(reimagined, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
    entranceTl.to(tagline, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
    if (scrollHint) {
      entranceTl.to(scrollHint, { opacity: 1, y: 0, duration: 0.5 }, 0.7);
    }

    const video = videoRef.current;
    const playVideo = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };
    let playTimeout: ReturnType<typeof setTimeout> | undefined;
    if (video) {
      playVideo();
      video.addEventListener("loadeddata", playVideo);
      video.addEventListener("canplay", playVideo);
      playTimeout = setTimeout(playVideo, 800);
    }
    const observer = video
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) playVideo();
            });
          },
          { threshold: 0 }
        )
      : null;
    if (video && observer) observer.observe(section);

    return () => {
      if (playTimeout) clearTimeout(playTimeout);
      document.removeEventListener("wheel", preventScroll, { capture: true });
      document.removeEventListener("touchmove", preventScroll, { capture: true });
      document.documentElement.classList.remove("hero-entrance-lock");
      ScrollTrigger.getAll().forEach((t) => t.kill());
      observer?.disconnect();
      if (video) {
        video.removeEventListener("loadeddata", playVideo);
        video.removeEventListener("canplay", playVideo);
      }
      delete document.documentElement.dataset.heroVideoFull;
      if (headerEl) gsap.set(headerEl, { clearProps: "transform,pointerEvents" });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={
        entrance
          ? "fixed inset-0 z-[9999] flex flex-col justify-center overflow-hidden bg-bg"
          : "relative min-h-[100dvh] bg-bg"
      }
      aria-labelledby="hero-heading"
    >
      <div
        ref={stickyRef}
        className={
          entrance
            ? "z-20 min-h-[100dvh] flex flex-col justify-center overflow-hidden"
            : "sticky top-0 z-20 min-h-[100dvh] flex flex-col justify-center overflow-hidden"
        }
      >
        {/* Video — full viewport, grows from center; outside Container so not clipped */}
        <div
          ref={videoWrapRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center overflow-hidden bg-black"
          style={{ width: "1px", height: "1px" }}
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100dvh] min-w-[100vw] min-h-[100dvh]">
            <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full z-[2]"
            onLoadedData={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
            onCanPlay={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
          >
            <source
              src="https://www.hellobecca.com/wp-content/uploads/Becca_Homepage_Video.mp4"
              type="video/mp4"
              media="(min-width: 641px)"
            />
            <source
              src="https://www.hellobecca.com/wp-content/uploads/Becca_Homepage_Video_Mobile.mp4"
              type="video/mp4"
              media="(max-width: 640px)"
            />
            Your browser does not support the video tag.
          </video>
          </div>
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-bg/40 pointer-events-none"
            style={{ opacity: 0.6 }}
          />
        </div>

        {/* Content block: Hospitality | Reimagined — video grows and pushes text out */}
        <Container className="relative z-10 flex flex-col items-center overflow-visible">
          <div className="flex flex-col items-center w-full">
            <h1
              ref={hospitalityRef}
              id="hero-heading"
              className="font-display text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-accent text-center"
            >
              Hospitality
            </h1>

            <h1
              ref={reimaginedRef}
              className="font-display text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-accent text-center -mt-1"
            >
              Reimagined
            </h1>
          </div>

          <p
            ref={taglineRef}
            className="mt-4 sm:mt-10 md:mt-14 mx-auto max-w-[70ch] px-4 sm:px-0 text-center text-base sm:text-body-lg text-foreground"
          >
            {tagline}
          </p>
        </Container>

        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 md:hidden"
        >
          <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
            <path
              d="M1 1L8.86667 9L16.7333 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
