import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-primary/95",
        saffron:
          "bg-saffron text-saffron-foreground border-2 border-ink shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-saffron/95",
        destructive:
          "bg-destructive text-destructive-foreground border-2 border-ink shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-destructive/95",
        outline:
          "border-2 border-ink bg-background text-foreground shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-accent transition-colors duration-200",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-ink shadow-[3px_3px_0px_0px_var(--color-ink)] hover:bg-secondary/90",
        ghost:
          "hover:bg-accent hover:text-accent-foreground transition-colors duration-200",
        link: "text-primary underline-offset-4 hover:underline transition-all duration-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const localRef = React.useRef<HTMLButtonElement | null>(null);

    // Merge forwarded ref and local ref using callback pattern
    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        localRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref]
    );

    const is3D = !variant || ["default", "saffron", "destructive", "outline", "secondary"].includes(variant);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (localRef.current && is3D) {
        gsap.to(localRef.current, {
          x: -1.5,
          y: -1.5,
          boxShadow: "4.5px 4.5px 0px 0px var(--color-ink)",
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (onMouseEnter) onMouseEnter(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (localRef.current) {
        if (is3D) {
          gsap.to(localRef.current, {
            x: 0,
            y: 0,
            boxShadow: "3px 3px 0px 0px var(--color-ink)",
            duration: 0.15,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        } else {
          gsap.to(localRef.current, {
            scale: 1,
            duration: 0.15,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
      }
      if (onMouseLeave) onMouseLeave(e);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (localRef.current) {
        if (is3D) {
          gsap.to(localRef.current, {
            x: 2,
            y: 2,
            boxShadow: "1px 1px 0px 0px var(--color-ink)",
            duration: 0.08,
            ease: "power1.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(localRef.current, {
            scale: 0.97,
            duration: 0.08,
            ease: "power1.out",
            overwrite: "auto",
          });
        }
      }
      if (onMouseDown) onMouseDown(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (localRef.current) {
        if (is3D) {
          gsap.to(localRef.current, {
            x: -1.5,
            y: -1.5,
            boxShadow: "4.5px 4.5px 0px 0px var(--color-ink)",
            duration: 0.1,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(localRef.current, {
            scale: 1,
            duration: 0.1,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
      if (onMouseUp) onMouseUp(e);
    };

    return (
      <Comp
        ref={setRefs}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
