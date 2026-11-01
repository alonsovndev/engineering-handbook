---
sidebar_position: 4
---

# GitHub repository protections

Protect `main` so every change follows the [pull-request rules](./pull-requests.md). Configure a ruleset or classic branch protection; documentation alone does not enforce these settings.

Branch protection controls what can enter `main`. Repository settings control how PRs merge and whether merged working branches are deleted. Configure both so the hosted behavior matches the workflow.

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

The table above is the required standard. The table below records what can currently be established for this handbook.

| Item | Known status |
| --- | --- |
| CI definition | The local workflow defines `Build` for PRs targeting `main` and pushes to `main` |
| Required checks and protection enforcement | **TBD**: hosted configuration has not been verified |
| Squash-only merging and default squash subject | **TBD**: hosted configuration has not been verified |
| Automatic deletion of merged working branches | **TBD**: hosted configuration has not been verified |

After configuring GitHub, check that the rules target `main`, the intended check is required, and the effective settings match this page. Record verified settings separately from requirements. A workflow file proves which checks are defined; it does not prove GitHub requires them before merge.
