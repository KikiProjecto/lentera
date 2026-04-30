"use client";

import { useGame } from "@/lib/game-state";
import { PROGRESSION_TIERS, calculateXPProgress } from "@/lib/gamification";
import { motion } from "framer-motion";

export default function ProgressionBar() {
  const { state } = useGame();
  const { current, required, percentage } = calculateXPProgress(state.player.xp);
  const currentTier = PROGRESSION_TIERS.find(t => t.level === state.player.level);

  return (
    <div className="w-full bg-dark-800 rounded-full h-6 overflow-hidden relative">
      {/* XP Progress fill */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      
      {/* XP particles/shine effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.1) 10px,
            rgba(255,255,255,0.1) 20px
          )`
        }}
      />

      {/* Level badge */}
      <div className="absolute inset-0 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-dark-950 drop-shadow-sm">
            LVL {state.player.level}
          </span>
          <span className="text-xs text-dark-700">
            {currentTier?.badge}
          </span>
        </div>
        <span className="text-xs font-medium text-dark-950 drop-shadow-sm">
          {current} / {required} XP
        </span>
      </div>
    </div>
  );
}