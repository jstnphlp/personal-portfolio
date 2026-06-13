export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-elevated-surface bg-surface-bg px-6 py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div>
          <span className="font-sans text-xs tracking-widest text-muted-accent">
            01 / ABOUT
          </span>
        </div>

        <div className="space-y-6">
          <p className="font-sans text-base font-normal leading-relaxed text-secondary-text">
            I&apos;m Philip Justin, a Computer Science student at Mapúa
            University Makati and a full-stack developer focused on building
            practical, well-crafted web applications. I enjoy working across the
            entire stack — from designing clean interfaces to structuring
            reliable back-end systems.
          </p>
          <p className="font-sans text-base font-normal leading-relaxed text-secondary-text">
            My projects range from academic systems like a Human Milk Bank
            Management System to point-of-sale applications and Philippine
            almanac generators. I care about writing maintainable code and
            building tools that solve real problems.
          </p>
          <p className="font-sans text-base font-normal leading-relaxed text-secondary-text">
            Beyond code, I run{" "}
            <span className="text-primary-text">beyond.ink</span> — a print and
            design shop where I explore my interest in visual design and
            production. It keeps me grounded in the creative side of building
            things.
          </p>
        </div>
      </div>
    </section>
  );
}
