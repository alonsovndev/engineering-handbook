# ADR-005: Lambda container image for the lean profile API

- **Status**: Accepted
- **Date**: 2026-10-10

## Context

The lean profile runs the FastAPI API on AWS Lambda with a Supabase PostgreSQL database. The handbook left Lambda packaging open (adapter, image versus zip). The FastAPI template already ships a Dockerfile that serves HTTP on port 8080 with `/health` and `/health/ready`, and the shared Terraform module for this target accepts a digest-pinned container image that includes the AWS Lambda Web Adapter.

Lambda cannot map secrets into environment variables at startup the way ECS can, and the Terraform module forbids credentials in Lambda environment variables. A pooled Supabase connection also rejects asyncpg's named prepared statements.

## Decision

- Package the API as a **container image** with the **AWS Lambda Web Adapter**. The template builds it with the `lambda` Dockerfile target; the default target stays the plain container used by ECS.
- Set the readiness path to `/health/ready` and the port to 8080 through the adapter settings.
- The application reads its database credentials from **AWS Secrets Manager at startup** (`POSTGRES_CREDENTIALS_SECRET_ARN`), through an optional `aws` extra (boto3) that is installed only in the Lambda image. The secret is created by hand and Terraform never reads its value.
- Behind a transaction-mode pooler, set `POSTGRES_POOL_MODE=null` (no SQLAlchemy pool, no prepared-statement reuse) and `POSTGRES_SSL_MODE=require`.
- Run migrations as a separate one-off step against the direct or session-pooler connection, never at startup (see [ADR-003](./adr-003-alembic-for-migrations.md)).

## Consequences

### Positive

- One Dockerfile and one set of application code serve Lambda, ECS, and local runs.
- No handler code or ASGI adapter dependency in the application.
- Credentials never appear in Terraform state or Lambda configuration.

### Negative

- Cold starts are slower than a small zip package (unmeasured, TBD).
- Each Lambda image needs an ECR repository and a build step before deploy.
- Secrets Manager adds a small monthly charge per secret (TBD) and a startup call.
- boto3 enlarges the Lambda image.
- The decision is validated offline only: the adapter's behavior inside Lambda and the Supabase pooler have not been exercised.

## Alternatives Considered

1. **Zip package with Mangum**
   - Why it was considered: smaller artifact and faster cold start.
   - Why it was not selected: adds an ASGI adapter dependency and a separate handler and packaging contract, so the app would build two ways.
2. **Database password in a Lambda environment variable**
   - Why it was considered: no extra dependency and no Secrets Manager cost.
   - Why it was not selected: the password lands in Terraform state and function configuration.
3. **SSM Parameter Store instead of Secrets Manager**
   - Why it was considered: free standard parameters.
   - Why it was not selected: the shared module and RDS tooling standardize on Secrets Manager, and the credentials format is already JSON.
