/* ==========================================================================
   Naturopata Digitale · Erbario, parte terza
   Nuove schede A–C: usi tradizionali, sicurezza e fonti.
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.plants = NP.plants.concat([

  {
    id: "achillea",
    nome: "Achillea",
    latino: "Achillea millefolium",
    famiglia: "Asteraceae",
    nomi: ["Millefoglie", "Erba dei soldati", "Erba di San Giovanni"],
    tono: 2,
    categorie: ["Officinale", "Aromatica", "Alimentare"],
    sintesi: "Foglie finissime e ombrelli bianchi: amara, aromatica, tradizionalmente usata per digestione e piccole ferite.",
    descrizione: "Pianta erbacea perenne con rizoma strisciante e foglie profondamente divise in lacinie sottili, da cui il nome millefoglie. I capolini, riuniti in corimbi bianchi o rosati, compaiono da giugno a settembre. Il profumo è intenso e un po' canforaceo. Cresce in prati, margini di strada e pascoli, dal piano alla montagna.",
    parti: ["Sommità fiorite", "Foglie giovani"],
    habitat: "Prati magri, incolti, bordi strada e pascoli fino a circa 2.000 m.",
    raccolta: { mesi: [6, 7, 8, 9], nota: "Tagliare le sommiti fiorite nelle ore asciutte; le foglie più tenere si raccolgono in primavera." },
    proprieta: ["Amaro-tonica", "Antispasmodica", "Antinfiammatoria", "Emostatica tradizionale", "Coleretica lieve"],
    usi: [
      "Digestione lenta, crampi addominali e gonfiore",
      "Perdita temporanea di appetito",
      "Crampi mestruali lievi",
      "Piccole ferite e contusioni come impacco esterno",
      "Dermatiti irritative e prurito localizzato"
    ],
    preparazioni: [
      { nome: "Infuso amaro", ricetta: "1–2 g di sommità fiorite essiccate in 200 ml di acqua a 90 °C, in infusione coperta per 8–10 minuti.", dose: "Una tazza prima dei pasti, fino a tre al giorno per brevi periodi." },
      { nome: "Impacco esterno", ricetta: "2 cucchiai di fiori in 250 ml di acqua calda, lasciare 15 minuti, filtrare e imbibire una garza pulita.", dose: "Applicare su cute integra per 10–15 minuti, una o due volte al giorno." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Dati insufficienti: evitare le preparazioni medicinali. L'infuso occasionale non è una terapia, ma in gravidanza è meglio chiedere parere.",
      allattamento: "Non ci sono dati sufficienti: evitare gli estratti concentrati.",
      bambini: "Non usare preparazioni medicinali sotto i 12 anni senza indicazione del pediatra; l'uso alimentare di foglie giovani è occasionale.",
      controindicazioni: ["Allergia alle Asteraceae", "Dermatite da contatto", "Uso interno di oli essenziali"],
      interazioni: ["Anticoagulanti e antiaggreganti: possibile potenziamento teorico", "Sedativi: effetto additivo lieve"],
      nota: "L'achillea contiene lattoni sesquiterpenici: può provocare allergia cutanea, soprattutto in chi maneggia la pianta fresca. Non usare olio essenziale per via interna."
    },
    sosia: [
      { nome: "Finocchiaccio e altre composite a fiore bianco", rischio: "Alcune ombrellifere tossiche hanno fiori bianchi: riconoscere sempre foglie e profumo prima di raccogliere." }
    ],
    fito: { commestibile: true, parti: "Foglie giovani, fiori", stagione: "Primavera–estate", cucina: "Foglie tenere in insalate amare o frittate, in piccole quantità; i fiori per guarnire.", nota: "Il sapore è amaro e intenso: usare poco e non confonderla con piante a fiore bianco non identificate." },
    evidenza: "La tradizione è solida; gli studi clinici sono pochi e piccoli. Si attribuiscono effetti antispasmodici e digestivi, ma l'evidenza resta limitata e le preparazioni variano molto.",
    curiosita: "Il nome ricorda Achille, che secondo il mito curava le ferite dei soldati con questa pianta. Il numero di lacinie fogliari è variabile: non è un carattere affidabile per il riconoscimento da solo.",
    fonti: [
      { t: "EMA · Millefolii herba", u: "https://www.ema.europa.eu/en/medicines/herbal/millefolii-herba" },
      { t: "PubMed · Achillea millefolium", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Achillea+millefolium+clinical" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "aglio",
    nome: "Aglio",
    latino: "Allium sativum",
    famiglia: "Amaryllidaceae",
    nomi: ["Aglio comune", "Aglio bianco"],
    tono: 1,
    categorie: ["Officinale", "Aromatica", "Alimentare"],
    sintesi: "Il bulbo più studiato della cucina mediterranea: aroma deciso, tradizione lunga e qualche interazione da non sottovalutare.",
    descrizione: "Pianta erbacea bulbosa con foglie lineari e un'infiorescenza sferica. Il bulbo è formato da spicchi avvolti in tuniche bianche o rosate. Crudo ha odore pungente, che si attenua con la cottura. È alimento quotidiano e pianta medicinale: le due cose non vanno confuse, perché gli integratori concentrati hanno effetti e rischi diversi dallo spicchio nel sugo.",
    parti: ["Bulbo", "Foglie giovani"],
    habitat: "Coltivato in orti e campi; raramente inselvatichito.",
    raccolta: { mesi: [6, 7, 8], nota: "Si raccoglie quando le foglie ingialliscono; si lascia asciugare in luogo ventilato e si conserva al buio." },
    proprieta: ["Antibatterico lieve", "Antiaggregante piastrinico", "Ipocolesterolemizzante modesto", "Antipertensivo modesto", "Espettorante tradizionale"],
    usi: [
      "Sintomi del raffreddore comune, come alimento",
      "Supporto a pressione e colesterolo, solo come parte dello stile di vita",
      "Prevenzione delle malattie cardiovascolari, insieme alla dieta",
      "Condimento e conservazione degli alimenti",
      "Tradizione popolare per tosse e catarro"
    ],
    preparazioni: [
      { nome: "Spicchio crudo", ricetta: "Schiacciare uno spicchio e lasciarlo riposare 10 minuti: si forma l'allicina, instabile e volatile. Aggiungerlo a fine cottura.", dose: "1–2 spicchi al giorno, con tolleranza gastrica." },
      { nome: "Olio aromatizzato", ricetta: "Aglio in olio coperto, in frigorifero e per pochi giorni; acidificare con limone se si conserva.", dose: "Usare subito: l'aglio in olio fresco è un terreno favorevole al botulino." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "L'uso alimentare è sicuro. Evitare integratori ad alte dosi e preparati concentrati senza parere: possono aumentare il rischio di sanguinamento.",
      allattamento: "Uso alimentare compatibile; può modificare il sapore del latte. Integratori solo su indicazione.",
      bambini: "Uso alimentare normale. Non somministrare integratori concentrati; l'olio essenziale non va mai dato ai bambini.",
      controindicazioni: ["Ulcera peptica attiva", "Reflusso grave", "Intervento chirurgico programmato", "Allergia alle Liliaceae/Amaryllidaceae"],
      interazioni: ["Warfarin, acenocumarolo e antiaggreganti: rischio emorragico", "Farmaci antipertensivi: effetto additivo", "Antidiabetici: possibile ipoglicemia", "Alcuni antiretrovirali: possibile riduzione dei livelli"],
      nota: "Sospendere gli integratori almeno 7–10 giorni prima di un intervento chirurgico o di un'estrazione dentaria. L'aglio non sostituisce antibiotici né terapie cardiovascolari."
    },
    sosia: [],
    fito: { commestibile: true, parti: "Bulbo, foglie, scapi fiorali", stagione: "Tarda primavera–estate", cucina: "Base di soffritti, salse, conserve; i germogli teneri in insalata. L'aglio nero fermentato è più dolce e digeribile.", nota: "Non usare aglio germogliato o ammuffito. L'aglio in olio fatto in casa va conservato in frigorifero e consumato in pochi giorni." },
    evidenza: "Gli studi suggeriscono un effetto modesto su pressione e colesterolo, soprattutto con estratti invecchiati. L'effetto sul raffreddore è deludente. Il beneficio cardiovascolare va cercato nella dieta complessiva, non in un integratore.",
    curiosita: "L'allicina non esiste nel bulbo intatto: si forma solo quando le cellule vengono rotte, per azione di un enzima. Per questo l'aglio «riposato» dopo il taglio ha un aroma più pieno.",
    fonti: [
      { t: "EMA · Allii sativi bulbus", u: "https://www.ema.europa.eu/en/medicines/herbal/allii-sativi-bulbus" },
      { t: "NCCIH · Garlic", u: "https://www.nccih.nih.gov/health/garlic" },
      { t: "PubMed · Allium sativum", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Allium+sativum+randomized" }
    ]
  },

  {
    id: "altea",
    nome: "Altea",
    latino: "Althaea officinalis",
    famiglia: "Malvaceae",
    nomi: ["Malvavisco", "Bismalva"],
    tono: 3,
    categorie: ["Officinale", "Alimentare"],
    sintesi: "Radice ricca di mucillagini: avvolge e lenisce gola, stomaco e pelle irritata.",
    descrizione: "Pianta erbacea perenne con fusti eretti, foglie vellutate e fiori grandi, rosa pallido, con cinque petali. La radice è carnosa e biancastra, ricca di amidi e mucillagini che a contatto con l'acqua formano un gel. Cresce in terreni umidi, lungo fossi e canali, dal piano alla collina.",
    parti: ["Radice", "Foglie", "Fiori"],
    habitat: "Luoghi umidi, bordi di fossi, canneti e terreni salmastri.",
    raccolta: { mesi: [9, 10, 11], nota: "La radice si raccoglie in autunno da piante di almeno due anni; foglie e fiori in estate, con tempo asciutto." },
    proprieta: ["Emolliente", "Antitussivo di conforto", "Lenitivo delle mucose", "Leggermente antinfiammatoria"],
    usi: [
      "Gola irritata, tosse secca e raucedine",
      "Gastrite lieve e bruciore allo stomaco",
      "Irritazioni della bocca e delle gengive",
      "Pelle secca e arrossata come impacco",
      "Stitichezza lieve per il contenuto di mucillagini"
    ],
    preparazioni: [
      { nome: "Macerato freddo di radice", ricetta: "1–2 cucchiaini di radice essiccata a pezzetti in 200 ml di acqua fredda, lasciare 4–8 ore, mescolare e filtrare senza spremere.", dose: "Due o tre tazze al giorno, lontano dai farmaci." },
      { nome: "Infuso di foglie e fiori", ricetta: "1–2 g di foglie e fiori secchi in 200 ml di acqua a 90 °C per 8 minuti.", dose: "Due tazze al giorno, anche come gargarismo tiepido." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "L'uso alimentare e l'infuso occasionale sono considerati compatibili, ma mancano dati solidi sulle dosi medicinali: chiedere parere.",
      allattamento: "Compatibile alle dosi alimentari; per gli estratti concentrati chiedere al pediatra o al farmacista.",
      bambini: "L'infuso diluito è usato dalla tradizione per la gola; sotto i 3 anni chiedere al pediatra. Attenzione al rischio di soffocamento con pezzi di radice.",
      controindicazioni: ["Allergia alle Malvaceae", "Ostruzione intestinale", "Diabete: la radice contiene amidi"],
      interazioni: ["Farmaci orali: le mucillagini possono ritardare l'assorbimento; distanziare di almeno 2 ore"],
      nota: "Non usare oli essenziali di altea: non ne esistono di uso interno sicuro. La radice essiccata va conservata all'asciutto, lontano da umidità."
    },
    sosia: [
      { nome: "Malva selvatica e malvone", rischio: "Sono commestibili e simili; il malvone ha fiori più grandi e vistosi. Riconoscere sempre foglie e portamento." }
    ],
    fito: { commestibile: true, parti: "Foglie tenere, fiori, radice", stagione: "Primavera–autunno", cucina: "Foglie in minestre, fiori in insalata; la radice si usa per decotti e per la consistenza dolce.", nota: "Le foglie sono leggermente mucillaginose: lavarle bene, soprattutto quelle basse." },
    evidenza: "L'effetto lenitivo delle mucillagini è plausibile e tradizionalmente riconosciuto; gli studi clinici moderni sono scarsi. È un rimedio di conforto, non una cura per infezioni o asma.",
    curiosita: "Il nome latino althaea deriva dal greco altho, «guarire»: già Dioscoride la consigliava per le irritazioni. I pasticcini marshmallow nascono da un preparato di radice di altea.",
    fonti: [
      { t: "EMA · Althaeae radix", u: "https://www.ema.europa.eu/en/medicines/herbal/althaeae-radix" },
      { t: "PubMed · Althaea officinalis", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Althaea+officinalis" },
      { t: "MSD Manual · Integratori", u: "https://www.msdmanuals.com/home/special-subjects/dietary-supplements-and-vitamins/overview-of-dietary-supplements" }
    ]
  },

  {
    id: "anice-verde",
    nome: "Anice verde",
    latino: "Pimpinella anisum",
    famiglia: "Apiaceae",
    nomi: ["Anice", "Anice comune", "Anacio"],
    tono: 3,
    categorie: ["Officinale", "Aromatica", "Alimentare"],
    sintesi: "Piccoli frutti dal profumo di liquirizia: classico rimedio per gonfiore e tosse grassa.",
    descrizione: "Pianta annuale erbacea con foglie divise e piccoli fiori bianchi riuniti in ombrelle. I frutti, spesso chiamati semi, sono grigio-verdi, ovali e striati, con aroma dolce e anisato. È una spezia da forno e da liquori, oltre che una pianta officinale tradizionale per l'apparato digerente.",
    parti: ["Frutti (semi)"],
    habitat: "Coltivata in campi e orti; predilige climi caldi e terreni leggeri.",
    raccolta: { mesi: [8, 9], nota: "Si tagliano le ombrelle quando i frutti sono maturi ma non ancora aperti; si essiccano all'ombra su un telo." },
    proprieta: ["Carminativa", "Antispasmodica", "Espettorante tradizionale", "Aromatizzante", "Galattagogo discusso"],
    usi: [
      "Gonfiore addominale e meteorismo",
      "Crampi digestivi lievi",
      "Tosse con catarro, come supporto di conforto",
      "Aromatizzazione di dolci, pane e liquori",
      "Tradizione popolare per favorire il latte materno, con evidenza debole"
    ],
    preparazioni: [
      { nome: "Infuso di frutti", ricetta: "1–2 g di frutti leggermente schiacciati in 200 ml di acqua a 90 °C per 8–10 minuti.", dose: "Una tazza dopo i pasti, fino a tre al giorno." },
      { nome: "Latte aromatizzato", ricetta: "Un pizzico di frutti in 200 ml di latte caldo, lasciare 5 minuti e filtrare.", dose: "Bevanda occasionale, non un rimedio per i neonati." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare le preparazioni medicinali e l'olio essenziale: dati insufficienti e possibile effetto estrogenico discusso. L'uso come spezia è occasionale.",
      allattamento: "La tradizione lo propone come galattagogo, ma le prove sono deboli. Preferire il parere di un professionista; evitare alcolici e oli essenziali.",
      bambini: "L'infuso molto diluito è usato dalla tradizione per le coliche; sotto i 2 anni chiedere al pediatra. Mai olio essenziale.",
      controindicazioni: ["Allergia alle Apiaceae (finocchio, sedano, carota)", "Malattie epatiche attive", "Uso di oli essenziali in bambini piccoli"],
      interazioni: ["Anticoagulanti: cautela teorica", "Farmaci ormonali: possibile interferenza discussa", "Sedativi: effetto additivo lieve"],
      nota: "L'olio essenziale contiene estragolo e anetolo: non va ingerito senza indicazione professionale. I frutti interi sono la forma più prudente."
    },
    sosia: [
      { nome: "Cicuta e altre ombrellifere velenose", rischio: "Le ombrelle bianche si somigliano: la cicuta ha macchie purpuree sul fusto e odore sgradevole. Non raccogliere ombrellifere senza esperienza." }
    ],
    fito: { commestibile: true, parti: "Frutti, foglie giovani", stagione: "Estate", cucina: "Biscotti, pane, liquori; le foglie in insalate e piatti di pesce.", nota: "Le foglie si confondono facilmente con altre Apiaceae: usare solo quelle coltivate o riconosciute con certezza." },
    evidenza: "L'effetto carminativo è tradizionale e plausibile; studi clinici di buona qualità sono pochi. Per la tosse l'evidenza è limitata. Non esistono prove solide sull'allattamento.",
    curiosita: "L'anice verde è una delle spezie più antiche: semi sono stati trovati in siti archeologici del Mediterraneo. Il profumo viene soprattutto dall'anetolo, che si trova anche nel finocchio e nello star anise.",
    fonti: [
      { t: "EMA · Anisi fructus", u: "https://www.ema.europa.eu/en/medicines/herbal/anisi-fructus" },
      { t: "PubMed · Pimpinella anisum", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Pimpinella+anisum" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "arnica",
    nome: "Arnica",
    latino: "Arnica montana",
    famiglia: "Asteraceae",
    nomi: ["Arnica montana", "Tabacco di montagna", "Starnutiglia"],
    tono: 5,
    categorie: ["Officinale", "Protetta"],
    sintesi: "Il rimedio esterno per contusioni e distorsioni. Da non ingerire mai: l'arnica interna è tossica.",
    descrizione: "Pianta erbacea perenne con rosetta basale di foglie ovali e un capolino giallo-arancio, simile a una grande margherita. Cresce nei prati alpini e subalpini acidi. In molte regioni è protetta e la raccolta è vietata o limitata: si usa soprattutto la pianta coltivata. I preparati per uso esterno si ricavano dai fiori.",
    parti: ["Capolini fioriti"],
    habitat: "Prati acidi, brughiere e pascoli di montagna, tra 800 e 2.500 m.",
    raccolta: { mesi: [6, 7], nota: "In molte regioni la raccolta è protetta: verificare le norme locali. Si raccolgono i capolini appena aperti, con tempo asciutto." },
    proprieta: ["Antinfiammatoria locale", "Analgesica topica", "Rubefacente", "Antiecchimotica tradizionale"],
    usi: [
      "Contusioni, lividi e piccoli traumi chiusi",
      "Distorsioni e dolori muscolari localizzati",
      "Dolore da sforzo, come massaggio delicato",
      "Punture di insetti, sulla cute integra",
      "Non usare su ferite aperte o mucose"
    ],
    preparazioni: [
      { nome: "Oleolito di arnica", ricetta: "Fiori essiccati macerati in olio di girasole o mandorla per 3–4 settimane, al buio, agitando ogni giorno; filtrare.", dose: "Massaggiare sulla zona interessata 2–3 volte al giorno, solo su pelle integra." },
      { nome: "Impacco diluito", ricetta: "Tintura madre diluita 1:10 in acqua tiepida, imbibire una garza e applicare per 15 minuti.", dose: "Una o due volte al giorno; sospendere se compare rossore o prurito." }
    ],
    sicurezza: {
      livello: "rosso",
      gravidanza: "Vietato l'uso interno. L'uso esterno è sconsigliato per insufficienza di dati: chiedere parere.",
      allattamento: "Non applicare sul seno né in prossimità del bambino. Evitare l'uso interno.",
      bambini: "L'uso interno è tossico e vietato. L'uso esterno va limitato e sorvegliato: la pelle dei bambini assorbe di più.",
      controindicazioni: ["Ingestione: nausea, vomito, dolori addominali, aritmie", "Allergia alle Asteraceae", "Cute lesa, ferite aperte, mucose", "Dermatite da contatto"],
      interazioni: ["Warfarin: interazione teorica solo per uso interno, che va comunque evitato", "Sedativi e antiipertensivi: non pertinenti per uso topico corretto"],
      nota: "L'arnica contiene elenalina e lattoni sesquiterpenici: l'ingestione può causare gastroenterite, vertigini e aritmie. In caso di ingestione accidentale chiamare subito il 112 o un Centro Antiveleni. Non confondere l'uso omeopatico diluito con la tintura madre alcolica."
    },
    sosia: [
      { nome: "Iperico e altre composite gialle", rischio: "Le composite a fiore giallo si somigliano. L'arnica ha foglie opposte e capolini solitari: non raccogliere per uso interno." }
    ],
    fito: { commestibile: false, parti: "Nessuna", stagione: "—", cucina: "Non alimentare.", nota: "L'arnica non è commestibile: l'uso interno è tossico e non va mai improvvisato." },
    evidenza: "Per l'uso topico su contusioni e dolori muscolari esistono studi piccoli con risultati contrastanti; il beneficio sintomatico è plausibile. Per l'uso interno non esistono indicazioni sicure.",
    curiosita: "Il nome tabacco di montagna deriva dall'uso popolare di fumare le foglie, pratica da non imitare. In Italia l'arnica montana è protetta in diverse regioni.",
    fonti: [
      { t: "EMA · Arnicae flos", u: "https://www.ema.europa.eu/en/medicines/herbal/arnicae-flos" },
      { t: "PubMed · Arnica topical", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Arnica+topical+randomized" },
      { t: "Ministero della Salute · Flora protetta", u: "https://www.mase.gov.it/pagina/flora-e-vegetazione" }
    ]
  },

  {
    id: "assenzio",
    nome: "Assenzio",
    latino: "Artemisia absinthium",
    famiglia: "Asteraceae",
    nomi: ["Assenzio maggiore", "Erba amara", "Wormwood"],
    tono: 4,
    categorie: ["Officinale", "Aromatica"],
    sintesi: "L'amaro più celebre e più insidioso: utile alla digestione solo per brevi periodi e con molte cautele.",
    descrizione: "Pianta erbacea perenne, grigio-argentata, con foglie profondamente incise e piccoli capolini gialli in pannocchie. Il profumo è forte, amaro e penetrante. È conosciuta per il vermut e per l'assenzio, ma la sua storia è segnata da un composto tossico, la tujone. Oggi l'uso medicinale è limitato, breve e sotto controllo.",
    parti: ["Foglie", "Sommità fiorite"],
    habitat: "Incolti, ruderi, bordi strada e terreni aridi, dal piano alla collina.",
    raccolta: { mesi: [7, 8], nota: "Si raccolgono le sommità fiorite e le foglie prima della piena fioritura; essiccare all'ombra." },
    proprieta: ["Amaro-tonica", "Colagoga", "Antispasmodica", "Antinfiammatoria lieve", "Vermifuga storica"],
    usi: [
      "Perdita temporanea di appetito",
      "Dispepsia con senso di pienezza",
      "Bruciore e disturbi digestivi lievi",
      "Tradizione popolare contro i parassiti intestinali, oggi superata",
      "Aromatizzazione di liquori amari, in quantità minime"
    ],
    preparazioni: [
      { nome: "Infuso amaro", ricetta: "0,5–1 g di sommità essiccate in 200 ml di acqua a 90 °C per 5 minuti; filtrare bene.", dose: "Una tazza prima dei pasti, per non più di 2 settimane." },
      { nome: "Tintura diluita", ricetta: "Tintura madre in acqua, secondo le indicazioni del produttore; mai olio essenziale.", dose: "Solo su consiglio di un professionista, per brevi periodi." }
    ],
    sicurezza: {
      livello: "rosso",
      gravidanza: "Controindicato: la tujone è neurotossica e la pianta è tradizionalmente emmenagoga. Evitare anche le bevande a base di assenzio.",
      allattamento: "Controindicato: mancano dati e il rischio neurotossico non è accettabile.",
      bambini: "Controindicato sotto i 18 anni per le preparazioni medicinali. Mai olio essenziale.",
      controindicazioni: ["Epilessia e disturbi convulsivi", "Malattie epatiche", "Ostruzione o infezione delle vie biliari", "Allergia alle Asteraceae", "Gravidanza e allattamento"],
      interazioni: ["Anticonvulsivanti: possibile riduzione della soglia convulsiva", "Warfarin: cautela teorica", "Sedativi: effetto additivo"],
      nota: "La tujone può causare convulsioni, allucinazioni e insufficienza renale a dosi elevate. L'olio essenziale è il prodotto più pericoloso e non va ingerito. Non prolungare l'uso oltre 2 settimane."
    },
    sosia: [
      { nome: "Artemisie minori e abrotano", rischio: "Altre Artemisia hanno profilo chimico diverso e possono essere tossiche: non sostituirle senza identificazione esperta." }
    ],
    fito: { commestibile: false, parti: "Nessuna", stagione: "—", cucina: "Non alimentare, salvo aromatizzazione minima di liquori secondo normativa.", nota: "Non usare come erba da insalata: l'amaro intenso e la tujone rendono l'uso alimentare improprio." },
    evidenza: "L'effetto amaro e colagogo è tradizionale; gli studi clinici moderni sono scarsi. I rischi superano i benefici per l'automedicazione, soprattutto con oli essenziali.",
    curiosita: "L'assenzio era usato nell'antichità come rimedio contro i vermi intestinali, da cui il nome inglese wormwood. La crisi dell'assenzio nel XIX secolo fu legata soprattutto all'alcol e alle dosi, non solo alla tujone.",
    fonti: [
      { t: "EMA · Absinthii herba", u: "https://www.ema.europa.eu/en/medicines/herbal/absinthii-herba" },
      { t: "PubMed · Artemisia absinthium", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Artemisia+absinthium" },
      { t: "EFSA · Tujone", u: "https://www.efsa.europa.eu/en/topics/topic/thujone" }
    ]
  },

  {
    id: "bardana",
    nome: "Bardana",
    latino: "Arctium lappa",
    famiglia: "Asteraceae",
    nomi: ["Lappola", "Bardana maggiore", "Gobbo"],
    tono: 2,
    categorie: ["Officinale", "Alimentare"],
    sintesi: "Radice profonda e foglie grandi: tradizionalmente depurativa, utile come alimento e per la cura della pelle.",
    descrizione: "Pianta biennale robusta, con foglie larghe e cuoriformi, grigio-verdi nella pagina inferiore, e capolini sferici ricoperti di uncini che si attaccano ai vestiti. La radice è lunga, carnosa e bruno-grigia. Cresce in incolti, margini di strada e vicino alle case.",
    parti: ["Radice", "Foglie", "Frutti (semi)"],
    habitat: "Incolti, ruderi, bordi strada, terreni ricchi di azoto.",
    raccolta: { mesi: [9, 10, 11], nota: "La radice si raccoglie in autunno da piante del primo anno; le foglie giovani in primavera." },
    proprieta: ["Depurativa tradizionale", "Diuretica lieve", "Colagoga", "Antinfiammatoria", "Prebiotica (inulina)"],
    usi: [
      "Disturbi urinari minori, come coadiuvante del lavaggio delle vie urinarie",
      "Perdita temporanea di appetito",
      "Pelle impura e forfora, per uso interno tradizionale e impacco",
      "Stipsi lieve per il contenuto di fibre",
      "Alimento: radice e germogli in cucina"
    ],
    preparazioni: [
      { nome: "Decotto di radice", ricetta: "1–2 g di radice essiccata in 250 ml di acqua, bollire 10–15 minuti a fuoco basso, filtrare.", dose: "Una tazza due volte al giorno, per brevi periodi." },
      { nome: "Impacco per la cute", ricetta: "Decotto filtrato e raffreddato, applicare con garza per 10 minuti.", dose: "Una volta al giorno su cute integra; sospendere se irrita." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare le preparazioni medicinali: dati insufficienti e possibile effetto uterino tradizionalmente riportato.",
      allattamento: "Dati insufficienti: evitare gli estratti concentrati.",
      bambini: "Non usare preparazioni medicinali sotto i 12 anni senza parere; la radice cotta è un alimento.",
      controindicazioni: ["Allergia alle Asteraceae", "Ostruzione delle vie biliari", "Calcoli biliari", "Diabete non controllato"],
      interazioni: ["Diuretici: effetto additivo", "Antidiabetici: possibile ipoglicemia", "Farmaci orali: la fibra può ridurre l'assorbimento"],
      nota: "La bardana accumula nitrati e può assorbire contaminanti: non raccoglierla vicino a strade, discariche o campi trattati. Le foglie possono irritare la pelle."
    },
    sosia: [
      { nome: "Lappola minore e altre Arctium", rischio: "Sono specie affini e commestibili; attenzione alle ombrellifere con foglie larghe, che possono essere velenose." }
    ],
    fito: { commestibile: true, parti: "Radice, germogli, foglie giovani", stagione: "Primavera–autunno", cucina: "Radice in zuppe e padelle, germogli come asparagi, foglie in frittate.", nota: "La radice va pelata e cotta; i frutti a uncino non si mangiano. Raccogliere solo in luoghi puliti." },
    evidenza: "L'uso tradizionale è ampio, ma gli studi clinici sono pochi e di piccola dimensione. L'effetto diuretico e digestivo è plausibile; non ci sono prove che «depuri il sangue».",
    curiosita: "I capolini ispirarono l'inventore del velcro: gli uncini si aggrappano ai tessuti. La radice è un alimento tradizionale in Giappone, dove si chiama gobo.",
    fonti: [
      { t: "EMA · Arctii radix", u: "https://www.ema.europa.eu/en/medicines/herbal/arctii-radix" },
      { t: "PubMed · Arctium lappa", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Arctium+lappa" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "basilico",
    nome: "Basilico",
    latino: "Ocimum basilicum",
    famiglia: "Lamiaceae",
    nomi: ["Basilico genovese", "Basilico dolce"],
    tono: 1,
    categorie: ["Aromatica", "Alimentare", "Officinale"],
    sintesi: "Il profumo dell'estate: in cucina è insostituibile, in tisana è un delicato digestivo.",
    descrizione: "Pianta annuale aromatica con fusti quadrangolari e foglie ovali, lucide, di un verde intenso. I fiori sono piccoli e bianchi, riuniti in spighe. Esistono molti chemiotipi, dal genovese al thai, con profumi diversi. Il basilico è soprattutto un alimento: gli oli essenziali concentrati non sono equivalenti alle foglie fresche.",
    parti: ["Foglie", "Sommità fiorite"],
    habitat: "Coltivato in orti, vasi e serre; teme il freddo.",
    raccolta: { mesi: [6, 7, 8, 9], nota: "Cimare le sommità per favorire l'accestimento; raccogliere al mattino, prima del caldo." },
    proprieta: ["Digestiva", "Carminativa", "Antispasmodica lieve", "Aromatizzante", "Leggermente antisettica"],
    usi: [
      "Digestione difficile e gonfiore, in tisana",
      "Alito e igiene del cavo orale",
      "Aromatizzazione di piatti, salse e conserve",
      "Tensione nervosa lieve, per il profumo",
      "Tradizione popolare per la tosse, come bevanda calda"
    ],
    preparazioni: [
      { nome: "Infuso digestivo", ricetta: "5–6 foglie fresche o 1 g di foglie secche in 200 ml di acqua a 85–90 °C per 5 minuti.", dose: "Una tazza dopo i pasti." },
      { nome: "Olio aromatizzato", ricetta: "Foglie asciugate e coperte d'olio, in frigorifero, per pochi giorni.", dose: "Usare su piatti cotti; non conservare a lungo a temperatura ambiente." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "L'uso alimentare è sicuro. Evitare oli essenziali e integratori concentrati: l'estragolo è discusso e i dati sono insufficienti.",
      allattamento: "Uso alimentare compatibile. Evitare oli essenziali.",
      bambini: "Uso alimentare normale. Mai olio essenziale per via interna, nemmeno in gocce sul cibo.",
      controindicazioni: ["Allergia alle Lamiaceae", "Uso interno di olio essenziale", "Reflusso grave (per alcuni chemiotipi)"],
      interazioni: ["Anticoagulanti: cautela teorica con estratti concentrati", "Sedativi: effetto additivo lieve"],
      nota: "L'olio essenziale di basilico contiene estragolo e metileugenolo: non va ingerito in autonomia. La tisana con foglie è la forma più prudente."
    },
    sosia: [],
    fito: { commestibile: true, parti: "Foglie, fiori", stagione: "Estate", cucina: "Pesto, insalate, sughi, zuppe; i fiori come guarnizione.", nota: "Lavare bene le foglie; il basilico fresco non sopporta la cottura prolungata." },
    evidenza: "Studi preliminari suggeriscono proprietà antimicrobiche e antinfiammatorie degli estratti, ma mancano prove cliniche solide. In cucina il beneficio è soprattutto sensoriale e digestivo.",
    curiosita: "Il basilico arrivò in Europa dalle rotte orientali e divenne simbolo della cucina ligure. Ogni chemiotipo ha un profumo diverso: quello genovese è ricco di linalolo.",
    fonti: [
      { t: "PubMed · Ocimum basilicum", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Ocimum+basilicum+clinical" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" },
      { t: "EFSA · Estragolo", u: "https://www.efsa.europa.eu/en/topics/topic/flavouring-substances" }
    ]
  }
,

  {
    id: "betulla",
    nome: "Betulla",
    latino: "Betula pendula",
    famiglia: "Betulaceae",
    nomi: ["Betulla bianca", "Betulla verrucosa"],
    tono: 3,
    categorie: ["Officinale"],
    sintesi: "Foglie leggere e corteccia bianca: un diuretico delicato, da usare solo per brevi periodi.",
    descrizione: "Albero slanciato con corteccia bianca che si sfoglia in strisce e foglie triangolari, dentate, che diventano gialle in autunno. Le infiorescenze maschili sono lunghi amenti penduli. È una specie pioniera dei boschi e dei terreni disturbati, comune in tutta Italia fino alla montagna.",
    parti: ["Foglie", "Gemme", "Corteccia (uso esterno)"],
    habitat: "Boschi, radure, terreni acidi e pendii, dal piano alla montagna.",
    raccolta: { mesi: [5, 6, 7], nota: "Si raccolgono le foglie giovani e ben sviluppate, con tempo asciutto, lasciando intatta la chioma. Non si incide la corteccia." },
    proprieta: ["Diuretica", "Antinfiammatoria lieve", "Depurativa tradizionale", "Astringente"],
    usi: [
      "Disturbi urinari minori, come coadiuvante del lavaggio delle vie urinarie",
      "Ritenzione idrica lieve",
      "Dolori reumatici, per tradizione",
      "Pelle impura e forfora, come impacco",
      "Cellulite e gonfiore, insieme a movimento e dieta"
    ],
    preparazioni: [
      { nome: "Infuso di foglie", ricetta: "1–2 g di foglie essiccate in 200 ml di acqua a 90 °C per 10 minuti.", dose: "Una tazza due o tre volte al giorno, per non più di 2–3 settimane." },
      { nome: "Impacco per la cute", ricetta: "Infuso più concentrato, raffreddato, su garza per 10 minuti.", dose: "Una volta al giorno su cute integra." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare le preparazioni medicinali: dati insufficienti. L'infuso occasionale non è raccomandato come terapia.",
      allattamento: "Dati insufficienti: evitare gli estratti concentrati.",
      bambini: "Non usare come diuretico sotto i 12 anni senza parere medico.",
      controindicazioni: ["Insufficienza cardiaca o renale con restrizione idrica", "Edemi da cause cardiache o renali", "Allergia al polline di betulla", "Calcoli renali"],
      interazioni: ["Diuretici: effetto additivo", "Farmaci per la pressione: possibile potenziamento", "Digossina: cautela per squilibri di potassio"],
      nota: "La betulla non cura un'infezione urinaria e non sostituisce gli antibiotici. Se compare febbre, sangue nelle urine o dolore al fianco, serve una visita. La linfa di betulla va consumata solo se prodotta con criteri igienici e con il permesso del proprietario del bosco."
    },
    sosia: [],
    fito: { commestibile: false, parti: "Nessuna di uso comune", stagione: "—", cucina: "Non è una pianta alimentare; la linfa è una bevanda tradizionale, non un rimedio sicuro.", nota: "Non confondere con altre betulle ornamentali: il riconoscimento serve anche per non danneggiare gli alberi." },
    evidenza: "L'effetto diuretico è documentato soprattutto dalla tradizione e da studi piccoli; l'evidenza clinica è limitata. Non ci sono prove solide per reumatismi o cellulite.",
    curiosita: "La corteccia di betulla contiene betulina, studiata per le sue proprietà antinfiammatorie. In Scandinavia è un materiale tradizionale per tetti e contenitori.",
    fonti: [
      { t: "EMA · Betulae folium", u: "https://www.ema.europa.eu/en/medicines/herbal/betulae-folium" },
      { t: "PubMed · Betula pendula", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Betula+pendula+leaf" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "cannella",
    nome: "Cannella",
    latino: "Cinnamomum verum",
    famiglia: "Lauraceae",
    nomi: ["Cannella di Ceylon", "Cannella vera", "Cinnamomo"],
    tono: 4,
    categorie: ["Aromatica", "Alimentare", "Officinale"],
    sintesi: "Una spezia calda e rassicurante: ottima in cucina, da non trasformare in gocce fai-da-te.",
    descrizione: "Sempreverde tropicale con foglie coriacee e corteccia interna che, essiccata e arrotolata, forma le cannucce commerciali. La cannella di Ceylon è più sottile e delicata della cassia, più comune e ricca di cumarina. Il profumo viene dalla cinnamaldeide, responsabile anche dell'irritazione cutanea dell'olio essenziale.",
    parti: ["Corteccia", "Olio essenziale"],
    habitat: "Coltivata nei tropici umidi; non cresce all'aperto in Italia.",
    raccolta: { mesi: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], nota: "La corteccia si ricava dai polloni dopo la stagione delle piogge; in commercio arriva già essiccata." },
    proprieta: ["Carminativa", "Aromatizzante", "Antimicrobica lieve", "Ipoglicemizzante discussa", "Riscaldante"],
    usi: [
      "Digestione lenta, gonfiore e meteorismo",
      "Aromatizzazione di dolci, bevande e piatti speziati",
      "Supporto alla glicemia, con evidenza modesta e non come terapia",
      "Bagni e impacchi caldi per la circolazione",
      "Tradizione popolare per il raffreddore"
    ],
    preparazioni: [
      { nome: "Infuso di corteccia", ricetta: "Un pezzetto di corteccia (1–2 g) in 200 ml di acqua a 90 °C per 10 minuti.", dose: "Una tazza dopo i pasti, occasionalmente." },
      { nome: "Latte speziato", ricetta: "Corteccia in latte caldo con un pizzico di zenzero e chiodi di garofano, filtrare.", dose: "Bevanda occasionale, non per i bambini piccoli." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "L'uso come spezia è accettabile. Evitare alte dosi, integratori e olio essenziale: la cumarina della cassia e la cinnamaldeide pongono dubbi.",
      allattamento: "Uso alimentare compatibile. Evitare oli essenziali e integratori concentrati.",
      bambini: "Uso come spezia in quantità minime. Mai olio essenziale, nemmeno diluito sulla pelle dei più piccoli.",
      controindicazioni: ["Malattie epatiche", "Allergia alla cannella e alle Lauraceae", "Uso interno di olio essenziale", "Dermatite da contatto"],
      interazioni: ["Anticoagulanti: la cumarina della cassia può aumentare il rischio emorragico", "Antidiabetici: possibile ipoglicemia", "Farmaci epatotossici: cautela"],
      nota: "Preferire la cannella di Ceylon alla cassia per l'uso frequente: contiene molta meno cumarina. L'olio essenziale puro non va ingerito né applicato puro sulla pelle. Non assumere integratori di cannella in gravidanza o con terapie anticoagulanti senza parere."
    },
    sosia: [
      { nome: "Cassia (Cinnamomum cassia)", rischio: "È la cannella più diffusa e più economica, ma contiene più cumarina. Leggere l'etichetta e non usare dosi elevate a lungo." }
    ],
    fito: { commestibile: true, parti: "Corteccia", stagione: "Tutto l'anno (prodotto essiccato)", cucina: "Dolci, bevande, curry, arrosti, conserve di frutta.", nota: "La cannella in polvere è sicura come spezia; l'olio essenziale è un prodotto concentrato, non un condimento." },
    evidenza: "Alcuni studi mostrano riduzioni modeste della glicemia a digiuno, ma i risultati sono incoerenti e le formulazioni diverse. Non sostituisce dieta, movimento o farmaci per il diabete.",
    curiosita: "La cannella di Ceylon si chiama anche «cannella vera» e si arrotola a strati sottili come un sigaro. Nel Medioevo era tra le spezie più costose e veniva usata anche per conservare le carni.",
    fonti: [
      { t: "EMA · Cinnamomi cortex", u: "https://www.ema.europa.eu/en/medicines/herbal/cinnamomi-cortex" },
      { t: "EMA · Cinnamomi corticis aetheroleum", u: "https://www.ema.europa.eu/en/medicines/herbal/cinnamomi-corticis-aetheroleum" },
      { t: "EFSA · Cumarina", u: "https://www.efsa.europa.eu/en/topics/topic/coumarin" }
    ]
  },

  {
    id: "cardo-mariano",
    nome: "Cardo mariano",
    latino: "Silybum marianum",
    famiglia: "Asteraceae",
    nomi: ["Cardo di Santa Maria", "Silimaro", "Milk thistle"],
    tono: 4,
    categorie: ["Officinale"],
    sintesi: "Foglie maculate e fiori viola: i semi contengono la silimarina, studiata per il fegato.",
    descrizione: "Pianta annuale o biennale robusta, con foglie lucide e spinose, attraversate da venature bianche che formano un disegno a rete. I capolini sono viola e circondati da brattee spinose. I frutti sono acheni scuri con un ciuffo di setole. Cresce in incolti, margini di strada e terreni aridi.",
    parti: ["Frutti (semi)"],
    habitat: "Incolti, ruderi, bordi strada e pascoli aridi, dal piano alla collina.",
    raccolta: { mesi: [8, 9], nota: "Si raccolgono i capolini quando gli acheni sono maturi, con guanti; si separano i semi e si essiccano." },
    proprieta: ["Epatoprotettiva studiata", "Antiossidante", "Digestiva", "Colagoga lieve"],
    usi: [
      "Dispepsia e senso di pienezza",
      "Supporto alla funzione epatica, dopo aver escluso cause serie",
      "Sensazione di affaticamento digestivo",
      "Tradizione popolare per il fegato affaticato",
      "Supporto antiossidante, con evidenza limitata"
    ],
    preparazioni: [
      { nome: "Infuso di semi schiacciati", ricetta: "1–2 g di semi leggermente pestati in 200 ml di acqua a 90 °C per 10 minuti.", dose: "Una tazza due volte al giorno, lontano dai pasti." },
      { nome: "Estratto standardizzato", ricetta: "Solo prodotti con silimarina dichiarata e dosaggio indicato in etichetta.", dose: "Non improvvisare dosi: seguire il foglietto e chiedere parere se si assumono farmaci." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Dati insufficienti: evitare gli integratori. L'uso alimentare dei semi non è una terapia.",
      allattamento: "Dati insufficienti: evitare gli integratori concentrati.",
      bambini: "Non usare integratori senza indicazione del pediatra.",
      controindicazioni: ["Allergia alle Asteraceae", "Ostruzione delle vie biliari", "Malattia epatica acuta o grave", "Calcoli biliari"],
      interazioni: ["Antidiabetici: possibile ipoglicemia", "Farmaci metabolizzati dal fegato: cautela teorica", "Anticoagulanti: monitorare se si usano alte dosi"],
      nota: "Il cardo mariano non cura l'epatite, la cirrosi o il fegato grasso: è un supporto discusso. Un aumento di transaminasi, ittero o dolore al fegato richiede una visita medica, non un integratore."
    },
    sosia: [
      { nome: "Cardo asinino e altri cardi spinosi", rischio: "Diversi cardi si somigliano; non tutti sono adatti all'uso alimentare o medicinale." }
    ],
    fito: { commestibile: true, parti: "Giovani foglie senza spine, ricettacolo, semi", stagione: "Primavera–estate", cucina: "Il ricettacolo si cucina come il carciofo; le foglie giovani sbollentate in zuppe.", nota: "Le spine sono robuste: maneggiare con guanti e non raccogliere esemplari vecchi." },
    evidenza: "La silimarina è tra le sostanze vegetali più studiate in epatologia, ma i risultati clinici sono deludenti nelle malattie epatiche gravi. Può ridurre lievi disturbi digestivi; non è una cura.",
    curiosita: "Le macchie bianche sulle foglie furono interpretate come il latte della Vergine, da cui il nome. La silimarina è un complesso di flavonolignani, non una singola molecola.",
    fonti: [
      { t: "EMA · Silybi mariani fructus", u: "https://www.ema.europa.eu/en/medicines/herbal/silybi-mariani-fructus" },
      { t: "PubMed · Silymarin", u: "https://pubmed.ncbi.nlm.nih.gov/?term=silymarin+randomized+controlled" },
      { t: "NCCIH · Milk thistle", u: "https://www.nccih.nih.gov/health/milk-thistle" }
    ]
  },

  {
    id: "carciofo",
    nome: "Carciofo",
    latino: "Cynara cardunculus",
    famiglia: "Asteraceae",
    nomi: ["Cynara scolymus", "Carciofo comune"],
    tono: 2,
    categorie: ["Officinale", "Alimentare"],
    sintesi: "Il cuore del carciofo è un alimento; le foglie sono la parte usata per digestione e fegato.",
    descrizione: "Pianta erbacea perenne con grandi foglie incise, grigio-verdi, e un capolino commestibile formato da brattee carnose. È coltivata soprattutto nel Mediterraneo. Le foglie, ricche di cinarina e flavonoidi, hanno un sapore amaro e sono la parte utilizzata nei preparati digestivi.",
    parti: ["Foglie", "Capolini (alimento)"],
    habitat: "Coltivato in orti e campi; predilige clima mite e terreni profondi.",
    raccolta: { mesi: [3, 4, 5, 6], nota: "Le foglie si raccolgono prima della fioritura; i capolini quando sono compatti e ben chiusi." },
    proprieta: ["Coleretica", "Colagoga", "Digestiva", "Ipocolesterolemizzante modesta", "Antiossidante"],
    usi: [
      "Indigestione, senso di pienezza e gonfiore",
      "Supporto al fegato e alla secrezione biliare, per tradizione",
      "Colesterolo, come coadiuvante dello stile di vita",
      "Alimento: cuore, gambi e capolini",
      "Tradizione popolare per la diuresi"
    ],
    preparazioni: [
      { nome: "Infuso di foglie", ricetta: "1–2 g di foglie essiccate in 200 ml di acqua a 90 °C per 8 minuti.", dose: "Una tazza prima dei pasti, per brevi periodi." },
      { nome: "Decotto di gambi", ricetta: "Gambi puliti e tagliati, bolliti in acqua salata; il liquido si può bere come brodo amaro.", dose: "Alimento occasionale, non un rimedio concentrato." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "L'alimento è sicuro. Evitare preparati medicinali: dati insufficienti e possibile effetto sulla bile.",
      allattamento: "L'alimento è compatibile; evitare estratti concentrati.",
      bambini: "L'alimento è adatto. Non usare preparati medicinali senza parere.",
      controindicazioni: ["Ostruzione delle vie biliari", "Calcoli biliari sintomatici", "Allergia alle Asteraceae", "Malattia epatica acuta"],
      interazioni: ["Anticoagulanti: cautela teorica", "Diuretici: effetto additivo", "Farmaci per il colesterolo: possibile potenziamento modesto"],
      nota: "Con calcoli biliari o dolore al fianco destro, non usare preparati di carciofo prima di una valutazione medica. Le foglie non sostituiscono una terapia per il colesterolo."
    },
    sosia: [
      { nome: "Cardo selvatico e cardo mariano", rischio: "I cardi spinosi si somigliano; il carciofo coltivato è la scelta sicura per l'alimentazione." }
    ],
    fito: { commestibile: true, parti: "Capolini, gambi, cuore", stagione: "Primavera", cucina: "Bolliti, al forno, in padella; i gambi in zuppe. Le brattee esterne sono fibrose.", nota: "Non mangiare foglie crude in grandi quantità: sono molto amare e ricche di fibre." },
    evidenza: "Alcuni studi mostrano una modesta riduzione del colesterolo con estratti di foglie; l'effetto digestivo è tradizionale. Le prove restano limitate e le preparazioni diverse.",
    curiosita: "Il carciofo è un fiore non ancora sbocciato: se lo si lascia maturare, si apre in un grande capolino viola-blu. La cinarina è responsabile dell'amaro e dell'effetto sulla bile.",
    fonti: [
      { t: "EMA · Cynarae folium", u: "https://www.ema.europa.eu/en/medicines/herbal/cynarae-folium" },
      { t: "PubMed · Cynara scolymus", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Cynara+scolymus+cholesterol" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "centella",
    nome: "Centella",
    latino: "Centella asiatica",
    famiglia: "Apiaceae",
    nomi: ["Erba tigre", "Gotu kola", "Idrocotile asiatico"],
    tono: 3,
    categorie: ["Officinale"],
    sintesi: "Piccola pianta strisciante dal sapore amaro: tradizionale per la pelle e la microcircolazione.",
    descrizione: "Pianta erbacea perenne strisciante, con foglie reniformi e piccoli fiori bianchi. Cresce in ambienti umidi e ombrosi dell'Asia. Contiene triterpeni, tra cui l'asiaticoside, studiati per la guarigione delle ferite e la parete dei vasi. In Europa è diffusa soprattutto come integratore e cosmetico.",
    parti: ["Parti aeree"],
    habitat: "Ambienti umidi e tropicali dell'Asia; coltivata anche in Europa come pianta medicinale.",
    raccolta: { mesi: [5, 6, 7, 8, 9], nota: "Si raccolgono le parti aeree durante la stagione vegetativa; in commercio arriva essiccata o in estratto." },
    proprieta: ["Vulneraria", "Venotonica", "Antiossidante", "Antinfiammatoria", "Cicatrizzante"],
    usi: [
      "Piccole ferite e cicatrici, per uso esterno",
      "Insufficienza venosa lieve e gambe pesanti",
      "Microcircolazione e fragilità capillare",
      "Tradizione per memoria e concentrazione, con evidenza debole",
      "Cellulite e gonfiore, come supporto"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1 g di parti aeree essiccate in 200 ml di acqua a 90 °C per 8 minuti.", dose: "Una tazza al giorno, per brevi periodi." },
      { nome: "Crema o oleolito", ricetta: "Estratto o polvere in crema neutra, secondo le indicazioni del prodotto.", dose: "Applicare su cute integra una o due volte al giorno." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare: dati insufficienti e possibile effetto uterino tradizionalmente riportato.",
      allattamento: "Evitare gli estratti concentrati: dati insufficienti.",
      bambini: "Non usare integratori senza parere del pediatra.",
      controindicazioni: ["Malattie epatiche", "Allergia alle Apiaceae", "Uso orale prolungato ad alte dosi", "Interventi chirurgici programmati"],
      interazioni: ["Sedativi: possibile effetto additivo", "Farmaci epatotossici: cautela", "Antidiabetici: cautela teorica"],
      nota: "Sono stati segnalati rari casi di danno epatico con estratti orali prolungati. Se compaiono stanchezza, nausea, urine scure o ittero, sospendere e consultare un medico. Non usare come «potenziatore cognitivo» senza basi."
    },
    sosia: [
      { nome: "Centella europea e altre ombrellifere striscianti", rischio: "Le foglie reniformi si somigliano: non raccogliere ombrellifere spontanee senza esperienza." }
    ],
    fito: { commestibile: true, parti: "Foglie tenere", stagione: "Primavera–estate", cucina: "Usata come verdura in alcune cucine asiatiche, in zuppe e insalate.", nota: "Il sapore è amaro; in Europa è più comune come integratore che come alimento. Non confonderla con piante selvatiche simili." },
    evidenza: "Per l'insufficienza venosa e la cicatrizzazione esistono studi di qualità moderata con effetti modesti. Per memoria e ansia le prove sono deboli e non concluse.",
    curiosita: "Il nome gotu kola è usato in Ayurveda, dove la pianta ha una lunga tradizione. Le foglie hanno una forma che ricorda un rene o un ombrello.",
    fonti: [
      { t: "EMA · Centellae asiaticae herba", u: "https://www.ema.europa.eu/en/medicines/herbal/centellae-asiaticae-herba" },
      { t: "PubMed · Centella asiatica", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Centella+asiatica+randomized" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "coriandolo",
    nome: "Coriandolo",
    latino: "Coriandrum sativum",
    famiglia: "Apiaceae",
    nomi: ["Cilantro", "Coriandolo comune"],
    tono: 1,
    categorie: ["Aromatica", "Alimentare", "Officinale"],
    sintesi: "Foglie dal profumo diviso e semi dolci: due piante quasi diverse nello stesso nome.",
    descrizione: "Pianta annuale con foglie basali larghe e foglie superiori finemente divise, fiori bianchi in ombrelle e frutti sferici striati. Le foglie fresche hanno un aroma che alcune persone percepiscono come saponoso; i semi, essiccati, sono dolci e agrumati. È una spezia diffusa in tutto il mondo.",
    parti: ["Frutti (semi)", "Foglie"],
    habitat: "Coltivato in orti e campi; si adatta a climi temperati.",
    raccolta: { mesi: [6, 7, 8], nota: "Le foglie si raccolgono giovani; i semi quando le ombrelle ingialliscono, poi si essiccano." },
    proprieta: ["Carminativo", "Digestivo", "Aromatizzante", "Antimicrobico lieve", "Leggermente ansiolitico (studi preliminari)"],
    usi: [
      "Gonfiore e digestione difficile, con i semi in infuso",
      "Aromatizzazione di curry, salse e piatti etnici",
      "Tradizione popolare per l'ansia lieve, con evidenza debole",
      "Conservazione di carni e verdure",
      "Alito e freschezza del cavo orale"
    ],
    preparazioni: [
      { nome: "Infuso di semi", ricetta: "1 g di semi schiacciati in 200 ml di acqua a 90 °C per 8 minuti.", dose: "Una tazza dopo i pasti, occasionalmente." },
      { nome: "Pesto di coriandolo", ricetta: "Foglie fresche frullate con olio, aglio, lime e sale; conservare in frigorifero pochi giorni.", dose: "Condimento, non integratore." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "L'uso alimentare è sicuro. Evitare oli essenziali ed estratti concentrati: dati insufficienti.",
      allattamento: "Uso alimentare compatibile. Evitare oli essenziali.",
      bambini: "Uso alimentare normale. Mai olio essenziale per via interna.",
      controindicazioni: ["Allergia alle Apiaceae", "Uso interno di olio essenziale", "Dermatite da contatto"],
      interazioni: ["Sedativi: cautela teorica con estratti concentrati", "Anticoagulanti: cautela teorica"],
      nota: "L'olio essenziale di coriandolo è concentrato e non va ingerito in autonomia. Le foglie sono un alimento: lavarle bene, soprattutto se mangiate crude."
    },
    sosia: [
      { nome: "Prezzemolo e altre ombrellifere", rischio: "Le foglie si somigliano; la cicuta e altre Apiaceae velenose crescono negli stessi ambienti. Raccogliere solo ciò che si riconosce con certezza." }
    ],
    fito: { commestibile: true, parti: "Foglie, semi", stagione: "Primavera–estate", cucina: "Salse, curry, insalate, zuppe; i semi nei dolci e nei liquori.", nota: "Le foglie perdono aroma con la cottura prolungata: aggiungerle alla fine." },
    evidenza: "Gli studi sugli estratti suggeriscono effetti ansiolitici e digestivi lievi, ma sono piccoli e preliminari. L'uso culinario è sicuro e consolidato.",
    curiosita: "La parola coriandolo deriva dal greco koris, «cimice», per l'odore delle foglie. In alcune lingue il nome della pianta e quello della foglia sono diversi, come cilantro e coriander.",
    fonti: [
      { t: "PubMed · Coriandrum sativum", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Coriandrum+sativum+anxiety" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" },
      { t: "EFSA · Sicurezza degli oli essenziali", u: "https://www.efsa.europa.eu/en/topics/topic/flavouring-substances" }
    ]
  },

  {
    id: "curcuma",
    nome: "Curcuma",
    latino: "Curcuma longa",
    famiglia: "Zingiberaceae",
    nomi: ["Zafferano delle Indie", "Turmeric", "Curcuma domestica"],
    tono: 4,
    categorie: ["Aromatica", "Alimentare", "Officinale"],
    sintesi: "Il rizoma giallo del curry: buona spezia, integratore sopravvalutato e da usare con cautela.",
    descrizione: "Pianta erbacea tropicale con grandi foglie e rizoma carnoso, arancione all'interno. La polvere gialla si ottiene dal rizoma essiccato e contiene curcumina, responsabile del colore e di gran parte dell'interesse scientifico. È la spezia base del curry, non un farmaco miracoloso.",
    parti: ["Rizoma"],
    habitat: "Coltivata nei tropici umidi; in Italia solo in vaso o serra.",
    raccolta: { mesi: [10, 11, 12], nota: "Il rizoma si raccoglie a fine stagione, si lessa e si essicca prima di macinarlo." },
    proprieta: ["Antinfiammatoria discussa", "Antiossidante", "Colagoga", "Digestiva", "Colorante"],
    usi: [
      "Dispepsia, pienezza e gonfiore, come spezia",
      "Dolori articolari lievi, con evidenza modesta",
      "Aromatizzazione di curry, riso e legumi",
      "Conservazione e colorazione degli alimenti",
      "Tradizione popolare per la pelle e le ferite, per uso esterno"
    ],
    preparazioni: [
      { nome: "Latte d'oro", ricetta: "Mezzo cucchiaino di curcuma in 200 ml di latte caldo con pepe nero e un po' di grasso, per favorire l'assorbimento.", dose: "Bevanda occasionale, non una terapia." },
      { nome: "Curry in cucina", ricetta: "Curcuma tostata brevemente in olio con altre spezie, poi aggiunta al piatto.", dose: "Quantità culinarie, 1–3 g al giorno al massimo come spezia." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "L'uso come spezia è accettabile. Evitare integratori ad alta biodisponibilità: dati insufficienti e possibile effetto sulla bile.",
      allattamento: "Uso alimentare compatibile. Evitare integratori concentrati.",
      bambini: "Uso come spezia in quantità minime. Non usare integratori senza parere.",
      controindicazioni: ["Ostruzione delle vie biliari", "Colangite", "Calcoli biliari", "Malattie epatiche", "Allergia alle Zingiberaceae"],
      interazioni: ["Anticoagulanti: possibile aumento del rischio emorragico", "Antidiabetici: possibile ipoglicemia", "Farmaci metabolizzati dal fegato: cautela", "Chemioterapici: chiedere all'oncologo"],
      nota: "La curcumina è poco assorbita e gli integratori ad alta biodisponibilità sono stati associati a casi di danno epatico. Non usare alte dosi in gravidanza, con calcoli biliari o prima di un intervento. La curcuma non sostituisce un antinfiammatorio prescritto."
    },
    sosia: [
      { nome: "Curcuma aromatica e altre curcume", rischio: "Specie affini possono avere composizione diversa; per uso alimentare acquistare prodotti tracciati." }
    ],
    fito: { commestibile: true, parti: "Rizoma", stagione: "Tutto l'anno (prodotto essiccato)", cucina: "Curry, riso, legumi, zuppe, conserve; ottima con pepe nero e grassi.", nota: "Macchia mani e tessuti: usare guanti. Il sapore è amaro e terroso, meglio tostarla brevemente." },
    evidenza: "Molti studi preliminari, pochi risultati solidi: per l'artrosi l'effetto è modesto e inferiore ai farmaci; per la depressione e la prevenzione le prove sono insufficienti. L'assorbimento della curcumina è scarso.",
    curiosita: "Il colore giallo della curcuma è usato da secoli come tintura per tessuti e come cosmetico. Il pepe nero aumenta l'assorbimento della curcumina, ma non trasforma una spezia in una terapia.",
    fonti: [
      { t: "EMA · Curcumae longae rhizoma", u: "https://www.ema.europa.eu/en/medicines/herbal/curcumae-longae-rhizoma" },
      { t: "NCCIH · Turmeric", u: "https://www.nccih.nih.gov/health/turmeric" },
      { t: "PubMed · Curcumin", u: "https://pubmed.ncbi.nlm.nih.gov/?term=curcumin+randomized+controlled" }
    ]
  }

]);
