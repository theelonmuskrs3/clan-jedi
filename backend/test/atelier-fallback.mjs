// Wiki unreachable -> fetchLiveAtelier falls back to tonight's 40-skin snapshot.
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
console.log(r.status, v.skins.length === 40 ? "PASS fallback to 40-skin snapshot" : "FAIL " + v.skins.length, v.fetchedAt);
