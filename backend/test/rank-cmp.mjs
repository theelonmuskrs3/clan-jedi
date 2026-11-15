import { fromCrossJSON } from "seroval";
const id = "f62f7d26dad085277baefcd5a4018de319e3a6a194c3cbbbcb904425dbd42c45";
const H = { "x-tsr-serverFn": "true", accept: "application/json", "sec-fetch-site": "same-origin", "user-agent": "Mozilla/5.0 Chrome/130" };
const g = async (u) => fromCrossJSON(await (await fetch(u, { headers: H })).json(), { refs: new Map() }).result;
const a = await g("https://pearl-marble-dune-giant.grok.me/_serverFn/" + id), b = await g("https://clan-jedi.pages.dev/_serverFn/" + id + ".json");
const sum = (r) => ({ fetchedAt: r.fetchedAt, live: r.live, keys: Object.keys(r), n: JSON.stringify(r).length });
console.log(sum(a), sum(b)); const da = { ...a, fetchedAt: 0 }, db = { ...b, fetchedAt: 0 }; console.log("same except fetchedAt:", JSON.stringify(da) === JSON.stringify(db));
const ma = a.matchups?.masha ?? a.byHero?.masha; console.log(JSON.stringify(a).slice(0, 300)); console.log(JSON.stringify(b).slice(0, 300));
