/* ==========================================================================
   Naturopata Digitale · scompattazione del motore vocale
   Il motore vocale facoltativo arriva da GitHub come ZIP (Windows) o come
   tar.gz (Linux). Qui si apre dentro il programma, senza unzip né tar di
   sistema: l'archivio è già stato verificato con la sua impronta SHA-256.
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

// Ogni file finisce dentro la cartella «piper» della voce: un nome con «..» o
// un percorso assoluto non deve poter uscire da lì.
function destinazione(dove, relativo) {
  const radice = path.join(dove, "piper");
  const pulito = String(relativo).replace(/\\/g, "/");
  if (!pulito || pulito.startsWith("/") || pulito.split("/").indexOf("..") !== -1) return null;
  const fine = path.join(radice, pulito);
  if (fine !== radice && !fine.startsWith(radice + path.sep)) return null;
  return fine;
}

// Windows: un solo archivio ZIP con dentro la cartella piper/. Lo si legge
// qui, senza dipendenze: l'indice centrale dice dove comincia ogni file, e i
// dati compressi si aprono con zlib (metodo 8) o si copiano tali e quali.
function estraiZip(archivio, dove) {
  const dati = Buffer.from(archivio);
  let fine = -1;
  for (let i = dati.length - 22; i >= 0 && i >= dati.length - 66560; i -= 1) {
    if (dati.readUInt32LE(i) === 0x06054b50) { fine = i; break; }
  }
  if (fine < 0) throw new Error("archivio ZIP non riconosciuto");

  const quante = dati.readUInt16LE(fine + 10);
  let cursore = dati.readUInt32LE(fine + 16);

  for (let n = 0; n < quante; n += 1) {
    if (cursore + 46 > dati.length || dati.readUInt32LE(cursore) !== 0x02014b50) break;
    const modo = (dati.readUInt16LE(cursore + 38) >>> 12) & 0o777;
    const metodo = dati.readUInt16LE(cursore + 10);
    const compresso = dati.readUInt32LE(cursore + 20);
    const lunghezzaNome = dati.readUInt16LE(cursore + 28);
    const lunghezzaExtra = dati.readUInt16LE(cursore + 30);
    const lunghezzaNota = dati.readUInt16LE(cursore + 32);
    const inizio = dati.readUInt32LE(cursore + 42);
    const nome = dati.subarray(cursore + 46, cursore + 46 + lunghezzaNome).toString("utf8");
    cursore += 46 + lunghezzaNome + lunghezzaExtra + lunghezzaNota;

    if (!nome.startsWith("piper/") || nome.endsWith("/")) continue;
    const relativo = nome.slice("piper/".length);
    const fineFile = destinazione(dove, relativo);
    if (!fineFile) continue;

    // Intestazione locale: nome ed extra possono avere lunghezze diverse.
    if (inizio + 30 > dati.length || dati.readUInt32LE(inizio) !== 0x04034b50) continue;
    const da = inizio + 30 + dati.readUInt16LE(inizio + 26) + dati.readUInt16LE(inizio + 28);
    const grezzo = dati.subarray(da, da + compresso);
    const contenuto = metodo === 8 ? zlib.inflateRawSync(grezzo) : grezzo;

    fs.mkdirSync(path.dirname(fineFile), { recursive: true });
    fs.writeFileSync(fineFile, contenuto);
    if (modo) fs.chmodSync(fineFile, modo);
  }
}

function testo(blocco, da, a) {
  const pezzo = blocco.subarray(da, a);
  const fine = pezzo.indexOf(0);
  return pezzo.subarray(0, fine === -1 ? pezzo.length : fine).toString("utf8");
}

function numero(blocco, da, a) {
  const scritto = testo(blocco, da, a).trim();
  if (!scritto) return 0;
  const valore = parseInt(scritto, 8);
  return Number.isFinite(valore) ? valore : 0;
}

// Linux: tar.gz, che porta anche i permessi (il motore deve restare
// eseguibile) e i collegamenti simbolici alle librerie.
function estraiTar(archivio, dove) {
  const dati = zlib.gunzipSync(archivio);
  let i = 0;
  let nomeLungo = null;
  let linkLungo = null;

  while (i + 512 <= dati.length) {
    const blocco = dati.subarray(i, i + 512);
    let vuoto = true;
    for (let k = 0; k < 512; k += 1) {
      if (blocco[k] !== 0) { vuoto = false; break; }
    }
    if (vuoto) break;

    const modo = numero(blocco, 100, 108) & 0o777;
    const dimensione = numero(blocco, 124, 136);
    const tipo = String.fromCharCode(blocco[156] || 48);
    const inizio = i + 512;
    const corpo = dati.subarray(inizio, inizio + dimensione);
    const prefisso = testo(blocco, 345, 500);
    const corto = testo(blocco, 0, 100);
    const nome = nomeLungo || (prefisso ? prefisso + "/" + corto : corto);
    const link = linkLungo || testo(blocco, 157, 257);
    i = inizio + Math.ceil(dimensione / 512) * 512;

    // Intestazioni estese: portano i nomi lunghi e i link lunghi.
    if (tipo === "x" || tipo === "g" || tipo === "L" || tipo === "K") {
      const contenuto = corpo.toString("utf8");
      if (tipo === "L") nomeLungo = contenuto.replace(/\0+$/, "");
      else if (tipo === "K") linkLungo = contenuto.replace(/\0+$/, "");
      else {
        const percorso = /\d+ path=([^\n]*)/.exec(contenuto);
        if (percorso) nomeLungo = percorso[1];
        const bersaglio = /\d+ linkpath=([^\n]*)/.exec(contenuto);
        if (bersaglio) linkLungo = bersaglio[1];
      }
      continue;
    }

    if (nome.startsWith("piper/")) {
      const relativo = nome.slice("piper/".length);
      const fine = relativo ? destinazione(dove, relativo) : null;
      if (fine) {
        if (tipo === "5") {
          fs.mkdirSync(fine, { recursive: true });
        } else if (tipo === "2") {
          const bersaglio = String(link).replace(/\\/g, "/");
          const sicuro = bersaglio && !bersaglio.startsWith("/") && bersaglio.split("/").indexOf("..") === -1;
          if (sicuro) {
            fs.mkdirSync(path.dirname(fine), { recursive: true });
            try { fs.unlinkSync(fine); } catch (e) { /* non c'era */ }
            fs.symlinkSync(bersaglio, fine);
          }
        } else if (tipo === "1") {
          const origine = destinazione(dove, String(link).replace(/^piper\//, ""));
          if (origine) {
            fs.mkdirSync(path.dirname(fine), { recursive: true });
            try { fs.linkSync(origine, fine); } catch (e) { /* già presente */ }
          }
        } else {
          fs.mkdirSync(path.dirname(fine), { recursive: true });
          fs.writeFileSync(fine, Buffer.from(corpo));
          if (modo) fs.chmodSync(fine, modo);
        }
      }
    }

    nomeLungo = null;
    linkLungo = null;
  }
}

function scompattaMotore(archivio, dove, tipo) {
  const dati = Buffer.isBuffer(archivio) ? archivio : Buffer.from(archivio);
  fs.mkdirSync(path.join(dove, "piper"), { recursive: true });
  if (tipo === "tar") return estraiTar(dati, dove);
  return estraiZip(dati, dove);
}

module.exports = { scompattaMotore, estraiTar, estraiZip };
