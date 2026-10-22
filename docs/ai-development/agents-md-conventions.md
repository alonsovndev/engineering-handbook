# AGENTS.md conventions

Every repository has an `AGENTS.md` at its root. It is the entry point an agent reads before touching code.

## Purpose

Tell an agent what is specific to this repository and where the detailed rules live. It is not a copy of the handbook.

## Rules

- Keep it short: aim for 150 lines or fewer. Link to the handbook and `docs/` instead of inlining standards.
- Document only what differs from the handbook's defaults, or what an agent cannot discover by reading the code.
- State commands exactly as they run: install, dev, test, lint, format, type-check, build, `ci`.
- Mark unknowns `TBD`. Never invent owners, URLs, credentials, or deployment facts.
- No machine-specific absolute paths, secrets, or personal environment details.
- Keep `CLAUDE.md` and `.github/copilot-instructions.md` as thin pointers to `AGENTS.md` so the rules live in one place.

## Required sections

| Section | Content |
| --- | --- |
| Overview | What the repository is, its stack, and its deployment profile (static, lean, enterprise) |
| Commands | The standard `make` targets or npm scripts, and the one that matches CI |
| Structure | The top-level layout and where each kind of code goes |
| Architecture | Layer rules and a link to the relevant handbook pages |
| Testing | Test layout, how to run one test, the coverage gate |
| Git | Branch model, commit format, PR target, what agents must not do |
| Security | Secrets handling, auth rules, anything an agent must never touch |
| Definition of done | Link to the [definition of done](./definition-of-done.md) and any repo-specific additions |
| Deployment | How a change reaches production, or `TBD` |

## Agent safety rules to include

- Do not commit or push unless asked. Never commit or push directly on `main` or another protected branch; work on a named branch and target `main` through a PR. Follow the [branching standard](../git/branching.md).
- Do not add dependencies, call external services, or trigger pipelines without approval.
- Do not delete, skip, or weaken tests, or disable lint, type checks, hooks, or coverage gates.
- Do not claim a check passed unless it was run.

## Generated and custom blocks

When a tool generates part of the file, wrap generated content and hand-written content in markers so regeneration preserves your edits:

```markdown
<!-- ai-repo-setup:generated:start -->
...regenerated content...
<!-- ai-repo-setup:generated:end -->

<!-- ai-repo-setup:custom:start -->
...project-specific rules; preserved on regeneration...
<!-- ai-repo-setup:custom:end -->
```

Never regenerate over a file that lacks the markers without checking what would be lost.

## Workspaces with several repositories

A workspace folder that holds sibling repositories gets its own `AGENTS.md` with a table of repositories, their stacks, and ports, plus pointers to each repository's file. Each repository's own `AGENTS.md` wins for work inside that repository.

## Supporting docs

Agents read `docs/` for depth. Each repository provides:

```text
AGENTS.md
docs/
  architecture.md
  development.md
  testing.md
  deployment.md
  adr/
```

Keep these current. A stale doc misleads an agent more than a missing one.
