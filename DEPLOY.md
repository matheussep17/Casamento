# Deploy Guide

## Live target
- Public site: https://matheustorresqa.com/casamento/
- This repository is the single source of truth for the wedding site. The site content lives at the repository root.

## Important: no more synchronization
This repository no longer mirrors changes to a second repo. The previous automatic sync workflow has been removed — all future edits must be made directly in this repository.

If you previously created a repository `matheussep17/site` for deploy mirroring, you can safely delete or archive it (recommended) to avoid confusion.

To delete the old repository on GitHub (do this only if you're sure):
1. Open: https://github.com/matheussep17/site
2. Settings → Scroll to **Danger Zone** → **Delete this repository**
3. Type the repository name to confirm and delete.

After deleting or archiving the old repo, remove the secret `SITE_REPO_TOKEN` from this repository to avoid stale credentials:
1. Open: https://github.com/matheussep17/Casamento
2. Settings → Secrets and variables → Actions
3. Delete the `SITE_REPO_TOKEN` secret

## Deploy (how to publish)
- If you use GitHub Pages, set the Pages source to the `main` branch and root folder: Settings → Pages → Build and deployment → Branch: `main`, Folder: `/ (root)`.
- If you use another hosting provider, update its deploy settings to pull from this repository (branch `main`).

## Manual deploy fallback
If you need to publish manually, clone the host repo and push the root files there as required by your host:
```bash
git clone <HOST_REPO_URL>
cp -r ./* <cloned-repo>/
cd <cloned-repo>
git add -A
git commit -m "Deploy: update site from Casamento repo"
git push origin <branch>
```
