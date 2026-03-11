/**
 * Document head links — preconnect, dns-prefetch
 * Optimizes LCP by preconnecting to image/video origin
 */

const PRELOAD_ORIGIN = "https://www.hellobecca.com";

export default function DocumentHead() {
  return (
    <>
      <link rel="preconnect" href={PRELOAD_ORIGIN} crossOrigin="anonymous" />
      <link rel="dns-prefetch" href={PRELOAD_ORIGIN} />
    </>
  );
}
