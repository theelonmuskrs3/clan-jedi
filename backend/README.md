# Clan Jedi backend (Cloudflare Pages advanced-mode worker + D1)

Serves every TanStack Start server function the app calls (`/_serverFn/<id>`) with the
original request/response format (seroval cross-JSON, `x-tss-serialized`), plus `/api/atelier-art`.

- Live at https://clan-jedi.pages.dev (same origin). The GitHub Pages copy calls it cross-origin (CORS allow-list).
- Storage: D1 database `clan-jedi` bound as `DB` (tables are created on first request).
- Host PIN: Pages secret env var `HOST_CODE` (not in source).
- Live data: hero guide (mapi.mobilelegends.com), rank board (Moonton GMS), wiki images (Fandom),
  cached 12 min (rank 24 h, 30 min retry) in D1, falling back to the bundled snapshots in `/_serverFn/*.json`.

Build: `npm ci && npx esbuild src/worker.js --bundle --format=esm --platform=neutral --main-fields=module,main --outfile=dist/_worker.js --minify-syntax`
Deploy: upload `static-root/` assets, then POST the deployment with `_worker.js`, `_routes.json`
(`{"version":1,"include":["/_serverFn/*","/api/*"],"exclude":[]}`) and `_redirects` form fields.

Tests: `node test/cup-unit.mjs` (cup flow with a mocked clock), `HOST_CODE=… BASE=… node test/e2e.mjs [--destructive]`
(destructive ring flow only against a preview/test database), `node test/parity-state.mjs` (cup/ring vs original).

## Upcoming skins (fetchLiveAtelier)
Every skin is checked live against the MLBB Wiki (`src/atelier.js`). It is shown only while the wiki lists it as
upcoming (`Upcoming_content` skin sections, a future month on the `StarLight` schedule, or `Upcoming` in
`Module:Skin/data`) and nothing on the wiki says it has released (a release date on/before today in
`Module:Skin/data`, a current/past StarLight month, or a passed official date). Hand-picked skins follow the same
rule, so released skins drop out by themselves. If the wiki is down, the bundled snapshot is served with the same
date rules applied. `node test/atelier-sweep.mjs` prints every kept/removed skin with its wiki evidence;
`node test/atelier-fallback.mjs` checks the wiki-down path.
