#!/usr/bin/env python3
# ==========================================================================
#  Naturopata Digitale · generatore del Vademecum in PDF
#  Costruisce la guida tascabile (A5) dai dati dell'app: nessun contenuto
#  duplicato a mano, tutto viene letto da assets/js/data-*.js.
#
#  Uso:  .venv/bin/python scripts/build_vademecum.py
#  Dipendenze: reportlab (vedi README, sezione Vademecum)
#  Licenza del codice: MIT · Danilo D'Auria
# ==========================================================================

import json
import subprocess
import sys
from pathlib import Path

try:
    from reportlab.lib import colors
except ImportError:  # dipendenza facoltativa, solo per il PDF
    raise SystemExit(
        "Serve reportlab per generare il Vademecum.\n"
        "  python3 -m venv .venv && .venv/bin/pip install reportlab pymupdf\n"
        "  .venv/bin/python scripts/build_vademecum.py"
    )

try:
    import pymupdf
except ImportError:
    raise SystemExit(
        "Serve pymupdf per le versioni A4 e libricino.\n"
        "  .venv/bin/pip install pymupdf\n"
        "  .venv/bin/python scripts/build_vademecum.py"
    )
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A5
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    BaseDocTemplate, Flowable, Frame, KeepTogether, NextPageTemplate,
    PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle,
)
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
PDF_DIR = ROOT / "assets" / "pdf"
OUT = PDF_DIR / "vademecum-naturopata-digitale.pdf"
OUT_A4 = PDF_DIR / "vademecum-naturopata-digitale-a4.pdf"
OUT_BOOK = PDF_DIR / "vademecum-naturopata-digitale-libricino-a4.pdf"

# --------------------------------------------------------------------------
#  Palette: la stessa del sito
# --------------------------------------------------------------------------
VERDE_900 = HexColor("#173a2b")
VERDE_800 = HexColor("#1f4d3a")
VERDE_700 = HexColor("#296149")
VERDE_600 = HexColor("#357a5a")
SALVIA = HexColor("#93b39f")
SALVIA_CHIARA = HexColor("#d9e6dc")
CREMA = HexColor("#f5f1e6")
CARTA = HexColor("#fffdf7")
CARTA_2 = HexColor("#fbf7ec")
INCHIOSTRO = HexColor("#1d2b24")
INCHIOSTRO_SOFT = HexColor("#4a5b51")
INCHIOSTRO_FAINT = HexColor("#63756a")
TERRA = HexColor("#a9603f")
TERRA_SOFT = HexColor("#f2e2d6")
ORO = HexColor("#b08a2e")
ORO_SOFT = HexColor("#f5ecd2")
ROSSO = HexColor("#9e3b32")
ROSSO_SOFT = HexColor("#f6e1dd")
BORDO = HexColor("#e2ddcd")
BORDO_FORTE = HexColor("#cfc7b2")

# --------------------------------------------------------------------------
#  Pagina
# --------------------------------------------------------------------------
PW, PH = A5
M_L = M_R = 15 * mm
M_T = 16 * mm
M_B = 18 * mm
FW = PW - M_L - M_R
FH = PH - M_T - M_B

F_BODY = "Times-Roman"
F_BODY_I = "Times-Italic"
F_BODY_B = "Times-Bold"
F_SANS = "Helvetica"
F_SANS_B = "Helvetica-Bold"
F_SANS_O = "Helvetica-Oblique"

TITOLO = "Vademecum"
EDIZIONE = "Edizione 1 · ottobre 2026"
SOTTOTITOLO = "Piante officinali, sicurezza e raccolta responsabile"

# Caratteri che le font PDF standard (WinAnsi) non sanno disegnare
SOSTITUZIONI = {
    "\u2192": "\u00bb", "\u2190": "\u00ab", "\u2265": "\u2265", "\u2264": "\u2264",
    "\u2022": "\u00b7", "\u2248": "\u007e", "\u2600": "", "\u2620": "",
    "\U0001f6a8": "", "\u2705": "", "\u274c": "\u00d7",
}


def clean(text: str) -> str:
    """Ripulisce il testo: XML-safe e compatibile con le font standard."""
    text = escape(str(text))
    out = []
    for ch in text:
        if ch in SOSTITUZIONI:
            out.append(SOSTITUZIONI[ch])
            continue
        try:
            ch.encode("cp1252")
            out.append(ch)
        except UnicodeEncodeError:
            out.append("")
    return "".join(out)


# --------------------------------------------------------------------------
#  Stili
# --------------------------------------------------------------------------
def st(name, **kw):
    base = dict(fontName=F_BODY, fontSize=9.2, leading=12.8,
                textColor=INCHIOSTRO, spaceBefore=0, spaceAfter=0,
                alignment=TA_JUSTIFY)
    base.update(kw)
    return ParagraphStyle(name, **base)


S = {
    "eyebrow": st("eyebrow", fontName=F_SANS_B, fontSize=6.8, leading=9,
                  textColor=TERRA, spaceAfter=2.5 * mm, alignment=0),
    "h1": st("h1", fontName=F_SANS_B, fontSize=17, leading=20,
             textColor=VERDE_800, spaceAfter=3 * mm, alignment=0),
    "lead": st("lead", fontName=F_BODY_I, fontSize=10.4, leading=14.6,
               textColor=VERDE_700, spaceAfter=3.5 * mm, alignment=0),
    "body": st("body", spaceAfter=2.2 * mm),
    "body_last": st("body_last", spaceAfter=0),
    "small": st("small", fontSize=8, leading=10.8, textColor=INCHIOSTRO_SOFT),
    "tiny": st("tiny", fontSize=7.2, leading=9.4, textColor=INCHIOSTRO_SOFT,
               alignment=0),
    "h2": st("h2", fontName=F_SANS_B, fontSize=9.6, leading=12,
             textColor=VERDE_800, spaceBefore=2.5 * mm, spaceAfter=1.6 * mm,
             alignment=0, keepWithNext=1),
    "body_s": st("body_s", fontSize=7.8, leading=10.3, alignment=0),
    "card_title": st("card_title", fontName=F_SANS_B, fontSize=9.6, leading=11.8,
                     textColor=VERDE_900, alignment=0),
    "card_latin": st("card_latin", fontName=F_BODY_I, fontSize=8.4, leading=10.6,
                     textColor=INCHIOSTRO_FAINT, alignment=0),
    "label": st("label", fontName=F_SANS_B, fontSize=6.4, leading=8.4,
                textColor=INCHIOSTRO_FAINT, alignment=0, spaceAfter=0.6 * mm),
    "cell": st("cell", fontSize=8, leading=10.4, alignment=0),
    "cell_bold": st("cell_bold", fontName=F_SANS_B, fontSize=7.8, leading=10,
                    textColor=VERDE_900, alignment=0),
    "cell_latin": st("cell_latin", fontName=F_BODY_I, fontSize=7, leading=9,
                     textColor=INCHIOSTRO_FAINT, alignment=0),
    "chip": st("chip", fontName=F_SANS_B, fontSize=6.2, leading=7.6,
               textColor=colors.white, alignment=TA_CENTER),
    "chip_dark": st("chip_dark", fontName=F_SANS_B, fontSize=6.2, leading=7.6,
                    textColor=ORO, alignment=TA_CENTER),
    "gloss": st("gloss", fontSize=8.7, leading=11.6, spaceAfter=2 * mm,
                alignment=0),
    "toc": st("toc", fontName=F_SANS, fontSize=8.6, leading=11.9,
              textColor=INCHIOSTRO, alignment=0, spaceAfter=1.05 * mm),
    "foot": st("foot", fontName=F_SANS, fontSize=6.6, leading=8,
               textColor=INCHIOSTRO_FAINT, alignment=0),
}


