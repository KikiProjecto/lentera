"use client";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: "common" | "rare" | "epic" | "legendary";
  requirement: AchievementRequirement;
  rewards: AchievementRewards;
  unlockedAt: number | null;
  progress: number;
}

export type AchievementCategory = 
  | "battle" 
  | "quest" 
  | "streak" 
  | "social" 
  | "collection"
  | "milestone";

export interface AchievementRequirement {
  type: "wins" | "quests" | "streak" | "level" | "guardians" | "monsters" | "tokens";
  target: number;
}

export interface AchievementRewards {
  tokens: number;
  xp: number;
  gems?: number;
  title?: string;
}

export interface ProgressionTier {
  level: number;
  title: string;
  requiredXP: number;
  rewards: {
    tokens: number;
    gems: number;
    unlock: string[];
  };
  badge: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: "battle" | "quest" | "streak";
  target: number;
  progress: number;
  completed: boolean;
  rewards: AchievementRewards;
  expiresAt: number;
}

export interface SeasonInfo {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
  theme: string;
  rewards: {
    rank1: AchievementRewards;
    top10: AchievementRewards;
    participation: AchievementRewards;
  };
}

// ACHIEVEMENTS DATABASE
export const ACHIEVEMENTS: Achievement[] = [
  // Battle Achievements
  {
    id: "first-blood",
    name: "First Blood",
    description: "Win your first battle",
    icon: "⚔️",
    category: "battle",
    rarity: "common",
    requirement: { type: "wins", target: 1 },
    rewards: { tokens: 10, xp: 25 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "warrior-10",
    name: "Warrior",
    description: "Win 10 battles",
    icon: "🗡️",
    category: "battle",
    rarity: "common",
    requirement: { type: "wins", target: 10 },
    rewards: { tokens: 50, xp: 100 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "veteran-50",
    name: "Veteran",
    description: "Win 50 battles",
    icon: "🏅",
    category: "battle",
    rarity: "rare",
    requirement: { type: "wins", target: 50 },
    rewards: { tokens: 200, xp: 500, gems: 5 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "champion-100",
    name: "Champion",
    description: "Win 100 battles",
    icon: "👑",
    category: "battle",
    rarity: "epic",
    requirement: { type: "wins", target: 100 },
    rewards: { tokens: 500, xp: 1000, gems: 15 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "legend-500",
    name: "Legend",
    description: "Win 500 battles",
    icon: "⭐",
    category: "battle",
    rarity: "legendary",
    requirement: { type: "wins", target: 500 },
    rewards: { tokens: 2000, xp: 5000, gems: 50, title: "Battle Legend" },
    unlockedAt: null,
    progress: 0,
  },

  // Quest Achievements
  {
    id: "scholar-first",
    name: "First Steps",
    description: "Complete your first quest",
    icon: "📝",
    category: "quest",
    rarity: "common",
    requirement: { type: "quests", target: 1 },
    rewards: { tokens: 10, xp: 25 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "scholar-10",
    name: "Scholar",
    description: "Complete 10 quests",
    icon: "📚",
    category: "quest",
    rarity: "common",
    requirement: { type: "quests", target: 10 },
    rewards: { tokens: 50, xp: 100 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "scholar-50",
    name: "Expert Scholar",
    description: "Complete 50 quests",
    icon: "🎓",
    category: "quest",
    rarity: "rare",
    requirement: { type: "quests", target: 50 },
    rewards: { tokens: 200, xp: 500, gems: 5 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "scholar-100",
    name: "Master Scholar",
    description: "Complete 100 quests",
    icon: "🏆",
    category: "quest",
    rarity: "epic",
    requirement: { type: "quests", target: 100 },
    rewards: { tokens: 500, xp: 1000, gems: 15 },
    unlockedAt: null,
    progress: 0,
  },

  // Streak Achievements
  {
    id: "streak-3",
    name: "Getting Started",
    description: "Maintain a 3-day streak",
    icon: "🔥",
    category: "streak",
    rarity: "common",
    requirement: { type: "streak", target: 3 },
    rewards: { tokens: 15, xp: 30 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "💪",
    category: "streak",
    rarity: "common",
    requirement: { type: "streak", target: 7 },
    rewards: { tokens: 50, xp: 100 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "streak-30",
    name: "Monthly Master",
    description: "Maintain a 30-day streak",
    icon: "🌟",
    category: "streak",
    rarity: "rare",
    requirement: { type: "streak", target: 30 },
    rewards: { tokens: 300, xp: 750, gems: 10 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "streak-100",
    name: "Unstoppable",
    description: "Maintain a 100-day streak",
    icon: "🚀",
    category: "streak",
    rarity: "legendary",
    requirement: { type: "streak", target: 100 },
    rewards: { tokens: 1500, xp: 3000, gems: 30, title: "Unstoppable" },
    unlockedAt: null,
    progress: 0,
  },

  // Level Achievements
  {
    id: "level-5",
    name: "Rising Guardian",
    description: "Reach level 5",
    icon: "⭐",
    category: "milestone",
    rarity: "common",
    requirement: { type: "level", target: 5 },
    rewards: { tokens: 25, xp: 50 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "level-10",
    name: "Established Guardian",
    description: "Reach level 10",
    icon: "⭐⭐",
    category: "milestone",
    rarity: "common",
    requirement: { type: "level", target: 10 },
    rewards: { tokens: 100, xp: 200 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "level-25",
    name: "Elite Guardian",
    description: "Reach level 25",
    icon: "💎",
    category: "milestone",
    rarity: "rare",
    requirement: { type: "level", target: 25 },
    rewards: { tokens: 300, xp: 600, gems: 10 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "level-50",
    name: "Legendary Guardian",
    description: "Reach level 50",
    icon: "👑",
    category: "milestone",
    rarity: "legendary",
    requirement: { type: "level", target: 50 },
    rewards: { tokens: 1000, xp: 2000, gems: 25, title: "Legendary" },
    unlockedAt: null,
    progress: 0,
  },

  // Collection Achievements
  {
    id: "all-guardians",
    name: "Guardian Collector",
    description: "Unlock all guardians",
    icon: "🛡️",
    category: "collection",
    rarity: "epic",
    requirement: { type: "guardians", target: 5 },
    rewards: { tokens: 500, xp: 1000 },
    unlockedAt: null,
    progress: 0,
  },
  {
    id: "all-monsters",
    name: "Monster Hunter",
    description: "Defeat all monster types",
    icon: "👹",
    category: "collection",
    rarity: "epic",
    requirement: { type: "monsters", target: 4 },
    rewards: { tokens: 400, xp: 800 },
    unlockedAt: null,
    progress: 0,
  },
];

// PROGRESSION TIERS
export const PROGRESSION_TIERS: ProgressionTier[] = [
  { level: 1, title: "Newcomer", requiredXP: 0, rewards: { tokens: 0, gems: 0, unlock: ["komodo"] }, badge: "🌱" },
  { level: 2, title: "Apprentice", requiredXP: 100, rewards: { tokens: 10, gems: 0, unlock: [] }, badge: "🌿" },
  { level: 3, title: "Student", requiredXP: 300, rewards: { tokens: 25, gems: 0, unlock: ["owl"] }, badge: "📚" },
  { level: 4, title: "Practitioner", requiredXP: 600, rewards: { tokens: 50, gems: 1, unlock: [] }, badge: "⚔️" },
  { level: 5, title: "Adept", requiredXP: 1000, rewards: { tokens: 100, gems: 2, unlock: ["orangutan"] }, badge: "✨" },
  { level: 6, title: "Expert", requiredXP: 1750, rewards: { tokens: 150, gems: 3, unlock: [] }, badge: "🎯" },
  { level: 7, title: "Master", requiredXP: 2800, rewards: { tokens: 200, gems: 5, unlock: ["prism"] }, badge: "🔥" },
  { level: 8, title: "Grandmaster", requiredXP: 4200, rewards: { tokens: 300, gems: 7, unlock: ["flame"] }, badge: "💎" },
  { level: 9, title: "Legend", requiredXP: 6000, rewards: { tokens: 500, gems: 10, unlock: [] }, badge: "👑" },
  { level: 10, title: "Mythic", requiredXP: 10000, rewards: { tokens: 1000, gems: 25, unlock: ["mythic-skin"] }, badge: "⭐" },
];

// DAILY CHALLENGES TEMPLATE
export const DAILY_CHALLENGES = {
  "battle-3": {
    id: "battle-3",
    title: "Battle Champion",
    description: "Win 3 battles today",
    type: "battle" as const,
    target: 3,
  },
  "quest-1": {
    id: "quest-1",
    title: "Daily Scholar",
    description: "Complete 1 quest today",
    type: "quest" as const,
    target: 1,
  },
  "streak-1": {
    id: "streak-1",
    title: "Consistency",
    description: "Play at least once today",
    type: "streak" as const,
    target: 1,
  },
};

// SEASON INFO
export const CURRENT_SEASON: SeasonInfo = {
  id: "season-1",
  name: "Season of Light",
  startDate: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
  endDate: Date.now() + 53 * 24 * 60 * 60 * 1000, // 53 days from now
  theme: "light",
  rewards: {
    rank1: { tokens: 10000, xp: 20000, gems: 100, title: "Season Champion" },
    top10: { tokens: 5000, xp: 10000, gems: 50 },
    participation: { tokens: 100, xp: 200, gems: 1 },
  },
};

// Utility functions
export function calculateLevelFromXP(xp: number): number {
  for (let i = PROGRESSION_TIERS.length - 1; i >= 0; i--) {
    if (xp >= PROGRESSION_TIERS[i].requiredXP) {
      return PROGRESSION_TIERS[i].level;
    }
  }
  return 1;
}

export function getNextTierXP(level: number): number {
  const tier = PROGRESSION_TIERS.find(t => t.level === level + 1);
  return tier ? tier.requiredXP : PROGRESSION_TIERS[PROGRESSION_TIERS.length - 1].requiredXP;
}

export function calculateXPProgress(xp: number): { current: number; required: number; percentage: number } {
  const level = calculateLevelFromXP(xp);
  const currentTier = PROGRESSION_TIERS.find(t => t.level === level);
  const nextTier = PROGRESSION_TIERS.find(t => t.level === level + 1);
  
  const current = currentTier ? xp - currentTier.requiredXP : 0;
  const required = nextTier ? nextTier.requiredXP - (currentTier?.requiredXP || 0) : 1;
  const percentage = Math.min((current / required) * 100, 100);
  
  return { current, required, percentage };
}

export function getAchievementProgress(achievement: Achievement, state: {
  wins?: number;
  quests?: number;
  streak?: number;
  level?: number;
  guardians?: number;
  monsters?: number;
}): number {
  const value = state[achievement.requirement.type as keyof typeof state] || 0;
  return Math.min(value, achievement.requirement.target);
}

export function generateDailyChallenges(): DailyChallenge[] {
  const now = Date.now();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  
  return [
    {
      ...DAILY_CHALLENGES["battle-3"],
      id: `battle-3-${Date.now()}`,
      progress: 0,
      completed: false,
      rewards: { tokens: 25, xp: 50 },
      expiresAt: endOfDay.getTime(),
    },
    {
      ...DAILY_CHALLENGES["quest-1"],
      id: `quest-1-${Date.now()}`,
      progress: 0,
      completed: false,
      rewards: { tokens: 30, xp: 75 },
      expiresAt: endOfDay.getTime(),
    },
    {
      ...DAILY_CHALLENGES["streak-1"],
      id: `streak-1-${Date.now()}`,
      progress: 0,
      completed: false,
      rewards: { tokens: 15, xp: 25 },
      expiresAt: endOfDay.getTime(),
    },
  ];
}