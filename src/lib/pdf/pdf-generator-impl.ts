import { renderToBuffer } from "@react-pdf/renderer";
import { ClassicResume } from "./ClassicTemplate";
import type { ResumeData, TemplateId } from "../resume-schema";

export async function generatePdfBuffer(
  resumeData: ResumeData,
  template: TemplateId,
): Promise<Uint8Array> {
  const templateElement = ClassicResume({
    data: resumeData,
    template: template,
  });

  return await Promise.race<Uint8Array>([
    renderToBuffer(templateElement) as unknown as Promise<Uint8Array>,
    new Promise<Uint8Array>((_, rej) =>
      setTimeout(() => rej(new Error("PDF render timeout")), 15_000),
    ),
  ]);
}
