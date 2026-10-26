#!/usr/bin/env node
/* Prepara il contenuto del programma desktop: copia il sito pubblicato
   dentro desktop/app, senza script di sviluppo, test o dipendenze.
   Uso: node scripts/prepare-desktop.cjs                                  */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dest = path.join(root, "desktop", "app");

const files = ["index.html", "manifest.webmanifest", "sw.js", "LICENSE", "LICENSE-CONTENT.md", "README.md"];
const dirs = ["assets"];

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

files.forEach((f) => {
  const from = path.join(root, f);
  if (!fs.existsSync(from)) throw new Error("File mancante: " + f);
  fs.copyFileSync(from, path.join(dest, f));
});

dirs.forEach((d) => {
  const from = path.join(root, d);
  if (!fs.existsSync(from)) throw new Error("Cartella mancante: " + d);
  fs.cpSync(from, path.join(dest, d), { recursive: true });
});

const count = (p) => fs.statSync(p).isDirectory()
  ? fs.readdirSync(p).reduce((n, f) => n + count(path.join(p, f)), 0)
  : 1;

console.log("desktop/app pronta: " + count(dest) + " file.");
