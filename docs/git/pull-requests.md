# Pull requests

## Targets

| Source branch | Target |
| --- | --- |
| `feat/*`, `fix/*`, `docs/*`, `chore/*`, `refactor/*`, `test/*` | `main` |

Use the owning repository's `main` in both direct and fork mode. There is no separate release-promotion PR.

## Title

Use the Conventional Commits format so the title can be validated in CI:

```text
feat(export): add CSV export endpoint
```

When a ticket tracker exists, append the reference: `feat(export): add CSV export endpoint (#42)`. Keep the Conventional Commits prefix so the title stays machine-checkable.

The title becomes the squash commit subject. Mark breaking changes with `!` or a `BREAKING CHANGE:` footer as described in [commits](./commits.md). Inspect the final squash message and preserve the breaking-change explanation and relevant issue references; do not assume GitHub copies the PR body into it.

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
- Squash and merge so each PR contributes one Conventional Commit to `main`. See [ADR-007](../adr/adr-007-main-only-git-workflow.md).
- Resolve review conversations and bring the branch up to date before merging. Rerun affected verification after changes.
- Delete the head branch after merge.

## Review

- Reviewers check correctness, security, regressions, missing tests, and convention violations, in that order. Style that a linter can enforce is not a review comment.
- Apply the approval policy in [branch protection](./branch-protection.md#required-settings): solo repositories self-review; teams require one independent human approval. New reviewable changes require renewed approval.
- AI review is a first pass, not a replacement for a human review where one is required.
- Record preview or local review evidence for frontend and documentation changes; see [releases](./releases.md#previews-and-review-evidence).
