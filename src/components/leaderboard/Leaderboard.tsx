"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trophy, Medal, Crown, User, Zap, Swords, Star, TrendingUp } from "lucide-react";

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  wins: number;
  winRate: number;
  streak: number;
  tokens: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  title?: string;
}

const RANK_ICONS: Record<number, React.ReactNode> = {
  1: <Crown className="w-6 h-6 text-amber-400" />,
  2: <Medal className="w-5 h-5 text-slate-300" />,
  3: <Medal className="w-5 h-5 text-amber-700" />,
};

const RANK_BG: Record<number, string> = {
  1: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20",
  2: "bg-gradient-to-r from-slate-500/20 to-slate-400/20",
  3: "bg-gradient-to-r from-amber-700/20 to-amber-600/20",
};

export function Leaderboard({ entries, currentUserId, title = "Global Leaderboard" }: LeaderboardProps) {
  const [timeFilter, setTimeFilter] = useState<"all" | "weekly" | "monthly">("all");

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-bold text-light-100">{title}</h2>
        </div>
        
        {/* Time filter */}
        <div className="flex gap-1 bg-dark-800 rounded-lg p-1">
          {(["all", "weekly", "monthly"] as const).map((filter) => (
            <button
              key={filter}
              className={cn(
                "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                timeFilter === filter
                  ? "bg-cyan-500 text-dark-950"
                  : "text-dark-400 hover:text-light-100"
              )}
              onClick={() => setTimeFilter(filter)}
            >
              {filter === "all" ? "All Time" : filter === "weekly" ? "This Week" : "This Month"}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      {entries.length >= 3 && (
        <div className="flex items-end justify-center gap-4 py-6">
          {/* 2nd place */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-slate-400/20 border-2 border-slate-400 flex items-center justify-center text-2xl">
                {entries[1].avatar}
              </div>
              <div className="absolute -top-2 -right-2">
                {RANK_ICONS[2]}
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-bold text-light-100 truncate max-w-20">{entries[1].username}</p>
              <p className="text-xs text-dark-400">{entries[1].level} lvl</p>
            </div>
            <div className="w-20 h-16 bg-slate-400/20 rounded-t-lg mt-2 flex items-center justify-center">
              <span className="text-lg font-bold text-slate-300">#{entries[1].rank}</span>
            </div>
          </motion.div>

          {/* 1st place */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-3xl">
                {entries[0].avatar}
              </div>
              <div className="absolute -top-2 -right-2">
                {RANK_ICONS[1]}
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-bold text-light-100 truncate max-w-24">{entries[0].username}</p>
              <p className="text-xs text-dark-400">{entries[0].level} lvl</p>
            </div>
            <div className="w-24 h-24 bg-amber-400/20 rounded-t-lg mt-2 flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-400">#{entries[0].rank}</span>
            </div>
          </motion.div>

          {/* 3rd place */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-amber-700/20 border-2 border-amber-700 flex items-center justify-center text-xl">
                {entries[2].avatar}
              </div>
              <div className="absolute -top-2 -right-2">
                {RANK_ICONS[3]}
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-bold text-light-100 truncate max-w-16">{entries[2].username}</p>
              <p className="text-xs text-dark-400">{entries[2].level} lvl</p>
            </div>
            <div className="w-16 h-12 bg-amber-700/20 rounded-t-lg mt-2 flex items-center justify-center">
              <span className="text-lg font-bold text-amber-600">#{entries[2].rank}</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Rankings table */}
      <div className="space-y-2">
        {entries.slice(3).map((entry, index) => (
          <motion.div
            key={entry.rank}
            className={cn(
              "flex items-center gap-4 p-3 rounded-lg transition-colors",
              entry.username === currentUserId ? "bg-cyan-500/10 border border-cyan-500/50" : "bg-dark-800/50"
            )}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            {/* Rank */}
            <div className="w-8 text-center">
              <span className="text-lg font-bold text-dark-500">#{entry.rank}</span>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-lg">
              {entry.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className={cn("font-bold truncate", entry.username === currentUserId ? "text-cyan-400" : "text-light-100")}>
                {entry.username}
              </p>
              <div className="flex items-center gap-3 text-xs text-dark-500">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Lv {entry.level}
                </span>
                <span className="flex items-center gap-1">
                  <Swords className="w-3 h-3" />
                  {entry.wins} wins
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs">
              <div className="text-right">
                <p className="font-bold text-teal-400">{entry.xp.toLocaleString()} XP</p>
              </div>
              {entry.streak > 0 && (
                <div className="flex items-center gap-1 text-orange-400">
                  <Zap className="w-4 h-4" />
                  <span className="font-bold">{entry.streak}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Demo data
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: "CryptoWarrior", avatar: "⚔️", level: 42, xp: 125000, wins: 342, winRate: 78.5, streak: 28, tokens: 15000 },
  { rank: 2, username: "SmartSaver99", avatar: "🏦", level: 38, xp: 98000, wins: 256, winRate: 72.3, streak: 15, tokens: 12000 },
  { rank: 3, username: "InvestorBudi", avatar: "📈", level: 35, xp: 85000, wins: 198, winRate: 68.9, streak: 10, tokens: 9500 },
  { rank: 4, username: "GameMaster", avatar: "🎮", level: 32, xp: 72000, wins: 167, winRate: 65.2, streak: 7, tokens: 7800 },
  { rank: 5, username: "LenteraStar", avatar: "⭐", level: 28, xp: 58000, wins: 142, winRate: 71.1, streak: 12, tokens: 6200 },
  { rank: 6, username: "FinanceGuru", avatar: "💎", level: 25, xp: 45000, wins: 98, winRate: 64.8, streak: 5, tokens: 4800 },
  { rank: 7, username: "AntiJudiHero", avatar: "🛡️", level: 22, xp: 35000, wins: 87, winRate: 69.5, streak: 8, tokens: 3800 },
  { rank: 8, username: "TokenHunter", avatar: "🎯", level: 19, xp: 28000, wins: 65, winRate: 62.1, streak: 3, tokens: 2900 },
  { rank: 9, username: "VaultKeeper", avatar: "🔐", level: 16, xp: 22000, wins: 54, winRate: 70.2, streak: 6, tokens: 2200 },
  { rank: 10, username: "StreakKing", avatar: "🔥", level: 14, xp: 18000, wins: 42, winRate: 58.9, streak: 14, tokens: 1800 },
];