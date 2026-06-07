import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const STEPS = [
  { n: 1, label: "Personal" },
  { n: 2, label: "Education" },
  { n: 3, label: "Experience" },
  { n: 4, label: "Skills" },
  { n: 5, label: "Template" },
];

export function StepIndicator({
  current,
  onJump,
}: {
  current: number;
  onJump?: (n: number) => void;
}) {
  return (
    <div className="flex items-center w-full gap-2">
      {STEPS.map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <div 
            key={s.n} 
            className={cn(
              "flex items-center min-w-0",
              i < STEPS.length - 1 ? "flex-1" : "flex-none"
            )}
          >
            <button
              type="button"
              onClick={() => onJump?.(s.n)}
              className={cn(
                "flex items-center gap-2 group min-w-0",
                onJump && "cursor-pointer",
              )}
            >
              <motion.span
                animate={{
                  scale: active ? 1.08 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className={cn(
                  "w-7 h-7 shrink-0 rounded-full border flex items-center justify-center text-xs font-medium transition-all",
                  active &&
                    "bg-primary text-primary-foreground border-primary ring-2 ring-saffron/40 ring-offset-1",
                  done &&
                    "bg-saffron text-saffron-foreground border-saffron",
                  !active &&
                    !done &&
                    "bg-paper text-muted-foreground border-border",
                )}
              >
                {done ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 12 }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                ) : (
                  s.n
                )}
              </motion.span>
              <span
                className={cn(
                  "text-xs font-medium truncate hidden sm:inline transition-colors duration-200",
                  active ? "text-foreground font-semibold" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className="relative h-px flex-1 mx-2 bg-border overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: done ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute left-0 top-0 h-full bg-saffron"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
