# ADR-003: Alembic for database migrations

- **Status**: Accepted
- **Date**: 2026-10-10

## Context

Python backends use SQLAlchemy 2.x with PostgreSQL. One stack document prescribed Flyway SQL migrations, while the working API project and the FastAPI template plan use Alembic. Two tools means two mental models and two container flows.

## Decision

Use Alembic for all schema migrations in Python projects. Migrations are reviewed by hand, ship in the same pull request as the model change, and run as an explicit step before the application starts serving. Application code never migrates at import time.

## Consequences

### Positive

- Migrations live next to the SQLAlchemy models in the same language and toolchain.
- Autogenerate speeds up routine changes.
- One approach across all Python projects and the FastAPI template.

### Negative

- Autogenerate misses renames and data migrations, so every migration needs review.
- Java projects use their own migration tool; this ADR does not cover them (TBD with the Spring Boot template).

## Alternatives Considered

1. **Flyway SQL migrations**
   - Why it was considered: plain SQL, language-neutral, works for Java and Python.
   - Why it was not selected: separate toolchain and container, no model-diff assistance for SQLAlchemy.
2. **Create tables from models at startup**
   - Why it was considered: no migration files.
   - Why it was not selected: no history, unsafe in production, cannot express data changes.
