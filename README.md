# Naturopata Digitale

**Il sapere gentile delle piante.** Erbario interattivo con 60 schede, manuale,
fitoalimurgia, schede di benessere, sopravvivenza in tre livelli, biblioteca
storica, quiz e **Neura**, un assistente di conoscenza locale che spiega e
controlla. Tutto in italiano, senza account, senza pubblicità e funzionante
anche offline.

> Un progetto indipendente di **Danilo D'Auria** · un progetto **FeniceOS**.

---

## Che cosa è

Naturopata Digitale è una **PWA statica** (HTML, CSS, JavaScript, senza
dipendenze a runtime) dedicata alla naturopatia, alla fitoterapia, alle piante
officinali e alla fitoalimurgia. Nasce dallo stesso spirito dei progetti
Professore Digitale, Consulente Digitale e Il Grande Quiz: contenuti chiari,
strumenti semplici, nessun tracciamento, uso anche senza Internet.

Non è un manuale di medicina e non promette guarigioni. È un'opera divulgativa
che prova a mettere insieme **tradizione, evidenza scientifica e sicurezza**.

## Che cosa contiene

| Sezione | Contenuto |
|---|---|
| **Erbario** | 60 schede di piante officinali, aromatiche e alimentari, dalla A alla Z: proprietà, usi, preparazioni, sicurezza, sosia pericolosi, evidenza, curiosità e fonti. |
| **Manuale** | 18 capitoli in 5 parti: fondamenti, linguaggio delle piante, fitoalimurgia, olistica pratica, consapevolezza. |
| **Fitoalimurgia** | Regole del raccolto responsabile, 46 piante commestibili, 10 piante tossiche da riconoscere, preparazioni di base. |
| **Sopravvivenza** | Tre livelli (base, intermedio, esperto), 27 schede pratiche, kit essenziale, errori da evitare, norme italiane e fonti istituzionali. |
| **Biblioteca** | *I Discorsi* di Pietro Andrea Mattioli: storia, struttura dell'opera, edizioni digitalizzate in pubblico dominio, lezioni di metodo e fonti. |
| **Benessere** | 8 schede tematiche (sonno, stress, digestione, pelle, vie respiratorie, ciclo, articolazioni, difese) con piante collegate e segnali d'allarme. |
| **Quiz** | 85 domande in 6 categorie e 3 livelli, con timer opzionale, spiegazioni, ripasso degli errori e statistiche locali. |
| **Desktop** | Pacchetti per Windows (`.exe`), Linux (`.deb`, AppImage) e macOS (`.dmg`), generati da GitHub Actions. |
| **Calendario** | 12 mesi di raccolte e lavori, con collegamenti alle schede. |
| **Glossario** | 44 termini di botanica e fitoterapia, con ricerca istantanea. |
| **Sicurezza** | Segnali d'allarme, piante tossiche, tabella delle interazioni, fonti e numeri utili. |
| **Neura** | Assistente locale: spiegazioni, ricerca, controllo di sicurezza, quiz generati. |
| **Licenze** | Testi delle licenze, privacy, FAQ, backup e installazione. |

## Neura, l'assistente locale

Neura **non è un modello linguistico generativo** e non chiama servizi esterni.
È un motore di conoscenza locale composto da:

- un indice di ricerca pesato su schede, capitoli, glossario, schede di
  benessere e tabelle di sicurezza;
- un riconoscimento degli intenti (spiegazione, preparazione, raccolta,
  sicurezza, sosia, uso alimentare, confronto, quiz);
- un motore di controllo che incrocia piante, farmaci, gravidanza, allattamento,
  età, fegato, reni e interventi chirurgici;
- regole esplicite per i segnali d'allarme, con rinvio immediato al 112/118.

Quando non trova una risposta affidabile, **lo dice**. È una scelta di progetto:
meglio un assistente che ammette i limiti che una macchina che sembra sapere
tutto. Tutte le risposte restano sul dispositivo e non vengono registrate.

## Sicurezza e deontologia

