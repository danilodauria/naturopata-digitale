# Ripristinare il backup su un computer nuovo

L'archivio `Naturopata-Digitale-backup-AAAA-MM-GG-vX.Y.Z.zip` basta da solo a
rimettere in piedi il progetto: dentro c'è tutto ciò che è versionato. Questa è
la versione breve del `LEGGIMI-BACKUP.txt` che trovi nell'archivio, con in più
la prova di ripristino eseguita sul backup della 1.3.28.

## 1. Che cosa serve

- Node.js 20 o successivo (`node -v`);
- un estrattore zip (Windows e macOS lo hanno già);
- Python 3, solo per `npm run serve` e per rigenerare i PDF.

## 2. Controlla l'impronta

Apri il terminale nella cartella dove hai scaricato l'archivio.

```bash
sha256sum -c Naturopata-Digitale-backup-AAAA-MM-GG-vX.Y.Z.zip.sha256.txt
```

Deve rispondere `OK`. In PowerShell:

```powershell
Get-FileHash .\Naturopata-Digitale-backup-AAAA-MM-GG-vX.Y.Z.zip -Algorithm SHA256
```

Il valore deve coincidere con quello scritto nel file `.sha256.txt` accanto
all'archivio.

## 3. Estrai, due livelli

1. Estrai l'archivio scaricato: ottieni una cartella con cinque file
   (`Naturopata-Digitale-X.Y.Z.zip`, `ELENCO-FILE.txt`, `SHA256SUMS.txt`,
   `backup.json`, `LEGGIMI-BACKUP.txt`) e la cartella `documenti/`.
2. Estrai anche il secondo zip: è il progetto vero e proprio e si apre in
   `Naturopata-Digitale-X.Y.Z/`.

```bash
unzip Naturopata-Digitale-backup-AAAA-MM-GG-vX.Y.Z.zip
cd Naturopata-Digitale-AAAA-MM-GG-vX.Y.Z
sha256sum -c SHA256SUMS.txt
unzip Naturopata-Digitale-X.Y.Z.zip
cd Naturopata-Digitale-X.Y.Z
```

Su Windows: tasto destro → Estrai tutto, due volte.

Accanto alla cartella del progetto c'è `documenti/`: i report delle verifiche
(parafrasi, schede, quiz, sintesi) copiati da `artifacts/`. Non sono
versionati, quindi questa è l'unica copia che viaggia con la versione; stanno
fuori dal codice perché sono documentazione. I report che nel nome portano una
versione precedente restano fuori dal backup: descrivono una fotografia
superata e resterebbero accanto a un progetto che nel frattempo è cambiato.

## 4. Reinstalla e verifica

```bash
npm ci      # installa solo jsdom, dalle versioni del lockfile
npm test    # dati, DOM e percorsi: deve finire con "0 errori"
```

`npm ci` non tocca il progetto: crea `node_modules` dalle versioni esatte di
`package-lock.json`. Se `npm test` è verde, il ripristino è riuscito.

## 5. Apri il sito

```bash
npm run serve          # http://localhost:3000
```

Il service worker funziona solo da `http://localhost` o in HTTPS: aprendo
`index.html` con doppio clic l'app si vede, ma non si installa come PWA.

Per il programma desktop:

```bash
npm run desktop:prepare   # ricrea desktop/app
cd desktop && npm install && npm start
```

## 6. Che cosa non c'è, e come si ricrea

| Assente | Perché | Come si ricrea |
|---|---|---|
| `node_modules/` | dipendenze, non contenuti | `npm ci` |
| `desktop/app/`, `desktop/dist/` | generati | `npm run desktop:prepare` |
| `.git/` | l'archivio è una fotografia, non un clone | vedi sotto |
| `backup/` | esclusa dal repository | niente da fare: i backup stanno fuori |
| `.env`, chiavi, segreti | per scelta non entrano mai nei backup | vanno reinseriti a mano |

I PDF sono già dentro (`assets/pdf/`): non serve rigenerarli. Se ti servono
comunque, `npm run fogli` e `npm run vademecum` richiedono le librerie Python
di `scripts/`.

## 7. Se ti serve anche la storia Git

L'archivio non contiene `.git`, quindi non ha commit né tag. Per riavere la
storia completa clona il repository e usa il backup solo come confronto:

```bash
git clone https://github.com/danilodauria/naturopata-digitale.git
cd naturopata-digitale
git log --oneline -5     # deve esserci il commit indicato in backup.json
```

## Prova di ripristino (9 novembre 2026, backup 1.3.28)

Eseguita su una cartella vuota partendo dal solo archivio scaricabile:

- impronta dell'archivio interno: `OK` con `sha256sum -c`;
- 78 file e 13 cartelle estratti, `package-lock.json` presente, 5 PDF, i 6 file
  dei dati delle piante;
- `npm ci`: uscita 0;
- `npm test`: 3473 controlli sui dati, 175 controlli DOM, 354 link e 69
  pulsanti, 0 errori;
- `npm run desktop:prepare`: 51 file in `desktop/app`;
- sito servito con `python3 -m http.server`: `index.html`, `assets/js/app.js` e
  un PDF rispondono 200.

Conclusione: l'archivio è sufficiente per ricostruire e verificare il progetto
su un computer nuovo, senza il repository né i backup precedenti. Non basta
solo per ripartire con la storia Git o con i segreti, che per scelta non
contiene.

## Backup automatico

Due strade, perché il gancio non è sempre installabile.

**Gancio post-commit.** In un repository normale il progetto installa un
gancio che dopo ogni commit esegue `node scripts/backup.cjs`: l'archivio più
recente in `artifacts/` corrisponde così sempre all'ultima versione. Il gancio
vive in `.git/hooks`, non è versionato, e si reinstalla con `npm run hook`
oppure da solo con `npm ci` (la vita `prepare` lo richiama).

**Comando unico.** Dove la cartella dei ganci è condivisa (worktree, repository
comune a più progetti) il gancio non viene installato di proposito: scriverlo
lì lo farebbe scattare per tutti. In quel caso si usa:

```bash
npm run salva -- "messaggio del commit"
```

che committa e subito dopo crea il backup, così le due cose restano allineate.
Anche `npm run rilascio` finisce con il backup.
