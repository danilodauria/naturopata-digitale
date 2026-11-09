#!/usr/bin/env node
/* ==========================================================================
   Naturopata Digitale · controllo dei link di download
   Licenza del codice: MIT · Danilo D'Auria

   Apre ogni indirizzo della release e verifica che risponda, che il file ci
   sia e che l'impronta dichiarata in SHA256SUMS.txt coincida con quella che
   GitHub ha calcolato al caricamento. Un link rotto non deve scoprirlo la
   persona che stava scaricando.

   Uso:
     node scripts/check-links.cjs              # ultima release
     node scripts/check-links.cjs v1.3.0       # un tag preciso

   Variabili: GITHUB_REPOSITORY, GITHUB_TOKEN (facoltativo, alza il limite di
   richieste), REPORT (dove scrivere il riepilogo dei problemi).
   ========================================================================== */

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const REPO = process.env.GITHUB_REPOSITORY || "danilodauria/naturopata-digitale";
const TAG = process.argv[2] || process.env.TAG || "";
const TOKEN = process.env.GITHUB_TOKEN || "";
const REPORT = process.env.REPORT || path.join(os.tmpdir(), "link-report.md");
const AGENTE = "naturopata-digitale-link-check";

// Tutto quello che una release deve contenere per essere scaricabile:
// sei pacchetti, i due fogli in PDF, il codice sorgente e le impronte.
const PACCHETTI = [
  "Naturopata-Digitale-Windows-x64.exe",
  "Naturopata-Digitale-Windows-portatile.zip",
  "Naturopata-Digitale-Linux-amd64.deb",
  "Naturopata-Digitale-Linux-x86_64.AppImage",
  "Naturopata-Digitale-Mac-arm64.dmg",
  "Naturopata-Digitale-Mac-x64.dmg"
];

const ATTESI = PACCHETTI.concat([
  "Naturopata-Digitale-Come-si-installa.pdf",
  "Naturopata-Digitale-Scheda-rapida.pdf",
  "Naturopata-Digitale-Sorgenti.zip",
  "SHA256SUMS.txt"
]);

function intestazioni() {
  const h = { Accept: "application/vnd.github+json", "User-Agent": AGENTE };
  if (TOKEN) h.Authorization = "Bearer " + TOKEN;
  return h;
}

async function trovaRelease() {
  const url = TAG
    ? "https://api.github.com/repos/" + REPO + "/releases/tags/" + TAG
    : "https://api.github.com/repos/" + REPO + "/releases/latest";
  const r = await fetch(url, { headers: intestazioni() });
  // Nessuna release ancora pubblicata non è un guasto: succede al primo avvio.
  if (r.status === 404) return null;
  if (!r.ok) {
    // 403 e 429 senza token sono il limite di richieste anonime, non un
    // guasto del repository: dirlo aiuta chi lancia lo script a mano.
    if ((r.status === 403 || r.status === 429) && !TOKEN) {
      throw new Error(
        "GitHub ha limitato le richieste anonime (" + r.status + "): rilancia con GITHUB_TOKEN impostato, " +
          "oppure guarda l'esito del workflow «Link di download», che in CI lo esegue con il suo token."
      );
    }
    throw new Error("l'API di GitHub ha risposto " + r.status + " per " + url);
  }
  return r.json();
}

const attesa = (ms) => new Promise((risolvi) => setTimeout(risolvi, ms));

// Il CDN di GitHub ogni tanto restituisce 404 su un allegato appena
// ri-caricato: tre tentativi distinguono il disguido dal guasto vero.
async function raggiungibile(url, tentativi = 3) {
  let stato = 0;
  let errore = "";
  for (let i = 1; i <= tentativi; i++) {
    try {
      const r = await fetch(url, { redirect: "follow", headers: { "User-Agent": AGENTE } });
      stato = r.status;
      // Il contenuto non serve: si chiude subito il corpo della risposta.
      if (r.body) { try { await r.body.cancel(); } catch (e) {} }
      if (stato >= 200 && stato < 300) return { ok: true, stato: stato };
    } catch (e) {
      errore = e.message;
    }
    if (i < tentativi) await attesa(5000);
  }
  return { ok: false, stato: stato, errore: errore };
}

/* --------------------------------------------------------------------------
   Siti di riferimento: i link esterni citati nelle pagine
   --------------------------------------------------------------------------
   Un sito che sparisce deve essere segnalato, non scoperto da chi legge. Si
   controllano gli indirizzi http(s) presenti nelle pagine del sito, esclusi
   quelli del progetto. Un 403, un 429 o una pagina di verifica età non sono
   link rotti: sono siti che non si lasciano leggere da uno script, e finiscono
   fra gli avvisi. Un 404, un 410 o un nome che non risolve sono guasti veri. */

