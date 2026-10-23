/* ==========================================================================
   Naturopata Digitale · Neura, assistente di conoscenza locale
   Nessuna rete, nessun modello generativo: ricerca, regole e dati editoriali.
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.neura = (function () {
  "use strict";

  const STOP = new Set(("a ad al alla alle allo agli ai anche come con cosa che chi ci da dal dalla dalle dagli dai dei del della delle degli dello di e è ed era essere fa fare fra gli ha hai hanno ho i il in io la le lei lo ma mi mia mio ne nei nel nella nelle nello no non o per più piu può puo quale quali quando quanto se sei si sia sono su sul sulla sulle tra tu tua tuo un una uno vi voi c'è ce cosa devo posso vorrei mi dammi dimmi spiegami parlami aiuto grazie ciao salve buongiorno buonasera per favore info informazione informazioni").split(/\s+/));

  const SYNONYMS = {
    insonnia: "sonno dormire riposo notte",
    dormire: "sonno insonnia",
    ansia: "stress nervoso calmante",
    stress: "ansia nervoso adattogeno",
    gonfiore: "digestione meteorismo pancia",
    pancia: "digestione gonfiore intestino",
    digestione: "stomaco intestino digestivo",
    tosse: "respiratorio gola catarro",
    raffreddore: "respiratorio immunità stagionale",
    pressione: "ipertensione cardiovascolare",
    ipertensione: "pressione cuore",
    pelle: "cutaneo dermatite ferita",
    mestruazioni: "ciclo premestruale",
    menopausa: "vampate ciclo",
    articolazioni: "dolori muscoli infiammazione",
    fegato: "epatobiliare colagogo",
    reni: "urinario diuretico",
    gravidanza: "gravidanza allattamento",
    bambino: "bambini pediatrico",
    sonnolenza: "sedativo sonno",
    mal: "dolore",
    testa: "cefalea emicrania",
    "mal di testa": "cefalea emicrania",
    detox: "depurativo fegato",
    dimagrire: "peso dieta",
    immunità: "difese raffreddore",
    difese: "immunità raffreddore"
  };

  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/['’]/g, " ")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function stem(w) {
    if (w.length <= 3) return w;
    return w
      .replace(/(azioni|azione|zioni|zione|mente|ità|ita)$/, "")
      .replace(/(ell|ett|iss|ic|iv|os|al|ar|at|ut|abil|ibil)$/, "")
      .replace(/[aeiou]$/, "");
  }

  function tokens(s) {
    const out = [];
    norm(s).split(" ").forEach((w) => {
      if (!w || w.length < 3 || STOP.has(w)) return;
      out.push(stem(w));
      if (SYNONYMS[w]) SYNONYMS[w].split(" ").forEach((x) => out.push(stem(x)));
    });
    return out;
  }

  let docs = [];
  let df = {};
  let built = false;

  function addDoc(doc) {
    const text = doc.text || "";
    const tk = tokens(doc.title + " " + text);
    const tf = {};
    tk.forEach((t) => { tf[t] = (tf[t] || 0) + 1; });
    doc.tf = tf;
    doc.len = tk.length || 1;
    doc.type = doc.type || "doc";
    docs.push(doc);
    Object.keys(tf).forEach((t) => { df[t] = (df[t] || 0) + 1; });
  }

  function build() {
    docs = [];
    df = {};
    (NP.plants || []).forEach((p) => {
      addDoc({
        type: "plant", id: p.id, title: p.nome,
        meta: p.latino + " · " + p.famiglia,
        text: [p.nome, p.latino, (p.nomi || []).join(" "), p.sintesi, p.descrizione,
          (p.proprieta || []).join(" "), (p.usi || []).join(" "),
          (p.preparazioni || []).map((x) => x.nome + " " + x.ricetta).join(" "),
          p.sicurezza ? [p.sicurezza.gravidanza, p.sicurezza.bambini, p.sicurezza.nota, (p.sicurezza.controindicazioni || []).join(" "), (p.sicurezza.interazioni || []).join(" ")].join(" ") : "",
          p.fito ? [p.fito.cucina, p.fito.parti, p.fito.nota].join(" ") : "",
          p.evidenza, p.curiosita, (p.sosia || []).map((s) => s.nome + " " + s.rischio).join(" ")
        ].join(" "),
        weight: 1.6
      });
    });
    (NP.manual || []).forEach((c) => {
      addDoc({
        type: "chapter", id: c.id, title: c.titolo,
        meta: "Manuale · capitolo " + c.n,
        text: (c.tags || []).join(" ") + " " + c.occhiello + " " + String(c.html || "").replace(/<[^>]+>/g, " "),
        weight: 1.25
      });
    });
    (NP.conditions || []).forEach((c) => {
      addDoc({
        type: "condition", id: c.id, title: c.titolo,
        text: [c.sintesi, (c.segnali || []).join(" "), (c.cosaAiuta || []).join(" "), (c.attenzione || []).join(" "), c.evidenza].join(" "),
        weight: 1.4
      });
    });
    (NP.glossary || []).forEach((g) => {
      addDoc({ type: "glossary", id: g.t, title: g.t, text: g.d, weight: 1 });
    });
    (NP.toxic || []).forEach((t) => {
      addDoc({
        type: "toxic", id: t.nome, title: t.nome,
        text: [t.latino, t.caratteri, t.sintomi, t.sosia].join(" "),
        weight: 1.8
      });
    });
    (NP.interactions || []).forEach((it, i) => {
      addDoc({ type: "interaction", id: "int-" + i, title: it.pianta, text: it.farmaci + " " + it.effetto, weight: 1.3 });
    });
    built = true;
  }

  function ensure() { if (!built) build(); }

  function search(query, limit) {
    ensure();
    const qtk = tokens(query);
    if (!qtk.length) return [];
    const N = docs.length;
    const scores = [];
    const qset = {};
    qtk.forEach((t) => { qset[t] = (qset[t] || 0) + 1; });
    const unique = Object.keys(qset);
    docs.forEach((d) => {
      let s = 0;
      let matched = 0;
      unique.forEach((t) => {
        const tf = d.tf[t] || 0;
        if (!tf) return;
        matched++;
        const idf = Math.log(1 + N / (1 + (df[t] || 0)));
        s += (tf / (tf + 1.2)) * idf * (qset[t] || 1);
      });
      const coverage = matched / unique.length;
      if (s > 0 && coverage >= 0.5) scores.push({ doc: d, score: s * (d.weight || 1) * (0.6 + coverage) });
    });
    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, limit || 5);
  }

  const PLURALS = {
    ortiche: "ortica", camomille: "camomilla", malve: "malva", salvie: "salvia",
    calendule: "calendula", lavande: "lavanda", valeriane: "valeriana",
    passiflore: "passiflora", melisse: "melissa", echinacee: "echinacea",
    liquirizie: "liquirizia", cicorie: "cicoria", piantaggini: "piantaggine",
    sambuchi: "sambuco", finocchi: "finocchio", tarassachi: "tarassaco",
    biancospini: "biancospino", allori: "alloro", olivi: "olivo",
    rose: "rosa canina", timi: "timo", luppoli: "luppolo"
  };

  function findPlants(text) {
    let n = " " + norm(text) + " ";
    Object.keys(PLURALS).forEach((p) => {
      n = n.replace(new RegExp("\\b" + p + "\\b", "g"), PLURALS[p]);
    });
    const found = [];
    (NP.plants || []).forEach((p) => {
      const names = [p.nome, p.latino].concat(p.nomi || []);
      for (const name of names) {
        const nn = norm(name);
        if (nn.length < 3) continue;
        if (n.indexOf(" " + nn + " ") !== -1) { found.push(p); break; }
      }
    });
    return found;
  }

  function findToxic(text) {
    const n = norm(text);
    return (NP.toxic || []).filter((t) => {
      const names = [t.nome, t.latino].map(norm);
      return names.some((x) => n.indexOf(x) !== -1);
    });
  }

  function findCondition(text) {
    const n = norm(text);
    const keys = {
      sonno: ["sonno", "insonnia", "dormire", "addorment", "svegli"],
      stress: ["stress", "ansia", "ansios", "panico", "nervos", "tensione"],
      digestione: ["digestion", "gonfior", "pancia", "intestin", "stomaco", "meteorism", "stitichezz", "diarrea"],
      pelle: ["pelle", "dermatit", "prurito", "arrossament", "ferita", "ustione", "acne"],
      respiratorio: ["tosse", "raffreddor", "gola", "catarro", "bronch", "naso", "influenz"],
      ciclo: ["mestru", "ciclo", "menopaus", "vampat", "premestru", "ovaie"],
      articolazioni: ["articolaz", "dolor", "muscol", "rigidit", "schiena", "ginocch"],
      difese: ["difes", "immunit", "raffreddor", "influenz", "stagional"]
    };
    for (const id of Object.keys(keys)) {
      if (keys[id].some((k) => n.indexOf(k) !== -1)) {
        return (NP.conditions || []).find((c) => c.id === id) || null;
      }
    }
    return null;
  }

  function plantLink(p) { return '<a href="#/pianta/' + p.id + '">' + escapeHtml(p.nome) + "</a>"; }
  function chapterLink(c) { return '<a href="#/capitolo/' + c.id + '">' + escapeHtml(c.titolo) + "</a>"; }
  function conditionLink(c) { return '<a href="#/benessere/' + c.id + '">' + escapeHtml(c.titolo) + "</a>"; }

  function safetyLine(p) {
    const s = p.sicurezza || {};
    const label = s.livello === "rosso" ? "cautela alta" : s.livello === "giallo" ? "cautela" : "uso tradizionale";
    return '<span class="badge-dot safety-' + (s.livello || "verde") + '">' + label + "</span>";
  }

  function plantAnswer(p, intent, query) {
    const s = p.sicurezza || {};
    if (intent === "safety") {
      return {
        html: '<p><strong>' + escapeHtml(p.nome) + "</strong> <em>(" + escapeHtml(p.latino) + ")</em> — " + safetyLine(p) + "</p>" +
          '<p><strong>Gravidanza:</strong> ' + escapeHtml(s.gravidanza || "dati insufficienti") + "</p>" +
          '<p><strong>Allattamento:</strong> ' + escapeHtml(s.allattamento || "dati insufficienti") + "</p>" +
          '<p><strong>Bambini:</strong> ' + escapeHtml(s.bambini || "chiedere parere pediatrico") + "</p>" +
          ((s.controindicazioni || []).length ? "<p><strong>Evitare in caso di:</strong> " + escapeHtml(s.controindicazioni.join("; ")) + "</p>" : "") +
          ((s.interazioni || []).length ? "<p><strong>Interazioni:</strong> " + escapeHtml(s.interazioni.join("; ")) + "</p>" : "") +
          '<p class="muted">' + escapeHtml(s.nota || "") + "</p>" +
          '<p><a href="#/pianta/' + p.id + '">Apri la scheda completa</a> · <a href="#/sicurezza">Sicurezza e fonti</a></p>',
        plant: p
      };
    }
    if (intent === "prep") {
      const nq = norm(query || "");
      const focus = /tintura/.test(nq) ? "tintura" : /infuso/.test(nq) ? "infuso" : /decotto/.test(nq) ? "decotto" : /sciroppo/.test(nq) ? "sciroppo" : /oleolito/.test(nq) ? "oleolito" : "";
      let preps = p.preparazioni || [];
      let focusMissing = false;
      if (focus) {
        const filtered = preps.filter((x) => norm(x.nome).indexOf(focus) !== -1);
        if (filtered.length) preps = filtered;
        else focusMissing = true;
      }
      return {
        html: "<p><strong>" + escapeHtml(p.nome) + "</strong>: " + (focus ? (focusMissing ? "non è descritta una preparazione di questo tipo nella scheda; ecco quelle disponibili." : "la preparazione richiesta.") : "le preparazioni descritte nella scheda.") + "</p><ul>" +
          preps.map((x) => "<li><strong>" + escapeHtml(x.nome) + ":</strong> " + escapeHtml(x.ricetta) + " <span class=\"muted\">" + escapeHtml(x.dose || "") + "</span></li>").join("") +
          "</ul><p class=\"muted\">Dosi indicative: non sono prescrizioni. Leggi le avvertenze della scheda.</p><p><a href=\"#/pianta/" + p.id + "\">Scheda completa di " + escapeHtml(p.nome) + "</a></p>",
        plant: p
      };
    }
    if (intent === "harvest") {
      return {
        html: "<p><strong>" + escapeHtml(p.nome) + "</strong> si raccoglie in: <strong>" + monthNames(p.raccolta && p.raccolta.mesi) + "</strong>.</p>" +
          "<p>" + escapeHtml((p.raccolta && p.raccolta.nota) || "") + "</p>" +
          "<p><strong>Habitat:</strong> " + escapeHtml(p.habitat || "") + "</p>" +
          (p.fito && p.fito.commestibile ? "<p><strong>In cucina:</strong> " + escapeHtml(p.fito.cucina || "") + "</p>" : "") +
          "<p><a href=\"#/calendario\">Calendario di raccolta</a> · <a href=\"#/pianta/" + p.id + "\">Scheda</a></p>",
        plant: p
      };
    }
    if (intent === "lookalike") {
      const sos = p.sosia || [];
      return {
        html: "<p>Per <strong>" + escapeHtml(p.nome) + "</strong> i sosia da conoscere sono:</p>" +
          (sos.length ? "<ul>" + sos.map((x) => "<li><strong>" + escapeHtml(x.nome) + ":</strong> " + escapeHtml(x.rischio) + "</li>").join("") + "</ul>" : "<p>Non risultano sosia pericolosi specifici nella scheda, ma resta valida la regola: raccogli solo con certezza.</p>") +
          "<p class=\"muted\">In caso di dubbio, non raccogliere. In caso di ingestione sospetta, chiama subito il 112/118 o un Centro Antiveleni.</p>" +
          "<p><a href=\"#/fitoalimurgia\">Guida ai sosia e alla raccolta</a></p>",
        plant: p
      };
    }
    if (intent === "edible") {
      return {
        html: "<p><strong>" + escapeHtml(p.nome) + "</strong> " + (p.fito && p.fito.commestibile ? "è una pianta alimentare." : "non è una pianta alimentare.") + "</p>" +
          (p.fito && p.fito.commestibile
            ? "<p><strong>Parti:</strong> " + escapeHtml(p.fito.parti) + "<br><strong>Stagione:</strong> " + escapeHtml(p.fito.stagione) + "</p><p>" + escapeHtml(p.fito.cucina) + "</p><p class=\"muted\">" + escapeHtml(p.fito.nota || "") + "</p>"
            : "<p>Non usarla in cucina. " + escapeHtml((p.fito && p.fito.nota) || "") + "</p>") +
          "<p><a href=\"#/fitoalimurgia\">Fitoalimurgia: regole e sicurezza</a></p>",
        plant: p
      };
    }
    if (intent === "uses") {
      return {
        html: "<p><strong>" + escapeHtml(p.nome) + "</strong> <em>(" + escapeHtml(p.latino) + ")</em></p><p>" + escapeHtml(p.sintesi) + "</p>" +
          "<p><strong>Proprietà:</strong> " + escapeHtml((p.proprieta || []).join(", ")) + ".</p>" +
          "<p><strong>Usi tradizionali:</strong></p><ul>" + (p.usi || []).slice(0, 4).map((u) => "<li>" + escapeHtml(u) + "</li>").join("") + "</ul>" +
          "<p><strong>Evidenza:</strong> " + escapeHtml(p.evidenza) + "</p>" +
          "<p>" + safetyLine(p) + " · <a href=\"#/pianta/" + p.id + "\">Scheda completa</a></p>",
        plant: p
      };
    }
    return {
      html: "<p><strong>" + escapeHtml(p.nome) + "</strong> <em>(" + escapeHtml(p.latino) + ")</em> — " + escapeHtml(p.famiglia) + "</p>" +
        "<p>" + escapeHtml(p.sintesi) + "</p>" +
        "<p>" + escapeHtml(p.descrizione) + "</p>" +
        "<p><strong>Parti usate:</strong> " + escapeHtml((p.parti || []).join(", ")) + "<br><strong>Raccolta:</strong> " + monthNames(p.raccolta && p.raccolta.mesi) + "</p>" +
        "<p><strong>Proprietà:</strong> " + escapeHtml((p.proprieta || []).join(", ")) + "</p>" +
        "<p>" + safetyLine(p) + " · <a href=\"#/pianta/" + p.id + "\">Scheda completa</a>" +
        (p.fito && p.fito.commestibile ? ' · <a href="#/fitoalimurgia">In cucina</a>' : "") + "</p>",
      plant: p
    };
  }

  function monthNames(months) {
    const nomi = ["", "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
    if (!months || !months.length) return "tutto l'anno";
    if (months.length === 12) return "tutto l'anno";
    return months.map((m) => nomi[m]).join(", ");
  }

  function detectPlantIntent(q) {
    const n = norm(q);
    if (/(sicur|controindic|interazion|gravidanz|allatt|bambin|fegato|reni|effetti|tossic|attenzione|farmac|pillola|contraccett|medicine|terapia|pressione|ipertension)/.test(n)) return "safety";
    if (/(prepar|infuso|decotto|tintura|dose|dosaggio|ricetta|come si usa|oleolito|sciroppo)/.test(n)) return "prep";
    if (/(raccogl|quando|stagion|dove cresce|habitat|calendario)/.test(n)) return "harvest";
    if (/(sosia|confond|velenos|riconosc|distingu)/.test(n)) return "lookalike";
    if (/(mangiar|cucin|commestibil|fitoalimurg|insalata|ricetta)/.test(n)) return "edible";
    if (/(a cosa serve|propriet|benefici|serve|utile|uso|usi|cura)/.test(n)) return "uses";
    return "overview";
  }

  function conditionAnswer(c, q) {
    const plants = (c.piante || []).map((x) => (NP.plants || []).find((p) => p.id === x.id)).filter(Boolean);
    return {
      html: '<p><strong>' + escapeHtml(c.titolo) + "</strong> — " + escapeHtml(c.sintesi) + "</p>" +
        "<p><strong>Che cosa può aiutare:</strong></p><ul>" + (c.cosaAiuta || []).slice(0, 5).map((x) => "<li>" + escapeHtml(x) + "</li>").join("") + "</ul>" +
        (plants.length ? "<p><strong>Piante da valutare:</strong> " + plants.map(plantLink).join(", ") + ".</p>" : "") +
        "<p>" + escapeHtml(c.evidenza) + "</p>" +
        '<div class="callout warn" style="margin:.6rem 0"><span aria-hidden="true">⚠️</span><p><strong>Quando serve il medico:</strong> ' + escapeHtml((c.attenzione || []).join("; ")) + ".</p></div>" +
        '<p><a href="#/benessere/' + c.id + '">Scheda completa</a> · <a href="#/sicurezza">Sicurezza</a></p>',
      condition: c
    };
  }

  function helpAnswer() {
    return {
      html: "<p>Sono <strong>Neura</strong>, l'assistente locale di Naturopata Digitale. Posso:</p>" +
        "<ul><li>spiegare una pianta, le sue proprietà e le sue preparazioni;</li><li>riassumere le avvertenze e le interazioni;</li><li>suggerire piante e abitudini per un tema di benessere;</li><li>controllare un rimedio rispetto a farmaci, gravidanza, età e patologie;</li><li>farti qualche domanda di quiz.</li></ul>" +
        "<p>Scrivi per esempio: <em>«a cosa serve la malva?»</em>, <em>«posso prendere iperico con la pillola?»</em>, <em>«cosa aiuta per il sonno?»</em>.</p>" +
        "<p class=\"muted\">Non sono un medico e non invento: se non trovo una risposta nei contenuti, te lo dico.</p>"
    };
  }

  function aboutAnswer() {
    return {
      html: "<p>Naturopata Digitale è un progetto editoriale indipendente sulla naturopatia, la fitoterapia e la fitoalimurgia. Io sono <strong>Neura</strong>: un motore di conoscenza locale, non un modello linguistico generativo. Lavoro sui contenuti del programma, con regole esplicite e un controllo di sicurezza.</p>" +
        "<p>Tutto resta sul tuo dispositivo. Nessun account, nessuna pubblicità, nessun dato inviato in rete. Per approfondire: <a href=\"#/licenze\">licenze e progetto</a>.</p>"
    };
  }

  function offlineAnswer() {
    return {
      html: "<p>Sì: dopo la prima apertura il service worker salva l'applicazione e i contenuti sul dispositivo. Senza connessione restano disponibili erbario, manuale, quiz, calendario, glossario e io.</p><p class=\"muted\">I link alle fonti esterne richiedono Internet. Su telefono puoi aggiungere il programma alla schermata Home.</p>"
    };
  }

  function quizAnswer() {
    const plants = (NP.plants || []).filter((p) => (p.proprieta || []).length >= 3);
    const p = plants[Math.floor(Math.random() * plants.length)];
    const correct = p.proprieta[Math.floor(Math.random() * Math.min(3, p.proprieta.length))];
    const others = [];
    while (others.length < 3) {
      const q = plants[Math.floor(Math.random() * plants.length)];
      if (!q || q.id === p.id) continue;
      const prop = q.proprieta[Math.floor(Math.random() * q.proprieta.length)];
      if (!prop || prop === correct || others.indexOf(prop) !== -1) continue;
      others.push(prop);
    }
    const opts = [correct].concat(others).sort(() => Math.random() - 0.5);
    const idx = opts.indexOf(correct);
    return {
      html: '<p><strong>Domanda di Neura.</strong> Quale proprietà è associata a <em>' + escapeHtml(p.nome) + "</em>?</p>" +
        '<div class="neura-quiz" data-quiz="1"><div class="options">' +
        opts.map((o, i) => '<button class="option" type="button" data-correct="' + (i === idx ? "1" : "0") + '" data-exp="' + escapeHtml((p.proprieta || []).join(", ")) + '"><span class="option-key">' + "ABCD"[i] + "</span><span>" + escapeHtml(o) + "</span></button>").join("") +
        '</div><p class="muted" style="margin-top:.5rem">Rispondi: ti dirò se è giusto e perché.</p></div>' +
        '<p><a href="#/quiz">Apri il quiz completo</a></p>'
    };
  }

  function differenceAnswer(a, b) {
    const rows = [
      ["Famiglia", a.famiglia, b.famiglia],
      ["Parti usate", (a.parti || []).join(", "), (b.parti || []).join(", ")],
      ["Proprietà", (a.proprieta || []).join(", "), (b.proprieta || []).join(", ")],
      ["Sicurezza", a.sicurezza.livello, b.sicurezza.livello]
    ];
    return {
      html: "<p><strong>" + escapeHtml(a.nome) + "</strong> e <strong>" + escapeHtml(b.nome) + "</strong> a confronto:</p>" +
        '<div style="overflow-x:auto"><table class="compare"><thead><tr><th></th><th>' + escapeHtml(a.nome) + "</th><th>" + escapeHtml(b.nome) + "</th></tr></thead><tbody>" +
        rows.map((r) => "<tr><th>" + escapeHtml(r[0]) + "</th><td>" + escapeHtml(r[1]) + "</td><td>" + escapeHtml(r[2]) + "</td></tr>").join("") +
        "</tbody></table></div><p class=\"muted\">Il confronto è informativo: non indica quale sia «meglio» per te.</p>" +
        '<p><a href="#/pianta/' + a.id + '">' + escapeHtml(a.nome) + '</a> · <a href="#/pianta/' + b.id + '">' + escapeHtml(b.nome) + "</a></p>"
    };
  }

  function searchAnswer(q) {
    const results = search(q, 4);
    if (!results.length) {
      return {
        html: "<p>Non trovo una risposta affidabile nei contenuti del programma. Posso aiutarti con piante, sicurezza, preparazioni, fitoalimurgia e temi di benessere. Prova a riformulare, oppure consulta l'<a href=\"#/erbario\">erbario</a> e il <a href=\"#/manuale\">manuale</a>.</p>" +
          "<p class=\"muted\">Preferisco dirti «non lo so» che inventare una risposta.</p>"
      };
    }
    const items = results.map((r) => {
      const d = r.doc;
      let href = "#/";
      if (d.type === "plant") href = "#/pianta/" + d.id;
      else if (d.type === "chapter") href = "#/capitolo/" + d.id;
      else if (d.type === "condition") href = "#/benessere/" + d.id;
      else if (d.type === "glossary") href = "#/glossario";
      else if (d.type === "toxic") href = "#/sicurezza";
      else if (d.type === "interaction") href = "#/sicurezza";
      return '<li><a href="' + href + '"><strong>' + escapeHtml(d.title) + "</strong></a>" + (d.meta ? ' <span class="muted">' + escapeHtml(d.meta) + "</span>" : "") + "</li>";
    }).join("");
    return {
      html: "<p>Ecco i contenuti più pertinenti:</p><ul>" + items + "</ul><p class=\"muted\">Se cercavi un consiglio personale, specifica la pianta, il disturbo e le condizioni rilevanti (farmaci, gravidanza, età).</p>"
    };
  }

  function answer(q) {
    ensure();
    const clean = String(q || "").trim();
    if (!clean) return helpAnswer();
    const n = norm(clean);

    if (/^(ciao|salve|buongiorno|buonasera|hey|ehi)\b/.test(n) && n.split(" ").length <= 3) {
      return { html: "<p>Ciao! Sono Neura. Di che pianta o tema vuoi parlare? Posso spiegare, preparare un controllo di sicurezza o farti qualche domanda.</p>" };
    }
    if (/(grazie|thanks|ok perfetto|ottimo)/.test(n) && n.split(" ").length <= 4) {
      return { html: "<p>Con piacere. Ricorda: le informazioni sono educative e non sostituiscono il parere di un professionista sanitario.</p>" };
    }
    if (/(chi sei|cosa sei|come funzioni|sei un ia|sei un ai|intelligenza artificiale|neura)/.test(n) && n.split(" ").length <= 8) return aboutAnswer();
    if (/(offline|senza internet|connessione|funziona senza)/.test(n)) return offlineAnswer();
    if (/(privacy|dati|server|account|pubblicit)/.test(n)) {
      return { html: "<p>Non raccolgo dati: preferiti, progressi e cronologia della chat restano nel tuo browser. Nessun account, nessun server, nessuna pubblicità. Puoi esportare o cancellare i dati dalle impostazioni del programma.</p>" };
    }
    if (/(quiz|interrogami|domanda|mettimi alla prova|test)/.test(n)) return quizAnswer();
    if (/(aiuto|help|cosa sai fare|come usarti|comandi)/.test(n)) return helpAnswer();

    const plants = findPlants(clean);

    if (/(differenza|confronto|meglio tra|oppure)/.test(n) && plants.length >= 2) {
      return differenceAnswer(plants[0], plants[1]);
    }

    if (plants.length) {
      const p = plants[0];
      const intent = detectPlantIntent(clean);
      return plantAnswer(p, intent, clean);
    }

    const toxic = findToxic(clean);
    if (toxic.length) {
      const t = toxic[0];
      return {
        html: "<p><strong>" + escapeHtml(t.nome) + "</strong> <em>(" + escapeHtml(t.latino) + ")</em> — <strong>" + escapeHtml(t.pericolo) + "</strong>.</p>" +
          "<p><strong>Come riconoscerla:</strong> " + escapeHtml(t.caratteri) + "</p>" +
          "<p><strong>Sintomi:</strong> " + escapeHtml(t.sintomi) + "</p>" +
          "<p><strong>Cosa fare:</strong> " + escapeHtml(t.soccorso) + "</p>" +
          '<p><a href="#/sicurezza">Piante tossiche e primo soccorso</a></p>'
      };
    }

    const cond = findCondition(clean);
    if (cond) return conditionAnswer(cond, clean);

    if (/(controlla|posso prendere|posso usare|è sicuro|e sicuro|interazion)/.test(n)) {
      return { html: "<p>Per un controllo di sicurezza completo usa il pannello <strong>«Controlla un rimedio»</strong> qui accanto: indica pianta, farmaci e condizioni (gravidanza, età, fegato, reni). Restituirò un elenco di avvertenze con i livelli di rischio.</p><p class=\"muted\">Se stai assumendo un farmaco, porta sempre l'elenco completo al medico o al farmacista.</p>" };
    }

    return searchAnswer(clean);
  }

  /* ------------------------------------------------------------------------
     Controllo di sicurezza
     ------------------------------------------------------------------------ */

  const DRUGS = [
    { key: "anticoagul", label: "anticoagulanti" },
    { key: "warfarin", label: "warfarin" },
    { key: "coumadin", label: "warfarin" },
    { key: "aspirin", label: "aspirina/antiaggreganti" },
    { key: "antiaggreg", label: "antiaggreganti" },
    { key: "contraccett", label: "contraccettivi orali" },
    { key: "pillola", label: "contraccettivi orali" },
    { key: "immunosoppress", label: "immunosoppressori" },
    { key: "ciclosporin", label: "ciclosporina" },
    { key: "tacrolimus", label: "tacrolimus" },
    { key: "digossin", label: "digossina" },
    { key: "diuretic", label: "diuretici" },
    { key: "antipertensiv", label: "antipertensivi" },
    { key: "antidiabet", label: "antidiabetici" },
    { key: "ipoglicem", label: "antidiabetici" },
    { key: "sedativ", label: "sedativi" },
    { key: "benzodiazep", label: "benzodiazepine" },
    { key: "ansiolitic", label: "ansiolitici" },
    { key: "antidepress", label: "antidepressivi" },
    { key: "ssri", label: "SSRI" },
    { key: "serotonin", label: "farmaci serotoninergici" },
    { key: "antiepilett", label: "antiepilettici" },
    { key: "anticonvuls", label: "anticonvulsivanti" },
    { key: "tiroid", label: "farmaci per la tiroide" },
    { key: "levotiroxin", label: "levotiroxina" },
    { key: "litio", label: "litio" },
    { key: "statin", label: "statine" },
    { key: "antibiotic", label: "antibiotici" },
    { key: "fans", label: "antinfiammatori (FANS)" },
    { key: "ibuprofen", label: "ibuprofene" },
    { key: "cortison", label: "corticosteroidi" },
    { key: "chemioterap", label: "chemioterapici" },
    { key: "antiretrovir", label: "antiretrovirali" }
  ];

  function interactionFor(p) {
    const keys = [p.nome, p.id].map(norm);
    return (NP.interactions || []).filter((it) => {
      const target = norm(it.pianta);
      return keys.some((k) => target.indexOf(k) !== -1 || k.indexOf(target) !== -1) ||
        (p.id === "aglio-orsino" && /aglio/.test(target)) ||
        (p.id === "menta" && /menta/.test(target)) ||
        (p.id === "olivo" && /olivo/.test(target)) ||
        (p.id === "aloe" && /aloe/.test(target)) ||
        (p.id === "valeriana" && /valeriana/.test(target)) ||
        (p.id === "passiflora" && /passiflora/.test(target)) ||
        (p.id === "malva" && /malva/.test(target)) ||
        (p.id === "piantaggine" && /piantaggine/.test(target)) ||
        (p.id === "biancospino" && /biancospino/.test(target)) ||
        (p.id === "echinacea" && /echinacea/.test(target)) ||
        (p.id === "borragine" && /borragine/.test(target)) ||
        (p.id === "iperico" && /iperico/.test(target)) ||
        (p.id === "liquirizia" && /liquirizia/.test(target));
    });
  }

  const RED_FLAGS = [
    { re: /(dolore|oppressione|peso).{0,20}(petto|torace)/, msg: "dolore o oppressione al petto" },
    { re: /(non riesco a respirare|fiato corto|difficoltà respirator|labbra blu)/, msg: "difficoltà respiratoria" },
    { re: /(svenut|perso i sensi|convuls|paralisi|non parlo|bocca storta)/, msg: "perdita di coscienza o sintomo neurologico" },
    { re: /(sangue nelle feci|vomito con sangue|sanguinamento abbondante|feci nere)/, msg: "sanguinamento importante" },
    { re: /(pensieri di suicidio|non voglio più vivere|farmi del male|suicid)/, msg: "pensieri di farsi del male" }
  ];

  function check(text, flags) {
    flags = flags || {};
    const result = { level: "basso", summary: "", items: [], plants: [], urgent: null };

    RED_FLAGS.forEach((r) => {
      if (r.re.test(norm(text))) result.urgent = r.msg;
    });

    const plants = findPlants(text);
    result.plants = plants;

    const drugs = DRUGS.filter((d) => norm(text).indexOf(d.key) !== -1).map((d) => d.label);

    if (!plants.length) {
      result.items.push({
        level: "basso",
        titolo: "Nessuna pianta riconosciuta",
        testo: "Non ho trovato nei contenuti una pianta con questo nome. Scrivi il nome comune o scientifico (per esempio «camomilla» o «Matricaria chamomilla»), evitando miscele generiche."
      });
    }

    plants.forEach((p) => {
      const s = p.sicurezza || {};
      if (s.livello === "rosso") {
        result.items.push({ level: "alto", titolo: p.nome + " · cautela alta", testo: "Questa pianta ha interazioni o rischi importanti. Non usarla senza il parere di un medico o farmacista. " + (s.nota || "") });
      } else if (s.livello === "giallo") {
        result.items.push({ level: "medio", titolo: p.nome + " · cautela", testo: "Uso possibile solo con attenzione e per periodi brevi. " + (s.nota || "") });
      } else {
        result.items.push({ level: "basso", titolo: p.nome + " · uso tradizionale", testo: "Alle dosi usuali è considerata generalmente sicura, ma leggi le avvertenze specifiche." });
      }

      if (flags.gravidanza) result.items.push({ level: s.livello === "rosso" ? "alto" : "medio", titolo: p.nome + " in gravidanza", testo: s.gravidanza });
      if (flags.allattamento) result.items.push({ level: "medio", titolo: p.nome + " in allattamento", testo: s.allattamento });
      if (flags.bambini) result.items.push({ level: "medio", titolo: p.nome + " nei bambini", testo: s.bambini });
      if (flags.fegato) result.items.push({ level: "medio", titolo: p.nome + " e fegato", testo: "Verifica le controindicazioni epatiche nella scheda. " + ((s.controindicazioni || []).join("; ") || "") });
      if (flags.reni) result.items.push({ level: "medio", titolo: p.nome + " e reni", testo: "Alcune piante sono diuretiche o controindicate in caso di insufficienza renale. Chiedi al medico. " + ((s.controindicazioni || []).join("; ") || "") });
      if (flags.chirurgia) result.items.push({ level: "alto", titolo: p.nome + " prima di un intervento", testo: "Informa l'anestesista e valuta la sospensione con il medico, soprattutto per piante che influenzano la coagulazione o la pressione." });
      if (flags.farmaci || drugs.length) {
        const ints = interactionFor(p);
        ints.forEach((it) => {
          const relevant = !drugs.length || drugs.some((d) => norm(it.farmaci).indexOf(norm(d).split(" ")[0]) !== -1);
          if (relevant || ints.length <= 2) {
            result.items.push({ level: it.livello === "alto" ? "alto" : it.livello === "medio" ? "medio" : "basso", titolo: p.nome + " · " + it.farmaci, testo: it.effetto });
          }
        });
        if (!ints.length) result.items.push({ level: "basso", titolo: p.nome + " e farmaci", testo: "Non risultano interazioni specifiche nella tabella, ma questo non esclude altri effetti. Chiedi sempre al farmacista." });
      }
    });

    if (drugs.length) {
      result.items.push({ level: "medio", titolo: "Farmaci rilevati", testo: "Hai indicato: " + drugs.join(", ") + ". Porta l'elenco completo (compresi gli integratori) al medico o al farmacista prima di iniziare qualunque rimedio." });
    }

    if (flags.gravidanza || flags.allattamento) {
      result.items.push({ level: "medio", titolo: "Gravidanza e allattamento", testo: "Evita l'automedicazione con piante: molte non hanno dati sufficienti e alcune possono influire sull'utero, sulla produzione di latte o sul bambino." });
    }

    const levels = result.items.map((i) => i.level);
    result.level = levels.indexOf("alto") !== -1 ? "alto" : levels.indexOf("medio") !== -1 ? "medio" : "basso";
    result.summary = result.urgent
      ? "Sintomo potenzialmente urgente: contatta subito i soccorsi (112/118) o un medico. Le piante non sono la priorità in questo momento."
      : plants.length
        ? "Ho controllato " + plants.length + " pianta" + (plants.length > 1 ? "e" : "") + (drugs.length ? " e i farmaci indicati" : "") + ". Livello complessivo: " + result.level + "."
        : "Aggiungi il nome di una pianta per un controllo più preciso.";

    if (result.urgent) {
      result.items.unshift({ level: "alto", titolo: "Segnale di allarme", testo: "Hai descritto " + result.urgent + ". Chiama il 112/118. Non indurre il vomito in caso di ingestione sospetta." });
    }

    return result;
  }

  return {
    build: build,
    search: search,
    answer: answer,
    check: check,
    findPlants: findPlants,
    findCondition: findCondition,
    suggestions: [
      "A cosa serve la malva?",
      "Posso prendere iperico con la pillola?",
      "Cosa aiuta per il sonno?",
      "Quali sono i sosia dell'aglio orsino?",
      "Fammi una domanda di quiz",
      "Controlla camomilla e liquirizia con la pressione alta"
    ]
  };
})();
