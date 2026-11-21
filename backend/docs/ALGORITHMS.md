# Clan Jedi: algorithms and data (recovered from the live bundles)

Source of truth: the production bundles mirrored in `original/assets/` (prettified copies in `pretty/`, and
engine copies in `algorithms/*.pretty.js`). Line numbers below refer to the **prettified** files (`pretty/<chunk>.js`).
Original TypeScript module names come from the Grok build conversation (`grok-share/`), which matches the bundle 1:1
in structure (e.g. `src/engine/scoreMatchup.ts` → `CompRating-BgbcJwvH.js`). Where the recovered TS differs from the
bundle, **the bundle wins** (the TS replay is incomplete, see grok-share/README).

Verification: `tools/algo_harness.js` runs the app's own engine functions inside the live page (original site and our
copy), on 392 fixed inputs (192 counter lists, 40 team ratings, 120 loadouts, 40 comp readouts, es+en), with the
live data loaded. Result: **byte-identical output, sha256 776eaecd…6120a on both** (`probe/algo-orig.json`,
`probe/algo-copy.json`).

---

## 0. Data model (per hero) — `data/tables/heroes.json` (133 heroes, runtime dump)

```
id, name, title, roles[Tank|Fighter|Assassin|Mage|Marksman|Support], specialties[], lanes[Gold Lane|Mid Lane|Jungle|EXP Lane|Roaming],
damageType Physical|Magic|Hybrid, range Melee|Ranged, difficulty 1-3,
tags[] (148 distinct: dash, burst, anti-heal-needed, knockup, stun, skillshot, poke, peel, crit, sustain, initiator, immobile, …),
stats{earlyPower, latePower, ccLevel, mobility, durability, waveClear} (1-5),
abilities[{key Passive|Skill1|Skill2|Ultimate, name, type, cooldown "42-32s", summary, notes[]}],
hardCounters[ids] (690 links total), softCounters[ids] (401 links), counteredByItems[item ids]
```
Built at runtime in `heroes-BSU0i1V0.js` from a compact roster text (TS: `src/data/roster.txt` + `parse-roster.ts`).

## 1. Draft slots → lane/role — `RoleBadge-CaUA3D_m.js` L1-40 (TS `src/data/draftSlots.ts`)

| slot | id | roles that fit | lane |
|---|---|---|---|
| 0 | marksman | Marksman | Gold Lane |
| 1 | mage | Mage | Mid Lane |
| 2 | assassin | Assassin | Jungle |
| 3 | fighter | Fighter | EXP Lane |
| 4 | roam | Tank, Support | Roaming |

Helpers: `heroFitsSlot` (role ∈ slot roles), `heroPlaysSlotLane` (hero.lanes includes slot lane; if hero has no lanes → role fit),
`heroPrimaryLaneIsSlot` (lanes[0] == slot lane), `sameRoleGroup(a,b)` (share a role, or both Tank/Support).

## 2. Matchup score `scoreMatchup(attacker e, enemy t, enemies, enemyReadout, locale, {slot, recommend})`
`CompRating-BgbcJwvH.js` L66-587 (function `L`; TS `src/engine/scoreMatchup.ts`)

Weights `A` (L67): BASE 52, HARD 30, SOFT 14, LANE 14, SLOT_ROLE 12, OFF_ROLE 10, TAG 7, TAG_PENALTY 6, ROLE 8, CD 5, COMP 10, META 1.

score = 52, then:
1. **Curated counters** (only if not recommending, or hero plays the slot by primary lane or role):
   attacker ∈ enemy.hardCounters → +30 (chip by case: Diggie vs suppress/lock-on/initiator → "Purges suppress";
   Khufra/Phoveus/Minsitthar → "Body-blocks dash"; Baxia/Karrie → "Anti-heal needed"; else "Punishes immobile").
   else ∈ softCounters → +14 ("Poke advantage" chip, text "soft counter").
2. **Official ranked lift** `lift = rankedLift(enemy, attacker)` from the Moonton 30-day rank board (store `clan-jedi-rank`,
   index L30104 `Cg`): if lift ≥ 0.015 and (not recommending or hero plays lane): +4 if already hard counter, else
   `min(16, round(8 + (lift-0.015)*400))`; chip "Ranked counter" ("wins X.X% more vs …").
