# Python standards

## Baseline

| Concern | Standard |
| --- | --- |
| Version | Python 3.12 |
| Packaging | `pyproject.toml` |
| Lint and format | Ruff |
| Type checking | Type checker configured in `pyproject.toml` (TBD: mypy or pyright, decide in template-fastapi) |
| Tests | pytest, see [testing](../testing/README.md) |
| Validation | Pydantic |

## Rules

- Annotate all public function signatures. Annotations are documentation the checker can verify.
- Use full domain names, not abbreviations: `project_id`, not `pid`; `request`, not `req` or `data`.
- Prefer at most three parameters per function or method. Group more into a request DTO or config object.
- Comments explain why: a hidden constraint, an external quirk, a workaround. Delete comments that restate the code.
- No commented-out code.
- Keep modules single-purpose. Extract shared code only after the same pattern appears in two or three real places.
- Do not add dependencies without a stated reason.

## Environments

- Use one virtual environment per project (`.venv/`), created by the project's `make install` target.
- Never install into the system Python.
- Pin direct dependencies in `pyproject.toml`; commit the lock file if the tool produces one.
- Read configuration from environment variables through a single settings object. Provide `.env.example`; never commit `.env`.

## Project commands

Every repository exposes the same entry points so people and agents do not relearn them:

```bash
make install
make dev
make test
make lint
make format
make docker
make ci
```

`make ci` runs exactly what the CI workflow runs, so a green local run predicts a green pipeline.
