import { createFileRoute } from "@tanstack/react-router";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Build Your Resume Online — Free ATS Resume Creator & CV Maker" },
      {
        name: "description",
        content:
          "Create an ATS-friendly resume in 5 steps. Completely free, no login or signup required, and absolute local privacy. Try our professional CV builder now.",
      },
      {
        name: "keywords",
        content:
          "free resume creator, online cv maker, ats resume builder, build cv free, no login resume builder, professional cv builder, ats friendly resume templates, create resume online, download resume pdf free, ats compliant resume creator, resume generator, curriculum vitae app",
      },
      { property: "og:title", content: "Build Your Resume Online — Free ATS Resume Creator & CV Maker" },
      {
        property: "og:description",
        content:
          "Interactive online app to build an ATS-friendly resume in 5 steps. 100% free and secure with local storage.",
      },
      { property: "og:url", content: "https://resumzy.vercel.app/builder" },
      { name: "twitter:title", content: "Build Your Resume Online — Free ATS Resume Creator" },
      {
        name: "twitter:description",
        content:
          "Build an ATS-friendly resume in 5 steps. Completely free - no login, no passwords, no ads.",
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
            "applicationSubCategory": "Resume Creator, CV Maker, Career Tool",
            "browserRequirements": "Requires HTML5 and JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            },
            "description": "Interactive online app to build an ATS-friendly resume in 5 steps. 100% free with local data security.",
            "keywords": "free resume creator, online cv maker, ats resume builder, build cv free, no login resume builder, professional cv builder, ats friendly resume templates, create resume online, download resume pdf free, ats compliant resume creator"
          })
        }}
      />
      <ResumeBuilder />
      <Toaster />
    </div>
  );
}
