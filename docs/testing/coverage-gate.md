# Coverage gate

Line coverage of at least **80%** is enforced by `make ci` and by the CI workflow, which run the full suite. A run below the threshold fails. `make test` runs only the fast suites and does not enforce the gate. See [ADR-004](../adr/adr-004-enforced-coverage-gate.md).

## Targets

| Area | Minimum |
| --- | --- |
| Overall | 80% |
| Critical paths (auth, security, persistence) | 90% |
| Domain logic and use cases | 85% |
| Infrastructure (repositories, integrations) | 75% |

Only the overall number is enforced by the tool. The per-area targets guide review.

## Backend

```bash
pytest --cov=src/app --cov-report=term-missing --cov-report=xml --cov-fail-under=80
```

Set `fail_under = 80` in the coverage configuration in `pyproject.toml` so every invocation enforces it.

## Frontend

Set `coverage.thresholds.lines` to 80 in the Vitest config and run tests with `--coverage` (the `test` script does this).

## Using the number

- Coverage is a signal, not proof. A test that asserts nothing raises the number and protects nothing.
- Do not add low-value assertions to hit the threshold. If coverage drops, add meaningful tests or explain why the metric changed (deleted or generated code).
- Exclude only generated code, migrations, and entry-point wiring, and list exclusions in the config with a comment explaining why.
- Never lower the threshold or add blanket excludes to get a green run. Changing the threshold needs an ADR update.
