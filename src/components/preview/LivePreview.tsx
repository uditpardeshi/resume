import { useEffect, useState, useCallback, useRef } from "react";
import type { ResumeData } from "@/lib/resume-schema";
import { useResumeStore } from "@/store/useResumeStore";
import { ShieldCheck } from "lucide-react";

// Real-time PDF preview fetched directly from the backend API.
// Debounced to prevent excessive server requests during typing.
// Preview is strictly read-only — no download, no open-in-tab.

export function LivePreview({ data }: { data: ResumeData }) {
  const { template } = useResumeStore();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showRightClickMsg, setShowRightClickMsg] = useState(false);

  // PDF.js states
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const renderTasks = useRef<any[]>([]);

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
      // Block Ctrl+S, Ctrl+P, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, F12
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

  // Dynamically load PDF.js from CDN
  useEffect(() => {
    if ((window as any).pdfjsLib) {
      setPdfjsLoaded(true);
      return;
    }

    const existingScript = document.querySelector('script[src*="pdf.min.js"]');
    if (existingScript) {
      if ((window as any).pdfjsLib) {
        setPdfjsLoaded(true);
        return;
      }
      const handleLoad = () => {
        const pdfjsLib = (window as any).pdfjsLib;
        if (pdfjsLib) {
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          setPdfjsLoaded(true);
        }
      };
      existingScript.addEventListener("load", handleLoad);
      return () => {
        existingScript.removeEventListener("load", handleLoad);
      };
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      if (pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        setPdfjsLoaded(true);
      }
    };
    script.onerror = (e) => {
      console.error("Failed to load PDF.js from CDN:", e);
    };
    document.body.appendChild(script);

    return () => {};
  }, []);

  // Fetch new preview PDF blob
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

  // Parse loaded PDF document using PDF.js
  useEffect(() => {
    if (!pdfjsLoaded || !pdfUrl) {
      setPdfDoc(null);
      setNumPages(0);
      return;
    }

    let active = true;
    const loadDocument = async () => {
      try {
        const pdfjsLib = (window as any).pdfjsLib;
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        if (active) {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
        }
      } catch (err) {
        console.error("Failed to parse PDF document via PDF.js:", err);
      }
    };

    loadDocument();

    return () => {
      active = false;
    };
  }, [pdfUrl, pdfjsLoaded]);

  // Render pages sequentially when pdfDoc and numPages are ready
  useEffect(() => {
    if (!pdfDoc || numPages <= 0) return;

    // Cancel all existing rendering tasks
    renderTasks.current.forEach((task) => {
      if (task && typeof task.cancel === "function") {
        task.cancel();
      }
    });
    renderTasks.current = [];

    let active = true;

    const renderPages = async () => {
      // Wait for canvas elements to mount
      await new Promise((resolve) => requestAnimationFrame(resolve));

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        if (!active) break;
        const canvas = canvasRefs.current[pageNum - 1];
        if (!canvas) continue;

        try {
          const page = await pdfDoc.getPage(pageNum);
          if (!active) break;

          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          // Render at 1.5x scale for high-DPI crisp display
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          // Adjust canvas backing store size
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };

          const renderTask = page.render(renderContext);
          renderTasks.current[pageNum - 1] = renderTask;
          await renderTask.promise;
        } catch (err: any) {
          if (err.name !== "RenderingCancelledException") {
            console.error(`Error rendering page ${pageNum}:`, err);
          }
        }
      }
    };

    renderPages();

    return () => {
      active = false;
      renderTasks.current.forEach((task) => {
        if (task && typeof task.cancel === "function") {
          task.cancel();
        }
      });
    };
  }, [pdfDoc, numPages]);

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
          pdfjsLoaded ? (
            <div className="relative w-full h-full">
              <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col gap-4 p-2 bg-neutral-100/50">
                {Array.from({ length: numPages || 1 }, (_, i) => (
                  <div
                    key={i + 1}
                    className="relative w-full aspect-[210/297] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] border border-neutral-200/60 rounded-sm overflow-hidden shrink-0"
                  >
                    <canvas
                      ref={(el) => {
                        canvasRefs.current[i] = el;
                      }}
                      className="w-full h-full object-contain pointer-events-none bg-white"
                    />
                    {/* Page indicator overlay (subtle at the corner) */}
                    {numPages > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded font-mono select-none pointer-events-none">
                        {i + 1} / {numPages}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Transparent shield overlay — blocks all direct interaction with canvas */}
              <div
                className="absolute inset-0 z-20 pointer-events-auto"
                onContextMenu={handleContextMenu}
                onDragStart={(e) => e.preventDefault()}
                style={{ cursor: "default" }}
              />
            </div>
          ) : (
            /* Fallback to original iframe view if PDF.js fails to load */
            <div className="relative w-full h-full">
              <iframe
                src={`${pdfUrl}#zoom=page-fit&view=Fit&toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-0 select-none pointer-events-none"
                title="Exact PDF Preview"
              />
              <div
                className="absolute inset-0 z-20 pointer-events-auto"
                onContextMenu={handleContextMenu}
                onDragStart={(e) => e.preventDefault()}
                style={{ cursor: "default" }}
              />
            </div>
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

