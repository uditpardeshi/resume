import { create } from "zustand";
import { persist } from "zustand/middleware";
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

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      data: emptyResume,
      template: "classic",
      step: 1,
      setStep: (n) => set({ step: Math.max(1, Math.min(5, n)) }),
      setTemplate: (t) => set({ template: t }),
      setData: (updater) => set((s) => ({ data: updater(s.data) })),
      reset: () => set({ data: emptyResume, step: 1, template: "classic" }),
    }),
    {
      name: "resume-builder-state",
      merge: (persistedState, initialState) => {
        const p = persistedState as any;
        return {
          ...initialState,
          ...p,
          data: {
            ...initialState.data,
            ...(p?.data || {}),
            personal: {
              ...initialState.data.personal,
              ...(p?.data?.personal || {}),
            },
            declaration: {
              ...initialState.data.declaration,
              ...(p?.data?.declaration || {}),
            },
            customization: {
              ...initialState.data.customization,
              ...(p?.data?.customization || {}),
              formats: {
                ...initialState.data.customization?.formats,
                ...(p?.data?.customization?.formats || {}),
              },
              sectionNames: {
                ...initialState.data.customization?.sectionNames,
                ...(p?.data?.customization?.sectionNames || {}),
              },
              showSections: {
                ...initialState.data.customization?.showSections,
                ...(p?.data?.customization?.showSections || {}),
              },
            },
          },
        };
      },
    },
  ),
);
