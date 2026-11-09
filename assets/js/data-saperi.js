/* ==========================================================================
   Naturopata Digitale · saperi antichi
   Spezierie storiche, amari d'abbazia, tempo balsamico, funghi, estrazioni.
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria

   Nota di metodo: i contenuti sono divulgativi e descrivono tradizioni e
   pratiche. Non sono prescrizioni, non indicano dosi terapeutiche e non
   sostituiscono medico, farmacista o micologo.
   ========================================================================== */

window.NP = window.NP || {};

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Spezierie e liquorerie storiche
     ------------------------------------------------------------------------ */

  NP.spezierie = [
    {
      id: "casamari",
      nome: "Liquoreria e Farmacia dell’Abbazia di Casamari",
      luogo: "Veroli (FR), Ciociaria",
      epoca: "farmacia dal 1761 · liquoreria fra Sette e Ottocento",
      cosa: ["Tintura Imperiale", "Elisir Sett’Erbe", "Gocce Imperiali", "miele e prodotti delle api"],
      storia: "Il nome del luogo viene da Casa Marii, la casa di Caio Mario: i cistercensi arrivano nel 1140 e consacrano la chiesa nel 1217. Nel Settecento l’abbazia organizza una farmacia vera e propria: l’Epistolario De Jacobis racconta di un frate speziale che acquistava a Roma le piante che non trovava in Ciociaria, e nel 1822 la farmacia ottiene la patente. Dalla stessa officina nascono l’elisir setterbe e la tintura imperiale che ancora oggi si producono nella liquoreria.",
      perche: "È il caso più chiaro di una spezieria monastica rimasta officina: le ricette galeniche e i liquori escono dallo stesso erbario, con le stesse piante e le stesse mani.",
      link: [
        { t: "Sito dell’Abbazia di Casamari", u: "https://www.abbaziadicasamari.it/" },
        { t: "Negozio dell’abbazia", u: "https://www.abbaziadicasamari.it/index.php/negozio" }
      ],
      visita: "Visitabile tutti i giorni, con orari che cambiano secondo la vita monastica: controlla prima di partire. Ingresso libero.",
      attenzione: "I liquori sono bevande alcoliche: non adatti a bambini, gravidanza e allattamento, e da evitare se assumi farmaci senza parere."
    },
    {
      id: "santa-maria-novella",
      nome: "Officina Profumo-Farmaceutica di Santa Maria Novella",
      luogo: "Firenze, via della Scala 16",
      epoca: "domenicani dal 1221 · officina aperta al pubblico dal 1612",
      cosa: ["Acqua della Regina", "Acqua di rose", "elisir e amari storici", "saponi, cera e profumi"],
      storia: "I frati domenicani di Santa Maria Novella preparavano medicamenti nell’orto del convento già nel Duecento. L’officina si apre al pubblico nel 1612 e diventa uno dei luoghi dove la spezieria italiana incontra il profumo: le acque distillate, i saponi e gli elisir nascono come rimedi e finiscono per diventare oggetti di culto.",
      perche: "Mostra il passaggio dalla spezieria al banco di vendita: la stessa bottega che preparava rimedi oggi conserva ricette, vetrine e archivi visitabili.",
      link: [{ t: "Sito ufficiale di Santa Maria Novella", u: "https://www.smnovella.com/" }],
      visita: "La storica bottega fiorentina è aperta al pubblico; il museo si visita su prenotazione.",
      attenzione: "Molti prodotti contengono alcol o oli essenziali: leggere l’INCI e le avvertenze, soprattutto per pelle sensibile e bambini."
    },
    {
      id: "camaldoli",
      nome: "Antica Farmacia dei Monaci di Camaldoli",
      luogo: "Camaldoli, Poppi (AR), Casentino",
      epoca: "congregazione camaldolese dal 1012",
      cosa: ["amari e liquori d’erbe", "sciroppi", "unguenti", "miele del Casentino"],
      storia: "San Romualdo fonda l’eremo di Camaldoli nel 1012. Nei secoli i monaci coltivano l’orto medicinale, preparano sciroppi e unguenti per il monastero e per la gente del Casentino, e tramandano un ricettario dove l’erba del bosco diventa preparazione stabile.",
      perche: "È una spezieria di montagna: le piante sono quelle del bosco appenninico, raccolte a un’altitudine che cambia profumi e tempi di maturazione.",
      link: [{ t: "Sito di Camaldoli", u: "https://www.camaldoli.it/" }],
      visita: "Eremo e monastero si visitano con rispetto dei luoghi di preghiera; la foresteria accoglie ospiti.",
      attenzione: "Gli amari d’abbazia sono alcolici e amaricanti: sconsigliati a chi ha gastrite, ulcera o reflusso senza parere medico."
    },
    {
      id: "strega",
      nome: "Liquore Strega · Strega Alberti Benevento",
      luogo: "Benevento, via Vittorio Emanuele",
      epoca: "1860, dalla bottega di Giuseppe Alberti",
      cosa: ["Liquore Strega", "bitters e liquori d’erbe", "archivio e museo aziendale"],
      storia: "Giuseppe Alberti apre nel 1860 a Benevento una distilleria e mette a punto un liquore giallo con decine di erbe e zafferano. Il nome viene dalla leggenda delle streghe che si radunavano sul fiume Sabato, la stessa a cui la città deve il soprannome. La ricetta resta custodita e la casa, oggi Strega Alberti Benevento, la produce ancora nello stesso territorio.",
      perche: "È il caso di un liquore nato in bottega nell’Ottocento e diventato simbolo di una città: mostra come una ricetta d’erbe costruisca un’identità locale, senza smettere di essere una bevanda alcolica.",
      link: [{ t: "Sito ufficiale Strega Alberti Benevento", u: "https://www.strega.it/" }],
      visita: "La sede storica è a Benevento; il sito ufficiale indica prodotti, punti vendita e informazioni per visite e acquisti.",
      attenzione: "Liquore alcolico e zuccherato: non adatto a bambini e adolescenti, da evitare in gravidanza e allattamento, con cautela in caso di diabete o terapia farmacologica."
    },
    {
      id: "fernet-branca",
      nome: "Fernet-Branca",
      luogo: "Milano, dall’Ottocento",
      epoca: "1845, Bernardino Branca",
      cosa: ["Fernet-Branca", "bitters amaricanti", "museo e archivio aziendale"],
      storia: "Bernardino Branca prepara a Milano nel 1845 un amaro con mirra, rabarbaro, camomilla, zafferano e altre erbe, pensato come rimedio da viaggio e da tavola. La ricetta resta segreta e la produzione si allarga al mondo, con lo stabilimento milanese e un museo che racconta l’impresa di famiglia.",
      perche: "È l’archetipo dell’amaro «farmaceutico» ottocentesco: nasce come medicamento urbano, vive di segretezza della formula e diventa un prodotto internazionale. Utile per spiegare perché «ricetta custodita» non significa «ricetta sicura per tutti».",
      link: [{ t: "Sito ufficiale Fernet-Branca", u: "https://www.fernetbranca.com/" }],
      visita: "Il sito ufficiale raccoglie storia, prodotti e informazioni su visite e acquisti; la casa ha sede a Milano.",
      attenzione: "Gradazione alta e profilo molto amaro: da evitare con gastrite, ulcera, reflusso e in gravidanza; non è un digestivo da usare come terapia."
    },
    {
      id: "montenegro",
      nome: "Amaro Montenegro",
      luogo: "Bologna",
      epoca: "1885, Stanislao Cobianchi",
      cosa: ["Amaro Montenegro", "bitters d’erbe e spezie", "storia della casa bolognese"],
      storia: "Stanislao Cobianchi, giovane speziale bolognese, crea nel 1885 un amaro con tredici erbe e spezie e lo intitola alla principessa Elena del Montenegro. La casa resta a Bologna e il prodotto, con il suo profilo dolce-amaro, diventa uno degli amari italiani più diffusi.",
      perche: "Nasce da un banco di speziale e dichiara un numero preciso di botaniche: è un buon esempio per leggere le etichette senza credere che il numero da solo dica qualcosa sulla qualità.",
      link: [{ t: "Sito ufficiale Amaro Montenegro", u: "https://www.amaromontenegro.com/" }],
      visita: "Il sito ufficiale racconta la storia e i prodotti; la produzione fa capo alla casa bolognese.",
      attenzione: "Alcolico e zuccherato: fuori dall’uso occasionale di un adulto; niente in gravidanza, allattamento e per i minori."
    },
    {
      id: "amaro-lucano",
      nome: "Amaro Lucano",
      luogo: "Pisticci (MT), Basilicata",
      epoca: "1894, Pasquale Vena",
      cosa: ["Amaro Lucano", "Amaro Lucano Riserva", "i biscotti Sospiri della stessa casa"],
      storia: "Nel 1894 Pasquale Vena, pasticciere a Pisticci, mette a punto un amaro con erbe, radici e aromi e lo vende nella propria bottega. La ricetta passa di generazione in generazione e la casa, rimasta legata al paese, affianca al liquore i biscotti Sospiri.",
      perche: "Racconta una liquoreria del Sud nata dentro una bottega di paese e cresciuta senza perdere la sede: la filiera corta delle erbe e la famiglia sono parte del prodotto.",
      link: [{ t: "Sito ufficiale Amaro Lucano", u: "https://www.amarolucano.it/" }],
      visita: "Il sito ufficiale indica storia, prodotti e informazioni su visite e acquisti; la sede è a Pisticci.",
      attenzione: "Alcolico: da evitare in gravidanza e allattamento, per i minori e con terapie farmacologiche senza parere medico."
    },
    {
      id: "averna",
      nome: "Amaro Averna",
      luogo: "Caltanissetta, Sicilia",
      epoca: "1868, Salvatore Averna",
      cosa: ["Amaro Averna", "Amaro Averna Riserva", "la storia dell’abbazia di Santo Spirito"],
      storia: "La ricetta arriva dai frati dell’abbazia di Santo Spirito a Caltanissetta, che la donano a Salvatore Averna nel 1868. La famiglia la produce e la diffonde in Sicilia e poi nel resto d’Italia; oggi il marchio appartiene a un grande gruppo, ma la storia resta quella di un convento e di una famiglia.",
      perche: "È il filo diretto fra spezieria monastica e liquoreria industriale: la ricetta dei frati diventa un prodotto di massa, con tutto il guadagno e tutta la perdita di contesto che questo comporta.",
      link: [{ t: "Sito ufficiale Amaro Averna", u: "https://www.amaroaverna.com/it/" }],
      visita: "Il sito ufficiale raccoglie storia e prodotti; la tradizione della casa è legata a Caltanissetta.",
      attenzione: "Alcolico e zuccherato: non è un digestivo terapeutico; da evitare in gravidanza, allattamento e per i minori."
    },
    {
      id: "carpano",
      nome: "Carpano · Antica Formula e Punt e Mes",
      luogo: "Torino",
      epoca: "1786, Antonio Benedetto Carpano",
      cosa: ["Punt e Mes", "Antica Formula", "vermouth e aromatizzati al vino"],
      storia: "Nel 1786 Antonio Benedetto Carpano apre a Torino una bottega e mette a punto un vino aromatizzato con erbe e spezie, il vermouth, che diventa presto un rito cittadino. Dalla stessa tradizione arrivano il Punt e Mes e l’Antica Formula, ancora oggi prodotti con il nome Carpano.",
      perche: "Mostra l’altro modo in cui la spezieria entra nel bicchiere: non l’alcol puro degli amari, ma il vino medicato con erbe, nato come ricostituente e diventato aperitivo.",
      link: [{ t: "Sito ufficiale Carpano", u: "https://carpano.com/it/" }],
      visita: "Il sito ufficiale racconta la storia dal 1786 e i prodotti; la tradizione è legata a Torino.",
      attenzione: "Il vermouth è alcolico e zuccherato: un aperitivo, non una cura. Attenzione a diabete, gravidanza e associazione con farmaci."
    }
  ];

  NP.spezierieGuida = {
    titolo: "Come si legge una spezieria storica",
    passi: [
      { t: "Guarda l’orto prima del banco", d: "Una spezieria vera ha un orto, un essiccatoio o un ricettario citato: se manca tutto, è solo un negozio con le erbe in vetrina." },
      { t: "Chiedi chi prepara", d: "La differenza sta nelle mani: un laboratorio interno lascia tracce (lotti, date di preparazione, bilance, alambicchi)." },
      { t: "Leggi le etichette", d: "Ingredienti in ordine di quantità, gradazione alcolica, scadenza e avvertenze: senza queste informazioni non comprare." },
      { t: "Distingui cura e piacere", d: "Un amaro è un alimento alcolico, non una terapia. La stessa ricetta può essere tradizione e, insieme, un rischio se si assumono farmaci." }
    ],
    nota: "Le spezierie elencate sono luoghi reali e visitabili. Non ricevono nulla da questo programma e non c’è alcun accordo commerciale: i collegamenti portano ai loro siti ufficiali."
  };

  /* ------------------------------------------------------------------------
     Amari
     ------------------------------------------------------------------------ */

  NP.amariCategorie = [
    { id: "monastici", nome: "Monastici e d’abbazia", d: "Ricette nate in farmacia, spesso con erbe dell’orto e ricette custodite." },
    { id: "classici", nome: "Amaricanti classici", d: "Radici e cortecce amare: genziana, china, rabarbaro, angelica." },
    { id: "alpini", nome: "Alpini e d’erbe di montagna", d: "Achillea, genziana, pino mugo, timo: profilo aromatico e balsamico." },
    { id: "bitters", nome: "Bitter e aperitivi", d: "Base alcolica leggera, agrumi e spezie: si bevono prima del pasto." }
  ];

  NP.amari = [
    {
      id: "tintura-imperiale",
      nome: "Tintura Imperiale",
      categoria: "monastici",
      origine: "Abbazia di Casamari, Veroli (Lazio)",
      ingredienti: ["erbe amaricanti", "china", "genziana", "spezie"],
      storia: "Nasce nella liquoreria di Casamari come medicamento d’abbazia e diventa il prodotto più conosciuto del monastero. La ricetta completa è custodita, come accade per quasi tutti gli amari monastici.",
      nota: "Il nome ricorda la tradizione imperiale del monastero, non un ingrediente. Gradazione alta: va bevuto in piccole quantità, mai come terapia."
    },
    {
      id: "elisir-sett-erbe",
      nome: "Elisir Sett’Erbe",
      categoria: "monastici",
      origine: "Abbazia di Casamari, Veroli (Lazio)",
      ingredienti: ["sette erbe dell’orto", "radici amare", "scorze", "miele"],
      storia: "Sette erbe, un numero che nella tradizione monastica indica completezza. L’elisir è più dolce della tintura e veniva offerto come digestivo di fine pasto.",
      nota: "La dolcezza non riduce l’alcol: un bicchierino contiene circa quanto un bicchiere di vino, a volte di più."
    },
    {
      id: "amaro-camaldoli",
      nome: "Amaro di Camaldoli",
      categoria: "monastici",
      origine: "Camaldoli, Poppi (Toscana)",
      ingredienti: ["erbe del Casentino", "genziana", "achillea", "ginepro"],
      storia: "La farmacia dell’eremo prepara da secoli sciroppi e amari con le piante del bosco appenninico: il profilo è balsamico, con note resinose e amare.",
      nota: "Gli amari di montagna sono spesso molto aromatici: meglio non associarli a farmaci epatici o sedativi senza parere."
    },
    {
      id: "ramazzotti",
      nome: "Amaro Ramazzotti",
      categoria: "classici",
      origine: "Milano, 1815",
      ingredienti: ["33 erbe e spezie", "china", "genziana", "agrumi", "spezie"],
      storia: "Auspicio Ramazzotti apre la sua bottega a Milano nel 1815 e vende un amaro preparato con 33 erbe e spezie: è uno dei primi amari pensati per il grande pubblico.",
      nota: "Il numero di erbe è dichiarato dalla casa, non è un dato scientifico: nessun elenco completo viene pubblicato."
    },
    {
      id: "fernet-branca",
      nome: "Fernet-Branca",
      categoria: "bitters",
      origine: "Milano, 1845",
      ingredienti: ["27 erbe e spezie", "mirra", "rabarbaro", "zafferano", "china"],
      storia: "Bernardino Branca lo crea a Milano nel 1845. Il profilo è molto amaro e alcolico: nasce come «amaro medicinale» e diventa il bitter più riconoscibile al mondo.",
      nota: "Gradazione elevata. Sconsigliato a chi ha gastrite, reflusso o ulcera, e a chi assume anticoagulanti senza parere."
    },
    {
      id: "averna",
      nome: "Amaro Averna",
      categoria: "classici",
      origine: "Caltanissetta, 1868",
      ingredienti: ["erbe e radici", "agrumi siciliani", "china", "zafferano"],
      storia: "I frati del convento di Santo Spirito a Caltanissetta ne tramandano la ricetta a Salvatore Averna, che nel 1868 inizia a produrlo. È l’amaro siciliano per eccellenza, più morbido e dolce dei bitter.",
      nota: "Contiene zucchero: chi ha diabete deve considerarlo alla stregua di una bevanda zuccherata."
    },
    {
      id: "montenegro",
      nome: "Amaro Montenegro",
      categoria: "classici",
      origine: "Bologna, 1885",
      ingredienti: ["erbe e spezie", "arance", "china", "genziana"],
      storia: "Stanislao Cobianchi lo crea a Bologna nel 1885 e gli dà il nome della principessa Elena del Montenegro. È l’amaro «morbido» che ha aperto la strada agli amari moderni.",
      nota: "Meno amaro non significa più leggero: la gradazione resta intorno ai 23 gradi."
    },
    {
      id: "china-martini",
      nome: "China Martini",
      categoria: "bitters",
      origine: "Torino, seconda metà dell’Ottocento",
      ingredienti: ["corteccia di china", "erbe amare", "agrumi"],
      storia: "Torino è la capitale dell’amaro ottocentesco: la china, arrivata dalle rotte coloniali, diventa la base di decine di ricette. La China Martini è una delle poche sopravvissute con il nome originale.",
      nota: "La china contiene chinino: persone con disturbi del ritmo cardiaco o in terapia con alcuni farmaci devono chiedere parere prima di consumarla."
    }
  ];

  NP.amariIngredienti = [
    { nome: "Genziana", parte: "radice", nota: "Amaro puro, usato come digestivo tradizionale. Sconsigliata con gastrite e ulcera." },
    { nome: "China", parte: "corteccia", nota: "Contiene chinino: attenzione a cuore, gravidanza e interazioni farmacologiche." },
    { nome: "Rabarbaro", parte: "rizoma", nota: "Amaro e astringente; contiene ossalati, da evitare in caso di calcoli renali." },
    { nome: "Zafferano", parte: "stimmi", nota: "Colora e aromatizza; dosi alte sono tossiche e vietate in gravidanza." },
    { nome: "Angelica", parte: "radice", nota: "Aromatica e dolce; può aumentare la sensibilità al sole." },
    { nome: "Achillea", parte: "sommità fiorite", nota: "Amaro aromatico di montagna; cautela con anticoagulanti." },
    { nome: "Mirra", parte: "resina", nota: "Balsamica e amara; non usare in gravidanza." },
    { nome: "Cardo santo", parte: "parti aeree", nota: "Amaro tradizionale; può favorire il flusso mestruale." }
  ];

  NP.amariPrezzi = {
    titolo: "Prezzi e disponibilità: come verificarli davvero",
    testo: "Un programma offline non può leggere in tempo reale i prezzi di negozi diversi: servirebbe un server che li raccolga, e i listini cambiano senza avviso. Qui trovi invece i collegamenti diretti ai negozi ufficiali, dove il prezzo è quello vero del venditore, e una lista di controlli da fare prima di comprare.",
    criteri: [
      { t: "Formato e gradazione", d: "Confronta il prezzo al litro, non la bottiglia: 50 cl a 14 € costano più di 70 cl a 18 €, e la gradazione cambia l’esperienza." },
      { t: "Chi vende", d: "Meglio il negozio del produttore o un rivenditore dichiarato: le bottiglie rare sui marketplace hanno ricarichi e contraffazioni." },
      { t: "Spedizione e reso", d: "Alcolici: controlla se la spedizione è consentita nella tua zona, i costi e la possibilità di reso." },
      { t: "Materie prime", d: "Alcol buongusto, boccette ed erbe sfuse si comprano in erboristeria o presso fornitori autorizzati: la vendita di alcol è regolata." }
    ],
    link: [
      { t: "Negozio dell’Abbazia di Casamari", u: "https://www.abbaziadicasamari.it/index.php/negozio" },
      { t: "Santa Maria Novella, Firenze", u: "https://www.smnovella.com/" },
      { t: "Camaldoli", u: "https://www.camaldoli.it/" }
    ],
    avviso: "Nessun prezzo è indicato in questa pagina, e nessun collegamento è sponsorizzato: i siti sono quelli ufficiali dei luoghi citati."
  };

  /* ------------------------------------------------------------------------
     Funghi e micologia
     ------------------------------------------------------------------------ */

  NP.funghi = [
    {
      id: "reishi",
      nome: "Reishi",
      latino: "Ganoderma lucidum",
      uso: "Estratti idroalcolici e decotti della tradizione cinese; oggi anche integratori.",
      tradizione: "Chiamato «fungo dell’immortalità» nella medicina tradizionale cinese, dove si usa da secoli come tonico.",
      evidenza: "Studi soprattutto su beta-glucani e polisaccaridi, in gran parte su cellule e animali. Gli studi sull’uomo sono pochi, piccoli e con prodotti diversi fra loro: non è una cura e non sostituisce le terapie oncologiche.",
      sicurezza: "Possibili interazioni con anticoagulanti e antiaggreganti; casi rari di tossicità epatica. Da evitare in gravidanza e allattamento.",
      livello: "giallo",
      nota: "In natura cresce su legno morto: la raccolta richiede competenza. Gli integratori devono dichiarare specie, parte usata e metodo di estrazione."
    },
    {
      id: "chaga",
      nome: "Chaga",
      latino: "Inonotus obliquus",
      uso: "Decotti e estratti della tradizione siberiana e scandinava.",
      tradizione: "Crosta nera e dura sulla betulla, usata come decotto nelle regioni del nord Europa e citata anche nello studio dei resti di Ötzi.",
      evidenza: "Ricerche preliminari su antiossidanti e infiammazione; nessuno studio clinico solido ne sostiene un uso terapeutico.",
      sicurezza: "Molto ricco di ossalati: rischio di calcoli e di danno renale, soprattutto con uso prolungato o in chi ha problemi renali. Interazioni possibili con anticoagulanti e antidiabetici. Non in gravidanza.",
      livello: "rosso",
      nota: "È il fungo che richiede più prudenza fra quelli di moda: la letteratura segnala casi di nefropatia da ossalati."
    },
    {
      id: "shiitake",
      nome: "Shiitake",
      latino: "Lentinula edodes",
      uso: "Alimento; estratti usati nella tradizione giapponese.",
      tradizione: "Coltivato su legno di quercia e castagno da secoli in Giappone e Cina, è oggi il secondo fungo coltivato al mondo.",
      evidenza: "Il lentinano è studiato come supporto immunitario, ma l’evidenza clinica resta limitata e legata a contesti specifici.",
      sicurezza: "Da mangiare sempre cotto: crudo o poco cotto può causare una dermatite caratteristica («dermatite da shiitake»). Cottura completa anche per gli altri funghi.",
      livello: "verde",
      nota: "In Italia si trova fresco, secco o coltivato: è un alimento, non un farmaco."
    },
    {
      id: "maitake",
      nome: "Maitake",
      latino: "Grifola frondosa",
      uso: "Alimento e estratti della tradizione giapponese.",
      tradizione: "«Fungo danzante»: cresce alla base delle querce e nelle storie popolari si dice che si trovasse danzando intorno agli alberi.",
      evidenza: "Alcuni studi suggeriscono effetti sulla glicemia, ma sono piccoli e non conclusivi.",
      sicurezza: "Può abbassare la glicemia: attenzione con insulina e antidiabetici. Possibili interazioni con anticoagulanti.",
      livello: "giallo",
      nota: "Se assumi farmaci per il diabete, parlane con il medico prima di usare estratti concentrati."
    },
    {
      id: "cordyceps",
      nome: "Cordyceps",
      latino: "Cordyceps militaris",
      uso: "Estratti coltivati, usati come tonico nella tradizione tibetana e cinese.",
      tradizione: "Il cordyceps selvatico parassita le larve di falena: per questo oggi si coltiva su substrato vegetale, senza insetti.",
      evidenza: "Qualche studio su prestazioni fisiche e stanchezza, con campioni piccoli e risultati incoerenti. Nessuna indicazione terapeutica.",
      sicurezza: "Cautela nelle malattie autoimmuni e con farmaci immunomodulanti; dati insufficienti in gravidanza e allattamento.",
      livello: "giallo",
      nota: "Diffida dei prodotti che promettono «energia»: chiedi specie e parte usata, e diffida delle miscele non dichiarate."
    },
    {
      id: "pleurotus",
      nome: "Pleuroto",
      latino: "Pleurotus ostreatus",
      uso: "Alimento coltivato, ottimo anche per chi si avvicina alla cucina dei funghi.",
      tradizione: "Coltivato su paglia e legno, è fra i funghi più semplici da produrre in casa con un kit.",
      evidenza: "Nessuna pretesa terapeutica: è un alimento con buon contenuto di fibre e proteine vegetali.",
      sicurezza: "Cuocere bene. Chi ha allergie ai funghi deve procedere con cautela; non raccogliere esemplari selvatici senza micologo.",
      livello: "verde",
      nota: "Il gambo è più tenace: si usa per brodi e ragù, il cappello per la padella."
    }
  ];

  NP.micologia = {
    regole: [
      { t: "Un fungo alla volta", d: "Raccogli una sola specie per uscita e falla vedere a un micologo dell’ispettorato prima di cucinarla. Le certezze «a occhio» non valgono." },
      { t: "Cesto areato", d: "Mai sacchetti di plastica: i funghi sudano, fermentano e diventano pericolosi. Usa cesto di vimini o sacco di tela." },
      { t: "Solo esemplari sani", d: "Scarta larve, muffe, funghi vecchi o troppo giovani: sono i più difficili da riconoscere e i più deperibili." },
      { t: "Rispetta le regole locali", d: "Parchi, riserve e proprietà private hanno divieti propri; in molte regioni serve un tesserino e ci sono limiti di quantità." },
      { t: "Guarda i caratteri, non le foto", d: "Lamelle o pori, anello, volva, gambo, odore, colore che cambia al taglio, albero vicino: è questo che identifica un fungo." },
      { t: "Conosci i sosia mortali", d: "Le amaniti velenose (Amanita phalloides, verna, virosa) non si riconoscono dal solo cappello. La cottura non distrugge le amatossine." },
      { t: "In caso di dubbio, non mangiare", d: "Nessun piatto vale un’intossicazione. Se qualcuno ha già mangiato, chiama il 112 o un Centro Antiveleni e conserva i resti." },
      { t: "Non regalare funghi non certificati", d: "La responsabilità di un’intossicazione è di chi offre. Meglio un barattolo di conserva fatta con funghi controllati." }
    ],
    riconoscimento: [
      { t: "Cappello", d: "Forma, colore, margine, presenza di scaglie o di una pellicola separabile." },
      { t: "Imenio", d: "Lamelle, pori o aculei: è il primo carattere da guardare, insieme a come sono attaccati al gambo." },
      { t: "Gambo", d: "Anello, volva alla base, reticolo, colore e consistenza." },
      { t: "Carne", d: "Colore al taglio, odore, sapore solo se il fungo è già stato identificato da un esperto." },
      { t: "Habitat", d: "Che albero, che terreno, che quota: molti funghi crescono solo con certe piante." }
    ],
    etnobotanica: [
      "Ötzi, l’uomo venuto dal ghiaccio, portava con sé funghi di betulla (Piptoporus betulinus): la prova più antica di un uso medicinale dei funghi in Europa.",
      "Le tinture madri nascono come macerazioni alcoliche di pianta fresca: un modo per conservare i principi di una stagione e portarli all’inverno.",
      "Nelle economie di montagna i funghi non erano solo cibo: servivano per accendere il fuoco, tingere le stoffe, curare gli animali.",
      "La raccolta tradizionale aveva regole non scritte: si lasciava il fungo vecchio, si puliva il bosco, si tornava nello stesso posto dopo la pioggia giusta."
    ],
    fonti: [
      { titolo: "Ministero della Salute · Funghi", url: "https://www.salute.gov.it/" },
      { titolo: "Istituto Superiore di Sanità", url: "https://www.iss.it/" },
      { titolo: "Centri Antiveleni (ISS)", url: "https://www.iss.it/-/cnsc-cav" }
    ]
  };

  /* ------------------------------------------------------------------------
     Tempo balsamico: il calendario della raccolta fine
     ------------------------------------------------------------------------ */

  NP.balsamico = [
    {
      mese: 1, titolo: "Radici e cortecce nel riposo", momento: "La pianta è ferma: l’energia è nelle radici e nella corteccia.",
      raccogli: ["radici di tarassaco", "corteccia di salice", "corteccia di olmo", "bacche di ginepro"],
      prepara: ["decotti", "tinture da essiccato", "sciroppi con miele"],
      nota: "Non estirpare radici su terreno altrui e mai l’unica pianta di un luogo. La corteccia si preleva a strisce sottili, mai ad anello."
    },
    {
      mese: 2, titolo: "Gemme e linfa", momento: "Le gemme si gonfiano: è il momento dei gemmoderivati e della linfa di betulla.",
      raccogli: ["gemme di pioppo", "gemme di ippocastano", "linfa di betulla", "corteccia di betulla"],
      prepara: ["macerati glicerici", "sciroppi", "decotti"],
      nota: "La linfa si raccoglie solo su alberi maturi e con il consenso del proprietario, chiudendo bene il foro."
    },
    {
      mese: 3, titolo: "Le prime foglie", momento: "Le gemme si aprono: foglie tenere e prime fioriture.",
      raccogli: ["ortica", "tarassaco", "viola", "primula", "foglie di betulla"],
      prepara: ["insalate cotte", "decotti", "tinture fresche"],
      nota: "Raccogli solo foglie giovani e lontano da strade e campi trattati. L’ortica si maneggia con i guanti."
    },
    {
      mese: 4, titolo: "Fioriture di primavera", momento: "Massima concentrazione di aromi nei fiori appena aperti.",
      raccogli: ["fiori di tarassaco", "fiori di viola", "fiori di biancospino", "foglie di ortica"],
      prepara: ["sciroppi", "oleoliti", "infusi", "frittelle"],
      nota: "I fiori si raccolgono asciutti, al mattino, e si lavorano subito: in poche ore perdono profumo."
    },
    {
      mese: 5, titolo: "Il mese delle rose", momento: "Sambuco, biancospino e rose: il profumo è al culmine.",
      raccogli: ["fiori di sambuco", "fiori di rosa canina", "fiori di biancospino", "foglie di melissa"],
      prepara: ["sciroppo di sambuco", "acqua di rose", "oleoliti", "infusi"],
      nota: "I fiori di sambuco vanno staccati dai piccioli verdi e usati subito: crudi contengono sostanze irritanti."
    },
    {
      mese: 6, titolo: "Il sole nel barattolo", momento: "Giornate lunghe: è il momento degli oleoliti e delle tinture di pianta fresca.",
      raccogli: ["iperico in fiore", "calendula", "lavanda", "tiglio", "achillea"],
      prepara: ["oleolito di iperico", "oleolito di calendula", "tinture madri", "infusi"],
      nota: "L’iperico rende la pelle sensibile al sole e interagisce con molti farmaci: leggere la scheda prima di usarlo."
    },
    {
      mese: 7, titolo: "Aromi pieni", momento: "Caldo e secco: gli oli essenziali sono concentrati nelle foglie e nei fiori.",
      raccogli: ["lavanda", "achillea", "elicriso", "origano", "timo"],
      prepara: ["mazzetti da essiccare", "oli essenziali da produttori", "oleoliti"],
      nota: "Essicca in luogo ombreggiato e ventilato: il sole diretto brucia i principi aromatici."
    },
    {
      mese: 8, titolo: "Bacche e funghi estivi", momento: "Le prime bacche maturano e il bosco comincia a dare funghi.",
      raccogli: ["bacche di sambuco", "mirtillo", "more", "funghi estivi"],
      prepara: ["succhi", "confetture", "sciroppi", "sott’olio"],
      nota: "Per i funghi serve un micologo: nessuna app sostituisce l’identificazione dal vivo."
    },
    {
      mese: 9, titolo: "Radici e raccolto", momento: "La pianta richiama le sostanze nelle radici: è il momento di scavare.",
      raccogli: ["radici di tarassaco", "radici di bardana", "rosa canina", "biancospino", "funghi"],
      prepara: ["decotti", "tinture", "confetture", "essiccazione"],
      nota: "Le radici si lavano subito e si tagliano a fettine sottili per asciugare in fretta, senza muffe."
    },
    {
      mese: 10, titolo: "Il bosco generoso", momento: "Funghi, castagne e ultime bacche: il mese del raccolto pieno.",
      raccogli: ["funghi", "castagne", "noci", "crespino", "corniolo"],
      prepara: ["essiccazione", "conserve", "liquori da macerazione", "sciroppi"],
      nota: "Non raccogliere funghi in sacchetti di plastica e non mischiare specie diverse nello stesso cesto."
    },
    {
      mese: 11, titolo: "Cortecce e scorte", momento: "La linfa scende: cortecce, radici tardive e ultimi funghi.",
      raccogli: ["corteccia di salice", "radici", "funghi tardivi", "bacche di ginepro"],
      prepara: ["tinture", "sciroppi", "oli medicati", "conserva sotto sale"],
      nota: "Con il freddo i funghi si conservano meglio, ma le specie tardive sono spesso confuse con sosia: doppio controllo."
    },
    {
      mese: 12, titolo: "Il tempo dei preparati", momento: "Poco da raccogliere, molto da preparare: si lavorano le scorte.",
      raccogli: ["aghifoglie con cautela", "bacche di ginepro", "muschi e licheni solo se autorizzati"],
      prepara: ["unguenti", "balsami", "sciroppi", "etichette e quaderno di raccolta"],
      nota: "Annota luogo, data, quantità e meteo di ogni raccolta: è il modo per imparare davvero e per non ripetere gli errori."
    }
  ];

  /* ------------------------------------------------------------------------
     Oleoliti, tinture e distillati
     ------------------------------------------------------------------------ */

  NP.estrazioni = [
    {
      id: "oleolito-iperico",
      titolo: "Oleolito di iperico",
      tipo: "Macerazione a freddo in olio",
      tempo: "30-40 giorni",
      ingredienti: ["fiori freschi di iperico", "olio di oliva o di girasole", "barattolo di vetro scuro"],
      passi: [
        "Raccogli i fiori in una giornata asciutta, al mattino, e lasciali appassire qualche ora su un telo.",
        "Riempili in un barattolo di vetro senza comprimerli e coprili con l’olio, lasciando un dito d’aria.",
        "Chiudi, etichetta con data e pianta, e lascia al sole o al caldo per 30-40 giorni, agitando ogni giorno.",
        "Filtra con una garza e strizza bene i fiori; imbottiglia in vetro scuro e conserva al fresco."
      ],
      sicurezza: "L’iperico è fotosensibilizzante: non esporre al sole la pelle trattata. Assunto per bocca interagisce con molti farmaci, contraccettivi compresi: l’uso interno va deciso con un professionista.",
      conservazione: "3–6 mesi al riparo dalla luce. Se l’olio sa di rancido o fa muffa, si butta."
    },
    {
      id: "oleolito-calendula",
      titolo: "Oleolito di calendula",
      tipo: "Macerazione a freddo in olio",
      tempo: "30 giorni",
      ingredienti: ["fiori secchi di calendula", "olio di oliva o mandorle", "barattolo di vetro"],
      passi: [
        "Usa fiori ben asciutti: l’umidità fa marcire l’olio.",
        "Copri i fiori con l’olio in un barattolo pulito e chiudi.",
        "Tieni al caldo per un mese, mescolando di tanto in tanto.",
        "Filtra, imbottiglia e conserva al buio."
      ],
      sicurezza: "Uso cutaneo. Chi è allergico alle Asteraceae deve fare una prova su una piccola area. Non applicare su ferite aperte senza parere.",
      conservazione: "3–6 mesi in vetro scuro, lontano dal calore."
    },
    {
      id: "tintura-ortica",
      titolo: "Tintura madre di ortica",
      tipo: "Macerazione alcolica di pianta fresca",
      tempo: "3-4 settimane",
      ingredienti: ["ortica fresca", "alcol alimentare a gradazione adeguata", "vetro scuro"],
      passi: [
        "Raccogli le foglie tenere con i guanti e tritale grossolanamente.",
        "Metti la pianta in un barattolo e coprila con l’alcol, annotando peso e volume.",
        "Lascia macerare 3-4 settimane al buio, agitando ogni giorno.",
        "Filtra, spremi il residuo e conserva in vetro scuro con etichetta e data."
      ],
      sicurezza: "Contiene alcol: non adatta a bambini, gravidanza e allattamento. L’ortica può interagire con diuretici e antidiabetici. La vendita di tinture è regolata: per uso interno rivolgersi a un erborista.",
      conservazione: "2-3 anni in vetro scuro, al fresco."
    },
    {
      id: "sciroppo-sambuco",
      titolo: "Sciroppo di sambuco",
      tipo: "Cottura e conservazione",
      tempo: "1 giorno",
      ingredienti: ["fiori di sambuco", "acqua", "zucchero", "limone"],
      passi: [
        "Stacca i fiori dai piccioli verdi: sono la parte irritante.",
        "Copri i fiori con acqua e lascia in infusione alcune ore, poi filtra.",
        "Aggiungi zucchero e limone e cuoci finché il liquido si addensa leggermente.",
        "Invasetta caldo in barattoli sterilizzati, capovolgi e lascia raffreddare."
      ],
      sicurezza: "I fiori crudi e le parti verdi contengono sostanze irritanti: lo sciroppo va sempre cotto. Non usare i frutti immaturi. Conservare in frigorifero dopo l’apertura.",
      conservazione: "12 mesi in luogo fresco; dopo l’apertura, in frigo per poche settimane."
    },
    {
      id: "idrolato",
      titolo: "Idrolato: l’acqua aromatica",
      tipo: "Distillazione in corrente di vapore",
      tempo: "da un produttore esperto",
      ingredienti: ["pianta fresca o secca", "alambicco a corrente di vapore", "acqua demineralizzata"],
      passi: [
        "La pianta viene attraversata dal vapore: i composti volatili passano nell’acqua di condensazione.",
        "Si separano olio essenziale e acqua aromatica: l’idrolato è la parte acquosa.",
        "Si filtra, si imbottiglia e si conserva in vetro scuro, al fresco.",
        "Ogni lotto va etichettato con pianta, data, metodo e conservante eventuale."
      ],
      sicurezza: "Un idrolato casalingo non è sterile e può contaminarsi: senza conservante dura pochi giorni in frigo. Per uso cutaneo e ambientale è più sicuro acquistarlo da produttori che dichiarano lotto e metodo.",
      conservazione: "Commerciale: 12-18 mesi. Autoprodotto: in frigo, pochi giorni."
    },
    {
      id: "distillazione",
      titolo: "Distillazione in corrente di vapore: che cosa sapere",
      tipo: "Processo tecnico",
      tempo: "impianto e autorizzazioni",
      ingredienti: ["alambicco", "caldaia", "condensatore", "recipienti"],
      passi: [
        "Il vapore attraversa la pianta e trascina i composti volatili.",
        "Il condensatore raffredda il vapore e lo riporta liquido.",
        "Un separatore raccoglie l’olio essenziale, più leggero dell’acqua.",
        "L’acqua aromatica che resta è l’idrolato."
      ],
      sicurezza: "In Italia la distillazione di alcol per uso alimentare è vietata senza autorizzazioni specifiche: non è un’attività domestica, nemmeno per piccole quantità. Anche gli oli essenziali richiedono impianti, competenze e controlli: si acquistano da produttori autorizzati, con scheda di sicurezza.",
      conservazione: "Gli oli essenziali sono concentrati e infiammabili: mai lasciarli alla portata dei bambini e mai usarli puri sulla pelle."
    }
  ];

  NP.saperiFonti = [
    { titolo: "Ministero della Salute · Sicurezza alimentare", url: "https://www.salute.gov.it/" },
    { titolo: "Istituto Superiore di Sanità · Centri Antiveleni", url: "https://www.iss.it/-/cnsc-cav" },
    { titolo: "AIFA · Farmacovigilanza", url: "https://www.aifa.gov.it/" },
    { titolo: "Abbazia di Casamari", url: "https://www.abbaziadicasamari.it/" },
    { titolo: "Santa Maria Novella", url: "https://www.smnovella.com/" },
    { titolo: "Camaldoli", url: "https://www.camaldoli.it/" }
  ];
})();
