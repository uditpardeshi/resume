import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-[2px] duration-75",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-b-[4px] border-r-[1.5px] border-b-black/35 border-r-black/20 hover:border-b-[5px] hover:border-r-[2px] hover:-translate-y-[1px] active:translate-y-[2px] active:border-b-[1px] active:border-r-[0.5px] shadow-md active:shadow-sm",
        saffron:
          "bg-saffron text-saffron-foreground border-b-[4px] border-r-[1.5px] border-b-black/35 border-r-black/20 hover:bg-saffron/95 hover:border-b-[5px] hover:border-r-[2px] hover:-translate-y-[1px] active:translate-y-[2px] active:border-b-[1px] active:border-r-[0.5px] shadow-md active:shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground border-b-[4px] border-r-[1.5px] border-b-black/35 border-r-black/20 hover:border-b-[5px] hover:border-r-[2px] hover:-translate-y-[1px] active:translate-y-[2px] active:border-b-[1px] active:border-r-[0.5px] shadow-md active:shadow-sm",
        outline:
          "border border-input bg-background border-b-[4px] border-r-[1.5px] border-b-black/15 border-r-black/10 hover:bg-accent hover:text-accent-foreground hover:border-b-[5px] hover:border-r-[2px] hover:-translate-y-[1px] active:translate-y-[2px] active:border-b-[1px] active:border-r-[0.5px] shadow-sm active:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground border-b-[4px] border-r-[1.5px] border-b-black/15 border-r-black/10 hover:bg-secondary/80 hover:border-b-[5px] hover:border-r-[2px] hover:-translate-y-[1px] active:translate-y-[2px] active:border-b-[1px] active:border-r-[0.5px] shadow-md active:shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground active:translate-y-[1px]",
        link: "text-primary underline-offset-4 hover:underline active:translate-y-[1px]",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
