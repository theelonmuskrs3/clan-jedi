import { fromCrossJSON } from "seroval";
const r = await fetch(process.argv[2] + "/_serverFn/f89fc7d63b6b20fcd563711bfd9aaa567315b4b218b5b1fd4c5cb44c1bbea21a__en.json", { headers: { origin: "https://theelonmuskrs3.github.io", "x-tsr-serverFn": "true" } });
const v = fromCrossJSON(await r.json(), { refs: new Map() }).result;
const srcs = v.skins.flatMap((s) => s.angles.map((a) => a.src)); console.log(srcs.length, [...new Set(srcs.map((s) => s.split(/[?]/)[0].replace(/[^/]+$/, "")))]);
