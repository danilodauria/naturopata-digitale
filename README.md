# Naturopata Digitale

**Il sapere gentile delle piante.** Erbario interattivo, manuale, fitoalimurgia,
schede di benessere, quiz e **Neura**, un assistente di conoscenza locale che
spiega e controlla. Tutto in italiano, senza account, senza pubblicità e
funzionante anche offline.

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
| **Erbario** | 27 schede di piante officinali, aromatiche e alimentari: proprietà, usi, preparazioni, sicurezza, sosia pericolosi, evidenza, curiosità e fonti. |
| **Manuale** | 18 capitoli in 5 parti: fondamenti, linguaggio delle piante, fitoalimurgia, olistica pratica, consapevolezza. |
| **Fitoalimurgia** | Regole del raccolto responsabile, 23 piante commestibili, 10 piante tossiche da riconoscere, preparazioni di base. |
| **Benessere** | 8 schede tematiche (sonno, stress, digestione, pelle, vie respiratorie, ciclo, articolazioni, difese) con piante collegate e segnali d'allarme. |
| **Quiz** | 85 domande in 6 categorie e 3 livelli, con timer opzionale, spiegazioni, ripasso degli errori e statistiche locali. |
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
`nd-v1.0.1`): il service worker elimina la cache vecchia e serve la nuova
versione.

## Pubblicare su GitHub Pages

1. Crea un repository chiamato `naturopata-digitale` (o un altro nome).
2. Carica il contenuto di questa cartella nel ramo `main`.
3. Vai su **Settings → Pages** e imposta *Source* su **GitHub Actions**.
4. Il workflow `.github/workflows/pages.yml` pubblica il sito a ogni push.
5. L'indirizzo sarà `https://<utente>.github.io/<repository>/`.

Se il repository ha un nome diverso, aggiorna i link di citazione in
`views.licenze` e nel footer. Il manifest e il service worker usano percorsi
relativi e funzionano anche in una sottocartella.

## Struttura

```
index.html                 # shell dell'applicazione
manifest.webmanifest       # PWA
sw.js                      # cache offline
assets/
  css/styles.css           # design system completo
  img/icon.svg             # icona vettoriale
  img/icon-192.png         # icona PWA
  img/icon-512.png         # icona PWA / maskable
  js/
    data-plants*.js        # 27 schede piante
    data-manual*.js        # 18 capitoli
    data-extra*.js         # benessere, calendario, tossiche, glossario, FAQ
    data-quiz*.js          # 85 domande
    neura.js               # motore locale
    app.js                 # nucleo, routing, home, erbario
    app-views.js           # manuale, fito, benessere, calendario, licenze
    app-quiz.js            # motore del quiz
    app-neura.js           # interfaccia chat e controllo
    app-init.js            # eventi globali e avvio
scripts/make_icons.py      # rigenera le icone PNG
tests/                     # test dati e DOM
.github/workflows/         # pubblicazione GitHub Pages
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

## Crediti

Ideato, scritto e sviluppato da **Danilo D'Auria**, autore anche del
[Professore Digitale](https://danilodauria.github.io/professore-digitale/), del
[Consulente Digitale](https://danilodauria.github.io/consulente-digitale/), di
FeniceOS e del libro «Tecnologia Gentile: Informatica Sostenibile».

Versione **1.0.0** · ottobre 2026.
