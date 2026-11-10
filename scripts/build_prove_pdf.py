#!/usr/bin/env python3
# ==========================================================================
#  Naturopata Digitale · generatore del foglio «Prove a mano»
#  Tre pagine A4 per le versioni di sola manutenzione, quando cambiano testi o
#  numeri e la domanda è: «i testi corretti sono davvero dentro i pacchetti?».
#  Impaginazione con gli elementi comuni dei fogli, versione letta da
#  package.json come gli altri.
#
#  Uso:  npm run prove
#  Licenza del codice: MIT · Danilo D'Auria
# ==========================================================================

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from reportlab.lib.units import mm  # noqa: E402,F401
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle  # noqa: E402

from fogli_comune import (  # noqa: E402
    BORDO, CARTA, CARTA_2, M_L, M_R, PAGE_W, PDF_DIR, SALVIA_CHIARA,
    chiudi, comando, compila, para, riquadro, stili, testata, versione_app,
)
from build_lista_prova_pdf import caselle, registro, sottotitolo  # noqa: E402

VERSIONE = versione_app()
TITOLO = "Prove a mano " + VERSIONE
OUT = PDF_DIR / "Naturopata-Digitale-Prove-a-mano.pdf"

PERCORSI = [
    ("Windows installato", "%LOCALAPPDATA%\\Programs\\naturopata-digitale\\resources\\app\\README.md"),
    ("Windows portatile", "<cartella estratta>\\resources\\app\\README.md"),
    ("macOS", "/Applications/Naturopata Digitale.app/Contents/Resources/app/README.md"),
    ("Linux .deb", "/opt/Naturopata Digitale/resources/app/README.md"),
    ("AppImage", "resources/app/README.md dopo --appimage-extract"),
]


def tabella_due(intestazioni, righe, S=None):
    """Tabella a due colonne con intestazione, nello stile degli altri fogli."""
    S = S or stili()
    dati = [[Paragraph("<b>" + intestazioni[0] + "</b>", S["cellaT"]),
             Paragraph("<b>" + intestazioni[1] + "</b>", S["cellaT"])]]
    for a, b in righe:
        dati.append([
            Paragraph(a, S["cella"]),
            Paragraph('<font name="Courier" size="7.4">' + b + "</font>", S["cella"]),
        ])
    larghezza = PAGE_W - M_L - M_R
    tabella = Table(dati, colWidths=[larghezza * 0.28, larghezza * 0.72], repeatRows=1)
    tabella.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), SALVIA_CHIARA),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [CARTA, CARTA_2]),
        ("GRID", (0, 0), (-1, -1), 0.4, BORDO),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
    ]))
    return tabella


