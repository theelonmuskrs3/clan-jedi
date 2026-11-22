// Wiki unreachable -> fetchLiveAtelier falls back to the bundled snapshot, filtered: skins verified as released
// and the snapshot's art-less auto rows are dropped, passed leaked dates become TBA.
import initSqlJs from "sql.js"; import fs from "node:fs"; import { fromCrossJSON } from "seroval";
const SQL = await initSqlJs(); const db = new SQL.Database();
const stmt = (sql, args = []) => ({ bind: (...a) => stmt(sql, a), _exec() { const s = db.prepare(sql); s.bind(args.map((x) => (x === undefined ? null : x))); const rows = []; while (s.step()) rows.push(s.getAsObject()); s.free(); return rows; }, async first() { return this._exec()[0] ?? null; }, async all() { return { results: this._exec() }; }, async run() { this._exec(); return {}; } });
const DB = { prepare: (sql) => stmt(sql), batch: async (l) => l.map((s) => ({ results: s._exec() })) };
const realFetch = globalThis.fetch; globalThis.fetch = async (u, i) => { if (String(u).includes("fandom.com")) throw new Error("wiki down (test)"); return realFetch(u, i); };
const { default: worker } = await import("../dist/_worker.js");
const ROOT = "/workspace/clan-jedi/static-root";
const env = { DB, ASSETS: { fetch: async (u) => { const p = ROOT + decodeURIComponent(new URL(u.url ?? u).pathname); return fs.existsSync(p) ? new Response(fs.readFileSync(p)) : new Response("nf", { status: 404 }); } } };
const r = await worker.fetch(new Request("https://t/_serverFn/f89fc7d63b6b20fcd563711bfd9aaa567315b4b218b5b1fd4c5cb44c1bbea21a__en.json", { headers: { "x-tsr-serverFn": "true" } }), env, { waitUntil() {} });
const v = fromCrossJSON(await r.json(), { refs: new Map() }).result;
const ids = v.skins.map((s) => s.id);
const bad = ["layla-prismatic-rhythm", "yve-flame-lotus", "mathilda-arcane-verdict", "johnson-midnight-pursuit", "fanny-blade-of-kibou"].filter((x) => ids.includes(x));
// live official events stay (with the live badge) until their end date (checked for a Nov 2026 run)
const today = new Date().toISOString().slice(0, 10);
const liveMissing = v.skins.length && today <= "2026-11-30" ? ["kagura-feast-of-eternity", "kalea-tideborn-sailor", "bruno-the-purifier", "aamon-falcon-of-light", "aurora-emerald-luminary", "popol-flamehide-thane"].filter((x) => !ids.includes(x)) : [];
const dup = ids.length !== new Set(ids).size;
const helcurt = v.skins.find((s) => s.id === "helcurt-cyber-infiltrator");
const ok = r.status === 200 && !dup && !liveMissing.length && !bad.length && helcurt?.date === "2099-01-01" && !helcurt.endDate;
console.log(r.status, ok ? `PASS filtered fallback (${v.skins.length} skins, live first: ${ids.slice(0, 8).join(",")})` : `FAIL ${v.skins.length} bad=${bad} liveMissing=${liveMissing} dup=${dup} helcurt=${helcurt?.date}`, v.fetchedAt);
