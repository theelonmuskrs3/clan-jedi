// Clan Jedi live meta layer (backend only; feeds the existing rank, tier and hero-gear payloads).
//  - Moonton GMS rank sources (mobilelegends.com/rank): 30-day and 7-day boards for all ranks and the
//    Mythic / Mythical Honor / Mythical Glory brackets. Rone Arena (arena.rone.dev) is the fallback per board.
//  - Rone Arena MPL hero statistics (pro picks/bans) as a small meta signal for the tier board.
//  - Moonton Academy high-rank builds (via Rone Arena) for the core items of the official build.
// Every function degrades to "no data" so the caller can keep the previous behaviour.
import HERO_LANES from "../data/hero-lanes.json";
import ACADEMY_EQUIP from "../data/academy-equip.json";
import PRO_ITEMS from "../data/pro-items.json";

const GMS_APP = "2669606", GMS_ACT = "2669607";
const GMS_SOURCES = { 7: "2756569", 30: "2756570" };
const BIGRANK = { all: "101", mythic: "7", honor: "8", glory: "9" };
const RONE = ["https://arena.rone.dev", "https://arena.fastapicloud.dev"];
export const BOARD_KEYS = ["30:all", "30:mythic", "30:honor", "30:glory", "7:all", "7:mythic", "7:honor", "7:glory"];
export const META_TTL = 864e5;          // boards, pro stats and academy builds: 24 h
export const META_RETRY = 18e5;         // failed refresh: retry after 30 min

// ---------------------------------------------------------------- rank boards
function parseRecords(o) {
  if (o?.code !== 0 || !o.data?.records?.length) throw new Error("rank board empty");
  const out = [];
  for (const rec of o.data.records) {
    const t = rec.data ?? {}; const n = t.main_hero?.data?.name;
    if (!n || typeof t.main_heroid !== "number") continue;
    const subs = Array.isArray(t.sub_hero) ? t.sub_hero : [];
    out.push([t.main_heroid, n, Number(t.main_hero_win_rate) || 0, Number(t.main_hero_appearance_rate) || 0, Number(t.main_hero_ban_rate) || 0,
      subs.slice(0, 5).map((s) => [Number(s.heroid) || 0, Number(s.increase_win_rate) || 0])]);
  }
  if (out.length < 40) throw new Error("rank board short");
  return out;
}
function gmsBody(bigrank) {
  return JSON.stringify({ pageSize: 200, pageIndex: 1, filters: [{ field: "bigrank", operator: "eq", value: bigrank }, { field: "match_type", operator: "eq", value: 0 }], sorts: [{ data: { field: "main_hero_ban_rate", order: "desc" }, type: "sequence" }], fields: ["main_hero", "main_hero_appearance_rate", "main_hero_ban_rate", "main_hero_win_rate", "main_heroid", "data.sub_hero.heroid", "data.sub_hero.increase_win_rate"] });
}
async function gmsSign({ fetchJson }) {
  const sign = (await fetchJson(`https://api.gms.moontontech.com/api/act/basev4?_t=${Date.now()}`, { headers: { "x-appid": GMS_APP, "x-actid": GMS_ACT, referer: "https://www.mobilelegends.com/" } })).data?.server?.enigma;
  if (!sign) throw new Error("rank sign unavailable");
  return sign;
}
async function gmsBoard(sign, days, rank, { fetchJson, hmacHex }) {
  const body = gmsBody(BIGRANK[rank]);
  const path = `/api/gms/source/${GMS_APP}/${GMS_SOURCES[days]}`;
  const sig = btoa(String.fromCharCode(...(await hmacHex("SHA-1", sign, ["POST", path, "", body].join("\n")))));
  const o = await fetchJson(`https://api.gms.moontontech.com${path}`, { method: "POST", headers: { "content-type": "application/json;charset=UTF-8", "x-appid": GMS_APP, "x-actid": GMS_ACT, "x-lang": "en", referer: "https://www.mobilelegends.com/", origin: "https://www.mobilelegends.com", authorization: sig }, body });
  return parseRecords(o);
}
async function roneJson(path, { fetchJson }) {
  let last;
  for (const host of RONE) { try { return await fetchJson(host + path); } catch (e) { last = e; } }
  throw last || new Error("rone unavailable");
}
async function roneBoard(days, rank, deps) {
  return parseRecords(await roneJson(`/api/heroes/rank?days=${days}&rank=${rank}&sort_field=ban_rate&sort_order=desc&size=200&index=1&lang=en`, deps));
}
// Pull every board (official first, Rone per board on failure). Boards that fail stay out of the result.
export async function pullBoards(deps, keys = BOARD_KEYS) {
  let sign = null;
  try { sign = await gmsSign(deps); } catch {}
  const at = Date.now();
  const res = await Promise.all(keys.map(async (key) => {
    const [d, r] = key.split(":");
    if (sign) { try { return [key, { via: "official", at, rows: await gmsBoard(sign, Number(d), r, deps) }]; } catch {} }
    try { return [key, { via: "rone", at, rows: await roneBoard(Number(d), r, deps) }]; } catch { return [key, null]; }
  }));
  return Object.fromEntries(res.filter(([, v]) => v));
}

