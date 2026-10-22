# CI/CD

**Status:** Implemented in [github-workflows](https://github.com/alonsovndev/github-workflows); first runs on GitHub passed for the self-test, AWS-facing workflows not yet exercised

Reusable GitHub Actions in a central workflow repository: Python CI, frontend CI, Docker build, Terraform validate and plan, AWS deployment. Projects call the reusable workflows instead of copying them, so one fix improves every repository.

Principles already decided:

- Use GitHub OIDC to authenticate to AWS instead of permanent access keys.
- `make ci` locally runs what CI runs.
- Required checks gate merges to `main` (see [branch protection](../git/branch-protection.md)).
- Environments and immutable artifacts control [project-specific release paths](../git/releases.md); there is no permanent integration branch or release-promotion PR.

## Handbook pipeline

This repository keeps the GitHub Actions `Build` check for pull requests targeting `main` and pushes to `main`, following [ADR-007](../adr/adr-007-main-only-git-workflow.md). It runs `npm ci`, `npm run typecheck`, and `npm run build` with Node 22 and read-only repository permissions. npm's download cache is keyed by `package-lock.json` through `actions/setup-node`.

Cloudflare Workers Builds handles publishing from `main` and runs the same typecheck and build before deploying. GitHub Actions neither publishes the site nor needs Cloudflare credentials. This repository-specific exception is recorded in [ADR-006](../adr/adr-006-cloudflare-handbook-hosting.md); setup and rollback are in [Handbook deployment](../cloud/handbook-deployment.md).

Hosted protection settings, the publishing connection, and previews remain `TBD` until verified. Until a preview exists, record local build and review evidence in the PR. This documentation update does not establish that the reusable workflows in other repositories implement the new release paths.
