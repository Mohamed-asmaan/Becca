/**
 * Document head — preconnect to LCP origin only.
 * Single preconnect to image/video host; dns-prefetch removed (redundant).
 */

const LCP_ORIGIN = "https://www.hellobecca.com";

export default function DocumentHead() {
  return <link rel="preconnect" href={LCP_ORIGIN} crossOrigin="anonymous" />;
}
