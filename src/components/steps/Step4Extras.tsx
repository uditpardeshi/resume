import { FloatingTextarea } from "@/components/ui/floating-input";
import { useResumeStore } from "@/store/useResumeStore";
import { cn } from "@/lib/utils";
import { AiEnhancerButton } from "@/components/ui/AiEnhancerButton";

export function Step4Extras() {
  const { data, setData } = useResumeStore();

  const updateField = (
    k: "summary" | "skills" | "achievements" | "strengths" | "certifications",
    v: string,
  ) => {
    setData((d) => ({
      ...d,
      [k]: v,
    }));
  };

  const FormatSelector = ({
    fieldName,
  }: {
    fieldName: "summary" | "skills" | "achievements" | "strengths" | "certifications";
  }) => {
    const currentVal =
      data.customization?.formats?.[fieldName] ||
      (fieldName === "summary" ? "paragraph" : fieldName === "skills" ? "grid3" : "bullets");

    const formatsList = [
      { key: "paragraph", label: "Paragraph" },
      { key: "grid3", label: "3-Col Grid" },
      { key: "grid2", label: "2-Col Grid" },
      { key: "bullets", label: "Bulleted List" },
      { key: "numbered", label: "Numbered List" },
      { key: "comma", label: "Comma Separated" },
    ] as const;

    const setFormat = (fmt: (typeof formatsList)[number]["key"]) => {
      setData((d) => {
        const cust = d.customization || {};
        const formats = cust.formats || {};
        return {
          ...d,
          customization: {
            ...cust,
            formats: {
              summary: "paragraph",
              skills: "grid3",
              achievements: "bullets",
              strengths: "bullets",
              certifications: "bullets",
              ...formats,
              [fieldName]: fmt,
            },
          },
        };
      });
    };

    const textValue = data[fieldName] || "";

    return (
      <div className="flex flex-wrap items-center justify-between gap-1.5 mt-1 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mr-1">
            Format:
          </span>
          {formatsList.map((f) => {
            const active = currentVal === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFormat(f.key)}
                className={cn(
                  "text-[10px] px-2 py-0.5 border rounded-md cursor-pointer transition-all select-none font-medium",
                  active
                    ? "bg-primary border-primary text-primary-foreground font-semibold shadow-sm"
                    : "bg-paper text-muted-foreground hover:text-foreground border-border hover:bg-secondary/50",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <AiEnhancerButton
          text={textValue}
          onEnhance={(val) => updateField(fieldName, val)}
          context={fieldName}
        />
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Professional Profile & Expertise</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add your summary statement, core skills, achievements, strengths, and certifications.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <FloatingTextarea
            label="Professional Summary"
            value={data.summary || ""}
            maxLength={1000}
            rows={3}
            onChange={(e) => updateField("summary", e.target.value)}
            placeholder="e.g. Results-driven Software Engineer with 3+ years of experience building scalable web solutions..."
          />
          <FormatSelector fieldName="summary" />
        </div>

        <div>
          <FloatingTextarea
            label="Core Skills / Expertise"
            value={data.skills || ""}
            maxLength={1000}
            rows={3}
            onChange={(e) => updateField("skills", e.target.value)}
            placeholder="e.g. React.js, TypeScript, Tailwind CSS, Python, SQL, REST APIs, Git, Agile Methodology..."
          />
          <FormatSelector fieldName="skills" />
        </div>

        <div>
          <FloatingTextarea
            label="Special Achievements"
            value={data.achievements || ""}
            maxLength={1000}
            rows={3}
            onChange={(e) => updateField("achievements", e.target.value)}
            placeholder="e.g. Winner of National Smart India Hackathon 2024; Published 2 technical research papers..."
          />
          <FormatSelector fieldName="achievements" />
        </div>

        <div>
          <FloatingTextarea
            label="Strengths"
            value={data.strengths || ""}
            maxLength={1000}
            rows={3}
            onChange={(e) => updateField("strengths", e.target.value)}
            placeholder="e.g. Dynamic problem solving, collaborative leadership, adaptive communication..."
          />
          <FormatSelector fieldName="strengths" />
        </div>

        <div>
          <FloatingTextarea
            label="Certifications & Training"
            value={data.certifications || ""}
            maxLength={1000}
            rows={3}
            onChange={(e) => updateField("certifications", e.target.value)}
            placeholder="e.g. AWS Certified Developer Associate; Completed Advanced Algorithms Course by Stanford..."
          />
          <FormatSelector fieldName="certifications" />
        </div>
      </div>
    </div>
  );
}
