"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTS, type Quest } from "@/data/quests";
import QuestModal from "@/components/quest/QuestModal";
import { WalletButton } from "@/components/wallet/WalletButton";
import { 
  BookOpen, Clock, Zap, Trophy, 
  ChevronRight, CheckCircle, Lock,
  Star, Target, Flame, Shield
} from "lucide-react";
import { clsx } from "clsx";

const categoryIcons = {
  budget: "💰",
  saving: "🐷",
  investing: "📈",
  scam: "🚨",
  debt: "⚠️",
};

const categoryColors = {
  budget: "from-neon-cyan to-neon-purple",
  saving: "from-neon-green to-neon-cyan",
  investing: "from-neon-yellow to-neon-orange",
  scam: "from-vice-slot to-vice-rug",
  debt: "from-neon-pink to-vice-rug",
};

interface UserProgress {
  completedQuests: string[];
  totalTokens: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
}

export default function QuestPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  
  const [userProgress] = useState<UserProgress>({
    completedQuests: ["budget-basics"],
    totalTokens: 1250,
    totalXp: 2450,
    currentStreak: 7,
    longestStreak: 14,
  });

  const filteredQuests = selectedCategory 
    ? QUESTS.filter(q => q.category === selectedCategory)
    : QUESTS;

  const categories = ["budget", "saving", "investing", "scam", "debt"] as const;

  const handleQuestClick = (quest: Quest) => {
    setActiveQuest(quest);
    setIsQuestModalOpen(true);
  };

  const handleQuestComplete = (rewards: { tokens: number; xp: number }) => {
    if (activeQuest) {
      // In a real app, this would update the user's progress
    }
    setIsQuestModalOpen(false);
    setActiveQuest(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">
              <span className="text-gradient">Quests</span>
            </h1>
            <p className="text-light-400">Belajar literasi keuangan sambil main game!</p>
          </div>
          <WalletButton />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-neon-cyan" />
              <span className="text-light-400 text-sm">Total Tokens</span>
            </div>
            <div className="text-2xl font-bold text-neon-cyan">{userProgress.totalTokens}</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-neon-purple" />
              <span className="text-light-400 text-sm">Total XP</span>
            </div>
            <div className="text-2xl font-bold text-neon-purple">{userProgress.totalXp}</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-neon-yellow" />
              <span className="text-light-400 text-sm">Current Streak</span>
            </div>
            <div className="text-2xl font-bold text-neon-yellow">{userProgress.currentStreak} days</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-neon-orange" />
              <span className="text-light-400 text-sm">Longest Streak</span>
            </div>
            <div className="text-2xl font-bold text-neon-orange">{userProgress.longestStreak} days</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={clsx(
              "px-4 py-2 rounded-xl font-medium transition-all",
              !selectedCategory
                ? "bg-neon-cyan text-dark-950"
                : "bg-dark-800 text-light-300 hover:bg-dark-700"
            )}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={clsx(
                "px-4 py-2 rounded-xl font-medium capitalize transition-all flex items-center gap-2",
                selectedCategory === cat
                  ? "bg-neon-cyan text-dark-950"
                  : "bg-dark-800 text-light-300 hover:bg-dark-700"
              )}
            >
              <span>{categoryIcons[cat]}</span>
              {cat === "scam" ? "Scam" : cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map((quest, index) => {
            const isCompleted = userProgress.completedQuests.includes(quest.id);
            const Icon = categoryIcons[quest.category as keyof typeof categoryIcons];
            const gradient = categoryColors[quest.category as keyof typeof categoryColors];

            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={clsx(
                  "glass-panel rounded-2xl overflow-hidden transition-all",
                  isCompleted && "border-neon-cyan/30",
                  !isCompleted && "hover:border-dark-500"
                )}
              >
                <div className={clsx(
                  "h-24 p-6 bg-gradient-to-r flex items-center justify-between",
                  gradient
                )}>
                  <div className="text-4xl">{Icon}</div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-dark-950 text-sm">
                      <Clock className="w-4 h-4" />
                      {quest.timeLimit / 60} min
                    </div>
                    <div className="text-xs text-dark-800/80 capitalize">{quest.difficulty === 1 ? "Mudah" : quest.difficulty === 2 ? "Sedang" : "Sulit"}</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg font-bold text-light-100">{quest.title}</h3>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0" />
                    )}
                  </div>
                  <p className="text-light-400 text-sm mb-4">{quest.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-neon-cyan">
                      <Zap className="w-4 h-4" />
                      {quest.rewards.tokens} $LIT
                    </div>
                    <div className="flex items-center gap-1 text-neon-purple">
                      <Star className="w-4 h-4" />
                      {quest.rewards.xp} XP
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-xs text-light-400">
                    <span className="px-2 py-1 bg-dark-700 rounded-full capitalize">
                      {quest.questions.length} pertanyaan
                    </span>
                    {quest.streakBonus && (
                      <span className="px-2 py-1 bg-neon-yellow/20 text-neon-yellow rounded-full">
                        Streak {quest.streakBonus.days} hari: x{quest.streakBonus.multiplier}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleQuestClick(quest)}
                    disabled={isCompleted}
                    className={clsx(
                      "w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                      isCompleted
                        ? "bg-dark-700 text-light-400 cursor-not-allowed"
                        : "bg-neon-cyan text-dark-950 hover:bg-neon-cyan/90"
                    )}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Selesai
                      </>
                    ) : (
                      <>
                        Mulai Quest
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredQuests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-light-100 mb-2">Tidak ada quest</h3>
            <p className="text-light-400">Pilih kategori lain atau check lagi nanti!</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-panel rounded-2xl p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-8 h-8 text-neon-pink" />
            <div>
              <h3 className="font-display text-xl font-bold text-light-100">Daily Quests</h3>
              <p className="text-light-400">Quest harian yang bisa kamu selesaikan setiap hari</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-dark-800/50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📝</span>
                <h4 className="font-semibold text-light-100">Daily Quiz</h4>
              </div>
              <p className="text-light-400 text-sm mb-2">Selesaikan 1 quest hari ini</p>
              <div className="flex items-center gap-2 text-neon-cyan text-sm">
                <Zap className="w-4 h-4" />
                +25 $LIT
              </div>
            </div>
            <div className="p-4 bg-dark-800/50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎮</span>
                <h4 className="font-semibold text-light-100">Battle Daily</h4>
              </div>
              <p className="text-light-400 text-sm mb-2">Menang 3 battle hari ini</p>
              <div className="flex items-center gap-2 text-neon-cyan text-sm">
                <Zap className="w-4 h-4" />
                +50 $LIT
              </div>
            </div>
          </div>
        </motion.div>

        <QuestModal
          quest={activeQuest}
          isOpen={isQuestModalOpen}
          onClose={() => {
            setIsQuestModalOpen(false);
            setActiveQuest(null);
          }}
          onComplete={handleQuestComplete}
        />
      </div>
    </div>
  );
}