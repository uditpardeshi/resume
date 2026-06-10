// Google Analytics 4 (GA4) / Google Tag utility functions
// Allows dynamic initialization on the client side using VITE_GA_MEASUREMENT_ID environment variable.

export const GA_MEASUREMENT_ID =
  typeof window !== "undefined"
    ? (import.meta.env.VITE_GA_MEASUREMENT_ID as string)
    : "";

/**
 * Initializes Google Analytics 4 on the client side if VITE_GA_MEASUREMENT_ID is provided.
 * Ensures the script is only injected once.
 */
export function initGA() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

  const win = window as any;

  // Prevent double initialization
  if (win.gtagInitialized) return;
  win.gtagInitialized = true;

  // Setup global dataLayer and gtag function
  win.dataLayer = win.dataLayer || [];
  win.gtag = function gtag() {
    win.dataLayer.push(arguments);
  };

  // Initialize analytics settings
  win.gtag("js", new Date());
  
  // Set default configuration
  win.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false, // Page views tracked manually via router transitions to support SPA
    cookie_flags: "SameSite=None;Secure",
  });

  // Inject Google Tag Manager script tag
  const scriptId = "google-tag-manager-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);
  }
}

/**
 * Tracks a page view for SPA routes.
 * @param path The pathname of the route.
 */
export function trackPageView(path: string) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  const win = window as any;
  if (typeof win.gtag === "function") {
    win.gtag("event", "page_view", {
      page_path: path,
      page_title: document.title,
      send_to: GA_MEASUREMENT_ID,
    });
  }
}

/**
 * Tracks a custom event in Google Analytics.
 * @param eventName The name of the event.
 * @param params Additional metadata parameters.
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  const win = window as any;
  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, params);
  }
}
