/**
 * Document head — preconnect to LCP origin.
 */

const LCP_ORIGIN = "https://www.hellobecca.com";

export default function DocumentHead() {
  return <link rel="preconnect" href={LCP_ORIGIN} crossOrigin="anonymous" />;
}
