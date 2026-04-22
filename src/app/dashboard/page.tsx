"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { GUARDIANS } from "@/data/characters";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { 
  Wallet, Zap, Flame, Trophy, 
  Users, Calendar, Gift,
  ChevronRight, Star, Shield,
  Play, Target, Crown
} from "lucide-react";

interface UserStats {
  level: number;
  xp: number;
  tokens: number;
  streak: number;
  wins: number;
  guild: string;
}

export default function DashboardPage() {
  const [userStats] = useState<UserStats>({
    level: 5,
    xp: 2450,
    tokens: 1250,
    streak: 7,
    wins: 42,
    guild: "UGM Warriors",
  });

  const weeklyQuests = [
    { id: 1, title: "Quiz Spending Habits", progress: 80, reward: 50, completed: false },
    { id: 2, title: "Budget Challenge", progress: 100, reward: 100, completed: true },
    { id: 3, title: "Anti-Scam Quiz", progress: 50, reward: 75, completed: false },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-light-100">
              Dashboard
            </h1>
            <p className="text-light-400">Welcome back, Guardian!</p>
          </div>
          <WalletMultiButton className="!bg-dark-800 !border-neon-cyan/30 !text-neon-cyan" />
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-neon-yellow" />
              <span className="text-light-400 text-sm">Tokens</span>
            </div>
            <div className="text-2xl font-bold text-light-100">{userStats.tokens.toLocaleString()}</div>
            <div className="text-neon-cyan text-sm">$LIT</div>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-neon-pink" />
              <span className="text-light-400 text-sm">Streak</span>
            </div>
            <div className="text-2xl font-bold text-light-100">{userStats.streak}</div>
            <div className="text-light-400 text-sm">days</div>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-neon-purple" />
              <span className="text-light-400 text-sm">Wins</span>
            </div>
            <div className="text-2xl font-bold text-light-100">{userStats.wins}</div>
            <div className="text-light-400 text-sm">battles</div>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-5 h-5 text-neon-orange" />
              <span className="text-light-400 text-sm">Guild</span>
            </div>
            <div className="text-2xl font-bold text-light-100">{userStats.guild}</div>
            <div className="text-light-400 text-sm">Rank #42</div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quests */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-display text-xl font-bold text-light-100">
                Quest Harian
              </h2>
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Lihat Semua
              </Button>
            </div>

            <div className="space-y-3">
              {weeklyQuests.map((quest, index) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`quest-item ${quest.completed ? 'border-neon-cyan/30' : ''}`}
                >
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      quest.completed 
                        ? 'bg-neon-cyan/20' 
                        : 'bg-dark-700'
                    }`}
                  >
                    {quest.completed ? (
                      <Shield className="w-6 h-6 text-neon-cyan" />
                    ) : (
                      <Target className="w-6 h-6 text-light-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-light-100">{quest.title}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink"
                          initial={{ width: 0 }}
                          animate={{ width: `${quest.progress}%` }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        />
                      </div>
                      <span className="text-neon-cyan text-sm font-semibold shrink-0">
                        +{quest.reward} $LIT
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <h2 className="font-display text-xl font-bold text-light-100 mt-8">
              Cepat Main
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-6 rounded-xl cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                    <Play className="w-7 h-7 text-dark-950" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-light-100 group-hover:text-neon-cyan transition-colors">
                      Battle Mode
                    </h4>
                    <p className="text-light-400 text-sm">Kalahkan vice monsters!</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-light-400 group-hover:text-neon-cyan transition-colors" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-6 rounded-xl cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-pink to-neon-orange flex items-center justify-center">
                    <Gift className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-light-100 group-hover:text-neon-pink transition-colors">
                      Rewards
                    </h4>
                    <p className="text-light-400 text-sm">Tukar token-mu!</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-light-400 group-hover:text-neon-pink transition-colors" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Character */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="font-display text-xl font-bold text-light-100">
              Karakter Aktif
            </h2>
            <div className="glass-panel p-6 rounded-xl">
              <div className="text-center mb-4">
                <motion.div
                  className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center text-6xl"
                  style={{
                    background: "linear-gradient(135deg, #2DD4BF30, #0D948820)",
                    border: "2px solid #2DD4BF40",
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🦎
                </motion.div>
                <h3 className="font-display text-lg font-bold text-light-100">Komodo</h3>
                <p className="text-light-400 text-sm">Level {userStats.level} Guardian</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-light-400">XP</span>
                  <span className="text-light-100">{userStats.xp.toLocaleString()} / 5000</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    initial={{ width: 0 }}
                    animate={{ width: `${(userStats.xp / 5000) * 100}%` }}
                  />
                </div>
              </div>

              <Button className="w-full mt-4">
                <Star className="w-4 h-4 mr-2" />
                Upgrade Karakter
              </Button>
            </div>

            {/* Leaderboard Preview */}
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="font-semibold text-light-100 mb-4">Leaderboard Kampus</h3>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "Alex Kim", xp: 15420, guild: "UI Warriors" },
                  { rank: 2, name: "Sarah Lee", xp: 12350, guild: "ITS Gamers" },
                  { rank: 3, name: "You", xp: userStats.xp, guild: userStats.guild, isUser: true },
                ].map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      player.isUser ? 'bg-neon-cyan/10 border border-neon-cyan/30' : ''
                    }`}
                  >
                    <span className={`font-bold w-6 ${
                      player.rank === 1 ? 'text-neon-yellow' :
                      player.rank === 2 ? 'text-light-300' :
                      'text-light-400'
                    }`}>
                      #{player.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-light-100 text-sm font-medium truncate">{player.name}</div>
                      <div className="text-light-400 text-xs">{player.guild}</div>
                    </div>
                    <span className="text-neon-cyan text-sm font-semibold">{player.xp.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}