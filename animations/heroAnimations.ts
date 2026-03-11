/**
 * Component-level animation: Hero section
 * GSAP animations specific to the Hero component
 * Import and use in components/sections/Hero.tsx
 */

import gsap from "gsap";

export const heroAnimations = {
  title: (element: gsap.TweenTarget) =>
    gsap.from(element, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    }),

  subtitle: (element: gsap.TweenTarget) =>
    gsap.from(element, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 0.2,
      ease: "power3.out",
    }),

  cta: (element: gsap.TweenTarget) =>
    gsap.from(element, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.4,
      ease: "power2.out",
    }),
};
