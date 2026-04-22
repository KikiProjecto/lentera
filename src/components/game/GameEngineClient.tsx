"use client";

import { useGameEngine, type GameEngineOptions, type GameState } from "@/lib/game-engine";
import { useMemo } from "react";

export default function GameEngineClient(props: GameEngineOptions) {
  const result = useGameEngine(props);
  
  return useMemo(() => (
    <div ref={result.containerRef} />
  ), [result.containerRef]);
}

export type { GameState, GameEngineOptions };