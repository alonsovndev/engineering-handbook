# State and data fetching

Match the tool to who owns the state.

| State | Tool |
| --- | --- |
| Local UI state | `useState`, `useReducer` |
| Server state (remote data) | TanStack Query |
| Cross-cutting UI state (theme, auth session, feature flags) | React Context, small and split by concern |
| Complex client-only state | A dedicated library, only after Context causes real problems |

## Rules

- Do not copy server data into local state or a global store. The query cache is the store.
- Keep Context small and split by concern so unrelated consumers do not re-render.
- Do not add a client-state library speculatively.
- Colocate query hooks with the feature's `api/` folder and export them through the feature's `index.ts`.

## Redux exception

TanStack Query is the default. If a repository already uses Redux Toolkit, keep it and use RTK Query for server state there; do not mix both for server data in one app. Do not introduce Redux into a repository that does not use it.

## Errors and loading

- Every query surface renders loading, empty, and error states. Reuse shared `LoadingState`, `EmptyState`, and `ErrorBoundary` components.
- Surface mutation results through antd `App.useApp()` notifications.
- Map HTTP errors to user-facing messages in one place per feature, not in each component.
