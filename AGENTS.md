# AGENTS.md — naturopata-digitale

Se sei un assistente IA che riprende il lavoro qui, **prima di tutto leggi** il file di consegna comune:
https://github.com/danilodauria/danilodauria.github.io/blob/main/HANDOFF.md

Regola fondamentale: **non riscrivere, rinominare o rifattorizzare ciò che funziona.** Prima un piano dettagliato, poi la conferma di Danilo, poi il codice.

## In questo repository

- **Cos'è**: app statica (PWA) offline, della stessa famiglia di psicologo-digitale, con pacchetti desktop.
- **Leggi nell'ordine**: README.md → ultimi commit (`git log --oneline -30`) → il resto della cartella.
- **Verifica prima e dopo ogni modifica**: `node tests/verify.cjs` (controlli dei dati e del service worker). `npm test` esegue anche altre prove che richiedono strumenti installati: se falliscono per mancanza di strumenti, non è colpa della tua modifica, ma dillo.
- **Robot attivi**: Pacchetti desktop (a ogni push su main e sui tag v*), Pagine (push su main), Link (ogni giorno), Foglio (sui tag). Non modificarli.
- **Da sapere**: per un commit di sola consegna scrivi `[skip ci]` nel messaggio, così non parte la compilazione dei pacchetti.

Dopo il lavoro aggiungi una riga al registro: https://github.com/danilodauria/danilodauria.github.io/blob/main/HANDOFF-REGISTRO.md
