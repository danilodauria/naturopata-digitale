#!/usr/bin/env node
/* ==========================================================================
   Naturopata Digitale · la ricerca rapida, provata nel DOM simulato
   Licenza del codice: MIT · Danilo D'Auria

   Controlla che la finestra si apra e si chiuda (pulsante, Ctrl K, Esc, sfondo,
   Tab), che i conteggi corrispondano ai dati, che nessun risultato si ripeta e
   che l'ordine metta davanti chi ha il nome giusto. Una parola cercata deve
   cominciare una parola intera: «menta» trova la menta, non «alimentare».

   Uso: node tests/cerca-test.cjs
   ========================================================================== */
"use strict";

const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const root = path.join(__dirname, "..");
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const scripts = [];
html = html.replace(/<script\s+src="([^"]+)"\s*><\/script>/g, (m, src) => {
  scripts.push(fs.readFileSync(path.join(root, src), "utf8"));
  return "";
});
html = html.replace("</body>", "<script>\n" + scripts.join("\n;\n") + "\n</script></body>");

const errors = [];
const vc = new VirtualConsole();
vc.on("jsdomError", (e) => {
  if (/Not implemented/.test(e.message)) return;
  errors.push(e.message);
});
vc.on("error", (m) => errors.push(String(m)));

const dom = new JSDOM(html, {
  url: "http://localhost/",
  runScripts: "dangerously",
  pretendToBeVisual: true,
  virtualConsole: vc,
  beforeParse(window) {
    window.scrollTo = () => {};
    window.print = () => {};
    window.confirm = () => true;
    window.alert = () => {};
    window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  }
});

const win = dom.window;
const doc = win.document;
let failures = 0;
let total = 0;

function ok(cond, msg) {
  total++;
  if (!cond) { failures++; console.error("✗ " + msg); }
}
function tick(ms) { return new Promise((r) => setTimeout(r, ms || 30)); }
function el(id) { return doc.getElementById(id); }
function modal() { return el("cercaModal"); }
function aperta() { return !modal().hidden; }
function campo() { return el("cercaInput"); }
function righe() { return Array.prototype.slice.call(doc.querySelectorAll(".cerca-voce")); }
function nomi() { return righe().map((b) => b.querySelector(".cerca-nome").textContent); }
function percorsi() { return righe().map((b) => b.querySelector(".cerca-percorso").textContent); }
function gruppi() { return Array.prototype.slice.call(doc.querySelectorAll(".cerca-gruppo")).map((p) => p.textContent); }
function chiave(b) { return b.querySelector(".cerca-nome").textContent + "|" + b.querySelector(".cerca-percorso").textContent; }
function cerca(q) {
  campo().value = q;
  campo().dispatchEvent(new win.Event("input", { bubbles: true }));
}
function tasto(target, key, extra) {
  const opts = Object.assign({ key: key, bubbles: true }, extra || {});
  target.dispatchEvent(new win.KeyboardEvent("keydown", opts));
}
function clicca(target) { target.dispatchEvent(new win.MouseEvent("click", { bubbles: true })); }

