"use client";

import { createContext, useContext, useReducer, useCallback, ReactNode, useEffect } from "react";
import type { CharacterConfig, ViceMonster } from "@/data/characters";
import type { Quest } from "@/data/quests";

export type GameMode = "menu" | "battle" | "quest" | "exploration" | "shop";

export interface PlayerProfile {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  tokens: number;
  gems: number;
  streak: number;
  longestStreak: number;
  totalWins: number;
  totalQuestsCompleted: number;
  guild: string | null;
  createdAt: number;
}

export interface BattleState {
  isActive: boolean;
  playerHealth: number;
  playerMaxHealth: number;
  enemyHealth: number;
  enemyMaxHealth: number;
  turn: "player" | "enemy";
  selectedGuardian: CharacterConfig | null;
  currentEnemy: ViceMonster | null;
  battleLog: string[];
  isProcessing: boolean;
}

export interface QuestState {
  activeQuest: Quest | null;
  currentQuestion: number;
  answers: number[];
  timeRemaining: number;
  isCompleted: boolean;
  score: number;
}

export interface GameState {
  mode: GameMode;
  player: PlayerProfile;
  battle: BattleState;
  quest: QuestState;
  unlockedGuardians: string[];
  selectedGuardianId: string | null;
  inventory: GameInventory;
  achievements: Achievement[];
  dailyQuests: DailyQuestStatus[];
  lastPlayedAt: number | null;
}

export interface GameInventory {
  skins: string[];
  potions: number;
  shields: number;
  boosters: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
  progress: number;
  target: number;
}

export interface DailyQuestStatus {
  questId: string;
  progress: number;
  completed: boolean;
  claimed: boolean;
}

type GameAction =
  | { type: "SET_MODE"; payload: GameMode }
  | { type: "START_BATTLE"; payload: { guardian: CharacterConfig; enemy: ViceMonster } }
  | { type: "END_BATTLE"; payload: { won: boolean; rewards: { tokens: number; xp: number } } }
  | { type: "PLAYER_ATTACK"; payload: { damage: number; ability: string } }
  | { type: "ENEMY_ATTACK"; payload: { damage: number } }
  | { type: "SET_BATTLE_TURN"; payload: "player" | "enemy" }
  | { type: "START_QUEST"; payload: Quest }
  | { type: "ANSWER_QUESTION"; payload: { correct: boolean; answer: number } }
  | { type: "COMPLETE_QUEST"; payload: { passed: boolean; rewards: { tokens: number; xp: number } } }
  | { type: "ADD_TOKENS"; payload: number }
  | { type: "ADD_XP"; payload: number }
  | { type: "UPDATE_STREAK"; payload: number }
  | { type: "UNLOCK_GUARDIAN"; payload: string }
  | { type: "SELECT_GUARDIAN"; payload: string }
  | { type: "ADD_ACHIEVEMENT"; payload: Achievement }
  | { type: "UPDATE_ACHIEVEMENT"; payload: { id: string; progress: number } }
  | { type: "CLAIM_DAILY_QUEST"; payload: string }
  | { type: "USE_ITEM"; payload: "potion" | "shield" | "booster" }
  | { type: "LOAD_STATE"; payload: GameState }
  | { type: "RESET_GAME" };

const calculateXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

const initialPlayer: PlayerProfile = {
  id: "player-1",
  username: "Guardian",
  avatar: "🧑‍🎮",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  tokens: 0,
  gems: 0,
  streak: 0,
  longestStreak: 0,
  totalWins: 0,
  totalQuestsCompleted: 0,
  guild: null,
  createdAt: Date.now(),
};

