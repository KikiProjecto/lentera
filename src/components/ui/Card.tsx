"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onTransitionEnd"> {
  variant?: "default" | "glass" | "neon" | "guardian" | "vice";
  hover?: boolean;
  glowColor?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = false, glowColor, children, ...props }, ref) => {
    const baseStyles = clsx("relative overflow-hidden rounded-2xl transition-all duration-300");

    const variants = {
      default: "bg-dark-800 border border-dark-600/50",
      glass: "bg-dark-800/60 backdrop-blur-xl border border-dark-600/50",
      neon: "neon-border neon-glow",
      guardian: "guardian-card border border-dark-600/30 hover:border-neon-cyan/50",
      vice: "vice-card border border-vice-rug/30 hover:border-vice-rug/50",
    };

    const hoverStyles = hover
      ? "hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 cursor-pointer"
      : "";

    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -4 } : undefined}
        className={twMerge(baseStyles, variants[variant], hoverStyles, className)}
        style={glowColor ? { boxShadow: `0 0 30px ${glowColor}30` } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge("p-6 pb-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge("p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}