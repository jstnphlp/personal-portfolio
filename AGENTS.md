<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Coding Standards for AI Agents

This document defines the mandatory coding standards for all AI agents contributing to this Next.js App Router, TypeScript, and Tailwind CSS codebase. Every rule below is non-negotiable.

---

## Architecture

- **Default to React Server Components (RSC).** All components are server components unless there is a proven need for client interactivity.
- **Use `"use client"` only when strictly necessary** — specifically when a component requires hooks (`useState`, `useEffect`, `useRef`, etc.) or direct DOM/browser API access. If you can achieve the same result on the server, do so.
- **Keep components modular and single-purpose.** Each component should do one thing well. If a component handles multiple concerns, split it.
- **Prefer server-side data fetching** using `async` server components, `fetch`, or direct database calls over client-side fetching.
- **Colocate related files.** Keep components, their styles, types, and tests in the same directory under `src/`.
- **Use the App Router conventions correctly:**
  - `page.tsx` for route pages
  - `layout.tsx` for shared layouts
  - `loading.tsx` for loading UI
  - `error.tsx` for error boundaries
  - `not-found.tsx` for 404 pages
  - `route.ts` for API routes
- **Never mix server and client concerns in a single component.** Extract client-interactive parts into dedicated child components with the `"use client"` directive.

---

## TypeScript

- **Strict mode is mandatory.** The `tsconfig.json` `strict` option must remain `true`.
- **Absolutely no use of `any`.** This includes `any[]`, `as any`, `: any`, and implicit `any` via disabled lint rules. Use `unknown` and narrow with type guards when the type is genuinely unknown.
- **Define explicit interfaces or types for all props, state, and API responses.** No implicit or inline object types.
- **Use `interface` for object shapes that may be extended. Use `type` for unions, intersections, and computed types.** Be consistent.
- **Export all shared types and interfaces from dedicated `types.ts` or `types/` files** within the relevant module directory.
- **Use discriminated unions** over optional fields when representing variant data shapes.
- **Prefer `satisfies` over `as` for type narrowing** when verifying object shapes.
- **Always type function return values explicitly** — do not rely solely on inference for exported or public functions.
- **Use `readonly` for props and data that should not be mutated.**
- **Leverage TypeScript utility types** (`Pick`, `Omit`, `Partial`, `Required`, `Record`) to derive types rather than duplicating definitions.

---

## Styling

- **Use Tailwind CSS exclusively.** No inline styles, no CSS modules, no styled-components, no external CSS files beyond the global Tailwind entry point.
- **Keep class lists clean and organized.** Group classes logically: layout → spacing → typography → visual → state variants.
- **Use `clsx` or `tailwind-merge` for conditional and composable class names.** Never concatenate class strings manually.
- **Extract repeated or complex class combinations into reusable component abstractions**, not into `@apply` directives or custom CSS classes.
- **Use Tailwind's design tokens** (e.g., `text-sm`, `p-4`, `bg-primary`) consistently. Avoid arbitrary values (e.g., `w-[137px]`) unless absolutely necessary and documented.
- **Support dark mode via Tailwind's `dark:` variant** when applicable.
- **Use Tailwind's responsive prefixes** (`sm:`, `md:`, `lg:`, `xl:`) for all layout changes. Never use raw media queries.

---

## Best Practices

- **Follow SOLID principles:**
  - **S**ingle Responsibility: Each module, component, and function does one thing.
  - **O**pen/Closed: Extend behavior through composition, not modification.
  - **L**iskov Substitution: Use interfaces and abstractions that are interchangeable.
  - **I**nterface Segregation: Keep interfaces small and focused.
  - **D**ependency Inversion: Depend on abstractions, not concrete implementations.
- **Separate business logic from UI.** Data transformations, validations, and computations belong in utility functions, hooks, or server actions — not inside JSX.
- **Write self-documenting code.** Use meaningful variable and function names that convey intent without requiring comments.
- **Avoid premature abstraction.** Do not extract a utility or component until a pattern is repeated at least twice with genuine shared logic.
- **Handle errors explicitly.** Never swallow errors silently. Use try/catch with meaningful error messages and proper user-facing fallbacks.
- **Use environment variables through a validated config module.** Never access `process.env` directly in components or functions — centralize and validate with a typed config.
- **Prefer composition over prop drilling.** Use React context, slot patterns, or compound components to pass data through deep trees.

---

## Performance

- **Use Next.js native optimization components:**
  - `next/image` for all images — never use raw `<img>` tags.
  - `next/link` for all internal navigation — never use raw `<a>` tags for in-app links.
  - `next/font` for font loading — never use raw `@font-face` or `<link>` tags for Google Fonts.
- **Minimize client-side JavaScript.** Every `"use client"` component adds to the client bundle. Audit regularly.
- **Use dynamic imports (`next/dynamic`)** for heavy components that are not needed on initial render (e.g., modals, charts, below-the-fold content).
- **Implement proper caching strategies:**
  - Use `revalidate` options on `fetch` calls and `generateStaticParams` where appropriate.
  - Leverage `unstable_cache` or route segment config for expensive computations.
  - Use `cache()` from React for request-level deduplication.
- **Avoid large dependencies.** Check bundle impact before adding new packages. Prefer lightweight alternatives.
- **Use `React.memo`, `useMemo`, and `useCallback` only when profiling confirms a performance bottleneck** — not as a default pattern.
- **Implement proper loading states** with `loading.tsx` and `Suspense` boundaries to avoid blocking the entire page on slow data.

---

## Accessibility

- **Use semantic HTML elements** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>`, `<dialog>`, etc.) — never use `<div>` or `<span>` for interactive or structural purposes.
- **Include proper ARIA roles, labels, and descriptions** for all interactive elements that lack inherent semantic meaning.
- **Ensure all images have descriptive `alt` text.** Decorative images must use `alt=""`.
- **All interactive elements must be keyboard-accessible.** Verify `Tab`, `Enter`, `Escape`, and arrow key navigation.
- **Maintain sufficient color contrast ratios** (WCAG AA minimum: 4.5:1 for normal text, 3:1 for large text).
- **Use `aria-live` regions** for dynamically updated content (e.g., toast notifications, form validation messages).
- **Provide visible focus indicators** for all focusable elements. Never use `outline: none` without a replacement focus style.
- **Label all form inputs** with associated `<label>` elements or `aria-label`/`aria-labelledby`.
- **Test with screen reader semantics in mind.** Ensure the reading order matches the visual order.

---

## Cleanliness

- **Zero ESLint warnings are mandatory.** Fix all warnings before considering any code complete. Run `npm run lint` and resolve every issue.
- **Delete dead code immediately.** No commented-out code blocks, no unused imports, no unreachable statements, no deprecated functions left behind.
- **Remove all `console.log`, `console.debug`, and `console.warn` statements before committing.** Use a proper logging utility if server-side logging is needed.
- **Avoid deeply nested logic.** Maximum nesting depth is **3 levels**. Use early returns, guard clauses, and extraction to flatten control flow.
- **Keep files under 200 lines** where practical. If a file exceeds this, consider splitting it.
- **Sort imports consistently:** external packages first, then internal modules, then relative imports, separated by blank lines.
- **Use consistent naming conventions:**
  - Components: `PascalCase` (`UserProfile.tsx`)
  - Functions/hooks: `camelCase` (`useAuth.ts`, `formatDate.ts`)
  - Constants: `UPPER_SNAKE_CASE` (`MAX_RETRIES.ts`)
  - Types/interfaces: `PascalCase` (`UserProfile.ts`)
  - Files: match the default export name.
- **No magic numbers or strings.** Extract all literals into named constants.
