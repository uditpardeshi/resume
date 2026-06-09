import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeSchema } from "@/lib/resume-schema";
import { ClassicResume } from "@/lib/pdf/ClassicTemplate";
import { ModernResume } from "@/lib/pdf/ModernTemplate";
import { MinimalResume } from "@/lib/pdf/MinimalTemplate";
import { GraphicResume } from "@/lib/pdf/GraphicTemplate";

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

        // Use the unified parametric ClassicResume which supports all 15 template parameters
        const templateElement = ClassicResume({
          data: parsed.resumeData,
          template: parsed.template,
        });

        // Render PDF directly.
        let pdfBuf: Uint8Array;
        try {
          const buf = await Promise.race<Uint8Array>([
            renderToBuffer(templateElement) as unknown as Promise<Uint8Array>,
            new Promise<Uint8Array>((_, rej) =>
              setTimeout(() => rej(new Error("PDF render timeout")), 15_000),
            ),
          ]);
          pdfBuf = buf;
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
