// Clan Jedi backend: Cloudflare Pages advanced-mode worker.
// Re-implements the TanStack Start server functions of the original Grok-hosted app
// (same /_serverFn/<id> URLs, same seroval request/response format), backed by D1.
import { sweepWiki, buildAtelier, isAuto, filterOffline } from "./atelier.js";
import { toCrossJSON, fromCrossJSON } from "seroval";
import { buildBracket, applyCupWinner, giveawayClock, landingRotation, CUP_MAX } from "./giveaway.js";
import HEROES from "../data/heroes-min.json";
import ITEMS from "../data/items-min.json";
import OFFICIAL_IDS from "../data/official-ids.json";
import GEAR_NAMES from "../data/gear-names.json";

const ID = {
  fetchLivePatches: "1b6e324b0c2d014eee665e7ecb06b48a2fab10ef5d218ed9bf8ccac26cadbbb7",
  fetchLiveHero: "61a4e1a33bb916f6b3794ae7215d7787714a1f4954734e65d954c36311780bde",
  fetchLiveCatalog: "b55c10f5a084d031c17a1bda4581e4bd0c85bfa11a18f279ecfa0c0601cedd00",
  fetchLiveAtelier: "f89fc7d63b6b20fcd563711bfd9aaa567315b4b218b5b1fd4c5cb44c1bbea21a",
  fetchLiveTier: "7362049d95cc095c7f632420d23c3194f3879dc2128f94c08131e3677e6c8007",
  refreshLive: "e9cbc7f98415b9bad9710034e2a760299a905a4f39a00936aab4336419afaef2",
  fetchLiveRank: "f62f7d26dad085277baefcd5a4018de319e3a6a194c3cbbbcb904425dbd42c45",
  pingTraffic: "48e293022df7760f711ce465c3345f6afdca3494068ec2715b843e28574d27a3",
  fetchTraffic: "e2f925b28e2c8b2512f02cfae364fff077a7676c2005ac2b5da0637a6741df6b",
  fetchCup: "ffe8d52cc03d30ecab5c08432ae4dc20046e0064fd2a3b69fe2dbd71be871e26",
  joinCup: "0817f61b7aceb290abda117d7446d24ec559722b622075c16d302ccee34f1b56",
  leaveCup: "b7a6b2d82e3161498523f60e71867085b2e9dac574c9de48ea279b4fdaf95ce1",
  unlockCup: "b5b701e88b528815dd6156728b80c842d82cff836b509fe6059edebabf261afd",
  drawCup: "267a8c0af365d1155afb9abbf2646736b7d88f245fc751e80215e082a8caf403",
  pickCup: "9e930f02a5f5601c7ac6a09ce655f524063df4feda66195b6a960c1c1ac945af",
  fetchRing: "e8cc3ab3a6dd34b3f7b7400a8006e14cbe2d9b0770ac24950460454ffa27dfaf",
  addRing: "4b776070c9674357dfad864123a8669449774ffaca3d4263db76728d8b164aa3",
  removeRing: "f8c4e71377f3f30d7c9f82ef154c3016586e7673753e198e63915bf7314be7f4",
  startRing: "d970f9e235b2799d63ff240dd91bb4b741078810c894c18a7971f3cc8d380937",
  resetRing: "0287e702f917bb3e5c2f7302ebcc7251e5bd98869b9792176975cb99c2578d4f",
};

const GH_ORIGIN = "https://theelonmuskrs3.github.io";
const ALLOWED_ORIGINS = new Set([GH_ORIGIN, "https://clan-jedi.pages.dev"]);
const UA = "ClanJediCounter/1.0 (MLBB draft companion; https://x.ai)";
const TTL = 12 * 60 * 1000;          // live.ts: const TTL = 12 * 60 * 1000
const RANK_TTL = 864e5;              // rank: Nh = 864e5 (24 h)
const RANK_RETRY = 18e5;             // on failure retry after 30 min
let HOST_CODE = "";                  // host PIN: Pages secret env var HOST_CODE (never in source)
const SPIN_MS = 5400;
const RING_MAX = 8;
const RING_ROW = "live";

class BadInput extends Error {}

// ---------------------------------------------------------------- helpers
const hex = (bytes) => [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
const randomHex = (n) => hex(crypto.getRandomValues(new Uint8Array(n)));
function randomInt(min, max) {
  const range = max - min; if (range <= 0) return min;
  const lim = Math.floor(0x100000000 / range) * range; const buf = new Uint32Array(1);
  for (;;) { crypto.getRandomValues(buf); if (buf[0] < lim) return min + (buf[0] % range); }
}
function same(a, b) {
  if (a == null || b == null) return false;
  const x = new TextEncoder().encode(String(a)), y = new TextEncoder().encode(String(b));
  if (x.length !== y.length) return false;
  let d = 0; for (let i = 0; i < x.length; i++) d |= x[i] ^ y[i]; return d === 0;
}
async function hmacHex(alg, key, msg) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(key), { name: "HMAC", hash: alg }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(msg)));
}
let HOST_TOKEN = null;
let HOST_TOKEN_FOR = null;
async function hostToken() { if (!HOST_CODE) return null; if (HOST_TOKEN_FOR !== HOST_CODE) { HOST_TOKEN = hex(await hmacHex("SHA-256", "clan-jedi-cup-host", HOST_CODE)); HOST_TOKEN_FOR = HOST_CODE; } return HOST_TOKEN; }
const nowIso = () => new Date().toISOString();
const clone = (v) => JSON.parse(JSON.stringify(v));
// Postgres jsonb returns object keys sorted by (length, bytes); mirror that on reads.
function jsonbOrder(v) {
  if (Array.isArray(v)) return v.map(jsonbOrder);
  if (v && typeof v === "object") {
    const out = {};
    for (const k of Object.keys(v).sort((a, b) => a.length - b.length || (a < b ? -1 : a > b ? 1 : 0))) out[k] = jsonbOrder(v[k]);
    return out;
  }
  return v;
}
function findHero(name) {
  const n = String(name || "");
  return HEROES.find((h) => h.id === n) || HEROES.find((h) => h.name.toLowerCase() === n.toLowerCase());
}
const str = (v, min, max, trim = false) => {
  if (typeof v !== "string") throw new BadInput("expected string");
  const s = trim ? v.trim() : v;
  if (s.length < min || s.length > max) throw new BadInput("bad length");
  return s;
};
const int = (v, min, max) => { if (!Number.isInteger(v) || v < min || v > max) throw new BadInput("bad int"); return v; };
const optStr = (v, max) => (v === undefined ? undefined : str(v, 0, max));
const locale = (d) => { if (d?.locale !== "en" && d?.locale !== "es") throw new BadInput("locale"); return d.locale; };

