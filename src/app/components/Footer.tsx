"use client";

import { cn } from "@/lib/utils";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface FooterLink {
  readonly label: string;
  readonly href: string;
}

const links: readonly FooterLink[] = [
  { label: "Email", href: "mailto:philipjustinlp@gmail.com" },
  { label: "GitHub", href: "https://github.com/jstnphlp" },
];

const SURFACE_BG_HEX = "#9BA8AB";

export default function Footer() {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <footer className="section-transition relative border-t border-elevated-surface bg-deep-bg px-6 py-8">
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-sans text-xs text-muted-accent">
            Philip Justin © 2026
          </span>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="font-sans text-xs text-secondary-text transition-colors duration-200 hover:text-primary-text"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
