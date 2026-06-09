import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Resume / CV Builder" },
      {
        name: "description",
        content:
          "Review the terms of service for using the Resume / CV Builder. Free, fair use, and privacy-first resume builder conditions.",
      },
      { property: "og:title", content: "Terms of Service — Resume / CV Builder" },
      {
        property: "og:description",
        content:
          "Understand the terms of service, fair use policies, and user responsibilities of our resume builder.",
      },
      { property: "og:url", content: "https://resumzy.vercel.app/terms" },
      { name: "twitter:title", content: "Terms of Service — Resume / CV Builder" },
      {
        name: "twitter:description",
        content: "Terms of service: free, no-signup, and privacy-first resume builder conditions.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://resumzy.vercel.app/terms" },
    ],
  }),
  component: TermsRoute,
});

function TermsRoute() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 relative overflow-hidden select-none">
      {/* JSON-LD WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service",
            "url": "https://resumzy.vercel.app/terms",
            "description": "Review the terms of service for using the Resume / CV Builder. Free, fair use, and privacy-first resume builder conditions."
          })
        }}
      />
      {/* Decorative Blob */}
      <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-saffron/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-72 h-72 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron font-medium text-xs border border-saffron/20">
            <Scale className="w-3.5 h-3.5" /> Fair Use Terms
          </div>
        </div>

        <div className="paper-card p-6 sm:p-10 space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink font-display">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-xs">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed font-sans">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink font-display">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Resume / CV Builder website, you accept and agree to be
                bound by these Terms of Service. If you do not agree, please do not use the
                application.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink font-display">2. Description of Service</h2>
              <p>
                We provide an online tool for candidates to build, edit, and export professional
                resumes in PDF format. The basic builder features are entirely free and require no
                account registration.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink font-display">3. Permitted & Fair Use</h2>
              <p>
                You are granted a non-exclusive, non-transferable, revocable license to access and
                use the builder for personal, non-commercial purposes.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You may build and export as many resumes as you need.</li>
                <li>
                  You are solely responsible for the correctness and truthfulness of the content in
                  your resume.
                </li>
                <li>
                  You agree not to use the builder to generate offensive, fraudulent, or harmful
                  content.
                </li>
                <li>
                  Automated scrapers or bots are prohibited from accessing or abusing our PDF
                  generation API.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink font-display">
                4. Disclaimers & Limitation of Liability
              </h2>
              <p>
                The service is provided on an "as-is" and "as-available" basis without any
                warranties of any kind.
              </p>
              <p>
                We do not guarantee that the generated resumes will result in interviews or
                employment. We are not liable for any direct or indirect damages resulting from data
                loss, browser storage corruption, or issues encountered during PDF generation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink font-display">5. Modifications to Terms</h2>
              <p>
                We reserve the right to revise or modify these terms at any time. Your continued use
                of the website following any changes will signify your acceptance of the updated
                terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