3. **Tag rules** `P` (L129-322), +7 each (chip deduped), −6 penalties:
   - enemy immobile/skillshot & attacker dash/blink/high-mobility/untargetable → Ignores skillshots
   - enemy suppress/lock-on & attacker untargetable/invulnerable/immunity/purify or Diggie/Kadita → Purges suppress
   - enemy skillshot & attacker dash/blink → Ignores skillshots
   - enemy regen/sustain/heal/anti-heal-needed/lifesteal/spell-vamp & attacker anti-heal-needed/percent-hp/true-damage → Anti-heal needed
   - enemy shield & (Esmeralda or anti-shield) → Anti-shield
   - enemy dash/high-mobility/blink & attacker anti-dash/body-block or Khufra/Phoveus/Minsitthar → Body-blocks dash
   - ranged vs melee & attacker mobility ≥3 → Kites melee; ranged vs melee & enemy mobility ≤2 → Outranges
   - enemy long-cd-ult & (attacker dash/burst or mobility ≥4) → Punishes long CD
   - enemy short-cd-spam & attacker sustain/spell-vamp/regen/shield → Wins extended fight
   - enemy dive/burst & (attacker peel/stun/knockup/suppress or Tank/Support) → Peels dive
   - enemy split-push & (attacker wave-clear, waveClear ≥4, catch/lock-on) → Catches split
   - attacker untargetable/invulnerable & enemy lock-on/burst → Untargetable window
   - attacker execute/percent-hp/true-damage & (enemy durability ≥4 or Tank) → True damage
   - enemy Magic & (attacker durability ≥4 or shield) → Magic resist
   - enemy Physical & attacker Tank → Physical check
   - attacker poke/long-range & enemy immobile → Poke advantage
   - attacker lock-on & enemy immobile → Lock-on threat
   - attacker zone/persist-zone & enemy mobility ≤2 → Zone control
   - penalties −6: attacker immobile vs enemy dash/high-mobility/dive; attacker skillshot vs enemy dash/blink/untargetable
4. **Role pressure** `N` (L87-128), same role group only: ranged vs melee +6 (Outranges); mobility ≥ enemy+2 → +4
   (Punishes immobile); higher durability with sustain/regen/spell-vamp/shield → +4 (Wins extended fight).
5. **Cooldown window** `F`: enemy ult CD text 40-79s / "long" or tag long-cd-ult, and attacker mobility ≥4 → +5
   (Punishes long CD); else enemy short-cd-spam and attacker durability ≥4 → +5.
6. **Composition** `I` (only when ≥3 enemies): enemy magic ≥3 & attacker durability ≥3 or Tank/Fighter +10; physical ≥3 &
   Tank/Fighter +8; High Regen & anti-heal (tags or Baxia/Karrie) +10; Dive Comp & peel/anti-dash/Tank/Khufra/Minsitthar/Lolita +10;
   Heavy CC & purify/immunity/untargetable/Diggie +10; Split-push & waveClear ≥4 +5.
7. **Lane fit (recommend mode with slot)**: primary lane = slot lane +14; role fits slot +12 else −10;
   **live tier board**: `rankInLane(hero, lane, tierBoards)` → `META_WEIGHT{splus 10, s 7, aplus 4, a 2, b 0, c −3} × 1`;
   S+/S adds chip "Meta pick".
8. No reasons → fallback chip "Wins extended fight". Clamp **[8, 96]**, round. `reasons` = first 4 chips,
   `why` = first two reason texts joined.

## 3. Top counters `topCounters(enemyIds[5], focusedSlot, {limit=5, locale, exclude, sameRoleOnly, onlyPool, pool})`
`CompRating` L588-613 (`R`; `z` = same with limit 12). Focus = enemy in focused slot, else first enemy.
Candidates = all heroes minus enemies/excluded, **filtered to heroes who play the focused slot's lane**;
optional same-role / personal-pool filters; score each with mode `recommend`, sort desc, take limit.

## 4. Composition readout `readComposition(ids)` — `ItemIcon` L7032-7083 (`ne`; TS `engine/composition.ts`)
Counts magic / physical / other(hybrid). Tags: **Heavy CC** ≥2 heroes with ccLevel ≥4 or suppress/initiator;
**High Regen** ≥2 with regen/sustain/heal/lifesteal/spell-vamp/anti-heal-needed; **Dive Comp** ≥2 Assassin or dive/dash/high-mobility;
**Poke** ≥2 poke/long-range; **Shield-heavy** ≥2 shield or Esmeralda; **Magic Core** magic ≥3; **Physical Core** physical ≥3;
**Split-push** any split-push. Line text `compositionLine` (L7085) e.g. "3 Mágico · 2 Físico · Mucho CC".

