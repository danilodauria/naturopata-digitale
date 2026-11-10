#!/usr/bin/env node
/* Installa il gancio che rinnova il backup dopo ogni commit.
 *
 * Il progetto vuole che l'ultima fotografia del repository sia sempre
 * disponibile: invece di ricordarsene a mano, ogni commit esegue
 * scripts/backup.cjs, che riscrive l'archivio in artifacts/ e aggiorna lo
 * storico. Il gancio vive in .git/hooks (che non è versionato), quindi va
 * installato: lo fa questo script, richiamato da "npm run hook" e dalla vita
 * "prepare" di npm, così un "npm ci" su un clone appena scaricato lo rimette
 * in piedi senza pensarci.
 *
 * In un repository condiviso o in un worktree il gancio non viene installato:
 * scriverlo nella cartella comune lo farebbe scattare per tutti i progetti.
 *
 * Uso:  node scripts/installa-hook.cjs
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const RADICE = path.resolve(__dirname, "..");

function git(...argomenti) {
  return execFileSync("git", argomenti, { cwd: RADICE, encoding: "utf8" }).trim();
}

let cartellaGanci;
try {
  /* --git-path funziona anche quando .git è un file, come nei worktree. */
  cartellaGanci = path.resolve(RADICE, git("rev-parse", "--git-path", "hooks"));
} catch (e) {
  console.log("Nessun repository Git: gancio non installato (va bene in un archivio).");
  process.exit(0);
}

/* Il gancio va scritto solo se la cartella dei ganci è dentro il progetto.
   In un worktree o in un repository condiviso finirebbe nella configurazione
   comune, dove vale per tutti i progetti: lì non si installa nulla. */
const radiceReale = fs.realpathSync(RADICE);
let ganciReali = cartellaGanci;
try { ganciReali = fs.realpathSync(cartellaGanci); } catch (e) { /* non esiste ancora */ }
const dentroIlProgetto = ganciReali === radiceReale || ganciReali.indexOf(radiceReale + path.sep) === 0;
if (!dentroIlProgetto) {
  console.log("Repository Git condiviso o worktree (" + cartellaGanci + "):");
  console.log("gancio non installato, per non toccare gli altri progetti.");
  console.log("Il backup resta garantito da «npm run salva» e da «npm run rilascio».");
  process.exit(0);
}

const percorso = path.join(cartellaGanci, "post-commit");
const contenuto = [
  "#!/bin/sh",
  "# Rinnova il backup dopo ogni commit: l'ultimo archivio corrisponde a HEAD.",
  "# Installato da scripts/installa-hook.cjs (npm run hook).",
  'cd "$(git rev-parse --show-toplevel)" || exit 0',
  "node scripts/backup.cjs",
  ""
].join("\n");

const attuale = fs.existsSync(percorso) ? fs.readFileSync(percorso, "utf8") : "";
if (attuale === contenuto) {
  console.log("Gancio post-commit già aggiornato: " + percorso);
  process.exit(0);
}

fs.mkdirSync(cartellaGanci, { recursive: true });
fs.writeFileSync(percorso, contenuto, { mode: 0o755 });
fs.chmodSync(percorso, 0o755);
console.log("Gancio post-commit installato: " + percorso);
console.log("Da ora ogni commit rinnova il backup; per disattivarlo basta rimuovere quel file.");
