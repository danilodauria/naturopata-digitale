#!/usr/bin/env node
/* Verifica dei contenuti e della logica di Neura, senza browser. */
"use strict";

global.window = global;
const path = require("path");
const files = [
  "data-plants", "data-plants-2", "data-plants-3", "data-plants-4", "data-plants-5",
  "data-manual", "data-manual-2", "data-manual-3",
  "data-manual-4", "data-manual-5", "data-extra", "data-extra-2", "data-extra-3",
  "data-quiz", "data-quiz-2", "data-quiz-3", "data-library", "neura"
];
files.forEach((f) => require(path.join(__dirname, "..", "assets", "js", f + ".js")));

const NP = global.NP;
let errors = 0;
let checks = 0;
function ok(cond, msg) {
  checks++;
  if (!cond) { errors++; console.error("✗ " + msg); }
}

const plants = NP.plants;
const manual = NP.manual;
const quiz = NP.quiz;
const cats = NP.quizCategories;
const parts = NP.manualParts;

console.log("Dati: " + plants.length + " piante, " + manual.length + " capitoli, " + quiz.length + " domande.");

ok(plants.length === 60, "ci sono 60 piante");
ok(manual.length === 18, "ci sono 18 capitoli");
ok(quiz.length >= 80, "almeno 80 domande (" + quiz.length + ")");
ok(NP.conditions.length === 8, "8 schede di benessere");
ok(NP.toxic.length === 10, "10 piante tossiche");
ok(NP.glossary.length >= 40, "glossario con almeno 40 termini");

