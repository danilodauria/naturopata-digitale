/* ==========================================================================
   Naturopata Digitale · voce e dettatura
   Licenza del codice: MIT · Danilo D'Auria
   --------------------------------------------------------------------------
   Un solo punto per far parlare Neura e per dettare una domanda. Usa le voci
   del dispositivo e, se il programma installato le offre, le voci naturali
   facoltative: in nessun caso il testo esce dal computer.
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
  const NATURALE = "__naturale__:";

  // Velocità di lettura: 1 è il passo normale, come per le voci del sistema.
  const RITMO_MIN = 0.7;
  const RITMO_MAX = 1.4;

  let parlando = false;
  let ascoltando = false;
  let recog = null;
  let audioNaturale = null;
  let confrontoInCorso = 0;

  // Le voci naturali che il programma installato conosce: ognuna con il suo
  // stato, perché il motore resta uno e i modelli si scaricano a sé.
  let naturale = { disponibile: false, installata: false, voci: [], peso: 0, spazio: 0, motivo: "" };

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

  function annunciaVoci() {
    try { document.dispatchEvent(new CustomEvent("np:voci")); } catch (e) { /* niente */ }
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

  // Il testo viene spezzato in frasi: la sintesi respira invece di correre, e
  // la voce naturale comincia a parlare senza aspettare tutto il resto.
  function frasi(testo) {
    const pezzi = String(testo || "").match(/[^.!?;:]+[.!?;:]*/g) || [];
    const out = [];
    let corrente = "";
    pezzi.forEach(function (p) {
      const t = p.trim();
      if (!t) return;
      if (corrente && (corrente + " " + t).length > 190) { out.push(corrente); corrente = t; }
      else corrente = corrente ? corrente + " " + t : t;
    });
    if (corrente) out.push(corrente);
    return out.slice(0, 8);
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
    if (salvata.indexOf(NATURALE) === 0) {
      return naturaleScelta() ? salvata : "";
    }
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
    if (salvata && salvata.indexOf(NATURALE) !== 0) {
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

  /* Voce naturale (solo nel programma installato) -------------------------- */

  function ponte() {
    const d = window.npDesktop;
    return d && d.voceNaturale ? d.voceNaturale : null;
  }

  function naturaleDisponibile() {
    return !!ponte();
  }

  function naturaleAggiorna() {
    const p = ponte();
    if (!p || typeof p.stato !== "function") {
      naturale = { disponibile: false, installata: false, voci: [], peso: 0, spazio: 0, motivo: "" };
      return Promise.resolve(naturale);
    }
    return Promise.resolve(p.stato()).then(function (s) {
      if (s && s.ok) {
        naturale = {
          disponibile: s.disponibile !== false,
          installata: !!s.installata,
          voci: Array.isArray(s.voci) ? s.voci : [],
          peso: s.peso || 0,
          spazio: s.spazio || 0,
          motivo: s.motivo || ""
        };
      } else {
        naturale = { disponibile: true, installata: false, voci: [], peso: 0, spazio: 0, motivo: "" };
      }
      annunciaVoci();
      return naturale;
    }).catch(function () {
      naturale = { disponibile: true, installata: false, voci: [], peso: 0, spazio: 0, motivo: "" };
      annunciaVoci();
      return naturale;
    });
  }

  function naturaleVoci() {
    return naturale.voci || [];
  }

  function naturalePronte() {
    return naturaleVoci().filter(function (v) { return v.installata; });
  }

  // Il peso misurato dal programma sui file presenti, non la stima del
  // catalogo: è quello che si libera davvero togliendo la voce.
  function pesoVoce(v) {
    if (!v) return 0;
    return v.mbReale || v.mb || 0;
  }

  // La voce naturale in uso: quella scelta se è installata, altrimenti la
  // prima disponibile. Restituisce l'identificativo, o null se non ce n'è.
  function naturaleScelta() {
    if (!ponte()) return null;
    const pronte = naturalePronte();
    if (!pronte.length) return null;
    const salvata = leggi(CHIAVE_VOCE) || "";
    if (salvata.indexOf(NATURALE) === 0) {
      const id = salvata.slice(NATURALE.length);
      if (pronte.some(function (v) { return v.id === id; })) return id;
    }
    return pronte[0].id;
  }

  function impostaNaturale(id) {
    scrivi(CHIAVE_VOCE, id ? NATURALE + id : null);
    return naturaleScelta();
  }

  function scaricaNaturale(id) {
    const p = ponte();
    if (!p || typeof p.scarica !== "function") return Promise.resolve({ ok: false, errore: "solo nel programma installato" });
    return Promise.resolve(p.scarica(id)).then(function (s) {
      return naturaleAggiorna().then(function () { return s || naturale; });
    });
  }

  function rimuoviNaturaleVoce(id) {
    const p = ponte();
    if (!p || typeof p.rimuoviVoce !== "function") return Promise.resolve({ ok: false });
    return Promise.resolve(p.rimuoviVoce(id)).then(function (s) {
      const salvata = leggi(CHIAVE_VOCE) || "";
      if (salvata === NATURALE + id) scrivi(CHIAVE_VOCE, null);
      return naturaleAggiorna().then(function () { return s || naturale; });
    });
  }

  function rimuoviNaturaleTutto() {
    const p = ponte();
    if (!p || typeof p.rimuovi !== "function") return Promise.resolve({ ok: false });
    return Promise.resolve(p.rimuovi()).then(function (s) {
      const salvata = leggi(CHIAVE_VOCE) || "";
      if (salvata.indexOf(NATURALE) === 0) scrivi(CHIAVE_VOCE, null);
      return naturaleAggiorna().then(function () { return s || naturale; });
    });
  }

  function progressoNaturale(fn) {
    const p = ponte();
    if (!p || typeof p.onProgresso !== "function") return function () {};
    return p.onProgresso(fn);
  }

  function fermaAudioNaturale() {
    if (audioNaturale) {
      try { audioNaturale.pause(); } catch (e) { /* già fermo */ }
      audioNaturale = null;
    }
  }

  /* Parlare ---------------------------------------------------------------- */

  function parlaConSistema(frase) {
    if (!supportoVoce()) return false;
    try {
      window.speechSynthesis.cancel();
      const lista = frasi(frase);
      if (!lista.length) return false;
      const voce = voceScelta();
      parlando = true;
      lista.forEach(function (t, i) {
        const u = new window.SpeechSynthesisUtterance(t);
        u.lang = (voce && voce.lang) || "it-IT";
        u.rate = Math.min(2, 0.97 * ritmo());
        u.pitch = 1;
        if (voce) u.voice = voce;
        if (i === lista.length - 1) {
          u.onend = function () { parlando = false; annuncia(); };
          u.onerror = function () { parlando = false; annuncia(); };
        }
        window.speechSynthesis.speak(u);
      });
      annuncia();
      return true;
    } catch (e) {
      parlando = false;
      annuncia();
      return false;
    }
  }

  // L'audio arriva come WAV dal processo principale e si riproduce a pezzi,
  // così la lettura comincia subito anche su un testo lungo.
  function parlaNaturale(frase) {
    const p = ponte();
    const scelta = naturaleScelta();
    if (!p || typeof p.pronuncia !== "function" || !scelta) return false;
    const pezzi = frasi(frase);
    if (!pezzi.length) return false;

    ferma();
    parlando = true;
    let indice = 0;
    let audioPartito = false;

    const avanti = function () {
      if (!parlando || indice >= pezzi.length) {
        parlando = false;
        annuncia();
        return;
      }
      const pezzo = pezzi[indice++];
      Promise.resolve(p.pronuncia(pezzo, ritmo(), scelta)).then(function (r) {
        if (!parlando) return;
        if (!r || !r.ok || !r.wav) throw new Error((r && (r.errore || r.motivo)) || "voce naturale non disponibile");
        const byte = new Uint8Array(r.wav);
        const url = typeof URL !== "undefined" && URL.createObjectURL ? URL.createObjectURL(new window.Blob([byte], { type: "audio/wav" })) : "";
        const audio = new window.Audio(url);
        audioNaturale = audio;
        audio.onended = function () {
          if (url) { try { URL.revokeObjectURL(url); } catch (e) { /* niente */ } }
          audioNaturale = null;
          avanti();
        };
        audio.onerror = audio.onended;
        audioPartito = true;
        return audio.play();
      }).catch(function (err) {
        if (!parlando) return;
        parlando = false;
        fermaAudioNaturale();
        if (!audioPartito) {
          // Se la voce naturale non parte, la lettura continua con la voce del
          // sistema: non deve restare muta.
          try { if (window.console && window.console.warn) window.console.warn("Voce naturale: " + String((err && err.message) || err)); } catch (e) { /* niente */ }
          parlaConSistema(frase);
        } else {
          annuncia();
        }
      });
    };

    avanti();
    annuncia();
    return true;
  }

  function parla(testo) {
    const frase = pulisci(testo);
    if (!frase) return false;
    if (naturaleScelta()) return parlaNaturale(frase);
    return parlaConSistema(frase);
  }

  // La stessa frase detta da voci diverse, una dopo l'altra: la scelta si fa
  // sentendo, invece di fidarsi di una descrizione scritta.
  const FRASE_CONFRONTO = "Questa è la stessa frase, letta prima da una voce e poi dall'altra: ascolta la differenza.";

  function ascoltaConVoce(testo, id) {
    const p = ponte();
    if (!p || typeof p.pronuncia !== "function") return Promise.resolve(false);
    return Promise.resolve(p.pronuncia(testo, ritmo(), id)).then(function (r) {
      if (!r || !r.ok || !r.wav) return false;
      const byte = new Uint8Array(r.wav);
      const url = typeof URL !== "undefined" && URL.createObjectURL ? URL.createObjectURL(new window.Blob([byte], { type: "audio/wav" })) : "";
      return new Promise(function (fine) {
        const audio = new window.Audio(url);
        audioNaturale = audio;
        let chiuso = false;
        const chiudi = function (esito) {
          if (chiuso) return;
          chiuso = true;
          if (url) { try { URL.revokeObjectURL(url); } catch (e) { /* niente */ } }
          if (audioNaturale === audio) audioNaturale = null;
          fine(esito);
        };
        audio.onended = function () { chiudi(true); };
        audio.onerror = function () { chiudi(false); };
        try { Promise.resolve(audio.play()).catch(function () { chiudi(false); }); }
        catch (e) { chiudi(false); }
      });
    }).catch(function () { return false; });
  }

  // Un confronto alla volta: il contatore ferma quello vecchio quando se ne
  // avvia un altro o si preme Stop, senza lasciare due voci sovrapposte.
  function confrontaVoci(aggiorna) {
    const pronte = naturalePronte();
    if (pronte.length < 2) return false;
    const mio = ++confrontoInCorso;
    ferma();
    let indice = 0;
    const avanti = function () {
      if (mio !== confrontoInCorso) return;
      if (indice >= pronte.length) {
        if (typeof aggiorna === "function") aggiorna(null);
        return;
      }
      const voce = pronte[indice++];
      if (typeof aggiorna === "function") aggiorna(voce);
      ascoltaConVoce(FRASE_CONFRONTO, voce.id).then(function () {
        if (mio === confrontoInCorso) avanti();
      });
    };
    avanti();
    return true;
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

  /* Fermare ---------------------------------------------------------------- */

  function fermaVoce() {
    const era = parlando || !!audioNaturale;
    fermaAudioNaturale();
    confrontoInCorso += 1;
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
    if (!btn) return;
    if (btn.getAttribute("data-voce-collegato") !== "true") {
      btn.setAttribute("data-voce-collegato", "true");
      btn.addEventListener("click", function () {
        const acceso = impostaLettura(!letturaAttiva());
        if (!acceso) ferma();
        if (A.toast) A.toast(acceso ? "Lettura attiva: Neura leggerà le risposte." : "Lettura disattivata.");
      });
    }
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
    RITMO_MAX: RITMO_MAX,
    // Voce naturale facoltativa: solo nel programma installato.
    naturaleDisponibile: naturaleDisponibile,
    naturale: function () { return naturale; },
    naturaleVoci: naturaleVoci,
    naturalePronte: naturalePronte,
    naturaleScelta: naturaleScelta,
    impostaNaturale: impostaNaturale,
    aggiornaNaturale: naturaleAggiorna,
    scaricaNaturale: scaricaNaturale,
    rimuoviNaturaleVoce: rimuoviNaturaleVoce,
    rimuoviNaturaleTutto: rimuoviNaturaleTutto,
    confrontaNaturale: confrontaVoci,
    progressoNaturale: progressoNaturale,
    pesoNaturale: pesoVoce
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", collegaAltoparlante);
  } else {
    collegaAltoparlante();
  }

  // Le voci possono arrivare dopo l'avvio: chi mostra l'elenco si aggiorna.
  try {
    if (window.speechSynthesis && typeof window.speechSynthesis.addEventListener === "function") {
      window.speechSynthesis.addEventListener("voiceschanged", annunciaVoci);
    }
  } catch (e) { /* niente */ }

  // Nel programma installato lo stato delle voci naturali si legge all'avvio.
  if (naturaleDisponibile()) naturaleAggiorna();
})();
