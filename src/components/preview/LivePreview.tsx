import { useEffect, useState } from "react";
import type { ResumeData } from "@/lib/resume-schema";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Download } from "lucide-react";

// Real-time PDF preview fetched directly from the backend API.
// Debounced to prevent excessive server requests during typing.

export function LivePreview({ data }: { data: ResumeData }) {
  const { template } = useResumeStore();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 1024
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
    <div className="relative w-full aspect-[210/297] bg-paper border border-border rounded-sm shadow-soft overflow-hidden group">
      {/* Premium stacked paper visual decoration behind the frame */}
      <div 
        className="absolute inset-0 bg-paper/40 border border-border rounded-sm translate-x-1 translate-y-1.5 rotate-[0.8deg] transition-transform duration-300 group-hover:rotate-[1.5deg] group-hover:translate-x-1.5 group-hover:translate-y-2 pointer-events-none z-0"
      />
      <div 
        className="absolute inset-0 bg-paper/80 border border-border rounded-sm -translate-x-1 translate-y-1 -rotate-[0.5deg] transition-transform duration-300 group-hover:-rotate-[1.2deg] group-hover:-translate-x-1.5 group-hover:translate-y-1.5 pointer-events-none z-0"
      />

      <div className="relative w-full h-full bg-paper z-10">
        {loading && (
          <div className="absolute top-3 right-3 z-30 bg-paper/90 backdrop-blur-sm border border-border rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm text-[9px] uppercase tracking-wider text-muted-foreground font-bold animate-fade-in">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-saffron border-t-transparent animate-spin" />
            Syncing
          </div>
        )}
        
        {pdfUrl ? (
          isMobile ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-paper relative z-10">
              <div className="w-12 h-12 rounded-full bg-saffron/10 text-saffron flex items-center justify-center mb-3 animate-bounce">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-display text-base font-bold text-ink mb-1">Live PDF Preview Ready</h3>
              <p className="text-[11px] text-muted-foreground max-w-[280px] leading-relaxed mb-5">
                Mobile browsers cannot render embedded PDF files inside web pages. 
                Use the actions below to view or save your resume.
              </p>
              <div className="flex flex-col gap-2.5 w-full max-w-[200px]">
                <Button 
                  onClick={() => window.open(pdfUrl, "_blank")}
                  variant="saffron" 
                  className="w-full text-xs font-semibold py-4"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> View in New Tab
                </Button>
                <a 
                  href={pdfUrl} 
                  download={`${data.personal.fullName || "resume"}.pdf`}
                  className="w-full"
                >
                  <Button 
                    variant="outline" 
                    className="w-full text-xs font-medium py-4 border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)]"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Download Preview
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-0 select-none pointer-events-none sm:pointer-events-auto"
              title="Exact PDF Preview"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground italic p-4 text-center">
            Loading live PDF preview…
          </div>
        )}
      </div>
    </div>
  );
}
