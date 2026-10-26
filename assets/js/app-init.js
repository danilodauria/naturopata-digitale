/* ==========================================================================
   Naturopata Digitale · avvio ed eventi globali
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

(function () {
  "use strict";

  const A = NP.app;
  const state = A.state;
  const THEME_KEY = A.PREFIX + "theme";

  /* Tema ------------------------------------------------------------------ */

  function currentTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b1712" : "#1f4d3a");
    const btn = document.getElementById("themeBtn");
    if (btn) btn.setAttribute("aria-label", theme === "dark" ? "Passa al tema chiaro" : "Passa al tema scuro");
  }

  applyTheme(currentTheme());

  /* Toast ----------------------------------------------------------------- */

  let toastTimer = null;
  function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  /* Menu ------------------------------------------------------------------ */

  function closeMenus() {
    const nav = document.getElementById("mainNav");
    const btn = document.getElementById("menuBtn");
    if (nav) nav.classList.remove("is-open");
    if (btn) btn.setAttribute("aria-expanded", "false");
    const more = document.getElementById("moreMenu");
    const mbtn = document.getElementById("moreBtn");
    if (more) more.hidden = true;
    if (mbtn) mbtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  /* Backup ---------------------------------------------------------------- */

  function exportBackup() {
    const data = {
      app: "Naturopata Digitale",
      version: 1,
      exportedAt: new Date().toISOString(),
      favs: Array.from(state.favs),
      read: Array.from(state.read),
      quiz: state.quizStats
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "naturopata-digitale-backup.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Backup esportato. Conservalo in un luogo sicuro.");
  }

  function importBackup(file) {
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const data = JSON.parse(reader.result);
        if (!data || typeof data !== "object") throw new Error("Formato non valido");
        if (!Array.isArray(data.favs) || !Array.isArray(data.read)) throw new Error("Campi mancanti");
        if (!confirm("Importare il backup? I dati attuali di preferiti, letture e quiz verranno sostituiti.")) return;
        state.favs = new Set(data.favs.filter((x) => typeof x === "string"));
        state.read = new Set(data.read.filter((x) => typeof x === "string"));
        if (data.quiz && typeof data.quiz === "object") {
          state.quizStats = {
            played: Number(data.quiz.played) || 0,
            best: Number(data.quiz.best) || 0,
            correct: Number(data.quiz.correct) || 0,
            total: Number(data.quiz.total) || 0,
            byCat: data.quiz.byCat && typeof data.quiz.byCat === "object" ? data.quiz.byCat : {}
          };
        }
        A.saveFavs();
        A.saveRead();
        A.saveQuizStats();
        A.render();
        toast("Backup importato.");
      } catch (e) {
        alert("Il file non sembra un backup valido di Naturopata Digitale.");
      }
    };
    reader.readAsText(file, "utf-8");
  }

  function resetData() {
    if (!confirm("Cancellare preferiti, letture e statistiche dei quiz da questo dispositivo? L'operazione non si può annullare.")) return;
    try {
      Object.keys(localStorage).forEach((k) => { if (k.indexOf(A.PREFIX) === 0) localStorage.removeItem(k); });
    } catch (e) {}
    state.favs = new Set();
    state.read = new Set();
    state.quizStats = { played: 0, best: 0, correct: 0, total: 0, byCat: {} };
    A.state.chat = [];
    location.hash = "#/";
    location.reload();
  }

  /* Eventi ---------------------------------------------------------------- */

  function bindGlobal() {
    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) themeBtn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      toast(next === "dark" ? "Tema scuro attivato." : "Tema chiaro attivato.");
    });

    const menuBtn = document.getElementById("menuBtn");
    if (menuBtn) menuBtn.addEventListener("click", () => {
      const nav = document.getElementById("mainNav");
      if (!nav) return;
      const open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("no-scroll", open && window.innerWidth < 900);
    });

    const moreBtn = document.getElementById("moreBtn");
    if (moreBtn) moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = document.getElementById("moreMenu");
      if (!menu) return;
      const open = menu.hidden;
      menu.hidden = !open;
      moreBtn.setAttribute("aria-expanded", String(open));
    });

    document.getElementById("mainNav").addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenus();
    });

    document.addEventListener("click", (e) => {
      const more = document.getElementById("moreMenu");
      if (more && !more.hidden && !e.target.closest(".nav-more")) {
        more.hidden = true;
        const b = document.getElementById("moreBtn");
        if (b) b.setAttribute("aria-expanded", "false");
      }

      const favBtn = e.target.closest("[data-fav]");
      if (favBtn) {
        const id = favBtn.getAttribute("data-fav");
        if (state.favs.has(id)) state.favs.delete(id); else state.favs.add(id);
        A.saveFavs();
        const has = state.favs.has(id);
        favBtn.setAttribute("aria-pressed", String(has));
        favBtn.className = "btn " + (has ? "btn-primary" : "btn-secondary") + " btn-small";
        favBtn.textContent = has ? "♥ Nei preferiti" : "♡ Aggiungi ai preferiti";
        toast(has ? "Aggiunta ai preferiti." : "Rimossa dai preferiti.");
      }

      const printBtn = e.target.closest("[data-print]");
      if (printBtn) { window.print(); }

      const scrollBtn = e.target.closest("[data-scroll]");
      if (scrollBtn) {
        const el = document.getElementById(scrollBtn.getAttribute("data-scroll"));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      const ask = e.target.closest("[data-ask]");
      if (ask) { e.preventDefault(); A.goNeura(ask.getAttribute("data-ask")); }

      const catChip = e.target.closest("[data-cat]");
      if (catChip) {
        const sel = document.getElementById("catFilter");
        if (sel) { sel.value = catChip.getAttribute("data-cat"); sel.dispatchEvent(new Event("change")); }
      }

      if (e.target.closest("[data-reset-filters]")) {
        state.filters = { q: "", cat: "tutte", safety: "tutte" };
        A.render();
      }

      const month = e.target.closest("[data-month]");
      if (month) {
        state.calMonth = parseInt(month.getAttribute("data-month"), 10) || (new Date().getMonth() + 1);
        A.render();
      }

      const exportBtn = e.target.closest("[data-export]");
      if (exportBtn) exportBackup();
      const importBtn = e.target.closest("[data-import]");
      if (importBtn) { const f = document.getElementById("importFile"); if (f) f.click(); }
      const resetBtn = e.target.closest("[data-reset]");
      if (resetBtn) resetData();

      const nqBtn = e.target.closest(".neura-quiz .option");
      if (nqBtn && !nqBtn.disabled) {
        const wrap = nqBtn.closest(".neura-quiz");
        const correct = nqBtn.getAttribute("data-correct") === "1";
        const exp = nqBtn.getAttribute("data-exp") || "";
        wrap.querySelectorAll(".option").forEach((b) => {
          b.disabled = true;
          if (b.getAttribute("data-correct") === "1") b.classList.add("is-correct");
        });
        if (!correct) nqBtn.classList.add("is-wrong");
        const msg = document.createElement("p");
        msg.className = "text-small";
        msg.style.marginTop = ".5rem";
        msg.innerHTML = correct ? "<strong>Giusto.</strong> " : "<strong>Non è questa.</strong> La risposta corretta è evidenziata. ";
        msg.innerHTML += "Proprietà della pianta: " + A.esc(exp) + ".";
        wrap.appendChild(msg);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenus();
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || e.target.isContentEditable) return;
      if (location.hash.indexOf("#/quiz") === 0 && state.quiz) {
        if (["1", "2", "3", "4"].indexOf(e.key) !== -1) {
          e.preventDefault();
          A.views.quizKey(parseInt(e.key, 10) - 1);
        } else if (e.key === "Enter") {
          e.preventDefault();
          A.views.quizNextKey();
        }
      }
    });

    document.addEventListener("change", (e) => {
      if (e.target && e.target.id === "importFile" && e.target.files && e.target.files[0]) {
        importBackup(e.target.files[0]);
        e.target.value = "";
      }
    });

    window.addEventListener("scroll", () => {
      const header = document.getElementById("siteHeader");
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    }, { passive: true });

    window.addEventListener("resize", () => { if (window.innerWidth >= 900) closeMenus(); });

    window.addEventListener("hashchange", A.render);
  }

  /* Avvio ----------------------------------------------------------------- */

  function init() {
    bindGlobal();
    A.render();
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {});
      });
    }
    document.documentElement.classList.add("js-ready");
  }

  init();
})();
