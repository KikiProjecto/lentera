"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { GUARDIANS, VICE_MONSTERS, type CharacterConfig, type ViceMonster } from "@/data/characters";
import type { GameState } from "@/lib/game-engine";
import { 
  Play, ChevronLeft, ChevronRight,
  Trophy, Zap, X
} from "lucide-react";

export default function GamePage() {
  const [selectedGuardian, setSelectedGuardian] = useState<CharacterConfig>(GUARDIANS[0]);
  const [currentEnemy, setCurrentEnemy] = useState<ViceMonster>(VICE_MONSTERS[0]);
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    currentQuest: 0,
    streak: 0,
    score: 0,
    energy: 100,
    level: 1,
    xp: 0,
  });
  const [selectedAbility, setSelectedAbility] = useState<number | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [showVictory, setShowVictory] = useState(false);
  const [gameEngineProps] = useState(() => ({
    characters: GUARDIANS,
    onStateChange: setGameState,
    onBattleStart: (enemy: ViceMonster) => {
      setCurrentEnemy(enemy);
      setBattleLog([]);
    },
    onBattleEnd: (won: boolean, rewards: { tokens: number; xp: number }) => {
      if (won) {
        setShowVictory(true);
        setBattleLog(prev => [...prev, `Victory! +${rewards.tokens} $LIT, +${rewards.xp} XP`]);
      }
    },
  }));

  const handleAbilityClick = (index: number) => {
    if (!gameState.isPlaying || selectedAbility !== null) return;
    setSelectedAbility(index);
    setBattleLog(prev => [...prev, `${selectedGuardian.name} uses ${selectedGuardian.abilities[index].name}!`]);
    
    setTimeout(() => {
      const damage = Math.floor(Math.random() * 50) + 50;
      setBattleLog(prev => [...prev, `Dealt ${damage} damage!`]);
      setSelectedAbility(null);
    }, 1000);
  };

  const startBattle = () => {
    setGameState(prev => ({ ...prev, isPlaying: true }));
    setBattleLog(["Battle started! Choose your ability!"]);
    setShowVictory(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" size="sm" className="!p-2">
            <ChevronLeft className="w-5 h-5" />
            Kembali
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Battle Arena */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-panel rounded-2xl overflow-hidden">
              {/* Battle Header */}
              <div className="flex justify-between items-center p-6 border-b border-dark-700/50">
                <div>
                  <h2 className="font-display text-2xl font-bold text-light-100">Battle Arena</h2>
                  <p className="text-light-400 text-sm">Kalahkan {currentEnemy.name}!</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-light-400 text-sm">Energy</div>
                    <div className="text-neon-cyan font-bold">{gameState.energy}/100</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-neon-yellow" />
                  </div>
                </div>
              </div>

              {/* Battle Field */}
              <div className="relative h-[400px] p-8">
                {/* Background */}
                <div className="absolute inset-0 bg-mesh-gradient opacity-50" />

                {/* Enemy */}
                <motion.div
                  className="absolute top-8 right-8"
                  animate={gameState.isPlaying ? {
                    x: [0, -5, 5, -5, 0],
                    transition: { duration: 0.2, repeat: Infinity }
                  } : undefined}
                >
                  <div 
                    className="w-32 h-32 rounded-2xl flex items-center justify-center text-7xl"
                    style={{
                      background: `${currentEnemy.color}20`,
                      border: `2px solid ${currentEnemy.color}`,
                    }}
                  >
                    {currentEnemy.type === "slot" ? "🎰" : 
                     currentEnemy.type === "rug" ? "😈" : 
                     currentEnemy.type === "fomo" ? "👻" : 
                     "👺"}
                  </div>
                  <div className="text-center mt-2">
                    <div className="font-bold text-light-100">{currentEnemy.name}</div>
                    <div className="h-2 w-32 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-vice-slot to-vice-rug"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Player Character */}
                <motion.div
                  className="absolute bottom-8 left-8"
                  animate={selectedAbility !== undefined ? {
                    x: [0, 50, 0],
                    transition: { duration: 0.3 }
                  } : undefined}
                >
                  <div 
                    className="w-32 h-32 rounded-2xl flex items-center justify-center text-7xl"
                    style={{
                      background: `linear-gradient(135deg, ${selectedGuardian.color}30, ${selectedGuardian.secondaryColor}20)`,
                      border: `2px solid ${selectedGuardian.color}`,
                    }}
                  >
                    {selectedGuardian.element === "earth" ? "🦎" : 
                     selectedGuardian.element === "void" ? "🦉" : 
                     selectedGuardian.element === "air" ? "🦧" : 
                     selectedGuardian.element === "water" ? "💎" : 
                     selectedGuardian.element === "fire" ? "🔥" : "☀️"}
                  </div>
                  <div className="text-center mt-2">
                    <div className="font-bold text-light-100">{selectedGuardian.name}</div>
                    <div className="h-2 w-32 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                        style={{ width: "80%" }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* VS Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-dark-900 border-2 border-neon-pink flex items-center justify-center">
                    <span className="text-neon-pink font-bold text-xl">VS</span>
                  </div>
                </div>
              </div>

              {/* Abilities */}
              <div className="p-6 border-t border-dark-700/50">
                <h4 className="font-semibold text-light-100 mb-4">Kemampuan</h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedGuardian.abilities.map((ability, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAbilityClick(index)}
                      disabled={!gameState.isPlaying || selectedAbility !== null}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedAbility === index
                          ? "border-neon-cyan bg-neon-cyan/20"
                          : "border-dark-600 hover:border-neon-cyan/50"
                      }`}
                    >
                      <div className="text-neon-cyan font-semibold text-sm">{ability.name}</div>
                      <div className="text-light-400 text-xs">{ability.cooldown}s CD</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Battle Log */}
              <div className="p-4 border-t border-dark-700/50 bg-dark-900/50">
                <div className="h-24 overflow-y-auto space-y-1">
                  {battleLog.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-light-300 text-sm"
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Start Button */}
            <div className="glass-panel p-6 rounded-xl text-center">
              {!gameState.isPlaying ? (
                <Button size="lg" onClick={startBattle} className="w-full">
                  <Play className="w-5 h-5 mr-2" />
                  Mulai Battle
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button 
                    variant="danger" 
                    size="lg" 
                    onClick={() => setGameState(prev => ({ ...prev, isPlaying: false }))}
                    className="w-full"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Surrender
                  </Button>
                </div>
              )}
            </div>

            {/* Victory Modal */}
            <AnimatePresence>
              {showVictory && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-panel p-6 rounded-xl text-center neon-border"
                >
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-neon-yellow" />
                  <h3 className="font-display text-2xl font-bold text-neon-cyan mb-2">VICTORY!</h3>
                  <p className="text-light-300 mb-4">Kau telah mengalahkan {currentEnemy.name}!</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-light-400">Tokens</span>
                      <span className="text-neon-cyan">+{currentEnemy.reward.tokens} $LIT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-light-400">XP</span>
                      <span className="text-neon-purple">+{currentEnemy.reward.xp}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <ChevronRight className="w-5 h-5 mr-2" />
                    Lanjutkan
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Select Character */}
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="font-semibold text-light-100 mb-4">Pilih Guardian</h3>
              <div className="space-y-3">
                {GUARDIANS.map((guardian) => (
                  <motion.button
                    key={guardian.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedGuardian(guardian)}
                    disabled={gameState.isPlaying}
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                      selectedGuardian.id === guardian.id
                        ? "border-neon-cyan bg-neon-cyan/10"
                        : "border-dark-600 hover:border-dark-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${guardian.color}20` }}
                      >
                        {guardian.element === "earth" ? "🦎" : guardian.element === "void" ? "🦉" : "🦧"}
                      </div>
                      <div>
                        <div className="text-light-100 text-sm font-medium">{guardian.name}</div>
                        <div className="text-light-400 text-xs">{guardian.role}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Select Enemy */}
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="font-semibold text-light-100 mb-4">Pilih Musuh</h3>
              <div className="space-y-3">
                {VICE_MONSTERS.map((vice) => (
                  <motion.button
                    key={vice.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setCurrentEnemy(vice)}
                    disabled={gameState.isPlaying}
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                      currentEnemy.id === vice.id
                        ? "border-vice-rug bg-vice-rug/10"
                        : "border-dark-600 hover:border-dark-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${vice.color}20` }}
                      >
                        {vice.type === "slot" ? "🎰" : vice.type === "rug" ? "😈" : "👻"}
                      </div>
                      <div>
                        <div className="text-light-100 text-sm font-medium">{vice.name}</div>
                        <div className="text-light-400 text-xs">Difficulty: {vice.difficulty}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}