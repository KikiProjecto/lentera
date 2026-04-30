"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────
 * PAGE CONTENT STORYBOARD
 *
 * Static shell (nav, sidebar) never re-animates.
 * Only page content cascades in on navigation / refresh.
 *
 *    0ms   blank — page content not yet visible
 *  100ms   header fades in + slides down
 *  250ms   main content fades in from bottom
 *  400ms   cards stagger in (100ms each)
 *  700ms   secondary sections fade in
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  header: 100,
  main: 250,
  cards: 400,
  secondary: 700,
};

const SPRING = {
  header: { type: "spring" as const, stiffness: 350, damping: 28 },
  main: { type: "spring" as const, stiffness: 300, damping: 30 },
  cards: { type: "spring" as const, stiffness: 280, damping: 32 },
  secondary: { type: "spring" as const, stiffness: 250, damping: 35 },
};

interface PageAnimatorProps {
  children: ReactNode;
  className?: string;
}

export function PageAnimator({ children, className }: PageAnimatorProps) {
  return (
    <motion.div
      className={cn("animate-in", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({
  children,
  type = "main",
  className,
  delay = 0,
}: {
  children: ReactNode;
  type?: "header" | "main" | "cards" | "secondary";
  className?: string;
  delay?: number;
}) {
  const timing = TIMING[type] || 0;
  const spring = SPRING[type] || SPRING.main;
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        delay: (timing + delay) / 1000,
        ...spring,
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  offsetY = 12,
}: {
  children: ReactNode;
  className?: string;
  offsetY?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        initial: { opacity: 0, y: offsetY },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { type: "spring", stiffness: 280, damping: 32 }
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({
  children,
  direction = "up",
  className,
  delay = 0,
  distance = 20,
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        delay, 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 350,
        damping: 25,
      }}
    >
      {children}
    </motion.div>
  );
}