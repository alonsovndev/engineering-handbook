---
sidebar_position: 0
---

# Introduction

The engineering handbook is the source of truth for how software is built across personal, freelance, SaaS, and open-source projects. Templates, CI workflows, Terraform modules, and AGENTS.md files point here instead of restating the rules.

## Principle

One engineering platform, multiple deployment profiles.

Application architecture, testing, documentation, AI tooling, CI/CD, and development conventions stay the same across projects. Only the infrastructure changes with scale and budget. See [deployment profiles](./architecture/deployment-profiles.md).

## How to use this handbook

- Starting a project: read the standards for your stack, then copy the matching template once it exists.
- Making a change: follow the standards for the area you touch. If a standard blocks you, propose a change through an [ADR](./adr/README.md) instead of working around it.
- Briefing an AI agent: link the relevant page from the repository's AGENTS.md. See [AGENTS.md conventions](./ai-development/agents-md-conventions.md).

## Contents

| Section | Covers | Status |
| --- | --- | --- |
| [Architecture](./architecture/README.md) | Clean architecture, deployment profiles | Draft |
| [Backend](./backend/README.md) | Python, FastAPI, REST, database, logging | Draft |
| [Frontend](./frontend/README.md) | TypeScript, React + Vite, Ant Design, data fetching | Draft |
| [Testing](./testing/README.md) | Strategy, layout, coverage gate | Draft |
| [Git and pull requests](./git/README.md) | Branching, commits, PRs, releases | Draft |
| [AI development](./ai-development/README.md) | AGENTS.md, lifecycle, definition of done | Draft |
| [CI/CD](./ci-cd/README.md) | Reusable workflows | Planned |
| [Cloud](./cloud/README.md) | AWS and Cloudflare | Planned |
| [Security](./security/README.md) | Baseline security practices | Planned |
| [Observability](./observability/README.md) | Sentry, OpenTelemetry | Planned |
| [Decisions](./adr/README.md) | Architecture decision records | Active |

## Writing rules

- State the rule, then the reason. A rule without a reason gets ignored or cargo-culted.
- Keep a rule here once. Other repositories link to it.
- Mark undecided items `TBD` rather than guessing.
- Use Mermaid for diagrams.
