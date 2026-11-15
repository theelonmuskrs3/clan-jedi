var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js
var L = ((i) => (i[i.AggregateError = 1] = "AggregateError", i[i.ArrowFunction = 2] = "ArrowFunction", i[i.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", i[i.ObjectAssign = 8] = "ObjectAssign", i[i.BigIntTypedArray = 16] = "BigIntTypedArray", i[i.RegExp = 32] = "RegExp", i))(L || {});
var N = Symbol.asyncIterator;
var fr = Symbol.hasInstance;
var I = Symbol.isConcatSpreadable;
var b = Symbol.iterator;
var Sr = Symbol.match;
var mr = Symbol.matchAll;
var pr = Symbol.replace;
var dr = Symbol.search;
var gr = Symbol.species;
var yr = Symbol.split;
var Nr = Symbol.toPrimitive;
var P = Symbol.toStringTag;
var br = Symbol.unscopables;
var Ce = { [N]: 0, [fr]: 1, [I]: 2, [b]: 3, [Sr]: 4, [mr]: 5, [pr]: 6, [dr]: 7, [gr]: 8, [yr]: 9, [Nr]: 10, [P]: 11, [br]: 12 };
var Xr = { 0: N, 1: fr, 2: I, 3: b, 4: Sr, 5: mr, 6: pr, 7: dr, 8: gr, 9: yr, 10: Nr, 11: P, 12: br };
var o = void 0;
var et = { 2: true, 3: false, 1: o, 0: null, 4: -0, 5: Number.POSITIVE_INFINITY, 6: Number.NEGATIVE_INFINITY, 7: Number.NaN };
var ve = { 0: "Error", 1: "EvalError", 2: "RangeError", 3: "ReferenceError", 4: "SyntaxError", 5: "TypeError", 6: "URIError" };
var rt = { 0: Error, 1: EvalError, 2: RangeError, 3: ReferenceError, 4: SyntaxError, 5: TypeError, 6: URIError };
function c(e, r, t, n, a, s, i, u, l, g, S, d) {
  return { t: e, i: r, s: t, c: n, m: a, p: s, e: i, a: u, f: l, b: g, o: S, l: d };
}
__name(c, "c");
function D(e) {
  return c(2, o, e, o, o, o, o, o, o, o, o, o);
}
__name(D, "D");
var Z = D(2);
var $ = D(3);
var Ae = D(1);
var Re = D(0);
var tt = D(4);
var nt = D(5);
var ot = D(6);
var at = D(7);
function sn(e) {
  switch (e) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case `
`:
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return o;
  }
}
__name(sn, "sn");
function y(e) {
  let r = "", t = 0, n;
  for (let a = 0, s = e.length; a < s; a++) n = sn(e[a]), n && (r += e.slice(t, a) + n, t = a + 1);
  return t === 0 ? r = e : r += e.slice(t), r;
}
__name(y, "y");
function un(e) {
  switch (e) {
    case "\\\\":
      return "\\";
    case '\\"':
      return '"';
    case "\\n":
      return `
`;
    case "\\r":
      return "\r";
    case "\\b":
      return "\b";
    case "\\t":
      return "	";
    case "\\f":
      return "\f";
    case "\\x3C":
      return "<";
    case "\\u2028":
      return "\u2028";
    case "\\u2029":
      return "\u2029";
    default:
      return e;
  }
}
__name(un, "un");
function F(e) {
  return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, un);
}
__name(F, "F");
var U = "__SEROVAL_REFS__";
var ce = "$R";
var Ee = `self.${ce}`;
var Cr = /* @__PURE__ */ new Map();
var j = /* @__PURE__ */ new Map();
function vr(e) {
  return Cr.has(e);
}
__name(vr, "vr");
function fn(e) {
  return j.has(e);
}
__name(fn, "fn");
function st(e) {
  if (vr(e)) return Cr.get(e);
  throw new Ie(e);
}
__name(st, "st");
function it(e) {
  if (fn(e)) return j.get(e);
  throw new Pe(e);
}
__name(it, "it");
typeof globalThis < "u" ? Object.defineProperty(globalThis, U, { value: j, configurable: true, writable: false, enumerable: false }) : typeof window < "u" ? Object.defineProperty(window, U, { value: j, configurable: true, writable: false, enumerable: false }) : typeof self < "u" ? Object.defineProperty(self, U, { value: j, configurable: true, writable: false, enumerable: false }) : typeof global < "u" && Object.defineProperty(global, U, { value: j, configurable: true, writable: false, enumerable: false });
function xe(e) {
  return e instanceof EvalError ? 1 : e instanceof RangeError ? 2 : e instanceof ReferenceError ? 3 : e instanceof SyntaxError ? 4 : e instanceof TypeError ? 5 : e instanceof URIError ? 6 : 0;
}
__name(xe, "xe");
function Sn(e) {
  let r = ve[xe(e)];
  return e.name !== r ? { name: e.name } : e.constructor.name !== r ? { name: e.constructor.name } : {};
}
__name(Sn, "Sn");
function q(e, r) {
  let t = Sn(e), n = Object.getOwnPropertyNames(e);
  for (let a = 0, s = n.length, i; a < s; a++) i = n[a], i !== "name" && i !== "message" && (i === "stack" ? r & 4 && (t = t || {}, t[i] = e[i]) : (t = t || {}, t[i] = e[i]));
  return t;
}
__name(q, "q");
function Te(e) {
  return Object.isFrozen(e) ? 3 : Object.isSealed(e) ? 2 : Object.isExtensible(e) ? 0 : 1;
}
__name(Te, "Te");
function Oe(e) {
  switch (e) {
    case Number.POSITIVE_INFINITY:
      return nt;
    case Number.NEGATIVE_INFINITY:
      return ot;
  }
  return e !== e ? at : Object.is(e, -0) ? tt : c(0, o, e, o, o, o, o, o, o, o, o, o);
}
__name(Oe, "Oe");
function X(e) {
  return c(1, o, y(e), o, o, o, o, o, o, o, o, o);
}
__name(X, "X");
function we(e) {
  return c(3, o, "" + e, o, o, o, o, o, o, o, o, o);
}
__name(we, "we");
function lt(e) {
  return c(4, e, o, o, o, o, o, o, o, o, o, o);
}
__name(lt, "lt");
function he(e, r) {
  let t = r.valueOf();
  return c(5, e, t !== t ? "" : r.toISOString(), o, o, o, o, o, o, o, o, o);
}
__name(he, "he");
function ze(e, r) {
  return c(6, e, o, y(r.source), r.flags, o, o, o, o, o, o, o);
}
__name(ze, "ze");
function ct(e, r) {
  return c(17, e, Ce[r], o, o, o, o, o, o, o, o, o);
}
__name(ct, "ct");
function ft(e, r) {
  return c(18, e, y(st(r)), o, o, o, o, o, o, o, o, o);
}
__name(ft, "ft");
function fe(e, r, t) {
  return c(25, e, t, y(r), o, o, o, o, o, o, o, o);
}
__name(fe, "fe");
function _e(e, r, t) {
  return c(9, e, o, o, o, o, o, t, o, o, Te(r), o);
}
__name(_e, "_e");
function ke(e, r) {
  return c(21, e, o, o, o, o, o, o, r, o, o, o);
}
__name(ke, "ke");
function De(e, r, t) {
  return c(15, e, o, r.constructor.name, o, o, o, o, t, r.byteOffset, o, r.length);
}
__name(De, "De");
function Fe(e, r, t) {
  return c(16, e, o, r.constructor.name, o, o, o, o, t, r.byteOffset, o, r.byteLength);
}
__name(Fe, "Fe");
function Be(e, r, t) {
  return c(20, e, o, o, o, o, o, o, t, r.byteOffset, o, r.byteLength);
}
__name(Be, "Be");
function Me(e, r, t) {
  return c(13, e, xe(r), o, y(r.message), t, o, o, o, o, o, o);
}
__name(Me, "Me");
function Ve(e, r, t) {
  return c(14, e, xe(r), o, y(r.message), t, o, o, o, o, o, o);
}
__name(Ve, "Ve");
function Le(e, r) {
  return c(7, e, o, o, o, o, o, r, o, o, o, o);
}
__name(Le, "Le");
function Ue(e, r) {
  return c(28, o, o, o, o, o, o, [e, r], o, o, o, o);
}
__name(Ue, "Ue");
function je(e, r) {
  return c(30, o, o, o, o, o, o, [e, r], o, o, o, o);
}
__name(je, "je");
function Ye(e, r, t) {
  return c(31, e, o, o, o, o, o, t, r, o, o, o);
}
__name(Ye, "Ye");
function We(e, r) {
  return c(32, e, o, o, o, o, o, o, r, o, o, o);
}
__name(We, "We");
function Ge(e, r) {
  return c(33, e, o, o, o, o, o, o, r, o, o, o);
}
__name(Ge, "Ge");
function Ke(e, r) {
  return c(34, e, o, o, o, o, o, o, r, o, o, o);
}
__name(Ke, "Ke");
var { toString: us } = Object.prototype;
var mn = { parsing: 1, serialization: 2, deserialization: 3 };
function pn(e) {
  return `Seroval Error (step: ${mn[e]})`;
}
__name(pn, "pn");
var dn = /* @__PURE__ */ __name((e, r) => pn(e), "dn");
var Se = class extends Error {
  static {
    __name(this, "Se");
  }
  constructor(t, n) {
    super(dn(t, n)), this.cause = n;
  }
};
var z = class extends Se {
  static {
    __name(this, "z");
  }
  constructor(r) {
    super("parsing", r);
  }
};
var He = class extends Se {
  static {
    __name(this, "He");
  }
  constructor(r) {
    super("deserialization", r);
  }
};
function _(e) {
  return `Seroval Error (specific: ${e})`;
}
__name(_, "_");
var x = class extends Error {
  static {
    __name(this, "x");
  }
  constructor(t) {
    super(_(1)), this.value = t;
  }
};
var O = class extends Error {
  static {
    __name(this, "O");
  }
  constructor(r) {
    super(_(2));
  }
};
var Q = class extends Error {
  static {
    __name(this, "Q");
  }
  constructor(r) {
    super(_(3));
  }
};
var B = class extends Error {
  static {
    __name(this, "B");
  }
  constructor(r) {
    super(_(4));
  }
};
var Ie = class extends Error {
  static {
    __name(this, "Ie");
  }
  constructor(t) {
    super(_(5)), this.value = t;
  }
};
var Pe = class extends Error {
  static {
    __name(this, "Pe");
  }
  constructor(r) {
    super(_(6));
  }
};
var Je = class extends Error {
  static {
    __name(this, "Je");
  }
  constructor(r) {
    super(_(7));
  }
};
var w = class extends Error {
  static {
    __name(this, "w");
  }
  constructor(r) {
    super(_(8));
  }
};
var ee = class extends Error {
  static {
    __name(this, "ee");
  }
  constructor(r) {
    super(_(9));
  }
};
var Y = class {
  static {
    __name(this, "Y");
  }
  constructor(r, t) {
    this.value = r, this.replacement = t;
  }
};
var re = /* @__PURE__ */ __name(() => {
  let e = { p: 0, s: 0, f: 0 };
  return e.p = new Promise((r, t) => {
    e.s = r, e.f = t;
  }), e;
}, "re");
var gn = /* @__PURE__ */ __name((e, r) => {
  e.s(r), e.p.s = 1, e.p.v = r;
}, "gn");
var yn = /* @__PURE__ */ __name((e, r) => {
  e.f(r), e.p.s = 2, e.p.v = r;
}, "yn");
var mt = re.toString();
var pt = gn.toString();
var dt = yn.toString();
var Rr = /* @__PURE__ */ __name(() => {
  let e = [], r = [], t = true, n = false, a = 0, s = /* @__PURE__ */ __name((l, g, S) => {
    for (S = 0; S < a; S++) r[S] && r[S][g](l);
  }, "s"), i = /* @__PURE__ */ __name((l, g, S, d) => {
    for (g = 0, S = e.length; g < S; g++) d = e[g], !t && g === S - 1 ? l[n ? "return" : "throw"](d) : l.next(d);
  }, "i"), u = /* @__PURE__ */ __name((l, g) => (t && (g = a++, r[g] = l), i(l), () => {
    t && (r[g] = r[a], r[a--] = void 0);
  }), "u");
  return { __SEROVAL_STREAM__: true, on: /* @__PURE__ */ __name((l) => u(l), "on"), next: /* @__PURE__ */ __name((l) => {
    t && (e.push(l), s(l, "next"));
  }, "next"), throw: /* @__PURE__ */ __name((l) => {
    t && (e.push(l), s(l, "throw"), t = false, n = false, r.length = 0);
  }, "throw"), return: /* @__PURE__ */ __name((l) => {
    t && (e.push(l), s(l, "return"), t = false, n = true, r.length = 0);
  }, "return") };
}, "Rr");
var gt = Rr.toString();
var Er = /* @__PURE__ */ __name((e) => (r) => () => {
  let t = 0, n = { [e]: () => n, next: /* @__PURE__ */ __name(() => {
    if (t > r.d) return { done: true, value: void 0 };
    let a = t++, s = r.v[a];
    if (a === r.t) throw s;
    return { done: a === r.d, value: s };
  }, "next") };
  return n;
}, "Er");
var yt = Er.toString();
var Ir = /* @__PURE__ */ __name((e, r) => (t) => () => {
  let n = 0, a = -1, s = false, i = [], u = [], l = /* @__PURE__ */ __name((S = 0, d = u.length) => {
    for (; S < d; S++) u[S].s({ done: true, value: void 0 });
  }, "l");
  t.on({ next: /* @__PURE__ */ __name((S) => {
    let d = u.shift();
    d && d.s({ done: false, value: S }), i.push(S);
  }, "next"), throw: /* @__PURE__ */ __name((S) => {
    let d = u.shift();
    d && d.f(S), l(), a = i.length, s = true, i.push(S);
  }, "throw"), return: /* @__PURE__ */ __name((S) => {
    let d = u.shift();
    d && d.s({ done: true, value: S }), l(), a = i.length, i.push(S);
  }, "return") });
  let g = { [e]: () => g, next: /* @__PURE__ */ __name(() => {
    if (a === -1) {
      let H = n++;
      if (H >= i.length) {
        let $r = r();
        return u.push($r), $r.p;
      }
      return { done: false, value: i[H] };
    }
    if (n > a) return { done: true, value: void 0 };
    let S = n++, d = i[S];
    if (S !== a) return { done: false, value: d };
    if (s) throw d;
    return { done: true, value: d };
  }, "next") };
  return g;
}, "Ir");
var Nt = Ir.toString();
var Pr = /* @__PURE__ */ __name((e) => {
  let r = atob(e), t = r.length, n = new Uint8Array(t);
  for (let a = 0; a < t; a++) n[a] = r.charCodeAt(a);
  return n.buffer;
}, "Pr");
var bt = Pr.toString();
var Ct = {};
var vt = {};
var At = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };
function M(e) {
  return "__SEROVAL_STREAM__" in e;
}
__name(M, "M");
function te() {
  return Rr();
}
__name(te, "te");
function Ze(e) {
  let r = te(), t = e[N]();
  async function n() {
    try {
      let a = await t.next();
      a.done ? r.return(a.value) : (r.next(a.value), await n());
    } catch (a) {
      r.throw(a);
    }
  }
  __name(n, "n");
  return n().catch(() => {
  }), r;
}
__name(Ze, "Ze");
var Nn = Ir(N, re);
function Et(e) {
  return Nn(e);
}
__name(Et, "Et");
function $e(e) {
  let r = [], t = -1, n = -1, a = e[b]();
  for (; ; ) try {
    let s = a.next();
    if (r.push(s.value), s.done) {
      n = r.length - 1;
      break;
    }
  } catch (s) {
    t = r.length, r.push(s);
  }
  return { v: r, t, d: n };
}
__name($e, "$e");
var bn = Er(b);
function It(e) {
  return bn(e);
}
__name(It, "It");
function pe(e, r) {
  return { plugins: r.plugins, mode: e, marked: /* @__PURE__ */ new Set(), features: 63 ^ (r.disabledFeatures || 0), refs: r.refs || /* @__PURE__ */ new Map(), depthLimit: r.depthLimit || 1e3 };
}
__name(pe, "pe");
function de(e, r) {
  e.marked.add(r);
}
__name(de, "de");
function Tr(e, r) {
  let t = e.refs.size;
  return e.refs.set(r, t), t;
}
__name(Tr, "Tr");
function qe(e, r) {
  let t = e.refs.get(r);
  return t != null ? (de(e, t), { type: 1, value: lt(t) }) : { type: 0, value: Tr(e, r) };
}
__name(qe, "qe");
function W(e, r) {
  let t = qe(e, r);
  return t.type === 1 ? t : vr(r) ? { type: 2, value: ft(t.value, r) } : t;
}
__name(W, "W");
function E(e, r) {
  let t = W(e, r);
  if (t.type !== 0) return t.value;
  if (r in Ce) return ct(t.value, r);
  throw new x(r);
}
__name(E, "E");
function k(e, r) {
  let t = qe(e, At[r]);
  return t.type === 1 ? t.value : c(26, t.value, r, o, o, o, o, o, o, o, o, o);
}
__name(k, "k");
function Xe(e) {
  let r = qe(e, Ct);
  return r.type === 1 ? r.value : c(27, r.value, o, o, o, o, o, o, E(e, b), o, o, o);
}
__name(Xe, "Xe");
function Qe(e) {
  let r = qe(e, vt);
  return r.type === 1 ? r.value : c(29, r.value, o, o, o, o, o, [k(e, 1), E(e, N)], o, o, o, o);
}
__name(Qe, "Qe");
function er(e, r, t, n) {
  return c(t ? 11 : 10, e, o, o, o, n, o, o, o, o, Te(r), o);
}
__name(er, "er");
function rr(e, r, t, n) {
  return c(8, r, o, o, o, o, { k: t, v: n }, o, k(e, 0), o, o, o);
}
__name(rr, "rr");
function xt(e, r, t) {
  return c(22, r, t, o, o, o, o, o, k(e, 1), o, o, o);
}
__name(xt, "xt");
function tr(e, r, t) {
  let n = new Uint8Array(t), a = "";
  for (let s = 0, i = n.length; s < i; s++) a += String.fromCharCode(n[s]);
  return c(19, r, y(btoa(a)), o, o, o, o, o, k(e, 5), o, o, o);
}
__name(tr, "tr");
var ae = ((t) => (t[t.Vanilla = 1] = "Vanilla", t[t.Cross = 2] = "Cross", t))(ae || {});
function wt(e, r) {
  for (let t = 0, n = r.length; t < n; t++) {
    let a = r[t];
    e.has(a) || (e.add(a), a.extends && wt(e, a.extends));
  }
}
__name(wt, "wt");
function A(e) {
  if (e) {
    let r = /* @__PURE__ */ new Set();
    return wt(r, e), [...r];
  }
}
__name(A, "A");
function ht(e) {
  switch (e) {
    case "Int8Array":
      return Int8Array;
    case "Int16Array":
      return Int16Array;
    case "Int32Array":
      return Int32Array;
    case "Uint8Array":
      return Uint8Array;
    case "Uint16Array":
      return Uint16Array;
    case "Uint32Array":
      return Uint32Array;
    case "Uint8ClampedArray":
      return Uint8ClampedArray;
    case "Float32Array":
      return Float32Array;
    case "Float64Array":
      return Float64Array;
    case "BigInt64Array":
      return BigInt64Array;
    case "BigUint64Array":
      return BigUint64Array;
    default:
      throw new Je(e);
  }
}
__name(ht, "ht");
var Dn = 1e6;
var Fn = 1e4;
var Bn = 2e4;
function _t(e, r) {
  switch (r) {
    case 3:
      return Object.freeze(e);
    case 1:
      return Object.preventExtensions(e);
    case 2:
      return Object.seal(e);
    default:
      return e;
  }
}
__name(_t, "_t");
var Mn = 1e3;
function kt(e, r) {
  var t;
  return { mode: e, plugins: r.plugins, refs: r.refs || /* @__PURE__ */ new Map(), features: (t = r.features) != null ? t : 63 ^ (r.disabledFeatures || 0), depthLimit: r.depthLimit || Mn };
}
__name(kt, "kt");
function Ft(e) {
  return { mode: 2, base: kt(2, e), child: o };
}
__name(Ft, "Ft");
var zr = class {
  static {
    __name(this, "zr");
  }
  constructor(r, t) {
    this._p = r, this.depth = t;
  }
  deserialize(r) {
    return p(this._p, this.depth, r);
  }
};
function Bt(e, r) {
  if (r < 0 || !Number.isFinite(r) || !Number.isInteger(r)) throw new w({ t: 4, i: r });
  if (e.refs.has(r)) throw new Error("Conflicted ref id: " + r);
}
__name(Bt, "Bt");
function Vn(e, r, t) {
  return Bt(e.base, r), e.state.marked.has(r) && e.base.refs.set(r, t), t;
}
__name(Vn, "Vn");
function Ln(e, r, t) {
  return Bt(e.base, r), e.base.refs.set(r, t), t;
}
__name(Ln, "Ln");
function v(e, r, t) {
  return e.mode === 1 ? Vn(e, r, t) : Ln(e, r, t);
}
__name(v, "v");
function _r(e, r, t) {
  if (Object.hasOwn(r, t)) return r[t];
  throw new w(e);
}
__name(_r, "_r");
function Un(e, r) {
  return v(e, r.i, it(F(r.s)));
}
__name(Un, "Un");
function jn(e, r, t) {
  let n = t.a, a = n.length, s = v(e, t.i, new Array(a));
  for (let i = 0, u; i < a; i++) u = n[i], u && (s[i] = p(e, r, u));
  return _t(s, t.o), s;
}
__name(jn, "jn");
function Yn(e) {
  switch (e) {
    case "constructor":
    case "__proto__":
    case "prototype":
    case "__defineGetter__":
    case "__defineSetter__":
    case "__lookupGetter__":
    case "__lookupSetter__":
      return false;
    default:
      return true;
  }
}
__name(Yn, "Yn");
function Wn(e) {
  switch (e) {
    case N:
    case I:
    case P:
    case b:
      return true;
    default:
      return false;
  }
}
__name(Wn, "Wn");
function zt(e, r, t) {
  Yn(r) ? e[r] = t : Object.defineProperty(e, r, { value: t, configurable: true, enumerable: true, writable: true });
}
__name(zt, "zt");
function Gn(e, r, t, n, a) {
  if (typeof n == "string") zt(t, n, p(e, r, a));
  else {
    let s = p(e, r, n);
    switch (typeof s) {
      case "string":
        zt(t, s, p(e, r, a));
        break;
      case "symbol":
        Wn(s) && (t[s] = p(e, r, a));
        break;
      default:
        throw new w(n);
    }
  }
}
__name(Gn, "Gn");
function Mt(e, r, t, n) {
  let a = t.k;
  if (a.length > 0) for (let i = 0, u = t.v, l = a.length; i < l; i++) Gn(e, r, n, a[i], u[i]);
  return n;
}
__name(Mt, "Mt");
function Kn(e, r, t) {
  let n = v(e, t.i, t.t === 10 ? {} : /* @__PURE__ */ Object.create(null));
  return Mt(e, r, t.p, n), _t(n, t.o), n;
}
__name(Kn, "Kn");
function Hn(e, r) {
  return v(e, r.i, new Date(r.s));
}
__name(Hn, "Hn");
function Jn(e, r) {
  if (e.base.features & 32) {
    let t = F(r.c);
    if (t.length > Bn) throw new w(r);
    return v(e, r.i, new RegExp(t, r.m));
  }
  throw new O(r);
}
__name(Jn, "Jn");
function Zn(e, r, t) {
  let n = v(e, t.i, /* @__PURE__ */ new Set());
  for (let a = 0, s = t.a, i = s.length; a < i; a++) n.add(p(e, r, s[a]));
  return n;
}
__name(Zn, "Zn");
function $n(e, r, t) {
  let n = v(e, t.i, /* @__PURE__ */ new Map());
  for (let a = 0, s = t.e.k, i = t.e.v, u = s.length; a < u; a++) n.set(p(e, r, s[a]), p(e, r, i[a]));
  return n;
}
__name($n, "$n");
function qn(e, r) {
  if (r.s.length > Dn) throw new w(r);
  return v(e, r.i, Pr(F(r.s)));
}
__name(qn, "qn");
function Xn(e, r, t) {
  var u;
  let n = ht(t.c), a = p(e, r, t.f), s = (u = t.b) != null ? u : 0;
  if (s < 0 || s > a.byteLength) throw new w(t);
  return v(e, t.i, new n(a, s, t.l));
}
__name(Xn, "Xn");
function Qn(e, r, t) {
  var i;
  let n = p(e, r, t.f), a = (i = t.b) != null ? i : 0;
  if (a < 0 || a > n.byteLength) throw new w(t);
  return v(e, t.i, new DataView(n, a, t.l));
}
__name(Qn, "Qn");
function Vt(e, r, t, n) {
  if (t.p) {
    let a = Mt(e, r, t.p, {});
    Object.defineProperties(n, Object.getOwnPropertyDescriptors(a));
  }
  return n;
}
__name(Vt, "Vt");
function eo(e, r, t) {
  let n = v(e, t.i, new AggregateError([], F(t.m)));
  return Vt(e, r, t, n);
}
__name(eo, "eo");
function ro(e, r, t) {
  let n = _r(t, rt, t.s), a = v(e, t.i, new n(F(t.m)));
  return Vt(e, r, t, a);
}
__name(ro, "ro");
function to(e, r, t) {
  let n = re(), a = v(e, t.i, n.p), s = p(e, r, t.f);
  return t.s ? n.s(s) : n.f(s), a;
}
__name(to, "to");
function no(e, r, t) {
  return v(e, t.i, Object(p(e, r, t.f)));
}
__name(no, "no");
function oo(e, r, t) {
  let n = e.base.plugins;
  if (n) {
    let a = F(t.c);
    for (let s = 0, i = n.length; s < i; s++) {
      let u = n[s];
      if (u.tag === a) return v(e, t.i, u.deserialize(t.s, new zr(e, r), { id: t.i }));
    }
  }
  throw new Q(t.c);
}
__name(oo, "oo");
function ao(e, r) {
  return v(e, r.i, v(e, r.s, re()).p);
}
__name(ao, "ao");
function so(e, r, t) {
  let n = e.base.refs.get(t.i);
  if (n) return n.s(p(e, r, t.a[1])), o;
  throw new B("Promise");
}
__name(so, "so");
function io(e, r, t) {
  let n = e.base.refs.get(t.i);
  if (n) return n.f(p(e, r, t.a[1])), o;
  throw new B("Promise");
}
__name(io, "io");
function uo(e, r, t) {
  p(e, r, t.a[0]);
  let n = p(e, r, t.a[1]);
  return It(n);
}
__name(uo, "uo");
function lo(e, r, t) {
  p(e, r, t.a[0]);
  let n = p(e, r, t.a[1]);
  return Et(n);
}
__name(lo, "lo");
function co(e, r, t) {
  let n = v(e, t.i, te()), a = t.a, s = a.length;
  if (s) for (let i = 0; i < s; i++) p(e, r, a[i]);
  return n;
}
__name(co, "co");
function fo(e, r, t) {
  let n = e.base.refs.get(t.i);
  if (n && M(n)) return n.next(p(e, r, t.f)), o;
  throw new B("Stream");
}
__name(fo, "fo");
function So(e, r, t) {
  let n = e.base.refs.get(t.i);
  if (n && M(n)) return n.throw(p(e, r, t.f)), o;
  throw new B("Stream");
}
__name(So, "So");
function mo(e, r, t) {
  let n = e.base.refs.get(t.i);
  if (n && M(n)) return n.return(p(e, r, t.f)), o;
  throw new B("Stream");
}
__name(mo, "mo");
function po(e, r, t) {
  return p(e, r, t.f), o;
}
__name(po, "po");
function go(e, r, t) {
  return p(e, r, t.a[1]), o;
}
__name(go, "go");
function p(e, r, t) {
  if (r > e.base.depthLimit) throw new ee(e.base.depthLimit);
  switch (r += 1, t.t) {
    case 2:
      return _r(t, et, t.s);
    case 0:
      return Number(t.s);
    case 1:
      return F(String(t.s));
    case 3:
      if (String(t.s).length > Fn) throw new w(t);
      return BigInt(t.s);
    case 4:
      return e.base.refs.get(t.i);
    case 18:
      return Un(e, t);
    case 9:
      return jn(e, r, t);
    case 10:
    case 11:
      return Kn(e, r, t);
    case 5:
      return Hn(e, t);
    case 6:
      return Jn(e, t);
    case 7:
      return Zn(e, r, t);
    case 8:
      return $n(e, r, t);
    case 19:
      return qn(e, t);
    case 16:
    case 15:
      return Xn(e, r, t);
    case 20:
      return Qn(e, r, t);
    case 14:
      return eo(e, r, t);
    case 13:
      return ro(e, r, t);
    case 12:
      return to(e, r, t);
    case 17:
      return _r(t, Xr, t.s);
    case 21:
      return no(e, r, t);
    case 25:
      return oo(e, r, t);
    case 22:
      return ao(e, t);
    case 23:
      return so(e, r, t);
    case 24:
      return io(e, r, t);
    case 28:
      return uo(e, r, t);
    case 30:
      return lo(e, r, t);
    case 31:
      return co(e, r, t);
    case 32:
      return fo(e, r, t);
    case 33:
      return So(e, r, t);
    case 34:
      return mo(e, r, t);
    case 27:
      return po(e, r, t);
    case 29:
      return go(e, r, t);
    default:
      throw new O(t);
  }
}
__name(p, "p");
function nr(e, r) {
  try {
    return p(e, 0, r);
  } catch (t) {
    throw new He(t);
  }
}
__name(nr, "nr");
var yo = /* @__PURE__ */ __name(() => T, "yo");
var No = yo.toString();
var Lt = /=>/.test(No);
var Wt = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
var jt = Wt.length;
var Gt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
var Yt = Gt.length;
function ue(e, r) {
  return { type: 1, base: pe(e, r), child: o };
}
__name(ue, "ue");
var jr = class {
  static {
    __name(this, "jr");
  }
  constructor(r, t) {
    this._p = r, this.depth = t;
  }
  parse(r) {
    return R(this._p, this.depth, r);
  }
};
var Yr = class {
  static {
    __name(this, "Yr");
  }
  constructor(r, t) {
    this._p = r, this.depth = t;
  }
  parse(r) {
    return R(this._p, this.depth, r);
  }
  parseWithError(r) {
    return K(this._p, this.depth, r);
  }
  isAlive() {
    return this._p.state.alive;
  }
  pushPendingState() {
    Jr(this._p);
  }
  popPendingState() {
    be(this._p);
  }
  onParse(r) {
    ie(this._p, r);
  }
  onError(r) {
    Kr(this._p, r);
  }
};
function fa(e, r, t) {
  let n = [];
  for (let a = 0, s = t.length; a < s; a++) a in t ? n[a] = R(e, r, t[a]) : n[a] = 0;
  return n;
}
__name(fa, "fa");
function Sa(e, r, t, n) {
  return _e(t, n, fa(e, r, n));
}
__name(Sa, "Sa");
function Gr(e, r, t) {
  let n = Object.entries(t), a = [], s = [];
  for (let i = 0, u = n.length; i < u; i++) a.push(y(n[i][0])), s.push(R(e, r, n[i][1]));
  return b in t && (a.push(E(e.base, b)), s.push(Ue(Xe(e.base), R(e, r, $e(t))))), N in t && (a.push(E(e.base, N)), s.push(je(Qe(e.base), R(e, r, e.type === 1 ? te() : Ze(t))))), P in t && (a.push(E(e.base, P)), s.push(X(t[P]))), I in t && (a.push(E(e.base, I)), s.push(t[I] ? Z : $)), { k: a, v: s };
}
__name(Gr, "Gr");
function Ur(e, r, t, n, a) {
  return er(t, n, a, Gr(e, r, n));
}
__name(Ur, "Ur");
function ma(e, r, t, n) {
  return ke(t, R(e, r, n.valueOf()));
}
__name(ma, "ma");
function pa(e, r, t, n) {
  return De(t, n, R(e, r, n.buffer));
}
__name(pa, "pa");
function da(e, r, t, n) {
  return Fe(t, n, R(e, r, n.buffer));
}
__name(da, "da");
function ga(e, r, t, n) {
  return Be(t, n, R(e, r, n.buffer));
}
__name(ga, "ga");
function tn(e, r, t, n) {
  let a = q(n, e.base.features);
  return Me(t, n, a ? Gr(e, r, a) : o);
}
__name(tn, "tn");
function ya(e, r, t, n) {
  let a = q(n, e.base.features);
  return Ve(t, n, a ? Gr(e, r, a) : o);
}
__name(ya, "ya");
function Na(e, r, t, n) {
  let a = [], s = [];
  for (let [i, u] of n.entries()) a.push(R(e, r, i)), s.push(R(e, r, u));
  return rr(e.base, t, a, s);
}
__name(Na, "Na");
function ba(e, r, t, n) {
  let a = [];
  for (let s of n.keys()) a.push(R(e, r, s));
  return Le(t, a);
}
__name(ba, "ba");
function Ca(e, r, t, n) {
  let a = Ye(t, k(e.base, 4), []);
  return e.type === 1 || (Jr(e), n.on({ next: /* @__PURE__ */ __name((s) => {
    if (e.state.alive) {
      let i = K(e, r, s);
      i && ie(e, We(t, i));
    }
  }, "next"), throw: /* @__PURE__ */ __name((s) => {
    if (e.state.alive) {
      let i = K(e, r, s);
      i && ie(e, Ge(t, i));
    }
    be(e);
  }, "throw"), return: /* @__PURE__ */ __name((s) => {
    if (e.state.alive) {
      let i = K(e, r, s);
      i && ie(e, Ke(t, i));
    }
    be(e);
  }, "return") })), a;
}
__name(Ca, "Ca");
function va(e, r, t) {
  if (this.state.alive) {
    let n = K(this, r, t);
    n && ie(this, c(23, e, o, o, o, o, o, [k(this.base, 2), n], o, o, o, o)), be(this);
  }
}
__name(va, "va");
function Aa(e, r, t) {
  if (this.state.alive) {
    let n = K(this, r, t);
    n && ie(this, c(24, e, o, o, o, o, o, [k(this.base, 3), n], o, o, o, o));
  }
  be(this);
}
__name(Aa, "Aa");
function Ra(e, r, t, n) {
  let a = Tr(e.base, {});
  return e.type === 2 && (Jr(e), n.then(va.bind(e, a, r), Aa.bind(e, a, r))), xt(e.base, t, a);
}
__name(Ra, "Ra");
function Ea(e, r, t, n, a) {
  for (let s = 0, i = a.length; s < i; s++) {
    let u = a[s];
    if (u.parse.sync && u.test(n)) return fe(t, u.tag, u.parse.sync(n, new jr(e, r), { id: t }));
  }
  return o;
}
__name(Ea, "Ea");
function Ia(e, r, t, n, a) {
  for (let s = 0, i = a.length; s < i; s++) {
    let u = a[s];
    if (u.parse.stream && u.test(n)) return fe(t, u.tag, u.parse.stream(n, new Yr(e, r), { id: t }));
  }
  return o;
}
__name(Ia, "Ia");
function nn(e, r, t, n) {
  let a = e.base.plugins;
  return a ? e.type === 1 ? Ea(e, r, t, n, a) : Ia(e, r, t, n, a) : o;
}
__name(nn, "nn");
function Pa(e, r, t, n, a) {
  switch (a) {
    case Object:
      return Ur(e, r, t, n, false);
    case o:
      return Ur(e, r, t, n, true);
    case Date:
      return he(t, n);
    case Error:
    case EvalError:
    case RangeError:
    case ReferenceError:
    case SyntaxError:
    case TypeError:
    case URIError:
      return tn(e, r, t, n);
    case Number:
    case Boolean:
    case String:
    case BigInt:
      return ma(e, r, t, n);
    case ArrayBuffer:
      return tr(e.base, t, n);
    case Int8Array:
    case Int16Array:
    case Int32Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case Uint8ClampedArray:
    case Float32Array:
    case Float64Array:
      return pa(e, r, t, n);
    case DataView:
      return ga(e, r, t, n);
    case Map:
      return Na(e, r, t, n);
    case Set:
      return ba(e, r, t, n);
    default:
      break;
  }
  if (a === Promise || n instanceof Promise) return Ra(e, r, t, n);
  let s = e.base.features;
  if (s & 32 && a === RegExp) return ze(t, n);
  if (s & 16) switch (a) {
    case BigInt64Array:
    case BigUint64Array:
      return da(e, r, t, n);
    default:
      break;
  }
  if (s & 1 && typeof AggregateError < "u" && (a === AggregateError || n instanceof AggregateError)) return ya(e, r, t, n);
  if (n instanceof Error) return tn(e, r, t, n);
  if (b in n || N in n) return Ur(e, r, t, n, !!a);
  throw new x(n);
}
__name(Pa, "Pa");
function xa(e, r, t, n) {
  if (Array.isArray(n)) return Sa(e, r, t, n);
  if (M(n)) return Ca(e, r, t, n);
  let a = n.constructor;
  return a === Y ? R(e, r, n.replacement) : nn(e, r, t, n) || Pa(e, r, t, n, a);
}
__name(xa, "xa");
function Ta(e, r, t) {
  let n = W(e.base, t);
  if (n.type !== 0) return n.value;
  let a = nn(e, r, n.value, t);
  if (a) return a;
  throw new x(t);
}
__name(Ta, "Ta");
function R(e, r, t) {
  if (r >= e.base.depthLimit) throw new ee(e.base.depthLimit);
  switch (typeof t) {
    case "boolean":
      return t ? Z : $;
    case "undefined":
      return Ae;
    case "string":
      return X(t);
    case "number":
      return Oe(t);
    case "bigint":
      return we(t);
    case "object": {
      if (t) {
        let n = W(e.base, t);
        return n.type === 0 ? xa(e, r + 1, n.value, t) : n.value;
      }
      return Re;
    }
    case "symbol":
      return E(e.base, t);
    case "function":
      return Ta(e, r, t);
    default:
      throw new x(t);
  }
}
__name(R, "R");
function le(e, r) {
  try {
    return R(e, 0, r);
  } catch (t) {
    throw t instanceof z ? t : new z(t);
  }
}
__name(le, "le");
function ie(e, r) {
  e.state.initial ? e.state.buffer.push(r) : Hr(e, r, false);
}
__name(ie, "ie");
function Kr(e, r) {
  if (e.state.onError) e.state.onError(r);
  else throw r instanceof z ? r : new z(r);
}
__name(Kr, "Kr");
function on(e) {
  e.state.onDone && e.state.onDone();
}
__name(on, "on");
function Hr(e, r, t) {
  try {
    e.state.onParse(r, t);
  } catch (n) {
    Kr(e, n);
  }
}
__name(Hr, "Hr");
function Jr(e) {
  e.state.pending++;
}
__name(Jr, "Jr");
function be(e) {
  --e.state.pending <= 0 && on(e);
}
__name(be, "be");
function K(e, r, t) {
  try {
    return R(e, r, t);
  } catch (n) {
    return Kr(e, n), o;
  }
}
__name(K, "K");
function Ji(e, r = {}) {
  let t = A(r.plugins), n = ue(2, { plugins: t, disabledFeatures: r.disabledFeatures, refs: r.refs });
  return le(n, e);
}
__name(Ji, "Ji");
function qi(e, r) {
  let t = A(r.plugins), n = Ft({ plugins: t, refs: r.refs, features: r.features, disabledFeatures: r.disabledFeatures });
  return nr(n, e);
}
__name(qi, "qi");
var CUP_ROLES = ["Mage", "Fighter", "Marksman", "Assassin"];
function nextPow2(n) {
  let p2 = 1;
  for (; p2 < n; ) p2 *= 2;
  return p2;
}
__name(nextPow2, "nextPow2");
function seedOrder(size) {
  let slots = [1, 2], n = 2;
  for (; n < size; ) {
    n *= 2;
    let next = [];
    for (let s of slots)
      next.push(s), next.push(n + 1 - s);
    slots = next;
  }
  return slots;
}
__name(seedOrder, "seedOrder");
function shuffle(list, rng) {
  let out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    let j2 = Math.floor(rng() * (i + 1)), t = out[i];
    out[i] = out[j2], out[j2] = t;
  }
  return out;
}
__name(shuffle, "shuffle");
function roundName(c2) {
  return c2 <= 1 ? "final" : c2 === 2 ? "semi" : c2 === 4 ? "quarter" : c2 === 8 ? "r16" : "r32";
}
__name(roundName, "roundName");
function buildBracket(ids, method = "random", rng = Math.random) {
  let ranked = method === "entry" ? [...ids] : shuffle(ids, rng), size = nextPow2(ranked.length), slots = Array(size).fill(null);
  if (method === "blind") ranked.forEach((id, i) => {
    slots[i] = id;
  });
  else {
    let positions = seedOrder(size);
    ranked.forEach((id, i) => {
      let at2 = positions.indexOf(i + 1);
      at2 >= 0 && (slots[at2] = id);
    });
  }
  let sides = slots.map((id) => id ? { kind: "player", id } : { kind: "open" }), rounds = [], n = 1;
  for (; sides.length >= 2; ) {
    let matches = [];
    for (let i = 0; i < sides.length; i += 2) {
      let a = sides[i], b2 = sides[i + 1], aOpen = a.kind === "open", bOpen = b2.kind === "open", bye = aOpen && !bOpen || !aOpen && bOpen, code = bye ? "" : `M${n++}`, games = bye ? [] : [0, 1, 2].map(() => CUP_ROLES[Math.floor(rng() * CUP_ROLES.length)]);
      matches.push({ code, round: rounds.length, a, b: b2, bye, games });
    }
    if (rounds.push({ name: roundName(matches.length), matches }), sides.length === 2) break;
    let next = [];
    for (let m of matches)
      m.bye ? next.push(m.a.kind === "open" ? m.b : m.a) : next.push({ kind: "winner", code: m.code });
    sides = next;
  }
  return { order: ranked, rounds };
}
__name(buildBracket, "buildBracket");
function applyCupWinner(rounds, round, index, playerId) {
  let match = rounds[round]?.matches[index];
  if (!match || match.bye || !(match.a.kind === "player" && match.a.id === playerId || match.b.kind === "player" && match.b.id === playerId) || match.winnerId === playerId) return false;
  match.winnerId && clearCupFrom(rounds, round, index), match.winnerId = playerId;
  let nextR = round + 1;
  if (nextR < rounds.length) {
    let next = rounds[nextR].matches[Math.floor(index / 2)];
    if (next) {
      let slot = index % 2 === 0 ? "a" : "b";
      next[slot] = { kind: "player", id: playerId };
    }
  }
  return true;
}
__name(applyCupWinner, "applyCupWinner");
function clearCupFrom(rounds, round, index) {
  let match = rounds[round]?.matches[index];
  if (!match?.winnerId) return;
  let id = match.winnerId, nextR = round + 1;
  if (nextR < rounds.length) {
    let nextIndex = Math.floor(index / 2), next = rounds[nextR].matches[nextIndex], slot = index % 2 === 0 ? "a" : "b";
    next && next[slot].kind === "player" && next[slot].id === id && (next.winnerId === id && clearCupFrom(rounds, nextR, nextIndex), next[slot] = { kind: "winner", code: match.code });
  }
  match.winnerId = null;
}
__name(clearCupFrom, "clearCupFrom");
var TZ = "America/New_York";
var ANCHOR = { y: 2026, m: 11, d: 1, h: 20, min: 0 };
var pad = /* @__PURE__ */ __name((n) => String(n).padStart(2, "0"), "pad");
function etParts(ms) {
  let f = new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }), p2 = Object.fromEntries(f.formatToParts(new Date(ms)).map((x2) => [x2.type, x2.value]));
  return { y: +p2.year, m: +p2.month, d: +p2.day, h: +p2.hour, min: +p2.minute };
}
__name(etParts, "etParts");
function etMs(y2, m, d, h, min) {
  let c2 = [Date.parse(`${y2}-${pad(m)}-${pad(d)}T${pad(h)}:${pad(min)}:00-04:00`), Date.parse(`${y2}-${pad(m)}-${pad(d)}T${pad(h)}:${pad(min)}:00-05:00`)];
  for (let o2 of c2) {
    if (!Number.isFinite(o2)) continue;
    let a = etParts(o2);
    if (a.y === y2 && a.m === m && a.d === d && a.h === h && a.min === min) return o2;
  }
  return c2[0];
}
__name(etMs, "etMs");
function addDays(y2, m, d, n) {
  let t = new Date(Date.UTC(y2, m - 1, d + n));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}
