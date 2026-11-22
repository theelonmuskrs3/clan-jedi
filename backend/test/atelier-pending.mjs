// Pending (confirmed, art-less) skins: hidden without wiki landscape art; with it they show (countdown before the
// start date, live badge during liveDays/endDate) and drop after. Mocked wiki, no network.
import fs from "node:fs";
import { buildAtelier } from "../src/atelier.js";
const EXTRA = JSON.parse(fs.readFileSync(new URL("../data/skin-events.json", import.meta.url)));
const HEROES = JSON.parse(fs.readFileSync(new URL("../data/heroes-min.json", import.meta.url)));
const findHero = (n) => HEROES.find((h) => h.id === n) || HEROES.find((h) => h.name.toLowerCase() === String(n).toLowerCase());
const ev = { upcoming: [], starlight: [], skinData: {}, dex: [] };
const run = async (art, day) => (await buildAtelier([], ev, { findHero, extra: { pending: EXTRA.pending }, wikiInfo: async () => (art ? { "File:Zilong (Aang).jpg": art } : {}) }, Date.parse(day + "T12:00:00Z"))).skins.map((s) => s.id);
const t = [
  ["no art", (await run(null, "2026-11-22")).includes("zilong-aang") === false],
  ["portrait art", (await run({ width: 1080, height: 1755 }, "2026-11-22")).includes("zilong-aang") === false],
  ["landscape, before start", (await run({ width: 1780, height: 1000 }, "2026-11-22")).includes("zilong-aang")],
  ["landscape, running", (await run({ width: 1780, height: 1000 }, "2026-12-20")).includes("zilong-aang")],
  ["landscape, after liveDays", (await run({ width: 1780, height: 1000 }, "2027-01-05")).includes("zilong-aang") === false],
];
for (const [n, ok] of t) console.log(ok ? "PASS" : "FAIL", n);
