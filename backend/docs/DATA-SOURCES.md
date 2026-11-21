# Where Clan Jedi's data comes from, and how to refresh it

There are two layers. The algorithms read both the same way, so data can be refreshed without touching any engine code.

## Layer 1: bundled at build time (frozen inside the JS)
| data | origin (per the build prompt and conversation) | bundle location | fields |
|---|---|---|---|
| Hero roster (133, up to Hirara/Marcel/Obsidia/Lukas/Suyou/Zhuxin/Zetian) | Fandom `List_of_heroes` + hero pages, hand-tagged by the builder | heroes chunk (roster text) | role, lanes, damage type, range, tags, stats, abilities, hard/soft counters, countered-by items |
| Official skill text | "MLBB Wiki" (Fandom) per hero | ItemIcon @320 → `data/tables/hero-kits-wiki-skills.json` | skills[name, des, tips], flags, dmgTypes, source |
| Portraits | Fandom CDN `static.wikia.nocookie.net/mobile-legends/images/*/HeroNNN1-portrait.png` (latest cb 2026-06-18) | catalog + HeroPortrait | url per hero |
| Items (93) | Fandom `Equipment` + Liquipedia `Portal:Equipment` | index @476030 → `items.json` | category, tier, cost, stats, passive, tags |
| Item icons | Fandom CDN | ItemIcon @384224 | url |
| Emblems / talents / spells | Fandom (names, effects) + local PNGs `/emblems`, `/talents`, `/spells` | ItemIcon | |
| Pro builds (133) | builder-curated (MLBB meta sites) | index @500016 → `pro-builds-by-hero.json` | emblem, spell, 6 items |
| Tier seed | esports.gg tier list, table date 2026-09-02 (patch 2.1.95a) | tierlist chunk | lane boards |
| Rank seed | mobilelegends.com/rank (Moonton) 30-day snapshot | rank chunk | win/pick/ban, counters + lift |
| Skins (Atelier) | Moonton posts on X, Fandom `Upcoming_content` + `File:` pages, ldshop.gg, esports.gg | atelier chunk + `/atelier/*.jpg` | dates, blurbs, sources |

## Layer 2: fetched live at runtime (server functions on the Grok host)
Read-only GETs, each replaces or overlays the bundled data in a client store (zustand, persisted to localStorage):
| server fn | upstream | refresh | our copy |
|---|---|---|---|
| fetchLivePatches(locale) | curated notes (Fandom patch pages / Liquipedia / mlbbhub.com), latest 2.2.16 · 2026-09-16 | 15 min client poll | snapshot JSON |
| fetchLiveCatalog(locale) | Fandom portraits + Moonton CDN icons (`akmweb.youngjoygame.com`, `akmwebstatic.yuanzhanapp.com`) | 30 min | snapshot JSON |
| fetchLiveHero(heroId) | Moonton official hero data (`img.mobilelegends.com`, official gear + skills) | per hero in draft | snapshot JSON ×133 |
| fetchLiveTier(locale) | esports.gg tier list scrape (re-checked every 15 min) | 15 min | snapshot JSON |
| fetchLiveRank() | Moonton `api.gms.moontontech.com` HMAC-signed rank API (30 days, all ranks) | 6 h client / 24 h server cache | snapshot JSON |
| fetchLiveAtelier(locale) | server-side skin feed | on Settings/Atelier | snapshot JSON |
No Fandom/Liquipedia API is called from the browser; the browser only hot-links Fandom/Moonton images.

Snapshot taken 2026-11-14 21:2x ET (`data/serverfn/index.json`) with `tools/snapshot_browser.js`.

## How to refresh in our copy (no algorithm changes)
1. **While the original Grok site is up:** re-run `node tools/snapshot_browser.js` then `python3 tools/build_static.py /clan-jedi static`.
   This re-captures every live layer exactly as the original serves it.
2. **Independently of Grok** (recommended going forward): a small scheduled job (GitHub Action or Cloudflare Worker cron) that
   rebuilds the same JSON shapes from the upstreams above: Moonton rank API (logic already recovered in
   `grok-share/files/workspace/src/lib/mlbb/rank.ts`), esports.gg tier page (parser `parseEsportsTierHtml` in `data/tierlist.ts`),
   Fandom MediaWiki API (`https://mobile-legends.fandom.com/api.php?action=parse&page=<Hero>`) for skills/portraits/items, and
   writes them to `_serverFn/<id>__<arg>.json`. Format = TanStack/seroval JSON; easiest is to keep the same
   generator in the editable source project (it already has the server fns) and run them at build time.
