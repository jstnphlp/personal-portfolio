interface SkillTag {
  readonly name: string;
}

const skills: readonly SkillTag[] = [
  { name: "React" },
  { name: "Next.js" },
  { name: "TypeScript" },
  { name: "Python" },
  { name: "Tailwind CSS" },
  { name: "Prisma" },
  { name: "PostgreSQL" },
  { name: "Figma" },
  { name: "Git" },
];

export default function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col justify-between bg-deep-bg px-6 pt-32 pb-12">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-sans text-6xl font-bold leading-[1.05] tracking-tight text-primary-text md:text-7xl lg:text-8xl">
          Full Stack Developer
          <br />
          &amp; CS Student
        </h1>
        <p className="mt-8 max-w-xl font-sans text-lg font-normal leading-relaxed text-secondary-text">
          Building products from Manila.
        </p>
        <div className="mt-10">
          <a
            href="mailto:philipjustinlp@gmail.com"
            className="group relative inline-block font-sans text-base text-primary-text"
          >
            Get in touch
            <span className="block h-px w-0 bg-primary-text transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-end">
        <span className="font-sans text-xs tracking-widest text-muted-accent">
          Taguig, PH —
        </span>

        <div className="relative w-full overflow-hidden md:max-w-2xl">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...skills, ...skills].map((skill, index) => (
              <span
                key={`${skill.name}-${index}`}
                className="mx-4 font-sans text-sm tracking-wide text-muted-accent"
              >
                {skill.name} ·
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