const CARTELLE_ESCLUSE = ["node_modules", "backup", ".git", "desktop", "artifacts"];
const NOSTRO = /danilodauria\.github\.io\/naturopata-digitale/;
const UA_BROWSER =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36";
const TIMEOUT_MS = parseInt(process.env.EXTERNAL_TIMEOUT || "15000", 10);
const CONCORRENZA = 4;

function pagineHtml(cartella, trovate = []) {
  for (const voce of fs.readdirSync(cartella, { withFileTypes: true })) {
    if (CARTELLE_ESCLUSE.indexOf(voce.name) !== -1) continue;
    const pieno = path.join(cartella, voce.name);
    if (voce.isDirectory()) pagineHtml(pieno, trovate);
    else if (/\.html$/i.test(voce.name)) trovate.push(pieno);
    // I siti delle spezierie e le fonti stanno nei dati JavaScript: senza
    // questi file il controllo non vedrebbe proprio i riferimenti esterni.
    else if (/\.js$/i.test(voce.name) && path.basename(path.dirname(cartella)) === "assets") {
      trovate.push(pieno);
    }
  }
  return trovate;
}

function linkEsterni() {
  const radice = path.join(__dirname, "..");
  const visti = new Map();
  for (const pagina of pagineHtml(radice)) {
    const testo = fs.readFileSync(pagina, "utf8");
    const re = /https?:\/\/[^"'\s<>)\\]+/g;
    let m;
    while ((m = re.exec(testo))) {
      const url = m[0].replace(/&amp;/g, "&").replace(/[.,;:]+$/, "");
      if (NOSTRO.test(url)) continue;
      if (!visti.has(url)) visti.set(url, path.relative(radice, pagina));
    }
  }
  return Array.from(visti, ([url, dove]) => ({ url, dove }));
}

/* L'API di GitHub non serve HTML: se le si chiede text/html risponde 415, che
   non è un link rotto ma un modo sbagliato di chiedere. Agli endpoint dell'API
   si chiede JSON, alle pagine si chiede HTML. */
function accetta(url) {
  return /^https:\/\/api\.github\.com\//.test(url)
    ? "application/vnd.github+json"
    : "text/html,application/xhtml+xml";
}

async function statoEsterno(url) {
  for (let tentativo = 1; tentativo <= 2; tentativo++) {
    try {
      const r = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "User-Agent": UA_BROWSER, Accept: accetta(url) }
      });
      if (r.body) { try { await r.body.cancel(); } catch (e) {} }
      // Un 404 isolato può essere un singhiozzo del sito, non un link morto:
      // si riprova una volta prima di segnalarlo.
      if (r.status >= 400 && tentativo === 1) {
        await new Promise((p) => setTimeout(p, 800));
        continue;
      }
      return { stato: r.status };
    } catch (e) {
      if (tentativo === 2) {
        return { stato: 0, errore: e.name === "TimeoutError" ? "tempo scaduto" : e.message };
      }
    }
  }
  return { stato: 0, errore: "errore di rete" };
}

function classifica(esito) {
  if (esito.stato >= 200 && esito.stato < 400) return "ok";
  if ([202, 401, 403, 405, 406, 412, 429, 503].indexOf(esito.stato) !== -1) return "bloccato";
  return "rotto";
}

async function controllaEsterni() {
  const link = linkEsterni();
  console.log("Siti di riferimento da controllare: " + link.length);
  const esiti = [];
  let indice = 0;
  async function operaio() {
    while (indice < link.length) {
      const voce = link[indice++];
      const esito = await statoEsterno(voce.url);
      esiti.push(Object.assign({}, voce, esito, { classe: classifica(esito) }));
    }
  }
  await Promise.all(Array.from({ length: CONCORRENZA }, operaio));
  const ordine = { rotto: 0, bloccato: 1, ok: 2 };
  esiti.sort((a, b) => ordine[a.classe] - ordine[b.classe] || a.url.localeCompare(b.url));
  const rotti = esiti.filter((e) => e.classe === "rotto");
  const bloccati = esiti.filter((e) => e.classe === "bloccato");
  const ok = esiti.filter((e) => e.classe === "ok");
  ok.forEach((e) => console.log("✓ " + e.url + " (HTTP " + e.stato + ")"));
  bloccati.forEach((e) => console.log("… " + e.url + " (HTTP " + e.stato + " · non verificabile da script)"));
  rotti.forEach((e) =>
    console.log("✗ " + e.url + " (HTTP " + (e.stato || "errore") + (e.errore ? " · " + e.errore : "") + ")")
  );
  return { totale: link.length, ok, bloccati, rotti };
}