__name(addDays, "addDays");
function cycleStartMs(i) {
  let t = addDays(ANCHOR.y, ANCHOR.m, ANCHOR.d, i * 90);
  return etMs(t.y, t.m, t.d, ANCHOR.h, ANCHOR.min);
}
__name(cycleStartMs, "cycleStartMs");
function cycleIndexAt(now) {
  let i = 0;
  for (; cycleStartMs(i + 1) <= now; ) i += 1;
  return i;
}
__name(cycleIndexAt, "cycleIndexAt");
function giveawayClock(now) {
  let index = cycleIndexAt(now), round1 = cycleStartMs(index);
  return { index, cycleKey: new Date(round1).toISOString(), round1 };
}
__name(giveawayClock, "giveawayClock");
function wrapDeg(d) {
  return (d % 360 + 360) % 360;
}
__name(wrapDeg, "wrapDeg");
function sliceCenter(index, count) {
  let n = Math.max(1, count);
  return index * 360 / n;
}
__name(sliceCenter, "sliceCenter");
function landingRotation(current, index, count, turns, jitterUnit) {
  let n = Math.max(1, count), slice = 360 / n, targetMod = wrapDeg(-sliceCenter(index, n)), currentMod = wrapDeg(current), delta = wrapDeg(targetMod - currentMod), jitter = Math.max(-0.22, Math.min(0.22, jitterUnit)) * slice;
  return current + turns * 360 + delta - jitter;
}
__name(landingRotation, "landingRotation");
var heroes_min_default = [{ id: "miya", name: "Miya" }, { id: "balmond", name: "Balmond" }, { id: "saber", name: "Saber" }, { id: "alice", name: "Alice" }, { id: "nana", name: "Nana" }, { id: "tigreal", name: "Tigreal" }, { id: "alucard", name: "Alucard" }, { id: "karina", name: "Karina" }, { id: "akai", name: "Akai" }, { id: "franco", name: "Franco" }, { id: "bane", name: "Bane" }, { id: "bruno", name: "Bruno" }, { id: "clint", name: "Clint" }, { id: "rafaela", name: "Rafaela" }, { id: "eudora", name: "Eudora" }, { id: "zilong", name: "Zilong" }, { id: "fanny", name: "Fanny" }, { id: "layla", name: "Layla" }, { id: "minotaur", name: "Minotaur" }, { id: "lolita", name: "Lolita" }, { id: "hayabusa", name: "Hayabusa" }, { id: "freya", name: "Freya" }, { id: "gord", name: "Gord" }, { id: "natalia", name: "Natalia" }, { id: "kagura", name: "Kagura" }, { id: "chou", name: "Chou" }, { id: "sun", name: "Sun" }, { id: "alpha", name: "Alpha" }, { id: "ruby", name: "Ruby" }, { id: "yi-sun-shin", name: "Yi Sun-shin" }, { id: "moskov", name: "Moskov" }, { id: "johnson", name: "Johnson" }, { id: "cyclops", name: "Cyclops" }, { id: "estes", name: "Estes" }, { id: "hilda", name: "Hilda" }, { id: "aurora", name: "Aurora" }, { id: "lapu-lapu", name: "Lapu-Lapu" }, { id: "vexana", name: "Vexana" }, { id: "roger", name: "Roger" }, { id: "karrie", name: "Karrie" }, { id: "gatotkaca", name: "Gatotkaca" }, { id: "harley", name: "Harley" }, { id: "irithel", name: "Irithel" }, { id: "grock", name: "Grock" }, { id: "argus", name: "Argus" }, { id: "odette", name: "Odette" }, { id: "lancelot", name: "Lancelot" }, { id: "diggie", name: "Diggie" }, { id: "hylos", name: "Hylos" }, { id: "zhask", name: "Zhask" }, { id: "helcurt", name: "Helcurt" }, { id: "pharsa", name: "Pharsa" }, { id: "lesley", name: "Lesley" }, { id: "jawhead", name: "Jawhead" }, { id: "angela", name: "Angela" }, { id: "gusion", name: "Gusion" }, { id: "valir", name: "Valir" }, { id: "martis", name: "Martis" }, { id: "uranus", name: "Uranus" }, { id: "hanabi", name: "Hanabi" }, { id: "chang-e", name: "Chang'e" }, { id: "kaja", name: "Kaja" }, { id: "selena", name: "Selena" }, { id: "aldous", name: "Aldous" }, { id: "claude", name: "Claude" }, { id: "vale", name: "Vale" }, { id: "leomord", name: "Leomord" }, { id: "lunox", name: "Lunox" }, { id: "hanzo", name: "Hanzo" }, { id: "belerick", name: "Belerick" }, { id: "kimmy", name: "Kimmy" }, { id: "thamuz", name: "Thamuz" }, { id: "harith", name: "Harith" }, { id: "minsitthar", name: "Minsitthar" }, { id: "kadita", name: "Kadita" }, { id: "faramis", name: "Faramis" }, { id: "badang", name: "Badang" }, { id: "khufra", name: "Khufra" }, { id: "granger", name: "Granger" }, { id: "guinevere", name: "Guinevere" }, { id: "esmeralda", name: "Esmeralda" }, { id: "terizla", name: "Terizla" }, { id: "x-borg", name: "X.Borg" }, { id: "ling", name: "Ling" }, { id: "dyrroth", name: "Dyrroth" }, { id: "lylia", name: "Lylia" }, { id: "baxia", name: "Baxia" }, { id: "masha", name: "Masha" }, { id: "wanwan", name: "Wanwan" }, { id: "silvanna", name: "Silvanna" }, { id: "cecilion", name: "Cecilion" }, { id: "carmilla", name: "Carmilla" }, { id: "atlas", name: "Atlas" }, { id: "popol-and-kupa", name: "Popol and Kupa" }, { id: "yu-zhong", name: "Yu Zhong" }, { id: "luo-yi", name: "Luo Yi" }, { id: "benedetta", name: "Benedetta" }, { id: "khaleed", name: "Khaleed" }, { id: "barats", name: "Barats" }, { id: "brody", name: "Brody" }, { id: "yve", name: "Yve" }, { id: "mathilda", name: "Mathilda" }, { id: "paquito", name: "Paquito" }, { id: "gloo", name: "Gloo" }, { id: "beatrix", name: "Beatrix" }, { id: "phoveus", name: "Phoveus" }, { id: "natan", name: "Natan" }, { id: "aulus", name: "Aulus" }, { id: "aamon", name: "Aamon" }, { id: "valentina", name: "Valentina" }, { id: "edith", name: "Edith" }, { id: "floryn", name: "Floryn" }, { id: "yin", name: "Yin" }, { id: "melissa", name: "Melissa" }, { id: "xavier", name: "Xavier" }, { id: "julian", name: "Julian" }, { id: "fredrinn", name: "Fredrinn" }, { id: "joy", name: "Joy" }, { id: "novaria", name: "Novaria" }, { id: "arlott", name: "Arlott" }, { id: "ixia", name: "Ixia" }, { id: "nolan", name: "Nolan" }, { id: "cici", name: "Cici" }, { id: "chip", name: "Chip" }, { id: "zhuxin", name: "Zhuxin" }, { id: "suyou", name: "Suyou" }, { id: "lukas", name: "Lukas" }, { id: "kalea", name: "Kalea" }, { id: "zetian", name: "Zetian" }, { id: "obsidia", name: "Obsidia" }, { id: "sora", name: "Sora" }, { id: "marcel", name: "Marcel" }, { id: "hirara", name: "Hirara" }];
var items_min_default = [{ id: "boots", name: "Boots", tier: 1, category: "Movement" }, { id: "warrior-boots", name: "Warrior Boots", tier: 2, category: "Movement" }, { id: "tough-boots", name: "Tough Boots", tier: 2, category: "Movement" }, { id: "swift-boots", name: "Swift Boots", tier: 2, category: "Movement" }, { id: "rapid-boots", name: "Rapid Boots", tier: 2, category: "Movement" }, { id: "arcane-boots", name: "Arcane Boots", tier: 2, category: "Movement" }, { id: "magic-shoes", name: "Magic Shoes", tier: 2, category: "Movement" }, { id: "demon-shoes", name: "Demon Shoes", tier: 2, category: "Movement" }, { id: "sea-halberd", name: "Sea Halberd", tier: 3, category: "Attack" }, { id: "blade-of-despair", name: "Blade of Despair", tier: 3, category: "Attack" }, { id: "berserkers-fury", name: "Berserker's Fury", tier: 3, category: "Attack" }, { id: "haas-claws", name: "Haas's Claws", tier: 3, category: "Attack" }, { id: "endless-battle", name: "Endless Battle", tier: 3, category: "Attack" }, { id: "hunter-strike", name: "Hunter Strike", tier: 3, category: "Attack" }, { id: "blade-of-the-heptaseas", name: "Blade of the Heptaseas", tier: 3, category: "Attack" }, { id: "demon-hunter-sword", name: "Demon Hunter Sword", tier: 3, category: "Attack" }, { id: "golden-staff", name: "Golden Staff", tier: 3, category: "Attack" }, { id: "corrosion-scythe", name: "Corrosion Scythe", tier: 3, category: "Attack" }, { id: "windtalker", name: "Windtalker", tier: 3, category: "Attack" }, { id: "malefic-roar", name: "Malefic Roar", tier: 3, category: "Attack" }, { id: "malefic-gun", name: "Malefic Gun", tier: 3, category: "Attack" }, { id: "war-axe", name: "War Axe", tier: 3, category: "Attack" }, { id: "rose-gold-meteor", name: "Rose Gold Meteor", tier: 3, category: "Attack" }, { id: "wind-of-nature", name: "Wind of Nature", tier: 3, category: "Attack" }, { id: "winter-crown", name: "Winter Crown", tier: 3, category: "Attack" }, { id: "sky-piercer", name: "Sky Piercer", tier: 3, category: "Attack" }, { id: "great-dragon-spear", name: "Great Dragon Spear", tier: 3, category: "Attack" }, { id: "fleeting-time", name: "Fleeting Time", tier: 3, category: "Attack" }, { id: "magic-blade", name: "Magic Blade", tier: 2, category: "Attack" }, { id: "legion-sword", name: "Legion Sword", tier: 2, category: "Attack" }, { id: "fury-hammer", name: "Fury Hammer", tier: 2, category: "Attack" }, { id: "swift-crossbow", name: "Swift Crossbow", tier: 2, category: "Attack" }, { id: "vampire-mallet", name: "Vampire Mallet", tier: 1, category: "Attack" }, { id: "dagger", name: "Dagger", tier: 1, category: "Attack" }, { id: "knife", name: "Knife", tier: 1, category: "Attack" }, { id: "javelin", name: "Javelin", tier: 1, category: "Attack" }, { id: "regular-spear", name: "Regular Spear", tier: 2, category: "Attack" }, { id: "ogre-tomahawk", name: "Ogre Tomahawk", tier: 2, category: "Attack" }, { id: "rogue-meteor", name: "Rogue Meteor", tier: 2, category: "Attack" }, { id: "expert-gloves", name: "Expert Gloves", tier: 2, category: "Attack" }, { id: "iron-hunting-bow", name: "Iron Hunting Bow", tier: 1, category: "Attack" }, { id: "glowing-wand", name: "Glowing Wand", tier: 3, category: "Magic" }, { id: "divine-glaive", name: "Divine Glaive", tier: 3, category: "Magic" }, { id: "holy-crystal", name: "Holy Crystal", tier: 3, category: "Magic" }, { id: "blood-wings", name: "Blood Wings", tier: 3, category: "Magic" }, { id: "lightning-truncheon", name: "Lightning Truncheon", tier: 3, category: "Magic" }, { id: "clock-of-destiny", name: "Clock of Destiny", tier: 3, category: "Magic" }, { id: "concentrated-energy", name: "Concentrated Energy", tier: 3, category: "Magic" }, { id: "enchanted-talisman", name: "Enchanted Talisman", tier: 3, category: "Magic" }, { id: "ice-queen-wand", name: "Ice Queen Wand", tier: 3, category: "Magic" }, { id: "genius-wand", name: "Genius Wand", tier: 3, category: "Magic" }, { id: "feather-of-heaven", name: "Feather of Heaven", tier: 3, category: "Magic" }, { id: "starlium-scythe", name: "Starlium Scythe", tier: 3, category: "Magic" }, { id: "flask-of-the-oasis", name: "Flask of the Oasis", tier: 3, category: "Magic" }, { id: "wishing-lantern", name: "Wishing Lantern", tier: 3, category: "Magic" }, { id: "book-of-sages", name: "Book of Sages", tier: 1, category: "Magic" }, { id: "magic-wand", name: "Magic Wand", tier: 2, category: "Magic" }, { id: "elegant-gem", name: "Elegant Gem", tier: 2, category: "Magic" }, { id: "tome-of-evil", name: "Tome of Evil", tier: 2, category: "Magic" }, { id: "exotic-veil", name: "Exotic Veil", tier: 2, category: "Magic" }, { id: "azure-blade", name: "Azure Blade", tier: 2, category: "Magic" }, { id: "mystery-codex", name: "Mystery Codex", tier: 1, category: "Magic" }, { id: "power-crystal", name: "Power Crystal", tier: 1, category: "Magic" }, { id: "antique-cuirass", name: "Antique Cuirass", tier: 3, category: "Defense" }, { id: "athenas-shield", name: "Athena's Shield", tier: 3, category: "Defense" }, { id: "blade-armor", name: "Blade Armor", tier: 3, category: "Defense" }, { id: "dominance-ice", name: "Dominance Ice", tier: 3, category: "Defense" }, { id: "immortality", name: "Immortality", tier: 3, category: "Defense" }, { id: "guardian-helmet", name: "Guardian Helmet", tier: 3, category: "Defense" }, { id: "oracle", name: "Oracle", tier: 3, category: "Defense" }, { id: "queens-wings", name: "Queen's Wings", tier: 3, category: "Defense" }, { id: "radiant-armor", name: "Radiant Armor", tier: 3, category: "Defense" }, { id: "thunder-belt", name: "Thunder Belt", tier: 3, category: "Defense" }, { id: "brute-force-breastplate", name: "Brute Force Breastplate", tier: 3, category: "Defense" }, { id: "cursed-helmet", name: "Cursed Helmet", tier: 3, category: "Defense" }, { id: "chastise-pauldron", name: "Chastise Pauldron", tier: 3, category: "Defense" }, { id: "ares-belt", name: "Ares Belt", tier: 2, category: "Defense" }, { id: "dreadnaught-armor", name: "Dreadnaught Armor", tier: 2, category: "Defense" }, { id: "silence-robe", name: "Silence Robe", tier: 2, category: "Defense" }, { id: "steel-legplates", name: "Steel Legplates", tier: 2, category: "Defense" }, { id: "black-ice-shield", name: "Black Ice Shield", tier: 2, category: "Defense" }, { id: "molten-essence", name: "Molten Essence", tier: 2, category: "Defense" }, { id: "leather-jerkin", name: "Leather Jerkin", tier: 1, category: "Defense" }, { id: "magic-resist-cloak", name: "Magic Resist Cloak", tier: 1, category: "Defense" }, { id: "vitality-crystal", name: "Vitality Crystal", tier: 1, category: "Defense" }, { id: "hero-ring", name: "Hero's Ring", tier: 1, category: "Defense" }, { id: "flame-retribution", name: "Flame Retribution", tier: 2, category: "Jungling" }, { id: "ice-retribution", name: "Ice Retribution", tier: 2, category: "Jungling" }, { id: "bloody-retribution", name: "Bloody Retribution", tier: 2, category: "Jungling" }, { id: "encourage", name: "Encourage", tier: 2, category: "Roaming" }, { id: "conceal", name: "Conceal", tier: 2, category: "Roaming" }, { id: "favor", name: "Favor", tier: 2, category: "Roaming" }, { id: "dire-hit", name: "Dire Hit", tier: 2, category: "Roaming" }];
var official_ids_default = { miya: 1, balmond: 2, saber: 3, alice: 4, nana: 5, tigreal: 6, alucard: 7, karina: 8, akai: 9, franco: 10, bane: 11, bruno: 12, clint: 13, rafaela: 14, eudora: 15, zilong: 16, fanny: 17, layla: 18, minotaur: 19, lolita: 20, hayabusa: 21, freya: 22, gord: 23, natalia: 24, kagura: 25, chou: 26, sun: 27, alpha: 28, ruby: 29, "yi-sun-shin": 30, moskov: 31, johnson: 32, cyclops: 33, estes: 34, hilda: 35, aurora: 36, "lapu-lapu": 37, vexana: 38, roger: 39, karrie: 40, gatotkaca: 41, harley: 42, irithel: 43, grock: 44, argus: 45, odette: 46, lancelot: 47, diggie: 48, hylos: 49, zhask: 50, helcurt: 51, pharsa: 52, lesley: 53, jawhead: 54, angela: 55, gusion: 56, valir: 57, martis: 58, uranus: 59, hanabi: 60, "chang-e": 61, kaja: 62, selena: 63, aldous: 64, claude: 65, vale: 66, leomord: 67, lunox: 68, hanzo: 69, belerick: 70, kimmy: 71, thamuz: 72, harith: 73, minsitthar: 74, kadita: 75, faramis: 76, badang: 77, khufra: 78, granger: 79, guinevere: 80, esmeralda: 81, terizla: 82, "x-borg": 83, ling: 84, dyrroth: 85, lylia: 86, baxia: 87, masha: 88, wanwan: 89, silvanna: 90, cecilion: 91, carmilla: 92, atlas: 93, "popol-and-kupa": 94, "yu-zhong": 95, "luo-yi": 96, benedetta: 97, khaleed: 98, barats: 99, brody: 100, yve: 101, mathilda: 102, paquito: 103, gloo: 104, beatrix: 105, phoveus: 106, natan: 107, aulus: 108, aamon: 109, valentina: 110, edith: 111, floryn: 112, yin: 113, melissa: 114, xavier: 115, julian: 116, fredrinn: 117, joy: 118, novaria: 119, arlott: 120, ixia: 121, nolan: 122, cici: 123, chip: 124, zhuxin: null, suyou: null, lukas: null, kalea: null, zetian: null, obsidia: null, sora: null, marcel: null, hirara: null };
var gear_names_default = { "Corrosion Scythe": "corrosion-scythe", "Swift Boots": "swift-boots", "Demon Hunter Sword": "demon-hunter-sword", "Golden Staff": "golden-staff", "Haas' Claws": "haas'-claws", "Malefic Roar": "malefic-roar", "Cursed Helmet": "cursed-helmet", "Warrior Boots": "warrior-boots", "War Axe": "war-axe", "Bloodlust Axe": "war-axe", "Queen's Wings": "queens-wings", "Brute Force Breastplate": "brute-force-breastplate", "Blade of the Heptaseas": "blade-of-the-heptaseas", "Ice Hunter's Magic Boots": "ice-hunter's-magic-boots", "Endless Battle": "endless-battle", "Blade of Despair": "blade-of-despair", "Hunter Strike": "hunter-strike", Immortality: "immortality", "Clock of Destiny": "clock-of-destiny", "Demon Boots": "demon-boots", "Ice Queen Wand": "ice-queen-wand", "Dominance Ice": "dominance-ice", Oracle: "oracle", "Glowing Wand": "glowing-wand", "Enchanted Talisman": "enchanted-talisman", "Magic Boots": "magic-boots", "Genius Wand": "genius-wand", "Holy Crystal": "holy-crystal", "Divine Glaive": "divine-glaive", "Blood Wings": "blood-wings", "Athena's Shield": "athenas-shield", "Warrior Boots - Conceal": "warrior-boots", "Antique Cuirass": "antique-cuirass", "Starlium Scythe": "starlium-scythe", "Ice Hunter's Arcane Boots": "arcane-boots", "Concentrated Energy": "concentrated-energy", "Guardian Helmet": "guardian-helmet", "Thunder Belt": "thunder-belt", "Rapid Boots- Conceal": "rapid-boots", "Berserker's Fury": "berserkers-fury", "Great Dragon Spear": "great-dragon-spear", "Rose Gold Meteor": "rose-gold-meteor", "Demon Boots - Favor": "demon-boots---favor", "Necklace of Durance": "glowing-wand", "Lightning Truncheon": "lightning-truncheon", "Arcane Boots": "arcane-boots", "Fleeting Time": "fleeting-time", "Flame Hunter's Warrior Boots": "warrior-boots", Windtalker: "windtalker", "Warrior Boots - Favor": "warrior-boots", "Warrior Boots - Encourage": "warrior-boots", "Flame Hunter's Magic Boots": "flame-hunter's-magic-boots", "Ice Hunter's Rapid Boots": "rapid-boots", "Blade Armor": "blade-armor", "Magic Boots - Favor": "magic-boots---favor", "Twilight Armor": "chastise-pauldron", "Ice Hunter's Swift Boots": "swift-boots", "Tough Boots - Dire Hit": "tough-boots", "Feather of Heaven": "feather-of-heaven", "Tough Boots - Encourage": "tough-boots", "Radiant Armor": "radiant-armor", "Magic Boots - Encourage": "magic-boots---encourage", "Flame Hunter's Swift Boots": "swift-boots", "Tough Boots": "tough-boots", "Flame Hunter's Demon Boots": "flame-hunter's-demon-boots", "Magic Boots - Conceal": "magic-boots---conceal", "Arcane Boots - Favor": "arcane-boots", "Lantern of Hope": "lantern-of-hope" };
var ID = {
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
  resetRing: "0287e702f917bb3e5c2f7302ebcc7251e5bd98869b9792176975cb99c2578d4f"
};
var GH_ORIGIN = "https://theelonmuskrs3.github.io";
var ALLOWED_ORIGINS = /* @__PURE__ */ new Set([GH_ORIGIN, "https://clan-jedi.pages.dev"]);
var UA = "ClanJediCounter/1.0 (MLBB draft companion; https://x.ai)";
var TTL = 720 * 1e3;
var RANK_TTL = 864e5;
var RANK_RETRY = 18e5;
var HOST_CODE = "";
var SPIN_MS = 5400;
var RING_MAX = 8;
var RING_ROW = "live";
var BadInput = class extends Error {
  static {
    __name(this, "BadInput");
  }
};
var hex = /* @__PURE__ */ __name((bytes) => [...bytes].map((b2) => b2.toString(16).padStart(2, "0")).join(""), "hex");
var randomHex = /* @__PURE__ */ __name((n) => hex(crypto.getRandomValues(new Uint8Array(n))), "randomHex");
function randomInt(min, max) {
  let range = max - min;
  if (range <= 0) return min;
  let lim = Math.floor(4294967296 / range) * range, buf = new Uint32Array(1);
  for (; ; )
    if (crypto.getRandomValues(buf), buf[0] < lim) return min + buf[0] % range;
}
__name(randomInt, "randomInt");
function same(a, b2) {
  if (a == null || b2 == null) return false;
  let x2 = new TextEncoder().encode(String(a)), y2 = new TextEncoder().encode(String(b2));
  if (x2.length !== y2.length) return false;
  let d = 0;
  for (let i = 0; i < x2.length; i++) d |= x2[i] ^ y2[i];
  return d === 0;
}
__name(same, "same");
async function hmacHex(alg, key, msg) {
  let k2 = await crypto.subtle.importKey("raw", new TextEncoder().encode(key), { name: "HMAC", hash: alg }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k2, new TextEncoder().encode(msg)));
}
__name(hmacHex, "hmacHex");
var HOST_TOKEN = null;
var HOST_TOKEN_FOR = null;
async function hostToken() {
  return HOST_CODE ? (HOST_TOKEN_FOR !== HOST_CODE && (HOST_TOKEN = hex(await hmacHex("SHA-256", "clan-jedi-cup-host", HOST_CODE)), HOST_TOKEN_FOR = HOST_CODE), HOST_TOKEN) : null;
}
__name(hostToken, "hostToken");
var nowIso = /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "nowIso");
var clone = /* @__PURE__ */ __name((v2) => JSON.parse(JSON.stringify(v2)), "clone");
function jsonbOrder(v2) {
  if (Array.isArray(v2)) return v2.map(jsonbOrder);
  if (v2 && typeof v2 == "object") {
    let out = {};
    for (let k2 of Object.keys(v2).sort((a, b2) => a.length - b2.length || (a < b2 ? -1 : a > b2 ? 1 : 0))) out[k2] = jsonbOrder(v2[k2]);
    return out;
  }
  return v2;
}
__name(jsonbOrder, "jsonbOrder");
function findHero(name) {
  let n = String(name || "");
  return heroes_min_default.find((h) => h.id === n) || heroes_min_default.find((h) => h.name.toLowerCase() === n.toLowerCase());
}
__name(findHero, "findHero");
var str = /* @__PURE__ */ __name((v2, min, max, trim = false) => {
  if (typeof v2 != "string") throw new BadInput("expected string");
  let s = trim ? v2.trim() : v2;
  if (s.length < min || s.length > max) throw new BadInput("bad length");
  return s;
}, "str");
var int = /* @__PURE__ */ __name((v2, min, max) => {
  if (!Number.isInteger(v2) || v2 < min || v2 > max) throw new BadInput("bad int");
  return v2;
}, "int");
var optStr = /* @__PURE__ */ __name((v2, max) => v2 === void 0 ? void 0 : str(v2, 0, max), "optStr");
var locale = /* @__PURE__ */ __name((d) => {
  if (d?.locale !== "en" && d?.locale !== "es") throw new BadInput("locale");
  return d.locale;
}, "locale");
var schemaReady = null;
function ensureSchema(env) {
  return schemaReady || (schemaReady = env.DB.batch([
    env.DB.prepare("create table if not exists traffic_day (day text not null, visitor_id text not null, ip_hash text not null, hits integer not null default 1, first_at text not null, last_at text not null, primary key (day, visitor_id))"),
    env.DB.prepare("create index if not exists traffic_day_ip on traffic_day (day, ip_hash)"),
    env.DB.prepare("create table if not exists traffic_live (visitor_id text primary key, ip_hash text not null, last_beat integer not null)"),
    env.DB.prepare("create index if not exists traffic_live_beat on traffic_live (last_beat)"),
    env.DB.prepare("create table if not exists cup_board (cycle_key text primary key, players text not null default '[]', draw text, updated_at text not null)"),
    env.DB.prepare("create table if not exists ring_board (id text primary key, players text not null default '[]', spin text, rest_deg real not null default 0, updated_at text not null)"),
    env.DB.prepare("create table if not exists live_cache (key text primary key, at integer not null, body text not null)")
  ]).catch((e) => {
    throw schemaReady = null, e;
  })), schemaReady;
}
__name(ensureSchema, "ensureSchema");
var SALT = "clan-jedi-traffic-v1";
var VID = /^[a-z0-9-]{8,64}$/i;
function etDay() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(/* @__PURE__ */ new Date());
}
__name(etDay, "etDay");
function normalizeIp(raw) {
  let ip = raw.trim().toLowerCase();
  return !ip || (ip.startsWith("[") && ip.includes("]") && (ip = ip.slice(1, ip.indexOf("]"))), ip = ip.replace(/^::ffff:/, ""), /^\d{1,3}(\.\d{1,3}){3}:\d+$/.test(ip) && (ip = ip.replace(/:\d+$/, "")), ["unknown", "127.0.0.1", "::1", "0.0.0.0", "localhost"].includes(ip)) || /^(10\.|192\.168\.|127\.|169\.254\.|0\.)/.test(ip) || /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) || /^(fc|fd|fe80)/.test(ip) ? null : ip;
}
__name(normalizeIp, "normalizeIp");
function clientIp(req) {
  let h = req.headers, parts = [h.get("cf-connecting-ip"), h.get("true-client-ip"), h.get("x-real-ip"), ...(h.get("x-vercel-forwarded-for") ?? "").split(","), ...(h.get("x-forwarded-for") ?? "").split(",")];
  for (let p2 of parts) {
    let n = p2 ? normalizeIp(p2) : null;
    if (n) return n;
  }
  return "unknown";
}
__name(clientIp, "clientIp");
async function hashIp(ip) {
  let buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${SALT}|${ip}`));
  return hex(new Uint8Array(buf)).slice(0, 32);
}
__name(hashIp, "hashIp");
async function readStats(env) {
  let day = etDay(), [u, h, l] = await env.DB.batch([
    env.DB.prepare("select count(*) as n from traffic_day where day = ?").bind(day),
    env.DB.prepare("select coalesce(sum(hits), 0) as n from traffic_day where day = ?").bind(day),
    env.DB.prepare("select count(*) as n from traffic_live where last_beat > ?").bind(Date.now() - 9e4)
  ]);
  return { day, uniqueToday: u.results[0]?.n ?? 0, hitsToday: h.results[0]?.n ?? 0, live: l.results[0]?.n ?? 0 };
}
__name(readStats, "readStats");
async function pingTraffic(env, data, req) {
  if (data?.kind !== "view" && data?.kind !== "beat") throw new BadInput("kind");
  if (typeof data.vid != "string" || !VID.test(data.vid)) throw new BadInput("vid");
  let vid = data.vid.toLowerCase(), ipHash = await hashIp(clientIp(req)), day = etDay(), hit = data.kind === "view" ? 1 : 0, now = Date.now(), iso = new Date(now).toISOString(), locked = (await env.DB.prepare("select ip_hash from traffic_day where day = ? and visitor_id = ? limit 1").bind(day, vid).first())?.ip_hash ?? ipHash;
  return await env.DB.batch([
    env.DB.prepare("insert into traffic_day (day, visitor_id, ip_hash, hits, first_at, last_at) values (?, ?, ?, ?, ?, ?) on conflict (day, visitor_id) do update set hits = traffic_day.hits + excluded.hits, last_at = excluded.last_at").bind(day, vid, locked, hit, iso, iso),
    env.DB.prepare("insert into traffic_live (visitor_id, ip_hash, last_beat) values (?, ?, ?) on conflict (visitor_id) do update set last_beat = excluded.last_beat, ip_hash = excluded.ip_hash").bind(vid, locked, now),
    env.DB.prepare("delete from traffic_live where last_beat < ?").bind(now - 5 * 6e4)
  ]), readStats(env);
}
__name(pingTraffic, "pingTraffic");
var cupMemo = null;
function asStored(value) {
  let raw = typeof value == "string" ? JSON.parse(value) : value;
  return Array.isArray(raw) ? raw.flatMap((row) => {
    if (!row || typeof row != "object") return [];
    let id = typeof row.id == "string" ? row.id : "", name = typeof row.name == "string" ? row.name : "", secret = typeof row.secret == "string" ? row.secret : "";
    return id && name ? [{ id, name: name.slice(0, 18), secret }] : [];
  }) : [];
}
__name(asStored, "asStored");
function asDraw(value) {
  let raw = typeof value == "string" ? jsonbOrder(JSON.parse(value)) : value;
  return !raw || typeof raw != "object" || !("rounds" in raw) ? null : Array.isArray(raw.rounds) ? { rounds: raw.rounds } : null;
}
__name(asDraw, "asDraw");
function cycleNow() {
  let c2 = giveawayClock(Date.now());
  return { key: c2.cycleKey, open: Date.now() < c2.round1 };
}
__name(cycleNow, "cycleNow");
async function cupRow(env, key) {
  return env.DB.prepare("select players, draw, updated_at from cup_board where cycle_key = ? limit 1").bind(key).first();
}
__name(cupRow, "cupRow");
async function cupEnsure(env, key) {
  await env.DB.prepare("insert into cup_board (cycle_key, players, draw, updated_at) values (?, '[]', null, ?) on conflict (cycle_key) do nothing").bind(key, nowIso()).run();
}
__name(cupEnsure, "cupEnsure");
function cupPresent(key, row, signupClock) {
  let draw = row ? asDraw(row.draw) : null, stored = row ? asStored(row.players) : [];
  return { cycleKey: key, players: stored.map(({ id, name }) => ({ id, name })), draw, signupOpen: signupClock && !draw, updatedAt: row?.updated_at ? new Date(row.updated_at).toISOString() : (/* @__PURE__ */ new Date(0)).toISOString() };
}
__name(cupPresent, "cupPresent");
async function loadCup(env) {
  let { key, open } = cycleNow();
  if (cupMemo && cupMemo.key === key && Date.now() - cupMemo.at < 5e3) return { ...cupMemo.data, signupOpen: open && !cupMemo.data.draw };
  await cupEnsure(env, key);
  let data = cupPresent(key, await cupRow(env, key), open);
  return cupMemo = { key, at: Date.now(), data }, data;
}
__name(loadCup, "loadCup");
var championId = /* @__PURE__ */ __name((draw) => draw?.rounds.at(-1)?.matches[0]?.winnerId ?? null, "championId");
async function cupSave(env, key, players, draw) {
  cupMemo = null, await env.DB.prepare("update cup_board set players = ?, draw = ?, updated_at = ? where cycle_key = ?").bind(JSON.stringify(players), draw ? JSON.stringify(draw) : null, nowIso(), key).run();
}
__name(cupSave, "cupSave");
async function cupSaveDraw(env, key, draw) {
  cupMemo = null, await env.DB.prepare("update cup_board set draw = ?, updated_at = ? where cycle_key = ?").bind(JSON.stringify(draw), nowIso(), key).run();
}
__name(cupSaveDraw, "cupSaveDraw");
async function joinCup(env, data) {
  let name = str(data?.name, 1, 18, true), { key, open } = cycleNow();
  await cupEnsure(env, key);
  let row = await cupRow(env, key), stored = asStored(row?.players), draw = row ? asDraw(row.draw) : null;
  if (!open || draw) return { ok: false, error: "closed" };
  let clean = name.trim();
  if (stored.length >= 8) return { ok: false, error: "full" };
  if (stored.some((p2) => p2.name.toLowerCase() === clean.toLowerCase())) return { ok: false, error: "taken" };
  let id = `c-${randomHex(4)}`, secret = randomHex(8), players = [...stored, { id, name: clean, secret }];
  return await cupSave(env, key, players, null), { ok: true, id, secret, board: cupPresent(key, { players, draw: null, updated_at: nowIso() }, true) };
}
__name(joinCup, "joinCup");
async function leaveCup(env, data) {
  let id = str(data?.id, 1, 40);
  optStr(data?.secret, 40);
  let token = optStr(data?.token, 1e6), { key, open } = cycleNow();
  await cupEnsure(env, key);
  let row = await cupRow(env, key), stored = asStored(row?.players);
  if (!(!!token && same(token, await hostToken()))) return { ok: false, error: "closed" };
  let players = stored.filter((p2) => p2.id !== id);
  return await cupSave(env, key, players, null), { ok: true, board: cupPresent(key, { players, draw: null, updated_at: nowIso() }, open) };
}
__name(leaveCup, "leaveCup");
async function unlockCup(env, data) {
  let code = str(data?.code, 0, 12), digits = code.replace(/\D/g, "");
  return !HOST_CODE || digits !== HOST_CODE && code.trim() !== HOST_CODE ? { ok: false, error: "code" } : { ok: true, token: await hostToken() };
}
__name(unlockCup, "unlockCup");
async function drawCup(env, data) {
  let token = str(data?.token, 0, 1e6);
  if (!same(token, await hostToken())) return { ok: false, error: "host" };
  let board = await loadCup(env);
  if (championId(board.draw)) return { ok: false, error: "sealed" };
  if (board.players.length < 2) return { ok: false, error: "short" };
  let draw = { rounds: buildBracket(board.players.map((p2) => p2.id), "random").rounds };
  return await cupSaveDraw(env, board.cycleKey, draw), { ok: true, board: { ...board, draw, signupOpen: false, updatedAt: nowIso() } };
}
__name(drawCup, "drawCup");
async function pickCup(env, data) {
  let token = str(data?.token, 0, 1e6), round = int(data?.round, 0, 8), index = int(data?.index, 0, 16), playerId = str(data?.playerId, 1, 40);
  if (!same(token, await hostToken())) return { ok: false, error: "host" };
  let board = await loadCup(env);
  if (championId(board.draw)) return { ok: false, error: "sealed" };
  if (!board.draw) return { ok: false, error: "host" };
  let rounds = clone(board.draw.rounds);
  if (!applyCupWinner(rounds, round, index, playerId)) return { ok: false, error: "host" };
  let draw = { rounds };
  return await cupSaveDraw(env, board.cycleKey, draw), { ok: true, board: { ...board, draw, updatedAt: nowIso() } };
}
__name(pickCup, "pickCup");
function asPlayers(value) {
  let raw = typeof value == "string" ? JSON.parse(value) : value;
  return Array.isArray(raw) ? raw.flatMap((row) => {
    if (!row || typeof row != "object") return [];
    let id = typeof row.id == "string" ? row.id : "", name = typeof row.name == "string" ? row.name : "";
    return id && name ? [{ id, name: name.slice(0, 18) }] : [];
  }) : [];
}
__name(asPlayers, "asPlayers");
function asSpin(value) {
  let raw = typeof value == "string" ? JSON.parse(value) : value;
  if (!raw || typeof raw != "object") return null;
  let s = raw;
  return typeof s.id != "string" || typeof s.winnerName != "string" || typeof s.startedAt != "number" || typeof s.toDeg != "number" ? null : { id: s.id, startedAt: s.startedAt, duration: typeof s.duration == "number" ? s.duration : SPIN_MS, fromDeg: typeof s.fromDeg == "number" ? s.fromDeg : 0, toDeg: s.toDeg, winnerIndex: typeof s.winnerIndex == "number" ? s.winnerIndex : 0, winnerId: typeof s.winnerId == "string" ? s.winnerId : "", winnerName: s.winnerName };
}
__name(asSpin, "asSpin");
function ringPresent(row) {
  return { players: row ? asPlayers(row.players) : [], spin: row ? asSpin(row.spin) : null, serverNow: Date.now(), updatedAt: row?.updated_at ? new Date(row.updated_at).toISOString() : (/* @__PURE__ */ new Date(0)).toISOString() };
}
__name(ringPresent, "ringPresent");
async function ringRow(env) {
  return await env.DB.prepare("insert into ring_board (id, players, spin, rest_deg, updated_at) values (?, '[]', null, 0, ?) on conflict (id) do nothing").bind(RING_ROW, nowIso()).run(), env.DB.prepare("select players, spin, rest_deg, updated_at from ring_board where id = ? limit 1").bind(RING_ROW).first();
}
__name(ringRow, "ringRow");
var spinning = /* @__PURE__ */ __name((spin) => !!spin && Date.now() < spin.startedAt + spin.duration, "spinning");
async function hostOk(token) {
  return HOST_CODE ? token.replace(/\D/g, "") === HOST_CODE ? true : same(token, await hostToken()) : false;
}
__name(hostOk, "hostOk");
async function addRing(env, data) {
  let token = str(data?.token, 0, 1e6), name = str(data?.name, 1, 18, true);
  if (!await hostOk(token)) return { ok: false, error: "host" };
  let row = await ringRow(env), players = asPlayers(row?.players), spin = asSpin(row?.spin);
  if (spinning(spin) || spin) return { ok: false, error: "sealed" };
  let clean = name.trim().slice(0, 18);
  if (!clean) return { ok: false, error: "host" };
  if (players.length >= RING_MAX) return { ok: false, error: "full" };
  if (players.some((p2) => p2.name.toLowerCase() === clean.toLowerCase())) return { ok: false, error: "taken" };
  let next = [...players, { id: `r-${randomHex(4)}`, name: clean }];
  return await env.DB.prepare("update ring_board set players = ?, updated_at = ? where id = ?").bind(JSON.stringify(next), nowIso(), RING_ROW).run(), { ok: true, board: ringPresent({ players: next, spin: row?.spin ?? null, rest_deg: row?.rest_deg ?? 0, updated_at: nowIso() }) };
}
__name(addRing, "addRing");
async function removeRing(env, data) {
  let token = str(data?.token, 0, 1e6), id = str(data?.id, 1, 40);
  if (!await hostOk(token)) return { ok: false, error: "host" };
  let row = await ringRow(env), spin = asSpin(row?.spin);
  if (spinning(spin) || spin) return { ok: false, error: "sealed" };
  let players = asPlayers(row?.players).filter((p2) => p2.id !== id);
  return await env.DB.prepare("update ring_board set players = ?, updated_at = ? where id = ?").bind(JSON.stringify(players), nowIso(), RING_ROW).run(), { ok: true, board: ringPresent({ players, spin: row?.spin ?? null, rest_deg: row?.rest_deg ?? 0, updated_at: nowIso() }) };
}
__name(removeRing, "removeRing");
async function startRing(env, data) {
  let token = str(data?.token, 0, 1e6);
  if (!await hostOk(token)) return { ok: false, error: "host" };
  let row = await ringRow(env), players = asPlayers(row?.players), spin = asSpin(row?.spin);
  if (players.length < 2) return { ok: false, error: "short" };
  if (spinning(spin)) return { ok: false, error: "spinning" };
  if (spin) return { ok: false, error: "sealed" };
  let winnerIndex = randomInt(0, players.length), fromDeg = Number(row?.rest_deg ?? 0), toDeg = Math.round(landingRotation(fromDeg, winnerIndex, players.length, 7, Math.random() * 2 - 1) * 10) / 10, winner = players[winnerIndex], next = { id: randomHex(6), startedAt: Date.now(), duration: SPIN_MS, fromDeg, toDeg, winnerIndex, winnerId: winner.id, winnerName: winner.name };
  return await env.DB.prepare("update ring_board set spin = ?, rest_deg = ?, updated_at = ? where id = ?").bind(JSON.stringify(next), toDeg, nowIso(), RING_ROW).run(), { ok: true, board: ringPresent({ players, spin: next, rest_deg: toDeg, updated_at: nowIso() }) };
}
__name(startRing, "startRing");
async function resetRing(env, data) {
  let token = str(data?.token, 0, 1e6);
  if (!await hostOk(token)) return { ok: false, error: "host" };
  let row = await ringRow(env);
  return spinning(asSpin(row?.spin)) ? { ok: false, error: "spinning" } : (await env.DB.prepare("update ring_board set players = '[]', spin = null, updated_at = ? where id = ?").bind(nowIso(), RING_ROW).run(), { ok: true, board: ringPresent({ players: [], spin: null, rest_deg: row?.rest_deg ?? 0, updated_at: nowIso() }) });
}
__name(resetRing, "resetRing");
var memCache = /* @__PURE__ */ new Map();
async function cacheGet(env, key) {
  let m = memCache.get(key);
  if (m) return m;
  let row = await env.DB.prepare("select at, body from live_cache where key = ?").bind(key).first();
  if (!row) return null;
  let v2 = { at: row.at, data: qi(JSON.parse(row.body), { refs: /* @__PURE__ */ new Map() }) };
  return memCache.set(key, v2), v2;
}
__name(cacheGet, "cacheGet");
async function cachePut(env, key, at2, data) {
  memCache.set(key, { at: at2, data }), await env.DB.prepare("insert into live_cache (key, at, body) values (?, ?, ?) on conflict (key) do update set at = excluded.at, body = excluded.body").bind(key, at2, JSON.stringify(Ji(data, { refs: /* @__PURE__ */ new Map() }))).run();
}
__name(cachePut, "cachePut");
async function snapshot(env, reqUrl, id, arg) {
  let path = `/_serverFn/${id}${arg ? `__${arg}` : ""}.json`, res = await env.ASSETS.fetch(new URL(path, reqUrl).toString());
  if (!res.ok) throw new Error(`no snapshot ${path}`);
  return qi(await res.json(), { refs: /* @__PURE__ */ new Map() }).result;
}
__name(snapshot, "snapshot");
async function cached(env, ctx, key, ttl, build, fallback) {
  let hit = await cacheGet(env, key);
  if (hit && Date.now() - hit.at < ttl) return hit.data;
  try {
    let data = await build();
    return ctx.waitUntil(cachePut(env, key, Date.now(), data).catch(() => {
    })), data;
  } catch {
    return hit ? hit.data : fallback();
  }
}
__name(cached, "cached");
async function fetchJson(url, init = {}) {
  let res = await fetch(url, { ...init, headers: { "User-Agent": UA, accept: "application/json", ...init.headers || {} }, signal: AbortSignal.timeout(9e3) });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}
__name(fetchJson, "fetchJson");
async function wikiFiles(titles) {
  let out = {};
  for (let i = 0; i < titles.length; i += 50) {
    let chunk = titles.slice(i, i + 50), data = await fetchJson("https://mobile-legends.fandom.com/api.php?" + new URLSearchParams({ action: "query", titles: chunk.join("|"), prop: "imageinfo", iiprop: "url", format: "json" }).toString()), norm = {};
    for (let n of data.query?.normalized ?? []) norm[n.to] = n.from;
    for (let page of Object.values(data.query?.pages ?? {})) {
      let url = page.imageinfo?.[0]?.url;
      !url || page.missing !== void 0 || !page.title || (out[norm[page.title] ?? page.title] = url);
    }
  }
  return out;
}
__name(wikiFiles, "wikiFiles");
function wikiTitleOf(url) {
  let m = /^https:\/\/static\.wikia\.nocookie\.net\/mobile-legends\/images\/[0-9a-f]\/[0-9a-f]{2}\/([^/?]+)\/revision\/latest/.exec(url);
  return m ? `File:${decodeURIComponent(m[1]).replace(/_/g, " ")}` : null;
}
__name(wikiTitleOf, "wikiTitleOf");
function withRevision(orig, fresh) {
  let [freshPath, freshQuery] = fresh.split("?"), extraPath = (orig.split("/revision/latest")[1] ?? "").split("?")[0];
  return freshPath + extraPath + (freshQuery ? `?${freshQuery}` : "");
}
__name(withRevision, "withRevision");
async function buildCatalog(env, reqUrl, loc) {
  let snap = await snapshot(env, reqUrl, ID.fetchLiveCatalog, loc), out = clone(snap), maps = ["portraits", "itemIcons", "emblemIcons", "talentIcons", "spellIcons"], titles = /* @__PURE__ */ new Set();
  for (let m of maps) for (let u of Object.values(out[m] ?? {})) {
    let t = wikiTitleOf(u);
    t && titles.add(t);
  }
  let files = await wikiFiles([...titles]);
  if (!Object.keys(files).length) throw new Error("wiki empty");
  for (let m of maps) for (let [k2, u] of Object.entries(out[m] ?? {})) {
    let t = wikiTitleOf(u);
    t && files[t] && (out[m][k2] = withRevision(u, files[t]));
  }
  return out.fetchedAt = nowIso(), out;
}
__name(buildCatalog, "buildCatalog");
async function restamp(env, reqUrl, id, loc) {
  return { ...await snapshot(env, reqUrl, id, loc), fetchedAt: nowIso() };
}
__name(restamp, "restamp");
var GEAR_ALIASES = { "bloodlust axe": "war-axe", "necklace of durance": "glowing-wand", "calamity reaper": "starlium-scythe", "twilight armor": "chastise-pauldron", "winter truncheon": "winter-crown" };
var normName = /* @__PURE__ */ __name((s) => s.toLowerCase().replace(/['’]/g, "").replace(/\./g, ""), "normName");
var GEAR_LIST = items_min_default.filter((i) => i.tier !== 1 && !["boots", "encourage", "conceal", "favor", "dire-hit"].includes(i.id)).map((i) => ({ id: i.id, n: normName(i.name) })).sort((a, b2) => b2.n.length - a.n.length);
function mapEquipName(name) {
  if (gear_names_default[name]) return gear_names_default[name];
  let n = normName(name);
  if (GEAR_ALIASES[n]) return GEAR_ALIASES[n];
  let hit = GEAR_LIST.find((i) => n === i.n) || GEAR_LIST.find((i) => n.includes(i.n));
  return hit ? hit.id : name.toLowerCase().replace(/\s+/g, "-");
}
__name(mapEquipName, "mapEquipName");
async function buildHero(heroId) {
  let official = official_ids_default[heroId];
  if (!official) throw new Error("unknown hero");
  let d = (await fetchJson(`https://mapi.mobilelegends.com/hero/detail?id=${official}`))?.data;
  if (!d || !d.name) throw new Error("mapi empty");
  return {
    heroId,
    officialName: d.name,
    cover: d.cover_picture,
    gallery: d.gallery_picture,
    skills: (d.skill?.skill ?? []).filter((s) => s.name || s.des || s.tips).map((s) => ({ name: s.name, icon: s.icon, des: (s.des || "").replace(/<[^>]+>/g, ""), tips: s.tips })),
    gear: (d.gear?.out_pack ?? []).map((g) => ({ id: mapEquipName(g.equip?.name ?? ""), name: g.equip?.name, icon: g.equip?.icon, des: (g.equip?.des ?? []).join(" ") })),
    source: "Moonton Hero Guide (mapi.mobilelegends.com)"
  };
}
__name(buildHero, "buildHero");
var RANK_APP = "2669606";
var RANK_ACT = "2669607";
var RANK_SOURCE = "2756570";
async function rankBoardRaw() {
  let sign = (await fetchJson(`https://api.gms.moontontech.com/api/act/basev4?_t=${Date.now()}`, { headers: { "x-appid": RANK_APP, "x-actid": RANK_ACT, referer: "https://www.mobilelegends.com/" } })).data?.server?.enigma;
  if (!sign) throw new Error("rank sign unavailable");
  let body = JSON.stringify({ pageSize: 200, pageIndex: 1, filters: [{ field: "bigrank", operator: "eq", value: "101" }, { field: "match_type", operator: "eq", value: 0 }], sorts: [{ data: { field: "main_hero_ban_rate", order: "desc" }, type: "sequence" }], fields: ["main_hero", "main_hero_appearance_rate", "main_hero_ban_rate", "main_hero_win_rate", "main_heroid", "data.sub_hero.heroid", "data.sub_hero.increase_win_rate"] }), path = `/api/gms/source/${RANK_APP}/${RANK_SOURCE}`, sig = btoa(String.fromCharCode(...await hmacHex("SHA-1", sign, ["POST", path, "", body].join(`
`)))), o2 = await fetchJson(`https://api.gms.moontontech.com${path}`, { method: "POST", headers: { "content-type": "application/json;charset=UTF-8", "x-appid": RANK_APP, "x-actid": RANK_ACT, "x-lang": "en", referer: "https://www.mobilelegends.com/", origin: "https://www.mobilelegends.com", authorization: sig }, body });
  if (o2.code !== 0 || !o2.data?.records?.length) throw new Error("rank board empty");
  let heroes = [];
  for (let rec of o2.data.records) {
    let t = rec.data ?? {}, n = t.main_hero?.data?.name;
    if (!n || typeof t.main_heroid != "number") continue;
    let subs = Array.isArray(t.sub_hero) ? t.sub_hero : [];
    heroes.push({ name: n, officialId: t.main_heroid, win: Number(t.main_hero_win_rate) || 0, pick: Number(t.main_hero_appearance_rate) || 0, ban: Number(t.main_hero_ban_rate) || 0, counters: subs.slice(0, 5).map((s) => ({ officialId: Number(s.heroid) || 0, lift: Number(s.increase_win_rate) || 0 })) });
  }
  return { fetchedAt: nowIso(), days: 30, rank: "all", heroes };
}
__name(rankBoardRaw, "rankBoardRaw");
function normalizeRank(t, live) {
  let map = /* @__PURE__ */ new Map();
  for (let h of t.heroes) {
    let f = findHero(h.name);
    f && map.set(h.officialId, { id: f.id, name: f.name });
  }
  let heroes = [];
  for (let e of t.heroes) {
    let f = map.get(e.officialId);
    f && (e.pick < 2e-4 && e.win > 0.95 || heroes.push({
      id: f.id,
      name: f.name,
      officialId: e.officialId,
      winRate: e.win,
      pickRate: e.pick,
      banRate: e.ban,
      counters: e.counters.map((c2) => {
        let x2 = map.get(c2.officialId);
        return !x2 || c2.lift < 0.01 ? null : { id: x2.id, name: x2.name, lift: c2.lift };
      }).filter((c2) => c2 != null).slice(0, 5)
    }));
  }
  return { fetchedAt: t.fetchedAt, days: 30, rank: "all", source: "https://www.mobilelegends.com/rank", live, heroes };
}
__name(normalizeRank, "normalizeRank");
async function refreshRank(env) {
  try {
    let data = normalizeRank(await rankBoardRaw(), true);
    if (data.heroes.length < 40) throw new Error("rank board short");
    return await cachePut(env, "rank", Date.now(), data), data;
  } catch (e) {
    let hit = await cacheGet(env, "rank");
    throw hit && await cachePut(env, "rank", Date.now() - RANK_TTL + RANK_RETRY, hit.data), e;
  }
}
__name(refreshRank, "refreshRank");
async function loadRank(env, ctx, reqUrl) {
  let hit = await cacheGet(env, "rank");
  if (hit && Date.now() - hit.at < RANK_TTL) return hit.data;
  if (hit)
    return ctx.waitUntil(refreshRank(env).catch(() => {
    })), hit.data;
  try {
    return await refreshRank(env);
  } catch {
    let snap = await snapshot(env, reqUrl, ID.fetchLiveRank, "");
    return ctx.waitUntil(cachePut(env, "rank", Date.now() - RANK_TTL + RANK_RETRY, snap).catch(() => {
    })), snap;
  }
}
__name(loadRank, "loadRank");
async function bustLive(env) {
  memCache.clear(), await env.DB.prepare("delete from live_cache").run();
}
__name(bustLive, "bustLive");
function liveHandlers(env, ctx, reqUrl) {
  let patches = /* @__PURE__ */ __name((loc) => cached(env, ctx, `patches:${loc}`, TTL, () => restamp(env, reqUrl, ID.fetchLivePatches, loc), () => snapshot(env, reqUrl, ID.fetchLivePatches, loc)), "patches");
  return {
    [ID.fetchLivePatches]: (d) => patches(locale(d)),
    [ID.fetchLiveCatalog]: (d) => {
      let loc = locale(d);
      return cached(env, ctx, `catalog:${loc}`, TTL, () => buildCatalog(env, reqUrl, loc), () => restamp(env, reqUrl, ID.fetchLiveCatalog, loc));
    },
    [ID.fetchLiveTier]: (d) => {
      let loc = locale(d);
      return cached(env, ctx, `tier:${loc}`, TTL, () => restamp(env, reqUrl, ID.fetchLiveTier, loc), () => snapshot(env, reqUrl, ID.fetchLiveTier, loc));
    },
    [ID.fetchLiveAtelier]: (d) => {
      let loc = locale(d);
      return cached(env, ctx, `atelier:${loc}`, TTL, () => restamp(env, reqUrl, ID.fetchLiveAtelier, loc), () => snapshot(env, reqUrl, ID.fetchLiveAtelier, loc));
    },
    [ID.fetchLiveHero]: (d) => {
      let heroId = str(d?.heroId, 1, 64);
      return cached(env, ctx, `hero:${heroId}`, TTL, () => buildHero(heroId), () => snapshot(env, reqUrl, ID.fetchLiveHero, heroId));
    },
    [ID.fetchLiveRank]: () => loadRank(env, ctx, reqUrl),
    [ID.refreshLive]: async (d) => {
      let loc = locale(d);
      return await bustLive(env), patches(loc);
    }
  };
}
__name(liveHandlers, "liveHandlers");
function stateHandlers(env, req) {
  return {
    [ID.pingTraffic]: (d) => pingTraffic(env, d, req),
    [ID.fetchTraffic]: () => readStats(env),
    [ID.fetchCup]: () => loadCup(env),
    [ID.joinCup]: (d) => joinCup(env, d),
    [ID.leaveCup]: (d) => leaveCup(env, d),
    [ID.unlockCup]: (d) => unlockCup(env, d),
    [ID.drawCup]: (d) => drawCup(env, d),
    [ID.pickCup]: (d) => pickCup(env, d),
    [ID.fetchRing]: () => loadRing(env),
    [ID.addRing]: (d) => addRing(env, d),
    [ID.removeRing]: (d) => removeRing(env, d),
    [ID.startRing]: (d) => startRing(env, d),
    [ID.resetRing]: (d) => resetRing(env, d)
  };
}
__name(stateHandlers, "stateHandlers");
async function loadRing(env) {
  return ringPresent(await ringRow(env));
}
__name(loadRing, "loadRing");
var GET_IDS = /* @__PURE__ */ new Set([ID.fetchLivePatches, ID.fetchLiveHero, ID.fetchLiveCatalog, ID.fetchLiveAtelier, ID.fetchLiveTier, ID.fetchLiveRank, ID.fetchTraffic, ID.fetchCup, ID.fetchRing]);
var ARG_KEY = { [ID.fetchLivePatches]: "locale", [ID.fetchLiveCatalog]: "locale", [ID.fetchLiveAtelier]: "locale", [ID.fetchLiveTier]: "locale", [ID.fetchLiveHero]: "heroId" };
var CACHEABLE = /* @__PURE__ */ new Set([ID.fetchLivePatches, ID.fetchLiveHero, ID.fetchLiveCatalog, ID.fetchLiveAtelier, ID.fetchLiveTier, ID.fetchLiveRank]);
function cors(req) {
  let origin = req.headers.get("origin"), h = { vary: "Origin" };
  return origin && ALLOWED_ORIGINS.has(origin) && (h["access-control-allow-origin"] = origin, h["access-control-expose-headers"] = "x-tss-serialized"), h;
}
__name(cors, "cors");
function serialized(value, status, req, cacheable) {
  return new Response(JSON.stringify(Ji(value, { refs: /* @__PURE__ */ new Map() })), {
    status,
    headers: { "content-type": "application/json", "x-tss-serialized": "true", "cache-control": cacheable ? "public, max-age=60" : "no-store", ...cors(req) }
  });
}
__name(serialized, "serialized");
function ghAtelier(result) {
  let fix = /* @__PURE__ */ __name((s) => typeof s != "string" ? s : s.startsWith("/atelier/") ? `/clan-jedi${s}` : s.startsWith("/api/atelier-art") ? `//clan-jedi.pages.dev${s}` : s, "fix"), out = clone(result);
  for (let sk of out.skins ?? []) for (let a of sk.angles ?? []) a.src = fix(a.src);
  return out;
}
__name(ghAtelier, "ghAtelier");
async function handleServerFn(req, env, ctx, url) {
  let rest = url.pathname.slice(11), m = /^([0-9a-f]{64})(?:__(.+?))?(\.json)?$/.exec(decodeURIComponent(rest));
  if (!m) return env.ASSETS.fetch(req);
  let [, id, fileArg] = m;
  await ensureSchema(env);
  let fn2 = { ...liveHandlers(env, ctx, url), ...stateHandlers(env, req) }[id];
  if (!fn2) return env.ASSETS.fetch(req);
  let data;
  try {
    if (req.method === "POST") {
      if (GET_IDS.has(id)) throw new BadInput("method");
      let text = await req.text();
      data = text ? qi(JSON.parse(text), { refs: /* @__PURE__ */ new Map() })?.data : void 0;
    } else {
      if (!GET_IDS.has(id)) throw new BadInput("method");
      let payload = url.searchParams.get("payload");
      payload ? data = qi(JSON.parse(payload), { refs: /* @__PURE__ */ new Map() })?.data : fileArg && ARG_KEY[id] && (data = { [ARG_KEY[id]]: fileArg });
    }
    let result = await fn2(data);
    return id === ID.fetchLiveAtelier && req.headers.get("origin") === GH_ORIGIN && (result = ghAtelier(result)), serialized({ result, error: void 0, context: /* @__PURE__ */ Object.create(null) }, 200, req, CACHEABLE.has(id));
  } catch (e) {
    let err = new Error(e instanceof BadInput ? `Invalid input: ${e.message}` : "Server function failed");
    return serialized(err, e instanceof BadInput ? 400 : 500, req, false);
  }
}
__name(handleServerFn, "handleServerFn");
var FILE_OK = /^[\w .()\-'&×!]+\.(jpg|jpeg|png|webp)$/i;
async function atelierArt(req) {
  let file = new URL(req.url).searchParams.get("file")?.replace(/^File:/i, "").trim() ?? "";
  if (!FILE_OK.test(file)) return new Response("bad file", { status: 400 });
  try {
    let data = await fetchJson("https://mobile-legends.fandom.com/api.php?" + new URLSearchParams({ action: "query", titles: `File:${file}`, prop: "imageinfo", iiprop: "url", format: "json" }).toString()), remote = null;
    for (let page of Object.values(data.query?.pages ?? {})) {
      if (page.missing !== void 0) continue;
      let raw = page.imageinfo?.[0]?.url;
      if (raw) {
        remote = raw;
        break;
      }
    }
    if (!remote || !/^https:\/\/static\.wikia\.nocookie\.net\//i.test(remote)) return new Response("not found", { status: 404 });
    let img = await fetch(remote, { headers: { "User-Agent": UA } });
    return img.ok ? new Response(await img.arrayBuffer(), { headers: { "Content-Type": img.headers.get("content-type") || "image/jpeg", "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800", "access-control-allow-origin": "*" } }) : new Response("upstream", { status: 502 });
  } catch {
    return new Response("error", { status: 502 });
  }
}
__name(atelierArt, "atelierArt");
var worker_default = {
  async fetch(req, env, ctx) {
    HOST_CODE = typeof env.HOST_CODE == "string" ? env.HOST_CODE.trim() : "";
    let url = new URL(req.url);
    if (url.pathname.startsWith("/_serverFn/") || url.pathname.startsWith("/api/")) {
      if (req.method === "OPTIONS") {
        let origin = req.headers.get("origin");
        return !origin || !ALLOWED_ORIGINS.has(origin) ? new Response(null, { status: 403 }) : new Response(null, { status: 204, headers: { ...cors(req), "access-control-allow-methods": "GET, POST, OPTIONS", "access-control-allow-headers": req.headers.get("access-control-request-headers") || "content-type, x-tsr-serverfn, accept", "access-control-max-age": "86400" } });
      }
      return url.pathname.startsWith("/_serverFn/") ? handleServerFn(req, env, ctx, url) : url.pathname === "/api/atelier-art" && req.method === "GET" ? atelierArt(req) : new Response("Not found", { status: 404 });
    }
    return env.ASSETS.fetch(req);
  }
};

// ../../workspace/clan-jedi/backend/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../workspace/clan-jedi/backend/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../../workspace/clan-jedi/backend/.wrangler/tmp/bundle-Tt6GhB/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../workspace/clan-jedi/backend/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../../workspace/clan-jedi/backend/.wrangler/tmp/bundle-Tt6GhB/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=bundledWorker-0.8532038895904013.mjs.map
