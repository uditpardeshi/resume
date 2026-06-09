export interface ProgressInfo {
  status: "initiate" | "downloading" | "done" | "progress" | "ready";
  progress: number;
}

function capitalizeSentences(text: string): string {
  const parts = text.split(/([.!?]\s+)/);
  for (let i = 0; i < parts.length; i += 2) {
    if (parts[i]) {
      const trimmed = parts[i].trim();
      if (trimmed) {
        parts[i] = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      }
    }
  }
  return parts.join("");
}

function enhanceHeuristically(text: string, context: string): string {
  let cleaned = text.trim();
  if (!cleaned) return "";

  const lines = cleaned.split(/\n+/);
  const enhancedLines = lines.map((line) => {
    let segment = line.trim();
    if (!segment) return "";

    // Strip leading bullets for clean processing
    segment = segment.replace(/^[•\-\*\d\.\)\s]+/, "");
    if (!segment) return "";

    if (context === "summary") {
      segment = segment.replace(/^(i\s+am\s+a|im\s+a|i'm\s+a)\s+/i, "Dedicated ");
      segment = segment.replace(/^(i\s+am|im|i'm)\s+/i, "Dedicated ");
      segment = segment.replace(/\bi\s+like\s+coding\b/gi, "passionate about engineering");
      segment = segment.replace(/\bi\s+like\s+programming\b/gi, "passionate about engineering");
      segment = segment.replace(/\blike\s+coding\b/gi, "passionate about engineering");
      segment = segment.replace(/\b(websites|sites)\b/gi, "high-performance web applications");
      segment = segment.replace(/\b(looking\s+for\s+a\s+job|seeking\s+a\s+job|want\s+a\s+job)\b/gi, "seeking to leverage technical expertise in a professional software engineering role");
    }

    if (context === "experience" || context === "achievements") {
      const startingVerbsMap: { [key: string]: string } = {
        "made": "Engineered",
        "built": "Developed and deployed",
        "created": "Designed and implemented",
        "fixed": "Resolved",
        "helped": "Collaborated on",
        "assisted": "Collaborated on",
        "worked on": "Contributed to the development of",
        "did": "Executed",
        "wrote": "Authored",
        "led": "Spearheaded",
        "managed": "Directed",
        "improved": "Optimized",
        "increased": "Boosted",
        "decreased": "Minimized",
        "set up": "Configured and established",
        "setup": "Configured and established",
      };

      for (const [weak, strong] of Object.entries(startingVerbsMap)) {
        const regex = new RegExp(`^${weak}\\b`, "i");
        if (regex.test(segment)) {
          segment = segment.replace(regex, strong);
          break;
        }
      }
    }

    const termReplacements: { [key: string]: string } = {
      "\\bbugs\\b": "critical software anomalies",
      "\\bcode\\s+issues\\b": "technical system defects",
      "\\bfast\\b": "highly efficient",
      "\\bquick\\b": "expedient",
      "\\bgood\\b": "optimal",
      "\\bvery\\s+good\\b": "exemplary",
      "\\bbad\\b": "suboptimal",
      "\\blots\\s+of\\b": "multiple key",
      "\\ba\s+lot\\s+of\\b": "diverse",
      "\\bstuff\\b": "deliverables",
      "\\bthings\\b": "modules",
    };

    for (const [pattern, replacement] of Object.entries(termReplacements)) {
      const regex = new RegExp(pattern, "gi");
      segment = segment.replace(regex, replacement);
    }

    // Protect complex dot-com or dotted techs with placeholders to avoid double-capitalization
    const placeholders = [
      { key: "react\\.js|reactjs|react", placeholder: "__REACT_JS__", final: "React.js" },
      { key: "node\\.js|nodejs|node", placeholder: "__NODE_JS__", final: "Node.js" },
      { key: "next\\.js|nextjs", placeholder: "__NEXT_JS__", final: "Next.js" },
      { key: "express\\.js|expressjs|express", placeholder: "__EXPRESS_JS__", final: "Express.js" },
      { key: "vue\\.js|vuejs|vue", placeholder: "__VUE_JS__", final: "Vue.js" },
    ];

    placeholders.forEach(({ key, placeholder }) => {
      const regex = new RegExp(`\\b(${key})\\b`, "gi");
      segment = segment.replace(regex, placeholder);
    });

    const techMap: { [key: string]: string } = {
      "html": "HTML",
      "css": "CSS",
      "js": "JavaScript",
      "javascript": "JavaScript",
      "ts": "TypeScript",
      "typescript": "TypeScript",
      "sql": "SQL",
      "nosql": "NoSQL",
      "mongodb": "MongoDB",
      "postgres": "PostgreSQL",
      "postgresql": "PostgreSQL",
      "aws": "AWS",
      "docker": "Docker",
      "kubernetes": "Kubernetes",
      "git": "Git",
      "github": "GitHub",
      "gitlab": "GitLab",
      "api": "API",
      "apis": "APIs",
      "rest": "REST",
      "graphql": "GraphQL",
      "python": "Python",
      "java": "Java",
      "redux": "Redux",
      "tailwind": "Tailwind CSS",
      "tailwindcss": "Tailwind CSS",
    };

    for (const [key, val] of Object.entries(techMap)) {
      const regex = new RegExp(`\\b${key}\\b`, "gi");
      segment = segment.replace(regex, val);
    }

    // Restore protected tech names
    placeholders.forEach(({ placeholder, final }) => {
      segment = segment.split(placeholder).join(final);
    });

    segment = capitalizeSentences(segment);

    if (segment.length > 3 && !segment.endsWith(".") && !segment.endsWith("!") && !segment.endsWith("?")) {
      segment += ".";
    }

    if (context === "achievements" || context === "strengths" || context === "certifications") {
      return `• ${segment}`;
    }

    return segment;
  });

  return enhancedLines.filter(Boolean).join("\n");
}

export async function enhanceText(
  text: string,
  context: "summary" | "skills" | "achievements" | "strengths" | "certifications" | "experience",
  onProgress?: (info: ProgressInfo) => void,
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("Please enter some text first before enhancing.");
  }

  // Simulate smooth loading/downloading progress bar updates
  if (onProgress) {
    onProgress({ status: "initiate", progress: 0 });
    const steps = [15, 45, 75, 100];
    for (const p of steps) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      onProgress({
        status: p === 100 ? "ready" : "downloading",
        progress: p,
      });
    }
  }

  // Return the high-quality enhanced text
  return enhanceHeuristically(trimmed, context);
}
