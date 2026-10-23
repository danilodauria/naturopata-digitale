/* ==========================================================================
   Naturopata Digitale · nucleo dell'applicazione
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.app = (function () {
  "use strict";

  const app = document.getElementById("app");
  const views = {};
  const PREFIX = "naturopata-digitale:v1:";

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { /* storage pieno o negato */ }
  }

  const state = {
    favs: new Set(readJSON("favs", [])),
    read: new Set(readJSON("read", [])),
    quizStats: readJSON("quiz", { played: 0, best: 0, correct: 0, total: 0, byCat: {} }),
    filters: { q: "", cat: "tutte", safety: "tutte" },
    calMonth: new Date().getMonth() + 1,
    chat: [],
    quiz: null,
    pendingAsk: null
  };

  function saveFavs() { writeJSON("favs", Array.from(state.favs)); }
  function saveRead() { writeJSON("read", Array.from(state.read)); }
  function saveQuizStats() { writeJSON("quiz", state.quizStats); }

  const MONTHS = ["", "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
  const MONTHS_SHORT = ["", "gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function monthLabel(months, short) {
    if (!months || !months.length || months.length === 12) return "tutto l'anno";
    return months.map((m) => (short ? MONTHS_SHORT[m] : MONTHS[m])).join(" · ");
  }

  const SAFETY = {
    verde: { label: "Sicura", long: "Uso tradizionale generalmente sicuro alle dosi usuali" },
    giallo: { label: "Cautela", long: "Usare con cautela e chiedere parere se si assumono farmaci" },
    rosso: { label: "Attenzione", long: "Interazioni o rischi importanti: serve supervisione" },
    nero: { label: "Pericolosa", long: "Pianta tossica: non usare" }
  };

  const ICONS = {
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    basket: '<path d="m5 11 4-7"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4A2 2 0 0 0 7.1 20h9.8a2 2 0 0 0 2-1.6l1.6-7.4"/><path d="M6 15h12"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    brain: '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>',
    wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
    drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7Z"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
    flower: '<circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    print: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>',
    spark: '<path d="m12 3 1.9 5.8L20 10.7l-6.1 1.9L12 18.4l-1.9-5.8L4 10.7l6.1-1.9L12 3Z"/>'
  };

  function ico(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.leaf) + "</svg>";
  }

  function page(html, cls) {
    app.innerHTML = '<div class="page ' + (cls || "") + '"><div class="wrap">' + html + "</div></div>";
    const main = document.getElementById("main");
    if (main) main.focus({ preventScroll: true });
  }

  function setNav(active) {
    document.querySelectorAll("[data-nav]").forEach((a) => {
      const on = a.getAttribute("data-nav") === active;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    const more = document.getElementById("moreBtn");
    if (more) more.classList.toggle("is-active", ["calendario", "glossario", "sicurezza", "licenze"].indexOf(active) !== -1);
  }

  function safetyBadge(level, long) {
    const s = SAFETY[level] || SAFETY.verde;
    return '<span class="badge-dot safety-' + (level || "verde") + '" title="' + esc(long || s.long) + '">' + s.label + "</span>";
  }

  function plantCard(p) {
    const firstTag = (p.categorie || [])[0] || "Officinale";
    return '<a class="plant-card tone-' + (p.tono || 1) + '" href="#/pianta/' + p.id + '">' +
      '<div class="plant-card-top">' +
        '<span class="plant-leaf-watermark" aria-hidden="true">' + ico("leaf") + "</span>" +
        '<span class="plant-monogram">' + esc(p.nome.charAt(0)) + "</span>" +
        '<span class="plant-safety">' + safetyBadge(p.sicurezza.livello) + "</span>" +
      "</div>" +
      '<div class="plant-card-body">' +
        "<h3>" + esc(p.nome) + "</h3>" +
        '<p class="plant-latin">' + esc(p.latino) + "</p>" +
        '<p class="plant-summary">' + esc(p.sintesi) + "</p>" +
        '<div class="plant-tags"><span class="tag">' + esc(firstTag) + "</span>" +
          (p.fito && p.fito.commestibile ? '<span class="tag">In cucina</span>' : "") +
          (state.favs.has(p.id) ? '<span class="tag" aria-label="Nei preferiti">♥</span>' : "") +
        "</div>" +
        '<div class="plant-card-foot"><span>Raccolta: ' + esc(monthLabel(p.raccolta.mesi, true)) + "</span><span>Leggi →</span></div>" +
      "</div></a>";
  }

  /* ------------------------------------------------------------------------
     Home
     ------------------------------------------------------------------------ */

  function viewHome() {
    const m = new Date().getMonth() + 1;
    const seasonal = (NP.plants || []).filter((p) => (p.raccolta.mesi || []).indexOf(m) !== -1);
    const start = Math.floor((Date.now() / 86400000)) % Math.max(seasonal.length, 1);
    const today = seasonal[start] || NP.plants[0];
    const quote = (NP.quotes || [])[new Date().getDate() % Math.max((NP.quotes || []).length, 1)];
    const readPct = Math.round((state.read.size / Math.max((NP.manual || []).length, 1)) * 100);
    const qs = state.quizStats;

    const features = [
      { href: "#/erbario", icon: "leaf", tone: "", title: "Erbario", text: (NP.plants || []).length + " schede con usi, preparazioni, sicurezza e fonti." },
      { href: "#/manuale", icon: "book", tone: "", title: "Manuale", text: (NP.manual || []).length + " capitoli per capire, non solo per credere." },
      { href: "#/fitoalimurgia", icon: "basket", tone: "tone-oro", title: "Fitoalimurgia", text: "Raccogliere e cucinare le piante selvatiche con rispetto." },
      { href: "#/benessere", icon: "heart", tone: "tone-terra", title: "Benessere", text: "Sonno, stress, digestione, pelle: schede pratiche." },
      { href: "#/quiz", icon: "spark", tone: "", title: "Quiz", text: "Mettiti alla prova con spiegazioni e livelli." },
      { href: "#/neura", icon: "brain", tone: "", title: "Neura", text: "L'assistente locale che spiega e controlla." }
    ];

    const seasonList = seasonal.slice(0, 5).map((p) =>
      '<li><span class="season-month">' + MONTHS_SHORT[m] + '</span><div><a href="#/pianta/' + p.id + '">' + esc(p.nome) + "</a><small>" + esc(p.parti[0]) + " · " + esc(p.sintesi.slice(0, 48)) + "…</small></div></li>"
    ).join("");

    page(
      '<section class="hero">' +
        '<div class="hero-grid">' +
          "<div>" +
            '<p class="eyebrow">Naturopatia · Fitoterapia · Fitoalimurgia</p>' +
            '<h1>Il sapere gentile<br>delle <span class="accent">piante</span>.</h1>' +
            '<p class="lead">Schede, manuali, quiz e un assistente locale per conoscere le piante officinali, la natura commestibile e il benessere olistico. Con la scienza accanto, e la prudenza sempre.</p>' +
            '<div class="hero-actions">' +
              '<a class="btn btn-primary" href="#/erbario">Esplora l\'erbario ' + ico("arrow") + "</a>" +
              '<a class="btn btn-secondary" href="#/neura">Parla con Neura ' + ico("brain") + "</a>" +
            "</div>" +
            '<div class="hero-meta">' +
              '<div class="hero-meta-item"><strong>' + (NP.plants || []).length + "</strong><span>schede di piante</span></div>" +
              '<div class="hero-meta-item"><strong>' + (NP.manual || []).length + "</strong><span>capitoli</span></div>" +
              '<div class="hero-meta-item"><strong>' + (NP.quiz || []).length + "</strong><span>domande</span></div>" +
              '<div class="hero-meta-item"><strong>100%</strong><span>offline e privato</span></div>' +
            "</div>" +
          "</div>" +
          '<aside class="today-card">' +
            '<div class="today-top"><span>La pianta del giorno</span><span class="today-date">' + new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long" }) + "</span></div>" +
            "<h2>" + esc(today.nome) + "</h2>" +
            '<p class="today-latin">' + esc(today.latino) + "</p>" +
            '<p class="today-text">' + esc(today.sintesi) + "</p>" +
            '<div class="today-tags"><span class="tag">' + esc(today.categorie[0]) + '</span><span class="tag">' + esc(monthLabel(today.raccolta.mesi, true)) + "</span></div>" +
            '<div class="today-foot"><a class="btn" href="#/pianta/' + today.id + '">Apri la scheda ' + ico("arrow") + '</a><span class="today-hint">' + esc(SAFETY[today.sicurezza.livello].label) + "</span></div>" +
          "</aside>" +
        "</div>" +
      "</section>" +

      '<section class="section">' +
        '<div class="section-head"><div><h2>Da dove cominciare</h2><p>Sei percorsi, un\'unica idea: conoscere prima di usare.</p></div><a class="section-link" href="#/licenze">Il progetto</a></div>' +
        '<div class="feature-grid">' +
          features.map((f) =>
            '<a class="feature ' + f.tone + '" href="' + f.href + '">' +
              '<span class="feature-icon">' + ico(f.icon) + "</span>" +
              "<h3>" + f.title + "</h3><p>" + f.text + "</p>" +
              '<span class="arrow" aria-hidden="true">→</span>' +
            "</a>"
          ).join("") +
        "</div>" +
      "</section>" +

      '<section class="section home-split">' +
        '<div class="panel">' +
          '<div class="section-head"><div><h2>In stagione ora</h2><p>' + MONTHS[m].charAt(0).toUpperCase() + MONTHS[m].slice(1) + ': che cosa si raccoglie e si prepara.</p></div><a class="section-link" href="#/calendario">Calendario</a></div>' +
          (seasonList ? '<ul class="season-list">' + seasonList + "</ul>" : '<p class="muted">In questo mese la natura riposa: è il tempo di studiare e riordinare le scorte.</p>') +
          '<p class="mt-2"><a class="btn btn-secondary btn-small" href="#/fitoalimurgia">Regole del raccolto responsabile ' + ico("arrow") + "</a></p>" +
        "</div>" +
        '<div class="panel panel-soft">' +
          "<h3>Il tuo percorso</h3>" +
          '<p class="text-small muted">Preferiti, capitoli letti e quiz: tutto salvato solo su questo dispositivo.</p>' +
          '<div class="progress-line"><span style="width:' + readPct + '%"></span></div>' +
          '<p class="text-small muted">' + state.read.size + " di " + (NP.manual || []).length + " capitoli letti</p>" +
          '<div class="mini-stats mt-2">' +
            '<div class="mini-stat"><strong>' + state.favs.size + "</strong><span>preferiti</span></div>" +
            '<div class="mini-stat"><strong>' + (qs.best || 0) + "%</strong><span>miglior quiz</span></div>" +
            '<div class="mini-stat"><strong>' + (qs.played || 0) + "</strong><span>quiz fatti</span></div>" +
          "</div>" +
          '<p class="mt-2"><a class="btn btn-primary btn-small btn-block" href="#/quiz">Mettiti alla prova ' + ico("spark") + "</a></p>" +
        "</div>" +
      "</section>" +

      '<section class="section home-split">' +
        '<div class="panel">' +
          "<h3>Una regola prima di tutto</h3>" +
          '<div class="callout warn mb-0"><span aria-hidden="true">⚠️</span><div><p><strong>Le piante non sono innocue perché naturali.</strong> Possono interagire con farmaci, non sono adatte in gravidanza o ai bambini senza parere, e alcune sono velenose. Questo programma è educativo: non diagnostica, non cura, non sostituisce il medico.</p><p class="mb-0"><a href="#/sicurezza">Leggi la pagina Sicurezza e fonti →</a></p></div></div>' +
        "</div>" +
        '<div class="panel panel-soft">' +
          (quote ? '<blockquote class="quote">“' + esc(quote.testo) + '”<footer>— ' + esc(quote.autore) + "</footer></blockquote>" : "") +
          '<p class="text-small muted mt-2">Un progetto indipendente, senza pubblicità, senza account e senza tracciamento. I contenuti sono originali e le fonti sono citate in ogni scheda.</p>' +
        "</div>" +
      "</section>",

      "view-home"
    );
  }

  /* ------------------------------------------------------------------------
     Erbario
     ------------------------------------------------------------------------ */

  function filteredPlants() {
    const q = state.filters.q.toLowerCase().trim();
    return (NP.plants || []).filter((p) => {
      if (state.filters.cat !== "tutte" && (p.categorie || []).indexOf(state.filters.cat) === -1) return false;
      if (state.filters.safety !== "tutte" && p.sicurezza.livello !== state.filters.safety) return false;
      if (!q) return true;
      const hay = [p.nome, p.latino, (p.nomi || []).join(" "), p.famiglia, p.sintesi, (p.proprieta || []).join(" "), (p.usi || []).join(" "), (p.categorie || []).join(" ")].join(" ").toLowerCase();
      return q.split(/\s+/).every((w) => hay.indexOf(w) !== -1);
    }).sort((a, b) => a.nome.localeCompare(b.nome, "it"));
  }

  function plantGridHTML(list) {
    if (!list.length) {
      return '<div class="empty-state"><h3>Nessuna pianta trovata</h3><p>Prova a togliere un filtro o a cercare il nome scientifico.</p><p class="mb-0"><button class="btn btn-secondary btn-small" type="button" data-reset-filters>Mostra tutte</button></p></div>';
    }
    return '<div class="plant-grid" id="plantGridInner">' + list.map(plantCard).join("") + "</div>";
  }

  function updatePlantGrid() {
    const list = filteredPlants();
    const box = document.getElementById("plantResults");
    const count = document.getElementById("plantCount");
    if (box) box.innerHTML = plantGridHTML(list);
    if (count) count.textContent = list.length + (list.length === 1 ? " scheda" : " schede") + " · " + (NP.plants || []).length + " in totale";
  }

  function viewErbario() {
    const cats = Array.from(new Set((NP.plants || []).flatMap((p) => p.categorie))).sort();
    const list = filteredPlants();
    const catOpts = ['<option value="tutte">Tutte le categorie</option>'].concat(cats.map((c) => '<option value="' + esc(c) + '"' + (state.filters.cat === c ? " selected" : "") + ">" + esc(c) + "</option>")).join("");
    const safOpts = [
      '<option value="tutte">Tutte le sicurezza</option>',
      '<option value="verde"' + (state.filters.safety === "verde" ? " selected" : "") + ">Sicura</option>",
      '<option value="giallo"' + (state.filters.safety === "giallo" ? " selected" : "") + ">Cautela</option>",
      '<option value="rosso"' + (state.filters.safety === "rosso" ? " selected" : "") + ">Attenzione</option>"
    ].join("");

    page(
      '<div class="page-head">' +
        '<p class="eyebrow">Erbario interattivo</p>' +
        "<h1>Le piante, una per una</h1>" +
        '<p class="lead">' + (NP.plants || []).length + ' schede con proprietà, preparazioni, sicurezza, sosia pericolosi, evidenza scientifica e fonti. Cerca per nome, uso o famiglia.</p>' +
      "</div>" +
      '<div class="toolbar">' +
        '<label class="search-field"><span class="sr-only">Cerca una pianta</span>' + ico("search") + '<input class="input" id="plantSearch" type="search" placeholder="Cerca: malva, sonno, digestione, Asteraceae…" value="' + esc(state.filters.q) + '"></label>' +
        '<label><span class="sr-only">Categoria</span><select class="select" id="catFilter">' + catOpts + "</select></label>" +
        '<label><span class="sr-only">Livello di sicurezza</span><select class="select" id="safetyFilter">' + safOpts + "</select></label>" +
      "</div>" +
      '<div class="filter-chips mb-0">' +
        '<button class="chip' + (state.filters.cat === "tutte" ? " is-active" : "") + '" type="button" data-cat="tutte">Tutte</button>' +
        cats.map((c) => '<button class="chip' + (state.filters.cat === c ? " is-active" : "") + '" type="button" data-cat="' + esc(c) + '">' + esc(c) + "</button>").join("") +
      "</div>" +
      '<p class="result-count mt-2" id="plantCount" aria-live="polite">' + list.length + (list.length === 1 ? " scheda" : " schede") + " · " + (NP.plants || []).length + " in totale</p>" +
      '<div id="plantResults">' + plantGridHTML(list) + "</div>" +
      '<div class="callout good mt-2"><span aria-hidden="true">🌿</span><div><p class="mb-0"><strong>Un aiuto in più:</strong> chiedi a <a href="#/neura">Neura</a> «quale pianta per…» oppure usa il <a href="#/quiz">quiz</a> per verificare quello che hai imparato.</p></div></div>',

      "view-erbario"
    );

    const search = document.getElementById("plantSearch");
    const cat = document.getElementById("catFilter");
    const safety = document.getElementById("safetyFilter");
    if (search) search.addEventListener("input", () => { state.filters.q = search.value; updatePlantGrid(); });
    if (cat) cat.addEventListener("change", () => {
      state.filters.cat = cat.value;
      document.querySelectorAll("[data-cat]").forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-cat") === cat.value));
      updatePlantGrid();
    });
    if (safety) safety.addEventListener("change", () => { state.filters.safety = safety.value; updatePlantGrid(); });
  }

  /* ------------------------------------------------------------------------
     Dettaglio pianta
     ------------------------------------------------------------------------ */

  function viewPlant(id) {
    const p = (NP.plants || []).find((x) => x.id === id);
    if (!p) return view404();
    const s = p.sicurezza;
    const fav = state.favs.has(p.id);
    const conds = (NP.conditions || []).filter((c) => (c.piante || []).some((x) => x.id === p.id));

    page(
      '<nav class="crumbs" aria-label="Percorso"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/erbario">Erbario</a><span aria-hidden="true">/</span><span>' + esc(p.nome) + "</span></nav>" +

      '<header class="plant-hero">' +
        "<div>" +
          '<p class="eyebrow">' + esc(p.famiglia) + " · " + esc((p.categorie || []).join(" · ")) + "</p>" +
          "<h1>" + esc(p.nome) + "</h1>" +
          '<p class="latin-big">' + esc(p.latino) + "</p>" +
          '<p class="lead">' + esc(p.sintesi) + "</p>" +
          '<div class="plant-hero-meta">' + (p.categorie || []).map((c) => '<span class="tag tag-line">' + esc(c) + "</span>").join("") + '<span class="tag tag-line">' + esc(p.famiglia) + "</span></div>" +
          '<div class="plant-actions">' +
            '<button class="btn ' + (fav ? "btn-primary" : "btn-secondary") + ' btn-small" type="button" data-fav="' + p.id + '" aria-pressed="' + fav + '">' + (fav ? "♥ Nei preferiti" : "♡ Aggiungi ai preferiti") + "</button>" +
            '<button class="btn btn-secondary btn-small" type="button" data-print>Stampa la scheda ' + ico("print") + "</button>" +
            '<button class="btn btn-ghost btn-small" type="button" data-ask="' + esc("Spiegami " + p.nome + " e le sue avvertenze") + '">Chiedi a Neura ' + ico("brain") + "</button>" +
          "</div>" +
        "</div>" +
        '<aside class="plant-aside">' +
          "<h3>In sintesi</h3>" +
          '<ul class="fact-list">' +
            '<li><span class="k">Sicurezza</span><span class="v">' + safetyBadge(s.livello, s.long || SAFETY[s.livello].long) + "</span></li>" +
            '<li><span class="k">Parti usate</span><span class="v">' + esc((p.parti || []).join(", ")) + "</span></li>" +
            '<li><span class="k">Raccolta</span><span class="v">' + esc(monthLabel(p.raccolta.mesi)) + "</span></li>" +
            '<li><span class="k">Habitat</span><span class="v">' + esc(p.habitat) + "</span></li>" +
            (p.fito && p.fito.commestibile ? '<li><span class="k">In cucina</span><span class="v">Sì · ' + esc(p.fito.parti) + "</span></li>" : '<li><span class="k">In cucina</span><span class="v">Non alimentare</span></li>') +
          "</ul>" +
        "</aside>" +
      "</header>" +

      '<div class="detail-layout">' +
        '<div class="detail-main">' +
          '<section><h2><span class="num">01</span>La pianta</h2><p>' + esc(p.descrizione) + "</p></section>" +

          '<section><h2><span class="num">02</span>Proprietà e usi</h2>' +
            '<div class="pill-list">' + (p.proprieta || []).map((x) => '<span class="pill">' + esc(x) + "</span>").join("") + "</div>" +
            "<ul>" + (p.usi || []).map((u) => "<li>" + esc(u) + "</li>").join("") + "</ul>" +
          "</section>" +

          '<section><h2><span class="num">03</span>Preparazioni</h2><div class="prep-list">' +
            (p.preparazioni || []).map((x) => '<div class="prep"><h3>' + esc(x.nome) + "</h3><p>" + esc(x.ricetta) + '</p><p class="dose">' + esc(x.dose) + "</p></div>").join("") +
            '</div><p class="text-small muted mt-2">Dosi indicative della tradizione: non sono prescrizioni. Leggi sempre le avvertenze e chiedi parere in caso di farmaci, gravidanza, allattamento o età pediatrica.</p>' +
          "</section>" +

          (p.fito && p.fito.commestibile ?
            '<section><h2><span class="num">04</span>In cucina</h2>' +
              '<p><strong>Parti commestibili:</strong> ' + esc(p.fito.parti) + " · <strong>Stagione:</strong> " + esc(p.fito.stagione) + "</p>" +
              "<p>" + esc(p.fito.cucina) + "</p>" +
              '<div class="callout warn"><span aria-hidden="true">⚠️</span><p class="mb-0">' + esc(p.fito.nota) + '</p></div>' +
            "</section>" : "") +

          (p.sosia && p.sosia.length ?
            '<section><h2><span class="num">05</span>Sosia e piante simili</h2>' +
              p.sosia.map((x) => '<div class="lookalike"><strong>' + esc(x.nome) + "</strong><br>" + esc(x.rischio) + "</div>").join("") +
            "</section>" : "") +

          '<section><h2><span class="num">06</span>Che cosa dice la ricerca</h2><p>' + esc(p.evidenza) + "</p>" +
            '<div class="callout"><span aria-hidden="true">🔬</span><p class="mb-0">L’evidenza è riassunta in modo onesto: quando è limitata, lo diciamo. Le fonti complete sono in fondo alla scheda.</p></div>' +
          "</section>" +

          '<section><h2><span class="num">07</span>Curiosità</h2><p>' + esc(p.curiosita) + "</p></section>" +

          '<section><h2><span class="num">08</span>Fonti</h2><ul class="source-list">' +
            (p.fonti || []).map((f) => '<li><a href="' + esc(f.u) + '" target="_blank" rel="noopener">' + esc(f.t) + "</a></li>").join("") +
          "</ul></section>" +
        "</div>" +

        '<aside class="sticky-side">' +
          '<div class="safety-box lvl-' + s.livello + '">' +
            "<h3>Sicurezza · " + (SAFETY[s.livello] || SAFETY.verde).label + "</h3>" +
            "<p><strong>Gravidanza:</strong> " + esc(s.gravidanza) + "</p>" +
            "<p><strong>Allattamento:</strong> " + esc(s.allattamento) + "</p>" +
            "<p><strong>Bambini:</strong> " + esc(s.bambini) + "</p>" +
            ((s.controindicazioni || []).length ? "<p><strong>Controindicazioni:</strong></p><ul>" + s.controindicazioni.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" : "") +
            ((s.interazioni || []).length ? "<p><strong>Interazioni:</strong></p><ul>" + s.interazioni.map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" : "") +
            '<p class="text-small muted mb-0">' + esc(s.nota) + "</p>" +
          "</div>" +
          (conds.length ? '<div class="panel"><h3>Se ti interessa</h3>' + conds.map((c) => '<p class="mb-0"><a href="#/benessere/' + c.id + '">' + esc(c.titolo) + " →</a></p>").join("") + "</div>" : "") +
          '<div class="panel"><h3>Prima di usarla</h3><p class="text-small muted">Se assumi farmaci, sei in gravidanza o allatti, fai controllare le interazioni dal medico o dal farmacista.</p><button class="btn btn-secondary btn-small btn-block" type="button" data-ask="' + esc("Controlla " + p.nome + " con i miei farmaci") + '">Apri il controllo di Neura ' + ico("shield") + "</button></div>" +
        "</aside>" +
      "</div>",

      "view-plant"
    );
  }

  /* ------------------------------------------------------------------------
     Router
     ------------------------------------------------------------------------ */

  function view404() {
    page('<div class="empty-state" style="margin:3rem 0"><h1>Pagina non trovata</h1><p>Il collegamento non esiste o è cambiato.</p><a class="btn btn-primary" href="#/">Torna alla home</a></div>', "view-404");
  }

  function parseRoute() {
    const hash = location.hash.replace(/^#\/?/, "");
    const parts = hash.split("?")[0].split("/").filter(Boolean);
    return { name: parts[0] || "home", params: parts.slice(1) };
  }

  const ROUTES = {
    home: () => viewHome(),
    erbario: () => viewErbario(),
    pianta: (p) => viewPlant(p[0]),
    manuale: (p) => (views.manuale ? views.manuale(p) : view404()),
    capitolo: (p) => (views.capitolo ? views.capitolo(p) : view404()),
    fitoalimurgia: () => (views.fito ? views.fito() : view404()),
    benessere: (p) => (views.benessere ? views.benessere(p) : view404()),
    quiz: () => (views.quiz ? views.quiz() : view404()),
    neura: () => (views.neura ? views.neura() : view404()),
    calendario: () => (views.calendario ? views.calendario() : view404()),
    glossario: () => (views.glossario ? views.glossario() : view404()),
    sicurezza: () => (views.sicurezza ? views.sicurezza() : view404()),
    licenze: () => (views.licenze ? views.licenze() : view404())
  };

  function updateTitle(r) {
    const labels = { home: "Piante, benessere e natura", erbario: "Erbario", manuale: "Manuale interattivo", fitoalimurgia: "Fitoalimurgia", benessere: "Benessere", quiz: "Quiz", neura: "Neura", calendario: "Calendario di raccolta", glossario: "Glossario", sicurezza: "Sicurezza e fonti", licenze: "Licenze e progetto" };
    let label = labels[r.name] || "";
    if (r.name === "pianta") {
      const p = (NP.plants || []).find((x) => x.id === r.params[0]);
      label = p ? p.nome : "Pianta";
    } else if (r.name === "capitolo") {
      const c = (NP.manual || []).find((x) => x.id === r.params[0]);
      label = c ? c.titolo : "Capitolo";
    } else if (r.name === "benessere" && r.params[0]) {
      const c = (NP.conditions || []).find((x) => x.id === r.params[0]);
      label = c ? c.titolo : "Benessere";
    }
    document.title = (label ? label + " · " : "") + "Naturopata Digitale";
  }

  function render() {
    const r = parseRoute();
    if (state.quizTimer) { clearInterval(state.quizTimer); state.quizTimer = null; }
    if (views.onRouteLeave) views.onRouteLeave();
    const fn = ROUTES[r.name] || view404;
    fn(r.params);
    updateTitle(r);
    setNav(r.name === "home" ? "home" : r.name);
    document.getElementById("siteHeader").classList.toggle("is-scrolled", window.scrollY > 8);
    window.scrollTo({ top: 0, behavior: "auto" });
    document.body.classList.remove("no-scroll");
    const nav = document.getElementById("mainNav");
    if (nav) nav.classList.remove("is-open");
    const btn = document.getElementById("menuBtn");
    if (btn) btn.setAttribute("aria-expanded", "false");
    const veil = document.getElementById("pageVeil");
    if (veil) veil.hidden = true;

    if (state.pendingAsk && r.name === "neura" && views.sendNeura) {
      const q = state.pendingAsk;
      state.pendingAsk = null;
      setTimeout(() => views.sendNeura(q), 60);
    }
  }

  function goNeura(question) {
    state.pendingAsk = question || null;
    if (location.hash === "#/neura") {
      if (question && views.sendNeura) views.sendNeura(question);
      state.pendingAsk = null;
    } else {
      location.hash = "#/neura";
    }
  }

  return {
    app, page, render, goNeura, ico, esc, monthLabel, MONTHS, MONTHS_SHORT, SAFETY,
    state, views, saveFavs, saveRead, saveQuizStats, readJSON, writeJSON, PREFIX
  };
})();
