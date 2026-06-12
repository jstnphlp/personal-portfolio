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

export default function ProjectsSection() {
  return (
    <section id="work" className="bg-deep-bg px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <span className="font-sans text-xs tracking-widest text-secondary-text">
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
              <span className="px-4 text-right font-sans text-xs tracking-widest text-secondary-text">
                {project.tag}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