// ---------------------------------------------------------------- rank payload (fetchLiveRank shape)
// Win/pick/ban stay the official 30-day all-ranks numbers (what Codex labels). Counters are the official
// 30-day counter lists blended across all ranks (40%) and the Mythic / Honor / Glory brackets (20% each).
const COUNTER_W = { "30:all": 0.4, "30:mythic": 0.2, "30:honor": 0.2, "30:glory": 0.2 };
export function rankPayload(boards, findHero, source) {
  const base = boards["30:all"];
  if (!base) return null;
  const map = new Map();
  for (const [oid, name] of base.rows) { const f = findHero(name); if (f) map.set(oid, { id: f.id, name: f.name }); }
  const byKey = {};
  for (const k of Object.keys(COUNTER_W)) if (boards[k]) byKey[k] = new Map(boards[k].rows.map((r) => [r[0], r]));
  const heroes = [];
  for (const [oid, , win, pick, ban, subs] of base.rows) {
    const f = map.get(oid); if (!f) continue;
    if (pick < 2e-4 && win > 0.95) continue;
    const cand = new Map();
    let wsum = 0;
    const lists = {};
    for (const [k, w] of Object.entries(COUNTER_W)) {
      const row = k === "30:all" ? [oid, , , , , subs] : byKey[k]?.get(oid);
      if (!row) continue;
      wsum += w; lists[k] = row[5];
      for (const [cid] of row[5]) if (!cand.has(cid)) cand.set(cid, 0);
    }
    for (const cid of cand.keys()) {
      let s = 0;
      for (const [k, list] of Object.entries(lists)) {
        const hit = list.find((c) => c[0] === cid);
        // not in this bracket's top 5: estimate it just below that bracket's 5th entry
        const floor = list.length ? Math.min(...list.map((c) => c[1])) * 0.75 : 0;
        s += COUNTER_W[k] * (hit ? hit[1] : floor);
      }
      cand.set(cid, wsum ? s / wsum : 0);
    }
    const counters = [...cand.entries()].map(([cid, lift]) => { const x = map.get(cid); return !x || lift < 0.01 ? null : { id: x.id, name: x.name, lift: Math.round(lift * 1e4) / 1e4 }; })
      .filter((c) => c != null).sort((a, b) => b.lift - a.lift).slice(0, 5);
    heroes.push({ id: f.id, name: f.name, officialId: oid, winRate: win, pickRate: pick, banRate: ban, counters });
  }
  return { fetchedAt: new Date(base.at).toISOString(), days: 30, rank: "all", source, live: true, heroes };
}

