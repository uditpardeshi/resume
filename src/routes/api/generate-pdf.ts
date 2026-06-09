import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ResumeSchema } from "@/lib/resume-schema";

const Body = z.object({
  template: z.enum([
    "classic",
    "modern",
    "minimal",
    "graphic",
    "emerald",
    "burgundy",
    "royal",
    "charcoal",
    "bronze",
    "navy",
    "forest",
    "plum",
    "orange",
    "steel",
    "classic-serif",
  ]),
  resumeData: ResumeSchema,
});

export const Route = createFileRoute("/api/generate-pdf")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        let parsed;
        try {
          parsed = Body.parse(await request.json());
        } catch (e) {
          const message = e instanceof z.ZodError ? "Invalid resume data" : "Invalid body";
          return new Response(JSON.stringify({ error: message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Render PDF directly using server-side generator.
        let pdfBuf: Uint8Array;
        try {
          const { generatePdfBuffer } = await import("@/lib/pdf/pdf-generator-impl");
          pdfBuf = await generatePdfBuffer(parsed.resumeData, parsed.template);
        } catch (e) {
          console.error("[generate-pdf] render failure", e);
          return new Response(JSON.stringify({ error: "PDF generation failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(pdfBuf as unknown as BodyInit, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${encodeURIComponent(parsed.resumeData.personal.fullName || "resume")}.pdf"`,
            "Cache-Control": "no-store, no-cache, must-revalidate, private",
            Pragma: "no-cache",
            Expires: "0",
            "X-Content-Type-Options": "nosniff",
          },
        });
      },
    },
  },
} as any);

