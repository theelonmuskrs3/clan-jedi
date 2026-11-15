// Runs the upcoming-skins finder against the live wiki and prints what it adds to the curated list.
import fs from "node:fs"; import { fromCrossJSON } from "seroval";
import { sweepWiki, buildAtelier, isAuto } from "../src/atelier.js";
const HEROES = JSON.parse(fs.readFileSync(new URL("../data/heroes-min.json", import.meta.url)));
const findHero = (n) => HEROES.find((h) => h.id === n) || HEROES.find((h) => h.name.toLowerCase() === String(n).toLowerCase());
const fetchJson = async (u) => { const r = await fetch(u, { headers: { "User-Agent": "ClanJediCounter/1.0" } }); if (!r.ok) throw new Error(r.status); return r.json(); };
async function wikiInfo(titles) { const out = {}; for (let i = 0; i < titles.length; i += 50) { const d = await fetchJson("https://mobile-legends.fandom.com/api.php?" + new URLSearchParams({ action: "query", titles: titles.slice(i, i + 50).join("|"), prop: "imageinfo", iiprop: "url|size", format: "json" })); const nm = {}; for (const n of d.query?.normalized ?? []) nm[n.to] = n.from; for (const p of Object.values(d.query?.pages ?? {})) { const ii = p.imageinfo?.[0]; if (ii && p.missing === undefined) out[nm[p.title] ?? p.title] = { width: ii.width, height: ii.height }; } } return out; }
const snap = fromCrossJSON(JSON.parse(fs.readFileSync("/workspace/clan-jedi/data/serverfn/f89fc7d63b6b20fcd563711bfd9aaa567315b4b218b5b1fd4c5cb44c1bbea21a__en.json")), { refs: new Map() }).result;
const curated = snap.skins.filter((s) => !isAuto(s));
const { entries, reached } = await sweepWiki({ fetchJson });
const { skins, added } = await buildAtelier(curated, entries, { findHero, wikiInfo });
console.log("wiki reached", reached, "entries", entries.length, "curated", curated.length, "added", added.length, "total", skins.length);
for (const s of added) console.log(" +", s.hero, "·", s.nameEn, "·", s.tier, s.confidence, s.angles.map((a) => a.kind).join("+"));
