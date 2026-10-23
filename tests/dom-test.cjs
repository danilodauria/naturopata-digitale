#!/usr/bin/env node
/* Test di rendering e interazione con jsdom. */
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
async function go(hash) {
  win.location.hash = hash;
  await tick(70);
}

(async () => {
  // Home
  ok(!!doc.querySelector(".hero"), "home: hero presente");
  ok(/sapere/i.test(doc.querySelector(".hero h1").textContent), "home: titolo");
  ok(doc.querySelectorAll(".feature").length === 6, "home: 6 percorsi");
  ok(!!doc.querySelector(".today-card"), "home: pianta del giorno");
  ok(doc.querySelector(".site-footer").textContent.indexOf("Danilo") !== -1, "footer: autore");

  // Erbario
  await go("#/erbario");
  ok(doc.querySelectorAll(".plant-card").length === 27, "erbario: 27 schede");
  const input = doc.querySelector("#plantSearch");
  input.value = "malva";
  input.dispatchEvent(new win.Event("input", { bubbles: true }));
  await tick(20);
  ok(doc.querySelectorAll(".plant-card").length === 1, "erbario: ricerca malva");
  ok(/1 scheda/.test(doc.querySelector("#plantCount").textContent), "erbario: contatore ricerca");
  input.value = "zzzzz";
  input.dispatchEvent(new win.Event("input", { bubbles: true }));
  await tick(20);
  ok(!!doc.querySelector(".empty-state"), "erbario: stato vuoto");
  doc.querySelector("[data-reset-filters]").click();
  await tick(60);
  ok(doc.querySelectorAll(".plant-card").length === 27, "erbario: reset filtri");

  // Dettaglio pianta
  await go("#/pianta/camomilla");
  ok(doc.querySelector("h1").textContent.indexOf("Camomilla") !== -1, "pianta: titolo");
  ok(!!doc.querySelector(".safety-box"), "pianta: box sicurezza");
  ok(doc.querySelectorAll(".prep").length >= 2, "pianta: preparazioni");
  const fav = doc.querySelector("[data-fav]");
  fav.click();
  ok(win.NP.app.state.favs.has("camomilla"), "pianta: preferito salvato");
  ok(/Nei preferiti/.test(fav.textContent), "pianta: stato preferito");
  fav.click();
  ok(!win.NP.app.state.favs.has("camomilla"), "pianta: preferito rimosso");

  // Manuale e capitolo
  await go("#/manuale");
  ok(doc.querySelectorAll(".chapter-card").length === 18, "manuale: 18 capitoli");
  await go("#/capitolo/cos-e-la-naturopatia");
  ok(/Cos'è la naturopatia/i.test(doc.querySelector("h1").textContent), "capitolo: titolo");
  ok(win.NP.app.state.read.has("cos-e-la-naturopatia"), "capitolo: progresso salvato");

  // Fitoalimurgia
  await go("#/fitoalimurgia");
  ok(doc.querySelectorAll(".rule").length === 8, "fito: 8 regole");
  ok(doc.querySelectorAll(".toxic-card").length === 10, "fito: 10 piante tossiche");
  ok(doc.querySelectorAll(".data-table tbody tr").length === 23, "fito: 23 piante alimentari");

  // Benessere
  await go("#/benessere");
  ok(doc.querySelectorAll(".wellness-card").length === 8, "benessere: 8 schede");
  await go("#/benessere/sonno");
  ok(/Sonno difficile/i.test(doc.querySelector("h1").textContent), "benessere: dettaglio sonno");
  ok(!!doc.querySelector(".redflags"), "benessere: segnali d'allarme");

  // Calendario
  await go("#/calendario");
  ok(doc.querySelectorAll(".month-tab").length === 12, "calendario: 12 mesi");
  doc.querySelector('.month-tab[data-month="5"]').click();
  await tick(70);
  ok(/mese delle rose/i.test(doc.querySelector(".panel h2").textContent), "calendario: maggio selezionato");

  // Glossario
  await go("#/glossario");
  ok(doc.querySelectorAll(".glossary-item").length === 44, "glossario: 44 voci");
  const gs = doc.querySelector("#glossSearch");
  gs.value = "mucillagine";
  gs.dispatchEvent(new win.Event("input", { bubbles: true }));
  await tick(20);
  ok(/1 termin/.test(doc.querySelector("#glossCount").textContent), "glossario: filtro");

  // Sicurezza
  await go("#/sicurezza");
  ok(doc.querySelectorAll(".toxic-card").length === 10, "sicurezza: piante tossiche");
  ok(doc.querySelectorAll(".data-table").length >= 3, "sicurezza: tabelle");
  ok(doc.body.textContent.indexOf("112") !== -1, "sicurezza: numero di emergenza");

  // Quiz
  await go("#/quiz");
  ok(!!doc.querySelector("[data-quiz-start]"), "quiz: configurazione");
  doc.querySelector("#quizCount").value = "10";
  doc.querySelector("[data-quiz-start]").click();
  await tick(30);
  ok(!!win.NP.app.state.quiz, "quiz: stato creato");
  ok(doc.querySelectorAll("[data-opt]").length === 4, "quiz: 4 opzioni");
  for (let i = 0; i < 10; i++) {
    const q = win.NP.app.state.quiz;
    if (!q || q.locked) break;
    const correct = q.items[q.index].r;
    const btn = doc.querySelector('[data-opt="' + correct + '"]');
    if (!btn) break;
    btn.click();
    await tick(15);
    const next = doc.querySelector("[data-next-quiz]");
    if (!next) break;
    next.click();
    await tick(15);
  }
  await tick(40);
  ok(!!doc.querySelector(".result-panel"), "quiz: risultato finale");
  ok(/100%/.test(doc.querySelector(".score-ring").textContent), "quiz: punteggio 100%");
  ok(doc.querySelectorAll(".review-item").length === 0, "quiz: nessun errore");

  // Rientro nel quiz dopo aver risposto: nessun blocco
  doc.querySelector("[data-quiz-reset]").click();
  await tick(30);
  doc.querySelector("#quizCount").value = "10";
  doc.querySelector("[data-quiz-start]").click();
  await tick(30);
  const qz2 = win.NP.app.state.quiz;
  doc.querySelector('[data-opt="' + qz2.items[0].r + '"]').click();
  await tick(20);
  await go("#/manuale");
  await go("#/quiz");
  ok(win.NP.app.state.quiz.locked === false, "quiz: rientro senza blocco");
  ok(doc.querySelectorAll("[data-opt]:not([disabled])").length === 4, "quiz: opzioni di nuovo attive");
  const quit = doc.querySelector("[data-quit-quiz]");
  if (quit) quit.click();
  await tick(30);

  // Neura chat
  await go("#/neura");
  ok(!!doc.querySelector(".chat-panel"), "neura: pannello chat");
  const ni = doc.querySelector("#neuraInput");
  ni.value = "a cosa serve la malva?";
  doc.querySelector("#neuraSend").click();
  await tick(500);
  ok(/Malva/i.test(doc.querySelector("#chatLog").textContent), "neura: risposta sulla malva");

  ni.value = "fammi una domanda di quiz";
  doc.querySelector("#neuraSend").click();
  await tick(500);
  ok(!!doc.querySelector(".neura-quiz"), "neura: quiz generato");
  const nq = doc.querySelector('.neura-quiz .option[data-correct="1"]');
  if (nq) {
    nq.click();
    await tick(20);
    ok(/Giusto/.test(doc.querySelector(".neura-quiz").textContent), "neura: quiz corretto");
  }

  // Controllo sicurezza
  doc.querySelector("#checkText").value = "iperico e pillola";
  doc.querySelector("#chk-farmaci").checked = true;
  doc.querySelector("#checkBtn").click();
  await tick(30);
  const checkText = doc.querySelector("#checkResult").textContent;
  ok(/Iperico/i.test(checkText), "neura: controllo cita iperico");
  ok(/contraccett/i.test(checkText), "neura: controllo cita contraccettivi");
  ok(/alto/i.test(checkText), "neura: livello alto");

  // Licenze e FAQ
  await go("#/licenze");
  ok(doc.querySelectorAll("details.glossary-item").length === 8, "licenze: 8 FAQ");
  ok(doc.body.textContent.indexOf("CC BY-NC-SA 4.0") !== -1, "licenze: CC BY-NC-SA");
  ok(doc.body.textContent.indexOf("MIT") !== -1, "licenze: MIT");

  // Tema
  const before = doc.documentElement.getAttribute("data-theme");
  doc.querySelector("#themeBtn").click();
  const after = doc.documentElement.getAttribute("data-theme");
  ok(before !== after, "tema: cambiato");
  ok(win.localStorage.getItem("naturopata-digitale:v1:theme") === after, "tema: salvato");

  // Menu mobile
  doc.querySelector("#menuBtn").click();
  ok(doc.querySelector("#mainNav").classList.contains("is-open"), "menu: apertura");

  // 404
  await go("#/pagina-inesistente");
  ok(/non trovata/i.test(doc.body.textContent), "404: pagina non trovata");

  // Errori runtime
  ok(errors.length === 0, "nessun errore JavaScript: " + errors.slice(0, 3).join(" | "));

  console.log("\n" + total + " controlli DOM, " + failures + " errori.");
  if (failures) {
    console.error("Test DOM fallito.");
    process.exit(1);
  }
  console.log("Test DOM superato.");
  dom.window.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
