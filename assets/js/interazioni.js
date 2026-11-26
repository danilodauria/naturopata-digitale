/* ==========================================================================
   Naturopata Digitale · indice inverso delle interazioni
   Licenza del codice: MIT · Danilo D'Auria
   --------------------------------------------------------------------------
   Le schede elencano le interazioni partendo dalla pianta. Qui l'indice va
   al contrario: da una parola del farmaco alle schede che la citano, con la
   frase esatta e il livello di cautela della scheda. È informazione, non
   consiglio: non sostituisce medico o farmacista.
   ========================================================================== */

(function () {
  "use strict";

  const ETICHETTE = { rosso: "Cautela alta", giallo: "Cautela media", verde: "Cautela bassa" };
  const PESO = { rosso: 3, giallo: 2, verde: 1 };

  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
  }

  /* i farmaci e le famiglie che ricorrono nelle frasi: l'elenco si calcola
     dalle schede, non è scritto a mano. Le espressioni lavorano sul testo
     normalizzato, una voce può avere più nomi (anticoagulanti, antiaggreganti) */
  const VOCI = [
    ["anticoagulanti", "famiglia", "Anticoagulanti e antiaggreganti", /\b(anticoagulant\w*|antiaggregant\w*)/],
    ["sedativi", "famiglia", "Sedativi", /\bsedativ\w*/],
    ["antidiabetici", "famiglia", "Antidiabetici e ipoglicemizzanti", /\b(antidiabetic\w*|ipoglicemizzant\w*|glicemia)\b/],
    ["diuretici", "famiglia", "Diuretici", /\bdiuretic\w*/],
    ["antipertensivi", "famiglia", "Antipertensivi", /\b(antipertensiv\w*|antiipertensiv\w*|per la pressione\b)/],
    ["antidepressivi", "famiglia", "Antidepressivi (SSRI, SNRI, IMAO)", /\b(antidepressiv\w*|ssri|snri|imao|triptani)\b/],
    ["farmaci-orali", "famiglia", "Farmaci orali e assorbimento", /\b(farmaci orali|farmaci assorbiti|assorbimento)\b/],
    ["fibre", "famiglia", "Fibre, mucillagini e tannini", /\b(mucillagin\w*|fibra|tannin\w*|polifenoli)\b/],
    ["fegato", "famiglia", "Farmaci metabolizzati dal fegato", /\bmetabolizzati dal fegato\b/],
    ["antiacidi", "famiglia", "Antiacidi e inibitori di pompa", /\b(antiacid\w*|inibitori di pompa)\b/],
    ["corticosteroidi", "famiglia", "Corticosteroidi", /\bcorticosteroid\w*/],
    ["epatotossici", "famiglia", "Farmaci epatotossici", /\bepatotossic\w*/],
    ["immunosoppressori", "famiglia", "Immunosoppressori", /\bimmunosoppressor\w*/],
    ["ormoni", "famiglia", "Ormoni e farmaci ormonali", /\b(ormonal\w*|ormoni tiroidei|per la tiroide)\b/],
    ["anticonvulsivanti", "famiglia", "Anticonvulsivanti", /\banticonvulsivant\w*/],
    ["alcol", "famiglia", "Alcol", /\balcol\b/],
    ["benzodiazepine", "famiglia", "Benzodiazepine e barbiturici", /\b(benzodiazepin\w*|barbituric\w*)\b/],
    ["lassativi", "famiglia", "Lassativi", /\blassativ\w*/],
    ["statine", "famiglia", "Statine e farmaci per il colesterolo", /\b(statin\w*|colesterolo)\b/],
    ["antibiotici", "famiglia", "Antibiotici", /\bantibiotic\w*/],
    ["antiretrovirali", "famiglia", "Antiretrovirali", /\bantiretrovirali\b/],
    ["chemioterapici", "famiglia", "Chemioterapici", /\bchemioterapic\w*/],
    ["antiaritmici", "famiglia", "Antiaritmici e farmaci che allungano il QT", /\b(antiaritmic\w*|del qt)\b/],
    ["antistaminici", "famiglia", "Antistaminici", /\bantistaminic\w*/],
    ["contraccettivi", "famiglia", "Contraccettivi orali", /\bcontraccettiv\w*/],
    ["warfarin", "farmaco", "Warfarin", /\bwarfarin\b/],
    ["digossina", "farmaco", "Digossina", /\bdigossina\b/],
    ["litio", "farmaco", "Litio", /\blitio\b/],
    ["ciclosporina", "farmaco", "Ciclosporina, tacrolimus e sirolimus", /\b(ciclosporina|tacrolimus|sirolimus)\b/],
    ["teofillina", "farmaco", "Teofillina", /\bteofillina\b/],
    ["ferro", "farmaco", "Ferro", /\bferro\b/],
    ["fans", "farmaco", "FANS", /\bfans\b/],
    ["stimolanti", "farmaco", "Stimolanti e caffeina", /\b(stimolanti|caffeina)\b/]
  ].map(function (v) {
    return { chiave: v[0], tipo: v[1], etichetta: v[2], re: v[3] };
  });

  /* la parola deve cominciare una parola intera, come nella ricerca rapida */
  function inizioParola(x) {
    return new RegExp("(^|[^a-z0-9])" + x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  }

  /* una riga per ogni frase di interazione di ogni scheda: la stessa pianta
     compare più volte se nomina più farmaci o famiglie */
  const indice = [];
  const conteggi = {};
  (NP.plants || []).forEach(function (p) {
    const s = p.sicurezza || {};
    (s.interazioni || []).forEach(function (frase) {
      indice.push({
        pianta: p.nome,
        id: p.id,
        frase: frase,
        livello: s.livello,
        cautela: ETICHETTE[s.livello] || ETICHETTE.verde,
        peso: PESO[s.livello] || 1,
        via: "#/pianta/" + p.id
      });
      const hay = norm(frase);
      VOCI.forEach(function (v) {
        if (!v.re.test(hay)) return;
        const c = conteggi[v.chiave] || (conteggi[v.chiave] = { schede: {}, frasi: 0 });
        c.schede[p.id] = true;
        c.frasi++;
      });
    });
  });

  NP.interazioniIndice = indice;

  /* quante schede nominano ogni voce: è il numero che si legge nell'elenco,
     così l'indice si può sfogliare senza sapere la parola esatta */
  function ordina(a, b) {
    return b.peso - a.peso || a.pianta.localeCompare(b.pianta, "it") || a.frase.localeCompare(b.frase, "it");
  }

  NP.interazioniPiuCitati = VOCI.map(function (v) {
    const c = conteggi[v.chiave];
    return {
      chiave: v.chiave,
      tipo: v.tipo,
      etichetta: v.etichetta,
      schede: c ? Object.keys(c.schede).length : 0,
      frasi: c ? c.frasi : 0
    };
  }).filter(function (v) { return v.schede > 0; }).sort(function (a, b) {
    return b.schede - a.schede || a.etichetta.localeCompare(b.etichetta, "it");
  });

  /* le frasi di una voce dell'elenco, con la stessa regola della ricerca */
  NP.filtraInterazioni = function (chiave) {
    const voce = VOCI.filter(function (v) { return v.chiave === chiave; })[0];
    if (!voce) return [];
    return indice.filter(function (r) { return voce.re.test(norm(r.frase)); }).sort(ordina);
  };

  /* le parole proposte sotto il campo: farmaci e famiglie che ricorrono */
  NP.interazioniEsempi = ["warfarin", "digossina", "litio", "anticoagulanti", "SSRI", "diuretici"];

  /* cerca un farmaco o una parola della frase — non il nome della pianta, che
     ha già la sua scheda; prima la cautela alta, poi il nome della pianta */
  NP.cercaInterazioni = function (q) {
    const testo = norm(q);
    if (!testo) return [];
    /* il nome di una voce dell'elenco apre esattamente le sue schede, anche
       quando la voce unisce più nomi (anticoagulanti e antiaggreganti) */
    const voce = VOCI.filter(function (v) {
      return v.chiave === testo || norm(v.etichetta) === testo;
    })[0];
    if (voce) return NP.filtraInterazioni(voce.chiave);
    const t = testo.split(" ").filter(Boolean);
    const parola = t.map(inizioParola);
    return indice.filter(function (r) {
      const hay = norm(r.frase);
      return parola.every(function (re) { return re.test(hay); });
    }).sort(ordina);
  };

  if (typeof document === "undefined") return;

  const esc = NP.app.esc;

  function disegna() {
    const campo = document.getElementById("farmacoInput");
    const esiti = document.getElementById("farmacoEsiti");
    const aiuto = document.getElementById("farmacoAiuto");
    if (!campo || !esiti || !aiuto) return;

    const q = campo.value.trim();
    if (!q) {
      esiti.innerHTML = "";
      aiuto.textContent = "L'indice raccoglie " + indice.length + " frasi di interazione da " + (NP.plants || []).length + " schede. Scrivi un farmaco: warfarin, digossina, litio.";
      return;
    }

    const trovate = NP.cercaInterazioni(q);
    if (!trovate.length) {
      esiti.innerHTML = '<p class="farmaco-vuoto">Nessuna scheda nomina «' + esc(q) + '». Prova con il principio attivo o con la famiglia: warfarin, digossina, litio, anticoagulanti, SSRI.</p>';
      aiuto.textContent = "Nessun risultato per «" + q + "».";
      return;
    }

    const piante = new Set(trovate.map(function (r) { return r.id; })).size;
    aiuto.textContent = trovate.length + (trovate.length === 1 ? " frase" : " frasi") + " in " + piante + (piante === 1 ? " scheda" : " schede") + " per «" + q + "».";

    esiti.innerHTML = trovate.map(function (r) {
      return '<article class="farmaco-riga">' +
        '<p class="farmaco-testa"><a href="' + esc(r.via) + '">' + esc(r.pianta) + "</a>" +
        '<span class="badge-dot safety-' + esc(r.livello) + '">' + esc(r.cautela) + "</span></p>" +
        '<p class="farmaco-frase">«' + esc(r.frase) + "»</p>" +
        "</article>";
    }).join("");
  }

  document.addEventListener("input", function (e) {
    if (e.target && e.target.id === "farmacoInput") disegna();
  });

  document.addEventListener("click", function (e) {
    const b = e.target.closest ? e.target.closest("[data-farmaco]") : null;
    if (!b) return;
    const campo = document.getElementById("farmacoInput");
    if (!campo) return;
    campo.value = b.getAttribute("data-farmaco");
    campo.focus();
    disegna();
  });
})();
