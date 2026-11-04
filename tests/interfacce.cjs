#!/usr/bin/env node
/* ==========================================================================
   Naturopata Digitale · collegamenti e pulsanti che funzionano
   Licenza del codice: MIT · Danilo D'Auria

   Apre l'app nel DOM simulato, percorre ogni vista, segue ogni collegamento
   e preme ogni pulsante. Un link verso un file che non c'è, un'ancora sparita
   o una rotta inesistente fermano la pubblicazione qui, prima che il guasto
   arrivi a chi usa il programma.

   Uso: node tests/interfacce.cjs
   ========================================================================== */
"use strict";

const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const root = path.join(__dirname, "..");
const problemi = [];
let linkControllati = 0;
let clic = 0;
let percorsiAperti = 0;
let pagineStatiche = 0;

function leggi(rel) { return fs.readFileSync(path.join(root, rel), "utf8"); }
function segnala(msg) { problemi.push(msg); }
function attesa(ms) { return new Promise((r) => setTimeout(r, ms)); }

// Le pagine che vivono fuori dall'app a pagina singola.
const PAGINE = ["come-installare.html", "scheda-rapida.html", "versioni.html", "scarica/index.html"];

// L'elenco delle rotte si legge dal router: se domani se ne aggiunge una, il
// controllo la segue da solo invece di lasciarla fuori.
function nomiDelleRotte() {
  const sorgente = leggi(path.join("assets", "js", "app.js"));
  const blocco = sorgente.match(/const ROUTES = \{([\s\S]*?)\r?\n  \};/);
  if (!blocco) return [];
  return [...blocco[1].matchAll(/^\s+([a-z0-9]+):/gm)].map((m) => m[1]);
}

// Gli script si incorporano nella pagina come fa tests/dom-test.cjs: jsdom non
// scarica file, e a noi serve il comportamento vero dell'app.
function paginaConScript() {
  let html = leggi("index.html");
  const script = [];
  html = html.replace(/<script\s+src="([^"]+)"\s*><\/script>/g, (m, src) => {
    script.push(leggi(src));
    return "";
  });
  return html.replace("</body>", "<script>\n" + script.join("\n;\n") + "\n</script></body>");
}

