# Testing strategy

## Test types

| Type | Best for | Avoid when |
| --- | --- | --- |
| Unit | Pure domain logic, validation, calculations, branching rules | Behavior depends on the DB, framework, network, or real wiring |
| Integration | Repositories, framework, DI wiring, adapters | A unit test proves the same thing |
| Contract | API schemas, event payloads, provider/consumer expectations | No stable external contract exists |
| API / smoke | Full request path, health, deployment wiring | It needs destructive calls or production credentials |
| Characterization | Legacy behavior before a refactor | The current behavior is known to be wrong |
| Regression | A fixed bug with a known failing scenario | The test restates implementation details |

Keep many fast unit tests, fewer integration tests, and a small number of end-to-end tests.

## Quality rules

- Test behavior, not private methods or internal state.
- Name tests as specifications: `returns validation error when email is missing`.
- Take expected values from examples, specs, or literals, not by re-running the code under test.
- One behavior per test.
- Mock only at system boundaries: network, time, randomness, filesystem, external services. Do not mock internal collaborators by default.
- Use builders or factories for complex domain objects; keep setup local unless a shared fixture removes real repetition.
- Remove dependence on wall-clock time, random order, shared global state, and test execution order.

## Bugs

Reproduce a bug with a failing test first when feasible, then fix it. The test stays as the regression guard.

## Guardrails

- Never delete, skip, or weaken a test just to get a green run.
- Never disable lint, type checks, hooks, or coverage gates to get green output.
- Quarantine a flaky test only with a written reason and a follow-up, not as a default fix.
- Do not claim a check passed unless it was run.
