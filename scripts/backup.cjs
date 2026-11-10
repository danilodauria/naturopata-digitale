#!/usr/bin/env node
/* Backup locale di Naturopata Digitale.
 *
 * Crea una cartella datata dentro backup/ con:
 *   - l'archivio zip del commit corrente (solo file versionati),
 *   - i report di verifica in una cartella documenti/, fuori dal codice,
 *   - l'elenco completo dei file con dimensioni,
 *   - il checksum SHA-256 dell'archivio,
 *   - un LEGGIMI-BACKUP.txt passo passo,
 *   - un backup.json leggibile dalle macchine.
 * Non sovrascrive mai un backup esistente: se la data è già usata aggiunge -2, -3…
 * Aggiorna backup/INDICE-BACKUP.txt con lo storico completo.
 * Lascia in artifacts/ un archivio con il solo backup appena creato, così chi
 * ha già le versioni precedenti scarica soltanto l'ultima.
 *
 * Uso:  node scripts/backup.cjs [--nota "testo"] [--dry-run]
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const zlib = require("zlib");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DEST = path.join(ROOT, "backup");
const ARTEFATTI = path.join(ROOT, "artifacts");
const PREFIX = "Naturopata-Digitale";

const args = process.argv.slice(2);
const dryRun = args.indexOf("--dry-run") !== -1;
const notaIdx = args.indexOf("--nota");
const nota = notaIdx !== -1 && args[notaIdx + 1] ? String(args[notaIdx + 1]).trim() : "";

function git(...a) {
  return execFileSync("git", a, { cwd: ROOT, encoding: "buffer" });
}
function gitTest(...a) {
  try { git(...a); return true; } catch (e) { return false; }
}
function dataRoma() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(new Date());
}
function oraRoma() {
  return new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit"
  }).format(new Date());
}
function mb(n) {
  return (n / 1024 / 1024).toFixed(2).replace(".", ",") + " MB";
}
function kb(n) {
  return (n / 1024).toFixed(0) + " KB";
}

/* Archivio da consegnare ----------------------------------------------------
   Non tutti hanno `zip` installato, e Windows non ce l'ha affatto: il file da
   scaricare lo scriviamo qui, con quello che Node ha già. Compressione deflate
   e nomi UTF-8, senza dipendenze esterne. */
