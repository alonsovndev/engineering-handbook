# Cloud

**Status:** Modules and profile roots implemented; validated offline only

AWS for enterprise and large projects (IAM, VPC, ECS Fargate, RDS, S3, CloudFront, Secrets Manager, CloudWatch). Cloudflare for DNS, domains, SSL, CDN, and static sites. Terraform modules for both live in [terraform-modules](https://github.com/alonsovndev/terraform-modules), with one composition root per deployment profile. Nothing has been applied to a real account yet.

See [deployment profiles](../architecture/deployment-profiles.md) for the target architectures.

## Handbook hosting

This repository uses Cloudflare Workers Builds for static publishing, as a repository-specific exception to Terraform-managed asset deployment ([ADR-006](../adr/adr-006-cloudflare-handbook-hosting.md)). This does not establish a live deployment of the shared Terraform profiles.

| Page | Covers |
| --- | --- |
| [Handbook deployment](./handbook-deployment.md) | Repository connection, build settings, custom domain, verification, and rollback |
