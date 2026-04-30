"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import * as Phaser from "phaser";
import type { CharacterConfig, ViceMonster } from "@/data/characters";
import { getElementalMultiplier, ELEMENT_COLORS, Element } from "@/data/characters";
import type { Quest, QuizQuestion } from "@/data/quests";

interface GameSceneCallbacks {
  onBattleStart?: (guardian: CharacterConfig, enemy: ViceMonster) => void;
  onBattleEnd?: (won: boolean, rewards: { tokens: number; xp: number }) => void;
  onQuestStart?: (quest: Quest) => void;
  onQuestEnd?: (passed: boolean, rewards: { tokens: number; xp: number }) => void;
  onGameOver?: () => void;
  onStateChange?: (state: string) => void;
}

// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
  private callbacks: GameSceneCallbacks;

  constructor(callbacks: GameSceneCallbacks) {
    super({ key: "MainMenuScene" });
    this.callbacks = callbacks;
  }

  create() {
    const { centerX, centerY } = this.cameras.main;
    
    // Background
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x0A0A0F);
    
    // Title
    const title = this.add.text(centerX, centerY - 150, "LENTERA", {
      fontFamily: "Bricolage Grotesque",
      fontSize: "72px",
      color: "#00F5D4",
      fontStyle: "bold",
    }).setOrigin(0.5);
    
    // Animated glow
    this.tweens.add({
      targets: title,
      alpha: 0.7,
      duration: 1500,
      yoyo: true,
      repeat: -1,
    });

    // Subtitle
    this.add.text(centerX, centerY - 70, "GameFi Edutainment", {
      fontFamily: "Space Grotesk",
      fontSize: "24px",
      color: "#8338EC",
    }).setOrigin(0.5);

    // Buttons
    this.createButton(centerX, centerY, "⚔️ BATTLE MODE", () => {
      this.callbacks.onStateChange?.("battle-select");
    });
    
    this.createButton(centerX, centerY + 70, "📝 DAILY QUESTS", () => {
      this.callbacks.onStateChange?.("quest-select");
    });
    
    this.createButton(centerX, centerY + 140, "🎮 PLAY", () => {
      this.scene.start("BattleScene");
      this.callbacks.onStateChange?.("battle");
    });

    // Version
    this.add.text(16, this.scale.height - 24, "v1.0.0", {
      fontFamily: "Space Grotesk",
      fontSize: "14px",
      color: "#A0A0B0",
    });
  }

  private createButton(x: number, y: number, text: string, onClick: () => void) {
    const btn = this.add.text(x, y, text, {
      fontFamily: "Space Grotesk",
      fontSize: "28px",
      color: "#F0F0F5",
      backgroundColor: "#1A1A25",
      padding: { x: 32, y: 16 },
    }).setOrigin(0.5);

    btn.setInteractive({ useHandCursor: true });
    
    btn.on("pointerover", () => {
      btn.setStyle({ color: "#00F5D4", backgroundColor: "#252535" });
    });
    
    btn.on("pointerout", () => {
      btn.setStyle({ color: "#F0F0F5", backgroundColor: "#1A1A25" });
    });
    
    btn.on("pointerdown", onClick);
  }
}

// Battle Scene
class BattleScene extends Phaser.Scene {
  private playerGuardian: CharacterConfig | null = null;
  private currentEnemy: ViceMonster | null = null;
  private playerHealth = 100;
  private enemyHealth = 100;
  private isPlayerTurn = true;
  private callbacks: GameSceneCallbacks;

  constructor(callbacks: GameSceneCallbacks) {
    super({ key: "BattleScene" });
    this.callbacks = callbacks;
  }

  init(data: { guardian: CharacterConfig; enemy: ViceMonster }) {
    this.playerGuardian = data.guardian;
    this.currentEnemy = data.enemy;
    this.playerHealth = 100;
    this.enemyHealth = data.enemy.health;
    this.isPlayerTurn = true;
  }

  create() {
    const { centerX, centerY } = this.cameras.main;
    
    // Background
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x0A0A0F);
    
