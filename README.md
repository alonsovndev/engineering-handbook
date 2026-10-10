# engineering-handbook

Source of truth for the engineering platform: backend, frontend, testing, Git, AI-development standards, and the decisions behind them. Built with [Docusaurus](https://docusaurus.io/).

Principle: one engineering platform, multiple deployment profiles (static, lean, enterprise).

## Run locally

Requires Node 20 or later.

```bash
npm ci
npm start        # dev server
npm run build    # production build; fails on broken links
npm run typecheck
```

## Structure

```text
docs/
├── architecture/
├── backend/
├── frontend/
├── testing/
├── git/
├── ci-cd/            # planned
├── cloud/            # planned
├── security/         # planned
├── observability/    # planned
├── ai-development/
└── adr/
```

Start at [`docs/intro.md`](docs/intro.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Agents: read [AGENTS.md](AGENTS.md).

## License

See [LICENSE](LICENSE).
