import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import type { Wallet as WalletType } from "@solana/wallet-adapter-react";

export const LENTERA_PROGRAM_ID_STRING = "Lentera1111111111111111111111111111111";

export const GAME_STATE_SEED = "game_state";
export const PLAYER_SEED = "player";
export const TOKEN_MINT_SEED = "token_mint";
export const REWARDS_VAULT_SEED = "rewards_vault";

export interface GameState {
  authority: PublicKey;
  tokenMint: PublicKey;
  rewardsVault: PublicKey;
  totalPlayers: number;
  totalRewardsDistributed: number;
  bump: number;
}

export interface Player {
  authority: PublicKey;
  username: string;
  level: number;
  xp: number;
  tokens: number;
  streak: number;
  longestStreak: number;
  guardians: Guardian[];
  achievements: Achievement[];
  lastPlayedAt: number;
  createdAt: number;
  bump: number;
}

export interface Guardian {
  id: number;
  name: string;
  level: number;
  experience: number;
}

export interface Achievement {
  id: string;
  unlockedAt: number;
}

export function getProgramId(): PublicKey {
  return new PublicKey(LENTERA_PROGRAM_ID_STRING);
}

export function getGameStateAddress(): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(GAME_STATE_SEED)],
    getProgramId()
  )[0];
}

export function getPlayerAddress(walletAddress: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PLAYER_SEED), walletAddress.toBuffer()],
    getProgramId()
  )[0];
}

export function getTokenMintAddress(): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(TOKEN_MINT_SEED)],
    getProgramId()
  )[0];
}

export function getRewardsVaultAddress(): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(REWARDS_VAULT_SEED)],
    getProgramId()
  )[0];
}

export async function getPlayerData(
  connection: Connection,
  walletAddress: PublicKey
): Promise<Player | null> {
  const playerAddress = getPlayerAddress(walletAddress);
  
  try {
    const accountInfo = await connection.getParsedAccountInfo(playerAddress);
    
    if (!accountInfo.value) return null;
    
    const data = accountInfo.value.data as any;
    return {
      authority: new PublicKey(data.authority),
      username: data.username,
      level: data.level,
      xp: Number(data.xp),
      tokens: Number(data.tokens),
      streak: data.streak,
      longestStreak: data.longestStreak,
      guardians: data.guardians || [],
      achievements: data.achievements || [],
      lastPlayedAt: Number(data.lastPlayedAt),
      createdAt: Number(data.createdAt),
      bump: data.bump,
    };
  } catch (error) {
    console.error("Error fetching player data:", error);
    return null;
  }
}

export async function getGameStateData(
  connection: Connection
): Promise<GameState | null> {
  const gameStateAddress = getGameStateAddress();
  
  try {
    const accountInfo = await connection.getParsedAccountInfo(gameStateAddress);
    
    if (!accountInfo.value) return null;
    
    const data = accountInfo.value.data as any;
    return {
      authority: new PublicKey(data.authority),
      tokenMint: new PublicKey(data.tokenMint),
      rewardsVault: new PublicKey(data.rewardsVault),
      totalPlayers: data.totalPlayers,
      totalRewardsDistributed: Number(data.totalRewardsDistributed),
      bump: data.bump,
    };
  } catch (error) {
    console.error("Error fetching game state:", error);
    return null;
  }
}

export const XP_PER_LEVEL = (level: number): number => 100 * Math.pow(level, 2);

export function calculateLevel(xp: number): number {
  let level = 1;
  while (xp >= XP_PER_LEVEL(level)) {
    xp -= XP_PER_LEVEL(level);
    level++;
  }
  return level;
}

export function getXpToNextLevel(currentLevel: number): number {
  return XP_PER_LEVEL(currentLevel);
}

export const MOCK_TOKEN_ADDRESS = "LENTa111111111111111111111111111111111";

export const TOKEN_CONFIG = {
  name: "Lentera Token",
  symbol: "LIT",
  decimals: 6,
  mintAddress: MOCK_TOKEN_ADDRESS,
};