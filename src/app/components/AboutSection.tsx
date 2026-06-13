"use client";

import { cn } from "@/lib/utils";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

const PARAGRAPH_1 =
  "I\u2019m a full stack developer and CS student at Mapua University Makati, building products that are fast, purposeful, and grounded in real user needs. I care about the craft \u2014 from architecture to interface.";

const PARAGRAPH_2 =
  "Outside of coursework, I run beyond.ink, a print and design shop in Taguig. I like systems that work quietly, and interfaces that get out of the way.";

const EXPERTISE_VALUES = ["Full Stack Dev", "UI/UX Design", "System Design"];
const CURRENTLY_VALUES = ["CS Student", "beyond.ink", "Open to Work"];
const LOCATION_VALUE = "Taguig, PH";

function MetadataColumn({
  label,
  values,
}: {
  readonly label: string;
  readonly values: readonly string[];
}) {
  return (
    <div>
      <p className="mb-3 font-sans text-xs tracking-widest text-muted-accent uppercase">
        {label}
      </p>
      {values.map((value) => (
        <p
          key={value}
          className="font-sans text-sm font-semibold leading-loose text-primary-text"
        >
          {value}
        </p>
      ))}
    </div>
  );
}

export default function AboutSection() {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section
      id="about"
      className="flex min-h-screen items-center justify-center bg-deep-bg px-6 py-12 md:px-16 lg:px-24"
    >
      <div
        ref={ref}
        className={cn(
          "w-full max-w-5xl rounded-2xl bg-surface-bg p-10 transition-all duration-700 ease-out md:p-14",
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        )}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          {/* Left column */}
          <div>
            <h2 className="font-sans text-4xl font-bold text-primary-text">
              About
            </h2>
            <div className="mt-3 w-8 border-t-2 border-primary-text" />
          </div>

          {/* Right column */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <p className="font-sans text-sm leading-relaxed text-secondary-text md:text-base">
                {PARAGRAPH_1}
              </p>
              <p className="font-sans text-sm leading-relaxed text-secondary-text md:text-base">
                {PARAGRAPH_2}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-elevated-surface pt-8">
              <MetadataColumn label="Expertise" values={EXPERTISE_VALUES} />
              <MetadataColumn label="Currently" values={CURRENTLY_VALUES} />
              <div>
                <p className="mb-3 font-sans text-xs tracking-widest text-muted-accent uppercase">
                  Location
                </p>
                <p className="font-sans text-sm font-semibold leading-loose text-primary-text">
                  {LOCATION_VALUE}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
