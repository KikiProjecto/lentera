"use client";

import { useGameEngine, type GameEngineOptions } from "@/lib/game-engine";
import type { GameState } from "@/lib/game-state";
import { useMemo } from "react";

export default function GameEngineClient(props: GameEngineOptions) {
  const result = useGameEngine(props);
  
  return useMemo(() => (
    <div ref={result.containerRef} />
  ), [result.containerRef]);
}

export type { GameState, GameEngineOptions };