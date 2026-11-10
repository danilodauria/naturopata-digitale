#!/usr/bin/env node
/* Prova di avvio del pacchetto desktop.
 *
 * Avvia l'eseguibile indicato con il porto di debug di Chromium, aspetta che
 * una pagina carichi index.html e controlla il titolo: se la finestra non
 * arriva, o il programma muore prima, l'esito è negativo. Serve a scoprire un
 * avvio rotto prima della release, non a sostituire una prova a mano.
 *
 * Uso:  node scripts/smoke-avvio.cjs <eseguibile> [argomenti...]
 *       xvfb-run -a node scripts/smoke-avvio.cjs dist/linux-unpacked/naturopata-digitale --no-sandbox
 *
 * Variabili: SMOKE_TIMEOUT (secondi, default 90).
 * Licenza del codice: MIT · Danilo D'Auria
 */
"use strict";

const { spawn } = require("child_process");
const fs = require("fs");
const http = require("http");
const net = require("net");
const path = require("path");

const args = process.argv.slice(2);
const eseguibile = args.shift();
if (!eseguibile) {
  console.error("Uso: node scripts/smoke-avvio.cjs <eseguibile> [argomenti...]");
  process.exit(2);
}
const argomenti = args;
const ATTESA = Math.max(10, Number(process.env.SMOKE_TIMEOUT || 90)) * 1000;
const ATTESA_DOPO_CARICO = 3000;

const radice = path.join(__dirname, "..");
const cartellaLog = path.join(radice, "artifacts");
fs.mkdirSync(cartellaLog, { recursive: true });
const nomeLog = "avvio-" + new Date().toISOString().replace(/[:.]/g, "-") + ".log";
const percorsoLog = path.join(cartellaLog, nomeLog);

const dormi = (ms) => new Promise((r) => setTimeout(r, ms));

function portaLibera() {
  return new Promise((risolvi, rifiuta) => {
    const server = net.createServer();
    server.unref();
    server.on("error", rifiuta);
    server.listen(0, "127.0.0.1", () => {
      const porta = server.address().port;
      server.close(() => risolvi(porta));
    });
  });
}

function bersagli(porta) {
  return new Promise((risolvi) => {
    const richiesta = http.get({ host: "127.0.0.1", port: porta, path: "/json/list", timeout: 1500 }, (risposta) => {
      let testo = "";
      risposta.setEncoding("utf8");
      risposta.on("data", (pezzo) => { testo += pezzo; });
      risposta.on("end", () => {
        try { risolvi(JSON.parse(testo)); } catch (e) { risolvi(null); }
      });
    });
    richiesta.on("timeout", () => { richiesta.destroy(); risolvi(null); });
    richiesta.on("error", () => risolvi(null));
  });
}

async function main() {
  const porta = await portaLibera();
  const log = fs.createWriteStream(percorsoLog, { flags: "a" });
  log.write("# prova di avvio · " + new Date().toISOString() + "\n");
  log.write("# eseguibile: " + eseguibile + "\n");
  log.write("# argomenti: " + argomenti.join(" ") + "\n\n");

  let figlio;
  try {
    figlio = spawn(eseguibile, ["--remote-debugging-port=" + porta].concat(argomenti), {
      cwd: path.dirname(path.resolve(eseguibile)),
      stdio: ["ignore", "pipe", "pipe"],
      env: Object.assign({}, process.env, { ELECTRON_ENABLE_LOGGING: "1" })
    });
  } catch (errore) {
    console.error("✗ non riesco ad avviare " + eseguibile + ": " + errore.message);
    process.exit(1);
  }

  figlio.stdout.pipe(log, { end: false });
  figlio.stderr.pipe(log, { end: false });

  let uscita = null;
  figlio.on("error", (errore) => { uscita = { errore: errore.message }; });
  figlio.on("exit", (codice, segnale) => { uscita = { codice: codice, segnale: segnale }; });

  const scadenza = Date.now() + ATTESA;
  let pagina = null;
  while (Date.now() < scadenza) {
    if (uscita) break;
    const elenco = await bersagli(porta);
    if (Array.isArray(elenco)) {
      pagina = elenco.find((voce) => /index\.html/i.test(String(voce && voce.url))) || null;
      if (pagina) break;
    }
    await dormi(1000);
  }

  const chiudi = () => {
    try { if (figlio && !figlio.killed) figlio.kill(); } catch (e) { /* già chiuso */ }
  };

  if (!pagina) {
    chiudi();
    log.end();
    if (uscita) {
      const motivo = uscita.errore ? uscita.errore : "codice " + uscita.codice + (uscita.segnale ? ", segnale " + uscita.segnale : "");
      console.error("✗ il programma è terminato prima di mostrare la finestra (" + motivo + ")");
    } else {
      console.error("✗ la finestra non ha caricato index.html entro " + ATTESA / 1000 + " secondi");
    }
    console.error("  registro: " + path.relative(radice, percorsoLog));
    process.exit(1);
  }

  const titolo = String(pagina.title || "");
  const indirizzo = String(pagina.url || "");

  await dormi(ATTESA_DOPO_CARICO);
  if (uscita) {
    chiudi();
    log.end();
    console.error("✗ il programma si è chiuso subito dopo il caricamento della pagina");
    console.error("  registro: " + path.relative(radice, percorsoLog));
    process.exit(1);
  }
  if (!/naturopata/i.test(titolo)) {
    chiudi();
    log.end();
    console.error("✗ la pagina si è caricata ma il titolo è inatteso: «" + titolo + "»");
    console.error("  registro: " + path.relative(radice, percorsoLog));
    process.exit(1);
  }

  console.log("ok · avvio riuscito: «" + titolo + "»");
  console.log("  pagina: " + indirizzo);
  console.log("  registro: " + path.relative(radice, percorsoLog));
  log.write("\n# esito: ok, pagina «" + titolo + "»\n");
  chiudi();
  log.end();
  process.exit(0);
}

main().catch((errore) => {
  console.error("✗ prova di avvio interrotta: " + (errore && errore.stack ? errore.stack : errore));
  process.exit(1);
});
