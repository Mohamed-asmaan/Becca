"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AccessibilityWidget = dynamic(
  () => import("@/components/accessibility/AccessibilityWidget").then((m) => m.default),
  { ssr: false }
);

/** Defer widget load to reduce initial JS bundle — mounts after 2s or on first interaction */
export default function AccessibilityWidgetLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2000);
    const onInteract = () => setReady(true);
    ["mousedown", "keydown", "scroll", "touchstart"].forEach((ev) =>
      document.addEventListener(ev, onInteract, { once: true, passive: true })
    );
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return null;
  return <AccessibilityWidget />;
}