(async () => {
  await tick(150);

  // --- Chiusa all'inizio, e chiusa resta finché non la si chiama -----------
  ok(modal().hidden, "ricerca: la finestra parte chiusa");
  ok(el("cercaInput").getAttribute("aria-expanded") === "false", "ricerca: il campo si dichiara chiuso");
  ok(el("cercaEsiti").getAttribute("role") === "listbox", "ricerca: gli esiti sono una lista");

  // --- Apertura dal pulsante in testata ------------------------------------
  const pulsante = el("cercaBtn");
  pulsante.focus();
  pulsante.click();
  await tick(30);
  ok(aperta(), "apertura: il pulsante «Cerca» apre la finestra");
  ok(doc.activeElement === campo(), "apertura: il cursore va nel campo");
  ok(doc.body.classList.contains("no-scroll"), "apertura: la pagina sotto non scorre");
  ok(campo().value === "", "apertura: il campo riparte vuoto");
  ok(campo().getAttribute("aria-expanded") === "true", "apertura: il campo si dichiara aperto con gli esiti");

  // Senza testo si vedono le pagine, una per destinazione: il menu più le
  // pagine che nel menu non ci sono.
  const destinazioni = new Set(Array.prototype.slice.call(doc.querySelectorAll("#mainNav a")).map((a) => a.getAttribute("href")));
  ["#/", "come-installare.html", "scheda-rapida.html", "versioni.html", "scarica/index.html", "assets/pdf/vademecum-naturopata-digitale.pdf"].forEach((h) => destinazioni.add(h));
  ok(righe().length === destinazioni.size, "conteggi: le pagine sono " + destinazioni.size + " (" + righe().length + ")");
  ok(new Set(nomi()).size === righe().length, "niente doppioni: le pagine non si ripetono");
  ok(gruppi().length === 1 && /^Pagine · /.test(gruppi()[0]), "conteggi: a campo vuoto si vedono solo le pagine");

  // I numeri della nota vengono dai dati, non da un testo scritto a mano.
  const aiuto = el("cercaAiuto").textContent;
  [
    [win.NP.plants.length + " piante", "piante"],
    [win.NP.manual.length + " capitoli", "capitoli"],
    [win.NP.conditions.length + " schede", "schede di benessere"],
    [win.NP.glossary.length + " voci", "voci di glossario"]
  ].forEach((c) => ok(aiuto.indexOf(c[0]) !== -1, "conteggi: la nota dice " + c[1] + " (" + c[0] + ")"));

  // --- Esc chiude e riporta il fuoco al pulsante ---------------------------
  tasto(doc, "Escape");
  await tick(20);
  ok(!aperta(), "chiusura: Esc chiude la finestra");
  ok(!doc.body.classList.contains("no-scroll"), "chiusura: la pagina torna a scorrere");
  ok(doc.activeElement === pulsante, "chiusura: Esc riporta il fuoco al pulsante «Cerca»");

  // --- Ctrl K apre da qualsiasi pagina; premuto di nuovo non chiude --------
  tasto(doc, "k", { ctrlKey: true });
  await tick(20);
  ok(aperta(), "apertura: Ctrl K apre la ricerca");
  ok(doc.activeElement === campo(), "apertura: Ctrl K porta il cursore nel campo");
  tasto(doc, "k", { ctrlKey: true });
  await tick(20);
  ok(aperta(), "apertura: Ctrl K con la ricerca già aperta non la chiude");

  // --- Il Tab resta fra campo e pulsante di chiusura -----------------------
  campo().focus();
  tasto(campo(), "Tab");
  ok(doc.activeElement === el("cercaChiudi"), "tastiera: Tab dal campo va alla chiusura");
  tasto(el("cercaChiudi"), "Tab");
  ok(doc.activeElement === campo(), "tastiera: Tab dalla chiusura torna al campo");
  campo().focus();
  tasto(campo(), "Tab", { shiftKey: true });
  ok(doc.activeElement === el("cercaChiudi"), "tastiera: Shift+Tab dal campo va alla chiusura");

  // --- Il clic sullo sfondo chiude, quello dentro la finestra no ----------
  el("cercaEsiti").click();
  await tick(20);
  ok(aperta(), "chiusura: un clic dentro la finestra non la chiude");
  clicca(modal());
  await tick(20);
  ok(!aperta(), "chiusura: un clic sullo sfondo chiude la finestra");

  // --- La crocetta chiude -------------------------------------------------
  el("cercaBtn").click();
  await tick(20);
  el("cercaChiudi").click();
  await tick(20);
  ok(!aperta(), "chiusura: la crocetta chiude la finestra");

  // --- Apertura dal menu del telefono --------------------------------------
  el("cercaNav").click();
  await tick(20);
  ok(aperta(), "apertura: la voce «Cerca» del menu apre la finestra");

  // --- Conteggi e ordine delle ricerche vere ------------------------------
  cerca("malva");
  ok(nomi().length === 4, "conteggi: «malva» dà 4 risultati (" + nomi().join(", ") + ")");
  ok(nomi()[0] === "Malva selvatica", "precedenza: «malva» mette davanti la Malva selvatica");
  ok(nomi().indexOf("Altea") !== -1 && nomi().indexOf("Altea") < nomi().indexOf("Mucillagine"), "precedenza: chi ha la parola nel nome viene prima di chi la cita");
  ok(gruppi().join("|") === "Piante · 3|Glossario · 1", "conteggi: «malva» ripartisce 3 piante e 1 voce (" + gruppi().join(" / ") + ")");

  cerca("sambuco");
  ok(nomi().length === 1 && nomi()[0] === "Sambuco", "conteggi: «sambuco» trova una sola pianta");

  cerca("camomilla");
  ok(nomi()[0] === "Camomilla comune", "precedenza: «camomilla» mette davanti la camomilla");

  cerca("altea");
  ok(nomi()[0] === "Altea", "precedenza: il nome esatto batte il riferimento nel glossario");

  cerca("salvia");
  ok(nomi()[0] === "Salvia officinale", "precedenza: «salvia» mette davanti la salvia officinale");

  // La parola cercata deve cominciare una parola intera: prima «menta»
  // pescava anche «alimentare», «fermentazione» e simili, fino a 40 risultati.
  cerca("menta");
  ok(nomi().length === 2, "precisione: «menta» dà 2 risultati, non le parole che la contengono (" + nomi().join(", ") + ")");
  ok(nomi()[0] === "Menta piperita", "precedenza: «menta» mette davanti la menta piperita");
  ["Rooibos", "Timo", "Aglio"].forEach((n) => ok(nomi().indexOf(n) === -1, "precisione: «menta» non tira dentro " + n));

  // Chi scrive solo l'inizio di una parola la trova lo stesso.
  cerca("alim");
  ok(nomi().indexOf("Rooibos") !== -1, "precisione: «alim» trova ancora «alimentare»");

  cerca("capitolo");
  ok(nomi().length === win.NP.manual.length, "conteggi: «capitolo» trova i " + win.NP.manual.length + " capitoli (" + nomi().length + ")");
  ok(gruppi().length === 1 && /^Manuale · /.test(gruppi()[0]), "conteggi: «capitolo» resta nel manuale");

  cerca("sonno");
  ok(nomi().length === 12, "conteggi: «sonno» dà 12 risultati (" + nomi().length + ")");
  ok(gruppi().join("|") === "Pagine · 1|Piante · 6|Interazioni · 1|Manuale · 1|Benessere · 2|Glossario · 1", "ordine: i gruppi seguono Pagine, Piante, Interazioni, Manuale, Benessere, Glossario (" + gruppi().join(" / ") + ")");
  ok(/sonnolenza/.test(doc.querySelector(".cerca-frase").textContent), "interazioni: «sonno» trova anche la frase sulla sonnolenza dell'escolzia");
  ok(gruppi().reduce((n, g) => n + Number(g.split(" · ")[1]), 0) === nomi().length, "conteggi: le testate dei gruppi sommano ai risultati");

  // --- Indice inverso: dal farmaco alla pianta ----------------------------
  const indiceFarmaci = win.NP.interazioniIndice;
  const frasiTotali = win.NP.plants.reduce((n, p) => n + ((p.sicurezza.interazioni || []).length), 0);
  ok(indiceFarmaci.length === frasiTotali, "interazioni: l'indice copre tutte le " + frasiTotali + " frasi delle schede");

  cerca("warfarin");
  ok(gruppi().join("|") === "Interazioni · 12", "interazioni: «warfarin» dà dodici frasi nel gruppo Interazioni (" + gruppi().join(" / ") + ")");
  ok(righe().length === 12, "interazioni: dodici righe per «warfarin» (" + righe().length + ")");
  ok(righe().every((b) => /warfarin/i.test((b.querySelector(".cerca-frase") || {}).textContent || "")), "interazioni: ogni riga porta la frase che nomina warfarin");
  ok(righe().every((b) => /Cautela (alta|media|bassa)/.test(b.querySelector(".cerca-percorso").textContent)), "interazioni: ogni riga dichiara il livello di cautela");
  ok(/Cautela alta/.test(righe()[0].querySelector(".cerca-percorso").textContent), "interazioni: la cautela alta viene per prima");
  ok(!el("cercaAvviso").hidden, "interazioni: l'avvertenza compare con i risultati sui farmaci");
  ok(/Informazione, non consiglio/.test(el("cercaAvviso").textContent), "interazioni: l'avvertenza dice che è informazione e non consiglio");
  const fraseIperico = win.NP.plants.find((p) => p.id === "iperico").sicurezza.interazioni.filter((f) => /warfarin/i.test(f))[0];
  ok(righe().some((b) => b.querySelector(".cerca-frase").textContent.indexOf(fraseIperico) !== -1), "interazioni: la frase è quella esatta della scheda");

  cerca("digossina");
  ok(gruppi().join("|") === "Interazioni · 11", "interazioni: «digossina» dà undici frasi (" + gruppi().join(" / ") + ")");
  ok(nomi().indexOf("Iperico") !== -1 && nomi().indexOf("Liquirizia") !== -1, "interazioni: la digossina cita iperico e liquirizia");

  cerca("litio");
  ok(gruppi().join("|") === "Interazioni · 7", "interazioni: «litio» dà sette frasi (" + gruppi().join(" / ") + ")");
  ok(nomi().indexOf("Equiseto") !== -1, "interazioni: il litio cita l'equiseto");

  // Cercare una pianta non rovescia addosso le sue interazioni: la scheda basta.
  cerca("malva");
  ok(!/Interazioni/.test(gruppi().join("|")), "interazioni: il nome di una pianta non apre il gruppo Interazioni");
  ok(el("cercaAvviso").hidden, "interazioni: senza risultati sui farmaci l'avvertenza resta nascosta");

  // La riga apre la scheda della pianta, dove la frase sta nel riquadro sicurezza.
  cerca("litio");
  const primaRiga = righe()[0];
  const nomePrima = primaRiga.querySelector(".cerca-nome").textContent;
  const voceAttesa = indiceFarmaci.filter((r) => r.pianta === nomePrima)[0];
  primaRiga.click();
  await tick(80);
  ok(!aperta(), "interazioni: scegliere una riga chiude la ricerca");
  ok(win.location.hash === voceAttesa.via, "interazioni: la riga porta alla scheda della pianta (" + win.location.hash + ")");
  el("cercaBtn").click();
  await tick(20);

  // Oltre i 40 risultati si mostrano i primi 40 e lo si dice.
  cerca("a");
  ok(righe().length === 40, "conteggi: al massimo 40 risultati in finestra (" + righe().length + ")");
  ok(/Primi 40 risultati/.test(el("cercaAiuto").textContent), "conteggi: la nota avvisa che sono i primi 40");

  // --- Nessun doppione, in nessuna ricerca --------------------------------
  ["a", "glossario", "malva", "sonno", "foglie"].forEach((q) => {
    cerca(q);
    const chiavi = righe().map((b) => chiave(b) + "|" + ((b.querySelector(".cerca-frase") || {}).textContent || ""));
    ok(new Set(chiavi).size === chiavi.length, "niente doppioni: «" + q + "» non ripete un risultato");
  });

  cerca("glossario");
  ok(righe().length === 40 && gruppi()[0] === "Pagine · 1" && gruppi()[1] === "Glossario · 39", "conteggi: «glossario» dà la pagina più 39 voci visibili (" + gruppi().join(" / ") + ")");

  // --- Nessun risultato ---------------------------------------------------
  cerca("zzzz");
  ok(righe().length === 0, "vuoto: «zzzz» non dà risultati");
  ok(/Nessun risultato per «zzzz»/.test(el("cercaEsiti").textContent), "vuoto: il messaggio nomina la parola cercata");
  ok(campo().getAttribute("aria-expanded") === "false", "vuoto: il campo si dichiara vuoto");
  tasto(campo(), "Enter");
  await tick(20);
  ok(aperta(), "vuoto: Invio senza risultati non chiude e non rompe");

  // --- Frecce e Invio -----------------------------------------------------
  cerca("malva");
  const prime = righe();
  ok(prime[0].getAttribute("aria-selected") === "true", "tastiera: la prima voce parte scelta");
  ok(campo().getAttribute("aria-activedescendant") === prime[0].id, "tastiera: il campo indica la prima voce");
  tasto(campo(), "ArrowDown");
  ok(righe()[1].getAttribute("aria-selected") === "true" && righe()[0].getAttribute("aria-selected") === "false", "tastiera: la freccia giù sposta la scelta");
  ok(campo().getAttribute("aria-activedescendant") === righe()[1].id, "tastiera: il campo segue la voce scelta");
  tasto(campo(), "ArrowDown");
  ok(campo().getAttribute("aria-activedescendant") === righe()[2].id, "tastiera: la seconda freccia giù scende ancora");
  tasto(campo(), "ArrowUp");
  ok(campo().getAttribute("aria-activedescendant") === righe()[1].id, "tastiera: la freccia su risale");
  tasto(campo(), "ArrowUp");
  tasto(campo(), "ArrowUp");
  ok(righe()[righe().length - 1].getAttribute("aria-selected") === "true", "tastiera: la freccia su dalla prima voce gira all'ultima");

  // Invio apre la voce scelta: Altea, la seconda di «malva».
  cerca("malva");
  tasto(campo(), "ArrowDown");
  tasto(campo(), "Enter");
  await tick(80);
  ok(!aperta(), "scelta: Invio chiude la finestra");
  ok(win.location.hash === "#/pianta/altea", "scelta: Invio apre la voce scelta (" + win.location.hash + ")");

  // Il cambio di pagina chiude la finestra anche se resta aperta.
  el("cercaBtn").click();
  await tick(20);
  win.location.hash = "#/manuale";
  await tick(90);
  ok(!aperta(), "chiusura: cambiare pagina chiude la ricerca");

  ok(errors.length === 0, "nessun errore JavaScript: " + errors.slice(0, 3).join(" | "));

  console.log("\n" + total + " controlli della ricerca, " + failures + " errori.");
  if (failures) {
    console.error("Test della ricerca fallito.");
    process.exit(1);
  }
  console.log("Test della ricerca superato.");
  dom.window.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
