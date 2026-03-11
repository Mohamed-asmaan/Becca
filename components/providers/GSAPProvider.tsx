"use client";

/**
 * GSAP provider for Next.js
 * Registers GSAP plugins once on the client.
 * Wrap the app or animated sections with this provider.
 */

import { useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Plugins are already registered at module load
    // Add any global GSAP defaults here if needed
    gsap.defaults({ ease: "power2.out" });
  }, []);

  return <>{children}</>;
}