# --------------------------------------------------------------------------
#  Elementi grafici
# --------------------------------------------------------------------------
class Dot(Flowable):
    """Pallino colorato per i livelli di sicurezza."""

    def __init__(self, color, size=4.6):
        super().__init__()
        self.color = color
        self.width = self.height = size

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.circle(self.height / 2, self.height / 2, self.height / 2,
                         stroke=0, fill=1)


class Rule(Flowable):
    """Linea sottile orizzontale."""

    def __init__(self, width, color=BORDO, thickness=0.6, space=0):
        super().__init__()
        self.width = width
        self.height = thickness + space
        self.color = color
        self.thickness = thickness
        self.space = space

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.thickness)
        self.canv.line(0, self.space, self.width, self.space)


class VoceIndice(Flowable):
    """Riga d'indice: titolo a sinistra, puntini, numero di pagina a destra."""

    def __init__(self, titolo, pagina, larghezza, altezza=13.2):
        super().__init__()
        self.titolo = titolo
        self.pagina = str(pagina) if pagina else ""
        self.width = larghezza
        self.height = altezza

    def wrap(self, *_):
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.setFont(F_SANS, 8.6)
        c.setFillColor(INCHIOSTRO)
        c.drawString(0, 3, self.titolo)
        w_titolo = stringWidth(self.titolo, F_SANS, 8.6)
        w_num = stringWidth(self.pagina, F_SANS, 8.6)
        c.setStrokeColor(HexColor("#b5ae9a"))
        c.setLineWidth(1.2)
        c.setDash(0.1, 2.9)
        c.line(w_titolo + 4, 4.2, self.width - w_num - 4, 4.2)
        c.setDash()
        c.setFillColor(INCHIOSTRO)
        c.drawRightString(self.width, 3, self.pagina)


def chip(text, bg, fg=colors.white, width=None, pad=1.6):
    style = S["chip"] if fg == colors.white else S["chip_dark"]
    p = Paragraph(clean(text).upper(), style)
    w = width or stringWidth(text.upper(), style.fontName, style.fontSize) + 2 * pad * mm
    t = Table([[p]], colWidths=[w])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LEFTPADDING", (0, 0), (-1, -1), pad * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), pad * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 0.9 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0.9 * mm),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return t


def band(inner, accent=VERDE_600, bg=CARTA_2, pad=3.2, accent_w=1.6):
    """Blocco con barretta colorata a sinistra."""
    t = Table([["", inner]], colWidths=[accent_w * mm, FW - accent_w * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), accent),
        ("BACKGROUND", (1, 0), (1, 0), bg),
        ("LEFTPADDING", (0, 0), (0, 0), 0),
        ("RIGHTPADDING", (0, 0), (0, 0), 0),
        ("LEFTPADDING", (1, 0), (1, 0), pad * mm),
        ("RIGHTPADDING", (1, 0), (1, 0), pad * mm),
        ("TOPPADDING", (0, 0), (-1, -1), pad * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), pad * mm),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def section(title, eyebrow, lead=None, toc_level=0):
    """Apertura di sezione con voce d'indice (toc_level=None: fuori indice)."""
    out = []
    if eyebrow:
        out.append(Paragraph(clean(eyebrow).upper(), S["eyebrow"]))
    h = Paragraph(clean(title), S["h1"])
    if toc_level is not None:
        h._toc_title = title
    out.append(h)
    if lead:
        out.append(Paragraph(clean(lead), S["lead"]))
    return out


def para(text, style="body"):
    return Paragraph(clean(text), S[style])


def rich(markup, style="small"):
    """Paragrafo con marcature proprie: il testo va già ripulito da clean()."""
    return Paragraph(markup, S[style])


def campo(label, value, style="small"):
    return [Paragraph(clean(label).upper(), S["label"]), Paragraph(clean(value), S[style])]


