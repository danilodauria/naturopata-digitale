/* ==========================================================================
   Naturopata Digitale · Biblioteca: Matthioli e sopravvivenza
   Testi originali, sintesi storico-botaniche e schede pratiche.
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

/* --------------------------------------------------------------------------
   I Discorsi di Pietro Andrea Mattioli
   -------------------------------------------------------------------------- */

NP.matthioli = {
  titolo: "I Discorsi",
  sottotitolo: "Dioscoride commentato, piante nuove e veleni: il libro che ha insegnato la botanica all'Europa",
  autore: "Pietro Andrea Mattioli",
  vita: "Siena 1501 – Trento 1577/78",
  sintesi: "Per due secoli, chi voleva riconoscere una pianta medicinale in Europa leggeva Mattioli. I suoi Discorsi non sono una traduzione: sono un commento immense ai sei libri di Dioscoride, cresciuto edizione dopo edizione fino a diventare un'enciclopedia botanica e medica illustrata.",
  cifre: [
    { n: "1544", t: "prima edizione italiana" },
    { n: "6", t: "libri commentati" },
    { n: "560+", t: "xilografie nell'edizione latina del 1554" },
    { n: "1577", t: "anno della morte" }
  ],
  perche: [
    "Perché è il ponte tra la botanica antica e quella moderna: Mattioli discute, corregge e aggiunge, invece di limitarsi a tradurre.",
    "Perché mostra come nasce la conoscenza: osservazione sul campo, confronto tra autori, errori tramandati e correzioni.",
    "Perché insegna una lezione di prudenza: la stessa pianta può essere cibo, medicina o veleno, e l'identificazione è tutto.",
    "Perché il testo è di pubblico dominio: chiunque può leggerlo, studiarlo e citarlo, senza chiedere permesso."
  ],
  biografia: [
    { anno: "1501", testo: "Nasce a Siena il 12 marzo. Studia medicina a Padova, dove si laurea nel 1523." },
    { anno: "1528", testo: "Entra al servizio del principe-vescovo Bernardo Cles a Trento: medico, botanico e curatore del giardino di corte." },
    { anno: "1544", testo: "Pubblica a Venezia la prima edizione italiana dei Discorsi, senza figure." },
    { anno: "1548", testo: "Aggiunge il sesto libro, dedicato ai rimedi contro i veleni: un tema che attraversa tutta l'opera." },
    { anno: "1554", testo: "Esce a Venezia la versione latina, i Commentarii, con oltre 560 xilografie." },
    { anno: "1555", testo: "Si trasferisce a Praga, alla corte degli Asburgo, come medico. Resta in contatto con botanici e naturalisti di tutta Europa." },
    { anno: "1565", testo: "L'edizione latina si arricchisce delle grandi xilografie disegnate da Giorgio Liberale e incise da Wolfgang Meyerpeck." },
    { anno: "1568", testo: "L'edizione italiana con le grandi figure esce ancora a Venezia, presso Valgrisi." },
    { anno: "1577", testo: "Muore di peste a Trento; secondo il computo moderno la data cade nei primi mesi del 1578." }
  ],
  opera: {
    titoloCompleto: "I Discorsi di M. Pietro Andrea Matthioli sanese, medico cesareo, ne i sei libri di Pedacio Dioscoride Anazarbeo della materia medicinale",
    dioscoride: "Dioscoride di Anazarbe, medico greco del I secolo, scrisse il De materia medica: circa seicento piante e sostanze medicinali, per molti secoli il riferimento della farmacologia europea.",
    struttura: [
      { t: "I cinque libri di Dioscoride", d: "Il testo antico, con la descrizione delle piante e delle sostanze, commentato passo per passo." },
      { t: "Il sesto libro", d: "Aggiunto da Mattioli nel 1548: veleni, antidoti e rimedi contro gli avvelenamenti." },
      { t: "I discorsi", d: "Il commento vero e proprio: sinonimi, habitat, usi, osservazioni personali, correzioni e polemiche con altri autori." },
      { t: "Le figure", d: "Dalle prime edizioni illustrate alle grandi xilografie, le immagini diventano uno strumento di riconoscimento." },
      { t: "Gli indici", d: "Tavole di nomi e materie, pensate per chi consulta il libro come un repertorio, non come un racconto." }
    ],
    numeri: [
      "Le edizioni cinquecentesche sono in folio: libri grandi, pensati per il tavolo dello speziale e del medico.",
      "Il commento cresce a dismisura: poche righe di Dioscoride possono diventare pagine intere di osservazioni.",
      "Le piante del Nuovo Mondo entrano nell'opera: pomodoro, tabacco, girasole e altre specie cambiano il panorama della farmacopea.",
      "Mattioli descrive anche piante osservate di persona in Val di Non, sul Monte Baldo e nei dintorni di Trento."
    ]
  },
  edizioni: [
    { anno: "1544", luogo: "Venezia", stampatore: "Nicolò de Bascarini", lingua: "Italiano", nota: "Prima edizione, senza figure, dedicata ai cinque libri di Dioscoride.", url: "https://archive.org/details/McGillLibrary-osl_di_pedacio_dioscoride_anazarbeo_folioWZ240d594dm1544-20467" },
    { anno: "1550", luogo: "Venezia", stampatore: "Vincenzo Valgrisi", lingua: "Italiano", nota: "Edizione ampliata, con indici e figure.", url: "https://archive.org/details/bub_gb_OGK3WyHq8iQC" },
    { anno: "1554", luogo: "Venezia", stampatore: "Vincenzo Valgrisi", lingua: "Latino", nota: "Prima edizione dei Commentarii, con oltre 560 xilografie.", url: "https://archive.org/details/BIUSante_00823" },
    { anno: "1565", luogo: "Venezia", stampatore: "Officina Valgrisiana", lingua: "Latino", nota: "Edizione arricchita dalle grandi xilografie di Liberale e Meyerpeck." },
    { anno: "1568", luogo: "Venezia", stampatore: "Vincenzo Valgrisi", lingua: "Italiano", nota: "Edizione italiana con le grandi figure, tra le più consultate.", url: "https://archive.org/details/gri_33125014246561" },
    { anno: "1585", luogo: "Venezia", stampatore: "Felice Valgrisi", lingua: "Italiano", nota: "Edizione postuma in due parti; il colophon riporta il 1584." }
  ],
  temi: [
    { titolo: "Non una traduzione, un commento", testo: "Mattioli scrive in italiano e discute il testo antico con la voce del medico del Cinquecento. La versione latina è un ampliamento per il pubblico internazionale, non l'originale da cui è tratta la traduzione italiana. Chiamarlo «tradotto in italiano» è impreciso: l'italiano è la lingua in cui l'opera è nata." },
    { titolo: "Il pomodoro entra in Europa", testo: "Nelle edizioni cinquecentesche compare la descrizione di piante americane. Il pomodoro, allora chiamato pomo d'oro o mala aurea, è tra le specie nuove che Mattioli contribuisce a far conoscere: una curiosità botanica prima di diventare alimento quotidiano." },
    { titolo: "Veleni e antidoti", testo: "Il sesto libro affronta i veleni con la mentalità del tempo: teriache, contravveleni, sostanze esotiche. Oggi molte ricette sono superate, ma il principio resta valido: identificare la sostanza, agire in fretta, non improvvisare." },
    { titolo: "Le immagini come prova", testo: "Le xilografie non sono decorazione: servono a riconoscere la pianta. Per la prima volta un lettore può confrontare il disegno con ciò che ha davanti. È un passaggio decisivo verso la botanica descrittiva." },
    { titolo: "Errori e correzioni", testo: "Mattioli non è infallibile: alcune identificazioni sono oggi discusse e alcune piante sono state confuse. Leggerlo serve anche a capire come la scienza procede, tra autorità, osservazione e revisione." }
  ],
  lezioni: [
    { titolo: "Il nome non basta", testo: "Mattioli insiste sui sinonimi e sui nomi locali: la stessa parola può indicare piante diverse in regioni diverse. Oggi la nomenclatura binomiale ha ridotto l'ambiguità, ma il rischio non è scomparso.", oggi: "Usa sempre il nome scientifico e confronta più caratteri: foglie, fusto, fiore, odore, habitat." },
    { titolo: "Osservare prima di credere", testo: "L'autore confronta gli antichi con ciò che vede nei prati e nei giardini. Quando la realtà contraddice il libro, lo dice.", oggi: "Una scheda, un sito o un video non sostituiscono l'osservazione diretta e una fonte affidabile." },
    { titolo: "La dose è tutto", testo: "Nel Cinquecento la preparazione era parte del sapere: quantità, parte della pianta, modo di cottura. La differenza tra rimedio e veleno passava da lì.", oggi: "Non improvvisare dosi, estratti o oli essenziali. La forma di preparazione cambia l'effetto e il rischio." },
    { titolo: "Il corpo non è un terreno di prova", testo: "Molte ricette antiche sono state abbandonate perché inefficaci o pericolose. Riconoscerlo è parte del rispetto per la tradizione, non un tradimento.", oggi: "La tradizione suggerisce ipotesi; la ricerca le verifica. Quando l'evidenza è contraria, vince l'evidenza." }
  ],
  pubblicoDominio: {
    stato: "Pubblico dominio",
    testo: "Il testo di Mattioli è di pubblico dominio: l'autore è morto nel XVI secolo e le edizioni originali sono antiche. Puoi leggere, citare, stampare e condividere il testo senza chiedere permesso.",
    attenzione: "Le scansioni e le immagini possono avere condizioni d'uso proprie, stabilite dalla biblioteca che le ha digitalizzate. Alcune sono marcate pubblico dominio, altre hanno licenze aperte, altre ancora richiedono di verificare i termini. Per un uso commerciale o per ripubblicare le immagini, controlla sempre la licenza del singolo file. Le edizioni moderne con introduzioni, note e traduzioni hanno invece diritti propri: non sono pubblico dominio."
  },
  come: [
    { t: "Parti da un'edizione digitalizzata", d: "Internet Archive ospita esemplari del 1544, 1550, 1554 e 1568. Sono consultabili online e spesso scaricabili." },
    { t: "Leggi l'introduzione e gli indici", d: "Sono la mappa dell'opera: capirai come Mattioli organizza le piante e quali temi ricorrono." },
    { t: "Confronta due edizioni", d: "Tra il 1544 e il 1568 il commento cambia molto. Confrontare le voci su una stessa pianta è il modo migliore per vedere il metodo." },
    { t: "Non usarlo come manuale terapeutico", d: "Le indicazioni mediche del Cinquecento non sono prescrizioni valide oggi. Leggilo come storia, non come ricettario." },
    { t: "Incrocia con fonti attuali", d: "Per ogni pianta, confronta la descrizione storica con EMA, PubMed e le schede di questo erbario." }
  ],
  citazione: {
    testo: "Chi vuole conoscere le piante deve prima imparare a guardarle.",
    fonte: "Sintesi editoriale ispirata al metodo di Mattioli, non citazione letterale."
  },
  fonti: [
    { t: "Treccani · Pietro Andrea Mattioli", u: "https://www.treccani.it/enciclopedia/pietro-andrea-mattioli_(Dizionario-Biografico)/", nota: "Biografia, edizioni e contesto storico." },
    { t: "Internet Archive · Discorsi, 1544", u: "https://archive.org/details/McGillLibrary-osl_di_pedacio_dioscoride_anazarbeo_folioWZ240d594dm1544-20467", nota: "Prima edizione italiana, esemplare digitalizzato." },
    { t: "Internet Archive · Discorsi, 1559", u: "https://archive.org/details/bub_gb_OGK3WyHq8iQC", nota: "Esemplare della Biblioteca Nazionale Centrale di Roma, pubblico dominio." },
    { t: "Internet Archive · Discorsi, 1568", u: "https://archive.org/details/gri_33125014246561", nota: "Edizione italiana con le grandi xilografie, Getty Research Institute." },
    { t: "Internet Archive · Commentarii, 1554", u: "https://archive.org/details/BIUSante_00823", nota: "Versione latina, Biblioteca interuniversitaria di salute di Parigi." },
    { t: "NLM · Dioscorides and Mattioli", u: "https://circulatingnow.nlm.nih.gov/2016/01/06/research-reborn-dioscorides-and-mattioli/", nota: "Confronto tra il testo antico e il commento." },
    { t: "Linda Hall Library · Mattioli", u: "https://www.lindahall.org/about/news/scientist-of-the-day/pietro-andrea-mattioli/", nota: "Le xilografie e la storia editoriale." },
    { t: "Wikisource · Autore Pietro Andrea Mattioli", u: "https://it.wikisource.org/wiki/Autore:Pietro_Andrea_Mattioli", nota: "Repertorio di opere e collegamenti, senza trascrizione integrale dei Discorsi." },
    { t: "PeerJ · La prima descrizione del pomodoro", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8772448/", nota: "Studio storico-botanico sulle piante del Nuovo Mondo." },
    { t: "Linee guida nazionali sul riuso dei beni culturali", u: "https://docs.italia.it/italia/icdp/icdp-pnd-circolazione-riuso-docs/it/v1.0-giugno-2022/contesto-normativo/il-codice-dei-beni-culturali-e-del-paesaggio.html", nota: "Distinzione tra diritto d'autore e condizioni di riproduzione." }
  ]
};

/* --------------------------------------------------------------------------
   Sopravvivenza: base, intermedio, esperto
   -------------------------------------------------------------------------- */

NP.survival = {
  titolo: "Sopravvivenza",
  sottotitolo: "Acqua, riparo, fuoco, segnalazione: il sapere essenziale per tornare a casa",
  sintesi: "La sopravvivenza non è una gara contro la natura: è la gestione lucida delle priorità. Prima si evitano i pericoli, poi si chiamano i soccorsi, poi si combattono freddo, caldo e sete. Il cibo viene molto dopo.",
  regola: {
    titolo: "La regola dei tre: un promemoria, non un cronometro",
    testo: "Si dice che si resista tre minuti senza aria, tre ore senza riparo, tre giorni senza acqua e tre settimane senza cibo. Sono numeri approssimativi, non soglie mediche: una persona ferita, bagnata o in preda al panico può stare molto peggio molto prima. Servono a ricordare l'ordine delle priorità, non a calcolare il tempo.",
    voci: [
      { t: "3 minuti", d: "Aria e controllo delle emorragie. Un sanguinamento grave o un'ostruzione delle vie aeree non aspettano." },
      { t: "3 ore", d: "Protezione dall'esposizione. Freddo, vento, pioggia e calore estremo possono diventare emergenze in poche ore." },
      { t: "3 giorni", d: "Acqua. La sete reale arriva prima di quanto si pensi, soprattutto con caldo e sforzo." },
      { t: "3 settimane", d: "Cibo. Nelle prime ore e nei primi giorni è l'ultima delle priorità." }
    ]
  },
  stop: {
    titolo: "Se ti perdi: fermati",
    passi: [
      "Fermati appena capisci di non sapere più dove sei. Camminare a caso consuma energie e peggiora la situazione.",
      "Proteggiti: mettiti al riparo dal vento, dalla pioggia e dal sole. Siediti su qualcosa di asciutto.",
      "Chiama il 112 e resta in linea. Se non c'è campo, prova a spostarti di pochi metri, in alto o su un punto aperto, senza perdere il riferimento.",
      "Segnala la tua posizione: fischietto, torcia, specchio, colori vivaci. Sei segnali acustici o luminosi al minuto, pausa di un minuto, poi ripeti.",
      "Ragiona: orario, meteo, ferite, acqua, persone con te. Decidi un piano e scrivilo, anche su un sasso.",
      "Se devi muoverti, segui una linea sicura e lascia tracce visibili del tuo passaggio. Non scendere lungo un torrente: può finire in una gola o in un salto."
    ]
  },
  livelli: [
    {
      id: "base",
      nome: "Base",
      motto: "Non finire nei guai, e se ci finisci, fatti trovare.",
      sintesi: "Le competenze che salvano più vite sono noiose: preparazione, abbigliamento, acqua, riparo, chiamata ai soccorsi. Non richiedono attrezzatura estrema.",
      obiettivo: "Sopravvivere 24 ore in condizioni difficili senza peggiorare la situazione.",
      schede: [
        { titolo: "Prima di partire", testo: "Controlla meteo e divieti, lascia a qualcuno itinerario e ora di rientro, porta carta della zona, acqua, strati asciutti, lampada, fischietto, coperta termica e un piccolo kit di primo soccorso. Il telefono non è un piano: può scaricarsi o non avere campo.", errore: "Partire senza dire dove si va e quando si torna." },
        { titolo: "Vestirsi a strati", testo: "Strato traspirante a contatto con la pelle, isolante al centro, antivento e impermeabile fuori. Evita il cotone bagnato: raffredda. Copri testa, mani e piedi, che disperdono calore.", errore: "Indossare un solo strato pesante e sudare, poi raffreddarsi." },
        { titolo: "Acqua: la regola minima", testo: "Un torrente limpido non è potabile. Filtra i solidi con un panno pulito, poi fai bollire l'acqua a ebollizione vigorosa per 1 minuto; sopra i 2.000 metri, per 3 minuti. In alternativa usa un filtro che trattenga batteri e parassiti e, se serve, una disinfezione chimica secondo l'etichetta.", errore: "Bere da un ruscello «perché è in montagna»." },
        { titolo: "Riparo d'emergenza", testo: "L'obiettivo è restare asciutto, riparato dal vento e isolato dal terreno. Un telo o un poncho ben teso vale più di una capanna elaborata. Scegli un punto stabile, lontano da ruscellamenti, rami morti e sassi instabili.", errore: "Costruire sotto un albero con rami secchi sospesi." },
        { titolo: "Fuoco: solo se permesso", testo: "Prima di accendere, verifica che sia consentito in quel luogo e in quel giorno. Prepara esca fine, rametti sottili e legna più grossa. Fuoco piccolo, sorvegliato, con acqua o terra per spegnerlo. Non accendere con vento o siccità.", errore: "Accendere un fuoco «piccolo» in un'area con divieto e vento." },
        { titolo: "Segnalare", testo: "Il 112 è il numero unico di emergenza. Di' dove sei, cosa è successo, quante persone, condizioni e numero di telefono. Se non hai campo, usa fischietto, specchio, torcia e oggetti colorati. Tre segnali sono la risposta convenzionale a un soccorso.", errore: "Consumare la batteria del telefono in chiamate inutili o giochi." },
        { titolo: "Primo soccorso di base", testo: "Emorragia: pressione diretta continua, aggiungi garze sopra senza togliere le prime. Ipotermia: togli gli abiti bagnati, isola dal suolo, riscalda gradualmente. Colpo di calore: ombra, raffreddamento rapido, 112. Frattura sospetta: immobilizza nella posizione trovata.", errore: "Riscaldare la pelle di un ipotermico con acqua bollente o strofinamenti." },
        { titolo: "Cibo: l'ultima priorità", testo: "Nelle prime 24 ore il cibo conta poco. Non mangiare piante o funghi che non riconosci con certezza assoluta: alcune specie mortali somigliano a commestibili. Se hai scorte, razionale, ma non digiunare se stai bene e hai cibo sicuro.", errore: "Mangiare una pianta «quasi sicuramente» commestibile." },
        { titolo: "Restare lucidi", testo: "La paura consuma energia. Respira lentamente, stabilisci un compito alla volta, annota ora e decisioni. Il panico fa camminare in cerchio e prendere decisioni peggiori della stanchezza.", errore: "Correre senza meta per «uscire prima»." }
      ],
      kit: ["Acqua e contenitore", "Coperta termica", "Fischietto", "Torcia e batterie", "Accendino in busta stagnola", "Coltellino", "Kit primo soccorso", "Carta e bussola", "Barretta o frutta secca", "Sacchetto impermeabile per il telefono"]
    },
    {
      id: "intermedio",
      nome: "Intermedio",
      motto: "Trattare l'acqua, orientarsi, costruire un riparo che regga la notte.",
      sintesi: "Qui si passa dalla sopravvivenza passiva alla gestione attiva: si tratta l'acqua, si legge la carta, si costruisce un riparo, si gestisce il fuoco e ci si orienta senza GPS.",
      obiettivo: "Gestire 2–3 giorni in autonomia, con acqua potabile, riparo asciutto e una rotta plausibile.",
      schede: [
        { titolo: "Trattamento dell'acqua", testo: "Lascia sedimentare l'acqua torbida, filtra con un panno e poi bolli. I filtri con pori assoluti fino a 0,3 micron trattengono batteri e parassiti ma non tutti i virus: dopo il filtro, disinfetta o bolli. Cloro, biossido di cloro e iodio seguono l'etichetta: dose e tempo di contatto cambiano. Lo iodio non va usato in gravidanza o con problemi tiroidei.", errore: "Filtrare e basta, pensando di aver potabilizzato." },
        { titolo: "Acqua salata e contaminata", testo: "Bollire l'acqua di mare non toglie il sale: serve distillare raccogliendo il vapore, oppure osmosi inversa. Un distillatore solare produce poco e lentamente. Nessun metodo casalingo rende sicura l'acqua contaminata da carburanti, solventi o metalli.", errore: "Bere acqua di mare «diluita»: peggiora la disidratazione." },
        { titolo: "Carta e bussola", testo: "Orienta la carta con la bussola, tieni conto della declinazione magnetica, riconosci le forme del terreno e segui una rotta verificata. Il GPS è un aiuto, non una garanzia. Se sei perso, non improvvisare una discesa lungo un torrente.", errore: "Fidarsi del muschio sugli alberi o del sole per una rotta precisa." },
        { titolo: "Riparo per la notte", testo: "Un telo a A, un lean-to con frasche o una trincea con copertura isolante possono bastare. Isola dal terreno con foglie secche, rami e indumenti. Costruisci piccolo: meno volume, più calore. Verifica che il tetto scarichi l'acqua e che il vento non lo strappi.", errore: "Riparo troppo grande, freddo e instabile." },
        { titolo: "Fuoco con tempo umido", testo: "Prepara prima esca, legna sottile e legna grossa. Cerca legno morto in piedi, corteccia di betulla, resina, fibre secche. Un ferrocerio produce scintille ma serve esca asciutta. Costruisci il fuoco a piramide o a capanna, alimentandolo gradualmente.", errore: "Cercare legna grossa prima di avere una fiamma stabile." },
        { titolo: "Nodi che servono", testo: "Impara gassa d'amante (asola fissa), barcaiolo (fissaggio a un anello), parlato regolabile (tenditore) e nodo bandiera (unire corde diverse). Esercitati a casa, con i guanti, al buio. Non usare nodi improvvisati per assicurazione o soccorso.", errore: "Usare il nodo quadro per un carico che può scorrere." },
        { titolo: "Meteo e fulmini", testo: "Nuvoloni a incudine, vento che gira, calo improvviso di temperatura e pioggia in arrivo sono segnali da leggere. In temporale evita cime, creste, alberi isolati e corsi d'acqua; assumi la posizione raccolta con i piedi uniti, senza sdraiarti.", errore: "Ripararsi sotto un albero isolato durante un temporale." },
        { titolo: "Segnalazione a distanza", testo: "Sei segnali al minuto, pausa, ripeti: è il segnale alpino di soccorso. Usa fischietto, torcia, specchio, telo colorato. Un braccio alto e uno basso a N significa «no»; entrambe le braccia a Y significano «aiuto». Un terreno aperto e visibile vale più di un rifugio nascosto.", errore: "Nascondersi in un bosco fitto e aspettare senza segnalare." },
        { titolo: "Igiene e cibo", testo: "Lava le mani prima di mangiare, tieni separati cibo cotto e crudo, cuoci bene carne e pesce. Conserva l'acqua trattata in contenitori puliti. Non raccogliere funghi senza controllo di un micologo e piante senza identificazione esperta.", errore: "Mescolare utensili crudi e cotti e bere da contenitori non lavati." }
      ],
      kit: ["Filtro o pastiglie per l'acqua", "Bussola e carta topografica", "Telo o poncho robusto", "Corda da 10 m", "Acciarino e esca", "Pennello o spazzolino per la segnalazione", "Specchio di segnalazione", "Bende e garze", "Sacco a pelo o coperta", "Contenitore rigido per l'acqua"]
    },
    {
      id: "esperto",
      nome: "Esperto",
      motto: "Comandare l'emergenza, non subirla. E sapere quando non basta.",
      sintesi: "Il livello esperto non è «sopravvivere da soli per mesi»: è gestire un gruppo, un ferito grave, un'evacuazione, una notte estrema. Richiede formazione pratica e certificazioni, non tutorial.",
      obiettivo: "Gestire un'emergenza complessa, coordinare i soccorsi e mantenere il gruppo vivo fino all'evacuazione.",
      schede: [
        { titolo: "Comando e triage", testo: "Una persona dirige, le altre eseguono e riferiscono. Valuta sicurezza della scena, coscienza, respiro, emorragie. Ordina i feriti per urgenza, non per ordine di arrivo. Annota ora, nome, lesioni e trattamenti: serve ai soccorritori.", errore: "Tutti parlano, nessuno decide, nessuno annota." },
        { titolo: "Emorragie e vie aeree", testo: "Pressione diretta, garze aggiunte sopra, pressione sul punto prossimale se serve. Il laccio emostatico è per emorragie estreme e solo se sai usarlo. Ostruzione delle vie aeree: manovre di disostruzione secondo età e coscienza. La rianimazione cardiopolmonare va appresa in un corso certificato.", errore: "Togliere la prima garza impregnata e riaprire la ferita." },
        { titolo: "Ipotermia grave", testo: "Confusione, sonnolenza e assenza di brividi sono segni gravi. Muovi il paziente con delicatezza, taglia i vestiti bagnati, isola dal suolo, riscalda il tronco prima degli arti. Non strofinare, non dare alcol, non usare calore intenso. Se incosciente, gestisci le vie aeree e chiama i soccorsi.", errore: "Riscaldare prima le estremità e far camminare un ipotermico grave." },
        { titolo: "Colpo di calore", testo: "Alterazione mentale in ambiente caldo è un'emergenza. Chiama il 112, porta all'ombra, spoglia, bagna con acqua fresca, ventila, usa impacchi su collo, ascelle e inguine. Raffreddamento rapido, non graduale. Non dare liquidi a chi è incosciente.", errore: "Aspettare «che passi» un colpo di calore." },
        { titolo: "Evacuazione e barella", testo: "Prima di improvvisare una barella, valuta se il ferito può camminare assistito. Una barella richiede almeno quattro persone per tratti lunghi e un terreno sicuro. Immobilizza testa e colonna se sospetti un trauma. Comunica con i soccorritori e segui le loro istruzioni.", errore: "Trasportare un trauma spinale senza immobilizzazione." },
        { titolo: "Corde e recupero", testo: "Nodi, ancoraggi e manovre di corda possono salvare o uccidere. Usa solo tecniche apprese in un corso, con corde e imbragature adatte. Mai assicurare una persona con una corda da bricolage o un nodo incerto. In caso di dubbio, aspetta i soccorsi.", errore: "Improvvisare un recupero su parete con corda non adatta." },
        { titolo: "Ricerca e coordinamento", testo: "Se fai parte di una squadra, segui il piano di ricerca a griglia, mantieni le comunicazioni e registra i settori battuti. Un PLB o un localizzatore satellitare è più efficace di qualsiasi segnale visivo. Non rientrare in una zona pericolosa per «fare da soli».", errore: "Dividersi senza punti di ritrovo e orari." },
        { titolo: "Decisioni e psicologia", testo: "Stanchezza, freddo e paura riducono la capacità di decidere. Usa checklist, imponi pause, mangia e bevi, controlla i compagni. Il leader deve chiedere il parere di chi vede meglio, non solo il proprio. A volte la decisione migliore è rinunciare.", errore: "Continuare per «non aver fatto tanta strada per niente»." },
        { titolo: "Limiti e formazione", testo: "Un livello esperto si costruisce con corsi di primo soccorso remoto, topografia, soccorso alpino, antincendio e pratica supervisionata. Nessuna pagina web sostituisce l'addestramento. Conosci i tuoi limiti e quelli del gruppo.", errore: "Confondere un tutorial con una certificazione." }
      ],
      kit: ["Localizzatore satellitare o PLB", "Radio e batterie", "Set di primo soccorso avanzato", "Barella leggera o telo rigido", "Corda e imbragatura omologate", "Bussola, carta, altimetro", "Riparo d'emergenza e sacco termico", "Acqua e sistema di trattamento", "Torcia frontale e lampada di segnalazione", "Quaderno e matita"]
    }
  ],
  errori: [
    "Camminare senza meta quando ci si è persi.",
    "Bere acqua non trattata perché «sembra pulita».",
    "Accendere fuochi dove sono vietati o con vento e siccità.",
    "Costruire ripari sotto alberi morti o in canali di scolo.",
    "Sottovalutare vento e abiti bagnati: l'ipotermia arriva anche sopra lo zero.",
    "Mangiare piante o funghi non identificati con certezza.",
    "Lasciare il gruppo senza un punto di ritrovo.",
    "Consumare la batteria del telefono in attività non essenziali.",
    "Non segnalare la propria posizione perché «mi vergogno» o «arrivano subito».",
    "Confondere un video o un tutorial con una formazione pratica."
  ],
  norme: [
    { t: "Fuochi e incendi", d: "Non accendere fuochi fuori dalle aree attrezzate né in presenza di vento o siccità. Per fumo o fiamme chiama il 115 o il 112 dove attivo. Le regole cambiano da Regione a Regione e da area protetta a area protetta: verifica sempre prima." },
    { t: "Bivacco e campeggio", d: "Non dare per scontato che il bivacco sia consentito ovunque. Parchi, Comuni e Regioni hanno regole proprie; in alcune aree è ammesso solo il bivacco d'emergenza per una notte. Informati presso l'ente gestore." },
    { t: "Acqua", d: "Il prelievo di acqua pubblica è disciplinato. Per usi occasionali in aree demaniali o private, verifica le regole locali e non danneggiare sorgenti o captazioni." },
    { t: "Raccolta di piante e funghi", d: "Autorizzazioni, limiti giornalieri, specie protette e divieti variano per Regione e parco. In alcune regioni la raccolta di funghi richiede un permesso e il controllo di un micologo. Non raccogliere specie protette." },
    { t: "Emergenze", d: "112 numero unico di emergenza; 115 Vigili del Fuoco; 118 emergenza sanitaria dove ancora attivo. Segui le istruzioni dell'operatore e non riagganciare prima che te lo dica." },
    { t: "Droni e segnalazioni", d: "L'uso di droni è regolato e può interferire con le operazioni di soccorso. Non far volare droni vicino a elicotteri o squadre di soccorso." }
  ],
  fonti: [
    { t: "CDC · Trattamento dell'acqua in escursione", u: "https://www.cdc.gov/drinking-water/prevention/water-treatment-hiking-camping-traveling.html", nota: "Bollitura, filtri, disinfezione e limiti." },
    { t: "CDC · Acqua sicura in emergenza", u: "https://www.cdc.gov/water-emergency/about/index.html", nota: "Cosa fare quando l'acqua non è sicura." },
    { t: "USGS · Dissalazione", u: "https://www.usgs.gov/water-science-school/science/desalination", nota: "Perché bollire non toglie il sale." },
    { t: "Croce Rossa Italiana · Primo soccorso", u: "https://cri.it/cosa-facciamo/salute/primo-soccorso/pillole-di-primo-soccorso/", nota: "Schede su emorragie, ipotermia, calore e traumi." },
    { t: "CNSAS · Richiesta di soccorso", u: "https://www.cnsas.it/richiesta-di-soccorso/", nota: "Come chiedere aiuto in montagna." },
    { t: "Soccorso Alpino Alto Adige · Segnali", u: "https://www.soccorsoalpino.org/sicurezza", nota: "Sei segnali al minuto e segnali per elicottero." },
    { t: "CAI · Topografia e orientamento", u: "https://csc.cai.it/wp-content/uploads/2018/01/10_Appunti_Topografia_GPS.pdf", nota: "Carta, bussola e GPS." },
    { t: "CAI · Nodi e manovre di corda", u: "https://archivio.cai.it/wp-content/uploads/2021/10/Quaderno-CAI-6-Nodi-e-Manovre-di-corda-escursionismo.pdf", nota: "Nodi escursionistici di base." },
    { t: "Io non rischio · Incendi boschivi", u: "https://www.iononrischio.gov.it/en/get-ready/forest-fire/what-do/", nota: "Comportamenti e numeri utili." },
    { t: "US Forest Service · If you get lost", u: "https://www.fs.usda.gov/visit/know-before-you-go/if-you-get-lost", nota: "Restare sul posto e farsi trovare." },
    { t: "FM 21-76 · Manuale di sopravvivenza", u: "https://archive.org/details/usarmysurvivalma00depa", nota: "Riferimento storico, non linea guida italiana." }
  ]
};
