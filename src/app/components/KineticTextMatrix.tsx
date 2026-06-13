"use client";

import { useEffect, useRef, useState } from "react";

const MATRIX_WORDS = ["NEXTJS", "TYPESCRIPT", "TAILWIND", "MYSQL"] as const;

const CYCLE_DURATION_MS = 10000;
const HIGHLIGHT_WINDOW_RATIO = 0.15;
const UPDATE_INTERVAL_MS = 120;

interface LetterState {
  readonly char: string;
  readonly isHighlighted: boolean;
}

interface WordState {
  readonly word: string;
  readonly letters: readonly LetterState[];
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function computeMatrixState(
  words: readonly string[],
  totalChars: number,
  elapsed: number
): readonly WordState[] {
  const progress = (elapsed % CYCLE_DURATION_MS) / CYCLE_DURATION_MS;
  let charIndex = 0;

  return words.map((word) => {
    const letters: LetterState[] = [];

    for (const char of word) {
      const offset = seededRandom(charIndex * 7 + 3) * 0.6;
      const shifted = (progress + offset) % 1;
      const isHighlighted = shifted < HIGHLIGHT_WINDOW_RATIO;

      letters.push({ char, isHighlighted });
      charIndex++;
    }

    return { word, letters };
  });
}

function buildInitialState(): readonly WordState[] {
  return MATRIX_WORDS.map((word) => ({
    word,
    letters: [...word].map((char) => ({ char, isHighlighted: false })),
  }));
}

export default function KineticTextMatrix(): React.JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const accumulatedRef = useRef(0);
  const lastTickRef = useRef(0);
  const [matrixState, setMatrixState] = useState<readonly WordState[]>(buildInitialState);

  const totalChars = MATRIX_WORDS.reduce((sum, w) => sum + w.length, 0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const startAnimation = (): void => {
      lastTickRef.current = performance.now();

      intervalRef.current = setInterval(() => {
        const now = performance.now();
        accumulatedRef.current += now - lastTickRef.current;
        lastTickRef.current = now;
        setMatrixState(computeMatrixState(MATRIX_WORDS, totalChars, accumulatedRef.current));
      }, UPDATE_INTERVAL_MS);
    };

    const stopAnimation = (): void => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      accumulatedRef.current = 0;
      setMatrixState(buildInitialState());
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [totalChars]);

  return (
    <article
      ref={containerRef}
      aria-label="Technology stack matrix"
      className="select-none font-mono text-5xl font-black leading-none tracking-tighter md:text-6xl lg:text-7xl"
    >
      {matrixState.map((wordState) => (
        <p key={wordState.word} className="block">
          {wordState.letters.map((letter, index) => (
            <span
              key={`${wordState.word}-${index}`}
              className={letter.isHighlighted ? "text-primary-text" : "text-muted-accent/20"}
            >
              {letter.char}
            </span>
          ))}
        </p>
      ))}
    </article>
  );
}
