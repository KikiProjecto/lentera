"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import type { Quest } from "@/data/quests";
import { 
  X, Check, ChevronRight, 
  Zap, Clock, Trophy, AlertCircle
} from "lucide-react";

interface QuestModalProps {
  quest: Quest | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (rewards: { tokens: number; xp: number }) => void;
}

export default function QuestModal({ quest, isOpen, onClose, onComplete }: QuestModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Functions must be defined BEFORE they are used in useEffect
  const finishQuest = () => {
    if (!quest) return;
    setIsFinished(true);
    const percentage = (correctCount / quest.questions.length) * 100;
    const passed = percentage >= 70;
    
    if (passed) {
      const rewards = {
        tokens: quest.rewards.tokens,
        xp: quest.rewards.xp,
      };
      onComplete(rewards);
    }
  };

  const handleAnswer = (index: number) => {
    if (showResult || !quest) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === quest.questions[currentQuestion].correctIndex) {
      setCorrectCount(c => c + 1);
    }
  };

  const handleNext = () => {
    if (!quest) return;
    if (currentQuestion < quest.questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      finishQuest();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize quest
  useEffect(() => {
    if (quest && isOpen) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setCorrectCount(0);
      setTimeLeft(quest.timeLimit);
      setIsFinished(false);
    }
  }, [quest, isOpen]);

  // Timer
  useEffect(() => {
    if (isOpen && timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished && quest) {
      finishQuest();
    }
  }, [timeLeft, isOpen, isFinished, quest]);

  if (!quest) return null;

  const question = quest.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quest.questions.length) * 100;
  const isPassed = correctCount / quest.questions.length >= 0.7;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-lg"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl glass-panel rounded-2xl overflow-hidden"
          >
            {!isFinished ? (
              <>
                <div className="flex justify-between items-center p-6 border-b border-dark-700/50">
                  <div>
                    <h2 className="font-display text-xl font-bold text-light-100">{quest.title}</h2>
                    <p className="text-light-400 text-sm">Pertanyaan {currentQuestion + 1}/{quest.questions.length}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      timeLeft < 60 ? "bg-vice-slot/20 text-vice-slot" : "bg-dark-700 text-light-300"
                    }`}>
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">{formatTime(timeLeft)}</span>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
                      <X className="w-5 h-5 text-light-400" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="h-2 bg-dark-700 rounded-full mb-6 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-light-100 mb-6">{question.question}</h3>
                    
                    <div className="space-y-3">
                      {question.options.map((option, index) => {
                        let buttonClass = "p-4 rounded-xl border-2 text-left transition-all ";
                        
                        if (showResult) {
                          if (index === question.correctIndex) {
                            buttonClass += "border-neon-cyan bg-neon-cyan/20";
                          } else if (index === selectedAnswer) {
                            buttonClass += "border-vice-slot bg-vice-slot/20";
                          } else {
                            buttonClass += "border-dark-600 opacity-50";
                          }
                        } else {
                          buttonClass += selectedAnswer === index 
                            ? "border-neon-cyan bg-neon-cyan/10" 
                            : "border-dark-600 hover:border-neon-cyan/50";
                        }

                        return (
                          <motion.button
                            key={index}
                            whileHover={!showResult ? { scale: 1.01 } : {}}
                            onClick={() => handleAnswer(index)}
                            disabled={showResult}
                            className={buttonClass}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                                showResult && index === question.correctIndex
                                  ? "bg-neon-cyan text-dark-950"
                                  : showResult && index === selectedAnswer && index !== question.correctIndex
                                    ? "bg-vice-slot text-white"
                                    : "bg-dark-700 text-light-300"
                              }`}>
                                {showResult && index === question.correctIndex ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  String.fromCharCode(65 + index)
                                )}
                              </div>
                              <span className="text-light-100">{option}</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-4 rounded-xl ${
                          selectedAnswer === question.correctIndex
                            ? "bg-neon-cyan/10 border border-neon-cyan/30"
                            : "bg-vice-slot/10 border border-vice-slot/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className={`w-5 h-5 mt-0.5 ${
                            selectedAnswer === question.correctIndex ? "text-neon-cyan" : "text-vice-slot"
                          }`} />
                          <div>
                            <p className={`font-semibold ${
                              selectedAnswer === question.correctIndex ? "text-neon-cyan" : "text-vice-slot"
                            }`}>
                              {selectedAnswer === question.correctIndex ? "Benar!" : "Salah!"}
                            </p>
                            <p className="text-light-300 text-sm mt-1">{question.explanation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="p-6 border-t border-dark-700/50 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-light-400 text-sm">
                      <Trophy className="w-4 h-4 text-neon-yellow" />
                      <span>{quest.rewards.tokens} $LIT</span>
                    </div>
                    <div className="flex items-center gap-2 text-light-400 text-sm">
                      <Zap className="w-4 h-4 text-neon-purple" />
                      <span>{quest.rewards.xp} XP</span>
                    </div>
                  </div>
                  
                  {showResult && (
                    <Button onClick={handleNext}>
                      {currentQuestion < quest.questions.length - 1 ? "Selanjutnya" : "Selesai"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                {isPassed ? (
                  <>
                    <Trophy className="w-20 h-20 mx-auto mb-4 text-neon-yellow" />
                    <h2 className="font-display text-3xl font-bold text-neon-cyan mb-2">LULUS!</h2>
                    <p className="text-light-300 mb-6">
                      Kamu menjawab {correctCount} dari {quest.questions.length} dengan benar!
                    </p>
                    <div className="flex justify-center gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-neon-cyan">+{quest.rewards.tokens}</div>
                        <div className="text-light-400 text-sm">$LIT</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-neon-purple">+{quest.rewards.xp}</div>
                        <div className="text-light-400 text-sm">XP</div>
                      </div>
                    </div>
                    <Button onClick={onClose}>
                      Terimalah Reward
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </>
                ) : (
                  <>
                    <X className="w-20 h-20 mx-auto mb-4 text-vice-slot" />
                    <h2 className="font-display text-3xl font-bold text-vice-slot mb-2">GAGAL</h2>
                    <p className="text-light-300 mb-6">
                      Kamu hanya menjawab {correctCount} dari {quest.questions.length} dengan benar.
                      <br />
                      Kamu perlu 70% untuk lulus!
                    </p>
                    <Button onClick={onClose}>
                      Coba Lagi Nanti
                    </Button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}