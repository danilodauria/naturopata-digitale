#!/usr/bin/env python3
# ==========================================================================
#  Naturopata Digitale · generatore del foglio «Lista di prova»
#  Tre pagine A4 da spuntare mentre si provano i pacchetti: installazione,
#  avvio, voce naturale, aggiornamento. Il piè di pagina dichiara la versione
#  dell'app, presa da package.json come gli altri fogli.
#
#  Uso:  npm run foglio:prova
#  Licenza del codice: MIT · Danilo D'Auria
# ==========================================================================

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from reportlab.lib.units import mm  # noqa: E402,F401
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle  # noqa: E402

from fogli_comune import (  # noqa: E402
    BORDO, BORDO_FORTE, PDF_DIR, comando, compila, para, riquadro, stili,
    testata, versione_app,
)

VERSIONE = versione_app()
TITOLO = "Lista di prova " + VERSIONE
OUT = PDF_DIR / "Naturopata-Digitale-Lista-di-prova.pdf"
LARG = 493  # larghezza utile A4 con margini da 18 mm


def quadro():
    """Una casella quadrata da spuntare a penna: 10×10 punti, bordo sottile."""
    q = Table([[""]], colWidths=[10], rowHeights=[10])
    q.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.7, BORDO_FORTE)]))
    return q


