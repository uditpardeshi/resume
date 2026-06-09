import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, required, type, id, placeholder, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    return (
      <div className="relative pt-7 w-full">
        <input
          type={type}
          id={inputId}
          placeholder={placeholder || " "}
          className={cn(
            "peer flex h-9 w-full rounded-md neo-input-3d bg-background px-3 py-1 text-sm placeholder:opacity-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="absolute left-3 top-[37px] text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground transition-all duration-200 origin-[0_0] pointer-events-none select-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-8 peer-focus:scale-90 peer-focus:text-saffron -translate-y-8 scale-90 whitespace-nowrap max-w-[calc(100%-24px)] flex items-center gap-0.5"
        >
          <span className="truncate">{label}</span>
          {required && <span className="text-saffron shrink-0">*</span>}
        </label>
      </div>
    );
  },
);
FloatingInput.displayName = "FloatingInput";

export interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
}

const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ className, label, required, id, placeholder, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    return (
      <div className="relative pt-7 w-full">
        <textarea
          id={inputId}
          placeholder={placeholder || " "}
          className={cn(
            "peer flex min-h-[60px] w-full rounded-md neo-input-3d bg-background px-3 py-2 text-sm placeholder:opacity-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="absolute left-3 top-[39px] text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground transition-all duration-200 origin-[0_0] pointer-events-none select-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-8 peer-focus:scale-90 peer-focus:text-saffron -translate-y-8 scale-90 whitespace-nowrap max-w-[calc(100%-24px)] flex items-center gap-0.5"
        >
          <span className="truncate">{label}</span>
          {required && <span className="text-saffron shrink-0">*</span>}
        </label>
      </div>
    );
  },
);
FloatingTextarea.displayName = "FloatingTextarea";

export { FloatingInput, FloatingTextarea };
