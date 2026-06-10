import { createFileRoute } from "@tanstack/react-router";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Build Your Resume Online — Free ATS Resume Creator" },
      {
        name: "description",
        content:
          "Build a highly optimized ATS-friendly resume in 5 easy steps. Completely free, no registration required. Try our premium CV builder now.",
      },
      { property: "og:title", content: "Build Your Resume Online — Free ATS Resume Creator" },
      {
        property: "og:description",
        content:
          "Interactive online app to build an ATS-friendly resume in 5 steps. Completely free and secure.",
      },
      { property: "og:url", content: "https://resumzy.vercel.app/builder" },
      { name: "twitter:title", content: "Build Your Resume Online — Free ATS Resume Creator" },
      {
        name: "twitter:description",
        content:
          "Build an ATS-friendly resume in 5 steps. Completely free - no login, your data stays in your browser.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://resumzy.vercel.app/builder" },
    ],
  }),
  component: BuilderRoute,
});

function BuilderRoute() {
  // Global protection: block right-click, print, save, devtools shortcuts
  useEffect(() => {
    const blockContext = (e: MouseEvent) => {
      e.preventDefault();
    };
    const blockKeys = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === "s" || e.key === "S")) ||
        (e.ctrlKey && (e.key === "p" || e.key === "P")) ||
        (e.ctrlKey && (e.key === "u" || e.key === "U")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) ||
        e.key === "F12"
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const blockDrag = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("keydown", blockKeys);
    document.addEventListener("dragstart", blockDrag);
    return () => {
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("dragstart", blockDrag);
    };
  }, []);

  return (
    <div className="contents">
      {/* JSON-LD WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Resume / CV Builder Application",
            "url": "https://resumzy.vercel.app/builder",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "browserRequirements": "Requires HTML5 and JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            },
            "description": "Interactive online app to build an ATS-friendly resume in 5 steps. 100% free with local data security."
          })
        }}
      />
      <ResumeBuilder />
      <Toaster />
    </div>
  );
}
