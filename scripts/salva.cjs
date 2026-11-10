#!/usr/bin/env node
/* Salva una lavorazione: commit e backup in un solo comando.
 *
 * Il gancio post-commit copre i repository normali, ma non si può installare
 * dove la cartella dei ganci è condivisa (worktree, repository comune): lì il
 * backup rischierebbe di non essere aggiornato. Questo comando fa le due cose
 * nell'ordine giusto — prima il commit, poi l'archivio di quel commit — così
 * l'ultimo repository di backup corrisponde sempre all'ultima versione.
 *
 * Uso:  npm run salva -- "messaggio del commit"
 */
"use strict";

const path = require("path");
const { execFileSync } = require("child_process");

const RADICE = path.resolve(__dirname, "..");
const messaggio = process.argv.slice(2).join(" ").trim();

if (!messaggio) {
  console.error('Uso: npm run salva -- "messaggio del commit"');
  process.exit(2);
}

const git = (...argomenti) =>
  execFileSync("git", argomenti, { cwd: RADICE, encoding: "utf8" }).trim();

const stato = git("status", "--porcelain");
if (!stato) {
  console.log("Nessuna modifica da salvare: il backup viene comunque rinnovato.");
} else {
  execFileSync("git", ["add", "-A"], { cwd: RADICE, stdio: "inherit" });
  execFileSync("git", ["commit", "-m", messaggio], { cwd: RADICE, stdio: "inherit" });
}

execFileSync(process.execPath, [path.join(RADICE, "scripts", "backup.cjs")], {
  cwd: RADICE,
  stdio: "inherit"
});
