import fs from "node:fs"; import { fromCrossJSON } from "seroval";
const rd = (id) => fromCrossJSON(JSON.parse(fs.readFileSync(`/workspace/clan-jedi/data/serverfn/${id}.json`)), { refs: new Map() }).result;
const cup = rd("ffe8d52cc03d30ecab5c08432ae4dc20046e0064fd2a3b69fe2dbd71be871e26");
const ring = rd("e8cc3ab3a6dd34b3f7b7400a8006e14cbe2d9b0770ac24950460454ffa27dfaf");
const players = cup.players.map((p) => ({ id: p.id, name: p.name, secret: "" }));
const out = { cup: [cup.cycleKey, JSON.stringify(players), cup.draw ? JSON.stringify(cup.draw) : null, cup.updatedAt], ring: ["live", JSON.stringify(ring.players), ring.spin ? JSON.stringify(ring.spin) : null, ring.spin?.toDeg ?? 0, ring.updatedAt] };
fs.writeFileSync("/tmp/cj-seed.json", JSON.stringify(out));
console.log(cup.cycleKey, cup.players.length, !!cup.draw, cup.updatedAt, ring.players.length, ring.spin?.toDeg, ring.updatedAt);
