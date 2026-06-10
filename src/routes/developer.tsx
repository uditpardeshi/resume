import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Github, Linkedin, Globe, Cpu, Award, Code2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSense } from "@/components/AdSense";

export const Route = createFileRoute("/developer")({
  head: () => ({
    meta: [
      { title: "About Udit Pardeshi — Full Stack Engineer & Designer" },
      {
        name: "description",
        content:
          "Meet Udit Pardeshi, the full stack engineer and designer behind the free, privacy-first, ATS-friendly Resume Builder. Learn about his experience and tech stack.",
      },
      { property: "og:title", content: "About Udit Pardeshi — Full Stack Engineer & Designer" },
      {
        property: "og:description",
        content:
          "Meet the developer behind the free, privacy-first, ATS-friendly Resume / CV Builder.",
      },
      { property: "og:url", content: "https://resumzy.vercel.app/developer" },
      { name: "twitter:title", content: "About Udit Pardeshi — Creator of Resume / CV Builder" },
      {
        name: "twitter:description",
        content:
          "Learn more about Udit Pardeshi, full stack developer building clean, accessible web tools.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://resumzy.vercel.app/developer" },
    ],
  }),
  component: DeveloperRoute,
});

function DeveloperRoute() {
  const techStack = [
    { name: "React 19", category: "Frontend Core" },
    { name: "TypeScript", category: "Language" },
    { name: "Vite", category: "Bundler & Dev Server" },
    { name: "TanStack Start", category: "Framework & SSR" },
    { name: "Tailwind CSS v4", category: "Styling" },
    { name: "Nitro", category: "Server Engine" },
    { name: "Framer Motion", category: "Animations" },
    { name: "Radix UI", category: "Primitives" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 relative overflow-hidden select-none">
      {/* JSON-LD Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Udit Pardeshi",
            "jobTitle": "Full Stack Engineer & Designer",
            "url": "https://uditpardeshi.in",
            "sameAs": [
              "https://github.com/uditpardeshi",
              "https://linkedin.com/in/uditpardeshi"
            ],
            "description": "Full Stack Engineer and Designer building fast, accessible, and privacy-respecting digital products.",
            "knowsAbout": ["React", "TypeScript", "Vite", "TanStack Start", "Tailwind CSS", "Nitro", "Framer Motion", "Radix UI"]
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
            <Code2 className="w-3.5 h-3.5" /> Creator Info
          </div>
        </div>

        <div className="paper-card p-6 sm:p-10 space-y-8">
          {/* Header/Bio Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border">
            <div className="w-20 h-20 rounded-full bg-saffron/10 text-saffron flex items-center justify-center border-2 border-saffron/20 font-display text-3xl font-extrabold shadow-soft">
              UP
            </div>
            <div className="text-center sm:text-left space-y-2">
              <div className="space-y-0.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-ink font-display">
                  Udit Pardeshi
                </h1>
                <p className="text-saffron font-semibold text-xs tracking-wider uppercase">
                  Full Stack Engineer & Designer
                </p>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-md">
                Building products that are fast, accessible, and privacy-respecting. I design
                digital products with careful attention to details, typography, and
                micro-interactions.
              </p>
            </div>
          </div>

          {/* Social Connections */}
          <div className="grid grid-cols-3 gap-3">
            <a
              href="https://github.com/uditpardeshi"
              target="_blank"
              rel="noopener noreferrer"
              className="paper-card p-3 flex flex-col items-center justify-center gap-1 text-center hover:border-saffron hover:bg-saffron/5 transition-all duration-200 group active:translate-y-0.5"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-saffron transition-colors" />
              <span className="text-[10px] font-bold text-ink">GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/uditpardeshi"
              target="_blank"
              rel="noopener noreferrer"
              className="paper-card p-3 flex flex-col items-center justify-center gap-1 text-center hover:border-saffron hover:bg-saffron/5 transition-all duration-200 group active:translate-y-0.5"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-saffron transition-colors" />
              <span className="text-[10px] font-bold text-ink">LinkedIn</span>
            </a>

            <a
              href="https://uditpardeshi.in"
              target="_blank"
              rel="noopener noreferrer"
              className="paper-card p-3 flex flex-col items-center justify-center gap-1 text-center hover:border-saffron hover:bg-saffron/5 transition-all duration-200 group active:translate-y-0.5"
            >
              <Globe className="w-5 h-5 text-muted-foreground group-hover:text-saffron transition-colors" />
              <span className="text-[10px] font-bold text-ink">Portfolio</span>
            </a>
          </div>

          {/* Project Philosophy */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-ink font-display flex items-center gap-2">
              <Award className="w-4 h-4 text-saffron" /> The Philosophy
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed font-sans">
              This Resume Builder was born out of frustration with existing tools that hide export
              buttons behind paywalls or sell user data. The goal here is simple: to make beautiful,
              ATS-friendly resumes accessible to everyone, with absolutely no accounts, no payments,
              and 100% local privacy.
            </p>
          </div>

          {/* Special Acknowledgements Card */}
          <div className="paper-card p-6 border border-red-200/50 bg-red-50/10 dark:border-red-950/30 dark:bg-red-950/5 rounded-xl space-y-3 shadow-soft relative overflow-hidden group">
            {/* Background decorative pulsing heart glow */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 text-red-500/5 dark:text-red-500/3 pointer-events-none group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-full h-full fill-current" />
            </div>
            
            <h3 className="text-lg font-bold text-ink font-display flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" /> Special Acknowledgements
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-sans relative z-10">
              A very special thanks to <strong className="text-ink font-semibold text-base">pixel_q</strong>. This project wouldn't have been possible without your continuous motivation, design suggestions, and invaluable guidance. Thank you for always being the silent force behind the scenes.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-ink font-display flex items-center gap-2">
              <Cpu className="w-4 h-4 text-saffron" /> Project Tech Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="p-3 bg-paper border border-border rounded-lg space-y-1 select-none"
                >
                  <div className="font-bold text-xs text-ink">{tech.name}</div>
                  <div className="text-[9px] text-muted-foreground">{tech.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AdSense Display Ad */}
        <AdSense slot="4820193857" className="max-w-3xl mx-auto" />
      </div>
    </div>
  );
}