def caselle(righe, S, larghezza=LARG):
    """Una casella quadrata per riga, allineata alla prima riga di testo."""
    celle = [[quadro(), Paragraph(t, S["corpo"])] for t in righe]
    tabella = Table(celle, colWidths=[16, larghezza - 16])
    tabella.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, -1), 0),
        ("LEFTPADDING", (1, 0), (1, -1), 6),
        ("RIGHTPADDING", (1, 0), (1, -1), 0),
        ("TOPPADDING", (0, 0), (0, -1), 3),
        ("TOPPADDING", (1, 0), (1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    return tabella


def sottotitolo(testo, S):
    return para("<b>" + testo + "</b>", "corpo", S)


def registro(S, larghezza=LARG):
    intestazioni = ["Sistema", "Versione", "Avvio", "Voce", "Aggiorn.", "Note"]
    righe = [
        ["Windows 10/11", "", "", "", "", ""],
        ["Linux .deb", "", "", "", "", "agg. manuale"],
        ["Linux AppImage", "", "", "", "", ""],
        ["macOS arm64", "", "", "", "", ""],
        ["macOS x64", "", "", "", "", ""],
        ["macOS 10.15", "", "non parte (atteso)", "—", "—", ""],
    ]
    dati = [[Paragraph("<b>" + c + "</b>", S["corpo"]) for c in intestazioni]]
    for r in righe:
        dati.append([Paragraph(c, S["corpo"]) for c in r])
    tabella = Table(dati, colWidths=[78, 58, 92, 52, 70, larghezza - 350], repeatRows=1)
    stile = [
        ("GRID", (0, 0), (-1, -1), 0.5, BORDO),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
    ]
    tabella.setStyle(TableStyle(stile))
    return tabella


def storia(versione=VERSIONE):
    S = stili()
    out = []

    out += testata(
        "Lista di prova",
        "VERSIONE " + versione + " · WINDOWS, LINUX, MACOS",
        "Tre pagine da tenere accanto al computer. Segna la casella quando il "
        "comportamento è quello descritto; se non lo è, scrivilo nel registro in "
        "fondo. Il foglio vale per la " + versione + "; per la prova di "
        "aggiornamento serve una versione precedente, dello stesso formato.",
        versione, S,
    )

    out.append(para("Prima di cominciare", "h2", S))
    out.append(caselle([
        "Scarica solo dalla pagina della release: <font name='Courier' size='8'>…-Windows-x64.exe</font> o "
        "<font name='Courier' size='8'>…-Windows-portatile.zip</font>; <font name='Courier' size='8'>…-Linux-amd64.deb</font> o "
        "<font name='Courier' size='8'>…-Linux-x86_64.AppImage</font>; <font name='Courier' size='8'>…-Mac-arm64.dmg</font> o "
        "<font name='Courier' size='8'>…-Mac-x64.dmg</font>.",
        "Scarica anche <font name='Courier' size='8'>SHA256SUMS.txt</font> e confronta l'impronta di ogni file.",
        "Tutte le impronte coincidono.",
        "L'avvio del pacchetto Linux è già provato in CI a ogni release: qui lo ricontrolli a mano.",
        "Hai a disposizione una versione precedente già installata, per la prova di aggiornamento.",
    ], S))
    out.append(comando(
        "Get-FileHash .\\Naturopata-Digitale-Windows-x64.exe -Algorithm SHA256<br/>"
        "sha256sum Naturopata-Digitale-Linux-x86_64.AppImage<br/>"
        "shasum -a 256 ~/Downloads/Naturopata-Digitale-Mac-arm64.dmg", S))

    out.append(para("A · Installazione e primo avvio", "h2", S))
    out.append(sottotitolo("Windows 10 o 11, 64 bit", S))
    out.append(caselle([
        "L'installer parte e conclude senza errori.",
        "SmartScreen mostra «Windows ha protetto il PC»: <i>Ulteriori informazioni</i> → <i>Esegui comunque</i> (atteso).",
        "Se il file resta bloccato: tasto destro → <i>Proprietà</i> → <i>Sblocca</i> → <i>OK</i>.",
        "L'icona compare nel menu Start; la finestra si apre senza barra dei menu.",
    ], S))
    out.append(sottotitolo("Linux, amd64", S))
    out.append(caselle([
        "<font name='Courier' size='8'>sudo apt install ./Naturopata-Digitale-Linux-amd64.deb</font> conclude senza dipendenze mancanti.",
        "AppImage: <font name='Courier' size='8'>chmod +x</font>, poi doppio clic: la finestra si apre.",
        "Se l'AppImage non parte: <font name='Courier' size='8'>libfuse2t64</font> su Ubuntu 24.04, <font name='Courier' size='8'>libfuse2</font> prima.",
    ], S))
    out.append(sottotitolo("macOS 11 o successivo", S))
    out.append(caselle([
        "Il <font name='Courier' size='8'>.dmg</font> si apre e l'app si trascina in <i>Applicazioni</i>.",
        "Primo avvio: tasto destro sull'icona → <i>Apri</i> → <i>Apri</i>.",
        "Se dice «danneggiata»: togli la quarantena con il comando qui sotto, una volta sola.",
    ], S))
    out.append(comando(
        'xattr -dr com.apple.quarantine &quot;/Applications/Naturopata Digitale.app&quot;', S))

    out.append(para("B · Avvio e funzioni di base", "h2", S))
    out.append(caselle([
        "La finestra si apre in pochi secondi, con lo sfondo color carta: nessuna schermata bianca.",
        "In fondo alla pagina la versione è quella installata (" + versione + ").",
        "L'erbario mostra 70 schede, il manuale 18 capitoli, il quiz 135 domande.",
        "La domanda sui frutti di senna spiega che la dose dipende dalla titolazione del prodotto.",
        "Una scheda a caso (per esempio Senna): testo, fonti e avvisi leggibili, link interni funzionanti.",
        "Un link esterno (per esempio «EMA · Sennae folium») si apre nel browser di sistema, non nella finestra.",
        "Chiudi e riapri: preferiti, letture e chat sono ancora lì.",
        "Secondo avvio a programma aperto: si riporta in primo piano la finestra esistente, non se ne apre un'altra.",
        "Senza rete: il contenuto resta disponibile e il quiz funziona, spiegazioni comprese.",
    ], S))

    out.append(para("C · Voce naturale", "h2", S))
    out.append(sottotitolo("Windows e Linux: motore locale", S))
    out.append(caselle([
        "La sezione «Voce naturale (facoltativa)» è visibile e dice che si scarica una volta sola.",
        "«Installa Paola» scarica con percentuale che avanza, senza bloccare il programma.",
        "Al termine la voce risulta installata, con il suo peso e il segno ✓.",
        "La prova legge una frase con voce naturale, non robotica.",
        "Senza rete la voce funziona lo stesso: la sintesi avviene sul computer.",
        "Cambiando la velocità cambia il ritmo della lettura.",
        "«Togli» libera lo spazio indicato e la voce sparisce dall'elenco.",
        "Con due voci installate compare il confronto; con una sola no.",
        "Interrompendo il download a metà, alla riapertura non resta una voce «mezza installata».",
    ], S))
    out.append(sottotitolo("macOS", S))
    out.append(caselle([
        "La sezione spiega che su Mac la voce naturale sono le «Premium» di Apple, con il percorso nelle Impostazioni.",
        "Dopo aver scaricato una voce Premium, «Rileggi voci» la fa comparire nell'elenco.",
        "La lettura usa la voce Premium scelta.",
    ], S))

    out.append(para("D · Aggiornamento dalla versione precedente", "h2", S))
    out.append(para(
        "Vale per installer Windows, AppImage e macOS. La versione portatile <font name='Courier' size='8'>.zip</font> "
        "e il pacchetto <font name='Courier' size='8'>.deb</font> si aggiornano a mano: reinstalla sopra.", "nota", S))
    out.append(caselle([
        "Installa la versione precedente, aprila e attendi qualche secondo (il controllo parte da solo dopo circa 4 secondi).",
        "Pannello Stato → Aggiornamenti: da «Controllo le nuove versioni…» a «Nuova versione … trovata».",
        "L'avanzamento in percentuale compare e il programma resta utilizzabile durante il download.",
        "Alla fine: «Versione … pronta», con il pulsante <i>Riavvia e aggiorna</i>.",
        "Il pulsante chiede conferma e avvisa che preferiti, letture e chat restano salvati.",
        "Dopo il riavvio la versione in fondo alla pagina è quella nuova.",
        "Preferiti, letture e chat sono ancora presenti.",
        "«Controlla adesso» risponde «Questa è la versione più recente».",
    ], S))
    out.append(sottotitolo("Su macOS l'errore è atteso", S))
    out.append(para(
        "Il pacchetto è firmato ad-hoc, non con un certificato Apple: compare «macOS aggiorna da solo solo i "
        "pacchetti firmati». Il pulsante <i>Pagina dei download</i> deve portare alla release; scaricando il "
        "<font name='Courier' size='8'>.dmg</font> nuovo e installandolo sopra, versione e dati restano.", "corpo", S))
    out.append(caselle([
        "Il messaggio su macOS è comprensibile e il pulsante porta alla release.",
        "Installando il .dmg nuovo sopra il precedente, la versione cambia e i dati restano.",
    ], S))

    out.append(para("E · Requisito macOS 11", "h2", S))
    out.append(caselle([
        "Su macOS 11, 12, 13, 14 o 15 l'app si installa e si apre.",
        "Su macOS 10.15 l'app non si apre: annota il messaggio esatto del sistema.",
        "Sito, guida e PDF dicono «macOS 11 o successivo», non più 10.15.",
        "La pagina Scarica riporta «macOS 11 o successivo» nella scheda macOS.",
    ], S))

    out.append(Spacer(1, 4))
    out.append(riquadro(
        "Se qualcosa non torna",
        "Annota sistema e versione, formato usato (installer, portatile, .deb, AppImage, .dmg), il messaggio "
        "esatto e se il problema compare solo offline o solo al primo avvio. Per l'aggiornamento non esiste un "
        "file di log: avvia il programma da terminale per vedere i messaggi del controllo.",
        S=S))

    out.append(para("Registro della prova", "h2", S))
    out.append(registro(S))
    out.append(Spacer(1, 8))
    out.append(para("Firma e data: ______________________________________", "corpo", S))
    out.append(Spacer(1, 2))
    out.append(riquadro(
        "Documento di prova",
        "Vale per la versione " + versione + ", la stessa dell'app: se il sito dice un numero diverso, "
        "vale il sito. Vive in <font name='Courier' size='8'>assets/pdf/</font> insieme agli altri fogli e "
        "si rigenera con <font name='Courier' size='8'>npm run foglio:prova</font>.",
        S=S))
    return out


def main():
    doc = compila(storia(VERSIONE), OUT, TITOLO, VERSIONE)
    print("PDF: %s · %d pagine · %.0f kB" % (OUT, doc.page, OUT.stat().st_size / 1024))


if __name__ == "__main__":
    main()
