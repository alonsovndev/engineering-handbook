# ADR-006: Cloudflare static hosting for the engineering handbook

- **Status**: Accepted
- **Date**: 2026-10-21

## Context

The handbook is a pre-rendered Docusaurus site previously configured for GitHub Pages under a repository subpath. It needs to serve from an owned hostname and publish automatically when changes reach `main`. The user will connect the repository directly to Cloudflare.

The shared static deployment profile uses Terraform to publish Cloudflare Workers assets. Adding Terraform state and an apply pipeline solely to publish this handbook would add infrastructure beyond this repository's needs.

## Decision

Host the handbook on Cloudflare Workers Static Assets at `https://engineering-docs.alonsovndev.com`, with Cloudflare Workers Builds connected to `main`. Serve the generated `build/` directory at `/`, with consistent trailing slashes and the generated 404 page. No Worker script, server rendering, or database is required.

Cloudflare runs typecheck and build before deploying with a pinned Wrangler CLI. GitHub Actions retains the `Build` validation check for pull requests and pushes to `main` and `dev`, using read-only repository permissions. Cloudflare owns deployment authentication; no Cloudflare token is needed in GitHub Actions.

This is a repository-specific exception to Terraform-managed publishing, not a replacement for the shared deployment profiles. Terraform must not manage this same Worker's assets or custom-domain binding. Existing accepted ADR decisions remain unchanged.

## Consequences

### Positive

- Publishing follows the repository connection without a separate deployment workflow or Terraform state backend.
- Canonical links and static assets use the owned hostname at the domain root.
- The site remains static, with typecheck and broken-link checks before publication.

### Negative

- The repository connection, production branch, build settings, and credentials are configured in Cloudflare and must be maintained there.
- GitHub and Cloudflare both build production commits. Cloudflare's checks run independently of GitHub checks, so required PR checks must gate merges.
- Connection, domain activation, and the first live deployment remain TBD until verified by the user.

## Alternatives considered

1. **Keep GitHub Pages**: preserves the current pipeline but does not meet the requested Cloudflare hosting and repository integration.
2. **Use the shared Terraform static profile**: follows the platform default but introduces state and an apply workflow for this publishing-only use case.

Operational settings and rollback are maintained in [Handbook deployment](../cloud/handbook-deployment.md).
