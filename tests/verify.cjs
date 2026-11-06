#!/usr/bin/env node
/* Verifica dei contenuti e della logica di Neura, senza browser. */
"use strict";

global.window = global;
const path = require("path");
const files = [
  "data-plants", "data-plants-2", "data-plants-3", "data-plants-4", "data-plants-5",
  "data-manual", "data-manual-2", "data-manual-3",
  "data-manual-4", "data-manual-5", "data-extra", "data-extra-2", "data-extra-3",
  "data-quiz", "data-quiz-2", "data-quiz-3", "data-library", "data-saperi", "neura"
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

// Saperi antichi
ok(Array.isArray(NP.spezierie) && NP.spezierie.length >= 3, "spezierie: almeno tre luoghi");
NP.spezierie.forEach((s) => {
  ["id", "nome", "luogo", "epoca", "storia", "perche", "visita", "attenzione"].forEach((k) => ok(!!s[k], "spezieria " + s.id + ": manca " + k));
  ok((s.link || []).length > 0 && s.link.every((l) => /^https:\/\//.test(l.u)), "spezieria " + s.id + ": collegamenti https");
});
ok(NP.spezierieGuida.passi.length >= 4, "spezierie: come si legge una spezieria");
const amaroCats = new Set(NP.amariCategorie.map((c) => c.id));
ok(NP.amariCategorie.length >= 3, "amari: categorie");
ok(NP.amari.length >= 8, "amari: almeno otto schede (" + NP.amari.length + ")");
NP.amari.forEach((a) => {
  ok(amaroCats.has(a.categoria), "amaro " + a.id + ": categoria inesistente");
  ok((a.ingredienti || []).length >= 3, "amaro " + a.id + ": ingredienti insufficienti");
  ok(!!(a.storia && a.nota), "amaro " + a.id + ": storia o nota mancante");
});
ok(NP.amariIngredienti.length >= 6, "amari: ingredienti spiegati");
ok(NP.amariPrezzi.link.every((l) => /^https:\/\//.test(l.u)), "amari: negozi https");
ok(NP.balsamico.length === 12, "tempo balsamico: dodici mesi");
ok(NP.balsamico.map((m) => m.mese).join(",") === "1,2,3,4,5,6,7,8,9,10,11,12", "tempo balsamico: mesi in ordine");
NP.balsamico.forEach((m) => {
  ok(!!(m.titolo && m.momento && m.nota), "tempo balsamico: mese " + m.mese + " incompleto");
  ok((m.raccogli || []).length >= 2, "tempo balsamico: mese " + m.mese + " senza raccolte");
  ok((m.prepara || []).length >= 1, "tempo balsamico: mese " + m.mese + " senza preparazioni");
});
ok(NP.funghi.length >= 6, "funghi: almeno sei schede");
NP.funghi.forEach((f) => {
  ["id", "nome", "latino", "uso", "tradizione", "evidenza", "sicurezza", "livello", "nota"].forEach((k) => ok(!!f[k], "fungo " + f.id + ": manca " + k));
  ok(["verde", "giallo", "rosso"].indexOf(f.livello) !== -1, "fungo " + f.id + ": livello non valido");
});
ok(NP.micologia.regole.length >= 8, "micologia: otto regole");
ok(NP.micologia.fonti.every((f) => /^https:\/\//.test(f.url)), "micologia: fonti https");
ok(/112|Centro Antiveleni/i.test(NP.micologia.regole.map((r) => r.d).join(" ")), "micologia: numeri utili nelle regole");
ok(NP.estrazioni.length >= 5, "estrazioni: almeno cinque preparazioni");
NP.estrazioni.forEach((e) => {
  ok((e.passi || []).length >= 4, "estrazione " + e.id + ": passi insufficienti");
  ok(!!(e.sicurezza && e.conservazione), "estrazione " + e.id + ": sicurezza o conservazione mancante");
});
ok(/vietata/i.test((NP.estrazioni.find((e) => e.id === "distillazione") || {}).sicurezza || ""), "distillazione: avviso di legge");
ok(NP.saperiFonti.every((f) => /^https:\/\//.test(f.url)), "saperi antichi: fonti https");

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
ok(/Casamari/i.test(answer("che cosa sono le spezierie d'abbazia?")), "Neura conosce le spezierie");
ok(/#\/spezierie/.test(answer("parlami delle spezierie")), "Neura rimanda alle spezierie");
ok(/Santa Maria Novella/i.test(answer("santa maria novella")), "Neura riconosce Santa Maria Novella");
ok(/alcol|alcolic/i.test(answer("parlami degli amari")), "Neura avverte che gli amari sono alcolici");
ok(/#\/amari/.test(answer("che cos'è un amaro d'abbazia?")), "Neura rimanda all'atlante degli amari");
ok(/ossalat/i.test(answer("il chaga è sicuro?")), "Neura cita gli ossalati del chaga");
ok(/112|Centro Antiveleni|micologo/i.test(answer("come si raccolgono i funghi?")), "Neura mette la sicurezza davanti ai funghi");
ok(/#\/estrazioni/.test(answer("come si fa un oleolito?")), "Neura spiega gli oleoliti");
ok(/vietata|autorizzazion/i.test(answer("la distillazione in casa è legale?")), "Neura dice che la distillazione richiede autorizzazioni");
ok(/giugno/i.test(answer("qual è il tempo balsamico di giugno?")), "Neura risponde sul tempo balsamico");
ok(/ossalat/i.test((NP.neura.check("chaga", {}) || { items: [] }).items.map((i) => i.testo).join(" ")), "il controllo di sicurezza considera i funghi");
ok(NP.neura.search("reishi", 6).some((r) => r.doc.type === "fungo"), "la ricerca di Neura trova i funghi");

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

// Saperi antichi: rotta, menu, vista, script e cache devono restare allineati
const appJs = fs.readFileSync(path.join(root, "assets", "js", "app.js"), "utf8");
const appSaperi = fs.readFileSync(path.join(root, "assets", "js", "app-saperi.js"), "utf8");
["spezierie", "amari", "balsamico", "funghi", "estrazioni"].forEach((r) => {
  ok(new RegExp("\\b" + r + ": \\(\\)").test(appJs), "router: manca la rotta " + r);
  ok(index.indexOf('href="#/' + r + '"') !== -1, "index: manca il collegamento a " + r);
  ok(new RegExp("views\\." + r + " = function").test(appSaperi), "vista mancante: " + r);
});
ok(index.indexOf('src="assets/js/app-saperi.js"') !== -1, "index: carica app-saperi.js");
ok(index.indexOf('src="assets/js/data-saperi.js"') !== -1, "index: carica data-saperi.js");
ok(sw.indexOf('"assets/js/app-saperi.js"') !== -1 && sw.indexOf('"assets/js/data-saperi.js"') !== -1, "service worker: saperi antichi in cache");

// Pagina di download
const scarica = fs.readFileSync(path.join(root, "scarica", "index.html"), "utf8");
ok(/<html lang="it"/.test(scarica), "scarica: lingua italiana");
ok(/Scarica Naturopata Digitale/.test(scarica), "scarica: titolo");
ok(/href="\.\.\/index\.html"/.test(scarica), "scarica: ritorno all'app");
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

// Pagine statiche: guide, scheda rapida, versioni
const versionePkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).version;
const pagine = {
  "come-installare.html": ["Come si installa", "SmartScreen", "xattr -dr com.apple.quarantine", "sha256sum -c", "112", "Naturopata-Digitale-Come-si-installa.pdf"],
  "scheda-rapida.html": ["Scheda rapida", "Get-FileHash", "libfuse2t64", "Naturopata-Digitale-Scheda-rapida.pdf"],
  "versioni.html": ["Versioni e novità", "1.3.0", "1.2.0", "Come arrivano gli aggiornamenti"]
};
Object.keys(pagine).forEach((nome) => {
  const percorso = path.join(root, nome);
  ok(fs.existsSync(percorso), "manca la pagina " + nome);
  if (!fs.existsSync(percorso)) return;
  const html = fs.readFileSync(percorso, "utf8");
  ok(html.indexOf('<link rel="stylesheet" href="assets/css/pagine.css">') !== -1, nome + ": stile condiviso");
  ok(/<html lang="it"/.test(html), nome + ": lingua italiana");
  ok(html.indexOf("undefined") === -1, nome + ": nessun 'undefined'");
  ok(new RegExp("[Vv]ersione " + versionePkg.replace(/\./g, "\\.")).test(html), nome + ": versione " + versionePkg);
  pagine[nome].forEach((testo) => ok(html.indexOf(testo) !== -1, nome + ": manca «" + testo + "»"));
});
ok(fs.existsSync(path.join(root, "assets", "css", "pagine.css")), "manca lo stile condiviso delle pagine");
ok(/pagine\.css/.test(scarica), "scarica: usa lo stile condiviso");
ok(/id="guide"/.test(scarica), "scarica: sezione delle guide");
const preparaDesktop = fs.readFileSync(path.join(root, "scripts", "prepare-desktop.cjs"), "utf8");
["come-installare.html", "scheda-rapida.html", "versioni.html"].forEach((pagina) => {
  ok(preparaDesktop.indexOf('"' + pagina + '"') !== -1, "installer: copia " + pagina);
  ok(sw.indexOf('"' + pagina + '"') !== -1, "service worker: " + pagina + " in cache");
});
ok(sw.indexOf('"assets/css/pagine.css"') !== -1, "service worker: stile delle pagine in cache");
["app-voce.js", "app-status.js", "app-welcome.js"].forEach((f) => {
  ok(fs.existsSync(path.join(root, "assets", "js", f)), "manca assets/js/" + f);
  ok(index.indexOf('src="assets/js/' + f + '"') !== -1, "index: carica " + f);
  ok(sw.indexOf('"assets/js/' + f + '"') !== -1, "service worker: " + f + " in cache");
});
const prepDesktop = fs.readFileSync(path.join(root, "assets", "js", "app-status.js"), "utf8");
ok(/statusHelp/.test(prepDesktop) && /statusStop/.test(prepDesktop), "barra di stato: aiuto e stop audio");
ok(/Centri Antiveleni/.test(prepDesktop) && /112/.test(prepDesktop), "barra di stato: numeri utili");
const benvenuto = fs.readFileSync(path.join(root, "assets", "js", "app-welcome.js"), "utf8");
ok(/Non mostrarmelo più/.test(benvenuto) && /welcome-nascosto/.test(benvenuto), "benvenuto: chiusura definitiva salvata");
const neuraVoce = fs.readFileSync(path.join(root, "assets", "js", "app-neura.js"), "utf8");
["voiceSelect", "voiceRitmo", "voiceRitmoValore", "voiceRileggi", "voiceNote", "neuraStop"].forEach((id) => {
  ok(neuraVoce.indexOf('id="' + id + '"') !== -1, "Neura: pannello Voce, manca " + id);
});
ok(/Velocità di lettura/.test(neuraVoce), "Neura: velocità di lettura nel pannello Voce");
const voceJs = fs.readFileSync(path.join(root, "assets", "js", "app-voce.js"), "utf8");
["voceScelta", "impostavoce", "impostaRitmo", "letturaAttiva", "nomeVoce"].forEach((fn) => {
  ok(new RegExp(fn, "i").test(voceJs), "voce: manca " + fn);
});
ok(index.indexOf('id="voiceBtn"') !== -1, "index: altoparlante nell'intestazione");
["preload.cjs", "motore.cjs"].forEach((f) => {
  ok(fs.existsSync(path.join(root, "desktop", f)), "manca desktop/" + f);
});
const mainDesktop = fs.readFileSync(path.join(root, "desktop", "main.cjs"), "utf8");
ok(/voceNaturale:stato/.test(mainDesktop) && /voceNaturale:pronuncia/.test(mainDesktop), "desktop: gestori della voce naturale");
ok(/voceNaturale:scarica/.test(mainDesktop) && /voceNaturale:rimuoviVoce/.test(mainDesktop), "desktop: installazione e rimozione delle voci");
ok(/preload\.cjs/.test(mainDesktop), "desktop: carica il ponte preload");
ok(/sistema:impostazioniVoce/.test(mainDesktop), "desktop: apre le impostazioni vocali del sistema");
ok(/rhasspy\/piper\/releases/.test(mainDesktop) && /sha256/.test(mainDesktop), "desktop: motore verificato con impronta");
ok(/update:controlla/.test(mainDesktop) && /quitAndInstall/.test(mainDesktop), "desktop: aggiornamenti automatici");
ok(/electron-updater/.test(mainDesktop), "desktop: usa electron-updater");
ok(fs.existsSync(path.join(root, "desktop", "after-pack.cjs")), "manca desktop/after-pack.cjs");
const pacchettoAgg = JSON.parse(fs.readFileSync(path.join(root, "desktop", "package.json"), "utf8"));
ok(pacchettoAgg.build.afterPack === "after-pack.cjs", "pacchetto desktop: firma ad-hoc macOS");
ok(Array.isArray(pacchettoAgg.build.publish) && pacchettoAgg.build.publish[0].repo === "naturopata-digitale", "pacchetto desktop: release GitHub per gli aggiornamenti");
ok(!!(pacchettoAgg.dependencies && pacchettoAgg.dependencies["electron-updater"]), "pacchetto desktop: dipendenza electron-updater");
ok(/latest\*\.yml/.test(fs.readFileSync(path.join(root, ".github", "workflows", "desktop.yml"), "utf8")), "workflow desktop: latest*.yml nella release");
const cssStatus = fs.readFileSync(path.join(root, "assets", "css", "styles.css"), "utf8");
ok(/\.status-chip\[hidden\]\s*\{\s*display:\s*none/.test(cssStatus), "barra: il chip dell'aggiornamento può sparire");
const jsStatus = fs.readFileSync(path.join(root, "assets", "js", "app-status.js"), "utf8");
ok(/:\s*"Aggiornamento";/.test(jsStatus), "barra: nessuna etichetta a metà per l'aggiornamento");
ok(!/non si aggiorna da solo/.test(fs.readFileSync(path.join(root, "come-installare.html"), "utf8")), "guida: gli aggiornamenti automatici sono raccontati");
ok(/Scegliere la voce/.test(jsStatus), "pannello sistema: il pulsante porta alla scelta della voce");
ok(/voci naturali si installano dal pannello Voce/.test(jsStatus), "pannello sistema: le voci naturali sono raccontate");
ok(!/Neura resta muta/.test(jsStatus), "pannello sistema: non dice più che Neura resta muta");
ok(/Aggiungi voci/.test(jsStatus) && /Gestisci voci/.test(jsStatus), "pannello sistema: istruzioni per aggiungere voci al sistema");
ok(/did-fail-load/.test(mainDesktop) && /render-process-gone/.test(mainDesktop), "desktop: la finestra non resta vuota se la pagina non si carica");
ok(/generata sul tuo computer/.test(jsStatus), "pannello microfono: la voce in uscita è locale");
ok(/\.status-actions\s*\{[^}]*margin:[^}]*\.45rem/.test(cssStatus), "pannello: spazio fra i pulsanti e il titolo seguente");
ok(!/href="scarica\/"/.test(jsStatus), "pannello: il link ai download punta al file, non alla cartella");
ok(/href="scarica\/index\.html"/.test(jsStatus), "pannello: esiste il link alla pagina dei download");
const pagineSenzaCartelle = ["index.html", "come-installare.html", "scheda-rapida.html", "versioni.html", "scarica/index.html"];
const linkACartelle = [];
for (const f of pagineSenzaCartelle) {
  const s = fs.readFileSync(path.join(root, f), "utf8");
  for (const m of s.matchAll(/href="([^"#]*)/g)) {
    const h = m[1];
    if (h === "./" || h === "../" || h === "/" || /^[A-Za-z0-9._-]+\/$/.test(h)) linkACartelle.push(f + " -> " + h);
  }
}
ok(linkACartelle.length === 0, "pagine: nessun link a una cartella, solo a file (" + linkACartelle.slice(0, 3).join(", ") + ")");

ok(/function sezioneGuida\(id\)/.test(jsStatus) && /id === "win32"\) return "windows"/.test(jsStatus), "pannello Sistema: Windows porta alla sezione Windows della guida");
ok(/id === "macos"\) return "macos"/.test(jsStatus) && /id === "linux"\) return "linux"/.test(jsStatus), "pannello Sistema: macOS e Linux portano alla propria sezione");
ok(/come-installare\.html' \+\s*\(sezione \? "#" \+ sezione : ""\)/.test(jsStatus), "pannello Sistema: «Passaggio per passaggio» apre la guida alla sezione del sistema");
ok(/did-finish-load/.test(mainDesktop) && /caricata/.test(mainDesktop), "desktop: un link che non si apre non riporta alla home");
ok(/update:controlla/.test(fs.readFileSync(path.join(root, "desktop", "preload.cjs"), "utf8")), "preload: espone lo stato degli aggiornamenti");
const ponteDesktop = fs.readFileSync(path.join(root, "desktop", "preload.cjs"), "utf8");
ok(/contextBridge/.test(ponteDesktop) && /voceNaturale/.test(ponteDesktop), "preload: espone solo il ponte");
ok(!/require\("fs"\)|nodeIntegration/.test(ponteDesktop), "preload: nessun accesso a Node dalla pagina");
const pacchettoDesktop = JSON.parse(fs.readFileSync(path.join(root, "desktop", "package.json"), "utf8"));
["preload.cjs", "motore.cjs"].forEach((f) => {
  ok((pacchettoDesktop.build.files || []).indexOf(f) !== -1, "pacchetto desktop: manca " + f);
});
ok(/voiceNaturaleVoci/.test(neuraVoce) && /voiceImpostazioni/.test(neuraVoce), "Neura: voci naturali e impostazioni vocali");
ok(/Confronta le voci/.test(neuraVoce) && /Rimuovi le voci naturali/.test(neuraVoce), "Neura: confronto e rimozione delle voci naturali");
ok(index.indexOf('href="come-installare.html"') !== -1, "index: voce di menu alla guida");

// Fogli in PDF: esistono e dichiarano la versione dell'app
["Naturopata-Digitale-Come-si-installa.pdf", "Naturopata-Digitale-Scheda-rapida.pdf"].forEach((f) => {
  const percorso = path.join(root, "assets", "pdf", f);
  ok(fs.existsSync(percorso) && fs.statSync(percorso).size > 3000, "foglio mancante o troppo piccolo: " + f);
  if (!fs.existsSync(percorso)) return;
  ok(fs.readFileSync(percorso).includes("versione=" + versionePkg), f + ": versione non allineata a package.json");
});

// Workflow dei fogli e del controllo link
const foglioWf = fs.readFileSync(path.join(root, ".github", "workflows", "foglio.yml"), "utf8");
ok(/Naturopata-Digitale-Come-si-installa\.pdf/.test(foglioWf), "workflow fogli: allega la guida");
ok(/Naturopata-Digitale-Scheda-rapida\.pdf/.test(foglioWf), "workflow fogli: allega la scheda");
ok(/versione=\$versione/.test(foglioWf), "workflow fogli: controlla la versione dichiarata");
const linkWf = fs.readFileSync(path.join(root, ".github", "workflows", "link.yml"), "utf8");
ok(/check-links\.cjs/.test(linkWf), "workflow link: esegue il controllo");
ok(/schedule:/.test(linkWf), "workflow link: gira ogni giorno");
ok(/issues: write/.test(linkWf), "workflow link: può aprire la segnalazione");
ok(/Naturopata-Digitale-Sorgenti\.zip/.test(fs.readFileSync(path.join(root, ".github", "workflows", "desktop.yml"), "utf8")), "workflow desktop: allega i sorgenti");
ok(/Naturopata-Digitale-Come-si-installa\.pdf/.test(fs.readFileSync(path.join(root, "scripts", "check-links.cjs"), "utf8")), "check-links: controlla anche i fogli");
const pagesWorkflow = fs.readFileSync(path.join(root, ".github", "workflows", "pages.yml"), "utf8");
ok(/scarica/.test(pagesWorkflow), "workflow Pages: pagina di download inclusa");
["come-installare.html", "scheda-rapida.html", "versioni.html"].forEach((pagina) => {
  ok(pagesWorkflow.indexOf(pagina) !== -1, "workflow Pages: pubblica " + pagina);
});
const desktopWorkflow = fs.readFileSync(path.join(root, ".github", "workflows", "desktop.yml"), "utf8");
ok(/gh api "repos\/\$GITHUB_REPOSITORY\/releases\/tags\/\$TAG"/.test(desktopWorkflow), "workflow desktop: legge i digest dall'API");
ok(/sub\("\^sha256:"; ""\)/.test(desktopWorkflow), "workflow desktop: toglie il prefisso sha256:");
ok(/gh release upload "\$TAG" SHA256SUMS\.txt/.test(desktopWorkflow), "workflow desktop: allega SHA256SUMS.txt");
ok(/\n  checksums:/.test(desktopWorkflow), "workflow desktop: job delle impronte");
ok(/branches: \[main\]/.test(desktopWorkflow), "workflow desktop: parte anche sui push su main");
ok(/if: startsWith\(github\.ref, 'refs\/tags\/v'\) \|\| github\.event_name == 'workflow_dispatch'/.test(desktopWorkflow), "workflow desktop: niente build sui push su main");
ok(/caches\.match\(request\)\.then\(\(cached\) => cached \|\| caches\.match\("index\.html"\)\)/.test(sw), "service worker: fallback navigazione");
ok(/isAppShell/.test(sw), "service worker: le altre pagine non sovrascrivono la shell");

// Il controllo di link e pulsanti deve restare agganciato alla pubblicazione:
// se qualcuno lo toglie, ce ne accorgiamo qui e non con un link rotto.
const pacchettoRadice = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
ok(fs.existsSync(path.join(root, "tests", "interfacce.cjs")), "esiste tests/interfacce.cjs");
ok(/tests\/interfacce\.cjs/.test(pacchettoRadice.scripts.test), "npm test esegue il controllo di link e pulsanti");
const pagesControlli = fs.readFileSync(path.join(root, ".github", "workflows", "pages.yml"), "utf8");
ok(/npm test/.test(pagesControlli), "workflow Pages: i controlli girano prima di pubblicare");
ok(pagesControlli.indexOf("npm test") < pagesControlli.indexOf("Prepara il sito"), "workflow Pages: i controlli precedono la preparazione del sito");
const desktopControlli = fs.readFileSync(path.join(root, ".github", "workflows", "desktop.yml"), "utf8");
ok(/npm test/.test(desktopControlli), "workflow desktop: i controlli girano prima dei pacchetti");
ok(desktopControlli.indexOf("npm test") < desktopControlli.indexOf("prepare-desktop.cjs"), "workflow desktop: i controlli precedono la preparazione dei pacchetti");

// Statistiche di copertura
console.log("Domande per categoria: " + Object.keys(catCounts).map((k) => k + "=" + catCounts[k]).join(", "));
console.log("Piante alimentari: " + plants.filter((p) => p.fito && p.fito.commestibile).length + "/" + plants.length);
console.log("File del service worker verificati: " + shell.length);
console.log(checks + " controlli eseguiti, " + errors + " errori.");

if (errors) process.exit(1);
console.log("Tutto ok.");
