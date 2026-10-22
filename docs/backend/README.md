# Backend

Python with FastAPI is the default for new personal, freelance, SaaS, and open-source projects. Java with Spring Boot stays for enterprise and JVM environments; its standards are TBD.

| Page | Covers |
| --- | --- |
| [Python standards](./python-standards.md) | Version, tooling, typing, naming, environments |
| [FastAPI structure](./fastapi-structure.md) | Feature layout, layers, composition root, Docker |
| [Dependency injection](./dependency-injection.md) | Constructor injection, composition root, `Depends`, testing with fakes |
| [REST API](./rest-api.md) | Versioning, JSON, errors, pagination |
| [Error handling](./error-handling.md) | Errors by layer, status mapping, problem details, exception handlers |
| [Database and migrations](./database-and-migrations.md) | PostgreSQL, SQLAlchemy, Alembic |
| [Persistence patterns](./persistence-patterns.md) | Repository adapters, mappers, constraint errors, loading, pagination |
| [Logging](./logging.md) | Structured logs, correlation IDs, PII |

Do not impose these on Flask or Django projects, small scripts, notebooks, or legacy code that follows another established architecture.