(async function main() {
  const soloEsterni = process.argv.indexOf("--esterni") !== -1;
  let rel = null;
  let erroreRelease = "";
  if (!soloEsterni) {
    try {
      rel = await trovaRelease();
    } catch (e) {
      // Il limite di richieste anonime non è un link rotto: si annota e si
      // prosegue con i siti esterni, che restano controllabili.
      erroreRelease = e.message;
      console.log("Release non controllata: " + erroreRelease);
    }
    if (!rel && !erroreRelease) {
      console.log("Nessuna release pubblicata" + (TAG ? " per " + TAG : "") + ": niente da controllare per la release.");
    }
  }

  const problemi = [];
  const avvisi = [];

  if (rel) {
  console.log("Release " + rel.tag_name + " · " + rel.assets.length + " allegati");
  const perNome = new Map(rel.assets.map((a) => [a.name, a]));

  for (const nome of ATTESI) {
    if (!perNome.has(nome)) {
      problemi.push([nome, "manca nella release"]);
      continue;
    }
    const a = perNome.get(nome);
    const esito = await raggiungibile(a.browser_download_url);
    if (esito.ok) console.log("✓ " + nome + " (HTTP " + esito.stato + ")");
    else {
      problemi.push([
        nome,
        "HTTP " + (esito.stato || "errore") +
          (esito.errore ? " · " + esito.errore : "") +
          " · " + a.browser_download_url
      ]);
    }
  }

  // Le impronte: il digest lo calcola GitHub al caricamento, quindi si può
  // confrontare senza riscaricare centinaia di megabyte.
  const sha = perNome.get("SHA256SUMS.txt");
  if (sha) {
    const r = await fetch(sha.browser_download_url, { redirect: "follow", headers: { "User-Agent": AGENTE } });
    if (!r.ok) {
      problemi.push(["SHA256SUMS.txt", "non scaricabile (HTTP " + r.status + ")"]);
    } else {
      const testo = await r.text();
      const indicati = new Map();
      for (const riga of testo.split("\n")) {
        const m = riga.trim().match(/^([0-9a-f]{64})\s+\*?(.+)$/i);
        if (m) indicati.set(m[2].trim(), m[1].toLowerCase());
      }
      for (const [nome, hash] of indicati) {
        const a = perNome.get(nome);
        if (!a) {
          problemi.push([nome, "elencato in SHA256SUMS.txt ma non presente nella release"]);
          continue;
        }
        const digest = String(a.digest || "").replace(/^sha256:/, "").toLowerCase();
        if (!digest) problemi.push([nome, "GitHub non dichiara un digest per questo file"]);
        else if (digest !== hash) problemi.push([nome, "impronta diversa da quella pubblicata"]);
        else console.log("  impronta ok: " + nome);
      }
      // I sei pacchetti devono comparire tutti: sono quelli che la pagina
      // presenta come scaricabili, e le impronte si controllano proprio lì.
      for (const nome of PACCHETTI) {
        if (!indicati.has(nome)) problemi.push([nome, "non compare in SHA256SUMS.txt"]);
      }
    }
  }

  } /* fine dei controlli sulla release */

  const esterni = await controllaEsterni();
  esterni.rotti.forEach((e) =>
    problemi.push([
      e.url,
      "sito non raggiungibile (HTTP " + (e.stato || "errore") + (e.errore ? " · " + e.errore : "") + ") · citato in " + e.dove
    ])
  );
  esterni.bloccati.forEach((e) =>
    avvisi.push([e.url, "HTTP " + e.stato + " · non verificabile da script (blocco bot o verifica età) · citato in " + e.dove])
  );

  if (!problemi.length) {
    console.log(
      "Link controllati: " +
        (rel ? ATTESI.length + " della release, " : "") +
        esterni.totale +
        " esterni. Nessun link rotto" +
        (avvisi.length ? "; " + avvisi.length + " non verificabili da script." : ".")
    );
    if (avvisi.length) {
      console.log("Avvisi:\n" + avvisi.map(([u, p]) => "- " + u + " · " + p).join("\n"));
    }
    try { fs.rmSync(REPORT, { force: true }); } catch (e) {}
    return;
  }

  const tabella = problemi
    .map(([nome, p]) => "| `" + nome + "` | " + String(p).replace(/\|/g, "\\|") + " |")
    .join("\n");
  const corpo = [
    "# Link non raggiungibili",
    "",
    "Controllo del " + new Date().toISOString().slice(0, 16).replace("T", " ") +
      " UTC" + (rel ? " sulla release **" + rel.tag_name + "**" : "") + ": allegati della release e siti di riferimento citati nelle pagine.",
    "",
    "| Risorsa | Problema |",
    "|---|---|",
    tabella,
    "",
    avvisi.length
      ? "## Non verificabili da script\n\nQuesti siti rispondono con un blocco anti-bot o una verifica età: non sono link rotti, ma non si possono controllare automaticamente.\n\n| Risorsa | Nota |\n|---|---|\n" +
        avvisi.map(([nome, p]) => "| `" + nome + "` | " + String(p).replace(/\|/g, "\\|") + " |").join("\n")
      : "",
    "",
    "Il controllo gira ogni giorno e dopo ogni pubblicazione. Quando i link tornano a posto, la segnalazione si chiude da sola alla verifica successiva.",
    ""
  ].join("\n");

  fs.writeFileSync(REPORT, corpo);
  console.error(corpo);
  process.exit(1);
})();
