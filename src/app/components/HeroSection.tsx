"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import ProximityDotGrid from "@/components/ProximityDotGrid";

interface SkillItem {
  readonly name: string;
}

const SKILLS: readonly SkillItem[] = [
  { name: "React" },
  { name: "Next.js" },
  { name: "TypeScript" },
  { name: "Python" },
  { name: "Tailwind" },
  { name: "Prisma" },
  { name: "PostgreSQL" },
];

const HEADLINE_WORDS = ["Developer.", "Student.", "Builder."] as const;
const IDENTITY = "Justin Philip Martinez";
const ROLE_LINE = "Crafting full stack products from Taguig, PH";
const CTA_TEXT = "View my work →";
const CTA_HREF = "#work";
const NAME_TAG = "JUSTIN PHILIP MARTINEZ";
const AVAILABILITY = "Available for work";
const LOCATION_TAG = "Taguig, Metro Manila — PH";
const SCROLL_LABEL = "scroll";

const DEEP_BG_HEX = "#06141B";
const SURFACE_BG_HEX = "#11212D";

const HEADLINE_CLASSES =
  "font-sans text-7xl font-bold tracking-tight leading-none text-[#CCD0CF] md:text-8xl lg:text-9xl";

const MOUSE_RESET_X = -9999;
const MOUSE_RESET_Y = -9999;

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef<{ readonly x: number; readonly y: number }>({
    x: MOUSE_RESET_X,
    y: MOUSE_RESET_Y,
  });
  const globalMouseRef = useRef<{ readonly clientX: number; readonly clientY: number }>({
    clientX: MOUSE_RESET_X,
    clientY: MOUSE_RESET_Y,
  });

  const updateRelativePosition = (): void => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

    if (!isVisible) {
      mousePosRef.current = { x: MOUSE_RESET_X, y: MOUSE_RESET_Y };
      return;
    }

    if (globalMouseRef.current.clientX === MOUSE_RESET_X) return;

    mousePosRef.current = {
      x: globalMouseRef.current.clientX - rect.left,
      y: globalMouseRef.current.clientY - rect.top,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    globalMouseRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
    };
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    const handleScroll = (): void => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      hero.style.setProperty("--scroll-progress", `${progress}`);
      updateRelativePosition();
    };

    const handleGlobalMouseMove = (e: MouseEvent): void => {
      globalMouseRef.current = {
        clientX: e.clientX,
        clientY: e.clientY,
      };
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen snap-start snap-always overflow-hidden"
      style={{
        background: `color-mix(in srgb, ${SURFACE_BG_HEX} calc(var(--scroll-progress, 0) * 100%), ${DEEP_BG_HEX})`,
        transition: "background 0.1s ease-out",
      }}
    >
      <ProximityDotGrid
        dotSize={3}
        gap={28}
        baseOpacity={0.35}
        glowOpacity={1}
        glowRadius={250}
        dotColor="#4A5C6A"
        glowColor="#9BA8AB"
        mousePosRef={mousePosRef}
      />

      {/* Top-left — name tag */}
      <BlurFade delay={0.2} direction="down">
        <span className="absolute top-8 left-6 z-10 font-sans text-xs tracking-widest text-[#4A5C6A] uppercase md:left-16 lg:left-24">
          {NAME_TAG}
        </span>
      </BlurFade>

      {/* Top-right — availability badge */}
      <BlurFade delay={0.3} direction="down">
        <span className="absolute top-8 right-6 z-10 flex items-center font-sans text-xs tracking-widest text-[#4A5C6A] md:right-16 lg:right-24">
          <span className="relative mr-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {AVAILABILITY}
        </span>
      </BlurFade>

      {/* Center content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-24 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-6xl">
          {HEADLINE_WORDS.map((word, index) => (
            <BlurFade key={word} delay={0.2 + index * 0.1} direction="down">
              <h1 className={HEADLINE_CLASSES}>{word}</h1>
            </BlurFade>
          ))}

          <BlurFade delay={0.5} direction="down">
            <p className="mt-6 font-sans text-base font-normal tracking-wide text-[#9BA8AB] md:text-lg">
              {IDENTITY}
            </p>
          </BlurFade>

          <BlurFade delay={0.6} direction="down">
            <p className="mt-2 font-sans text-sm tracking-wide text-[#4A5C6A]">
              {ROLE_LINE}
            </p>
          </BlurFade>

          <BlurFade delay={0.7} direction="down">
            <div className="mt-8">
              <a
                href={CTA_HREF}
                className="group relative inline-block font-sans text-base text-[#CCD0CF]"
              >
                {CTA_TEXT}
                <span className="block h-px w-0 bg-[#CCD0CF] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>
          </BlurFade>

          <BlurFade delay={0.8} direction="down">
            <div className="mt-12 border-t border-[#253745]" />
          </BlurFade>
        </div>
      </div>

      {/* Bottom-left — location tag */}
      <BlurFade delay={0.9} direction="up">
        <span className="absolute bottom-8 left-6 z-10 font-sans text-xs tracking-widest text-[#4A5C6A] uppercase md:left-16 lg:left-24">
          {LOCATION_TAG}
        </span>
      </BlurFade>

      {/* Bottom-center — scroll indicator */}
      <BlurFade delay={1.0} direction="up">
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1">
          <span className="font-sans text-xs tracking-widest text-[#4A5C6A] uppercase">
            {SCROLL_LABEL}
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[#4A5C6A]" />
        </div>
      </BlurFade>

      {/* Bottom-right — skill marquee */}
      <BlurFade delay={0.9} direction="up">
        <div className="absolute bottom-8 right-6 z-10 max-w-xs md:right-16 lg:right-24">
          <Marquee
            pauseOnHover={false}
            repeat={2}
            className="max-w-xs [--duration:20s] [--gap:0rem]"
          >
            {SKILLS.map((skill) => (
              <span key={skill.name} className="flex items-center">
                <span className="font-sans text-xs text-[#9BA8AB]">
                  {skill.name}
                </span>
                <span className="mx-2 font-sans text-xs text-[#4A5C6A]">
                  ·
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </BlurFade>
    </section>
  );
}
