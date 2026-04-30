"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Quest } from "@/data/quests";
import { Clock, Star, Zap, Trophy, Lock, CheckCircle, BookOpen, DollarSign } from "lucide-react";

interface QuestCardProps {
  quest: Quest;
  onStart?: () => void;
  isCompleted?: boolean;
  isLocked?: boolean;
}

const DIFFICULTY_LABELS = {
  1: "easy",
  2: "medium", 
  3: "hard",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-green-400 border-green-500/50 bg-green-500/10",
  medium: "text-yellow-400 border-yellow-500/50 bg-yellow-500/10",
  hard: "text-orange-400 border-orange-500/50 bg-orange-500/10",
  expert: "text-red-400 border-red-500/50 bg-red-500/10",
};

export function QuestCard({ quest, onStart, isCompleted = false, isLocked = false }: QuestCardProps) {
  const timeLimitMinutes = quest.timeLimit;
  const hours = Math.floor(timeLimitMinutes / 60);
  const minutes = timeLimitMinutes % 60;
  const timeString = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <motion.div
      className={cn(
        "relative rounded-xl border overflow-hidden transition-all",
        isCompleted
          ? "border-green-500/50 bg-green-500/10"
          : isLocked
          ? "border-dark-700 bg-dark-800/50 opacity-60"
          : "border-dark-700 bg-dark-900 hover:border-dark-600"
      )}
      whileHover={!isLocked && !isCompleted ? { scale: 1.02 } : undefined}
    >
      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-dark-900/50">
          <div className="flex items-center gap-2 text-dark-400">
            <Lock className="w-5 h-5" />
            <span className="text-sm">Locked</span>
          </div>
        </div>
      )}

      {/* Completed check */}
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <CheckCircle className="w-6 h-6 text-green-400" />
        </div>
      )}

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-xl">
{quest.category === "budget" && "💰"}
            {quest.category === "saving" && "🏦"}
            {quest.category === "investing" && "📈"}
            {quest.category === "debt" && "📊"}
            {quest.category === "scam" && "🚨"}
            </div>
            <div>
              <h3 className="font-bold text-light-100">{quest.title}</h3>
              <span className={cn("text-xs px-2 py-0.5 rounded-full border", DIFFICULTY_COLORS[DIFFICULTY_LABELS[quest.difficulty as keyof typeof DIFFICULTY_LABELS]])}>
                {DIFFICULTY_LABELS[quest.difficulty as keyof typeof DIFFICULTY_LABELS]}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-dark-400 line-clamp-2">{quest.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-dark-500">
          {quest.timeLimit > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{timeString}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{quest.questions.length} questions</span>
          </div>
        </div>

        {/* Rewards */}
        <div className="flex items-center gap-4 pt-2 border-t border-dark-800">
          <div className="flex items-center gap-1 text-teal-400">
            <DollarSign className="w-4 h-4" />
            <span className="font-bold">{quest.rewards.tokens}</span>
            <span className="text-xs">$LIT</span>
          </div>
          <div className="flex items-center gap-1 text-blue-400">
            <Zap className="w-4 h-4" />
            <span className="font-bold">{quest.rewards.xp}</span>
            <span className="text-xs">XP</span>
          </div>
        </div>

        {/* Action */}
        {!isLocked && !isCompleted && onStart && (
          <motion.button
            className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-dark-950 font-bold text-sm"
            onClick={onStart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Quest
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

interface QuestCategoryTabProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  completedCounts: Record<string, number>;
  totalCounts: Record<string, number>;
}

export function QuestCategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  completedCounts,
  totalCounts,
}: QuestCategoryTabProps) {
  const icons: Record<string, string> = {
    budget: "💰",
    saving: "🏦",
    investment: "📈",
    debt: "📊",
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <motion.button
          key={category}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            activeCategory === category
              ? "bg-cyan-500 text-dark-950"
              : "bg-dark-800 text-dark-400 hover:bg-dark-700"
          )}
          onClick={() => onCategoryChange(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{icons[category]}</span>
          <span className="capitalize">{category}</span>
          <span className="text-xs opacity-70">
            ({completedCounts[category] || 0}/{totalCounts[category] || 0})
          </span>
        </motion.button>
      ))}
    </div>
  );
}

interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedAnswer?: number;
  onAnswer: (index: number) => void;
  showResult?: boolean;
  correctAnswer?: number;
}

export function QuizQuestion({
  question,
  options,
  selectedAnswer,
  onAnswer,
  showResult = false,
  correctAnswer,
}: QuizQuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-light-100">{question}</h3>
      <div className="space-y-2">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = showResult && correctAnswer === index;
          const isWrong = showResult && isSelected && correctAnswer !== index;

          return (
            <motion.button
              key={index}
              className={cn(
                "w-full p-4 rounded-lg border text-left transition-all",
                showResult
                  ? isCorrect
                    ? "border-green-500 bg-green-500/20 text-green-400"
                    : isWrong
                    ? "border-red-500 bg-red-500/20 text-red-400"
                    : "border-dark-700 bg-dark-800 text-dark-400"
                  : isSelected
                  ? "border-cyan-500 bg-cyan-500/20 text-light-100"
                  : "border-dark-700 bg-dark-900 text-dark-300 hover:bg-dark-800"
              )}
              onClick={() => !showResult && onAnswer(index)}
              whileHover={!showResult ? { scale: 1.01 } : undefined}
              whileTap={!showResult ? { scale: 0.99 } : undefined}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}