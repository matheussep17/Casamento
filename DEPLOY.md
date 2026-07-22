# Deploy Guide

## Live target
- Public site: https://matheustorresqa.com/casamento/
- This repository is the source of truth for the wedding site.
- The content is synced to the deployment repository at https://github.com/matheussep17/site.

## Automatic sync
- Every push to the `main` branch of this repository triggers an automatic sync to the deployment repository.
- The sync uses the GitHub Actions workflow at `.github/workflows/sync-to-site.yml`.

## Required repository secret
Before the workflow can push to the deployment repo, create this secret in the source repository:
- Name: `SITE_REPO_TOKEN`
- Value: a personal access token with write access to the `matheussep17/site` repository.

## Manual fallback
If you need to sync manually, run:
- `git clone https://github.com/matheussep17/site.git`
- Copy the updated files into the clone
- `git add -A`
- `git commit -m "Sync from Casamento"`
- `git push origin master`
