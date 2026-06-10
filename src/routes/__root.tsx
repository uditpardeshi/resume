import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";

import appCss from "../styles.css?url";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "--uICDXum29cB3a_AE2l-keeORUN4CD6T65JjHNdbzo" },
      { title: "Free Resume / CV Builder — Premium, Free & ATS-Friendly Resume Maker" },
      {
        name: "description",
        content:
          "Build an ATS-friendly resume in minutes. 100% free with no login or signup required. Your data remains completely private in your browser.",
      },
      {
        name: "keywords",
        content:
          "resume builder, free resume builder, cv builder, ats-friendly resume, online cv builder, free cv builder, ats cv, professional resume, resume maker free, best free cv builder, resume template download, resume creator, build resume no login, ats compliant resume, job application cv, cv maker without signup, download resume pdf free, udit pardeshi, curriculum vitae maker",
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "author", content: "Udit Pardeshi" },
      { name: "theme-color", content: "#ffffff" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Resume / CV Builder" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: "https://resumzy.vercel.app/favicon.png" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: "https://resumzy.vercel.app/favicon.png" },
    ],
    links: [
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://resumzy.vercel.app" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script src="/pdf.min.js" defer></script>
      </head>
      <body>
        <div className="contents">{children}</div>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  /* Temporary disabled AdSense loading to prevent console error 400s
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadAdSense = () => {
      if (document.querySelector('script[src*="adsbygoogle.js"]')) return;
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3288041764244188";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };

    if (document.readyState === "complete") {
      loadAdSense();
    } else {
      window.addEventListener("load", loadAdSense);
      return () => window.removeEventListener("load", loadAdSense);
    }
  }, []);
  */

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
