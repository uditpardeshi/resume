import { createFileRoute } from "@tanstack/react-router";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

export const Route = createFileRoute("/builder")({
  head: () => ({
    meta: [
      { title: "Build Your Resume — One·Rupee Resume" },
      {
        name: "description",
        content:
          "Build an ATS-friendly resume in 5 steps. Pay ₹1 in India or $0.50 internationally.",
      },
    ],
  }),
  component: BuilderRoute,
});

function BuilderRoute() {
  // Global protection: block right-click, print, save, devtools shortcuts
  useEffect(() => {
    const blockContext = (e: MouseEvent) => {
      e.preventDefault();
    };
    const blockKeys = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === "s" || e.key === "S")) ||
        (e.ctrlKey && (e.key === "p" || e.key === "P")) ||
        (e.ctrlKey && (e.key === "u" || e.key === "U")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) ||
        e.key === "F12"
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const blockDrag = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("keydown", blockKeys);
    document.addEventListener("dragstart", blockDrag);
    return () => {
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("dragstart", blockDrag);
    };
  }, []);

  return (
    <>
      <ResumeBuilder />
      <Toaster />
    </>
  );
}

