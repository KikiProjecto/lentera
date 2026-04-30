import { NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";
import { getGameStateAddress, getPlayerAddress } from "@/lib/anchor/addresses";

const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json(
      { error: "Wallet address required" },
      { status: 400 }
    );
  }

  try {
    const connection = new Connection(RPC_URL, "confirmed");
    let walletAddress: PublicKey;
    try {
      walletAddress = new PublicKey(wallet);
    } catch {
      return NextResponse.json(
        { error: "Invalid wallet address" },
        { status: 400 }
      );
    }

    switch (action) {
      case "gameState": {
        const gameStateAddress = getGameStateAddress();
        const gameStateInfo = await connection.getParsedAccountInfo(gameStateAddress);
        
        if (!gameStateInfo.value) {
          return NextResponse.json({
            exists: false,
            message: "Game not initialized yet",
          });
        }
        
        const data = (gameStateInfo.value.data as any);
        return NextResponse.json({
          exists: true,
          totalPlayers: data.totalPlayers,
          totalRewardsDistributed: Number(data.totalRewardsDistributed) / 1e6,
        });
      }

      case "player": {
        const playerAddress = getPlayerAddress(walletAddress);
        const playerInfo = await connection.getParsedAccountInfo(playerAddress);
        
        if (!playerInfo.value) {
          return NextResponse.json({
            exists: false,
            message: "Player not found. Initialize to start playing!",
          });
        }
        
        const data = (playerInfo.value.data as any);
        return NextResponse.json({
          exists: true,
          username: data.username,
          level: data.level,
          xp: Number(data.xp),
          tokens: Number(data.tokens) / 1e6,
          streak: data.streak,
          longestStreak: data.longestStreak,
          guardiansCount: data.guardians?.length || 0,
          achievementsCount: data.achievements?.length || 0,
        });
      }

      case "leaderboard": {
        const gameStateAddress = getGameStateAddress();
        const gameStateInfo = await connection.getParsedAccountInfo(gameStateAddress);
        
        if (!gameStateInfo.value) {
          return NextResponse.json({ topPlayers: [] });
        }
        
        return NextResponse.json({
          totalPlayers: (gameStateInfo.value.data as any).totalPlayers,
          message: "View full leaderboard at lentera.gg/leaderboard",
        });
      }

      default:
        return NextResponse.json(
          { error: "Invalid action. Use: gameState, player, or leaderboard" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Blinks API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, wallet } = body;

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet address required" },
        { status: 400 }
      );
    }

    switch (action) {
      case "initialize": {
        return NextResponse.json({
          message: "Player initialized! Start your journey at lentera.gg",
          actions: [
            {
              title: "Play Battle",
              url: "lentera.gg/game",
            },
            {
              title: "Complete Quests",
              url: "lentera.gg/quest",
            },
          ],
        });
      }

      case "claimReward": {
        return NextResponse.json({
          message: "Rewards claimed successfully!",
          amount: 25,
          token: "$LIT",
        });
      }

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Blinks POST Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}