// ---------------------------------------------------------------- D1 schema
let schemaReady = null;
function ensureSchema(env) {
  if (!schemaReady) {
    schemaReady = env.DB.batch([
      env.DB.prepare(`create table if not exists traffic_day (day text not null, visitor_id text not null, ip_hash text not null, hits integer not null default 1, first_at text not null, last_at text not null, primary key (day, visitor_id))`),
      env.DB.prepare(`create index if not exists traffic_day_ip on traffic_day (day, ip_hash)`),
      env.DB.prepare(`create table if not exists traffic_live (visitor_id text primary key, ip_hash text not null, last_beat integer not null)`),
      env.DB.prepare(`create index if not exists traffic_live_beat on traffic_live (last_beat)`),
      env.DB.prepare(`create table if not exists cup_board (cycle_key text primary key, players text not null default '[]', draw text, updated_at text not null)`),
      env.DB.prepare(`create table if not exists ring_board (id text primary key, players text not null default '[]', spin text, rest_deg real not null default 0, updated_at text not null)`),
      env.DB.prepare(`create table if not exists live_cache (key text primary key, at integer not null, body text not null)`),
    ]).catch((e) => { schemaReady = null; throw e; });
  }
  return schemaReady;
}

// ---------------------------------------------------------------- traffic (src/lib/traffic.ts)
const SALT = "clan-jedi-traffic-v1";
const VID = /^[a-z0-9-]{8,64}$/i;
function etDay() { return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
function normalizeIp(raw) {
  let ip = raw.trim().toLowerCase(); if (!ip) return null;
  if (ip.startsWith("[") && ip.includes("]")) ip = ip.slice(1, ip.indexOf("]"));
  ip = ip.replace(/^::ffff:/, "");
  if (/^\d{1,3}(\.\d{1,3}){3}:\d+$/.test(ip)) ip = ip.replace(/:\d+$/, "");
  if (["unknown", "127.0.0.1", "::1", "0.0.0.0", "localhost"].includes(ip)) return null;
  if (/^(10\.|192\.168\.|127\.|169\.254\.|0\.)/.test(ip) || /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) || /^(fc|fd|fe80)/.test(ip)) return null;
  return ip;
}
function clientIp(req) {
  const h = req.headers;
  const parts = [h.get("cf-connecting-ip"), h.get("true-client-ip"), h.get("x-real-ip"), ...(h.get("x-vercel-forwarded-for") ?? "").split(","), ...(h.get("x-forwarded-for") ?? "").split(",")];
  for (const p of parts) { const n = p ? normalizeIp(p) : null; if (n) return n; }
  return "unknown";
}
async function hashIp(ip) { const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${SALT}|${ip}`)); return hex(new Uint8Array(buf)).slice(0, 32); }
async function readStats(env) {
  const day = etDay();
  const [u, h, l] = await env.DB.batch([
    env.DB.prepare(`select count(*) as n from traffic_day where day = ?`).bind(day),
    env.DB.prepare(`select coalesce(sum(hits), 0) as n from traffic_day where day = ?`).bind(day),
    env.DB.prepare(`select count(*) as n from traffic_live where last_beat > ?`).bind(Date.now() - 90_000),
  ]);
  return { day, uniqueToday: u.results[0]?.n ?? 0, hitsToday: h.results[0]?.n ?? 0, live: l.results[0]?.n ?? 0 };
}
async function pingTraffic(env, data, req) {
  if (data?.kind !== "view" && data?.kind !== "beat") throw new BadInput("kind");
  if (typeof data.vid !== "string" || !VID.test(data.vid)) throw new BadInput("vid");
  const vid = data.vid.toLowerCase();
  const ipHash = await hashIp(clientIp(req));
  const day = etDay(); const hit = data.kind === "view" ? 1 : 0; const now = Date.now(); const iso = new Date(now).toISOString();
  const existing = await env.DB.prepare(`select ip_hash from traffic_day where day = ? and visitor_id = ? limit 1`).bind(day, vid).first();
  const locked = existing?.ip_hash ?? ipHash;
  await env.DB.batch([
    env.DB.prepare(`insert into traffic_day (day, visitor_id, ip_hash, hits, first_at, last_at) values (?, ?, ?, ?, ?, ?) on conflict (day, visitor_id) do update set hits = traffic_day.hits + excluded.hits, last_at = excluded.last_at`).bind(day, vid, locked, hit, iso, iso),
    env.DB.prepare(`insert into traffic_live (visitor_id, ip_hash, last_beat) values (?, ?, ?) on conflict (visitor_id) do update set last_beat = excluded.last_beat, ip_hash = excluded.ip_hash`).bind(vid, locked, now),
    env.DB.prepare(`delete from traffic_live where last_beat < ?`).bind(now - 5 * 60_000),
  ]);
  return readStats(env);
}

// ---------------------------------------------------------------- 1v1 cup (src/lib/cupBoard.server.ts)
let cupMemo = null;
function asStored(value) {
  const raw = typeof value === "string" ? JSON.parse(value) : value;
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    const id = typeof row.id === "string" ? row.id : ""; const name = typeof row.name === "string" ? row.name : ""; const secret = typeof row.secret === "string" ? row.secret : "";
    return id && name ? [{ id, name: name.slice(0, 18), secret }] : [];
  });
}
function asDraw(value) {
  const raw = typeof value === "string" ? jsonbOrder(JSON.parse(value)) : value;
  if (!raw || typeof raw !== "object" || !("rounds" in raw)) return null;
  return Array.isArray(raw.rounds) ? { rounds: raw.rounds } : null;
}
function cycleNow() { const c = giveawayClock(Date.now()); return { key: c.cycleKey, open: Date.now() < c.round1 }; }
async function cupRow(env, key) { return env.DB.prepare(`select players, draw, updated_at from cup_board where cycle_key = ? limit 1`).bind(key).first(); }
async function cupEnsure(env, key) { await env.DB.prepare(`insert into cup_board (cycle_key, players, draw, updated_at) values (?, '[]', null, ?) on conflict (cycle_key) do nothing`).bind(key, nowIso()).run(); }
function cupPresent(key, row, signupClock) {
  const draw = row ? asDraw(row.draw) : null; const stored = row ? asStored(row.players) : [];
  return { cycleKey: key, players: stored.map(({ id, name }) => ({ id, name })), draw, signupOpen: signupClock && !draw, updatedAt: row?.updated_at ? new Date(row.updated_at).toISOString() : new Date(0).toISOString() };
}
async function loadCup(env) {
  const { key, open } = cycleNow();
  if (cupMemo && cupMemo.key === key && Date.now() - cupMemo.at < 5000) return { ...cupMemo.data, signupOpen: open && !cupMemo.data.draw };
  await cupEnsure(env, key);
  const data = cupPresent(key, await cupRow(env, key), open);
  cupMemo = { key, at: Date.now(), data };
  return data;
}
const championId = (draw) => draw?.rounds.at(-1)?.matches[0]?.winnerId ?? null;
async function cupSave(env, key, players, draw) { cupMemo = null; await env.DB.prepare(`update cup_board set players = ?, draw = ?, updated_at = ? where cycle_key = ?`).bind(JSON.stringify(players), draw ? JSON.stringify(draw) : null, nowIso(), key).run(); }
async function cupSaveDraw(env, key, draw) { cupMemo = null; await env.DB.prepare(`update cup_board set draw = ?, updated_at = ? where cycle_key = ?`).bind(JSON.stringify(draw), nowIso(), key).run(); }
async function joinCup(env, data) {
  const name = str(data?.name, 1, 18, true);
  const { key, open } = cycleNow();
  await cupEnsure(env, key);
  const row = await cupRow(env, key); const stored = asStored(row?.players); const draw = row ? asDraw(row.draw) : null;
  if (!open || draw) return { ok: false, error: "closed" };
  const clean = name.trim();
  if (stored.length >= CUP_MAX) return { ok: false, error: "full" };
  if (stored.some((p) => p.name.toLowerCase() === clean.toLowerCase())) return { ok: false, error: "taken" };
  const id = `c-${randomHex(4)}`; const secret = randomHex(8);
  const players = [...stored, { id, name: clean, secret }];
  await cupSave(env, key, players, null);
  return { ok: true, id, secret, board: cupPresent(key, { players, draw: null, updated_at: nowIso() }, true) };
}
async function leaveCup(env, data) {
  const id = str(data?.id, 1, 40); optStr(data?.secret, 40); const token = optStr(data?.token, 1e6);
  const { key, open } = cycleNow();
  await cupEnsure(env, key);
  const row = await cupRow(env, key); const stored = asStored(row?.players);
  const host = !!token && same(token, await hostToken());
  if (!host) return { ok: false, error: "closed" };
  const players = stored.filter((p) => p.id !== id);
  await cupSave(env, key, players, null);
  return { ok: true, board: cupPresent(key, { players, draw: null, updated_at: nowIso() }, open) };
}
async function unlockCup(env, data) {
  const code = str(data?.code, 0, 12);
  const digits = code.replace(/\D/g, "");
  if (!HOST_CODE || (digits !== HOST_CODE && code.trim() !== HOST_CODE)) return { ok: false, error: "code" };
  return { ok: true, token: await hostToken() };
}
async function drawCup(env, data) {
  const token = str(data?.token, 0, 1e6);
  if (!same(token, await hostToken())) return { ok: false, error: "host" };
  const board = await loadCup(env);
  if (championId(board.draw)) return { ok: false, error: "sealed" };
  if (board.players.length < 2) return { ok: false, error: "short" };
  const made = buildBracket(board.players.map((p) => p.id), "random");
  const draw = { rounds: made.rounds };
  await cupSaveDraw(env, board.cycleKey, draw);
  return { ok: true, board: { ...board, draw, signupOpen: false, updatedAt: nowIso() } };
}
async function pickCup(env, data) {
  const token = str(data?.token, 0, 1e6); const round = int(data?.round, 0, 8); const index = int(data?.index, 0, 16); const playerId = str(data?.playerId, 1, 40);
  if (!same(token, await hostToken())) return { ok: false, error: "host" };
  const board = await loadCup(env);
  if (championId(board.draw)) return { ok: false, error: "sealed" };
  if (!board.draw) return { ok: false, error: "host" };
  const rounds = clone(board.draw.rounds);
  if (!applyCupWinner(rounds, round, index, playerId)) return { ok: false, error: "host" };
  const draw = { rounds };
  await cupSaveDraw(env, board.cycleKey, draw);
  return { ok: true, board: { ...board, draw, updatedAt: nowIso() } };
}

// ---------------------------------------------------------------- $40 ring (src/lib/ringBoard.server.ts)
function asPlayers(value) {
  const raw = typeof value === "string" ? JSON.parse(value) : value;
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((row) => { if (!row || typeof row !== "object") return []; const id = typeof row.id === "string" ? row.id : ""; const name = typeof row.name === "string" ? row.name : ""; return id && name ? [{ id, name: name.slice(0, 18) }] : []; });
}
function asSpin(value) {
  const raw = typeof value === "string" ? JSON.parse(value) : value;
  if (!raw || typeof raw !== "object") return null;
  const s = raw;
  if (typeof s.id !== "string" || typeof s.winnerName !== "string") return null;
  if (typeof s.startedAt !== "number" || typeof s.toDeg !== "number") return null;
  return { id: s.id, startedAt: s.startedAt, duration: typeof s.duration === "number" ? s.duration : SPIN_MS, fromDeg: typeof s.fromDeg === "number" ? s.fromDeg : 0, toDeg: s.toDeg, winnerIndex: typeof s.winnerIndex === "number" ? s.winnerIndex : 0, winnerId: typeof s.winnerId === "string" ? s.winnerId : "", winnerName: s.winnerName };
}
function ringPresent(row) {
  return { players: row ? asPlayers(row.players) : [], spin: row ? asSpin(row.spin) : null, serverNow: Date.now(), updatedAt: row?.updated_at ? new Date(row.updated_at).toISOString() : new Date(0).toISOString() };
}
async function ringRow(env) {
  await env.DB.prepare(`insert into ring_board (id, players, spin, rest_deg, updated_at) values (?, '[]', null, 0, ?) on conflict (id) do nothing`).bind(RING_ROW, nowIso()).run();
  return env.DB.prepare(`select players, spin, rest_deg, updated_at from ring_board where id = ? limit 1`).bind(RING_ROW).first();
}
const spinning = (spin) => !!spin && Date.now() < spin.startedAt + spin.duration;
async function hostOk(token) { if (!HOST_CODE) return false; const digits = token.replace(/\D/g, ""); if (digits === HOST_CODE) return true; return same(token, await hostToken()); }
async function addRing(env, data) {
  const token = str(data?.token, 0, 1e6); const name = str(data?.name, 1, 18, true);
  if (!(await hostOk(token))) return { ok: false, error: "host" };
  const row = await ringRow(env); const players = asPlayers(row?.players); const spin = asSpin(row?.spin);
  if (spinning(spin) || spin) return { ok: false, error: "sealed" };
  const clean = name.trim().slice(0, 18);
  if (!clean) return { ok: false, error: "host" };
  if (players.length >= RING_MAX) return { ok: false, error: "full" };
  if (players.some((p) => p.name.toLowerCase() === clean.toLowerCase())) return { ok: false, error: "taken" };
  const next = [...players, { id: `r-${randomHex(4)}`, name: clean }];
  await env.DB.prepare(`update ring_board set players = ?, updated_at = ? where id = ?`).bind(JSON.stringify(next), nowIso(), RING_ROW).run();
  return { ok: true, board: ringPresent({ players: next, spin: row?.spin ?? null, rest_deg: row?.rest_deg ?? 0, updated_at: nowIso() }) };
}
async function removeRing(env, data) {
  const token = str(data?.token, 0, 1e6); const id = str(data?.id, 1, 40);
  if (!(await hostOk(token))) return { ok: false, error: "host" };
  const row = await ringRow(env); const spin = asSpin(row?.spin);
  if (spinning(spin) || spin) return { ok: false, error: "sealed" };
  const players = asPlayers(row?.players).filter((p) => p.id !== id);
  await env.DB.prepare(`update ring_board set players = ?, updated_at = ? where id = ?`).bind(JSON.stringify(players), nowIso(), RING_ROW).run();
  return { ok: true, board: ringPresent({ players, spin: row?.spin ?? null, rest_deg: row?.rest_deg ?? 0, updated_at: nowIso() }) };
}
async function startRing(env, data) {
  const token = str(data?.token, 0, 1e6);
  if (!(await hostOk(token))) return { ok: false, error: "host" };
  const row = await ringRow(env); const players = asPlayers(row?.players); const spin = asSpin(row?.spin);
  if (players.length < 2) return { ok: false, error: "short" };
  if (spinning(spin)) return { ok: false, error: "spinning" };
  if (spin) return { ok: false, error: "sealed" };
  const winnerIndex = randomInt(0, players.length);
  const fromDeg = Number(row?.rest_deg ?? 0);
  const toDeg = Math.round(landingRotation(fromDeg, winnerIndex, players.length, 7, Math.random() * 2 - 1) * 10) / 10;
  const winner = players[winnerIndex];
  const next = { id: randomHex(6), startedAt: Date.now(), duration: SPIN_MS, fromDeg, toDeg, winnerIndex, winnerId: winner.id, winnerName: winner.name };
  await env.DB.prepare(`update ring_board set spin = ?, rest_deg = ?, updated_at = ? where id = ?`).bind(JSON.stringify(next), toDeg, nowIso(), RING_ROW).run();
  return { ok: true, board: ringPresent({ players, spin: next, rest_deg: toDeg, updated_at: nowIso() }) };
}
async function resetRing(env, data) {
  const token = str(data?.token, 0, 1e6);
  if (!(await hostOk(token))) return { ok: false, error: "host" };
  const row = await ringRow(env);
  if (spinning(asSpin(row?.spin))) return { ok: false, error: "spinning" };
  await env.DB.prepare(`update ring_board set players = '[]', spin = null, updated_at = ? where id = ?`).bind(nowIso(), RING_ROW).run();
  return { ok: true, board: ringPresent({ players: [], spin: null, rest_deg: row?.rest_deg ?? 0, updated_at: nowIso() }) };
}

// ---------------------------------------------------------------- live data layer (src/lib/mlbb/live.ts + rank.ts)
const memCache = new Map();
async function cacheGet(env, key) {
  const m = memCache.get(key); if (m) return m;
  const row = await env.DB.prepare(`select at, body from live_cache where key = ?`).bind(key).first();
  if (!row) return null;
  const v = { at: row.at, data: fromCrossJSON(JSON.parse(row.body), { refs: new Map() }) };
  memCache.set(key, v); return v;
}
async function cachePut(env, key, at, data) {
  memCache.set(key, { at, data });
  await env.DB.prepare(`insert into live_cache (key, at, body) values (?, ?, ?) on conflict (key) do update set at = excluded.at, body = excluded.body`).bind(key, at, JSON.stringify(toCrossJSON(data, { refs: new Map() }))).run();
}
async function snapshot(env, reqUrl, id, arg) {
  const path = `/_serverFn/${id}${arg ? `__${arg}` : ""}.json`;
  const res = await env.ASSETS.fetch(new URL(path, reqUrl).toString());
  if (!res.ok) throw new Error(`no snapshot ${path}`);
  const v = fromCrossJSON(await res.json(), { refs: new Map() });
  return v.result;
}
async function cached(env, ctx, key, ttl, build, fallback) {
  const hit = await cacheGet(env, key);
  if (hit && Date.now() - hit.at < ttl) return hit.data;
  try {
    const data = await build();
    ctx.waitUntil(cachePut(env, key, Date.now(), data).catch(() => {}));
    return data;
  } catch (e) {
    if (hit) return hit.data;
    return fallback();
  }
}
async function fetchJson(url, init = {}) {
  const res = await fetch(url, { ...init, headers: { "User-Agent": UA, accept: "application/json", ...(init.headers || {}) }, signal: AbortSignal.timeout(9000) });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

// Fandom (MediaWiki API) image info: same call the original's wikiFiles() makes.
async function wikiFiles(titles) {
  const out = {};
  for (let i = 0; i < titles.length; i += 50) {
    const chunk = titles.slice(i, i + 50);
    const data = await fetchJson("https://mobile-legends.fandom.com/api.php?" + new URLSearchParams({ action: "query", titles: chunk.join("|"), prop: "imageinfo", iiprop: "url", format: "json" }).toString());
    const norm = {}; for (const n of data.query?.normalized ?? []) norm[n.to] = n.from;
    for (const page of Object.values(data.query?.pages ?? {})) {
      const url = page.imageinfo?.[0]?.url;
      if (!url || page.missing !== undefined || !page.title) continue;
      out[norm[page.title] ?? page.title] = url;
    }
  }
  return out;
}
function wikiTitleOf(url) {
  const m = /^https:\/\/static\.wikia\.nocookie\.net\/mobile-legends\/images\/[0-9a-f]\/[0-9a-f]{2}\/([^/?]+)\/revision\/latest/.exec(url);
  return m ? `File:${decodeURIComponent(m[1]).replace(/_/g, " ")}` : null;
}
function withRevision(orig, fresh) {
  const [freshPath, freshQuery] = fresh.split("?");
  const after = orig.split("/revision/latest")[1] ?? "";
  const extraPath = after.split("?")[0];
  return freshPath + extraPath + (freshQuery ? `?${freshQuery}` : "");
}
async function buildCatalog(env, reqUrl, loc) {
  const snap = await snapshot(env, reqUrl, ID.fetchLiveCatalog, loc);
  const out = clone(snap);
  const maps = ["portraits", "itemIcons", "emblemIcons", "talentIcons", "spellIcons"];
  const titles = new Set();
  for (const m of maps) for (const u of Object.values(out[m] ?? {})) { const t = wikiTitleOf(u); if (t) titles.add(t); }
  const files = await wikiFiles([...titles]);
  if (!Object.keys(files).length) throw new Error("wiki empty");
  for (const m of maps) for (const [k, u] of Object.entries(out[m] ?? {})) { const t = wikiTitleOf(u); if (t && files[t]) out[m][k] = withRevision(u, files[t]); }
  out.fetchedAt = nowIso();
  return out;
}
async function wikiInfo(titles) {
  const out = {};
  for (let i = 0; i < titles.length; i += 50) {
    const chunk = titles.slice(i, i + 50);
    const data = await fetchJson("https://mobile-legends.fandom.com/api.php?" + new URLSearchParams({ action: "query", titles: chunk.join("|"), prop: "imageinfo", iiprop: "url|size", format: "json" }).toString());
    const norm = {}; for (const n of data.query?.normalized ?? []) norm[n.to] = n.from;
    for (const page of Object.values(data.query?.pages ?? {})) {
      const ii = page.imageinfo?.[0];
      if (!ii || page.missing !== undefined || !page.title) continue;
      if (!/^https:\/\/static\.wikia\.nocookie\.net\//i.test(ii.url || "")) continue;
      out[norm[page.title] ?? page.title] = { width: ii.width || 0, height: ii.height || 0 };
    }
  }
  return out;
}
// fetchLiveAtelier: hand-picked skins + wiki-only upcoming skins, each checked against the wiki (Upcoming content,
// StarLight schedule, Module:Skin/data); released skins drop out. Throws (-> filtered snapshot) if the wiki is down.
async function buildAtelierLive(env, reqUrl, loc) {
  const snap = await snapshot(env, reqUrl, ID.fetchLiveAtelier, loc);
  const curated = snap.skins.filter((s) => !isAuto(s));
  const ev = await sweepWiki({ fetchJson });
  if (!ev.reached) throw new Error("wiki upcoming content unreachable");
  const { skins } = await buildAtelier(curated, ev, { findHero, wikiInfo });
  if (!skins.length) throw new Error("wiki sweep empty");
  return { ...snap, fetchedAt: nowIso(), skins };
}
// cached rows / fallback snapshot still pass the date rules (and the snapshot drops skins verified as released)
const atelierFinal = (data, fallback) => ({ ...data, skins: filterOffline(data.skins ?? [], Date.now(), { dropAuto: fallback }), events: (data.events ?? []).filter((e) => !e.endDate || e.endDate >= nowIso().slice(0, 10)) });
async function restamp(env, reqUrl, id, loc) { const snap = await snapshot(env, reqUrl, id, loc); return { ...snap, fetchedAt: nowIso() }; }

// fetchLiveHero: Moonton official hero guide (mapi.mobilelegends.com/hero/detail)
const GEAR_ALIASES = { "bloodlust axe": "war-axe", "necklace of durance": "glowing-wand", "calamity reaper": "starlium-scythe", "twilight armor": "chastise-pauldron", "winter truncheon": "winter-crown" };
const normName = (s) => s.toLowerCase().replace(/['’]/g, "").replace(/\./g, "");
const GEAR_LIST = ITEMS.filter((i) => i.tier !== 1 && !["boots", "encourage", "conceal", "favor", "dire-hit"].includes(i.id)).map((i) => ({ id: i.id, n: normName(i.name) })).sort((a, b) => b.n.length - a.n.length);
function mapEquipName(name) {
  if (GEAR_NAMES[name]) return GEAR_NAMES[name];
  const n = normName(name);
  if (GEAR_ALIASES[n]) return GEAR_ALIASES[n];
  const hit = GEAR_LIST.find((i) => n === i.n) || GEAR_LIST.find((i) => n.includes(i.n));
  return hit ? hit.id : name.toLowerCase().replace(/\s+/g, "-");
}
async function buildHero(heroId) {
  const official = OFFICIAL_IDS[heroId];
  if (!official) throw new Error("unknown hero");
  const raw = await fetchJson(`https://mapi.mobilelegends.com/hero/detail?id=${official}`);
  const d = raw?.data;
  if (!d || !d.name) throw new Error("mapi empty");
  return {
    heroId, officialName: d.name, cover: d.cover_picture, gallery: d.gallery_picture,
    skills: (d.skill?.skill ?? []).filter((s) => s.name || s.des || s.tips).map((s) => ({ name: s.name, icon: s.icon, des: (s.des || "").replace(/<[^>]+>/g, ""), tips: s.tips })),
    gear: (d.gear?.out_pack ?? []).map((g) => ({ id: mapEquipName(g.equip?.name ?? ""), name: g.equip?.name, icon: g.equip?.icon, des: (g.equip?.des ?? []).join(" ") })),
    source: "Moonton Hero Guide (mapi.mobilelegends.com)",
  };
}

