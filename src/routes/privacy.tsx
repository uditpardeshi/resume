import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Resume / CV Builder" },
      {
        name: "description",
        content:
          "Our privacy policy: your resume data stays entirely in your browser. We do not store or collect your personal information.",
      },
    ],
  }),
  component: PrivacyRoute,
});

function PrivacyRoute() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 relative overflow-hidden select-none">
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
            <Shield className="w-3.5 h-3.5" /> Privacy First
          </div>
        </div>

        <div className="paper-card p-6 sm:p-10 space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink font-display">
              Privacy Policy
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
              <h2 className="text-lg font-bold text-ink font-display">
                1. Our Commitment to Your Privacy
              </h2>
              <p>
                We believe that your personal details should remain yours. Unlike traditional resume
                builders that require creating an account and storing your personal data on their
                servers, our builder is designed with a **privacy-first architecture**.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink font-display">
                2. Data Storage & Local processing
              </h2>
              <p>
                All data you enter into the Resume / CV Builder is stored exclusively in your
                browser's local storage (SessionStorage/LocalStorage).
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>We do not transmit your input data to external databases or servers.</li>
                <li>
                  Your data stays on your local device until you manually clear it or uninstall
                  browser data.
                </li>
                <li>
                  When generating a PDF, the document layout is computed locally or via safe
                  serverless rendering, immediately returning the PDF blob without saving any
                  information.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink font-display">3. Cookies and Analytics</h2>
              <p>
                We use minimal, privacy-friendly analytics to track page views and site usage in
                order to improve user experience. We do not track or associate your activity with
                any personal identifying information.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink font-display">4. Third-Party Services</h2>
              <p>
                If you use external links or third-party integrations (such as payment processing
                for premium layouts if applicable), their privacy policies will govern the
                interaction. We recommend reviewing the privacy policies of any third-party links
                you follow.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-ink font-display">5. Contact Info</h2>
              <p>
                For any inquiries regarding this Privacy Policy or data protection, please feel free
                to visit our{" "}
                <Link to="/support" className="text-saffron hover:underline font-semibold">
                  Support page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
