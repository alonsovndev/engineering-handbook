---
sidebar_position: 4
---

# REST API

## Contract

- Prefix every route with a version: `/v1/...`. Changing a response shape incompatibly means a new version.
- JSON field names are `camelCase` on the wire and `snake_case` in Python. Use a Pydantic alias generator (`to_camel`) on request and response schemas.
- Use plural nouns for collections: `/v1/projects`, `/v1/projects/{project_id}`.
- Keep the OpenAPI schema the single contract. When a path, schema, or auth requirement changes, update the API docs in the same pull request.

## Status codes

| Code | Use |
| --- | --- |
| 200 | Successful read or update |
| 201 | Resource created; include the resource |
| 204 | Success with no body (delete) |
| 400 | Malformed request |
| 401 | Missing or invalid credentials |
| 403 | Authenticated but not allowed |
| 404 | Resource not found |
| 409 | Conflict with current state |
| 422 | Validation failed |
| 500 | Unhandled server error; never leak internals |

## Errors

Return one error shape from every endpoint. TBD: confirm the exact schema (candidate: RFC 9457 problem details) in template-fastapi and record it as an ADR.

## Pagination and filtering

- List endpoints are paginated by default. Do not return unbounded collections.
- Accept `limit` and `offset` (or a cursor for large or fast-changing data) and return the total or a next cursor.
- Allow filtering and sorting through query parameters, validated against an allow list.

## Idempotency

- `GET`, `PUT`, and `DELETE` are idempotent by definition; keep them so.
- For `POST` operations that clients may retry (payments, imports), accept an idempotency key.

## Security

Authentication and authorization rules belong in [Security](../security/README.md). At minimum, every non-public route declares its auth dependency explicitly, and request bodies are validated by Pydantic schemas rather than parsed by hand.