## 5. Team rating `rateComposition(allies[5], enemies[5], locale)` — `CompRating` L648-814 (`de`; TS `engine/rateComp.ts`)
Per slot 0-4: both locked → `clamp8..96(round((score(ally→enemy) + 100 − score(enemy→ally))/2))` (non-recommend mode);
enemy only → 40 ("no answer locked"); ally only → 62 (shown, not averaged). Base = mean of counted lanes (default 50).
Adjustments vs enemy readout: High Regen ±8 (ally anti-heal: tags or Baxia/Karrie); Dive Comp ±7 (ally peel: peel/anti-dash/body-block,
Tank, Khufra/Minsitthar/Lolita/Atlas/Tigreal); Heavy CC +7/−6 (ally cleanse: purify/immunity/untargetable/invulnerable, Diggie/Kadita);
Magic Core & ally Tank/Fighter +4; Physical Core & ally Tank +4; enemy Poke & ally Dive Comp +3; ≥3 allies with no Tank/Fighter −8;
uncontested allies +min(6, 2·n); enemy Split-push & ally waveClear ≥4 or catch/lock-on +4. Adjustments clamped ±14; final clamp [8,96].
Grade: ≥72 favored, ≥55 even, else unfavored. Confidence "full" only at 5v5. Notes: up to 4 (adjustment notes, best lane's why,
worst lane's why if < 55).

## 6. Situational build `buildFor(heroId, enemyIds, focusedSlot, locale, alliedSlot)` — `ItemIcon` L8813-9147 (`ke`; TS `engine/buildItems.ts` + `engine/loadout.ts`)
Base path `we(hero)` (L8158), first match wins: live official gear overlay (fetchLiveHero) → curated per-hero path →
kit-profile path → **pro build table** (`data/tables/pro-builds-by-hero.json`, 133 heroes: emblem, spell, 6 items; index L≈29950-30100 `bg`)
→ role/tag fallback `Te`. Then mutations (each uses `Z(path, item, minSlot)`: replace the last non-protected slot ≥ minSlot; records "instead of X, when …"):
- any enemy with regen/heal/sustain/lifesteal/spell-vamp/anti-heal-needed → anti-heal: magic hero Glowing Wand, else Sea Halberd (slot ≥3)
- ≥2 magic threats or readout magic ≥3 → Athena's Shield (slot ≥4 frontline / ≥5 others)
- ≥2 physical DPS or physical ≥3 → frontline (non-assassin) Antique Cuirass (≥4); marksman vs assassin/dive → Wind of Nature (≥5)
- ≥2 hard CC and frontline → Tough Boots in slot 1 (unless Tough/Rapid already)
- assassin/dive/lock-on and hero is Mage/Marksman/Support → Winter Crown (≥5)
- ≥2 on-hit/crit/marksman enemies and Tank/Support → Chastise Pauldron (≥4)
- `Oe` extra swaps (L8629+): War Axe on squishy → Starlium Scythe / Endless Battle; Thunder Belt on squishy → Clock of Destiny / Hunter Strike;
  ≥2 armored enemies → Malefic Gun/Roar (physical) or Divine Glaive (magic); ≥2 crit enemies & frontline → Bladed Armor;
  magic hero vs ≥2 mobile → Ice Queen Wand; sustain fighter vs ≥2 burst/assassin → Oracle.
- dedupe, pad from a default list to 6, cut to 6. Output: core[6] with per-item purpose text, ≤4 swaps, boots,
  **emblem pick** `oe` (L7673: curated emblem/talents per hero or rules by role/tags; jungle → Retribution logic),
  **battle spell** `pe` (weighted: Flicker base 8, +14 immobile, +12 initiating tank, +14 vs suppress; Purify 16+8·n vs ≥2 hard CC for
  MM/Mage/immobile, −12 if only suppress; Inspire 26 for on-hit MM without curated spell; Aegis 12 vs ≥3 divers for MM/Mage;
  curated spell +40; Execute and Retribution excluded outside jungle; jungle picks Flame/Ice/Bloody Retribution by enemy comp
  and `jungle-retribution-by-hero.json`), respect/window tips, teamfight notes, kit scale.
Card version `loadout()` (`Ne`, L9153) = core items + emblem set/talents + spell.

## 7. Tier board — `tierlist-FX7HRV2G.js` (TS `data/tierlist.ts`)
Seed: esports.gg table 2026-09-02, patch 2.1.95a; lanes Jungle/EXP/Mid/Gold/Roaming; ranks splus/s/aplus/a/b/c built from
"top" lists (first 3 → S+, rest S; A list halved into A+/A). Name normalizer for scraped names (Yi Sun-shin, X.Borg, Chang'e …).
Live board (`fetchLiveTier`) replaces the seed when present (server re-scrapes esports.gg every 15 min).

## 8. Official rank board — `rank-CihZ9kQ3.js` seed + live `fetchLiveRank`
Seed (`data/tables/rank-board-seed.json`): per hero win/pick/ban + top-5 counters with `lift` (increase_win_rate).
Live: server calls Moonton `api.gms.moontontech.com` (`/api/act/basev4` for the HMAC secret "enigma", then
`POST /api/gms/source/2669606/<source>` HMAC-SHA1 signed; 30 days, all ranks, sorted by ban rate, 200 rows); cached 24h,
falls back to seed. Used by Codex "most banned / highest win rate" and by the Ranked-counter lift above.

## 9. Pick order
`engine/pickOrder.ts` (1-2-2-2-2-1 official order, coin flip) exists in the build conversation but is **not in the shipped
bundle** (no trace of it in any chunk); the live banner only shows locked counts (ENEMIGO 0/5 · TÚ 0/5).

## 10. Other logic
- Patch feed (`fetchLivePatches`): curated bilingual patch notes (latest 2.2.16, 2026-09-16) with per-hero buff/nerf tags.
- Live catalog (`fetchLiveCatalog`): portrait/item/emblem/talent/spell icon URLs (Fandom + Moonton CDN) + extra heroes.
- Atelier (skins tab): curated skin list (`atelier-skins.json`, 11 upcoming entries with dates and sources) + live overlay.
- Giveaway: "Ring" prize wheel and "Cup" bracket — **server-side state** (D1 tables `ring`, `cup` per migrations 0004/0005),
  join/leave/spin/draw are POST server functions (cannot work on a static host).
- Visitor beacon (`Dg`, POST every 60s) and Settings stats (`Og`) — server analytics (D1 `traffic*`).

## 11. Data tables extracted (`data/tables/`, pure literals pulled from the bundles by `tools/extract_data.js`)
| file | what | source chunk @offset |
|---|---|---|
| heroes.json | 133 heroes, full model above | runtime (heroes chunk) |
| hero-kits-wiki-skills.json | 133 heroes, official skill text from the MLBB Wiki, flags, dmg types | ItemIcon @320 |
| items.json | 93 items: id, name, category, tier, cost, stats, passive, tags | index @476030 |
| pro-builds-by-hero.json | 133 heroes: emblem, spell, 6-item build | index @500016 |
| emblems-and-talents.json | 7 emblem sets with attributes and talents | ItemIcon @331573 |
| battle-spells.json | 15 battle spells (cooldown, effect en/es) | ItemIcon @338914 |
| jungle-retribution-by-hero.json | 50 junglers → retribution flavor | ItemIcon @344338 |
| rank-board-seed.json | official 30-day rank seed (win/pick/ban, counters+lift) | rank @47 |
| item-icon-urls.json | 94 item icons (Fandom CDN) | ItemIcon @384224 |
| item-names-es / item-passives-es / hero-titles-es | Spanish labels | RoleBadge |
| i18n-strings.json | full en/es UI strings | utils @16150 |
| atelier-skins.json | skins tab data | atelier @6 |
Plus `data/serverfn/` = snapshot of every live GET server function (144 files) used by the static copy.

## 12. Patch 2.2.23 data refresh (2026-11-21) — data and weights only, no engine code or UI changes
Live patch: **2.2.23 (released 2026-11-11)**; 2.2.16a (2026-10-14) was also missing. Sources: mlbb.tools/patch-notes/2.2.23,
mlbbhub.com/patch-notes/original/2.2.23 (Moonton's original notes), kazukiofficial 2.2.16a notes. The advance server (2.2.34)
is ignored. No new hero this patch (Moonton's rank board lists 133 heroes = roster).

**Bundled data literals** (`tools/patch_data.py`, applied by `build_static.py` with exact-match, count-checked replacements):
| hero / item | patch | roster change (heroes chunk) | engine effect |
|---|---|---|---|
| Popol and Kupa | 2.2.23 revamp | new kit text; tags +shield,+slow; mobility 4; hard counters jawhead/harley/lolita/saber/natalia; soft lesley/baxia/selena | counter + "countered by" lists follow the new kit |
| Kaja | 2.2.23 buff/rework | ult no longer suppress/lock-on; tags initiator,zone,pull,stun,dash,peel,long-cd-ult; ult 70-60s; hard valir/akai/grock, soft kimmy/estes/gloo | no longer scored as a suppress-pick counter |
| Freya | buff | +long-cd-ult; ult 60-44s; passive heal text | |
| Xavier | buff | +zone; mobility 2; S2 text | |
| Lunox, Karrie, Atlas, Aulus | buff/adjust/nerf | ability text | text only |
| Aldous | buff | S2 cd 8s; earlyPower 2 | |
| Gloo | nerf | cc 3; ult text 60% | lower CC weight |
| Lukas | adjust (tankier) | +sustain tag | |
| Masha | nerf | earlyPower 3, waveClear 4; slow moved S1→S2 | |
| Hirara | 2.2.16a nerf | S1 10-6.5s | |
| Rafaela | 2.2.16a nerf | S1 5s, S2 10.5-9.5s | |
| Kalea | 2.2.16a buff | earlyPower 4 | |
| Chastise Pauldron | 2.2.23 | passive 75%→80% (index chunk) | item text |
| Antique Cuirass | 2.2.23 | Deter 6%→8% (index chunk) | item text |
| Sprint | 2.2.23 | cooldown 100→75s (ItemIcon) | spell data |
| Tank set / Concussive Blast | 2.2.23 | 7%→8% HP (ItemIcon en+es) | text |
| codex chunk | — | tier "out of date" notice condition also accepts 2.2.23 and any live board newer than the seed | keeps the notice hidden exactly as before |
Melissa (buff) and Uranus/Kagura (adjust) had number-only changes with no field in the roster model; logged in the patch feed only.

**Live data (backend `src/meta.js`)** — feeds the existing payloads, same shapes:
- `fetchLiveRank`: win/pick/ban = Moonton official 30 days, all ranks (what Codex labels). **Counters** now blend the 30-day
  boards: all ranks 0.4, Mythic 0.2, Mythical Honor 0.2, Mythical Glory 0.2; a counter missing from a bracket's top 5 is
  imputed at 0.75 × that bracket's lowest listed lift; top 5 kept with lift ≥ 0.01. Engine uses lift ≥ 0.015 as before.
- `fetchLiveTier`: the board is rebuilt from Moonton's 7-day boards (all/Mythic/Honor/Glory, 0.25 each) since the patch.
  Per lane, candidates = roster heroes with that lane and a fitting role (Jungle: Assassin/Fighter/Tank, EXP: Fighter or
  primary-EXP Tank, Mid: Mage, Gold: Marksman, Roaming: Tank/Support; falls back to lane-only if too few). Score =
  0.4·z(win) + 0.3·z(log ban) + 0.2·z(log pick) + 0.1·z(log(1+MPL picks+bans)) + 0.25 if it is the hero's primary lane.
  Band sizes per lane stay exactly the seed's (S+/S/A+/A/B/C counts), so the board renders the same. If data is missing
  the seed is served as before. Recommend mode reads it through META_WEIGHT unchanged.
- `fetchLiveHero` gear: when Moonton's hero guide has an official build, the core items are replaced with Moonton Academy's
  most-picked high-rank build for the hero's main lane (Glory → Mythic → All), filled to 6 with the hero's pro items
  and the guide's own items (tier-3 items + one pair of boots). Heroes without a guide build keep an empty gear list.
  The engine uses live gear only when the latest patch is newer than 2.2.16 — now true — so patch-current gear matters.
- `fetchLivePatches`: 2.2.23 and 2.2.16a prepended (same per-hero buff/nerf/adjust tags).
- `fetchLiveCatalog`: heroes on Moonton's board but not in the roster are added to `extraHeroes` (Rone hero detail).

**Engine test (algo_harness, 392 inputs, prod before vs local after, both with live data):** weights unchanged; counter
lists changed 190/192, team ratings 22/40, loadouts 8/120 (4 are only the Antique Cuirass text), readouts 1/40.