# --------------------------------------------------------------------------
#  Documento
# --------------------------------------------------------------------------
class Vademecum(BaseDocTemplate):
    def __init__(self, filename, **kw):
        self.edizione = kw.pop("edizione", "")
        super().__init__(
            filename, pagesize=A5,
            leftMargin=M_L, rightMargin=M_R, topMargin=M_T, bottomMargin=M_B,
            title="Vademecum — Naturopata Digitale",
            author="Danilo D'Auria",
            subject="Guida tascabile a piante officinali, sicurezza e raccolta responsabile",
            keywords="naturopatia, fitoterapia, piante officinali, sicurezza, raccolta, PWA",
            creator="Naturopata Digitale · FeniceOS",
            **kw,
        )
        cover = PageTemplate(
            id="cover",
            frames=[Frame(0, 0, PW, PH, leftPadding=0, rightPadding=0,
                          topPadding=0, bottomPadding=0)],
            onPage=self.draw_cover,
        )
        body = PageTemplate(
            id="body",
            frames=[Frame(M_L, M_B, FW, FH, id="body", leftPadding=0,
                          rightPadding=0, topPadding=0, bottomPadding=0)],
            onPage=self.draw_body,
        )
        self.addPageTemplates([cover, body])
        self.indice = []

    # --- intestazione e piè di pagina -------------------------------------
    def draw_body(self, canv, doc):
        canv.saveState()
        top = PH - M_T + 5.4 * mm
        canv.setFont(F_SANS, 6.5)
        canv.setFillColor(INCHIOSTRO_FAINT)
        canv.drawString(M_L, top, "NATUROPATA DIGITALE")
        canv.drawRightString(PW - M_R, top, "VADEMECUM")
        canv.setStrokeColor(BORDO)
        canv.setLineWidth(0.5)
        canv.line(M_L, top - 1.6 * mm, PW - M_R, top - 1.6 * mm)

        base = M_B - 7.5 * mm
        canv.line(M_L, base + 3.2 * mm, PW - M_R, base + 3.2 * mm)
        canv.setFont(F_SANS, 6.5)
        canv.drawString(M_L, base, self.edizione or "")
        canv.drawRightString(PW - M_R, base, "%d" % (doc.page - 1))
        canv.restoreState()

    # --- copertina --------------------------------------------------------
    def draw_cover(self, canv, doc):
        canv.saveState()
        canv.setFillColor(CREMA)
        canv.rect(-1, -1, PW + 2, PH + 2, stroke=0, fill=1)

        # fascia verde in alto
        canv.setFillColor(VERDE_800)
        canv.rect(0, PH - 62 * mm, PW, 62 * mm, stroke=0, fill=1)
        canv.setFillColor(VERDE_600)
        canv.rect(0, PH - 63.4 * mm, PW, 1.4 * mm, stroke=0, fill=1)

        canv.setFillColor(SALVIA)
        canv.setFont(F_SANS_B, 7)
        canv.drawString(M_L, PH - 20 * mm, "N A T U R O P A T A   D I G I T A L E")

        canv.setFillColor(CARTA)
        canv.setFont(F_SANS_B, 33)
        canv.drawString(M_L, PH - 35 * mm, TITOLO)
        canv.setFont(F_BODY_I, 15)
        canv.setFillColor(SALVIA_CHIARA)
        canv.drawString(M_L, PH - 45 * mm, "delle piante officinali")

        canv.setFillColor(SALVIA_CHIARA)
        canv.setFont(F_BODY, 9)
        canv.drawString(M_L, PH - 54 * mm,
                        "Sicurezza, raccolta, forme d'uso e %d schede da portare con sé."
                        % getattr(doc, "plants", 0))

        # filetto e testi bassi
        canv.setStrokeColor(BORDO_FORTE)
        canv.setLineWidth(0.8)
        canv.line(M_L, PH - 76 * mm, PW - M_R, PH - 76 * mm)

        canv.setFillColor(INCHIOSTRO)
        canv.setFont(F_BODY_I, 12.5)
        canv.drawString(M_L, PH - 86 * mm, SOTTOTITOLO)

        canv.setFillColor(INCHIOSTRO_SOFT)
        canv.setFont(F_BODY, 8.6)
        righe = [
            "%d piante officinali · 10 piante tossiche · 14 interazioni"
            % getattr(doc, "plants", 0),
            "12 segnali d'allarme · calendario del raccolto · glossario",
        ]
        y = PH - 94 * mm
        for r in righe:
            canv.drawString(M_L, y, r)
            y -= 4.6 * mm

        canv.setFillColor(INCHIOSTRO_FAINT)
        canv.setFont(F_SANS, 6.8)
        canv.drawCentredString(PW / 2, PH - 160 * mm,
                               "FORMATO A5 · DA STAMPARE FRONTE-RETRO O DA TENERE NEL TELEFONO")

        # citazione, nel bianco centrale
        canv.setFillColor(VERDE_700)
        canv.setFont(F_BODY_I, 11.5)
        canv.drawCentredString(PW / 2, PH - 112 * mm,
                               "«La natura non è una farmacia:")
        canv.drawCentredString(PW / 2, PH - 117.5 * mm,
                               "è un maestro di equilibrio.»")
        canv.setFillColor(INCHIOSTRO_FAINT)
        canv.setFont(F_SANS, 6.8)
        canv.drawCentredString(PW / 2, PH - 123 * mm,
                               "PRINCIPIO EDITORIALE DEL PROGETTO")

        # foglia ornamentale
        canv.saveState()
        canv.translate(PW - 34 * mm, PH - 132 * mm)
        canv.rotate(18)
        canv.setFillColor(SALVIA_CHIARA)
        p = canv.beginPath()
        p.moveTo(0, 0)
        p.curveTo(7 * mm, 9 * mm, 17 * mm, 17 * mm, 26 * mm, 22 * mm)
        p.curveTo(13 * mm, 26 * mm, 3 * mm, 18 * mm, 0, 0)
        canv.drawPath(p, stroke=0, fill=1)
        canv.setStrokeColor(SALVIA)
        canv.setLineWidth(0.7)
        canv.line(0, 0, 24 * mm, 21 * mm)
        canv.restoreState()

        canv.setStrokeColor(BORDO_FORTE)
        canv.setLineWidth(0.8)
        canv.line(M_L, 40 * mm, PW - M_R, 40 * mm)

        canv.setFillColor(VERDE_800)
        canv.setFont(F_SANS_B, 9)
        canv.drawString(M_L, 33 * mm, "Danilo D'Auria")
        canv.setFillColor(INCHIOSTRO_SOFT)
        canv.setFont(F_SANS, 7.4)
        canv.drawString(M_L, 28.6 * mm, "Un progetto FeniceOS · guida tascabile")
        canv.drawString(M_L, 24.6 * mm, "Testi: CC BY-NC-SA 4.0 · versione dell'app " + self.app_version)

        canv.setFillColor(TERRA)
        canv.setFont(F_SANS_B, 7)
        canv.drawRightString(PW - M_R, 33 * mm, (self.edizione or "").upper())
        canv.setFillColor(INCHIOSTRO_FAINT)
        canv.setFont(F_SANS, 7)
        canv.drawRightString(PW - M_R, 28.6 * mm, "guida educativa,")
        canv.drawRightString(PW - M_R, 24.6 * mm, "non sostituisce il medico")
        canv.restoreState()

    app_version = ""

    # --- indice -----------------------------------------------------------
    def afterFlowable(self, flowable):
        titolo = getattr(flowable, "_toc_title", None)
        if titolo is not None:
            # la copertina non è numerata: l'indice segue i numeri stampati
            self.indice.append((titolo, self.page - 1))


# --------------------------------------------------------------------------
#  Contenuti
# --------------------------------------------------------------------------
def pagina_liminare(d, indice=None):
    out = []
    out += section(
        "Prima di tutto",
        "Avvertenza",
        "Questa guida raccoglie, in forma tascabile, ciò che l'app Naturopata "
        "Digitale spiega in modo esteso. È pensata per essere stampata o "
        "consultata sul telefono quando serve un promemoria veloce.",
    )
    out.append(para(
        "Non è un manuale di medicina e non promette guarigioni. Non "
        "diagnostica, non prescrive e non sostituisce medico, farmacista o "
        "pediatra. Le informazioni sono divulgative e tratte da tradizione, "
        "monografie europee e letteratura scientifica: quando l'evidenza è "
        "limitata, la guida lo dice invece di nasconderlo.",
    ))
    out.append(Spacer(1, 1.4 * mm))
    out.append(band(
        rich("<b>Le dosi non sono in questa guida.</b> Cambiano da pianta a "
             "pianta, dalla parte usata e dalla preparazione: una dose "
             "generica sarebbe un errore. Le dosi indicative delle %d schede "
             "sono nell'app, accanto alle avvertenze per gravidanza, "
             "allattamento e bambini." % len(d["plants"]), "small"),
        accent=TERRA, bg=TERRA_SOFT))
    out.append(Spacer(1, 3 * mm))
    out.append(para(
        "In caso di sintomi importanti, di gravidanza, di terapie in corso o "
        "di dubbio sull'identificazione di una pianta, fermati e chiedi a un "
        "professionista sanitario. In emergenza chiama il 112 o il 118.",
    ))
    out.append(Spacer(1, 3.2 * mm))
    out.append(Paragraph("Indice", S["eyebrow"]))
    if indice:
        for titolo, pagina in indice:
            out.append(VoceIndice(clean(titolo), pagina, FW))
    out.append(PageBreak())
    return out


