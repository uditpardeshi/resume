import { useState, useRef } from "react";
import { Button } from "./button";
import { Sparkles, Loader2 } from "lucide-react";
import { enhanceText, type ProgressInfo } from "@/lib/ai-enhancer";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./dialog";
import { gsap } from "gsap";

interface AiEnhancerButtonProps {
  text: string;
  onEnhance: (newText: string) => void;
  context: "summary" | "skills" | "achievements" | "strengths" | "certifications" | "experience";
}

export function AiEnhancerButton({ text, onEnhance, context }: AiEnhancerButtonProps) {
  const [loading, setLoading] = useState(false);
  const [progressInfo, setProgressInfo] = useState<ProgressInfo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleEnhance = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!text.trim()) {
      toast.error("Please type some initial text first to enhance.");
      return;
    }

    setLoading(true);
    try {
      const resultText = await enhanceText(text, context, (info) => {
        setProgressInfo(info);
        if (info.status === "initiate" || info.status === "downloading") {
          setShowModal(true);
        } else if (info.status === "ready") {
          // Keep progress visible for a moment before closing
          setTimeout(() => {
            setShowModal(false);
            setProgressInfo(null);
          }, 800);
        }
      });
      onEnhance(resultText);
      toast.success("Text enhanced successfully! ✨");
    } catch (e: any) {
      toast.error(e.message || "Failed to enhance text.");
      setShowModal(false);
      setProgressInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: 360,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
  };

  return (
    <div className="inline-flex items-center">
      <Button
        type="button"
        variant="saffron"
        size="sm"
        disabled={loading}
        onClick={handleEnhance}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="h-7 text-[10px] px-2.5 font-bold flex items-center gap-1 select-none font-display shadow-[2px_2px_0px_0px_var(--color-ink)] hover:shadow-[3px_3px_0px_0px_var(--color-ink)] active:shadow-[1px_1px_0px_0px_var(--color-ink)] border-2 border-ink"
      >
        {loading ? (
          <Loader2 className="w-3 h-3 animate-spin text-saffron-foreground" />
        ) : (
          <div ref={iconRef} className="flex items-center justify-center shrink-0">
            <Sparkles className="w-3 h-3 text-saffron-foreground" />
          </div>
        )}
        {loading && !showModal ? "Enhancing..." : "Enhance"}
      </Button>

      {/* Simplified progress loading modal */}
      <Dialog open={showModal}>
        <DialogContent className="max-w-xs bg-paper border-2 border-ink shadow-[4px_4px_0px_0px_var(--color-ink)] rounded-xl pointer-events-none">
          <DialogTitle className="sr-only">Downloading</DialogTitle>
          <DialogDescription className="sr-only">
            Downloading...
          </DialogDescription>

          <div className="flex flex-col items-center text-center p-3 space-y-3">
            <h3 className="font-display text-sm font-bold text-foreground">
              Downloading...
            </h3>

            {/* Progress bar */}
            <div className="w-full space-y-1.5">
              <div className="flex justify-end text-[10px] font-semibold text-muted-foreground tracking-wider px-0.5">
                <span>{progressInfo?.progress || 0}%</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2 bg-secondary/80 rounded-full overflow-hidden border border-border/40 relative">
                <div
                  className="h-full bg-gradient-to-r from-saffron/80 to-saffron rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                  style={{ width: `${progressInfo?.progress || 0}%` }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
