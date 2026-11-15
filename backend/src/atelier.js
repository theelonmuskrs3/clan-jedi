// Upcoming-skins finder. Every skin shown must still be upcoming according to the MLBB Wiki:
//   upcoming evidence  = listed in a skin-tier section of "Upcoming content", OR a future month on the
//                        "StarLight" schedule, OR availability "Upcoming" in Module:Skin/data
//   released evidence  = a release date on/before today in Module:Skin/data (availability not "Upcoming"),
//                        a current/past month on the StarLight schedule, or an official hand-picked date that
//                        has passed
// A skin is kept only with upcoming evidence and no released evidence. Hand-picked (curated) entries follow the
// same rule, so they drop out on their own once they release or leave the wiki's upcoming lists.

const AUTO_SOURCE = "MLBB Wiki Upcoming content (auto · daily)";
const UC_URL = "https://mobile-legends.fandom.com/wiki/Upcoming_content";
const SL_URL = "https://mobile-legends.fandom.com/wiki/StarLight";
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
// skin-tier groups (level-3 headings under "== Skins ==") that hold real upcoming skins
const GROUP_OK = /^(common|exceptional|deluxe|exquisite|grand|supreme|collaboration)/i;

export const todayIso = (now = Date.now()) => new Date(now).toISOString().slice(0, 10);
export const norm = (s) => String(s || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
const key = (hero, name) => `${norm(hero)}|${norm(name)}`;

// wiki tier label for a level-4 section
export function tierOf(group, section) {
  const s = `${section}`.toLowerCase(), g = `${group}`.toLowerCase();
  if (/collaboration/.test(g)) return "Legend";
  if (/annual starlight/.test(s)) return "Starlight";
  if (/starlight/.test(s)) return "Starlight";
  if (/collector|luckybox/.test(s)) return "Collector";
  if (/legend/.test(s) || /supreme/.test(g)) return "Legend";
  if (/grand/.test(g)) return "Grand";
  if (/basic/.test(s)) return "Basic";
  if (/elite/.test(s)) return "Elite";
  if (/special|mpl|seasonal|summer|halloween|christmas|golden month/.test(s) || /exceptional/.test(g)) return "Special";
  return "Epic";
}

// The original app only styles these five tiers (atelier-foil-* classes + particle palette); anything else would
// render as an unstyled card, so wiki-only tiers are mapped onto the nearest styled one.
const STYLED_TIERS = new Set(["Collector", "Epic", "Special", "Starlight", "Legend"]);
export function styleTier(t) {
  if (STYLED_TIERS.has(t)) return t;
  if (t === "Grand") return "Legend";
  return "Special"; // Basic, Elite and anything unknown
}

// Upcoming content -> [{hero, name, file, group, section, tier, unconfirmed}]
export function parseUpcomingContent(wt) {
  const clean = String(wt || "").replace(/<!--[\s\S]*?-->/g, "");
  const out = []; const h = { 2: "", 3: "", 4: "" };
  for (const raw of clean.split("\n")) {
    const line = raw.replace(/\{\{[^{}]*\}\}/g, "");
    for (const m of line.matchAll(/(={2,6})\s*([^=]+?)\s*\1(?!=)/g)) {
      const lvl = Math.min(m[1].length, 5); const name = m[2].replace(/'{2,}/g, "").trim();
      if (lvl <= 4) { h[lvl] = name; for (let l = lvl + 1; l <= 4; l++) h[l] = ""; }
    }
    const g = line.match(/^\s*(?:File:)?([^|\n]+\.(?:png|jpe?g|webp))\|'''\s*\[\[([^\]|]+)(?:\|[^\]]*)?\]\]\s*[-–]\s*(.+?)'''/i);
    if (!g) continue;
    const hero = g[2].trim(); const name = g[3].replace(/'{2,}/g, "").replace(/\s+/g, " ").trim();
    if (!/^skins$/i.test(h[2]) || !GROUP_OK.test(h[3]) || !h[4]) continue; // revamps, remodels, series placeholders, new heroes
    if (!hero || !name || /mystery skin|^tba$/i.test(name)) continue;
    out.push({ hero, name, file: g[1].trim(), group: h[3], section: h[4], tier: tierOf(h[3], h[4]), unconfirmed: /unconfirmed/i.test(h[4]) });
  }
  return out;
}

// StarLight page schedule -> [{hero, name, file, date: "YYYY-MM-01"}]
export function parseStarlightSchedule(wt) {
  const out = [];
  const re = /^\s*(?:File:)?([^|\n]+\.(?:png|jpe?g|webp))\|'''\s*(?:\[\[)?([^\]'\n]+?)(?:\]\])?\s+[-–]\s+([^'\n]+?)'''\s*<br\s*\/?>\s*([A-Za-z]+)\s+(\d{4})/gim; let m;
  while ((m = re.exec(String(wt || "")))) {
    const mi = MONTHS.indexOf(m[4].toLowerCase()); if (mi < 0) continue;
    out.push({ hero: m[2].trim(), name: m[3].trim(), file: m[1].trim(), date: `${m[5]}-${String(mi + 1).padStart(2, "0")}-01` });
  }
  return out;
}

// Module:Skin/data (Lua table) -> { "hero|name": {hero, name, release, availability} }
export function parseSkinData(lua) {
  const out = {}; let hero = "";
  const re = /^ {4}\["([^"]+)"\] = \{|\["name"\] = "((?:[^"\\]|\\.)*)",\s*\["release"\] = "([^"]*)",\s*\["availability"\] = "([^"]*)"/gm; let m;
  while ((m = re.exec(String(lua || "")))) {
    if (m[1] !== undefined) { hero = m[1]; continue; }
    const name = m[2].replace(/\\(.)/g, "$1");
    out[key(hero, name)] = { hero, name, release: m[3], availability: m[4] };
  }
  return out;
}

// released per wiki skin data? -> date string or null
export function releasedBySkinData(rec, today) {
  if (!rec || /upcoming/i.test(rec.availability)) return null;
  const r = rec.release || "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(r)) return r <= today ? r : null;
  const y = r.match(/^(\d{4})/); // "2025-XX-XX" with Available/Limited = already out
  if (y && y[1] < today.slice(0, 4)) return r;
  if (y && y[1] === today.slice(0, 4) && /^(available|limited)$/i.test(rec.availability)) {
    const mm = r.match(/^\d{4}-(\d{2})/); if (mm && `${y[1]}-${mm[1]}` <= today.slice(0, 7)) return r;
  }
  return null;
}

const lev = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
// same hero and same / prefixed / near-identical skin name (catches "Harbringer" vs "Harbinger")
const same = (h1, n1, h2, n2) => { if (norm(h1) !== norm(h2)) return false; const a = norm(n1), b = norm(n2); return a === b || a.startsWith(b) || b.startsWith(a) || lev(a, b) <= 2; };
const findIn = (list, hero, name) => list.find((e) => same(e.hero, e.name, hero, name));
const findRec = (data, hero, name) => data[key(hero, name)] || Object.values(data).find((r) => same(r.hero, r.name, hero, name));

const slug = (hero, name) => `${hero}-${name}`.toLowerCase().replace(/&/g, "and").replace(/['’.]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const enc = (file) => encodeURIComponent(file).replace(/%27/g, "'").replace(/%28/g, "(").replace(/%29/g, ")");
const proxyArt = (file) => `/api/atelier-art?file=${enc(file)}`;
// full-size in-game art uploaded as a "-portrait" file (not a thumbnail): served via ?model= so the client's
// portrait-thumbnail filter doesn't hide it
const proxyModel = (file) => `/api/atelier-art?model=${enc(file.replace(/-portrait(\.\w+)$/i, "$1"))}`;

// deps: { fetchJson }
export async function sweepWiki(deps) {
  const api = (q) => deps.fetchJson("https://mobile-legends.fandom.com/api.php?" + new URLSearchParams({ ...q, format: "json" }).toString());
  const page = (p) => api({ action: "parse", page: p, prop: "wikitext", redirects: "1" }).then((d) => d.parse?.wikitext?.["*"] ?? "");
  const [uc, sl, sd] = await Promise.allSettled([
    page("Upcoming_content"),
    page("StarLight"),
    api({ action: "query", titles: "Module:Skin/data", prop: "revisions", rvprop: "content", rvslots: "main" })
      .then((d) => Object.values(d.query?.pages ?? {})[0]?.revisions?.[0]?.slots?.main?.["*"] ?? ""),
  ]);
  const upcoming = uc.status === "fulfilled" ? parseUpcomingContent(uc.value) : [];
  return {
    reached: uc.status === "fulfilled" && upcoming.length > 0,
    upcoming,
    starlight: sl.status === "fulfilled" ? parseStarlightSchedule(sl.value) : [],
    skinData: sd.status === "fulfilled" ? parseSkinData(sd.value) : {},
  };
}

// verdict for one hero/skin pair against the wiki evidence
export function judge(hero, name, ev, today) {
  const uc = findIn(ev.upcoming, hero, name);
  const sl = findIn(ev.starlight, hero, name);
  const rec = findRec(ev.skinData, hero, name);
  const slFuture = sl && sl.date.slice(0, 7) > today.slice(0, 7);
  const released = releasedBySkinData(rec, today) || (sl && !slFuture ? sl.date : null);
  const upcoming = !!(uc || slFuture || (rec && /upcoming/i.test(rec.availability)));
  return { keep: upcoming && !released, uc, sl, slFuture, rec, released };
}

// a hand-picked date that has passed: official -> released; leaked -> date unknown again (TBA)
export function applyDates(skin, today) {
  const d = skin.date || "";
  if (!d || d.startsWith("2099") || d > today) return skin;
  if (skin.confidence === "official") return null;
  const s = { ...skin, date: "2099-01-01", howEn: `The leaked ${d} date passed without a release; the wiki still lists it as upcoming — date TBA.`, howEs: `La fecha filtrada ${d} pasó sin lanzamiento; la wiki aún la lista como próxima — fecha por anunciar.` };
  delete s.endDate;
  return s;
}

export async function buildAtelier(curated, ev, deps, now = Date.now()) {
  const today = todayIso(now);
  const skins = []; const removed = []; const added = []; const noArt = [];
  for (const c of curated) {
    const v = judge(c.hero, c.nameEn, ev, today);
    if (!v.keep) { removed.push({ id: c.id, hero: c.hero, name: c.nameEn, why: v.released ? `released ${v.released}` : "not on the wiki's upcoming lists" }); continue; }
    let s = applyDates(c, today);
    if (!s) { removed.push({ id: c.id, hero: c.hero, name: c.nameEn, why: `official date ${c.date} passed` }); continue; }
    // keep the original app's tier on its hand-picked skins (tier drives the card foil, glow and particle colours)
    if (v.slFuture && s.date === "2099-01-01") s = { ...s, date: v.sl.date };
    skins.push(s);
  }
  // wiki-only candidates
  const cands = [];
  for (const e of ev.upcoming) cands.push({ ...e, date: "2099-01-01", srcUrl: UC_URL, how: e.section });
  for (const e of ev.starlight) if (e.date.slice(0, 7) > today.slice(0, 7) && !findIn(cands, e.hero, e.name)) cands.push({ ...e, tier: "Starlight", section: `StarLight ${e.date.slice(0, 7)}`, srcUrl: SL_URL, how: "StarLight schedule" });
  const pending = [];
  for (const e of cands) {
    if (skins.some((s) => same(s.hero, s.nameEn, e.hero, e.name)) || findIn(removed, e.hero, e.name) || findIn(pending, e.hero, e.name)) continue;
    if (!deps.findHero(e.hero) || !judge(e.hero, e.name, ev, today).keep) continue;
    pending.push(e);
  }
  const titles = [...new Set(pending.flatMap((e) => [`File:${e.hero} (${e.name}).jpg`, `File:${e.hero} (${e.name}).png`, `File:${e.file}`]))];
  const info = titles.length ? await deps.wikiInfo(titles) : {};
  for (const e of pending) {
    const hero = deps.findHero(e.hero);
    const named = [`${e.hero} (${e.name}).jpg`, `${e.hero} (${e.name}).png`].find((f) => info[`File:${f}`]?.width >= 600);
    const mi = info[`File:${e.file}`];
    const bigPortrait = mi && mi.width >= 600 && mi.height >= 700; // real art, not a 240x390 thumbnail
    const angles = [];
    if (named) angles.push({ kind: "splash", src: proxyArt(named), wikiFile: named, labelEn: "Splash", labelEs: "Splash" });
    if (bigPortrait) angles.push({ kind: "model", src: /-portrait\./i.test(e.file) ? proxyModel(e.file) : proxyArt(e.file), wikiFile: e.file, labelEn: "Skin art", labelEs: "Arte de la skin" });
    if (!angles.length) { noArt.push({ hero: e.hero, name: e.name, tier: e.tier, section: e.section }); continue; }
    const collab = /collaboration/i.test(e.group || "");
    const tba = !e.date || e.date.startsWith("2099");
    const skin = {
      id: slug(e.hero, e.name), heroId: hero.id, hero: e.hero, nameEn: e.name, nameEs: e.name,
      tier: styleTier(e.tier), date: e.date || "2099-01-01", confidence: e.unconfirmed ? "leaked" : collab ? "official" : "leaked",
      collab: collab ? e.section.replace(/skins?/gi, "").trim() || e.name : undefined,
      howEn: `Listed on the MLBB Wiki ${e.how}${e.unconfirmed ? " (unconfirmed)" : ""}. ${tba ? "Date TBA — " : ""}checked live against the wiki; drops off once released.`,
      howEs: `Listada en la wiki de MLBB: ${e.how}${e.unconfirmed ? " (sin confirmar)" : ""}. ${tba ? "Fecha por anunciar — " : ""}verificada en vivo con la wiki; se retira al salir.`,
      blurbEn: `Pulled live from the wiki · ${e.section}.`,
      blurbEs: `Traído en vivo de la wiki · ${e.section}.`,
      source: AUTO_SOURCE, sourceUrl: e.srcUrl,
      wikiFile: named || e.file, portraitFile: e.file, angles,
    };
    if (skin.collab === undefined) delete skin.collab;
    added.push(skin); skins.push(skin);
  }
  return { skins, added, removed, noArt };
}

// last-resort filter for cached/fallback data when the wiki can't be reached: date rules + skins verified as
// released or art-less on the wiki (2026-11-14 check). Auto rows from the bundled snapshot are dropped (their
// art files don't exist on the wiki).
export const VERIFIED_RELEASED = new Set([
  "kagura-feast-of-eternity", "kalea-tideborn-sailor", "layla-prismatic-rhythm", "popol-flamehide-thane",
  "badang-quantum-commando", "karrie-quantum-razor", "yve-flame-lotus", "mathilda-arcane-verdict", "aamon-falcon-of-light",
]);
export function filterOffline(skins, now = Date.now(), { dropAuto = false } = {}) {
  const today = todayIso(now);
  return skins.filter((s) => !VERIFIED_RELEASED.has(s.id) && !(dropAuto && isAuto(s))).map((s) => applyDates(s, today)).filter(Boolean);
}
export const isAuto = (s) => s.source === AUTO_SOURCE;
