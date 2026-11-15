// Upcoming-skins finder (best recreation of the original live.ts loadAtelier wiki sweep).
// Curated skins come from the original's bundle (tonight's snapshot minus its "(auto · daily)" rows);
// the wiki sweep adds undated leaks / collabs from Upcoming_content + The_Aspirants with verified art.

const AUTO_SOURCE = "MLBB Wiki Upcoming content (auto · daily)";
const COLLAB = /collab|licensed|jujutsu|transformer|street fighter|hunter|bleach|naruto|sanrio/i;
const TIER_OK = /collector|starlight|legend|special|epic|elite|mpl|seasonal|aspirant/i;
const HIDDEN = new Set(["minsitthar|tidal spear"]);

export function parseUpcomingGalleries(wt) {
  const clean = wt.replace(/<!--[\s\S]*?-->/g, "");
  const out = []; const marks = [];
  const sectionRe = /====+\s*([^=\n]+)\s*====+/g; let sm;
  while ((sm = sectionRe.exec(clean))) {
    const name = sm[1].replace(/\{\{[^}]+\}\}/g, "").replace(/'{2,}/g, "").trim();
    if (!name || /there is no|unconfirmed/i.test(name)) continue;
    marks.push({ name, at: sm.index });
  }
  const lineRe = /File:([^|\n]+)\|'''\[\[([^\]]+)\]\]\s*[-–]\s*(.+?)'''/gi; let m;
  while ((m = lineRe.exec(clean))) {
    const file = m[1].trim(); const hero = m[2].trim();
    const name = m[3].replace(/'{2,}/g, "").replace(/\s+/g, " ").trim();
    const at = m.index; const section = [...marks].reverse().find((s) => s.at < at)?.name ?? "";
    if (!hero || !name || /mystery|<!--/i.test(`${name} ${section}`)) continue;
    out.push({ hero, name, file, section });
  }
  return out;
}

export function parseAspirantGallery(wt) {
  const out = []; const seen = new Set();
  const re = /\[\[([^\]|]+)\]\]\s*["“']([^"”']+)["”']/g; let m;
  while ((m = re.exec(wt))) {
    const hero = m[1].trim(); const name = m[2].trim();
    if (!hero || !name || /aspirants \(comic\)/i.test(hero)) continue;
    const key = `${hero}|${name}`.toLowerCase(); if (seen.has(key)) continue; seen.add(key);
    out.push({ hero, name, file: `${hero} (${name}).jpg`, section: "The Aspirants" });
  }
  return out;
}

function guessTier(section) {
  const s = section.toLowerCase();
  if (/legend|collab|licensed/.test(s)) return "Legend";
  if (/collector/.test(s)) return "Collector";
  if (/starlight/.test(s)) return "Starlight";
  if (/special|mpl/.test(s)) return "Special";
  return "Epic";
}
const norm = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
// same hero and same / prefixed / near-identical skin name (catches "Harbringer" vs "Harbinger")
function isDuplicate(list, hero, name) {
  const h = norm(hero), n = norm(name);
  return list.some((s) => { if (norm(s.hero) !== h) return false; const a = norm(s.nameEn); return a === n || a.startsWith(n) || n.startsWith(a) || lev(a, n) <= 2; });
}
const slug = (hero, name) => `${hero}-${name}`.toLowerCase().replace(/&/g, "and").replace(/['’.]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const proxyArt = (file) => `/api/atelier-art?file=${encodeURIComponent(file).replace(/%27/g, "'").replace(/%28/g, "(").replace(/%29/g, ")")}`;

// deps: { fetchJson, findHero, wikiInfo(titles) -> { [title]: {width,height} } }
export async function sweepWiki(deps) {
  const page = (p) => deps.fetchJson("https://mobile-legends.fandom.com/api.php?" + new URLSearchParams({ action: "parse", page: p, prop: "wikitext", redirects: "1", format: "json" }).toString()).then((d) => d.parse?.wikitext?.["*"] ?? "");
  let entries = []; let reached = false;
  try { entries = parseUpcomingGalleries(await page("Upcoming_content")); reached = true; } catch { /* wiki down */ }
  try { entries = entries.concat(parseAspirantGallery(await page("The_Aspirants"))); reached = true; } catch { /* optional */ }
  return { entries, reached };
}

export async function buildAtelier(curated, entries, deps) {
  const skins = curated.map((s) => s);
  const pending = [];
  for (const e of entries) {
    const key = `${e.hero.toLowerCase()}|${e.name.toLowerCase()}`;
    if (HIDDEN.has(key)) continue;
    if (/mystery|basic|<!--|there is no/i.test(`${e.name} ${e.section}`)) continue;
    const collabHit = COLLAB.test(`${e.section} ${e.name}`);
    if (!collabHit && !TIER_OK.test(e.section)) continue;
    if (isDuplicate(skins, e.hero, e.name) || isDuplicate(pending.map((p) => ({ hero: p.hero, nameEn: p.name })), e.hero, e.name)) continue;
    if (!deps.findHero(e.hero)) continue;
    pending.push(e);
  }
  const titles = [...new Set(pending.flatMap((e) => [`File:${e.hero} (${e.name}).jpg`, `File:${e.file}`]))];
  const info = titles.length ? await deps.wikiInfo(titles) : {};
  const added = [];
  for (const e of pending) {
    const hero = deps.findHero(e.hero);
    const named = `${e.hero} (${e.name}).jpg`;
    const si = info[`File:${named}`], mi = info[`File:${e.file}`];
    const splash = si && si.width >= 600 ? proxyArt(named) : undefined;
    const model = e.file && e.file !== named && mi && mi.width >= 200 && (mi.height >= 700 || mi.width >= 700) ? proxyArt(e.file) : undefined;
    const angles = [];
    if (splash) angles.push({ kind: "splash", src: splash, wikiFile: named, labelEn: "Splash", labelEs: "Splash" });
    if (model && model !== splash) angles.push({ kind: "model", src: model, wikiFile: e.file, labelEn: "In-game model", labelEs: "Modelo in-game" });
    if (!splash) continue; // no verified splash -> not ready (the app also hides portrait-only wiki entries)
    const collabHit = COLLAB.test(`${e.section} ${e.name}`);
    const skin = {
      id: slug(e.hero, e.name), heroId: hero.id, hero: e.hero, nameEn: e.name, nameEs: e.name,
      tier: guessTier(e.section), date: "2099-01-01", confidence: collabHit ? "official" : "leaked",
      collab: collabHit ? e.section.replace(/skins/gi, "").trim() || e.name : undefined,
      howEn: collabHit ? "Live from Upcoming content · collaboration / licensed. Dates refresh daily from the wiki + Advanced Server notes." : "Undated wiki leak — date TBA. Pulled live; art verified against wiki File: pages.",
      howEs: collabHit ? "En vivo desde Upcoming content · colaboración / licenciada. Las fechas se refrescan cada día desde la wiki y Advanced Server." : "Filtración de wiki sin fecha — TBA. Arte verificado contra páginas File: de la wiki.",
      blurbEn: `Pulled live from Upcoming content · ${e.section || "skins"}.`,
      blurbEs: `Traído en vivo de Upcoming content · ${e.section || "skins"}.`,
      source: AUTO_SOURCE, sourceUrl: "https://mobile-legends.fandom.com/wiki/Upcoming_content",
      wikiFile: named, portraitFile: e.file, angles,
    };
    if (skin.collab === undefined) delete skin.collab;
    added.push(skin); skins.push(skin);
  }
  return { skins, added };
}
export const isAuto = (s) => s.source === AUTO_SOURCE;
