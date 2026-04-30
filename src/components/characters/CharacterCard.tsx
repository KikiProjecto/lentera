"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CharacterConfig } from "@/data/characters";
import { Shield, Zap, Swords, Brain, Sparkles, Star } from "lucide-react";

interface CharacterCardProps {
  character: CharacterConfig;
  isSelected?: boolean;
  onSelect?: (character: CharacterConfig) => void;
  showStats?: boolean;
  size?: "sm" | "md" | "lg";
  rarity?: "common" | "rare" | "epic" | "legendary" | "mythic";
  variant?: "compact" | "full" | "minimal";
}

const STAT_ICONS = {
  attack: Swords,
  defense: Shield,
  speed: Zap,
  wisdom: Brain,
  charisma: Sparkles,
};

const STAT_COLORS = {
  attack: "text-red-400",
  defense: "text-blue-400",
  speed: "text-yellow-400",
  wisdom: "text-purple-400",
  charisma: "text-pink-400",
};

const RARITY_COLORS = {
  common: "border-slate-500 bg-slate-500/10",
  rare: "border-blue-500 bg-blue-500/10",
  epic: "border-purple-500 bg-purple-500/10",
  legendary: "border-amber-500 bg-amber-500/10",
  mythic: "border-cyan-500 bg-cyan-500/10",
};

export default function CharacterCard({
  character,
  isSelected = false,
  onSelect,
  showStats = true,
  size = "md",
  rarity,
}: CharacterCardProps) {
  const displayRarity = rarity || character.rarity;
  const sizeClasses = {
    sm: "w-32",
    md: "w-48",
    lg: "w-64",
  };

  const StatBar = ({ value, max = 100 }: { value: number; max?: number }) => (
    <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </div>
  );

  return (
    <motion.div
      className={cn(
        "relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all",
        sizeClasses[size],
        isSelected
          ? "border-cyan-400 shadow-lg shadow-cyan-500/30"
          : "border-dark-700 hover:border-dark-600 hover:shadow-md",
        RARITY_COLORS[displayRarity]
      )}
      onClick={() => onSelect?.(character)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${character.color}20 0%, transparent 100%)`,
        }}
      />

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10">
          <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
            <Star className="w-4 h-4 text-dark-950 fill-current" />
          </div>
        </div>
      )}

      {/* Character avatar area */}
      <div className="relative p-4 pb-2">
        <div
          className={cn(
            "mx-auto rounded-xl flex items-center justify-center",
            size === "sm" ? "w-20 h-20 text-4xl" : size === "lg" ? "w-32 h-32 text-6xl" : "w-24 h-24 text-5xl"
          )}
          style={{
            background: `linear-gradient(135deg, ${character.color}30, ${character.secondaryColor}30)`,
            boxShadow: `0 0 20px ${character.glowColor}40`,
          }}
        >
          <span className="filter drop-shadow-lg">{character.nameEn.split(" ")[0][0]}</span>
        </div>

        {/* Rarity badge */}
        <div className="absolute bottom-2 left-2">
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full uppercase",
              RARITY_COLORS[displayRarity].replace("bg-", "text-").replace("/10", "")
            )}
          >
            {displayRarity}
          </span>
        </div>
      </div>

      {/* Character info */}
      <div className="px-4 pb-4 space-y-2">
        <h3 className="font-bold text-light-100 text-center truncate">{character.name}</h3>
        <p className="text-xs text-dark-400 text-center">{character.role}</p>

        {/* Stats */}
        {showStats && (
          <div className="space-y-1.5 pt-2">
            {Object.entries(character.stats).map(([stat, value]) => {
              const Icon = STAT_ICONS[stat as keyof typeof STAT_ICONS];
              return (
                <div key={stat} className="flex items-center gap-2 text-xs">
                  <Icon className={cn("w-3.5 h-3.5", STAT_COLORS[stat as keyof typeof STAT_COLORS])} />
                  <span className="text-dark-400 w-16 capitalize">{stat}</span>
                  <StatBar value={value} />
                  <span className="text-dark-500 w-6 text-right">{value}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function CharacterStatRing({ stat, value, max = 100 }: { stat: string; value: number; max?: number }) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-dark-800"
        />
        {/* Progress circle */}
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          stroke="url(#statGradient)"
          strokeWidth="4"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="statGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-light-100">{value}</span>
      </div>
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-dark-400 capitalize">
        {stat}
      </span>
    </div>
  );
}