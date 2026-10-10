# React, Vite, and Ant Design

## Layout

Feature-first. Features own their components, hooks, API calls, and types.

```text
src/
  app/
    App.tsx           # providers and router
    routes/           # route definitions, lazy-loaded pages
    providers/        # ConfigProvider (theme), QueryClientProvider, error boundaries
  features/<feature>/
    components/
    hooks/
    api/              # HTTP calls and query hooks
    types.ts
    index.ts          # public exports
  shared/
    components/       # AppLayout, PageHeader, LoadingState, EmptyState, ErrorBoundary, ...
    hooks/
    lib/              # framework-agnostic utilities
    styles/           # global styles, theme tokens
  main.tsx
```

Features import from other features only through their `index.ts`. Cross-feature code that is reused in two or three places moves to `shared/`.

## Components

- Functional components with hooks. No class components.
- Presentational components render props; feature components own data fetching and pass data down.
- Extract a custom hook when a component mixes data fetching, form state, or subscriptions.
- Colocate styles and tests with the component.

## Ant Design

- Wrap the root in one `ConfigProvider` with theme tokens. Do not scatter inline style overrides.
- Use the antd `App` component and `App.useApp()` for `message`, `notification`, and `modal`. Static calls ignore theme and context.
- Prefer antd components (`Table`, `Form`, `Modal`, `Select`, `DatePicker`) over hand-built equivalents.
- Validate with `Form.useForm()` and declarative `rules`.
- Import components by name from `antd`.
- Customize through theme tokens or a component's `styles` and `classNames` props. Avoid `!important` against antd internals.
- Virtualize large `Table` and `List` renders.
- Do not wrap every antd component. Create a wrapper only when it carries a real project convention or reusable behavior (`DataTable`, `ConfirmDialog`, `AuthGuard`).

## Vite

- Use `@vitejs/plugin-react` (or the SWC variant).
- Read configuration through `import.meta.env`. Only `VITE_`-prefixed variables reach client code, and they are public: never put secrets there.
- Split routes with `React.lazy` and dynamic `import()`, wrapped in `Suspense`.

## Performance

- Add `useMemo` and `useCallback` only when a measured re-render or expensive computation justifies them.
- Lazy-load heavy components (charts, rich-text editors).
- Check `vite build` output for unexpectedly large chunks before merging a new dependency.

## Commands

Expose these `package.json` scripts. A `Makefile` may wrap them with the same names as the backend targets (`make dev`, `make test`, `make ci`):

| Script | Purpose |
| --- | --- |
| `dev` | Vite dev server |
| `build` | Production build |
| `lint` | ESLint |
| `format` | Prettier |
| `type-check` | `tsc --noEmit` |
| `test` | `vitest run --coverage` (enforces the [coverage gate](../testing/coverage-gate.md)) |
| `test:e2e` | Playwright |
| `verify` | lint, type-check, test, build |

Testing rules are in [frontend testing](../testing/frontend-testing.md).
