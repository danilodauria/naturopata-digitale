/* ==========================================================================
   Naturopata Digitale · voce e dettatura
   Licenza del codice: MIT · Danilo D'Auria
   --------------------------------------------------------------------------
   Un solo punto per far parlare Neura e per dettare una domanda. Usa solo le
   voci e il riconoscimento vocale del dispositivo: non manda niente in rete e,
   quando il browser non li offre, si limita a non fare nulla.
   La voce scelta, la velocità di lettura e l'interruttore dell'altoparlante
   restano memorizzati sul dispositivo.
   ========================================================================== */

(function () {
  "use strict";

  const A = NP && NP.app;
  if (!A) return;

  const PREFIX = A.PREFIX || "naturopata-digitale:v1:";
  const CHIAVE_VOCE = PREFIX + "voce";
  const CHIAVE_RITMO = PREFIX + "voce-ritmo";
  const CHIAVE_LETTURA = PREFIX + "voce-lettura";

  // Velocità di lettura: 1 è il passo normale, come per le voci del sistema.
  const RITMO_MIN = 0.7;
  const RITMO_MAX = 1.4;

  let parlando = false;
  let ascoltando = false;
  let recog = null;

  function leggi(chiave) {
    try { return localStorage.getItem(chiave); } catch (e) { return null; }
  }

  function scrivi(chiave, valore) {
    try {
      if (valore == null || valore === "") localStorage.removeItem(chiave);
      else localStorage.setItem(chiave, valore);
    } catch (e) { /* storage negato */ }
  }

  function annuncia() {
    try { document.dispatchEvent(new CustomEvent("np:voce")); } catch (e) { /* niente */ }
  }

  function supportoVoce() {
    return !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  }

  function supportoDettatura() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  // Il testo arriva come HTML dalle schede: qui diventa una frase leggibile.
  function pulisci(html) {
    return String(html == null ? "" : html)
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(p|li|div|h[1-6]|blockquote)>/gi, ". ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .replace(/\s+([.,;:!?])/g, "$1")
      .trim();
  }

  /* Voci del dispositivo --------------------------------------------------- */

  function tutteLeVoci() {
    let voci = [];
    try { voci = (window.speechSynthesis && window.speechSynthesis.getVoices()) || []; } catch (e) { voci = []; }
    return {
      italiane: voci.filter(function (v) { return /^it/i.test(v.lang || ""); }),
      altre: voci.filter(function (v) { return !/^it/i.test(v.lang || ""); })
    };
  }

  // Una voce italiana vale più di qualunque altra; fra le italiane si tengono
  // davanti quelle «Natural» o «Premium», che il sistema dichiara migliori.
  function punteggio(v) {
    let p = 0;
    if (/^it/i.test(v.lang || "")) p += 100;
    if (/^it-IT$/i.test(v.lang || "")) p += 5;
    if (/natural|premium|enhanced|neural/i.test(v.name || "")) p += 30;
    if (v.localService) p += 10;
    return p;
  }

  function nomeVoce() {
    const salvata = leggi(CHIAVE_VOCE);
    if (!salvata) return "";
    const tutte = tutteLeVoci();
    const trova = tutte.italiane.concat(tutte.altre).filter(function (v) {
      return String(v.name || "").toLowerCase() === String(salvata).toLowerCase();
    })[0];
    return trova ? trova.name : "";
  }

  function voceScelta() {
    const gruppi = tutteLeVoci();
    const tutte = gruppi.italiane.concat(gruppi.altre);
    const salvata = nomeVoce();
    if (salvata) {
      const trovata = tutte.filter(function (v) { return v.name === salvata; })[0];
      if (trovata) return trovata;
    }
    const lista = gruppi.italiane.length ? gruppi.italiane : gruppi.altre;
    if (!lista.length) return null;
    return lista.slice().sort(function (a, b) { return punteggio(b) - punteggio(a); })[0];
  }

  function impostaVoce(nome) {
    scrivi(CHIAVE_VOCE, nome ? String(nome) : null);
    return voceScelta();
  }

  function ritmo() {
    const v = parseFloat(leggi(CHIAVE_RITMO));
    if (!isFinite(v) || v <= 0) return 1;
    return Math.min(RITMO_MAX, Math.max(RITMO_MIN, v));
  }

  function impostaRitmo(v) {
    const pulito = Math.min(RITMO_MAX, Math.max(RITMO_MIN, Number(v) || 1));
    scrivi(CHIAVE_RITMO, String(Math.round(pulito * 100) / 100));
    return pulito;
  }

  /* Lettura delle risposte ------------------------------------------------ */

  function letturaAttiva() {
    return leggi(CHIAVE_LETTURA) === "on";
  }

  function impostaLettura(attiva) {
    scrivi(CHIAVE_LETTURA, attiva ? "on" : null);
    aggiornaAltopsarlante();
    return letturaAttiva();
  }

  function aggiornaAltopsarlante() {
    const btn = document.getElementById("voiceBtn");
    if (!btn) return;
    const on = letturaAttiva();
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    const testo = on
      ? "Lettura attiva: Neura legge le risposte. Tocca per fermarla"
      : "Leggi ad alta voce le risposte di Neura";
    btn.setAttribute("title", testo);
    btn.setAttribute("aria-label", testo);
  }

  /* Parlare ---------------------------------------------------------------- */

  function parla(testo) {
    const frase = pulisci(testo);
    if (!frase || !supportoVoce()) return false;
    try {
      window.speechSynthesis.cancel();
      const u = new window.SpeechSynthesisUtterance(frase);
      const voce = voceScelta();
      u.lang = (voce && voce.lang) || "it-IT";
      u.rate = Math.min(2, 0.97 * ritmo());
      u.pitch = 1;
      if (voce) u.voice = voce;
      u.onstart = function () { parlando = true; annuncia(); };
      u.onend = function () { parlando = false; annuncia(); };
      u.onerror = function () { parlando = false; annuncia(); };
      parlando = true;
      annuncia();
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      parlando = false;
      annuncia();
      return false;
    }
  }

  function fermaVoce() {
    const era = parlando;
    if (supportoVoce()) {
      try { window.speechSynthesis.cancel(); } catch (e) { /* niente */ }
    }
    parlando = false;
    annuncia();
    return era;
  }

  function fermaAscolto() {
    const era = ascoltando || !!recog;
    if (recog) {
      try { recog.abort(); } catch (e) { /* niente */ }
    }
    recog = null;
    ascoltando = false;
    annuncia();
    return era;
  }

  function ferma() {
    const a = fermaVoce();
    const b = fermaAscolto();
    return a || b;
  }

  function ascolta(onTesto, onErrore) {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) {
      if (onErrore) onErrore("non-supportato");
      return false;
    }
    fermaAscolto();
    try {
      const r = new Ctor();
      r.lang = "it-IT";
      r.interimResults = false;
      r.maxAlternatives = 1;
      r.continuous = false;
      r.onresult = function (e) {
        let testo = "";
        for (let i = e.resultIndex; i < e.results.length; i++) testo += e.results[i][0].transcript;
        ascoltando = false;
        recog = null;
        annuncia();
        if (onTesto) onTesto(String(testo || "").trim());
      };
      r.onerror = function (e) {
        ascoltando = false;
        recog = null;
        annuncia();
        if (onErrore) onErrore((e && e.error) || "errore");
      };
      r.onend = function () {
        ascoltando = false;
        recog = null;
        annuncia();
      };
      recog = r;
      ascoltando = true;
      annuncia();
      r.start();
      return true;
    } catch (e) {
      recog = null;
      ascoltando = false;
      annuncia();
      if (onErrore) onErrore((e && e.message) || "errore");
      return false;
    }
  }

  /* Altoparlante in intestazione ------------------------------------------ */

  function collegaAltoparlante() {
    const btn = document.getElementById("voiceBtn");
    if (!btn || btn.getAttribute("data-voce-collegato") === "true") { aggiornaAltopsarlante(); return; }
    btn.setAttribute("data-voce-collegato", "true");
    btn.addEventListener("click", function () {
      const acceso = impostaLettura(!letturaAttiva());
      if (!acceso) ferma();
      if (A.toast) A.toast(acceso ? "Lettura attiva: Neura leggerà le risposte." : "Lettura disattivata.");
    });
    aggiornaAltopsarlante();
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && staParlan()) fermaVoce();
  });

  function staParlan() { return parlando; }
  function staAscoltando() { return ascoltando; }

  NP.voce = {
    parla: parla,
    ferma: ferma,
    fermaVoce: fermaVoce,
    fermaAscolto: fermaAscolto,
    ascolta: ascolta,
    staParlan: staParlan,
    staAscoltando: staAscoltando,
    supporto: function () { return { voce: supportoVoce(), dettatura: supportoDettatura() }; },
    pulisci: pulisci,
    voci: tutteLeVoci,
    voceScelta: voceScelta,
    nomeVoce: nomeVoce,
    impostaVoce: impostaVoce,
    ritmo: ritmo,
    impostaRitmo: impostaRitmo,
    letturaAttiva: letturaAttiva,
    impostaLettura: impostaLettura,
    aggiornaAltoparlante: aggiornaAltopsarlante,
    RITMO_MIN: RITMO_MIN,
    RITMO_MAX: RITMO_MAX
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", collegaAltoparlante);
  } else {
    collegaAltoparlante();
  }

  // Le voci possono arrivare dopo l'avvio: chi mostra l'elenco si aggiorna.
  try {
    if (window.speechSynthesis && typeof window.speechSynthesis.addEventListener === "function") {
      window.speechSynthesis.addEventListener("voiceschanged", function () {
        try { document.dispatchEvent(new CustomEvent("np:voci")); } catch (e) { /* niente */ }
      });
    }
  } catch (e) { /* niente */ }
})();
