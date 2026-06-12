interface NavLink {
  readonly label: string;
  readonly href: string;
}

const links: readonly NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "mailto:philipjustinlp@gmail.com" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-deep-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="#"
          className="font-sans text-sm font-semibold tracking-tight text-primary-text"
        >
          Philip Justin
        </a>
        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-secondary-text transition-colors duration-200 hover:text-primary-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
