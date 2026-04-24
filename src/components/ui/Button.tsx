"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onTransitionEnd"> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = clsx(
      "relative inline-flex items-center justify-center font-semibold rounded-xl",
      "transition-all duration-300 ease-out",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      "overflow-hidden group"
    );

    const variants = {
      primary:
        "bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-950 hover:scale-105 hover:shadow-glow-cyan focus:ring-neon-cyan",
      secondary:
        "border-2 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-glow-cyan focus:ring-neon-cyan",
      ghost:
        "text-light-300 hover:text-neon-cyan hover:bg-dark-700/50 focus:ring-dark-600",
      danger:
        "bg-vice-slot text-white hover:bg-red-600 hover:scale-105 focus:ring-red-500",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-2",
      md: "px-6 py-3 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-3",
      xl: "px-10 py-5 text-xl gap-3",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        className={twMerge(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center bg-inherit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </motion.span>
        )}
        <span className={clsx("flex items-center gap-2", isLoading && "invisible")}>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;