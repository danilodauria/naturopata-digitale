/* ==========================================================================
   Naturopata Digitale · viste di biblioteca e sopravvivenza
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

(function () {
  "use strict";

  const A = NP.app;
  const views = A.views;
  const esc = A.esc;

  function colophon(extra) {
    return '<div class="callout license-note"><span aria-hidden="true">©</span><div><p class="mb-0"><strong>Licenze e attribuzioni.</strong> Testi, sintesi e schede di questa pagina sono originali di Danilo D\'Auria per Naturopata Digitale, distribuiti con licenza <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.it" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>: puoi condividerli e adattarli per uso non commerciale, citando autore, titolo e licenza e mantenendo la stessa licenza. Il codice è <a href="https://opensource.org/license/mit" target="_blank" rel="noopener">MIT</a>. ' + (extra || "") + '</p></div></div>';
  }

  /* ------------------------------------------------------------------------
     I Discorsi di Mattioli
     ------------------------------------------------------------------------ */

  views.matthioli = function () {
    const M = NP.matthioli;
    if (!M) return A.views["404"]();

    const edizioni = M.edizioni.map((e) =>
      '<tr><td><strong>' + esc(e.anno) + '</strong></td><td>' + esc(e.luogo) + '<br><span class="muted">' + esc(e.stampatore) + '</span></td><td>' + esc(e.lingua) + '</td><td>' + esc(e.nota) + (e.url ? ' <a href="' + esc(e.url) + '" target="_blank" rel="noopener">Consulta l\'esemplare →</a>' : '') + '</td></tr>'
    ).join("");

    A.page(
      '<div class="page-head book-head">' +
        '<p class="eyebrow">Biblioteca · 1544–1585</p>' +
        '<h1>I Discorsi di Mattioli</h1>' +
        '<p class="lead">' + esc(M.sintesi) + '</p>' +
        '<div class="hero-actions">' +
          '<a class="btn btn-primary" href="#/erbario">Confronta con l\'erbario ' + A.ico("leaf") + '</a>' +
          '<button class="btn btn-secondary" type="button" data-scroll="edizioni">Le edizioni digitalizzate ' + A.ico("book") + '</button>' +
        '</div>' +
        '<div class="mini-stats book-stats">' +
          M.cifre.map((c) => '<div class="mini-stat"><strong>' + esc(c.n) + '</strong><span>' + esc(c.t) + '</span></div>').join("") +
        '</div>' +
      '</div>' +

      '<div class="callout good"><span aria-hidden="true">📖</span><div><p><strong>Un\'opera di pubblico dominio.</strong> Mattioli è morto nel XVI secolo: il testo è libero da diritti d\'autore e può essere letto, citato e studiato da chiunque. Le scansioni hanno condizioni proprie, da verificare caso per caso.</p><p class="mb-0">Questa pagina è una guida originale: non riproduce il libro, lo racconta e ti porta alle fonti.</p></div></div>' +

      '<section class="section">' +
        '<div class="section-head"><div><h2>Perché leggerlo ancora oggi</h2><p>Non è un ricettario: è un laboratorio di metodo.</p></div></div>' +
        '<div class="info-grid">' +
          M.perche.map((p) => '<div class="info-card"><p class="mb-0">' + esc(p) + '</p></div>').join("") +
        '</div>' +
      '</section>' +

      '<section class="section home-split">' +
        '<div class="panel">' +
          '<p class="eyebrow">L\'autore</p>' +
          '<h2>' + esc(M.autore) + '</h2>' +
          '<p class="text-small muted">' + esc(M.vita) + '</p>' +
          '<ul class="timeline">' +
            M.biografia.map((b) => '<li><strong>' + esc(b.anno) + '</strong><span>' + esc(b.testo) + '</span></li>').join("") +
          '</ul>' +
        '</div>' +
        '<div class="panel panel-soft">' +
          '<p class="eyebrow">L\'opera</p>' +
          '<h3>' + esc(M.opera.titoloCompleto) + '</h3>' +
          '<p class="text-small">' + esc(M.opera.dioscoride) + '</p>' +
          '<ul class="fact-list">' +
            M.opera.struttura.map((s) => '<li><span class="k">' + esc(s.t) + '</span><span class="v">' + esc(s.d) + '</span></li>').join("") +
          '</ul>' +
        '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><div><h2>Che cosa contiene</h2><p>Cinque secoli fa, un\'enciclopedia scritta per chi doveva riconoscere le piante.</p></div></div>' +
        '<div class="info-grid">' +
          M.temi.map((t) => '<div class="info-card"><h3>' + esc(t.titolo) + '</h3><p class="mb-0">' + esc(t.testo) + '</p></div>').join("") +
        '</div>' +
      '</section>' +

      '<section class="section" id="edizioni">' +
        '<div class="section-head"><div><h2>Le edizioni</h2><p>Dalla prima stampa senza figure alle grandi xilografie. Dove trovarle.</p></div></div>' +
        '<div class="callout warn"><span aria-hidden="true">⚠️</span><p class="mb-0"><strong>Attenzione alla lingua.</strong> Mattioli scrisse in italiano: il testo del 1544 è già in volgare, non una traduzione. Le edizioni latine del 1554 e del 1565 sono la versione internazionale, ampliata. Le traduzioni moderne e le edizioni critiche hanno diritti propri e non sono pubblico dominio.</p></div>' +
        '<div class="table-wrap"><table class="data-table"><thead><tr><th>Anno</th><th>Luogo e stampatore</th><th>Lingua</th><th>Note</th></tr></thead><tbody>' + edizioni + '</tbody></table></div>' +
        '<div class="panel mt-2">' +
          '<h3>Che cosa guardare in una pagina</h3>' +
          '<ul>' + M.opera.numeri.map((n) => '<li>' + esc(n) + '</li>').join("") + '</ul>' +
        '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><div><h2>Quattro lezioni che restano</h2><p>Il valore del libro non è nelle ricette: è nel modo di guardare.</p></div></div>' +
        '<div class="prep-list">' +
          M.lezioni.map((l) => '<div class="prep"><h3>' + esc(l.titolo) + '</h3><p>' + esc(l.testo) + '</p><p class="dose"><strong>Oggi:</strong> ' + esc(l.oggi) + '</p></div>').join("") +
        '</div>' +
      '</section>' +

      '<section class="section home-split">' +
        '<div class="panel">' +
          '<h2>Pubblico dominio, ma con attenzione</h2>' +
          '<p><span class="badge-dot safety-verde">' + esc(M.pubblicoDominio.stato) + '</span></p>' +
          '<p>' + esc(M.pubblicoDominio.testo) + '</p>' +
          '<p class="text-small muted mb-0">' + esc(M.pubblicoDominio.attenzione) + '</p>' +
        '</div>' +
        '<div class="panel panel-soft">' +
          '<h2>Come leggerlo oggi</h2>' +
          '<ol>' + M.come.map((c) => '<li><strong>' + esc(c.t) + '.</strong> ' + esc(c.d) + '</li>').join("") + '</ol>' +
          '<p class="mt-2 mb-0"><button class="btn btn-secondary btn-small" type="button" data-ask="' + esc("Che cosa insegna ancora Mattioli?") + '">Chiedi a Neura ' + A.ico("brain") + '</button></p>' +
        '</div>' +
      '</section>' +

      '<blockquote class="quote">“' + esc(M.citazione.testo) + '”<footer>— ' + esc(M.citazione.fonte) + '</footer></blockquote>' +

      '<section class="section">' +
        '<div class="section-head"><div><h2>Dove verificare</h2><p>Fonti primarie e studi, con link diretti.</p></div></div>' +
        '<div class="panel"><ul class="source-list">' +
          M.fonti.map((f) => '<li><a href="' + esc(f.u) + '" target="_blank" rel="noopener">' + esc(f.t) + '</a> — ' + esc(f.nota) + '</li>').join("") +
        '</ul></div>' +
      '</section>' +

      colophon("Le opere storiche citate sono in pubblico dominio; le scansioni e le immagini restano soggette alle condizioni della biblioteca che le ha digitalizzate. Questa guida non riproduce pagine, xilografie o testi protetti."),

      "view-matthioli"
    );
  };

  /* ------------------------------------------------------------------------
     Sopravvivenza
     ------------------------------------------------------------------------ */

  views.sopravvivenza = function (params) {
    const S = NP.survival;
    if (!S) return A.views["404"]();
    const selected = S.livelli.some((l) => l.id === params[0]) ? params[0] : S.livelli[0].id;

    const tabs = '<div class="level-tabs" role="tablist" aria-label="Livelli di sopravvivenza">' +
      S.livelli.map((l) => '<button class="level-tab' + (l.id === selected ? " is-active" : "") + '" type="button" role="tab" aria-selected="' + (l.id === selected) + '" data-survival-tab="' + esc(l.id) + '">' + esc(l.nome) + '</button>').join("") +
      '</div>';

    const livelli = S.livelli.map((l) => {
      const schede = l.schede.map((s, i) =>
        '<details class="skill"' + (l.id === selected && i === 0 ? " open" : "") + '>' +
          '<summary><span class="skill-num">' + String(i + 1).padStart(2, "0") + '</span><span>' + esc(s.titolo) + '</span></summary>' +
          '<div class="skill-body"><p>' + esc(s.testo) + '</p><p class="skill-error"><strong>Errore da evitare:</strong> ' + esc(s.errore) + '</p></div>' +
        '</details>'
      ).join("");
      return '<section class="level-block" data-survival-panel="' + esc(l.id) + '"' + (l.id === selected ? "" : " hidden") + '>' +
        '<div class="level-head"><div><p class="eyebrow">Livello ' + esc(l.nome.toLowerCase()) + '</p><h2>' + esc(l.motto) + '</h2><p>' + esc(l.sintesi) + '</p></div>' +
          '<div class="level-goal"><span>Obiettivo</span><strong>' + esc(l.obiettivo) + '</strong></div></div>' +
        '<div class="skill-grid">' + schede + '</div>' +
        '<div class="panel mt-2"><h3>Kit essenziale · livello ' + esc(l.nome.toLowerCase()) + '</h3><ul class="kit-list">' + l.kit.map((k) => '<li>' + esc(k) + '</li>').join("") + '</ul>' +
          '<p class="text-small muted mb-0">Non serve tutto per ogni uscita: adatta il kit alla stagione, al terreno e alla durata. Zaino leggero e ordinato vale più di uno pieno di oggetti inutili.</p>' +
        '</div>' +
      '</section>';
    }).join("");

    A.page(
      '<div class="page-head">' +
        '<p class="eyebrow">Sapere pratico · tre livelli</p>' +
        '<h1>' + esc(S.titolo) + ': tornare a casa</h1>' +
        '<p class="lead">' + esc(S.sintesi) + '</p>' +
        '<div class="mini-stats">' +
          '<div class="mini-stat"><strong>3</strong><span>livelli</span></div>' +
          '<div class="mini-stat"><strong>' + S.livelli.reduce((n, l) => n + l.schede.length, 0) + '</strong><span>schede pratiche</span></div>' +
          '<div class="mini-stat"><strong>' + S.errori.length + '</strong><span>errori da evitare</span></div>' +
          '<div class="mini-stat"><strong>112</strong><span>il numero da chiamare</span></div>' +
        '</div>' +
      '</div>' +

      '<div class="callout danger"><span aria-hidden="true">🚨</span><div><p><strong>Questa pagina non è un corso e non sostituisce i soccorsi.</strong> In emergenza chiama subito il 112 e segui le istruzioni dell\'operatore. Le tecniche descritte richiedono pratica supervisionata: leggi, ma soprattutto esercitati con persone competenti.</p><p class="mb-0">Non pianificare un\'uscita contando su cibo selvatico, fuoco o «trucchi»: le priorità sono protezione, chiamata, acqua e riparo.</p></div></div>' +

      '<section class="section">' +
        '<div class="section-head"><div><h2>' + esc(S.regola.titolo) + '</h2><p>' + esc(S.regola.testo) + '</p></div></div>' +
        '<div class="rules-grid">' +
          S.regola.voci.map((v) => '<div class="rule"><span class="n">' + esc(v.t) + '</span><p>' + esc(v.d) + '</p></div>').join("") +
        '</div>' +
      '</section>' +

      '<section class="section home-split">' +
        '<div class="panel">' +
          '<h2>' + esc(S.stop.titolo) + '</h2>' +
          '<ol>' + S.stop.passi.map((p) => '<li>' + esc(p) + '</li>').join("") + '</ol>' +
        '</div>' +
        '<div class="panel panel-soft">' +
          '<h2>Prima di muoversi</h2>' +
          '<p class="text-small">Un\'uscita sicura comincia a casa: qualcuno deve sapere dove sei e quando torni. Scarica la carta della zona, controlla meteo e divieti, porta acqua e strati asciutti.</p>' +
          '<p class="text-small mb-0">Se il gruppo si divide, stabilisci un punto di ritrovo e un orario. Se qualcuno si ferisce, la priorità cambia: non si prosegue «per finire il giro».</p>' +
          '<p class="mt-2 mb-0"><button class="btn btn-secondary btn-small" type="button" data-ask="' + esc("Come preparo lo zaino per un\'escursione?") + '">Chiedi a Neura ' + A.ico("brain") + '</button></p>' +
        '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><div><h2>I tre livelli</h2><p>Dal primo giorno all\'emergenza complessa. Scegli il tuo livello, ma leggi anche gli altri: la base serve sempre.</p></div></div>' +
        tabs + livelli +
      '</section>' +

      '<section class="section home-split">' +
        '<div class="panel">' +
          '<h2>Dieci errori che uccidono</h2>' +
          '<ol class="danger-list">' + S.errori.map((e) => '<li>' + esc(e) + '</li>').join("") + '</ol>' +
        '</div>' +
        '<div class="panel panel-soft">' +
          '<h2>Regole e legalità</h2>' +
          S.norme.map((n) => '<p class="text-small"><strong>' + esc(n.t) + '.</strong> ' + esc(n.d) + '</p>').join("") +
          '<p class="text-small muted mb-0">Le norme cambiano per Regione, Comune e area protetta: verifica sempre presso l\'ente gestore prima di accendere un fuoco, bivaccare o raccogliere.</p>' +
        '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><div><h2>Fonti e formazione</h2><p>Le fonti che contano sono istituzionali. Il resto è pratica.</p></div></div>' +
        '<div class="panel"><ul class="source-list">' +
          S.fonti.map((f) => '<li><a href="' + esc(f.u) + '" target="_blank" rel="noopener">' + esc(f.t) + '</a> — ' + esc(f.nota) + '</li>').join("") +
        '</ul></div>' +
        '<div class="callout good mt-2"><span aria-hidden="true">🎓</span><p class="mb-0"><strong>Formarsi davvero.</strong> Un corso di primo soccorso della Croce Rossa, un corso di topografia e orientamento del CAI, un addestramento di soccorso alpino o di primo soccorso remoto valgono più di cento pagine lette. Cerca le sedi nella tua zona e porta con te chi ha meno esperienza.</p></div>' +
      '</section>' +

      colophon("Le tecniche descritte sono sintesi originali di fonti istituzionali e manuali citati; non riproducono testi protetti. Le immagini e i marchi eventualmente citati appartengono ai rispettivi titolari."),

      "view-sopravvivenza"
    );

    const tabButtons = document.querySelectorAll("[data-survival-tab]");
    const panels = document.querySelectorAll("[data-survival-panel]");
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-survival-tab");
        tabButtons.forEach((b) => {
          const on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", String(on));
        });
        panels.forEach((p) => { p.hidden = p.getAttribute("data-survival-panel") !== id; });
      });
    });
  };
})();
