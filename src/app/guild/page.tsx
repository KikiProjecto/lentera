"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WalletButton } from "@/components/wallet/WalletButton";
import { 
  Users, Trophy, Crown, Medal, Target, 
  Calendar, Zap, Swords, Star, TrendingUp,
  ChevronRight, Shield, Flame
} from "lucide-react";
import { MOCK_LEADERBOARD, type LeaderboardEntry } from "@/components/leaderboard/Leaderboard";

interface Guild {
  id: string;
  name: string;
  university: string;
  avatar: string;
  members: number;
  points: number;
  rank: number;
  wins: number;
  streak: number;
}

const TOP_GUILDS: Guild[] = [
  { id: "1", name: "UGM Warriors", university: "Universitas Gadjah Mada", avatar: "🎓", members: 156, points: 15420, rank: 1, wins: 342, streak: 28 },
  { id: "2", name: "UI FinTech", university: "Universitas Indonesia", avatar: "🏛️", members: 142, points: 12890, rank: 2, wins: 289, streak: 15 },
  { id: "3", name: "ITB Innovators", university: "Institut Teknologi Bandung", avatar: "🔬", members: 138, points: 11240, rank: 3, wins: 245, streak: 12 },
  { id: "4", name: "Binus Tech", university: "Bina Nusantara", avatar: "💻", members: 125, points: 9870, rank: 4, wins: 198, streak: 8 },
  { id: "5", name: "Undip Scholars", university: "Universitas Diponegoro", avatar: "📚", members: 118, points: 8540, rank: 5, wins: 167, streak: 6 },
];

const UPCOMING_EVENTS = [
  { id: "1", name: "Weekly Tournament", type: "Battle", prize: "5,000 $LIT", date: "Every Sunday", status: "upcoming" },
  { id: "2", name: "Monthly Championship", type: "Quest", prize: "25,000 $LIT", date: "May 15, 2026", status: "upcoming" },
  { id: "3", name: "Campus Cup", type: "Guild", prize: "50,000 $LIT + NFT", date: "June 1, 2026", status: "upcoming" },
];

export default function GuildPage() {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "events" | "my-guild">("leaderboard");
  
  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-light-100">Campus Competition</h1>
          </div>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Join a guild with your campus mates! Compete in weekly tournaments, 
            climb the leaderboard, and represent your university in the ultimate 
            financial literacy battle!
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 bg-dark-900 p-1 rounded-xl border border-dark-700">
            {[
              { id: "leaderboard", label: "Guild Rankings", icon: Trophy },
              { id: "events", label: "Events", icon: Calendar },
              { id: "my-guild", label: "My Guild", icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-cyan-500 text-dark-950"
                    : "text-dark-400 hover:text-light-100 hover:bg-dark-800"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "leaderboard" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Top 3 Guilds */}
            <div className="flex items-end justify-center gap-4 py-8">
              {/* 2nd Place */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-400/20 border-2 border-slate-400 flex items-center justify-center text-4xl mb-2">
                  {TOP_GUILDS[1].avatar}
                </div>
                <h3 className="font-bold text-light-100">{TOP_GUILDS[1].name}</h3>
                <p className="text-sm text-dark-400">{TOP_GUILDS[1].university}</p>
                <div className="mt-2 px-4 py-2 bg-slate-500/20 rounded-lg">
                  <span className="text-2xl font-bold text-slate-300">#{TOP_GUILDS[1].rank}</span>
                </div>
              </motion.div>

              {/* 1st Place */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-5xl mb-2 shadow-lg shadow-amber-500/30">
                  {TOP_GUILDS[0].avatar}
                </div>
                <Crown className="w-8 h-8 text-amber-400 mx-auto mb-1" />
                <h3 className="font-bold text-light-100 text-lg">{TOP_GUILDS[0].name}</h3>
                <p className="text-sm text-dark-400">{TOP_GUILDS[0].university}</p>
                <div className="mt-2 px-6 py-3 bg-amber-500/20 rounded-lg">
                  <span className="text-3xl font-bold text-amber-400">#{TOP_GUILDS[0].rank}</span>
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-700/20 border-2 border-amber-700 flex items-center justify-center text-3xl mb-2">
                  {TOP_GUILDS[2].avatar}
                </div>
                <h3 className="font-bold text-light-100">{TOP_GUILDS[2].name}</h3>
                <p className="text-sm text-dark-400">{TOP_GUILDS[2].university}</p>
                <div className="mt-2 px-3 py-2 bg-amber-700/20 rounded-lg">
                  <span className="text-xl font-bold text-amber-600">#{TOP_GUILDS[2].rank}</span>
                </div>
              </motion.div>
            </div>

            {/* Guild List */}
            <div className="bg-dark-900 rounded-2xl border border-dark-700 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 bg-dark-800 text-dark-400 text-sm font-medium">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">Guild</div>
                <div className="col-span-2">Members</div>
                <div className="col-span-2">Points</div>
                <div className="col-span-2">Wins</div>
                <div className="col-span-1">Streak</div>
              </div>
              {TOP_GUILDS.map((guild, index) => (
                <motion.div 
                  key={guild.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-12 gap-4 p-4 border-t border-dark-700/50 hover:bg-dark-800/50 transition-colors"
                >
                  <div className="col-span-1 font-bold text-dark-500">#{guild.rank}</div>
                  <div className="col-span-4 flex items-center gap-3">
                    <span className="text-2xl">{guild.avatar}</span>
                    <div>
                      <p className="font-bold text-light-100">{guild.name}</p>
                      <p className="text-xs text-dark-400">{guild.university}</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-1 text-dark-400">
                    <Users className="w-4 h-4" />
                    {guild.members}
                  </div>
                  <div className="col-span-2 text-teal-400 font-bold">{guild.points.toLocaleString()}</div>
                  <div className="col-span-2 flex items-center gap-1 text-dark-400">
                    <Swords className="w-4 h-4" />
                    {guild.wins}
                  </div>
                  <div className="col-span-1 flex items-center gap-1 text-orange-400">
                    <Flame className="w-4 h-4" />
                    {guild.streak}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "events" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {UPCOMING_EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-900 rounded-2xl border border-dark-700 p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === "upcoming" 
                      ? "bg-cyan-500/20 text-cyan-400" 
                      : "bg-green-500/20 text-green-400"
                  }`}>
                    {event.status === "upcoming" ? "Upcoming" : "Live"}
                  </span>
                  <Calendar className="w-5 h-5 text-dark-500" />
                </div>
                <h3 className="text-xl font-bold text-light-100 mb-2">{event.name}</h3>
                <div className="space-y-2 text-sm text-dark-400">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>{event.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-teal-400" />
                    <span className="text-teal-400">{event.prize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                </div>
                <button className="w-full mt-4 py-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-light-100 font-medium transition-colors flex items-center justify-center gap-2">
                  Join Event
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "my-guild" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-dark-800 flex items-center justify-center text-5xl">
              🎓
            </div>
            <h2 className="text-2xl font-bold text-light-100 mb-4">Join a Guild</h2>
            <p className="text-dark-400 max-w-md mx-auto mb-8">
              Connect your wallet to join a campus guild and compete with other universities!
            </p>
            <div className="flex justify-center">
              <WalletButton />
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full border border-cyan-500/30">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium">Join 500+ Players from 50+ Universities</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}