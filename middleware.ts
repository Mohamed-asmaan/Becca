import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const IMAGE_HOST = "https://www.hellobecca.com";

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js hydration + dev HMR
  "style-src 'self' 'unsafe-inline'", // Tailwind + CSS-in-JS
  "img-src 'self' data: blob: " + IMAGE_HOST,
  "font-src 'self' data:",
  "connect-src 'self' " + IMAGE_HOST,
  "media-src 'self' " + IMAGE_HOST,
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", cspDirectives);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  return response;
}
