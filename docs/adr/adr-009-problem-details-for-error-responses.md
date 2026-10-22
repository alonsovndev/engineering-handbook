# ADR-009: Problem details for error responses

- **Status**: Proposed
- **Date**: 2026-10-22

## Context

[REST API](../backend/rest-api.md#errors) requires one error shape from every endpoint but leaves the schema `TBD`, with RFC 9457 problem details as the candidate. Without a decision, each service invents its own shape. FastAPI's defaults also differ from each other: an `HTTPException` returns a `detail` string, while a validation failure returns a `detail` list, so clients cannot parse errors the same way across endpoints.

## Decision

Return every error response, including errors raised by the framework (unknown route, method not allowed, validation failure), as an [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) problem details object with the media type `application/problem+json`.

- The RFC makes every member optional. The handbook requires `type`, `title`, and `status`, and `status` equals the HTTP status code.
- `type` is a stable identifier for the kind of error. Clients branch on `type` and `status`, never on the text of `title` or `detail`.
- `detail` is optional. It explains this occurrence to the client and never contains stack traces, SQL, file paths, or exception messages from libraries.
- `requestId` is an extension member that carries the request ID from [Logging](../backend/logging.md), so a client report can be matched to log lines.
- Validation failures add an `errors` extension member listing the offending fields.

How the layers produce these responses is in [Error handling](../backend/error-handling.md).

Left open until this ADR is accepted:

- The format of `type` values, and whether they resolve to documentation.
- The `type` of errors the framework generates, such as an unknown route. The RFC default is `about:blank` with the HTTP status phrase as `title`.
- The shape of each item in `errors`.
- Whether to send `instance`, and whether it is the request path or an occurrence ID.
- Confirmation against `template-fastapi`, which [REST API](../backend/rest-api.md#errors) names as the place to confirm the schema.

## Consequences

### Positive

- One parseable shape for every endpoint, including framework-generated errors.
- A published standard that client libraries and API tooling can recognize.
- The request ID in every error shortens support and debugging loops.

### Negative

- FastAPI's default handlers must be replaced or overridden, which is extra code to maintain and test.
- Clients that expect FastAPI's default `detail` field must change.
- Extension members (`requestId`, `errors`) are handbook conventions, not part of the RFC, so generic tooling ignores them.

## Alternatives Considered

1. **Custom envelope, for example `{"error": {"code": "...", "message": "..."}}`**
   - Why it was considered: simple, and common in public APIs.
   - Why it was not selected: it is a bespoke format with no standard media type or tooling support, and it solves the same problem the RFC already defines.
2. **FastAPI defaults**
   - Why it was considered: no code to write.
   - Why it was not selected: the shapes differ between error kinds, and `detail` carries free text that clients end up parsing.
3. **RFC 7807**
   - Why it was considered: it is the widely known earlier version of problem details.
   - Why it was not selected: RFC 9457 obsoletes it with the same core members.