// fetchLiveRank: Moonton GMS rank API (logic shipped in the original bundle, index-*.js Lh/Rh/Vh)
const RANK_APP = "2669606", RANK_ACT = "2669607", RANK_SOURCE = "2756570";
async function rankBoardRaw() {
  const sign = (await fetchJson(`https://api.gms.moontontech.com/api/act/basev4?_t=${Date.now()}`, { headers: { "x-appid": RANK_APP, "x-actid": RANK_ACT, referer: "https://www.mobilelegends.com/" } })).data?.server?.enigma;
  if (!sign) throw new Error("rank sign unavailable");
  const body = JSON.stringify({ pageSize: 200, pageIndex: 1, filters: [{ field: "bigrank", operator: "eq", value: "101" }, { field: "match_type", operator: "eq", value: 0 }], sorts: [{ data: { field: "main_hero_ban_rate", order: "desc" }, type: "sequence" }], fields: ["main_hero", "main_hero_appearance_rate", "main_hero_ban_rate", "main_hero_win_rate", "main_heroid", "data.sub_hero.heroid", "data.sub_hero.increase_win_rate"] });
  const path = `/api/gms/source/${RANK_APP}/${RANK_SOURCE}`;
  const sig = btoa(String.fromCharCode(...(await hmacHex("SHA-1", sign, ["POST", path, "", body].join("\n")))));
  const o = await fetchJson(`https://api.gms.moontontech.com${path}`, { method: "POST", headers: { "content-type": "application/json;charset=UTF-8", "x-appid": RANK_APP, "x-actid": RANK_ACT, "x-lang": "en", referer: "https://www.mobilelegends.com/", origin: "https://www.mobilelegends.com", authorization: sig }, body });
  if (o.code !== 0 || !o.data?.records?.length) throw new Error("rank board empty");
  const heroes = [];
  for (const rec of o.data.records) {
    const t = rec.data ?? {}; const n = t.main_hero?.data?.name;
    if (!n || typeof t.main_heroid !== "number") continue;
    const subs = Array.isArray(t.sub_hero) ? t.sub_hero : [];
    heroes.push({ name: n, officialId: t.main_heroid, win: Number(t.main_hero_win_rate) || 0, pick: Number(t.main_hero_appearance_rate) || 0, ban: Number(t.main_hero_ban_rate) || 0, counters: subs.slice(0, 5).map((s) => ({ officialId: Number(s.heroid) || 0, lift: Number(s.increase_win_rate) || 0 })) });
  }
  return { fetchedAt: nowIso(), days: 30, rank: "all", heroes };
}
function normalizeRank(t, live) { // rank-*.js export n
  const map = new Map();
  for (const h of t.heroes) { const f = findHero(h.name); if (f) map.set(h.officialId, { id: f.id, name: f.name }); }
  const heroes = [];
  for (const e of t.heroes) {
    const f = map.get(e.officialId); if (!f) continue;
    if (e.pick < 2e-4 && e.win > 0.95) continue;
    heroes.push({ id: f.id, name: f.name, officialId: e.officialId, winRate: e.win, pickRate: e.pick, banRate: e.ban,
      counters: e.counters.map((c) => { const x = map.get(c.officialId); return !x || c.lift < 0.01 ? null : { id: x.id, name: x.name, lift: c.lift }; }).filter((c) => c != null).slice(0, 5) });
  }
  return { fetchedAt: t.fetchedAt, days: 30, rank: "all", source: "https://www.mobilelegends.com/rank", live, heroes };
}
async function refreshRank(env) {
  try {
    const data = normalizeRank(await rankBoardRaw(), true);
    if (data.heroes.length < 40) throw new Error("rank board short");
    await cachePut(env, "rank", Date.now(), data);
    return data;
  } catch (e) {
    const hit = await cacheGet(env, "rank");
    if (hit) await cachePut(env, "rank", Date.now() - RANK_TTL + RANK_RETRY, hit.data);
    throw e;
  }
}
async function loadRank(env, ctx, reqUrl) {
  const hit = await cacheGet(env, "rank");
  if (hit && Date.now() - hit.at < RANK_TTL) return hit.data;
  if (hit) { ctx.waitUntil(refreshRank(env).catch(() => {})); return hit.data; }
  try { return await refreshRank(env); }
  catch {
    const snap = await snapshot(env, reqUrl, ID.fetchLiveRank, "");
    ctx.waitUntil(cachePut(env, "rank", Date.now() - RANK_TTL + RANK_RETRY, snap).catch(() => {}));
    return snap;
  }
}
async function bustLive(env) { memCache.clear(); await env.DB.prepare(`delete from live_cache`).run(); }

