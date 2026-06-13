"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
  readonly label: string;
  readonly href: string;
}

const links: readonly NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "mailto:philipjustinlp@gmail.com" },
];

const SCROLL_THRESHOLD_RATIO = 0.85;

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setVisible(window.scrollY > window.innerHeight * SCROLL_THRESHOLD_RATIO);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-deep-bg",
        "px-6 md:px-16 lg:px-24 py-5",
        "transition-all duration-500 ease-in-out",
        visible
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-2"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <a
          href="#"
          className="font-sans text-sm font-semibold tracking-tight text-primary-text"
        >
          Philip Justin
        </a>
        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-secondary-text transition-colors duration-200 hover:text-primary-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