def pagina_emergenze(d):
    out = []
    out += section(
        "Quando chiamare",
        "Emergenze",
        "Dodici situazioni in cui la pianta non c'entra: serve una persona, "
        "subito. Riconoscerle è la prima competenza di chi si occupa di "
        "benessere.",
    )
    ordine = ["emergenza", "urgente", "visita"]
    etichette = {
        "emergenza": ("112 / 118", ROSSO, colors.white),
        "urgente": ("oggi", TERRA, colors.white),
        "visita": ("visita medica", ORO_SOFT, ORO),
    }
    for livello in ordine:
        voci = [r for r in d["redFlags"] if r["livello"] == livello]
        if not voci:
            continue
        testo, bg, fg = etichette[livello]
        out.append(Paragraph(clean(testo).upper(), S["h2"]))
        righe = []
        for r in voci:
            cella = [Paragraph(clean(r["sintomo"]), S["cell_bold"]),
                     Spacer(1, 0.5 * mm),
                     Paragraph(clean(r["azione"]), S["cell"])]
            righe.append([chip(testo, bg, fg, width=17 * mm), cella])
        t = Table(righe, colWidths=[21 * mm, FW - 21 * mm])
        stile = [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (0, -1), 1 * mm),
            ("LEFTPADDING", (1, 0), (1, -1), 2.6 * mm),
            ("RIGHTPADDING", (1, 0), (1, -1), 2 * mm),
            ("TOPPADDING", (0, 0), (-1, -1), 1.8 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
            ("LINEBELOW", (0, 0), (-1, -2), 0.4, BORDO),
        ]
        t.setStyle(TableStyle(stile))
        out.append(t)
        out.append(Spacer(1, 2.4 * mm))

    out.append(Spacer(1, 2 * mm))
    out.append(band(         [rich("<b>Ingestione sospetta di una pianta o di un fungo</b>", "small"),
         Spacer(1, 1.4 * mm),
         para("Chiama un Centro Antiveleni o il 112/118. Non indurre il vomito. "
              "Conserva un campione della pianta, o i resti del pasto, per "
              "l'identificazione: è la prima cosa che ti chiederanno.", "small"),
         Spacer(1, 1.4 * mm),
         para("L'elenco aggiornato dei Centri Antiveleni è sul sito dell'Istituto "
              "Superiore di Sanità: iss.it, voce «Centri antiveleni».", "tiny")],
        accent=ROSSO, bg=ROSSO_SOFT))

    out.append(Spacer(1, 4 * mm))
    out.append(Paragraph("Mentre aspetti i soccorsi", S["h2"]))
    punti = [
        "Resta con la persona e non lasciarla sola: la calma di chi è vicino conta",
        "Se è incosciente e respira, mettila su un fianco e controlla che respiri",
        "Non darle da bere né da mangiare e non indurre il vomito",
        "Tieni pronti i farmaci che assume e, se c'è stato un raccolto, un campione della pianta",
        "Manda qualcuno ad aprire il cancello o a guidare l'ambulanza",
        "Al telefono di' dove sei, che cosa è successo, quante persone e se respira",
    ]
    righe = [[Dot(SALVIA, 3.2), Paragraph(clean(t), S["body_s"])] for t in punti]
    tab = Table(righe, colWidths=[6 * mm, FW - 6 * mm])
    tab.setStyle(TableStyle([
        ("VALIGN", (0, 0), (0, -1), "TOP"),
        ("VALIGN", (1, 0), (1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0.9 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0.9 * mm),
    ]))
    out.append(tab)
    out.append(Spacer(1, 5 * mm))
    out.append(band([
        Paragraph("NUMERI E RIFERIMENTI", S["label"]),
        Spacer(1, 1.2 * mm),
        rich("<b>112</b> \u2014 numero unico di emergenza europeo, gratuito anche "
             "da cellulare senza credito.", "body_s"),
        Spacer(1, 1.2 * mm),
        rich("<b>118</b> \u2014 emergenza sanitaria, dove il 112 non è ancora attivo.", "body_s"),
        Spacer(1, 1.2 * mm),
        rich("<b>Centri Antiveleni</b> \u2014 per ingestione sospetta di piante, funghi "
             "o prodotti: elenco aggiornato sul sito ISS, sezione «Centri antiveleni». "
             "Tenere il numero della propria regione salvato in rubrica.", "body_s"),
    ], accent=VERDE_700, bg=CARTA_2, pad=2.8))
    return out


def pagina_tossiche(d):
    out = [PageBreak()]
    out += section(
        "Le dieci da non toccare",
        "Piante tossiche",
        "Non serve saperle usare: serve saperle riconoscere per non "
        "raccoglierle e per capire cosa hanno raccolto gli altri. Le schede "
        "sono in ordine di pericolosità.",
    )
    for p in d["toxic"]:
        pericolo = p.get("pericolo", "")
        mortale = "mortale" in pericolo.lower()
        testa = Table([[
            [Paragraph(clean(p["nome"]), S["card_title"]),
             Paragraph(clean(p["latino"]) + " · " + clean(p["famiglia"]), S["card_latin"])],
            chip(pericolo, ROSSO if mortale else TERRA, colors.white, width=17 * mm),
        ]], colWidths=[FW - 3.2 * mm - 21 * mm, 21 * mm])
        testa.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (0, 0), 2 * mm),
            ("RIGHTPADDING", (1, 0), (1, 0), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.4 * mm),
        ]))
        def cella(etichetta, testo):
            return [Paragraph(clean(etichetta).upper(), S["label"]),
                    Paragraph(clean(testo), S["body_s"])]

        griglia = Table([
            [cella("Cosa la distingue", p["caratteri"]), cella("Sintomi", p["sintomi"])],
            [cella("Somiglia a", p["sosia"]), cella("Cosa fare", p["soccorso"])],
        ], colWidths=[(FW - 3.2 * mm - 9 * mm) / 2] * 2)
        griglia.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (0, -1), 9 * mm),
            ("RIGHTPADDING", (1, 0), (1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 2 * mm),
            ("BOTTOMPADDING", (0, 1), (-1, 1), 0),
        ]))
        corpo = [testa, griglia]
        out.append(KeepTogether([band(corpo, accent=ROSSO if mortale else TERRA,
                                     bg=ROSSO_SOFT if mortale else TERRA_SOFT,
                                     pad=2.3),
                                 Spacer(1, 1.8 * mm)]))
    out.append(Spacer(1, 1.4 * mm))
    out.append(rich(
        "<i>\u00abLa natura non è una farmacia: è un maestro di equilibrio.\u00bb</i> "
        "Un principio che qui vale come regola di sicurezza: quello che non "
        "sai riconoscere non si usa, nemmeno con le migliori intenzioni.", "small"))
    out.append(Spacer(1, 3 * mm))
    out.append(band([
        Paragraph("SE UNA DI QUESTE PIANTE È NEL TUO GIARDINO", S["label"]),
        Spacer(1, 1.2 * mm),
        rich("<b>Bambini e animali.</b> Bacche, semi e foglie attirano: insegna a "
             "non raccogliere nulla senza un adulto e tieni i semi lontani dai "
             "giocattoli e dalle cucce.", "body_s"),
        Spacer(1, 1.4 * mm),
        rich("<b>Non compostare.</b> Le parti di scarto di una pianta velenosa non "
             "vanno nel compost né nel trito del giardino.", "body_s"),
        Spacer(1, 1.4 * mm),
        rich("<b>Guanti e occhi.</b> La linfa di alcune specie irrita la pelle e le "
             "mucose: potare con guanti e non toccarsi il viso.", "body_s"),
        Spacer(1, 1.4 * mm),
        rich("<b>Mai come «rimedio della nonna».</b> Nessuna di queste piante ha un "
             "uso domestico sicuro, indipendentemente da quanto si legge in giro.", "body_s"),
    ], accent=ROSSO, bg=CARTA_2, pad=2.8))
    return out


