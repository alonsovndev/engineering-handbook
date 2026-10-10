# CI/CD

**Status:** Implemented in [github-workflows](https://github.com/alonsovndev/github-workflows); first runs on GitHub passed for the self-test, AWS-facing workflows not yet exercised

Reusable GitHub Actions in a central workflow repository: Python CI, frontend CI, Docker build, Terraform validate and plan, AWS deployment. Projects call the reusable workflows instead of copying them, so one fix improves every repository.

Principles already decided:

- Use GitHub OIDC to authenticate to AWS instead of permanent access keys.
- `make ci` locally runs what CI runs.
- Required checks gate merges to `main` and `dev` (see [branch protection](../git/branch-protection.md)).
