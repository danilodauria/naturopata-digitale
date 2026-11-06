#!/usr/bin/env node
/* Backup locale di Naturopata Digitale.
 *
 * Crea una cartella datata dentro backup/ con:
 *   - l'archivio zip del commit corrente (solo file versionati),
 *   - l'elenco completo dei file con dimensioni,
 *   - il checksum SHA-256 dell'archivio,
 *   - un LEGGIMI-BACKUP.txt passo passo,
 *   - un backup.json leggibile dalle macchine.
 * Non sovrascrive mai un backup esistente: se la data è già usata aggiunge -2, -3…
 * Aggiorna backup/INDICE-BACKUP.txt con lo storico completo.
 *
 * Uso:  node scripts/backup.cjs [--nota "testo"] [--dry-run]
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const DEST = path.join(ROOT, "backup");
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

/* 2. Elenco dei file contenuti nell'archivio (dimensione reale del blob). */
const righeAlbero = git("ls-tree", "-r", "-l", "--full-name", "HEAD").toString().split("\n").filter(Boolean);
const file = righeAlbero.map((r) => {
  // <mode> <tipo> <sha> <dimensione>\t<percorso>
  const m = r.match(/^(\d+)\s+(\w+)\s+([0-9a-f]+)\s+([\d-]+)\t(.+)$/);
  return m ? { modo: m[1], tipo: m[2], sha: m[3], byte: m[4] === "-" ? 0 : parseInt(m[4], 10), percorso: m[5] } : null;
}).filter(Boolean);

const byteTotali = file.reduce((s, f) => s + f.byte, 0);
const perCartella = {};
file.forEach((f) => {
  const testa = f.percorso.indexOf("/") === -1 ? "(radice)" : f.percorso.split("/")[0] + "/";
  perCartella[testa] = (perCartella[testa] || 0) + 1;
});
const elencoCartelle = Object.keys(perCartella).sort().map((k) => "  " + k + " " + perCartella[k] + " file").join("\n");

const elencoFile =
  "ELENCO DEI FILE CONTENUTI NELL'ARCHIVIO\n" +
  "Backup: " + nomeCartella + " · versione " + versione + " · commit " + commit + "\n" +
  "File: " + file.length + " · dimensione sciolta: " + mb(byteTotali) + "\n" +
  "Colonne: byte · percorso (nell'archivio, preceduto da " + prefissoZip + ")\n\n" +
  file.slice().sort((a, b) => a.percorso.localeCompare(b.percorso))
    .map((f) => String(f.byte).padStart(9, " ") + "  " + f.percorso).join("\n") +
  "\n";
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
Contenuto: ${file.length} file versionati, ${mb(byteTotali)} sciolti, archivio ${mb(zipBuffer.length)}

Questo backup è una fotografia del progetto al commit indicato: il sito, i dati
delle piante e dei saperi, i test, gli script, i PDF e il pacchetto desktop.
Non contiene node_modules né file generati o segreti (vedi "Che cosa NON c'è").

-----------------------------------------------------
PASSO 1 — Aprire la cartella
-----------------------------------------------------
Dentro trovi quattro file più questo LEGGIMI:

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

  5. LEGGIMI-BACKUP.txt
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
  - assets/js: i dati (65 piante, capitoli, amari, spezierie, funghi,
    estrazioni, mesi balsamici, biblioteca) e la logica, Neura compresa;
  - assets/css, assets/img, assets/pdf: stile, immagini e PDF già impaginati;
  - tests: i controlli automatici su dati, DOM e percorsi;
  - scripts: gli strumenti di build, link e questo backup;
  - desktop: il contenitore Electron e il pacchetto dell'app;
  - docs e i file di radice: licenza, README, note di versione.

-----------------------------------------------------
PASSO 5 — Che cosa NON c'è
-----------------------------------------------------
  - node_modules: si ricrea con "npm ci";
  - desktop/app e desktop/dist: si rigenerano con "npm run desktop:prepare";
  - .env e ogni chiave o segreto: per scelta non entrano mai nei backup;
  - backup/ precedenti: restano nella loro cartella, non vengono copiati
    dentro i backup successivi.

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
  modificheNonCommittate: sporco ? sporco.split("\n").length : 0,
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

console.log("✓ Backup creato: backup/" + nomeCartella);
console.log("  " + nomeZip + " · " + mb(zipBuffer.length) + " · " + file.length + " file (" + mb(byteTotali) + " sciolti)");
console.log("  versione " + versione + " · commit " + commit + " · " + data + " " + oraRoma());
console.log("  sha256 " + sha256);
if (sporco) {
  console.log("  ⚠ modifiche non committate: " + sporco.split("\n").length + " file (il backup fotografa il commit " + commit + ")");
}
console.log("  storico: " + schede.length + " backup in backup/INDICE-BACKUP.txt");
