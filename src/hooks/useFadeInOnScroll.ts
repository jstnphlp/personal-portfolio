"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInScrollResult {
  readonly ref: React.RefObject<HTMLDivElement | null>;
  readonly visible: boolean;
}

export function useFadeInOnScroll(threshold = 0.15): FadeInScrollResult {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
