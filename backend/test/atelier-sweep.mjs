// Runs the upcoming-skins finder against the live wiki: prints every kept skin with its wiki evidence,
// every hand-picked skin that was removed (and why), and upcoming wiki skins with no art yet.
import fs from "node:fs"; import { fromCrossJSON } from "seroval";
import { sweepWiki, buildAtelier, isAuto, judge, todayIso } from "../src/atelier.js";
const HEROES = JSON.parse(fs.readFileSync(new URL("../data/heroes-min.json", import.meta.url)));
const findHero = (n) => HEROES.find((h) => h.id === n) || HEROES.find((h) => h.name.toLowerCase() === String(n).toLowerCase());
const fetchJson = async (u) => { const r = await fetch(u, { headers: { "User-Agent": "ClanJediCounter/1.0" } }); if (!r.ok) throw new Error(r.status); return r.json(); };
async function wikiInfo(titles) { const out = {}; for (let i = 0; i < titles.length; i += 50) { const d = await fetchJson("https://mobile-legends.fandom.com/api.php?" + new URLSearchParams({ action: "query", titles: titles.slice(i, i + 50).join("|"), prop: "imageinfo", iiprop: "url|size", format: "json" })); const nm = {}; for (const n of d.query?.normalized ?? []) nm[n.to] = n.from; for (const p of Object.values(d.query?.pages ?? {})) { const ii = p.imageinfo?.[0]; if (ii && p.missing === undefined) out[nm[p.title] ?? p.title] = { width: ii.width, height: ii.height }; } } return out; }
const snap = fromCrossJSON(JSON.parse(fs.readFileSync(new URL("../../data/serverfn/f89fc7d63b6b20fcd563711bfd9aaa567315b4b218b5b1fd4c5cb44c1bbea21a__en.json", import.meta.url))), { refs: new Map() }).result;
const curated = snap.skins.filter((s) => !isAuto(s));
const ev = await sweepWiki({ fetchJson });
console.log("wiki reached", ev.reached, "UC skins", ev.upcoming.length, "StarLight rows", ev.starlight.length, "skin-data rows", Object.keys(ev.skinData).length);
const { skins, added, removed, noArt } = await buildAtelier(curated, ev, { findHero, wikiInfo });
const today = todayIso();
console.log(`\nKEPT/ADDED (${skins.length})`);
for (const s of skins) { const v = judge(s.hero, s.nameEn, ev, today); console.log(` ${added.includes(s) ? "+" : " "} ${s.hero} · ${s.nameEn} · ${s.tier} · date ${s.date}${s.endDate ? "→" + s.endDate : ""} · UC: ${v.uc ? v.uc.group + " / " + v.uc.section : "-"} · SL: ${v.sl ? v.sl.date : "-"} · data: ${v.rec ? v.rec.release + " " + v.rec.availability : "-"} · art ${s.angles.map((a) => a.src.split("?")[0].split("/").pop()).join(",")}`); }
console.log(`\nREMOVED (${removed.length})`); for (const r of removed) console.log(`  - ${r.hero} · ${r.name}: ${r.why}`);
console.log(`\nUPCOMING BUT NO ART (${noArt.length})`); for (const r of noArt) console.log(`  ? ${r.hero} · ${r.name} · ${r.tier} (${r.section})`);
