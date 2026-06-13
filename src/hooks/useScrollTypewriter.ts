"use client";

import { useEffect, useRef, useState } from "react";

const TYPING_INTERVAL_MS = 18;
const TYPING_START_DELAY_MS = 200;

interface ScrollTypewriterResult<T extends HTMLElement> {
  readonly ref: React.RefObject<T | null>;
  readonly visibleChars: number;
}

export function useScrollTypewriter<T extends HTMLElement = HTMLElement>(
  totalChars: number
): ScrollTypewriterResult<T> {
  const ref = useRef<T>(null);
  const [visibleChars, setVisibleChars] = useState(0);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;

          const startDelay = setTimeout(() => {
            const interval = setInterval(() => {
              setVisibleChars((prev) => {
                if (prev >= totalChars) {
                  clearInterval(interval);
                  return prev;
                }
                return prev + 1;
              });
            }, TYPING_INTERVAL_MS);

            return () => clearInterval(interval);
          }, TYPING_START_DELAY_MS);

          return () => clearTimeout(startDelay);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [totalChars]);

  return { ref, visibleChars };
}
