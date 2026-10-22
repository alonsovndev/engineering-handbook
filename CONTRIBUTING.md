# Contributing

1. Start from a clean, up-to-date `main` and create a short-lived branch, such as `docs/<short-desc>` or `feat/<short-desc>`. See [branching](docs/git/branching.md) for direct and fork workflows.
2. Edit content under `docs/`. Follow the writing rules in [AGENTS.md](AGENTS.md).
3. Using Node 22, run `npm run typecheck` and `npm run build`. Review changed pages locally and record the results; a hosted preview is preferred when configured.
4. Commit with [Conventional Commits](docs/git/commits.md), for example `docs(backend): clarify migration rules`.
5. Open a pull request into `main` using the [PR conventions](docs/git/pull-requests.md). Squash and merge after the required checks and review; delete the branch afterward.

Changing a decision, such as a tool, threshold, or workflow, needs an ADR. See [docs/adr](docs/adr/README.md).