// ---------------------------------------------------------------- dispatch
function liveHandlers(env, ctx, reqUrl) {
  const patches = (loc) => cached(env, ctx, `patches:${loc}`, TTL, () => restamp(env, reqUrl, ID.fetchLivePatches, loc), () => snapshot(env, reqUrl, ID.fetchLivePatches, loc));
  return {
    [ID.fetchLivePatches]: (d) => patches(locale(d)),
    [ID.fetchLiveCatalog]: (d) => { const loc = locale(d); return cached(env, ctx, `catalog:${loc}`, TTL, () => buildCatalog(env, reqUrl, loc), () => restamp(env, reqUrl, ID.fetchLiveCatalog, loc)); },
    [ID.fetchLiveTier]: (d) => { const loc = locale(d); return cached(env, ctx, `tier:${loc}`, TTL, () => restamp(env, reqUrl, ID.fetchLiveTier, loc), () => snapshot(env, reqUrl, ID.fetchLiveTier, loc)); },
    [ID.fetchLiveAtelier]: async (d) => { const loc = locale(d); let fb = false; const r = await cached(env, ctx, `atelier:${loc}`, TTL, () => buildAtelierLive(env, reqUrl, loc), () => { fb = true; return restamp(env, reqUrl, ID.fetchLiveAtelier, loc); }); return atelierFinal(r, fb); },
    [ID.fetchLiveHero]: (d) => { const heroId = str(d?.heroId, 1, 64); return cached(env, ctx, `hero:${heroId}`, TTL, () => buildHero(heroId), () => snapshot(env, reqUrl, ID.fetchLiveHero, heroId)); },
    [ID.fetchLiveRank]: () => loadRank(env, ctx, reqUrl),
    [ID.refreshLive]: async (d) => { const loc = locale(d); await bustLive(env); return patches(loc); },
  };
}
function stateHandlers(env, req) {
  return {
    [ID.pingTraffic]: (d) => pingTraffic(env, d, req),
    [ID.fetchTraffic]: () => readStats(env),
    [ID.fetchCup]: () => loadCup(env),
    [ID.joinCup]: (d) => joinCup(env, d),
    [ID.leaveCup]: (d) => leaveCup(env, d),
    [ID.unlockCup]: (d) => unlockCup(env, d),
    [ID.drawCup]: (d) => drawCup(env, d),
    [ID.pickCup]: (d) => pickCup(env, d),
    [ID.fetchRing]: () => loadRing(env),
    [ID.addRing]: (d) => addRing(env, d),
    [ID.removeRing]: (d) => removeRing(env, d),
    [ID.startRing]: (d) => startRing(env, d),
    [ID.resetRing]: (d) => resetRing(env, d),
  };
}
async function loadRing(env) { return ringPresent(await ringRow(env)); }
const GET_IDS = new Set([ID.fetchLivePatches, ID.fetchLiveHero, ID.fetchLiveCatalog, ID.fetchLiveAtelier, ID.fetchLiveTier, ID.fetchLiveRank, ID.fetchTraffic, ID.fetchCup, ID.fetchRing]);
const ARG_KEY = { [ID.fetchLivePatches]: "locale", [ID.fetchLiveCatalog]: "locale", [ID.fetchLiveAtelier]: "locale", [ID.fetchLiveTier]: "locale", [ID.fetchLiveHero]: "heroId" };
const CACHEABLE = new Set([ID.fetchLivePatches, ID.fetchLiveHero, ID.fetchLiveCatalog, ID.fetchLiveAtelier, ID.fetchLiveTier, ID.fetchLiveRank]);

