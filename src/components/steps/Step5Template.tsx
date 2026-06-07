import { useResumeStore } from "@/store/useResumeStore";
import { cn } from "@/lib/utils";
import type { TemplateId } from "@/lib/resume-schema";
import { Check } from "lucide-react";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-input";
import { useEffect } from "react";

const TEMPLATES: { id: TemplateId; name: string; tagline: string; available: boolean; badge?: string; badgeColor?: string }[] = [
  { id: "classic", name: "Classic", tagline: "Traditional, clean, professional layout", available: true, badge: "100% ATS Score", badgeColor: "bg-emerald-600 text-white" },
  { id: "modern", name: "Modern Teal", tagline: "Subtle colors, structured accent borders", available: true, badge: "Popular", badgeColor: "bg-blue-600 text-white" },
  { id: "minimal", name: "Minimal Serif", tagline: "Elegant serif typography, clean spacing", available: true },
  { id: "graphic", name: "Graphic Header", tagline: "Bold dark header block with clean layout", available: true },
  { id: "emerald", name: "Emerald Accent", tagline: "Fresh emerald palette, clean border tabs", available: true },
  { id: "burgundy", name: "Burgundy Classic", tagline: "Deep burgundy layout with serif touch", available: true },
  { id: "royal", name: "Royal Executive", tagline: "Polished royal blue accents for leaders", available: true },
  { id: "charcoal", name: "Slate Charcoal", tagline: "Standard corporate gray, high parsability", available: true },
  { id: "bronze", name: "Bronze Elegant", tagline: "Earth-toned accents, serif body text", available: true },
  { id: "navy", name: "Navy Corporate", tagline: "Traditional navy color, trustworthy vibe", available: true },
  { id: "forest", name: "Forest Green", tagline: "Relaxed dark-green headers, legible columns", available: true },
  { id: "plum", name: "Plum Sophisticated", tagline: "Unique dark purple styling and serif headings", available: true },
  { id: "orange", name: "Warm Orange", tagline: "Energetic orange headers for creative roles", available: true },
  { id: "steel", name: "Steel Corporate", tagline: "Professional steel gray color styling", available: true },
  { id: "classic-serif", name: "Classic Serif", tagline: "Times-Roman layout of the Traditional design", available: true },
];

