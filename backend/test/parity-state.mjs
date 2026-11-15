// Compare cup + ring boards between the original grok.me site (read-only GET) and the copy.
import { fromCrossJSON } from "seroval";
const O = "https://pearl-marble-dune-giant.grok.me", C = process.argv[2] || "https://clan-jedi.pages.dev";
const H = { "x-tsr-serverFn": "true", accept: "application/json", "sec-fetch-site": "same-origin", "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/130 Safari/537.36" };
for (const [n, id] of [["cup", "ffe8d52cc03d30ecab5c08432ae4dc20046e0064fd2a3b69fe2dbd71be871e26"], ["ring", "e8cc3ab3a6dd34b3f7b7400a8006e14cbe2d9b0770ac24950460454ffa27dfaf"]]) {
  const get = async (b, sfx) => { const r = await fetch(`${b}/_serverFn/${id}${sfx}`, { headers: { ...H, referer: b + "/giveaway" } }); const v = fromCrossJSON(await r.json(), { refs: new Map() }).result; delete v.serverNow; return JSON.stringify(v); };
  const a = await get(O, ""), b = await get(C, ".json");
  console.log(n, a === b ? "IDENTICAL" : "DIFF\n" + a.slice(0, 400) + "\n" + b.slice(0, 400));
}
