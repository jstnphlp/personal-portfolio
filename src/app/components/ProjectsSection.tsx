"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import { useSwipe } from "@/hooks/useSwipe";

import {
  PROJECTS,
  PROJECT_COUNT,
  SECTION_LABEL,
  BUILT_WITH_LABEL,
} from "./projectsData";

import ProjectCard from "./ProjectCard";

const FADE_DURATION_MS = 300;
const MAX_VISIBLE_STACK = 3;

const STACK_ROTATIONS = [-1, 4, 8] as const;
const STACK_Y_OFFSETS = [0, 8, 14] as const;
const STACK_X_OFFSETS = [0, 6, 10] as const;
const STACK_SCALES = [1, 0.97, 0.94] as const;
const STACK_OPACITIES = [1, 0.6, 0.35] as const;
const STACK_Z_INDEXES = [30, 20, 10] as const;

export default function ProjectsSection(): React.JSX.Element {
  const { ref, visible } = useFadeInOnScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const activeProject = PROJECTS[activeIndex];

  const switchProject = useCallback(
    (newIndex: number): void => {
      if (newIndex === activeIndex || fading) return;
      setFading(true);
      setTimeout(() => {
        setActiveIndex(newIndex);
        setFading(false);
      }, FADE_DURATION_MS);
    },
    [activeIndex, fading]
  );

  const goNext = useCallback((): void => {
    switchProject((activeIndex + 1) % PROJECT_COUNT);
  }, [activeIndex, switchProject]);

  const goPrev = useCallback((): void => {
    switchProject((activeIndex - 1 + PROJECT_COUNT) % PROJECT_COUNT);
  }, [activeIndex, switchProject]);

  const swipeHandlers = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev });

  return (
    <section
      id="work"
      className="flex min-h-screen snap-start snap-always flex-col items-center justify-center bg-deep-bg px-6 py-8 md:px-16 lg:px-24"
    >
      <div
        ref={ref}
        className={cn(
          "w-full max-w-7xl transition-opacity duration-700 ease-out",
          visible ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_520px] lg:gap-12">
          {/* Left column — project description */}
          <div
            className={cn(
              "space-y-3 transition-opacity duration-300 ease-in-out",
              fading ? "opacity-0" : "opacity-100"
            )}
          >
            <span className="block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-muted-accent">
              {SECTION_LABEL}
            </span>

            <span className="block font-sans text-xs tracking-widest text-muted-accent">
              {activeProject.id} / {String(PROJECT_COUNT).padStart(2, "0")}
            </span>

            <h2 className="font-sans text-4xl font-bold leading-tight tracking-tight text-primary-text md:text-5xl lg:text-6xl">
              {activeProject.name}
            </h2>

            <span className="inline-flex rounded-full bg-elevated-surface px-3 py-1 font-sans text-xs tracking-wide text-secondary-text">
              {activeProject.type}
            </span>

            <p className="font-sans text-sm leading-relaxed text-secondary-text md:text-base">
              {activeProject.glaze}
            </p>

            <div>
              <span className="mb-2 block font-sans text-xs uppercase tracking-widest text-muted-accent">
                {BUILT_WITH_LABEL}
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-elevated-surface bg-surface-bg px-3 py-1 font-sans text-xs text-secondary-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs tracking-wide text-secondary-text transition-colors duration-200 hover:text-primary-text"
              >
                GitHub →
              </a>
              {activeProject.live ? (
                <a
                  href={activeProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs tracking-wide text-secondary-text transition-colors duration-200 hover:text-primary-text"
                >
                  Live →
                </a>
              ) : null}
            </div>

            {/* Navigation row — arrows + dot indicators */}
            <nav className="flex items-center gap-4 pt-1" aria-label="Project navigation">
              <button
                type="button"
                onClick={goPrev}
                disabled={fading}
                aria-label="Previous project"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-elevated-surface text-secondary-text transition-all duration-200 hover:border-primary-text hover:text-primary-text disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2.5" role="tablist" aria-label="Project indicators">
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to ${p.name}`}
                    onClick={() => switchProject(i)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all duration-300",
                      i === activeIndex
                        ? "scale-125 bg-primary-text"
                        : "bg-elevated-surface hover:bg-muted-accent"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                disabled={fading}
                aria-label="Next project"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-elevated-surface text-secondary-text transition-all duration-200 hover:border-primary-text hover:text-primary-text disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>

          {/* Right column — stacked card deck */}
          <div
            className="flex items-center justify-center overflow-visible px-8 py-8 lg:justify-end"
            {...swipeHandlers}
          >
            <div className="relative h-[580px] w-[460px] md:h-[620px] md:w-[500px]">
              {PROJECTS.map((project, i) => {
                const stackOffset =
                  ((i - activeIndex) % PROJECT_COUNT + PROJECT_COUNT) %
                  PROJECT_COUNT;

                if (stackOffset >= MAX_VISIBLE_STACK) return null;

                return (
                  <div
                    key={project.id}
                    className="absolute inset-0 transition-all duration-500 ease-in-out"
                    style={{
                      transform: `rotate(${STACK_ROTATIONS[stackOffset]}deg) translateY(${STACK_Y_OFFSETS[stackOffset]}px) translateX(${STACK_X_OFFSETS[stackOffset]}px) scale(${STACK_SCALES[stackOffset]})`,
                      opacity: STACK_OPACITIES[stackOffset],
                      zIndex: STACK_Z_INDEXES[stackOffset],
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
