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
    <footer className="section-transition relative overflow-hidden border-t border-elevated-surface bg-deep-bg px-6 py-8">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

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
          "relative z-10 transition-all duration-700 ease-out",
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
