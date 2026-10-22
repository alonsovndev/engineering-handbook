# AGENTS.md

## Overview

Documentation repository: the engineering handbook. Docusaurus site, Markdown content, no application code. Deployment profile: static (Cloudflare Workers Static Assets).

## Commands

```bash
npm ci               # install
npm start            # dev server
npm run build        # production build; broken links and anchors fail the build
npm run typecheck    # tsc
```

`npm run build` is the CI check. Run it before declaring a docs change done.

## Structure

- `docs/<section>/` holds content. Each folder has `_category_.json` and a `README.md` index.
- `docs/adr/` holds decisions: `adr-NNN-slug.md`, based on `adr-template.md`.
- `src/`, `static/`, `docusaurus.config.ts`, `sidebars.ts` are site scaffolding; change them only for site behavior.

## Writing rules

- One H1 per page, no skipped heading levels, sentence-case headings.
- Relative links to `.md` files; the build fails on broken ones.
- State the rule, then the reason. Keep a rule in one place and link to it elsewhere.
- Mermaid for diagrams.
- Mark undecided items `TBD`. Do not invent owners, URLs, or deployment facts.
- No machine-specific absolute paths, secrets, or personal environment details.

## Changing a standard

- A clarification edits the page.
- A decision (tool choice, threshold, workflow) needs a new ADR, or supersedes an existing one. Never rewrite an accepted ADR's decision.
- Update the section `README.md` index and `docs/adr/README.md` log when adding pages or ADRs.

## Testing

No test suite. Verification is `npm run typecheck` and `npm run build` (broken links and anchors fail the build). No coverage gate applies.

## Security

Never commit secrets or `.env` files. Handbook examples must use placeholders, not real credentials or hostnames.

## Definition of done

See `docs/ai-development/definition-of-done.md`. For this repository: typecheck and build pass, section indexes and the ADR log are updated, and a changed decision has an ADR.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) validates pull requests targeting `main` and pushes to `main`; the required job remains `Build`. Cloudflare Workers Builds owns publishing on pushes to `main`. Use Node 22 for CI and Cloudflare builds. The site is entirely static; do not add a Worker script or SPA fallback.

Connection settings, domain prerequisites, verification, and rollback: [Handbook deployment](docs/cloud/handbook-deployment.md). Cloudflare connection and custom-domain activation are user-managed and remain TBD until confirmed. This repository's publishing exception is recorded in [ADR-006](docs/adr/adr-006-cloudflare-handbook-hosting.md).

## Git

- Branch model and commit format: see `docs/git/` and ADR-007. `main` is the only permanent branch; short-lived branches target `main` and squash merge. Conventional Commits; no co-author trailers.
- Do not commit or push on `main` or another protected branch. Work on a named branch; commit or push only when asked.
- Hosted protections and preview availability remain TBD until verified; local documentation does not configure them.
- Do not add dependencies without stating why and getting approval.
