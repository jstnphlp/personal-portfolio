interface Project {
  readonly id: string;
  readonly name: string;
  readonly fullName: string;
  readonly type: string;
  readonly initials: string;
  readonly status: "In Progress" | "Complete";
  readonly glaze: string;
  readonly stack: readonly string[];
  readonly github: string;
  readonly live: string | null;
}

const PROJECTS: readonly Project[] = [
  {
    id: "01",
    name: "HMBMS",
    fullName: "Human Milk Bank Management System",
    type: "Full Stack Web App",
    initials: "HB",
    status: "In Progress",
    glaze:
      "Built for the Makati Milk Bank, HMBMS is a full-scale hospital management system handling donor tracking, milk processing, and distribution workflows — the kind of software that actually matters. Architected with Feature-Sliced Design for long-term maintainability.",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Shadcn UI",
      "Tailwind CSS",
    ],
    github: "https://github.com/jstnphlp",
    live: null,
  },
  {
    id: "02",
    name: "FurnitureOdyssey POS",
    fullName: "Point of Sale System",
    type: "Business Tool",
    initials: "FO",
    status: "Complete",
    glaze:
      "A full-featured point of sale system built for a furniture business — complete with inventory management, transaction handling, and PDF receipt generation. Built fast, built clean, built with real Philippine business context in mind.",
    stack: ["Next.js", "TypeScript", "Prisma", "Supabase", "Tailwind CSS"],
    github: "https://github.com/jstnphlp",
    live: null,
  },
  {
    id: "03",
    name: "Calendar Generator",
    fullName: "Philippine Almanac Calendar Generator",
    type: "Web App",
    initials: "CG",
    status: "Complete",
    glaze:
      "A web app that generates traditional Filipino almanac-style wall calendars — replicating the exact layout Filipinos grew up with, built in React. A deeply local product for a deeply local need.",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "date-fns"],
    github: "https://github.com/jstnphlp/calendar-generator",
    live: null,
  },
  {
    id: "04",
    name: "SakayOS",
    fullName: "Metro Manila OS Concept Simulator",
    type: "Academic Project",
    initials: "SK",
    status: "Complete",
    glaze:
      "An OS concept simulator wrapped in a Metro Manila commuting theme — Round Robin scheduling becomes Jeepney Bunching, memory management becomes passenger routing. A creative academic project that made OS theory actually interesting.",
    stack: ["Python", "Textual", "Rich", "psutil"],
    github: "https://github.com/jstnphlp",
    live: null,
  },
] as const;

const PROJECT_COUNT = PROJECTS.length;
const SECTION_LABEL = "04 / PROJECTS";
const BUILT_WITH_LABEL = "Built with";
const TRANSITION_DELAY_MS = 300;

export { PROJECTS, PROJECT_COUNT, SECTION_LABEL, BUILT_WITH_LABEL, TRANSITION_DELAY_MS };
export type { Project };
