interface FooterLink {
  readonly label: string;
  readonly href: string;
}

const links: readonly FooterLink[] = [
  { label: "Email", href: "mailto:philipjustinlp@gmail.com" },
  { label: "GitHub", href: "https://github.com/jstnphlp" },
];

export default function Footer() {
  return (
    <footer className="border-t border-elevated-surface bg-deep-bg px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-sans text-xs text-muted-accent">
          Philip Justin © 2026
        </span>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="font-sans text-xs text-secondary-text transition-colors duration-200 hover:text-primary-text"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
