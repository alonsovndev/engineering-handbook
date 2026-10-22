# Handbook deployment

Publish this handbook with Cloudflare Workers Builds connected to `main`. Cloudflare serves the pre-rendered Docusaurus files directly; the site has no application server. The repository-specific publishing decision is recorded in [ADR-006](../adr/adr-006-cloudflare-handbook-hosting.md).

## Prerequisites

- Connect this repository to a Cloudflare Worker named `engineering-handbook`.
- Use an active Cloudflare zone for the supplied production hostname, `engineering-docs.alonsovndev.com`. Check for conflicting DNS records before activating the custom domain; do not remove an existing record without confirming its purpose.
- Authorize the repository integration and deployment token in Cloudflare. Keep tokens in Cloudflare, never in source files or GitHub Actions.
- Retain the GitHub `Build` check as a merge gate. Cloudflare's production build does not wait for GitHub Actions to finish.

Repository connection, zone readiness, domain activation, and the first live deployment: **TBD** until confirmed in Cloudflare.

## Build settings

Configure the Worker repository integration as follows:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | Repository root |
| Build environment | Node 22 (`NODE_VERSION=22`) |
| Dependency installation | npm, using the committed `package-lock.json` |
| Build command | `npm run typecheck && npm run build` |
| Deploy command | `npm run deploy` |
| Non-production branch builds | Disabled initially |

`npm run deploy` invokes Wrangler 4.151.2 through `npx`. It uses the already-built files in `build/`; Cloudflare must finish the build command successfully before running it. The CLI version is pinned in the script without adding a project dependency. Credentials are supplied by Cloudflare Workers Builds.

`wrangler.jsonc` defines the static assets directory, custom-domain binding, trailing-slash behavior, and 404 handling. Docusaurus sets the production URL and root base path. Keep both configurations aligned. Do not independently manage the same Worker through Terraform or another publishing service.

GitHub Actions validates pull requests targeting `main` and pushes to `main`; it does not publish anything. [ADR-007](../adr/adr-007-main-only-git-workflow.md) amends the original hosting decision's CI branch targets. See [CI/CD](../ci-cd/README.md).

## Optional preview setup

Hosted previews are preferred but their configuration and availability here are **TBD**. Non-production branch builds remain disabled in the initial setup above. Until previews are configured and verified, serve the site locally and record build results and review evidence in each PR.

When the repository owner enables previews in Cloudflare, confirm the Worker uses the current Worker Previews model, enable preview builds in branch control, and verify the preview command and any isolated settings. Current Worker Previews use `npx wrangler preview`; follow [Cloudflare's branch-build guide](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/) for the connected Worker's setup. Do not change the production deploy command or upgrade the pinned CLI as part of enabling previews without reviewing the change.

For an existing connection, check its preview model first: switching from the legacy model is irreversible. Legacy version URLs use the uploaded version's existing resources and are not an isolated environment. Do not make that switch as a routine documentation update. See [Cloudflare version URLs](https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/).

Verify a preview corresponds to the intended branch commit and leaves the production hostname unchanged. Add its URL and review results to the PR. Check whether fork contributions receive previews before promising one for every PR; use local evidence when unavailable.

## Verify before publishing

Use Node 22 and run:

```bash
npm ci
npm run typecheck
npm run build
npm run serve
```

Check the homepage and documentation on mobile and desktop, in light and dark mode. Verify keyboard navigation, internal links, a directly opened documentation URL, and a missing route. Inspect the generated sitemap and canonical URLs: they must use the configured production origin without the old repository prefix.

The build fails on broken links and anchors. No automated test suite or coverage gate applies to this repository.

## Verify the first deployment

After connecting the repository, inspect Cloudflare's build log and confirm typecheck, build, and deployment succeeded for the intended `main` commit. Verify:

- HTTPS works on the configured custom domain.
- The homepage, CSS, JavaScript, SVG artwork, and favicon load.
- A documentation URL works when opened directly and after refresh.
- Canonical URLs and the sitemap use the production hostname.
- An unknown path returns HTTP 404 with the Docusaurus 404 page.

Only mark the live deployment verified after these checks. Local checks do not establish DNS, certificate issuance, or Cloudflare integration success.

## Failure handling and rollback

If typecheck or build fails, correct the source failure before deploying. Do not bypass either check. If publishing fails, inspect Cloudflare's deployment log and check the Worker name, integration token permissions, and domain readiness.

For an incorrect published version, use Cloudflare's deployment rollback to select the last verified deployment. Then correct or revert the source through the normal pull-request process so the next `main` build does not reintroduce the problem. For this assets-only site, rollback does not require a database migration.

## References

- [Docusaurus on Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/docusaurus/)
- [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Custom-domain prerequisites](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Static-site routing and 404 pages](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)
