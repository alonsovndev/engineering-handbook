# Architecture decisions

An Architecture Decision Record (ADR) captures a significant decision, the context behind it, and its consequences. Change a handbook standard by adding or superseding an ADR.

## Decision log

| ADR | Title | Status |
| --- | --- | --- |
| [ADR-001](./adr-001-handbook-as-source-of-truth.md) | Handbook as source of truth | Accepted |
| [ADR-002](./adr-002-git-branching-model.md) | Git branching model | Superseded by [ADR-007](./adr-007-main-only-git-workflow.md) |
| [ADR-003](./adr-003-alembic-for-migrations.md) | Alembic for database migrations | Accepted |
| [ADR-004](./adr-004-enforced-coverage-gate.md) | Enforced 80% coverage gate | Accepted |
| [ADR-005](./adr-005-lean-profile-lambda-container.md) | Lambda container image for the lean profile API | Accepted |
| [ADR-006](./adr-006-cloudflare-handbook-hosting.md) | Cloudflare static hosting for the engineering handbook | Accepted; CI branch targets amended by [ADR-007](./adr-007-main-only-git-workflow.md) |
| [ADR-007](./adr-007-main-only-git-workflow.md) | Main-only Git workflow and project-specific releases | Accepted |

## Process

- Name files `adr-NNN-short-slug.md`, numbered sequentially.
- Use the [template](./adr-template.md).
- Status lifecycle: `Proposed` → `Accepted` → `Superseded by ADR-NNN` or `Deprecated`.
- Never rewrite an accepted ADR's decision. Add a new ADR that supersedes it.