    // Enemy (top right)
    if (this.currentEnemy) {
      const enemySprite = this.add.circle(centerX + 150, centerY - 80, 60, parseInt(this.currentEnemy.color.replace("#", "0x")));
      this.add.text(centerX + 150, centerY + 10, this.currentEnemy.name, {
        fontFamily: "Space Grotesk",
        fontSize: "20px",
        color: "#F0F0F5",
      }).setOrigin(0.5);
      
      // Enemy health bar
      this.add.rectangle(centerX + 150, centerY + 40, 120, 16, 0x252535).setOrigin(0.5, 0.5);
      const enemyHealthBar = this.add.rectangle(centerX + 90, centerY + 40, 120, 16, parseInt(this.currentEnemy.color.replace("#", "0x"))).setOrigin(0, 0.5);
      
      // Enemy emoji
      const enemyEmoji = this.add.text(centerX + 150, centerY - 80, 
        this.currentEnemy.type === "slot" ? "🎰" : 
        this.currentEnemy.type === "rug" ? "😈" : 
        this.currentEnemy.type === "fomo" ? "👻" : "👺",
        { fontSize: "48px" }
      ).setOrigin(0.5);
      
      // Animate enemy
      this.tweens.add({
        targets: enemyEmoji,
        x: "+=10",
        duration: 500,
        yoyo: true,
        repeat: -1,
      });
    }

    // Player (bottom left)
    if (this.playerGuardian) {
      const playerSprite = this.add.circle(centerX - 150, centerY + 80, 60, parseInt(this.playerGuardian.color.replace("#", "0x")));
      this.add.text(centerX - 150, centerY + 150, this.playerGuardian.name, {
        fontFamily: "Space Grotesk",
        fontSize: "20px",
        color: "#F0F0F5",
      }).setOrigin(0.5);
      
      // Player health bar
      this.add.rectangle(centerX - 210, centerY + 150, 120, 16, 0x252535).setOrigin(0.5, 0.5);
      this.add.rectangle(centerX - 210, centerY + 150, 120, 16, 0x00F5D4).setOrigin(0, 0.5);
      
      // Player emoji
      const playerEmoji = this.add.text(centerX - 150, centerY + 80, 
        this.playerGuardian.element === "earth" ? "🦎" : 
        this.playerGuardian.element === "void" ? "🦉" : 
        this.playerGuardian.element === "air" ? "🦧" : 
        this.playerGuardian.element === "water" ? "💎" : 
        this.playerGuardian.element === "fire" ? "🔥" : "☀️",
        { fontSize: "48px" }
      ).setOrigin(0.5);
    }

    // VS text
    this.add.text(centerX, centerY, "VS", {
      fontFamily: "Bricolage Grotesque",
      fontSize: "48px",
      color: "#FF006E",
      fontStyle: "bold",
    }).setOrigin(0.5);

    // Abilities buttons (bottom center)
    if (this.playerGuardian) {
      let buttonY = centerY + 200;
      this.playerGuardian.abilities.forEach((ability, index) => {
        const btn = this.add.text(
          centerX - 100 + (index * 100), 
          buttonY, 
          ability.name, 
          {
            fontFamily: "Space Grotesk",
            fontSize: "16px",
            color: "#00F5D4",
            backgroundColor: "#1A1A25",
            padding: { x: 16, y: 8 },
          }
        ).setOrigin(0.5);
        
        btn.setInteractive({ useHandCursor: true });
        
        btn.on("pointerover", () => {
          btn.setStyle({ backgroundColor: "#252535" });
        });
        
        btn.on("pointerout", () => {
          btn.setStyle({ backgroundColor: "#1A1A25" });
        });
        
        btn.on("pointerdown", () => {
          this.performAttack(ability.name);
        });
      });
    }

    // Back button
    const backBtn = this.add.text(16, 16, "← BACK", {
      fontFamily: "Space Grotesk",
      fontSize: "18px",
      color: "#A0A0B0",
    }).setInteractive({ useHandCursor: true });
    
    backBtn.on("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });
  }

