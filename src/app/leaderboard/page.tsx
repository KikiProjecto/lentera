"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, Medal, Crown, Users,
  ChevronUp, ChevronDown, Zap,
  Target, Flame, Search, Filter
} from "lucide-react";
import { clsx } from "clsx";

interface LeaderboardEntry {
  rank: number;
  name: string;
  guild: string;
  xp: number;
  tokens: number;
  streak: number;
  wins: number;
  avatar: string;
  isCurrentUser?: boolean;
  rankChange: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Alex Kim", guild: "UI Warriors", xp: 15420, tokens: 8500, streak: 45, wins: 234, avatar: "👨‍🎓", rankChange: 0 },
  { rank: 2, name: "Sarah Lee", guild: "ITS Gamers", xp: 12350, tokens: 7200, streak: 32, wins: 198, avatar: "👩‍🎓", rankChange: 1 },
  { rank: 3, name: "Budi Santoso", guild: "UGM Legends", xp: 11890, tokens: 6800, streak: 28, wins: 187, avatar: "👨‍💻", rankChange: -1 },
  { rank: 4, name: "Maya Putri", guild: "ITB Scholars", xp: 10500, tokens: 5900, streak: 21, wins: 156, avatar: "👩‍🔬", rankChange: 2 },
  { rank: 5, name: "Dedi Kurnia", guild: "UB Heroes", xp: 9870, tokens: 5400, streak: 19, wins: 142, avatar: "👨‍🎨", rankChange: 0 },
  { rank: 6, name: "Lisa Anwar", guild: "UI Warriors", xp: 9200, tokens: 5100, streak: 15, wins: 128, avatar: "👩‍💼", rankChange: -2 },
  { rank: 7, name: "Rendy Winata", guild: "Telkom High", xp: 8900, tokens: 4800, streak: 14, wins: 119, avatar: "👨‍🔧", rankChange: 1 },
  { rank: 8, name: "Nadia Fatma", guild: "UNAIR Force", xp: 8450, tokens: 4500, streak: 12, wins: 108, avatar: "👩‍🏫", rankChange: 0 },
  { rank: 9, name: "Fajar Rahmat", guild: "UGM Legends", xp: 8100, tokens: 4200, streak: 10, wins: 98, avatar: "👨‍🏫", rankChange: 3 },
  { rank: 10, name: "Putri Dewi", guild: "ITS Gamers", xp: 7800, tokens: 4000, streak: 9, wins: 92, avatar: "👩‍🎤", rankChange: -1 },
  { rank: 11, name: "Kamu", guild: "Player Baru", xp: 2450, tokens: 1250, streak: 7, wins: 42, avatar: "🧑‍🎮", isCurrentUser: true, rankChange: 5 },
  { rank: 12, name: "Aldi Pratama", guild: "UGM Legends", xp: 6700, tokens: 3500, streak: 8, wins: 85, avatar: "👨‍💼", rankChange: 0 },
  { rank: 13, name: "Sari Mutiara", guild: "ITB Scholars", xp: 6400, tokens: 3300, streak: 7, wins: 80, avatar: "👩‍🔬", rankChange: 2 },
  { rank: 14, name: "Hendra Gunawan", guild: "Telkom High", xp: 6100, tokens: 3100, streak: 6, wins: 75, avatar: "👨‍🎓", rankChange: -1 },
  { rank: 15, name: "Wulan Sari", guild: "UB Heroes", xp: 5800, tokens: 2900, streak: 5, wins: 70, avatar: "👩‍💻", rankChange: 0 },
];

const guildStats = [
  { guild: "UI Warriors", members: 1240, avgXp: 8900, totalWins: 4500, rank: 1 },
  { guild: "ITS Gamers", members: 980, avgXp: 8200, totalWins: 3800, rank: 2 },
  { guild: "UGM Legends", members: 1150, avgXp: 7800, totalWins: 4100, rank: 3 },
  { guild: "ITB Scholars", members: 890, avgXp: 7500, totalWins: 3200, rank: 4 },
  { guild: "Telkom High", members: 760, avgXp: 6800, totalWins: 2800, rank: 5 },
];

