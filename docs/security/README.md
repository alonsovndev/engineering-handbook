# Security

**Status:** Planned (to be written)

Baseline practices to document: secrets handling, authentication and authorization, input validation and output encoding, dependency risk, OWASP Top 10 and API Security Top 10 checks, and security review triggers.

Until then, the minimum rules are: no secrets in the repository, explicit auth on every non-public route, validated input, and a security review of changes that touch auth or secrets (see [definition of done](../ai-development/definition-of-done.md)).
