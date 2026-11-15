import assert from "node:assert/strict";
import {
  parseRankFilter, cacheKey, isDefaultFilter, normalizeRank, parseRecords,
  loadRankBoard, DEFAULT_DAYS, DEFAULT_RANK,
} from "../src/rank.js";

let fails = 0;
function ok(name, fn) {
  try { fn(); console.log("ok", name); }
  catch (e) { fails++; console.error("FAIL", name, e.message); }
}
async function okA(name, fn) {
  try { await fn(); console.log("ok", name); }
  catch (e) { fails++; console.error("FAIL", name, e.message); }
}

ok("default when missing", () => {
  assert.deepEqual(parseRankFilter(undefined, undefined), { days: 30, rank: "all" });
  assert.equal(isDefaultFilter(30, "all"), true);
  assert.equal(cacheKey(30, "all"), "rank");
});
ok("accepts string days and honor alias", () => {
  assert.deepEqual(parseRankFilter("7", "Mythical Honor"), { days: 7, rank: "honor" });
  assert.equal(cacheKey(7, "honor"), "rank:7:honor");
  assert.equal(isDefaultFilter(7, "honor"), false);
});
ok("invalid values fall back to default", () => {
  assert.deepEqual(parseRankFilter("99", "diamond"), { days: 30, rank: "all" });
  assert.deepEqual(parseRankFilter(15, "GLORY"), { days: 15, rank: "glory" });
});
ok("every window and bracket has its own cache key", () => {
  const keys = new Set();
  for (const d of [1, 3, 7, 15, 30]) for (const r of ["all", "epic", "legend", "mythic", "honor", "glory"]) keys.add(cacheKey(d, r));
  assert.equal(keys.size, 30);
  assert.ok(keys.has("rank"));
});

const heroes = [
  { name: "Miya", officialId: 1, win: 0.51, pick: 0.04, ban: 0.1, counters: [{ officialId: 2, lift: 0.02 }] },
  { name: "Unknown", officialId: 999, win: 0.5, pick: 0.01, ban: 0.01, counters: [] },
  { name: "Balmond", officialId: 2, win: 0.99, pick: 0.0001, ban: 0, counters: [] },
];
const findHero = (n) => ({ Miya: { id: "miya", name: "Miya" }, Balmond: { id: "balmond", name: "Balmond" } })[n];
ok("normalize maps ids, drops rare 99% win, keeps days/rank", () => {
  const b = normalizeRank({ fetchedAt: "t", days: 7, rank: "mythic", heroes }, true, findHero);
  assert.equal(b.days, 7);
  assert.equal(b.rank, "mythic");
  assert.equal(b.live, true);
  assert.equal(b.heroes.length, 1);
  assert.equal(b.heroes[0].id, "miya");
  assert.equal(b.heroes[0].counters[0].id, "balmond");
  assert.equal(b.source, "https://www.mobilelegends.com/rank");
});
ok("parseRecords requires code 0 and records", () => {
  assert.throws(() => parseRecords({ code: 1, data: { records: [{}] } }));
  const rows = parseRecords({
    code: 0,
    data: { records: [{ data: { main_hero: { data: { name: "Miya" } }, main_heroid: 1, main_hero_win_rate: 0.5, main_hero_appearance_rate: 0.1, main_hero_ban_rate: 0.2, sub_hero: [{ heroid: 2, increase_win_rate: 0.03 }] } }] },
  });
  assert.equal(rows[0].name, "Miya");
  assert.equal(rows[0].counters[0].officialId, 2);
});

const sampleBoard = (days, rank, via, n = 50) => ({
  fetchedAt: "now", days, rank, source: "https://www.mobilelegends.com/rank", live: true, via,
  heroes: Array.from({ length: n }, (_, i) => ({ id: "h" + i, name: "H" + i, officialId: i, winRate: 0.5, pickRate: 0.1, banRate: 0.1, counters: [] })),
});

await okA("serves cached board within 24h and does not refresh", async () => {
  let refreshed = false;
  const board = sampleBoard(30, "all", "official");
  const deps = {
    env: {}, ctx: { waitUntil() { refreshed = true; } }, reqUrl: "https://x/",
    cacheGet: async () => ({ at: Date.now() - 1000, data: board }),
    cachePut: async () => {}, snapshot: async () => { throw new Error("snap"); },
    findHero, fetchJson: async () => { throw new Error("net"); },
    hmacHex: async () => new Uint8Array(20), nowIso: () => "t",
    ID: { fetchLiveRank: "id" }, RANK_TTL: 864e5, RANK_RETRY: 18e5,
  };
  const out = await loadRankBoard(deps, undefined);
  assert.equal(out.via, "official");
  assert.equal(out.days, 30);
  assert.equal(refreshed, false);
});

