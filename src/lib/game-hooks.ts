"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface GameLoopOptions {
  onUpdate?: (deltaTime: number) => void;
  onRender?: (interpolation: number) => void;
  fixedTimeStep?: number;
  maxDeltaTime?: number;
}

export function useGameLoop({ 
  onUpdate, 
  onRender, 
  fixedTimeStep = 1 / 60, 
  maxDeltaTime = 0.1 
}: GameLoopOptions = {}) {
  const [isRunning, setIsRunning] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const accumulatorRef = useRef<number>(0);

  const loop = useCallback((currentTime: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = currentTime;
    }

    let deltaTime = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;

    deltaTime = Math.min(deltaTime, maxDeltaTime);

    if (isVisible && isRunning) {
      accumulatorRef.current += deltaTime;

      while (accumulatorRef.current >= fixedTimeStep) {
        onUpdate?.(fixedTimeStep);
        accumulatorRef.current -= fixedTimeStep;
      }

      const interpolation = accumulatorRef.current / fixedTimeStep;
      onRender?.(interpolation);
    }

    frameRef.current = requestAnimationFrame(loop);
  }, [isRunning, isVisible, fixedTimeStep, maxDeltaTime, onUpdate, onRender]);

  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [loop]);

  const pause = useCallback(() => {
    setIsRunning(false);
    lastTimeRef.current = 0;
    accumulatorRef.current = 0;
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
    lastTimeRef.current = 0;
  }, []);

  return {
    isRunning,
    isVisible,
    pause,
    resume,
  };
}

export function useGameStatePersistence(key: string, initialState: unknown) {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return initialState;
    
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to persist game state:", e);
    }
  }, [key, state]);

  return [state, setState] as const;
}

export function useObjectPool<T>(factory: () => T, reset: (item: T) => void, initialSize = 10) {
  const poolRef = useRef<T[]>([]);
  const activeRef = useRef<T[]>([]);

  useEffect(() => {
    for (let i = 0; i < initialSize; i++) {
      poolRef.current.push(factory());
    }
  }, [factory, initialSize]);

  const acquire = useCallback(() => {
    let item: T;
    
    if (poolRef.current.length > 0) {
      item = poolRef.current.pop()!;
    } else {
      item = factory();
    }
    
    activeRef.current.push(item);
    return item;
  }, [factory]);

  const release = useCallback((item: T) => {
    const index = activeRef.current.indexOf(item);
    if (index !== -1) {
      activeRef.current.splice(index, 1);
      reset(item);
      poolRef.current.push(item);
    }
  }, [reset]);

  const releaseAll = useCallback(() => {
    activeRef.current.forEach((item) => {
      reset(item);
      poolRef.current.push(item);
    });
    activeRef.current = [];
  }, [reset]);

  return { acquire, release, releaseAll, activeCount: activeRef.current.length };
}