3. Bundled Layer 1 changes (new hero, new item) need a rebuild of the editable source, not just new JSON.

## Copy backend status (2026-11-14)
| Server fn | Copy behaviour |
|---|---|
| fetchLiveHero | live from mapi.mobilelegends.com; core items from Moonton Academy high-rank builds (via Rone Arena, 24 h D1 cache) when the guide has a build |
| fetchLiveRank | live from Moonton GMS rank API (8 boards, counters blended across Mythic+ brackets), 24 h D1 cache, 30 min retry, Rone Arena fallback per board, snapshot fallback |
| fetchLiveCatalog | Fandom imageinfo refresh of portrait/item/emblem/talent/spell URLs, 12 min cache |
| fetchLivePatches | curated original data + 2.2.23 and 2.2.16a notes (`backend/data/patches-extra.json`) |
| fetchLiveTier | rebuilt daily from Moonton 7-day rank boards + Rone MPL stats (see ALGORITHMS §12); seed fallback |
| fetchLiveAtelier | Hand-picked skins + wiki-only upcoming skins, all checked live against the MLBB Wiki (backend/src/atelier.js): a skin is shown only if it is listed in a skin-tier section of `Upcoming_content` (revamps, remodels, new heroes and series placeholders ignored), a future month on the `StarLight` schedule, or `Upcoming` in `Module:Skin/data` — and is NOT released per `Module:Skin/data` (release date on/before today), the StarLight schedule (current/past month), or a passed official date. Hand-picked entries drop out the same way; a passed leaked date becomes TBA. Wiki-only skins need art on the wiki (splash `Hero (Skin).jpg/png` >=600px, or full-size art uploaded as a `-portrait` file, served via `/api/atelier-art?model=`). Events whose end date passed are dropped. 12 min cache; if the wiki is unreachable, the bundled snapshot is served filtered (date rules + skins verified released on 2026-11-14; its art-less auto rows removed). Test: `node backend/test/atelier-sweep.mjs` prints every kept/removed skin with its wiki evidence. |
| traffic / cup / ring | D1, seeded from the original's boards on 2026-11-14 |

## Patch 2.2.23 refresh (2026-11-21)
| source | used for | access | cache / fallback |
|---|---|---|---|
| Moonton official rank API (`api.gms.moontontech.com`, sources 2756570 = 30 days, 2756569 = 7 days; bigrank 101 all, 7 Mythic, 8 Honor, 9 Glory) | rank counters, win/pick/ban, tier board, new-hero detection | HMAC-signed POST (same as the original app) | D1 `meta:boards` 24 h, stale-while-revalidate, 30 min retry |
| Rone Arena (`arena.rone.dev`, mirror `arena.fastapicloud.dev`; OpenAPI at `/api/openapi.json`) | per-board fallback; Moonton Academy builds (`/api/academy/heroes/{name}/builds`); MPL KH/MY/PH statistics (pro picks/bans); new-hero detail | public GET | D1 `acad:<hero>` 24 h, `meta:pro` 24 h, `newhero:<id>` |
| mapi.mobilelegends.com | official guide skills/gear (unchanged) | public GET | 12 min |
| Patch notes: mlbb.tools, mlbbhub.com (Moonton original text), kazukiofficial | `patches-extra.json`, roster edits in `tools/patch_data.py` | read by hand | bundled |
| MLBBDex | cross-check only (behind on patches) | — | not wired |
Skipped: MythicLab (HTTP 429 / Vercel checkpoint from the worker), esports.gg (Cloudflare challenge — the original was also
serving its seed), Liquipedia (strict API rate limits and CC BY-SA attribution would need new UI text; Rone's MPL data used
instead), Rone MPL ID league (upstream error 1102). No player-lookup endpoints are called.
Refresh for a future patch: add the notes to `backend/data/patches-extra.json` (and bump `latest`), add roster edits to
`tools/patch_data.py`, rebuild both static copies and the worker. Boards, tier, counters and Academy builds refresh by themselves.
