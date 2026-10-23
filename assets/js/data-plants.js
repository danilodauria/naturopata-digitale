/* ==========================================================================
   Naturopata Digitale · Erbario, parte prima
   Dati editoriali originali, con avvertenze di sicurezza e fonti.
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.plants = [

  {
    id: "camomilla",
    nome: "Camomilla comune",
    latino: "Matricaria chamomilla",
    famiglia: "Asteraceae",
    nomi: ["Camomilla", "Matricaria recutita", "Camomilla tedesca"],
    tono: 1,
    categorie: ["Officinale", "Aromatica", "Alimentare"],
    sintesi: "Il capolino calmo per eccellenza: sostiene la digestione e accompagna le sere inquiete.",
    descrizione: "Pianta erbacea annuale con capolini dal cuore giallo e petali bianchi, profumo dolce e riconoscibile. È tra le piante officinali più studiate e utilizzate al mondo: la tradizione popolare le attribuisce un ruolo calmante e digestivo, che la ricerca moderna ha in parte confermato. Si usa soprattutto il capolino essiccato, in infuso, ma anche in vapore, collutorio e impacco.",
    parti: ["Capolini fioriti"],
    habitat: "Campi coltivati, incolti, bordi strada, terreni soleggiati fino a circa 1.200 m.",
    raccolta: { mesi: [5, 6, 7], nota: "Si raccolgono i capolini ben aperti, nelle ore asciutte e soleggiate; si essiccano subito all'ombra." },
    proprieta: ["Calmante lieve", "Antispasmodica", "Digestiva", "Antinfiammatoria locale", "Leggermente sedativa"],
    usi: [
      "Tensione nervosa serale e difficoltà ad addormentarsi",
      "Digestione lenta, gonfiore, crampi addominali lievi",
      "Irritazioni oculari e della bocca come impacco o collutorio",
      "Piccole irritazioni cutanee e dermatiti da pannolino",
      "Vapore per vie respiratorie alte"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1–2 g di capolini secchi (un cucchiaino colmo) in 200 ml di acqua a 90–95 °C, coperto per 7–10 minuti, poi filtrare.", dose: "2–3 tazze al giorno, lontano dai pasti se si cerca l'effetto digestivo." },
      { nome: "Vapore per il viso", ricetta: "2 cucchiai di capolini in una ciotola con 500 ml di acqua calda non bollente; coprirsi il capo con un panno per 5–8 minuti.", dose: "1–2 volte al giorno, sempre con gli occhi chiusi e a distanza di sicurezza." },
      { nome: "Impacco per gli occhi", ricetta: "Infuso filtrato e raffreddato, imbibire una garza pulita e applicare per 5–10 minuti.", dose: "Usare garze monouso e non riutilizzare l'infuso oltre 24 ore." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "L'infuso alle dosi alimentari è considerato generalmente sicuro; evitare estratti concentrati e oli essenziali senza parere professionale.",
      allattamento: "Uso occasionale in infuso ritenuto compatibile; chiedere comunque al pediatra o al farmacista.",
      bambini: "Infuso diluito e in piccole quantità è usato dalla tradizione; sotto i 3 anni chiedere consiglio al pediatra.",
      controindicazioni: ["Allergia alle Asteraceae (ambrosia, margherita, crisantemo)", "Uso prolungato di alte dosi di estratto"],
      interazioni: ["Anticoagulanti orali: possibile potenziamento teorico", "Sedativi e alcol: effetto additivo lieve"],
      nota: "Non usare l'olio essenziale a uso interno. L'infuso è la forma più prudente e adatta all'autoconsumo."
    },
    sosia: [],
    fito: { commestibile: true, parti: "Capolini freschi o secchi", stagione: "Primavera–estate", cucina: "Infusi, miele aromatizzato, sciroppi; i capolini freschi si usano con moderazione.", nota: "Non confonderla con altre composite dai fiori gialli: raccogliere solo capolini con profumo dolce e ricettacolo cavo." },
    evidenza: "Tradizione molto solida. Le revisioni suggeriscono un effetto modesto su ansia e sonno e un possibile beneficio nei disturbi digestivi funzionali. Le prove restano eterogenee e spesso su piccoli campioni.",
    curiosita: "Il nome greco chamaimelon significa «mela del suolo», per il profumo di mela dei fiori. Il ricettacolo cavo distingue la camomilla comune da specie simili.",
    fonti: [
      { t: "EMA · Herbal medicines", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Matricaria chamomilla", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Matricaria+chamomilla+review" },
      { t: "NIH Office of Dietary Supplements", u: "https://ods.od.nih.gov/" }
    ]
  },

  {
    id: "menta",
    nome: "Menta piperita",
    latino: "Mentha × piperita",
    famiglia: "Lamiaceae",
    nomi: ["Menta", "Menta nera", "Peppermint"],
    tono: 3,
    categorie: ["Officinale", "Aromatica", "Alimentare"],
    sintesi: "Fresca e precisa: scioglie le tensioni intestinali e rinfresca il respiro.",
    descrizione: "Ibrido naturale tra menta acquatica e menta verde, la menta piperita è una pianta aromatica perenne con foglie dentate e fusti quadrangolari. Il mentolo, suo componente caratteristico, dà la sensazione di freschezza e agisce sui recettori del freddo. È una delle poche piante con un impiego clinico ben definito: l'olio essenziale in capsule gastroresistenti è studiato nella sindrome dell'intestino irritabile.",
    parti: ["Foglie", "Sommità fiorite", "Olio essenziale"],
    habitat: "Coltivata e naturalizzata in terreni freschi e umidi, lungo corsi d'acqua e orti.",
    raccolta: { mesi: [5, 6, 7, 8, 9], nota: "Raccogliere le foglie prima della fioritura per il miglior aroma; si usa fresca o si essicca rapidamente all'ombra." },
    proprieta: ["Antispasmodica intestinale", "Carminativa", "Rinfrescante", "Analgesica locale", "Leggermente antisettica"],
    usi: [
      "Gonfiore, meteorismo e crampi intestinali",
      "Sindrome dell'intestino irritabile (olio essenziale gastroresistente, su indicazione)",
      "Alito e igiene del cavo orale",
      "Cefalea tensiva (olio diluito sulle tempie)",
      "Nausea lieve e digestione difficile"
    ],
    preparazioni: [
      { nome: "Infuso digestivo", ricetta: "1–2 g di foglie secche in 200 ml di acqua a 90 °C, coperto 5–7 minuti. Lasciare intiepidire: il mentolo è volatile.", dose: "1 tazza dopo i pasti, fino a 3 al giorno." },
      { nome: "Olio da massaggio", ricetta: "2–3 gocce di olio essenziale in 10 ml di olio vettore (mandorla, jojoba). Mai puro sulla pelle.", dose: "Massaggiare tempie o addome con cautela, evitando gli occhi." },
      { nome: "Collutorio", ricetta: "Infuso concentrato e filtrato, usato tiepido come risciacquo.", dose: "2–3 volte al giorno, senza deglutire." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "L'infuso alimentare è accettabile; evitare olio essenziale e dosi elevate, che possono favorire il reflusso.",
      allattamento: "Uso alimentare occasionale; evitare oli essenziali concentrati.",
      bambini: "Non applicare prodotti mentolati su viso e torace dei bambini piccoli, per il rischio di apnea riflessa. Infuso solo dopo i 6 anni e in dose ridotta.",
      controindicazioni: ["Reflusso gastroesofageo e ernia iatale: può peggiorare i sintomi", "Calcolosi biliare", "Ostruzione delle vie biliari"],
      interazioni: ["Possibile aumento dell'assorbimento di alcuni farmaci per effetto sulla motilità intestinale", "Antiacidi e inibitori di pompa: possibile riduzione dell'efficacia se assunti insieme"],
      nota: "L'olio essenziale non va ingerito liberamente: è concentrato e può causare irritazione esofagea. Le capsule gastroresistenti sono un prodotto farmaceutico specifico."
    },
    sosia: [
      { nome: "Altre menta (Mentha spicata, M. suaveolens)", rischio: "Non tossiche, ma aroma e composizione diversi. Riconoscere la pianta prima di preparare rimedi." }
    ],
    fito: { commestibile: true, parti: "Foglie fresche", stagione: "Primavera–autunno", cucina: "Tisane, acque aromatizzate, insalate, pesto di menta, dolci; ottima con piselli e zucchine.", nota: "Usare con moderazione in chi soffre di reflusso." },
    evidenza: "Buona per l'olio essenziale gastroresistente nella sindrome dell'intestino irritabile (riduzione di dolore e gonfiore). Per l'infuso le prove sono limitate ma la tradizione è solida. L'effetto sulla cefalea tensiva è supportato da studi su olio diluito.",
    curiosita: "Il mentolo non è un vero «raffreddante»: attiva i recettori TRPM8, gli stessi che percepiscono il freddo. Per questo dà freschezza senza abbassare la temperatura.",
    fonti: [
      { t: "EMA · Mentha × piperita", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Peppermint oil IBS", u: "https://pubmed.ncbi.nlm.nih.gov/?term=peppermint+oil+irritable+bowel+meta-analysis" },
      { t: "Cochrane Library", u: "https://www.cochranelibrary.com/" }
    ]
  },

  {
    id: "salvia",
    nome: "Salvia officinale",
    latino: "Salvia officinalis",
    famiglia: "Lamiaceae",
    nomi: ["Salvia", "Salvia comune", "Sage"],
    tono: 2,
    categorie: ["Officinale", "Aromatica", "Alimentare"],
    sintesi: "Astringente e aromatica, preziosa per la gola e per le sudorazioni della menopausa.",
    descrizione: "Arbusto sempreverde dalle foglie grigio-verdi, vellutate e intensamente aromatiche. La salvia è una pianta mediterranea dalla doppia anima: aromatizza la cucina e, in fitoterapia, è usata come astringente e antisettica del cavo orale. Contiene tujone, molecola da trattare con rispetto: le foglie essiccate in infuso sono una cosa, l'olio essenziale concentrato un'altra.",
    parti: ["Foglie"],
    habitat: "Pendii aridi e soleggiati del Mediterraneo; largamente coltivata negli orti.",
    raccolta: { mesi: [5, 6, 9], nota: "Raccogliere foglie sane prima della fioritura e a fine estate; essiccare in mazzetti appesi all'ombra." },
    proprieta: ["Astringente", "Antisettica orale e faringea", "Antisuorifera", "Digestiva", "Coleretica lieve", "Antiossidante"],
    usi: [
      "Mal di gola, gengiviti, afte (gargarismi)",
      "Sudorazioni notturne e vampate lievi in menopausa (estratto, su parere)",
      "Digestione difficile e gonfiore",
      "Eccessiva sudorazione locale",
      "Conservazione e aroma in cucina"
    ],
    preparazioni: [
      { nome: "Infuso per gargarismi", ricetta: "1 cucchiaio di foglie secche in 250 ml di acqua bollente, coperto 10 minuti, filtrare e lasciare intiepidire.", dose: "Gargarismi 2–3 volte al giorno, senza deglutire." },
      { nome: "Infuso digestivo", ricetta: "1 g di foglie in 200 ml di acqua a 95 °C per 5–8 minuti.", dose: "1 tazza dopo il pasto, per periodi brevi." },
      { nome: "Olio essenziale (uso esterno)", ricetta: "Diluire 1–2 gocce in 10 ml di olio vettore per massaggi localizzati.", dose: "Non usare puro; evitare in gravidanza, allattamento e su bambini." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare oli essenziali e dosi terapeutiche prolungate; l'uso culinario è accettabile.",
      allattamento: "La salvia può ridurre la produzione di latte: evitare dosi terapeutiche durante l'allattamento.",
      bambini: "Non usare olio essenziale; infuso solo in piccole quantità e dopo i 6 anni.",
      controindicazioni: ["Epilessia e disturbi convulsivi (tujone)", "Uso prolungato ad alte dosi", "Gravidanza e allattamento per gli estratti"],
      interazioni: ["Sedativi e anticonvulsivanti", "Anticoagulanti (potenziamento teorico)", "Antidiabetici: possibile abbassamento della glicemia", "Farmaci metabolizzati dal fegato: cautela con estratti concentrati"],
      nota: "Il tujone è neurotossico ad alte dosi. Non superare le dosi tradizionali e non protrarre l'uso per settimane senza parere professionale."
    },
    sosia: [
      { nome: "Salvia sclarea e altre salvie ornamentali", rischio: "Non tutte sono adatte all'uso interno; alcune specie hanno profili di sicurezza diversi." }
    ],
    fito: { commestibile: true, parti: "Foglie", stagione: "Tutto l'anno", cucina: "Saltimbocca, burro aromatizzato, fagioli, arrosti; ottima fritta in pastella.", nota: "In cucina usare con moderazione per l'aroma intenso e amaro." },
    evidenza: "Studi clinici piccoli suggeriscono un beneficio su sudorazioni e vampate in menopausa e sui sintomi del mal di gola con gargarismi. L'evidenza resta limitata; la tradizione è ben documentata.",
    curiosita: "Il nome salvia deriva dal latino salvare, «guarire». Nel Medioevo era considerata una pianta quasi sacra, tanto che un proverbio consigliava di coltivarla in ogni orto.",
    fonti: [
      { t: "EMA · Salvia officinalis", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Salvia menopausal symptoms", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Salvia+officinalis+menopause" },
      { t: "EFSA · Valutazione delle sostanze botaniche", u: "https://www.efsa.europa.eu/" }
    ]
  },

  {
    id: "rosmarino",
    nome: "Rosmarino",
    latino: "Salvia rosmarinus",
    famiglia: "Lamiaceae",
    nomi: ["Rosmarino", "Rosmarinus officinalis"],
    tono: 1,
    categorie: ["Officinale", "Aromatica", "Alimentare"],
    sintesi: "Il profumo della macchia mediterranea: stimola la circolazione e accompagna la digestione.",
    descrizione: "Arbusto sempreverde con aghi coriacei e fiori azzurro-lilla. Il rosmarino è simbolo di memoria e fedeltà fin dall'antichità; oggi è apprezzato per l'azione antiossidante, per il sostegno alla digestione e per l'uso esterno nei massaggi che scaldano. Il suo olio essenziale è potente e non va maneggiato con leggerezza.",
    parti: ["Foglie", "Rametti", "Olio essenziale"],
    habitat: "Scogliere e pendii aridi del Mediterraneo; coltivato in tutta Italia.",
    raccolta: { mesi: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], nota: "Si raccolgono i rametti tutto l'anno, preferibilmente prima della fioritura per l'uso interno." },
    proprieta: ["Antiossidante", "Stimolante della circolazione", "Colagoga", "Digestiva", "Antinfiammatoria", "Aromatica"],
    usi: [
      "Digestione difficile e sensazione di pesantezza",
      "Sostegno alla circolazione periferica (uso esterno)",
      "Dolori muscolari e articolari (massaggio con olio diluito)",
      "Aroma e conservazione degli alimenti",
      "Cefalea tensiva (massaggio diluito, tradizione)"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1 g di foglie in 200 ml di acqua a 95 °C per 5–8 minuti.", dose: "1–2 tazze al giorno, dopo i pasti." },
      { nome: "Olio da massaggio", ricetta: "3 gocce di olio essenziale in 10 ml di olio di mandorla o oliva.", dose: "Massaggiare la zona 1–2 volte al giorno, evitando pelle lesa e occhi." },
      { nome: "Bagno aromatico", ricetta: "2 cucchiai di foglie in infuso concentrato da versare nell'acqua del bagno.", dose: "15–20 minuti, non troppo caldo." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare l'olio essenziale e dosi elevate; l'uso culinario è accettabile.",
      allattamento: "Uso alimentare; evitare oli essenziali concentrati.",
      bambini: "Non usare olio essenziale su neonati e bambini piccoli; infuso solo in dose ridotta.",
      controindicazioni: ["Epilessia e disturbi convulsivi (olio essenziale)", "Ipertensione non controllata", "Calcolosi biliare", "Uso interno di olio essenziale"],
      interazioni: ["Anticoagulanti", "Diuretici", "Antipertensivi", "Litio (effetto diuretico teorico)"],
      nota: "L'olio essenziale di rosmarino contiene canfora: non va ingerito e non va applicato puro. Tenerlo lontano da bambini e animali."
    },
    sosia: [],
    fito: { commestibile: true, parti: "Foglie e giovani rametti", stagione: "Tutto l'anno", cucina: "Arrosti, patate, legumi, pane, olio aromatizzato; fiori commestibili come decorazione.", nota: "Usare rametti teneri; le foglie vecchie sono coriacee e amare." },
    evidenza: "L'azione antiossidante è ben documentata in vitro. Gli studi clinici su memoria e concentrazione sono piccoli e non conclusivi. L'uso esterno per dolori muscolari e circolazione ha basi tradizionali e qualche prova preliminare.",
    curiosita: "Nell'antica Grecia gli studenti portavano corone di rosmarino durante gli esami. Ancora oggi in alcune tradizioni è associato al ricordo e ai riti di passaggio.",
    fonti: [
      { t: "EMA · Rosmarinus officinalis", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Rosemary essential oil", u: "https://pubmed.ncbi.nlm.nih.gov/?term=rosmarinus+officinalis+clinical+trials" },
      { t: "NIH · Botanical supplements", u: "https://ods.od.nih.gov/" }
    ]
  },

  {
    id: "timo",
    nome: "Timo",
    latino: "Thymus vulgaris",
    famiglia: "Lamiaceae",
    nomi: ["Timo", "Timo comune", "Thyme"],
    tono: 3,
    categorie: ["Officinale", "Aromatica", "Alimentare"],
    sintesi: "Piccolo e potente: alleato delle vie respiratorie e della gola.",
    descrizione: "Piccolo arbusto mediterraneo dalle foglie minute e dal profumo inconfondibile. Il timo è ricco di timolo e carvacrolo, composti antimicrobici studiati da decenni. In fitoterapia è la pianta delle vie respiratorie: fluidifica le secrezioni, calma la tosse e accompagna la guarigione delle infiammazioni della gola. In cucina è un pilastro della dieta mediterranea.",
    parti: ["Foglie", "Sommità fiorite", "Olio essenziale"],
    habitat: "Terreni aridi, soleggiati e calcarei del Mediterraneo; coltivato in orti e giardini.",
    raccolta: { mesi: [5, 6, 7, 8], nota: "Raccogliere le sommità fiorite all'inizio della fioritura, quando l'aroma è più intenso." },
    proprieta: ["Espettorante", "Antisettica", "Antispasmodica della tosse", "Carminativa", "Antimicrobica"],
    usi: [
      "Tosse produttiva e catarro",
      "Mal di gola e infiammazioni del cavo orale",
      "Bronchiti lievi (come supporto, non come cura)",
      "Digestione difficile e gonfiore",
      "Aroma in cucina e conservazione"
    ],
    preparazioni: [
      { nome: "Infuso per la tosse", ricetta: "1–2 g di sommità secche in 200 ml di acqua a 90 °C, coperto 8–10 minuti; addolcire con miele se gradito.", dose: "2–3 tazze al giorno per pochi giorni." },
      { nome: "Sciroppo casalingo", ricetta: "Infuso concentrato di timo, filtrato e addolcito con miele; conservare in frigorifero per pochi giorni.", dose: "1 cucchiaino 2–3 volte al giorno, solo per adulti e ragazzi." },
      { nome: "Gargarismi", ricetta: "Infuso concentrato tiepido, con un pizzico di sale.", dose: "2–3 volte al giorno, senza deglutire." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare olio essenziale e dosi elevate; l'uso culinario è accettabile.",
      allattamento: "Uso alimentare; evitare oli essenziali concentrati.",
      bambini: "Non usare olio essenziale su bambini sotto i 2 anni; sciroppi con miele solo dopo i 12 mesi (rischio botulismo).",
      controindicazioni: ["Allergia alle Lamiaceae", "Uso interno di olio essenziale", "Dermatiti da contatto con olio puro"],
      interazioni: ["Anticoagulanti (potenziamento teorico)", "Farmaci per la tiroide: cautela con estratti", "Sedativi: effetto additivo lieve"],
      nota: "Il timolo puro è caustico. L'olio essenziale va sempre diluito e usato solo per brevi periodi, lontano da occhi e mucose."
    },
    sosia: [
      { nome: "Serpillo (Thymus serpyllum)", rischio: "Non tossico, aroma più delicato; verificare l'identificazione." },
      { nome: "Piante aromatiche simili in cucina", rischio: "Nessun rischio grave, ma non raccogliere a caso: alcune ombrellifere selvatiche sono velenose." }
    ],
    fito: { commestibile: true, parti: "Foglie e fiori", stagione: "Primavera–estate", cucina: "Arrosti, verdure, legumi, pesce, salse; i fiori decorano e profumano.", nota: "Il timo fresco è più delicato; aggiungerlo a fine cottura." },
    evidenza: "Le proprietà antimicrobiche di timolo e carvacrolo sono ben documentate in laboratorio. Gli studi clinici su tosse e bronchite sono pochi e di qualità variabile; l'uso tradizionale resta ragionevole come supporto sintomatico.",
    curiosita: "Gli antichi Egizi usavano il timo per l'imbalsamazione. In Grecia il nome thymon indicava sia la pianta sia il coraggio, e si bruciava come incenso.",
    fonti: [
      { t: "EMA · Thymus vulgaris", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Thyme cough", u: "https://pubmed.ncbi.nlm.nih.gov/?term=thymus+vulgaris+cough" },
      { t: "EFSA · Oli essenziali", u: "https://www.efsa.europa.eu/" }
    ]
  },

  {
    id: "lavanda",
    nome: "Lavanda",
    latino: "Lavandula angustifolia",
    famiglia: "Lamiaceae",
    nomi: ["Lavanda", "Lavanda vera", "Spigo"],
    tono: 2,
    categorie: ["Officinale", "Aromatica", "Cosmetica"],
    sintesi: "Il respiro del Mediterraneo: calma, profumo e cura della pelle.",
    descrizione: "Arbusto sempreverde con spighe di piccoli fiori violetti, amatissimo dalle api. La lavanda è una delle piante aromatiche più utilizzate per il benessere: il profumo è associato a calma e rilassamento, mentre l'olio essenziale trova impiego in aromaterapia, massaggi e cosmetici. In fitoterapia si usano i fiori in infuso, come blando sedativo e digestivo.",
    parti: ["Fiori", "Olio essenziale"],
    habitat: "Colline calcaree e soleggiate del Mediterraneo; coltivata in tutta Italia.",
    raccolta: { mesi: [6, 7], nota: "Raccogliere le spighe appena i fiori inferiori iniziano a schiudersi; essiccare all'ombra in mazzi sottili." },
    proprieta: ["Calmante", "Ansiolitica lieve", "Antispasmodica", "Cicatrizzante", "Antisettica", "Aromaterapica"],
    usi: [
      "Ansia lieve e tensione nervosa",
      "Disturbi del sonno",
      "Cefalea tensiva (massaggio diluito)",
      "Piccole ferite e bruciature (olio diluito)",
      "Aromaterapia e bucato profumato"
    ],
    preparazioni: [
      { nome: "Infuso della sera", ricetta: "1–2 g di fiori secchi in 200 ml di acqua a 90 °C, coperto 5–8 minuti.", dose: "1 tazza la sera, per periodi brevi." },
      { nome: "Olio da massaggio", ricetta: "3–4 gocce di olio essenziale in 10 ml di olio vettore.", dose: "Massaggiare spalle e tempie, evitando gli occhi." },
      { nome: "Cuscino aromatico", ricetta: "Fiori essiccati in un sacchetto di cotone, da annusare prima di dormire.", dose: "Sostituire quando l'aroma svanisce." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "L'infuso è generalmente sicuro; evitare l'olio essenziale nel primo trimestre e in dosi elevate.",
      allattamento: "Uso occasionale; evitare oli essenziali concentrati sulla pelle del seno.",
      bambini: "Non usare oli essenziali su neonati e bambini piccoli; casi rari di ginecomastia prepuberale con esposizione ripetuta a lavanda e tea tree.",
      controindicazioni: ["Allergia alle Lamiaceae", "Dermatiti da contatto da olio essenziale", "Uso interno di olio essenziale"],
      interazioni: ["Sedativi, ansiolitici e alcol: effetto additivo", "Farmaci per la pressione: cautela teorica"],
      nota: "L'olio essenziale non va ingerito. Tenere lontano da bambini piccoli e da chi ha pelle sensibile."
    },
    sosia: [
      { nome: "Lavandino (Lavandula stoechas)", rischio: "Non tossico, aroma più intenso e canforaceo; non adatto agli stessi usi delicati." }
    ],
    fito: { commestibile: true, parti: "Fiori", stagione: "Estate", cucina: "Dolci, biscotti, miele, limonate; usare solo fiori coltivati per uso alimentare.", nota: "Pochi fiori bastano: l'aroma è potente e può diventare amaro." },
    evidenza: "L'olio essenziale di lavanda (preparazione orale standardizzata) ha mostrato effetti ansiolitici in alcuni studi clinici. L'aromaterapia ha prove modeste su ansia e sonno. L'uso dei fiori in infuso è supportato soprattutto dalla tradizione.",
    curiosita: "I Romani usavano la lavanda nei bagni pubblici: il nome deriva dal latino lavare. Le api producono un miele di lavanda molto apprezzato.",
    fonti: [
      { t: "EMA · Lavandula angustifolia", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Lavender anxiety", u: "https://pubmed.ncbi.nlm.nih.gov/?term=lavender+anxiety+randomized" },
      { t: "NIH · Lavender", u: "https://www.nccih.nih.gov/health/lavender" }
    ]
  },

  {
    id: "malva",
    nome: "Malva selvatica",
    latino: "Malva sylvestris",
    famiglia: "Malvaceae",
    nomi: ["Malva", "Malva comune", "Malva dei campi"],
    tono: 4,
    categorie: ["Officinale", "Alimentare", "Fitoalimurgia"],
    sintesi: "Morbida e rassicurante: addolcisce le mucose e le infiammazioni di gola e stomaco.",
    descrizione: "Pianta erbacea perenne o biennale con foglie tondeggianti e fiori rosa-violacei dalle venature scure. La malva è la pianta delle mucillagini: a contatto con l'acqua forma un gel che protegge le mucose. È tra le piante più sicure e adatte anche ai bambini, oltre che una buona verdura selvatica da cuocere.",
    parti: ["Foglie", "Fiori"],
    habitat: "Incolti, bordi strada, orti, terreni ricchi di azoto, fino a 1.500 m.",
    raccolta: { mesi: [4, 5, 6, 7, 8, 9], nota: "Raccogliere foglie tenere e fiori appena aperti, lontano da strade trafficate e zone trattate." },
    proprieta: ["Emolliente", "Antinfiammatoria delle mucose", "Lassativa lieve", "Antitussiva", "Cicatrizzante"],
    usi: [
      "Tosse secca e irritazione della gola",
      "Gastrite e reflusso (come coadiuvante)",
      "Stitichezza occasionale",
      "Irritazioni cutanee e piccole ferite",
      "Verdura selvatica in minestre e frittate"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1–2 g di foglie e fiori secchi in 200 ml di acqua a 90 °C, coperto 10 minuti.", dose: "2–3 tazze al giorno." },
      { nome: "Decotto per gargarismi", ricetta: "2 g di foglie in 250 ml di acqua, bollire 5 minuti, filtrare.", dose: "Gargarismi 2–3 volte al giorno." },
      { nome: "Impacco emolliente", ricetta: "Infuso concentrato su garza, applicare tiepido sulla pelle.", dose: "10–15 minuti, 1–2 volte al giorno." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "Considerata sicura alle dosi alimentari e in infuso.",
      allattamento: "Compatibile in infuso, senza eccessi.",
      bambini: "Adatta anche ai bambini, in infuso diluito; evitare il miele sotto i 12 mesi.",
      controindicazioni: ["Occlusione intestinale", "Allergia alle Malvaceae (rara)"],
      interazioni: ["Mucillagini: possono ritardare l'assorbimento di farmaci orali. Distanziare di almeno 2 ore."],
      nota: "Bere molta acqua durante l'uso. Non usare come lassativo per periodi prolungati."
    },
    sosia: [
      { nome: "Altea (Althaea officinalis)", rischio: "Non tossica, proprietà simili; cresce in ambienti più umidi." }
    ],
    fito: { commestibile: true, parti: "Foglie tenere, fiori, frutti immaturi", stagione: "Primavera–estate", cucina: "Minestre, frittate, ripieni, risotti; i fiori decorano insalate.", nota: "Le foglie grandi e coriacee sono fibrose: preferire quelle tenere." },
    evidenza: "La tradizione è solida e l'azione emolliente è plausibile per il contenuto di mucillagini. Gli studi clinici specifici sono scarsi; il profilo di sicurezza è favorevole.",
    curiosita: "I frutti della malva, detti «pani e formaggi» per la forma, sono un antico snack di campagna. La pianta era coltivata nei monasteri come ortaggio e rimedio.",
    fonti: [
      { t: "EMA · Malva sylvestris", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Malva mucilage", u: "https://pubmed.ncbi.nlm.nih.gov/?term=malva+sylvestris" },
      { t: "Ministero della Salute · Erbe e piante", u: "https://www.salute.gov.it/" }
    ]
  },

  {
    id: "tarassaco",
    nome: "Tarassaco",
    latino: "Taraxacum officinale",
    famiglia: "Asteraceae",
    nomi: ["Dente di leone", "Piscialletto", "Soffione"],
    tono: 2,
    categorie: ["Officinale", "Alimentare", "Fitoalimurgia"],
    sintesi: "L'amaro di primavera che sveglia il fegato e la digestione.",
    descrizione: "Pianta erbacea perenne con rosetta basale e fiori gialli che diventano soffioni. Ogni parte è utilizzabile: le foglie giovani in insalata, i fiori in frittelle, la radice tostata come surrogato del caffè. In fitoterapia è un amaro digestivo e un blando diuretico, tradizionalmente usato per sostenere fegato e vie biliari.",
    parti: ["Foglie", "Radice", "Fiori"],
    habitat: "Prati, giardini, incolti, bordi strada; molto comune fino in montagna.",
    raccolta: { mesi: [3, 4, 5, 9, 10, 11], nota: "Foglie in primavera prima della fioritura; radici in autunno. Evitare zone inquinate o trattate." },
    proprieta: ["Amara digestiva", "Colagoga", "Diuretica", "Depurativa tradizionale", "Prebiotica (inulina)"],
    usi: [
      "Digestione lenta e sensazione di pesantezza",
      "Supporto alla funzionalità epatobiliare",
      "Stitichezza lieve",
      "Ritenzione idrica (come coadiuvante)",
      "Insalate e frittelle di primavera"
    ],
    preparazioni: [
      { nome: "Infuso di foglie", ricetta: "1–2 g di foglie secche in 200 ml di acqua a 90 °C per 5–7 minuti.", dose: "1–2 tazze al giorno prima dei pasti." },
      { nome: "Decotto di radice", ricetta: "1–2 g di radice essiccata in 250 ml di acqua fredda, portare a ebollizione e lasciare 10 minuti.", dose: "1 tazza al giorno, per periodi brevi." },
      { nome: "Insalata primaverile", ricetta: "Foglie tenere lavate e centrifugare, condire con olio, limone e un pizzico di sale.", dose: "Porzione normale; iniziare con poche foglie per chi non è abituato all'amaro." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "Uso alimentare e infuso occasionale: chiedere parere; evitare estratti concentrati.",
      allattamento: "Uso alimentare compatibile; evitare dosi terapeutiche.",
      bambini: "Foglie in insalata e infuso leggero sono adatti; evitare grandi quantità.",
      controindicazioni: ["Ostruzione dei dotti biliari", "Calcolosi biliare sintomatica", "Gastrite e ulcera in fase acuta", "Allergia alle Asteraceae"],
      interazioni: ["Diuretici e litio", "Antidiabetici: possibile effetto ipoglicemizzante", "Antibiotici e farmaci assorbiti: cautela con grandi quantità di fibra"],
      nota: "L'effetto diuretico non sostituisce il trattamento di edemi di origine cardiaca o renale, che richiedono il medico."
    },
    sosia: [
      { nome: "Senecio e altre composite a fiore giallo", rischio: "Alcune contengono alcaloidi epatotossici: raccogliere solo tarassaco con lattice bianco amaro e foglie a denti rivolti verso il basso." },
      { nome: "Cicoria selvatica", rischio: "Non tossica, ma foglie e fiori diversi; utile conoscerle entrambe." }
    ],
    fito: { commestibile: true, parti: "Foglie, fiori, radice", stagione: "Primavera e autunno", cucina: "Insalate, frittate, frittelle, minestre, caffè di radice tostata.", nota: "Le foglie vecchie sono amare e dure; raccogliere il cuore tenero. Lavare bene e cuocere se raccolte in zone non controllate." },
    evidenza: "L'effetto amaro e colagogo è tradizionale; studi preliminari suggeriscono un blando effetto diuretico. Le prove cliniche di alta qualità sono scarse, ma il profilo di sicurezza alimentare è buono.",
    curiosita: "Il nome francese pissenlit ricorda l'effetto diuretico. I semi viaggiano col vento grazie a un pappo che è un piccolo capolavoro di aerodinamica.",
    fonti: [
      { t: "EMA · Taraxacum officinale", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Taraxacum", u: "https://pubmed.ncbi.nlm.nih.gov/?term=taraxacum+officinale+clinical" },
      { t: "EFSA · Novel foods e botanicals", u: "https://www.efsa.europa.eu/" }
    ]
  },

  {
    id: "ortica",
    nome: "Ortica",
    latino: "Urtica dioica",
    famiglia: "Urticaceae",
    nomi: ["Ortica", "Ortica comune", "Urtica"],
    tono: 4,
    categorie: ["Officinale", "Alimentare", "Fitoalimurgia"],
    sintesi: "Pungente e generosa: minerali, clorofilla e sostegno per prostata e articolazioni.",
    descrizione: "Pianta erbacea perenne con foglie seghettate e peli urticanti. L'ortica è un piccolo laboratorio verde: ricca di minerali, vitamine e flavonoidi. Le foglie sono usate come remineralizzante e antinfiammatorio, la radice per i disturbi urinari legati all'ipertrofia prostatica benigna. In cucina, dopo la cottura, perde ogni proprietà urticante.",
    parti: ["Foglie", "Radice", "Semi"],
    habitat: "Terreni ricchi di azoto, ruderi, bordi di boschi e strade, fino a 2.000 m.",
    raccolta: { mesi: [3, 4, 5, 6, 9, 10], nota: "Foglie giovani in primavera (guanti!) e radici in autunno. Raccogliere solo le sommità tenere." },
    proprieta: ["Remineralizzante", "Antinfiammatoria", "Diuretica lieve", "Antistaminica tradizionale", "Antiossidante"],
    usi: [
      "Affaticamento e carenze minerali lievi",
      "Dolori articolari e muscolari",
      "Supporto alla funzionalità urinaria",
      "Ipertrofia prostatica benigna (radice, su parere medico)",
      "Rinite allergica (tradizione, prove limitate)",
      "Minestre e ripieni"
    ],
    preparazioni: [
      { nome: "Infuso di foglie", ricetta: "1–2 g di foglie secche in 200 ml di acqua a 90 °C per 8–10 minuti.", dose: "2 tazze al giorno, per 3–4 settimane." },
      { nome: "Decotto di radice", ricetta: "1–2 g di radice essiccata in 250 ml di acqua, bollire 10 minuti e filtrare.", dose: "1 tazza al giorno; per la prostata seguire il parere medico." },
      { nome: "Ortica in cucina", ricetta: "Sbollentare le foglie per 2–3 minuti, strizzare e usare in risotti, frittate o pesto.", dose: "Come verdura, porzioni normali." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "Uso alimentare compatibile; evitare estratti di radice e dosi elevate.",
      allattamento: "Uso alimentare compatibile; evitare dosi terapeutiche senza parere.",
      bambini: "Foglie cotte in cucina sono sicure; infuso leggero dopo i 6 anni.",
      controindicazioni: ["Insufficienza cardiaca o renale con edemi", "Ipertrofia prostatica con ritenzione urinaria acuta", "Allergia alle Urticaceae"],
      interazioni: ["Diuretici", "Anticoagulanti", "Antidiabetici", "Antipertensivi"],
      nota: "Non usare la radice per l'ipertrofia prostatica senza diagnosi e follow-up medico: i sintomi urinari possono avere altre cause."
    },
    sosia: [
      { nome: "Lamium album (falsa ortica)", rischio: "Non tossica e commestibile, ma con proprietà diverse; le foglie sono più morbide e i fiori bianchi." }
    ],
    fito: { commestibile: true, parti: "Sommità giovani, semi", stagione: "Primavera", cucina: "Risotti, frittate, minestre, pesto, gnocchi; i semi tostati come condimento.", nota: "Raccogliere con guanti. La cottura elimina l'effetto urticante; non consumare cruda." },
    evidenza: "La radice ha mostrato benefici modesti sui sintomi urinari dell'ipertrofia prostatica benigna in diverse sperimentazioni. Per le foglie, le prove cliniche sono limitate; il valore nutrizionale è invece concreto.",
    curiosita: "L'ortica è stata usata per secoli come fibra tessile: durante la Seconda guerra mondiale se ne ricavavano uniformi. Il nome latino urere significa «bruciare».",
    fonti: [
      { t: "EMA · Urtica dioica", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Urtica prostate", u: "https://pubmed.ncbi.nlm.nih.gov/?term=urtica+dioica+prostate" },
      { t: "Cochrane Library", u: "https://www.cochranelibrary.com/" }
    ]
  },

  {
    id: "biancospino",
    nome: "Biancospino",
    latino: "Crataegus monogyna",
    famiglia: "Rosaceae",
    nomi: ["Biancospino", "Spino bianco", "Maiolo"],
    tono: 3,
    categorie: ["Officinale", "Fitoalimurgia"],
    sintesi: "Il cuore gentile della siepe: sostiene il ritmo cardiaco e calma l'ansia.",
    descrizione: "Arbusto spinoso con fiori bianchi in primavera e bacche rosse in autunno. Il biancospino è la pianta cardiotonica per eccellenza della tradizione europea: fiori e foglie sono usati per sostenere la funzione cardiaca e la pressione, mentre i frutti sono un integratore alimentare. Non sostituisce mai una terapia cardiologica.",
    parti: ["Fiori", "Foglie giovani", "Frutti"],
    habitat: "Siepi, margini di boschi e pascoli, fino a 1.500 m.",
    raccolta: { mesi: [4, 5, 9, 10], nota: "Fiori e foglie all'inizio della fioritura; frutti maturi in autunno. Evitare le spine!" },
    proprieta: ["Cardiotonica lieve", "Antipertensiva lieve", "Antiossidante", "Ansiolitica lieve", "Vasoprotettrice"],
    usi: [
      "Sostegno alla funzione cardiaca negli anziani (su parere medico)",
      "Pressione lievemente alta (come coadiuvante)",
      "Palpitazioni nervose",
      "Ansia e tensione emotiva",
      "Frutti in confetture e tisane"
    ],
    preparazioni: [
      { nome: "Infuso di fiori e foglie", ricetta: "1–2 g di droga secca in 200 ml di acqua a 90 °C per 10 minuti.", dose: "2 tazze al giorno, per cicli di 4–6 settimane." },
      { nome: "Decotto di frutti", ricetta: "1 cucchiaio di frutti schiacciati in 250 ml di acqua, bollire 10 minuti.", dose: "1 tazza al giorno; i semi contengono composti da non assumere in grandi quantità." },
      { nome: "Confettura di biancospino", ricetta: "Frutti puliti, zucchero e limone, cottura lunga; passare al setaccio per eliminare i semi.", dose: "Piccole porzioni, come alimento." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare dosi terapeutiche; l'uso alimentare dei frutti è occasionale.",
      allattamento: "Evitare estratti concentrati; chiedere parere.",
      bambini: "Non usare per problemi cardiaci; infuso occasionale solo dopo parere pediatrico.",
      controindicazioni: ["Patologie cardiache non diagnosticate", "Pressione molto bassa", "Uso al posto delle terapie prescritte"],
      interazioni: ["Digossina e altri glicosidi cardiaci", "Beta-bloccanti, calcio-antagonisti, nitrati", "Antipertensivi", "Anticoagulanti (teorico)"],
      nota: "Dolore al petto, fiato corto, palpitazioni nuove o svenimenti richiedono assistenza medica immediata, non un infuso."
    },
    sosia: [
      { nome: "Prugnolo e altri Prunus selvatici", rischio: "Frutti e foglie diversi; alcuni semi contengono amigdalina. Identificare con certezza." }
    ],
    fito: { commestibile: true, parti: "Frutti (con moderazione), fiori per tisane", stagione: "Autunno per i frutti, primavera per i fiori", cucina: "Confetture, gelatine, sciroppi; i frutti sono farinosi e poco dolci.", nota: "Eliminare sempre i semi; non consumare grandi quantità di frutti." },
    evidenza: "Diversi studi suggeriscono un miglioramento modesto dei sintomi dell'insufficienza cardiaca lieve e della pressione. La qualità delle prove è eterogenea e l'uso va integrato, mai sostituito, alla terapia medica.",
    curiosita: "In inglese si chiama hawthorn, «spino della siepe». Nella tradizione celtica proteggeva la casa e le nascite; i fiori annunciano la primavera nelle campagne.",
    fonti: [
      { t: "EMA · Crataegus", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Hawthorn heart failure", u: "https://pubmed.ncbi.nlm.nih.gov/?term=crataegus+heart+failure+meta-analysis" },
      { t: "Cochrane Library", u: "https://www.cochranelibrary.com/" }
    ]
  },

  {
    id: "passiflora",
    nome: "Passiflora",
    latino: "Passiflora incarnata",
    famiglia: "Passifloraceae",
    nomi: ["Passiflora", "Fiore della passione", "Passionflower"],
    tono: 1,
    categorie: ["Officinale"],
    sintesi: "Una carezza verde per il sistema nervoso: ansia lieve, tensione, sonno difficile.",
    descrizione: "Pianta rampicante originaria delle Americhe, con fiori spettacolari e frutti ovoidali. In fitoterapia si usano le sommità fiorite essiccate, ricche di flavonoidi. È una delle piante più impiegate per l'ansia lieve e l'irrequietezza, spesso associata a melissa, valeriana e biancospino. Non crea dipendenza, ma può aumentare la sonnolenza.",
    parti: ["Sommità fiorite", "Foglie"],
    habitat: "Coltivata come rampicante ornamentale; origine tropicale americana.",
    raccolta: { mesi: [6, 7, 8], nota: "Raccogliere le sommità durante la fioritura e essiccare rapidamente all'ombra." },
    proprieta: ["Ansiolitica lieve", "Sedativa", "Antispasmodica", "Ipnotica lieve", "Neuroprotettiva (studi preliminari)"],
    usi: [
      "Ansia lieve e inquietudine",
      "Difficoltà ad addormentarsi",
      "Tensione muscolare nervosa",
      "Palpitazioni di origine nervosa (dopo esclusione medica)",
      "Irrequietezza nei periodi di stress"
    ],
    preparazioni: [
      { nome: "Infuso serale", ricetta: "1–2 g di sommità secche in 200 ml di acqua a 90 °C, coperto 8–10 minuti.", dose: "1 tazza 30–60 minuti prima di dormire." },
      { nome: "Tintura madre", ricetta: "Secondo le indicazioni del produttore, in genere 20–40 gocce in poca acqua.", dose: "2–3 volte al giorno, per periodi brevi; evitare se si guidano macchinari." },
      { nome: "Associazione per il sonno", ricetta: "Passiflora, melissa e camomilla in parti uguali, un cucchiaino per tazza.", dose: "1 tazza la sera." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Dati insufficienti: evitare dosi terapeutiche e chiedere parere.",
      allattamento: "Dati insufficienti: evitare.",
      bambini: "Solo su parere pediatrico; non usare come sedativo fai-da-te.",
      controindicazioni: ["Sonnolenza diurna marcata", "Attività che richiedono vigilanza", "Uso con alcol"],
      interazioni: ["Sedativi, benzodiazepine, barbiturici", "Antidepressivi: cautela", "Anticoagulanti (teorico)", "Farmaci metabolizzati dal fegato: cautela"],
      nota: "Non guidare dopo l'assunzione. Se l'ansia interferisce con la vita quotidiana o dura settimane, è il momento di parlarne con un professionista."
    },
    sosia: [],
    fito: { commestibile: false, parti: "—", stagione: "—", cucina: "Non è una pianta alimentare: i frutti di altre passiflore sono commestibili, quelli ornamentali no.", nota: "Non confondere le specie ornamentali con quelle alimentari." },
    evidenza: "Alcuni studi clinici di piccole dimensioni suggeriscono una riduzione dell'ansia e un miglioramento del sonno, ma le prove sono limitate e non sempre di alta qualità. Il profilo di sicurezza a breve termine è favorevole.",
    curiosita: "Il nome «fiore della passione» fu dato dai missionari spagnoli, che videro nei simboli del fiore la Passione di Cristo. Non ha nulla a che vedere con l'amore romantico.",
    fonti: [
      { t: "EMA · Passiflora incarnata", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Passiflora anxiety", u: "https://pubmed.ncbi.nlm.nih.gov/?term=passiflora+incarnata+anxiety" },
      { t: "NIH · Passionflower", u: "https://www.nccih.nih.gov/health/passionflower" }
    ]
  },

  {
    id: "melissa",
    nome: "Melissa",
    latino: "Melissa officinalis",
    famiglia: "Lamiaceae",
    nomi: ["Melissa", "Erba limoncina", "Citronella (impropriamente)"],
    tono: 2,
    categorie: ["Officinale", "Aromatica", "Alimentare"],
    sintesi: "Profumo di limone e nervi quieti: digestione, sonno e piccole infiammazioni.",
    descrizione: "Pianta erbacea perenne con foglie dal profumo intenso di limone. La melissa è una delle piante più amate per la sua delicatezza: calma l'irrequietezza, favorisce la digestione e, applicata sulla pelle, è tradizionalmente usata per l'herpes labiale. In cucina aromatizza bevande, insalate e dolci.",
    parti: ["Foglie", "Sommità fiorite"],
    habitat: "Luoghi freschi e ombrosi, orti, margini di bosco; coltivata in tutto il mondo.",
    raccolta: { mesi: [5, 6, 7, 8, 9], nota: "Raccogliere le foglie prima della fioritura e usarle fresche o essiccate rapidamente." },
    proprieta: ["Calmante", "Digestiva", "Antispasmodica", "Antivirale topica", "Carminativa"],
    usi: [
      "Irrequietezza e ansia lieve",
      "Difficoltà digestive e gonfiore",
      "Herpes labiale (crema o impacco)",
      "Sonno leggero e risvegli notturni",
      "Aroma in cucina e bevande"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1–2 g di foglie secche in 200 ml di acqua a 90 °C per 5–7 minuti.", dose: "2–3 tazze al giorno, anche dopo i pasti." },
      { nome: "Impacco per herpes", ricetta: "Infuso concentrato e raffreddato su garza, oppure crema a base di estratto.", dose: "Applicare 3–4 volte al giorno nelle fasi iniziali." },
      { nome: "Acqua aromatizzata", ricetta: "Foglie fresche in acqua fredda con limone e cetriolo, in frigorifero per 2 ore.", dose: "Da consumare in giornata." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "Infuso occasionale ritenuto sicuro; evitare estratti concentrati.",
      allattamento: "Compatibile in infuso; chiedere parere per gli estratti.",
      bambini: "Infuso leggero dopo i 6 anni; non usare oli essenziali sui bambini.",
      controindicazioni: ["Ipotiroidismo non compensato: cautela con estratti ad alte dosi", "Allergia alle Lamiaceae"],
      interazioni: ["Sedativi e farmaci per la tiroide: cautela teorica", "Anticoagulanti: nessuna interazione rilevante alle dosi usuali"],
      nota: "Le mucose e gli occhi vanno tenuti lontani dagli oli essenziali. L'infuso è la forma più adatta all'autoconsumo."
    },
    sosia: [
      { nome: "Lemon verbena (Aloysia citrodora)", rischio: "Non tossica, aroma simile ma pianta diversa; non usare le foglie di piante ornamentali." }
    ],
    fito: { commestibile: true, parti: "Foglie e fiori", stagione: "Primavera–estate", cucina: "Tisane, limonate, insalate di frutta, pollo, pesce; ottima con le fragole.", nota: "Aggiungere a fine cottura per conservare l'aroma." },
    evidenza: "Studi piccoli suggeriscono effetti positivi su ansia, sonno e agitazione, soprattutto in associazione. Per l'herpes labiale esistono prove preliminari di creme a base di melissa. L'evidenza resta modesta.",
    curiosita: "Il nome deriva dal greco melissa, «ape»: i fiori attirano le api e il profumo ricorda il miele. Paracelso la considerava un rimedio per il cuore.",
    fonti: [
      { t: "EMA · Melissa officinalis", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Melissa anxiety", u: "https://pubmed.ncbi.nlm.nih.gov/?term=melissa+officinalis+anxiety" },
      { t: "NIH · Lemon balm", u: "https://www.nccih.nih.gov/health/lemon-balm" }
    ]
  },

  {
    id: "finocchio",
    nome: "Finocchio selvatico",
    latino: "Foeniculum vulgare",
    famiglia: "Apiaceae",
    nomi: ["Finocchio", "Finocchietto", "Fennel"],
    tono: 1,
    categorie: ["Officinale", "Aromatica", "Alimentare", "Fitoalimurgia"],
    sintesi: "Il seme che scioglie l'aria: carminativo, digestivo, aroma di casa.",
    descrizione: "Ombrellifera mediterranea con fusti alti, foglie filiformi e ombrelle di fiorellini gialli. I frutti (impropriamente chiamati semi) sono il rimedio carminativo più noto: alleviano gonfiore e crampi intestinali. In cucina si usa tutto: il grumolo come verdura, i semi per aromatizzare, i fiori per conserve.",
    parti: ["Frutti (semi)", "Foglie", "Grumolo", "Fiori"],
    habitat: "Incolti, scarpate ferroviarie, campagne soleggiate; coltivato negli orti.",
    raccolta: { mesi: [7, 8, 9], nota: "Raccogliere le ombrelle quando i semi sono maturi ma non ancora dispersi; essiccare in sacchetti di carta." },
    proprieta: ["Carminativa", "Antispasmodica", "Digestiva", "Galattagoga tradizionale", "Antinfiammatoria lieve"],
    usi: [
      "Meteorismo, gonfiore e crampi intestinali",
      "Digestione difficile",
      "Tosse grassa (come supporto)",
      "Coliche del lattante (solo su parere pediatrico)",
      "Aroma in cucina e liquori"
    ],
    preparazioni: [
      { nome: "Infuso di semi", ricetta: "1 g di semi leggermente schiacciati in 200 ml di acqua a 95 °C per 8–10 minuti.", dose: "1–2 tazze al giorno dopo i pasti." },
      { nome: "Decotto", ricetta: "1 g di semi in 250 ml di acqua, bollire 5 minuti e filtrare.", dose: "1 tazza dopo il pasto." },
      { nome: "Finocchio in padella", ricetta: "Grumolo tagliato, olio, aglio, un pizzico di semi; cottura dolce con poca acqua.", dose: "Contorno normale." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare oli essenziali e dosi elevate di estratto; l'uso alimentare è accettabile. L'estragolo è oggetto di valutazione di sicurezza.",
      allattamento: "Uso alimentare e infuso occasionale; evitare oli essenziali.",
      bambini: "Infuso molto diluito solo dopo parere pediatrico; non usare oli essenziali. Le tisane per coliche non sostituiscono il pediatra.",
      controindicazioni: ["Allergia alle Apiaceae (sedano, anice, carota)", "Epilessia (olio essenziale)", "Uso di oli essenziali in gravidanza e nei bambini"],
      interazioni: ["Anticoagulanti (teorico)", "Antibiotici chinolonici (olio essenziale, teorico)", "Farmaci ormonali: cautela con alte dosi per il contenuto di estragolo"],
      nota: "Il finocchio selvatico ha ombrelle simili a quelle di piante molto velenose (cicuta). Non raccogliere ombrellifere senza esperienza e senza la certezza assoluta dell'identificazione."
    },
    sosia: [
      { nome: "Cicuta maggiore (Conium maculatum)", rischio: "MORTALE. Fusti macchiati di rosso, odore sgradevole, ombrelle simili. Non raccogliere finocchio selvatico se non si è esperti." },
      { nome: "Anice e carvi", rischio: "Non tossici, aroma e semi diversi; attenzione alle allergie crociate." }
    ],
    fito: { commestibile: true, parti: "Grumolo, foglie, semi, fiori", stagione: "Autunno–inverno per il grumolo, estate per i semi", cucina: "Insalate, gratinati, minestre, arrosti, liquori, conserve di olive.", nota: "Per i semi, attendere la maturazione completa. Il grumolo selvatico è più aromatico e fibroso." },
    evidenza: "L'effetto carminativo è supportato dalla tradizione e da meccanismi plausibili (antispasmodico). Gli studi clinici di alta qualità sono pochi; per le coliche infantili le prove sono insufficienti.",
    curiosita: "I Romani lo chiamavano foeniculum, da foenum, «fieno», per il profumo. Nel Medioevo era tra le erbe dell'orto monastico e si credeva proteggesse dagli incantesimi.",
    fonti: [
      { t: "EMA · Foeniculum vulgare", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "EFSA · Estragolo", u: "https://www.efsa.europa.eu/" },
      { t: "PubMed · Fennel infant colic", u: "https://pubmed.ncbi.nlm.nih.gov/?term=fennel+infant+colic" }
    ]
  }

];
