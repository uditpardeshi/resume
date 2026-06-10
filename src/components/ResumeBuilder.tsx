import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { useResumeStore } from "@/store/useResumeStore";
import { StepIndicator } from "./StepIndicator";
import { Step1Personal } from "./steps/Step1Personal";
import { Step2Education } from "./steps/Step2Education";
import { Step3Experience } from "./steps/Step3Experience";
import { Step4Extras } from "./steps/Step4Extras";
import { Step5Template } from "./steps/Step5Template";
import { LivePreview } from "./preview/LivePreview";
import { AtsChecker } from "./preview/AtsChecker";
import { Button } from "./ui/button";
import { ResumeSchema } from "@/lib/resume-schema";
import { ArrowLeft, ArrowRight, Eye, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "./ui/dialog";
import { toast } from "sonner";
import { trackEvent } from "@/lib/google-insights";

const STEP_COMPONENTS = [
  Step1Personal,
  Step2Education,
  Step3Experience,
  Step4Extras,
  Step5Template,
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    rotateY: dir > 0 ? 12 : -12,
    scale: 0.95,
    opacity: 0,
  }),
  center: {
    x: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    rotateY: dir > 0 ? -12 : 12,
    scale: 0.95,
    opacity: 0,
  }),
};

export function ResumeBuilder() {
  const navigate = useNavigate();
  const { data, step, setStep, template } = useResumeStore();
  const [paying, setPaying] = useState(false);
  const [direction, setDirection] = useState(1);
  const [prevStep, setPrevStep] = useState(step);
  const formScrollRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (step !== prevStep) {
    setDirection(step > prevStep ? 1 : -1);
    setPrevStep(step);
  }

  // Track step view on step change
  useEffect(() => {
    trackEvent("resume_step_view", {
      step_number: step,
      step_name: ["Personal Info", "Education", "Experience", "Extras", "Templates"][step - 1] || `Step ${step}`,
    });
  }, [step]);

  // Scroll to top on step change
  useEffect(() => {
    if (formScrollRef.current) {
      formScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const StepComp = STEP_COMPONENTS[step - 1];
  const isLast = step === 5;

  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    const parsed = ResumeSchema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      toast.error(`${first.path.join(".") || "Resume"}: ${first.message}`);
      return;
    }
    setDownloading(true);
    try {
      const pdfRes = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: parsed.data, template, download: true }),
      });
      if (!pdfRes.ok) {
        const j = (await pdfRes.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "PDF generation failed");
      }
      const blob = await pdfRes.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${parsed.data.personal.fullName || "resume"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Resume downloaded successfully!");

      // Track successful download in Google Analytics
      try {
        let totalWords = 0;
        const getWordCount = (str?: string) => {
          if (!str) return 0;
          return str.trim().split(/\s+/).filter(Boolean).length;
        };
        totalWords += getWordCount(parsed.data.personal.fullName) + getWordCount(parsed.data.personal.address);
        totalWords += getWordCount(parsed.data.summary) + getWordCount(parsed.data.skills);
        totalWords += getWordCount(parsed.data.achievements) + getWordCount(parsed.data.strengths) + getWordCount(parsed.data.certifications);
        parsed.data.education.forEach(e => {
          totalWords += getWordCount(e.degree) + getWordCount(e.institution);
        });
        parsed.data.experience.forEach(e => {
          totalWords += getWordCount(e.role) + getWordCount(e.company) + getWordCount(e.responsibilities);
        });

        trackEvent("download_resume", {
          template: template,
          word_count: totalWords,
          has_summary: !!parsed.data.summary,
          skills_count: parsed.data.skills ? parsed.data.skills.split(/[,\n•·|]+/).filter(Boolean).length : 0,
          experience_count: parsed.data.experience.length,
          education_count: parsed.data.education.length,
        });
      } catch (err) {
        console.error("Failed to track download event:", err);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "PDF generation failed");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="h-[100dvh] lg:overflow-hidden flex flex-col">
      <header className="border-b bg-paper/80 backdrop-blur sticky top-0 z-30 shrink-0">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-display text-lg font-semibold tracking-tight text-center sm:text-left">
            Resume / CV Builder
          </div>
          <div className="w-full sm:max-w-md md:max-w-xl">
            <StepIndicator current={step} onJump={(n) => setStep(n)} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 lg:py-6 overflow-hidden flex-1 grid lg:grid-cols-[1fr_minmax(0,420px)] gap-6 sm:gap-8 w-full">
        <section className="h-full flex flex-col min-w-0 overflow-hidden">
          <div
            ref={formScrollRef}
            style={{ perspective: 1200 }}
            className="flex-1 overflow-y-auto pr-2 pb-32 lg:pb-4 no-scrollbar"
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <StepComp />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-20 bg-paper/90 backdrop-blur-md border-t border-border px-4 py-3 lg:static lg:bg-transparent lg:border-t lg:border-border/40 lg:px-0 lg:py-3 lg:mt-2 lg:shrink-0">
            <div className="flex items-center justify-between gap-3 max-w-6xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => {
                  if (step === 1) {
                    navigate({ to: "/" });
                  } else {
                    setStep(step - 1);
                  }
                }}
                className="text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>

              {/* Mobile preview button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Eye className="w-4 h-4 mr-1.5" /> Preview
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-md sm:max-w-lg p-4"
                  aria-describedby="preview-dialog-desc"
                >
                  <DialogTitle className="sr-only">Resume Preview</DialogTitle>
                  <DialogDescription id="preview-dialog-desc" className="sr-only">
                    Live preview of your resume PDF
                  </DialogDescription>
                  <LivePreview data={data} />
                </DialogContent>
              </Dialog>

              {!isLast ? (
                <Button onClick={() => setStep(step + 1)} className="text-sm">
                  Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  variant="saffron"
                  className="text-sm"
                >
                  {downloading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>Download Resume PDF</>
                  )}
                </Button>
              )}
            </div>
          </div>
        </section>

        <aside className="hidden lg:block h-full overflow-hidden">
          {isDesktop && (
            <div className="h-full flex flex-col overflow-y-auto pr-1 no-scrollbar">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 shrink-0">
                Live preview
              </div>
              <div className="shrink-0">
                <LivePreview data={data} />
              </div>
              <div className="mt-4">
                <AtsChecker data={data} template={template} />
              </div>
              <p className="text-[11px] text-muted-foreground text-center mt-3 mb-6 shrink-0">
                Final PDF will be A4, ATS-friendly.
              </p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