def pagina_sosia(d):
    pericolosi = []
    chiavi = ("mortale", "velen", "epatotoss", "tossic", "non raccogliere")
    for p in d["plants"]:
        for s in p.get("sosia", []) or []:
            rischio = s["rischio"]
            basso = rischio.lower().lstrip().startswith(("non tossic", "nessun rischio"))
            forte = any(k in rischio.lower() for k in ("mortale", "velen", "epatotoss"))
            if forte or (not basso and any(k in rischio.lower() for k in chiavi)):
                pericolosi.append((p["nome"], s["nome"], rischio))
    if not pericolosi:
        return []

    out = [PageBreak()]
    out += section(
        "Il doppione sbagliato",
        "Confusioni pericolose",
        "In fitoalimurgia quasi tutti gli incidenti gravi non nascono da una "
        "pianta velenosa cercata, ma da una pianta innocua scambiata per "
        "un'altra. Queste sono le confusioni da mandare a memoria.",
    )
    dati = [[Paragraph(clean(nome), S["cell_bold"]),
             Paragraph(clean(sosia), S["cell"]),
             Paragraph(clean(rischio), S["tiny"])]
            for nome, sosia, rischio in pericolosi]

    def tabella_sosia(blocco):
        righe = [[Paragraph("CERCHI", S["label"]),
                  Paragraph("NON CONFONDERLA CON", S["label"]),
                  Paragraph("PERCHÉ È PERICOLOSO", S["label"])]] + blocco
        t = Table(righe, colWidths=[30 * mm, 33 * mm, FW - 63 * mm], repeatRows=1)
        t.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("BACKGROUND", (0, 0), (-1, 0), CREMA),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (0, 0), 2.4 * mm),
            ("RIGHTPADDING", (1, 0), (1, 0), 2.4 * mm),
            ("RIGHTPADDING", (2, 0), (2, 0), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 1.3 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.3 * mm),
            ("LINEBELOW", (0, 0), (-1, -2), 0.4, BORDO),
            ("TOPPADDING", (0, 0), (-1, 0), 0.6 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 0.6 * mm),
        ]))
        return t

    # prima tavola: le confusioni con rischio di vita o di danno serio
    taglio = min(8, len(dati))
    out.append(tabella_sosia(dati[:taglio]))
    if len(dati) > taglio:
        out.append(PageBreak())
        out.append(tabella_sosia(dati[taglio:]))
    out.append(Spacer(1, 2.6 * mm))
    out.append(para(
        "Regola pratica: prima di raccogliere una specie commestibile, impara "
        "il sosia pericoloso. Se non sai dire che cosa NON è, non sai che cosa è.",
        "small"))

    out.append(Spacer(1, 4 * mm))
    out.append(Paragraph("I quattro test che non funzionano", S["h2"]))
    falsi = [
        ("«Ha un buon profumo»", "l'oleandro profuma di mandorla e di pesca, e "
         "basta una foglia masticata per finire in ospedale."),
        ("«L'ho assaggiata e non brucia»", "il colchico ha un sapore neutro e i "
         "sintomi arrivano ore dopo, quando la sostanza è già assorbita."),
        ("«La raccoglieva mia nonna»", "la memoria familiare è preziosa, ma non è "
         "un riconoscimento botanico: le piante crescono anche dove non "
         "c'erano."),
        ("«Le foglie sono uguali»", "contano l'insieme di odore, fusto, fiori, "
         "lattice, pelosità e luogo: una sola somiglianza non basta mai."),
    ]
    righe = [[Paragraph(clean(f"«{a[1:-1]}»") if a.startswith("«") else clean(a), S["cell_bold"]),
              Paragraph(clean(b), S["body_s"])] for a, b in falsi]
    t2 = Table(righe, colWidths=[43 * mm, FW - 43 * mm])
    t2.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, -1), 3 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 1.3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, BORDO),
    ]))
    out.append(t2)
    out.append(Spacer(1, 2.4 * mm))
    out.append(band([
        rich("<b>Se hai un dubbio, non è un dubbio: è un no.</b> La pianta che "
             "lasci dov'è non ti farà mai male, e domani sarà ancora lì.", "body_s"),
    ], accent=ROSSO, bg=ROSSO_SOFT, pad=2.6))
    return out


def pagina_interazioni(d):
    out = [PageBreak()]
    out += section(
        "Piante e farmaci",
        "Interazioni",
        "Le piante non sono inerti. Le quattordici segnalazioni più "
        "importanti riguardano farmaci di uso comune, dalle terapie "
        "cardiologiche ai contraccettivi.",
    )
    colori = {"alto": ROSSO, "medio": TERRA, "basso": VERDE_600}
    for i in d["interactions"]:
        livello = i["livello"].lower()
        bg = colori.get(livello, TERRA)
        testa = Table([[
            Paragraph(clean(i["pianta"]), S["card_title"]),
            chip(livello, bg, colors.white, width=14 * mm),
        ]], colWidths=[FW - 3.2 * mm - 17 * mm, 17 * mm])
        testa.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (1, 0), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2 * mm),
        ]))
        corpo = [testa,
                 Paragraph("CON", S["label"]),
                 para(i["farmaci"], "small"),
                 Spacer(1, 1.2 * mm),
                 Paragraph("EFFETTO", S["label"]),
                 para(i["effetto"], "small")]
        out.append(KeepTogether([band(corpo, accent=bg, bg=CARTA_2),
                                 Spacer(1, 2 * mm)]))
    out.append(Spacer(1, 1 * mm))
    out.append(para(
        "Se assumi farmaci, sotto terapia ormonale o in gravidanza, porta "
        "questa lista al medico o al farmacista prima di iniziare qualsiasi "
        "integrazione vegetale. Non sospendere mai una terapia da solo.", "small"))
    return out


def pagina_raccolta(d):
    out = [PageBreak()]
    out += section(
        "Raccogliere senza rischi",
        "Fitoalimurgia",
        "Dieci regole. Non sono buone maniere: sono la differenza tra un "
        "pesto e una serata al pronto soccorso.",
    )
    regole = [
        ("Riconoscimento assoluto", "Raccogli solo ciò che identifichi senza "
         "alcun dubbio. Un «mi sembra» non è un riconoscimento."),
        ("Prima i sosia", "Studia le piante pericolose che somigliano alla "
         "specie che cerchi, prima ancora della specie stessa."),
        ("Parte giusta, momento giusto", "Foglie in primavera, fiori "
         "all'apertura, radici in autunno: fuori stagione la pianta non ha "
         "ciò che cerchi."),
        ("Luoghi puliti", "Evita bordi strada, campi trattati, aree "
         "industriali, discariche, parchi con diserbanti e argini sospetti."),
        ("Mai tutto", "Lascia la maggior parte della popolazione: la raccolta "
         "sostenibile è una regola etica prima che legale."),
        ("Specie protette", "Alcune specie sono tutelate da leggi regionali o "
         "europee: conoscerle è parte del mestiere."),
        ("Tempo asciutto", "Raccogli al mattino, con tempo asciutto. L'umidità "
         "fa marcire il raccolto e confonde gli odori."),
        ("Essicca subito", "Stendi in strato sottile, all'ombra, in luogo "
         "ventilato. Un raccolto ammuffito è da buttare, non da recuperare."),
        ("Cucina quando serve", "Alcune specie commestibili richiedono cottura "
         "(borragine, sambuco, ortica): il crudo non è una variante, è un rischio."),
        ("Nel dubbio, lascia", "La pianta che non raccogli non ti farà mai "
         "male. La curiosità si soddisfatta con un libro, non con un assaggio."),
    ]
    for i, (titolo, testo) in enumerate(regole, 1):
        num = Paragraph(clean("%02d" % i), st("num", fontName=F_SANS_B, fontSize=13,
                                              leading=15, textColor=SALVIA,
                                              alignment=0))
        cella = [Paragraph(clean(titolo), S["cell_bold"]), Spacer(1, 0.6 * mm),
                 para(testo, "small")]
        t = Table([[num, cella]], colWidths=[11 * mm, FW - 11 * mm])
        t.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (0, 0), 2 * mm),
            ("TOPPADDING", (0, 0), (-1, -1), 1.0 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2 * mm),
            ("LINEBELOW", (0, 0), (-1, -1), 0.4, BORDO),
        ]))
        out.append(t)
    return out


