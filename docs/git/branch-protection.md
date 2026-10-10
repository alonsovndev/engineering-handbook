# Branch protection

Configure these on GitHub for `main` and `dev`. Rulesets or classic branch protection both work.

| Setting | `main` | `dev` |
| --- | --- | --- |
| Require a pull request before merging | Yes | Yes |
| Required approvals | 0 solo, 2 team | 0 solo, 1 team |
| Require status checks to pass | Yes (CI) | Yes (CI) |
| Require branches to be up to date | Yes | Optional |
| Block force pushes | Yes | Yes |
| Block deletions | Yes | Yes |
| Allowed merge method | Merge commit | Merge commit |

Also enable **automatically delete head branches** in repository settings so merged feature branches do not accumulate.

## Notes

- Solo repositories keep the pull-request requirement even with zero approvals. The PR is what triggers CI and leaves a review trail.
- Do not give yourself a bypass. A bypass used once becomes the default.
- Disable squash and rebase merging in repository settings to enforce the merge-commit rule.
