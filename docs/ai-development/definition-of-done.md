# Definition of done

A change is done when all of the following hold.

## Always

- The requirement is met and nothing outside the requested scope changed.
- Lint, format, and type checks pass (`make lint`, type-check).
- Tests for the touched behavior exist and pass; a bug fix includes a regression test.
- The coverage gate passes ([80%](../testing/coverage-gate.md)).
- `make ci` (or the repository's equivalent) passes locally.
- Docs that describe changed behavior are updated in the same pull request.
- No secrets, credentials, or `.env` files are committed.
- The pull request follows the [PR conventions](../git/pull-requests.md) and CI is green.

## Conditionally

| Trigger | Extra check |
| --- | --- |
| API change | OpenAPI and API docs updated; backward compatibility considered |
| Schema change | Alembic migration included and reviewed; rollback noted |
| Auth, input handling, or secrets | Security review of the diff |
| UI change | Screenshot or recording in the PR; keyboard and accessible-name check |
| New dependency | Reason stated and approved |
| Architectural decision | ADR added |

## Reporting

State what was verified and how, and what was not run and why. Report failures with their output; never report a check as passed that was not run.

## Review findings

Treat findings about correctness, safety, unmet requirements, broken checks, or missing required tests as blockers. Fix them or record the blocker explicitly.
