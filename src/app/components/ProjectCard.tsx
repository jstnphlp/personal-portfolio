import type { Project } from "./projectsData";

interface ProjectCardProps {
  readonly project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps): React.JSX.Element {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border p-8 [transform-style:preserve-3d]" style={{ backgroundColor: "#B8BCBB", borderColor: "#30363d" }}>
      {/* Project visual placeholder */}
      <div className="flex h-64 w-full shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#0d1117" }}>
        <span className="font-sans text-6xl font-bold tracking-widest" style={{ color: "#8b949e" }}>
          {project.initials}
        </span>
      </div>

      {/* Project name */}
      <h3 className="mt-6 font-sans text-2xl font-bold" style={{ color: "#e6edf3" }}>
        {project.name}
      </h3>

      {/* Full name */}
      <p className="mt-2 font-sans text-sm leading-relaxed" style={{ color: "#8b949e" }}>
        {project.fullName}
      </p>

      {/* Type + Status */}
      <div className="mt-4 flex items-center gap-2">
        <span className="rounded-full px-4 py-1.5 font-sans text-sm tracking-wide" style={{ backgroundColor: "#0d1117", borderColor: "#30363d", color: "#8b949e", borderWidth: "1px", borderStyle: "solid" }}>
          {project.type}
        </span>
        <span className="rounded-full px-4 py-1.5 font-sans text-sm" style={{ backgroundColor: "#0d1117", borderColor: "#30363d", color: "#8b949e", borderWidth: "1px", borderStyle: "solid" }}>
          {project.status}
        </span>
      </div>

      {/* Tech stack */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full px-3 py-1 font-sans text-xs"
            style={{ backgroundColor: "#0d1117", borderColor: "#30363d", color: "#8b949e", borderWidth: "1px", borderStyle: "solid" }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
