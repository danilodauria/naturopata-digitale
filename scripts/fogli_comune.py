#!/usr/bin/env python3
# ==========================================================================
#  Naturopata Digitale · elementi comuni ai fogli in PDF
#  Usato da build_come_installare_pdf.py e build_scheda_rapida_pdf.py.
#  Nessun contenuto: solo impaginazione, palette e piè di pagina.
#
#  Licenza del codice: MIT · Danilo D'Auria
# ==========================================================================

import json
from pathlib import Path

try:
    from reportlab.lib import colors
except ImportError:  # dipendenza facoltativa, solo per i PDF
    raise SystemExit(
        "Serve reportlab per generare i fogli in PDF.\n"
        "  python3 -m venv .venv && .venv/bin/pip install reportlab\n"
        "  .venv/bin/python scripts/build_come_installare_pdf.py"
    )

from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether, ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer,
    Table, TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
PDF_DIR = ROOT / "assets" / "pdf"

# Palette: la stessa del sito e del Vademecum
VERDE_900 = colors.HexColor("#173a2b")
VERDE_800 = colors.HexColor("#1f4d3a")
VERDE_700 = colors.HexColor("#296149")
SALVIA_CHIARA = colors.HexColor("#d9e6dc")
CREMA = colors.HexColor("#f5f1e6")
CARTA = colors.HexColor("#fffdf7")
CARTA_2 = colors.HexColor("#fbf7ec")
INCHIOSTRO = colors.HexColor("#1d2b24")
INCHIOSTRO_SOFT = colors.HexColor("#4a5b51")
INCHIOSTRO_FAINT = colors.HexColor("#63756a")
TERRA = colors.HexColor("#a9603f")
TERRA_SOFT = colors.HexColor("#f2e2d6")
ORO_SOFT = colors.HexColor("#f5ecd2")
BORDO = colors.HexColor("#e2ddcd")
BORDO_FORTE = colors.HexColor("#cfc7b2")

PAGE_W, PAGE_H = A4
M_L = M_R = 18 * mm
M_T = 18 * mm
M_B = 24 * mm

URL = "danilodauria.github.io/naturopata-digitale"


def versione_app() -> str:
    """Versione dichiarata in package.json: la stessa del sito e della release."""
    with open(ROOT / "package.json", encoding="utf-8") as fh:
        return json.load(fh)["version"]


def stili():
    """Stili tipografici dei fogli (Helvetica per il testo, serif per i titoli)."""
    base = ParagraphStyle(
        "corpo", fontName="Helvetica", fontSize=9.8, leading=14.2,
        textColor=INCHIOSTRO, alignment=TA_LEFT, spaceAfter=4.2,
    )
    return {
        "titolo": ParagraphStyle(
            "titolo", fontName="Times-Bold", fontSize=25, leading=28,
            textColor=VERDE_900, spaceAfter=3,
        ),
        "occhiello": ParagraphStyle(
            "occhiello", fontName="Helvetica-Bold", fontSize=7.4, leading=10,
            textColor=VERDE_700, spaceAfter=6,
        ),
        "sommario": ParagraphStyle(
            "sommario", parent=base, fontSize=11, leading=16,
            textColor=INCHIOSTRO_SOFT, spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "h2", fontName="Times-Bold", fontSize=15.5, leading=18,
            textColor=VERDE_800, spaceBefore=12, spaceAfter=5,
        ),
        "h3": ParagraphStyle(
            "h3", fontName="Helvetica-Bold", fontSize=10.4, leading=13,
            textColor=VERDE_800, spaceBefore=6, spaceAfter=3,
        ),
        "corpo": base,
        "piccolo": ParagraphStyle("piccolo", parent=base, fontSize=8.6, leading=12.4),
        "nota": ParagraphStyle(
            "nota", parent=base, fontSize=8.4, leading=12,
            textColor=INCHIOSTRO_FAINT, spaceAfter=3,
        ),
        "elenco": ParagraphStyle("elenco", parent=base, spaceAfter=2),
        "cella": ParagraphStyle("cella", parent=base, fontSize=8.7, leading=12, spaceAfter=0),
        "cellaT": ParagraphStyle(
            "cellaT", parent=base, fontName="Helvetica-Bold", fontSize=8.7,
            leading=12, spaceAfter=0, textColor=VERDE_800,
        ),
    }


def para(testo, stile="corpo", S=None):
    S = S or stili()
    return Paragraph(testo, S[stile])


def punti(elenco, stile="elenco", S=None):
    """Elenco puntato con i segni del sito."""
    S = S or stili()
    return ListFlowable(
        [ListItem(Paragraph(t, S[stile]), leftIndent=10) for t in elenco],
        bulletType="bullet", start="•", bulletFontSize=7,
        leftIndent=12, bulletOffsetY=0.5, spaceAfter=5,
    )


def riquadro(titolo, corpo, sfondo=CARTA_2, bordo=BORDO_FORTE, S=None, larghezza=None):
    """Riquadro con titolo: usato per gli avvisi e per le caselle dei sistemi."""
    S = S or stili()
    righe = [[Paragraph(titolo, S["cellaT"])]]
    for voce in corpo if isinstance(corpo, list) else [corpo]:
        # Il corpo può essere testo (diventa un paragrafo) o già un flowable:
        # elenchi puntati, tabelle e comandi restano come sono.
        righe.append([Paragraph(voce, S["cella"]) if isinstance(voce, str) else voce])
    tabella = Table(righe, colWidths=[larghezza or (PAGE_W - M_L - M_R)])
    tabella.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), sfondo),
        ("BOX", (0, 0), (-1, -1), 0.6, bordo),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return tabella


