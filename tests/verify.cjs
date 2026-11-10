#!/usr/bin/env node
/* Verifica dei contenuti e della logica di Neura, senza browser. */
"use strict";

global.window = global;
const path = require("path");
const files = [
  "data-plants", "data-plants-2", "data-plants-3", "data-plants-4", "data-plants-5", "data-plants-6",
  "data-manual", "data-manual-2", "data-manual-3",
  "data-manual-4", "data-manual-5", "data-extra", "data-extra-2", "data-extra-3",
  "data-quiz", "data-quiz-2", "data-quiz-3", "data-quiz-4", "data-library", "data-saperi", "neura"
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

ok(plants.length === 70, "ci sono 70 piante");
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

// Ogni argomento del sito deve avere domande: funghi, spezierie, amari,
// estrazioni e tempo balsamico compaiono dopo la prima stesura dei quiz.
ok(cats.length === 8, "otto categorie di quiz (" + cats.length + ")");
ok(quiz.length >= 120, "almeno 120 domande (" + quiz.length + ")");
const testoQuiz = JSON.stringify(quiz).toLowerCase();
(NP.funghi || []).forEach((f) => ok(testoQuiz.indexOf(f.nome.toLowerCase()) !== -1, "fungo senza domande: " + f.nome));
["Casamari", "Santa Maria Novella", "Camaldoli", "Strega", "Fernet-Branca", "Montenegro", "Lucano", "Averna", "Carpano"].forEach((s) =>
  ok(testoQuiz.indexOf(s.toLowerCase()) !== -1, "spezieria senza domande: " + s)
);
["oleolito", "tintura madre", "sciroppo", "idrolato", "distillazione di alcol"].forEach((t) =>
  ok(testoQuiz.toLowerCase().indexOf(t) !== -1, "estrazione senza domande: " + t)
);
ok(/tempo balsamico|riposo|corteccia/i.test(testoQuiz), "tempo balsamico senza domande");
["boswellia", "ortosifon", "pelargonium", "rodiola", "withania"].forEach((id) => {
  const p = plants.find((x) => x.id === id);
  ok(!!p, "pianta nuova presente: " + id);
  if (p) ok(testoQuiz.indexOf(p.nome.toLowerCase()) !== -1, "pianta nuova senza domande: " + p.nome);
});

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
ok(NP.spezierie.length === 9, "spezierie e liquorerie: nove luoghi (" + NP.spezierie.length + ")");
const hostsSpezierie = {
  casamari: "abbaziadicasamari.it",
  "santa-maria-novella": "smnovella.com",
  camaldoli: "camaldoli.it",
  strega: "strega.it",
  "fernet-branca": "fernetbranca.com",
  montenegro: "amaromontenegro.com",
  "amaro-lucano": "amarolucano.it",
  averna: "amaroaverna.com",
  carpano: "carpano.com"
};
Object.keys(hostsSpezierie).forEach((id) => {
  const s = NP.spezierie.find((x) => x.id === id);
  ok(!!s, "spezieria " + id + ": scheda presente");
  if (s) ok((s.link || []).some((l) => l.u.indexOf(hostsSpezierie[id]) !== -1), "spezieria " + id + ": sito ufficiale " + hostsSpezierie[id]);
});
ok(NP.spezierie.every((s) => (s.link || []).every((l) => l.u.indexOf("http://") !== 0)), "spezierie: nessun collegamento non cifrato");
const amaroCats = new Set(NP.amariCategorie.map((c) => c.id));
ok(NP.amariCategorie.length >= 3, "amari: categorie");
ok(NP.amari.length >= 8, "amari: almeno otto schede (" + NP.amari.length + ")");
NP.amari.forEach((a) => {
  ok(amaroCats.has(a.categoria), "amaro " + a.id + ": categoria inesistente");
  ok((a.ingredienti || []).length >= 3, "amaro " + a.id + ": ingredienti insufficienti");
  ok(!!(a.storia && a.nota), "amaro " + a.id + ": storia o nota mancante");
});
ok(NP.amariIngredienti.length >= 6, "amari: ingredienti spiegati");
const normalizzaTesto = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const piantaCitata = (testo) => {
  const frase = " " + normalizzaTesto(testo) + " ";
  return plants.filter((p) => [p.nome, p.id].concat(p.nomi || []).some((n) => {
    const nome = normalizzaTesto(n);
    return nome.length >= 4 && frase.indexOf(" " + nome + " ") !== -1;
  }));
};
["genziana", "china", "angelica", "mirra", "cardo-santo"].forEach((id) => ok(plants.some((p) => p.id === id), "erbario: c'è la scheda di " + id));
NP.amariIngredienti.forEach((i) => ok(piantaCitata(i.nome).length === 1, "amari: " + i.nome + " rimanda a una sola scheda"));
NP.amari.forEach((a) => (a.ingredienti || []).forEach((x) => ok(piantaCitata(x).length <= 1, "amari: citazione senza ambiguità («" + x + "»)")));
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
ok(/#\/pianta\/genziana/.test(answer("quali amari contengono la genziana?")), "Neura collega l'ingrediente genziana alla sua scheda");
ok(/#\/pianta\/china/.test(answer("che cosa contiene la tintura imperiale?")), "Neura collega gli ingredienti dell'amaro alle schede");
ok(/Scheda completa/.test(answer("a cosa serve la genziana nell'amaro?")), "Neura propone la scheda della pianta citata in un amaro");
ok(answer("che cosa contiene la tintura imperiale?").indexOf('#/pianta/erbe') === -1, "Neura non collega ingredienti generici a piante inesistenti");
ok(/ossalat/i.test(answer("il chaga è sicuro?")), "Neura cita gli ossalati del chaga");
ok(/112|Centro Antiveleni|micologo/i.test(answer("come si raccolgono i funghi?")), "Neura mette la sicurezza davanti ai funghi");
ok(/#\/estrazioni/.test(answer("come si fa un oleolito?")), "Neura spiega gli oleoliti");
ok(/Strega/.test(answer("parlami del liquore Strega")), "Neura conosce la Strega di Benevento");
ok(/Fernet/.test(answer("che cosa è il Fernet-Branca?")), "Neura conosce il Fernet-Branca");
ok(/Averna/.test(answer("l'amaro Averna")), "Neura conosce l'Averna");
ok(/vietata|autorizzazion/i.test(answer("la distillazione in casa è legale?")), "Neura dice che la distillazione richiede autorizzazioni");
ok(/giugno/i.test(answer("qual è il tempo balsamico di giugno?")), "Neura risponde sul tempo balsamico");
ok(/ossalat/i.test((NP.neura.check("chaga", {}) || { items: [] }).items.map((i) => i.testo).join(" ")), "il controllo di sicurezza considera i funghi");
ok(NP.neura.search("reishi", 6).some((r) => r.doc.type === "fungo"), "la ricerca di Neura trova i funghi");
ok(NP.neura.suggestions.slice(0, 4).some((s) => /liquor/i.test(s)), "le domande iniziali di Neura includono le liquorerie");
ok(NP.neura.suggestions.length >= 8 && new Set(NP.neura.suggestions).size === NP.neura.suggestions.length, "domande iniziali di Neura senza duplicati");
ok(/Strega/.test(answer("quali liquori nascono dalle spezierie storiche?")), "Neura elenca le liquorerie partendo dalle spezierie");
ok(/Carpano/.test(answer("che liquori si producono nelle antiche spezierie?")), "Neura ricorda Carpano fra le spezierie");

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
ok(/function passiInstallazione\(id\)/.test(jsStatus), "pannello Sistema: i passaggi di installazione sono nel pannello");
ok(/Installazione passo per passo/.test(jsStatus), "pannello Sistema: mostra i passaggi senza aprire la guida");
ok(/Naturopata-Digitale-Windows-x64\.exe/.test(jsStatus) && /Naturopata-Digitale-Linux-amd64\.deb/.test(jsStatus), "pannello Sistema: indica il file giusto per Windows e Linux");
ok(/Aggiungi alla schermata Home/.test(jsStatus), "pannello Sistema: istruzioni per telefono e tablet");
ok(/ol\.status-steps/.test(cssStatus), "pannello Sistema: elenco numerato leggibile");
const jsAppPannelli = fs.readFileSync(path.join(root, "assets", "js", "app.js"), "utf8");
const jsViewsPannelli = fs.readFileSync(path.join(root, "assets", "js", "app-views.js"), "utf8");
const jsNeuraPannelli = fs.readFileSync(path.join(root, "assets", "js", "app-neura.js"), "utf8");
ok(/function portaAllAncora/.test(jsAppPannelli) && /ancora/.test(jsAppPannelli), "router: una rotta porta anche a una sezione");
[["#/neura#voce", "voce"], ["#/neura#chat", "chat"], ["#/sicurezza#numeri", "numeri"]].forEach(function (meta) {
  ok(jsStatus.indexOf(meta[0]) !== -1, "pannelli: il pulsante porta a " + meta[0]);
});
ok(/id="voce"/.test(jsNeuraPannelli) && /id="chat"/.test(jsNeuraPannelli), "Neura: le sezioni voce e chat hanno un'ancora");
ok(/id="numeri"/.test(jsViewsPannelli), "Sicurezza: i numeri utili hanno un'ancora");
ok(/sezioneGuida\(sistemaOperativo\(\)\.id\)/.test(jsStatus), "pannello Modo: «Come si installa» apre la sezione del sistema");
const bloccoRotte = (jsAppPannelli.match(/const ROUTES = \{([\s\S]*?)\n  \};/) || [])[1] || "";
Array.from(jsStatus.matchAll(/href="#\/([a-z0-9-]+)/g)).forEach(function (m) {
  ok(bloccoRotte.indexOf(m[1] + ":") !== -1, "pannelli: la rotta #/" + m[1] + " esiste");
});
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
["Naturopata-Digitale-Come-si-installa.pdf", "Naturopata-Digitale-Scheda-rapida.pdf", "Naturopata-Digitale-Lista-di-prova.pdf", "Naturopata-Digitale-Lista-di-prova-rapida.pdf", "Naturopata-Digitale-Prove-a-mano.pdf"].forEach((f) => {
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
ok(/Naturopata-Digitale-Lista-di-prova\.pdf/.test(foglioWf), "workflow fogli: allega la lista di prova");
ok(/Naturopata-Digitale-Lista-di-prova-rapida\.pdf/.test(foglioWf), "workflow fogli: allega anche la versione a una pagina");
// Il foglio di prova è parte del progetto come gli altri due: generatore in
// scripts, comando npm, versione presa da package.json, PDF in assets/pdf.
const listScript = path.join(root, "scripts", "build_lista_prova_pdf.py");
ok(fs.existsSync(listScript), "esiste scripts/build_lista_prova_pdf.py");
if (fs.existsSync(listScript)) {
  const sorgenteLista = fs.readFileSync(listScript, "utf8");
  ok(/versione_app\(\)/.test(sorgenteLista), "la lista di prova prende la versione da package.json");
  ok(/PDF_DIR/.test(sorgenteLista), "la lista di prova scrive in assets/pdf");
  ok(/OUT_RAPIDA/.test(sorgenteLista), "la lista di prova genera anche la versione a una pagina");
  ok(/storia_rapida/.test(sorgenteLista), "la versione rapida ha una storia sua");
  ok(!/versione 1\.3\.\d+|\b1\.3\.\d+\b/.test(sorgenteLista), "la lista di prova non porta versioni scritte a mano");
}
const scriptsFogli = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).scripts;
ok(/build_lista_prova_pdf\.py/.test(scriptsFogli["foglio:prova"] || ""), "npm run foglio:prova genera la lista di prova");
ok(/build_lista_prova_pdf\.py/.test(scriptsFogli.fogli || ""), "npm run fogli rigenera anche la lista di prova");
ok(/Lista-di-prova\.pdf/.test(fs.readFileSync(path.join(root, "scarica", "index.html"), "utf8")), "scarica: la lista di prova è fra i PDF");
ok(/Lista-di-prova-rapida\.pdf/.test(fs.readFileSync(path.join(root, "scarica", "index.html"), "utf8")), "scarica: c'è anche la versione a una pagina");
// Anche il foglio «Prove a mano» è un foglio del progetto: generatore,
// comando npm, allegato al tag e link nella pagina Scarica.
const proveScript = path.join(root, "scripts", "build_prove_pdf.py");
ok(fs.existsSync(proveScript), "esiste scripts/build_prove_pdf.py");
if (fs.existsSync(proveScript)) {
  const sorgenteProve = fs.readFileSync(proveScript, "utf8");
  ok(/versione_app\(\)/.test(sorgenteProve), "prove a mano: versione presa da package.json");
  ok(/PDF_DIR/.test(sorgenteProve), "prove a mano: scrive in assets/pdf");
  ok(!/\b1\.3\.\d+\b/.test(sorgenteProve), "prove a mano: nessuna versione scritta a mano");
}
ok(/build_prove_pdf\.py/.test(scriptsFogli.prove || ""), "npm run prove genera il foglio «Prove a mano»");
ok(/build_prove_pdf\.py/.test(scriptsFogli.fogli || ""), "npm run fogli rigenera anche «Prove a mano»");
ok(/Prove-a-mano\.pdf/.test(foglioWf), "workflow fogli: allega «Prove a mano»");
ok(/Prove-a-mano\.pdf/.test(fs.readFileSync(path.join(root, "scarica", "index.html"), "utf8")), "scarica: «Prove a mano» è fra i PDF");
ok(/Prove-a-mano\.pdf/.test(fs.readFileSync(path.join(root, "scripts", "check-links.cjs"), "utf8")), "check-links: controlla anche «Prove a mano»");
ok(/Prove-a-mano\.pdf/.test(fs.readFileSync(path.join(root, ".github", "workflows", "desktop.yml"), "utf8")), "workflow desktop: «Prove a mano» fra gli allegati attesi");
const linkWf = fs.readFileSync(path.join(root, ".github", "workflows", "link.yml"), "utf8");
ok(/check-links\.cjs/.test(linkWf), "workflow link: esegue il controllo");
ok(/schedule:/.test(linkWf), "workflow link: gira ogni giorno");
ok(/issues: write/.test(linkWf), "workflow link: può aprire la segnalazione");
ok(/Naturopata-Digitale-Sorgenti\.zip/.test(fs.readFileSync(path.join(root, ".github", "workflows", "desktop.yml"), "utf8")), "workflow desktop: allega i sorgenti");
ok(/Naturopata-Digitale-Come-si-installa\.pdf/.test(fs.readFileSync(path.join(root, "scripts", "check-links.cjs"), "utf8")), "check-links: controlla anche i fogli");
const sorgenteLink = fs.readFileSync(path.join(root, "scripts", "check-links.cjs"), "utf8");
ok(/function controllaEsterni/.test(sorgenteLink), "check-links: controlla i siti di riferimento");
ok(/function linkEsterni/.test(sorgenteLink), "check-links: raccoglie i link esterni dalle pagine");
ok(/--esterni/.test(sorgenteLink), "check-links: può controllare solo i link esterni");
ok(/"bloccato"/.test(sorgenteLink), "check-links: distingue i blocchi anti-bot dai link rotti");
ok(/Link non raggiungibili in:title/.test(linkWf), "workflow link: segnalazione estesa ai siti esterni");
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
ok(/link:esterni/.test(pacchettoRadice.scripts ? JSON.stringify(pacchettoRadice.scripts) : ""), "npm run link:esterni esiste");
// L'audit delle parafrasi deve restare uno strumento di revisione: se qualcuno
// lo aggancia a npm test, i suoi rilievi diventano bloccanti per errore.
ok(/audit:parafrasi/.test(pacchettoRadice.scripts ? JSON.stringify(pacchettoRadice.scripts) : ""), "esiste npm run audit:parafrasi");
ok(!/audit:parafrasi/.test(pacchettoRadice.scripts.test || ""), "l'audit delle parafrasi resta fuori dai test bloccanti");
// Gli esiti e le versioni di chiusura li scrive lo script: se spariscono dal
// report, rigenerarlo non deve più richiedere un intervento a mano.
const sorgenteAudit = fs.readFileSync(path.join(root, "scripts", "audit-parafrasi.cjs"), "utf8");
ok(/const ESITI = \[/.test(sorgenteAudit), "l'audit tiene la tabella degli esiti");
ok(sorgenteAudit.indexOf("Esiti e versioni di chiusura") !== -1, "l'audit scrive gli esiti nel report");
ok(/dataRoma/.test(sorgenteAudit), "l'audit scrive la data di generazione");
ok(fs.existsSync(path.join(root, "tests", "interfacce.cjs")), "esiste tests/interfacce.cjs");
ok(/tests\/interfacce\.cjs/.test(pacchettoRadice.scripts.test), "npm test esegue il controllo di link e pulsanti");
const pagesControlli = fs.readFileSync(path.join(root, ".github", "workflows", "pages.yml"), "utf8");
ok(/npm test/.test(pagesControlli), "workflow Pages: i controlli girano prima di pubblicare");
ok(pagesControlli.indexOf("npm test") < pagesControlli.indexOf("Prepara il sito"), "workflow Pages: i controlli precedono la preparazione del sito");
const desktopControlli = fs.readFileSync(path.join(root, ".github", "workflows", "desktop.yml"), "utf8");
ok(/npm test/.test(desktopControlli), "workflow desktop: i controlli girano prima dei pacchetti");
ok(desktopControlli.indexOf("npm test") < desktopControlli.indexOf("prepare-desktop.cjs"), "workflow desktop: i controlli precedono la preparazione dei pacchetti");

// Il backup datato deve restare un comando del progetto, non una procedura a
// memoria: se sparisce lo script o il collegamento npm, ce ne accorgiamo qui.
const backupScript = path.join(root, "scripts", "backup.cjs");
ok(fs.existsSync(backupScript), "esiste scripts/backup.cjs");
ok(pacchettoRadice.scripts.backup === "node scripts/backup.cjs", "npm run backup chiama lo script di backup");
ok(/npm run backup/.test(pacchettoRadice.scripts.rilascio || ""), "npm run rilascio crea anche il backup");
// Il backup deve restare automatico: un gancio post-commit lo rinnova a ogni
// commit, e npm ci lo reinstalla su un clone nuovo.
ok(pacchettoRadice.scripts.hook === "node scripts/installa-hook.cjs", "npm run hook installa il gancio del backup");
ok(/installa-hook/.test(pacchettoRadice.scripts.prepare || ""), "npm ci reinstalla il gancio del backup");
const installaHook = path.join(root, "scripts", "installa-hook.cjs");
ok(fs.existsSync(installaHook), "esiste scripts/installa-hook.cjs");
if (fs.existsSync(installaHook)) {
  const sorgenteHook = fs.readFileSync(installaHook, "utf8");
  ok(/post-commit/.test(sorgenteHook), "il gancio installato è post-commit");
  ok(/backup\.cjs/.test(sorgenteHook), "il gancio richiama lo script del backup");
  ok(/dentroIlProgetto|gianciReali|ganciReali/.test(sorgenteHook), "il gancio non si installa in un repository condiviso");
}
// «npm run salva» è la via che funziona anche nei worktree: commit, poi backup.
const salvaScript = path.join(root, "scripts", "salva.cjs");
ok(pacchettoRadice.scripts.salva === "node scripts/salva.cjs", "npm run salva esiste");
ok(fs.existsSync(salvaScript), "esiste scripts/salva.cjs");
if (fs.existsSync(salvaScript)) {
  const sorgenteSalva = fs.readFileSync(salvaScript, "utf8");
  ok(/backup\.cjs/.test(sorgenteSalva), "npm run salva finisce con il backup");
  ok(/commit/.test(sorgenteSalva), "npm run salva committa prima del backup");
}
if (fs.existsSync(backupScript)) {
  const sorgenteBackup = fs.readFileSync(backupScript, "utf8");
  ok(/LEGGIMI-BACKUP\.txt/.test(sorgenteBackup), "il backup scrive il LEGGIMI passo passo");
  ok(/INDICE-BACKUP\.txt/.test(sorgenteBackup), "il backup aggiorna l'indice storico");
  ok(/SHA256SUMS\.txt/.test(sorgenteBackup), "il backup genera il checksum dell'archivio");
  ok(/git", a|git archive|"archive"/.test(sorgenteBackup), "il backup archivia i file versionati");
  ok(/function scriviZip\(/.test(sorgenteBackup), "il backup scrive da sé l'archivio da scaricare");
  ok(/PREFIX \+ "-backup-" \+ data \+ "-v" \+ versione/.test(sorgenteBackup), "l'archivio da scaricare porta nome, data e versione");
  ok(/readdirSync\(ARTEFATTI\)/.test(sorgenteBackup), "in artifacts/ resta solo l'ultimo archivio da scaricare");
  ok(/while \(fs\.existsSync\(path\.join\(DEST, nomeCartella\)\)\)/.test(sorgenteBackup), "il backup non sovrascrive i salvataggi precedenti");
  ok(/PREFIX \+ "-" \+ data \+ "-v" \+ versione/.test(sorgenteBackup), "il nome del backup porta data e versione");
  // I report di verifica non sono versionati: se il backup non li copia, se ne
  // perdono le prove. Devono stare in documenti/, fuori dalla cartella del codice.
  ok(/reportDaSalvare/.test(sorgenteBackup), "il backup raccoglie i report di verifica");
  ok(/fs\.copyFileSync\(path\.join\(ARTEFATTI, d\.nome\), path\.join\(cartella, "documenti", d\.nome\)\)/.test(sorgenteBackup), "i report finiscono in documenti/, separati dal codice");
  ok(/v\[1\] === versione/.test(sorgenteBackup), "il backup scarta i report delle versioni passate");
  ok(/documenti: documenti\.map/.test(sorgenteBackup), "backup.json elenca i documenti inclusi");
  ok(/Documenti di verifica/.test(sorgenteBackup), "l'elenco file conta i documenti");
  // L'archivio non deve solo esistere: deve essere la copia dell'albero del
  // commit. Il confronto si fa sulle impronte Git dei singoli file.
  ok(/function confrontaArchivio\(/.test(sorgenteBackup), "il backup confronta l'archivio con l'albero di HEAD");
  ok(/0x06054b50/.test(sorgenteBackup), "il backup legge le voci dell'archivio da sé");
  ok(/non corrisponde a HEAD/.test(sorgenteBackup), "il backup avvisa se l'archivio non corrisponde a HEAD");
  ok(/verificaArchivio/.test(sorgenteBackup), "backup.json registra l'esito del confronto");
  ok(/!v\.nome\.endsWith\("\/"\)/.test(sorgenteBackup), "il confronto ignora le voci di cartella dello zip");
  // Il checkout Windows converte i fine riga in CRLF: il confronto li accetta
  // entrambi, altrimenti la stessa guardia passa su Linux e fallisce lì.
  ok(/documenti\/\r?\n     I report delle verifiche/.test(sorgenteBackup), "il LEGGIMI spiega la cartella documenti");
}
ok(/^\/backup\/$/m.test(fs.readFileSync(path.join(root, ".gitignore"), "utf8")), "la cartella dei backup resta fuori dal repository");

// Coerenza tra quiz e schede: una domanda che nomina la pianta non deve
// affermare il contrario di quello che dice la sua scheda su gravidanza,
// allattamento, neonati, commestibilità, livello di rischio e raccolta.
// Si guardano solo affermazioni esplicite, per non inseguire le sfumature:
// la domanda entra nel confronto se il nome (o il genere latino, o un
// sinonimo) compare nella domanda o nella risposta corretta, come fa l'app
// quando costruisce il quiz della pianta.
const normTesto = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const MESI_NOME = { gennaio: 1, febbraio: 2, marzo: 3, aprile: 4, maggio: 5, giugno: 6, luglio: 7, agosto: 8, settembre: 9, ottobre: 10, novembre: 11, dicembre: 12 };
const STAGIONI = { primavera: [3, 4, 5], estate: [6, 7, 8], autunno: [9, 10, 11], inverno: [12, 1, 2] };
const VIETATO = /evitar|sconsigli|controindicat|non (usare|assumere|somministrare)|dannos|rischio/;
let coerenzaEsaminate = 0;
const incoerenze = [];
const domandeAbbinate = new Set();

function chiaviPianta(p) {
  return [p.nome, (p.latino || "").split(" ")[0]]
    .concat(p.nomi || [])
    .map(normTesto)
    .filter((k) => k.length > 3);
}

// Confronto per parole intere: senza confini «china» entrerebbe dentro
// «echinacea» e la domanda finirebbe sotto la scheda sbagliata.
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const contieneParola = (testo, chiave) =>
  new RegExp("(^|[^a-z0-9])" + escapeRe(chiave) + "($|[^a-z0-9])").test(testo);

function nominaPianta(q, p) {
  const testo = normTesto(q.q) + " " + normTesto(q.o[q.r]);
  return chiaviPianta(p).some((k) => contieneParola(testo, k));
}

// Restituisce l'elenco dei motivi per cui la domanda contraddice la scheda.
function incoerenzeTra(q, p) {
  const motivi = [];
  const chiavi = chiaviPianta(p);
  const domanda = normTesto(q.q);
  const risposta = normTesto(q.o[q.r]);
  const testo = domanda + " " + risposta;

  const campo = (valore, parole, etichetta) => {
    if (!VIETATO.test(normTesto(valore))) return;
    const parola = parole.find((w) => testo.indexOf(w) !== -1);
    if (!parola) return;
    const sicuro = new RegExp("(sicur|senza rischi|senza problemi|non ha controindicazioni)[^.]{0,40}" + parola + "|" + parola + "[^.]{0,40}(sicur|senza rischi|senza problemi|non ha controindicazioni)");
    if (sicuro.test(risposta)) motivi.push("la scheda la sconsiglia " + etichetta + ", la risposta la dice sicura");
  };
  campo(p.sicurezza.gravidanza, ["gravidanza"], "in gravidanza");
  campo(p.sicurezza.allattamento, ["allattamento", "allatta"], "in allattamento");
  campo(p.sicurezza.bambini, ["neonati", "lattanti"], "ai neonati");

  if (/parere|medico|pediatra/.test(normTesto(p.sicurezza.bambini)) && /senza (parere|problemi)/.test(risposta) && /bambin|neonat|lattant/.test(testo))
    motivi.push("la scheda chiede il parere del medico per i bambini, la risposta li dice senza problemi");

  if (p.fito && p.fito.commestibile === false && /(si mangia|si consuma|e commestibile|in cucina|ottim[ao] (in|per))/.test(risposta) && !/non (si mangia|e commestibile|commestibil)/.test(risposta))
    motivi.push("la scheda la segna non commestibile, la risposta la propone in cucina");

  if (p.sicurezza.livello === "rosso" && /(e sicur|senza rischi|innocu|non ha controindicazioni)/.test(risposta))
    motivi.push("la scheda segna rischio alto, la risposta la dice sicura");

  // La raccolta si controlla solo quando la pianta è nominata nella domanda
  // stessa: un mese citato in una risposta può riguardare un'altra specie.
  if (chiavi.some((k) => contieneParola(domanda, k)) && /raccolt|si raccogli|si cogli|si raccolgono|si colgono/.test(domanda)) {
    const mesi = new Set();
    Object.keys(MESI_NOME).forEach((m) => { if (domanda.indexOf(m) !== -1) mesi.add(MESI_NOME[m]); });
    Object.keys(STAGIONI).forEach((s) => { if (domanda.indexOf(s) !== -1) STAGIONI[s].forEach((m) => mesi.add(m)); });
    if (mesi.size && [...mesi].every((m) => p.raccolta.mesi.indexOf(m) === -1))
      motivi.push("la domanda indica mesi fuori dalla raccolta della scheda (" + p.raccolta.mesi.join(",") + ")");
  }

  return motivi;
}

plants.forEach((p) => {
  quiz.forEach((q) => {
    if (!nominaPianta(q, p)) return;
    coerenzaEsaminate++;
    domandeAbbinate.add(q.id);
    incoerenzeTra(q, p).forEach((m) => incoerenze.push(q.id + " / " + p.id + ": " + m));
  });
});

// Autotest: il controllo deve scattare su una contraddizione vera e tacere su
// una risposta coerente, altrimenti sarebbe un controllo che non controlla.
const provaPianta = Object.assign({}, plants[0], {
  sicurezza: Object.assign({}, plants[0].sicurezza, { gravidanza: "Da evitare in gravidanza.", bambini: "Solo con parere pediatrico." }),
  fito: Object.assign({}, plants[0].fito || {}, { commestibile: false })
});
const nomeProva = plants[0].nome.toLowerCase();
ok(incoerenzeTra({ id: "prova", q: "La " + nomeProva + " in gravidanza:", o: ["È sicura in gravidanza", "Va evitata", "Solo dopo i pasti", "Non esiste"], r: 0, e: "Prova." }, provaPianta).length > 0, "il controllo riconosce una gravidanza dichiarata sicura contro la scheda");
ok(incoerenzeTra({ id: "prova", q: "La " + nomeProva + " in gravidanza:", o: ["Va evitata", "È sicura in gravidanza", "Solo dopo i pasti", "Non esiste"], r: 0, e: "Prova." }, provaPianta).length === 0, "il controllo non segnala una risposta coerente con la scheda");
ok(incoerenzeTra({ id: "prova", q: "La " + nomeProva + " si mangia in insalata?", o: ["Sì, in cucina", "No", "Solo cotta", "Solo secca"], r: 0, e: "Prova." }, provaPianta).length > 0, "il controllo riconosce una pianta non commestibile proposta in cucina");
ok(contieneParola(normTesto("La China Martini contiene china"), "china"), "il confronto riconosce la china quando è nominata");
ok(!contieneParola(normTesto("L'echinacea è un'asteracea"), "china"), "il confronto non scambia l'echinacea per la china");

incoerenze.forEach((m) => console.error("! incoerenza: " + m));
console.log("Coerenza quiz/schede: " + coerenzaEsaminate + " abbinamenti domanda-pianta (" + domandeAbbinate.size + " domande), " + incoerenze.length + " incoerenze, 5 autotest.");
ok(incoerenze.length === 0, incoerenze.length + " domande contraddicono la scheda della stessa pianta");

/* --- Durate di conservazione: quiz e schede devono dire lo stesso del manuale ---
   Il manuale è la fonte: la sua riga «Durata indicativa: foglie e fiori 6–12 mesi;
   radici e cortecce 12–24 mesi; oleoliti 3–6 mesi» viene letta e usata come metro.
   Ogni durata di conservazione citata in una domanda o in una scheda deve
   sovrapporsi a quella del manuale: è così che un residuo come e1 («circa un
   anno» per l'oleolito) non può rientrare senza far fallire il test. */
const testoPiatto = (s) => String(s || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const IN_MESI = { giorni: 1 / 31, settimane: 7 / 31, mesi: 1, anni: 12 };

function durateIn(testo) {
  const trovate = [];
  const re = /(\d{1,2})\s*[–\-]\s*(\d{1,2})\s*(giorni|settimane|mesi|anni)|\b(\d{1,2})\s*(giorni|settimane|mesi|anni)\b/gi;
  let m;
  while ((m = re.exec(testo))) {
    if (m[1]) trovate.push({ min: +m[1], max: +m[2], unita: m[3].toLowerCase(), testo: m[0] });
    else trovate.push({ min: +m[4], max: +m[4], unita: m[5].toLowerCase(), testo: m[0] });
  }
  return trovate;
}
const inMesi = (d) => ({ min: d.min * IN_MESI[d.unita], max: d.max * IN_MESI[d.unita] });
const siSovrappongono = (a, b) => a.min <= b.max + 0.01 && b.min <= a.max + 0.01;

/* Vale la durata della conservazione, non quella della preparazione: in
   «30-40 giorni di macerazione, poi si conserva 3–6 mesi» conta solo la seconda. */
function durateDiConservazione(testo) {
  const out = [];
  const re = /(si conserva|si conservano|conservazione|conservat[oaie]|dura|durata|entro)\b[^.]{0,150}/gi;
  let m;
  while ((m = re.exec(testo))) durateIn(m[0]).forEach((d) => out.push(d));
  return out;
}

const capitoloConservazione = manual.find((c) => c.id === "raccolta-e-conservazione");
const rigaDurate = (/Durata indicativa:([^.]+)\./.exec(testoPiatto(capitoloConservazione && capitoloConservazione.html)) || [])[1] || "";
const durataManuale = {};
rigaDurate.split(";").forEach((pezzo) => {
  const etichetta = pezzo.replace(/[\d–-].*$/, "").trim().toLowerCase();
  const d = durateIn(pezzo)[0];
  if (etichetta && d) durataManuale[etichetta] = d;
});
ok(!!durataManuale["oleoliti"], "manuale: la durata degli oleoliti si legge (\"" + rigaDurate.trim().slice(0, 50) + "\")");
ok(!!durataManuale["foglie e fiori"] && !!durataManuale["radici e cortecce"], "manuale: durate di foglie, fiori, radici e cortecce");

const confronti = [];
quiz.forEach((q) => {
  const testo = testoPiatto([q.q, q.o[q.r], q.e].join(" "));
  [["oleoliti", /oleolit/i], ["foglie e fiori", /foglie e fiori/i], ["radici e cortecce", /radici e cortecce/i]].forEach(([voce, re]) => {
    if (!re.test(testo)) return;
    durateDiConservazione(testo).forEach((d) => confronti.push({ dove: "quiz " + q.id, voce, durata: d }));
  });
});
(NP.estrazioni || []).forEach((e) => {
  if (!/oleolito/i.test(e.id)) return;
  const d = durateIn(testoPiatto(e.conservazione))[0] || null;
  confronti.push({ dove: "scheda " + e.id, voce: "oleoliti", durata: d });
});

ok(confronti.length >= 4, "durate di conservazione da confrontare (" + confronti.length + ")");
confronti.forEach((c) => {
  if (!c.durata) { ok(false, c.dove + ": durata di conservazione non leggibile"); return; }
  const metro = durataManuale[c.voce];
  if (!metro) return;
  ok(siSovrappongono(inMesi(c.durata), inMesi(metro)), c.dove + ": «" + c.durata.testo + "» contro il manuale «" + metro.testo + "»");
});

// Autotest: il confronto deve scattare su un residuo e tacere su un valore coerente.
const metroOleoliti = inMesi(durataManuale["oleoliti"] || { min: 3, max: 6, unita: "mesi" });
const coerenteConOleoliti = (testo) => {
  const d = durateIn(testo)[0];
  return !!d && siSovrappongono(inMesi(d), metroOleoliti);
};
ok(coerenteConOleoliti("3–6 mesi"), "durate: 3–6 mesi è coerente con il manuale");
ok(!coerenteConOleoliti("circa 12 mesi"), "durate: 12 mesi per l'oleolito è segnalato come residuo");
ok(!coerenteConOleoliti("pochi giorni"), "durate: pochi giorni per l'oleolito è segnalato come residuo");
ok(durateDiConservazione("30-40 giorni di macerazione, poi si conserva 3–6 mesi").length === 1, "durate: la macerazione non viene scambiata per conservazione");
console.log("Durate di conservazione: " + confronti.length + " confronti quiz/schede contro il manuale (" + Object.keys(durataManuale).join(", ") + "), 4 autotest.");

/* --- Soglia della liquirizia: scheda e quiz devono citare le stesse cifre ---
   La liquirizia è l'unica pianta per cui il quiz nomina un'istituzione con una
   soglia propria (l'ANSES, più prudente dell'EMA). Le due pagine possono
   divergere senza che nessuna delle due sia incoerente con se stessa: qui si
   confrontano le cifre in mg e gli enti citati, in entrambe le direzioni. */
function soglieMg(testo) {
  const trovate = [];
  const re = /(\d{1,4}(?:[.,]\d+)?)\s*mg\b(?!\s*\/\s*kg)/gi;
  let m;
  while ((m = re.exec(testoPiatto(testo)))) trovate.push(Number(m[1].replace(",", ".")));
  return trovate;
}
const ENTI_SOGLIA = ["EMA", "ANSES", "EFSA", "OMS", "WHO", "ESCOP", "Farmacopea"];
const entiCitati = (testo) => ENTI_SOGLIA.filter((e) => new RegExp("\\b" + e + "\\b", "i").test(testoPiatto(testo)));

/* Restituisce solo le divergenze: insiemi vuoti = scheda e quiz concordano. */
function divergenzeSoglia(nota, spiegazione, fonti) {
  const scheda = [...new Set(soglieMg(nota))].sort((a, b) => a - b);
  const quizS = [...new Set(soglieMg(spiegazione))].sort((a, b) => a - b);
  const documentazione = (nota || "") + " " + (fonti || []).map((f) => f.t).join(" ");
  return {
    scheda,
    quiz: quizS,
    soloQuiz: quizS.filter((v) => scheda.indexOf(v) === -1),
    soloScheda: scheda.filter((v) => quizS.indexOf(v) === -1),
    entiMancanti: entiCitati(spiegazione).filter((e) => entiCitati(documentazione).indexOf(e) === -1)
  };
}

const liquirizia = plants.find((p) => p.id === "liquirizia");
const p7 = quiz.find((q) => q.id === "p7");
ok(!!(liquirizia && p7), "liquirizia: la scheda e la domanda p7 esistono");
if (liquirizia && p7) {
  const soglia = divergenzeSoglia(liquirizia.sicurezza.nota, p7.e, liquirizia.fonti);
  ok(soglia.scheda.length >= 2, "liquirizia: la scheda nomina le due soglie (" + soglia.scheda.join(" e ") + " mg)");
  ok(soglia.soloQuiz.length === 0, "liquirizia: il quiz cita " + soglia.soloQuiz.join(", ") + " mg che la scheda non riporta");
  ok(soglia.soloScheda.length === 0, "liquirizia: la scheda cita " + soglia.soloScheda.join(", ") + " mg che il quiz non riporta");
  ok(soglia.entiMancanti.length === 0, "liquirizia: la scheda non documenta " + soglia.entiMancanti.join(", ") + " citati dal quiz");
  console.log("Soglia della liquirizia: " + soglia.scheda.join(" + ") + " mg nella scheda, " + soglia.quiz.join(" + ") + " mg nel quiz (p7), 5 autotest.");
}

// Autotest: la guardia deve scattare su una divergenza e tacere su testi coerenti.
const notaProva = "L'EMA indica di non superare 100 mg di glicirrizina al giorno; l'ANSES si ferma a 10 mg.";
ok(divergenzeSoglia(notaProva, "Non superare 100 mg di glicirrizina; l'ANSES indica 10 mg.", []).soloQuiz.length === 0, "soglie: due testi coerenti non divergono");
ok(divergenzeSoglia(notaProva, "Non superare 100 mg di glicirrizina; l'ANSES indica 5 mg.", []).soloQuiz.length === 1, "soglie: una cifra diversa nel quiz viene segnalata");
ok(divergenzeSoglia(notaProva, "Non superare 40 mg di glicirrizina.", []).soloScheda.length === 2, "soglie: le cifre della scheda assenti dal quiz vengono segnalate");
ok(divergenzeSoglia("Non superare 100 mg di glicirrizina.", "L'ANSES indica 10 mg.", []).entiMancanti.indexOf("ANSES") !== -1, "soglie: l'ente citato dal quiz deve essere documentato nella scheda");
ok(divergenzeSoglia(notaProva, "L'ANSES indica 10 mg per 70 kg, cioè 0,14 mg/kg.", []).soloQuiz.length === 0, "soglie: il valore per chilo non viene scambiato per una soglia");

/* --- Dosi: le quantità in g e mg del quiz devono esistere nella scheda ---
   Una domanda che nomina una pianta e cita una quantità deve ritrovare la
   stessa quantità, o un intervallo che la contiene, nella scheda di quella
   pianta: è così che un «1–2 g» nel quiz e un «0,5–1 g» nella scheda non
   possono convivere. I grammi si portano a milligrammi, così «0,5 g» e
   «500 mg» risultano la stessa dose; i millilitri si confrontano solo con i
   millilitri, perché sono il volume d'acqua e non la quantità di droga. */
function quantitaIn(testo) {
  const trovate = [];
  const re = /(\d{1,4}(?:[.,]\d+)?)\s*(?:[–-]\s*(\d{1,4}(?:[.,]\d+)?))?\s*(milligrammi|mg|grammi|g|ml)\b/gi;
  let m;
  while ((m = re.exec(testoPiatto(testo)))) {
    const numero = (v) => Number(String(v).replace(",", "."));
    const grammi = /^(g|grammi)$/i.test(m[3]);
    const fattore = grammi ? 1000 : 1;
    const a = numero(m[1]) * fattore;
    const b = m[2] ? numero(m[2]) * fattore : a;
    trovate.push({
      min: Math.min(a, b),
      max: Math.max(a, b),
      unita: grammi ? "mg" : /^ml$/i.test(m[3]) ? "ml" : "mg",
      testo: m[0].replace(/\s+/g, " ")
    });
  }
  return trovate;
}
const siToccano = (a, b) => a.unita === b.unita && a.min <= b.max + 0.001 && b.min <= a.max + 0.001;
const dosiDiscordanti = (quantita, scheda) => quantita.filter((x) => !scheda.some((y) => siToccano(x, y)));
const testoScheda = (p) => testoPiatto(Object.keys(p || {}).map((k) => (typeof p[k] === "string" ? p[k] : JSON.stringify(p[k] || ""))).join(" "));

const confrontiDosi = [];
quiz.forEach((q) => {
  const testoDomanda = testoPiatto([q.q, q.o[q.r], q.e].join(" "));
  const quantita = quantitaIn(testoDomanda);
  if (!quantita.length) return;
  piantaCitata(testoDomanda).forEach((p) => quantita.forEach((x) => confrontiDosi.push({ dove: "quiz " + q.id, pianta: p.id, x })));
});
ok(confrontiDosi.length >= 1, "dosi: almeno una quantità da confrontare (" + confrontiDosi.length + ")");

let dosiIncoerenti = 0;
confrontiDosi.forEach((c) => {
  const p = plants.find((x) => x.id === c.pianta);
  if (!p) return;
  const mancanti = dosiDiscordanti([c.x], quantitaIn(testoScheda(p)));
  if (mancanti.length) dosiIncoerenti++;
  ok(!mancanti.length, c.dove + "/" + c.pianta + ": «" + c.x.testo + "» non compare nella scheda");
});
console.log("Dosi quiz/schede: " + confrontiDosi.length + " quantità confrontate, " + dosiIncoerenti + " discordanti, 5 autotest.");

// Autotest: la guardia deve leggere le dosi, unificare g e mg e tacere su
// intervalli che si toccano.
ok(quantitaIn("1–2 g in 200 ml").length === 2, "dosi: intervallo di droga e volume d'acqua letti");
ok(siToccano(quantitaIn("0,5 g")[0], quantitaIn("500 mg")[0]), "dosi: 0,5 g e 500 mg sono la stessa dose");
ok(dosiDiscordanti(quantitaIn("1–2 g"), quantitaIn("0,5–1 g")).length === 0, "dosi: intervalli che si toccano non sono discordanti");
ok(dosiDiscordanti(quantitaIn("2 g"), quantitaIn("0,5–1 g")).length === 1, "dosi: una quantità fuori intervallo viene segnalata");
ok(dosiDiscordanti(quantitaIn("10 ml"), quantitaIn("200 ml")).length === 1, "dosi: i millilitri non si confondono con i grammi");

/* --- Preparazioni: stesse quantità per la stessa forma d'uso ---
   Una scheda descrive più preparazioni, ognuna con le sue quantità: infuso,
   decotto, oleolito. Confrontare una domanda con l'intera scheda lascia
   passare un errore, perché «3–4 g in infuso» può ritrovare i suoi grammi nel
   decotto della stessa pianta. Qui il confronto avviene solo fra la domanda e
   le preparazioni che citano la stessa forma d'uso, in tutte e due le
   direzioni: le quantità della domanda devono stare nella preparazione, e
   quelle della preparazione devono essere citate dalle domande sulla stessa
   forma. Se per una forma non esiste nessuna domanda, non c'è nulla da
   confrontare e resta la guardia generale sulle dosi. */
const FORME_USO = [
  ["infuso", /\binfus/], ["decotto", /\bdecott/], ["macerato", /\bmacerat/],
  ["tintura", /\btintur/], ["oleolito", /\boleolit/], ["cataplasma", /\bcataplasm/],
  ["sciroppo", /\bsciropp/], ["estratto secco", /\bestratt[oi] secc/],
  ["polvere", /\bpolver/], ["olio essenziale", /\boli[oi] essenzial/],
  ["succo", /\bsucch/], ["impacco", /\bimpacc/], ["collutorio", /\bcollutori/],
  ["lavaggio", /\blavagg/], ["frizione", /\bfrizion/], ["bagno", /\bbagn[oi]\b/]
];
const formeIn = (testo) => FORME_USO.filter((f) => f[1].test(testoPiatto(testo).toLowerCase())).map((f) => f[0]);
const testiPreparazione = (pr) => (pr.ricetta || "") + " " + (pr.dose || "");
const testoDomanda = (q) => [q.q, q.o[q.r], q.e].join(" ");

const preparazioniConDosi = [];
plants.forEach((p) => (p.preparazioni || []).forEach((pr) => {
  const quantita = quantitaIn(testiPreparazione(pr));
  const forme = formeIn(pr.nome || "");
  if (quantita.length && forme.length) preparazioniConDosi.push({ pianta: p.id, nome: pr.nome, forme: forme, quantita: quantita });
}));
ok(preparazioniConDosi.length >= 20, "preparazioni: le schede descrivono dosi per forma d'uso (" + preparazioniConDosi.length + ")");

const domandeConDosi = quiz.map((q) => {
  const testo = testoDomanda(q);
  return { id: q.id, piante: piantaCitata(testo).map((p) => p.id), forme: formeIn(testo), quantita: quantitaIn(testo) };
}).filter((d) => d.quantita.length);

const stessaForma = (a, b) => a.some((f) => b.indexOf(f) !== -1);
let confrontiPreparazioni = 0, discordanzePreparazioni = 0, coppiePreparazioni = 0, quantitaNonCitate = 0;

domandeConDosi.forEach((d) => {
  if (!d.forme.length) return;
  preparazioniConDosi
    .filter((pr) => d.piante.indexOf(pr.pianta) !== -1 && stessaForma(pr.forme, d.forme))
    .forEach((pr) => {
      const mancanti = dosiDiscordanti(d.quantita, pr.quantita);
      confrontiPreparazioni += d.quantita.length;
      discordanzePreparazioni += mancanti.length;
      ok(!mancanti.length, "quiz " + d.id + "/" + pr.pianta + " («" + pr.nome + "»): «" + mancanti.map((x) => x.testo).join(", ") + "» non compare nella preparazione");
    });
});

preparazioniConDosi.forEach((pr) => {
  const domande = domandeConDosi.filter((d) => d.piante.indexOf(pr.pianta) !== -1 && stessaForma(pr.forme, d.forme));
  if (!domande.length) return;
  coppiePreparazioni++;
  const citate = [].concat(...domande.map((d) => d.quantita));
  const mancanti = dosiDiscordanti(pr.quantita, citate);
  quantitaNonCitate += mancanti.length;
  ok(!mancanti.length, "scheda " + pr.pianta + " («" + pr.nome + "»): «" + mancanti.map((x) => x.testo).join(", ") + "» non compare nelle domande sulla stessa forma d'uso (" + domande.map((d) => d.id).join(", ") + ")");
});

console.log("Preparazioni quiz/schede: " + confrontiPreparazioni + " quantità confrontate sulla stessa forma d'uso (" + discordanzePreparazioni + " discordanti), " + coppiePreparazioni + " " + (coppiePreparazioni === 1 ? "coppia" : "coppie") + " scheda/domande con " + quantitaNonCitate + " quantità non citate, 6 autotest.");

ok(formeIn("Infuso di foglie").indexOf("infuso") !== -1 && formeIn("Infuso di foglie").indexOf("decotto") === -1, "forme: l'infuso non si confonde con il decotto");
ok(formeIn("Oleolito di iperico").indexOf("oleolito") !== -1 && formeIn("Oleolito di iperico").indexOf("olio essenziale") === -1, "forme: l'oleolito non è un olio essenziale");
ok(dosiDiscordanti(quantitaIn("3–4 g in 200 ml"), quantitaIn("0,5–1 g in 200 ml")).length === 1, "preparazioni: una dose diversa nella stessa forma viene segnalata");
ok(dosiDiscordanti(quantitaIn("0,5–1 g in 200 ml"), quantitaIn("0,5–1 g in 200 ml")).length === 0, "preparazioni: dose identica non è una discordanza");
ok(dosiDiscordanti(quantitaIn("0,5–1 g in 200 ml"), quantitaIn("0,5–1 g in 150 ml")).length === 1, "preparazioni: il volume d'acqua non citato viene segnalato");
ok(dosiDiscordanti(quantitaIn("0,5–1 g"), quantitaIn("500 mg–1 g")).length === 0, "preparazioni: grammi e milligrammi restano la stessa dose");

// Statistiche di copertura
console.log("Domande per categoria: " + Object.keys(catCounts).map((k) => k + "=" + catCounts[k]).join(", "));
console.log("Piante alimentari: " + plants.filter((p) => p.fito && p.fito.commestibile).length + "/" + plants.length);
console.log("File del service worker verificati: " + shell.length);
console.log(checks + " controlli eseguiti, " + errors + " errori.");

if (errors) process.exit(1);
console.log("Tutto ok.");
