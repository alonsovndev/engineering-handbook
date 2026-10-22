# ADR-008: Modular monolith by default

- **Status**: Proposed
- **Date**: 2026-10-21

## Context

The handbook organizes backend code by feature ([Clean Architecture](../architecture/clean-architecture.md)) and runs one backend service per deployment profile ([ADR-005](./adr-005-lean-profile-lambda-container.md), [Deployment profiles](../architecture/deployment-profiles.md)). It prefers ECS over Kubernetes unless several services need orchestration. It has no stated position on when to split a backend into separate services, so the choice is made ad hoc and tends toward splitting early.

## Decision

Build each backend as one deployable application organized into features with clear boundaries (a modular monolith). Split a feature into a separate service only when a concrete reason with evidence applies: differing scaling needs shown by measured load or cost, a runtime requirement the main runtime cannot meet, teams blocked on each other's releases, a failure-isolation requirement, or a written compliance requirement. Record each split in the project's own ADR with that evidence.

The reasoning and the full list are in [Monolith or services](../architecture/monolith-or-services.md).

## Consequences

### Positive

- No distributed-system costs (network failures, contract versioning, tracing, multi-service deployment) until they are justified.
- Matches the existing profiles, which already run one backend each.
- Feature boundaries keep a later extraction possible.

### Negative

- One deployable scales and fails as a unit until it is split.
- Boundaries inside the monolith are enforced by convention and tests, not by the network, so they can erode.
- The evidence threshold needs judgment and may be applied inconsistently.

## Alternatives Considered

1. **Microservices by default**
   - Gives independent scaling and releases from the start.
   - Not selected: the operational cost is paid immediately while the benefit is speculative, which conflicts with [YAGNI](../architecture/design-principles.md#yagni).
2. **No stated default**
   - Keeps the handbook silent and flexible.
   - Not selected: the decision stays ad hoc and tends toward early splitting.
