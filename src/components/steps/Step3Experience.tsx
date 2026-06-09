import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AiEnhancerButton } from "@/components/ui/AiEnhancerButton";

export function Step3Experience() {
  const { data, setData } = useResumeStore();

  const add = () =>
    setData((d) => ({
      ...d,
      experience: [
        ...d.experience,
        {
          company: "",
          role: "",
          fromDate: "",
          toDate: "",
          responsibilities: "",
        },
      ].slice(0, 10),
    }));

  const remove = (i: number) =>
    setData((d) => ({
      ...d,
      experience: d.experience.filter((_, j) => j !== i),
    }));

  const update = (i: number, patch: Partial<(typeof data.experience)[0]>) =>
    setData((d) => ({
      ...d,
      experience: d.experience.map((e, j) => (j === i ? { ...e, ...patch } : e)),
    }));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Experience Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add your work experience, internships, or roles. Up to 10 entries.
        </p>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {data.experience.map((e, i) => (
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
                  Experience #{i + 1}
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

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-3 gap-y-0.5">
                  <div className="sm:col-span-1">
                    <FloatingInput
                      label="Organisation / Company"
                      required
                      value={e.company}
                      maxLength={150}
                      onChange={(ev) => update(i, { company: ev.target.value })}
                      placeholder="e.g. ABC Tech Solutions"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <FloatingInput
                      label="Designation / Role"
                      required
                      value={e.role}
                      maxLength={150}
                      onChange={(ev) => update(i, { role: ev.target.value })}
                      placeholder="e.g. Software Engineer"
                    />
                  </div>
                  <div className="sm:col-span-1 grid grid-cols-2 gap-2">
                    <FloatingInput
                      label="From Date"
                      required
                      value={e.fromDate || ""}
                      maxLength={30}
                      onChange={(ev) => update(i, { fromDate: ev.target.value })}
                      placeholder="e.g. Jun 2023"
                    />
                    <FloatingInput
                      label="To Date"
                      required
                      value={e.toDate || ""}
                      maxLength={30}
                      onChange={(ev) => update(i, { toDate: ev.target.value })}
                      placeholder="e.g. Present"
                    />
                  </div>
                </div>

                <FloatingTextarea
                  label="Key Responsibilities / Description"
                  required
                  value={e.responsibilities}
                  maxLength={500}
                  rows={3}
                  onChange={(ev) => update(i, { responsibilities: ev.target.value })}
                  placeholder="e.g. Developed and maintained web applications; Worked on API integrations and database queries..."
                />
                <div className="flex justify-end mt-1 pb-1">
                  <AiEnhancerButton
                    text={e.responsibilities}
                    onEnhance={(val) => update(i, { responsibilities: val })}
                    context="experience"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {data.experience.length < 10 && (
        <motion.div layout>
          <Button variant="outline" onClick={add} className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Add Experience Row
          </Button>
        </motion.div>
      )}
    </div>
  );
}
