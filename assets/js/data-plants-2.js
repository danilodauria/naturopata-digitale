/* ==========================================================================
   Naturopata Digitale · Erbario, parte seconda
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.plants = NP.plants.concat([

  {
    id: "liquirizia",
    nome: "Liquirizia",
    latino: "Glycyrrhiza glabra",
    famiglia: "Fabaceae",
    nomi: ["Liquirizia", "Regolizia", "Licorice"],
    tono: 3,
    categorie: ["Officinale", "Alimentare"],
    sintesi: "Dolce e potente: calma la tosse e protegge lo stomaco, ma alza la pressione se esagerata.",
    descrizione: "Pianta erbacea perenne con radici legnose ricche di glicirrizina, il composto che le dà il sapore dolce e la tipica nota amarognola. La liquirizia è un rimedio antico per la tosse e le irritazioni gastriche, ma è anche una delle piante con le avvertenze più importanti: la glicirrizina può causare ritenzione di sodio, perdita di potassio e ipertensione. Va usata in dosi contenute e per periodi brevi.",
    parti: ["Radice", "Rizoma"],
    habitat: "Terreni profondi e soleggiati del Mediterraneo e dell'Asia occidentale; coltivata.",
    raccolta: { mesi: [9, 10, 11], nota: "Si raccolgono radici e rizomi di piante di almeno 3–4 anni, in autunno; si essiccano a pezzi." },
    proprieta: ["Antinfiammatoria", "Espettorante", "Gastroprotettiva", "Antitussiva", "Dolcificante naturale"],
    usi: [
      "Tosse secca e irritazione della gola",
      "Gastrite e bruciore lieve (come coadiuvante)",
      "Afte e piccole ulcere della bocca (estratti deglicirrizinati)",
      "Aroma per caramelle, tisane e liquori",
      "Sapore dolce in miscele di erbe amare"
    ],
    preparazioni: [
      { nome: "Decotto", ricetta: "1–2 g di radice essiccata in 250 ml di acqua, bollire 10 minuti e filtrare.", dose: "1 tazza al giorno, per non più di 4–6 settimane." },
      { nome: "Infuso in miscela", ricetta: "Un pizzico di radice in 200 ml di acqua a 95 °C per 10 minuti, insieme a timo o malva.", dose: "1–2 tazze al giorno, senza eccedere." },
      { nome: "Uso alimentare", ricetta: "Radice in bastoncini da masticare o caramelle alla liquirizia.", dose: "Quantità occasionali: la glicirrizina si accumula." }
    ],
    sicurezza: {
      livello: "rosso",
      gravidanza: "Evitare dosi elevate e uso prolungato: la glicirrizina è associata a complicanze pressorie. L'uso alimentare occasionale va concordato.",
      allattamento: "Evitare estratti e dosi elevate; chiedere parere.",
      bambini: "Non usare come rimedio; limitare le caramelle e i prodotti concentrati.",
      controindicazioni: ["Ipertensione", "Insufficienza cardiaca o renale", "Ipokaliemia", "Cirrosi e disturbi epatici gravi", "Gravidanza (dosi terapeutiche)"],
      interazioni: ["Digossina (rischio di tossicità da ipokaliemia)", "Diuretici tiazidici e dell'ansa", "Corticosteroidi", "Antipertensivi", "Anticoagulanti (teorico)"],
      nota: "Non superare 100 mg di glicirrizina al giorno e non protrarre l'uso. Se si assumono farmaci per pressione, cuore o reni, evitare senza parere medico."
    },
    sosia: [
      { nome: "Liquirizia di bosco (Polypodium vulgare)", rischio: "Dolce ma diversa; non ha le stesse proprietà e non va usata come sostituto." }
    ],
    fito: { commestibile: true, parti: "Radice (aroma)", stagione: "Autunno", cucina: "Caramelle, liquori, tisane, decorazioni dolci; in piccole quantità.", nota: "Il consumo regolare di liquirizia in grandi quantità è sconsigliato a chi ha pressione alta." },
    evidenza: "L'effetto espettorante e lenitivo della gola è tradizionale; la forma deglicirrizinata (DGL) ha qualche prova su bruciore gastrico e afte. L'evidenza è limitata, ma le avvertenze cardiovascolari sono solide.",
    curiosita: "La liquirizia era talmente preziosa che in Cina veniva usata come moneta. Il suo sapore dolce è circa 50 volte più intenso dello zucchero.",
    fonti: [
      { t: "EMA · Glycyrrhiza glabra", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "EFSA · Acido glicirrizico", u: "https://www.efsa.europa.eu/" },
      { t: "PubMed · Licorice hypertension", u: "https://pubmed.ncbi.nlm.nih.gov/?term=licorice+glycyrrhizin+hypertension" }
    ]
  },

  {
    id: "echinacea",
    nome: "Echinacea",
    latino: "Echinacea purpurea",
    famiglia: "Asteraceae",
    nomi: ["Echinacea", "Rudbeckia purpurea", "Coneflower"],
    tono: 3,
    categorie: ["Officinale"],
    sintesi: "La difesa di stagione: un aiuto discusso per le vie respiratorie alte.",
    descrizione: "Pianta erbacea nordamericana con grandi fiori viola e un cono centrale spinoso. L'echinacea è tra le piante più vendute per prevenire e attenuare i raffreddori. Le prove scientifiche sono contrastanti: alcuni studi mostrano una riduzione della durata dei sintomi, altri no. Il suo uso è ragionevole come supporto breve, non come sostituto delle cure mediche.",
    parti: ["Parti aeree", "Radice", "Fiori"],
    habitat: "Prati e terreni asciutti del Nord America; coltivata in Europa.",
    raccolta: { mesi: [6, 7, 8, 9], nota: "Raccogliere le sommità fiorite in piena fioritura e le radici in autunno, da piante di almeno 2–3 anni." },
    proprieta: ["Immunomodulante", "Antinfiammatoria", "Antimicrobica (in vitro)", "Cicatrizzante topica"],
    usi: [
      "Supporto nelle prime fasi del raffreddore",
      "Mal di gola e infiammazioni delle prime vie aeree",
      "Piccole ferite e irritazioni cutanee (uso topico)",
      "Prevenzione stagionale (dati non conclusivi)"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1–2 g di droga secca in 200 ml di acqua a 90 °C per 10 minuti.", dose: "2–3 tazze al giorno per 7–10 giorni." },
      { nome: "Tintura", ricetta: "Secondo le indicazioni del produttore, in genere 20–40 gocce in acqua.", dose: "2–3 volte al giorno, per brevi periodi." },
      { nome: "Crema topica", ricetta: "Estratto in crema base, applicato su piccole ferite pulite.", dose: "1–2 volte al giorno." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Dati insufficienti: preferire l'astensione dagli estratti concentrati.",
      allattamento: "Dati insufficienti: evitare.",
      bambini: "Solo su parere pediatrico; non usare per prevenire infezioni in modo continuativo.",
      controindicazioni: ["Allergia alle Asteraceae", "Malattie autoimmuni", "Immunosoppressione", "Uso continuativo oltre 8 settimane"],
      interazioni: ["Immunosoppressori (ciclosporina, tacrolimus, corticosteroidi)", "Farmaci metabolizzati dal fegato: cautela con estratti", "Anticoagulanti (teorico)"],
      nota: "Non usare per lunghi periodi e non considerarla una cura per infezioni batteriche: la febbre alta persistente richiede il medico."
    },
    sosia: [],
    fito: { commestibile: false, parti: "—", stagione: "—", cucina: "Non è una pianta alimentare; i fiori sono ornamentali.", nota: "Non confonderla con altre composite ornamentali." },
    evidenza: "Le revisioni Cochrane e altri lavori mostrano risultati incoerenti: possibile riduzione modesta della durata del raffreddore, nessuna prova solida di prevenzione. Il profilo di sicurezza a breve termine è accettabile.",
    curiosita: "Il nome deriva dal greco echinos, «riccio», per il cono centrale spinoso. I nativi americani la usavano per ferite e morsi di serpente.",
    fonti: [
      { t: "EMA · Echinacea purpurea", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "Cochrane · Echinacea common cold", u: "https://www.cochranelibrary.com/" },
      { t: "NIH · Echinacea", u: "https://www.nccih.nih.gov/health/echinacea" }
    ]
  },

  {
    id: "iperico",
    nome: "Iperico",
    latino: "Hypericum perforatum",
    famiglia: "Hypericaceae",
    nomi: ["Iperico", "Erba di San Giovanni", "St. John's wort"],
    tono: 2,
    categorie: ["Officinale"],
    sintesi: "L'antidepressivo vegetale più studiato, ma anche la pianta con le interazioni più serie.",
    descrizione: "Pianta erbacea perenne con fiori gialli a cinque petali; controluce le foglie mostrano puntini traslucidi, da cui il nome perforatum. L'iperico ha un'efficacia documentata nella depressione lieve-moderata, ma è un potente induttore enzimatico: può ridurre l'effetto di numerosi farmaci, compresi contraccettivi, anticoagulanti e immunosoppressori. Non è una pianta da autoconsumo.",
    parti: ["Sommità fiorite"],
    habitat: "Prati, incolti, bordi di bosco e strade, fino a 1.500 m.",
    raccolta: { mesi: [6, 7, 8], nota: "Raccogliere le sommità in piena fioritura, nelle ore soleggiate; essiccare all'ombra." },
    proprieta: ["Antidepressiva", "Cicatrizzante topica", "Antinfiammatoria", "Antivirale (in vitro)", "Ansiolitica lieve"],
    usi: [
      "Umore depresso lieve-moderato (con supervisione)",
      "Piccole ferite e bruciature (olio topico)",
      "Dolori muscolari (olio topico)",
      "Disturbi del sonno associati a umore basso"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1–2 g di sommità secche in 200 ml di acqua a 90 °C per 10 minuti.", dose: "2 tazze al giorno; per la depressione serve una preparazione standardizzata e un parere medico." },
      { nome: "Olio di iperico", ricetta: "Fiori freschi coperti di olio d'oliva, al sole per 3–4 settimane, poi filtrare.", dose: "Uso esterno su pelle integra, 1–2 volte al giorno." },
      { nome: "Tintura", ricetta: "Secondo indicazioni del produttore.", dose: "Solo su parere professionale, per la complessità delle interazioni." }
    ],
    sicurezza: {
      livello: "rosso",
      gravidanza: "Controindicato: dati insufficienti e rischio di interazioni.",
      allattamento: "Controindicato: passa nel latte e i dati sul bambino sono insufficienti; possono esserci interazioni con i farmaci della madre.",
      bambini: "Controindicato senza supervisione specialistica.",
      controindicazioni: ["Uso con farmaci metabolizzati da CYP3A4, CYP2C9, CYP2C19 o trasportati da P-gp", "Depressione grave o ideazione suicidaria", "Trapianti", "Fotosensibilità", "Gravidanza e allattamento"],
      interazioni: ["Contraccettivi orali (perdita di efficacia)", "Warfarin e anticoagulanti", "Ciclosporina, tacrolimus, sirolimus", "Antiretrovirali", "Alcuni chemioterapici", "Anticonvulsivanti", "SSRI, SNRI e triptani (rischio di sindrome serotoninergica)", "Digossina", "Statine"],
      nota: "È una delle piante con il maggior numero di interazioni clinicamente rilevanti. Non sospendere né iniziare farmaci senza parlarne con il medico. L'esposizione al sole può causare reazioni cutanee."
    },
    sosia: [
      { nome: "Altre ipericacee e fiori gialli simili", rischio: "Identificazione errata; alcune piante gialle sono tossiche. Raccogliere solo con certezza." }
    ],
    fito: { commestibile: false, parti: "—", stagione: "—", cucina: "Non è una pianta alimentare.", nota: "Non usare l'olio di iperico su pelle esposta al sole: aumenta la fotosensibilità." },
    evidenza: "Numerosi studi e revisioni indicano che gli estratti standardizzati possono essere efficaci nella depressione lieve-moderata, con risultati paragonabili ad alcuni antidepressivi in trials di piccole dimensioni. Le interazioni farmacologiche sono ben documentate e clinicamente importanti.",
    curiosita: "Il nome «erba di San Giovanni» deriva dalla fioritura intorno al 24 giugno. Nella tradizione popolare si raccoglieva la notte di San Giovanni per proteggere la casa.",
    fonti: [
      { t: "EMA · Hypericum perforatum", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "Cochrane · St John's wort depression", u: "https://www.cochranelibrary.com/" },
      { t: "NIH · St. John's wort", u: "https://www.nccih.nih.gov/health/st-johns-wort" }
    ]
  },

  {
    id: "valeriana",
    nome: "Valeriana",
    latino: "Valeriana officinalis",
    famiglia: "Caprifoliaceae",
    nomi: ["Valeriana", "Erba gatta", "Valerian"],
    tono: 2,
    categorie: ["Officinale"],
    sintesi: "La radice della notte: aiuta a lasciare andare la giornata e a trovare il sonno.",
    descrizione: "Pianta erbacea perenne con radici dall'odore intenso e sgradevole, dovuto agli acidi valerenici. La valeriana è il sedativo vegetale più conosciuto: riduce il tempo necessario per addormentarsi e migliora la qualità soggettiva del sonno, con un effetto modesto. Non è un ipnotico potente e non va usata per mascherare disturbi del sonno persistenti.",
    parti: ["Radice", "Rizoma"],
    habitat: "Terreni umidi, prati, bordi di fossi e boschi, fino a 1.800 m.",
    raccolta: { mesi: [9, 10], nota: "Raccogliere le radici in autunno da piante di almeno 2 anni; lavare e essiccare a bassa temperatura." },
    proprieta: ["Sedativa", "Ipnotica lieve", "Ansiolitica", "Antispasmodica", "Miorilassante"],
    usi: [
      "Difficoltà ad addormentarsi",
      "Sonno leggero e risvegli notturni",
      "Tensione nervosa e irritabilità",
      "Crampi muscolari di origine nervosa",
      "Sostegno nei periodi di stress"
    ],
    preparazioni: [
      { nome: "Infuso di radice", ricetta: "1–2 g di radice essiccata in 200 ml di acqua a 95 °C per 10–15 minuti.", dose: "1 tazza 30–60 minuti prima di dormire." },
      { nome: "Decotto", ricetta: "1 g di radice in 250 ml di acqua, bollire 10 minuti.", dose: "1 tazza la sera, per cicli brevi." },
      { nome: "Tintura", ricetta: "Secondo indicazioni del produttore, in genere 20–40 gocce.", dose: "La sera; non guidare dopo l'assunzione." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Dati insufficienti: evitare dosi terapeutiche.",
      allattamento: "Dati insufficienti: evitare.",
      bambini: "Solo su parere pediatrico; non usare come sedativo fai-da-te nei più piccoli.",
      controindicazioni: ["Attività che richiedono vigilanza", "Uso con alcol", "Disturbi epatici (cautela)", "Apnee notturne non diagnosticate"],
      interazioni: ["Benzodiazepine, barbiturici e altri sedativi", "Antidepressivi sedativi", "Antistaminici sedativi", "Alcol", "Farmaci metabolizzati dal fegato: cautela"],
      nota: "Può causare sonnolenza diurna. Se l'insonnia dura più di tre settimane o si associa a umore basso, ansia intensa o apnee, serve una valutazione medica."
    },
    sosia: [
      { nome: "Valeriana rossa (Centranthus ruber)", rischio: "Pianta ornamentale diversa, non usare come sedativo." },
      { nome: "Erba gatta (Nepeta cataria)", rischio: "Non tossica, effetti diversi; non confondere le due." }
    ],
    fito: { commestibile: false, parti: "—", stagione: "—", cucina: "Non è una pianta alimentare; la radice ha odore forte e sapore amaro.", nota: "Le radici possono attirare gatti: conservarle in contenitori chiusi." },
    evidenza: "Le revisioni mostrano un effetto modesto sulla latenza del sonno e sulla qualità percepita, con risultati variabili. Le prove sono limitate da campioni piccoli e prodotti diversi. Il profilo di sicurezza a breve termine è buono.",
    curiosita: "Nell'antichità era usata come profumo e afrodisiaco, nonostante l'odore sgradevole. Il nome deriva dal latino valere, «stare bene».",
    fonti: [
      { t: "EMA · Valeriana officinalis", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Valerian insomnia", u: "https://pubmed.ncbi.nlm.nih.gov/?term=valeriana+insomnia+meta-analysis" },
      { t: "NIH · Valerian", u: "https://www.nccih.nih.gov/health/valerian" }
    ]
  }

]);

NP.plants = NP.plants.concat([

  {
    id: "aloe",
    nome: "Aloe vera",
    latino: "Aloe vera",
    famiglia: "Asphodelaceae",
    nomi: ["Aloe", "Aloe barbadensis", "Aloe vera"],
    tono: 4,
    categorie: ["Officinale", "Cosmetica"],
    sintesi: "Il gel che rinfresca la pelle: idratante, lenitivo, cicatrizzante per uso esterno.",
    descrizione: "Pianta succulenta dalle foglie carnose e spinose, originaria delle zone aride. Il gel trasparente contenuto nelle foglie è ricco di polisaccaridi e acqua: è un ottimo idratante e lenitivo per scottature e pelle irritata. Il lattice giallo che si trova appena sotto la buccia è invece un lassativo stimolante potente, da non confondere con il gel e da usare solo sotto controllo.",
    parti: ["Gel delle foglie", "Lattice (aloin)"],
    habitat: "Pianta da appartamento o da clima caldo; origine africana, coltivata in tutto il Mediterraneo.",
    raccolta: { mesi: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], nota: "Si prelevano le foglie esterne più grandi, lasciando asciugare il taglio. Il gel si conserva in frigorifero per pochi giorni." },
    proprieta: ["Emolliente", "Idratante", "Cicatrizzante", "Antinfiammatoria topica", "Lassativa (lattice)"],
    usi: [
      "Scottature solari lievi e pelle arrossata",
      "Idratazione della pelle secca",
      "Piccole ferite superficiali",
      "Irritazioni da pannolino (gel puro, con cautela)",
      "Stitichezza occasionale (solo lattice, su parere)"
    ],
    preparazioni: [
      { nome: "Gel lenitivo", ricetta: "Prelevare il gel da una foglia matura, sciacquare e applicare sulla pelle pulita.", dose: "1–2 volte al giorno su zone limitate; test su una piccola area prima dell'uso." },
      { nome: "Impacco per scottature", ricetta: "Gel fresco in frigorifero per 15 minuti, stendere su garza e applicare.", dose: "10–15 minuti, più volte al giorno, su cute integra." },
      { nome: "Succo di aloe", ricetta: "Bevanda a base di gel, secondo indicazioni del produttore.", dose: "Solo prodotti alimentari controllati; evitare il fai-da-te con il lattice." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Il gel topico è accettabile; il lattice è controindicato in gravidanza per il rischio di stimolazione uterina.",
      allattamento: "Gel topico accettabile; evitare il lattice.",
      bambini: "Non usare il lattice sotto i 12 anni; gel topico solo su pelle integra e con parere.",
      controindicazioni: ["Occlusione intestinale", "Malattie infiammatorie intestinali in fase acuta", "Insufficienza renale", "Uso prolungato del lattice"],
      interazioni: ["Digossina (ipokaliemia da lassativi)", "Diuretici", "Corticosteroidi", "Farmaci orali: possibile riduzione dell'assorbimento"],
      nota: "Il lattice di aloe non è un rimedio per dimagrire e non va usato a lungo: può causare dipendenza intestinale e squilibri elettrolitici."
    },
    sosia: [],
    fito: { commestibile: true, parti: "Gel interno delle foglie (prodotti alimentari controllati)", stagione: "Tutto l'anno", cucina: "Frullati e bevande con gel alimentare; il lattice giallo va eliminato.", nota: "Non consumare foglie intere o lattice: solo gel filtrato e prodotti destinati all'alimentazione." },
    evidenza: "L'uso topico ha prove discrete su scottature lievi, idratazione e dermatite da pannolino. Per l'assunzione orale le prove sono limitate e il profilo di sicurezza del lattice è sfavorevole.",
    curiosita: "Nell'antico Egitto l'aloe era chiamata «pianta dell'immortalità» e compare nei papiri medici. Le foglie si usavano anche per l'imbalsamazione.",
    fonti: [
      { t: "EMA · Aloe", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Aloe vera topical", u: "https://pubmed.ncbi.nlm.nih.gov/?term=aloe+vera+burns+wound" },
      { t: "NIH · Aloe vera", u: "https://www.nccih.nih.gov/health/aloe-vera" }
    ]
  },

  {
    id: "calendula",
    nome: "Calendula",
    latino: "Calendula officinalis",
    famiglia: "Asteraceae",
    nomi: ["Calendula", "Fiorrancio", "Marigold"],
    tono: 3,
    categorie: ["Officinale", "Cosmetica", "Alimentare"],
    sintesi: "Il fiore del sole che cura la pelle: lenitivo, cicatrizzante, delicato.",
    descrizione: "Pianta erbacea annuale con fiori giallo-arancio che si aprono con il sole. La calendula è un rimedio cutaneo di riferimento: creme, unguenti e impacchi a base di fiori sono usati per ferite superficiali, arrossamenti e dermatiti. I petali sono commestibili e decorano piatti e insalate, con un sapore leggermente amaro e pepato.",
    parti: ["Fiori", "Petali"],
    habitat: "Orti e giardini, terreni soleggiati; coltivata e talvolta inselvatichita.",
    raccolta: { mesi: [5, 6, 7, 8, 9, 10], nota: "Raccogliere i capolini appena aperti, con tempo asciutto; essiccare all'ombra su graticci." },
    proprieta: ["Cicatrizzante", "Antinfiammatoria", "Antimicrobica topica", "Emolliente", "Astringente lieve"],
    usi: [
      "Ferite superficiali e piccole abrasioni",
      "Pelle irritata, arrossata o secca",
      "Dermatite da pannolino",
      "Afte e infiammazioni del cavo orale (risciacqui)",
      "Decorazione e aroma di piatti"
    ],
    preparazioni: [
      { nome: "Oleolito di calendula", ricetta: "Fiori secchi coperti di olio d'oliva in barattolo chiuso, al sole per 3–4 settimane; filtrare e conservare al buio.", dose: "Uso esterno sulla pelle, 1–2 volte al giorno." },
      { nome: "Infuso per impacchi", ricetta: "1–2 g di fiori in 200 ml di acqua a 90 °C per 10 minuti; filtrare e raffreddare.", dose: "Impacchi di 10 minuti, 1–2 volte al giorno." },
      { nome: "Petali in cucina", ricetta: "Petali freschi o essiccati per insalate, risotti e burro aromatizzato.", dose: "Piccole quantità come decorazione." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "Uso topico sicuro; l'assunzione orale in dosi elevate va concordata.",
      allattamento: "Uso topico compatibile; evitare ingestione di grandi quantità.",
      bambini: "Uso topico adatto, con test su piccola area; i petali in cucina sono sicuri.",
      controindicazioni: ["Allergia alle Asteraceae", "Ferite profonde o infette (richiedono il medico)"],
      interazioni: ["Sedativi (teorico, per l'uso orale ad alte dosi)", "Anticoagulanti (teorico)"],
      nota: "Non applicare su ferite profonde, sanguinanti o infette. In caso di allergia alle composite, evitare."
    },
    sosia: [
      { nome: "Arnica (Arnica montana)", rischio: "Fiori gialli simili: l'arnica è tossica per uso interno e non va confusa con la calendula." }
    ],
    fito: { commestibile: true, parti: "Petali", stagione: "Primavera–autunno", cucina: "Insalate, risotti, formaggi freschi, dolci; i petali colorano di giallo.", nota: "Usare solo fiori coltivati senza trattamenti e ben lavati." },
    evidenza: "Diversi studi su creme e unguenti mostrano benefici su ferite superficiali e dermatiti, con qualità variabile. L'uso orale è meno studiato. Il profilo di sicurezza topico è buono.",
    curiosita: "Il nome calendula deriva dalle calende, il primo giorno del mese romano: la pianta fiorisce quasi tutto l'anno. Nel Medioevo era chiamata «sposa del sole».",
    fonti: [
      { t: "EMA · Calendula officinalis", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Calendula wound healing", u: "https://pubmed.ncbi.nlm.nih.gov/?term=calendula+wound+healing" },
      { t: "NIH · Calendula", u: "https://www.nccih.nih.gov/health/calendula" }
    ]
  },

  {
    id: "rosa-canina",
    nome: "Rosa canina",
    latino: "Rosa canina",
    famiglia: "Rosaceae",
    nomi: ["Rosa canina", "Rosa selvatica", "Cinorrodo"],
    tono: 3,
    categorie: ["Officinale", "Alimentare", "Fitoalimurgia"],
    sintesi: "Il rosso dell'autunno: vitamina C, antiossidanti e confetture di siepe.",
    descrizione: "Arbusto spinoso con fiori rosa pallido in primavera e falsi frutti rossi (cinorrodi) in autunno. I cinorrodi sono una delle fonti vegetali più ricche di vitamina C e contengono flavonoidi e carotenoidi. Si usano per sciroppi, confetture e tisane, oltre che come integratore antiossidante. I peli interni dei semi sono irritanti e vanno eliminati.",
    parti: ["Cinorrodi (falsi frutti)", "Petali"],
    habitat: "Siepi, margini di boschi, scarpate, fino a 1.800 m.",
    raccolta: { mesi: [9, 10, 11], nota: "Raccogliere i cinorrodi ben maturi, dopo le prime gelate; i petali in primavera, con tempo asciutto." },
    proprieta: ["Vitaminizzante", "Antiossidante", "Astringente", "Antinfiammatoria lieve", "Immunostimolante tradizionale"],
    usi: [
      "Apporto di vitamina C in autunno e inverno",
      "Sostegno antiossidante",
      "Tisane e sciroppi per la gola",
      "Dolori articolari (studi preliminari)",
      "Confetture e gelatine selvatiche"
    ],
    preparazioni: [
      { nome: "Infuso di cinorrodi", ricetta: "1–2 cucchiaini di cinorrodi spezzati e puliti in 200 ml di acqua a 90 °C per 10 minuti.", dose: "1–2 tazze al giorno." },
      { nome: "Sciroppo", ricetta: "Decotto concentrato di cinorrodi, filtrato e addolcito con zucchero o miele; conservare in frigorifero.", dose: "1 cucchiaio al giorno, o secondo gradimento." },
      { nome: "Confettura", ricetta: "Cinorrodi puliti, zucchero e limone, cottura lunga; passare al setaccio per eliminare peli e semi.", dose: "Come alimento, in porzioni normali." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "Uso alimentare sicuro; evitare integratori ad alte dosi di vitamina C senza parere.",
      allattamento: "Uso alimentare sicuro.",
      bambini: "Adatta come alimento; attenzione ai peli interni e ai semi.",
      controindicazioni: ["Calcolosi renale (cautela per l'alto contenuto di vitamina C)", "Allergia alle Rosaceae"],
      interazioni: ["Anticoagulanti (teorico per alte dosi di vitamina C)", "Farmaci per la glicemia: monitorare se si usano grandi quantità"],
      nota: "I peli interni dei cinorrodi possono irritare la gola e la pelle: pulire bene i frutti prima dell'uso."
    },
    sosia: [
      { nome: "Rosa rugosa e rose ornamentali", rischio: "Frutti generalmente commestibili ma diversi; non raccogliere rose trattate con pesticidi." }
    ],
    fito: { commestibile: true, parti: "Cinorrodi, petali", stagione: "Autunno per i frutti, primavera per i petali", cucina: "Confetture, sciroppi, tisane, gelatine, petali canditi.", nota: "Eliminare semi e peli; evitare frutti da cespugli vicini a strade trafficate." },
    evidenza: "Il contenuto di vitamina C è ben documentato. Studi preliminari su polvere di rosa canina suggeriscono un possibile beneficio sui dolori articolari, ma le prove sono limitate. L'uso alimentare è sicuro.",
    curiosita: "Durante la Seconda guerra mondiale, in Gran Bretagna si raccoglievano i cinorrodi per integrare la vitamina C, scarsa per le restrizioni alimentari.",
    fonti: [
      { t: "PubMed · Rosa canina", u: "https://pubmed.ncbi.nlm.nih.gov/?term=rosa+canina+osteoarthritis" },
      { t: "NIH · Vitamin C", u: "https://ods.od.nih.gov/factsheets/VitaminC-Consumer/" },
      { t: "EFSA · Fonti di vitamina C", u: "https://www.efsa.europa.eu/" }
    ]
  },

  {
    id: "sambuco",
    nome: "Sambuco",
    latino: "Sambucus nigra",
    famiglia: "Adoxaceae",
    nomi: ["Sambuco", "Sambuco nero", "Elderberry"],
    tono: 4,
    categorie: ["Officinale", "Alimentare", "Fitoalimurgia"],
    sintesi: "Fiori per sudare, bacche per l'inverno: ma tutto va cotto, mai crudo.",
    descrizione: "Arbusto o piccolo albero con grandi ombrelle di fiori bianchi in primavera e grappoli di bacche nere in autunno. I fiori sono diaforetici e usati per le vie respiratorie; le bacche, ricche di antociani, si trasformano in sciroppi e confetture. Le parti crude contengono glicosidi cianogenici: fiori e bacche vanno sempre cotti, e foglie, corteccia e radici non si usano.",
    parti: ["Fiori", "Bacche mature"],
    habitat: "Margini di boschi, siepi, ruderi, terreni ricchi di azoto.",
    raccolta: { mesi: [5, 6, 8, 9], nota: "Fiori in maggio-giugno con tempo asciutto; bacche ben mature in agosto-settembre. Non raccogliere parti verdi." },
    proprieta: ["Diaforetica", "Espettorante", "Antinfiammatoria", "Antiossidante", "Antivirale (studi preliminari)"],
    usi: [
      "Febbre lieve e raffreddore (fiori, come supporto)",
      "Tosse e catarro",
      "Sciroppi di stagione a base di bacche cotte",
      "Sostegno antiossidante",
      "Confetture e gelatine"
    ],
    preparazioni: [
      { nome: "Infuso di fiori", ricetta: "1–2 g di fiori secchi in 200 ml di acqua a 90 °C per 10 minuti.", dose: "2–3 tazze al giorno, calde, nei primi giorni di raffreddore." },
      { nome: "Sciroppo di bacche", ricetta: "Bacche mature cotte con poca acqua, passate e addolcite; bollire e invasare. Conservare in frigorifero.", dose: "1 cucchiaio 2–3 volte al giorno, per adulti e ragazzi." },
      { nome: "Confettura", ricetta: "Bacche cotte con zucchero e limone, passate al setaccio per eliminare i semi.", dose: "Come alimento, in porzioni normali." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare preparati concentrati e bacche in quantità; l'uso alimentare occasionale cotto va concordato.",
      allattamento: "Dati insufficienti: evitare integratori concentrati.",
      bambini: "Sciroppo solo dopo parere pediatrico; mai miele sotto i 12 mesi. Non usare parti crude.",
      controindicazioni: ["Uso di parti crude (fiori e bacche non cotti)", "Foglie, corteccia e radici (tossiche)", "Malattie autoimmuni (cautela)", "Uso con immunosoppressori"],
      interazioni: ["Diuretici", "Antidiabetici", "Immunosoppressori", "Teofillina (teorico)"],
      nota: "I fiori e le bacche crude possono causare nausea, vomito e diarrea per i glicosidi cianogenici. Cuocere sempre e non usare foglie o corteccia."
    },
    sosia: [
      { nome: "Sambuco erbaceo (Sambucus ebulus)", rischio: "Pianta velenosa, più bassa, con odore sgradevole e bacche nerastre: non raccogliere." },
      { nome: "Altri arbusti con bacche nere", rischio: "Diverse specie sono tossiche; identificare con certezza prima di qualunque uso alimentare." }
    ],
    fito: { commestibile: true, parti: "Fiori cotti o in infuso, bacche cotte", stagione: "Primavera per i fiori, fine estate per le bacche", cucina: "Frittelle di fiori, sciroppi, confetture, gelatine; i fiori si usano anche per aromatizzare.", nota: "Mai consumare crudo. Eliminare i piccioli verdi e cuocere bene le bacche." },
    evidenza: "Alcuni studi suggeriscono una riduzione della durata dei sintomi del raffreddore con estratti di sambuco, ma i lavori sono piccoli e spesso finanziati dai produttori. Le prove sono limitate. La sicurezza impone la cottura.",
    curiosita: "In Europa il sambuco era chiamato «la farmacia del contadino»: fiori, bacche e corteccia avevano usi diversi. Le sue bacche colorano il vino e le conserve.",
    fonti: [
      { t: "EMA · Sambucus nigra", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Elderberry cold", u: "https://pubmed.ncbi.nlm.nih.gov/?term=sambucus+nigra+cold" },
      { t: "NIH · Elderberry", u: "https://www.nccih.nih.gov/health/elderberry" }
    ]
  }

]);

NP.plants = NP.plants.concat([

  {
    id: "piantaggine",
    nome: "Piantaggine",
    latino: "Plantago lanceolata",
    famiglia: "Plantaginaceae",
    nomi: ["Piantaggine", "Lingua di cane", "Cinquenervi"],
    tono: 4,
    categorie: ["Officinale", "Alimentare", "Fitoalimurgia"],
    sintesi: "La foglia dalle cinque nervature: calma la tosse e aiuta la pelle a riparare.",
    descrizione: "Pianta erbacea perenne con foglie lanceolate disposte a rosetta e nervature parallele molto evidenti. La piantaggine è un rimedio popolare per la tosse e le irritazioni delle mucose, grazie alle mucillagini e all'aucubina. Le foglie giovani sono commestibili e le infiorescenze si possono usare in insalata. Cresce ovunque, anche nei prati calpestati.",
    parti: ["Foglie", "Semi", "Infiorescenze"],
    habitat: "Prati, incolti, bordi strada, giardini, terreni compatti.",
    raccolta: { mesi: [4, 5, 6, 7, 8, 9], nota: "Raccogliere foglie giovani e tenere; i semi maturano in estate e si raccolgono quando la spiga è secca." },
    proprieta: ["Emolliente", "Antitussiva", "Antinfiammatoria", "Cicatrizzante", "Lassativa lieve (semi)"],
    usi: [
      "Tosse secca e irritazione della gola",
      "Gastrite e bruciore lieve",
      "Piccole ferite e punture di insetto (impacco)",
      "Stitichezza occasionale (semi)",
      "Insalate e minestre di campo"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1–2 g di foglie secche in 200 ml di acqua a 90 °C per 10 minuti.", dose: "2–3 tazze al giorno." },
      { nome: "Sciroppo", ricetta: "Infuso concentrato addolcito con miele, filtrato; conservare in frigorifero.", dose: "1 cucchiaino 2–3 volte al giorno, solo dopo i 12 mesi per il miele." },
      { nome: "Impacco", ricetta: "Foglie fresche lavate e schiacciate, oppure infuso concentrato su garza.", dose: "10–15 minuti sulla zona, 1–2 volte al giorno." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "Considerata sicura in infuso e come alimento.",
      allattamento: "Compatibile in infuso.",
      bambini: "Adatta anche ai bambini in infuso leggero; miele solo dopo i 12 mesi.",
      controindicazioni: ["Occlusione intestinale (semi)", "Allergia alle Plantaginaceae (rara)"],
      interazioni: ["Mucillagini: possono ritardare l'assorbimento di farmaci orali. Distanziare di 2 ore."],
      nota: "Bere acqua a sufficienza con i semi. Non usare come lassativo per lunghi periodi."
    },
    sosia: [
      { nome: "Piantaggine maggiore (Plantago major)", rischio: "Non tossica, proprietà simili; foglie più larghe." }
    ],
    fito: { commestibile: true, parti: "Foglie giovani, infiorescenze", stagione: "Primavera–estate", cucina: "Insalate, minestre, frittate, pesto; le spighe tenere si saltano in padella.", nota: "Le foglie vecchie sono fibrose e amare; raccogliere il cuore tenero." },
    evidenza: "L'azione emolliente e antinfiammatoria è plausibile per le mucillagini; gli studi clinici specifici sono scarsi. Il profilo di sicurezza è favorevole. I semi hanno un effetto lassativo di tipo mucillaginoso, simile a psillio.",
    curiosita: "Il nome latino planta deriva da «pianta del piede»: cresce dove si cammina. In Inghilterra è chiamata ribwort plantain e i bambini giocano a sfidarsi con le spighe.",
    fonti: [
      { t: "EMA · Plantago lanceolata", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Plantago cough", u: "https://pubmed.ncbi.nlm.nih.gov/?term=plantago+lanceolata+cough" },
      { t: "Ministero della Salute · Erbe", u: "https://www.salute.gov.it/" }
    ]
  },

  {
    id: "borragine",
    nome: "Borragine",
    latino: "Borago officinalis",
    famiglia: "Boraginaceae",
    nomi: ["Borragine", "Borrana", "Starflower"],
    tono: 1,
    categorie: ["Officinale", "Alimentare", "Fitoalimurgia"],
    sintesi: "Fiori azzurri e foglie pelose: buona in cucina, ma da usare con prudenza e senza eccessi.",
    descrizione: "Pianta erbacea annuale con foglie coperte di peli ispidi e fiori stellati azzurri. In cucina si usano foglie giovani e fiori, con sapore che ricorda il cetriolo. In fitoterapia è tradizionalmente usata come emolliente e per il benessere femminile, ma contiene alcaloidi pirrolizidinici epatotossici: l'uso interno va limitato e non è adatto a gravidanza, allattamento e bambini.",
    parti: ["Foglie giovani", "Fiori"],
    habitat: "Incolti, orti, bordi strada, terreni ricchi; coltivata e naturalizzata.",
    raccolta: { mesi: [4, 5, 6, 7], nota: "Raccogliere foglie giovani prima della fioritura e fiori appena aperti; non usare foglie vecchie e pelose." },
    proprieta: ["Emolliente", "Antinfiammatoria", "Galattagoga tradizionale", "Diaforetica", "Antiossidante"],
    usi: [
      "Irritazioni cutanee e impacchi lenitivi",
      "Tosse e irritazione della gola (uso occasionale)",
      "Tradizione del sostegno all'allattamento (solo con parere)",
      "Fiori in insalata e bevande",
      "Foglie cotte in minestre"
    ],
    preparazioni: [
      { nome: "Infuso occasionale", ricetta: "1 g di foglie e fiori secchi in 200 ml di acqua a 90 °C per 5–7 minuti.", dose: "1 tazza al giorno per pochi giorni; preferire miscele senza borragine per l'uso quotidiano." },
      { nome: "Fiori canditi", ricetta: "Fiori freschi spennellati con albume e zucchero, essiccati.", dose: "Decorazione occasionale." },
      { nome: "Impacco", ricetta: "Infuso concentrato e raffreddato su garza.", dose: "10 minuti su pelle irritata, previo test." }
    ],
    sicurezza: {
      livello: "rosso",
      gravidanza: "Controindicata: gli alcaloidi pirrolizidinici sono epatotossici e possono attraversare la placenta.",
      allattamento: "Controindicata: gli alcaloidi passano nel latte.",
      bambini: "Controindicata per l'uso interno; i fiori come decorazione occasionale solo dopo i 3 anni.",
      controindicazioni: ["Gravidanza e allattamento", "Bambini", "Malattie epatiche", "Uso interno prolungato", "Uso di oli di semi non raffinati"],
      interazioni: ["Farmaci epatotossici", "Farmaci metabolizzati dal fegato: cautela"],
      nota: "Gli alcaloidi pirrolizidinici (PA) sono la ragione principale della cautela. L'olio di semi di borragine, ricco di GLA, è un prodotto diverso e privo di PA, ma va usato su parere. Non usare foglie e fiori come rimedio quotidiano."
    },
    sosia: [
      { nome: "Cynoglossum e altre boraginacee selvatiche", rischio: "Alcune contengono PA in quantità maggiori: non raccogliere piante simili senza esperienza." }
    ],
    fito: { commestibile: true, parti: "Foglie giovani, fiori", stagione: "Primavera", cucina: "Frittate, minestre, ravioli, insalate; i fiori azzurri in bevande e dolci.", nota: "Usare solo foglie giovani e in piccole quantità. Sbollentare le foglie. Non consumare cruda in grandi quantità." },
    evidenza: "Le prove cliniche sono molto limitate. L'olio di semi (GLA) è stato studiato in dermatologia e per la sindrome premestruale con risultati incerti. La cautela epatica è basata su dati tossicologici consolidati.",
    curiosita: "Il nome borrago sembra derivare dall'arabo abu-raq, «padre del sudore», per l'uso diaforetico. I fiori azzurri sono tra i pochi coloranti naturali blu commestibili.",
    fonti: [
      { t: "EFSA · Alcaloidi pirrolizidinici", u: "https://www.efsa.europa.eu/" },
      { t: "EMA · Borago officinalis", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Borage safety", u: "https://pubmed.ncbi.nlm.nih.gov/?term=borago+officinalis+pyrrolizidine" }
    ]
  }

]);

NP.plants = NP.plants.concat([

  {
    id: "aglio-orsino",
    nome: "Aglio orsino",
    latino: "Allium ursinum",
    famiglia: "Amaryllidaceae",
    nomi: ["Aglio orsino", "Aglio selvatico", "Ramsons"],
    tono: 4,
    categorie: ["Officinale", "Alimentare", "Fitoalimurgia"],
    sintesi: "Profumo d'aglio nel bosco: delizia di primavera, ma con sosia mortali da conoscere.",
    descrizione: "Pianta erbacea bulbosa che forma tappeti verdi nei boschi umidi in primavera, con foglie larghe e lanceolate e fiori bianchi a stella. Ha un profumo intenso di aglio che si sprigiona strofinando le foglie. È una prelibatezza di stagione e un rimedio tradizionale, ma la raccolta richiede estrema attenzione: le sue foglie assomigliano a quelle di piante molto velenose.",
    parti: ["Foglie", "Fiori", "Bulbo"],
    habitat: "Boschi umidi di latifoglie, suoli ricchi, fino a 1.500 m.",
    raccolta: { mesi: [3, 4, 5], nota: "Raccogliere solo foglie con odore netto di aglio, prima della fioritura; non estirpare i bulbi se non si possiede il terreno." },
    proprieta: ["Antimicrobico", "Antipertensivo lieve", "Antiaggregante", "Antiossidante", "Espettorante"],
    usi: [
      "Aroma in cucina e pesto selvatico",
      "Supporto alla salute cardiovascolare (come l'aglio comune)",
      "Condimento per insalate, minestre e frittate",
      "Tradizione per le vie respiratorie"
    ],
    preparazioni: [
      { nome: "Pesto di aglio orsino", ricetta: "Foglie lavate e asciugate, frullate con olio, sale e pinoli o mandorle; conservare in frigorifero pochi giorni.", dose: "Come condimento, in piccole quantità." },
      { nome: "Frittata", ricetta: "Foglie tagliate e saltate in padella con olio, poi uova sbattute.", dose: "Porzione normale, come piatto stagionale." },
      { nome: "Burro aromatico", ricetta: "Foglie tritate finemente mescolate a burro morbido, poi raffreddare.", dose: "Piccole porzioni." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Uso alimentare occasionale accettabile; evitare integratori concentrati.",
      allattamento: "Uso alimentare occasionale; evitare concentrati.",
      bambini: "Solo come alimento cotto e in piccole quantità; la raccolta va fatta da adulti esperti.",
      controindicazioni: ["Disturbi della coagulazione", "Intervento chirurgico imminente", "Gastrite e reflusso", "Allergia alle Amaryllidaceae"],
      interazioni: ["Anticoagulanti e antiaggreganti", "Farmaci antipertensivi", "Antidiabetici", "Inibitori di pompa: possibile riduzione dell'efficacia"],
      nota: "SOSPENDERE 7–10 GIORNI PRIMA DI UN INTERVENTO CHIRURGICO. Non raccogliere mai senza la certezza assoluta: mughetto e colchico possono essere mortali."
    },
    sosia: [
      { nome: "Mughetto (Convallaria majalis)", rischio: "MORTALE. Foglie simili, ma nessun odore di aglio; fiori bianchi a campanella. Contiene glicosidi cardiaci." },
      { nome: "Colchico autunnale (Colchicum autumnale)", rischio: "MORTALE. Foglie larghe simili in primavera, fiori viola in autunno. Contiene colchicina." },
      { nome: "Veratro bianco (Veratrum album)", rischio: "MORTALE. Foglie a pieghe, crescita in montagna; contiene alcaloidi tossici." }
    ],
    fito: { commestibile: true, parti: "Foglie e fiori", stagione: "Primavera", cucina: "Pesto, frittate, minestre, burri aromatici, insalate; i fiori decorano.", nota: "Strofinare una foglia: deve profumare chiaramente di aglio. In caso di dubbio, non raccogliere e non assaggiare." },
    evidenza: "Le proprietà antimicrobiche e cardiovascolari sono simili a quelle dell'aglio comune, ma gli studi specifici sull'aglio orsino sono pochi. L'attenzione maggiore riguarda l'identificazione botanica e le interazioni.",
    curiosita: "Il nome ursinum deriva dall'orso, che in primavera si diceva cercasse queste foglie per depurarsi dopo il letargo. In Germania è chiamato Bärlauch, «aglio degli orsi».",
    fonti: [
      { t: "PubMed · Allium ursinum", u: "https://pubmed.ncbi.nlm.nih.gov/?term=allium+ursinum" },
      { t: "EFSA · Allium e sicurezza", u: "https://www.efsa.europa.eu/" },
      { t: "Ministero della Salute · Raccolta funghi e piante", u: "https://www.salute.gov.it/" }
    ]
  },

  {
    id: "cicoria",
    nome: "Cicoria selvatica",
    latino: "Cichorium intybus",
    famiglia: "Asteraceae",
    nomi: ["Cicoria", "Radicchio selvatico", "Cicoria comune"],
    tono: 2,
    categorie: ["Officinale", "Alimentare", "Fitoalimurgia"],
    sintesi: "L'amaro dei prati: sveglia il gusto, la digestione e la tavola.",
    descrizione: "Pianta erbacea perenne con fiori azzurri che si aprono al mattino e foglie dalla forma variabile. La cicoria selvatica è un'amara preziosa: in cucina si usano foglie, radici e talvolta i fiori; in fitoterapia è un digestivo e un blando epatobiliare. La radice tostata è il tradizionale surrogato del caffè, ancora oggi diffuso nel Sud Italia.",
    parti: ["Foglie", "Radice", "Fiori"],
    habitat: "Prati, incolti, bordi strada, terreni calcarei.",
    raccolta: { mesi: [3, 4, 5, 9, 10, 11], nota: "Foglie tenere in primavera e autunno; radici in autunno. Evitare zone trattate o inquinate." },
    proprieta: ["Amara digestiva", "Colagoga", "Prebiotica (inulina)", "Diuretica lieve", "Lassativa lieve"],
    usi: [
      "Digestione lenta e gonfiore",
      "Sostegno alla funzionalità epatobiliare",
      "Stitichezza lieve (radice, inulina)",
      "Insalate e contorni di campo",
      "Caffè di cicoria"
    ],
    preparazioni: [
      { nome: "Insalata di campo", ricetta: "Foglie tenere lavate e centrifugare, condire con olio, limone e sale.", dose: "Porzione normale; l'amaro può essere attenuato con un breve ammollo." },
      { nome: "Decotto di radice", ricetta: "1–2 g di radice essiccata in 250 ml di acqua, bollire 10 minuti.", dose: "1 tazza al giorno prima dei pasti, per periodi brevi." },
      { nome: "Caffè di cicoria", ricetta: "Radici lavate, tagliate, essiccate e tostate in forno fino a doratura; macinare e preparare come il caffè.", dose: "1 tazza al giorno; senza caffeina." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "Uso alimentare accettabile; evitare estratti concentrati e dosi elevate.",
      allattamento: "Uso alimentare accettabile; evitare dosi terapeutiche.",
      bambini: "Adatta come alimento; infuso leggero dopo i 6 anni.",
      controindicazioni: ["Calcolosi biliare sintomatica", "Ostruzione dei dotti biliari", "Allergia alle Asteraceae", "Gastrite in fase acuta"],
      interazioni: ["Antidiabetici: possibile effetto ipoglicemizzante", "Diuretici", "Farmaci assorbiti: la fibra può ridurre l'assorbimento"],
      nota: "L'amaro può essere sgradevole a stomaco vuoto. Evitare grandi quantità in chi ha calcoli biliari."
    },
    sosia: [
      { nome: "Tarassaco", rischio: "Non tossico, ma riconoscere le differenze: foglie e fiori diversi." },
      { nome: "Altre composite a fiore azzurro", rischio: "Identificare con certezza; non tutte sono commestibili." }
    ],
    fito: { commestibile: true, parti: "Foglie, radice, fiori", stagione: "Primavera e autunno", cucina: "Insalate, ripassi in padella, minestre, frittate, caffè di radice.", nota: "Le foglie primaverili sono più tenere; in autunno la radice è più dolce." },
    evidenza: "L'effetto amaro e il contenuto di inulina sono ben documentati; le prove cliniche su digestione e glicemia sono limitate. L'uso alimentare è sicuro e tradizionale.",
    curiosita: "La cicoria era coltivata dagli Egizi e dai Romani. Nel Settecento la radice tostata divenne un surrogato del caffè molto diffuso in Europa.",
    fonti: [
      { t: "EMA · Cichorium intybus", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Chicory inulin", u: "https://pubmed.ncbi.nlm.nih.gov/?term=cichorium+intybus+inulin" },
      { t: "EFSA · Inulina", u: "https://www.efsa.europa.eu/" }
    ]
  }

]);

NP.plants = NP.plants.concat([

  {
    id: "olivo",
    nome: "Olivo",
    latino: "Olea europaea",
    famiglia: "Oleaceae",
    nomi: ["Olivo", "Ulivo", "Olive"],
    tono: 4,
    categorie: ["Officinale", "Alimentare"],
    sintesi: "Le foglie dell'albero mediterraneo: pressione, glicemia e antiossidanti.",
    descrizione: "Albero sempreverde simbolo del Mediterraneo, con foglie argentate e frutti oleosi. Le foglie, spesso considerate uno scarto della potatura, sono ricche di oleuropeina e idrossitirosolo, antiossidanti studiati per il sostegno cardiovascolare. L'olio extravergine è il vero protagonista della dieta mediterranea; le foglie in infuso sono un rimedio tradizionale per pressione e glicemia.",
    parti: ["Foglie", "Frutti", "Olio extravergine"],
    habitat: "Clima mediterraneo, colline e coste; coltivato in tutta Italia.",
    raccolta: { mesi: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], nota: "Le foglie si raccolgono tutto l'anno, preferibilmente dai rami potati; essiccare all'ombra." },
    proprieta: ["Antipertensiva", "Antiossidante", "Ipoglicemizzante lieve", "Antinfiammatoria", "Vasoprotettrice"],
    usi: [
      "Pressione lievemente alta (come coadiuvante)",
      "Sostegno antiossidante",
      "Glicemia lievemente alterata (come supporto)",
      "Infuso tradizionale per la circolazione",
      "Olio extravergine in cucina"
    ],
    preparazioni: [
      { nome: "Infuso di foglie", ricetta: "1–2 g di foglie essiccate in 200 ml di acqua a 90 °C per 10 minuti.", dose: "1–2 tazze al giorno, per cicli di alcune settimane." },
      { nome: "Decotto", ricetta: "1 g di foglie in 250 ml di acqua, bollire 5–8 minuti.", dose: "1 tazza al giorno, lontano dai pasti." },
      { nome: "Uso culinario", ricetta: "Olio extravergine a crudo su verdure, legumi e pane; olive come alimento.", dose: "2–3 cucchiai di olio al giorno, nell'ambito di una dieta equilibrata." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Uso alimentare sicuro; evitare estratti concentrati senza parere.",
      allattamento: "Uso alimentare sicuro; cautela con estratti.",
      bambini: "Uso alimentare; infuso leggero solo dopo parere.",
      controindicazioni: ["Pressione molto bassa", "Uso al posto dei farmaci antipertensivi", "Allergia alle Oleaceae", "Calcolosi biliare (cautela)"],
      interazioni: ["Antipertensivi: possibile sommazione", "Antidiabetici: monitorare la glicemia", "Diuretici", "Litio (teorico)"],
      nota: "Non sospendere i farmaci per la pressione. Se si è ipotesi, l'infuso può accentuare il calo pressorio."
    },
    sosia: [
      { nome: "Oleandro (Nerium oleander)", rischio: "MORTALE. Pianta ornamentale con foglie simili ma fiori vistosi; contiene glicosidi cardiaci. Non confondere mai." }
    ],
    fito: { commestibile: true, parti: "Frutti (olive), olio; foglie per infusi", stagione: "Autunno per le olive, tutto l'anno per le foglie", cucina: "Olio extravergine, olive in salamoia, foglie per aromatizzare arrosti.", nota: "Le olive crude sono amare e non commestibili: richiedono salamoia o lavorazione. Non usare foglie da piante trattate." },
    evidenza: "Diverse revisioni suggeriscono un effetto modesto ma reale dell'estratto di foglie di olivo sulla pressione arteriosa e sui lipidi. Per la glicemia le prove sono preliminari. L'olio extravergine ha una solida evidenza cardiovascolare come alimento.",
    curiosita: "L'olivo può vivere migliaia di anni: in Puglia e in Sardegna esistono esemplari millenari. Una foglia di olivo è un simbolo di pace fin dall'antichità.",
    fonti: [
      { t: "EMA · Olea europaea", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Olive leaf blood pressure", u: "https://pubmed.ncbi.nlm.nih.gov/?term=olive+leaf+blood+pressure+meta-analysis" },
      { t: "EFSA · Polifenoli dell'olivo", u: "https://www.efsa.europa.eu/" }
    ]
  },

  {
    id: "alloro",
    nome: "Alloro",
    latino: "Laurus nobilis",
    famiglia: "Lauraceae",
    nomi: ["Alloro", "Lauro", "Bay laurel"],
    tono: 1,
    categorie: ["Officinale", "Aromatica", "Alimentare"],
    sintesi: "La foglia nobile della cucina mediterranea: aroma, digestione e antiche corone.",
    descrizione: "Albero sempreverde aromatico con foglie coriacee e lucide. L'alloro è una spezia fondamentale in cucina, usata in brodi, arrosti e conserve. In fitoterapia le foglie sono un blando digestivo e carminativo; l'olio essenziale, ricco di eucaliptolo e altri composti, va usato solo per via esterna e con cautela. Le foglie intere non sono commestibili.",
    parti: ["Foglie", "Bacche"],
    habitat: "Macchia mediterranea, pendii e giardini; coltivato in tutta Italia.",
    raccolta: { mesi: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], nota: "Raccogliere foglie sane tutto l'anno; essiccare all'ombra e conservare in barattolo chiuso." },
    proprieta: ["Digestiva", "Carminativa", "Aromatica", "Antisettica lieve", "Antiossidante"],
    usi: [
      "Aroma in brodi, arrosti, legumi e conserve",
      "Digestione difficile (infuso leggero)",
      "Gonfiore e meteorismo (tradizione)",
      "Ambiente profumato e repellente naturale"
    ],
    preparazioni: [
      { nome: "Infuso digestivo", ricetta: "1 foglia secca (o mezza fresca) in 200 ml di acqua a 90 °C per 8 minuti.", dose: "1 tazza dopo il pasto; rimuovere la foglia prima di bere." },
      { nome: "Brodo aromatico", ricetta: "1–2 foglie in pentola con verdure e carne, per almeno 30 minuti; eliminare le foglie.", dose: "Come condimento." },
      { nome: "Olio essenziale (esterno)", ricetta: "1–2 gocce in 10 ml di olio vettore per massaggi.", dose: "Solo diluito; evitare su bambini, gravidanza e pelli sensibili." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "Uso culinario sicuro; evitare olio essenziale e dosi elevate.",
      allattamento: "Uso culinario sicuro; evitare olio essenziale.",
      bambini: "Non usare olio essenziale; attenzione alle foglie intere (rischio di soffocamento).",
      controindicazioni: ["Allergia alle Lauraceae", "Uso interno di olio essenziale", "Foglie intere ingerite"],
      interazioni: ["Sedativi (olio essenziale, teorico)", "Anticoagulanti (teorico)"],
      nota: "Le foglie intere sono rigide e possono ostruire le vie aeree, soprattutto nei bambini: usare solo per aromatizzare e poi rimuovere."
    },
    sosia: [],
    fito: { commestibile: true, parti: "Foglie (aroma, non ingerite intere)", stagione: "Tutto l'anno", cucina: "Brodi, arrosti, patate, legumi, conserve, olio aromatizzato.", nota: "Rimuovere sempre le foglie intere prima di servire; in polvere se ne usa un pizzico." },
    evidenza: "L'uso come aroma e digestivo è tradizionale; gli studi clinici specifici sono molto limitati. L'olio essenziale ha attività antimicrobica in vitro, ma il profilo di sicurezza ne limita l'uso interno.",
    curiosita: "Nell'antica Roma le corone di alloro erano il simbolo della vittoria e della gloria poetica: da qui il termine «alloro» per un riconoscimento. La pianta era sacra ad Apollo.",
    fonti: [
      { t: "EMA · Laurus nobilis", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Laurus nobilis", u: "https://pubmed.ncbi.nlm.nih.gov/?term=laurus+nobilis" },
      { t: "EFSA · Aromi e oli essenziali", u: "https://www.efsa.europa.eu/" }
    ]
  }

]);

