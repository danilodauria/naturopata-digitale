# Promemoria · prossimo aggiornamento

Segnato il **10 novembre 2026**, con la versione **1.3.39** pubblicata.

## Quando

Al prossimo cambio di contenuto dell'app: schede, quiz, manuale, PDF, pagine del
sito o pacchetti desktop. Una modifica ai soli strumenti o ai test non cambia la
versione.

## Cosa fare, in ordine

1. `npm test` verde prima di toccare la versione.
2. Alzare il numero in **tutti** i punti: `package.json`,
   `desktop/package.json`, `sw.js` (`VERSION`), `index.html`, `versioni.html`,
   `scheda-rapida.html`, `come-installare.html`, `assets/js/app-views.js`,
   `assets/js/app.js` (blocco «Novità») e `scarica/index.html`.
3. `npm run fogli` e `npm run vademecum`: i PDF dichiarano da soli la versione.
4. `npm run desktop:prepare`, poi `npm test` di nuovo.
5. `npm run salva -- "messaggio"`: commit e backup, allineati allo stesso commit.
6. Tag `vX.Y.Z`, push di `main` e del tag con la chiave deploy temporanea, poi
   distruzione della chiave e verifica che l'elenco sia vuoto.
7. Attendere i pacchetti: la release deve avere i sei programmi, i PDF (compresi
   i due fogli di prova), i sorgenti e `SHA256SUMS.txt`. Controllare il sito su
   Pages e che la versione in fondo alle pagine sia quella nuova.

## Come accorgersene

`npm test` fallisce se un foglio PDF dichiara una versione diversa da
`package.json`; il workflow `foglio.yml` rifiuta di allegare un foglio rimasto
indietro. Il resto lo dicono le pagine: se il sito mostra due numeri diversi,
manca un punto dell'elenco qui sopra.
