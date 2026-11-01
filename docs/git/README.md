# Git and GitHub

Use Git to organize changes and GitHub to collaborate on them. This section introduces both tools, then explains the contribution and release workflow used by projects that adopt this handbook.

## Overview

Git is a distributed version control system. It records snapshots of a project's files as commits, lets you work on separate branches, and keeps a history you can inspect and compare. A normal clone contains the project history, so you can create commits and examine earlier changes locally while offline.

GitHub hosts Git repositories and adds collaboration tools: pull requests, code review, issues, repository protections, and automation through GitHub Actions. You use Git to prepare and share commits; you use GitHub to discuss a proposed change, collect checks and review evidence, and merge it into the shared repository.

A typical change starts with local edits, becomes one or more commits, and is pushed to a remote working branch. A pull request proposes merging that branch into `main`. After checks and review, the merge records the accepted change; the project's release process determines when and how it reaches users.

## Key concepts

| Term | Meaning |
| --- | --- |
| Repository | The project's files and their version history |
| Working tree | The files you edit in your local checkout |
| Staging area | The changes selected with `git add` for the next commit |
| Commit | A recorded snapshot with an identifier, message, and parent history |
| Branch | A movable name pointing to a commit; it advances as you commit work |
| Remote | A named connection to another repository, such as `origin` or `upstream` |
| Pull request (PR) | A GitHub proposal to review and merge changes from one branch into another |

`git fetch` downloads remote history into your local repository. `git push` sends local commits and updates a branch on a remote. A PR adds the shared review step around those changes.

## Everyday workflow

Use a single permanent `main` branch, short-lived working branches, and squash merges. Deployment follows each project's release policy. [ADR-007](../adr/adr-007-main-only-git-workflow.md) records the rationale and supersedes [ADR-002](../adr/adr-002-git-branching-model.md).

1. [Create a working branch](./branching.md#starting-a-branch) from an up-to-date `main`.
2. Make one focused change and [write clear commits](./commits.md).
3. [Open a draft pull request](./pull-requests.md) into the owning repository's `main`.
4. Run verification, record evidence, and complete review.
5. Squash and merge when the [merge requirements](./pull-requests.md#rules) are met, then delete the working branch.
6. Follow the project's [release path](./releases.md#delivery-paths). Merging and deploying are separate decisions, even when a hosting provider automates deployment on merge.

## Guides

| Page | Covers |
| --- | --- |
| [Branching workflow](./branching.md) | Create and update branches; work directly or through a fork |
| [Commit messages](./commits.md) | Conventional Commits, breaking changes, and squash history |
| [Pull requests](./pull-requests.md) | Draft, describe, verify, review, and merge a change |
| [GitHub repository protections](./branch-protection.md) | Required repository settings and what remains unverified |
| [Releases and artifact promotion](./releases.md) | Choose a release path, promote a tested artifact, and recover safely |
