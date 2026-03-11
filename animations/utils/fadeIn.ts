/**
 * Animation utility: Fade-in effect
 * Reusable GSAP animation presets for consistent motion across the app
 */

import gsap from "gsap";

export const fadeIn = {
  from: { opacity: 0, y: 20 },
  to: { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
};

export function animateFadeIn(
  element: gsap.TweenTarget,
  options?: gsap.TweenVars
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", ...options }
  );
}