def pagina_calendario(d):
    out = [PageBreak()]
    out += section(
        "Dodici mesi di raccolto",
        "Calendario",
        "Che cosa cercare e che cosa fare, mese per mese, alle latitudini "
        "italiane. Le stagioni si spostano di qualche settimana secondo quota "
        "e regione.",
    )
    for indice, m in enumerate(d["months"]):
        titolo = ('<font size="6.4" color="#a9603f"><b>%s</b></font>&nbsp;&nbsp;'
                  '<font size="9.2" color="#173a2b"><b>%s</b></font>'
                  % (clean(m["nome"]).upper(), clean(m["titolo"])))
        lavori = " · ".join(m["lavori"])
        testa = [Paragraph(titolo, S["cell_bold"]),
                 Spacer(1, 0.6 * mm),
                 para(m["testo"], "body_s"),
                 Spacer(1, 0.8 * mm),
                 rich("<b>In pratica:</b> " + clean(lavori), "tiny")]
        out.append(band(testa, accent=SALVIA, bg=CARTA_2, pad=2.2))
        out.append(Spacer(1, 1.4 * mm))
        if (indice + 1) % 4 == 0 and indice + 1 < len(d["months"]):
            out.append(PageBreak())

    out.append(Spacer(1, 1.4 * mm))
    out.append(band([
        Paragraph("DOPO IL RACCOLTO: ESSICCARE E CONSERVARE", S["label"]),
        Spacer(1, 1.2 * mm),
        rich("<b>Stendere, non ammucchiare.</b> Strato sottile su graticcio o carta "
             "assorbente, in luogo ombroso e ventilato: il calore diretto e "
             "l'umidità rovinano i principi attivi e favoriscono le muffe.", "body_s"),
        Spacer(1, 1.4 * mm),
        rich("<b>Il punto giusto.</b> Le foglie sono pronte quando si sbriciolano "
             "senza piegarsi; le radici quando si spezzano con uno schiocco secco.", "body_s"),
        Spacer(1, 1.4 * mm),
        rich("<b>Etichetta sempre.</b> Nome, parte, luogo e data. Un barattolo "
             "anonimo è un barattolo da buttare, anche se sembra ottimo.", "body_s"),
        Spacer(1, 1.4 * mm),
        rich("<b>Un anno al massimo.</b> Oltre, il profumo si spegne e con lui "
             "buona parte dell'effetto: meglio poco e fresco che tanto e vecchio.", "body_s"),
    ], accent=VERDE_600, bg=CARTA_2, pad=2.6))
    return out


def pagina_forme(d):
    out = [PageBreak()]
    out += section(
        "Come si preparano",
        "Forme d'uso",
        "Le stesse foglie, preparate in modo diverso, danno effetti diversi. "
        "Queste sono le forme d'uso domestiche, spiegate con le parole del "
        "glossario dell'app.",
    )
    voluti = ["Infuso", "Decotto", "Macerato", "Oleolito", "Idrolato",
              "Olio essenziale", "Estratto secco"]
    per_titolo = {g["t"]: g["d"] for g in d["glossary"]}
    schede = []
    for nome in voluti:
        if nome not in per_titolo:
            continue
        schede.append([Paragraph(clean(nome), S["card_title"]),
                       Spacer(1, 0.8 * mm),
                       para(per_titolo[nome], "body_s")])

    larghezza = (FW - 5 * mm) / 2
    righe = []
    for i in range(0, len(schede), 2):
        coppia = schede[i:i + 2]
        while len(coppia) < 2:
            coppia.append("")
        righe.append([coppia[0], "", coppia[1]])
    griglia_forme = Table(righe, colWidths=[larghezza, 5 * mm, larghezza])
    griglia_forme.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (0, -1), CARTA_2),
        ("BACKGROUND", (2, 0), (2, -1), CARTA_2),
        ("LINEBEFORE", (0, 0), (0, -1), 1.6, VERDE_600),
        ("LINEBEFORE", (2, 0), (2, -1), 1.6, VERDE_600),
        ("LEFTPADDING", (0, 0), (-1, -1), 2.6 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2.6 * mm),
        ("LEFTPADDING", (1, 0), (1, -1), 0),
        ("RIGHTPADDING", (1, 0), (1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 2.2 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.2 * mm),
    ]))
    out.append(griglia_forme)

    regole = [
        ("Una pianta per volta", ": mescolare più specie rende impossibile capire "
         "che cosa ha funzionato e che cosa ha fatto male."),
        ("Dose minima, tempo minimo", ": se il disturbo non migliora in due o tre "
         "settimane, il problema è un altro e serve un medico."),
        ("Conservazione", ": asciutta e al buio, barattoli etichettati con nome, "
         "parte e data di raccolta. Un barattolo senza data va buttato."),
        ("Oli essenziali", ": mai puri sulla pelle, mai per bocca senza parere "
         "professionale, mai in gravidanza o sui bambini piccoli."),
    ]
    celle = [rich("<b>%s</b>%s" % (clean(t), clean(x)), "body_s") for t, x in regole]
    griglia = Table([[celle[0], celle[1]], [celle[2], celle[3]]],
                    colWidths=[(FW - 3.2 * mm - 8 * mm) / 2] * 2)
    griglia.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, -1), 4 * mm),
        ("LEFTPADDING", (1, 0), (1, -1), 0),
        ("RIGHTPADDING", (1, 0), (1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 2 * mm),
        ("BOTTOMPADDING", (0, 1), (-1, 1), 0),
    ]))
    out.append(Spacer(1, 1.6 * mm))
    out.append(band([
        Paragraph("QUATTRO REGOLE CHE VALGONO SEMPRE", S["label"]),
        Spacer(1, 1.2 * mm),
        griglia,
    ], accent=ORO, bg=ORO_SOFT, pad=2.6))
    return out


