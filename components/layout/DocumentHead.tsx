/**
 * Document head links — preconnect, dns-prefetch
 * Optimizes LCP by preconnecting to image origin
 * Note: Font preload removed — add ruder_plakat_llregular.woff2 to public/fonts/ to re-enable
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
