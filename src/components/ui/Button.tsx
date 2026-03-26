import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, className, glow = false, ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-primary/20 hover:shadow-primary/40",
      secondary: "bg-gradient-to-r from-secondary to-accent text-white shadow-secondary/20 hover:shadow-secondary/40",
      accent: "bg-gradient-to-r from-accent to-neon text-dark-bg shadow-accent/20 hover:shadow-accent/40",
      outline: "border-2 border-primary/50 text-content-primary hover:bg-primary/10",
      ghost: "text-content-secondary hover:text-primary hover:bg-white/5",
    };

    const sizes = {
      sm: "px-4 py-1.5 text-xs",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          glow && "glow-primary",
          className
        )}
        {...props}
      >
        <span className="flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