export function Step5Template() {
  const { template, setTemplate, data, setData } = useResumeStore();

  const updateDeclaration = (k: "text" | "place" | "date", v: string) => {
    setData((d) => ({
      ...d,
      declaration: {
        ...(d.declaration || {}),
        [k]: v,
      },
    }));
  };

  const updateCustomization = (patch: Partial<NonNullable<typeof data.customization>>) => {
    setData((d) => ({
      ...d,
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
        ...(d.customization || {}),
        ...patch,
      },
    }));
  };

  const updateSectionName = (key: string, val: string) => {
    setData((d) => {
      const cust = d.customization || {};
      const sectionNames = cust.sectionNames || {};
      const formats = cust.formats || {};
      return {
        ...d,
        customization: {
          formats: {
            summary: "paragraph",
            skills: "grid3",
            achievements: "bullets",
            strengths: "bullets",
            certifications: "bullets",
            ...formats,
          },
          sectionNames: {
            education: "Educational Details",
            experience: "Experience Details",
            skills: "Key Skills & Expertise",
            achievements: "Special Achievements",
            strengths: "Strengths",
            certifications: "Certifications & Trainings",
            declaration: "Declaration",
            ...sectionNames,
            [key]: val,
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
            ...(cust.showSections || {}),
          },
          spacing: cust.spacing || "normal",
        },
      };
    });
  };

  const toggleSection = (key: string) => {
    setData((d) => {
      const cust = d.customization || {};
      const showSections = cust.showSections || {};
      const formats = cust.formats || {};
      const currentVal = showSections[key as keyof typeof showSections] !== false;
      return {
        ...d,
        customization: {
          formats: {
            summary: "paragraph",
            skills: "grid3",
            achievements: "bullets",
            strengths: "bullets",
            certifications: "bullets",
            ...formats,
          },
          sectionNames: {
            education: "Educational Details",
            experience: "Experience Details",
            skills: "Key Skills & Expertise",
            achievements: "Special Achievements",
            strengths: "Strengths",
            certifications: "Certifications & Trainings",
            declaration: "Declaration",
            ...(cust.sectionNames || {}),
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
            ...showSections,
            [key]: !currentVal,
          },
          spacing: cust.spacing || "normal",
        },
      };
    });
  };

  // Default date to today's date if not set
  useEffect(() => {
    if (!data.declaration?.date) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      updateDeclaration("date", formattedDate);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Declaration & Template</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select a template and fill in declaration details to complete your resume.
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          1. Choose Template
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {TEMPLATES.map((t) => {
            const selected = template === t.id;
            return (
              <button
                key={t.id}
                type="button"
                disabled={!t.available}
                onClick={() => setTemplate(t.id)}
                className={cn(
                  "relative text-left paper-card p-4 transition-all hover:-translate-y-[1px] duration-150 cursor-pointer",
                  selected && "translate-y-[2px] border-b-[2px] border-r-[1px] border-saffron bg-saffron/5 shadow-sm ring-1 ring-saffron/20",
                  !t.available && "opacity-50 cursor-not-allowed hover:translate-y-0"
                )}
              >
                <TemplateThumb id={t.id} />
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.tagline}
                    </div>
                  </div>
                  {selected && (
                    <span className="w-5 h-5 rounded-full bg-saffron text-saffron-foreground inline-flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                {t.badge && (
                  <div className={cn("absolute top-2 right-2 text-[8px] sm:text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold shadow-sm", t.badgeColor)}>
                    {t.badge}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          2. Declaration Details
        </h3>
        <div className="space-y-4">
          <FloatingTextarea
            label="Declaration Statement"
            required
            value={data.declaration?.text || ""}
            maxLength={500}
            rows={2}
            onChange={(e) => updateDeclaration("text", e.target.value)}
            placeholder="I hereby declare that the above information is true and correct..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FloatingInput
              label="Place"
              required
              value={data.declaration?.place || ""}
              maxLength={100}
              onChange={(e) => updateDeclaration("place", e.target.value)}
              placeholder="e.g. Mumbai"
            />
            <FloatingInput
              label="Date"
              required
              value={data.declaration?.date || ""}
              maxLength={100}
              onChange={(e) => updateDeclaration("date", e.target.value)}
              placeholder="e.g. 6th June 2026"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            3. Layout & Section Customization
          </h3>
          <span className="text-[10px] bg-saffron/10 text-saffron font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Premium Options
          </span>
        </div>

        <div className="space-y-5">
          {/* Spacing selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider block">
              Vertical Spacing & Sizing
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["compact", "normal", "spacious"] as const).map((mode) => {
                const active = (data.customization?.spacing || "normal") === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updateCustomization({ spacing: mode })}
                    className={cn(
                      "py-2 px-3 text-xs font-medium border rounded-md transition-all capitalize cursor-pointer text-center",
                      active
                        ? "bg-primary border-primary text-primary-foreground shadow-sm font-semibold"
                        : "bg-paper hover:bg-secondary/50 text-muted-foreground hover:text-foreground border-border"
                    )}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Adjust spacing to control how elements are distributed and fit within a single A4 page.
            </p>
          </div>

          {/* Show / Hide sections */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider block">
              Show / Hide Resume Sections
            </label>
            <div className="grid grid-cols-2 gap-2 bg-secondary/10 p-3 rounded-lg border border-border/40">
              {[
                { key: "summary", label: "Professional Summary" },
                { key: "education", label: "Education Details" },
                { key: "experience", label: "Experience Details" },
                { key: "skills", label: "Key Skills" },
                { key: "achievements", label: "Special Achievements" },
                { key: "strengths", label: "Strengths" },
                { key: "certifications", label: "Certifications" },
                { key: "declaration", label: "Declaration" }
              ].map(({ key, label }) => {
                const checked = data.customization?.showSections?.[key as keyof typeof data.customization.showSections] !== false;
                return (
                  <label
                    key={key}
                    className="flex items-center gap-2.5 p-1 text-xs text-foreground/90 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSection(key)}
                      className="rounded border-border text-saffron focus:ring-saffron w-4 h-4 cursor-pointer"
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Customize Section names */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider block">
              Rename Section Headings
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-secondary/5 rounded-lg border border-border/40">
              {[
                { key: "personal", label: "Personal Details Title", defaultVal: "1. Personal Details:-" },
                { key: "summary", label: "Summary Title", defaultVal: "Professional Summary:-" },
                { key: "education", label: "Education Title", defaultVal: "2) Educational Details :-" },
                { key: "experience", label: "Experience Title", defaultVal: "3) Experience Details:-" },
                { key: "skills", label: "Skills Title", defaultVal: "Key Skills & Expertise:-" },
                { key: "achievements", label: "Achievements Title", defaultVal: "4) Special Achievements:-" },
                { key: "strengths", label: "Strengths Title", defaultVal: "5) Strengths:" },
                { key: "certifications", label: "Certifications Title", defaultVal: "Certifications & Trainings:-" },
                { key: "declaration", label: "Declaration Title", defaultVal: "Declaration" }
              ].map(({ key, label, defaultVal }) => {
                const currentName = data.customization?.sectionNames?.[key as keyof typeof data.customization.sectionNames] || defaultVal;
                return (
                  <div key={key} className="space-y-1">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase block">{label}</span>
                    <input
                      type="text"
                      value={currentName}
                      maxLength={100}
                      onChange={(e) => updateSectionName(key, e.target.value)}
                      className="w-full text-xs bg-paper border border-border rounded-md px-2.5 py-1.5 focus:border-saffron focus:ring-1 focus:ring-saffron focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TemplateThumb({ id }: { id: TemplateId }) {
  if (id === "classic") {
    return (
      <div className="aspect-[3/4] bg-paper border rounded-sm p-3 flex flex-col gap-1.5">
        <div className="h-2 w-1/2 bg-foreground rounded-sm" />
        <div className="h-1 w-3/4 bg-muted-foreground/40 rounded-sm" />
        <div className="h-px w-full bg-foreground mt-1" />
        <div className="h-1.5 w-1/3 bg-foreground rounded-sm mt-1" />
        <div className="h-1 w-full bg-muted-foreground/30 rounded-sm" />
        <div className="h-1 w-5/6 bg-muted-foreground/30 rounded-sm" />
        <div className="h-1.5 w-1/3 bg-foreground rounded-sm mt-1" />
        <div className="h-1 w-full bg-muted-foreground/30 rounded-sm" />
        <div className="h-1 w-2/3 bg-muted-foreground/30 rounded-sm" />
      </div>
    );
  }
  if (id === "modern" || id === "emerald" || id === "royal" || id === "navy" || id === "forest" || id === "orange" || id === "steel") {
    let headerBg = "bg-muted";
    let accentBorder = "border-saffron";
    if (id === "emerald") { headerBg = "bg-emerald-50"; accentBorder = "border-emerald-600"; }
    else if (id === "royal") { headerBg = "bg-blue-50"; accentBorder = "border-blue-600"; }
    else if (id === "navy") { headerBg = "bg-indigo-50"; accentBorder = "border-indigo-900"; }
    else if (id === "forest") { headerBg = "bg-emerald-50/50"; accentBorder = "border-green-800"; }
    else if (id === "orange") { headerBg = "bg-orange-50"; accentBorder = "border-orange-600"; }
    else if (id === "steel") { headerBg = "bg-slate-100"; accentBorder = "border-slate-600"; }

    return (
      <div className="aspect-[3/4] bg-paper border rounded-sm overflow-hidden">
        <div className={cn(headerBg, "h-1/4 p-2 flex flex-col justify-end gap-1")}>
          <div className="h-2 w-1/2 bg-foreground rounded-sm" />
          <div className="h-1 w-3/4 bg-muted-foreground/50 rounded-sm" />
        </div>
        <div className="p-3 space-y-1.5">
          <div className={cn("border-l-2 pl-2 space-y-1", accentBorder)}>
            <div className="h-1.5 w-1/3 bg-foreground rounded-sm" />
            <div className="h-1 w-full bg-muted-foreground/30 rounded-sm" />
          </div>
        </div>
      </div>
    );
  }
  if (id === "minimal" || id === "burgundy" || id === "bronze" || id === "plum" || id === "classic-serif") {
    let accentLine = "bg-foreground";
    if (id === "burgundy") accentLine = "bg-red-800";
    else if (id === "bronze") accentLine = "bg-amber-800";
    else if (id === "plum") accentLine = "bg-purple-800";
    return (
      <div className="aspect-[3/4] bg-paper border rounded-sm p-4 flex flex-col gap-2">
        <div className="h-3 w-2/3 bg-foreground rounded-sm" style={{ fontFamily: "serif" }} />
        <div className={cn("h-px w-12 mt-1", accentLine)} />
        <div className="h-1 w-full bg-muted-foreground/30 rounded-sm mt-2" />
        <div className="h-1 w-5/6 bg-muted-foreground/30 rounded-sm" />
      </div>
    );
  }
  return (
    <div className="aspect-[3/4] bg-paper border rounded-sm overflow-hidden flex flex-col">
      <div className={cn(id === "graphic" ? "bg-slate-800" : "bg-zinc-700", "h-1/3 p-2 flex flex-col justify-end gap-1")}>
        <div className="h-2 w-1/2 bg-white rounded-sm" />
        <div className="h-1 w-3/4 bg-slate-400 rounded-sm" />
      </div>
      <div className="p-3 space-y-1.5 flex-1">
        <div className="h-1.5 w-1/3 bg-foreground rounded-sm" />
        <div className="h-1 w-full bg-muted-foreground/30 rounded-sm" />
        <div className="h-1 w-5/6 bg-muted-foreground/30 rounded-sm" />
      </div>
    </div>
  );
}