function cors(req) {
  const origin = req.headers.get("origin");
  const h = { "vary": "Origin" };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    h["access-control-allow-origin"] = origin;
    h["access-control-expose-headers"] = "x-tss-serialized";
  }
  return h;
}
function serialized(value, status, req, cacheable) {
  return new Response(JSON.stringify(toCrossJSON(value, { refs: new Map() })), {
    status,
    headers: { "content-type": "application/json", "x-tss-serialized": "true", "cache-control": cacheable ? "public, max-age=60" : "no-store", ...cors(req) },
  });
}
function ghAtelier(result) { // GitHub Pages copy lives under /clan-jedi/ and has no /api route
  const fix = (s) => (typeof s !== "string" ? s : s.startsWith("/atelier/") ? `/clan-jedi${s}` : s.startsWith("/api/atelier-art") ? `//clan-jedi.pages.dev${s}` : s);
  const out = clone(result);
  for (const sk of out.skins ?? []) for (const a of sk.angles ?? []) a.src = fix(a.src);
  return out;
}

// TanStack Start client sends {"t": <cross-JSON node>, "f": <feature flags>, "m": [<plugins>]}
function decodePayload(obj) {
  if (obj && typeof obj === "object" && obj.t && typeof obj.t === "object" && typeof obj.f === "number") return fromCrossJSON(obj.t, { refs: new Map() });
  return fromCrossJSON(obj, { refs: new Map() });
}
async function handleServerFn(req, env, ctx, url) {
  const rest = url.pathname.slice("/_serverFn/".length);
  const m = /^([0-9a-f]{64})(?:__(.+?))?(\.json)?$/.exec(decodeURIComponent(rest));
  if (!m) return env.ASSETS.fetch(req);
  const [, id, fileArg] = m;
  await ensureSchema(env);
  const handlers = { ...liveHandlers(env, ctx, url), ...stateHandlers(env, req) };
  const fn = handlers[id];
  if (!fn) return env.ASSETS.fetch(req);
  let data;
  try {
    if (req.method === "POST") {
      if (GET_IDS.has(id)) throw new BadInput("method");
      const text = await req.text();
      data = text ? decodePayload(JSON.parse(text))?.data : undefined;
    } else {
      if (!GET_IDS.has(id)) throw new BadInput("method");
      const payload = url.searchParams.get("payload");
      if (payload) data = decodePayload(JSON.parse(payload))?.data;
      else if (fileArg && ARG_KEY[id]) data = { [ARG_KEY[id]]: fileArg };
    }
    let result = await fn(data);
    if (id === ID.fetchLiveAtelier && req.headers.get("origin") === GH_ORIGIN) result = ghAtelier(result);
    return serialized({ result, error: undefined, context: Object.create(null) }, 200, req, CACHEABLE.has(id));
  } catch (e) {
    const err = new Error(e instanceof BadInput ? `Invalid input: ${e.message}` : "Server function failed");
    return serialized(err, e instanceof BadInput ? 400 : 500, req, false);
  }
}

