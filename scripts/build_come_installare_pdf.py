#!/usr/bin/env python3
# ==========================================================================
#  Naturopata Digitale · generatore del foglio «Come si installa»
#  Stampa la guida in A4 per chi la deve allegare a un'email o metterla
#  accanto al computer. Il piè di pagina dichiara la versione dell'app.
#
#  Uso:  .venv/bin/python scripts/build_come_installare_pdf.py
#  Licenza del codice: MIT · Danilo D'Auria
# ==========================================================================

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from fogli_comune import (  # noqa: E402
    CARTA_2, INCHIOSTRO_FAINT, ORO_SOFT, TERRA_SOFT, PDF_DIR, chiudi, comando,
    compila, para, punti, riquadro, stili, tabella_file, testata, versione_app,
)

OUT = PDF_DIR / "Naturopata-Digitale-Come-si-installa.pdf"
TITOLO = "Come si installa"


def storia(versione):
    S = stili()
    out = []

    out += testata(
        "Come si installa",
        "GUIDA ALL'INSTALLAZIONE",
        "Una strada per il computer, una per il telefono. Niente negozi di app, "
        "niente account, niente da configurare: si scarica un file, si apre, si usa. "
        "La connessione serve solo per il download.",
        versione, S,
    )

    # --- Quale file -------------------------------------------------------
    out.append(para("Quale file mi serve", "h2", S))
    out.append(para(
        "Ogni versione pubblica gli stessi file con lo stesso nome: i collegamenti "
        "non cambiano, cambia il contenuto. Tutti i pacchetti sono a 64 bit.",
        "corpo", S))
    out.append(tabella_file([
        ("Naturopata-Digitale-Windows-x64.exe", "Installazione classica su Windows 10 e 11."),
        ("Naturopata-Digitale-Windows-portatile.zip", "La stessa app scompattata: nessuna installazione, anche da chiavetta."),
        ("Naturopata-Digitale-Mac-arm64.dmg", "Mac con processore Apple (M1 e successivi)."),
        ("Naturopata-Digitale-Mac-x64.dmg", "Mac con processore Intel."),
        ("Naturopata-Digitale-Linux-amd64.deb", "Debian, Ubuntu, Mint e derivate."),
        ("Naturopata-Digitale-Linux-x86_64.AppImage", "Tutte le altre distribuzioni: un solo file eseguibile."),
        ("SHA256SUMS.txt", "Le impronte dei sei file, per controllare il download."),
    ], S))
    out.append(para(
        "Non sai se il computer è a 64 bit? Su Windows: Impostazioni → Sistema → "
        "Informazioni. Su Mac: menu Apple → Informazioni su questo Mac → «Chip» "
        "(Apple) o «Processore» (Intel). Praticamente tutti i computer venduti dopo "
        "il 2012 sono a 64 bit.", "nota", S))

    # --- Windows ----------------------------------------------------------
    out.append(para("Windows 10 e 11", "h2", S))
    out.append(punti([
        "Scarica <font name='Courier' size='8.4'>Naturopata-Digitale-Windows-x64.exe</font> dalla pagina di download.",
        "Fai doppio clic sul file appena scaricato.",
        "Se compare l'avviso di Windows, scegli <b>Ulteriori informazioni</b> e poi <b>Esegui comunque</b>.",
        "Segui la procedura: al termine trovi «Naturopata Digitale» nel menu Start.",
    ], S=S))
    out.append(riquadro(
        "SmartScreen: l'avviso è atteso",
        "Il pacchetto non ha una firma commerciale, quindi Windows lo tratta come un "
        "programma «di autore sconosciuto» finché non acquista reputazione. Non è un "
        "errore e non significa che il file sia guasto: l'impronta SHA-256 dice se è "
        "quello giusto. La versione portatile in ZIP non esegue alcun installatore.",
        sfondo=ORO_SOFT, S=S))
    out.append(para(
        "L'installer non chiede permessi di amministratore e crea il collegamento nel "
        "menu Start e sul desktop.", "nota", S))

    # --- macOS ------------------------------------------------------------
    out.append(para("macOS 11 o successivo", "h2", S))
    out.append(punti([
        "Scarica il <font name='Courier' size='8.4'>.dmg</font> del tuo processore: Apple Silicon oppure Intel.",
        "Apri il file: si apre una finestra con l'icona del programma e quella della cartella Applicazioni.",
        "Trascina «Naturopata Digitale» nella cartella Applicazioni.",
        "Al primo avvio fai <b>tasto destro</b> sull'icona → <b>Apri</b> → <b>Apri</b>.",
    ], S=S))
    out.append(para(
        "Se macOS dice che l'app è danneggiata non è danneggiata: è la quarantena "
        "applicata ai file non firmati. Si toglie con un comando, una volta sola:", "corpo", S))
    out.append(comando("xattr -dr com.apple.quarantine &quot;/Applications/Naturopata Digitale.app&quot;", S))

    # --- Linux ------------------------------------------------------------
    out.append(para("Linux", "h2", S))
    out.append(para("<b>Pacchetto .deb</b> — doppio clic e «Installa», oppure dal terminale:", "corpo", S))
    out.append(comando("sudo apt install ./Naturopata-Digitale-Linux-amd64.deb", S))
    out.append(para("<b>AppImage</b> — per tutte le altre distribuzioni:", "corpo", S))
    out.append(comando("chmod +x Naturopata-Digitale-Linux-x86_64.AppImage<br/>"
                       "./Naturopata-Digitale-Linux-x86_64.AppImage", S))
    out.append(para(
        "Se manca una libreria: su Ubuntu 24.04 serve <font name='Courier' size='8.4'>libfuse2t64</font>, "
        "sulle versioni precedenti <font name='Courier' size='8.4'>libfuse2</font>. "
        "Su alcuni sistemi senza accelerazione grafica l'app si apre su una pagina "
        "bianca: avviala con <font name='Courier' size='8.4'>--disable-gpu</font>.", "nota", S))

    # --- Telefono ---------------------------------------------------------
    out.append(para("Telefono e tablet", "h2", S))
    out.append(para(
        "Qui non si scarica niente: si apre il sito e si aggiunge alla schermata "
        "Home, come un'app. Dopo la prima apertura funziona anche senza Internet.",
        "corpo", S))
    out.append(punti([
        "<b>Android:</b> apri il sito con Chrome → tre puntini ⋮ → «Installa app» o «Aggiungi a schermata Home» → conferma.",
        "<b>iPhone e iPad:</b> apri il sito con Safari → Condividi (il quadrato con la freccia) → «Aggiungi alla schermata Home» → «Aggiungi».",
        "Se il telefono libera spazio, la copia offline può sparire: basta riaprire il sito una volta, con la rete.",
    ], S=S))

    # --- Impronte ---------------------------------------------------------
    out.append(para("Verificare che il file sia quello giusto", "h2", S))
    out.append(para(
        "Ogni pacchetto ha un'impronta SHA-256 calcolata al caricamento. Se il valore "
        "del file scaricato è identico, il download è completo e nessuno lo ha "
        "modificato. Le stesse impronte sono nella pagina di download, accanto ai pulsanti.",
        "corpo", S))
    out.append(para("Windows · PowerShell:", "h3", S))
    out.append(comando("Get-FileHash .\\Naturopata-Digitale-Windows-x64.exe -Algorithm SHA256", S))
    out.append(para("Windows · prompt dei comandi:", "h3", S))
    out.append(comando("certutil -hashfile Naturopata-Digitale-Windows-x64.exe SHA256", S))
    out.append(para(
        "Linux e macOS, con <font name='Courier' size='8.4'>SHA256SUMS.txt</font> nella stessa cartella "
        "dei file scaricati: un comando controlla tutto e risponde <i>OK</i> per ciascuno.", "corpo", S))
    out.append(comando("sha256sum -c SHA256SUMS.txt        # Linux<br/>"
                       "shasum -a 256 -c SHA256SUMS.txt   # macOS", S))

    # --- Aggiornamenti e dati ---------------------------------------------
    out.append(para("Aggiornamenti e dati", "h2", S))
    out.append(punti([
        "<b>Nel browser:</b> niente da fare, la pagina nuova arriva alla prima apertura con la rete.",
        "<b>Sul computer:</b> scarica il pacchetto nuovo dalla pagina della versione e installalo sopra il precedente.",
        "<b>I dati:</b> browser nel deposito locale del sito; Windows in %APPDATA%\\Naturopata Digitale; "
        "macOS in ~/Library/Application Support/Naturopata Digitale; Linux in ~/.config/Naturopata Digitale.",
        "Dalla pagina Licenze dell'app puoi esportare un backup JSON con preferiti e progressi.",
    ], S=S))

    # --- Domande frequenti -------------------------------------------------
    out.append(para("Domande frequenti", "h2", S))
    out.append(para(
        "Non sono domande inventate: sono i punti in cui l'installazione si blocca davvero.",
        "nota", S))
    domande = [
        ("Windows dice che il file può danneggiare il computer. È pericoloso?",
         "No. L'avviso compare perché il programma non ha una firma commerciale. Il file "
         "è generato automaticamente dai server di GitHub dal codice pubblico del "
         "repository: puoi confrontare l'impronta e, se vuoi, ricompilarlo da solo."),
        ("Devo disattivare l'antivirus?",
         "No, mai. Se un antivirus mette il file in quarantena, ripristinalo dalla "
         "cronologia dell'antivirus. Se lo blocca di nuovo, usa la versione portatile in ZIP."),
        ("Serve la connessione per usarlo?",
         "Serve solo per scaricare e per la prima apertura nel browser. Dopo, tutto "
         "funziona offline: i contenuti sono nel programma, non su un server."),
        ("Serve un account o un'iscrizione?",
         "No. Non c'è registrazione, non c'è pubblicità, non c'è tracciamento: il "
         "programma non manda nulla fuori dal dispositivo."),
        ("Quanto spazio occupa?",
         "I pacchetti vanno da circa 70 a 120 MB; installato occupa poco più. Il "
         "Vademecum in PDF aggiunge meno di un megabyte."),
        ("Come si disinstalla?",
         "Windows: Impostazioni → App → «Naturopata Digitale» → Disinstalla. macOS: "
         "trascina l'app nel cestino. Linux: sudo apt remove naturopata-digitale, "
         "oppure cancella l'AppImage. I dati restano nella cartella indicata sopra."),
        ("Perché due file per macOS?",
         "I Mac recenti usano processori Apple (arm64), quelli più vecchi processori "
         "Intel (x64). Un pacchetto per architettura evita gli errori di traduzione e "
         "dimezza la dimensione del download."),
    ]
    for domanda, risposta in domande:
        out.append(para(domanda, "h3", S))
        out.append(para(risposta, "corpo", S))

    # --- Chiusura ---------------------------------------------------------
    out.append(riquadro(
        "Se qualcosa non torna",
        "Prima riprova il download: un file interrotto è la causa più comune, e "
        "l'impronta lo dice subito. Poi guarda la pagina «Domande frequenti» del sito. "
        "Se il problema resta, apri una segnalazione nel repository indicando sistema, "
        "versione e messaggio esatto. Non aprire mai un file la cui impronta non "
        "combacia: cancellalo e scaricalo di nuovo.",
        sfondo=TERRA_SOFT, S=S))
    out.append(para("Le impronte e i file: " + "github.com/danilodauria/naturopata-digitale/releases/latest",
                    "nota", S))

    chiudi(out, versione, S)
    return out


def main():
    versione = versione_app()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = compila(storia(versione), OUT, TITOLO, versione)
    print("PDF: %s · %d pagine · %.0f kB" % (
        OUT.relative_to(OUT.parent.parent.parent), doc.page, OUT.stat().st_size / 1024))


if __name__ == "__main__":
    main()
