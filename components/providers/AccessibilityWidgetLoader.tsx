"use client";

import dynamic from "next/dynamic";

const AccessibilityWidget = dynamic(
  () => import("@/components/accessibility/AccessibilityWidget").then((m) => m.default),
  { ssr: false }
);

export default function AccessibilityWidgetLoader() {
  return <AccessibilityWidget />;
}
