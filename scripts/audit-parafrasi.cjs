#!/usr/bin/env node
/* Audit non bloccante delle parafrasi pericolose.
   Cerca domande che non contraddicono la scheda in modo esplicito (quello lo
   fa npm test) ma la contraddicono girandoci intorno: sicurezza affermata con
   altre parole e parti usate diverse da quelle della scheda.
   Scrive un report e non esce mai in errore: non è un test bloccante.
   Uso: npm run audit:parafrasi */
"use strict";

const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
process.chdir(root);
global.window = global;

[
  "data-plants", "data-plants-2", "data-plants-3", "data-plants-4", "data-plants-5", "data-plants-6",
  "data-manual", "data-manual-2", "data-manual-3", "data-manual-4", "data-manual-5",
  "data-extra", "data-extra-2", "data-extra-3",
  "data-quiz", "data-quiz-2", "data-quiz-3", "data-quiz-4", "data-library", "data-saperi"
].forEach((f) => require(path.join(root, "assets", "js", f + ".js")));
const NP = global.NP;
const { plants, quiz } = NP;
const versione = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).version;

const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const piatto = (s) => String(s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const parola = (testo, k) => new RegExp("(^|[^a-z0-9])" + escapeRe(k) + "($|[^a-z0-9])").test(testo);

/* ---------- chi è la pianta della domanda ----------
   Il nome completo batte un sinonimo, che batte il solo genere latino: senza
   questa gerarchia «petali rosa-violacei» della malva finiva sotto la rosa. */
function livelloNome(p, testo) {
  const nome = norm(p.nome);
  if (nome && parola(testo, nome)) return 3;
  if ((p.nomi || []).some((n) => norm(n).length > 3 && parola(testo, norm(n)))) return 2;
  const genere = norm((p.latino || "").split(" ")[0]);
  if (genere.length > 3 && parola(testo, genere)) return 1;
  return 0;
}
function piantaDi(q) {
  const testo = norm(q.q) + " " + norm(q.o[q.r]);
  const trovati = plants.map((p) => ({ p, l: livelloNome(p, testo) })).filter((x) => x.l);
  if (!trovati.length) return [];
  const massimo = Math.max.apply(null, trovati.map((x) => x.l));
  return trovati.filter((x) => x.l === massimo).map((x) => x.p);
}

/* ---------- sicurezza affermata con altre parole ---------- */
const AFFERMAZIONI = [
  [/senza (problemi|rischi|effetti|controindicazioni|cautele|particolari precauzioni)/, "dice «senza problemi»"],
  [/(del tutto |assolutamente |perfettamente )?sicur/, "dice «sicura»"],
  [/innocu/, "dice «innocua»"],
  [/(ben|molto bene) tollerat/, "dice «ben tollerata»"],
  [/(non ha|senza) (effetti collaterali|effetti avversi|conseguenze)/, "nega gli effetti avversi"],
  [/(nessun|zero) (rischio|problema|effetto|controindicazione)/, "nega i rischi"],
  [/(va bene|si pu[oò] usare|si pu[oò] assumere|si pu[oò] dare) (anche )?(in gravidanza|in allattamento|ai bambini|ai neonati|ai lattanti)/, "la propone in gravidanza, allattamento o ai bambini"],
  [/(adatt|indicat)[ao] (anche )?(a tutti|ai bambini|in gravidanza|in allattamento|a chiunque)/, "la dice adatta a tutti"],
  [/(pu[oò] essere usata|si pu[oò] usare|si pu[oò] prendere) (liberamente|senza limiti|a lungo)/, "uso senza limiti"],
  [/(naturale)[^.]{0,30}(quindi|perci[oò])[^.]{0,20}(sicur|senza rischi)/, "«naturale quindi sicuro»"]
];
const CAUTELA = /evitar|sconsigli|controindicat|non (usare|assumere|somministrare)|dannos|rischio|vietat|tossic|attenzione|parere/;

function sicurezzaAffermata(q, p) {
  const motivi = [];
  const risposta = norm(q.o[q.r]);
  const scheda = norm(piatto(JSON.stringify([p.sicurezza, p.fito, p.evidenza])));
  if (!CAUTELA.test(scheda)) return motivi;
  AFFERMAZIONI.forEach(([re, etichetta]) => {
    if (re.test(risposta)) motivi.push({ etichetta, scheda: (p.sicurezza && (p.sicurezza.nota || p.sicurezza.gravidanza)) || "" });
  });
  return motivi;
}

/* ---------- parti usate ---------- */
const PARTI = [
  ["foglia", /\bfoglie?\b|\bfogliame\b/],
  ["fiore", /\bfior[ei]\b|\binfiorescenz[ae]\b|\bpetal[oi]\b/],
  ["radice", /\bradic[ei]\b/],
  ["rizoma", /\brizom[ai]\b/],
  ["corteccia", /\bcortecc[ei]a?\b/],
  ["seme", /\bsem[ei]\b/],
  ["frutto", /\bfrutt[oi]\b|\bcinorrod[oi]\b/],
  ["bacca", /\bbacc[ah]e?\b/],
  ["gemma", /\bgemm[ae]\b/],
  ["sommità", /\bsommit[aà]\b/],
  ["parti aeree", /\bparti aeree\b/],
  ["bulbo", /\bbulb[oi]\b/],
  ["legno", /\blegno\b/],
  ["resina", /\bresina\b/],
  ["fusto", /\bfust[oi]\b|\bstel[oi]\b/],
  ["polline", /\bpollin[ei]\b/]
];
const partiInTesto = (testo) => PARTI.filter(([, re]) => re.test(norm(testo))).map(([n]) => n);
const partiScheda = (p) => {
  const elenco = partiInTesto((p.parti || []).join(" "));
  const grezzo = norm((p.parti || []).join(" "));
  /* «Sommità fiorite» contiene i fiori, «petali» sono fiori, «cinorrodi» sono
     frutti: senza queste espansioni il confronto segnalerebbe il contenitore
     invece del contenuto. */
  if (/sommit|fiorit|petal/.test(grezzo) && elenco.indexOf("fiore") === -1) elenco.push("fiore");
  if (/cinorrod/.test(grezzo) && elenco.indexOf("frutto") === -1) elenco.push("frutto");
  return elenco;
};
/* «senza fiori», «non produce fiori», «non una radice» non sono affermazioni
   sulla parte usata: vanno tolte prima di cercare. */
const senzaNegazioni = (testo) =>
  String(testo)
    .replace(/\b(senza|non\s+(?:ha|hanno|produce|producono|presenta|presentano)|non\s+una?)\s+[a-zà-ù]+/gi, " ")
    .replace(/\s+/g, " ");
const FRAMING_USO = /(si usano?|si utilizzano?|si raccolgono?|si colgono?|si prepara|la parte|parte usata|si ricava|contiene|sono la parte)/i;

function partiContrastanti(q, p) {
  const motivi = [];
  const detto = senzaNegazioni(piatto(q.q + " " + q.o[q.r]));
  if (!FRAMING_USO.test(q.q + " " + q.o[q.r])) return motivi;
  const scheda = partiScheda(p);
  if (!scheda.length) return motivi;
  partiInTesto(detto)
    .filter((x) => scheda.indexOf(x) === -1)
    .forEach((x) => motivi.push({ parte: x, scheda: (p.parti || []).join(", ") }));
  return motivi;
}

/* ---------- analisi del corpus ---------- */
const sicurezza = [];
const parti = [];
quiz.forEach((q) => {
  piantaDi(q).forEach((p) => {
    sicurezzaAffermata(q, p).forEach((m) =>
      sicurezza.push({ id: q.id, pianta: p.id, frase: (q.o[q.r] || "").trim(), etichetta: m.etichetta, scheda: m.scheda }));
    partiContrastanti(q, p).forEach((m) =>
      parti.push({ id: q.id, pianta: p.id, parte: m.parte, scheda: m.scheda, domanda: q.q.trim(), risposta: (q.o[q.r] || "").trim() }));
  });
});

/* ---------- autotest: il rilevatore deve scattare e deve tacere ---------- */
const cartaCauta = {
  id: "prova", nome: "Pianta prova", latino: "Prova test", nomi: [],
  parti: ["Radice"],
  sicurezza: { livello: "giallo", gravidanza: "Evitare in gravidanza.", nota: "Non superare le dosi." },
  fito: { commestibile: true }
};
const prove = [
  [sicurezzaAffermata({ q: "La pianta prova in gravidanza:", o: ["È sicura in gravidanza, senza problemi"], r: 0 }, cartaCauta).length > 0, "riconosce «sicura in gravidanza, senza problemi»"],
  [sicurezzaAffermata({ q: "La pianta prova:", o: ["Si può usare senza rischi"], r: 0 }, cartaCauta).length > 0, "riconosce «si può usare senza rischi»"],
  [sicurezzaAffermata({ q: "La pianta prova:", o: ["È naturale, quindi senza rischi"], r: 0 }, cartaCauta).length > 0, "riconosce «naturale quindi sicuro»"],
  [sicurezzaAffermata({ q: "La pianta prova:", o: ["Va evitata in gravidanza"], r: 0 }, cartaCauta).length === 0, "tace su «va evitata»"],
  [partiContrastanti({ q: "Della pianta prova si usano le foglie", o: ["Le foglie"], r: 0 }, cartaCauta).length > 0, "riconosce una parte diversa da quella della scheda"],
  [partiContrastanti({ q: "Della pianta prova si usa la radice", o: ["La radice"], r: 0 }, cartaCauta).length === 0, "tace sulla parte giusta"],
  [partiContrastanti({ q: "Lo zenzero si usa in cucina: è", o: ["Un rizoma, non una radice"], r: 0 }, { id: "z", nome: "Zenzero", latino: "Zingiber officinale", parti: ["Rizoma"], sicurezza: {}, fito: {} }).length === 0, "non scambia «non una radice» per una parte usata"],
  [partiContrastanti({ q: "L'equiseto si riconosce per", o: ["Fusti articolati, senza fiori"], r: 0 }, { id: "e", nome: "Equiseto", latino: "Equisetum arvense", parti: ["Fusti sterili"], sicurezza: {}, fito: {} }).length === 0, "non scambia «senza fiori» per una parte usata"],
  [partiContrastanti({ q: "L'iperico si usa", o: ["Si prepara con i fiori"], r: 0 }, { id: "i", nome: "Iperico", latino: "Hypericum perforatum", parti: ["Sommità fiorite"], sicurezza: {}, fito: {} }).length === 0, "«sommità fiorite» contiene i fiori"]
];
const proveFallite = prove.filter(([esito]) => !esito);
proveFallite.forEach(([, nome]) => console.error("autotest fallito: " + nome));

/* ---------- report ---------- */
const righe = [];
righe.push("# Rilievi sulle parafrasi — sicurezza e parti usate");
righe.push("");
righe.push("Versione in prova: **" + versione + "**. Generato da `npm run audit:parafrasi`.");
righe.push("Questo report **non blocca** i test: le contraddizioni esplicite restano coperte da");
righe.push("`npm test`, qui si cercano quelle girate intorno.");
righe.push("");
righe.push("Autotest del rilevatore: **" + (prove.length - proveFallite.length) + "/" + prove.length + " superati**.");
righe.push("");
righe.push("## Sicurezza affermata con altre parole: " + sicurezza.length);
righe.push("");
if (!sicurezza.length) {
  righe.push("Nessun rilievo: dove la scheda chiede cautela, nessuna risposta corretta la nega con perifrasi.");
} else {
  righe.push("| domanda | pianta | che cosa dice la risposta | perché è un rilievo | scheda |");
  righe.push("|---|---|---|---|---|");
  sicurezza.forEach((r) => righe.push("| `" + r.id + "` | " + r.pianta + " | " + r.frase.replace(/\|/g, "/") + " | " + r.etichetta + " | " + String(r.scheda).replace(/\|/g, "/").slice(0, 90) + " |"));
}
righe.push("");
righe.push("## Parti usate in contrasto con la scheda: " + parti.length);
righe.push("");
if (!parti.length) {
  righe.push("Nessun rilievo: dove una domanda dice quale parte si usa, la scheda indica la stessa.");
} else {
  righe.push("| domanda | pianta | parte citata | parti nella scheda | domanda |");
  righe.push("|---|---|---|---|---|");
  parti.forEach((r) => righe.push("| `" + r.id + "` | " + r.pianta + " | " + r.parte + " | " + r.scheda + " | " + r.domanda.replace(/\|/g, "/").slice(0, 80) + " |"));
}
righe.push("");
righe.push("## Come leggerlo");
righe.push("");
righe.push("- Un rilievo non è automaticamente un errore: può essere una sfumatura legittima o un uso");
righe.push("  alimentare diverso da quello officinale. Va letto, non applicato.");
righe.push("- Il rilevatore è prudente per costruzione: preferisce il nome completo al genere latino,");
righe.push("  toglie le negazioni («senza fiori», «non una radice»), considera «sommità fiorite» un");
righe.push("  contenitore dei fiori e guarda le parti solo quando la domanda dice che cosa si usa.");
righe.push("- Le perifrasi e le regole stanno in `scripts/audit-parafrasi.cjs`: aggiungerne una rende");
righe.push("  l'audit più severo, senza toccare i contenuti.");
righe.push("- Nessuna correzione viene applicata da questo script.");

const destinazione = path.join(root, "artifacts", "report-parafrasi-v" + versione + ".md");
fs.mkdirSync(path.dirname(destinazione), { recursive: true });
fs.writeFileSync(destinazione, righe.join("\n") + "\n", "utf8");

console.log("Audit delle parafrasi (non bloccante)");
console.log("  domande esaminate: " + quiz.length + ", piante: " + plants.length);
console.log("  sicurezza affermata con perifrasi: " + sicurezza.length);
console.log("  parti in contrasto con la scheda: " + parti.length);
console.log("  autotest: " + (prove.length - proveFallite.length) + "/" + prove.length);
console.log("  report: " + path.relative(root, destinazione));
process.exit(0);