const plantIds = new Set();
plants.forEach((p) => {
  const req = ["id", "nome", "latino", "famiglia", "sintesi", "descrizione", "parti", "raccolta", "proprieta", "usi", "preparazioni", "sicurezza", "evidenza", "curiosita", "fonti"];
  req.forEach((k) => ok(p[k] !== undefined, p.id + ": manca " + k));
  ok(!plantIds.has(p.id), "id pianta duplicato: " + p.id);
  plantIds.add(p.id);
  ok(["verde", "giallo", "rosso"].indexOf(p.sicurezza.livello) !== -1, p.id + ": livello sicurezza non valido");
  ok(p.sicurezza.gravidanza && p.sicurezza.allattamento && p.sicurezza.bambini, p.id + ": sicurezza incompleta");
  ok(Array.isArray(p.fonti) && p.fonti.length > 0, p.id + ": nessuna fonte");
  ok(p.fonti.every((f) => /^https:\/\//.test(f.u)), p.id + ": fonte non https");
  ok(Array.isArray(p.preparazioni) && p.preparazioni.length > 0, p.id + ": nessuna preparazione");
  ok(p.raccolta.mesi.every((m) => m >= 1 && m <= 12), p.id + ": mese non valido");
  ok(p.raccolta.mesi.length > 0, p.id + ": raccolta vuota");
  if (p.fito) ok(typeof p.fito.commestibile === "boolean", p.id + ": fito incompleto");
});

const chapterIds = new Set();
manual.forEach((c, i) => {
  ok(c.n === i + 1, "capitolo con numerazione errata: " + c.id);
  ok(!chapterIds.has(c.id), "capitolo duplicato: " + c.id);
  chapterIds.add(c.id);
  ok(parts.some((p) => p.id === c.parte), c.id + ": parte inesistente");
  ok(c.html && c.html.length > 300, c.id + ": contenuto troppo breve");
  ok(c.titolo && c.occhiello, c.id + ": titolo/occhiello mancante");
});

const quizIds = new Set();
quiz.forEach((q) => {
  ok(!quizIds.has(q.id), "domanda duplicata: " + q.id);
  quizIds.add(q.id);
  ok(cats.some((c) => c.id === q.cat), q.id + ": categoria non valida");
  ok(["base", "intermedio", "esperto"].indexOf(q.livello) !== -1, q.id + ": livello non valido");
  ok(Array.isArray(q.o) && q.o.length === 4, q.id + ": servono 4 opzioni");
  ok(Number.isInteger(q.r) && q.r >= 0 && q.r < 4, q.id + ": risposta non valida");
  ok(new Set(q.o).size === 4, q.id + ": opzioni duplicate");
  ok(q.e && q.e.length > 20, q.id + ": spiegazione assente");
});

const catCounts = {};
cats.forEach((c) => { catCounts[c.id] = quiz.filter((q) => q.cat === c.id).length; ok(catCounts[c.id] >= 10, "categoria " + c.id + " con meno di 10 domande"); });

NP.conditions.forEach((c) => {
  (c.piante || []).forEach((x) => ok(plantIds.has(x.id), "condizione " + c.id + ": pianta inesistente " + x.id));
});

NP.interactions.forEach((it) => ok(["alto", "medio", "basso"].indexOf(it.livello) !== -1, "interazione con livello errato: " + it.pianta));

// Biblioteca storica
ok(!!NP.matthioli, "esiste la scheda Matthioli");
ok(NP.matthioli.edizioni.length >= 5, "Matthioli: almeno 5 edizioni");
ok(NP.matthioli.edizioni.some((e) => e.lingua === "Italiano"), "Matthioli: edizioni italiane");
ok(NP.matthioli.fonti.every((f) => /^https:\/\//.test(f.u)), "Matthioli: fonti https");
ok(/pubblico dominio/i.test(NP.matthioli.pubblicoDominio.testo), "Matthioli: nota pubblico dominio");
ok(NP.matthioli.lezioni.length >= 4, "Matthioli: lezioni");

// Sopravvivenza
ok(!!NP.survival, "esiste la scheda sopravvivenza");
ok(NP.survival.livelli.length === 3, "sopravvivenza: tre livelli");
ok(NP.survival.livelli.map((l) => l.id).join(",") === "base,intermedio,esperto", "sopravvivenza: ordine dei livelli");
NP.survival.livelli.forEach((l) => {
  ok(l.schede.length >= 8, "sopravvivenza " + l.id + ": almeno 8 schede");
  ok(l.kit.length >= 8, "sopravvivenza " + l.id + ": kit essenziale");
  ok(l.obiettivo && l.motto, "sopravvivenza " + l.id + ": obiettivo e motto");
  l.schede.forEach((s, i) => ok(s.titolo && s.testo && s.errore, "sopravvivenza " + l.id + ": scheda " + (i + 1) + " incompleta"));
});
ok(NP.survival.errori.length >= 8, "sopravvivenza: errori da evitare");
ok(NP.survival.fonti.every((f) => /^https:\/\//.test(f.u)), "sopravvivenza: fonti https");

// Collegamenti interni
const all = JSON.stringify({ plants, manual, quiz, conditions: NP.conditions, extra: [NP.toxic, NP.glossary, NP.faq] });
const linkRe = /#\/(pianta|capitolo|benessere)\/([a-z0-9-]+)/g;
let match;
const links = new Set();
while ((match = linkRe.exec(all))) links.add(match[1] + ":" + match[2]);
links.forEach((l) => {
  const [type, id] = l.split(":");
  if (type === "pianta") ok(plantIds.has(id), "link a pianta inesistente: " + id);
  if (type === "capitolo") ok(chapterIds.has(id), "link a capitolo inesistente: " + id);
  if (type === "benessere") ok(NP.conditions.some((c) => c.id === id), "link a scheda inesistente: " + id);
});

// Caratteri anomali e refusi
const raw = JSON.stringify(all);
ok(raw.indexOf("\u00ad") === -1, "presenti soft hyphen (U+00AD)");
ok(raw.indexOf("undefined") === -1, "presente 'undefined' nei contenuti");
ok(raw.indexOf("â€") === -1, "presente testo con codifica errata");

// Neura
NP.neura.build();
function answer(q) { return NP.neura.answer(q).html; }
ok(/Malva/.test(answer("a cosa serve la malva?")), "Neura risponde sulla malva");
ok(/Liquirizia|Gravidanza|Interazioni/.test(answer("la liquirizia è sicura in gravidanza?")), "Neura risponde sulla sicurezza della liquirizia");
ok(/sosia|mughetto|Mughetto/i.test(answer("quali sono i sosia dell'aglio orsino?")), "Neura riconosce i sosia");
ok(/Sonno|sonno|addorment/i.test(answer("cosa aiuta per l'insonnia?")), "Neura risponde sull'insonnia");
ok(/Domanda di Neura/.test(answer("fammi una domanda di quiz")), "Neura genera un quiz");
ok(/non trovo|Non trovo|riformulare/i.test(answer("qual è il prezzo del petrolio?")), "Neura ammette di non sapere");
ok(/Iperico/i.test(answer("confronta iperico e valeriana")), "Neura confronta due piante");
ok(/Mattioli/i.test(answer("chi era Mattioli?")), "Neura conosce la pagina Mattioli");
ok(/112|bollire/i.test(answer("come si tratta l'acqua in escursione?")), "Neura rimanda alla sopravvivenza");
ok(NP.neura.findPlants("le ortiche").length === 1, "Neura riconosce il plurale 'ortiche'");
ok(/Interazioni|contraccett|Iperico/i.test(answer("posso prendere iperico con la pillola?")), "Neura riconosce il rischio con la pillola");

const c1 = NP.neura.check("iperico e pillola", { farmaci: true });
ok(c1.level === "alto", "controllo iperico + contraccettivi = alto");
ok(c1.items.some((i) => /contraccett|Iperico/i.test(i.titolo + i.testo)), "controllo cita contraccettivi/iperico");

const c2 = NP.neura.check("camomilla", {});
ok(c2.level !== "alto", "camomilla senza fattori non è alto rischio");

const c3 = NP.neura.check("liquirizia", { gravidanza: true });
ok(c3.items.some((i) => /gravida/i.test(i.titolo)), "controllo liquirizia in gravidanza");

const c4 = NP.neura.check("ho dolore al petto e volevo prendere biancospino", {});
ok(/112|urgen|soccorsi/i.test(c4.summary), "controllo riconosce il dolore toracico come urgente");

// File, manifest e service worker
const fs = require("fs");
const root = path.join(__dirname, "..");
["vademecum-naturopata-digitale.pdf", "vademecum-naturopata-digitale-a4.pdf", "vademecum-naturopata-digitale-libricino-a4.pdf"].forEach((f) => {
  const p = path.join(root, "assets", "pdf", f);
  ok(fs.existsSync(p) && fs.statSync(p).size > 30000, "PDF mancante o troppo piccolo: " + f);
});
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));
ok(manifest.name === "Naturopata Digitale", "manifest: nome");
ok(manifest.start_url === "./", "manifest: start_url relativo");
manifest.icons.forEach((i) => ok(fs.existsSync(path.join(root, i.src)), "manifest: icona mancante " + i.src));
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const shell = sw.match(/"([^"]+\.(?:js|css|png|svg|webmanifest|html))"/g) || [];
shell.forEach((s) => {
  const f = s.replace(/"/g, "");
  if (f !== "./" && !f.startsWith("http")) ok(fs.existsSync(path.join(root, f)), "service worker: file in cache mancante " + f);
});
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const srcs = index.match(/<script\s+src="([^"]+)"/g) || [];
srcs.forEach((s) => {
  const f = s.replace(/.*src="/, "").replace(/"/, "");
  ok(fs.existsSync(path.join(root, f)), "index: script mancante " + f);
});

// Pagina di download
const scarica = fs.readFileSync(path.join(root, "scarica", "index.html"), "utf8");
ok(/<html lang="it"/.test(scarica), "scarica: lingua italiana");
ok(/Scarica Naturopata Digitale/.test(scarica), "scarica: titolo");
ok(/href="\.\.\/"/.test(scarica), "scarica: ritorno all'app");
ok((scarica.match(/assets\/pdf\/vademecum-[a-z0-9-]+\.pdf/g) || []).length >= 3, "scarica: tre Vademecum");
[
  "Naturopata-Digitale-Windows-x64.exe",
  "Naturopata-Digitale-Windows-portatile.zip",
  "Naturopata-Digitale-Linux-amd64.deb",
  "Naturopata-Digitale-Linux-x86_64.AppImage",
  "Naturopata-Digitale-Mac-arm64.dmg",
  "Naturopata-Digitale-Mac-x64.dmg"
].forEach((f) => ok(scarica.indexOf("releases/latest/download/" + f) !== -1, "scarica: manca il link a " + f));
ok(/112/.test(scarica) && /CC BY-NC-SA 4.0/.test(scarica), "scarica: emergenza e licenza");
ok(/data-release="https:\/\/api\.github\.com\/repos\/danilodauria\/naturopata-digitale\/releases\/latest"/.test(scarica), "scarica: impronte lette dall'API delle release");
ok(/releases\/latest\/download\/SHA256SUMS\.txt/.test(scarica), "scarica: link al file delle impronte");
ok(/<table class="sums-table" hidden>/.test(scarica), "scarica: tabella delle impronte");
["Get-FileHash", "certutil -hashfile", "sha256sum -c SHA256SUMS.txt", "shasum -a 256 -c SHA256SUMS.txt"].forEach((cmd) => {
  ok(scarica.indexOf(cmd) !== -1, "scarica: comando di verifica mancante " + cmd);
});
ok(scarica.indexOf("undefined") === -1, "scarica: nessun 'undefined'");
const pagesWorkflow = fs.readFileSync(path.join(root, ".github", "workflows", "pages.yml"), "utf8");
ok(/scarica/.test(pagesWorkflow), "workflow Pages: pagina di download inclusa");
const desktopWorkflow = fs.readFileSync(path.join(root, ".github", "workflows", "desktop.yml"), "utf8");
ok(/sha256sum Naturopata-Digitale-\*/.test(desktopWorkflow), "workflow desktop: calcola le impronte");
ok(/gh release upload "\$TAG" SHA256SUMS\.txt/.test(desktopWorkflow), "workflow desktop: allega SHA256SUMS.txt");
ok(/\n  checksums:/.test(desktopWorkflow), "workflow desktop: job delle impronte");
ok(/caches\.match\(request\)\.then\(\(cached\) => cached \|\| caches\.match\("index\.html"\)\)/.test(sw), "service worker: fallback navigazione");
ok(/isAppShell/.test(sw), "service worker: le altre pagine non sovrascrivono la shell");

// Statistiche di copertura
console.log("Domande per categoria: " + Object.keys(catCounts).map((k) => k + "=" + catCounts[k]).join(", "));
console.log("Piante alimentari: " + plants.filter((p) => p.fito && p.fito.commestibile).length + "/" + plants.length);
console.log("File del service worker verificati: " + shell.length);
console.log(checks + " controlli eseguiti, " + errors + " errori.");

if (errors) process.exit(1);
console.log("Tutto ok.");
