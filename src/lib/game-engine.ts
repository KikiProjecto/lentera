"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import * as Phaser from "phaser";
import type { CharacterConfig, ViceMonster } from "@/data/characters";

interface GameState {
  isPlaying: boolean;
  currentQuest: number;
  streak: number;
  score: number;
  energy: number;
  level: number;
  xp: number;
}

interface GameEngineOptions {
  characters: CharacterConfig[];
  onStateChange?: (state: GameState) => void;
  onBattleStart?: (enemy: ViceMonster) => void;
  onBattleEnd?: (won: boolean, rewards: { tokens: number; xp: number }) => void;
  onQuestComplete?: (questId: string, rewards: { tokens: number; xp: number }) => void;
}

class LenteraGame extends Phaser.Scene {
  private characters!: CharacterConfig[];
  private selectedCharacter: CharacterConfig | null = null;
  private currentEnemy: ViceMonster | null = null;
  private gameState!: GameState;
  private gameStateRef: React.MutableRefObject<GameState>;
  private callbacks: GameEngineOptions;

  constructor(config: GameEngineOptions) {
    super({ key: "LenteraGame" });
    this.characters = config.characters;
    this.callbacks = config as any;
    this.gameStateRef = { current: {
      isPlaying: false,
      currentQuest: 0,
      streak: 0,
      score: 0,
      energy: 100,
      level: 1,
      xp: 0,
    }};
    this.gameState = this.gameStateRef.current;
  }

  create() {
    this.createMainMenu();
  }

  private createMainMenu() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add.text(centerX, centerY - 150, "LENTERA", {
      fontFamily: "Bricolage Grotesque",
      fontSize: "64px",
      color: "#00F5D4",
      fontStyle: "bold",
    }).setOrigin(0.5);

    const playBtn = this.add.text(centerX, centerY, "🎮 MULAI PERMAINAN", {
      fontFamily: "Space Grotesk",
      fontSize: "28px",
      color: "#F0F0F5",
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    playBtn.on("pointerover", () => playBtn.setStyle({ color: "#00F5D4" }));
    playBtn.on("pointerout", () => playBtn.setStyle({ color: "#F0F0F5" }));
    playBtn.on("pointerdown", () => this.startGame());
  }

  private startGame() {
    this.gameState.isPlaying = true;
    this.callbacks.onStateChange?.(this.gameState);
    this.scene.start("QuestScene");
  }

  preload() {
    this.load.image("guardian-komodo", "/assets/characters/komodo.png");
    this.load.image("guardian-owl", "/assets/characters/owl.png");
    this.load.image("vice-slot", "/assets/characters/vice-slot.png");
  }

  update(time: number, delta: number) {
    super.update(time, delta);
  }
}

export function useGameEngine(options: GameEngineOptions) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const initGame = useCallback(() => {
    if (!containerRef.current || gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: 800,
      height: 600,
      backgroundColor: "#0A0A0F",
      scene: [LenteraGame],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);
    gameRef.current.events.on("ready", () => setIsReady(true));
  }, []);

  const destroyGame = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.destroy(true);
      gameRef.current = null;
      setIsReady(false);
    }
  }, []);

  useEffect(() => {
    initGame();
    return () => destroyGame();
  }, [initGame, destroyGame]);

  return {
    gameRef,
    containerRef,
    isReady,
    initGame,
    destroyGame,
  };
}

export type { GameState, GameEngineOptions };