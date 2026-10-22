# Commits

Commits follow [Conventional Commits](https://www.conventionalcommits.org/).

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

| Type | Use |
| --- | --- |
| `feat` | New behavior |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Neither a feature nor a fix |
| `perf` | Performance improvement |
| `test` | Add or change tests |
| `build` | Build system or dependencies |
| `ci` | CI configuration |
| `chore` | Maintenance that touches no source or tests |
| `revert` | Revert an earlier commit |

## Rules

- Write the description in the imperative, lowercase, without a trailing period, at most 100 characters: `fix(api): handle null project owner`.
- One logical change per commit. A bug fix and an unrelated enhancement are two commits.
- Explain why in the body when the diff does not make it obvious.
- Mark breaking changes with `!` after the type or scope, or a `BREAKING CHANGE:` footer.
- Reject generic subjects such as `update files` or `wip`.
- Never commit secrets, credentials, or `.env` files.
- Do not add AI or tool co-author trailers (`Co-authored-by: ...`). The person who commits owns the change. See [ADR-007](../adr/adr-007-main-only-git-workflow.md).
- Do not bypass hooks (`--no-verify`). Fix the failure instead.

## Enforcement

Configure the format check locally with a `commit-msg` hook and in CI on pull request titles. The hook checks only the subject line and lets Git-generated `Merge ...` and `Revert ...` messages through. With squash merging, also check the final commit message against the [PR conventions](./pull-requests.md#title).

The handbook's current `Build` workflow checks types and builds the site; it does not validate PR titles or install a commit hook. Automated commit/title enforcement here is **TBD**; review the title and final squash message manually until configured.

```bash
#!/usr/bin/env sh
subject=$(head -n 1 "$1")
pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?!?: .{1,100}$'
case "$subject" in
  "Merge "*|"Revert "*) exit 0 ;;
esac
if ! printf '%s\n' "$subject" | grep -qE "$pattern"; then
  echo "Commit subject must follow Conventional Commits: <type>[scope]: <description>" >&2
  exit 1
fi
```

For frontend repositories, install it through Husky as `.husky/commit-msg`. For Python repositories, use `pre-commit` with a Conventional Commits hook. TBD: pick one Python hook for the FastAPI template.
