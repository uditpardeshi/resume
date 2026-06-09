import { create } from "zustand";
import type { ResumeData, TemplateId } from "@/lib/resume-schema";
import { emptyResume } from "@/lib/resume-schema";

interface ResumeState {
  data: ResumeData;
  template: TemplateId;
  step: number;
  setStep: (n: number) => void;
  setTemplate: (t: TemplateId) => void;
  setData: (updater: (d: ResumeData) => ResumeData) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeState>()((set) => ({
  data: emptyResume,
  template: "classic",
  step: 1,
  setStep: (n) => set({ step: Math.max(1, Math.min(5, n)) }),
  setTemplate: (t) => set({ template: t }),
  setData: (updater) => set((s) => ({ data: updater(s.data) })),
  reset: () => set({ data: emptyResume, step: 1, template: "classic" }),
}));

