# FastAPI structure

Feature-first layout with Clean Architecture layers inside each feature. See [Clean Architecture](../architecture/clean-architecture.md) for the reasoning.

## Layout

```text
src/
  app/
    features/<feature>/
      domain/          # entities, value objects, aggregates, domain services, repository ports (ABC)
      application/     # use cases, DTOs, mappers, transaction boundaries, ports for external collaborators
      infrastructure/  # SQLAlchemy models, repositories, mappers, HTTP clients
      presentation/    # FastAPI routers, request/response schemas
    composition/       # composition root: the only place the object graph is built
    shared/            # cross-feature ports, persistence base, logging, pure helpers
    config/            # settings object, env loading
  main.py              # app creation and router registration only
tests/
  unit/
  integration/
  api/
migrations/            # Alembic
docs/
scripts/
Dockerfile
compose.yaml
pyproject.toml
alembic.ini
.env.example
AGENTS.md
README.md
```

## Layer placement

| Code | Layer |
| --- | --- |
| Business rule or invariant | `domain` |
| Orchestration, workflow, transaction boundary | `application` |
| Database, HTTP, filesystem, external service | `infrastructure` |
| FastAPI route, Pydantic schema | `presentation` |
| Logging, config, retry, pure helpers | `shared` |

## Dependency direction

Inner layers never import outer layers. Infrastructure implements domain and application ports; the domain never knows infrastructure exists.

| Layer | May import | Must not import |
| --- | --- | --- |
| `domain` | standard library, itself | application, infrastructure, presentation |
| `application` | domain, shared | infrastructure, presentation |
| `infrastructure` | domain, application ports | presentation |
| `presentation` | application, shared | domain entities directly |

Enforce this with an architecture test that parses imports (see [backend testing](../testing/backend-testing.md)). Rules that are not tested drift.

## Rules

- One `APIRouter` per feature, registered centrally in `main.py` or a router registry. Do not mount routers ad hoc.
- `composition/` is the only code that knows which implementation backs each port. Routes receive wired dependencies through `Depends(...)`; they never construct repositories, services, or use cases.
- Factories return port types (the `ABC`), not implementations.
- Use cases take a request DTO plus context, for example `execute(request, created_by)`. Name the DTO parameter `request`. Pass the DTO from the route; do not unpack it field by field.
- Domain entities and ORM models are separate classes. Map between them in standalone mappers (`XxxMapper.to_entity` / `to_model`) that live in `infrastructure/`; map entity to DTO with functions in `application/` (`to_xxx_response`). Models and DTOs carry no mapping logic.
- Routes and use cases do not build DTOs inline; they call the application mappers.
- Never return ORM models from routes. Return Pydantic response schemas.
- Repositories are plain `ABC` ports with explicit methods, no generic `BaseRepository`.
- Call shared validators directly. Do not add pass-through wrapper methods.
- Provide `/health` on every service. Disable Swagger and ReDoc outside local and Docker environments.

## Batch and cron jobs

- Plain Python entry point unless the job also serves an API.
- Accept a `batch_id` (UUID) at entry and carry it through every call and log line.
- Make writes idempotent (upserts) so reruns are safe.
- Guard against overlap with a lock or running flag; skip if already running.
- Log structured start, completion, and error entries.

## Docker

- Base image `python:3.12-slim`.
- Run as a non-root user (`appuser`, uid 999).
- Set `PYTHONUNBUFFERED=TRUE` and `PYTHONDONTWRITEBYTECODE=TRUE`.
- `EXPOSE 8080`. Local `make dev` may use another port; document both in the repository README.
- Run migrations in the container entrypoint script before the server starts; the app must not start serving if they fail.
- Never copy `.env` into the image.
- `compose.yaml` provides `app` and `postgres` for local development.
