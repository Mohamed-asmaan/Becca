/**
 * Document head links — preload, preconnect, dns-prefetch
 * Optimizes LCP by preloading critical assets
 */

const PRELOAD_ORIGIN = "https://www.hellobecca.com";

export default function DocumentHead() {
  return (
    <>
      <link
        rel="preload"
        href="/fonts/ruder_plakat_llregular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href={PRELOAD_ORIGIN} crossOrigin="anonymous" />
      <link rel="dns-prefetch" href={PRELOAD_ORIGIN} />
    </>
  );
}