// ---------------------------------------------------------------- new heroes (in Moonton's board, not in the roster)
export function unknownHeroes(boards, findHero) {
  const base = boards["30:all"] || boards["7:all"];
  if (!base) return [];
  return base.rows.filter(([, name]) => !findHero(name)).map(([oid, name]) => ({ oid, name }));
}
const LANE_FIX = { "exp lane": "EXP Lane", "gold lane": "Gold Lane", "mid lane": "Mid Lane", jungle: "Jungle", roam: "Roaming", roaming: "Roaming" };
const ROLE_FIX = { tank: "Tank", fighter: "Fighter", assassin: "Assassin", mage: "Mage", marksman: "Marksman", support: "Support" };
export async function extraHeroFromRone(oid, name, deps) {
  const o = await roneJson(`/api/heroes/${oid}?lang=en`, deps);
  const h = o?.data?.records?.[0]?.data?.hero?.data;
  if (!h || !h.name) throw new Error("no hero detail");
  const roles = (h.sortlabel ?? []).map((s) => ROLE_FIX[String(s).toLowerCase()]).filter(Boolean);
  const lanes = (h.roadsortlabel ?? []).map((s) => LANE_FIX[String(s).toLowerCase()]).filter(Boolean);
  if (!roles.length) throw new Error("no role");
  const magic = roles[0] === "Mage" || (roles[0] === "Support" && !roles.includes("Fighter"));
  const ranged = ["Mage", "Marksman"].includes(roles[0]);
  const skills = (h.heroskilllist?.[0]?.skilllist ?? []).filter((s) => s.skillname);
  const keys = ["Passive", "Skill1", "Skill2", "Ultimate"];
  return {
    id: name.toLowerCase().replace(/['’.]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name: h.name, title: "", roles, specialties: (h.speciality ?? []).filter(Boolean), lanes: lanes.length ? lanes : [],
    damageType: magic ? "Magic" : "Physical", range: ranged ? "Ranged" : "Melee",
    difficulty: Math.max(1, Math.min(3, Math.round((Number(h.difficulty) || 20) / 30))), tags: [],
    stats: { earlyPower: 3, latePower: 3, ccLevel: 3, mobility: 3, durability: 3, waveClear: 3 },
    abilities: skills.slice(0, 4).map((s, i) => ({ key: keys[i] ?? "Skill1", name: s.skillname, type: (s.skilltag?.[0]?.tagname) || "Skill", cooldown: (/CD:\s*([\d.]+)/.exec(s["skillcd&cost"] || "")?.[1] ?? "—") + (/CD:/.test(s["skillcd&cost"] || "") ? "s" : ""), summary: "", notes: [] })),
    hardCounters: [], softCounters: [], counteredByItems: [],
  };
}

// ---------------------------------------------------------------- pro picks/bans (Rone Arena MPL statistics)
export async function pullPro(deps) {
  const counts = {};
  let ok = 0;
  for (const league of ["id", "ph", "my", "kh"]) {
    try {
      const o = await roneJson(`/api/esports/${league}/statistics/heroes`, deps);
      for (const h of o?.heroes ?? []) { const n = h?.hero?.name; if (!n) continue; counts[n] = (counts[n] || 0) + (Number(h.picks) || 0) + (Number(h.bans) || 0); }
      ok++;
    } catch {}
  }
  if (!ok) throw new Error("no pro stats");
  return { at: Date.now(), counts };
}

// ---------------------------------------------------------------- tier boards (fetchLiveTier shape)
// Same lanes, same six bands and the same number of heroes per band as the board the app shipped with;
// the order comes from Moonton's post-patch ranked data (7 days; Mythic, Honor and Glory weighted over all
// ranks) with pro picks/bans as a small extra signal.
const LANES = ["Jungle", "EXP Lane", "Mid Lane", "Gold Lane", "Roaming"];
const LANE_ROLES = { Jungle: ["Assassin", "Fighter", "Tank"], "EXP Lane": ["Fighter", "Tank"], "Mid Lane": ["Mage"], "Gold Lane": ["Marksman"], Roaming: ["Tank", "Support"] };
// a tank only counts for the EXP board when EXP is its main lane
const fitsLane = (h, lane) => h.l.includes(lane) && h.r.some((r) => LANE_ROLES[lane].includes(r)) && !(lane === "EXP Lane" && !h.r.includes("Fighter") && h.l[0] !== lane);
const z = (arr) => { const m = arr.reduce((a, b) => a + b, 0) / (arr.length || 1); const sd = Math.sqrt(arr.reduce((a, b) => a + (b - m) ** 2, 0) / (arr.length || 1)) || 1; return arr.map((v) => (v - m) / sd); };
export function tierPayload(boards, pro, findHero, shape, loc, patch) {
  const keys = ["7:all", "7:mythic", "7:honor", "7:glory"].filter((k) => boards[k]);
  if (!boards["7:all"] || keys.length < 2) return null;
  const W = { "7:all": 0.25, "7:mythic": 0.25, "7:honor": 0.25, "7:glory": 0.25 };
  const stat = new Map();       // heroId -> { win, pick, ban }
  for (const k of keys) for (const [, name, win, pick, ban] of boards[k].rows) {
    const f = findHero(name); if (!f) continue;
    const s = stat.get(f.id) ?? { win: 0, pick: 0, ban: 0, w: 0 };
    s.win += W[k] * win; s.pick += W[k] * pick; s.ban += W[k] * ban; s.w += W[k]; stat.set(f.id, s);
  }
  const proBy = new Map();
  for (const [n, c] of Object.entries(pro?.counts ?? {})) { const f = findHero(n); if (f) proBy.set(f.id, (proBy.get(f.id) || 0) + c); }
  const boardsOut = [];
  const leaders = [];
  for (const lane of LANES) {
    const old = shape.find((b) => b.lane === lane);
    if (!old) return null;
    const counts = old.bands.map((b) => [b.rank, b.ids.length]);
    const total = counts.reduce((a, [, n]) => a + n, 0);
    let pool = Object.entries(HERO_LANES).filter(([id, h]) => stat.has(id) && fitsLane(h, lane));
    if (pool.length < total) pool = Object.entries(HERO_LANES).filter(([id, h]) => stat.has(id) && h.l.includes(lane)); // e.g. Roaming mages
    const cands = pool.map(([id, h]) => ({ id, primary: h.l[0] === lane }));
    if (cands.length < total) return null;
    const win = z(cands.map((c) => stat.get(c.id).win / stat.get(c.id).w));
    const ban = z(cands.map((c) => Math.log(0.002 + stat.get(c.id).ban / stat.get(c.id).w)));
    const pick = z(cands.map((c) => Math.log(1e-4 + stat.get(c.id).pick / stat.get(c.id).w)));
    const pr = z(cands.map((c) => Math.log(1 + (proBy.get(c.id) || 0))));
    const scored = cands.map((c, i) => ({ id: c.id, s: 0.4 * win[i] + 0.3 * ban[i] + 0.2 * pick[i] + (proBy.size ? 0.1 * pr[i] : 0) + (c.primary ? 0.25 : 0) }))
      .sort((a, b) => b.s - a.s).slice(0, total);
    let i = 0;
    const bands = counts.map(([rank, n]) => { const ids = scored.slice(i, i + n).map((x) => x.id); i += n; return { rank, ids }; });
    leaders.push(findHero(bands[0].ids[0])?.name);
    boardsOut.push({ lane, bands });
  }
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(boards["7:all"].at));
  const lead = leaders.filter(Boolean).slice(0, 4).join(" / ");
  const why = {
    en: `Moonton ranked data since patch ${patch} (last 7 days, Mythic and up weighted)${proBy.size ? " plus MPL picks/bans" : ""}. ${lead} headline. Ban pressure and kits still break ties in draft.`,
    es: `Datos de ranked de Moonton desde el parche ${patch} (últimos 7 días, Mythic y superior con más peso)${proBy.size ? " más picks/bans de MPL" : ""}. ${lead} encabezan. El ban y el kit siguen desempate en draft.`,
  };
  for (const b of boardsOut) b.why = why;
  const note = loc === "es"
    ? `Tabla viva: ranked oficial de Moonton (7 días, Mythic+)${proBy.size ? " y MPL" : ""} · tabla ${day}. Se actualiza a diario.`
    : `Live board: Moonton official ranked data (7 days, Mythic+)${proBy.size ? " and MPL" : ""} · board ${day}. Refreshed daily.`;
  return { fetchedAt: new Date().toISOString(), updated: day, source: "Moonton GMS rank data (mobilelegends.com/rank) + Rone Arena MPL stats", sourceNote: note, boards: boardsOut };
}

// ---------------------------------------------------------------- Moonton Academy builds (via Rone Arena)
const LANE_Q = { "Gold Lane": "gold", "Mid Lane": "mid", "EXP Lane": "exp", Jungle: "jungle", Roaming: "roam" };
export async function pullAcademy(heroId, heroName, deps) {
  const lane = LANE_Q[HERO_LANES[heroId]?.l?.[0]];
  if (!lane) throw new Error("no lane");
  const ident = encodeURIComponent(heroName);
  for (const rank of ["glory", "mythic", "all"]) {
    let o;
    try { o = await roneJson(`/api/academy/heroes/${ident}/builds?lane=${lane}&rank=${rank}&size=1&lang=en`, deps); } catch (e) { if (rank === "all") throw e; continue; }
    const builds = o?.data?.records?.[0]?.data?.build;
    if (Array.isArray(builds) && builds.length) {
      const top = [...builds].sort((a, b) => (b.build_pick_rate || 0) - (a.build_pick_rate || 0))[0];
      const ids = (top.equipid ?? []).map((n) => ACADEMY_EQUIP[String(n)]).filter(Boolean);
      if (ids.length) return { at: Date.now(), rank, lane, ids, pick: top.build_pick_rate, win: top.build_win_rate };
    }
  }
  throw new Error("no academy build");
}
// 6-item path: boots, the Academy core items in their order, then the rest of the curated pro build, then mapi.
export function composeGear(heroId, academyIds, mapiIds, itemInfo) {
  const ok = (id) => { const it = itemInfo(id); return it && (it.tier === 3 || (it.category === "Movement" && id !== "boots")); };
  const boots = (id) => itemInfo(id)?.category === "Movement";
  const base = [...(PRO_ITEMS[heroId] ?? []), ...mapiIds].filter(ok);
  const out = [];
  const push = (id) => { if (ok(id) && !out.includes(id) && !(boots(id) && out.some(boots))) out.push(id); };
  const b = academyIds.find(boots) ?? base.find(boots);
  if (b) push(b);
  for (const id of academyIds) push(id);
  for (const id of base) { if (out.length >= 6) break; push(id); }
  return out.length === 6 ? out : null;
}