def storia(versione=VERSIONE):
    S = stili()
    out = []

    out += testata(
        "Prove a mano",
        "LISTA DI PROVA · VERSIONE " + versione + " · WINDOWS, LINUX, MACOS",
        "Il foglio delle versioni leggere, quelle in cui cambiano testi o numeri e non i "
        "contenuti. Serve a verificare che le correzioni siano arrivate davvero nei file "
        "installati e che il resto non si sia rotto. Dieci minuti per sistema, altri dieci "
        "per l'aggiornamento.",
        versione, S,
    )

    out.append(riquadro(
        "Che cosa si controlla",
        "Il foglio non elenca le novità: quelle stanno nella pagina Versioni. Qui si guarda "
        "se il pacchetto contiene quello che la versione dichiara. Un testo corretto solo nel "
        "repository e non nel pacchetto installato è il guasto tipico di queste release, e non "
        "lo vede nessun test automatico.",
        S=S))

    out.append(para("A · File e impronte", "h2", S))
    out.append(para(
        "Scarica solo dalla pagina della release <font name='Courier' size='8'>v" + versione + "</font>: "
        "installer <font name='Courier' size='8'>.exe</font> o portatile <font name='Courier' size='8'>.zip</font>, "
        "<font name='Courier' size='8'>.deb</font> o AppImage, <font name='Courier' size='8'>.dmg arm64</font> "
        "o <font name='Courier' size='8'>x64</font>. Accanto c'è <font name='Courier' size='8'>SHA256SUMS.txt</font>: "
        "le impronte cambiano a ogni versione, quindi si prendono da lì e non da un foglio stampato.",
        "nota", S))
    out.append(comando(
        "Get-FileHash .\\Naturopata-Digitale-Windows-x64.exe -Algorithm SHA256<br/>"
        "sha256sum Naturopata-Digitale-Linux-x86_64.AppImage<br/>"
        "shasum -a 256 ~/Downloads/Naturopata-Digitale-Mac-arm64.dmg", S))
    out.append(caselle([
        "L'impronta di ogni file scaricato coincide con quella di <font name='Courier' size='8'>SHA256SUMS.txt</font>.",
        "Il file scaricato è quello della release giusta: nel nome del tag c'è la versione versta sul sito.",
    ], S))

    out.append(para("B · Installazione e primo avvio", "h2", S))
    out.append(sottotitolo("Windows 10 o 11, 64 bit", S))
    out.append(caselle([
        "L'installer conclude senza errori; SmartScreen → <i>Ulteriori informazioni</i> → <i>Esegui comunque</i> (atteso, pacchetto non firmato).",
        "L'icona compare nel menu Start e la finestra si apre senza barra dei menu.",
        "La versione portatile, estratta, parte con doppio clic senza installare nulla.",
    ], S))
    out.append(sottotitolo("Linux amd64", S))
    out.append(caselle([
        "<font name='Courier' size='8'>sudo apt install ./Naturopata-Digitale-Linux-amd64.deb</font> conclude senza dipendenze mancanti.",
        "AppImage: <font name='Courier' size='8'>chmod +x</font> e doppio clic; se non parte, <font name='Courier' size='8'>libfuse2t64</font> su Ubuntu 24.04.",
        "L'icona nel dock è quella giusta.",
    ], S))
    out.append(sottotitolo("macOS 11 o successivo", S))
    out.append(caselle([
        "Il <font name='Courier' size='8'>.dmg</font> si apre, l'app va in <i>Applicazioni</i>, primo avvio con tasto destro → <i>Apri</i>.",
        "Se dice «danneggiata»: <font name='Courier' size='8'>xattr -dr com.apple.quarantine</font> sull'app, una volta sola.",
        "Il <font name='Courier' size='8'>.dmg arm64</font> va su Apple Silicon, il <font name='Courier' size='8'>x64</font> su Intel.",
    ], S))

    out.append(para("C · Dentro il pacchetto", "h2", S))
    out.append(para(
        "È la prova che nessun test può fare al posto tuo: guardare i file come li vede chi ha "
        "installato il programma. Da fare su ogni sistema.", "nota", S))
    out.append(caselle([
        "Piè di pagina di <i>Licenze</i>: «Versione " + versione + " · novembre 2026».",
        "L'erbario mostra 70 schede, il manuale 18 capitoli, il quiz 135 domande in otto categorie.",
        "I quattro fogli della release dichiarano «" + versione + "» nel piè di pagina.",
    ], S))
    out.append(sottotitolo("Il LEGGIMI nel pacchetto", S))
    out.append(tabella_due(("Sistema", "Percorso di resources/app/README.md"), PERCORSI, S=S))
    out.append(Spacer(1, 5))
    out.append(caselle([
        "Il LEGGIMI dice «Erbario interattivo con 70 schede» nella prima riga.",
        "La tabella delle sezioni dice «135 domande in 8 categorie e 3 livelli» e «47 piante commestibili».",
        "La struttura dei file dice «70 schede piante (sei file)» e «135 domande».",
        "Cercando «60 schede» e «85 domande» nel LEGGIMI non si trova niente.",
        "Nella stessa cartella, <font name='Courier' size='8'>manifest.webmanifest</font>: la <i>description</i> dice «70 schede».",
    ], S))
    out.append(riquadro(
        "Se il punto C non torna",
        "Un pacchetto costruito prima della correzione ha i testi vecchi. Annota sistema, file "
        "scaricato, impronta e la riga trovata: serve a capire se il problema è nel pacchetto o "
        "nella build. Non correggere a mano i file installati.",
        S=S))

    out.append(para("D · Regressione rapida", "h2", S))
    out.append(caselle([
        "La finestra si apre in pochi secondi, sfondo color carta, nessuna schermata bianca.",
        "Una scheda a caso (Senna): testo, fonti e avvisi leggibili, link interni funzionanti.",
        "Un link esterno si apre nel browser di sistema, non dentro la finestra.",
        "Chiudi e riapri: preferiti, letture e chat sono ancora lì.",
        "Secondo avvio a programma aperto: si riporta in primo piano la finestra esistente.",
        "Senza rete: contenuti e quiz funzionano, spiegazioni comprese; Neura risponde con i dati locali.",
    ], S))

    out.append(para("E · Voce naturale (facoltativa)", "h2", S))
    out.append(caselle([
        "Windows e Linux: «Installa Paola» scarica con percentuale, poi la prova legge in modo naturale e funziona anche offline.",
        "macOS: la sezione rimanda alle voci <i>Premium</i> di Apple e «Rileggi voci» le trova.",
        "Interrompendo il download a metà, alla riapertura non resta una voce «mezza installata».",
    ], S))

    out.append(para("F · Aggiornamento dalla versione precedente", "h2", S))
    out.append(para(
        "Vale per installer Windows, AppImage e macOS. La versione portatile <font name='Courier' size='8'>.zip</font> "
        "e il pacchetto <font name='Courier' size='8'>.deb</font> si aggiornano a mano: reinstalla sopra.",
        "nota", S))
    out.append(caselle([
        "Installa la versione precedente, aprila e attendi: il controllo parte da solo dopo circa 4 secondi.",
        "<i>Stato</i> → <i>Aggiornamenti</i>: da «Controllo le nuove versioni…» a «Nuova versione " + versione + " trovata».",
        "L'avanzamento in percentuale compare e il programma resta utilizzabile durante il download.",
        "Alla fine: «Versione " + versione + " pronta» con il pulsante <i>Riavvia e aggiorna</i>, che chiede conferma.",
        "Dopo il riavvio il piè di pagina dice " + versione + " e preferiti, letture e chat sono ancora lì.",
        "«Controlla adesso» risponde «Questa è la versione più recente».",
        "Solo macOS: compare l'errore atteso sui pacchetti non firmati, il pulsante porta alla release, e il <font name='Courier' size='8'>.dmg</font> nuovo installato sopra conserva i dati.",
    ], S))

    out.append(para("G · Se qualcosa non torna", "h2", S))
    out.append(para(
        "Annota sistema e versione, formato usato, il messaggio esatto e se il problema compare "
        "solo offline, solo al primo avvio o sempre. Per l'aggiornamento non c'è un file di log: "
        "avvia il programma da terminale e copia le righe dopo «Controllo le nuove versioni».", "corpo", S))
    out.append(comando(
        '& "$env:LOCALAPPDATA\\Programs\\naturopata-digitale\\Naturopata Digitale.exe"<br/>'
        "open -a &quot;Naturopata Digitale&quot; --stdout /tmp/nd.log --stderr /tmp/nd.log", S))

    out.append(para("Registro della prova", "h2", S))
    out.append(registro(S))
    out.append(Spacer(1, 8))
    out.append(para("Firma e data: ______________________________________", "corpo", S))
    out.append(Spacer(1, 2))
    chiudi(out, versione, S)
    return out


def main():
    doc = compila(storia(VERSIONE), OUT, TITOLO, VERSIONE)
    print("PDF: %s · %d pagine · %.0f kB" % (OUT, doc.page, OUT.stat().st_size / 1024))


if __name__ == "__main__":
    main()
