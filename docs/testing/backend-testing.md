# Backend testing

pytest is the runner.

## Layout

```text
tests/
  unit/          # pure domain and application logic, no I/O
  integration/   # repositories, DB, DI wiring
  api/           # HTTP behavior through TestClient
  architecture/  # import-boundary checks; reads source files, so kept out of unit
conftest.py      # shared fixtures
```

Feature-specific builders may live in a `conftest.py` next to the tests that use them. Mirror the source feature structure inside each folder when a suite grows.

## Markers

Declare markers in `pyproject.toml` and apply them consistently so CI can filter:

```text
unit, integration, api, architecture, slow
```

`make test` runs the fast suites (unit, architecture). `make ci` runs everything with the coverage gate.

## Rules

- Unit tests touch no database, network, or filesystem.
- API tests use `TestClient` and `app.dependency_overrides` to swap ports for fakes or a test database.
- Integration tests that depend on PostgreSQL behavior run against real PostgreSQL (container locally, service in CI). SQLite in-memory is fine only when dialect does not matter.
- Reset state per test: transaction rollback or table cleanup. Tests must not depend on order.
- Test auth, validation errors, and not-found paths for every endpoint, not only the happy path.

## Architecture tests

Add `tests/architecture/test_architecture_rules.py`, which parses imports with `ast` and fails when a layer imports one it must not. The rules come from the table in [FastAPI structure](../backend/fastapi-structure.md#dependency-direction).

## Commands

```bash
make test                         # fast suites
pytest -m integration             # integration only
pytest --cov=src/app --cov-fail-under=80
```

See the [coverage gate](./coverage-gate.md).
