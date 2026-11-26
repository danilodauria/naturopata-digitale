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

  /* la parola deve cominciare una parola intera, come nella ricerca rapida */
  function inizioParola(x) {
    return new RegExp("(^|[^a-z0-9])" + x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  }

  /* una riga per ogni frase di interazione di ogni scheda: la stessa pianta
     compare più volte se nomina più farmaci o famiglie */
  const indice = [];
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
    });
  });

  NP.interazioniIndice = indice;

  /* le parole proposte sotto il campo: farmaci e famiglie che ricorrono */
  NP.interazioniEsempi = ["warfarin", "digossina", "litio", "anticoagulanti", "SSRI", "diuretici"];

  /* cerca un farmaco o una parola della frase — non il nome della pianta, che
     ha già la sua scheda; prima la cautela alta, poi il nome della pianta */
  NP.cercaInterazioni = function (q) {
    const t = norm(q).split(" ").filter(Boolean);
    if (!t.length) return [];
    const parola = t.map(inizioParola);
    return indice.filter(function (r) {
      const hay = norm(r.frase);
      return parola.every(function (re) { return re.test(hay); });
    }).sort(function (a, b) {
      return b.peso - a.peso || a.pianta.localeCompare(b.pianta, "it") || a.frase.localeCompare(b.frase, "it");
    });
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