  private performAttack(abilityName: string) {
    if (!this.isPlayerTurn || !this.playerGuardian) return;
    
    // Calculate damage based on stats
    const baseDamage = 25 + Math.floor(this.playerGuardian.stats.attack / 4);
    
    // Apply elemental advantage multiplier
    let elementalMultiplier = 1.0;
    let effectivenessText = "";
    if (this.currentEnemy && this.playerGuardian) {
      const playerElement = this.playerGuardian.element as unknown as Element;
      const enemyElement = this.currentEnemy.element as unknown as Element;
      elementalMultiplier = getElementalMultiplier(playerElement, enemyElement);
      
      if (elementalMultiplier > 1) {
        effectivenessText = " (SUPER!)";
      } else if (elementalMultiplier < 1) {
        effectivenessText = " (WEAK)";
      }
    }
    
    const damage = Math.floor((baseDamage + Math.floor(Math.random() * 20)) * elementalMultiplier);
    
    this.enemyHealth = Math.max(0, this.enemyHealth - damage);
    
    // Show damage text
    const { centerX, centerY } = this.cameras.main;
    const damageColor = effectivenessText === " (SUPER!)" ? "#FFBE0B" : effectivenessText === " (WEAK)" ? "#A0A0B0" : "#00F5D4";
    const damageText = this.add.text(centerX + 150, centerY - 80, `-${damage}${effectivenessText}`, {
      fontFamily: "Bricolage Grotesque",
      fontSize: "28px",
      color: damageColor,
      fontStyle: "bold",
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: damageText,
      y: centerY - 150,
      alpha: 0,
      duration: 1000,
      onComplete: () => damageText.destroy(),
    });
    
    // Screen shake on hit
    this.cameras.main.shake(200, 0.01);
    
    // Particle burst effect
    this.createHitParticles(centerX + 150, centerY - 80, this.playerGuardian?.color || "#00F5D4");
    
    this.isPlayerTurn = false;
    
    // Enemy turn after delay
    this.time.delayedCall(1500, () => {
      this.enemyTurn();
    });
  }

  private enemyTurn() {
    if (!this.currentEnemy) return;
    
    const damage = 10 + Math.floor(Math.random() * 15);
    this.playerHealth = Math.max(0, this.playerHealth - damage);
    
    // Show damage
    const { centerX, centerY } = this.cameras.main;
    const damageText = this.add.text(centerX - 150, centerY + 80, `-${damage}`, {
      fontFamily: "Bricolage Grotesque",
      fontSize: "32px",
      color: "#FF006E",
      fontStyle: "bold",
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: damageText,
      y: centerY,
      alpha: 0,
      duration: 1000,
      onComplete: () => damageText.destroy(),
    });
    
    // Check for battle end
    this.time.delayedCall(1000, () => {
      if (this.enemyHealth <= 0) {
        this.winBattle();
      } else if (this.playerHealth <= 0) {
        this.loseBattle();
      } else {
        this.isPlayerTurn = true;
      }
    });
  }

  private winBattle() {
    this.callbacks.onBattleEnd?.(true, { tokens: 25, xp: 50 });
    this.showEndScreen("VICTORY!", "🎉", "#00F5D4");
  }

  private loseBattle() {
    this.callbacks.onBattleEnd?.(false, { tokens: 0, xp: 10 });
    this.showEndScreen("DEFEAT", "💀", "#DC2626");
  }

