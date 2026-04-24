"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.2 }
  },
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  hover: { 
    y: -8,
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 20 }
  },
};

export const characterIdleVariants: Variants = {
  idle: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  fire: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 0.5,
      repeat: Infinity,
    },
  },
  water: {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
    },
  },
  earth: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  },
  air: {
    y: [0, -15, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  void: {
    opacity: [0.7, 1, 0.7],
    filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  },
};

export const buttonTapVariants = {
  tap: { scale: 0.98 },
  hover: { scale: 1.02 },
};

export const particleVariants: Variants = {
  float: {
    y: [0, -100],
    opacity: [1, 0],
    rotate: [0, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeOut",
    },
  },
};

export const glowPulse = {
  initial: { boxShadow: "0 0 20px rgba(0,245,212,0.3)" },
  animate: { 
    boxShadow: "0 0 40px rgba(0,245,212,0.6)",
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse" as const,
    }
  },
};

export const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5 }
  }),
};

export const statBarVariants = {
  hidden: { width: 0 },
  visible: { 
    width: "var(--stat-percentage)",
    transition: { duration: 1, ease: "easeOut" }
  },
};

export const battleAttackVariants: Variants = {
  prepare: {
    scale: 1.2,
    filter: "brightness(1.5)",
    transition: { duration: 0.2 }
  },
  attack: {
    x: [0, 100, 0],
    transition: { duration: 0.3, times: [0, 0.5, 1] }
  },
  hit: {
    x: [0, -10, 10, -10, 0],
    transition: { duration: 0.2 }
  },
  victory: {
    scale: [1, 1.5, 1],
    rotate: [0, 360],
    transition: { duration: 0.5 }
  },
};

export const confettiVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  exit: {
    y: [0, -50],
    opacity: [1, 0],
    transition: { duration: 1 }
  },
};

export const questItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 }
  }),
  hover: {
    x: 4,
    backgroundColor: "rgba(0,245,212,0.1)",
    transition: { duration: 0.2 }
  },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: { duration: 0.2 }
  },
};

export function AnimatedPage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { motion, AnimatePresence };