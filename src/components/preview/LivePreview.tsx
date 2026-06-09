import { useEffect, useState, useCallback } from "react";
import type { ResumeData } from "@/lib/resume-schema";
import { useResumeStore } from "@/store/useResumeStore";
import { FileText, ShieldCheck } from "lucide-react";

// Real-time PDF preview fetched directly from the backend API.
// Debounced to prevent excessive server requests during typing.
// Preview is strictly read-only — no download, no open-in-tab.

export function LivePreview({ data }: { data: ResumeData }) {
  const { template } = useResumeStore();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showRightClickMsg, setShowRightClickMsg] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth < 1024,
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Block right-click on the entire preview component
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRightClickMsg(true);
    setTimeout(() => setShowRightClickMsg(false), 2000);
  }, []);

  // Block keyboard shortcuts for saving / printing / devtools
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+S, Ctrl+P, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, F12
      if (
        (e.ctrlKey && (e.key === "s" || e.key === "S")) ||
        (e.ctrlKey && (e.key === "p" || e.key === "P")) ||
        (e.ctrlKey && (e.key === "u" || e.key === "U")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) ||
        e.key === "F12"
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/generate-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeData: data, template }),
        });
        if (res.ok && active) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setPdfUrl((prev) => {
            if (prev) {
              URL.revokeObjectURL(prev);
            }
            return url;
          });
        }
      } catch (e) {
        console.error("PDF preview generation error:", e);
      } finally {
        if (active) setLoading(false);
      }
    }, 300); // 300ms debounce for near-instant response

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [data, template]);

  // Clean up URL object on unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div
      className="relative w-full aspect-[210/297] bg-paper border border-border rounded-sm shadow-soft overflow-hidden group select-none"
      onContextMenu={handleContextMenu}
      onDragStart={(e) => e.preventDefault()}
      style={{ WebkitUserSelect: "none", userSelect: "none" }}
    >
      {/* Right-click blocked notification */}
      {showRightClickMsg && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-paper border-2 border-ink shadow-[4px_4px_0px_0px_var(--color-ink)] rounded-lg px-6 py-4 max-w-[260px] text-center">
            <div className="w-10 h-10 rounded-full bg-saffron/15 text-saffron flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="font-display text-sm font-bold text-ink">Not so smart! 😏</p>
            <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
              Right-click is disabled. Download your resume from the final step.
            </p>
          </div>
        </div>
      )}

      {/* Premium stacked paper visual decoration behind the frame */}
      <div className="absolute inset-0 bg-paper/40 border border-border rounded-sm translate-x-1 translate-y-1.5 rotate-[0.8deg] transition-transform duration-300 group-hover:rotate-[1.5deg] group-hover:translate-x-1.5 group-hover:translate-y-2 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-paper/80 border border-border rounded-sm -translate-x-1 translate-y-1 -rotate-[0.5deg] transition-transform duration-300 group-hover:-rotate-[1.2deg] group-hover:-translate-x-1.5 group-hover:translate-y-1.5 pointer-events-none z-0" />

      <div className="relative w-full h-full bg-paper z-10">
        {loading && (
          <div className="absolute top-3 right-3 z-30 bg-paper/90 backdrop-blur-sm border border-border rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm text-[9px] uppercase tracking-wider text-muted-foreground font-bold animate-fade-in">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-saffron border-t-transparent animate-spin" />
            Syncing
          </div>
        )}

        {pdfUrl ? (
          /* Desktop & Mobile iframe preview — pointer-events-none blocks all interaction,
             transparent overlay on top blocks right-click / drag / save-as */
          <div className="relative w-full h-full">
            <iframe
              src={`${pdfUrl}#zoom=page-fit&view=Fit&toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-0 select-none pointer-events-none"
              title="Exact PDF Preview"
            />
            {/* Transparent shield overlay — blocks all direct interaction with iframe */}
            <div
              className="absolute inset-0 z-20"
              onContextMenu={handleContextMenu}
              onDragStart={(e) => e.preventDefault()}
              style={{ cursor: "default" }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground italic p-4 text-center">
            Loading live PDF preview…
          </div>
        )}
      </div>
    </div>
  );
}
