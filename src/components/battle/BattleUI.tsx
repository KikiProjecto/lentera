"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield, Zap, Swords, Heart, Sparkles, ArrowUp, ArrowDown } from "lucide-react";

interface HealthBarProps {
  current: number;
  max: number;
  label?: string;
  showNumbers?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  color?: "red" | "green" | "blue" | "purple" | "orange";
}

export function HealthBar({
  current,
  max,
  label,
  showNumbers = true,
  size = "md",
  animated = true,
  color = "red",
}: HealthBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  const sizeClasses = {
    sm: "h-3",
    md: "h-5",
    lg: "h-8",
  };

  const colorClasses = {
    red: "bg-gradient-to-r from-red-600 to-red-500",
    green: "bg-gradient-to-r from-green-600 to-green-500",
    blue: "bg-gradient-to-r from-blue-600 to-blue-500",
    purple: "bg-gradient-to-r from-purple-600 to-purple-500",
    orange: "bg-gradient-to-r from-orange-600 to-orange-500",
  };

  const bgColorClasses = {
    red: "bg-red-900/30",
    green: "bg-green-900/30",
    blue: "bg-blue-900/30",
    purple: "bg-purple-900/30",
    orange: "bg-orange-900/30",
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-dark-400">{label}</span>
          {showNumbers && (
            <span className={cn(
              "text-xs font-mono",
              percentage > 50 ? "text-green-400" : percentage > 25 ? "text-yellow-400" : "text-red-400"
            )}>
              {Math.ceil(current)} / {max}
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full rounded-full overflow-hidden", bgColorClasses[color])}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current}-${max}`}
            className={cn("h-full rounded-full", colorClasses[color])}
            initial={animated ? { width: 0 } : false}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

interface ManaBarProps {
  current: number;
  max: number;
  label?: string;
  showNumbers?: boolean;
}

export function ManaBar({ current, max, label, showNumbers = true }: ManaBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-dark-400">{label}</span>
          {showNumbers && (
            <span className="text-xs font-mono text-blue-400">
              {Math.ceil(current)} / {max}
            </span>
          )}
        </div>
      )}
      <div className="w-full h-3 bg-blue-900/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}

interface DamageNumberProps {
  value: number;
  type?: "damage" | "heal" | "miss" | "crit";
  position?: { x: number; y: number };
}

export function DamageNumber({ value, type = "damage", position }: DamageNumberProps) {
  const config = {
    damage: { color: "text-red-400", icon: "-" },
    heal: { color: "text-green-400", icon: "+" },
    miss: { color: "text-dark-500", icon: "Miss" },
    crit: { color: "text-amber-400", icon: "💥" },
  };

  return (
    <motion.div
      className={cn("absolute font-bold text-lg", config[type].color)}
      initial={{ opacity: 1, y: 0, scale: 1.5 }}
      animate={{ opacity: 0, y: -50, scale: 1 }}
      transition={{ duration: 1 }}
      style={position ? { left: position.x, top: position.y } : undefined}
    >
      {type === "crit" ? config[type].icon : type === "miss" ? config[type].icon : `${config[type].icon}${value}`}
    </motion.div>
  );
}

interface TurnIndicatorProps {
  isPlayerTurn: boolean;
  turnNumber: number;
}

export function TurnIndicator({ isPlayerTurn, turnNumber }: TurnIndicatorProps) {
  return (
    <motion.div
      className={cn(
        "px-4 py-2 rounded-full text-sm font-bold",
        isPlayerTurn
          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
          : "bg-red-500/20 text-red-400 border border-red-500/50"
      )}
      key={turnNumber}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <span className="mr-2">Turn</span>
      <span className="font-mono">{turnNumber}</span>
      <span className="mx-1">-</span>
      {isPlayerTurn ? "Your Turn" : "Enemy Turn"}
    </motion.div>
  );
}

interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  cooldown?: number;
}

export function ActionButton({
  label,
  icon,
  onClick,
  disabled = false,
  variant = "primary",
  cooldown,
}: ActionButtonProps) {
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-dark-950",
    secondary: "bg-dark-700 hover:bg-dark-600 text-light-100",
    danger: "bg-red-500 hover:bg-red-400 text-light-100",
  };

  return (
    <motion.button
      className={cn(
        "relative flex flex-col items-center justify-center p-4 rounded-xl font-bold transition-colors",
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled || !!cooldown}
      whileHover={!disabled && !cooldown ? { scale: 1.05 } : undefined}
      whileTap={!disabled && !cooldown ? { scale: 0.95 } : undefined}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <span>{label}</span>
      {cooldown !== undefined && cooldown > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-950/70 rounded-xl">
          <span className="text-xl font-mono">{cooldown}</span>
        </div>
      )}
    </motion.button>
  );
}

interface BattleLogProps {
  logs: string[];
}

export function BattleLog({ logs }: BattleLogProps) {
  return (
    <div className="w-full h-48 bg-dark-900 rounded-lg p-4 overflow-y-auto space-y-2">
      {logs.map((log, index) => (
        <motion.p
          key={index}
          className="text-sm text-dark-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="text-dark-500 mr-2">{index + 1}.</span>
          {log}
        </motion.p>
      ))}
    </div>
  );
}