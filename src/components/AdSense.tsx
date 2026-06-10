import { useEffect, useRef } from "react";

interface AdSenseProps {
  client?: string;
  slot: string;
  format?: string;
  responsive?: string;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export function AdSense({
  client = "ca-pub-3288041764244188",
  slot,
  format = "auto",
  responsive = "true",
  style = { display: "block", width: "100%" },
  className = "",
}: AdSenseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = containerRef.current;
    if (!el) return;

    let initialized = false;

    // Use IntersectionObserver to lazy load the ad when it enters the viewport.
    // This guarantees the parent layout is fully resolved and offsetWidth > 0.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !initialized) {
          initialized = true;
          observer.disconnect();

          try {
            if (el.offsetWidth > 0) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } else {
              // Fallback retry if layout is still calculating
              setTimeout(() => {
                try {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                  // Catch silently to avoid polluting console
                }
              }, 200);
            }
          } catch (err) {
            console.error("AdSense initialization failed:", err);
          }
        }
      },
      { rootMargin: "150px" } // Load when within 150px of viewport for smooth display
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [slot]);

  return (
    <div 
      ref={containerRef}
      className={`adsense-container my-6 sm:my-8 flex justify-center w-full overflow-hidden ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ width: "100%", ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
