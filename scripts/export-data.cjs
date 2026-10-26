#!/usr/bin/env node
/* Esporta i dati editoriali dell'app in JSON, per generarci il PDF.
   Uso: node scripts/export-data.cjs > dati.json                            */
"use strict";

global.window = global;

const path = require("path");
const root = path.join(__dirname, "..");

const files = [
  "data-plants", "data-plants-2", "data-plants-3", "data-plants-4", "data-plants-5",
  "data-manual", "data-manual-2", "data-manual-3", "data-manual-4", "data-manual-5",
  "data-extra", "data-extra-2", "data-extra-3",
  "data-quiz", "data-quiz-2", "data-quiz-3", "data-library"
];

files.forEach((f) => require(path.join(root, "assets", "js", f + ".js")));

process.stdout.write(JSON.stringify(global.NP));
