/* ==========================================================================
   Naturopata Digitale · ricerca rapida
   Licenza del codice: MIT · Danilo D'Auria
   --------------------------------------------------------------------------
   Indice locale di pagine, piante, capitoli, schede e glossario: la ricerca
   non manda nulla in rete e funziona anche offline.
   ========================================================================== */

(function () {
  "use strict";

  const A = NP.app;
  const esc = A.esc;

  /* ordine in cui i risultati si mostrano, un gruppo dopo l'altro */
  const GRUPPI = ["Pagine", "Piante", "Manuale", "Benessere", "Glossario"];

  let modal, input, esiti, aiuto;
  let voci = [], mostrati = [], attivo = -1, ultimoFocus = null;

  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
  }

  function lista(x) {
    return Array.isArray(x) ? x.filter(Boolean).join(" ") : "";
  }

  /* parole che la gente usa davvero, anche se non sono nel nome del menu */
  const PAROLE = {
    "#/erbario": "piante schede erbario officinali riconoscere",
    "#/manuale": "manuale capitoli leggere studiare",
    "#/fitoalimurgia": "raccolta cucinare selvatiche commestibili",
    "#/benessere": "disturbi sonno stress digestione pelle",
    "#/quiz": "domande test verifica punteggio allenamento",
    "#/neura": "assistente domande risposte aiuto",
    "#/sopravvivenza": "sopravvivenza acqua fuoco orientarsi",
    "#/matthioli": "mattioli dioscoride discorsi storia botanica",
    "#/calendario": "calendario raccolta mesi stagioni",
    "#/spezierie": "spezierie farmacie abbazia storia",
    "#/amari": "amari liquori erbe alcolici",
    "#/balsamico": "balsamico aceto tempo ricette",
    "#/funghi": "funghi foraging bosco reishi",
    "#/estrazioni": "oleoliti distillati oli essenziali estrazioni",
    "#/glossario": "glossario parole termini definizioni",
    "#/sicurezza": "sicurezza fonti interazioni gravidanza",
    "#/licenze": "licenze copyright progetto privacy"
  };

  /* tutte le cose raggiungibili: prima il menu, poi le pagine utili che non
     stanno nel menu, quindi piante, capitoli, schede e voci. Una sola voce per
     destinazione: le pagine già nel menu non si ripetono. */
  function indice() {
    const out = [], viste = new Set();

    function aggiungi(v) {
      const chiave = v.via + "|" + v.nome;
      if (!v.nome || !v.via || viste.has(chiave)) return;
      viste.add(chiave);
      out.push(v);
    }

    document.querySelectorAll("#mainNav a").forEach(function (a) {
      const via = a.getAttribute("href") || "";
      aggiungi({
        nome: (a.textContent || "").trim(),
        via: via,
        percorso: a.closest(".nav-more-menu") ? "Altro" : "Menu",
        gruppo: "Pagine",
        kw: PAROLE[via] || ""
      });
    });

    [
      ["Pagina iniziale", "#/", "Home", "home inizio casa"],
      ["Come si installa", "come-installare.html", "Guide", "installare app computer windows mac linux"],
      ["Scheda rapida", "scheda-rapida.html", "Guide", "scheda rapida stampa riassunto"],
      ["Versioni e novità", "versioni.html", "Guide", "versioni aggiornamenti storia cambiamenti"],
      ["Scarica per computer", "scarica/index.html", "Guide", "scaricare programmi pacchetti installazione impronte"],
      ["Vademecum in PDF", "assets/pdf/vademecum-naturopata-digitale.pdf", "Guide", "vademecum pdf stampa leggere"]
    ].forEach(function (e) {
      aggiungi({ nome: e[0], via: e[1], percorso: e[2], gruppo: "Pagine", kw: e[3] });
    });

    (NP.plants || []).forEach(function (p) {
      const cat = (p.categorie || [])[0];
      aggiungi({
        nome: p.nome,
        via: "#/pianta/" + p.id,
        percorso: cat ? "Erbario › " + cat : "Erbario",
        gruppo: "Piante",
        kw: [p.latino, p.famiglia, lista(p.nomi), lista(p.categorie), lista(p.proprieta), lista(p.usi), p.sintesi].filter(Boolean).join(" ")
      });
    });

    const parti = NP.manualParts || [];
    (NP.manual || []).forEach(function (c) {
      const parte = parti.filter(function (x) { return x.id === c.parte; })[0];
      aggiungi({
        nome: c.titolo,
        via: "#/capitolo/" + c.id,
        percorso: "Manuale › " + (parte ? parte.titolo : "Capitoli"),
        gruppo: "Manuale",
        kw: [c.occhiello, lista(c.tags), "capitolo " + (c.n || "")].filter(Boolean).join(" ")
      });
    });

    (NP.conditions || []).forEach(function (c) {
      aggiungi({
        nome: c.titolo,
        via: "#/benessere/" + c.id,
        percorso: "Benessere",
        gruppo: "Benessere",
        kw: [c.sintesi, lista(c.segnali)].filter(Boolean).join(" ")
      });
    });

    (NP.glossary || []).forEach(function (g) {
      aggiungi({ nome: g.t, via: "#/glossario", percorso: "Glossario", gruppo: "Glossario", kw: g.d });
    });

    return out;
  }

  /* tutte le parole della ricerca devono comparire; vince chi ha il nome
     che comincia con quello che si è scritto */
  function filtra(q) {
    const t = norm(q).split(" ").filter(Boolean);
    if (!t.length) return voci;
    const frase = t.join(" ");
    return voci.map(function (v) {
      const nome = norm(v.nome);
      const hay = norm([v.nome, v.kw, v.percorso].join(" "));
      if (!t.every(function (x) { return hay.indexOf(x) >= 0; })) return null;
      let s = 0;
      if (nome === frase) s += 120;
      else if (nome.indexOf(frase) === 0) s += 90;
      else if (nome.indexOf(frase) >= 0) s += 60;
      t.forEach(function (x) {
        if (nome.indexOf(x) === 0) s += 25;
        else if (nome.indexOf(x) >= 0) s += 15;
      });
      if (norm(v.kw).indexOf(frase) >= 0) s += 12;
      if (norm(v.percorso).indexOf(frase) >= 0) s += 5;
      return { v: v, s: s - Math.min(nome.length, 80) / 100 };
    }).filter(Boolean)
      .sort(function (a, b) { return b.s - a.s || a.v.nome.localeCompare(b.v.nome, "it"); })
      .map(function (x) { return x.v; });
  }

  function notaIniziale() {
    const n = {};
    voci.forEach(function (v) { n[v.gruppo] = (n[v.gruppo] || 0) + 1; });
    return "Scrivi per cercare anche tra " + n.Piante + " piante, " + n.Manuale + " capitoli, " + n.Benessere + " schede e " + n.Glossario + " voci di glossario.";
  }

  function righe() {
    let html = "", gruppo = "";
    mostrati.forEach(function (v, i) {
      if (v.gruppo !== gruppo) {
        gruppo = v.gruppo;
        const n = mostrati.filter(function (x) { return x.gruppo === gruppo; }).length;
        html += '<p class="cerca-gruppo">' + gruppo + " · " + n + "</p>";
      }
      html += '<button type="button" role="option" class="cerca-voce" id="cercaVoce' + i + '" data-i="' + i + '" aria-selected="' + (i === attivo ? "true" : "false") + '">' +
        '<span class="cerca-nome">' + esc(v.nome) + "</span>" +
        '<span class="cerca-percorso">' + esc(v.percorso) + "</span>" +
        "</button>";
    });
    return html;
  }

  function disegna() {
    const q = input.value.trim();
    const trovati = q ? filtra(q) : voci.filter(function (v) { return v.gruppo === "Pagine"; });
    const scelti = trovati.slice(0, 40);
    mostrati = [];
    GRUPPI.forEach(function (g) {
      scelti.forEach(function (v) { if (v.gruppo === g) mostrati.push(v); });
    });
    attivo = mostrati.length ? 0 : -1;
    esiti.innerHTML = mostrati.length
      ? righe()
      : '<p class="cerca-vuoto">Nessun risultato per «' + esc(q) + '». Prova con una parola più semplice: malva, sonno, tintura.</p>';
    aiuto.textContent = q
      ? (trovati.length > 40 ? "Primi 40 risultati: affina la ricerca." : trovati.length + (trovati.length === 1 ? " risultato" : " risultati"))
      : notaIniziale();
    input.setAttribute("aria-expanded", String(!!mostrati.length));
    input.setAttribute("aria-activedescendant", mostrati.length ? "cercaVoce0" : "");
  }

  function evidenzia(i) {
    const vociEl = esiti.querySelectorAll(".cerca-voce");
    if (!vociEl.length) return;
    attivo = (i + vociEl.length) % vociEl.length;
    vociEl.forEach(function (el, n) { el.setAttribute("aria-selected", n === attivo ? "true" : "false"); });
    const el = vociEl[attivo];
    input.setAttribute("aria-activedescendant", el.id);
    try { el.scrollIntoView({ block: "nearest" }); } catch (e) { /* niente */ }
  }

  function apriVoce(v) {
    if (!v) return;
    chiudi();
    if (v.via.charAt(0) === "#") location.hash = v.via;
    else window.open(v.via, "_blank", "noopener");
  }

  function apri() {
    if (!modal) return;
    ultimoFocus = document.activeElement;
    A.closeMenus();
    voci = indice();
    input.value = "";
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    disegna();
    input.focus();
  }

  function chiudi() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (ultimoFocus && ultimoFocus.focus && document.contains(ultimoFocus)) ultimoFocus.focus();
  }

  function avvia() {
    modal = document.getElementById("cercaModal");
    if (!modal) return;
    const box = modal.querySelector(".cerca-box");
    const chiudiBtn = document.getElementById("cercaChiudi");
    input = document.getElementById("cercaInput");
    esiti = document.getElementById("cercaEsiti");
    aiuto = document.getElementById("cercaAiuto");

    /* il tasto mostrato è quello giusto anche su Mac */
    if (/Mac|iPhone|iPad|iPod/.test(navigator.platform || "")) {
      document.querySelectorAll(".cerca-tasto").forEach(function (k) { k.textContent = "⌘ K"; });
    }

    [document.getElementById("cercaBtn"), document.getElementById("cercaNav")].forEach(function (b) {
      if (b) b.addEventListener("click", apri);
    });
    if (chiudiBtn) chiudiBtn.addEventListener("click", chiudi);
    modal.addEventListener("click", function (e) { if (e.target === modal) chiudi(); });
    esiti.addEventListener("click", function (e) {
      const b = e.target.closest(".cerca-voce");
      if (b) apriVoce(mostrati[Number(b.getAttribute("data-i"))]);
    });
    input.addEventListener("input", disegna);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); evidenzia(attivo + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); evidenzia(attivo - 1); }
      else if (e.key === "Enter") { e.preventDefault(); apriVoce(mostrati[attivo]); }
    });
    /* il fuoco resta fra campo e chiusura: le voci si scelgono con le frecce */
    box.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      const fuori = [input, chiudiBtn].filter(Boolean);
      const i = fuori.indexOf(document.activeElement);
      e.preventDefault();
      fuori[(i + (e.shiftKey ? -1 : 1) + fuori.length) % fuori.length].focus();
    });
    window.addEventListener("hashchange", chiudi);
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (modal.hidden) apri();
        else { input.focus(); input.select(); }
      } else if (e.key === "Escape" && !modal.hidden) {
        chiudi();
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", avvia);
  else avvia();
})();
