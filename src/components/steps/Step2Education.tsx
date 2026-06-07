import { FloatingInput } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Step2Education() {
  const { data, setData } = useResumeStore();

  const add = () =>
    setData((d) => ({
      ...d,
      education: [
        ...d.education,
        {
          institution: "",
          degree: "",
          board: "",
          fromYear: "",
          toYear: "",
          grade: "",
        },
      ].slice(0, 10),
    }));

  const remove = (i: number) =>
    setData((d) => ({
      ...d,
      education: d.education.filter((_, j) => j !== i),
    }));

  const update = (i: number, k: string, v: string) =>
    setData((d) => ({
      ...d,
      education: d.education.map((e, j) =>
        j === i ? { ...e, [k]: v } : e,
      ),
    }));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Educational Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add your education history (school, college, degree). Up to 10 entries.
        </p>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {data.education.map((ed, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="paper-card p-4 sm:p-5 relative space-y-3 overflow-hidden origin-top"
            >
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Education #{i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-muted-foreground hover:text-destructive cursor-pointer transition-colors"
                  aria-label="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5">
                <FloatingInput
                  label="Degree / Course"
                  required
                  value={ed.degree}
                  maxLength={150}
                  onChange={(e) => update(i, "degree", e.target.value)}
                  placeholder="e.g. B.Tech / Class XII / Class X"
                />
                <FloatingInput
                  label="School / Institution"
                  required
                  value={ed.institution}
                  maxLength={150}
                  onChange={(e) => update(i, "institution", e.target.value)}
                  placeholder="e.g. ABC College of Engineering"
                />
                <FloatingInput
                  label="Board / University"
                  required
                  value={ed.board}
                  maxLength={150}
                  onChange={(e) => update(i, "board", e.target.value)}
                  placeholder="e.g. CBSE / Mumbai University"
                />
                <div className="grid grid-cols-2 gap-2">
                  <FloatingInput
                    label="From Year"
                    required
                    value={ed.fromYear || ""}
                    maxLength={15}
                    onChange={(e) => update(i, "fromYear", e.target.value)}
                    placeholder="e.g. 2019"
                  />
                  <FloatingInput
                    label="To Year"
                    required
                    value={ed.toYear || ""}
                    maxLength={15}
                    onChange={(e) => update(i, "toYear", e.target.value)}
                    placeholder="e.g. 2023"
                  />
                </div>
                <FloatingInput
                  label="Grade / Percentage / CGPA"
                  required
                  value={ed.grade}
                  maxLength={20}
                  onChange={(e) => update(i, "grade", e.target.value)}
                  placeholder="e.g. 85% / 9.2 CGPA"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {data.education.length < 10 && (
        <motion.div layout>
          <Button variant="outline" onClick={add} className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Add Education Row
          </Button>
        </motion.div>
      )}
    </div>
  );
}
