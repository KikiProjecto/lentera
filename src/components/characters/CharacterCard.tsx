"use client";

import { motion } from "framer-motion";
import { CharacterConfig, RARITY_COLORS } from "@/data/characters";
import { clsx } from "clsx";
import { Shield, Zap, Heart, Brain, Sparkles, Flame, Droplets, Wind, Globe, Star } from "lucide-react";

interface CharacterCardProps {
  character: CharacterConfig;
  variant?: "compact" | "full" | "battle";
  isSelected?: boolean;
  onSelect?: (character: CharacterConfig) => void;
  showStats?: boolean;
  className?: string;
}

const ELEMENT_ICONS = {
  light: Star,
  fire: Flame,
  water: Droplets,
  earth: Globe,
  air: Wind,
  void: Sparkles,
};

const STAT_ICONS = {
  attack: Zap,
  defense: Shield,
  speed: Wind,
  wisdom: Brain,
  charisma: Sparkles,
};

export default function CharacterCard({
  character,
  variant = "compact",
  isSelected,
  onSelect,
  showStats = true,
  className,
}: CharacterCardProps) {
  const ElementIcon = ELEMENT_ICONS[character.element];
  const rarityColor = RARITY_COLORS[character.rarity];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    hover: { 
      y: -8,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    },
  };

  const idleAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: character.element === "fire" ? 0.5 : character.element === "air" ? 1.5 : 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  if (variant === "compact") {
    return (
      <motion.div
        variants={containerVariants}
        whileHover="hover"
        onClick={() => onSelect?.(character)}
        className={clsx(
          "relative p-4 rounded-2xl cursor-pointer transition-all duration-300",
          "bg-gradient-to-br from-dark-800 to-dark-900 border-2",
          isSelected 
            ? "border-neon-cyan shadow-glow-cyan" 
            : "border-dark-600/50 hover:border-dark-500",
          className
        )}
        style={{
          boxShadow: isSelected ? `0 0 30px ${character.glowColor}` : undefined,
        }}
      >
        <motion.div animate={idleAnimation as any}>
          <div 
            className="w-16 h-16 rounded-xl mb-3 flex items-center justify-center text-4xl"
            style={{
              background: `linear-gradient(135deg, ${character.color}20, ${character.secondaryColor}30)`,
            }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {character.element === "earth" ? "🦎" : 
               character.element === "void" ? "🦉" : 
               character.element === "air" ? "🦧" : 
               character.element === "water" ? "💎" : 
               character.element === "fire" ? "🔥" : "☀️"}
            </motion.span>
          </div>
        </motion.div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-light-100 text-sm truncate">{character.name}</h4>
          </div>
          <div className="flex items-center gap-2">
            <span 
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `${rarityColor}20`,
                color: rarityColor,
              }}
            >
              {character.rarity}
            </span>
            <ElementIcon className="w-3 h-3" style={{ color: character.color }} />
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "battle") {
    return (
      <motion.div
        variants={containerVariants}
        whileHover="hover"
        className={clsx(
          "relative p-6 rounded-3xl",
          "bg-gradient-to-br from-dark-800 to-dark-900",
          "border-2 transition-all duration-300",
          isSelected 
            ? "border-neon-cyan" 
            : "border-dark-600/50",
          className
        )}
        style={{
          boxShadow: isSelected ? `0 0 40px ${character.glowColor}` : `0 10px 40px rgba(0,0,0,0.3)`,
        }}
      >
        <motion.div 
          className="absolute inset-0 rounded-3xl overflow-hidden"
          animate={idleAnimation as any}
        >
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 120%, ${character.color} 0%, transparent 60%)`,
            }}
          />
        </motion.div>

        <div className="relative z-10">
          <motion.div 
            className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center text-6xl"
            style={{
              background: `linear-gradient(135deg, ${character.color}30, ${character.secondaryColor}20)`,
              border: `2px solid ${character.color}40`,
            }}
            whileHover={{ scale: 1.1 }}
          >
            {character.element === "earth" ? "🦎" : 
             character.element === "void" ? "🦉" : 
             character.element === "air" ? "🦧" : 
             character.element === "water" ? "💎" : 
             character.element === "fire" ? "🔥" : "☀️"}
          </motion.div>

          <div className="text-center mb-4">
            <h3 className="font-display text-xl font-bold text-light-100">{character.name}</h3>
            <p className="text-light-400 text-sm">{character.role}</p>
          </div>

          {showStats && (
            <div className="grid grid-cols-5 gap-2 mb-4">
              {Object.entries(character.stats).map(([stat, value]) => {
                const StatIcon = STAT_ICONS[stat as keyof typeof STAT_ICONS];
                return (
                  <div key={stat} className="text-center">
                    <div 
                      className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-1"
                      style={{ backgroundColor: `${character.color}20` }}
                    >
                      <StatIcon className="w-4 h-4" style={{ color: character.color }} />
                    </div>
                    <span className="text-xs font-semibold text-light-200">{value}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex flex-wrap gap-2 justify-center">
            {character.abilities.slice(0, 3).map((ability, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${character.color}20`,
                  color: character.color,
                }}
              >
                {ability.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      whileHover="hover"
      className={clsx(
        "relative p-6 rounded-2xl",
        "bg-gradient-to-br from-dark-800 to-dark-900",
        "border border-dark-600/50",
        className
      )}
    >
      <div className="flex gap-4">
        <motion.div 
          className="w-20 h-20 rounded-xl flex items-center justify-center text-5xl shrink-0"
          style={{
            background: `linear-gradient(135deg, ${character.color}20, ${character.secondaryColor}30)`,
          }}
          animate={idleAnimation as any}
        >
          {character.element === "earth" ? "🦎" : 
           character.element === "void" ? "🦉" : 
           character.element === "air" ? "🦧" : 
           character.element === "water" ? "💎" : 
           character.element === "fire" ? "🔥" : "☀️"}
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-display font-semibold text-light-100 truncate">{character.name}</h4>
            <span 
              className="px-2 py-0.5 rounded-full text-xs font-medium shrink-0"
              style={{ 
                backgroundColor: `${rarityColor}20`,
                color: rarityColor,
              }}
            >
              {character.rarity}
            </span>
          </div>
          <p className="text-light-400 text-sm mb-2">{character.role}</p>
          <p className="text-light-300 text-sm line-clamp-2">{character.description}</p>
        </div>
      </div>

      {showStats && (
        <div className="mt-4 pt-4 border-t border-dark-700/50">
          <div className="grid grid-cols-5 gap-3">
            {Object.entries(character.stats).map(([stat, value]) => {
              const StatIcon = STAT_ICONS[stat as keyof typeof STAT_ICONS];
              const percentage = (value / 100) * 100;
              return (
                <div key={stat}>
                  <div className="flex items-center gap-1 mb-1">
                    <StatIcon className="w-3 h-3" style={{ color: character.color }} />
                    <span className="text-xs text-light-400 capitalize">{stat}</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ backgroundColor: character.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}