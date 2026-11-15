// Rank boards by day window and bracket.
// Official source: Moonton GMS (same endpoints as the original 30-day / all-ranks call).
// Fallback: Rone Arena API, then the bundled 30-day all-ranks snapshot.
export const RANK_DAYS = [1, 3, 7, 15, 30];
export const RANK_BRACKETS = ["all", "epic", "legend", "mythic", "honor", "glory"];
export const DEFAULT_DAYS = 30;
export const DEFAULT_RANK = "all";
export const RANK_SOURCE = "https://www.mobilelegends.com/rank";

const RANK_APP = "2669606";
const RANK_ACT = "2669607";
// Official source IDs behind mobilelegends.com/rank (hero_predict_1/3/7/15/30).
const SOURCES = { 1: "2756567", 3: "2756568", 7: "2756569", 15: "2756565", 30: "2756570" };
const BIGRANK = { glory: "9", honor: "8", mythic: "7", legend: "6", epic: "5", all: "101" };
const RONE_HOSTS = ["https://arena.rone.dev", "https://arena.fastapicloud.dev"];
const ALIASES = {
  "mythical honor": "honor", mythical_honor: "honor", "mythical-honor": "honor",
  "mythical glory": "glory", mythical_glory: "glory", "mythical-glory": "glory",
};

export function parseRankFilter(days, rank) {
  const d = Number(days);
  const daysOut = RANK_DAYS.includes(d) ? d : DEFAULT_DAYS;
  const raw = String(rank ?? DEFAULT_RANK).trim().toLowerCase();
  const mapped = ALIASES[raw] || raw;
  const rankOut = RANK_BRACKETS.includes(mapped) ? mapped : DEFAULT_RANK;
  return { days: daysOut, rank: rankOut };
}

export function isDefaultFilter(days, rank) {
  return days === DEFAULT_DAYS && rank === DEFAULT_RANK;
}

// Keep the existing D1 key for the default board so today's cache and behaviour stay the same.
export function cacheKey(days, rank) {
  return isDefaultFilter(days, rank) ? "rank" : `rank:${days}:${rank}`;
}

export function parseRecords(o) {
  if (o?.code !== 0 || !o.data?.records?.length) throw new Error("rank board empty");
  const heroes = [];
  for (const rec of o.data.records) {
    const t = rec.data ?? {};
    const n = t.main_hero?.data?.name;
    if (!n || typeof t.main_heroid !== "number") continue;
    const subs = Array.isArray(t.sub_hero) ? t.sub_hero : [];
    heroes.push({
      name: n,
      officialId: t.main_heroid,
      win: Number(t.main_hero_win_rate) || 0,
      pick: Number(t.main_hero_appearance_rate) || 0,
      ban: Number(t.main_hero_ban_rate) || 0,
      counters: subs.slice(0, 5).map((s) => ({ officialId: Number(s.heroid) || 0, lift: Number(s.increase_win_rate) || 0 })),
    });
  }
  return heroes;
}

export function normalizeRank(t, live, findHero) {
  const map = new Map();
  for (const h of t.heroes) {
    const f = findHero(h.name);
    if (f) map.set(h.officialId, { id: f.id, name: f.name });
  }
  const heroes = [];
  for (const e of t.heroes) {
    const f = map.get(e.officialId);
    if (!f) continue;
    if (e.pick < 2e-4 && e.win > 0.95) continue;
    heroes.push({
      id: f.id, name: f.name, officialId: e.officialId,
      winRate: e.win, pickRate: e.pick, banRate: e.ban,
      counters: e.counters.map((c) => {
        const x = map.get(c.officialId);
        return !x || c.lift < 0.01 ? null : { id: x.id, name: x.name, lift: c.lift };
      }).filter((c) => c != null).slice(0, 5),
    });
  }
  return {
    fetchedAt: t.fetchedAt,
    days: t.days,
    rank: t.rank,
    source: RANK_SOURCE,
    live,
    heroes,
  };
}

