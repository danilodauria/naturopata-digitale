/* ==========================================================================
   Naturopata Digitale · voce e dettatura
   Licenza del codice: MIT · Danilo D'Auria
   --------------------------------------------------------------------------
   Un solo punto per far parlare Neura e per dettare una domanda. Usa solo le
   voci e il riconoscimento vocale del dispositivo: non manda niente in rete e,
   quando il browser non li offre, si limita a non fare nulla.
   ========================================================================== */

(function () {
  "use strict";

  const A = NP && NP.app;
  if (!A) return;

  let parlando = false;
  let ascoltando = false;
  let recog = null;

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

  function voceItaliana() {
    try {
      const voci = window.speechSynthesis.getVoices() || [];
      return voci.filter(function (v) { return /^it/i.test(v.lang); })[0] || null;
    } catch (e) { return null; }
  }

  function parla(testo) {
    const frase = pulisci(testo);
    if (!frase || !supportoVoce()) return false;
    try {
      window.speechSynthesis.cancel();
      const u = new window.SpeechSynthesisUtterance(frase);
      u.lang = "it-IT";
      u.rate = 0.97;
      u.pitch = 1.02;
      const voce = voceItaliana();
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

  NP.voce = {
    parla: parla,
    ferma: ferma,
    fermaVoce: fermaVoce,
    fermaAscolto: fermaAscolto,
    ascolta: ascolta,
    staParlan: function () { return parlando; },
    staAscoltando: function () { return ascoltando; },
    supporto: function () { return { voce: supportoVoce(), dettatura: supportoDettatura() }; },
    pulisci: pulisci
  };
})();