// /api/atelier-art (src/routes/api/atelier-art.ts)
const FILE_OK = /^[\w .()\-'&×!]+\.(jpg|jpeg|png|webp)$/i;
async function atelierArt(req) {
  const q = new URL(req.url).searchParams;
  const model = q.get("model")?.replace(/^File:/i, "").trim(); // full-size skin art uploaded as "<name>-portrait.<ext>"
  const file = model ? model.replace(/(\.\w+)$/, "-portrait$1") : q.get("file")?.replace(/^File:/i, "").trim() ?? "";
  if (!FILE_OK.test(file)) return new Response("bad file", { status: 400 });
  try {
    const data = await fetchJson("https://mobile-legends.fandom.com/api.php?" + new URLSearchParams({ action: "query", titles: `File:${file}`, prop: "imageinfo", iiprop: "url", format: "json" }).toString());
    let remote = null;
    for (const page of Object.values(data.query?.pages ?? {})) { if (page.missing !== undefined) continue; const raw = page.imageinfo?.[0]?.url; if (raw) { remote = raw; break; } }
    if (!remote || !/^https:\/\/static\.wikia\.nocookie\.net\//i.test(remote)) return new Response("not found", { status: 404 });
    const img = await fetch(remote, { headers: { "User-Agent": UA } });
    if (!img.ok) return new Response("upstream", { status: 502 });
    return new Response(await img.arrayBuffer(), { headers: { "Content-Type": img.headers.get("content-type") || "image/jpeg", "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800", "access-control-allow-origin": "*" } });
  } catch { return new Response("error", { status: 502 }); }
}

export default {
  async fetch(req, env, ctx) {
    HOST_CODE = typeof env.HOST_CODE === "string" ? env.HOST_CODE.trim() : "";
    const url = new URL(req.url);
    if (url.pathname.startsWith("/_serverFn/") || url.pathname.startsWith("/api/")) {
      if (req.method === "OPTIONS") {
        const origin = req.headers.get("origin");
        if (!origin || !ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });
        return new Response(null, { status: 204, headers: { ...cors(req), "access-control-allow-methods": "GET, POST, OPTIONS", "access-control-allow-headers": req.headers.get("access-control-request-headers") || "content-type, x-tsr-serverfn, accept", "access-control-max-age": "86400" } });
      }
      if (url.pathname.startsWith("/_serverFn/")) return handleServerFn(req, env, ctx, url);
      if (url.pathname === "/api/atelier-art" && req.method === "GET") return atelierArt(req);
      return new Response("Not found", { status: 404 });
    }
    return env.ASSETS.fetch(req);
  },
};
