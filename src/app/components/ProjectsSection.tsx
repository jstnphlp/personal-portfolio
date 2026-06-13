"use client";

import { cn } from "@/lib/utils";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface Project {
  readonly name: string;
  readonly tag: string;
  readonly href: string;
}

const projects: readonly Project[] = [
  {
    name: "HMBMS",
    tag: "Next.js · Human Milk Bank System",
    href: "#",
  },
  {
    name: "FurnitureOdyssey POS",
    tag: "Next.js · Point of Sale App",
    href: "#",
  },
  {
    name: "Calendar Generator",
    tag: "React/Vite · Philippine Almanac Web App",
    href: "#",
  },
  {
    name: "SakayOS",
    tag: "HTML/JS · OS Concept Simulator",
    href: "#",
  },
];

const SURFACE_BG_HEX = "#9BA8AB";

export default function ProjectsSection() {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section id="work" className="section-transition relative snap-start snap-always bg-deep-bg px-6 py-24">
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-32"
        style={{
          background: `linear-gradient(to bottom, ${SURFACE_BG_HEX}, transparent)`,
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
        <div className="mx-auto max-w-6xl">
          <span className="font-sans text-xs tracking-widest text-muted-accent">
            02 / SELECTED WORK
          </span>

          <div className="mt-12">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.href}
                className="group flex items-center justify-between border-b border-elevated-surface py-6 transition-colors duration-200 hover:bg-surface-bg"
              >
                <span className="px-4 font-sans text-2xl font-semibold text-primary-text transition-colors duration-200 md:text-3xl lg:text-4xl">
                  {project.name}
                </span>
                <span className="px-4 text-right font-sans text-xs tracking-widest text-muted-accent">
                  {project.tag}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32"
        style={{
          background: `linear-gradient(to bottom, transparent, ${SURFACE_BG_HEX})`,
        }}
        aria-hidden="true"
      />
    </section>
  );
}
