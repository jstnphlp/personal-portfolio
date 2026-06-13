"use client";

import { useScrollTypewriter } from "@/hooks/useScrollTypewriter";
import KineticTextMatrix from "./KineticTextMatrix";

const TRACKING_LABEL = "01 / SPECIFICATION";

const HEADLINE = "Crafting systems that feel effortless.";

const PROSE_TEXT =
  "I\u2019m a full stack developer and CS student at Mapua University Makati. I build products that are fast, purposeful, and grounded in real user needs \u2014 from architecture to interface. Outside of coursework, I run beyond.ink, a print and design shop in Taguig. I like systems that work quietly, and interfaces that get out of the way.";

const CURSOR_CLASS = "inline-block w-[2px] h-[1em] bg-primary-text ml-0.5 align-middle animate-pulse";

function TypewriterProse(): React.JSX.Element {
  const { ref, visibleChars } = useScrollTypewriter<HTMLParagraphElement>(PROSE_TEXT.length);

  const visibleText = PROSE_TEXT.slice(0, visibleChars);
  const isComplete = visibleChars >= PROSE_TEXT.length;

  return (
    <p
      ref={ref}
      aria-label={PROSE_TEXT}
      className="min-h-[6em] font-sans text-base leading-relaxed text-secondary-text md:text-lg"
    >
      {visibleText}
      {!isComplete && <span className={CURSOR_CLASS} aria-hidden="true" />}
    </p>
  );
}

export default function AboutSection(): React.JSX.Element {
  return (
    <section
      id="about"
      className="flex min-h-screen snap-start snap-always w-full flex-col items-center justify-center bg-deep-bg px-6 py-12 md:px-16 lg:px-24"
    >
      <div className="w-full max-w-7xl">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="space-y-6 lg:col-span-7">
            <span className="block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-muted-accent">
              {TRACKING_LABEL}
            </span>

            <h2 className="font-sans text-4xl font-bold leading-tight tracking-tight text-primary-text md:text-5xl lg:text-6xl">
              {HEADLINE}
            </h2>

            <TypewriterProse />
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <KineticTextMatrix />
          </div>
        </div>
      </div>
    </section>
  );
}
