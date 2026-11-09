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
const cp = require("child_process");
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
const commit = (() => { try { return cp.execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch (e) { return "n/d"; } })();

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
/* Versione ingenua, tenuta per documentare che cosa il rilevatore scarta. */
function piantaDiIngenua(q) {
  const testo = norm(q.q) + " " + norm(q.o[q.r]);
  const chiavi = (p) => [p.nome, (p.latino || "").split(" ")[0]].concat(p.nomi || []).map(norm).filter((k) => k.length > 3);
  return plants.filter((p) => chiavi(p).some((k) => parola(testo, k)));
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
  const testo = piatto(q.q + " " + q.o[q.r]);
  if (!FRAMING_USO.test(testo)) return motivi;
  const scheda = partiScheda(p);
  if (!scheda.length) return motivi;
  partiInTesto(senzaNegazioni(testo))
    .filter((x) => scheda.indexOf(x) === -1)
    .forEach((x) => motivi.push({ parte: x, scheda: (p.parti || []).join(", ") }));
  return motivi;
}

/* ---------- analisi del corpus ---------- */
const copertura = {};
const sicurezza = [];
const parti = [];
const scartate = [];

quiz.forEach((q) => {
  const c = (copertura[q.cat] = copertura[q.cat] || { tot: 0, conPianta: 0, conParte: 0, segnalate: 0 });
  c.tot++;
  const piante = piantaDi(q);
  if (piante.length) c.conPianta++;
  const testo = piatto(q.q + " " + q.o[q.r]);
  if (partiInTesto(testo).length) c.conParte++;

  piante.forEach((p) => {
    sicurezzaAffermata(q, p).forEach((m) =>
      sicurezza.push({ id: q.id, pianta: p.id, frase: (q.o[q.r] || "").trim(), etichetta: m.etichetta, scheda: m.scheda }));
    const trovate = partiContrastanti(q, p);
    trovate.forEach((m) =>
      parti.push({ id: q.id, pianta: p.id, parte: m.parte, scheda: m.scheda, domanda: q.q.trim() }));
    if (trovate.length) c.segnalate++;
  });
});

/* Per ogni segnalazione del rilevatore ingenuo, il motivo per cui è stata scartata. */
quiz.forEach((q) => {
  const testo = piatto(q.q + " " + q.o[q.r]);
  const dette = partiInTesto(testo);
  if (!dette.length) return;
  piantaDiIngenua(q).forEach((p) => {
    const schedaIngenua = partiInTesto((p.parti || []).join(" "));
    dette.filter((x) => schedaIngenua.indexOf(x) === -1).forEach((parte) => {
      if (parti.some((r) => r.id === q.id && r.pianta === p.id && r.parte === parte)) return; // è un rilievo vero, non uno scarto
      let motivo = "da rivedere";
      if (partiInTesto(senzaNegazioni(testo)).indexOf(parte) === -1) motivo = "negazione («senza fiori», «non una radice»): non è un'affermazione";
      else if (partiScheda(p).indexOf(parte) !== -1) motivo = "contenitore: la scheda dice «" + (p.parti || []).join(", ") + "», che comprende la parte";
      else if (!FRAMING_USO.test(testo)) motivo = "non è una parte usata: la domanda parla di anatomia o di riconoscimento";
      else if (piantaDi(q).indexOf(p) === -1) motivo = "nome latino generico: la domanda riguarda un'altra pianta";
      scartate.push({ id: q.id, pianta: p.id, parte, motivo });
    });
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
const tot = (k) => Object.keys(copertura).reduce((s, c) => s + copertura[c][k], 0);
righe.push("# Verifica delle parafrasi — sicurezza e parti usate");
righe.push("");
righe.push("Data: 9 novembre 2026 · versione in prova **" + versione + "** · commit `" + commit + "`");
righe.push("Ambito: tutte le **" + quiz.length + " domande** del quiz, contro le **" + plants.length + " schede** dell'erbario.");
righe.push("");
righe.push("Verifica eseguita senza modificare i contenuti. Non blocca i test: le contraddizioni");
righe.push("esplicite restano coperte da `npm test`, qui si cercano quelle girate intorno.");
righe.push("Riproducibile con `npm run audit:parafrasi`.");
righe.push("");
righe.push("## 1. Corpus e copertura");
righe.push("");
righe.push("| categoria | domande | con una pianta riconosciuta | con una parte citata | segnalate |");
righe.push("|---|---|---|---|---|");
Object.keys(copertura).forEach((c) => {
  const x = copertura[c];
  righe.push("| " + c + " | " + x.tot + " | " + x.conPianta + " | " + x.conParte + " | " + x.segnalate + " |");
});
righe.push("| **totale** | **" + tot("tot") + "** | **" + tot("conPianta") + "** | **" + tot("conParte") + "** | **" + tot("segnalate") + "** |");
righe.push("");
righe.push("Le domande senza una pianta riconosciuta (" + (tot("tot") - tot("conPianta")) + ") non possono essere confrontate con una scheda: restano fuori da questo controllo.");
righe.push("");
righe.push("## 2. Sicurezza affermata con altre parole: " + sicurezza.length);
righe.push("");
if (!sicurezza.length) {
  righe.push("Nessuna incoerenza: dove la scheda chiede cautela, nessuna risposta corretta la nega con perifrasi.");
} else {
  righe.push("| domanda | pianta | che cosa dice la risposta | perché è un rilievo | scheda |");
  righe.push("|---|---|---|---|---|");
  sicurezza.forEach((r) => righe.push("| `" + r.id + "` | " + r.pianta + " | " + r.frase.replace(/\|/g, "/") + " | " + r.etichetta + " | " + String(r.scheda).replace(/\|/g, "/").slice(0, 90) + " |"));
}
righe.push("");
righe.push("## 3. Parti usate in contrasto con la scheda: " + parti.length);
righe.push("");
if (!parti.length) {
  righe.push("Nessuna incoerenza: dove una domanda dice quale parte si usa, la scheda indica la stessa.");
} else {
  righe.push("| domanda | pianta | parte citata | parti nella scheda | domanda |");
  righe.push("|---|---|---|---|---|");
  parti.forEach((r) => righe.push("| `" + r.id + "` | " + r.pianta + " | " + r.parte + " | " + r.scheda + " | " + r.domanda.replace(/\|/g, "/").slice(0, 80) + " |"));
}
righe.push("");
righe.push("## 4. Segnalazioni scartate: " + scartate.length);
righe.push("");
righe.push("Sono i casi che un rilevatore ingenuo segnalerebbe e che qui vengono archiviati con il motivo.");
righe.push("Servono a mostrare che il controllo guarda le parole, non solo la presenza di una parola.");
righe.push("");
if (!scartate.length) {
  righe.push("Nessuna.");
} else {
  righe.push("| domanda | pianta | parte | perché non è un rilievo |");
  righe.push("|---|---|---|---|");
  scartate.forEach((r) => righe.push("| `" + r.id + "` | " + r.pianta + " | " + r.parte + " | " + r.motivo + " |"));
}
righe.push("");
righe.push("## 5. Autotest del rilevatore: " + (prove.length - proveFallite.length) + "/" + prove.length);
righe.push("");
prove.forEach(([esito, nome]) => righe.push("- " + (esito ? "superato" : "**fallito**") + " — " + nome));
righe.push("");
righe.push("## 6. Limiti");
righe.push("");
righe.push("- Un rilievo non è automaticamente un errore: può essere una sfumatura legittima o un uso");
righe.push("  alimentare diverso da quello officinale. Va letto, non applicato.");
righe.push("- Il rilevatore riconosce le perifrasi elencate in `scripts/audit-parafrasi.cjs`: una formula");
righe.push("  diversa può sfuggire. Aggiungerne una rende l'audit più severo, senza toccare i contenuti.");
righe.push("- Il confronto è con la scheda, non con la letteratura: una scheda sbagliata in modo");
righe.push("  coerente con le sue domande non viene segnalata.");
righe.push("- " + (tot("tot") - tot("conPianta")) + " domande non nominano una pianta e restano fuori dal confronto.");

const destinazione = path.join(root, "artifacts", "verifica-parafrasi-v" + versione + ".md");
fs.mkdirSync(path.dirname(destinazione), { recursive: true });
fs.writeFileSync(destinazione, righe.join("\n") + "\n", "utf8");

console.log("Verifica delle parafrasi (non bloccante)");
console.log("  domande esaminate: " + quiz.length + ", con pianta riconosciuta: " + tot("conPianta"));
console.log("  sicurezza affermata con perifrasi: " + sicurezza.length);
console.log("  parti in contrasto con la scheda: " + parti.length);
console.log("  segnalazioni scartate con motivo: " + scartate.length);
console.log("  autotest: " + (prove.length - proveFallite.length) + "/" + prove.length);
console.log("  report: " + path.relative(root, destinazione));
process.exit(0);
