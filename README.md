# engineering-handbook

Source of truth for the engineering platform: backend, frontend, testing, Git, AI-development standards, and the decisions behind them. Built with [Docusaurus](https://docusaurus.io/).

Principle: one engineering platform, multiple deployment profiles (static, lean, enterprise).

## Run locally

Use Node 22 to match CI and Cloudflare builds.

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
├── ci-cd/
├── cloud/
├── security/         # planned
├── observability/    # planned
├── ai-development/
└── adr/
```

Start at [`docs/intro.md`](docs/intro.md).

## Deployment

The production hostname is **https://engineering-docs.alonsovndev.com**. Docusaurus generates a static site in `build/`; Cloudflare Workers Builds publishes it when changes reach `main`. GitHub Actions only validates the site.

The repository connection and custom-domain activation are **TBD** until configured in Cloudflare. Follow [Handbook deployment](docs/cloud/handbook-deployment.md) for exact build settings, prerequisites, verification, and rollback. The hosting decision is recorded in [ADR-006](docs/adr/adr-006-cloudflare-handbook-hosting.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Agents: read [AGENTS.md](AGENTS.md).

## License

See [LICENSE](LICENSE).
