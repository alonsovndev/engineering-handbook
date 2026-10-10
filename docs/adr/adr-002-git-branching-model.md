# ADR-002: Git branching model

- **Status**: Accepted
- **Date**: 2026-10-10

## Context

Projects range from solo repositories to open-source work with external contributors. They need an integration branch, a deliberate release gate, and traceable history, with no paid tooling. An earlier project ADR chose `dev` plus `main`, merge commits, Conventional Commits, and tag-based deploys, with 1 approval into `dev` and 2 into `main`. Other guidance asks only for pull requests without mandatory approvals, which is the realistic setting for a solo maintainer.

## Decision

- Two permanent branches: `dev` (integration) and `main` (production candidates). All changes arrive through pull requests; nobody commits or pushes directly to either.
- Short-lived `feature/*`, `fix/*`, `chore/*` branches target `dev`; `hotfix/*` targets `main`.
- Pull requests merge with a merge commit, never squash or rebase.
- Commits follow Conventional Commits.
- A `vX.Y.Z` tag on `main` triggers production deployment.
- Approvals: a pull request and passing CI are always required. Human approvals are required only when more than one person contributes (1 into `dev`, 2 into `main`); solo repositories use zero.
- Commit messages carry no AI or tool co-author trailers.

## Consequences

### Positive

- `dev` absorbs churn before it reaches production, and a tag is a deliberate release gate.
- Merge commits preserve feature history, make a single revert possible, and let `dev` fast-forward after a release.
- The approval rule scales from solo work to a team without a separate process.

### Negative

- Promoting `dev` to `main` adds a step compared with trunk-based development.
- Merge commits make history noisier than squash or rebase.
- `dev` must be back-synced from `main` after each release.
- Without co-author trailers, AI involvement is not visible in `git log`; the pull request description is where it can be noted.

## Alternatives Considered

1. **Squash merge**
   - Why it was considered: linear history.
   - Why it was not selected: loses intermediate commits and breaks the `dev` fast-forward back-sync.
2. **Rebase merge**
   - Why it was considered: linear history without merge commits.
   - Why it was not selected: rewrites SHAs and is harder for occasional contributors.
3. **Trunk-based development on `main`**
   - Why it was considered: simplest model.
   - Why it was not selected: no integration branch and no gate between merge and production.