const TABELLA_CRC = (() => {
  const t = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buffer) {
  let c = -1;
  for (let i = 0; i < buffer.length; i++) c = TABELLA_CRC[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function scriviZip(destinazione, cartellaSorgente, prefisso) {
  const voci = [];
  (function cammina(rel) {
    const qui = path.join(cartellaSorgente, rel);
    for (const voce of fs.readdirSync(qui, { withFileTypes: true })) {
      const dentro = rel ? rel + "/" + voce.name : voce.name;
      if (voce.isDirectory()) cammina(dentro);
      else voci.push(dentro);
    }
  })("");
  voci.sort();

  const parti = [];
  const centrale = [];
  let offset = 0;
  for (const rel of voci) {
    const dati = fs.readFileSync(path.join(cartellaSorgente, rel));
    const compresso = zlib.deflateRawSync(dati, { level: 9 });
    const nome = Buffer.from(prefisso + rel, "utf8");
    const crc = crc32(dati);

    const locale = Buffer.alloc(30);
    locale.writeUInt32LE(0x04034b50, 0);
    locale.writeUInt16LE(20, 4); // versione minima
    locale.writeUInt16LE(0x0800, 6); // nomi UTF-8
    locale.writeUInt16LE(8, 8); // deflate
    locale.writeUInt16LE(0, 10);
    locale.writeUInt16LE(0x21, 12); // 1980-01-01
    locale.writeUInt32LE(crc, 14);
    locale.writeUInt32LE(compresso.length, 18);
    locale.writeUInt32LE(dati.length, 22);
    locale.writeUInt16LE(nome.length, 26);
    locale.writeUInt16LE(0, 28);
    parti.push(locale, nome, compresso);

    const cent = Buffer.alloc(46);
    cent.writeUInt32LE(0x02014b50, 0);
    cent.writeUInt16LE(20, 4);
    cent.writeUInt16LE(20, 6);
    cent.writeUInt16LE(0x0800, 8);
    cent.writeUInt16LE(8, 10);
    cent.writeUInt16LE(0, 12);
    cent.writeUInt16LE(0x21, 14);
    cent.writeUInt32LE(crc, 16);
    cent.writeUInt32LE(compresso.length, 20);
    cent.writeUInt32LE(dati.length, 24);
    cent.writeUInt16LE(nome.length, 28);
    cent.writeUInt32LE(offset, 42);
    centrale.push(cent, nome);

    offset += locale.length + nome.length + compresso.length;
  }

  const directory = Buffer.concat(centrale);
  const fine = Buffer.alloc(22);
  fine.writeUInt32LE(0x06054b50, 0);
  fine.writeUInt16LE(voci.length, 8);
  fine.writeUInt16LE(voci.length, 10);
  fine.writeUInt32LE(directory.length, 12);
  fine.writeUInt32LE(offset, 16);
  fs.writeFileSync(destinazione, Buffer.concat([Buffer.concat(parti), directory, fine]));
}

if (!gitTest("rev-parse", "--git-dir")) {
  console.error("✗ Qui non c'è un repository Git: il backup deve partire dal progetto.");
  process.exit(1);
}

const versione = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
const commit = git("rev-parse", "--short", "HEAD").toString().trim();
const commitLungo = git("rev-parse", "HEAD").toString().trim();
const ramo = git("rev-parse", "--abbrev-ref", "HEAD").toString().trim();
const data = dataRoma();
const sporco = git("status", "--porcelain").toString().trim();

/* Cartella datata, senza mai sovrascrivere lo storico. */
const baseNome = PREFIX + "-" + data + "-v" + versione;
let nomeCartella = baseNome;
let n = 2;
while (fs.existsSync(path.join(DEST, nomeCartella))) {
  nomeCartella = baseNome + "-" + n;
  n++;
}
const cartella = path.join(DEST, nomeCartella);
const nomeZip = PREFIX + "-" + versione + ".zip";
const percorsoZip = path.join(cartella, nomeZip);

if (dryRun) {
  console.log("Anteprima backup:");
  console.log("  cartella: backup/" + nomeCartella + " (data e versione nel nome)");
  console.log("  archivio: " + nomeZip);
  console.log("  versione: " + versione + " · commit " + commit + " · ramo " + ramo);
  console.log("  modifiche non committate: " + (sporco ? "sì (" + sporco.split("\n").length + " file)" : "no"));
  process.exit(0);
}

fs.mkdirSync(cartella, { recursive: true });

/* 1. Archivio del commit: solo file versionati, con prefisso di cartella. */
const prefissoZip = PREFIX + "-" + versione + "/";
git("archive", "--format=zip", "--prefix=" + prefissoZip, "-o", percorsoZip, "HEAD");
const zipBuffer = fs.readFileSync(percorsoZip);
const sha256 = crypto.createHash("sha256").update(zipBuffer).digest("hex");

/* 1b. Report di verifica. Non sono versionati (artifacts/ è fuori dal
   repository), quindi senza questa copia sparirebbero insieme alla macchina che
   li ha prodotti. Vanno accanto al codice ma in una cartella loro: sono
   documentazione, non programma. I report che portano nel nome una versione
   diversa da questa restano fuori, perché descrivono una fotografia superata. */
function reportDaSalvare() {
  if (!fs.existsSync(ARTEFATTI)) return [];
  return fs.readdirSync(ARTEFATTI)
    .filter((n) => /^verifica-.*\.md$/.test(n))
    .filter((n) => {
      const v = n.match(/-v?(\d+\.\d+\.\d+)\.md$/);
      return !v || v[1] === versione;
    })
    .sort()
    .map((n) => ({ nome: n, byte: fs.statSync(path.join(ARTEFATTI, n)).size }));
}
const documenti = reportDaSalvare();
if (documenti.length) {
  fs.mkdirSync(path.join(cartella, "documenti"), { recursive: true });
  documenti.forEach((d) => fs.copyFileSync(path.join(ARTEFATTI, d.nome), path.join(cartella, "documenti", d.nome)));
}

/* 2. Elenco dei file contenuti nell'archivio (dimensione reale del blob). */
const righeAlbero = git("ls-tree", "-r", "-l", "--full-name", "HEAD").toString().split("\n").filter(Boolean);
const file = righeAlbero.map((r) => {
  // <mode> <tipo> <sha> <dimensione>\t<percorso>
  const m = r.match(/^(\d+)\s+(\w+)\s+([0-9a-f]+)\s+([\d-]+)\t(.+)$/);
  return m ? { modo: m[1], tipo: m[2], sha: m[3], byte: m[4] === "-" ? 0 : parseInt(m[4], 10), percorso: m[5] } : null;
}).filter(Boolean);

/* 2b. L'archivio deve essere la copia esatta dell'albero del commit: stessi
   file, stessi contenuti. Il controllo riapre lo zip, ricalcola l'impronta Git
   di ogni voce e la confronta con quella dell'oggetto in HEAD. Se qualcosa non
   torna lo dice e lo registra in backup.json, senza fermare il salvataggio: un
   avviso serve a farlo guardare, non a impedire il backup. */
const FORMATO_OGGETTI = git("rev-parse", "--show-object-format").toString().trim() || "sha1";

function improntaGit(contenuto) {
  return crypto
    .createHash(FORMATO_OGGETTI === "sha256" ? "sha256" : "sha1")
    .update(Buffer.from("blob " + contenuto.length + "\0", "utf8"))
    .update(contenuto)
    .digest("hex");
}

function vociArchivio(buffer) {
  let fine = -1;
  for (let i = buffer.length - 22; i >= 0 && i >= buffer.length - 65557; i--) {
    if (buffer.readUInt32LE(i) === 0x06054b50) { fine = i; break; }
  }
  if (fine < 0) throw new Error("indice centrale dello zip non trovato");
  const quante = buffer.readUInt16LE(fine + 10);
  let p = buffer.readUInt32LE(fine + 16);
  const voci = [];
  for (let i = 0; i < quante; i++) {
    if (buffer.readUInt32LE(p) !== 0x02014b50) throw new Error("voce dell'indice centrale non valida");
    const metodo = buffer.readUInt16LE(p + 10);
    const compresso = buffer.readUInt32LE(p + 20);
    const nomeLen = buffer.readUInt16LE(p + 28);
    const extraLen = buffer.readUInt16LE(p + 30);
    const commentoLen = buffer.readUInt16LE(p + 32);
    const offset = buffer.readUInt32LE(p + 42);
    const nome = buffer.toString("utf8", p + 46, p + 46 + nomeLen);
    const nLen = buffer.readUInt16LE(offset + 26);
    const eLen = buffer.readUInt16LE(offset + 28);
    const inizio = offset + 30 + nLen + eLen;
    const grezzo = buffer.subarray(inizio, inizio + compresso);
    const contenuto = metodo === 8 ? zlib.inflateRawSync(grezzo) : Buffer.from(grezzo);
    voci.push({ nome, byte: contenuto.length, sha: improntaGit(contenuto) });
    p += 46 + nomeLen + extraLen + commentoLen;
  }
  return voci;
}

function confrontaArchivio(buffer, attesi) {
  const esito = { stato: "ok", voci: 0, byte: 0, mancanti: [], estranei: [], diversi: [], errore: "" };
  let voci;
  try {
    // git archive scrive anche una voce per ogni cartella, a zero byte: non sono
    // file da confrontare, e contarle come estranee falserebbe l'esito.
    voci = vociArchivio(buffer).filter((v) => v.nome.indexOf(prefissoZip) === 0 && !v.nome.endsWith("/"));
  } catch (e) {
    esito.stato = "illeggibile";
    esito.errore = e.message;
    return esito;
  }
  esito.voci = voci.length;
  esito.byte = voci.reduce((s, v) => s + v.byte, 0);
  const perNome = new Map(voci.map((v) => [v.nome.slice(prefissoZip.length), v]));
  const attesiPerNome = new Map(attesi.map((f) => [f.percorso, f]));
  attesi.forEach((f) => {
    const v = perNome.get(f.percorso);
    if (!v) esito.mancanti.push(f.percorso);
    else if (v.sha !== f.sha) esito.diversi.push(f.percorso);
  });
  perNome.forEach((v, nome) => {
    if (!attesiPerNome.has(nome)) esito.estranei.push(nome);
  });
  if (esito.mancanti.length || esito.estranei.length || esito.diversi.length) esito.stato = "differenze";
  return esito;
}

const controlloArchivio = confrontaArchivio(zipBuffer, file);

const byteTotali = file.reduce((s, f) => s + f.byte, 0);
const esitoControllo =
  controlloArchivio.stato === "ok"
    ? "identico all'albero del commit (" + controlloArchivio.voci + " file, " + controlloArchivio.byte + " byte)"
    : controlloArchivio.stato === "illeggibile"
      ? "non verificabile: " + controlloArchivio.errore
      : "DIVERSO dall'albero del commit · " + controlloArchivio.mancanti.length + " mancanti, " +
        controlloArchivio.diversi.length + " diversi, " + controlloArchivio.estranei.length + " estranei";
const perCartella = {};
file.forEach((f) => {
  const testa = f.percorso.indexOf("/") === -1 ? "(radice)" : f.percorso.split("/")[0] + "/";
  perCartella[testa] = (perCartella[testa] || 0) + 1;
});
const elencoCartelle = Object.keys(perCartella).sort().map((k) => "  " + k + " " + perCartella[k] + " file").join("\n");

const elencoDocumenti =
  "DOCUMENTI DI VERIFICA (cartella documenti/, fuori dal codice)\n" +
  "Colonne: byte · percorso\n\n" +
  (documenti.length
    ? documenti.map((d) => String(d.byte).padStart(9, " ") + "  documenti/" + d.nome).join("\n")
    : "Nessun report in artifacts/ al momento del backup.") +
  "\n";

const elencoFile =
  "ELENCO DEI FILE CONTENUTI NELL'ARCHIVIO\n" +
  "Backup: " + nomeCartella + " · versione " + versione + " · commit " + commit + "\n" +
  "File: " + file.length + " · dimensione sciolta: " + mb(byteTotali) + "\n" +
  "Documenti di verifica: " + documenti.length + " (cartella documenti/, fuori dal codice)\n" +
  "Colonne: byte · percorso (nell'archivio, preceduto da " + prefissoZip + ")\n\n" +
  file.slice().sort((a, b) => a.percorso.localeCompare(b.percorso))
    .map((f) => String(f.byte).padStart(9, " ") + "  " + f.percorso).join("\n") +
  "\n" +
  elencoDocumenti;
fs.writeFileSync(path.join(cartella, "ELENCO-FILE.txt"), elencoFile);

/* 3. Checksum verificabile. */
fs.writeFileSync(path.join(cartella, "SHA256SUMS.txt"), sha256 + "  " + nomeZip + "\n");

/* 4. LEGGIMI passo passo. */
const leggimi = `BACKUP DI NATUROPATA DIGITALE — CHE COSA C'È DENTRO
=====================================================

Cartella:  backup/${nomeCartella}
Creato il: ${data} alle ${oraRoma()} (ora italiana)
Versione:  ${versione}
Commit:    ${commit} (ramo ${ramo})${nota ? "\nNota:      " + nota : ""}
Contenuto: ${file.length} file versionati, ${documenti.length} documenti di verifica,
           ${mb(byteTotali)} sciolti, archivio ${mb(zipBuffer.length)}
Archivio:  ${esitoControllo}

Questo backup è una fotografia del progetto al commit indicato: il sito, i dati
delle piante e dei saperi, i test, gli script, i PDF e il pacchetto desktop.
Non contiene node_modules né file generati o segreti (vedi "Che cosa NON c'è").

-----------------------------------------------------
PASSO 1 — Aprire la cartella
-----------------------------------------------------
Dentro trovi cinque file e una cartella:

  1. ${nomeZip}
     L'archivio completo del progetto. Dentro, tutto è raccolto in una
     cartella chiamata ${prefissoZip}.

  2. ELENCO-FILE.txt
     L'inventario: ogni file dell'archivio con la sua dimensione in byte.
     Serve a controllare che ci sia tutto senza aprire lo zip.

  3. SHA256SUMS.txt
     L'impronta digitale dell'archivio: ${sha256.slice(0, 16)}…

  4. backup.json
     Gli stessi dati in formato leggibile da un programma (data, versione,
     commit, nome dello zip, impronta). Serve per l'indice storico.

  5. documenti/
     I report delle verifiche di questa versione, copiati da artifacts/:
     parafrasi, schede, quiz, sintesi e i loro allegati. Stanno fuori dalla
     cartella del codice perché sono documentazione, non programma. Non sono
     versionati: questo è l'unico posto dove restano.

  6. LEGGIMI-BACKUP.txt
     Questo file.

-----------------------------------------------------
PASSO 2 — Verificare che l'archivio sia integro
-----------------------------------------------------
Apri il terminale nella cartella del backup ed esegui:

    sha256sum -c SHA256SUMS.txt

Deve rispondere "${nomeZip}: OK".
Su Windows, in PowerShell:

    Get-FileHash ${nomeZip} -Algorithm SHA256

Il valore deve coincidere con quello scritto in SHA256SUMS.txt.

-----------------------------------------------------
PASSO 3 — Estrarre e leggere il progetto
-----------------------------------------------------
    unzip ${nomeZip}

Si crea la cartella ${prefissoZip} con dentro il progetto.
Su Windows è sufficiente il tasto destro → Estrai tutto.

Per ripristinare il progetto da questo backup:
  - estrai l'archivio in una cartella vuota;
  - entraci e reinstalla le dipendenze con:  npm ci
  - controlla che tutto funzioni con:        npm test
  - apri il sito in locale con:               npm run serve
    e visita http://localhost:3000

-----------------------------------------------------
PASSO 4 — Che cosa contiene, in pratica
-----------------------------------------------------
${elencoCartelle}

In sintesi:
  - index.html e le altre pagine: il sito statico (erbario, manuale, saperi,
    quiz, biblioteca, Neura, scarica);
  - assets/js: i dati (70 piante, capitoli, amari, spezierie, funghi,
    estrazioni, mesi balsamici, biblioteca) e la logica, Neura compresa;
  - assets/css, assets/img, assets/pdf: stile, immagini e PDF già impaginati;
  - tests: i controlli automatici su dati, DOM e percorsi;
  - scripts: gli strumenti di build, link e questo backup;
  - desktop: il contenitore Electron e il pacchetto dell'app;
  - docs e i file di radice: licenza, README, note di versione;
  - documenti/: i report di verifica della versione, accanto al codice ma in
    una cartella separata.

-----------------------------------------------------
PASSO 5 — Che cosa NON c'è
-----------------------------------------------------
  - node_modules: si ricrea con "npm ci";
  - desktop/app e desktop/dist: si rigenerano con "npm run desktop:prepare";
  - .env e ogni chiave o segreto: per scelta non entrano mai nei backup;
  - backup/ precedenti: restano nella loro cartella, non vengono copiati
    dentro i backup successivi;
  - i report di verifica delle versioni passate: qui entra solo la verifica
    di questa versione, così le fotografie non si confondono.

-----------------------------------------------------
PASSO 6 — Lo storico
-----------------------------------------------------
Ogni salvataggio crea una cartella nuova con la data nel nome, così i backup
non si sovrascrivono. L'elenco completo è in backup/INDICE-BACKUP.txt,
aggiornato automaticamente a ogni backup.

Per crearne un altro in futuro:

    npm run backup

Per vedere che cosa farebbe, senza scrivere nulla:

    npm run backup -- --dry-run

Per aggiungere una nota a questo backup:

    npm run backup -- --nota "prima della pubblicazione"

Il comando "npm run rilascio" esegue test, PDF, pacchetto desktop, test
finale e backup in un colpo solo.
`;
fs.writeFileSync(path.join(cartella, "LEGGIMI-BACKUP.txt"), leggimi);

/* 5. Scheda leggibile dalle macchine. */
const scheda = {
  nome: nomeCartella,
  data: data,
  ora: oraRoma(),
  versione: versione,
  commit: commit,
  commitCompleto: commitLungo,
  ramo: ramo,
  archivio: nomeZip,
  byteArchivio: zipBuffer.length,
  sha256: sha256,
  file: file.length,
  byteSciolti: byteTotali,
  verificaArchivio: {
    esito: controlloArchivio.stato,
    file: controlloArchivio.voci,
    byte: controlloArchivio.byte,
    mancanti: controlloArchivio.mancanti,
    estranei: controlloArchivio.estranei,
    diversi: controlloArchivio.diversi
  },
  modificheNonCommittate: sporco ? sporco.split("\n").length : 0,
  documenti: documenti.map((d) => d.nome),
  byteDocumenti: documenti.reduce((s, d) => s + d.byte, 0),
  nota: nota
};
fs.writeFileSync(path.join(cartella, "backup.json"), JSON.stringify(scheda, null, 2) + "\n");

/* 6. Indice storico, rigenerato da tutte le cartelle di backup. */
function leggiSchede() {
  if (!fs.existsSync(DEST)) return [];
  return fs.readdirSync(DEST)
    .filter((d) => d.indexOf(PREFIX + "-") === 0)
    .map((d) => {
      const p = path.join(DEST, d, "backup.json");
      if (!fs.existsSync(p)) return null;
      try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch (e) { return null; }
    })
    .filter(Boolean)
    .sort((a, b) => (a.data + a.ora).localeCompare(b.data + b.ora) || a.nome.localeCompare(b.nome));
}

const schede = leggiSchede();
const indice =
  "INDICE DEI BACKUP DI NATUROPATA DIGITALE\n" +
  "=======================================\n\n" +
  "Ogni riga è una cartella dentro backup/. I backup non si sovrascrivono:\n" +
  "se ne fai due nello stesso giorno, il secondo prende il suffisso -2.\n\n" +
  schede.map((s, i) =>
    String(i + 1).padStart(2, " ") + ". " + s.nome + "\n" +
    "    " + s.data + " " + s.ora + " · versione " + s.versione + " · commit " + s.commit +
    (s.modificheNonCommittate ? " · " + s.modificheNonCommittate + " modifiche non committate" : "") + "\n" +
    "    archivio " + s.archivio + " (" + mb(s.byteArchivio) + ") · " + s.file + " file\n" +
    "    impronta " + s.sha256.slice(0, 32) + "…\n" +
    (s.nota ? "    nota: " + s.nota + "\n" : "")
  ).join("\n") +
  "\nTotale: " + schede.length + " backup · " + mb(schede.reduce((t, s) => t + s.byteArchivio, 0)) + " di archivi.\n" +
  "\nPer verificarne uno:  cd backup/<cartella> && sha256sum -c SHA256SUMS.txt\n" +
  "Per crearne uno nuovo: npm run backup\n";
fs.writeFileSync(path.join(DEST, "INDICE-BACKUP.txt"), indice);

/* 7. Archivio da consegnare: solo questo backup, con nome, data e versione.
   Chi ha già le versioni precedenti non deve riscaricarle: dentro c'è una sola
   fotografia, quella appena creata. */
const nomeUltimo = PREFIX + "-backup-" + data + "-v" + versione + ".zip";
const percorsoUltimo = path.join(ARTEFATTI, nomeUltimo);
fs.mkdirSync(ARTEFATTI, { recursive: true });
for (const voce of fs.readdirSync(ARTEFATTI)) {
  if (!/^Naturopata-Digitale-backup-.*\.zip(\.sha256\.txt)?$/.test(voce)) continue;
  if (voce === nomeUltimo || voce === nomeUltimo + ".sha256.txt") continue;
  fs.rmSync(path.join(ARTEFATTI, voce), { force: true });
}
scriviZip(percorsoUltimo, cartella, nomeCartella + "/");
const byteUltimo = fs.statSync(percorsoUltimo).size;
const shaUltimo = crypto.createHash("sha256").update(fs.readFileSync(percorsoUltimo)).digest("hex");
fs.writeFileSync(percorsoUltimo + ".sha256.txt", shaUltimo + "  " + nomeUltimo + "\n");

console.log("✓ Backup creato: backup/" + nomeCartella);
console.log("  " + nomeZip + " · " + mb(zipBuffer.length) + " · " + file.length + " file (" + mb(byteTotali) + " sciolti)");
console.log("  versione " + versione + " · commit " + commit + " · " + data + " " + oraRoma());
console.log("  sha256 " + sha256);
if (controlloArchivio.stato === "ok") {
  console.log("  controllo: archivio identico all'albero di HEAD · " + controlloArchivio.voci + " file");
} else if (controlloArchivio.stato === "illeggibile") {
  console.log("  ⚠ controllo archivio impossibile: " + controlloArchivio.errore);
} else {
  const dettagli = [].concat(
    controlloArchivio.mancanti.map((n) => "manca " + n),
    controlloArchivio.diversi.map((n) => "diverso " + n),
    controlloArchivio.estranei.map((n) => "in più " + n)
  );
  console.log("  ⚠ l'archivio non corrisponde a HEAD: " + dettagli.length + " differenze");
  dettagli.slice(0, 8).forEach((d) => console.log("      " + d));
  if (dettagli.length > 8) console.log("      … e altre " + (dettagli.length - 8));
}
if (sporco) {
  console.log("  ⚠ modifiche non committate: " + sporco.split("\n").length + " file (il backup fotografa il commit " + commit + ")");
}
console.log("  documenti: " + documenti.length + " report in documenti/" + (documenti.length ? " (" + kb(documenti.reduce((s, d) => s + d.byte, 0)) + ")" : ""));
console.log("  storico: " + schede.length + " backup in backup/INDICE-BACKUP.txt");
console.log("  da scaricare: artifacts/" + nomeUltimo + " · " + mb(byteUltimo) + " · solo la versione " + versione);
console.log("  impronta archivio: " + shaUltimo);
