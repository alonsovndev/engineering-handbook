# ADR-001: Handbook as source of truth

- **Status**: Accepted
- **Date**: 2026-10-10

## Context

Engineering standards are scattered across skills, stack instruction files, per-repository knowledge files, and project ADRs. Copies have drifted: coverage thresholds, migration tooling, test layouts, and state-management defaults disagree between sources. Templates, CI workflows, and Terraform modules planned for the engineering platform would multiply the copies.

## Decision

The `engineering-handbook` repository is the single source of truth for engineering standards. Templates, reusable workflows, AGENTS.md files, and agent skills link to or derive from it. A standard changes by editing the handbook, with an ADR when the change is a decision rather than a clarification.

## Consequences

### Positive

- One place to read, review, and fix a standard.
- Templates and agents can be checked against a stated rule.
- Conflicts between older sources are resolved once, with the reasoning recorded.

### Negative

- Existing sources must be reconciled with the handbook; until then they can disagree with it.
- The handbook needs upkeep, or it becomes one more stale copy.

## Alternatives Considered

1. **Keep standards in the AI-tooling repository only**
   - Why it was considered: the content already lives there.
   - Why it was not selected: it is organized for agents, not for people, and ties human-facing standards to one tool.
2. **Per-repository standards only**
   - Why it was considered: no cross-repository coordination.
   - Why it was not selected: every new project re-decides and the copies drift.
