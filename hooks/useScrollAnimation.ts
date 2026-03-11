"use client";

/**
 * Custom hook: Scroll-triggered animations with GSAP ScrollTrigger
 * Use for section reveal animations
 *
 * Usage:
 * const ref = useScrollAnimation({ trigger: 0.8 });
 * return <section ref={ref}>...</section>;
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  trigger?: number; // 0-1, viewport position to trigger (default 0.8)
  start?: string;
  end?: string;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const { trigger = 0.8 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: `top ${trigger * 100}%`,
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [trigger]);

  return ref;
}