def pagina_erbario(d):
    out = [PageBreak()]
    out += section(
        "Le %d piante in tasca" % len(d["plants"]),
        "Erbario essenziale",
        "Nome, parti usate, primo impiego e livello di attenzione. Il pallino "
        "verde indica una pianta di uso corrente, il giallo una che richiede "
        "cautela, il rosso una che va lasciata a un professionista.",
    )
    legenda = Table([[
        Dot(VERDE_600), Paragraph("uso corrente", S["tiny"]),
        Dot(ORO), Paragraph("cautela", S["tiny"]),
        Dot(ROSSO), Paragraph("solo su parere professionale", S["tiny"]),
    ]], colWidths=[4 * mm, 28 * mm, 4 * mm, 18 * mm, 4 * mm, FW - 58 * mm])
    legenda.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.4 * mm),
    ]))
    out.append(legenda)

    righe = [[Paragraph("PIANTA", S["label"]),
              Paragraph("PARTI", S["label"]),
              Paragraph("PRIMO IMPIEGO", S["label"]),
              ""]]
    for p in d["plants"]:
        liv = p["sicurezza"]["livello"]
        colore = {"verde": VERDE_600, "giallo": ORO, "rosso": ROSSO}.get(liv, ORO)
        righe.append([
            [Paragraph(clean(p["nome"]), S["cell_bold"]),
             Paragraph(clean(p["latino"]), S["cell_latin"])],
            Paragraph(clean(", ".join(p["parti"])), S["tiny"]),
            Paragraph(clean(p["usi"][0]), S["tiny"]),
            Dot(colore),
        ])
    t = Table(righe, colWidths=[37 * mm, 26 * mm, FW - 63 * mm - 6 * mm, 6 * mm],
              repeatRows=1)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("VALIGN", (3, 1), (3, -1), "MIDDLE"),
        ("BACKGROUND", (0, 0), (-1, 0), CREMA),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2.2 * mm),
        ("RIGHTPADDING", (3, 0), (3, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5 * mm),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, BORDO),
        ("TOPPADDING", (0, 0), (-1, 0), 0.6 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 0.8 * mm),
    ]))
    out.append(t)
    out.append(Spacer(1, 2.4 * mm))
    out.append(para(
        "Le schede complete — proprietà, preparazioni con dosi, sicurezza in "
        "gravidanza e allattamento, evidenza, curiosità e fonti — sono "
        "nell'app, nella sezione Erbario.", "tiny"))
    return out


