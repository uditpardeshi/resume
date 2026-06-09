import { createFileRoute, Link } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { GsapDropdown } from "@/components/GsapDropdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Lock,
  Download,
  CreditCard,
  Menu,
  X,
  MessageSquare,
  User,
  FileText,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resume / CV Builder — Premium, Free & ATS-Friendly Resumes" },
      {
        name: "description",
        content:
          "Build a professional, ATS-optimized resume in minutes. 100% free, no login or signup required, and absolute privacy. Export as a premium PDF.",
      },
      { property: "og:title", content: "Resume / CV Builder — Premium, Free & ATS-Friendly Resumes" },
      {
        property: "og:description",
        content:
          "Create a professional, ATS-optimized resume in minutes. Free to download. No account required. Your data remains in your browser.",
      },
      { property: "og:url", content: "https://resumzy.vercel.app/" },
      { name: "twitter:title", content: "Resume / CV Builder — Premium, Free & ATS-Friendly" },
      {
        name: "twitter:description",
        content:
          "Build an ATS-friendly resume in minutes. Completely free - no login, your data stays in your browser.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://resumzy.vercel.app/" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileItemsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (mobileOpen) {
      // Open animation
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power3.out" },
      );
      gsap.fromTo(
        mobileItemsRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.25, ease: "power2.out", delay: 0.1 },
      );
    } else {
      // Close animation
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
      });
    }
  }, [mobileOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as any;

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
  } as any;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-saffron/30 select-none relative overflow-hidden">
      <Toaster />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Resume / CV Builder",
            "url": "https://resumzy.vercel.app",
            "description": "Create a professional, ATS-optimized resume in minutes. Free to download. No account required.",
            "publisher": {
              "@type": "Person",
              "name": "Udit Pardeshi",
              "url": "https://uditpardeshi.in"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Resume / CV Builder",
            "operatingSystem": "All",
            "applicationCategory": "BusinessApplication",
            "browserRequirements": "Requires HTML5 and JavaScript",
            "offers": {
              "@type": "Offer",
              "price": "0.00",
              "priceCurrency": "USD"
            },
            "description": "Build an ATS-friendly resume in minutes. No signup, no passwords, no hidden subscriptions. Completely free to build and download.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "1420"
            }
          })
        }}
      />

      {/* Background Decorative Ambient Blobs */}
      <div className="absolute top-[15%] left-[-10%] w-72 sm:w-96 h-72 sm:h-96 bg-saffron/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none animate-blob" />
      <div className="absolute top-[35%] right-[-10%] w-72 sm:w-96 h-72 sm:h-96 bg-primary/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none animate-blob animation-delay-2000" />

      {/* Header */}
      <header className="border-b bg-paper/60 backdrop-blur sticky top-0 z-30 transition-all duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="font-display text-xl font-bold tracking-tight text-ink hover:opacity-90 transition-opacity"
            >
              Resume / CV Builder
            </Link>

            {/* Desktop Navigation (GSAP dropdown) */}
            <nav className="hidden md:flex items-center">
              <GsapDropdown />
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild className="font-medium cursor-pointer">
              <Link to="/builder">
                Create Resume <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>

            {/* Mobile Dropdown Navigation Trigger */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Content (GSAP animated height) */}
      <div
        ref={mobileMenuRef}
        className="md:hidden border-b bg-paper/95 backdrop-blur-md overflow-hidden h-0 opacity-0 relative z-20"
      >
        <div className="px-4 py-3 space-y-1">
          {[
            { to: "/support", label: "Support", icon: MessageSquare },
            { to: "/developer", label: "Developer Info", icon: User },
            { to: "/terms", label: "Terms of Service", icon: FileText },
            { to: "/privacy", label: "Privacy Policy", icon: Shield },
          ].map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                ref={(el: HTMLAnchorElement | null) => {
                  if (el) mobileItemsRef.current[idx] = el;
                }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-saffron/10 transition-colors font-bold text-xs text-ink"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-7 h-7 rounded-md bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-left space-y-6"
        >
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron/10 text-saffron font-medium text-xs border border-saffron/20 w-fit"
          >
            <Sparkles className="w-3.5 h-3.5" /> Premium & ATS-friendly
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-ink font-display"
          >
            The professional resume you need. <br className="hidden sm:block" />
            Completely <span className="text-saffron">Free</span>.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Stop struggling with formatting or paying expensive monthly subscriptions. Build your
            ATS-optimized resume in 5 minutes. No account needed—your data stays in your browser.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              asChild
              size="lg"
              variant="saffron"
              className="w-full sm:w-auto py-6 text-base font-semibold"
            >
              <Link to="/builder">
                Build Yours Now <ArrowRight className="w-5 h-5 ml-2 animate-pulse" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto py-6 text-base font-medium text-muted-foreground hover:text-foreground"
            >
              <a href="#features">How It Works</a>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-xs text-muted-foreground border-t border-border max-w-md"
          >
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> No signup required
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Lock className="w-4 h-4 text-emerald-600" /> Privacy first (local storage)
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Zap className="w-4 h-4 text-emerald-600" /> Completely free, no payments
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Floating Resume Mockup */}
        <div className="lg:col-span-5 flex justify-center px-8 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              y: {
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
              },
            }}
            className="w-full max-w-[280px] sm:max-w-[360px] aspect-[210/297] paper-card p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-saffron hover:border-b-[6px] hover:border-r-[3px]"
          >
            {/* Saffron border indicator */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-saffron" />

            <div className="space-y-4 text-left select-none">
              {/* Header Info */}
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-ink tracking-tight">
                  Jonathan Doe
                </h4>
                <p className="text-[10px] text-saffron font-semibold leading-none">
                  Senior Frontend Engineer
                </p>
                <div className="text-[8px] text-muted-foreground flex flex-wrap gap-x-2 gap-y-0.5 pt-1">
                  <span>johndoe@email.com</span>
                  <span>•</span>
                  <span>+1 (555) 019-2834</span>
                  <span>•</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>
              <div className="h-[1px] bg-border" />

              {/* Experience */}
              <div className="space-y-2">
                <h5 className="text-[9px] font-bold text-ink uppercase tracking-wider">
                  Experience
                </h5>
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-semibold text-ink">
                    <span>Lead Frontend Engineer @ TechCorp</span>
                    <span className="text-muted-foreground font-normal text-[7.5px]">
                      2022 — Present
                    </span>
                  </div>
                  <p className="text-[7.5px] text-muted-foreground leading-relaxed">
                    Led migration of legacy systems to modern React & Next.js stack, improving
                    performance by 40% and developer productivity by 25%.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-semibold text-ink">
                    <span>Software Engineer @ InnovateLab</span>
                    <span className="text-muted-foreground font-normal text-[7.5px]">
                      2020 — 2022
                    </span>
                  </div>
                  <p className="text-[7.5px] text-muted-foreground leading-relaxed">
                    Developed interactive dashboards and built reusable design components utilizing
                    Tailwind CSS and TypeScript.
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <h5 className="text-[9px] font-bold text-ink uppercase tracking-wider">Skills</h5>
                <div className="flex flex-wrap gap-1">
                  {["React", "TypeScript", "Next.js", "Vite", "TailwindCSS", "Node.js"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-1.5 py-0.5 bg-paper border border-border text-[7.5px] rounded text-muted-foreground font-medium"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/60">
              <div className="text-[8px] text-muted-foreground font-medium font-sans">
                References available upon request
              </div>
              <div className="h-4 w-4 bg-saffron/10 rounded-full flex items-center justify-center">
                <div className="h-1.5 w-1.5 bg-saffron rounded-full" />
              </div>
            </div>

            {/* Glassy overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
              <div className="bg-paper/90 backdrop-blur-sm border border-border px-4 py-2 rounded-full text-xs font-semibold shadow-soft flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-saffron" /> ATS-Friendly PDF
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 border-t border-border bg-paper/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight font-display text-ink">
              Everything you need, nothing you don't.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              A minimalist, modern approach designed for candidates who value their time and data.
            </p>
          </div>

          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 80, damping: 15 },
                },
              }}
              className="paper-card p-6 space-y-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-saffron hover:border-b-[6px] hover:border-r-[3px] active:translate-y-[2px] active:border-b-[2px] active:border-r-[1px] group"
            >
              <motion.div
                variants={{
                  hover: { scale: 1.15, rotate: [0, -10, 10, 0] },
                }}
                whileHover="hover"
                className="w-10 h-10 rounded-lg bg-saffron/10 text-saffron flex items-center justify-center transition-colors group-hover:bg-saffron/20"
              >
                <Zap className="w-5 h-5" />
              </motion.div>
              <h3 className="font-bold text-lg">Instant Start</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                No username, no password, no email verification. Jump straight into the builder and
                finish your resume instantly.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 80, damping: 15 },
                },
              }}
              className="paper-card p-6 space-y-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-saffron hover:border-b-[6px] hover:border-r-[3px] active:translate-y-[2px] active:border-b-[2px] active:border-r-[1px] group"
            >
              <motion.div
                variants={{
                  hover: { scale: 1.15, rotate: [0, -10, 10, 0] },
                }}
                whileHover="hover"
                className="w-10 h-10 rounded-lg bg-saffron/10 text-saffron flex items-center justify-center transition-colors group-hover:bg-saffron/20"
              >
                <ShieldCheck className="w-5 h-5" />
              </motion.div>
              <h3 className="font-bold text-lg">ATS-Optimized</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Our templates follow exact ATS layout standards (single-column, real text, clean
                formatting) to maximize interview rates.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 80, damping: 15 },
                },
              }}
              className="paper-card p-6 space-y-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-saffron hover:border-b-[6px] hover:border-r-[3px] active:translate-y-[2px] active:border-b-[2px] active:border-r-[1px] group"
            >
              <motion.div
                variants={{
                  hover: { scale: 1.15, rotate: [0, -10, 10, 0] },
                }}
                whileHover="hover"
                className="w-10 h-10 rounded-lg bg-saffron/10 text-saffron flex items-center justify-center transition-colors group-hover:bg-saffron/20"
              >
                <Lock className="w-5 h-5" />
              </motion.div>
              <h3 className="font-bold text-lg">Privacy First</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Your personal details stay in your browser's local storage. We do not store or sell
                your personal details.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 80, damping: 15 },
                },
              }}
              className="paper-card p-6 space-y-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-saffron hover:border-b-[6px] hover:border-r-[3px] active:translate-y-[2px] active:border-b-[2px] active:border-r-[1px] group"
            >
              <motion.div
                variants={{
                  hover: { scale: 1.15, rotate: [0, -10, 10, 0] },
                }}
                whileHover="hover"
                className="w-10 h-10 rounded-lg bg-saffron/10 text-saffron flex items-center justify-center transition-colors group-hover:bg-saffron/20"
              >
                <Zap className="w-5 h-5" />
              </motion.div>
              <h3 className="font-bold text-lg">100% Free</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Completely free to use, edit, and download. No hidden premium features, no credit
                card, no ads, and no watermarks.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl font-bold tracking-tight font-display text-ink">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm">
              Answers to everything you want to know about our builder.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-lg bg-paper px-4">
              <AccordionTrigger className="font-semibold py-4 hover:no-underline">
                Is it really completely free? Are there hidden fees?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-xs leading-relaxed">
                Yes, completely free. There are no hidden fees, paywalls, or subscriptions. We built
                this to solve the frustrating problem of resume sites hiding paywalls after you
                spend an hour building.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border rounded-lg bg-paper px-4">
              <AccordionTrigger className="font-semibold py-4 hover:no-underline">
                Is this template really ATS-friendly?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-xs leading-relaxed">
                Yes. Applicant Tracking Systems (ATS) read resumes linearly and parse the text
                content. Our Classic template uses standard fonts (Helvetica), structured section
                headers, and outputs clean semantic text in a single-column layout—guaranteed to be
                fully parsed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border rounded-lg bg-paper px-4">
              <AccordionTrigger className="font-semibold py-4 hover:no-underline">
                Where is my data stored?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 text-xs leading-relaxed">
                Your data is stored strictly in your browser's local storage (SessionStorage). It
                never leaves your machine until you submit the PDF request.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-border bg-gradient-to-b from-paper/30 to-background text-center space-y-6">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display text-ink">
            Ready to land your dream job?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base mb-6">
            Join thousands of successful candidates who built professional, clean resumes on our
            platform.
          </p>
          <Button
            asChild
            size="lg"
            variant="saffron"
            className="w-full sm:w-auto py-6 text-base font-semibold"
          >
            <Link to="/builder">
              Create My Resume Now <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-paper/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Resume / CV Builder. All rights reserved.</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/support" className="hover:text-foreground transition-colors">
              Support
            </Link>
            <Link to="/developer" className="hover:text-foreground transition-colors">
              Developer Info
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