(async function main() {
  const nomi = nomiDelleRotte();
  if (!nomi.length) {
    console.error("✗ Non riesco a leggere le rotte da assets/js/app.js");
    process.exit(1);
  }

  const eccezioni = [];
  const vc = new VirtualConsole();
  vc.on("jsdomError", (e) => {
    if (/Not implemented/.test(e.message)) return;
    eccezioni.push("errore nella pagina: " + e.message.split("\n")[0]);
  });

  const dom = new JSDOM(paginaConScript(), {
    url: "http://localhost/index.html",
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(win) {
      win.scrollTo = () => {};
      win.print = () => {};
      win.confirm = () => true;
      win.alert = () => {};
      win.open = () => null;
      // jsdom non disegna: queste API servono al programma, qui non hanno
      // lavoro da fare, ma senza di loro i pulsanti sembrerebbero rotti.
      win.HTMLElement.prototype.scrollIntoView = function () {};
      win.URL.createObjectURL = () => "blob:controllo";
      win.URL.revokeObjectURL = () => {};
      win.matchMedia = () => ({
        matches: false,
        addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}
      });
      win.addEventListener("error", (e) => eccezioni.push("eccezione: " + (e.message || "")));
    }
  });

  const win = dom.window;
  const doc = win.document;
  await attesa(250);

  const NP = win.NP || {};
  // Le rotte con un parametro si controllano contro i dati veri: così un
  // collegamento a una pianta cancellata non passa inosservato.
  const dati = {
    pianta: new Set((NP.plants || []).map((p) => p.id)),
    capitolo: new Set((NP.manual || []).map((c) => c.id)),
    benessere: new Set((NP.conditions || []).map((c) => c.id))
  };

  function validaRotta(href, da) {
    const parti = href.slice(2).split("?")[0].split("/").filter(Boolean);
    const nome = parti[0] || "home";
    if (nomi.indexOf(nome) === -1) { segnala("rotta inesistente " + href + " (da " + da + ")"); return; }
    if (dati[nome] && parti[1] !== undefined && !dati[nome].has(parti[1])) {
      segnala("rotta " + href + ": elemento inesistente (da " + da + ")");
    }
  }

  const visti = new Map();
  const percorsi = [""].concat(nomi.filter((n) => n !== "home" && !dati[n]));
  Object.keys(dati).forEach((tipo) => {
    const primo = [...dati[tipo]][0];
    if (primo) percorsi.push(tipo + "/" + primo);
  });

  for (const r of percorsi) {
    percorsiAperti++;
    win.location.hash = "#/" + r;
    await attesa(140);
    const app = doc.getElementById("app");
    const testo = (app.textContent || "").trim();
    if (testo.length < 120) segnala("percorso #/" + r + ": vista vuota (" + testo.length + " caratteri)");
    if (r && /Pagina non trovata/.test(testo)) segnala("percorso #/" + r + ": pagina non trovata");
    doc.querySelectorAll("a[href]").forEach((a) => {
      const h = a.getAttribute("href");
      if (h && !visti.has(h)) visti.set(h, r || "home");
    });
    for (const b of [...app.querySelectorAll("button")].slice(0, 14)) {
      clic++;
      try {
        b.click();
      } catch (e) {
        segnala("pulsante «" + (b.textContent || "").trim().slice(0, 26) + "» su #/" + r + ": " + e.message);
      }
      await attesa(25);
    }
    win.location.hash = "#/" + r;
    await attesa(60);
  }

  for (const [h, da] of visti) {
    linkControllati++;
    if (/^(https?:|mailto:|tel:|data:|javascript:)/i.test(h)) continue;
    if (h === "" || h === "#") { segnala("collegamento vuoto «" + h + "» da #/" + da); continue; }
    if (h.startsWith("#/")) { validaRotta(h, "#/" + da); continue; }
    if (h.startsWith("#")) {
      if (!doc.getElementById(h.slice(1))) segnala("ancora " + h + " inesistente (da #/" + da + ")");
      continue;
    }
    const file = h.split("#")[0].split("?")[0];
    if (!fs.existsSync(path.join(root, file))) segnala("file mancante " + h + " (da #/" + da + ")");
  }

  for (const pg of PAGINE) {
    pagineStatiche++;
    const html = leggi(pg);
    const qui = path.dirname(path.join(root, pg));
    for (const m of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
      const h = m[2];
      linkControllati++;
      if (/^(https?:|mailto:|tel:|data:|javascript:)/i.test(h)) continue;
      if (h.startsWith("#/")) { validaRotta(h, pg); continue; }
      if (h.startsWith("#")) {
        if (html.indexOf('id="' + h.slice(1) + '"') === -1) segnala("ancora " + h + " inesistente in " + pg);
        continue;
      }
      const [file, ancora] = h.split("#");
      if (!fs.existsSync(path.resolve(qui, file))) { segnala("file mancante " + h + " in " + pg); continue; }
      if (ancora && ancora.startsWith("/")) { validaRotta("#" + ancora, pg); continue; }
      if (ancora && /\.html$/.test(file)) {
        const dentro = fs.readFileSync(path.resolve(qui, file), "utf8");
        if (dentro.indexOf('id="' + ancora + '"') === -1) segnala("ancora #" + ancora + " inesistente in " + file + " (da " + pg + ")");
      }
    }
  }

  eccezioni.forEach((e) => segnala(e));
  win.close();

  if (problemi.length) {
    problemi.slice(0, 30).forEach((p) => console.error("✗ " + p));
    if (problemi.length > 30) console.error("… e altri " + (problemi.length - 30));
    console.error(problemi.length + " problemi su " + linkControllati + " link e " + clic + " pulsanti.");
    process.exit(1);
  }

  console.log(percorsiAperti + " percorsi, " + pagineStatiche + " pagine, " + linkControllati + " link, " + clic + " pulsanti premuti, 0 problemi.");
})();
