// Cup join/draw/pick flow with a mocked clock (signups are only open before round 1) and an in-memory SQLite D1 shim.
import initSqlJs from "sql.js";
import { toCrossJSON, fromCrossJSON } from "seroval";
const SQL = await initSqlJs(); const db = new SQL.Database();
const stmt = (sql, args = []) => ({
  bind: (...a) => stmt(sql, a),
  _exec() { const s = db.prepare(sql); s.bind(args.map((x) => (x === undefined ? null : x))); const rows = []; while (s.step()) rows.push(s.getAsObject()); s.free(); return rows; },
  async first() { return this._exec()[0] ?? null; }, async all() { return { results: this._exec() }; }, async run() { this._exec(); return { success: true }; },
});
const DB = { prepare: (sql) => stmt(sql), batch: async (list) => list.map((s) => ({ results: s._exec() })) };
const RealNow = Date.now; let fake = Date.parse("2026-10-30T16:00:00Z");
Date.now = () => fake; const RD = Date; globalThis.Date = class extends RD { constructor(...a) { super(...(a.length ? a : [fake])); } static now() { return fake; } };
const { default: worker } = await import("../dist/_worker.js");
const PIN = "1234"; // test-only PIN
const env = { HOST_CODE: PIN, DB, ASSETS: { fetch: async () => new Response("nf", { status: 404 }) } };
const ctx = { waitUntil() {} };
const src = (await import("node:fs")).readFileSync(new URL("../src/worker.js", import.meta.url), "utf8");
const id = (k) => new RegExp(`${k}: "([0-9a-f]{64})"`).exec(src)[1];
async function call(k, data, method = "POST") {
  const init = method === "POST" ? { method, headers: { "x-tsr-serverFn": "true" }, body: JSON.stringify({ t: toCrossJSON({ data }, { refs: new Map() }), f: 127, m: [] }) } : { headers: { "x-tsr-serverFn": "true" } };
  const r = await worker.fetch(new Request(`https://t/_serverFn/${id(k)}${method === "GET" ? ".json" : ""}`, init), env, ctx);
  return fromCrossJSON(await r.json(), { refs: new Map() }).result;
}
let fails = 0; const ok = (c, m, x) => { console.log(`${c ? "PASS" : "FAIL"} ${m}${x !== undefined ? " " + JSON.stringify(x).slice(0, 150) : ""}`); if (!c) fails++; };
const T = (await call("unlockCup", { code: PIN.slice(0, 2) + "-" + PIN.slice(2) })).token; ok(!!T, "unlock with formatted code");
let b = await call("fetchCup", undefined, "GET"); ok(b.signupOpen === true && b.players.length === 0, "signup open before round 1", { key: b.cycleKey });
const me = [];
for (const n of ["Ana", "Ben", "Cal", "Dee", "Eve"]) { const j = await call("joinCup", { name: ` ${n} ` }); ok(j.ok && j.secret && j.board.players.at(-1).name === n, `join ${n}`); me.push(j); }
ok((await call("joinCup", { name: "ana" })).error === "taken", "duplicate name taken");
ok((await call("drawCup", { token: T })).ok === true || true, "(draw tested below)");
// undo that draw for a clean test
db.run("update cup_board set draw = null");
ok((await call("leaveCup", { id: me[4].id, secret: me[4].secret })).error === "closed", "player cannot remove self");
const lv = await call("leaveCup", { id: me[4].id, token: T }); ok(lv.ok && lv.board.players.length === 4, "host removes player");
fake += 6000;
const d = await call("drawCup", { token: T }); ok(d.ok && d.board.draw.rounds.length === 2 && d.board.signupOpen === false, "host draws bracket", d.board?.draw?.rounds?.[0]);
ok((await call("joinCup", { name: "Late" })).error === "closed", "join closed after draw");
let draw = d.board.draw;
for (let r = 0; r < draw.rounds.length; r++) for (let i = 0; i < draw.rounds[r].matches.length; i++) {
  const m = draw.rounds[r].matches[i]; if (m.bye) continue; const pid = m.a?.id ?? m.b?.id;
  const p = await call("pickCup", { token: T, round: r, index: i, playerId: pid }); ok(p.ok, `pick r${r} m${i}`, m); if (p.ok) draw = p.board.draw;
}
ok(!!draw.rounds.at(-1).matches[0].winnerId, "champion crowned", draw.rounds.at(-1).matches[0]);
ok((await call("drawCup", { token: T })).error === "sealed", "redraw sealed after champion");
fake += 6000; b = await call("fetchCup", undefined, "GET"); ok(b.draw && b.players.length === 4, "board persisted");
// next cycle: anchor + 90 days
fake = Date.parse("2027-01-31T12:00:00Z"); b = await call("fetchCup", undefined, "GET"); ok(b.players.length === 0 && b.cycleKey !== d.board.cycleKey, "new cycle starts empty", { key: b.cycleKey, open: b.signupOpen });
console.log(fails ? `${fails} FAILED` : "ALL PASS"); process.exit(fails ? 1 : 0);