- Il programma è **educativo**: non diagnostica, non prescrive, non cura.
- Le dosi sono indicative e tratte dalla tradizione e dalle monografie europee.
- Le schede riportano controindicazioni, interazioni, gravidanza, allattamento
  e bambini.
- Una pagina intera è dedicata ai **sintomi che richiedono un medico** e alle
  **piante tossiche**.
- Neura non sostituisce medico, farmacista o dietista. In caso di sintomi
  importanti, la priorità è la valutazione sanitaria.

## Usarlo online

Il programma è pensato per GitHub Pages:

```
https://danilodauria.github.io/naturopata-digitale/
```

La prima apertura salva l'applicazione nella cache del browser. Le aperture
successive funzionano anche senza connessione.

## Usarlo offline

### Installazione come app

- **Android (Chrome)**: menu ⋮ → *Installa app* (oppure *Aggiungi alla
  schermata Home*).
- **iPhone / iPad (Safari)**: *Condividi* → *Aggiungi alla schermata Home*.
- **Computer**: apri il sito, poi usa l'opzione di installazione del browser.
  In alternativa scarica il repository e apri `index.html`.

### Senza server

Tutti i contenuti sono in file locali: puoi copiare la cartella su una chiavetta
USB e aprire `index.html` con un doppio clic. In questa modalità il service
worker non si attiva (i browser lo consentono solo su `http`/`https`), ma
l'applicazione funziona comunque perché non usa `fetch` per i dati.

### Programma installabile

Le release GitHub contengono anche i pacchetti per computer:

- **Windows**: installer NSIS (`.exe`) e versione portabile in `.zip`;
- **Linux**: `.deb` per Debian/Ubuntu e `.AppImage` per le altre distribuzioni;
- **macOS**: `.dmg` per Intel e Apple Silicon.

I nomi dei file sono stabili tra le versioni, così i link della pagina di
download non cambiano:

| File | Contenuto |
|---|---|
| `Naturopata-Digitale-Windows-x64.exe` | Installer per Windows 10 e 11 |
| `Naturopata-Digitale-Windows-portatile.zip` | App scompattata, senza installazione |
| `Naturopata-Digitale-Linux-amd64.deb` | Pacchetto Debian/Ubuntu |
| `Naturopata-Digitale-Linux-x86_64.AppImage` | Eseguibile per ogni distribuzione |
| `Naturopata-Digitale-Mac-arm64.dmg` | Apple Silicon |
| `Naturopata-Digitale-Mac-x64.dmg` | Mac Intel |

### Pagina di download

`scarica/index.html` è una pagina statica autonoma, sul modello di quella del
Professore Digitale: badge, istruzioni per telefono e tablet, pulsanti per i
tre sistemi, i tre Vademecum e la sezione sulle licenze. Non usa JavaScript per
funzionare e non dipende dal foglio di stile dell'app.

I pulsanti puntano a `releases/latest/download/<nome file>`, quindi mostrano
sempre l'ultima release senza modifiche al codice. La pagina è collegata dal
footer, dalla fascia «Novità» della home e dal pannello desktop della pagina
Licenze, ed è inclusa in `_site` dal workflow di Pages.

Sono build non firmate: Windows SmartScreen e macOS Gatekeeper possono chiedere
una conferma. Su macOS, al primo avvio, usa tasto destro → *Apri*. Su Linux,
per l'AppImage, rendi eseguibile il file con `chmod +x`.

