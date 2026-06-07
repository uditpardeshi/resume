import type { ResumeData, TemplateId } from "@/lib/resume-schema";

interface AuditRule {
  name: string;
  status: "pass" | "warn" | "fail";
  message: string;
  points: number;
}

export function AtsChecker({ data, template }: { data: ResumeData; template: TemplateId }) {
  const p = data.personal;

  const rules: AuditRule[] = [];

  // 1. Personal Details Checks (Max 25 pts)
  let personalScore = 0;
  if (p.fullName && p.fullName.trim().length > 2) {
    personalScore += 5;
    rules.push({ name: "Contact Name", status: "pass", message: "Full name is specified clearly", points: 5 });
  } else {
    rules.push({ name: "Contact Name", status: "fail", message: "Full name is missing or too short", points: 0 });
  }

  if (p.email && p.email.includes("@")) {
    personalScore += 5;
    rules.push({ name: "Email Address", status: "pass", message: "Valid contact email provided", points: 5 });
  } else {
    rules.push({ name: "Email Address", status: "fail", message: "Valid email ID is missing", points: 0 });
  }

  if (p.phone && p.phone.trim().length >= 8) {
    personalScore += 5;
    rules.push({ name: "Mobile Number", status: "pass", message: "Mobile number is specified", points: 5 });
  } else {
    rules.push({ name: "Mobile Number", status: "fail", message: "Mobile number is missing", points: 0 });
  }

  if (p.address && p.address.trim().length > 10) {
    personalScore += 5;
    rules.push({ name: "Full Address", status: "pass", message: "Address details are present", points: 5 });
  } else {
    rules.push({ name: "Full Address", status: "warn", message: "Address is too short or missing", points: 0 });
  }

  if (p.dob && p.languages && p.maritalStatus) {
    personalScore += 5;
    rules.push({ name: "Demographics", status: "pass", message: "DOB, Languages, and Marital Status present", points: 5 });
  } else {
    rules.push({ name: "Demographics", status: "warn", message: "Provide DOB, Languages, or Marital Status", points: 2 });
    personalScore += 2;
  }

  // 2. Education Check (Max 20 pts)
  let educationScore = 0;
  if (data.education && data.education.length > 0) {
    const firstEd = data.education[0];
    const isComplete = firstEd.degree && firstEd.institution && firstEd.board && firstEd.passingYear && firstEd.grade;
    if (isComplete) {
      educationScore = 20;
      rules.push({ name: "Education Details", status: "pass", message: "Education details are complete", points: 20 });
    } else {
      educationScore = 12;
      rules.push({ name: "Education Details", status: "warn", message: "Fill all columns in Education row", points: 12 });
    }
  } else {
    rules.push({ name: "Education Details", status: "fail", message: "Add at least one educational record", points: 0 });
  }

  // 3. Experience Check (Max 25 pts)
  let experienceScore = 0;
  if (data.experience && data.experience.length > 0) {
    const firstExp = data.experience[0];
    const isComplete = firstExp.company && firstExp.role && firstExp.duration && firstExp.responsibilities;
    if (isComplete) {
      experienceScore = 25;
      rules.push({ name: "Experience Details", status: "pass", message: "Professional experience details complete", points: 25 });
    } else {
      experienceScore = 15;
      rules.push({ name: "Experience Details", status: "warn", message: "Fill all columns in Experience row", points: 15 });
    }
  } else {
    // If no experience is added, it might be a fresher resume. Don't fail them, give partial points if they listed achievements
    if (data.achievements) {
      experienceScore = 18;
      rules.push({ name: "Experience Details", status: "pass", message: "Fresher profile with active achievements", points: 18 });
    } else {
      rules.push({ name: "Experience Details", status: "warn", message: "Consider adding experience or achievements", points: 0 });
    }
  }

  // 4. Extras & Strengths (Max 15 pts)
  let extrasScore = 0;
  if (data.strengths) {
    extrasScore += 8;
  }
  if (data.achievements) {
    extrasScore += 7;
  }
  if (extrasScore > 0) {
    rules.push({ name: "Strengths & Achievements", status: "pass", message: "Achievements or strengths listed", points: extrasScore });
  } else {
    rules.push({ name: "Strengths & Achievements", status: "warn", message: "Add strengths or achievements to rank higher", points: 0 });
  }

  // 5. Template & Parsability Check (Max 15 pts)
  let templateScore = 15;
  let templateStatus: "pass" | "warn" = "pass";
  let templateMessage = "Strictly ATS-optimized text & layouts";

  if (template === "graphic") {
    templateScore = 11;
    templateStatus = "warn";
    templateMessage = "Dark background blocks can sometimes challenge older parsers";
  } else if (template === "modern" || template === "emerald" || template === "royal" || template === "orange") {
    templateScore = 14;
    templateStatus = "pass";
    templateMessage = "High parsability (colored accents are generally supported)";
  }

  rules.push({ name: "Template Layout", status: templateStatus, message: templateMessage, points: templateScore });

  // Calculate total score
  const totalScore = personalScore + educationScore + experienceScore + extrasScore + templateScore;
  const scorePercent = Math.min(100, Math.max(0, totalScore));

  return (
    <div className="paper-card p-5 mt-6 border border-border bg-card shadow-soft space-y-4">
      <div className="flex items-center justify-between border-b pb-3 border-border">
        <div>
          <h3 className="font-semibold text-base text-ink">ATS Scanner Audit</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time parsability diagnostic score</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="oklch(var(--border))"
                strokeWidth="3.5"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke={scorePercent >= 85 ? "oklch(0.72 0.18 140)" : scorePercent >= 60 ? "oklch(0.72 0.18 55)" : "oklch(0.63 0.19 25)"}
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 - (125.6 * scorePercent) / 100}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <span className="absolute text-xs font-bold font-mono">
              {scorePercent}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {rules.map((r, i) => (
          <div key={i} className="flex items-start justify-between gap-3 text-xs">
            <div className="flex gap-2 min-w-0">
              <span className="mt-1 flex shrink-0">
                {r.status === "pass" ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-300" />
                ) : r.status === "warn" ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-300 animate-pulse" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-destructive border border-red-300" />
                )}
              </span>
              <div className="min-w-0">
                <div className="font-semibold text-ink leading-tight">{r.name}</div>
                <div className="text-[11px] text-muted-foreground leading-normal mt-0.5">{r.message}</div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground shrink-0 font-semibold bg-secondary px-1.5 py-0.5 rounded">
              +{r.points} pts
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-border">
        {scorePercent >= 85 ? (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200/50 rounded p-2.5 text-[11px] font-medium leading-normal">
            ✓ <strong>Excellent ATS Score!</strong> Your resume is highly structured and uses optimized single-column layout tables that parse perfectly.
          </div>
        ) : scorePercent >= 60 ? (
          <div className="bg-amber-50 text-amber-800 border border-amber-200/50 rounded p-2.5 text-[11px] font-medium leading-normal">
            ⚠️ <strong>Ready, but can improve:</strong> Consider filling in more education fields or providing complete descriptions to reach 90%+.
          </div>
        ) : (
          <div className="bg-red-50 text-red-800 border border-red-200/50 rounded p-2.5 text-[11px] font-medium leading-normal">
            ✕ <strong>Audit Warnings:</strong> Please fill out your contact details and add your education row to enable search parsing.
          </div>
        )}
      </div>
    </div>
  );
}
