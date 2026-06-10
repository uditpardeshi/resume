import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSense } from "@/components/AdSense";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support & Contact — Resume / CV Builder" },
      {
        name: "description",
        content:
          "Need help? Contact support or request new features for our Resume Builder. Report bugs or ask questions here.",
      },
      { property: "og:title", content: "Support & Contact — Resume / CV Builder" },
      {
        property: "og:description",
        content:
          "Get in touch with the developer of Resume / CV Builder. Feature requests, bug reports, and assistance.",
      },
      { property: "og:url", content: "https://resumzy.vercel.app/support" },
      { name: "twitter:title", content: "Support & Contact — Resume / CV Builder" },
      {
        name: "twitter:description",
        content: "Need help? Contact support or request new features for our Resume Builder.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://resumzy.vercel.app/support" },
    ],
  }),
  component: SupportRoute,
});

function SupportRoute() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 relative overflow-hidden select-none">
      {/* JSON-LD ContactPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Support & Contact Page",
            "url": "https://resumzy.vercel.app/support",
            "description": "Contact support or request new features for our Resume / CV Builder application."
          })
        }}
      />
      {/* Decorative Blob */}
      <div className="absolute top-[10%] right-[-10%] w-72 h-72 bg-saffron/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-72 h-72 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron font-medium text-xs border border-saffron/20">
            <MessageSquare className="w-3.5 h-3.5" /> 24/7 Support
          </div>
        </div>

        <div className="paper-card p-6 sm:p-10 space-y-8">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink font-display">
              Support & Contact
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Got a question, bug report, or feature request? We would love to hear from you.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm text-ink uppercase tracking-wider font-display">
              Direct Contact
            </h3>
            <div className="grid gap-3">
              <a
                href="mailto:uditpardeshi@proton.me"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-saffron hover:bg-saffron/5 transition-all duration-200 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-saffron/10 text-saffron flex items-center justify-center group-hover:bg-saffron/20 shrink-0 transition-colors">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5 text-left">
                  <div className="font-bold text-xs text-ink group-hover:text-saffron transition-colors">
                    Primary Email
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium">
                    uditpardeshi@proton.me
                  </div>
                </div>
              </a>

              <a
                href="mailto:uditpardeshi2007@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-saffron hover:bg-saffron/5 transition-all duration-200 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-saffron/10 text-saffron flex items-center justify-center group-hover:bg-saffron/20 shrink-0 transition-colors">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5 text-left">
                  <div className="font-bold text-xs text-ink group-hover:text-saffron transition-colors">
                    Alternative Email
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium">
                    uditpardeshi2007@gmail.com
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-6">
            <h3 className="font-bold text-sm text-ink uppercase tracking-wider font-display">
              Troubleshooting
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If your PDF is not downloading, please make sure you don't have any aggressive
              ad-blockers blocking standard fetch requests or scripts on this page.
            </p>
          </div>
        </div>

        {/* AdSense Display Ad */}
        <AdSense slot="5739201948" className="max-w-xl mx-auto" />
      </div>
    </div>
  );
}
