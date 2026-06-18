"use client";

import { CodeBlock } from "@/components/ui/code-block";
import { GridPattern } from "@/components/ui/grid-pattern";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import { cn } from "@/lib/utils";

const LABEL = "03 / SKILLS";
const HEADING = "What I work with.";
const SUBHEADING = "Full stack development and data science.";
const CONTEXT =
  "I build across the full stack and work with data. I prefer knowing tools deeply over collecting them.";

const STAT_PILLS = [
  "Full Stack Developer",
  "Data Science Student",
  "Available for Work",
] as const;

const CATEGORIES = [
  "Frontend",
  "Backend",
  "Data Science",
  "Tools",
] as const;

const TABS = [
  {
    name: "frontend.ts",
    language: "typescript",
    code: `// Frontend stack
const frontend = {
  core: ["React 18", "Next.js 14", "TypeScript"],
  styling: ["Tailwind CSS", "Shadcn UI", "Aceternity UI", "Magic UI"],
  tooling: ["Vite", "ESLint", "Prettier"],
  state: ["React Hooks", "Context API"],
  proficiency: "advanced",
} satisfies Record<string, unknown>;`,
  },
  {
    name: "backend.ts",
    language: "typescript",
    code: `// Backend stack
const backend = {
  runtime: ["Node.js", "Next.js API Routes"],
  database: ["PostgreSQL", "Prisma ORM"],
  auth: ["NextAuth.js"],
  architecture: ["REST APIs", "Feature-Sliced Design"],
  deployment: ["Vercel", "Railway"],
  proficiency: "intermediate",
} satisfies Record<string, unknown>;`,
  },
  {
    name: "data_science.py",
    language: "python",
    code: `# Data Science stack
skills = {
    "languages": ["Python", "SQL"],
    "libraries": ["pandas", "NumPy", "scikit-learn", "Matplotlib"],
    "notebooks": ["Jupyter", "Google Colab"],
    "focus_areas": [
        "Exploratory Data Analysis",
        "Machine Learning",
        "Data Visualization",
        "Statistical Analysis",
    ],
    "datasets": ["PSA FIES 2023", "Philippine regional data"],
    "proficiency": "intermediate",
}`,
  },
  {
    name: "tools.sh",
    language: "bash",
    code: `# Tools I use daily
dev_tools=(
  "Git & GitHub"       # version control
  "VS Code"            # primary editor  
  "Figma"              # UI design
  "Vercel"             # deployment
  "Cursor"             # AI-assisted coding
  "Kilo"               # agent workflows
  "Antigravity"        # UI agent
  "Stitch"             # design generation
  "Postman"            # API testing
)

business_tools=(
  "beyond.ink"         # print & design shop, Taguig PH
  "Canva"              # client-facing design
)`,
  },
] as const;

export default function SkillsSection(): React.JSX.Element {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section
      id="skills"
      className="relative flex min-h-screen snap-start snap-always w-full flex-col items-center justify-center overflow-hidden bg-deep-bg px-6 py-12 md:px-16 lg:px-24"
    >
      <GridPattern
        width={40}
        height={40}
        strokeDasharray="1 3"
        className="absolute inset-0 z-0 fill-[#253745]/10 stroke-[#253745]/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
      />

      <div
        ref={ref}
        className={cn(
          "relative z-10 w-full max-w-7xl transition-all duration-700 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="flex justify-center lg:col-span-7 lg:justify-start">
            <CodeBlock language="typescript" filename="frontend.ts" tabs={[...TABS]} />
          </div>

          <div className="space-y-6 lg:col-span-5">
            <span className="block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-muted-accent">
              {LABEL}
            </span>

            <h2 className="font-sans text-4xl font-bold leading-tight tracking-tight text-primary-text md:text-5xl lg:text-6xl">
              {HEADING}
            </h2>

            <p className="font-sans text-base leading-relaxed text-secondary-text md:text-lg">
              {SUBHEADING}
            </p>

            <p className="font-sans text-base leading-relaxed text-secondary-text md:text-lg">
              {CONTEXT}
            </p>

            <div className="flex flex-wrap gap-3">
              {STAT_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-elevated-surface bg-surface-bg px-4 py-1.5 font-sans text-xs text-secondary-text"
                >
                  {pill}
                </span>
              ))}
            </div>

            <ul className="space-y-2" aria-label="Skill categories">
              {CATEGORIES.map((cat) => (
                <li key={cat} className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-muted-accent"
                    aria-hidden="true"
                  />
                  <span className="font-sans text-xs tracking-wide text-secondary-text">
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TODO: Add certifications from LinkedIn — Justin to fill in */}
      </div>
    </section>
  );
}