def pagina_glossario(d):
    out = [PageBreak()]
    out += section(
        "Le parole giuste",
        "Glossario",
        "Quarantaquattro termini per leggere un'etichetta, una monografia o "
        "una ricetta senza fraintendere.",
    )
    voci = d["glossary"]
    colw = (FW - 5 * mm) / 2

    def voce(g):
        return Paragraph("<b>%s</b> \u2014 %s" % (clean(g["t"]), clean(g["d"])),
                         S["gloss"])

    def altezza(items):
        h = 0
        for g in items:
            h += voce(g).wrap(colw - 5 * mm, 1000)[1] + S["gloss"].spaceAfter
        return h

    def tabella(sinistra, destra):
        return Table([[sinistra, destra]], colWidths=[colw, colw],
                     style=TableStyle([
                         ("VALIGN", (0, 0), (-1, -1), "TOP"),
                         ("LEFTPADDING", (0, 0), (0, 0), 0),
                         ("RIGHTPADDING", (0, 0), (0, 0), 5 * mm),
                         ("LEFTPADDING", (1, 0), (1, 0), 0),
                         ("RIGHTPADDING", (1, 0), (1, 0), 0),
                         ("TOPPADDING", (0, 0), (-1, -1), 0),
                         ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                     ]))

    # tre pagine di pari consistenza, ciascuna divisa in due colonne
    per_pagina = -(-len(voci) // 3)
    for inizio in range(0, len(voci), per_pagina):
        gruppo = voci[inizio:inizio + per_pagina]
        meta = altezza(gruppo) / 2
        acc, taglio = 0, max(1, len(gruppo) // 2)
        for j, g in enumerate(gruppo):
            acc += altezza([g])
            if acc >= meta:
                taglio = j + 1
                break
        sinistra = [voce(g) for g in gruppo[:taglio]]
        destra = [voce(g) for g in gruppo[taglio:]]
        out.append(tabella(sinistra, destra))
        if inizio + per_pagina < len(voci):
            out.append(PageBreak())
    return out


def pagina_fonti(d):
    out = [PageBreak()]
    out += section(
        "Dove verificare",
        "Fonti e licenza",
        "Nessuna affermazione di questa guida vuole essere l'ultima parola. "
        "Queste sono le fonti da cui parte il lavoro, e dove controllarlo.",
    )
    for s in d["sources"]:
        out.extend([Paragraph(clean(s["titolo"]), S["cell_bold"]),
                    Spacer(1, 0.4 * mm),
                    para(s["nota"], "tiny"),
                    Spacer(1, 0.5 * mm),
                    Paragraph('<link href="%s" color="#357a5a">%s</link>'
                              % (clean(s["url"]), clean(s["url"])),
                              st("url", fontName=F_SANS, fontSize=6.6,
                                 leading=8.6, textColor=VERDE_600, alignment=0)),
                    Spacer(1, 1.1 * mm)])

    out.append(Spacer(1, 2.6 * mm))
    out.append(rich(
        "<b>Regola di lettura:</b> una revisione sistematica vale più di dieci "
        "articoli isolati, e un risultato su cellule in laboratorio non è un "
        "consiglio per una persona.", "tiny"))
    out.append(PageBreak())
    return out


def pagina_colophon(d):
    out = []
    out += section(
        "Portala con te",
        "Ultima pagina",
        "Questa guida è anche un'app: la stessa cosa, con le dosi indicative, "
        "le schede complete e Neura, che risponde senza connessione.",
        toc_level=None,
    )
    passi = [
        ("Su iPhone", "apri l'indirizzo in Safari, tocca Condividi e scegli "
         "«Aggiungi alla schermata Home»."),
        ("Su Android", "apri l'indirizzo in Chrome e scegli «Installa app» dal "
         "menu in alto a destra."),
        ("Prima apertura", "falla con la rete attiva: i contenuti vengono "
         "salvati sul dispositivo e restano disponibili anche senza campo."),
    ]
    for titolo, testo in passi:
        out.extend([Paragraph(clean(titolo).upper(), S["label"]),
                    para(testo, "body_s"),
                    Spacer(1, 2.2 * mm)])

    out.append(Spacer(1, 2 * mm))
    out.append(band([
        Paragraph("IL PROGETTO", S["label"]),
        Spacer(1, 0.8 * mm),
        para("Erbario, manuale in 18 capitoli, fitoalimurgia, schede di "
             "benessere, quiz e Neura: un assistente di conoscenza locale che "
             "spiega, controlla e ammette i propri limiti. Tutto in italiano, "
             "senza account, senza pubblicità e funzionante anche offline.", "small"),
        Spacer(1, 1.2 * mm),
        rich("<b>danilodauria.github.io/naturopata-digitale</b>", "small"),
    ], accent=VERDE_700, bg=SALVIA_CHIARA, pad=2.8))

    out.append(Spacer(1, 3.5 * mm))
    out.append(rich(
        "<b>Licenza dei contenuti.</b> «Naturopata Digitale — Il sapere gentile "
        "delle piante» di Danilo D'Auria, un progetto FeniceOS, è distribuito "
        "con licenza Creative Commons BY-NC-SA 4.0: puoi condividere e "
        "adattare i testi citando l'autore, senza uso commerciale e con la "
        "stessa licenza. Il codice dell'app è invece sotto licenza MIT.", "tiny"))
    out.append(Spacer(1, 3 * mm))
    out.append(rich(
        "<b>Come è fatto questo PDF.</b> Non è impaginato a mano: un programma "
        "legge gli stessi dati dell'app (schede, tossiche, interazioni, "
        "calendario, glossario, fonti) e compone la guida. Se una scheda cambia "
        "nell'app, cambia anche qui alla rigenerazione successiva.", "tiny"))

    out.append(Spacer(1, 7 * mm))
    out.append(Rule(FW, BORDO))
    out.append(Spacer(1, 3 * mm))
    out.append(rich(
        "<i>«Nel dubbio, non raccogliere: la prudenza è la prima alleata "
        "della salute.»</i>", "small"))
    out.append(Spacer(1, 1.4 * mm))
    out.append(Paragraph("REGOLA DELL'ERBORISTA", S["label"]))
    out.append(Spacer(1, 8 * mm))
    out.append(rich(
        "<b>Vademecum delle piante officinali</b> · guida tascabile di "
        "Naturopata Digitale · testi di Danilo D'Auria, CC BY-NC-SA 4.0 · "
        "codice MIT · formato A5, pensato per la stampa fronte-retro · "
        "allineato all'app versione " + clean(d["version"]) + ".", "tiny"))
    return out


# --------------------------------------------------------------------------
#  Avvio
# --------------------------------------------------------------------------
def carica_dati():
    export = ROOT / "scripts" / "export-data.cjs"
    res = subprocess.run(["node", str(export)], capture_output=True, text=True)
    if res.returncode != 0:
        sys.stderr.write(res.stderr)
        raise SystemExit("Esportazione dei dati non riuscita")
    return json.loads(res.stdout)


def versione_app():
    with open(ROOT / "package.json", encoding="utf-8") as fh:
        return json.load(fh)["version"]


def storia(d, indice=None):
    story = [NextPageTemplate("body"), Spacer(1, 1), PageBreak()]
    story += pagina_liminare(d, indice)
    story += pagina_emergenze(d)
    story += pagina_tossiche(d)
    story += pagina_sosia(d)
    story += pagina_interazioni(d)
    story += pagina_raccolta(d)
    story += pagina_calendario(d)
    story += pagina_forme(d)
    story += pagina_erbario(d)
    story += pagina_glossario(d)
    story += pagina_fonti(d)
    story += pagina_colophon(d)
    return story


def genera_versioni_stampa():
    """Crea l'edizione A4 e il libricino A4 già imposto per la stampa.

    L'A4 ingrandisce le pagine A5 lasciando un margine di sicurezza per le
    stampanti domestiche. Il libricino impone due pagine A5 per facciata A4
    orizzontale, nell'ordine classico per la cucitura a sella (piega e punti).
    """
    src = pymupdf.open(OUT)
    n = src.page_count
    sw = src[0].rect.width
    sh = src[0].rect.height

    # --- A4: una pagina per foglio, con margini stampabili -----------------
    a4 = pymupdf.open()
    a4_w, a4_h = pymupdf.paper_size("a4")
    margine_x, margine_y = 12 * mm, 15 * mm
    scala = min((a4_w - 2 * margine_x) / sw, (a4_h - 2 * margine_y) / sh)
    larghezza, altezza = sw * scala, sh * scala
    x0 = (a4_w - larghezza) / 2
    y0 = (a4_h - altezza) / 2

    for i, pagina in enumerate(src):
        foglio = a4.new_page(width=a4_w, height=a4_h)
        foglio.show_pdf_page(
            pymupdf.Rect(x0, y0, x0 + larghezza, y0 + altezza), src, i)
        for link in pagina.get_links():
            uri = link.get("uri")
            if not uri:
                continue
            r = link["from"]
            foglio.insert_link({
                "kind": pymupdf.LINK_URI,
                "from": pymupdf.Rect(
                    x0 + r.x0 * scala, y0 + r.y0 * scala,
                    x0 + r.x1 * scala, y0 + r.y1 * scala),
                "uri": uri,
            })
    a4.save(OUT_A4, garbage=4, deflate=True)

    # --- Libricino: due A5 per facciata, ordine da cucitura a sella --------
    padded = pymupdf.open()
    padded.insert_pdf(src)
    while padded.page_count % 4:
        padded.new_page(width=sw, height=sh)
    totale = padded.page_count

    book = pymupdf.open()
    a4_portrait_w, a4_portrait_h = pymupdf.paper_size("a4")
    book_w, book_h = a4_portrait_h, a4_portrait_w
    offset = (book_w - 2 * sw) / 2

    def facciata(sinistra, destra):
        foglio = book.new_page(width=book_w, height=book_h)
        foglio.show_pdf_page(pymupdf.Rect(offset, 0, offset + sw, sh), padded, sinistra)
        foglio.show_pdf_page(
            pymupdf.Rect(offset + sw, 0, offset + 2 * sw, sh), padded, destra)

    for i in range(totale // 4):
        # fronte: ultima pagina accanto alla prima, poi a scendere
        facciata(totale - 2 * i - 1, 2 * i)
        # retro: la seconda accanto alla penultima
        facciata(2 * i + 1, totale - 2 * i - 2)

    book.save(OUT_BOOK, garbage=4, deflate=True)

    return n, a4.page_count, book.page_count


def compila(d, percorso, indice):
    doc = Vademecum(str(percorso), edizione=EDIZIONE)
    doc.app_version = d["version"]
    doc.plants = len(d["plants"])
    doc.build(storia(d, indice))
    return doc


def main():
    d = carica_dati()
    d["version"] = versione_app()
    OUT.parent.mkdir(parents=True, exist_ok=True)

    # primo passaggio senza indice: serve a sapere dove finiscono le sezioni
    prova = OUT.with_name("_vademecum_prova.pdf")
    doc = compila(d, prova, None)
    indice = list(doc.indice)
    prova.unlink(missing_ok=True)

    # secondo passaggio con l'indice vero; se le pagine si spostano, si ripete
    for _ in range(3):
        doc = compila(d, OUT, indice)
        if doc.indice == indice:
            break
        indice = list(doc.indice)

    size = OUT.stat().st_size
    print("PDF: %s" % OUT.relative_to(ROOT))
    print("Pagine: %d · %.0f kB" % (doc.page, size / 1024))

    n_a5, n_a4, n_book = genera_versioni_stampa()
    for percorso, pagine in ((OUT_A4, n_a4), (OUT_BOOK, n_book)):
        print("PDF: %s · %d pagine · %.0f kB" % (
            percorso.relative_to(ROOT), pagine, percorso.stat().st_size / 1024))
    print("Libricino: %d fogli A4 (fronte-retro), piega a met\u00e0 e cuci." % (n_book // 2))
    for titolo, pagina in indice:
        print("  %-26s %3d" % (titolo, pagina))


if __name__ == "__main__":
    main()
