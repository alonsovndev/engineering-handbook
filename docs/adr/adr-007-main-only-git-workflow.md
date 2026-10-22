# ADR-007: Main-only Git workflow and project-specific releases

- **Status**: Accepted
- **Date**: 2026-10-21
- **Supersedes**: [ADR-002](./adr-002-git-branching-model.md)
- **Amends**: [ADR-006](./adr-006-cloudflare-handbook-hosting.md), CI branch targets only

## Context

The previous standard couples collaboration to release control through permanent `dev` and `main` branches, merge commits, promotion PRs, and back-sync. That adds maintenance even to documentation and static sites that publish directly from `main`. Backend, SaaS, infrastructure, and package projects still need deliberate production gates, but those gates can operate on environments and immutable artifacts without an integration branch.

The handbook already delegates production publishing to Cloudflare Workers Builds. Its GitHub validation job must keep the `Build` name while following the new branch model. Hosted settings and deployment connections remain unverified until configured separately.

## Decision

- Use `main` as the only permanent branch. Cut short-lived `feat/*`, `fix/*`, `docs/*`, `chore/*`, `refactor/*`, and `test/*` branches from it; all normal PRs target `main`.
- Require PRs, passing CI, an up-to-date branch, resolved review conversations, and self-review. Solo repositories require zero independent approvals; repositories with multiple maintainers require one independent human approval, dismissed when reviewable changes make it stale.
- Squash and merge each PR; delete merged working branches. Use a Conventional Commit PR title as the squash subject and preserve breaking-change information. Retain the prohibition on AI or tool co-author trailers.
- Protect `main` against direct changes, force pushes, and deletion, including administrator enforcement. Configure hosted rules separately and verify plan availability.
- Prefer hosted frontend and docs previews; accept local build and review evidence while preview setup remains `TBD`. Static hosting may publish on merge to `main`.
- Build backend/SaaS artifacts once from the merged commit, validate them in staging, and release a version tag on the tested commit. Promote the recorded immutable artifact with deployment approval where supported, or recorded maintainer sign-off otherwise. CLI/library version tags gate publication.
- Production infrastructure requires a reviewed production plan and explicit approval before apply. Terraform-managed assets and image digests retain that ownership even when the application is static; no competing publisher is introduced.
- Replace ADR-006's validation branch targets with PRs targeting `main` and pushes to `main`. Keep `Build`, Node 22, read-only repository permissions, and Cloudflare production publishing unchanged.
- Migrate outstanding work and integrations before retiring `dev`; do not discard work or delete branches as part of updating this standard. Normal work has no promotion or back-sync step.

Operational rules live in [Git and pull requests](../git/README.md); release paths and rollback live in [Releases](../git/releases.md).

## Consequences

### Positive

- One collaboration flow serves solo repositories, teams, and external contributors without routine branch synchronization.
- Squash commits keep the main history readable and connect each change to its PR.
- Production gates match the delivery mechanism, and artifact identity connects staging evidence to the deployed version.

### Negative

- Repositories, hosted protections, integrations, and machine-global workflow tools need separate migration and verification.
- Squash merges do not preserve intermediate commit ancestry in `main`; review details remain in the PR.
- Keeping `main` releasable requires small safe increments or isolation of incomplete behavior.
- Previews and deployment approvals require provider configuration and may be limited by plan or repository visibility.

## Alternatives considered

1. **Keep permanent `dev` and `main` branches**: preserves existing tooling but retains promotion and back-sync work even when environments provide the release gate.
2. **Keep merge commits on a single permanent branch**: preserves intermediate ancestry but adds history noise without the former back-sync requirement that justified it.
