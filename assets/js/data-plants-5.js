/* ==========================================================================
   Naturopata Digitale · Erbario, parte quinta
   Nuove schede O–Z: usi tradizionali, sicurezza e fonti.
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.plants = NP.plants.concat([

  {
    id: "origano",
    nome: "Origano",
    latino: "Origanum vulgare",
    famiglia: "Lamiaceae",
    nomi: ["Origano comune", "Rigamo", "Maggiorana selvatica"],
    tono: 1,
    categorie: ["Aromatica", "Alimentare", "Officinale"],
    sintesi: "Il profumo della macchia mediterranea: spezia quotidiana e blando aiuto per la digestione.",
    descrizione: "Pianta erbacea perenne con fusti sottili, foglie ovali e fiori bianco-rosati in corimbi. Cresce su pendii aridi e muri, spesso insieme al timo. L'aroma viene dal carvacrolo e dal timolo, più abbondanti nell'olio essenziale che nella foglia secca. In cucina è una spezia insostituibile; come rimedio è soprattutto un digestivo tradizionale.",
    parti: ["Foglie", "Sommità fiorite"],
    habitat: "Pendii aridi, muri, incolti e garighe, dal piano alla collina.",
    raccolta: { mesi: [6, 7, 8, 9], nota: "Si tagliano i fusti fioriti e si essiccano all'ombra, in mazzi appesi; le foglie si separano quando sono secche." },
    proprieta: ["Carminativo", "Digestivo", "Espettorante tradizionale", "Antimicrobico", "Antiossidante"],
    usi: [
      "Digestione lenta, gonfiore e meteorismo",
      "Tosse e catarro, come bevanda calda",
      "Aromatizzazione di pizza, sughi, verdure e carni",
      "Tradizione popolare per la gola",
      "Conservazione degli alimenti con olio e sale"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1 g di foglie e sommità essiccate in 200 ml di acqua a 90 °C per 6–8 minuti.", dose: "Una tazza dopo i pasti." },
      { nome: "Olio all'origano", ricetta: "Foglie essiccate in olio di oliva, al buio per 2–3 settimane, poi filtrare.", dose: "Uso culinario, poche gocce; non è un antibiotico." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "L'uso come spezia è sicuro. Evitare oli essenziali e integratori concentrati: dati insufficienti.",
      allattamento: "Uso alimentare compatibile. Evitare oli essenziali.",
      bambini: "Uso come spezia normale. Mai olio essenziale per via interna.",
      controindicazioni: ["Allergia alle Lamiaceae", "Uso interno di olio essenziale puro", "Reflusso grave"],
      interazioni: ["Anticoagulanti: cautela teorica con estratti concentrati", "Sedativi: effetto additivo lieve"],
      nota: "L'olio essenziale di origano è molto concentrato e irritante: non ingerirlo in gocce e non applicarlo puro. L'origano non cura le infezioni batteriche."
    },
    sosia: [
      { nome: "Maggiorana e altre Lamiaceae", rischio: "Le aromatiche si somigliano: l'origano ha fiori in corimbi e profumo più intenso della maggiorana." }
    ],
    fito: { commestibile: true, parti: "Foglie, fiori", stagione: "Primavera–autunno", cucina: "Pizza, sughi, verdure grigliate, legumi; i fiori per guarnire.", nota: "Aggiungere l'origano a fine cottura per conservare l'aroma. Lavare le foglie fresche." },
    evidenza: "L'effetto carminativo e antimicrobico è documentato soprattutto in laboratorio; gli studi clinici sull'uomo sono pochi. Il beneficio in cucina è reale, quello terapeutico modesto.",
    curiosita: "L'origano contiene timolo e carvacrolo, gli stessi composti che danno al timo il suo profumo. In Sicilia esistono varietà con aromi molto diversi.",
    fonti: [
      { t: "PubMed · Origanum vulgare", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Origanum+vulgare" },
      { t: "EMA · Monografie erboristiche", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products/european-union-monographs-list-entries" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "prezzemolo",
    nome: "Prezzemolo",
    latino: "Petroselinum crispum",
    famiglia: "Apiaceae",
    nomi: ["Prezzemolo comune", "Petrosillo"],
    tono: 1,
    categorie: ["Aromatica", "Alimentare", "Officinale"],
    sintesi: "Il verde più usato in cucina: ottimo condimento, da non trattare come una medicina fai-da-te.",
    descrizione: "Pianta biennale con foglie divise, ricche di olio essenziale, e ombrelle di piccoli fiori giallo-verdi. La radice è carnosa e bianca. Esistono varietà a foglia riccia e a foglia liscia. Il prezzemolo è un alimento e un aromatizzante; gli estratti concentrati e l'olio essenziale hanno un profilo di sicurezza molto diverso.",
    parti: ["Foglie", "Radice", "Frutti"],
    habitat: "Coltivato in orti e vasi; si naturalizza in terreni freschi.",
    raccolta: { mesi: [4, 5, 6, 7, 8, 9, 10, 11], nota: "Si tagliano i ciuffi esterni lasciando il cuore; i frutti si raccolgono in estate." },
    proprieta: ["Aromatizzante", "Carminativo", "Diuretico tradizionale", "Antiossidante", "Ricco di vitamina K"],
    usi: [
      "Aromatizzazione di piatti, salse e insalate",
      "Tradizione popolare per gonfiore e diuresi",
      "Alito e freschezza del cavo orale",
      "Supporto al contenuto di vitamina K e C",
      "Tradizione per i crampi mestruali, con cautela"
    ],
    preparazioni: [
      { nome: "Infuso di foglie", ricetta: "5 g di foglie fresche in 200 ml di acqua a 80 °C per 5 minuti.", dose: "Una tazza occasionale, non un trattamento diuretico." },
      { nome: "Gremolata", ricetta: "Prezzemolo tritato con scorza di limone e aglio, da aggiungere a fine cottura.", dose: "Condimento." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "L'uso come condimento è sicuro. Evitare oli essenziali, semi/frutti in dosi medicinali ed estratti: l'apiolo e la miristicina sono tossici.",
      allattamento: "Uso alimentare compatibile. Evitare oli essenziali e dosi medicinali.",
      bambini: "Uso alimentare normale. Mai olio essenziale.",
      controindicazioni: ["Calcoli renali (ossalati)", "Allergia alle Apiaceae", "Gravidanza (dosi medicinali)", "Uso interno di olio essenziale"],
      interazioni: ["Warfarin: l'alto contenuto di vitamina K può ridurre l'effetto anticoagulante", "Diuretici: effetto additivo", "Farmaci orali: cautela teorica"],
      nota: "L'olio essenziale di prezzemolo contiene apiolo, che può danneggiare il fegato e stimolare l'utero: non va mai ingerito senza indicazione medica. Chi assume warfarin deve mantenere costante l'apporto di vitamina K."
    },
    sosia: [
      { nome: "Cicuta e altre ombrellifere", rischio: "Le ombrelle bianche sono simili e alcune sono mortali. Raccogliere il prezzemolo solo se coltivato o identificato con certezza." }
    ],
    fito: { commestibile: true, parti: "Foglie, radice", stagione: "Primavera–autunno", cucina: "Salse verdi, gremolata, insalate, minestre; la radice in zuppe e padelle.", nota: "Lavare bene le foglie, soprattutto se crude. Il prezzemolo fresco si conserva in frigorifero." },
    evidenza: "L'effetto diuretico è tradizionale e debole; gli studi clinici sono scarsi. Come alimento è ricco di vitamina K e antiossidanti.",
    curiosita: "Il nome latino petroselinum significa «sedano di pietra», per l'ambiente rupestre di alcune specie affini. In cucina il prezzemolo era considerato un rimedio contro l'alito cattivo.",
    fonti: [
      { t: "PubMed · Petroselinum crispum", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Petroselinum+crispum" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" },
      { t: "NCCIH · Erbe e farmaci", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "rabarbaro",
    nome: "Rabarbaro medicinale",
    latino: "Rheum palmatum",
    famiglia: "Polygonaceae",
    nomi: ["Rabarbaro cinese", "Rheum officinale", "Da Huang"],
    tono: 5,
    categorie: ["Officinale"],
    sintesi: "La radice lassativa, non il gambo della torta: due cose diverse con lo stesso nome.",
    descrizione: "Pianta erbacea perenne di grande taglia, con foglie enormi e rizoma carnoso, giallo-bruno. È usata in fitoterapia e nella medicina cinese come lassativo stimolante. Il rabarbaro alimentare dei giardini è una specie diversa e si mangiano i piccioli, non la radice: non vanno confusi.",
    parti: ["Radice e rizoma"],
    habitat: "Montagne dell'Asia centrale e della Cina; coltivato in alcune zone.",
    raccolta: { mesi: [9, 10], nota: "Si estrae la radice da piante mature, si pulisce e si essicca; è un prodotto da erboristeria, non da raccolta fai-da-te." },
    proprieta: ["Lassativa stimolante", "Amaro-tonica", "Astringente a basse dosi", "Antinfiammatoria"],
    usi: [
      "Stitichezza occasionale, con uso breve",
      "Dispepsia, per tradizione",
      "Tradizione cinese per l'intestino, in formulazioni complesse",
      "Non adatto all'uso cronico o all'automedicazione dei bambini",
      "Mai come sostituto di una dieta ricca di fibre"
    ],
    preparazioni: [
      { nome: "Decotto", ricetta: "0,5–1 g di radice essiccata in 250 ml di acqua, bollire 10 minuti; filtrare.", dose: "Una volta al giorno, per non più di 1 settimana, solo per adulti." },
      { nome: "Polvere in compresse", ricetta: "Solo prodotti titolati e con foglietto illustrativo.", dose: "Seguire la posologia del prodotto; non associare altri lassativi." }
    ],
    sicurezza: {
      livello: "rosso",
      gravidanza: "Controindicato: effetto lassativo e stimolante uterino, rischio di disidratazione e squilibri elettrolitici.",
      allattamento: "Controindicato: i metaboliti passano nel latte e possono causare diarrea nel lattante.",
      bambini: "Controindicato sotto i 12 anni.",
      controindicazioni: ["Ostruzione intestinale", "Malattie infiammatorie intestinali", "Dolore addominale non spiegato", "Appendicite", "Disidratazione grave", "Uso prolungato"],
      interazioni: ["Digossina: rischio per la perdita di potassio", "Diuretici e corticosteroidi: ipokaliemia", "Warfarin: possibile interferenza", "Lassativi: effetto additivo"],
      nota: "L'abuso di lassativi stimolanti può causare dipendenza, crampi, diarrea e perdita di potassio, con conseguenze cardiache. Il rabarbaro medicinale non è il gambo commestibile del rabarbaro da giardino."
    },
    sosia: [
      { nome: "Rabarbaro alimentare (Rheum rhabarbarum)", rischio: "I piccioli sono commestibili cotti; le foglie contengono ossalati e non si mangiano. La radice medicinale è un'altra cosa." }
    ],
    fito: { commestibile: false, parti: "Solo i piccioli della specie alimentare", stagione: "Primavera", cucina: "Non usare la radice medicinale in cucina. I piccioli del rabarbaro da giardino si cucinano con zucchero.", nota: "Le foglie del rabarbaro alimentare sono ricche di ossalati e non vanno consumate." },
    evidenza: "L'effetto lassativo è dovuto alle antrachinoni ed è ben documentato; per questo il rischio di abuso è alto. Non ci sono prove che «depuri» o curi altre malattie.",
    curiosita: "Il rabarbaro fu tra le merci più preziose lungo la Via della Seta. In Europa divenne popolare come dolce solo quando lo zucchero costava meno della radice.",
    fonti: [
      { t: "EMA · Rhei radix", u: "https://www.ema.europa.eu/en/medicines/herbal/rhei-radix" },
      { t: "PubMed · Rheum palmatum", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Rheum+palmatum" },
      { t: "MSD Manual · Stitichezza e lassativi", u: "https://www.msdmanuals.com/home/digestive-disorders/symptoms-of-digestive-disorders/constipation-in-adults" }
    ]
  },

  {
    id: "rooibos",
    nome: "Rooibos",
    latino: "Aspalathus linearis",
    famiglia: "Fabaceae",
    nomi: ["Tè rosso sudafricano", "Red bush"],
    tono: 4,
    categorie: ["Alimentare", "Officinale"],
    sintesi: "Una tisana dolce e senza caffeina: piacevole, ma non un medicinale.",
    descrizione: "Arbusto della famiglia delle leguminose, endemico delle montagne del Sudafrica. Le foglie e i rametti vengono fermentati e assumono un colore rosso-bruno e un sapore dolce, legnoso, senza amaro. Non contiene caffeina. È diventato popolare come alternativa al tè nero, soprattutto la sera.",
    parti: ["Foglie e rametti fermentati"],
    habitat: "Montagne del Cederberg, Sudafrica; coltivato.",
    raccolta: { mesi: [1, 2, 3], nota: "I rametti si tagliano in estate australe e si lasciano fermentare prima dell'essiccazione." },
    proprieta: ["Antiossidante", "Bevanda senza caffeina", "Leggermente antispasmodica", "Aromatizzante"],
    usi: [
      "Bevanda serale senza caffeina",
      "Idratazione e piacere del tè, anche per chi evita la teina",
      "Tradizione sudafricana per disturbi digestivi lievi",
      "Base per bevande fredde e mix di tisane",
      "Cosmetica, per il contenuto di polifenoli"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1 cucchiaino di rooibos in 200 ml di acqua a 95 °C per 5–7 minuti.", dose: "Due o tre tazze al giorno, come bevanda." },
      { nome: "Rooibos freddo", ricetta: "Infuso più concentrato, raffreddato e servito con ghiaccio e limone.", dose: "Bevanda estiva." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "La tisana occasionale è considerata compatibile; evitare estratti concentrati e grandi quantità. Chiedere parere in caso di dubbi.",
      allattamento: "Bevanda occasionale compatibile; evitare estratti concentrati.",
      bambini: "Bevanda senza caffeina adatta ai bambini più grandi, in quantità normali. Non usare come rimedio per le coliche.",
      controindicazioni: ["Allergia alle Fabaceae", "Uso di estratti concentrati ad alte dosi", "Malattie epatiche (cautela)"],
      interazioni: ["Ferro: i polifenoli possono ridurre l'assorbimento; distanziare dai pasti", "Farmaci orali: cautela teorica con estratti", "Anticoagulanti: cautela teorica"],
      nota: "Sono stati segnalati rari casi di danno epatico con tisane o estratti di rooibos, soprattutto ad alte dosi. Non è un «detox» e non sostituisce l'acqua."
    },
    sosia: [
      { nome: "Tè nero e tè verde", rischio: "Non sono la stessa bevanda: il rooibos non contiene caffeina e ha un profilo diverso." }
    ],
    fito: { commestibile: true, parti: "Foglie e rametti", stagione: "Tutto l'anno (prodotto essiccato)", cucina: "Tisana calda o fredda, latte speziato, dolci e marinature.", nota: "Non confonderlo con il tè rosso Pu-erh, che è un tè fermentato e contiene caffeina." },
    evidenza: "Gli antiossidanti sono presenti, ma gli studi clinici sull'uomo sono pochi. Non esistono prove solide di effetti terapeutici specifici.",
    curiosita: "Il nome rooibos in afrikaans significa «cespuglio rosso». La fermentazione, simile a quella del tè, sviluppa il colore e il sapore dolce.",
    fonti: [
      { t: "PubMed · Aspalathus linearis", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Aspalathus+linearis" },
      { t: "EFSA · Sicurezza degli integratori", u: "https://www.efsa.europa.eu/en/topics/topic/food-supplements" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "senna",
    nome: "Senna",
    latino: "Senna alexandrina",
    famiglia: "Fabaceae",
    nomi: ["Senna d'Egitto", "Cassia senna", "Sena"],
    tono: 5,
    categorie: ["Officinale"],
    sintesi: "Il lassativo stimolante più usato: efficace, ma solo per pochi giorni e mai in gravidanza.",
    descrizione: "Piccolo arbusto delle zone aride, con foglie composte e fiori gialli. Le foglie e i frutti contengono sennosidi, antrachinoni che stimolano la motilità intestinale. È un lassativo potente e diffuso, spesso presente nei prodotti da banco: proprio per questo è facile abusarne.",
    parti: ["Foglie", "Frutti"],
    habitat: "Zone aride dell'Africa nord-orientale e dell'Asia; coltivata.",
    raccolta: { mesi: [9, 10, 11], nota: "Foglie e frutti si raccolgono a maturità e si essiccano; in commercio arrivano come droga titolata." },
    proprieta: ["Lassativa stimolante", "Purgante", "Antrachinonica"],
    usi: [
      "Stitichezza occasionale, per non più di una settimana",
      "Preparazione a esami diagnostici, solo su indicazione medica",
      "Non adatta alla stitichezza cronica",
      "Non per dimagrire o «depurare»",
      "Non per uso quotidiano"
    ],
    preparazioni: [
      { nome: "Infuso di foglie", ricetta: "0,5–1 g di foglie in 200 ml di acqua a 90 °C per 10 minuti.", dose: "Una tazza la sera, per pochi giorni." },
      { nome: "Frutti", ricetta: "Secondo la posologia del prodotto titolato.", dose: "Non superare la dose indicata; bere molta acqua." }
    ],
    sicurezza: {
      livello: "rosso",
      gravidanza: "Controindicato: può causare crampi, disidratazione e rischio di parto pretermine.",
      allattamento: "Controindicato: i metaboliti passano nel latte e possono causare diarrea nel lattante.",
      bambini: "Controindicato sotto i 12 anni.",
      controindicazioni: ["Ostruzione intestinale", "Appendicite", "Malattie infiammatorie intestinali", "Dolore addominale non spiegato", "Disidratazione grave", "Uso oltre 1 settimana"],
      interazioni: ["Digossina e antiaritmici: rischio per ipokaliemia", "Diuretici e corticosteroidi: perdita di potassio", "Warfarin: possibile interferenza", "Altri lassativi: effetto additivo"],
      nota: "L'abuso causa dipendenza, diarrea, crampi, perdita di potassio e disturbi cardiaci. Non usare per perdere peso. Se la stitichezza dura da più di due settimane o si accompagna a sangue, dolore intenso o perdita di peso, serve una visita."
    },
    sosia: [
      { nome: "Altre Cassia e senna selvatica", rischio: "Specie affini hanno contenuti diversi di antrachinoni; usare solo prodotti titolati e tracciati." }
    ],
    fito: { commestibile: false, parti: "Nessuna", stagione: "—", cucina: "Non alimentare: è un lassativo, non un'erba da insalata.", nota: "Le foglie hanno un sapore sgradevole e un effetto potente: non improvvisare dosi." },
    evidenza: "L'effetto lassativo è ben documentato, ma il profilo di sicurezza impone un uso breve. Non ci sono prove di benefici per la «depurazione».",
    curiosita: "La senna era già usata nella medicina araba medievale e compare nei testi di Dioscoride. Ancora oggi è tra i lassativi più venduti al mondo.",
    fonti: [
      { t: "EMA · Sennae folium", u: "https://www.ema.europa.eu/en/medicines/herbal/sennae-folium" },
      { t: "PubMed · Senna", u: "https://pubmed.ncbi.nlm.nih.gov/?term=senna+laxative" },
      { t: "MSD Manual · Stitichezza e lassativi", u: "https://www.msdmanuals.com/home/digestive-disorders/symptoms-of-digestive-disorders/constipation-in-adults" }
    ]
  },

  {
    id: "tiglio",
    nome: "Tiglio",
    latino: "Tilia platyphyllos",
    famiglia: "Malvaceae",
    nomi: ["Tiglio a foglie larghe", "Tiglio comune", "Tilia cordata"],
    tono: 3,
    categorie: ["Officinale", "Alimentare"],
    sintesi: "Il profumo dei viali a giugno: infuso rassicurante per raffreddore e tensioni serali.",
    descrizione: "Grande albero caducifoglio con foglie cuoriformi e fiori giallastri riuniti in cime, accompagnati da una brattea verde-gialla. La fioritura profuma di miele e attira le api. Le specie più usate sono Tilia platyphyllos, T. cordata e il loro ibrido. I fiori si raccolgono con la brattea e si essiccano rapidamente.",
    parti: ["Fiori con brattee"],
    habitat: "Boschi freschi, viali e parchi; coltivato in tutta Italia.",
    raccolta: { mesi: [6, 7], nota: "Si raccolgono i fiori appena aperti con la brattea, in giornate asciutte; essiccare all'ombra." },
    proprieta: ["Diaforetica", "Antitussiva di conforto", "Ansiolitica lieve", "Antispasmodica", "Emolliente"],
    usi: [
      "Raffreddore e febbre lieve, come bevanda calda",
      "Tosse secca e gola irritata",
      "Tensione nervosa serale e difficoltà ad addormentarsi",
      "Mal di testa da tensione, per tradizione",
      "Bagni rilassanti con infuso"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1–2 g di fiori con brattee in 200 ml di acqua a 90 °C per 8–10 minuti.", dose: "Due tazze al giorno, la sera per l'effetto rilassante." },
      { nome: "Bagno", ricetta: "Una manciata di fiori in un litro di acqua calda, poi aggiungere all'acqua del bagno.", dose: "Bagno occasionale, non per bambini piccoli senza supervisione." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "L'infuso occasionale è considerato compatibile; evitare estratti concentrati. Chiedere parere se si assumono farmaci.",
      allattamento: "Bevanda occasionale compatibile; evitare estratti concentrati.",
      bambini: "L'infuso diluito è usato dalla tradizione; il miele per la tosse solo dopo l'anno di età.",
      controindicazioni: ["Allergia alle Malvaceae", "Uso di sedativi (cautela)", "Febbre alta persistente"],
      interazioni: ["Sedativi: effetto additivo lieve", "Anticoagulanti: cautela teorica"],
      nota: "Il tiglio non abbassa la febbre alta né cura le infezioni. Se la febbre supera i 39 °C, dura più di tre giorni o compaiono difficoltà respiratorie, serve una valutazione medica."
    },
    sosia: [
      { nome: "Tigli ornamentali", rischio: "Le specie ornamentali possono avere fiori simili; per uso alimentare e officinale preferire specie note e non trattate." }
    ],
    fito: { commestibile: true, parti: "Fiori, giovani foglie", stagione: "Primavera–estate", cucina: "Fiori in tisana e sciroppi; le foglie giovani in insalata primaverile.", nota: "Non raccogliere fiori dai viali trafficati: assorbono polveri e inquinanti." },
    evidenza: "La tradizione è solida per il conforto delle vie respiratorie e il rilassamento; gli studi clinici sono limitati. L'effetto sedativo è lieve.",
    curiosita: "Il tiglio può vivere secoli e sviluppare tronchi enormi. Il miele di tiglio è chiaro, aromatico e cristallizza lentamente.",
    fonti: [
      { t: "EMA · Tilae flos", u: "https://www.ema.europa.eu/en/medicines/herbal/tiliae-flos" },
      { t: "PubMed · Tilia", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Tilia+flower+anxiety" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "uva-ursina",
    nome: "Uva ursina",
    latino: "Arctostaphylos uva-ursi",
    famiglia: "Ericaceae",
    nomi: ["Uva d'orso", "Bearberry", "Arbuto"],
    tono: 5,
    categorie: ["Officinale"],
    sintesi: "Piccola foglia strisciante per le vie urinarie: solo pochi giorni, solo per adulti, solo dopo una visita.",
    descrizione: "Piccolo arbusto strisciante sempreverde con foglie coriacee e bacche rosse. Cresce in terreni acidi e brughiere di montagna. Le foglie contengono arbutina, che nell'organismo libera idrochinone, con effetto antimicrobico nelle urine. È un rimedio tradizionale potente, non un antibiotico.",
    parti: ["Foglie"],
    habitat: "Brughiere, boschi acidi e pendii di montagna.",
    raccolta: { mesi: [5, 6, 7], nota: "Si raccolgono le foglie mature, evitando di strappare i rami; in alcune regioni la specie è protetta." },
    proprieta: ["Antisettica urinaria", "Astringente", "Diuretica lieve", "Antinfiammatoria"],
    usi: [
      "Sintomi lievi e ricorrenti delle basse vie urinarie, dopo valutazione medica",
      "Tradizione per la cistite, senza sostituire la terapia",
      "Astringente per mucose, per uso esterno",
      "Non adatta alla prevenzione continua",
      "Non per bambini, gravidanza o allattamento"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1–2 g di foglie essiccate in 200 ml di acqua a 90 °C per 10 minuti.", dose: "Una tazza due volte al giorno, per non più di 5–7 giorni." },
      { nome: "Macerato freddo", ricetta: "1 g di foglie in 200 ml di acqua fredda per 12 ore, poi filtrare.", dose: "Secondo indicazione professionale, per brevi periodi." }
    ],
    sicurezza: {
      livello: "rosso",
      gravidanza: "Controindicata: dati insufficienti e rischio di effetti sul feto.",
      allattamento: "Controindicata: mancano dati e i metaboliti possono passare nel latte.",
      bambini: "Controindicata sotto i 18 anni secondo EMA.",
      controindicazioni: ["Malattie renali", "Calcoli renali", "Gravidanza e allattamento", "Bambini e adolescenti", "Uso oltre una settimana"],
      interazioni: ["Diuretici: effetto additivo", "Farmaci acidificanti: possibile riduzione dell'effetto", "Litio: cautela", "Anticoagulanti: cautela teorica"],
      nota: "L'idrochinone è tossico a dosi elevate: non superare la settimana di uso. L'uva ursina non cura una pielonefrite e non sostituisce gli antibiotici. Con febbre, brividi o dolore al fianco serve subito una visita."
    },
    sosia: [
      { nome: "Mirtillo rosso e altre Ericaceae", rischio: "Le foglie si somigliano; l'uva ursina è protetta in alcune regioni. Preferire prodotti tracciati." }
    ],
    fito: { commestibile: false, parti: "Bacche (non consigliate)", stagione: "—", cucina: "Le bacche sono farinose e non gradevoli; non sono un alimento comune.", nota: "Non mangiare le bacche in quantità: possono causare nausea e disturbi gastrointestinali." },
    evidenza: "Alcuni studi mostrano un effetto preventivo modesto sulle cistiti ricorrenti; l'evidenza non è sufficiente per usarla al posto degli antibiotici. L'uso deve restare breve.",
    curiosita: "Il nome uva d'orso deriva dal fatto che gli orsi sembrano apprezzarne le bacche. L'arbutina è usata anche in cosmetica per schiarire la pelle.",
    fonti: [
      { t: "EMA · Uvae ursi folium", u: "https://www.ema.europa.eu/en/medicines/herbal/uvae-ursi-folium" },
      { t: "PubMed · Arctostaphylos uva-ursi", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Arctostaphylos+uva-ursi" },
      { t: "MSD Manual · Infezioni urinarie", u: "https://www.msdmanuals.com/home/infections/urinary-tract-infections-utis/overview-of-urinary-tract-infections-utis" }
    ]
  },

  {
    id: "verbena-odorosa",
    nome: "Verbena odorosa",
    latino: "Aloysia citrodora",
    famiglia: "Verbenaceae",
    nomi: ["Limoncina", "Verbena al limone", "Lippia citriodora"],
    tono: 5,
    categorie: ["Officinale", "Aromatica"],
    sintesi: "Foglie dal profumo di limone: una tisana serale gradevole, non un ansiolitico.",
    descrizione: "Arbusto sempreverde con foglie lanceolate, ruvide, che profumano intensamente di limone se strofinate. I fiori sono piccoli e bianco-lilla. È originario del Sudamerica e coltivato nei climi miti. La verbena odorosa è una specie diversa dalla verbena comune (Verbena officinalis), usata in altre tradizioni.",
    parti: ["Foglie"],
    habitat: "Coltivata in climi miti; in Italia in vaso o nelle regioni più calde.",
    raccolta: { mesi: [6, 7, 8, 9], nota: "Si raccolgono le foglie prima della fioritura, al mattino; si essiccano all'ombra per conservare l'aroma." },
    proprieta: ["Digestiva", "Antispasmodica", "Leggermente sedativa", "Aromatizzante", "Antiossidante"],
    usi: [
      "Tensione nervosa lieve e difficoltà ad addormentarsi",
      "Digestione difficile e gonfiore",
      "Aromatizzazione di tisane e dolci",
      "Bevanda fresca estiva",
      "Tradizione per il mal di testa da tensione"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1 g di foglie essiccate in 200 ml di acqua a 85 °C per 5–7 minuti.", dose: "Una o due tazze al giorno, la sera." },
      { nome: "Acqua aromatica", ricetta: "Foglie fresche in acqua fredda per alcune ore, poi filtrare.", dose: "Bevanda occasionale, da consumare in giornata." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "Dati insufficienti: evitare gli estratti concentrati e limitare la tisana occasionale. Chiedere parere.",
      allattamento: "Dati insufficienti: evitare gli estratti; tisana occasionale con parere.",
      bambini: "Tisana molto diluita e occasionale; non usare oli essenziali.",
      controindicazioni: ["Allergia alle Verbenaceae", "Uso di sedativi (cautela)", "Ipotensione"],
      interazioni: ["Sedativi: effetto additivo lieve", "Farmaci per la pressione: cautela teorica"],
      nota: "Non confonderla con la verbena comune, che ha usi e profilo diversi. L'olio essenziale non va ingerito. Se l'insonnia dura da settimane, la soluzione non è aumentare la tisana."
    },
    sosia: [
      { nome: "Verbena comune (Verbena officinalis)", rischio: "È una specie diversa, con altro profilo d'uso. Il profumo di limone aiuta a riconoscere la limoncina." }
    ],
    fito: { commestibile: true, parti: "Foglie", stagione: "Primavera–autunno", cucina: "Tisane, dolci, gelati, bevande; ottima con la melissa.", nota: "Le foglie secche perdono aroma: conservarle in barattolo chiuso, al buio." },
    evidenza: "Studi piccoli suggeriscono un effetto rilassante e digestivo lieve; l'evidenza è limitata. Il profumo contribuisce al benessere percepito.",
    curiosita: "Il nome citrodora significa «che profuma di cedro». In Sudamerica è usata da secoli come erba da mate e da tisana.",
    fonti: [
      { t: "EMA · Verbenae citriodorae folium", u: "https://www.ema.europa.eu/en/medicines/herbal/verbenae-citriodorae-folium" },
      { t: "PubMed · Aloysia citrodora", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Aloysia+citrodora" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "zafferano",
    nome: "Zafferano",
    latino: "Crocus sativus",
    famiglia: "Iridaceae",
    nomi: ["Zafferano vero", "Crocus", "Saffron"],
    tono: 1,
    categorie: ["Aromatica", "Alimentare", "Officinale"],
    sintesi: "Il filo rosso più costoso del mondo: spezia preziosa, con dosi da rispettare.",
    descrizione: "Pianta bulbosa autunnale con fiori viola e tre stimmi rossi, che vengono raccolti a mano e essiccati. Da ogni fiore si ricavano solo tre stimmi: servono circa 150.000 fiori per un chilo di zafferano. Il profumo è intenso, metallico e dolce; il colore giallo-oro è dovuto alla crocina.",
    parti: ["Stimmi"],
    habitat: "Coltivato in terreni drenati e clima mediterraneo; in Italia soprattutto in Sardegna, Abruzzo e Toscana.",
    raccolta: { mesi: [10, 11], nota: "Si raccolgono i fiori all'alba e si separano gli stimmi a mano; essiccare rapidamente a bassa temperatura." },
    proprieta: ["Aromatizzante", "Colorante", "Antiossidante", "Antidepressivo discusso", "Digestivo"],
    usi: [
      "Aromatizzazione di risotti, pane e dolci",
      "Colorazione naturale degli alimenti",
      "Tradizione per il tono dell'umore, con evidenza modesta",
      "Tradizione per i crampi mestruali",
      "Digestione, come spezia"
    ],
    preparazioni: [
      { nome: "Infuso di stimmi", ricetta: "10–15 stimmi (circa 0,05 g) in 200 ml di acqua a 80 °C per 5 minuti.", dose: "Una tazza al giorno, per brevi periodi." },
      { nome: "In cucina", ricetta: "Una presa di stimmi in poche gocce di latte caldo, poi aggiungere al piatto.", dose: "Quantità culinarie, meno di 0,1 g per porzione." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare dosi elevate e integratori: possibile effetto uterino e dati insufficienti. L'uso come spezia è occasionale.",
      allattamento: "Dati insufficienti: evitare integratori e dosi elevate.",
      bambini: "Uso come spezia in quantità minime. Non usare come integratore.",
      controindicazioni: ["Allergia alle Iridaceae", "Dosi elevate (oltre 1,5 g)", "Disturbi bipolari (possibile attivazione)", "Uso di anticoagulanti"],
      interazioni: ["Warfarin e antiaggreganti: possibile aumento del rischio emorragico", "Antidepressivi: cautela", "Farmaci per la pressione: possibile effetto additivo"],
      nota: "Dosi elevate possono causare nausea, vomito, diarrea, vertigini e sanguinamento. Lo zafferano è spesso adulterato: acquistare da produttori tracciabili. Non usare come sostituto di una terapia per la depressione."
    },
    sosia: [
      { nome: "Cartamo e curcuma", rischio: "Sono usati come succedanei economici e colorano in modo simile, ma non hanno lo stesso profilo. Lo zafferano vero ha stimmi rossi e profumo intenso." }
    ],
    fito: { commestibile: true, parti: "Stimmi", stagione: "Autunno", cucina: "Risotto alla milanese, paella, dolci, pane; ottimo con burro e formaggi.", nota: "Pochi fili bastano: l'eccesso rende amaro e può essere tossico." },
    evidenza: "Alcuni studi suggeriscono un effetto modesto sull'umore lieve, ma sono piccoli e con rischi di distorsione. Per l'uso culinario non ci sono problemi alle dosi normali.",
    curiosita: "Lo zafferano è citato nella Bibbia e usato come tintura e profumo. La raccolta manuale spiega il prezzo elevatissimo: è la spezia più cara al mondo.",
    fonti: [
      { t: "PubMed · Crocus sativus", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Crocus+sativus+depression" },
      { t: "EFSA · Sicurezza degli alimenti", u: "https://www.efsa.europa.eu/en/topics/topic/food-supplements" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "zenzero",
    nome: "Zenzero",
    latino: "Zingiber officinale",
    famiglia: "Zingiberaceae",
    nomi: ["Zenzero comune", "Ginger", "Radice piccante"],
    tono: 4,
    categorie: ["Aromatica", "Alimentare", "Officinale"],
    sintesi: "Rizoma pungente e aromatico: il rimedio più noto per la nausea, con qualche cautela.",
    descrizione: "Pianta erbacea tropicale con rizoma carnoso e ramificato, foglie lanceolate e fiori appariscenti. Il rizoma fresco è giallo chiaro, con sapore pungente dovuto ai gingeroli. È una spezia fondamentale in molte cucine e una delle piante più studiate per la nausea.",
    parti: ["Rizoma"],
    habitat: "Coltivato nei tropici umidi; in Italia in vaso o serra.",
    raccolta: { mesi: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], nota: "Il rizoma si raccoglie a maturità, si lava e si essicca o si usa fresco." },
    proprieta: ["Antiemetico", "Carminativo", "Antinfiammatorio", "Riscaldante", "Antiossidante"],
    usi: [
      "Nausea e vomito, compresa la cinetosi",
      "Nausea in gravidanza, solo con parere medico",
      "Digestione difficile e gonfiore",
      "Dolori articolari lievi, con evidenza modesta",
      "Raffreddore e gola, come bevanda calda"
    ],
    preparazioni: [
      { nome: "Infuso fresco", ricetta: "2–3 fette sottili di rizoma fresco in 200 ml di acqua a 90 °C per 8 minuti.", dose: "Una tazza prima del viaggio o dopo i pasti." },
      { nome: "Decotto", ricetta: "1 g di rizoma essiccato in 250 ml di acqua, bollire 10 minuti.", dose: "Una tazza due volte al giorno." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "La nausea in gravidanza va gestita con il medico. L'uso alimentare è considerato sicuro; gli integratori richiedono parere, soprattutto nel primo trimestre.",
      allattamento: "Dati limitati: preferire l'uso alimentare e chiedere parere per gli integratori.",
      bambini: "Uso alimentare in piccole quantità. Per la nausea dei bambini chiedere al pediatra; mai oli essenziali.",
      controindicazioni: ["Calcoli biliari", "Reflusso grave", "Disturbi emorragici", "Allergia alle Zingiberaceae", "Intervento chirurgico programmato"],
      interazioni: ["Warfarin e antiaggreganti: possibile aumento del rischio emorragico", "Antidiabetici: possibile ipoglicemia", "Farmaci per la pressione: cautela teorica"],
      nota: "Lo zenzero può ridurre l'effetto di alcuni farmaci e aumentare il rischio di sanguinamento ad alte dosi. Non usare dosi elevate prima di un intervento. Non sostituisce i farmaci antiemetici prescritti."
    },
    sosia: [
      { nome: "Zenzero selvatico e altre Zingiberaceae", rischio: "Specie affini possono avere effetti diversi; per uso alimentare acquistare rizomi tracciati." }
    ],
    fito: { commestibile: true, parti: "Rizoma", stagione: "Tutto l'anno", cucina: "Tè, curry, salse, dolci, marinate; fresco o essiccato in polvere.", nota: "Il rizoma fresco si conserva in frigorifero; la polvere in barattolo chiuso, al buio." },
    evidenza: "Buone prove per la nausea da cinetosi e postoperatoria; risultati misti per la gravidanza e la dispepsia. Per l'artrosi l'effetto è modesto.",
    curiosita: "Lo zenzero era tra le spezie più commerciate lungo la Via della Seta. In Giappone si serve tra i piatti di sushi per pulire il palato.",
    fonti: [
      { t: "EMA · Zingiberis rhizoma", u: "https://www.ema.europa.eu/en/medicines/herbal/zingiberis-rhizoma" },
      { t: "NCCIH · Ginger", u: "https://www.nccih.nih.gov/health/ginger" },
      { t: "PubMed · Zingiber officinale nausea", u: "https://pubmed.ncbi.nlm.nih.gov/?term=ginger+nausea+randomized" }
    ]
  },

  {
    id: "genziana",
    nome: "Genziana maggiore",
    latino: "Gentiana lutea",
    famiglia: "Gentianaceae",
    nomi: ["Genziana", "Genziana gialla", "Gentiana lutea"],
    tono: 2,
    categorie: ["Officinale", "Protetta"],
    sintesi: "L'amaro di montagna: apre lo stomaco, e la tradizione ne ha fatto il cuore di tanti digestivi.",
    descrizione: "Pianta perenne con grandi fiori gialli a stella e una radice carnosa e amarissima, che cresce nei pascoli alpini e appenninici. Il sapore amaro si percepisce a diluizioni estreme ed è il suo principio d'uso: stimola la secrezione digestiva e la sensazione di appetito. È una specie in calo e protetta in molte regioni, dove la raccolta è vietata o contingentata.",
    parti: ["Radice", "Rizoma"],
    habitat: "Pascoli e prati alpini e appenninici, suoli calcarei, da 800 a 2.200 m.",
    raccolta: { mesi: [9, 10], nota: "Si estrae la radice in autunno da piante adulte, con l'autorizzazione prevista dalla regione: in molti territori la raccolta è vietata." },
    proprieta: ["Amaro tonico", "Digestiva", "Stimolante dell'appetito", "Coleretica lieve"],
    usi: [
      "Inappetenza e digestione lenta",
      "Senso di pesantezza dopo i pasti",
      "Aromatizzante amaricante di liquori e aperitivi"
    ],
    preparazioni: [
      { nome: "Infuso amaro", ricetta: "1–2 g di radice essiccata e sminuzzata in 200 ml di acqua a 90 °C, coperto per 10 minuti, poi filtrare.", dose: "Una tazza 15–20 minuti prima dei pasti, per non più di due settimane di seguito." },
      { nome: "Decotto", ricetta: "2 g di radice in 250 ml di acqua fredda, portare a bollore e lasciare sobbollire 10 minuti.", dose: "Una tazza prima del pasto principale; il sapore è molto amaro." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Da evitare: stimola le secrezioni digestive e non ci sono dati rassicuranti sull'uso in gravidanza.",
      allattamento: "Da evitare, per assenza di dati e perché il sapore amaro passa nel latte.",
      bambini: "Non prima dell'adolescenza. Per l'inappetenza di un bambino serve il pediatra, non un amaro.",
      controindicazioni: ["Ulcera peptica", "Gastrite erosiva", "Reflusso gastroesofageo grave", "Iperacidità", "Ostruzione delle vie biliari"],
      interazioni: ["Antiacidi e inibitori di pompa: l'amaro può perdere senso o peggiorare il reflusso", "Ipoglicemizzanti: cautela teorica"],
      nota: "Specie protetta: non raccoglierla senza autorizzazione. L'effetto è legato al gusto amaro, non alla dose: aumentarla non serve."
    },
    sosia: [
      { nome: "Genzianelle e genziane a fiori blu", rischio: "Specie affini protette e di identificazione non banale: la raccolta richiede competenza e permessi." }
    ],
    fito: { commestibile: false, parti: "Radice", stagione: "Autunno", cucina: "Amaricante per liquori e aperitivi: non è un alimento.", nota: "Radice amarissima: si usa in piccole quantità e solo dopo identificazione certa." },
    evidenza: "L'uso come amaro digestivo è tradizionale e plausibile per il riflesso amaro; le prove cliniche sono scarse e spesso su estratti combinati.",
    curiosita: "L'amarogentina, uno dei suoi principi amari, si percepisce ancora a diluizioni di una parte su decine di migliaia.",
    fonti: [
      { t: "EMA · Herbal medicines", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Gentiana lutea", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Gentiana+lutea+bitter" }
    ]
  },

  {
    id: "china",
    nome: "China (Cinchona)",
    latino: "Cinchona pubescens, C. calisaya",
    famiglia: "Rubiaceae",
    nomi: ["China", "Corteccia di china", "China rossa", "Cinchona"],
    tono: 3,
    categorie: ["Officinale", "Protetta"],
    sintesi: "La corteccia che ha cambiato la storia della malaria, e che ancora dà il chinino: potente, quindi da maneggiare con rispetto.",
    descrizione: "Alberi andini la cui corteccia contiene alcaloidi chininici, tra cui il chinino. Dalla corteccia dei Gesuiti è nata la prima terapia efficace contro la malaria, e da lì l'acqua tonica. Oggi la china resta un amaricante per liquori e aperitivi, mentre il chinino è un farmaco con margini stretti: dosi sbagliate provocano cinconismo, disturbi della coagulazione e aritmie.",
    parti: ["Corteccia"],
    habitat: "Foreste umide andine fra 1.500 e 3.000 m; oggi coltivata anche in Asia e Africa.",
    raccolta: { mesi: [3, 9], nota: "Nelle piantagioni la corteccia si stacca dopo almeno otto anni di crescita; non è una raccolta domestica e le specie sono protette." },
    proprieta: ["Amaro tonico", "Astringente", "Stimolante dell'appetito", "Antimalarica (chinino, farmaco)"],
    usi: [
      "Aromatizzante di amari e acqua tonica",
      "Inappetenza e dispepsia, per tradizione",
      "Il chinino come antimalarico è terapia medica e non autocura"
    ],
    preparazioni: [
      { nome: "Decotto tradizionale", ricetta: "1 g di corteccia in 250 ml di acqua, sobbollire 10 minuti e filtrare.", dose: "Solo su indicazione di un erborista o di un medico: il margine di sicurezza è stretto." },
      { nome: "Amaro aromatizzato", ricetta: "Piccole quantità di corteccia in macerazione alcolica, come aromatizzante, mai come rimedio.", dose: "Un bicchierino occasionale, evitando del tutto gravidanza, allattamento e terapia anticoagulante." }
    ],
    sicurezza: {
      livello: "rosso",
      gravidanza: "Da evitare: chinino e chinidina attraversano la placenta e possono agire sul feto e sull'utero.",
      allattamento: "Da evitare: passa nel latte e può dare effetti al lattante.",
      bambini: "Da evitare. La febbre di un bambino è una questione medica, non da amaro casalingo.",
      controindicazioni: ["Gravidanza e allattamento", "Trombocitopenia e disturbi della coagulazione", "Aritmie e disturbi della conduzione cardiaca", "Deficit di G6PD", "Ipersensibilità ai chininici", "Ulcera e gastrite"],
      interazioni: ["Warfarin e anticoagulanti: aumento marcato del rischio emorragico", "Digossina: aumento dei livelli e rischio di tossicità", "Farmaci che allungano il QT: rischio di aritmie", "Antiacidi: ridotto assorbimento"],
      nota: "Il chinino è un farmaco: dosi eccessive causano ronzii, cefalea, nausea e disturbi visivi, fino ad aritmie. L'acqua tonica ne contiene poco, ma non è una terapia e va evitata in gravidanza."
    },
    sosia: [
      { nome: "Altre cortecce vendute come «china»", rischio: "Sostituzioni e adulterazioni sono documentate: acquistare solo da fornitori tracciati." }
    ],
    fito: { commestibile: false, parti: "Corteccia", stagione: "Stagione secca", cucina: "Aromatizzante dell'acqua tonica e degli amari.", nota: "Non è un alimento né un rimedio domestico." },
    evidenza: "Il chinino è stato un antimalarico decisivo e resta un farmaco di riferimento in contesti specifici; per la dispepsia l'evidenza è solo tradizionale. Gli effetti avversi sono ben documentati.",
    curiosita: "Il gin tonic nasce come medicina coloniale: il chinino dell'acqua tonica serviva a rendere tollerabile la dose amara antimalarica.",
    fonti: [
      { t: "EMA · Herbal medicines", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Cinchona bark", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Cinchona+bark+quinine" },
      { t: "WHO · Malaria", u: "https://www.who.int/health-topics/malaria" }
    ]
  },

  {
    id: "angelica",
    nome: "Angelica",
    latino: "Angelica archangelica",
    famiglia: "Apiaceae",
    nomi: ["Angelica", "Arcangelica", "Angelica domestica"],
    tono: 2,
    categorie: ["Officinale", "Aromatica"],
    sintesi: "Radice dolce e resina: scalda la digestione e il petto, in una famiglia botanica che chiede molta attenzione.",
    descrizione: "Pianta biennale o triennale delle ombrellifere, con fusti cavi e ombrelle verde-giallastre. La radice è aromatica e dolce, con note di resina e agrumi: entra nei digestivi e in molti liquori monastici. Appartiene però a una famiglia che comprende specie mortali, quindi l'identificazione è la prima regola d'uso.",
    parti: ["Radice", "Semi", "Foglie"],
    habitat: "Terreni freschi e umidi, rive e boschi del Nord Europa e delle Alpi; coltivata negli orti.",
    raccolta: { mesi: [8, 9, 10], nota: "Radice in autunno del secondo anno, semi a maturazione in agosto. Solo con identificazione certa: nella stessa famiglia crescono specie velenose." },
    proprieta: ["Carminativa", "Digestiva", "Spasmolitica", "Espettorante", "Amaro-aromatica"],
    usi: [
      "Gonfiore e digestione lenta",
      "Tosse con catarro, per tradizione",
      "Aromatizzante di liquori e amari"
    ],
    preparazioni: [
      { nome: "Infuso di radice", ricetta: "1–2 g di radice essiccata in 200 ml di acqua a 90 °C, coperto 10 minuti.", dose: "Una tazza dopo i pasti, per pochi giorni." },
      { nome: "Decotto", ricetta: "2 g di radice in 250 ml di acqua, sobbollire 10 minuti e filtrare.", dose: "Una tazza al giorno, lontano dai farmaci anticoagulanti." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Da evitare: è tradizionalmente considerata emmenagoga e i dati sono insufficienti.",
      allattamento: "Da evitare per assenza di dati.",
      bambini: "Niente oli essenziali né dosi medicamentose; un infuso occasionale solo dopo parere del pediatra.",
      controindicazioni: ["Gravidanza e allattamento", "Allergia alle Apiaceae", "Fotosensibilità", "Diabete, per i preparati zuccherati"],
      interazioni: ["Anticoagulanti: possibile potenziamento per il contenuto di cumarine", "Farmaci fotosensibilizzanti: rischio additivo", "Ipoglicemizzanti: cautela"],
      nota: "Non raccoglierla se non sai distinguerla dalla cicuta maggiore: nella famiglia delle ombrellifere un errore può essere fatale. Preferisci la pianta coltivata."
    },
    sosia: [
      { nome: "Cicuta maggiore (Conium maculatum)", rischio: "Mortale: fusto macchiato di rosso, odore sgradevole, ombrelle più piccole. La confusione in questa famiglia può uccidere." },
      { nome: "Levistico e altre ombrellifere aromatiche", rischio: "Somiglianze forti fra aromatiche: riconoscere foglie, guaina e odore prima di ogni uso." }
    ],
    fito: { commestibile: true, parti: "Fusti canditi, foglie giovani, semi", stagione: "Primavera–estate", cucina: "Fusti canditi, aromatizzante di dolci e liquori; foglie in piccole quantità.", nota: "Solo da coltivazione o con identificazione esperta: la famiglia include specie velenose." },
    evidenza: "Tradizione consolidata come carminativo ed espettorante; gli studi clinici sono limitati e spesso su miscele.",
    curiosita: "Il nome leggendario rimanda all'arcangelo Raffaele, che secondo la tradizione indicò la pianta contro la peste.",
    fonti: [
      { t: "EMA · Herbal medicines", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Angelica archangelica", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Angelica+archangelica" }
    ]
  },

  {
    id: "mirra",
    nome: "Mirra",
    latino: "Commiphora myrrha",
    famiglia: "Burseraceae",
    nomi: ["Mirra", "Commiphora", "Mirra vera"],
    tono: 3,
    categorie: ["Officinale"],
    sintesi: "La resina amara dei templi: astringente per bocca e gola, da usare in piccole quantità e mai ingerita.",
    descrizione: "Arbusto spinoso del Corno d'Africa e della penisola arabica, che produce una resina giallo-bruna dal profumo resinoso e dal sapore amaro. La mirra è stata incenso, unguento e collutorio per millenni; oggi entra in tinture e prodotti per il cavo orale per la sua azione astringente e lenitiva delle gengive.",
    parti: ["Resina (oleo-gommoresina)"],
    habitat: "Arbusteti aridi del Corno d'Africa e dell'Arabia; raccolta da comunità locali.",
    raccolta: { mesi: [1, 2, 3, 11, 12], nota: "La resina si raccoglie nella stagione secca incidendo la corteccia; non è una raccolta italiana." },
    proprieta: ["Astringente", "Antisettica locale", "Antinfiammatoria del cavo orale", "Espettorante", "Amaro"],
    usi: [
      "Gengiviti, afte e mal di gola come collutorio",
      "Tosse con catarro, per tradizione",
      "Aromatizzante di tinture e incensi"
    ],
    preparazioni: [
      { nome: "Collutorio alla mirra", ricetta: "10–15 gocce di tintura madre in mezzo bicchiere d'acqua tiepida, risciacquare e sputare.", dose: "Due o tre volte al giorno, senza deglutire." },
      { nome: "Tintura", ricetta: "Resina in alcol a 60–70° per tre settimane, filtro accurato e conservazione in vetro scuro.", dose: "Solo diluita e per uso locale: la resina pura non si ingerisce." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Da evitare: è tradizionalmente considerata stimolante dell'utero.",
      allattamento: "Da evitare, per assenza di dati.",
      bambini: "Collutori solo dopo i 6 anni, senza deglutire; niente oli essenziali.",
      controindicazioni: ["Gravidanza e allattamento", "Menorragia e metrorragia", "Nefrite e disturbi renali", "Allergia alle Burseraceae"],
      interazioni: ["Anticoagulanti: cautela teorica", "Ipoglicemizzanti: possibile effetto additivo", "Farmaci per la tiroide: dati insufficienti"],
      nota: "I collutori si sputano. Gli oli essenziali di mirra sono fotosensibilizzanti e non vanno usati puri sulla pelle."
    },
    sosia: [
      { nome: "Altre resine vendute come mirra (bdellio, guggul)", rischio: "Resine simili e nomi commerciali sovrapposti: acquistare solo da fornitori tracciati." }
    ],
    fito: { commestibile: false, parti: "Resina", stagione: "Stagione secca", cucina: "Aromatizzante di liquori e incensi: non è un alimento.", nota: "Uso interno solo su indicazione, con prodotti titolati." },
    evidenza: "Uso tradizionale nel cavo orale, con piccoli studi su gengivite dai risultati incoraggianti ma limitati.",
    curiosita: "La mirra era tra i doni dei Magi ed entrava nel kyphi, l'unguento sacro dell'Egitto antico.",
    fonti: [
      { t: "EMA · Herbal medicines", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Commiphora myrrha", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Commiphora+myrrha" }
    ]
  },

  {
    id: "cardo-santo",
    nome: "Cardo santo",
    latino: "Cnicus benedictus (Centaurea benedicta)",
    famiglia: "Asteraceae",
    nomi: ["Cardo santo", "Cardo benedetto", "Cnicus benedictus", "Centaurea benedicta"],
    tono: 2,
    categorie: ["Officinale"],
    sintesi: "L'amaro dei monasteri: la pianta «benedetta» che dà carattere a digestivi e bevande amare.",
    descrizione: "Pianta annuale spinosa con foglie lanceolate e capolini gialli, diffusa negli incolti del Mediterraneo. Gli orti monastici la coltivavano come amaro digestivo e febbrifugo, e da lì è passata nei liquori d'abbazia. Ha un sapore molto amaro, che si cerca in piccole quantità.",
    parti: ["Sommità fiorite", "Foglie"],
    habitat: "Incolti, bordi strada e terreni aridi del Mediterraneo, da 0 a 1.000 m.",
    raccolta: { mesi: [6, 7, 8], nota: "Si tagliano le sommità fiorite all'inizio della fioritura, con guanti per le spine, e si essiccano all'ombra." },
    proprieta: ["Amaro tonico", "Digestiva", "Stimolante dell'appetito", "Diaforetica", "Febbrifuga per tradizione"],
    usi: [
      "Inappetenza e digestione lenta",
      "Dispepsia atonica",
      "Base amaricante di aperitivi e amari"
    ],
    preparazioni: [
      { nome: "Infuso amaro", ricetta: "1–2 g di sommità fiorite essiccate in 200 ml di acqua a 90 °C, coperto 8–10 minuti.", dose: "Una tazza prima dei pasti, per non più di due settimane." },
      { nome: "Decotto", ricetta: "2 g di sommità in 250 ml di acqua, sobbollire 8 minuti e filtrare.", dose: "Una tazza al giorno, lontano dai pasti se si cerca l'effetto aperitivo." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Da evitare: è tradizionalmente considerato emmenagogo e i dati sono insufficienti.",
      allattamento: "Da evitare per assenza di dati.",
      bambini: "Non usare come amaro prima dell'adolescenza; per l'inappetenza infantile serve il pediatra.",
      controindicazioni: ["Ulcera peptica", "Gastrite", "Ostruzione delle vie biliari", "Allergia alle Asteraceae", "Gravidanza"],
      interazioni: ["Antiacidi e inibitori di pompa: possibile perdita di effetto o peggioramento del reflusso", "Ipoglicemizzanti: cautela teorica"],
      nota: "Le spine rendono la raccolta sgradevole: usa i guanti. L'amaro è già percepibile in dose piccola, aumentarla non migliora il risultato."
    },
    sosia: [
      { nome: "Cardo mariano (Silybum marianum)", rischio: "Pianta diversa, con semi usati per il fegato: le due specie non sono intercambiabili." },
      { nome: "Altri cardi spinosi", rischio: "Identificazione incerta fra cardi: sommità fiorite e spine sono i caratteri da controllare." }
    ],
    fito: { commestibile: false, parti: "Sommità fiorite", stagione: "Estate", cucina: "Amaricante per liquori: non è un alimento.", nota: "Sapore molto amaro: si usa in piccole quantità e solo con identificazione certa." },
    evidenza: "Tradizione monastica solida come amaro digestivo; l'evidenza clinica è scarsa e datata.",
    curiosita: "L'epiteto benedictus richiama la «grazia» attribuita alla pianta dai monaci, che la coltivavano negli orti dei conventi.",
    fonti: [
      { t: "EMA · Herbal medicines", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products" },
      { t: "PubMed · Cnicus benedictus", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Cnicus+benedictus" }
    ]
  }

]);