  private showEndScreen(text: string, emoji: string, color: string) {
    const { centerX, centerY } = this.cameras.main;
    
    const overlay = this.add.rectangle(centerX, centerY, this.scale.width, this.scale.height, 0x000000, 0.8);
    
    this.add.text(centerX, centerY - 80, emoji, { fontSize: "72px" }).setOrigin(0.5);
    
    this.add.text(centerX, centerY + 20, text, {
      fontFamily: "Bricolage Grotesque",
      fontSize: "48px",
      color: color,
      fontStyle: "bold",
    }).setOrigin(0.5);
    
    const continueBtn = this.add.text(centerX, centerY + 120, "CONTINUE", {
      fontFamily: "Space Grotesk",
      fontSize: "24px",
      color: "#F0F0F5",
      backgroundColor: "#00F5D4",
      padding: { x: 32, y: 16 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
    continueBtn.on("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });
  }
  
  private createHitParticles(x: number, y: number, color: string) {
    const colorInt = parseInt(color.replace("#", "0x"));
    for (let i = 0; i < 12; i++) {
      const particle = this.add.circle(
        x + (Math.random() - 0.5) * 30,
        y + (Math.random() - 0.5) * 30,
        4,
        colorInt
      );
      this.tweens.add({
        targets: particle,
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
        alpha: 0,
        scale: 0,
        duration: 500,
        onComplete: () => particle.destroy(),
      });
    }
  }
}

// Quest Scene
class QuestScene extends Phaser.Scene {
  private currentQuestion = 0;
  private score = 0;
  private questions: QuizQuestion[] = [];
  private questTitle = "";
  private callbacks: GameSceneCallbacks;
  private answered = false;

  constructor(callbacks: GameSceneCallbacks) {
    super({ key: "QuestScene" });
    this.callbacks = callbacks;
  }

  init(data: { questions: QuizQuestion[]; title: string }) {
    this.questions = data.questions;
    this.questTitle = data.title;
    this.currentQuestion = 0;
    this.score = 0;
    this.answered = false;
  }

  create() {
    const { centerX, centerY } = this.cameras.main;
    
    // Background
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x0A0A0F);
    
    // Progress bar
    const progress = (this.currentQuestion / this.questions.length) * 100;
    this.add.rectangle(centerX, 40, this.scale.width - 40, 8, 0x252535).setOrigin(0.5, 0.5);
    this.add.rectangle(20, 40, (this.scale.width - 40) * (progress / 100), 8, 0x8338EC).setOrigin(0, 0.5);
    
    // Question number
    this.add.text(20, 60, `Question ${this.currentQuestion + 1}/${this.questions.length}`, {
      fontFamily: "Space Grotesk",
      fontSize: "16px",
      color: "#A0A0B0",
    });
    
    // Title
    this.add.text(centerX, 100, this.questTitle, {
      fontFamily: "Bricolage Grotesque",
      fontSize: "28px",
      color: "#F0F0F5",
      fontStyle: "bold",
    }).setOrigin(0.5);
    
    // Question text
    if (this.questions[this.currentQuestion]) {
      const question = this.questions[this.currentQuestion];
      this.add.text(centerX, centerY - 80, question.question, {
        fontFamily: "Space Grotesk",
        fontSize: "24px",
        color: "#F0F0F5",
        wordWrap: { width: this.scale.width - 80 },
      }).setOrigin(0.5);
      
      // Answer options
      question.options.forEach((option, index) => {
        const btn = this.add.text(
          centerX, 
          centerY + 40 + (index * 60), 
          `${String.fromCharCode(65 + index)}. ${option}`, 
          {
            fontFamily: "Space Grotesk",
            fontSize: "18px",
            color: "#F0F0F5",
            backgroundColor: "#1A1A25",
            padding: { x: 24, y: 16 },
          }
        ).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        
        btn.on("pointerover", () => {
          if (!this.answered) btn.setStyle({ backgroundColor: "#252535" });
        });
        
        btn.on("pointerout", () => {
          if (!this.answered) btn.setStyle({ backgroundColor: "#1A1A25" });
        });
        
        btn.on("pointerdown", () => {
          if (this.answered) return;
          this.answerQuestion(index, index === question.correctIndex);
        });
      });
    }
    
    // Back button
    const backBtn = this.add.text(16, 16, "← QUIT", {
      fontFamily: "Space Grotesk",
      fontSize: "18px",
      color: "#A0A0B0",
    }).setInteractive({ useHandCursor: true });
    
    backBtn.on("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });
  }

  private answerQuestion(index: number, correct: boolean) {
    this.answered = true;
    
    if (correct) this.score++;
    
    // Show feedback
    const { centerX, centerY } = this.cameras.main;
    const feedback = this.add.text(centerX, centerY + 200, correct ? "✅ Correct!" : "❌ Wrong!", {
      fontFamily: "Space Grotesk",
      fontSize: "24px",
      color: correct ? "#00F5D4" : "#DC2626",
      fontStyle: "bold",
    }).setOrigin(0.5);
    
    this.tweens.add({
      targets: feedback,
      alpha: 0,
      duration: 1500,
      onComplete: () => {
        feedback.destroy();
        
        if (this.currentQuestion >= this.questions.length - 1) {
          this.completeQuest();
        } else {
          this.currentQuestion++;
          this.answered = false;
          this.scene.restart({ questions: this.questions, title: this.questTitle });
        }
      },
    });
  }

  private completeQuest() {
    const passed = (this.score / this.questions.length) >= 0.7;
    const rewards = passed 
      ? { tokens: 50, xp: 100 } 
      : { tokens: 0, xp: 25 };
    
    this.callbacks.onQuestEnd?.(passed, rewards);
    
    const { centerX, centerY } = this.cameras.main;
    
    const overlay = this.add.rectangle(centerX, centerY, this.scale.width, this.scale.height, 0x000000, 0.8);
    
    this.add.text(centerX, centerY - 80, passed ? "🎉" : "😔", { fontSize: "72px" }).setOrigin(0.5);
    
    this.add.text(centerX, centerY + 20, passed ? "QUEST COMPLETE!" : "TRY AGAIN", {
      fontFamily: "Bricolage Grotesque",
      fontSize: "36px",
      color: passed ? "#00F5D4" : "#DC2626",
      fontStyle: "bold",
    }).setOrigin(0.5);
    
    this.add.text(centerX, centerY + 80, `Score: ${this.score}/${this.questions.length}`, {
      fontFamily: "Space Grotesk",
      fontSize: "24px",
      color: "#F0F0F5",
    }).setOrigin(0.5);
    
    const continueBtn = this.add.text(centerX, centerY + 160, "CONTINUE", {
      fontFamily: "Space Grotesk",
      fontSize: "24px",
      color: "#0A0A0F",
      backgroundColor: "#00F5D4",
      padding: { x: 32, y: 16 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
    continueBtn.on("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });
  }
}

// Hook for using the game engine
interface GameEngineHookOptions {
  characters: CharacterConfig[];
  quests: Quest[];
  callbacks?: GameSceneCallbacks;
}

export function useGameEngine(options: GameEngineHookOptions) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentScene, setCurrentScene] = useState<string>("menu");

  const callbacks = options.callbacks || {
    onStateChange: setCurrentScene,
  };

  const initGame = useCallback(() => {
    if (!containerRef.current || gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: 1024,
      height: 768,
      backgroundColor: "#0A0A0F",
      scene: [MainMenuScene, BattleScene, QuestScene],
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
        min: { width: 800, height: 600 },
        max: { width: 1920, height: 1080 },
      },
      render: {
        pixelArt: false,
        antialias: true,
        roundPixels: false,
      },
      fps: {
        target: 60,
        forceSetTimeOut: false,
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

  const startBattle = useCallback((guardian: CharacterConfig, enemy: ViceMonster) => {
    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene("BattleScene") as BattleScene;
      if (scene) {
        scene.init({ guardian, enemy });
        gameRef.current.scene.start("BattleScene");
        setCurrentScene("battle");
      }
    }
  }, []);

  const startQuest = useCallback((quest: Quest, title: string) => {
    if (gameRef.current) {
      const scene = gameRef.current.scene.getScene("QuestScene") as QuestScene;
      if (scene) {
        scene.init({ questions: quest.questions, title });
        gameRef.current.scene.start("QuestScene");
        setCurrentScene("quest");
      }
    }
  }, []);

  const returnToMenu = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.scene.start("MainMenuScene");
      setCurrentScene("menu");
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
    currentScene,
    initGame,
    destroyGame,
    startBattle,
    startQuest,
    returnToMenu,
  };
}

export type { GameSceneCallbacks };

export type GameEngineOptions = GameEngineHookOptions;