const initialState: GameState = {
  mode: "menu",
  player: initialPlayer,
  battle: {
    isActive: false,
    playerHealth: 100,
    playerMaxHealth: 100,
    enemyHealth: 100,
    enemyMaxHealth: 100,
    turn: "player",
    selectedGuardian: null,
    currentEnemy: null,
    battleLog: [],
    isProcessing: false,
  },
  quest: {
    activeQuest: null,
    currentQuestion: 0,
    answers: [],
    timeRemaining: 0,
    isCompleted: false,
    score: 0,
  },
  unlockedGuardians: ["komodo"],
  selectedGuardianId: "komodo",
  inventory: {
    skins: [],
    potions: 3,
    shields: 1,
    boosters: 0,
  },
  achievements: [
    { id: "first-win", name: "First Victory", description: "Win your first battle", icon: "🏆", unlockedAt: null, progress: 0, target: 1 },
    { id: "streak-7", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", unlockedAt: null, progress: 0, target: 7 },
    { id: "quest-10", name: "Scholar", description: "Complete 10 quests", icon: "📚", unlockedAt: null, progress: 0, target: 10 },
    { id: "level-10", name: "Rising Star", description: "Reach level 10", icon: "⭐", unlockedAt: null, progress: 1, target: 10 },
  ],
  dailyQuests: [],
  lastPlayedAt: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.payload, lastPlayedAt: Date.now() };

    case "START_BATTLE": {
      const enemy = action.payload.enemy;
      return {
        ...state,
        mode: "battle",
        battle: {
          isActive: true,
          playerHealth: 100,
          playerMaxHealth: 100,
          enemyHealth: enemy.health,
          enemyMaxHealth: enemy.health,
          turn: "player",
          selectedGuardian: action.payload.guardian,
          currentEnemy: enemy,
          battleLog: [`⚔️ Battle started against ${enemy.name}!`],
          isProcessing: false,
        },
      };
    }

    case "PLAYER_ATTACK": {
      const newEnemyHealth = Math.max(0, state.battle.enemyHealth - action.payload.damage);
      const battleLog = [...state.battle.battleLog, 
        `⚔️ ${state.battle.selectedGuardian?.name} uses ${action.payload.ability} for ${action.payload.damage} damage!`
      ];
      
      return {
        ...state,
        battle: {
          ...state.battle,
          enemyHealth: newEnemyHealth,
          battleLog,
          turn: "enemy",
          isProcessing: false,
        },
      };
    }

    case "ENEMY_ATTACK": {
      const newPlayerHealth = Math.max(0, state.battle.playerHealth - action.payload.damage);
      const battleLog = [...state.battle.battleLog, 
        `👹 ${state.battle.currentEnemy?.name} attacks for ${action.payload.damage} damage!`
      ];
      
      return {
        ...state,
        battle: {
          ...state.battle,
          playerHealth: newPlayerHealth,
          battleLog,
          turn: "player",
          isProcessing: false,
        },
      };
    }

    case "END_BATTLE": {
      let newState = { ...state, mode: "menu" as GameMode };
      
      if (action.payload.won) {
        newState.player = {
          ...state.player,
          tokens: state.player.tokens + action.payload.rewards.tokens,
          xp: state.player.xp + action.payload.rewards.xp,
          totalWins: state.player.totalWins + 1,
        };

        // Check level up
        if (newState.player.xp >= newState.player.xpToNextLevel) {
          newState.player = {
            ...newState.player,
            level: newState.player.level + 1,
            xp: newState.player.xp - newState.player.xpToNextLevel,
            xpToNextLevel: calculateXPForLevel(newState.player.level + 1),
          };
        }
      }

      return newState;
    }

    case "START_QUEST":
      return {
        ...state,
        mode: "quest",
        quest: {
          activeQuest: action.payload,
          currentQuestion: 0,
          answers: [],
          timeRemaining: action.payload.timeLimit,
          isCompleted: false,
          score: 0,
        },
      };

    case "ANSWER_QUESTION": {
      const newAnswers = [...state.quest.answers, action.payload.answer];
      const newScore = action.payload.correct ? state.quest.score + 1 : state.quest.score;
      const isLastQuestion = state.quest.currentQuestion >= (state.quest.activeQuest?.questions.length || 0) - 1;
      
      return {
        ...state,
        quest: {
          ...state.quest,
          answers: newAnswers,
          score: newScore,
          currentQuestion: isLastQuestion ? state.quest.currentQuestion : state.quest.currentQuestion + 1,
        },
      };
    }

    case "COMPLETE_QUEST": {
      const passed = action.payload.passed;
      let newState = { ...state, mode: "menu" as GameMode };
      
      if (passed) {
        newState.player = {
          ...state.player,
          tokens: state.player.tokens + action.payload.rewards.tokens,
          xp: state.player.xp + action.payload.rewards.xp,
          totalQuestsCompleted: state.player.totalQuestsCompleted + 1,
        };

        if (newState.player.xp >= newState.player.xpToNextLevel) {
          newState.player = {
            ...newState.player,
            level: newState.player.level + 1,
            xp: newState.player.xp - newState.player.xpToNextLevel,
            xpToNextLevel: calculateXPForLevel(newState.player.level + 1),
          };
        }
      }

      return newState;
    }

    case "ADD_TOKENS":
      return {
        ...state,
        player: { ...state.player, tokens: state.player.tokens + action.payload },
      };

    case "ADD_XP": {
      let newXp = state.player.xp + action.payload;
      let newLevel = state.player.level;
      let newXpToNext = state.player.xpToNextLevel;
      
      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel++;
        newXpToNext = calculateXPForLevel(newLevel);
      }
      
      return {
        ...state,
        player: {
          ...state.player,
          xp: newXp,
          level: newLevel,
          xpToNextLevel: newXpToNext,
        },
      };
    }

    case "UPDATE_STREAK": {
      const newStreak = action.payload;
      const longestStreak = Math.max(state.player.longestStreak, newStreak);
      return {
        ...state,
        player: { ...state.player, streak: newStreak, longestStreak },
      };
    }

    case "UNLOCK_GUARDIAN":
      if (state.unlockedGuardians.includes(action.payload)) return state;
      return {
        ...state,
        unlockedGuardians: [...state.unlockedGuardians, action.payload],
      };

    case "SELECT_GUARDIAN":
      return { ...state, selectedGuardianId: action.payload };

    case "ADD_ACHIEVEMENT":
      return {
        ...state,
        achievements: [...state.achievements, action.payload],
      };

    case "UPDATE_ACHIEVEMENT": {
      const achievements = state.achievements.map((a) =>
        a.id === action.payload.id
          ? { ...a, progress: Math.min(action.payload.progress, a.target) }
          : a
      );
      
      // Check for newly unlocked achievements
      const newlyUnlocked = achievements.filter(
        (a) => a.progress >= a.target && a.unlockedAt === null
      );
      
      let finalAchievements = achievements;
      if (newlyUnlocked.length > 0) {
        finalAchievements = achievements.map((a) =>
          newlyUnlocked.find((n) => n.id === a.id)
            ? { ...a, unlockedAt: Date.now() }
            : a
        );
      }
      
      return { ...state, achievements: finalAchievements };
    }

    case "CLAIM_DAILY_QUEST": {
      const dailyQuests = state.dailyQuests.map((dq) =>
        dq.questId === action.payload ? { ...dq, claimed: true } : dq
      );
      return { ...state, dailyQuests };
    }

    case "USE_ITEM": {
      const inventory = { ...state.inventory };
      if (action.payload === "potion" && inventory.potions > 0) {
        inventory.potions--;
      } else if (action.payload === "shield" && inventory.shields > 0) {
        inventory.shields--;
      } else if (action.payload === "booster" && inventory.boosters > 0) {
        inventory.boosters--;
      }
      return { ...state, inventory };
    }

    case "LOAD_STATE":
      return action.payload;

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startBattle: (guardian: CharacterConfig, enemy: ViceMonster) => void;
  attack: (damage: number, ability: string) => void;
  enemyAttack: (damage: number) => void;
  endBattle: (won: boolean) => void;
  startQuest: (quest: Quest) => void;
  answerQuestion: (correct: boolean, answer: number) => void;
  completeQuest: (passed: boolean) => void;
  selectGuardian: (guardianId: string) => void;
  addTokens: (amount: number) => void;
  useItem: (item: "potion" | "shield" | "booster") => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem("lentera-game-state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: "LOAD_STATE", payload: { ...initialState, ...parsed } });
      } catch (e) {
        console.error("Failed to load game state:", e);
      }
    }
  }, []);

  // Save state on change
  useEffect(() => {
    localStorage.setItem("lentera-game-state", JSON.stringify(state));
  }, [state]);

  const startBattle = useCallback((guardian: CharacterConfig, enemy: ViceMonster) => {
    dispatch({ type: "START_BATTLE", payload: { guardian, enemy } });
  }, []);

  const attack = useCallback((damage: number, ability: string) => {
    dispatch({ type: "PLAYER_ATTACK", payload: { damage, ability } });
  }, []);

  const enemyAttack = useCallback((damage: number) => {
    dispatch({ type: "ENEMY_ATTACK", payload: { damage } });
  }, []);

  const endBattle = useCallback((won: boolean) => {
    const rewards = won ? { tokens: 25, xp: 50 } : { tokens: 0, xp: 10 };
    dispatch({ type: "END_BATTLE", payload: { won, rewards } });
    
    if (won) {
      dispatch({ type: "UPDATE_ACHIEVEMENT", payload: { id: "first-win", progress: state.player.totalWins + 1 } });
    }
  }, [state.player.totalWins]);

  const startQuest = useCallback((quest: Quest) => {
    dispatch({ type: "START_QUEST", payload: quest });
  }, []);

  const answerQuestion = useCallback((correct: boolean, answer: number) => {
    dispatch({ type: "ANSWER_QUESTION", payload: { correct, answer } });
  }, []);

  const completeQuest = useCallback((passed: boolean) => {
    const rewards = passed ? { tokens: 50, xp: 100 } : { tokens: 0, xp: 25 };
    dispatch({ type: "COMPLETE_QUEST", payload: { passed, rewards } });
  }, []);

  const selectGuardian = useCallback((guardianId: string) => {
    dispatch({ type: "SELECT_GUARDIAN", payload: guardianId });
  }, []);

  const addTokens = useCallback((amount: number) => {
    dispatch({ type: "ADD_TOKENS", payload: amount });
  }, []);

  const useItem = useCallback((item: "potion" | "shield" | "booster") => {
    dispatch({ type: "USE_ITEM", payload: item });
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        startBattle,
        attack,
        enemyAttack,
        endBattle,
        startQuest,
        answerQuestion,
        completeQuest,
        selectGuardian,
        addTokens,
        useItem,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

export type { GameAction };