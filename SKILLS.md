# SKILLS.md — personal-portfolio

This file documents the skills and MCP servers available to agents working on this project.
Reference this before starting any task to know which tools to reach for.

---

## MCP Servers

### shadcn/ui MCP
**Purpose:** Install, configure, and generate shadcn/ui components directly into the project.

**When to use:**
- Adding any new UI component (Button, Dialog, Card, Sheet, Dropdown, etc.)
- Scaffolding component variants consistent with the project's existing shadcn setup
- Checking what components are already installed before writing custom ones

**Key rule:** Always prefer installing a shadcn component over writing one from scratch. Check if a component exists here before building custom UI.

---

### Chrome DevTools MCP
**Purpose:** Live inspection and debugging of the running portfolio in the browser.

**When to use:**
- Verifying that Tailwind color tokens are rendering correctly (`deep-bg`, `surface-bg`, etc.)
- Debugging layout issues (spacing, overflow, flex/grid problems)
- Checking computed styles and font rendering
- Inspecting the DOM after component changes
- Performance profiling (paint, layout shift, render time)

**Key rule:** After any visual change, use this to confirm the render matches intent — don't just trust the code.

---

### Magic MCP
**Purpose:** Add-ons and enhanced capabilities for the agent environment.

**When to use:**
- Accessing additional utilities not covered by other MCPs
- Extended file operations or environment augmentation needed during a task
- Any task where the agent needs capabilities beyond the base toolset

---

## Skills

### frontend-design
**Location:** `/mnt/skills/public/frontend-design/SKILL.md`

**Purpose:** Guidance for making deliberate, distinctive visual design decisions — avoiding templated defaults and building something that looks specific to this project.

**When to use:**
- Starting any new section or page layout
- Making typography, spacing, or color decisions
- Reviewing whether a design looks generic vs. intentional
- Choosing motion/animation behavior
- Writing UI copy (labels, CTAs, headings)

**Key rules for this project:**
- All color decisions must reference the tokens in `tailwind.config.ts` — no hardcoded hex values
- The palette is dark teal-based (`deep-bg` → `surface-bg` → `elevated-surface`), not pure black — design choices should feel warm and editorial, not cold
- The design is inspired by verteal.com: minimal, high contrast, large typography, lots of breathing room
- Read the full SKILL.md before making any layout or visual decisions

---

### web-design-guidelines (Design Audit)
**Purpose:** A reference for evaluating and auditing UI against established web design best practices — accessibility, visual hierarchy, responsive behavior, and consistency.

**When to use:**
- Auditing any section before marking it complete
- Checking color contrast ratios (especially `secondary-text` on `deep-bg`)
- Verifying responsive behavior at mobile, tablet, and desktop breakpoints
- Reviewing spacing and typographic hierarchy for consistency across sections
- Ensuring interactive elements (links, hover states) meet usability standards

**Key rules for this project:**
- Run a design audit after completing each major section (Hero, About, Projects, Footer)
- Flag any contrast issues between `text-secondary-text (#9BA8AB)` and `bg-deep-bg (#06141B)` — these are close and must be verified
- All hover/focus states must be visible and intentional

---

## Quick Reference — When to Reach for What

| Task | Tool |
|---|---|
| Add a UI component | shadcn MCP first, then custom if not available |
| Check if styles are rendering correctly | Chrome DevTools MCP |
| Making a layout or visual decision | frontend-design skill |
| Auditing a finished section | web-design-guidelines skill |
| Need extended agent capabilities | Magic MCP |

---

## Project Color Tokens (from tailwind.config.ts)

| Token | Hex | Role |
|---|---|---|
| `deep-bg` | `#06141B` | Page background, navbar, footer |
| `surface-bg` | `#11212D` | Section backgrounds, card backgrounds |
| `elevated-surface` | `#253745` | Hover states, dividers, borders |
| `muted-accent` | `#4A5C6A` | Decorative text, fine print |
| `secondary-text` | `#9BA8AB` | Body copy, labels, metadata |
| `primary-text` | `#CCD0CF` | Headlines, primary content |

**Font:** Inter — configured as `font-sans` via `var(--font-inter)`
