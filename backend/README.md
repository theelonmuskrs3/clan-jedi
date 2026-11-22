# Clan Jedi backend (Cloudflare Pages advanced-mode worker + D1)

Serves every TanStack Start server function the app calls (`/_serverFn/<id>`) with the
original request/response format (seroval cross-JSON, `x-tss-serialized`), plus `/api/atelier-art`.

- Live at https://clan-jedi.pages.dev (same origin). The GitHub Pages copy calls it cross-origin (CORS allow-list).
- Storage: D1 database `clan-jedi` bound as `DB` (tables are created on first request).
- Host PIN: Pages secret env var `HOST_CODE` (not in source).
- Live data: hero guide (mapi.mobilelegends.com) with Moonton Academy core items, rank boards (Moonton GMS, 30/7 days x
  all/Mythic/Honor/Glory, Rone Arena fallback) feeding rank counters and the tier board, Rone MPL stats, wiki images (Fandom),
  cached 12 min (boards/Academy/pro 24 h, 30 min retry) in D1, falling back to the bundled snapshots in `/_serverFn/*.json`.
- Patch data: `data/patches-extra.json` (2.2.23, 2.2.16a); logic in `src/meta.js` (see ALGORITHMS.md §12).

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

### Live event skins (`data/skin-events.json`)
A skin whose **official** event is running (`date` ≤ today ≤ `endDate`, `confidence: "official"`) is kept even if the
wiki already lists it as released, so the card shows the original app's live ("EN CURSO") treatment; it drops off by
itself after `endDate`. `overrides` sets event dates on hand-picked skins, `add` holds live-event and officially
confirmed (Moonton post) skins the snapshot lacks. Every card needs official landscape splash art: wiki-found skins are
only added when the wiki has a wide `<Hero> (<Skin>).jpg/png` file (≥600px wide, aspect ≥1.3); portrait-only skins
(e.g. Johnson · Midnight Pursuit on 2026-11-22) stay hidden and appear by themselves once a real splash is uploaded. The month's StarLight and Collector are also picked up live from the MLBBDex events API
(`https://mlbbdex.com/api/v1/events`, wiki data, CC BY-SA) with wiki splash art. Live skins are listed first.
`node test/atelier-dates.mjs` shows which skins are live on sample dates.
