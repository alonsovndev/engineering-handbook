# ADR-004: Enforced 80% coverage gate

- **Status**: Accepted
- **Date**: 2026-10-10

## Context

Existing guidance disagrees: one project reports a 70% target without enforcing it, another enforces 80% in its Makefile. Without enforcement, coverage erodes unnoticed.

## Decision

Enforce a minimum of 80% line coverage in every repository, both locally through `make ci` (full suite) and in CI. A run below the threshold fails. Treat 90% for critical paths, 85% for domain logic, and 75% for infrastructure as review guidance, not tool-enforced limits. Lowering the threshold requires updating this ADR.

## Consequences

### Positive

- Coverage regressions fail the build instead of being discovered later.
- One number across repositories and templates.

### Negative

- Can encourage low-value tests to reach the number; reviewers must watch for this.
- Early-stage prototypes pay the cost before the code stabilizes. Use a documented exclusion or a superseding ADR for a specific repository rather than lowering the global value.

## Alternatives Considered

1. **Report coverage without enforcing**
   - Why it was considered: no friction.
   - Why it was not selected: the number drifts down with no signal.
2. **Higher threshold (90%)**
   - Why it was considered: stronger guarantee.
   - Why it was not selected: pushes tests written for the metric, and is unrealistic for infrastructure and glue code.
