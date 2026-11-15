/* Clan Jedi: Codex rank / time-window switch. Talks to /api/rank on clan-jedi.pages.dev. */
(function () {
  if (window.__cjRankSwitch) return;
  window.__cjRankSwitch = 1;

  var DAYS = [1, 3, 7, 15, 30];
  var RANKS = ["all", "epic", "legend", "mythic", "honor", "glory"];
  var SESSION = "cj-rank-filter";
  var apiBase = (typeof window.__cjRankApi === "string" && window.__cjRankApi) ||
    (location.hostname === "theelonmuskrs3.github.io" ? "https://clan-jedi.pages.dev" : "");

  var state = { days: 30, rank: "all", via: "", loading: false, error: "" };
  try {
    var saved = sessionStorage.getItem(SESSION);
    if (saved) {
      var p = JSON.parse(saved);
      if (DAYS.indexOf(p.days) >= 0 && RANKS.indexOf(p.rank) >= 0) {
        state.days = p.days;
        state.rank = p.rank;
      }
    }
  } catch (e) {}

  function es() {
    var kicker = document.querySelector(".text-gold");
    var lang = (document.documentElement.lang || "").toLowerCase();
    if (lang.indexOf("es") === 0) return true;
    var t = document.body ? document.body.innerText : "";
    return /Rank oficial|Contras oficiales|Todos los rangos/.test(t);
  }
  function labels() {
    return es()
      ? {
          days: { 1: "1d", 3: "3d", 7: "7d", 15: "15d", 30: "30d" },
          ranks: { all: "Todos", epic: "Épico", legend: "Leyenda", mythic: "Mítico", honor: "Honor", glory: "Gloria" },
          ranksFull: { all: "Todos los rangos", epic: "Épico", legend: "Leyenda", mythic: "Mítico", honor: "Honor mítico", glory: "Gloria mítica" },
          kicker: function (d) { return d === 1 ? "Rank oficial · último día" : "Rank oficial · últimos " + d + " días"; },
          counters: function (d) { return d === 1 ? "Contras oficiales · 1 día" : "Contras oficiales · " + d + " días"; },
          live: "en vivo",
          cached: "en caché",
          loading: "Cargando…",
          err: "No se pudo cargar esa vista. Se mantiene la anterior.",
          fallback: "Mostrando el tablero de 30 días · todos los rangos (caché).",
        }
      : {
          days: { 1: "1d", 3: "3d", 7: "7d", 15: "15d", 30: "30d" },
          ranks: { all: "All", epic: "Epic", legend: "Legend", mythic: "Mythic", honor: "Honor", glory: "Glory" },
          ranksFull: { all: "All ranks", epic: "Epic", legend: "Legend", mythic: "Mythic", honor: "Mythical Honor", glory: "Mythical Glory" },
          kicker: function (d) { return d === 1 ? "Official rank · last 1 day" : "Official rank · last " + d + " days"; },
          counters: function (d) { return d === 1 ? "Official counters · 1 day" : "Official counters · " + d + " days"; },
          live: "live",
          cached: "cached",
          loading: "Loading…",
          err: "Couldn’t load that view. Keeping the previous board.",
          fallback: "Showing the cached 30-day all-ranks board.",
        };
  }

  function isDefault() { return state.days === 30 && state.rank === "all"; }

  function remember() {
    try { sessionStorage.setItem(SESSION, JSON.stringify({ days: state.days, rank: state.rank })); } catch (e) {}
  }

  function wrapApply() {
    var store = window.__cjRank;
    if (!store || store.__cjWrapped) return store;
    var apply = store.getState().apply;
    if (typeof apply !== "function") return store;
    store.setState({
      apply: function (board) {
        if (!isDefault() && board && board.days === 30 && board.rank === "all") return;
        apply(board);
      },
    });
    store.__cjWrapped = 1;
    return store;
  }

  function applyBoard(board, persistDefault) {
    var store = wrapApply();
    if (!store) return;
    var apply = store.getState().apply;
    if (persistDefault || isDefault()) {
      apply(board);
      return;
    }
    var key = "clan-jedi-rank";
    var saved = null;
    try { saved = localStorage.getItem(key); } catch (e) {}
    apply(board);
    try { if (saved) localStorage.setItem(key, saved); } catch (e) {}
  }

  function fmtWhen(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch (e) { return ""; }
  }

  function sourceLine(board, L) {
    var when = board && board.fetchedAt ? fmtWhen(board.fetchedAt) : "";
    var live = board && board.live ? L.live : L.cached;
    var rank = L.ranksFull[board && board.rank ? board.rank : state.rank] || L.ranksFull.all;
    return rank + " · " + when + " · " + live + " · mobilelegends.com/rank";
  }

  function updateLabels(board) {
    var L = labels();
    var days = (board && board.days) || state.days;
    var kickers = document.querySelectorAll("p");
    for (var i = 0; i < kickers.length; i++) {
      var el = kickers[i];
      if (!el.className || el.className.indexOf("text-gold") < 0) continue;
      if (/^(Official rank|Rank oficial)/.test((el.textContent || "").trim())) el.textContent = L.kicker(days);
    }
    var ps = document.querySelectorAll("p");
    for (var j = 0; j < ps.length; j++) {
      var p = ps[j];
      if (/mobilelegends\.com\/rank/.test(p.textContent || "")) p.textContent = sourceLine(board || {}, L);
    }
    var hs = document.querySelectorAll("h2");
    for (var k = 0; k < hs.length; k++) {
      var h = hs[k];
      if (/^(Official counters|Contras oficiales)/.test((h.textContent || "").trim())) h.textContent = L.counters(days);
    }
    var notes = document.querySelectorAll(".cj-rank-note");
    var msg = state.loading ? L.loading : state.error ? state.error : "";
    if (!msg && board && board.via === "snapshot" && !isDefault()) msg = L.fallback;
    for (var n = 0; n < notes.length; n++) notes[n].textContent = msg;
  }

  function syncChips() {
    var chips = document.querySelectorAll(".cj-rank-chip");
    for (var i = 0; i < chips.length; i++) {
      var c = chips[i];
      var on = (c.dataset.days && Number(c.dataset.days) === state.days) || (c.dataset.rank && c.dataset.rank === state.rank);
      c.classList.toggle("is-on", !!on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
      c.disabled = !!state.loading;
    }
    var roots = document.querySelectorAll(".cj-rank-switch");
    for (var j = 0; j < roots.length; j++) roots[j].classList.toggle("is-busy", !!state.loading);
  }

  function row(kind, keys, names, full) {
    var div = document.createElement("div");
    div.className = "cj-rank-row";
    div.setAttribute("role", "group");
    div.setAttribute("aria-label", kind);
    keys.forEach(function (key) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "cj-rank-chip";
      b.textContent = names[key];
      if (full && full[key]) b.title = full[key];
      b.setAttribute("aria-label", (full && full[key]) || String(names[key]));
      if (kind === "days") b.dataset.days = String(key);
      else b.dataset.rank = key;
      b.addEventListener("click", function () {
        if (kind === "days") select({ days: Number(key), rank: state.rank });
        else select({ days: state.days, rank: key });
      });
      div.appendChild(b);
    });
    return div;
  }

  function mountOne(anchor, compact) {
    if (!anchor || anchor.parentNode.querySelector(":scope > .cj-rank-switch, .cj-rank-switch")) {
      // If a sibling switch already exists, skip.
    }
    var host = compact ? anchor.parentNode : anchor.parentNode;
    if (!host) return;
    if (host.querySelector(".cj-rank-switch")) return;
    var L = labels();
    var box = document.createElement("div");
    box.className = "cj-rank-switch";
    box.appendChild(row("days", DAYS, L.days));
    box.appendChild(row("rank", RANKS, L.ranks, L.ranksFull));
    var note = document.createElement("p");
    note.className = "cj-rank-note";
    box.appendChild(note);
    if (compact) anchor.insertAdjacentElement("afterend", box);
    else {
      var grid = anchor.parentNode && anchor.parentNode.querySelector(".grid, .mt-3");
      if (grid) grid.insertAdjacentElement("beforebegin", box);
      else anchor.insertAdjacentElement("afterend", box);
    }
    syncChips();
  }

  function findAnchors() {
    var out = [];
    var ps = document.querySelectorAll("p");
    for (var i = 0; i < ps.length; i++) {
      if (/mobilelegends\.com\/rank/.test(ps[i].textContent || "")) out.push({ el: ps[i], compact: false });
    }
    var hs = document.querySelectorAll("h2");
    for (var j = 0; j < hs.length; j++) {
      if (/^(Official counters|Contras oficiales)/.test((hs[j].textContent || "").trim())) out.push({ el: hs[j], compact: true });
    }
    return out;
  }

  function mount() {
    wrapApply();
    findAnchors().forEach(function (a) { mountOne(a.el, a.compact); });
    var board = window.__cjRank && window.__cjRank.getState && window.__cjRank.getState().board;
    updateLabels(board);
    syncChips();
  }

  function select(next) {
    if (state.loading) return;
    if (next.days === state.days && next.rank === state.rank && !state.error) return;
    var prev = { days: state.days, rank: state.rank };
    state.days = next.days;
    state.rank = next.rank;
    state.error = "";
    state.loading = true;
    remember();
    syncChips();
    updateLabels(window.__cjRank && window.__cjRank.getState && window.__cjRank.getState().board);
    fetchBoard(next.days, next.rank).then(function (board) {
      state.loading = false;
      if (!board || !board.heroes || !board.heroes.length) throw new Error("empty");
      if (board.via === "snapshot" && !isDefault()) {
        // Snapshot is always 30/all; keep the user's chips but don't pretend the numbers match.
        state.error = labels().fallback;
      } else {
        state.via = board.via || "";
        state.days = board.days || next.days;
        state.rank = board.rank || next.rank;
      }
      applyBoard(board, isDefault());
      remember();
      mount();
    }).catch(function () {
      state.loading = false;
      state.days = prev.days;
      state.rank = prev.rank;
      state.error = labels().err;
      remember();
      mount();
    });
  }

  function fetchBoard(days, rank) {
    var url = apiBase + "/api/rank?days=" + encodeURIComponent(days) + "&rank=" + encodeURIComponent(rank);
    return fetch(url, { headers: { accept: "application/json" }, credentials: "omit" }).then(function (r) {
      if (!r.ok) throw new Error("http " + r.status);
      return r.json();
    });
  }

  function boot() {
    mount();
    if (!isDefault()) select({ days: state.days, rank: state.rank });
  }

  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    wrapApply();
    if (window.__cjRank || document.querySelector("p.text-gold, p")) {
      boot();
      if (window.__cjRank || tries > 40) clearInterval(iv);
    }
    if (tries > 80) clearInterval(iv);
  }, 250);

  var obs = new MutationObserver(function () { mount(); });
  if (document.documentElement) obs.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("popstate", function () { setTimeout(mount, 50); });
})();
