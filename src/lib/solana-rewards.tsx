"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { createContext, useContext, ReactNode } from "react";

const LENTERA_TOKEN_ADDRESS = "LENTera123456789ABCDEFGHIJKLMNOPQRSTU"; // Placeholder - replace with actual token
const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

interface TokenBalance {
  lamports: number;
  tokens: number;
}

interface TransactionResult {
  signature: string;
  timestamp: number;
  amount: number;
  type: "reward" | "stake" | "withdraw";
}

interface SolanaRewardsContextType {
  balance: TokenBalance;
  isConnected: boolean;
  isLoading: boolean;
  recentTransactions: TransactionResult[];
  claimReward: (amount: number, reason: string) => Promise<boolean>;
  stakeTokens: (amount: number) => Promise<boolean>;
  withdrawTokens: (amount: number) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
  formatBalance: (lamports: number) => string;
}

const SolanaRewardsContext = createContext<SolanaRewardsContextType | null>(null);

const MOCK_BALANCE = 1000000; // Mock balance for demo (1 $LIT = 1,000,000 lamports)

export function SolanaRewardsProvider({ children }: { children: ReactNode }) {
  const { publicKey, connected, sendTransaction } = useWallet();
  const [balance, setBalance] = useState<TokenBalance>({ lamports: 0, tokens: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState<TransactionResult[]>([]);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance({ lamports: 0, tokens: 0 });
      return;
    }

    try {
      setIsLoading(true);
      const connection = new Connection(RPC_URL, "confirmed");
      
      // In production, use actual token balance check
      // For demo, use mock balance when wallet connected
      const mockLamports = connected ? MOCK_BALANCE : 0;
      
      setBalance({
        lamports: mockLamports,
        tokens: mockLamports / 1000000,
      });
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance({ lamports: 0, tokens: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, connected]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const claimReward = useCallback(async (amount: number, reason: string): Promise<boolean> => {
    if (!connected || !publicKey) {
      console.warn("Wallet not connected");
      return false;
    }

    try {
      setIsLoading(true);
      
      // In production, this would be a smart contract call
      // For demo, simulate successful transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newTransaction: TransactionResult = {
        signature: `tx_${Date.now()}`,
        timestamp: Date.now(),
        amount,
        type: "reward",
      };
      
      setRecentTransactions(prev => [newTransaction, ...prev].slice(0, 10));
      setBalance(prev => ({
        lamports: prev.lamports + amount * 1000000,
        tokens: prev.tokens + amount,
      }));
      
      console.log(`Reward claimed: ${amount} $LIT for ${reason}`);
      return true;
    } catch (error) {
      console.error("Error claiming reward:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [connected, publicKey, sendTransaction]);

  const stakeTokens = useCallback(async (amount: number): Promise<boolean> => {
    if (!connected || !publicKey) {
      console.warn("Wallet not connected");
      return false;
    }

    try {
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newTransaction: TransactionResult = {
        signature: `tx_${Date.now()}`,
        timestamp: Date.now(),
        amount,
        type: "stake",
      };
      
      setRecentTransactions(prev => [newTransaction, ...prev].slice(0, 10));
      
      console.log(`Staked: ${amount} $LIT`);
      return true;
    } catch (error) {
      console.error("Error staking tokens:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [connected, publicKey, sendTransaction]);

  const withdrawTokens = useCallback(async (amount: number): Promise<boolean> => {
    if (!connected || !publicKey) {
      console.warn("Wallet not connected");
      return false;
    }

    if (amount > balance.tokens) {
      console.warn("Insufficient balance");
      return false;
    }

    try {
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newTransaction: TransactionResult = {
        signature: `tx_${Date.now()}`,
        timestamp: Date.now(),
        amount,
        type: "withdraw",
      };
      
      setRecentTransactions(prev => [newTransaction, ...prev].slice(0, 10));
      setBalance(prev => ({
        lamports: prev.lamports - amount * 1000000,
        tokens: prev.tokens - amount,
      }));
      
      console.log(`Withdrew: ${amount} $LIT`);
      return true;
    } catch (error) {
      console.error("Error withdrawing tokens:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [connected, publicKey, balance.tokens, sendTransaction]);

  const formatBalance = useCallback((lamports: number): string => {
    const tokens = lamports / 1000000;
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(2)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`;
    }
    return tokens.toFixed(2);
  }, []);

  return (
    <SolanaRewardsContext.Provider
      value={{
        balance,
        isConnected: connected,
        isLoading,
        recentTransactions,
        claimReward,
        stakeTokens,
        withdrawTokens,
        refreshBalance: fetchBalance,
        formatBalance,
      }}
    >
      {children}
    </SolanaRewardsContext.Provider>
  );
}

export function useSolanaRewards() {
  const context = useContext(SolanaRewardsContext);
  if (!context) {
    throw new Error("useSolanaRewards must be used within a SolanaRewardsProvider");
  }
  return context;
}

// Token utility functions
export const TOKEN_CONFIG = {
  DECIMALS: 6,
  SYMBOL: "$LIT",
  NAME: "Lentera Token",
  MINT_ADDRESS: LENTERA_TOKEN_ADDRESS,
};

export function lamportsToTokens(lamports: number): number {
  return lamports / Math.pow(10, TOKEN_CONFIG.DECIMALS);
}

export function tokensToLamports(tokens: number): number {
  return tokens * Math.pow(10, TOKEN_CONFIG.DECIMALS);
}

export function formatTokenAmount(tokens: number, decimals = 2): string {
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(decimals)}M`;
  } else if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(decimals)}K`;
  } else if (tokens < 0.01) {
    return `< 0.01`;
  }
  return tokens.toFixed(decimals);
}

export function formatTokenWithSymbol(tokens: number): string {
  return `${formatTokenAmount(tokens)} ${TOKEN_CONFIG.SYMBOL}`;
}