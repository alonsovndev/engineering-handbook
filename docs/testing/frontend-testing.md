# Frontend testing

## Tools

| Tool | Use |
| --- | --- |
| Vitest | Test runner |
| React Testing Library | Component tests |
| MSW | Network mocking |
| Playwright | End-to-end flows |

## Rules

- Test what the user sees and does: rendered output, roles, labels, interactions. Not internal state or implementation details.
- Query by role and accessible name first. If a component is hard to query that way, it probably has an accessibility problem.
- Mock the network with MSW, not by stubbing the HTTP client. The real client code then stays under test.
- Colocate tests with source as `*.test.ts` / `*.test.tsx`.
- Test custom hooks with `renderHook` when they contain non-trivial logic.
- Playwright covers a few critical journeys (sign in, the main create-and-view flow). It is not a replacement for component tests.
- Wrap components in the same providers they use in the app (`ConfigProvider`, query client, router) through a shared test render helper.

## Commands

```bash
npm run test          # Vitest with coverage
npm run test:e2e      # Playwright
npm run verify        # lint, type-check, test, build
```
