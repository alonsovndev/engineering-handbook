# Pull requests

## Targets

| Source branch | Target |
| --- | --- |
| `feature/*`, `fix/*`, `chore/*` | `dev` |
| `hotfix/*` | `main` |
| `dev` (release candidate) | `main` |

## Title

Use the Conventional Commits format so the title can be validated in CI:

```text
feat(export): add CSV export endpoint
```

When a ticket tracker exists, append the reference: `feat(export): add CSV export endpoint (#42)`. Keep the Conventional Commits prefix so the title stays machine-checkable.

## Body

Use this template. Replace every placeholder; write `N/A` where a section does not apply.

```markdown
# Summary

- {what changed}
- {why it matters}

## Verification

- {command run and result}
- {manual check, or "Not run: {reason}"}

## Risk

- {deployment, migration, compatibility, or rollback risk — or "None identified"}

## Screenshots / Evidence

- {screenshot, recording, or log output for UI/behavior changes — or "N/A"}

## Checklist

- [ ] Tests added/updated where applicable
- [ ] Docs updated where applicable
- [ ] No secrets or credentials included

## Related

- Closes #{issue}
```

## Rules

- Keep a PR to one concern. Reviewers approve what they can hold in their head.
- Open the PR as a draft until CI passes and you have reviewed your own diff.
- CI must be green before merge. Never bypass failing checks.
- Merge with a merge commit, not squash or rebase. Merge commits keep feature history, make a single revert possible, and let `dev` fast-forward after a release. See [ADR-002](../adr/adr-002-git-branching-model.md).
- Delete the head branch after merge.

## Review

- Reviewers check correctness, security, regressions, missing tests, and convention violations, in that order. Style that a linter can enforce is not a review comment.
- Approvals required: PR into `dev` or `main` needs a passing CI run and a pull request. A human approval is required when more than one person contributes to the repository (1 into `dev`, 2 into `main`). Solo repositories may merge their own PRs after CI and a self-review.
- AI review is a first pass, not a replacement for a human review where one is required.
