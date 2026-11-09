/* ==========================================================================
   Naturopata Digitale · Erbario, parte sesta
   Cinque schede nuove: boswellia, ortosifon, pelargonium, rodiola, withania.
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.plants = NP.plants.concat([

  {
    id: "boswellia",
    nome: "Boswellia",
    latino: "Boswellia serrata",
    famiglia: "Burseraceae",
    nomi: ["Incenso indiano", "Salai", "Boswellia sacra (specie affine)"],
    tono: 3,
    categorie: ["Officinale"],
    sintesi: "La resina degli incensi indiani, studiata nell'artrosi: un aiuto modesto, mai al posto della terapia.",
    descrizione: "Albero resinifero dell'India centrale e del Deccan, che produce una gomma-resina giallastra dal profumo balsamico. Gli acidi boswellici, e in particolare l'AKBA, sono i composti più studiati: in laboratorio interferiscono con la lipossigenasi, un enzima coinvolto nell'infiammazione. La resina è usata da secoli come incenso e come rimedio per le articolazioni; oggi si trova soprattutto in estratti titolati, spesso mescolati ad altre piante.",
    parti: ["Resina (gomma-resina)"],
    habitat: "Foreste secche e colline dell'India centrale e occidentale; la resina si raccoglie da alberi selvatici e coltivati.",
    raccolta: { mesi: [1, 2, 3, 4, 11, 12], nota: "Nella stagione secca si incide la corteccia e si raccoglie la resina che essuda. Non è una pianta che si raccoglie in Italia." },
    proprieta: ["Antinfiammatoria", "Antireumatica tradizionale", "Astringente", "Balsamica"],
    usi: [
      "Dolore e rigidità dell'artrosi del ginocchio, come supporto",
      "Tradizione per le vie respiratorie, come incenso e suffumigi",
      "Aromatizzazione di unguenti e resine da bruciare"
    ],
    preparazioni: [
      { nome: "Estratto secco titolato", ricetta: "Si acquista un estratto standardizzato in acidi boswellici, con titolo, parte usata e lotto dichiarati.", dose: "Solo secondo l'etichetta del prodotto e con il parere di chi segue le tue articolazioni." },
      { nome: "Unguento con resina", ricetta: "Resina in polvere in un olio o in una crema base, per uso esterno sulla zona dolente.", dose: "Strato sottile, evitando la cute lesa." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Da evitare: dati insufficienti e tradizione che la considera stimolante dell'utero.",
      allattamento: "Da evitare, per assenza di dati sul passaggio nel latte.",
      bambini: "Non usare senza parere pediatrico: non ci sono studi affidabili.",
      controindicazioni: ["Allergia alle Burseraceae", "Ulcera gastrica attiva", "Gravidanza e allattamento"],
      interazioni: ["Anticoagulanti e antiaggreganti: cautela teorica", "FANS: possibile sommazione degli effetti gastrici", "Immunosoppressori: dati insufficienti"],
      nota: "Non sostituisce la terapia dell'artrosi. Gli studi usano prodotti e dosi diverse: un estratto non vale l'altro e la resina grezza non è un farmaco."
    },
    sosia: [
      { nome: "Altre boswellie e resine d'incenso", rischio: "Specie e qualità diverse finiscono sotto lo stesso nome commerciale: contano titolo, parte usata e lotto." }
    ],
    fito: { commestibile: false, parti: "Resina", stagione: "Stagione secca", cucina: "Non è un alimento: si usa in incensi e unguenti.", nota: "La resina grezza non va ingerita." },
    evidenza: "Diversi studi clinici sull'artrosi del ginocchio riportano un miglioramento modesto del dolore, con campioni piccoli e prodotti diversi fra loro. L'evidenza è promettente ma non definitiva.",
    curiosita: "La boswellia è una delle resine dell'incenso antico, insieme alla mirra: le carovane la portavano dall'India verso l'Egitto e Roma.",
    fonti: [
      { t: "PubMed · Boswellia serrata", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Boswellia+serrata" },
      { t: "EMA · Monografie erboristiche", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products/european-union-monographs-list-entries" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "ortosifon",
    nome: "Ortosifon",
    latino: "Orthosiphon aristatus",
    famiglia: "Lamiaceae",
    nomi: ["Tè di Giava", "Ortosifon stamineo", "Orthosiphon stamineus"],
    tono: 2,
    categorie: ["Officinale"],
    sintesi: "Il «tè di Giava»: diuretico tradizionale delicato, da non confondere con una cura delle infezioni urinarie.",
    descrizione: "Pianta erbacea perenne originaria del Sud-Est asiatico, con fusti quadrangolari, foglie opposte e fiori bianchi o lilla con lunghi stami. In Indonesia e in Malesia le foglie si bevono come tè quotidiano; in Europa arrivano come infuso o estratto per le vie urinarie. L'effetto diuretico è la ragione per cui viene usato, ma è anche la ragione per cui va evitato in alcune condizioni.",
    parti: ["Foglie", "Sommità fiorite"],
    habitat: "Clima tropicale umido; coltivato in vaso o in serra nelle regioni temperate.",
    raccolta: { mesi: [6, 7, 8, 9], nota: "Si raccolgono le foglie prima della fioritura e si essiccano all'ombra; la pianta non è rustica in Italia." },
    proprieta: ["Diuretico tradizionale", "Antinfiammatorio urinario", "Antiossidante", "Leggermente ipotensivo"],
    usi: [
      "Sensazione di ritenzione idrica, come supporto",
      "Tradizione per le vie urinarie basse",
      "Bevanda quotidiana in Indonesia e Malesia"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1–2 g di foglie essiccate in 200 ml di acqua a 90 °C per 8–10 minuti.", dose: "Una tazza due o tre volte al giorno, per periodi brevi." },
      { nome: "Estratto secco", ricetta: "Estratto titolato in polifenoli, secondo l'etichetta del produttore.", dose: "Solo per cicli brevi e con il parere del medico se assume farmaci." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Da evitare: dati insufficienti e possibile effetto sul flusso sanguigno placentare.",
      allattamento: "Da evitare, per assenza di dati.",
      bambini: "Non usare senza parere pediatrico.",
      controindicazioni: ["Edemi da insufficienza cardiaca o renale", "Ipotensione", "Disidratazione", "Ostruzione delle vie urinarie"],
      interazioni: ["Diuretici: sommazione e rischio di ipokaliemia", "Litio: possibile riduzione dei livelli", "Digossina: cautela per il potassio", "Antipertensivi e antidiabetici: effetto additivo"],
      nota: "Non cura le infezioni urinarie. Con bruciore, febbre, sangue nelle urine o dolore al fianco serve una valutazione medica, non un infuso."
    },
    sosia: [
      { nome: "Altre aromatiche a foglia opposta", rischio: "Fusto quadrangolare e foglie opposte sono comuni a molte Lamiaceae: l'identificazione conta soprattutto per chi coltiva in casa." }
    ],
    fito: { commestibile: false, parti: "Foglie", stagione: "Estate", cucina: "Si beve come tisana, non si mangia.", nota: "Non è un alimento: l'uso è quello di una bevanda medicamentosa leggera." },
    evidenza: "Gli studi clinici sono pochi e spesso condotti su miscele; l'effetto diuretico è documentato soprattutto dalla tradizione e da dati preliminari.",
    curiosita: "In Indonesia il «tè di Giava» si beve ogni giorno come bevanda di casa: è raro che un rimedio erboristico europeo abbia lo stesso ruolo quotidiano.",
    fonti: [
      { t: "PubMed · Orthosiphon aristatus", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Orthosiphon+aristatus" },
      { t: "EMA · Monografie erboristiche", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products/european-union-monographs-list-entries" },
      { t: "Istituto Superiore di Sanità", u: "https://www.iss.it/" }
    ]
  },

  {
    id: "pelargonium",
    nome: "Pelargonium",
    latino: "Pelargonium sidoides",
    famiglia: "Geraniaceae",
    nomi: ["Geranio africano", "Umckaloabo"],
    tono: 2,
    categorie: ["Officinale"],
    sintesi: "La radice sudafricana della tosse: utile nella bronchite acuta, con avvertenze vere su fegato e sanguinamento.",
    descrizione: "Pianta erbacea perenne del Sudafrica, con foglie reniformi e piccoli fiori scuri, la cui radice è usata da secoli dalle popolazioni locali per le malattie respiratorie. In Europa l'estratto idroalcolico speciale, indicato con la sigla EPs 7630, è il prodotto studiato: contiene cumarine e acidi fenolici, ma non è un antibiotico e non sostituisce la valutazione medica quando serve.",
    parti: ["Radice"],
    habitat: "Prati e pendii del Sudafrica orientale; coltivata per l'estrazione.",
    raccolta: { mesi: [1, 2, 3, 4], nota: "La radice si raccoglie nella stagione secca; in Europa arriva solo come estratto o pianta coltivata." },
    proprieta: ["Antimicrobico in vitro", "Espettorante", "Antitussivo tradizionale", "Immunomodulante"],
    usi: [
      "Bronchite acuta, come supporto ai sintomi",
      "Raffreddore e mal di gola, per tradizione",
      "Tosse persistente, solo dopo una visita"
    ],
    preparazioni: [
      { nome: "Estratto EPs 7630", ricetta: "Gocce o sciroppo standardizzati, con la dose indicata in etichetta per età.", dose: "Cicli brevi; per i bambini serve il parere del pediatra." },
      { nome: "Decotto di radice", ricetta: "Preparazione tradizionale sudafricana, poco standardizzata.", dose: "Sconsigliata in autoproduzione: il titolo varia troppo." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Da evitare, per assenza di dati affidabili.",
      allattamento: "Da evitare, per assenza di dati.",
      bambini: "Solo con parere pediatrico; in Germania l'estratto è autorizzato dai 12 mesi, in Italia decide il medico.",
      controindicazioni: ["Malattie epatiche gravi", "Diatesi emorragica", "Allergia alle Geraniaceae"],
      interazioni: ["Anticoagulanti: cautela prudenziale, interazione con il warfarin non documentata nell'uomo", "Farmaci epatotossici: cautela", "Immunosoppressori: dati insufficienti"],
      nota: "Sono segnalati rari casi di danno epatico. Se compaiono ittero, urine scure, nausea o stanchezza insolita, sospendere e controllare le transaminasi."
    },
    sosia: [
      { nome: "Gerani ornamentali", rischio: "I gerani da balcone sono specie diverse e non si usano per la tosse: il nome «geranio» confonde piante molto distanti." },
      { nome: "Altri estratti «per la tosse»", rischio: "Le miscele con più piante non permettono di attribuire effettti o reazioni a una sola specie." }
    ],
    fito: { commestibile: false, parti: "Radice", stagione: "Stagione secca", cucina: "Non è un alimento.", nota: "Uso solo come estratto titolato, per cicli brevi." },
    evidenza: "Diversi studi randomizzati sulla bronchite acuta, in adulti e bambini, mostrano un beneficio modesto e coerente sui sintomi. Per il raffreddore comune l'evidenza è più debole.",
    curiosita: "Il nome commerciale Umckaloabo viene dallo zulu e allude al «dolore ai polmoni»: la pianta era venduta in Europa già all'inizio del Novecento.",
    fonti: [
      { t: "PubMed · Pelargonium sidoides", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Pelargonium+sidoides" },
      { t: "EMA · Monografie erboristiche", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products/european-union-monographs-list-entries" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "rodiola",
    nome: "Rodiola",
    latino: "Rhodiola rosea",
    famiglia: "Crassulaceae",
    nomi: ["Radice d'oro", "Rhodiola", "Rodiola rosea"],
    tono: 2,
    categorie: ["Officinale"],
    sintesi: "L'adattogeno delle montagne fredde: aiuta a sopportare stanchezza e stress, senza miracoli e senza cure.",
    descrizione: "Pianta succulenta delle regioni fredde e montuose dell'emisfero nord, con rizoma carnoso che odora di rosa quando si spezza. Il rizoma contiene rosavine e salidroside, i composti a cui si attribuisce l'effetto adattogeno: una risposta più equilibrata allo stress, secondo la tradizione russa e scandinava. Gli studi esistono, ma sono piccoli e spesso finanziati dai produttori.",
    parti: ["Rizoma", "Radice"],
    habitat: "Rupi e prati d'alta quota in Scandinavia, Siberia, Asia centrale e Alpi; coltivata per l'estrazione.",
    raccolta: { mesi: [6, 7, 8, 9], nota: "Si raccoglie il rizoma a fine fioritura; le popolazioni selvatiche sono protette in molte regioni, meglio la coltivazione." },
    proprieta: ["Adattogena", "Antiastenia", "Antiossidante", "Neuroprotettiva (dati preliminari)"],
    usi: [
      "Stanchezza mentale e affaticamento nelle giornate lunghe",
      "Periodi di stress, come supporto",
      "Tradizione per la resistenza in quota e al freddo"
    ],
    preparazioni: [
      { nome: "Infuso di rizoma", ricetta: "1–2 g di rizoma essiccato in 200 ml di acqua a 90 °C per 10 minuti.", dose: "Una tazza al mattino o nel primo pomeriggio." },
      { nome: "Estratto titolato", ricetta: "Estratto con titolo dichiarato in rosavine e salidroside.", dose: "Secondo etichetta; cicli brevi, evitando la sera." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Da evitare, per assenza di dati.",
      allattamento: "Da evitare, per assenza di dati.",
      bambini: "Non usare senza parere pediatrico.",
      controindicazioni: ["Disturbo bipolare", "Ipertensione non controllata", "Allergia alle Crassulaceae"],
      interazioni: ["Antidepressivi: cautela, possibile sommazione", "Stimolanti e caffeina: nervosismo e insonnia", "Antidiabetici: possibile effetto additivo"],
      nota: "Può causare insonnia se assunta la sera. Non è una cura della depressione né dell'affaticamento cronico: se la stanchezza dura settimane, serve una visita."
    },
    sosia: [
      { nome: "Altre crassulacee di montagna", rischio: "Le succulente si somigliano: solo il rizoma profumato e l'identificazione esperta distinguono la rodiola." }
    ],
    fito: { commestibile: false, parti: "Rizoma", stagione: "Estate", cucina: "Non è un alimento.", nota: "Le popolazioni selvatiche sono spesso protette: usare solo prodotti coltivati e tracciati." },
    evidenza: "Piccoli studi randomizzati su affaticamento e stress riportano effetti modesti, con risultati incoerenti e prodotti diversi. L'evidenza è insufficiente per indicazioni terapeutiche.",
    curiosita: "Il nome «radice d'oro» viene dal rizoma dorato; in Siberia se ne faceva un infuso per i viaggi lunghi nel freddo.",
    fonti: [
      { t: "PubMed · Rhodiola rosea", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Rhodiola+rosea" },
      { t: "EMA · Monografie erboristiche", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products/european-union-monographs-list-entries" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "withania",
    nome: "Withania",
    latino: "Withania somnifera",
    famiglia: "Solanaceae",
    nomi: ["Ashwagandha", "Ginseng indiano"],
    tono: 3,
    categorie: ["Officinale"],
    sintesi: "L'adattogeno ayurvedico più venduto: aiuta sonno e stress, ma ha segnalazioni di danno epatico da non ignorare.",
    descrizione: "Arbusto della famiglia delle solanacee, diffuso dall'India all'Africa e al Mediterraneo, con foglie ovali e piccoli frutti rossi. La radice, chiara e carnosa, contiene withanolidi e alcaloidi ed è usata nella medicina ayurvedica come tonico e per il sonno. È una delle piante adattogene più vendute al mondo: proprio per questo le segnalazioni di effetti avversi vanno prese sul serio.",
    parti: ["Radice", "Foglie (uso tradizionale)"],
    habitat: "Terreni aridi dell'India, del Nord Africa e del bacino del Mediterraneo; coltivata per l'estrazione.",
    raccolta: { mesi: [10, 11, 12, 1], nota: "La radice si raccoglie dopo la fioritura, quando la pianta ha due o tre anni; si essicca e si macina." },
    proprieta: ["Adattogena", "Sedativa lieve", "Antinfiammatoria", "Immunomodulante"],
    usi: [
      "Stress e difficoltà ad addormentarsi, come supporto",
      "Recupero dopo sforzo fisico, secondo la tradizione",
      "Tradizione ayurvedica come tonico generale"
    ],
    preparazioni: [
      { nome: "Decotto nel latte", ricetta: "3–5 g di radice in polvere in 200 ml di latte o bevanda vegetale, bollire 5 minuti.", dose: "Una tazza la sera, per cicli brevi." },
      { nome: "Estratto titolato", ricetta: "Estratto standardizzato in withanolidi, con titolo e lotto dichiarati.", dose: "Secondo etichetta; sospendere se compaiono sintomi epatici." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Controindicata: la tradizione la considera abortiva e mancano dati di sicurezza.",
      allattamento: "Da evitare, per assenza di dati.",
      bambini: "Non usare senza parere pediatrico.",
      controindicazioni: ["Malattie epatiche", "Ipertiroidismo", "Malattie autoimmuni", "Gravidanza e allattamento"],
      interazioni: ["Sedativi e alcol: sommazione", "Ormoni tiroidei: possibile aumento degli ormoni circolanti", "Immunosoppressori: cautela", "Antidiabetici e antipertensivi: effetto additivo", "Farmaci epatotossici: rischio maggiore"],
      nota: "Sono segnalati rari casi di danno epatico, in parte reversibili. Se compaiono ittero, urine scure, nausea o prurito, sospendere e controllare le transaminasi."
    },
    sosia: [
      { nome: "Altre solanacee", rischio: "La famiglia comprende piante molto tossiche: la radice si compra solo da fornitori tracciati, non si raccoglie per strada." },
      { nome: "«Ginseng indiano» e miscele", rischio: "Il nome commerciale avvicina piante diverse: leggere la specie latina sull'etichetta." }
    ],
    fito: { commestibile: false, parti: "Radice", stagione: "Autunno–inverno", cucina: "Non è un alimento: si usa in polvere o estratto.", nota: "La polvere si conserva al buio e si pesa: le dosi «a cucchiaino» variano troppo." },
    evidenza: "Alcuni studi randomizzati su stress e sonno mostrano benefici modesti, ma sono piccoli e di qualità variabile. Le segnalazioni di epatotossicità sono rare ma documentate: la bilancia rischi-benefici va discussa con il medico.",
    curiosita: "Il nome sanscrito ashwagandha significa «profumo di cavallo»: riferimento all'odore della radice e alla fama di dare forza.",
    fonti: [
      { t: "PubMed · Withania somnifera", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Withania+somnifera" },
      { t: "EMA · Monografie erboristiche", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products/european-union-monographs-list-entries" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  }

]);
