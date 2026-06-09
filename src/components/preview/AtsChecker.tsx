import type { ResumeData, TemplateId } from "@/lib/resume-schema";

interface AuditRule {
  name: string;
  status: "pass" | "warn" | "fail";
  message: string;
  points: number;
  maxPoints: number;
}

export function AtsChecker({ data, template }: { data: ResumeData; template: TemplateId }) {
  const p = data.personal;
  const rules: AuditRule[] = [];

  // Helper: word counter
  const getWordCount = (str?: string) => {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  // Helper: check for numbers/metrics
  const hasMetrics = (str?: string) => {
    if (!str) return false;
    // Check for digits, percentage sign, dollar sign, currency words, etc.
    return /[\d%]+/.test(str) || /\b(million|thousand|percent|USD|INR)\b/i.test(str);
  };

  // List of standard ATS action verbs
  const ACTION_VERBS = [
    "directed", "executed", "headed", "managed", "spearheaded", "engineered",
    "developed", "designed", "built", "created", "led", "supervised", "implemented",
    "improved", "optimized", "increased", "decreased", "generated", "saved",
    "achieved", "streamlined", "formulated", "redesigned", "pioneered", "negotiated",
    "coordinated", "automated", "facilitated", "launched", "boosted", "accelerated",
    "delivered", "analyzed", "forecasted", "resolved", "maintained", "mentored"
  ];

  const hasActionVerbs = (str?: string) => {
    if (!str) return false;
    const words = str.toLowerCase().split(/[^\w]+/).filter(Boolean);
    return words.some(w => ACTION_VERBS.includes(w));
  };

  // 1. Contact Info & Essential Details (Max 15 pts)
  let contactScore = 0;
  const missingContact: string[] = [];
  if (p.fullName && p.fullName.trim().length > 2) contactScore += 5;
  else missingContact.push("Full Name");

  if (p.email && p.email.includes("@")) contactScore += 5;
  else missingContact.push("Valid Email");

  if (p.phone && p.phone.trim().length >= 8) contactScore += 5;
  else missingContact.push("Phone Number");

  rules.push({
    name: "Contact Information",
    status: contactScore === 15 ? "pass" : contactScore >= 10 ? "warn" : "fail",
    message: contactScore === 15 
      ? "All primary contact fields are present." 
      : `Missing critical info: ${missingContact.join(", ")}`,
    points: contactScore,
    maxPoints: 15,
  });

  // 2. Education Completeness (Max 15 pts)
  let eduScore = 0;
  if (data.education && data.education.length > 0) {
    const incomplete = data.education.some(
      e => !e.degree || !e.institution || !e.fromYear || !e.toYear
    );
    if (!incomplete) {
      eduScore = 15;
      rules.push({
        name: "Education Structuring",
        status: "pass",
        message: "Academic degrees are correctly structured with institutions and dates.",
        points: 15,
        maxPoints: 15,
      });
    } else {
      eduScore = 10;
      rules.push({
        name: "Education Structuring",
        status: "warn",
        message: "Some education records are missing a degree, school, or dates.",
        points: 10,
        maxPoints: 15,
      });
    }
  } else {
    rules.push({
      name: "Education Structuring",
      status: "fail",
      message: "No educational background detected. Add at least one record.",
      points: 0,
      maxPoints: 15,
    });
  }

  // 3. Work Experience & Impact Check (Max 25 pts)
  let expScore = 0;
  if (data.experience && data.experience.length > 0) {
    let hasMetricsFound = false;
    let hasActionVerbsFound = false;

    data.experience.forEach(exp => {
      if (hasMetrics(exp.responsibilities)) hasMetricsFound = true;
      if (hasActionVerbs(exp.responsibilities)) hasActionVerbsFound = true;
    });

    if (hasMetricsFound && hasActionVerbsFound) {
      expScore = 25;
      rules.push({
        name: "Impact & Action Language",
        status: "pass",
        message: "Descriptions leverage action verbs and list quantified results (numbers/percentages).",
        points: 25,
        maxPoints: 25,
      });
    } else if (hasActionVerbsFound) {
      expScore = 18;
      rules.push({
        name: "Impact & Action Language",
        status: "warn",
        message: "Action verbs are present, but consider adding quantified metrics (%, $, savings) to prove impact.",
        points: 18,
        maxPoints: 25,
      });
    } else {
      expScore = 10;
      rules.push({
        name: "Impact & Action Language",
        status: "warn",
        message: "Use stronger action verbs (e.g., Developed, Streamlined) instead of passive job description duties.",
        points: 10,
        maxPoints: 25,
      });
    }
  } else {
    // If fresher but has achievements/certifications, give partial experience/credibility score
    const hasExtras = !!(data.achievements || data.certifications || data.strengths);
    expScore = hasExtras ? 12 : 0;
    rules.push({
      name: "Impact & Action Language",
      status: hasExtras ? "warn" : "fail",
      message: hasExtras 
        ? "No work history listed; leveraging achievements to build fresh graduate credibility." 
        : "Work experience or project logs are missing.",
      points: expScore,
      maxPoints: 25,
    });
  }

  // 4. Skills Density & Core Keywords (Max 15 pts)
  let skillsScore = 0;
  if (data.skills && data.skills.trim().length > 0) {
    const list = data.skills.split(/[,\n•·|]+/).map(s => s.trim()).filter(s => s.length > 1);
    if (list.length >= 8) {
      skillsScore = 15;
      rules.push({
        name: "Keyword & Skills Optimization",
        status: "pass",
        message: `Healthy skill profile detected with ${list.length} distinct search keywords.`,
        points: 15,
        maxPoints: 15,
      });
    } else if (list.length >= 4) {
      skillsScore = 10;
      rules.push({
        name: "Keyword & Skills Optimization",
        status: "warn",
        message: `Only ${list.length} skills found. Add more standard industry keywords (aim for 8+).`,
        points: 10,
        maxPoints: 15,
      });
    } else {
      skillsScore = 5;
      rules.push({
        name: "Keyword & Skills Optimization",
        status: "warn",
        message: "Skills section is too brief. Expand with relevant tools, tech, or soft competencies.",
        points: 5,
        maxPoints: 15,
      });
    }
  } else {
    rules.push({
      name: "Keyword & Skills Optimization",
      status: "fail",
      message: "No skills section detected. ATS parsers score resumes heavily on keywords.",
      points: 0,
      maxPoints: 15,
    });
  }

  // 5. Text Volume & Word Density (Max 15 pts)
  let volumeScore = 0;
  // Calculate total words in the resume
  let totalWords = 0;
  totalWords += getWordCount(p.fullName) + getWordCount(p.address);
  totalWords += getWordCount(data.summary);
  totalWords += getWordCount(data.skills);
  totalWords += getWordCount(data.achievements);
  totalWords += getWordCount(data.strengths);
  totalWords += getWordCount(data.certifications);
  data.education.forEach(e => {
    totalWords += getWordCount(e.degree) + getWordCount(e.institution) + getWordCount(e.board);
  });
  data.experience.forEach(e => {
    totalWords += getWordCount(e.company) + getWordCount(e.role) + getWordCount(e.responsibilities);
  });

  if (totalWords >= 350 && totalWords <= 750) {
    volumeScore = 15;
    rules.push({
      name: "Content Length & Density",
      status: "pass",
      message: `Ideal word count (${totalWords} words). Fits standard 1-page constraints.`,
      points: 15,
      maxPoints: 15,
    });
  } else if (totalWords > 0 && (totalWords < 200 || totalWords > 1100)) {
    volumeScore = 5;
    rules.push({
      name: "Content Length & Density",
      status: "fail",
      message: totalWords < 200 
        ? `Too short (${totalWords} words). Expand detail on experience/projects.` 
        : `Too verbose (${totalWords} words). Condense text to stay readable.`,
      points: 5,
      maxPoints: 15,
    });
  } else {
    volumeScore = 10;
    rules.push({
      name: "Content Length & Density",
      status: "warn",
      message: `Acceptable length (${totalWords} words), but try targeting 350-700 words for optimal density.`,
      points: 10,
      maxPoints: 15,
    });
  }

  // 6. Template Parsability & Layout Check (Max 15 pts)
  let layoutScore = 15;
  let layoutStatus: "pass" | "warn" | "fail" = "pass";
  let layoutMessage = "Standard clean, single-column table structures. 100% parsable.";

  if (template === "graphic") {
    layoutScore = 8;
    layoutStatus = "fail";
    layoutMessage = "Dense dark background shapes and block headers confuse optical character recognitions.";
  } else if (
    template === "modern" ||
    template === "emerald" ||
    template === "royal" ||
    template === "orange"
  ) {
    // These layouts have colored accents/minor decorative details but are structured cleanly
    layoutScore = 13;
    layoutStatus = "warn";
    layoutMessage = "Uses light styling accents. Highly readable, but plain classic layout is slightly safer.";
  }

  rules.push({
    name: "Layout Compatibility",
    status: layoutStatus,
    message: layoutMessage,
    points: layoutScore,
    maxPoints: 15,
  });

  // Calculate final score out of 100
  const finalScore = contactScore + eduScore + expScore + skillsScore + volumeScore + layoutScore;
  const scorePercent = Math.min(100, Math.max(0, finalScore));

  return (
    <div className="paper-card p-5 mt-6 border border-border bg-card shadow-soft space-y-4">
      <div className="flex items-center justify-between border-b pb-3 border-border">
        <div>
          <h3 className="font-semibold text-base text-ink">ATS Scanner Audit</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time corporate recruiter parsing compatibility
          </p>
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
                stroke={
                  scorePercent >= 80
                    ? "oklch(0.72 0.18 140)"
                    : scorePercent >= 55
                      ? "oklch(0.72 0.18 55)"
                      : "oklch(0.63 0.19 25)"
                }
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 - (125.6 * scorePercent) / 100}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <span className="absolute text-xs font-bold font-mono">{scorePercent}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
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
                <div className="font-semibold text-ink leading-tight flex items-center gap-1.5">
                  {r.name}
                  <span className="text-[10px] text-muted-foreground font-normal">
                    ({r.points}/{r.maxPoints})
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground leading-normal mt-0.5">
                  {r.message}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-border">
        {scorePercent >= 80 ? (
          <div className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-900/30 rounded p-2.5 text-[11px] font-medium leading-normal">
            ✓ <strong>Recruiter Ready:</strong> Your resume has strong keyword volume, layout parsability, and metrics-oriented sentences. High likelihood of passing automated enterprise screening.
          </div>
        ) : scorePercent >= 55 ? (
          <div className="bg-amber-50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/30 rounded p-2.5 text-[11px] font-medium leading-normal">
            ⚠️ <strong>Optimization Needed:</strong> Try adding standard action verbs, listing exact numbers/quantifiable results, and expanding your skills section to improve visibility.
          </div>
        ) : (
          <div className="bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-300 border border-red-200/50 dark:border-red-900/30 rounded p-2.5 text-[11px] font-medium leading-normal">
            ✕ <strong>High Risk of Rejection:</strong> Missing critical sections, too short, or lacks standard keyword formatting. Recruiter parsers will likely fail to index this profile correctly.
          </div>
        )}
      </div>
    </div>
  );
}