function officialBody(bigrank) {
  return JSON.stringify({
    pageSize: 200,
    pageIndex: 1,
    filters: [
      { field: "bigrank", operator: "eq", value: bigrank },
      { field: "match_type", operator: "eq", value: 0 },
    ],
    sorts: [{ data: { field: "main_hero_ban_rate", order: "desc" }, type: "sequence" }],
    fields: ["main_hero", "main_hero_appearance_rate", "main_hero_ban_rate", "main_hero_win_rate", "main_heroid", "data.sub_hero.heroid", "data.sub_hero.increase_win_rate"],
  });
}

export async function fetchOfficial(days, rank, { fetchJson, hmacHex, nowIso }) {
  const source = SOURCES[days];
  const bigrank = BIGRANK[rank];
  if (!source || !bigrank) throw new Error("bad rank filter");
  const sign = (await fetchJson(`https://api.gms.moontontech.com/api/act/basev4?_t=${Date.now()}`, {
    headers: { "x-appid": RANK_APP, "x-actid": RANK_ACT, referer: "https://www.mobilelegends.com/" },
  })).data?.server?.enigma;
  if (!sign) throw new Error("rank sign unavailable");
  const body = officialBody(bigrank);
  const path = `/api/gms/source/${RANK_APP}/${source}`;
  const sig = btoa(String.fromCharCode(...(await hmacHex("SHA-1", sign, ["POST", path, "", body].join("\n")))));
  const o = await fetchJson(`https://api.gms.moontontech.com${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "x-appid": RANK_APP, "x-actid": RANK_ACT, "x-lang": "en",
      referer: "https://www.mobilelegends.com/", origin: "https://www.mobilelegends.com",
      authorization: sig,
    },
    body,
  });
  return { fetchedAt: nowIso(), days, rank, heroes: parseRecords(o) };
}

export async function fetchRone(days, rank, { fetchJson, nowIso }) {
  let last;
  for (const host of RONE_HOSTS) {
    try {
      const o = await fetchJson(`${host}/api/heroes/rank?days=${days}&rank=${rank}&sort_field=ban_rate&sort_order=desc&size=200&index=1&lang=en`);
      return { fetchedAt: nowIso(), days, rank, heroes: parseRecords(o) };
    } catch (e) { last = e; }
  }
  throw last || new Error("rone unavailable");
}

export async function pullRank(days, rank, deps) {
  try {
    return { raw: await fetchOfficial(days, rank, deps), via: "official" };
  } catch {
    return { raw: await fetchRone(days, rank, deps), via: "rone" };
  }
}

async function refreshRank(deps, days, rank) {
  const { env, cacheGet, cachePut, findHero, RANK_TTL, RANK_RETRY } = deps;
  const key = cacheKey(days, rank);
  try {
    const { raw, via } = await pullRank(days, rank, deps);
    const data = { ...normalizeRank(raw, true, findHero), via };
    if (data.heroes.length < 40) throw new Error("rank board short");
    await cachePut(env, key, Date.now(), data);
    return data;
  } catch (e) {
    const hit = await cacheGet(env, key);
    if (hit) await cachePut(env, key, Date.now() - RANK_TTL + RANK_RETRY, hit.data);
    throw e;
  }
}

export async function loadRankBoard(deps, data) {
  const { days, rank } = parseRankFilter(data?.days, data?.rank);
  const key = cacheKey(days, rank);
  const { env, ctx, reqUrl, cacheGet, cachePut, snapshot, RANK_TTL, RANK_RETRY, ID } = deps;
  const hit = await cacheGet(env, key);
  if (hit && Date.now() - hit.at < RANK_TTL) return hit.data;
  if (hit) {
    ctx.waitUntil(refreshRank(deps, days, rank).catch(() => {}));
    return hit.data;
  }
  try { return await refreshRank(deps, days, rank); }
  catch {
    const snap = await snapshot(env, reqUrl, ID.fetchLiveRank, "");
    const board = snap && typeof snap === "object" ? { ...snap, via: "snapshot" } : snap;
    // Never store the 30-day all-ranks snapshot under a different combo key.
    if (key === "rank") {
      ctx.waitUntil(cachePut(env, key, Date.now() - RANK_TTL + RANK_RETRY, board).catch(() => {}));
    }
    return board;
  }
}
