"use client";

import { ReactNode } from "react";
import { ProgressionBar, AchievementsPanel, DailyQuestsPanel } from "@/components/gamification";
import { useGame } from "@/lib/game-state";

export function GameOverlay({ children }: { children: ReactNode }) {
  const { state } = useGame();
  
  return (
    <>
      {/* Show progression bar in non-game pages */}
      {state.mode !== "battle" && state.mode !== "quest" && (
        <div className="fixed top-16 left-0 right-0 z-40 px-4 py-2 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
          <div className="max-w-md mx-auto">
            <ProgressionBar />
          </div>
        </div>
      )}
      
      {/* Floating UI panels */}
      <AchievementsPanel />
      <DailyQuestsPanel />
      
      {children}
    </>
  );
}