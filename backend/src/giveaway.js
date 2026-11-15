// Ported 1:1 from the recovered Clan Jedi source (src/data/cup.ts, src/data/giveaway.ts,
// src/lib/giveaway/math.ts) and checked against the shipped bundle (giveaway-*.js, index-*.js).

export const CUP_MAX = 8;
export const CUP_ROLES = ["Mage", "Fighter", "Marksman", "Assassin"];

function nextPow2(n) { let p = 1; while (p < n) p *= 2; return p; }
function seedOrder(size) {
  let slots = [1, 2]; let n = 2;
  while (n < size) { n *= 2; const next = []; for (const s of slots) { next.push(s); next.push(n + 1 - s); } slots = next; }
  return slots;
}
function shuffle(list, rng) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); const t = out[i]; out[i] = out[j]; out[j] = t; }
  return out;
}
function roundName(c) { return c <= 1 ? "final" : c === 2 ? "semi" : c === 4 ? "quarter" : c === 8 ? "r16" : "r32"; }

export function buildBracket(ids, method = "random", rng = Math.random) {
  const ranked = method === "entry" ? [...ids] : shuffle(ids, rng);
  const size = nextPow2(ranked.length);
  const slots = Array(size).fill(null);
  if (method === "blind") ranked.forEach((id, i) => { slots[i] = id; });
  else { const positions = seedOrder(size); ranked.forEach((id, i) => { const at = positions.indexOf(i + 1); if (at >= 0) slots[at] = id; }); }
  let sides = slots.map((id) => (id ? { kind: "player", id } : { kind: "open" }));
  const rounds = []; let n = 1;
  while (sides.length >= 2) {
    const matches = [];
    for (let i = 0; i < sides.length; i += 2) {
      const a = sides[i], b = sides[i + 1];
      const aOpen = a.kind === "open", bOpen = b.kind === "open";
      const bye = (aOpen && !bOpen) || (!aOpen && bOpen);
      const code = bye ? "" : `M${n++}`;
      const games = bye ? [] : [0, 1, 2].map(() => CUP_ROLES[Math.floor(rng() * CUP_ROLES.length)]);
      matches.push({ code, round: rounds.length, a, b, bye, games });
    }
    rounds.push({ name: roundName(matches.length), matches });
    if (sides.length === 2) break;
    const next = [];
    for (const m of matches) { if (m.bye) next.push(m.a.kind === "open" ? m.b : m.a); else next.push({ kind: "winner", code: m.code }); }
    sides = next;
  }
  return { order: ranked, rounds };
}

export function applyCupWinner(rounds, round, index, playerId) {
  const match = rounds[round]?.matches[index];
  if (!match || match.bye) return false;
  const onSide = (match.a.kind === "player" && match.a.id === playerId) || (match.b.kind === "player" && match.b.id === playerId);
  if (!onSide || match.winnerId === playerId) return false;
  if (match.winnerId) clearCupFrom(rounds, round, index);
  match.winnerId = playerId;
  const nextR = round + 1;
  if (nextR < rounds.length) {
    const next = rounds[nextR].matches[Math.floor(index / 2)];
    if (next) { const slot = index % 2 === 0 ? "a" : "b"; next[slot] = { kind: "player", id: playerId }; }
  }
  return true;
}
function clearCupFrom(rounds, round, index) {
  const match = rounds[round]?.matches[index];
  if (!match?.winnerId) return;
  const id = match.winnerId; const nextR = round + 1;
  if (nextR < rounds.length) {
    const nextIndex = Math.floor(index / 2); const next = rounds[nextR].matches[nextIndex]; const slot = index % 2 === 0 ? "a" : "b";
    if (next && next[slot].kind === "player" && next[slot].id === id) {
      if (next.winnerId === id) clearCupFrom(rounds, nextR, nextIndex);
      next[slot] = { kind: "winner", code: match.code };
    }
  }
  match.winnerId = null;
}

// --- giveaway clock (bundle index-*.js: Jm / $m / eh / th)
const TZ = "America/New_York";
const ANCHOR = { y: 2026, m: 11, d: 1, h: 20, min: 0 };
const pad = (n) => String(n).padStart(2, "0");
function etParts(ms) {
  const f = new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const p = Object.fromEntries(f.formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, min: +p.minute };
}
function etMs(y, m, d, h, min) {
  const c = [Date.parse(`${y}-${pad(m)}-${pad(d)}T${pad(h)}:${pad(min)}:00-04:00`), Date.parse(`${y}-${pad(m)}-${pad(d)}T${pad(h)}:${pad(min)}:00-05:00`)];
  for (const o of c) { if (!Number.isFinite(o)) continue; const a = etParts(o); if (a.y === y && a.m === m && a.d === d && a.h === h && a.min === min) return o; }
  return c[0];
}
function addDays(y, m, d, n) { const t = new Date(Date.UTC(y, m - 1, d + n)); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; }
function cycleStartMs(i) { const t = addDays(ANCHOR.y, ANCHOR.m, ANCHOR.d, i * 90); return etMs(t.y, t.m, t.d, ANCHOR.h, ANCHOR.min); }
function cycleIndexAt(now) { let i = 0; while (cycleStartMs(i + 1) <= now) i += 1; return i; }
export function giveawayClock(now) {
  const index = cycleIndexAt(now);
  const round1 = cycleStartMs(index);
  return { index, cycleKey: new Date(round1).toISOString(), round1 };
}

// --- wheel math (src/lib/giveaway/math.ts)
export function wrapDeg(d) { return ((d % 360) + 360) % 360; }
export function sliceCenter(index, count) { const n = Math.max(1, count); return (index * 360) / n; }
export function landingRotation(current, index, count, turns, jitterUnit) {
  const n = Math.max(1, count); const slice = 360 / n;
  const targetMod = wrapDeg(-sliceCenter(index, n)); const currentMod = wrapDeg(current);
  const delta = wrapDeg(targetMod - currentMod);
  const jitter = Math.max(-0.22, Math.min(0.22, jitterUnit)) * slice;
  return current + turns * 360 + delta - jitter;
}
