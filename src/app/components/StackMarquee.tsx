"use client";

import { cn } from "@/lib/utils";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface StackItem {
  readonly name: string;
}

const stackItems: readonly StackItem[] = [
  { name: "React" },
  { name: "Next.js" },
  { name: "TypeScript" },
  { name: "Python" },
  { name: "Tailwind CSS" },
  { name: "Prisma" },
  { name: "PostgreSQL" },
  { name: "Supabase" },
  { name: "Vite" },
  { name: "Java" },
  { name: "Docker" },
  { name: "Figma" },
  { name: "Git" },
];

const DEEP_BG_HEX = "#CCD0CF";

export default function StackMarquee() {
  const { ref, visible } = useFadeInOnScroll();
  const doubled = [...stackItems, ...stackItems];

  return (
    <section className="section-transition relative border-y border-elevated-surface bg-surface-bg py-6">
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-32"
        style={{
          background: `linear-gradient(to bottom, ${DEEP_BG_HEX}, transparent)`,
        }}
        aria-hidden="true"
      />

      <div
        ref={ref}
        className={cn(
          "transition-all duration-700 ease-out",
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        )}
      >
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {doubled.map((item, index) => (
              <span
                key={`${item.name}-${index}`}
                className="mx-4 font-sans text-sm tracking-wide text-muted-accent"
              >
                {item.name} ·
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32"
        style={{
          background: `linear-gradient(to bottom, transparent, ${DEEP_BG_HEX})`,
        }}
        aria-hidden="true"
      />
    </section>
  );
}
