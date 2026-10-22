# Contributing

1. Branch from `dev` (or `main` if `dev` does not exist yet): `chore/<short-desc>` or `feature/<short-desc>`.
2. Edit content under `docs/`. Follow the writing rules in [AGENTS.md](AGENTS.md).
3. Run `npm run build`. It must pass with no broken links.
4. Commit with [Conventional Commits](docs/git/commits.md), for example `docs(backend): clarify migration rules`.
5. Open a pull request using the [PR conventions](docs/git/pull-requests.md).

Changing a decision, such as a tool, threshold, or workflow, needs an ADR. See [docs/adr](docs/adr/README.md).