await okA("stale cache is returned immediately and a refresh is scheduled", async () => {
  let scheduled = false;
  const board = sampleBoard(7, "mythic", "official");
  const deps = {
    env: {}, ctx: { waitUntil(p) { scheduled = true; p.catch(() => {}); } }, reqUrl: "https://x/",
    cacheGet: async () => ({ at: Date.now() - 864e5 - 1, data: board }),
    cachePut: async () => {}, snapshot: async () => { throw new Error("snap"); },
    findHero, fetchJson: async () => { throw new Error("net"); },
    hmacHex: async () => new Uint8Array(20), nowIso: () => "t",
    ID: { fetchLiveRank: "id" }, RANK_TTL: 864e5, RANK_RETRY: 18e5,
  };
  const out = await loadRankBoard(deps, { days: 7, rank: "mythic" });
  assert.equal(out.rank, "mythic");
  assert.equal(scheduled, true);
});

await okA("official failure falls back to Rone, then caches under the combo key", async () => {
  const puts = [];
  let officialCalls = 0;
  const record = (name, id, ban) => ({ data: { main_hero: { data: { name } }, main_heroid: id, main_hero_win_rate: 0.5, main_hero_appearance_rate: 0.1, main_hero_ban_rate: ban, sub_hero: [] } });
  const records = Array.from({ length: 50 }, (_, i) => record("Miya", 1, 0.2 + i / 1000));
  // unique officialIds so normalize keeps 50 heroes... actually all named Miya map to same officialId 1, only 1 hero kept.
  // Need unique names and ids. findHero only knows Miya/Balmond. So heroes.length would be 1, then "rank board short".
  // Use a findHero that accepts H${i}.
  const find = (n) => ({ id: n.toLowerCase(), name: n });
  const recs = Array.from({ length: 50 }, (_, i) => record("Hero" + i, i + 1, 0.2));
  const deps = {
    env: {}, ctx: { waitUntil() {} }, reqUrl: "https://x/",
    cacheGet: async () => null,
    cachePut: async (env, key, at, data) => { puts.push({ key, via: data.via, days: data.days, rank: data.rank, n: data.heroes.length }); },
    snapshot: async () => { throw new Error("snap"); },
    findHero: find, nowIso: () => "t",
    hmacHex: async () => new Uint8Array(20),
    ID: { fetchLiveRank: "id" }, RANK_TTL: 864e5, RANK_RETRY: 18e5,
    fetchJson: async (url) => {
      if (String(url).includes("moontontech.com") || String(url).includes("basev4")) {
        officialCalls++;
        throw new Error("official down");
      }
      if (String(url).includes("arena.rone.dev")) {
        return { code: 0, data: { records: recs } };
      }
      throw new Error("other");
    },
  };
  const out = await loadRankBoard(deps, { days: 7, rank: "mythic" });
  assert.equal(out.via, "rone");
  assert.equal(out.days, 7);
  assert.equal(out.rank, "mythic");
  assert.ok(out.heroes.length >= 40);
  assert.equal(puts[0].key, "rank:7:mythic");
  assert.ok(officialCalls >= 1);
});

await okA("both upstreams failing return the snapshot and do not cache it under a combo key", async () => {
  const puts = [];
  const snap = { fetchedAt: "old", days: 30, rank: "all", source: "https://www.mobilelegends.com/rank", live: false, heroes: [1] };
  const deps = {
    env: {}, ctx: { waitUntil(p) { return p; } }, reqUrl: "https://x/",
    cacheGet: async () => null,
    cachePut: async (env, key) => { puts.push(key); },
    snapshot: async () => snap,
    findHero, fetchJson: async () => { throw new Error("down"); },
    hmacHex: async () => new Uint8Array(20), nowIso: () => "t",
    ID: { fetchLiveRank: "id" }, RANK_TTL: 864e5, RANK_RETRY: 18e5,
  };
  const out = await loadRankBoard(deps, { days: 1, rank: "glory" });
  assert.equal(out.via, "snapshot");
  assert.equal(out.days, 30);
  assert.deepEqual(puts, []);
});

await okA("default combo still caches the snapshot under key rank", async () => {
  const puts = [];
  const snap = { fetchedAt: "old", days: 30, rank: "all", live: false, heroes: [] };
  const deps = {
    env: {}, ctx: { waitUntil(p) { return p; } }, reqUrl: "https://x/",
    cacheGet: async () => null,
    cachePut: async (env, key) => { puts.push(key); },
    snapshot: async () => snap,
    findHero, fetchJson: async () => { throw new Error("down"); },
    hmacHex: async () => new Uint8Array(20), nowIso: () => "t",
    ID: { fetchLiveRank: "id" }, RANK_TTL: 864e5, RANK_RETRY: 18e5,
  };
  const out = await loadRankBoard(deps, undefined);
  assert.equal(out.via, "snapshot");
  assert.deepEqual(puts, ["rank"]);
});

if (fails) { console.error(fails, "failed"); process.exit(1); }
console.log("all rank unit tests passed");
