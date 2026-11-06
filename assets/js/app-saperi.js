/* ==========================================================================
   Naturopata Digitale · viste dei saperi antichi
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

(function () {
  "use strict";

  const A = NP.app;
  const views = A.views;
  const esc = A.esc;

  // Il badge di sicurezza usa le etichette e i colori già presenti nelle schede.
  function badge(level) {
    const s = A.SAFETY[level] || A.SAFETY.verde;
    return '<span class="badge-dot safety-' + level + '" title="' + esc(s.long) + '">' + s.label + "</span>";
  }

  /* ------------------------------------------------------------------------
     Spezierie e liquorerie storiche
     ------------------------------------------------------------------------ */

  views.spezierie = function () {
    const lista = NP.spezierie || [];

    A.page(
      '<nav class="crumbs" aria-label="Percorso"><a href="#/">Home</a><span aria-hidden="true">/</span><span>Saperi antichi</span><span aria-hidden="true">/</span><span>Spezierie</span></nav>' +
      '<div class="page-head">' +
        '<p class="eyebrow">Saperi antichi</p>' +
        "<h1>La mappa delle spezierie storiche</h1>" +
        '<p class="lead">Dove il sapere erboristico è ancora un mestiere: farmacie d’abbazia, liquorerie monastiche, officine che da secoli preparano elisir con le stesse piante. Con i collegamenti ai siti ufficiali, senza pubblicità e senza intermediari.</p>' +
        '<div class="hero-actions"><a class="btn btn-primary" href="#/amari">Atlante degli amari ' + A.ico("arrow") + '</a><a class="btn btn-secondary" href="#/estrazioni">Oleoliti e distillati ' + A.ico("drop") + "</a></div>" +
      "</div>" +

      '<div class="callout warn"><span aria-hidden="true">🧭</span><div><p><strong>Che cosa trovi qui.</strong> Luoghi reali, visitabili o con un negozio ufficiale: nessun elenco comprato e nessun link sponsorizzato. I prezzi non sono indicati perché cambiano: si controllano sul sito del venditore.</p><p class="mb-0">Le schede raccontano la storia del luogo, non promettono effetti terapeutici.</p></div></div>' +

      '<section class="section"><div class="section-head"><div><h2>' + lista.length + ' spezierie da conoscere</h2><p>Dalla Ciociaria a Firenze, dal Casentino alle Alpi: ogni officina ha la sua pianta simbolo.</p></div></div>' +
        '<div class="info-grid">' +
          lista.map((s) =>
            '<article class="info-card" id="' + esc(s.id) + '">' +
              "<h3>" + esc(s.nome) + "</h3>" +
              '<p class="text-small muted">' + esc(s.luogo) + " · " + esc(s.epoca) + "</p>" +
              "<p>" + esc(s.storia) + "</p>" +
              '<p><strong>Che cosa si trova:</strong> ' + esc((s.cosa || []).join(", ")) + "</p>" +
              '<p class="text-small"><strong>Perché conta:</strong> ' + esc(s.perche) + "</p>" +
              '<p class="text-small"><strong>Visitare:</strong> ' + esc(s.visita) + "</p>" +
              '<p class="text-small"><strong>Attenzione:</strong> ' + esc(s.attenzione) + "</p>" +
              '<p class="mt-2 mb-0">' + (s.link || []).map((l) => '<a class="btn btn-ghost btn-small" href="' + esc(l.u) + '" target="_blank" rel="noopener">' + esc(l.t) + " ↗</a>").join(" ") + "</p>" +
            "</article>"
          ).join("") +
        "</div>" +
      "</section>" +

      '<section class="section"><div class="home-split"><div class="panel">' +
        "<h2>" + esc(NP.spezierieGuida.titolo) + "</h2>" +
        '<div class="rules-grid">' + (NP.spezierieGuida.passi || []).map((p, i) => '<div class="rule"><span class="n">' + String(i + 1).padStart(2, "0") + "</span><h3>" + esc(p.t) + "</h3><p>" + esc(p.d) + "</p></div>").join("") + "</div>" +
      "</div>" +
        '<div class="panel panel-soft"><h3>Prima di partire</h3><p class="text-small">Chiama o scrivi prima di metterti in viaggio: molti laboratori si visitano solo su prenotazione e gli orari seguono la vita della comunità.</p><p class="text-small muted mb-0">' + esc(NP.spezierieGuida.nota) + "</p>" +
        '<p class="mt-2 mb-0"><a class="btn btn-secondary btn-small btn-block" href="#/amari">Che cosa si beve: gli amari ' + A.ico("arrow") + "</a></p></div>" +
      "</div></section>" +

      '<div class="callout"><span aria-hidden="true">🍷</span><div><p><strong>Dal luogo alla bottiglia.</strong> Nelle spezierie si comprano amari, elisir e materie prime; nell’atlante trovi che cosa contengono e a che cosa fare attenzione.</p><p class="mb-0"><a href="#/amari">Atlante degli amari →</a> · <a href="#/estrazioni">Oleoliti e distillati →</a></p></div></div>',
      "view-spezierie"
    );
  };

  /* ------------------------------------------------------------------------
     Atlante degli amari
     ------------------------------------------------------------------------ */

  views.amari = function () {
    const cats = NP.amariCategorie || [];
    const lista = NP.amari || [];
    const prezzi = NP.amariPrezzi || {};

    A.page(
      '<nav class="crumbs" aria-label="Percorso"><a href="#/">Home</a><span aria-hidden="true">/</span><span>Saperi antichi</span><span aria-hidden="true">/</span><span>Amari</span></nav>' +
      '<div class="page-head">' +
        '<p class="eyebrow">Atlante degli amari</p>' +
        "<h1>L’amaro, fra piacere e memoria</h1>" +
        '<p class="lead">' + lista.length + " amari fra abbazie e botteghe ottocentesche: che cosa contengono, da dove vengono e perché l’amaro è la bevanda più farmaceutica che conosciamo. Con le cautele che servono, perché resta alcol.</p>" +
        '<div class="hero-actions"><a class="btn btn-primary" href="#/spezierie">Le spezierie ' + A.ico("arrow") + '</a><a class="btn btn-secondary" href="#/estrazioni">Come si estrae ' + A.ico("drop") + "</a></div>" +
      "</div>" +

      '<div class="callout danger"><span aria-hidden="true">⚠️</span><div><p><strong>Un amaro non è una cura.</strong> È una bevanda alcolica con zuccheri ed erbe. Non va dato a bambini e adolescenti, va evitato in gravidanza e allattamento, e richiede parere medico se assumi farmaci, hai gastrite, ulcera, reflusso o problemi al fegato.</p><p class="mb-0">Le quantità contano: un bicchierino di amaro forte può contenere più alcol di un bicchiere di vino.</p></div></div>' +

      '<div class="filter-chips">' +
        '<button class="chip is-active" type="button" data-amaro-cat="tutte">Tutti</button>' +
        cats.map((c) => '<button class="chip" type="button" data-amaro-cat="' + esc(c.id) + '">' + esc(c.nome) + "</button>").join("") +
      "</div>" +

      cats.map((c) =>
        '<section class="section" data-amaro-group="' + esc(c.id) + '"><div class="section-head"><div><h2>' + esc(c.nome) + "</h2><p>" + esc(c.d) + "</p></div></div>" +
          '<div class="toxic-grid">' +
            lista.filter((a) => a.categoria === c.id).map((a) =>
              '<article class="toxic-card">' +
                "<h3>" + esc(a.nome) + "</h3>" +
                '<p class="latin">' + esc(a.origine) + "</p>" +
                '<p><strong>Ingredienti dichiarati:</strong> ' + esc((a.ingredienti || []).join(", ")) + "</p>" +
                "<p>" + esc(a.storia) + "</p>" +
                '<p class="text-small"><strong>Da sapere:</strong> ' + esc(a.nota) + "</p>" +
              "</article>"
            ).join("") +
          "</div>" +
        "</section>"
      ).join("") +

      '<section class="section"><div class="section-head"><div><h2>Gli ingredienti che fanno l’amaro</h2><p>Le stesse piante delle schede di sicurezza, viste dal lato del bicchiere.</p></div><a class="section-link" href="#/sicurezza">Interazioni e sicurezza →</a></div>' +
        '<div class="table-wrap"><table class="data-table"><thead><tr><th>Ingrediente</th><th>Parte usata</th><th>Che cosa fa</th></tr></thead><tbody>' +
          (NP.amariIngredienti || []).map((i) => "<tr><td><strong>" + esc(i.nome) + "</strong></td><td>" + esc(i.parte) + "</td><td>" + esc(i.nota) + "</td></tr>").join("") +
        "</tbody></table></div>" +
      "</section>" +

      '<section class="section"><div class="home-split"><div class="panel">' +
        "<h2>" + esc(prezzi.titolo) + "</h2>" +
        "<p>" + esc(prezzi.testo) + "</p>" +
        '<div class="rules-grid">' + (prezzi.criteri || []).map((p, i) => '<div class="rule"><span class="n">' + String(i + 1).padStart(2, "0") + "</span><h3>" + esc(p.t) + "</h3><p>" + esc(p.d) + "</p></div>").join("") + "</div>" +
        '<p class="text-small muted mt-2 mb-0">' + esc(prezzi.avviso) + "</p>" +
      "</div>" +
        '<div class="panel panel-soft"><h3>Negozi ufficiali</h3><ul class="source-list">' +
          (prezzi.link || []).map((l) => '<li><a href="' + esc(l.u) + '" target="_blank" rel="noopener">' + esc(l.t) + " ↗</a></li>").join("") +
        "</ul>" +
        '<h3 class="mt-2">Se vuoi preparare un amaro in casa</h3><p class="text-small">Si parte da una macerazione alcolica di erbe in alcol alimentare, poi si filtra, si zucchera e si lascia riposare. Non si distillano alcolici in casa: la distillazione richiede autorizzazioni. Per la vendita servono etichette, analisi e norme igieniche.</p>' +
        '<p class="text-small muted mb-0">Le ricette di famiglia restano un patrimonio orale: scrivile, con data e quantità, invece di tramandarle a memoria.</p></div>' +
      "</div></section>" +

      '<div class="callout"><span aria-hidden="true">📚</span><p class="mb-0">Fonti e numeri utili nella pagina <a href="#/sicurezza">Sicurezza e fonti</a>. In caso di malessere dopo aver bevuto un amaro, chiama il 112 o un Centro Antiveleni.</p></div>',
      "view-amari"
    );

    document.querySelectorAll("[data-amaro-cat]").forEach((b) => {
      b.addEventListener("click", () => {
        const cat = b.getAttribute("data-amaro-cat");
        document.querySelectorAll("[data-amaro-cat]").forEach((x) => x.classList.toggle("is-active", x === b));
        document.querySelectorAll("[data-amaro-group]").forEach((g) => {
          g.hidden = cat !== "tutte" && g.getAttribute("data-amaro-group") !== cat;
        });
      });
    });
  };

  /* ------------------------------------------------------------------------
     Tempo balsamico
     ------------------------------------------------------------------------ */

  views.balsamico = function () {
    const mesi = NP.balsamico || [];
    const sel = A.state.calMonth;
    const mese = mesi.find((m) => m.mese === sel) || mesi[0];
    const corrente = new Date().getMonth() + 1;

    A.page(
      '<nav class="crumbs" aria-label="Percorso"><a href="#/">Home</a><span aria-hidden="true">/</span><span>Saperi antichi</span><span aria-hidden="true">/</span><span>Tempo balsamico</span></nav>' +
      '<div class="page-head">' +
        '<p class="eyebrow">Ricettario alchemico</p>' +
        "<h1>Il tempo balsamico</h1>" +
        '<p class="lead">Ogni pianta ha un momento in cui dà il meglio: la gemma prima che si apra, il fiore appena sbocciato, la radice quando la parte aerea si ritira. Dodici mesi di raccolta, mese per mese, con che cosa si prepara e che cosa non fare.</p>' +
      "</div>" +

      '<div class="callout warn"><span aria-hidden="true">🌡️</span><div><p><strong>Il clima comanda.</strong> Le indicazioni valgono per la pianura italiana: a 1.200 metri la stessa pianta fiorisce tre o quattro settimane dopo. Guarda la pianta, non il calendario.</p><p class="mb-0">Non raccogliere specie protette, non entrare in riserve senza permesso e non prelevare più di quanto ti serve.</p></div></div>' +

      '<div class="month-tabs" role="tablist" aria-label="Mesi">' +
        mesi.map((m) => '<button class="month-tab' + (m.mese === corrente ? " is-current" : "") + (m.mese === sel ? " is-active" : "") + '" type="button" role="tab" aria-selected="' + (m.mese === sel) + '" data-month="' + m.mese + '">' + esc(A.MONTHS[m.mese]) + "</button>").join("") +
      "</div>" +

      '<div class="home-split">' +
        '<div class="panel">' +
          '<p class="eyebrow">' + esc(A.MONTHS[mese.mese]) + (mese.mese === corrente ? " · mese corrente" : "") + "</p>" +
          "<h2>" + esc(mese.titolo) + "</h2>" +
          "<p><strong>Il momento:</strong> " + esc(mese.momento) + "</p>" +
          "<h3>Si raccoglie</h3><div class=\"pill-list\">" + (mese.raccogli || []).map((x) => '<span class="pill">' + esc(x) + "</span>").join("") + "</div>" +
          "<h3>Si prepara</h3><ul>" + (mese.prepara || []).map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>" +
          '<div class="callout mb-0"><span aria-hidden="true">✋</span><p class="mb-0">' + esc(mese.nota) + "</p></div>" +
        "</div>" +
        '<div class="panel panel-soft">' +
          "<h3>Il quaderno di raccolta</h3>" +
          '<p class="text-small">Scrivi per ogni uscita: data, luogo, quota, meteo, pianta, parte raccolta, quantità. Dopo tre anni hai un calendario tuo, più preciso di qualsiasi tabella.</p>' +
          '<p class="text-small muted">Le schede delle piante hanno già la stagione indicata: usa il <a href="#/calendario">calendario di raccolta</a> per incrociare i dati.</p>' +
          '<a class="btn btn-secondary btn-small btn-block" href="#/estrazioni">Che cosa farne: oleoliti e tinture</a>' +
          '<a class="btn btn-ghost btn-small btn-block mt-2" href="#/erbario">Cerca una pianta nell’erbario</a>' +
        "</div>" +
      "</div>" +

      '<section class="section"><div class="section-head"><div><h2>L’anno in un colpo d’occhio</h2><p>Dodici riquadri: il momento balsamico e la preparazione tipica.</p></div></div>' +
        '<div class="calendar-grid">' +
          mesi.map((m) =>
            '<div class="month-card' + (m.mese === corrente ? " is-now" : "") + '"><h3>' + esc(MONTHS_TITLE(m.mese)) + " <span>" + (m.mese === corrente ? "ora" : "") + "</span></h3><p><strong>" + esc(m.titolo) + "</strong><br>" + esc(m.momento) + "</p>" +
            '<p class="mb-0" style="margin-top:.6rem"><button class="btn btn-ghost btn-small" type="button" data-month="' + m.mese + '">Apri ' + esc(A.MONTHS[m.mese]) + "</button></p></div>"
          ).join("") +
        "</div>" +
      "</section>" +

      '<div class="callout"><span aria-hidden="true">🌿</span><p class="mb-0">Vuoi la versione essenziale? La trovi anche nella pagina <a href="#/calendario">Calendario di raccolta</a>, con le piante dell’erbario raccoglibili in ogni mese.</p></div>',
      "view-balsamico"
    );
  };

  function MONTHS_TITLE(n) {
    const s = A.MONTHS[n] || "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /* ------------------------------------------------------------------------
     Funghi e foraging
     ------------------------------------------------------------------------ */

  views.funghi = function () {
    const lista = NP.funghi || [];
    const mic = NP.micologia || { regole: [], riconoscimento: [], etnobotanica: [], fonti: [] };

    A.page(
      '<nav class="crumbs" aria-label="Percorso"><a href="#/">Home</a><span aria-hidden="true">/</span><span>Saperi antichi</span><span aria-hidden="true">/</span><span>Funghi</span></nav>' +
      '<div class="page-head">' +
        '<p class="eyebrow">Foraging sicuro e micologia</p>' +
        "<h1>Il bosco non perdona</h1>" +
        '<p class="lead">Funghi medicinali della tradizione, funghi da cucina e regole di raccolta: ' + lista.length + ' schede con l’evidenza reale, e le otto regole che valgono più di qualsiasi fotografia.</p>' +
        '<div class="hero-actions"><a class="btn btn-primary" href="#/sicurezza">Piante e funghi tossici ' + A.ico("shield") + '</a><a class="btn btn-secondary" href="#/balsamico">Tempo balsamico ' + A.ico("calendar") + "</a></div>" +
      "</div>" +

      '<div class="callout danger"><span aria-hidden="true">☠️</span><div><p><strong>Nessuna app riconosce un fungo.</strong> Le amaniti velenose possono somigliare a specie commestibili e la cottura non distrugge le loro tossine. Fai controllare ogni raccolta da un micologo dell’ispettorato, e in caso di ingestione sospetta chiama subito il 112 o un Centro Antiveleni: non indurre il vomito, conserva i resti.</p><p class="mb-0"><a href="https://www.iss.it/-/cnsc-cav" target="_blank" rel="noopener">Elenco ISS dei Centri Antiveleni →</a></p></div></div>' +

      '<section class="section"><div class="section-head"><div><h2>Funghi medicinali e d’uso tradizionale</h2><p>Che cosa dice la ricerca, senza entusiasmi e senza allarmismi.</p></div></div>' +
        '<div class="toxic-grid">' +
          lista.map((f) =>
            '<article class="toxic-card">' +
              "<h3>" + esc(f.nome) + " " + badge(f.livello) + "</h3>" +
              '<p class="latin">' + esc(f.latino) + "</p>" +
              "<p><strong>Uso:</strong> " + esc(f.uso) + "</p>" +
              "<p><strong>Tradizione:</strong> " + esc(f.tradizione) + "</p>" +
              "<p><strong>Evidenza:</strong> " + esc(f.evidenza) + "</p>" +
              '<p><strong>Sicurezza:</strong> ' + esc(f.sicurezza) + "</p>" +
              '<p class="text-small muted mb-0">' + esc(f.nota) + "</p>" +
            "</article>"
          ).join("") +
        "</div>" +
        '<p class="text-small muted mt-2">Nessuno di questi funghi è un farmaco. Le etichette «medicinale» o «tonico» non sostituiscono una terapia e non curano il cancro: diffida di chi lo lascia intendere.</p>' +
      "</section>" +

      '<section class="section"><div class="section-head"><div><h2>Otto regole per andare nel bosco</h2><p>Valgono per un cesto di finferli come per un’uscita con il gruppo.</p></div></div>' +
        '<div class="rules-grid">' + (mic.regole || []).map((r, i) => '<div class="rule"><span class="n">' + String(i + 1).padStart(2, "0") + "</span><h3>" + esc(r.t) + "</h3><p>" + esc(r.d) + "</p></div>").join("") + "</div>" +
      "</section>" +

      '<section class="section"><div class="home-split"><div class="panel">' +
        "<h2>Come si riconosce un fungo</h2><p class=\"text-small muted\">Cinque caratteri da guardare, sempre insieme.</p>" +
        '<div class="table-wrap"><table class="data-table"><tbody>' +
          (mic.riconoscimento || []).map((r) => "<tr><td><strong>" + esc(r.t) + "</strong></td><td>" + esc(r.d) + "</td></tr>").join("") +
        "</tbody></table></div>" +
      "</div>" +
        '<div class="panel panel-soft"><h2>Etnobotanica del bosco</h2><ul>' +
          (mic.etnobotanica || []).map((x) => "<li>" + esc(x) + "</li>").join("") +
        "</ul>" +
        '<p class="text-small muted mb-0">Le fonti sono nella pagina <a href="#/sicurezza">Sicurezza e fonti</a>.</p></div>' +
      "</div></section>" +

      '<section class="section"><div class="panel"><div class="section-head"><div><h2>Un kit minimo per il foraging</h2><p>Poche cose, scelte bene.</p></div></div>' +
        '<div class="info-grid">' +
          '<div class="info-card"><h3>Cesto di vimini</h3><p>Areato, rigido, con il manico comodo: le spore cadono e i funghi non fermentano.</p></div>' +
          '<div class="info-card"><h3>Coltello e spazzola</h3><p>Per pulire sul posto e tagliare alla base, senza strappare il micelio.</p></div>' +
          '<div class="info-card"><h3>Vestiario e acqua</h3><p>Scarpe chiuse, giacca, acqua: nel bosco ci si perde prima di quanto si pensi.</p></div>' +
          '<div class="info-card"><h3>Telefono carico</h3><p>Per chiamare il 112 e condividere la posizione. Non per identificare i funghi.</p></div>' +
        "</div>" +
      "</div></section>" +

      '<div class="callout"><span aria-hidden="true">🧺</span><p class="mb-0"><strong>Una nota legale.</strong> La raccolta dei funghi è regolata da leggi regionali: in molte regioni servono un tesserino e il pagamento di un contributo, e ci sono limiti giornalieri. Informati presso il tuo comune o il Corpo forestale prima di uscire.</p></div>',
      "view-funghi"
    );
  };

  /* ------------------------------------------------------------------------
     Oleoliti e distillati
     ------------------------------------------------------------------------ */

  views.estrazioni = function () {
    const lista = NP.estrazioni || [];

    A.page(
      '<nav class="crumbs" aria-label="Percorso"><a href="#/">Home</a><span aria-hidden="true">/</span><span>Saperi antichi</span><span aria-hidden="true">/</span><span>Estrazioni</span></nav>' +
      '<div class="page-head">' +
        '<p class="eyebrow">Ricettario alchemico</p>' +
        "<h1>Oleoliti, tinture, distillati</h1>" +
        '<p class="lead">Come si porta a casa il profumo di una stagione: macerazioni a freddo, tinture alcoliche, cotture e distillazione. Con i tempi veri, i rischi veri e i limiti di legge che pochi raccontano.</p>' +
        '<div class="hero-actions"><a class="btn btn-primary" href="#/erbario">Cerca la pianta ' + A.ico("leaf") + '</a><a class="btn btn-secondary" href="#/balsamico">Quando raccogliere ' + A.ico("calendar") + "</a></div>" +
      "</div>" +

      '<div class="callout danger"><span aria-hidden="true">🔥</span><div><p><strong>La distillazione di alcol in casa è vietata.</strong> In Italia produrre alcol etilico per uso alimentare richiede autorizzazioni specifiche: non è un esperimento da cucina. Gli oli essenziali sono concentrati, infiammabili e non si usano mai puri sulla pelle.</p><p class="mb-0">Per uso interno di tinture e oleoliti chiedi a un erborista o a un medico: le schede descrivono la tecnica, non prescrivono dosi.</p></div></div>' +

      '<div class="callout warn"><span aria-hidden="true">🧪</span><p class="mb-0"><strong>Igiene prima di tutto.</strong> Barattoli sterilizzati, piante asciutte, etichette con data e specie. Una preparazione contaminata è più pericolosa di una pianta sconosciuta.</p></div>' +

      '<section class="section"><div class="section-head"><div><h2>' + lista.length + ' preparazioni, passo per passo</h2><p>Dalla più semplice alla più tecnica.</p></div></div>' +
        '<div class="prep-list">' +
          lista.map((p) =>
            '<div class="prep" id="' + esc(p.id) + '">' +
              "<h3>" + esc(p.titolo) + "</h3>" +
              '<p class="dose">' + esc(p.tipo) + " · " + esc(p.tempo) + "</p>" +
              '<p><strong>Serve:</strong> ' + esc((p.ingredienti || []).join(", ")) + "</p>" +
              "<ol>" + (p.passi || []).map((x) => "<li>" + esc(x) + "</li>").join("") + "</ol>" +
              '<div class="callout mb-0"><span aria-hidden="true">⚠️</span><p class="mb-0"><strong>Sicurezza:</strong> ' + esc(p.sicurezza) + "</p></div>" +
              '<p class="text-small muted mt-2 mb-0"><strong>Conservazione:</strong> ' + esc(p.conservazione) + "</p>" +
            "</div>"
          ).join("") +
        "</div>" +
      "</section>" +

      '<section class="section"><div class="home-split"><div class="panel">' +
        "<h2>Gli errori che rovinano una preparazione</h2>" +
        '<div class="table-wrap"><table class="data-table"><thead><tr><th>Errore</th><th>Che cosa succede</th></tr></thead><tbody>' +
          "<tr><td><strong>Pianta bagnata</strong></td><td>L’acqua fa marcire olio e tintura: si raccoglie asciutto, al mattino, dopo due giorni senza pioggia.</td></tr>" +
          "<tr><td><strong>Vetro trasparente</strong></td><td>La luce degrada i principi attivi: sempre vetro scuro, armadio fresco.</td></tr>" +
          "<tr><td><strong>Barattolo pieno fino all’orlo</strong></td><td>Serve aria per l’espansione: lascia un dito di spazio e chiudi senza forzare.</td></tr>" +
          "<tr><td><strong>Nessuna etichetta</strong></td><td>Dopo un mese non ricordi più che cosa hai messo: data, pianta, parte, alcol o olio.</td></tr>" +
          "<tr><td><strong>Filtro frettoloso</strong></td><td>Residui di pianta continuano a macerare e rendono la preparazione instabile.</td></tr>" +
        "</tbody></table></div>" +
      "</div>" +
        '<div class="panel panel-soft"><h2>Le parole giuste</h2><ul class="source-list">' +
          '<li><strong>Oleolito</strong> — macerazione di pianta in olio, per uso cutaneo.</li>' +
          '<li><strong>Tintura madre</strong> — macerazione alcolica di pianta fresca, con rapporto pianta/alcol dichiarato.</li>' +
          '<li><strong>Idrolato</strong> — acqua aromatica che resta dopo la distillazione in corrente di vapore.</li>' +
          '<li><strong>Olio essenziale</strong> — frazione volatile concentrata, non grassa e non solubile in acqua.</li>' +
          '<li><strong>Estratto secco</strong> — pianta lavorata fino a polvere, con titolazione dichiarata.</li>' +
        "</ul>" +
        '<p class="text-small muted mb-0">Glossario completo nella pagina <a href="#/glossario">Glossario</a>.</p></div>' +
      "</div></section>" +

      '<div class="callout"><span aria-hidden="true">📚</span><p class="mb-0">Fonti e numeri utili: <a href="#/sicurezza">Sicurezza e fonti</a>. Per una reazione avversa a un integratore, la segnalazione si fa tramite <a href="https://www.aifa.gov.it/" target="_blank" rel="noopener">AIFA</a>.</p></div>',
      "view-estrazioni"
    );
  };
})();
