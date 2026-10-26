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
  ok(doc.querySelectorAll(".feature").length === 8, "home: 8 percorsi");
  ok(!!doc.querySelector(".today-card"), "home: pianta del giorno");
  ok(doc.querySelector(".site-footer").textContent.indexOf("Danilo") !== -1, "footer: autore");

  // Erbario
  await go("#/erbario");
  ok(doc.querySelectorAll(".plant-card").length === 60, "erbario: 60 schede");
  const input = doc.querySelector("#plantSearch");
  input.value = "malva selvatica";
  input.dispatchEvent(new win.Event("input", { bubbles: true }));
  await tick(20);
  ok(doc.querySelectorAll(".plant-card").length === 1, "erbario: ricerca malva selvatica");
  ok(/1 scheda/.test(doc.querySelector("#plantCount").textContent), "erbario: contatore ricerca");
  input.value = "zzzzz";
  input.dispatchEvent(new win.Event("input", { bubbles: true }));
  await tick(20);
  ok(!!doc.querySelector(".empty-state"), "erbario: stato vuoto");
  doc.querySelector("[data-reset-filters]").click();
  await tick(60);
  ok(doc.querySelectorAll(".plant-card").length === 60, "erbario: reset filtri");

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
  const edibleCount = win.NP.plants.filter((p) => p.fito && p.fito.commestibile).length;
  ok(doc.querySelectorAll(".data-table tbody tr").length === edibleCount, "fito: " + edibleCount + " piante alimentari");

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

  // I Discorsi di Matthioli
  await go("#/matthioli");
  ok(/I Discorsi di Mattioli/i.test(doc.querySelector("h1").textContent), "matthioli: titolo");
  ok(doc.querySelectorAll(".data-table tbody tr").length >= 5, "matthioli: tabella delle edizioni");
  ok(/pubblico dominio/i.test(doc.body.textContent), "matthioli: nota sul pubblico dominio");
  ok(doc.querySelectorAll(".timeline li").length >= 8, "matthioli: biografia");
  ok(doc.querySelectorAll(".source-list a").length >= 8, "matthioli: fonti");

  // Sopravvivenza
  await go("#/sopravvivenza");
  ok(doc.querySelectorAll("[data-survival-tab]").length === 3, "sopravvivenza: tre livelli");
  ok(doc.querySelectorAll("[data-survival-panel]").length === 3, "sopravvivenza: tre pannelli");
  ok(!doc.querySelector('[data-survival-panel="base"]').hidden, "sopravvivenza: base visibile");
  ok(doc.querySelector('[data-survival-panel="esperto"]').hidden, "sopravvivenza: esperto nascosto");
  doc.querySelector('[data-survival-tab="intermedio"]').click();
  await tick(30);
  ok(!doc.querySelector('[data-survival-panel="intermedio"]').hidden, "sopravvivenza: cambio livello");
  ok(doc.querySelector('[data-survival-panel="base"]').hidden, "sopravvivenza: base nascosta");
  ok(doc.querySelectorAll(".skill").length >= 24, "sopravvivenza: schede pratiche");
  await go("#/sopravvivenza/esperto");
  ok(!doc.querySelector('[data-survival-panel="esperto"]').hidden, "sopravvivenza: link diretto al livello esperto");
  ok(/112/.test(doc.body.textContent), "sopravvivenza: numero di emergenza");

  // Licenze e FAQ
  await go("#/licenze");
  ok(doc.querySelectorAll("details.glossary-item").length === 8, "licenze: 8 FAQ");
  ok(doc.body.textContent.indexOf("CC BY-NC-SA 4.0") !== -1, "licenze: CC BY-NC-SA");
  ok(doc.body.textContent.indexOf("MIT") !== -1, "licenze: MIT");
  ok(doc.querySelectorAll(".download-card").length === 3, "licenze: tre versioni del Vademecum");
  ok(doc.querySelectorAll('.download-card a[href$=".pdf"]').length === 3, "licenze: tre download PDF");
  ok(/lato corto/i.test(doc.body.textContent), "licenze: istruzioni per il libricino");

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

  // Pagina di download: impronte SHA-256 lette dall'API delle release
  const improntaA = "1f" + "a".repeat(62);
  const improntaB = "2f" + "b".repeat(62);
  const releaseJson = {
    tag_name: "v1.2.0",
    assets: [
      { name: "Naturopata-Digitale-Windows-x64.exe", digest: "sha256:" + improntaA },
      { name: "Naturopata-Digitale-Linux-amd64.deb", digest: "sha256:" + improntaB },
      { name: "SHA256SUMS.txt", digest: "sha256:" + "3f" + "c".repeat(62) },
      { name: "senza-digest.bin", digest: null }
    ]
  };
  const sumsText = JSON.stringify(releaseJson);
  const paginaScarica = fs.readFileSync(path.join(root, "scarica", "index.html"), "utf8");
  function sumsPage(fetchImpl) {
    return new JSDOM(paginaScarica, {
      url: "https://danilodauria.github.io/naturopata-digitale/scarica/",
      runScripts: "dangerously",
      beforeParse(window) { window.fetch = fetchImpl; }
    });
  }

  const conImpronte = sumsPage(() => Promise.resolve({ ok: true, json: () => Promise.resolve(releaseJson) }));
  await tick(60);
  const sd = conImpronte.window.document;
  const righe = sd.querySelectorAll(".sums-table tbody tr");
  ok(righe.length === 2, "scarica: solo i pacchetti in tabella (escluso SHA256SUMS.txt)");
  ok(!sd.querySelector(".sums-table").hidden, "scarica: tabella visibile dopo il caricamento");
  ok(righe[0].querySelector("th").textContent === "Naturopata-Digitale-Linux-amd64.deb", "scarica: righe in ordine alfabetico");
  ok(righe[1].querySelector("th").textContent === "Naturopata-Digitale-Windows-x64.exe", "scarica: nome del file in tabella");
  const impronte = Array.from(righe).map((r) => r.querySelector("code").textContent);
  ok(impronte.indexOf(improntaA) !== -1 && impronte.indexOf(improntaB) !== -1, "scarica: impronte senza prefisso sha256:");
  ok(impronte.every((h) => /^[a-f0-9]{64}$/.test(h)), "scarica: impronte di 64 caratteri esadecimali");
  ok(/v1\.2\.0/.test(sd.querySelector(".sums-status").textContent), "scarica: versione nello stato");
  ok(sd.querySelectorAll(".sums-cmd").length === 4, "scarica: comandi per i tre sistemi");

  const senzaImpronte = sumsPage(() => Promise.reject(new Error("offline")));
  await tick(60);
  const sf = senzaImpronte.window.document;
  ok(sf.querySelector(".sums-table").hidden, "scarica: tabella nascosta se il file non arriva");
  ok(/SHA256SUMS\.txt/.test(sf.querySelector(".sums-status").textContent), "scarica: rinvio al file delle impronte");
  conImpronte.window.close();
  senzaImpronte.window.close();

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
