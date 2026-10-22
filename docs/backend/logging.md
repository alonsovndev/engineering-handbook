---
sidebar_position: 9
---

# Logging

Logs are structured, correlated, and free of sensitive data.

## Rules

- Emit structured logs (JSON in deployed environments, readable text locally).
- Every request gets a request ID, generated at the edge or accepted from an upstream header, and every log line within the request includes it. Include the user ID once authenticated.
- Name business events `<feature>[.<entity>].<action>[.<detail>]`, for example `story.created` (feature `story`, action `created`) or `auth.login.invalid_credentials` (feature `auth`, action `login`, detail `invalid_credentials`). Stable names make logs searchable.
- Log at boundaries: use case start/finish for important operations, external calls, and errors. Do not log inside tight loops.
- Never log secrets, tokens, passwords, or full personal data. Log identifiers, not payloads.
- Log an exception once, where it is handled, with the stack trace. Do not log and re-raise at every layer.
- Batch jobs include `batch_id` in every entry.

## Levels

| Level | Use |
| --- | --- |
| `DEBUG` | Developer detail, off in production |
| `INFO` | Normal business events |
| `WARNING` | Recoverable surprises (retries, degraded dependencies) |
| `ERROR` | A request or job failed |

## Related

Error tracking (Sentry), tracing, and metrics are in [Observability](../observability/README.md).