type TabType = "global" | "guild" | "campus";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("global");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState<"all" | "weekly" | "monthly">("all");

  const filteredLeaderboard = mockLeaderboard.filter(entry =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.guild.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topThree = filteredLeaderboard.slice(0, 3);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Leaderboard</span>
          </h1>
          <p className="text-light-400 text-lg">
            Kompetisi dengan player lain dan ukir namamu di leaderboard!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div className="flex gap-2">
            {(["global", "guild", "campus"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-4 py-2 rounded-xl font-medium transition-all capitalize",
                  activeTab === tab
                    ? "bg-neon-cyan text-dark-950"
                    : "bg-dark-800 text-light-300 hover:bg-dark-700"
                )}
              >
                {tab === "campus" ? "Kampus" : tab}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {(["all", "weekly", "monthly"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize",
                  timeFilter === filter
                    ? "bg-neon-purple/20 text-neon-purple"
                    : "bg-dark-800 text-light-400 hover:text-light-200"
                )}
              >
                {filter === "all" ? "Semua" : filter === "weekly" ? "Minggu" : "Bulan"}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-400" />
          <input
            type="text"
            placeholder="Cari player atau guild..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-dark-800/50 border border-dark-600/50 rounded-xl text-light-100 placeholder:text-light-400 focus:outline-none focus:border-neon-cyan/50"
          />
        </div>

        {activeTab === "global" && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {topThree.map((entry, index) => (
                <div
                  key={entry.rank}
                  className={clsx(
                    "glass-panel rounded-2xl p-6 text-center relative overflow-hidden",
                    index === 0 && "md:-mt-8",
                    index === 1 && "md:-mt-4",
                  )}
                >
                  {index === 0 && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-yellow to-neon-orange" />
                  )}
                  <div className="text-5xl mb-3">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </div>
                  <div className="text-4xl mb-2">{entry.avatar}</div>
                  <h3 className={clsx(
                    "font-display text-lg font-bold mb-1",
                    index === 0 ? "text-neon-yellow" : "text-light-100"
                  )}>
                    {entry.name}
                  </h3>
                  <p className="text-light-400 text-sm mb-3">{entry.guild}</p>
                  <div className="flex justify-center gap-4 text-sm">
                    <div>
                      <div className="text-neon-cyan font-bold">{entry.xp.toLocaleString()}</div>
                      <div className="text-light-400">XP</div>
                    </div>
                    <div>
                      <div className="text-neon-purple font-bold">{entry.streak}</div>
                      <div className="text-light-400">Streak</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              {filteredLeaderboard.slice(3).map((entry, index) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={clsx(
                    "glass-panel rounded-xl p-4 flex items-center gap-4 transition-all hover:border-neon-cyan/30",
                    entry.isCurrentUser && "border-neon-cyan/50 bg-neon-cyan/5"
                  )}
                >
                  <div className={clsx(
                    "w-8 text-center font-bold",
                    entry.rank <= 3 ? "text-neon-yellow" : "text-light-400"
                  )}>
                    #{entry.rank}
                  </div>

                  <div className="text-2xl">{entry.avatar}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={clsx(
                        "font-semibold truncate",
                        entry.isCurrentUser ? "text-neon-cyan" : "text-light-100"
                      )}>
                        {entry.name}
                        {entry.isCurrentUser && " (Kamu)"}
                      </h4>
                    </div>
                    <p className="text-light-400 text-sm truncate">{entry.guild}</p>
                  </div>

                  <div className="hidden sm:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-neon-cyan font-bold">{entry.xp.toLocaleString()}</div>
                      <div className="text-light-400 text-xs">XP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-neon-yellow font-bold">🔥 {entry.streak}</div>
                      <div className="text-light-400 text-xs">Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-neon-purple font-bold">{entry.wins}</div>
                      <div className="text-light-400 text-xs">Wins</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {entry.rankChange > 0 ? (
                      <ChevronUp className="w-4 h-4 text-neon-cyan" />
                    ) : entry.rankChange < 0 ? (
                      <ChevronDown className="w-4 h-4 text-vice-slot" />
                    ) : (
                      <span className="w-4 h-4" />
                    )}
                    <span className={clsx(
                      "text-xs font-medium",
                      entry.rankChange > 0 ? "text-neon-cyan" :
                      entry.rankChange < 0 ? "text-vice-slot" : "text-light-400"
                    )}>
                      {entry.rankChange !== 0 ? Math.abs(entry.rankChange) : "-"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {activeTab === "guild" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {guildStats.map((guild, index) => (
              <motion.div
                key={guild.guild}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-xl p-6 flex items-center gap-6"
              >
                <div className={clsx(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold",
                  guild.rank === 1 ? "bg-neon-yellow/20" :
                  guild.rank === 2 ? "bg-light-300/20" :
                  "bg-dark-700"
                )}>
                  {guild.rank === 1 ? "🥇" : guild.rank === 2 ? "🥈" : guild.rank === 3 ? "🥉" : `#${guild.rank}`}
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-light-100">{guild.guild}</h3>
                  <p className="text-light-400 text-sm">{guild.members.toLocaleString()} members</p>
                </div>

                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-neon-cyan font-bold">{guild.avgXp.toLocaleString()}</div>
                    <div className="text-light-400">Avg XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-neon-purple font-bold">{guild.totalWins.toLocaleString()}</div>
                    <div className="text-light-400">Total Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-neon-yellow font-bold">#{guild.rank}</div>
                    <div className="text-light-400">Rank</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "campus" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel rounded-2xl p-8 text-center"
          >
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="font-display text-2xl font-bold text-light-100 mb-2">
              Kompetisi Kampus
            </h3>
            <p className="text-light-400 mb-6">
              Bersaing dengan kampus lain dan ukir nama university-mu di leaderboard!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              <div className="p-4 bg-dark-800/50 rounded-xl">
                <h4 className="font-semibold text-light-100 mb-2">📊 Weekly Campus Battle</h4>
                <p className="text-light-400 text-sm">Setiap minggu, kampus dengan total XP tertinggi menang!</p>
              </div>
              <div className="p-4 bg-dark-800/50 rounded-xl">
                <h4 className="font-semibold text-light-100 mb-2">🎯 Monthly Challenge</h4>
                <p className="text-light-400 text-sm">Challenge bulanan dengan reward eksklusif!</p>
              </div>
            </div>
            <button className="mt-6 px-6 py-3 rounded-xl bg-neon-cyan text-dark-950 font-semibold hover:bg-neon-cyan/90 transition-opacity">
              Join Campus Battle
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass-panel rounded-2xl p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-8 h-8 text-neon-pink" />
            <div>
              <h3 className="font-display text-xl font-bold text-light-100">Cara Mendapatkan XP</h3>
              <p className="text-light-400">Naik level dan raih posisi tertinggi!</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-dark-800/50 rounded-xl">
              <Zap className="w-6 h-6 text-neon-cyan mb-2" />
              <h4 className="font-semibold text-light-100 mb-1">Battle Victories</h4>
              <p className="text-light-400 text-sm">+50 XP per kemenangan battle</p>
            </div>
            <div className="p-4 bg-dark-800/50 rounded-xl">
              <Flame className="w-6 h-6 text-neon-orange mb-2" />
              <h4 className="font-semibold text-light-100 mb-1">Daily Streak</h4>
              <p className="text-light-400 text-sm">+10 XP per hari streak</p>
            </div>
            <div className="p-4 bg-dark-800/50 rounded-xl">
              <Trophy className="w-6 h-6 text-neon-yellow mb-2" />
              <h4 className="font-semibold text-light-100 mb-1">Quest Completion</h4>
              <p className="text-light-400 text-sm">+25-100 XP per quest</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}