def piede(titolo, versione):
    """Piè di pagina: identità del foglio, licenza, versione e pagina."""

    def disegna(canv, doc):
        canv.saveState()
        canv.setStrokeColor(BORDO_FORTE)
        canv.setLineWidth(0.6)
        canv.line(M_L, 18 * mm, PAGE_W - M_R, 18 * mm)
        canv.setFillColor(INCHIOSTRO_SOFT)
        canv.setFont("Helvetica", 7.3)
        canv.drawString(M_L, 13.6 * mm, "Naturopata Digitale · " + titolo)
        canv.setFillColor(INCHIOSTRO_FAINT)
        canv.setFont("Helvetica", 7.3)
        canv.drawCentredString(PAGE_W / 2, 13.6 * mm, "Codice MIT · Testi CC BY-NC-SA 4.0")
        canv.setFillColor(INCHIOSTRO_SOFT)
        canv.setFont("Helvetica-Bold", 7.3)
        canv.drawRightString(PAGE_W - M_R, 13.6 * mm,
                             "versione " + versione + " · pagina " + str(canv.getPageNumber()))
        canv.setFillColor(INCHIOSTRO_FAINT)
        canv.setFont("Helvetica", 6.5)
        canv.drawString(M_L, 9.8 * mm, URL + " · © Danilo D'Auria, un progetto FeniceOS")
        canv.restoreState()

    return disegna


def documento(destinazione, titolo, versione):
    """Apre il documento A4 con i metadati che dichiarano la versione.

    Il metadato contiene la stringa `versione=X`: il workflow «Foglio di
    installazione» la cerca nel file per non allegare a una release un foglio
    rimasto indietro.
    """
    destinazione.parent.mkdir(parents=True, exist_ok=True)
    return SimpleDocTemplate(
        str(destinazione),
        pagesize=A4,
        leftMargin=M_L, rightMargin=M_R, topMargin=M_T, bottomMargin=M_B,
        title="Naturopata Digitale · " + titolo,
        author="Danilo D'Auria",
        subject="Naturopata Digitale · " + titolo + " · versione=" + versione,
        creator="Naturopata Digitale · " + URL,
        keywords="naturopata, piante officinali, " + titolo.lower() + ", versione=" + versione,
    )


def compila(story, destinazione, titolo, versione):
    doc = documento(destinazione, titolo, versione)
    disegna = piede(titolo, versione)
    doc.build(story, onFirstPage=disegna, onLaterPages=disegna)
    return doc


def testata(titolo, occhiello, sommario, versione, S=None):
    """Blocco di apertura comune: occhiello, titolo, sommario, riga di stato."""
    S = S or stili()
    out = [
        Paragraph(occhiello, S["occhiello"]),
        Paragraph(titolo, S["titolo"]),
        Paragraph(sommario, S["sommario"]),
    ]
    # Nel riquadro scuro il testo va schiarito: gli stili di base sono scuri.
    chiaro_b = ParagraphStyle("chiaro-b", parent=S["cellaT"], textColor=CREMA)
    chiaro = ParagraphStyle("chiaro", parent=S["cella"], textColor=CREMA)
    url_stile = ParagraphStyle("url-barra", parent=S["cella"], textColor=CREMA, fontSize=7.4)
    larghezza = PAGE_W - M_L - M_R
    riga = Table(
        [[Paragraph("versione " + versione, chiaro_b),
          Paragraph("novembre 2026", chiaro),
          Paragraph(URL, url_stile)]],
        colWidths=[larghezza * 0.24, larghezza * 0.20, larghezza * 0.56],
    )
    riga.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), VERDE_900),
        ("TEXTCOLOR", (0, 0), (-1, -1), CREMA),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    out.append(Spacer(1, 2))
    out.append(riga)
    out.append(Spacer(1, 8))
    return out


def tabella_file(righe, S=None):
    """Tabella dei file della release: nome e a cosa serve."""
    S = S or stili()
    dati = [[Paragraph("File", S["cellaT"]), Paragraph("A cosa serve", S["cellaT"])]]
    for nome, uso in righe:
        dati.append([
            Paragraph('<font name="Courier" size="7.8">' + nome + "</font>", S["cella"]),
            Paragraph(uso, S["cella"]),
        ])
    larghezza = PAGE_W - M_L - M_R
    tabella = Table(dati, colWidths=[larghezza * 0.46, larghezza * 0.54], repeatRows=1)
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


def comando(testo, S=None):
    """Riga di comando, in monospaziato su fondo chiaro."""
    S = S or stili()
    larghezza = PAGE_W - M_L - M_R
    tabella = Table([[Paragraph('<font name="Courier" size="8">' + testo + "</font>", S["cella"])]],
                    colWidths=[larghezza])
    tabella.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CREMA),
        ("BOX", (0, 0), (-1, -1), 0.5, BORDO),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return KeepTogether([tabella, Spacer(1, 6)])


def chiudi(story, versione, S=None):
    """Colophon finale dei fogli."""
    S = S or stili()
    story.append(Spacer(1, 10))
    story.append(riquadro(
        "Colophon",
        "Foglio di Naturopata Digitale, allineato all'app versione " + versione +
        ". Testi di Danilo D'Auria, licenza CC BY-NC-SA 4.0; codice MIT. "
        "Il foglio si rigenera con gli script in <font name='Courier' size='8'>scripts/</font>: "
        "se ne hai una copia stampata e il sito dice un numero diverso, vale il sito.",
        S=S,
    ))
