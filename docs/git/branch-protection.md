# Branch protection

Protect `main` so every change follows the [pull-request rules](./pull-requests.md). Configure a ruleset or classic branch protection; documentation alone does not enforce these settings.

## Required settings

| Setting | `main` |
| --- | --- |
| Require a pull request before merging | Yes |
| Required independent approvals | 0 solo, 1 team |
| Dismiss stale approvals after reviewable changes | Yes for teams |
| Require status checks to pass | Yes; select the repository's CI checks |
| Require branches to be up to date | Yes |
| Require conversation resolution | Yes |
| Block force pushes | Yes |
| Block branch deletion | Yes |
| Apply protections to administrators | Yes; no routine bypass |
| Allowed merge method | Squash only |

Solo repositories keep the PR and CI requirements and use self-review. A team repository has multiple maintainers available to review; an occasional external contributor does not by itself make a solo repository a team. AI review does not count as the independent human approval.

Require checks that run for every PR targeting `main`; avoid workflow filters that leave required checks pending. Keep job names unique across workflows. For this handbook, retain the `Build` check.

## Repository settings

- Enable squash merging and disable merge commits and rebase merging.
- Use the PR title as the default squash commit subject. Check the final message and preserve breaking-change information before merging.
- Enable automatic deletion of merged head branches. Fork contributors may need to delete their own branch.
- Keep protections active for administrators and avoid bypass entries that turn the PR requirement into an optional step.

These capabilities depend on the GitHub plan and repository visibility. Verify availability and effective enforcement before reporting a repository as protected. See [GitHub protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

## Handbook configuration status

The local workflow defines `Build` for PRs targeting `main` and pushes to `main`. Hosted protections, merge-method settings, and automatic branch deletion are **TBD** until configured and verified in GitHub. Changing this page does not change GitHub settings.
