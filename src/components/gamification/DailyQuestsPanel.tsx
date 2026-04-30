"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/lib/game-state";
import { generateDailyChallenges, type DailyChallenge } from "@/lib/gamification";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, CheckCircle, Gift, Zap, Target, Flame, Sword } from "lucide-react";

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
  stagger: 0.08,
  offsetY: 16,
  spring: { type: "spring" as const, stiffness: 300, damping: 26 },
  initialDelay: 0.05,
};

export default function DailyQuestsPanel() {
  const { state } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [dailyQuests, setDailyQuests] = useState<DailyChallenge[]>([]);

  useEffect(() => {
    const quests = generateDailyChallenges();
    const updatedQuests = quests.map(q => {
      const saved = state.dailyQuests.find(s => s.questId === q.id);
      return saved ? { ...q, progress: saved.progress, completed: saved.completed } : q;
    });
    setDailyQuests(updatedQuests);
  }, []);

  const completedCount = dailyQuests.filter(q => q.completed).length;

  const getQuestIcon = (type: string) => {
    switch (type) {
      case "battle": return <Sword className="w-6 h-6" />;
      case "quest": return <Target className="w-6 h-6" />;
      case "streak": return <Flame className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  return (
    <>
      {/* Trigger Button - Fixed at bottom left */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-40"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 shadow-2xl hover:shadow-purple-500/50 border border-purple-400/30 flex items-center justify-center">
          <span className="text-2xl">📋</span>
          {completedCount < 3 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center shadow-lg"
            >
              {3 - completedCount}
            </motion.span>
          )}
        </div>
      </motion.button>

      {/* Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Layer 1: Backdrop - Strong blur + dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: BACKDROP.fadeIn }}
              className="absolute inset-0 bg-dark-950/80 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-transparent to-dark-950/20 pointer-events-none" />

            {/* Layer 2: Panel - Centered modal */}
            <motion.div
              initial={{ opacity: 0, scale: PANEL.scale, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: PANEL.scale, y: 10 }}
              transition={PANEL.spring}
              className="relative z-10 w-[95vw] max-w-md"
            >
              {/* Glow effect */}
              <div className="absolute -inset-3 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-fuchsia-500/30 rounded-[28px] blur-2xl" />

              {/* Main Card */}
              <div className="relative bg-dark-900/95 backdrop-blur-xl rounded-2xl border border-purple-500/40 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-r from-violet-900/30 via-purple-900/20 to-fuchsia-900/30 border-b border-purple-500/20">
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
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/20">
                      📋
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-light-100">
                        Daily Challenges
                      </h2>
                      <p className="text-purple-300/70 text-sm">
                        Selesaikan untuk bonus reward!
                      </p>
                    </div>
                  </motion.div>

                  {/* Progress Bar */}
                  <motion.div 
                    className="mt-5 flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: CONTENT.initialDelay + 0.1 }}
                  >
                    <div className="flex-1 h-2.5 bg-dark-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedCount / 3) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30">
                      <span className="text-sm font-bold text-purple-300">{completedCount}/3</span>
                    </div>
                  </motion.div>
                </div>

                {/* Quest List */}
                <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                  {dailyQuests.map((quest, index) => (
                    <motion.div
                      key={quest.id}
                      initial={{ opacity: 0, y: CONTENT.offsetY }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: CONTENT.initialDelay + (index * CONTENT.stagger),
                        ...CONTENT.spring 
                      }}
                      className={cn(
                        "relative p-4 rounded-xl border transition-all",
                        quest.completed 
                          ? "bg-green-500/10 border-green-500/30" 
                          : "bg-dark-800/50 border-dark-700 hover:border-purple-500/40"
                      )}
                    >
                      {quest.completed && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        {/* Quest Icon */}
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          quest.completed 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-purple-500/20 text-purple-400"
                        )}>
                          {getQuestIcon(quest.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className={cn(
                            "font-bold",
                            quest.completed ? "text-green-400" : "text-light-100"
                          )}>
                            {quest.title}
                          </h3>
                          <p className="text-sm text-dark-400 mt-0.5">
                            {quest.description}
                          </p>

                          {/* Progress */}
                          <div className="mt-2.5 flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                              <motion.div
                                className={cn(
                                  "h-full rounded-full",
                                  quest.completed ? "bg-green-500" : "bg-purple-500"
                                )}
                                initial={{ width: 0 }}
                                animate={{ width: `${(quest.progress / quest.target) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-dark-500 font-mono">
                              {quest.progress}/{quest.target}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Rewards */}
                      <div className="mt-3 pt-3 border-t border-dark-700/40 flex gap-4">
                        <div className="flex items-center gap-1.5 text-teal-400">
                          <Gift className="w-4 h-4" />
                          <span className="text-sm font-bold">+{quest.rewards.tokens}</span>
                          <span className="text-xs text-teal-400/70">$LIT</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-blue-400">
                          <Zap className="w-4 h-4" />
                          <span className="text-sm font-bold">+{quest.rewards.xp}</span>
                          <span className="text-xs text-blue-400/70">XP</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-dark-700/50 bg-dark-800/30">
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-light-100 font-bold transition-all shadow-lg shadow-purple-500/20"
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