# Deploy Guide

## Live target
- Public site: `https://matheustorresqa.com/casamento/`
- Live repository: `site-repo/`
- Edit the live wedding site under `site-repo/casamento/`

## Safe workflow
1. Make changes only in `site-repo/casamento/index.html`, `site-repo/casamento/script.js`, and `site-repo/casamento/styles.css` unless the change is intentionally shared elsewhere.
2. Verify the result locally.
3. Commit and push from the live repo:
   - `git -C site-repo add casamento/index.html casamento/script.js casamento/styles.css`
   - `git -C site-repo commit -m "..." `
   - `git -C site-repo push origin master`

## Do not use for the live wedding site
- `casamentoelias/` is a template/alternate copy and should stay out of the publish flow.
- The root repository is the workspace for the project, but it is not the publish target for the live wedding page.

## Rule of thumb
- If a change is meant for `matheustorresqa.com/casamento/`, edit and push `site-repo/`.
- If a change is only a local experiment, keep it outside the live repo until it is ready.
