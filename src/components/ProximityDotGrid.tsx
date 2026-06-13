"use client";

import { useEffect, useRef } from "react";

interface ProximityDotGridProps {
  readonly dotSize?: number;
  readonly gap?: number;
  readonly baseOpacity?: number;
  readonly glowOpacity?: number;
  readonly glowRadius?: number;
  readonly dotColor?: string;
  readonly glowColor?: string;
  readonly mousePosRef: React.RefObject<{ readonly x: number; readonly y: number }>;
}

function parseHex(hex: string): readonly [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function lerpColor(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number
): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

export default function ProximityDotGrid({
  dotSize = 1.5,
  gap = 28,
  baseOpacity = 0.08,
  glowOpacity = 0.55,
  glowRadius = 100,
  dotColor = "#4A5C6A",
  glowColor = "#9BA8AB",
  mousePosRef,
}: ProximityDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const baseRgb = parseHex(dotColor);
    const glowRgb = parseHex(glowColor);

    const draw = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / gap);
      const rows = Math.ceil(canvas.height / gap);
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gap;
          const y = j * gap;
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / glowRadius);
          const eased = proximity * proximity;
          const opacity = baseOpacity + (glowOpacity - baseOpacity) * eased;

          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = lerpColor(baseRgb, glowRgb, eased);
          ctx.globalAlpha = opacity;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [dotSize, gap, baseOpacity, glowOpacity, glowRadius, dotColor, glowColor, mousePosRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
