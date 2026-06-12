interface StackItem {
  readonly name: string;
}

const stackItems: readonly StackItem[] = [
  { name: "React" },
  { name: "Next.js" },
  { name: "TypeScript" },
  { name: "Tailwind CSS" },
  { name: "Python" },
  { name: "Prisma" },
  { name: "PostgreSQL" },
  { name: "Figma" },
  { name: "Git" },
];

export default function StackMarquee() {
  const doubled = [...stackItems, ...stackItems];

  return (
    <section className="border-y border-elevated-surface bg-surface-bg py-6">
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((item, index) => (
            <span
              key={`${item.name}-${index}`}
              className="mx-4 font-sans text-sm tracking-wide text-secondary-text"
            >
              {item.name} ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
