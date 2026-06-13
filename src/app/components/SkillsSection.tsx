const TRACKING_LABEL = "02 // TECH ARCHITECTURE";
const HEADLINE = "ENGINEERING ECOSYSTEMS";
const PROSE_1 =
  "I design and build optimized web architectures from the ground up \u2014 strongly typed, modular, and engineered for performance across every layer of the stack, from database schema to pixel-perfect interface.";
const PROSE_2 =
  "My Cisco CCNA and OSPF routing background gives me a systems-level perspective on how data moves, scales, and recovers across complex network topologies under real production load.";
const PROSE_3 =
  "Every system I ship is built for maintainability and robustness \u2014 from Java-backed services and optimized MySQL models to responsive Next.js frontends deployed at the edge.";

export default function SkillsSection(): React.JSX.Element {
  return (
    <section
      id="skills"
      className="relative flex min-h-screen snap-start snap-always w-full items-center justify-center overflow-hidden bg-deep-bg px-6 md:px-16 lg:px-24"
    >
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <span className="block font-sans text-xs font-semibold uppercase tracking-[0.25em] text-muted-accent">
          {TRACKING_LABEL}
        </span>
        <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-primary-text md:text-4xl">
          {HEADLINE}
        </h2>
        <div className="space-y-4">
          <p className="font-sans text-base leading-relaxed text-secondary-text">
            {PROSE_1}
          </p>
          <p className="font-sans text-base leading-relaxed text-secondary-text">
            {PROSE_2}
          </p>
          <p className="font-sans text-base leading-relaxed text-secondary-text">
            {PROSE_3}
          </p>
        </div>
      </div>
    </section>
  );
}
