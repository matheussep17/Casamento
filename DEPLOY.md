# Deploy Guide

## Live target
- Public site: `https://matheustorresqa.com/casamento/`
- This repository is the live repository for the wedding site.
- Edit the live wedding site under `casamento/`.

## Safe workflow
1. Make changes only in `casamento/index.html`, `casamento/script.js`, and `casamento/styles.css` unless the change is intentionally shared elsewhere.
2. Verify the result locally.
3. Commit and push:
   - `git add casamento/index.html casamento/script.js casamento/styles.css`
   - `git commit -m "..."`
   - `git push origin master`

## Rule of thumb
- If a change is meant for `matheustorresqa.com/casamento/`, edit and push this repository.
- If a change is only a local experiment, keep it outside the live repo until it is ready.
