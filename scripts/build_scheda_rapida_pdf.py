#!/usr/bin/env python3
# ==========================================================================
#  Naturopata Digitale · generatore della «Scheda rapida»
#  Un foglio A4 con i quattro passaggi per sistema e i controlli da fare
#  quando il file non parte. Da stampare e tenere accanto al computer.
#
#  Uso:  .venv/bin/python scripts/build_scheda_rapida_pdf.py
#  Licenza del codice: MIT · Danilo D'Auria
# ==========================================================================

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from reportlab.lib.units import mm  # noqa: E402
from reportlab.platypus import Spacer, Table, TableStyle  # noqa: E402

from fogli_comune import (  # noqa: E402
    BORDO, CARTA, ORO_SOFT, PDF_DIR, TERRA_SOFT, chiudi, comando, compila, para,
    punti, riquadro, stili, testata, versione_app,
)

OUT = PDF_DIR / "Naturopata-Digitale-Scheda-rapida.pdf"
TITOLO = "Scheda rapida"


def casella(titolo, righe, S, larghezza, sfondo=CARTA):
    return riquadro(titolo, punti(righe, S=S), sfondo=sfondo, bordo=BORDO, S=S, larghezza=larghezza)


def storia(versione):
    S = stili()
    out = []

    out += testata(
        "Scheda rapida",
        "INSTALLAZIONE IN QUATTRO PASSAGGI",
        "Quattro passaggi per sistema e i controlli che risolvono quasi tutto. "
        "Le istruzioni complete, con le domande frequenti, stanno nel foglio "
        "«Come si installa»: qui c'è solo quello che serve davanti al computer.",
        versione, S,
    )

    # --- Quattro sistemi, due colonne -------------------------------------
    intera = None
    mezza = (595.2755905511812 - 36 * mm) / 2 - 4
    cella = [
        ("Windows 10 e 11", [
            "Scarica <font name='Courier' size='8'>…-Windows-x64.exe</font>.",
            "Doppio clic sul file.",
            "Avviso di Windows → «Ulteriori informazioni» → «Esegui comunque».",
            "Fine: l'icona è nel menu Start. Lo ZIP portatile non installa nulla.",
        ]),
        ("macOS", [
            "Scarica il <font name='Courier' size='8'>.dmg</font> del tuo processore (Apple o Intel).",
            "Apri l'immagine disco.",
            "Trascina l'app nella cartella Applicazioni.",
            "Primo avvio: tasto destro → «Apri» → «Apri».",
        ]),
        ("Linux", [
            "<font name='Courier' size='8'>.deb</font>: doppio clic e «Installa», oppure <font name='Courier' size='8'>sudo apt install ./…deb</font>.",
            "<font name='Courier' size='8'>AppImage</font>: <font name='Courier' size='8'>chmod +x</font> sul file.",
            "Avvia con doppio clic.",
            "Se manca una libreria: <font name='Courier' size='8'>libfuse2t64</font> su Ubuntu 24.04.",
        ]),
        ("Telefono e tablet", [
            "Apri il sito con Chrome o Safari.",
            "«Installa app», oppure Condividi → «Aggiungi alla schermata Home».",
            "Conferma.",
            "Dopo la prima apertura funziona anche offline.",
        ]),
    ]
    riquadri = [casella(t, r, S, mezza) for t, r in cella]
    griglia = Table(
        [[riquadri[0], riquadri[1]], [riquadri[2], riquadri[3]]],
        colWidths=[mezza + 4, mezza + 4],
    )
    griglia.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    out.append(griglia)

    out.append(para(
        "Su tutte e tre le strade il programma si può usare anche senza installare "
        "niente, dal browser.", "nota", S))

    # --- Se il file non parte ---------------------------------------------
    out.append(para("Se il file non parte", "h2", S))
    out.append(punti([
        "Scarica di nuovo il file: un download interrotto è la causa più frequente.",
        "Confronta l'impronta SHA-256 con quella della release.",
        "Windows: l'avviso SmartScreen non è un errore, scegli «Esegui comunque».",
        "macOS: togli la quarantena con il comando qui sotto, una volta sola.",
        "Antivirus: ripristina il file dalla quarantena, non disattivarlo.",
        "Linux senza accelerazione grafica: avvia con <font name='Courier' size='8'>--disable-gpu</font>.",
    ], S=S))
    out.append(comando(
        'xattr -dr com.apple.quarantine &quot;/Applications/Naturopata Digitale.app&quot;', S))

    # --- Impronte ---------------------------------------------------------
    out.append(para("Verifica l'impronta", "h2", S))
    out.append(para(
        "Con <font name='Courier' size='8'>SHA256SUMS.txt</font> nella cartella dei "
        "file scaricati, un solo comando controlla tutto e risponde <i>OK</i> per "
        "ciascuno. Le stesse impronte sono nella pagina di download.", "corpo", S))
    out.append(comando(
        "Get-FileHash .\\Naturopata-Digitale-Windows-x64.exe -Algorithm SHA256<br/>"
        "sha256sum -c SHA256SUMS.txt        # Linux<br/>"
        "shasum -a 256 -c SHA256SUMS.txt   # macOS", S))

    # --- Cosa sapere -------------------------------------------------------
    out.append(riquadro(
        "Da sapere, in tre righe",
        "La connessione serve solo per scaricare: dopo, il programma funziona offline e "
        "i dati restano sul dispositivo. Non c'è account, non c'è pubblicità, non c'è "
        "tracciamento. Per un'emergenza sanitaria il numero è il 112: il programma è "
        "divulgativo e non sostituisce il medico.",
        sfondo=ORO_SOFT, S=S))
    out.append(Spacer(1, 6))
    out.append(riquadro(
        "Cosa non fa",
        "Non diagnostica, non prescrive, non cura. Le piante sono sostanze attive e "
        "possono interagire con i farmaci: in gravidanza, allattamento, nei bambini e "
        "con terapie in corso serve il parere di un professionista.",
        sfondo=TERRA_SOFT, S=S))

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
