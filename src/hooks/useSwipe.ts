"use client";

import { useRef, useCallback } from "react";

const SWIPE_THRESHOLD = 50;

interface SwipeCallbacks {
  readonly onSwipeLeft: () => void;
  readonly onSwipeRight: () => void;
}

interface SwipeHandlers {
  readonly onMouseDown: (e: React.MouseEvent) => void;
  readonly onMouseMove: (e: React.MouseEvent) => void;
  readonly onMouseUp: () => void;
  readonly onMouseLeave: () => void;
  readonly onTouchStart: (e: React.TouchEvent) => void;
  readonly onTouchMove: (e: React.TouchEvent) => void;
  readonly onTouchEnd: () => void;
}

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeCallbacks): SwipeHandlers {
  const startXRef = useRef<number | null>(null);
  const currentXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const handleStart = useCallback((clientX: number): void => {
    startXRef.current = clientX;
    currentXRef.current = clientX;
    isDraggingRef.current = true;
  }, []);

  const handleMove = useCallback((clientX: number): void => {
    if (!isDraggingRef.current) return;
    currentXRef.current = clientX;
  }, []);

  const handleEnd = useCallback((): void => {
    if (!isDraggingRef.current || startXRef.current === null || currentXRef.current === null) {
      isDraggingRef.current = false;
      return;
    }

    const delta = currentXRef.current - startXRef.current;

    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) onSwipeLeft();
      else onSwipeRight();
    }

    isDraggingRef.current = false;
    startXRef.current = null;
    currentXRef.current = null;
  }, [onSwipeLeft, onSwipeRight]);

  return {
    onMouseDown: (e: React.MouseEvent) => handleStart(e.clientX),
    onMouseMove: (e: React.MouseEvent) => handleMove(e.clientX),
    onMouseUp: () => handleEnd(),
    onMouseLeave: () => handleEnd(),
    onTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientX),
    onTouchMove: (e: React.TouchEvent) => handleMove(e.touches[0].clientX),
    onTouchEnd: () => handleEnd(),
  };
}
