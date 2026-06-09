import { z } from "zod";

export const ResumeSchema = z.object({
  personal: z.object({
    fullName: z.string().max(100),
    address: z.string().max(200),
    phone: z.string().max(20),
    email: z.string().email().or(z.literal("")),
    dob: z.string().max(50),
    languages: z.string().max(150),
    photo: z.string().optional().or(z.literal("")),
    photoSize: z.number().min(40).max(150).optional(),
    photoPosition: z.enum(["left", "right"]).optional(),
  }),
  education: z
    .array(
      z.object({
        institution: z.string().max(150),
        degree: z.string().max(150),
        board: z.string().max(150),
        fromYear: z.string().max(30),
        toYear: z.string().max(30),
        grade: z.string().max(20),
      }),
    )
    .max(10),
  experience: z
    .array(
      z.object({
        company: z.string().max(150),
        role: z.string().max(150),
        fromDate: z.string().max(50),
        toDate: z.string().max(50),
        responsibilities: z.string().max(500),
      }),
    )
    .max(10),
  summary: z.string().max(1000).optional().or(z.literal("")),
  skills: z.string().max(1000).optional().or(z.literal("")),
  achievements: z.string().max(1000).optional().or(z.literal("")),
  strengths: z.string().max(1000).optional().or(z.literal("")),
  certifications: z.string().max(1000).optional().or(z.literal("")),
  declaration: z.object({
    text: z.string().max(1000),
    place: z.string().max(100),
    date: z.string().max(100),
  }),
  customization: z
    .object({
      formats: z
        .object({
          summary: z
            .enum(["paragraph", "bullets", "grid3", "grid2", "comma", "numbered"])
            .optional(),
          skills: z
            .enum(["paragraph", "bullets", "grid3", "grid2", "comma", "numbered"])
            .optional(),
          achievements: z
            .enum(["paragraph", "bullets", "grid3", "grid2", "comma", "numbered"])
            .optional(),
          strengths: z
            .enum(["paragraph", "bullets", "grid3", "grid2", "comma", "numbered"])
            .optional(),
          certifications: z
            .enum(["paragraph", "bullets", "grid3", "grid2", "comma", "numbered"])
            .optional(),
        })
        .optional(),
      sectionNames: z
        .object({
          education: z.string().max(100).optional(),
          experience: z.string().max(100).optional(),
          skills: z.string().max(100).optional(),
          achievements: z.string().max(100).optional(),
          strengths: z.string().max(100).optional(),
          certifications: z.string().max(100).optional(),
          declaration: z.string().max(100).optional(),
        })
        .optional(),
      showSections: z
        .object({
          summary: z.boolean().optional(),
          experience: z.boolean().optional(),
          education: z.boolean().optional(),
          skills: z.boolean().optional(),
          achievements: z.boolean().optional(),
          strengths: z.boolean().optional(),
          certifications: z.boolean().optional(),
          declaration: z.boolean().optional(),
        })
        .optional(),
      spacing: z.enum(["compact", "normal", "spacious"]).optional(),
    })
    .optional(),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
export type TemplateId =
  | "classic"
  | "modern"
  | "minimal"
  | "graphic"
  | "emerald"
  | "burgundy"
  | "royal"
  | "charcoal"
  | "bronze"
  | "navy"
  | "forest"
  | "plum"
  | "orange"
  | "steel"
  | "classic-serif";

export const emptyResume: ResumeData = {
  personal: {
    fullName: "",
    address: "",
    phone: "",
    email: "",
    dob: "",
    languages: "",
    photo: "",
    photoSize: 80,
    photoPosition: "right",
  },
  education: [],
  experience: [],
  summary: "",
  skills: "",
  achievements: "",
  strengths: "",
  certifications: "",
  declaration: {
    text: "I hereby declare that the above information is true and correct to the best of my knowledge.",
    place: "",
    date: "",
  },
  customization: {
    formats: {
      summary: "paragraph",
      skills: "grid3",
      achievements: "bullets",
      strengths: "bullets",
      certifications: "bullets",
    },
    sectionNames: {
      education: "Educational Details",
      experience: "Experience Details",
      skills: "Key Skills & Expertise",
      achievements: "Special Achievements",
      strengths: "Strengths",
      certifications: "Certifications & Trainings",
      declaration: "Declaration",
    },
    showSections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      achievements: true,
      strengths: true,
      certifications: true,
      declaration: true,
    },
    spacing: "normal",
  },
};
