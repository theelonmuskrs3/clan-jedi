// End-to-end checks against a running deployment: BASE=http://localhost:8931 node test/e2e.mjs [--destructive]
import { toCrossJSON, fromCrossJSON } from "seroval";
const BASE = process.env.BASE || "http://localhost:8931";
const ORIGIN = process.env.ORIGIN; // e.g. https://theelonmuskrs3.github.io
const PIN = process.env.HOST_CODE; if (!PIN) throw new Error("set HOST_CODE");
const D = process.argv.includes("--destructive");
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
const hdr = () => ({ "x-tsr-serverFn": "true", accept: "application/json", ...(ORIGIN ? { origin: ORIGIN } : {}) });
async function decode(res) { const t = await res.text(); try { return fromCrossJSON(JSON.parse(t), { refs: new Map() }); } catch { return { raw: t.slice(0, 200) }; } }
export async function get(id, arg) { const r = await fetch(`${BASE}/_serverFn/${ID[id]}${arg ? "__" + arg : ""}.json`, { headers: hdr() }); const v = await decode(r); return { status: r.status, h: r.headers, v: v.result ?? v }; }
export async function post(id, data) { const r = await fetch(`${BASE}/_serverFn/${ID[id]}`, { method: "POST", headers: { ...hdr(), "content-type": "application/json" }, body: JSON.stringify({ t: toCrossJSON({ data }, { refs: new Map() }), f: 127, m: [] }) /* exact browser wire format */ }); const v = await decode(r); return { status: r.status, h: r.headers, v: v.result ?? v }; }
let fails = 0; const ok = (c, m, extra) => { console.log(`${c ? "PASS" : "FAIL"} ${m}${extra !== undefined ? " " + JSON.stringify(extra).slice(0, 160) : ""}`); if (!c) fails++; };

// live data
for (const [k, a] of [["fetchLivePatches", "en"], ["fetchLiveCatalog", "en"], ["fetchLiveTier", "es"], ["fetchLiveAtelier", "en"], ["fetchLiveHero", "miya"], ["fetchLiveRank"]]) {
  const r = await get(k, a); ok(r.status === 200 && r.h.get("x-tss-serialized") && r.v && typeof r.v === "object", `${k} ${a ?? ""}`, { fetchedAt: r.v?.fetchedAt, source: r.v?.source });
  if (ORIGIN) ok(r.h.get("access-control-allow-origin") === ORIGIN, `${k} CORS`);
}
// traffic
const vid = "e2e-test-" + Date.now().toString(36);
const t0 = await get("fetchTraffic"); const p1 = await post("pingTraffic", { kind: "view", vid }); const p2 = await post("pingTraffic", { kind: "beat", vid });
ok(t0.status === 200 && p1.status === 200 && p1.v.hitsToday === t0.v.hitsToday + 1 && p1.v.uniqueToday >= t0.v.uniqueToday && p2.v.hitsToday === p1.v.hitsToday && p1.v.live >= 1, "traffic counter increments", { t0: t0.v, p1: p1.v });
ok((await post("pingTraffic", { kind: "x", vid })).status === 400, "traffic bad kind -> 400");
// cup (non-destructive)
const cup = await get("fetchCup"); ok(cup.status === 200 && Array.isArray(cup.v.players), "fetchCup", { n: cup.v.players?.length, signupOpen: cup.v.signupOpen, champ: !!cup.v.draw });
ok((await post("unlockCup", { code: "0000" })).v.error === "code", "unlock wrong code rejected");
const un = await post("unlockCup", { code: PIN }); ok(un.v.ok && /^[0-9a-f]{64}$/.test(un.v.token), "unlock host code");
ok((await post("drawCup", { token: "nope" })).v.error === "host", "draw needs host");
ok((await post("leaveCup", { id: "c-x", secret: "abc" })).v.error === "closed", "player self-leave blocked (host only)");
ok((await post("pickCup", { token: "bad", round: 0, index: 0, playerId: "c-x" })).v.error === "host", "pick needs host");
const jc = await post("joinCup", { name: "E2E Tester" }); ok(cup.v.signupOpen ? jc.v.ok : jc.v.error === "closed", "join follows signup window", jc.v);
if (jc.v.ok) await post("leaveCup", { id: jc.v.id, token: un.v.token });
const ring = await get("fetchRing"); ok(ring.status === 200 && typeof ring.v.serverNow === "number", "fetchRing", { n: ring.v.players?.length, spin: !!ring.v.spin });
ok((await post("addRing", { token: "x", name: "zz" })).v.error === "host", "ring add needs host");
ok((await post("startRing", { token: "x" })).v.error === "host", "ring spin needs host");
if (D) {
  const T = un.v.token;
  // ring full flow (requires a fresh/empty board)
  const r0 = await post("resetRing", { token: T }); ok(r0.v.ok, "ring reset");
  ok((await post("startRing", { token: T })).v.error === "short", "ring spin short");
  const names = ["Alpha", "Bravo", "Charlie"]; let last;
  for (const n of names) { last = await post("addRing", { token: PIN, name: n }); ok(last.v.ok, `ring add ${n}`); }
  ok((await post("addRing", { token: T, name: "alpha" })).v.error === "taken", "ring dup name");
  const rm = await post("removeRing", { token: T, id: last.v.board.players[2].id }); ok(rm.v.ok && rm.v.board.players.length === 2, "ring remove");
  const sp = await post("startRing", { token: T }); ok(sp.v.ok && sp.v.board.spin && sp.v.board.spin.duration === 5400, "ring spin", sp.v.board?.spin);
  ok((await post("startRing", { token: T })).v.error === "spinning", "ring spinning guard");
  ok((await post("addRing", { token: T, name: "Late" })).v.error === "sealed", "ring sealed after spin");
  await new Promise((r) => setTimeout(r, 5600));
  ok((await post("startRing", { token: T })).v.error === "sealed", "ring sealed after landing");
  const after = await get("fetchRing"); ok(after.v.spin?.id === sp.v.board.spin.id, "ring persisted");
}
console.log(fails ? `\n${fails} FAILED` : "\nALL PASS"); process.exit(fails ? 1 : 0);
