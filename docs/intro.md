---
sidebar_position: 0
---

# Introduction

This handbook documents a personal approach to software engineering, built on practical experience and lessons learned across personal, freelance, SaaS, and open-source projects. It brings together practices, patterns, and the reasoning behind engineering decisions, offering a practical reference others can learn from and adapt to their own context.

For projects that adopt these standards, templates, CI workflows, Terraform modules, and `AGENTS.md` files link here to keep the guidance in one place.

## Principle

The approach used here is one engineering platform with multiple deployment profiles.

Within this approach, application architecture, testing, documentation, AI tooling, CI/CD, and development conventions stay consistent across projects. Infrastructure varies with scale and budget. See [deployment profiles](./architecture/deployment-profiles.md).

## How to use this handbook

- Exploring ideas: use the practices and their reasoning as a starting point, then adapt them to your project's needs and constraints.
- Starting a project that adopts these standards: read the guidance for your stack, then use the matching template when available.
- Making a change in a project that adopts these standards: follow the standards for the area you touch. If a standard needs to change, propose it through an [ADR](./adr/README.md) so the reasoning is recorded.
- Briefing an AI agent: link the relevant page from the repository's AGENTS.md. See [AGENTS.md conventions](./ai-development/agents-md-conventions.md).

## Contents

| Section | Covers | Status |
| --- | --- | --- |
| [Architecture](./architecture/README.md) | Design principles, design patterns, clean architecture, domain modeling, feature-first organization, monolith or services, documenting architecture, deployment profiles | Draft |
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
