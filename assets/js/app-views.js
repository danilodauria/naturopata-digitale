/* ==========================================================================
   Naturopata Digitale · viste editoriali
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

(function () {
  "use strict";

  const A = NP.app;
  const views = A.views;
  const esc = A.esc;

  function chapterById(id) { return (NP.manual || []).find((c) => c.id === id); }
  function partById(id) { return (NP.manualParts || []).find((p) => p.id === id); }
  function partChapters(partId) { return (NP.manual || []).filter((c) => c.parte === partId); }

  function tocHTML(currentId) {
    return '<aside class="manual-toc" aria-label="Indice del manuale"><h2>Indice</h2>' +
      (NP.manualParts || []).map((part) =>
        '<div class="toc-part"><span>' + esc(part.titolo.replace("Parte ", "")) + "</span>" +
        partChapters(part.id).map((c) =>
          '<a class="toc-link' + (c.id === currentId ? " is-current" : "") + '" href="#/capitolo/' + c.id + '"><span class="n">' + c.n + '</span><span>' + esc(c.titolo) + "</span></a>"
        ).join("") + "</div>"
      ).join("") + "</aside>";
  }

  /* ------------------------------------------------------------------------
     Manuale
     ------------------------------------------------------------------------ */

  views.manuale = function () {
    const read = A.state.read.size;
    const total = (NP.manual || []).length;

    A.page(
      '<div class="page-head">' +
        '<p class="eyebrow">Manuale interattivo</p>' +
        "<h1>Capire prima di usare</h1>" +
        '<p class="lead">' + total + ' capitoli in cinque parti: fondamenti, piante, raccolta, pratica quotidiana e consapevolezza. Nessuna scorciatoia, nessuna promessa miracolosa.</p>' +
        '<div class="progress-line" style="max-width:340px"><span style="width:' + Math.round(read / Math.max(total, 1) * 100) + '%"></span></div>' +
        '<p class="text-small muted">' + read + " di " + total + " capitoli letti</p>" +
      "</div>" +
      '<div class="manual-layout">' + tocHTML(null) +
        '<div>' +
          (NP.manualParts || []).map((part) =>
            '<section class="section" style="margin-top:0;margin-bottom:2.4rem">' +
              '<div class="section-head" style="margin-bottom:.9rem"><div><p class="eyebrow">' + esc(part.titolo) + "</p><h2>" + esc(part.titolo.split("· ")[1] || part.titolo) + "</h2><p>" + esc(part.descrizione) + "</p></div></div>" +
              '<div class="chapter-list">' +
                partChapters(part.id).map((c) =>
                  '<a class="chapter-card" href="#/capitolo/' + c.id + '">' +
                    '<span class="chapter-num">' + c.n + "</span>" +
                    "<div><h3>" + esc(c.titolo) + (A.state.read.has(c.id) ? ' <span class="read-dot" title="Letto"></span>' : "") + "</h3>" +
                    "<p>" + esc(c.occhiello) + "</p>" +
                    '<div class="chapter-card-meta"><span>' + esc(c.tempo) + "</span><span>·</span><span>" + esc((c.tags || []).join(" · ")) + "</span></div></div>" +
                  "</a>"
                ).join("") +
              "</div>" +
            "</section>"
          ).join("") +
        "</div>" +
      "</div>",
      "view-manuale"
    );
  };

  views.capitolo = function (params) {
    const c = chapterById(params[0]);
    if (!c) return A.views["404"] ? A.views["404"]() : A.page('<div class="empty-state"><h1>Capitolo non trovato</h1><a class="btn btn-primary" href="#/manuale">Torna al manuale</a></div>');
    if (!A.state.read.has(c.id)) { A.state.read.add(c.id); A.saveRead(); }
    const part = partById(c.parte);
    const list = NP.manual || [];
    const idx = list.findIndex((x) => x.id === c.id);
    const prev = idx > 0 ? list[idx - 1] : null;
    const next = idx < list.length - 1 ? list[idx + 1] : null;

    A.page(
      '<nav class="crumbs" aria-label="Percorso"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/manuale">Manuale</a><span aria-hidden="true">/</span><span>Capitolo ' + c.n + "</span></nav>" +
      '<div class="manual-layout">' + tocHTML(c.id) +
        '<article>' +
          '<header class="page-head" style="margin-bottom:1.4rem">' +
            '<p class="eyebrow">' + esc(part ? part.titolo : "") + " · Capitolo " + c.n + "</p>" +
            "<h1>" + esc(c.titolo) + "</h1>" +
            '<p class="lead">' + esc(c.occhiello) + "</p>" +
            '<p class="text-small muted">' + esc(c.tempo) + " di lettura · " + esc((c.tags || []).join(" · ")) + "</p>" +
          "</header>" +
          '<div class="prose">' + c.html + "</div>" +
          '<div class="chapter-nav">' +
            (prev ? '<a href="#/capitolo/' + prev.id + '"><span class="dir">← Capitolo precedente</span>' + esc(prev.titolo) + "</a>" : "<span></span>") +
            (next ? '<a href="#/capitolo/' + next.id + '" style="text-align:right"><span class="dir">Capitolo successivo →</span>' + esc(next.titolo) + "</a>" : '<a href="#/manuale" style="text-align:right"><span class="dir">Fine del manuale</span>Torna all\'indice</a>') +
          "</div>" +
          '<div class="callout good mt-2"><span aria-hidden="true">🧠</span><div><p class="mb-0">Vuoi approfondire o verificare un\'interazione? <button class="btn btn-ghost btn-small" type="button" data-ask="' + esc("Spiegami meglio: " + c.titolo) + '">Chiedi a Neura</button></p></div></div>' +
        "</article>" +
      "</div>",
      "view-capitolo"
    );
  };

  /* ------------------------------------------------------------------------
     Fitoalimurgia
     ------------------------------------------------------------------------ */

  views.fito = function () {
    const edible = (NP.plants || []).filter((p) => p.fito && p.fito.commestibile);
    const rules = [
      { t: "Certezza botanica", d: "Raccogli solo ciò che riconosci senza dubbi, con più caratteri e due fonti indipendenti." },
      { t: "Legalità", d: "Rispetta parchi, riserve, proprietà private e specie protette. Informati presso l'ente gestore." },
      { t: "Misura", d: "Preleva poco, mai l'intera popolazione, mai le uniche piante di una specie in un luogo." },
      { t: "Radici", d: "Non estirpare radici se non sei proprietario del terreno o autorizzato." },
      { t: "Luoghi puliti", d: "Evita strade trafficate, campi trattati, discariche e aree industriali." },
      { t: "Igiene", d: "Lava bene, cuoci quando necessario, non consumare crudo ciò che non conosci." },
      { t: "Una novità alla volta", d: "Introduci una nuova pianta in piccola quantità per verificare tolleranza e allergie." },
      { t: "Nel dubbio, lascia stare", d: "La rinuncia è sempre un'opzione sicura. Nessun pasto vale un rischio." }
    ];

    A.page(
      '<div class="page-head">' +
        '<p class="eyebrow">Fitoalimurgia</p>' +
        "<h1>Il cibo che cresce da solo</h1>" +
        '<p class="lead">Erbe di campo, frutti di siepe, radici e fiori: la fitoalimurgia è l\'arte di riconoscere e cucinare le piante spontanee. Con rispetto per la natura e ossessione per la sicurezza.</p>' +
        '<div class="hero-actions"><a class="btn btn-primary" href="#/capitolo/fitoalimurgia">Leggi le regole ' + A.ico("book") + '</a><a class="btn btn-secondary" href="#/calendario">Calendario di raccolta ' + A.ico("calendar") + "</a></div>" +
      "</div>" +

      '<div class="callout danger"><span aria-hidden="true">☠️</span><div><p><strong>La regola che viene prima di tutte:</strong> mai mangiare una pianta che non si riconosce con assoluta certezza. Alcuni sosia sono mortali. In caso di ingestione sospetta, chiama subito il 112/118 o un Centro Antiveleni e non indurre il vomito.</p><p class="mb-0"><a href="#/sicurezza">Vedi le piante tossiche e i numeri utili →</a></p></div></div>' +

      '<section class="section"><div class="section-head"><div><h2>Otto regole del raccolto gentile</h2><p>Valgono per un mazzetto in cucina come per un\'uscita con le scuole.</p></div></div>' +
        '<div class="rules-grid">' + rules.map((r, i) => '<div class="rule"><span class="n">' + String(i + 1).padStart(2, "0") + "</span><h3>" + r.t + "</h3><p>" + r.d + "</p></div>").join("") + "</div>" +
      "</section>" +

      '<section class="section"><div class="section-head"><div><h2>Le piante commestibili dell\'erbario</h2><p>' + edible.length + " specie con schede complete: parti, stagione e avvertenze.</p></div><a class=\"section-link\" href=\"#/erbario\">Tutte le schede</a></div>" +
        '<div class="table-wrap"><table class="data-table"><thead><tr><th>Pianta</th><th>Parti in cucina</th><th>Stagione</th><th>Sicurezza</th></tr></thead><tbody>' +
          edible.map((p) => '<tr><td><a href="#/pianta/' + p.id + '"><strong>' + esc(p.nome) + "</strong></a><br><span class=\"muted\">" + esc(p.latino) + "</span></td><td>" + esc(p.fito.parti) + "</td><td>" + esc(p.fito.stagione) + "</td><td>" + A.SAFETY[p.sicurezza.livello].label + "</td></tr>").join("") +
        "</tbody></table></div>" +
        '<p class="text-small muted mt-2">La presenza in questa tabella non è un invito a raccogliere: leggi sempre la scheda e le regole locali. Le specie con sicurezza gialla o rossa richiedono attenzione particolare.</p>' +
      "</section>" +

      '<section class="section"><div class="section-head"><div><h2>Sosia da conoscere</h2><p>Dieci piante che possono somigliare a specie commestibili. Imparale prima delle altre.</p></div></div>' +
        '<div class="toxic-grid">' + (NP.toxic || []).map((t) =>
          '<div class="toxic-card"><h3>' + esc(t.nome) + "</h3><p class=\"latin\">" + esc(t.latino) + " · " + esc(t.famiglia) + '</p><p><strong>' + esc(t.pericolo) + ".</strong> " + esc(t.caratteri) + "</p><p><strong>Cosa fare:</strong> " + esc(t.soccorso) + "</p></div>"
        ).join("") + "</div>" +
      "</section>" +

      '<section class="section"><div class="panel">' +
        "<h2>Tre preparazioni per iniziare</h2>" +
        '<div class="prep-list">' +
          '<div class="prep"><h3>Risotto alle ortiche</h3><p>Sbollenta le foglie di ortica, strizzale e tritale. Prepara un risotto con cipolla e brodo, aggiungi l\'ortica a metà cottura e manteca con formaggio.</p><p class="dose">L\'ortica cotta perde l\'effetto urticante.</p></div>' +
          '<div class="prep"><h3>Insalata di tarassaco</h3><p>Usa solo foglie tenere, lavale bene e condisci con olio, limone e un pizzico di sale. Un breve ammollo attenua l\'amaro.</p><p class="dose">Ottima con mela o uovo sodo.</p></div>' +
          '<div class="prep"><h3>Sciroppo di sambuco</h3><p>Infondi i fiori in acqua con zucchero e limone, filtra e imbottiglia. Conserva in frigorifero e consuma in tempi brevi.</p><p class="dose">Usa solo fiori identificati con certezza e mai crudi.</p></div>' +
        "</div>" +
        '<p class="mt-2"><button class="btn btn-secondary btn-small" type="button" data-ask="' + esc("Quali piante selvatiche posso raccogliere in sicurezza?") + '">Chiedi a Neura ' + A.ico("brain") + "</button></p>" +
      "</div></section>",
      "view-fito"
    );
  };

  /* ------------------------------------------------------------------------
     Benessere
     ------------------------------------------------------------------------ */

  views.benessere = function (params) {
    if (params && params[0]) {
      const c = (NP.conditions || []).find((x) => x.id === params[0]);
      if (!c) {
        A.page('<div class="empty-state"><h1>Scheda non trovata</h1><a class="btn btn-primary" href="#/benessere">Tutte le schede</a></div>');
        return;
      }
      const plants = (c.piante || []).map((x) => ({ p: (NP.plants || []).find((p) => p.id === x.id), nota: x.nota })).filter((x) => x.p);
      A.page(
        '<nav class="crumbs" aria-label="Percorso"><a href="#/">Home</a><span aria-hidden="true">/</span><a href="#/benessere">Benessere</a><span aria-hidden="true">/</span><span>' + esc(c.titolo) + "</span></nav>" +
        '<div class="page-head"><p class="eyebrow">Scheda di benessere</p><h1>' + esc(c.titolo) + "</h1><p class=\"lead\">" + esc(c.sintesi) + "</p>" +
          '<div class="pill-list">' + (c.segnali || []).map((s) => '<span class="pill">' + esc(s) + "</span>").join("") + "</div></div>" +
        '<div class="detail-layout"><div class="wellness-detail">' +
          '<div class="panel"><h2>Che cosa può aiutare</h2><ul>' + (c.cosaAiuta || []).map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul></div>" +
          '<div class="panel mt-2"><h2>Piante da valutare</h2>' +
            '<div class="prep-list">' + plants.map((x) =>
              '<div class="prep"><h3><a href="#/pianta/' + x.p.id + '">' + esc(x.p.nome) + "</a> · " + A.SAFETY[x.p.sicurezza.livello].label + "</h3><p>" + esc(x.nota) + "</p><p class=\"dose\">Leggi sempre la scheda di sicurezza della pianta.</p></div>"
            ).join("") + "</div>" +
            '<p class="mt-2"><button class="btn btn-secondary btn-small" type="button" data-ask="' + esc("Cosa aiuta per " + c.titolo.toLowerCase() + "?") + '">Chiedi a Neura ' + A.ico("brain") + "</button></p>" +
          "</div>" +
          '<div class="redflags"><h3>Quando serve il medico</h3><ul>' + (c.attenzione || []).map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul></div>" +
          '<div class="panel mt-2"><h2>Che cosa dice la ricerca</h2><p class="mb-0">' + esc(c.evidenza) + "</p></div>" +
        "</div>" +
        '<aside class="sticky-side">' +
          '<div class="panel"><h3>Avvertenza</h3><p class="text-small muted">Questa scheda è informativa e non prescrive trattamenti. Le piante possono interagire con i farmaci. Se i sintomi persistono o peggiorano, rivolgiti a un professionista sanitario.</p><a class="btn btn-secondary btn-small btn-block" href="#/sicurezza">Sicurezza e fonti</a></div>' +
          '<div class="panel"><h3>Approfondisci</h3><p class="mb-0"><a href="#/capitolo/sonno-e-ritmi">Sonno e ritmi</a></p><p class="mb-0"><a href="#/capitolo/stress-e-sistema-nervoso">Stress e sistema nervoso</a></p><p class="mb-0"><a href="#/capitolo/digestione-e-microbiota">Digestione e microbiota</a></p><p class="mb-0"><a href="#/capitolo/pelle-e-aromaterapia">Pelle e aromaterapia</a></p></div>' +
        "</aside></div>",
        "view-benessere"
      );
      return;
    }

    A.page(
      '<div class="page-head"><p class="eyebrow">Olistica pratica</p><h1>Il benessere, per temi</h1>' +
        '<p class="lead">Otto schede per orientarsi: cosa può aiutare, quali piante valutare e soprattutto quando è il momento di rivolgersi a un professionista. Nessuna scorciatoia, nessuna promessa.</p></div>' +
      '<div class="wellness-grid">' +
        (NP.conditions || []).map((c) =>
          '<a class="wellness-card" href="#/benessere/' + c.id + '">' +
            '<span class="wellness-icon">' + A.ico(c.icona) + "</span>" +
            "<h3>" + esc(c.titolo) + "</h3><p>" + esc(c.sintesi) + "</p>" +
            '<div class="meta"><span>' + (c.piante || []).length + " piante collegate</span><span>Leggi →</span></div>" +
          "</a>"
        ).join("") +
      "</div>" +
      '<div class="callout warn mt-2"><span aria-hidden="true">⚠️</span><p class="mb-0">Le schede non sono diagnosi né terapie. Se un sintomo è nuovo, intenso o persistente, la priorità è una valutazione medica.</p></div>',
      "view-benessere-index"
    );
  };

  /* ------------------------------------------------------------------------
     Calendario
     ------------------------------------------------------------------------ */

  views.calendario = function () {
    const current = new Date().getMonth() + 1;
    const sel = A.state.calMonth;
    const month = (NP.months || []).find((m) => m.mese === sel) || NP.months[0];
    const harvest = (NP.plants || []).filter((p) => (p.raccolta.mesi || []).indexOf(sel) !== -1);

    A.page(
      '<div class="page-head"><p class="eyebrow">Calendario di raccolta</p><h1>Il ritmo delle stagioni</h1>' +
        '<p class="lead">Che cosa si raccoglie, che cosa si prepara e quali lavori fare nell\'orto e nell\'erbario. Mese per mese, con lo sguardo alla sostenibilità.</p></div>' +
      '<div class="month-tabs" role="tablist" aria-label="Mesi">' +
        (NP.months || []).map((m) => '<button class="month-tab' + (m.mese === current ? " is-current" : "") + (m.mese === sel ? " is-active" : "") + '" type="button" role="tab" aria-selected="' + (m.mese === sel) + '" data-month="' + m.mese + '">' + esc(m.nome) + "</button>").join("") +
      "</div>" +
      '<div class="home-split">' +
        '<div class="panel">' +
          '<p class="eyebrow">' + esc(month.nome) + " · " + (sel === current ? "mese corrente" : "selezione") + "</p>" +
          "<h2>" + esc(month.titolo) + "</h2><p>" + esc(month.testo) + "</p>" +
          "<h3>Lavori del mese</h3><ul>" + (month.lavori || []).map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" +
          "<h3>Si raccolgono</h3>" +
          (harvest.length ? '<div class="season-list-wrap"><ul class="season-list">' + harvest.map((p) => '<li><span class="season-month">' + A.MONTHS_SHORT[sel] + '</span><div><a href="#/pianta/' + p.id + '">' + esc(p.nome) + "</a><small>" + esc(p.parti.join(", ")) + " · " + A.SAFETY[p.sicurezza.livello].label + "</small></div></li>").join("") + "</ul></div>" : '<p class="muted">Poche raccolte in questo mese: è il tempo del riposo e della cura delle scorte.</p>') +
        "</div>" +
        '<div class="panel panel-soft"><h3>Una nota di prudenza</h3><p class="text-small muted">Il calendario indica la stagione tipica, ma clima, altitudine e regione cambiano tutto. Non raccogliere mai una pianta se non la riconosci con certezza; rispetta i divieti locali e lascia sempre una parte della popolazione.</p><a class="btn btn-secondary btn-small btn-block" href="#/fitoalimurgia">Regole del raccolto</a></div>' +
      "</div>" +
      '<section class="section"><div class="section-head"><div><h2>Tutti i mesi</h2><p>Un colpo d\'occhio sull\'anno.</p></div></div>' +
        '<div class="calendar-grid">' +
          (NP.months || []).map((m) => {
            const hp = (NP.plants || []).filter((p) => (p.raccolta.mesi || []).indexOf(m.mese) !== -1).slice(0, 4);
            return '<div class="month-card' + (m.mese === current ? " is-now" : "") + '"><h3>' + esc(m.nome) + " <span>" + (m.mese === current ? "ora" : "") + "</span></h3><p>" + esc(m.titolo) + " · " + esc(m.testo.slice(0, 90)) + "…</p><div class=\"month-plants\">" + hp.map((p) => '<a href="#/pianta/' + p.id + '">' + esc(p.nome) + "</a>").join("") + '</div><p class="mb-0" style="margin-top:.6rem"><button class="btn btn-ghost btn-small" type="button" data-month="' + m.mese + '">Apri ' + esc(m.nome) + "</button></p></div>";
          }).join("") +
        "</div>" +
      "</section>",
      "view-calendario"
    );
  };

  /* ------------------------------------------------------------------------
     Glossario
     ------------------------------------------------------------------------ */

  views.glossario = function () {
    A.page(
      '<div class="page-head"><p class="eyebrow">Glossario</p><h1>Le parole della fitoterapia</h1>' +
        '<p class="lead">' + (NP.glossary || []).length + ' termini per leggere le schede senza inciampare. Cerca una parola o scorri l\'elenco.</p>' +
        '<label class="search-field" style="max-width:420px;margin-top:1rem"><span class="sr-only">Cerca nel glossario</span>' + A.ico("search") + '<input class="input" id="glossSearch" type="search" placeholder="Cerca: mucillagine, tintura, chemiotipo…"></label></div>' +
      '<p class="result-count" id="glossCount">' + (NP.glossary || []).length + " termini</p>" +
      '<div class="glossary" id="glossaryList">' +
        (NP.glossary || []).slice().sort((a, b) => a.t.localeCompare(b.t, "it")).map((g) =>
          '<details class="glossary-item" data-term="' + esc((g.t + " " + g.d).toLowerCase()) + '"><summary>' + esc(g.t) + '</summary><div class="gloss-body"><p>' + esc(g.d) + "</p></div></details>"
        ).join("") +
      "</div>",
      "view-glossario"
    );

    const input = document.getElementById("glossSearch");
    const list = document.getElementById("glossaryList");
    const count = document.getElementById("glossCount");
    if (input && list) {
      input.addEventListener("input", () => {
        const q = input.value.toLowerCase().trim();
        let visible = 0;
        list.querySelectorAll(".glossary-item").forEach((el) => {
          const show = !q || el.getAttribute("data-term").indexOf(q) !== -1;
          el.style.display = show ? "" : "none";
          if (show) visible++;
        });
        if (count) count.textContent = visible + " term" + (visible === 1 ? "ine" : "ini");
      });
    }
  };

  /* ------------------------------------------------------------------------
     Sicurezza
     ------------------------------------------------------------------------ */

  views.sicurezza = function () {
    const groups = [
      { level: "emergenza", titolo: "Emergenza · chiama il 112/118", items: (NP.redFlags || []).filter((r) => r.livello === "emergenza") },
      { level: "urgente", titolo: "Urgente · valutazione medica rapida", items: (NP.redFlags || []).filter((r) => r.livello === "urgente") },
      { level: "visita", titolo: "Da valutare con una visita", items: (NP.redFlags || []).filter((r) => r.livello === "visita") }
    ];

    A.page(
      '<div class="page-head"><p class="eyebrow">Sicurezza e fonti</p><h1>La prudenza è la prima cura</h1>' +
        '<p class="lead">Le piante sono sostanze attive. Questa pagina raccoglie i segnali d\'allarme, le piante tossiche, le interazioni principali e le fonti per approfondire.</p></div>' +
      '<div class="callout danger"><span aria-hidden="true">🚨</span><div><p><strong>In caso di emergenza chiama il 112 o il 118.</strong> Per un\'ingestione sospetta di piante o funghi, contatta un Centro Antiveleni. Non indurre il vomito e conserva un campione della pianta.</p><p class="mb-0"><a href="https://www.iss.it/-/cnsc-cav" target="_blank" rel="noopener">Elenco ISS dei Centri Antiveleni (CAV) →</a></p></div></div>' +

      '<section class="section">' +
        groups.map((g) =>
          '<div class="panel" style="margin-bottom:1rem"><h2>' + g.titolo + "</h2><div class=\"table-wrap\"><table class=\"data-table\"><tbody>" +
          g.items.map((r) => "<tr><td><strong>" + esc(r.sintomo) + "</strong></td><td>" + esc(r.azione) + "</td></tr>").join("") +
          "</tbody></table></div></div>"
        ).join("") +
      "</section>" +

      '<section class="section"><div class="section-head"><div><h2>Piante tossiche da riconoscere</h2><p>Non solo «non raccoglierle»: impara a distinguerle dai sosia commestibili.</p></div></div>' +
        '<div class="toxic-grid">' + (NP.toxic || []).map((t) =>
          '<div class="toxic-card"><h3>' + esc(t.nome) + "</h3><p class=\"latin\">" + esc(t.latino) + "</p><p><strong>" + esc(t.pericolo) + ".</strong> " + esc(t.caratteri) + "</p><p><strong>Sintomi:</strong> " + esc(t.sintomi) + "</p><p><strong>Cosa fare:</strong> " + esc(t.soccorso) + "</p></div>"
        ).join("") + "</div>" +
      "</section>" +

      '<section class="section"><div class="section-head"><div><h2>Interazioni principali</h2><p>Una tabella di orientamento, non un sostituto del parere del farmacista.</p></div></div>' +
        '<div class="table-wrap"><table class="data-table"><thead><tr><th>Pianta</th><th>Farmaci</th><th>Rischio</th><th>Livello</th></tr></thead><tbody>' +
          (NP.interactions || []).map((it) => "<tr><td><strong>" + esc(it.pianta) + "</strong></td><td>" + esc(it.farmaci) + "</td><td>" + esc(it.effetto) + "</td><td>" + (it.livello === "alto" ? '<span class="badge-dot safety-rosso">alto</span>' : it.livello === "medio" ? '<span class="badge-dot safety-giallo">medio</span>' : '<span class="badge-dot safety-verde">basso</span>') + "</td></tr>").join("") +
        "</tbody></table></div>" +
        '<p class="text-small muted mt-2">Le interazioni possono essere diverse da persona a persona e dipendono da dose, durata e altri farmaci. Porta sempre un elenco completo al medico o al farmacista.</p>' +
      "</section>" +

      '<section class="section"><div class="home-split"><div class="panel"><h2>Le fonti</h2><p class="text-small muted">Le schede citano fonti specifiche. Queste sono le fonti generali del progetto.</p><ul class="source-list">' +
        (NP.sources || []).map((s) => '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.titolo) + "</a> — " + esc(s.nota) + "</li>").join("") +
        "</ul></div>" +
        '<div class="panel panel-soft"><h2>Segnalare una reazione avversa</h2><p class="text-small">In Italia le reazioni avverse a integratori e prodotti vegetali possono essere segnalate al sistema di farmacovigilanza. La segnalazione aiuta la ricerca e la sicurezza di tutti.</p><p class="text-small mb-0"><a href="https://www.aifa.gov.it/" target="_blank" rel="noopener">AIFA →</a> · <a href="https://www.salute.gov.it/" target="_blank" rel="noopener">Ministero della Salute →</a></p></div></div>' +
      "</section>" +

      '<div class="callout warn"><span aria-hidden="true">📚</span><p class="mb-0"><strong>Nota metodologica.</strong> Questo programma è educativo e non sostituisce il parere di un professionista sanitario. Le dosi sono indicative e tratte dalla tradizione e dalle monografie europee. L\'evidenza è descritta in modo onesto, anche quando è limitata.</p></div>',
      "view-sicurezza"
    );
  };

  /* ------------------------------------------------------------------------
     Licenze e progetto
     ------------------------------------------------------------------------ */

  views.licenze = function () {
    A.page(
      '<div class="page-head"><p class="eyebrow">Il progetto</p><h1>Licenze, privacy, trasparenza</h1>' +
        '<p class="lead">Naturopata Digitale è un progetto editoriale indipendente, senza pubblicità e senza account. I contenuti sono originali, le fonti sono citate e i dati restano sul tuo dispositivo.</p></div>' +

      '<div class="license-grid">' +
        '<div class="license-card"><span class="license-mark">MIT</span><h2>Codice</h2><p>Il codice del programma è distribuito con licenza MIT: puoi usarlo, modificarlo e redistribuirlo, mantenendo l\'avviso di copyright.</p><p class="text-small muted">Vedi il file LICENSE nel repository.</p></div>' +
        '<div class="license-card"><span class="license-mark">CC BY-NC-SA 4.0</span><h2>Contenuti</h2><p>Testi, schede, quiz, grafica e manuale sono distribuiti con licenza Creative Commons Attribuzione – Non commerciale – Condividi allo stesso modo 4.0 Internazionale.</p><ul><li><strong>Attribuzione:</strong> cita l\'autore, il titolo e la licenza.</li><li><strong>Non commerciale:</strong> nessun uso di lucro.</li><li><strong>Condividi allo stesso modo:</strong> le versioni modificate usano la stessa licenza.</li></ul></div>' +
        '<div class="license-card"><span class="license-mark">Pubblico dominio</span><h2>Opere storiche</h2><p>I testi cinquecenteschi citati nella biblioteca, come <em>I Discorsi</em> di Mattioli, sono in pubblico dominio: puoi leggerli e citarli liberamente.</p><p>Le scansioni e le xilografie restano soggette alle condizioni della biblioteca che le ha digitalizzate. Le edizioni moderne con note e introduzioni hanno diritti propri.</p><p class="text-small muted mb-0">Questa app racconta le opere storiche: non ne riproduce il testo.</p></div>' +
      "</div>" +

      '<div class="panel"><h2>Come citare</h2><p class="mb-0">«Naturopata Digitale — Il sapere gentile delle piante» di Danilo D\'Auria — un progetto FeniceOS — licenza CC BY-NC-SA 4.0 — <a href="https://danilodauria.github.io/naturopata-digitale/">danilodauria.github.io/naturopata-digitale</a></p></div>' +

      '<section class="section"><div class="home-split"><div class="panel"><h2>Privacy, davvero</h2><p>Non c\'è un server che riceve i tuoi dati. Preferiti, capitoli letti, statistiche dei quiz e cronologia della chat restano nel browser (localStorage). Non ci sono cookie pubblicitari, account o tracciamenti.</p><p class="text-small muted">Se cancelli i dati del browser o usi la modalità privata, i progressi possono andare persi. Esporta un backup prima di cambiare dispositivo.</p>' +
        '<h3>Il tuo backup</h3><p class="text-small">Salva preferiti, capitoli letti e statistiche in un piccolo file JSON. Non contiene dati personali.</p>' +
        '<div class="hero-actions" style="margin-top:.4rem"><button class="btn btn-primary btn-small" type="button" data-export>Esporta backup</button><button class="btn btn-secondary btn-small" type="button" data-import>Importa backup</button><button class="btn btn-ghost btn-small" type="button" data-reset>Cancella dati</button><input type="file" id="importFile" accept="application/json,.json" hidden></div>' +
      "</div>" +
        '<div class="panel panel-soft"><h2>Installazione offline</h2><p class="text-small"><strong>Android:</strong> apri il programma in Chrome, menu ⋮ → Installa app (o Aggiungi alla schermata Home).</p><p class="text-small"><strong>iPhone/iPad:</strong> apri in Safari, Condividi → Aggiungi alla schermata Home.</p><p class="text-small"><strong>Computer:</strong> dopo la prima apertura il service worker salva i contenuti; senza connessione apri di nuovo la stessa pagina. In alternativa, scarica il pacchetto del sito e apri <code>index.html</code>.</p><p class="text-small muted mb-0">L\'app funziona senza Internet; i link alle fonti esterne richiedono la rete.</p></div>' +
      "</div></section>" +

      '<section class="section"><div class="panel"><div class="section-head"><div><h2>Il Vademecum, da stampare</h2><p>Le pagine che servono quando non hai il telefono in mano: ricavate dagli stessi contenuti dell\'app, 28 pagine, in tre versioni.</p></div></div>' +
        '<div class="mini-stats"><div class="mini-stat"><strong>12</strong><span>segnali d\'allarme</span></div><div class="mini-stat"><strong>10</strong><span>piante tossiche</span></div><div class="mini-stat"><strong>' + (NP.plants || []).length + '</strong><span>piante in tasca</span></div></div>' +
        '<div class="download-grid mt-2">' +
          '<div class="download-card"><span class="download-tag">A5 · 28 pagine</span><h3>Da leggere e portare con te</h3><p>Il formato tascabile, comodo sullo schermo e da stampare fronte-retro su A5. Con i link alle fonti cliccabili.</p><a class="btn btn-primary btn-small btn-block" href="assets/pdf/vademecum-naturopata-digitale.pdf" download="Vademecum-Naturopata-Digitale-A5.pdf">Scarica in A5 ' + A.ico("download") + "</a></div>" +
          '<div class="download-card"><span class="download-tag">A4 · 28 pagine</span><h3>Da stampare su fogli normali</h3><p>Le stesse pagine ingrandite su A4, con margini di sicurezza per le stampanti domestiche. Perfetta per leggere e per chi ama i caratteri grandi.</p><a class="btn btn-secondary btn-small btn-block" href="assets/pdf/vademecum-naturopata-digitale-a4.pdf" download="Vademecum-Naturopata-Digitale-A4.pdf">Scarica in A4 ' + A.ico("download") + "</a></div>" +
          '<div class="download-card"><span class="download-tag">A4 · libricino</span><h3>Già imposto per la piega</h3><p>14 facciate A4 orizzontali con due pagine per lato: stampa fronte-retro, piega a metà e ottieni un libretto A5 di 28 pagine. Bastano 7 fogli.</p><a class="btn btn-secondary btn-small btn-block" href="assets/pdf/vademecum-naturopata-digitale-libricino-a4.pdf" download="Vademecum-Naturopata-Digitale-Libricino-A4.pdf">Scarica il libricino ' + A.ico("download") + "</a></div>" +
        '</div>' +
        '<div class="callout good mt-2"><span aria-hidden="true">🖨️</span><div><p><strong>Come stampare il libricino.</strong> Stampa su A4 orizzontale, fronte-retro, con rilegatura sul <strong>lato corto</strong> e al 100% (nessun adattamento alla pagina). Piega i fogli a metà, raccoglili nell\'ordine e fissali al centro con due punti metallici.</p><p class="mb-0">Se il retro esce capovolto, scegli la rilegatura sul lato lungo: dipende dal driver della stampante. Il PDF è già nell\'ordine giusto, non riordinare i fogli a mano.</p></div></div>' +
        '<p class="text-small muted mt-2 mb-0">Tutti i PDF sono senza pubblicità e senza tracciamento, e non entrano nella cache offline: li scarichi solo quando li chiedi. Contengono avvertenza, segnali d\'allarme, piante tossiche, interazioni con i farmaci, calendario del raccolto, preparazioni, le 60 piante in tabella, glossario e fonti.</p>' +
      "</div></section>" +

      '<section class="section"><div class="panel"><div class="section-head"><div><h2>Il programma per computer</h2><p>Non solo browser: la stessa app in un pacchetto da installare, per lavorare senza connessione.</p></div><a class="section-link" href="https://github.com/danilodauria/naturopata-digitale/releases/latest" target="_blank" rel="noopener">Scarica →</a></div>' +
        '<div class="info-grid">' +
          '<div class="info-card"><h3>Windows</h3><p>Installer <code>.exe</code> con collegamento nel menu Start e versione portabile. Nessuna dipendenza da installare.</p></div>' +
          '<div class="info-card"><h3>Linux</h3><p>Pacchetto <code>.deb</code> per Debian, Ubuntu e derivate, più <code>.AppImage</code> per le altre distribuzioni.</p></div>' +
          '<div class="info-card"><h3>macOS</h3><p>Immagine <code>.dmg</code> per Intel e Apple Silicon. App non firmata: al primo avvio usa tasto destro → Apri.</p></div>' +
        '</div>' +
        '<div class="callout warn mt-2"><span aria-hidden="true">🔐</span><div><p><strong>Perché compaiono gli avvisi.</strong> I pacchetti non sono firmati con certificati commerciali: Windows SmartScreen e macOS Gatekeeper possono chiedere una conferma. Scarica solo dalle release ufficiali del repository e verifica il nome del file.</p><p class="mb-0">Su Linux, per l\'AppImage: <code>chmod +x Naturopata*.AppImage</code>, poi avvia. Il <code>.deb</code> si installa con il gestore software oppure con <code>sudo apt install ./file.deb</code>.</p></div></div>' +
        '<p class="text-small muted mt-2 mb-0">Il programma è un contenitore desktop dell\'app: funziona offline, salva preferiti e progressi sul computer e non invia dati in rete. I pacchetti sono generati dal repository con Electron; il codice resta MIT e i contenuti CC BY-NC-SA 4.0.</p>' +
        '<p class="mt-2 mb-0"><a class="btn btn-secondary btn-small" href="https://github.com/danilodauria/naturopata-digitale" target="_blank" rel="noopener">Codice sorgente su GitHub</a></p>' +
      '</div></section>' +

      '<section class="section"><div class="section-head"><div><h2>Domande frequenti</h2><p>Le risposte che riguardano il programma, non la tua salute.</p></div></div>' +
        '<div class="glossary">' + (NP.faq || []).map((f) => '<details class="glossary-item"><summary>' + esc(f.q) + '</summary><div class="gloss-body"><p>' + esc(f.r) + "</p></div></details>").join("") + "</div>" +
      "</section>" +

      '<section class="section"><div class="home-split"><div class="panel"><h2>Che cosa c\'è dentro</h2><div class="mini-stats"><div class="mini-stat"><strong>' + (NP.plants || []).length + "</strong><span>schede</span></div><div class=\"mini-stat\"><strong>" + (NP.manual || []).length + "</strong><span>capitoli</span></div><div class=\"mini-stat\"><strong>" + (NP.quiz || []).length + "</strong><span>domande</span></div></div><p class=\"text-small muted mt-2 mb-0\">Tecnologia: HTML, CSS e JavaScript senza dipendenze esterne; PWA con service worker; tutti i contenuti sono locali.</p></div>" +
        '<div class="panel panel-soft"><h2>Un progetto FeniceOS</h2><p class="text-small">Ideato e sviluppato da <strong>Danilo D\'Auria</strong>, autore anche del Professore Digitale, del Consulente Digitale, di FeniceOS e del libro «Tecnologia Gentile: Informatica Sostenibile».</p><p class="text-small muted mb-0">Versione 1.2.0 · ottobre 2026 · nessun dato inviato in rete.</p></div></div>' +
      "</section>" +

      '<div class="callout warn"><span aria-hidden="true">⚕️</span><p class="mb-0"><strong>Avvertenza sanitaria.</strong> Naturopata Digitale è un\'opera divulgativa. Non fornisce diagnosi, prescrizioni o trattamenti. Le informazioni sulle piante non sostituiscono il parere di medico, farmacista, dietista o altro professionista sanitario. In caso di sintomi importanti, rivolgiti alle strutture sanitarie.</p></div>',
      "view-licenze"
    );
  };

  views["404"] = function () {
    A.page('<div class="empty-state" style="margin:3rem 0"><h1>Pagina non trovata</h1><p>Il collegamento non esiste o è cambiato.</p><a class="btn btn-primary" href="#/">Torna alla home</a></div>');
  };
})();
