"use client";

import { useState } from "react";
import { useGame } from "@/lib/game-state";
import { ACHIEVEMENTS } from "@/lib/gamification";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Trophy, Star, Crown, Lock } from "lucide-react";

// Animation config based on ui-animation skill
const BACKDROP = {
  fadeIn: 0.25,
  fadeOut: 0.2,
};

const PANEL = {
  spring: { type: "spring" as const, stiffness: 350, damping: 28 },
  scale: 0.92,
};

const CONTENT = {
  stagger: 0.05,
  offsetY: 20,
  spring: { type: "spring" as const, stiffness: 280, damping: 28 },
  initialDelay: 0.05,
};

const rarityColors = {
  common: "from-slate-500/20 to-slate-600/20 border-slate-500/50",
  rare: "from-blue-500/20 to-blue-600/20 border-blue-500/50",
  epic: "from-purple-500/20 to-purple-600/20 border-purple-500/50",
  legendary: "from-amber-500/20 to-amber-600/20 border-amber-500/50",
};

const categoryIcons: Record<string, string> = {
  battle: "⚔️",
  quest: "📝",
  streak: "🔥",
  social: "🤝",
  collection: "🃏",
  milestone: "🎯",
};

export default function AchievementsPanel() {
  const { state } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  const unlockedCount = state.achievements.filter(a => a.unlockedAt).length;

  const filteredAchievements = filter 
    ? ACHIEVEMENTS.filter(a => a.category === filter)
    : ACHIEVEMENTS;

  const userProgress = (achievement: typeof ACHIEVEMENTS[0]) => {
    const userAchievement = state.achievements.find(a => a.id === achievement.id);
    if (userAchievement?.unlockedAt) return 100;
    const stat = state.player.totalWins;
    const progress = Math.min((stat / achievement.requirement.target) * 100, 100);
    return Math.round(progress);
  };

  return (
    <>
      {/* Trigger Button - Fixed at bottom right */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 shadow-2xl hover:shadow-amber-500/50 border border-amber-400/30 flex items-center justify-center">
          <Trophy className="w-7 h-7 text-light-100" />
        </div>
      </motion.button>

      {/* Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Layer 1: Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: BACKDROP.fadeIn }}
              className="absolute inset-0 bg-dark-950/80 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-transparent to-dark-950/20 pointer-events-none" />

            {/* Layer 2: Panel */}
            <motion.div
              initial={{ opacity: 0, scale: PANEL.scale, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: PANEL.scale, y: 10 }}
              transition={PANEL.spring}
              className="relative z-10 w-[95vw] max-w-2xl max-h-[85vh]"
            >
              {/* Glow effect */}
              <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 rounded-[28px] blur-2xl" />

              {/* Main Card */}
              <div className="relative bg-dark-900/95 backdrop-blur-xl rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-r from-amber-900/30 via-orange-900/20 to-yellow-900/30 border-b border-amber-500/20 shrink-0">
                  {/* Close Button */}
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-dark-800/80 hover:bg-dark-700 flex items-center justify-center text-dark-400 hover:text-light-100 transition-colors border border-dark-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  {/* Title Section */}
                  <motion.div 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: CONTENT.initialDelay }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20">
                      🏆
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-light-100">
                        Achievements
                      </h2>
                      <p className="text-amber-300/70 text-sm">
                        {unlockedCount} of {ACHIEVEMENTS.length} unlocked
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Filter Tabs */}
                <div className="px-6 py-4 border-b border-dark-700/50 bg-dark-800/30 shrink-0">
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setFilter(null)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                        !filter 
                          ? "bg-amber-500 text-dark-950 shadow-lg shadow-amber-500/30" 
                          : "bg-dark-700 text-dark-400 hover:bg-dark-600 hover:text-light-100"
                      )}
                    >
                      All
                    </button>
                    {Object.entries(categoryIcons).map(([cat, icon]) => (
                      <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5",
                          filter === cat 
                            ? "bg-amber-500 text-dark-950 shadow-lg shadow-amber-500/30" 
                            : "bg-dark-700 text-dark-400 hover:bg-dark-600 hover:text-light-100"
                        )}
                      >
                        <span>{icon}</span>
                        <span className="capitalize">{cat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Achievement Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {filteredAchievements.map((achievement, index) => {
                      const progress = userProgress(achievement);
                      const isUnlocked = progress >= 100;

                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, y: CONTENT.offsetY }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: CONTENT.initialDelay + (index * CONTENT.stagger),
                            ...CONTENT.spring 
                          }}
                          className={cn(
                            "relative p-4 rounded-xl border bg-gradient-to-br transition-all",
                            rarityColors[achievement.rarity],
                            isUnlocked ? "opacity-100" : "opacity-80 hover:opacity-100"
                          )}
                        >
                          {!isUnlocked && (
                            <div className="absolute inset-0 bg-dark-950/50 rounded-xl" />
                          )}

                          <div className="relative z-10 flex items-start gap-3">
                            <div className="text-4xl filter drop-shadow-lg">
                              {achievement.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-light-100 truncate">
                                {achievement.name}
                              </h3>
                              <p className="text-xs text-dark-400 line-clamp-2 mt-1">
                                {achievement.description}
                              </p>
                              
                              {/* Progress Bar */}
                              <div className="mt-3 h-2 bg-dark-800 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                />
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-dark-500 capitalize">
                                  {achievement.rarity}
                                </span>
                                <span className="text-xs text-dark-500">
                                  {progress}% • {achievement.requirement.target} {achievement.requirement.type}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Rewards */}
                          <div className="mt-4 pt-3 border-t border-dark-700/50 flex flex-wrap gap-3">
                            {achievement.rewards.tokens > 0 && (
                              <span className="text-sm text-teal-400 font-medium">
                                +{achievement.rewards.tokens} $LIT
                              </span>
                            )}
                            {achievement.rewards.xp > 0 && (
                              <span className="text-sm text-blue-400 font-medium">
                                +{achievement.rewards.xp} XP
                              </span>
                            )}
                            {achievement.rewards.gems && (
                              <span className="text-sm text-purple-400 font-medium">
                                +{achievement.rewards.gems} 💎
                              </span>
                            )}
                            {achievement.rewards.title && (
                              <span className="text-sm text-amber-400 font-medium flex items-center gap-1">
                                <Crown className="w-3 h-3" />
                                {achievement.rewards.title}
                              </span>
                            )}
                          </div>

                          {/* Unlocked Badge */}
                          {isUnlocked && (
                            <div className="absolute top-3 right-3">
                              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-dark-700/50 bg-dark-800/30 shrink-0">
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-light-100 font-bold transition-all shadow-lg shadow-amber-500/20"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Tutup
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}