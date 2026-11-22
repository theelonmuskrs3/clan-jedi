// Prints which hand-picked / skin-events.json skins are live (official event window) on sample dates (offline path).
import fs from "node:fs"; import { fromCrossJSON } from "seroval";
import { filterOffline, prepareCurated, isAuto } from "../src/atelier.js";
const snap = fromCrossJSON(JSON.parse(fs.readFileSync(new URL("../../data/serverfn/f89fc7d63b6b20fcd563711bfd9aaa567315b4b218b5b1fd4c5cb44c1bbea21a__en.json", import.meta.url))), { refs: new Map() }).result;
const EXTRA = JSON.parse(fs.readFileSync(new URL("../data/skin-events.json", import.meta.url)));
for (const d of ["2026-11-21","2026-12-01","2026-12-09","2026-12-11","2026-12-16"]) {
  const out = filterOffline(prepareCurated(snap.skins.filter((s)=>!isAuto(s)), EXTRA), Date.parse(d+"T12:00:00Z"), { dropAuto: true });
  console.log(d, "live:", out.filter(s=>s.date<=d&&s.endDate>=d).map(s=>s.id).join(","), "| total", out.length);
}
