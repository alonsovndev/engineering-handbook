# TypeScript standards

## Compiler

- Enable `strict` in `tsconfig.json`. Do not weaken it to unblock one file.
- Configure path aliases (`@/features`, `@/shared`) identically in `tsconfig.json` (`paths`) and `vite.config.ts` (`resolve.alias`).

## Types

- Never use `any`. Use `unknown` with a type guard, or a precise type.
- Avoid non-null assertions (`!`). Handle `null` and `undefined` explicitly.
- Use `type` for unions and intersections, `interface` for object shapes that may be extended.
- Declare an explicit props interface for every component.
- Type API responses at the boundary and keep those types in the feature that owns the call.

## Naming

- Full domain names, not abbreviations: `projectId`, `selectedProject`, not `pid`, `sel`.
- Components in `PascalCase`, one component per file, file named after the component.
- Hooks start with `use`.

## Linting and formatting

- ESLint with `typescript-eslint` and `eslint-plugin-react-hooks`. Do not disable `react-hooks/exhaustive-deps` without a written reason.
- Prettier for formatting. Format on save and in CI; do not hand-format.
- Shared ESLint and tsconfig presets are extracted only once two or three projects repeat them.

## Accessibility

- Every interactive element has an accessible name (label, `aria-label`, or visible text). Placeholders are not labels.
- Preserve keyboard navigation and focus order. Ant Design `Modal` and `Drawer` manage focus; do not fight them.
