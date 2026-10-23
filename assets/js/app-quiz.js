/* ==========================================================================
   Naturopata Digitale · motore del quiz
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

(function () {
  "use strict";

  const A = NP.app;
  const views = A.views;
  const esc = A.esc;
  const LEVELS = { base: "Base", intermedio: "Intermedio", esperto: "Esperto" };

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function filtered(cat, level) {
    return (NP.quiz || []).filter((q) => (cat === "tutte" || q.cat === cat) && (level === "tutti" || q.livello === level));
  }

  function stopTimer() {
    if (A.state.quizTimer) { clearInterval(A.state.quizTimer); A.state.quizTimer = null; }
  }

  function setupView() {
    const cats = NP.quizCategories || [];
    const stats = A.state.quizStats || {};
    const byCat = stats.byCat || {};
    A.page(
      '<div class="page-head"><p class="eyebrow">Quiz interattivo</p><h1>Quanto conosci le piante?</h1>' +
        '<p class="lead">' + (NP.quiz || []).length + ' domande su riconoscimento, proprietà, sicurezza, preparazioni, fitoalimurgia e fondamenti. Ogni risposta ha una spiegazione, anche quando è sbagliata.</p></div>' +
      '<div class="quiz-setup"><div class="quiz-setup-panel">' +
        '<div class="field-row two">' +
          '<label><span class="label">Categoria</span><select class="select" id="quizCat"><option value="tutte">Tutte le categorie</option>' +
            cats.map((c) => '<option value="' + c.id + '">' + esc(c.nome) + " — " + esc(c.desc) + "</option>").join("") +
          "</select></label>" +
          '<label><span class="label">Livello</span><select class="select" id="quizLevel"><option value="tutti">Tutti i livelli</option><option value="base">Base</option><option value="intermedio">Intermedio</option><option value="esperto">Esperto</option></select></label>' +
        "</div>" +
        '<div class="field-row two mt-2">' +
          '<label><span class="label">Numero di domande</span><select class="select" id="quizCount"><option value="10">10 domande</option><option value="20">20 domande</option><option value="999">Tutte quelle disponibili</option></select></label>' +
          '<div><span class="label">Tempo</span><label class="check" style="padding-top:.6rem"><input type="checkbox" id="quizTimerOn"> Timer di 30 secondi per domanda</label></div>' +
        "</div>" +
        '<div class="mt-2"><button class="btn btn-primary btn-block" type="button" data-quiz-start>Inizia il quiz ' + A.ico("spark") + "</button></div>" +
        '<p class="text-small muted" style="margin:.8rem 0 0">Puoi usare i tasti 1–4 per rispondere e Invio per passare alla domanda successiva. I progressi restano sul tuo dispositivo.</p>' +
      "</div>" +
      '<div class="panel panel-soft mt-2"><h2>Il tuo percorso</h2><div class="quiz-stats-panel">' +
        '<div class="mini-stat"><strong>' + (stats.played || 0) + "</strong><span>quiz completati</span></div>" +
        '<div class="mini-stat"><strong>' + (stats.best || 0) + "%</strong><span>miglior punteggio</span></div>" +
        '<div class="mini-stat"><strong>' + (stats.correct || 0) + "/" + (stats.total || 0) + "</strong><span>risposte corrette</span></div>" +
        '<div class="mini-stat"><strong>' + (stats.total ? Math.round(stats.correct / stats.total * 100) : 0) + "%</strong><span>media</span></div>" +
      "</div>" +
      (Object.keys(byCat).length ? '<div class="mt-2"><p class="text-small muted mb-0">Per categoria: ' + Object.keys(byCat).map((k) => {
        const c = cats.find((x) => x.id === k);
        return esc(c ? c.nome : k) + " " + (byCat[k].n ? Math.round(byCat[k].ok / byCat[k].n * 100) : 0) + "%";
      }).join(" · ") + "</p></div>" : "") +
      "</div></div>",
      "view-quiz-setup"
    );

    const btn = document.querySelector("[data-quiz-start]");
    if (btn) btn.addEventListener("click", startFromForm);
  }

  function startFromForm() {
    const cat = (document.getElementById("quizCat") || {}).value || "tutte";
    const level = (document.getElementById("quizLevel") || {}).value || "tutti";
    const count = parseInt((document.getElementById("quizCount") || {}).value || "10", 10);
    const timerOn = !!((document.getElementById("quizTimerOn") || {}).checked);
    startQuiz({ cat, level, count, timerOn });
  }

  function startQuiz(opts) {
    stopTimer();
    const pool = filtered(opts.cat, opts.level);
    if (!pool.length) {
      A.page('<div class="empty-state"><h1>Nessuna domanda</h1><p>Con questi filtri non ci sono domande disponibili. Prova ad allargare la selezione.</p><a class="btn btn-primary" href="#/quiz">Torna al quiz</a></div>');
      return;
    }
    const items = shuffle(opts.items || pool).slice(0, opts.items ? opts.items.length : Math.min(opts.count || 10, pool.length));
    A.state.quiz = {
      items: items,
      index: 0,
      correct: 0,
      answers: [],
      locked: false,
      timerOn: !!opts.timerOn,
      seconds: 30,
      cat: opts.cat,
      level: opts.level,
      saved: false
    };
    renderQuestion();
  }

  function renderQuestion() {
    stopTimer();
    const quiz = A.state.quiz;
    if (!quiz) return setupView();
    if (quiz.index >= quiz.items.length) return renderResult();
    const q = quiz.items[quiz.index];
    const cat = (NP.quizCategories || []).find((c) => c.id === q.cat);
    const pct = Math.round((quiz.index / quiz.items.length) * 100);
    const letters = ["A", "B", "C", "D"];

    A.page(
      '<div class="quiz-shell">' +
        '<div class="quiz-top">' +
          '<span class="quiz-counter">Domanda ' + (quiz.index + 1) + " di " + quiz.items.length + " · " + esc(cat ? cat.nome : "") + "</span>" +
          '<div style="display:flex;gap:.5rem;align-items:center">' +
            '<span class="tag tag-line">' + esc(LEVELS[q.livello] || q.livello) + "</span>" +
            (quiz.timerOn ? '<span class="quiz-timer" id="quizTimer">30 s</span>' : "") +
          "</div>" +
        "</div>" +
        '<div class="quiz-progress"><span style="width:' + pct + '%"></span></div>' +
        '<div class="question-card">' +
          '<div class="question-meta"><span class="eyebrow" style="margin:0">' + esc(cat ? cat.nome : "Quiz") + "</span></div>" +
          "<h2>" + esc(q.q) + "</h2>" +
          '<div class="options" id="quizOptions">' +
            q.o.map((o, i) => '<button class="option" type="button" data-opt="' + i + '"><span class="option-key">' + letters[i] + "</span><span>" + esc(o) + "</span></button>").join("") +
          "</div>" +
          '<div id="answerBox"></div>' +
          '<div class="quiz-actions"><button class="btn btn-ghost btn-small" type="button" data-quit-quiz>Esci</button><span id="nextWrap"></span></div>' +
        "</div>" +
      "</div>",
      "view-quiz-question"
    );

    document.querySelectorAll("[data-opt]").forEach((btn) => {
      btn.addEventListener("click", () => answer(parseInt(btn.getAttribute("data-opt"), 10)));
    });
    const quit = document.querySelector("[data-quit-quiz]");
    if (quit) quit.addEventListener("click", () => { stopTimer(); A.state.quiz = null; setupView(); });

    if (quiz.timerOn) {
      quiz.seconds = 30;
      const el = document.getElementById("quizTimer");
      A.state.quizTimer = setInterval(() => {
        quiz.seconds -= 1;
        if (el) {
          el.textContent = quiz.seconds + " s";
          el.classList.toggle("is-low", quiz.seconds <= 10);
        }
        if (quiz.seconds <= 0) {
          stopTimer();
          answer(-1, true);
        }
      }, 1000);
    }
  }

  function answer(chosen, timeout) {
    const quiz = A.state.quiz;
    if (!quiz || quiz.locked) return;
    quiz.locked = true;
    stopTimer();
    const q = quiz.items[quiz.index];
    const ok = chosen === q.r;
    if (ok) quiz.correct++;
    quiz.answers.push({ q, chosen, ok });

    document.querySelectorAll("[data-opt]").forEach((btn) => {
      const i = parseInt(btn.getAttribute("data-opt"), 10);
      btn.disabled = true;
      if (i === q.r) btn.classList.add("is-correct");
      if (i === chosen && !ok) btn.classList.add("is-wrong");
    });

    const box = document.getElementById("answerBox");
    if (box) {
      box.className = "answer-box " + (ok ? "is-good" : "is-bad");
      box.innerHTML = "<strong>" + (ok ? "Giusto." : timeout ? "Tempo scaduto." : "Non è questa.") + "</strong>" +
        "<p>La risposta corretta è: <strong>" + esc(q.o[q.r]) + "</strong>.</p>" +
        "<p>" + esc(q.e) + "</p>" +
        '<p class="mb-0"><a href="' + catLink(q.cat) + '">Approfondisci questo tema →</a></p>';
    }
    const next = document.getElementById("nextWrap");
    if (next) {
      next.innerHTML = '<button class="btn btn-primary btn-small" type="button" data-next-quiz>' + (quiz.index + 1 >= quiz.items.length ? "Vedi il risultato" : "Domanda successiva") + " " + A.ico("arrow") + "</button>";
      const b = next.querySelector("[data-next-quiz]");
      if (b) b.addEventListener("click", () => {
        quiz.index++;
        quiz.locked = false;
        renderQuestion();
      });
    }
  }

  function catLink(cat) {
    if (cat === "riconoscimento" || cat === "proprieta") return "#/erbario";
    if (cat === "sicurezza") return "#/sicurezza";
    if (cat === "preparazioni") return "#/capitolo/forme-d-uso";
    if (cat === "fitoalimurgia") return "#/fitoalimurgia";
    return "#/manuale";
  }

  function renderResult() {
    stopTimer();
    const quiz = A.state.quiz;
    if (!quiz) return setupView();
    const total = quiz.items.length;
    const pct = Math.round((quiz.correct / total) * 100);
    const wrong = quiz.answers.filter((a) => !a.ok);

    if (!quiz.saved) {
      quiz.saved = true;
      const s = A.state.quizStats;
      s.played = (s.played || 0) + 1;
      s.correct = (s.correct || 0) + quiz.correct;
      s.total = (s.total || 0) + total;
      s.best = Math.max(s.best || 0, pct);
      s.byCat = s.byCat || {};
      quiz.items.forEach((q, i) => {
        const a = quiz.answers[i];
        if (!a) return;
        s.byCat[q.cat] = s.byCat[q.cat] || { n: 0, ok: 0 };
        s.byCat[q.cat].n++;
        if (a.ok) s.byCat[q.cat].ok++;
      });
      A.saveQuizStats();
    }

    const msg = pct >= 90 ? "Eccellente: hai una conoscenza solida e attenta." : pct >= 70 ? "Molto bene: le basi sono solide, rivedi i punti più delicati." : pct >= 50 ? "Un buon inizio: rileggi le spiegazioni e riprova." : "Serve un altro giro: parti dalle schede e dal manuale, poi torna.";

    A.page(
      '<div class="quiz-shell"><div class="panel result-panel">' +
        '<div class="score-ring" style="--score:' + pct + '"><div class="score-inner"><strong>' + pct + "%</strong><span>risultato</span></div></div>" +
        "<h2>" + msg + "</h2>" +
        "<p>Hai risposto correttamente a <strong>" + quiz.correct + "</strong> domande su <strong>" + total + "</strong>.</p>" +
        '<div class="result-stats"><div><strong>' + quiz.correct + "</strong><span>corrette</span></div><div><strong>" + wrong.length + "</strong><span>da rivedere</span></div><div><strong>" + total + "</strong><span>domande</span></div></div>" +
        '<div class="hero-actions" style="justify-content:center">' +
          '<button class="btn btn-primary" type="button" data-quiz-reset>Nuovo quiz</button>' +
          (wrong.length ? '<button class="btn btn-secondary" type="button" data-quiz-review>Ripassa gli errori</button>' : "") +
          '<a class="btn btn-ghost" href="#/erbario">Torna all\'erbario</a>' +
        "</div>" +
        (wrong.length ? '<div class="review-list"><h3>Da rivedere</h3>' + wrong.map((a) =>
          '<div class="review-item"><div class="q">' + esc(a.q.q) + '</div><div class="a">Risposta corretta: ' + esc(a.q.o[a.q.r]) + '</div><div class="exp">' + esc(a.q.e) + "</div></div>"
        ).join("") + "</div>" : "") +
      "</div></div>",
      "view-quiz-result"
    );

    const reset = document.querySelector("[data-quiz-reset]");
    if (reset) reset.addEventListener("click", () => { A.state.quiz = null; setupView(); });
    const review = document.querySelector("[data-quiz-review]");
    if (review) review.addEventListener("click", () => {
      const items = wrong.map((a) => a.q);
      startQuiz({ cat: "tutte", level: "tutti", count: items.length, timerOn: false, items: items });
    });
  }

  function key(n) {
    const quiz = A.state.quiz;
    if (!quiz || quiz.locked) return;
    const btn = document.querySelector('[data-opt="' + n + '"]');
    if (btn) btn.click();
  }

  function nextKey() {
    const btn = document.querySelector("[data-next-quiz]");
    if (btn) btn.click();
  }

  views.quiz = function () {
    if (A.state.quiz) {
      const qz = A.state.quiz;
      if (qz.index >= qz.items.length) { renderResult(); return; }
      if (qz.locked) {
        const last = qz.answers[qz.answers.length - 1];
        if (last && last.q === qz.items[qz.index]) {
          qz.answers.pop();
          if (last.ok) qz.correct--;
        }
        qz.locked = false;
      }
      renderQuestion();
    } else {
      setupView();
    }
  };
  views.quizKey = key;
  views.quizNextKey = nextKey;
  views.startQuiz = startQuiz;
})();