I pacchetti sono generati automaticamente da `.github/workflows/desktop.yml`
su Windows, Linux e macOS. Vedi la sezione [Programma desktop](#programma-desktop).

## Sviluppo locale

Non serve compilare nulla. Per un'anteprima con service worker:

```bash
python3 -m http.server 3000 --bind 0.0.0.0
# poi apri http://localhost:3000
```

oppure:

```bash
npm run serve
```

## Test

I test verificano dati, collegamenti interni, risposte di Neura, rendering delle
pagine, ricerca, preferiti, quiz, chat e pannello di sicurezza.

```bash
npm install
npm test
```

- `npm run test:data` — integrità dei contenuti e logica di Neura (senza browser).
- `npm run test:dom` — rendering e interazioni con jsdom.

I test non sono necessari per pubblicare il sito e non vengono caricati
all'interno dell'applicazione.

Quando aggiorni i contenuti, incrementa `VERSION` in `sw.js` (per esempio
`nd-v1.2.0`): il service worker elimina la cache vecchia e serve la nuova
versione. I file `.pdf` sono esclusi dalla cache: si scaricano su richiesta e
non occupano spazio senza un gesto esplicito.

## Vademecum in PDF

La guida tascabile è generata in tre versioni, tutte scaricabili dalla pagina
**Licenze** e dal footer:

| File | Formato | Uso |
|---|---|---|
| `vademecum-naturopata-digitale.pdf` | A5, 28 pagine | Lettura su schermo e stampa tascabile |
| `vademecum-naturopata-digitale-a4.pdf` | A4, 28 pagine | Stampa domestica con margini di sicurezza |
| `vademecum-naturopata-digitale-libricino-a4.pdf` | A4 orizzontale, 14 facciate | Libricino A5 già imposto: 7 fogli, fronte-retro |

Contengono segnali d'allarme, dieci piante tossiche, confusioni pericolose,
interazioni con i farmaci, decalogo della raccolta, calendario, forme d'uso,
le 60 piante in tabella, glossario e fonti.

Per il libricino: stampa su A4 orizzontale, fronte-retro con rilegatura sul
**lato corto**, al 100% (nessun adattamento). Piega i fogli a metà, raccoglili
nell'ordine e cuci al centro con due punti metallici. Se il retro esce
capovolto, usa la rilegatura sul lato lungo: dipende dal driver della
stampante. L'ordine delle pagine è già impostato, non va modificato.

I PDF non sono scritti a mano: il generatore legge gli stessi dati dell'app e
compone il documento, quindi quando una scheda cambia si rigenera tutto.

```bash
python3 -m venv .venv
.venv/bin/pip install reportlab pymupdf
.venv/bin/python scripts/build_vademecum.py   # oppure: npm run vademecum
```

Serve Python 3 e Node (per esportare i dati). Il PDF A5 richiede `reportlab`;
le versioni A4 e libricino usano `pymupdf` per l'impaginazione di stampa.

## Programma desktop

Il contenitore Electron è in `desktop/`: carica la stessa app statica, apre i
link esterni nel browser e non richiede rete. La build usa `electron-builder`.

```bash
node scripts/prepare-desktop.cjs   # copia il sito in desktop/app
cd desktop
npm install
npm start                          # prova locale
npm run dist:linux                 # .deb + AppImage
npm run dist:win                   # installer .exe (NSIS)
npm run dist:mac                   # .dmg (Intel + Apple Silicon)
```

Non è necessario compilare tutto sul proprio computer: il workflow
`.github/workflows/desktop.yml` esegue la build su runner nativi. Si avvia a
mano da **Actions → Pacchetti desktop → Run workflow**, oppure creando un tag
`v1.2.0` (in quel caso i file vengono allegati alla release).

I pacchetti non sono firmati con certificati commerciali. Per distribuirli
senza avvisi servono un certificato Windows (code signing) e la notarizzazione
Apple, che richiedono account e credenziali propri: non sono inclusi nel
repository.

`desktop/app/`, `desktop/dist/` e `desktop/node_modules/` sono generati e non
vanno versionati.

## Pubblicare su GitHub Pages

1. Crea un repository chiamato `naturopata-digitale` (o un altro nome).
2. Carica il contenuto di questa cartella nel ramo `main`.
3. Vai su **Settings → Pages** e imposta *Source* su **GitHub Actions**.
4. Il workflow `.github/workflows/pages.yml` pubblica il sito a ogni push.
5. L'indirizzo sarà `https://<utente>.github.io/<repository>/`.

Per pubblicare anche i pacchetti desktop, crea un tag con la stessa versione
di `package.json` e invialo insieme al ramo:

```bash
git tag v1.2.0
git push origin main --tags
```

Il workflow `desktop.yml` compila su Windows, Linux e macOS e allega i file a
una release con lo stesso nome del tag. La pagina `scarica/` li trova da sola.

Se il repository ha un nome diverso, aggiorna i link di citazione in
`views.licenze` e nel footer. Il manifest e il service worker usano percorsi
relativi e funzionano anche in una sottocartella.

## Struttura

```
index.html                 # shell dell'applicazione
scarica/index.html         # pagina di presentazione e download
manifest.webmanifest       # PWA
sw.js                      # cache offline
assets/
  css/styles.css           # design system completo
  img/icon.svg             # icona vettoriale
  img/icon-192.png         # icona PWA
  img/icon-512.png         # icona PWA / maskable
  js/
    data-plants*.js        # 60 schede piante (cinque file)
    data-manual*.js        # 18 capitoli
    data-extra*.js         # benessere, calendario, tossiche, glossario, FAQ
    data-quiz*.js          # 85 domande
    data-library.js        # Matthioli e sopravvivenza
    neura.js               # motore locale
    app.js                 # nucleo, routing, home, erbario
    app-views.js           # manuale, fito, benessere, calendario, licenze
    app-library.js         # viste Matthioli e sopravvivenza
    app-quiz.js            # motore del quiz
    app-neura.js           # interfaccia chat e controllo
    app-init.js            # eventi globali e avvio
scripts/make_icons.py      # rigenera le icone PNG
scripts/export-data.cjs    # esporta i dati dell'app in JSON
scripts/build_vademecum.py # genera il Vademecum in PDF
scripts/prepare-desktop.cjs # prepara desktop/app
assets/pdf/                # Vademecum A5, A4 e libricino imposto
desktop/                   # contenitore Electron e build .exe/.deb/.dmg
tests/                     # test dati e DOM
.github/workflows/         # GitHub Pages e pacchetti desktop
```

## Fonti e metodo

Le schede citano fonti specifiche (EMA, PubMed, NIH, EFSA, Ministero della
Salute). La pagina **Sicurezza e fonti** raccoglie i riferimenti generali.
L'evidenza è descritta in modo onesto: quando è limitata, è scritto. Non tutte
le tradizioni sono efficaci e non tutte le piante sono sicure.

## Licenze

- **Codice**: MIT — vedi [LICENSE](LICENSE).
- **Contenuti**: CC BY-NC-SA 4.0 — vedi [LICENSE-CONTENT.md](LICENSE-CONTENT.md).
- **Attribuzione**: «Naturopata Digitale — Il sapere gentile delle piante» di
  Danilo D'Auria, un progetto FeniceOS, CC BY-NC-SA 4.0.

## Limitazioni note

- Non è un dispositivo medico e non sostituisce una visita.
- Le informazioni sulle piante non sono esaustive: esistono specie, interazioni
  e condizioni individuali non coperte.
- Neura è un motore di retrieval e regole, non un'IA generativa: non risponde a
  domande fuori dal corpus e non apprende dalle conversazioni.
- Il programma non raccoglie dati, quindi non può sincronizzare i progressi tra
  dispositivi. Il backup JSON serve a questo.
- La pagina Sopravvivenza è divulgativa e non sostituisce un corso di primo
  soccorso, topografia o soccorso alpino. In emergenza la priorità è chiamare
  il 112.
- La pagina su Mattioli è una guida storica: non riproduce il testo originale e
  non usa le indicazioni mediche del Cinquecento come consigli attuali.
- I pacchetti desktop non sono firmati: il sistema operativo può chiedere una
  conferma esplicita all'apertura.

## Crediti

Ideato, scritto e sviluppato da **Danilo D'Auria**, autore anche del
[Professore Digitale](https://danilodauria.github.io/professore-digitale/), del
[Consulente Digitale](https://danilodauria.github.io/consulente-digitale/), di
FeniceOS e del libro «Tecnologia Gentile: Informatica Sostenibile».

Versione **1.2.0** · ottobre 2026.
