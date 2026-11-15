import { fromCrossJSON } from "seroval";
const id = "f89fc7d63b6b20fcd563711bfd9aaa567315b4b218b5b1fd4c5cb44c1bbea21a";
const H = { "x-tsr-serverFn": "true", accept: "application/json", "sec-fetch-site": "same-origin", "user-agent": "Mozilla/5.0 Chrome/130" };
const P = encodeURIComponent(JSON.stringify({ t: { t: 10, i: 0, p: { k: ["data"], v: [{ t: 10, i: 1, p: { k: ["locale"], v: [{ t: 1, s: "es" }] }, o: 0 }] }, o: 0 }, f: 127, m: [] }));
const g = async (u) => { const r = await fetch(u, { headers: H }); return fromCrossJSON(await r.json(), { refs: new Map() }).result; };
const a = await g(`https://pearl-marble-dune-giant.grok.me/_serverFn/${id}?payload=${P}`), b = await g(`https://clan-jedi.pages.dev/_serverFn/${id}__es.json`);
console.log("orig", a.fetchedAt, a.skins.length, a.skins.map((s) => s.hero + ":" + s.name).join(", "));
console.log("copy", b.fetchedAt, b.skins.length, b.skins.map((s) => s.hero + ":" + s.name).join(", "));
const { fetchedAt: x, ...ra } = a, { fetchedAt: y, ...rb } = b; console.log("same except fetchedAt:", JSON.stringify(ra) === JSON.stringify(rb), Object.keys(a));
