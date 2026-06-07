import { createFileRoute } from "@tanstack/react-router";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { Toaster } from "@/components/ui/sonner";

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
  return (
    <>
      <ResumeBuilder />
      <Toaster />
    </>
  );
}
