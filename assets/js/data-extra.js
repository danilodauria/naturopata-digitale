/* ==========================================================================
   Naturopata Digitale · Schede di benessere e calendario
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.conditions = [

  {
    id: "sonno",
    titolo: "Sonno difficile",
    icona: "moon",
    sintesi: "Difficoltà ad addormentarsi, risvegli notturni, sonno che non ristora.",
    segnali: ["Addormentamento oltre 30 minuti", "Risvegli frequenti", "Sonnolenza diurna", "Pensieri che tengono svegli"],
    cosaAiuta: [
      "Svegliarsi alla stessa ora ogni giorno, anche nel fine settimana",
      "Esporsi alla luce naturale al mattino e abbassare le luci la sera",
      "Evitare caffeina nel pomeriggio e alcol la sera",
      "Camera buia, fresca e silenziosa; letto solo per dormire",
      "Se non si dorme dopo 20–30 minuti, alzarsi e fare qualcosa di tranquillo",
      "Respirazione lenta e rilassamento muscolare prima di coricarsi"
    ],
    piante: [
      { id: "camomilla", nota: "Infuso la sera, delicato e adatto anche ai bambini più grandi." },
      { id: "melissa", nota: "Utile se l'irrequietezza si accompagna a tensione digestiva." },
      { id: "passiflora", nota: "Per l'addormentamento; non guidare dopo l'assunzione." },
      { id: "valeriana", nota: "Radice in infuso o tintura; effetto modesto e variabile." },
      { id: "lavanda", nota: "Aromaterapia o bagno; non usare olio essenziale puro." }
    ],
    attenzione: ["Insonnia da più di 3 settimane", "Russamento con pause respiratorie", "Sonnolenza alla guida", "Umore basso o ansia intensa", "Uso di sonniferi senza ricetta"],
    evidenza: "La CBT-I è il trattamento di prima linea. Le piante hanno un effetto modesto e vanno considerate un supporto, non una soluzione."
  },

  {
    id: "stress",
    titolo: "Stress e ansia lieve",
    icona: "wind",
    sintesi: "Tensione, preoccupazione, respiro corto, difficoltà a recuperare.",
    segnali: ["Muscoli tesi e mandibola serrata", "Palpitazioni e respiro corto", "Irritabilità", "Difficoltà di concentrazione", "Problemi digestivi"],
    cosaAiuta: [
      "Respirazione lenta: 4–5 secondi in inspirazione, 5–6 in espirazione",
      "Movimento quotidiano, anche una camminata di 20 minuti",
      "Ridurre stimolanti e sonno regolare",
      "Pause reali durante la giornata, senza schermi",
      "Contatto con la natura e relazioni significative",
      "Psicoterapia quando l'ansia limita la vita quotidiana"
    ],
    piante: [
      { id: "passiflora", nota: "Ansia lieve e tensione serale." },
      { id: "melissa", nota: "Calma e digestione, utile anche nei periodi di studio." },
      { id: "lavanda", nota: "Aromaterapia e massaggio diluito." },
      { id: "biancospino", nota: "Palpitazioni nervose, dopo esclusione di cause cardiache." },
      { id: "valeriana", nota: "Tensione muscolare e sonno; attenzione alla sonnolenza." }
    ],
    attenzione: ["Attacchi di panico", "Ansia che impedisce lavoro o relazioni", "Pensieri di farsi del male", "Uso crescente di alcol o sostanze", "Sintomi cardiaci nuovi"],
    evidenza: "Respirazione, attività fisica e psicoterapia hanno le prove migliori. Le piante calmanti hanno effetti lievi e variabili."
  },

  {
    id: "digestione",
    titolo: "Digestione difficile",
    icona: "leaf",
    sintesi: "Gonfiore, pesantezza, crampi, digestione lenta.",
    segnali: ["Gonfiore dopo i pasti", "Eruttazioni e meteorismo", "Dolore addominale lieve", "Stitichezza o alvo irregolare", "Sensazione di pienezza"],
    cosaAiuta: [
      "Mangiare seduti, lentamente e senza schermi",
      "Pasti regolari e porzioni moderate",
      "Aumentare gradualmente la fibra e bere acqua",
      "Movimento dopo i pasti",
      "Limitare bevande gassate, alcol e grandi quantità di dolcificanti",
      "Tenere un diario dei sintomi e degli alimenti"
    ],
    piante: [
      { id: "finocchio", nota: "Semi in infuso dopo i pasti, per gonfiore e crampi." },
      { id: "menta", nota: "Utile nell'intestino irritabile, ma può peggiorare il reflusso." },
      { id: "camomilla", nota: "Antispasmodica delicata, adatta alla sera." },
      { id: "tarassaco", nota: "Amaro digestivo, prima dei pasti." },
      { id: "malva", nota: "Emolliente per mucose irritate." }
    ],
    attenzione: ["Sangue nelle feci", "Perdita di peso involontaria", "Difficoltà a deglutire", "Vomito persistente", "Dolore intenso o febbre", "Anemia o storia familiare di tumori intestinali"],
    evidenza: "Fibra, ritmi e movimento sono le basi. Menta e finocchio hanno prove moderate o tradizionali; la diagnosi differenziale è essenziale."
  },

  {
    id: "pelle",
    titolo: "Pelle irritata",
    icona: "drop",
    sintesi: "Arrossamenti, secchezza, prurito, piccole irritazioni.",
    segnali: ["Pelle che tira dopo il lavaggio", "Arrossamento e prurito", "Desquamazione", "Irritazioni da pannolino", "Piccole ferite superficiali"],
    cosaAiuta: [
      "Detersione delicata con acqua tiepida e detergente a pH fisiologico",
      "Idratare subito dopo la doccia con emollienti",
      "Protezione solare e abiti in fibre naturali",
      "Evitare profumi, scrub e prodotti aggressivi",
      "Patch test per ogni nuovo prodotto",
      "Non grattare le lesioni"
    ],
    piante: [
      { id: "calendula", nota: "Oleolito o crema per pelle irritata e piccole ferite." },
      { id: "aloe", nota: "Gel lenitivo per scottature lievi e pelle secca." },
      { id: "malva", nota: "Impacchi emollienti." },
      { id: "piantaggine", nota: "Impacco per punture e irritazioni." }
    ],
    attenzione: ["Lesioni che si estendono o si infettano", "Febbre con eruzione cutanea", "Mucose coinvolte", "Nevi che cambiano", "Dermatite che non migliora in 2 settimane"],
    evidenza: "Emollienti e protezione della barriera sono la base. Calendula e aloe hanno prove discrete per uso topico; la diagnosi dermatologica resta necessaria."
  },

  {
    id: "respiratorio",
    titolo: "Vie respiratorie",
    icona: "cloud",
    sintesi: "Tosse, catarro, gola irritata, raffreddore di stagione.",
    segnali: ["Tosse secca o produttiva", "Mal di gola", "Naso chiuso", "Voce rauca", "Catarro"],
    cosaAiuta: [
      "Bere a sufficienza e mantenere l'aria umida",
      "Riposo e sonno",
      "Lavaggi nasali con soluzione fisiologica",
      "Non fumare e evitare ambienti irritanti",
      "Miele per la tosse negli adulti e nei bambini sopra l'anno",
      "Vaccinazioni secondo indicazione medica"
    ],
    piante: [
      { id: "timo", nota: "Espettorante e antisettico per gola e tosse." },
      { id: "malva", nota: "Emolliente per la gola irritata." },
      { id: "sambuco", nota: "Fiori in infuso, solo cotti, per la fase iniziale." },
      { id: "piantaggine", nota: "Tosse secca e irritazione." },
      { id: "echinacea", nota: "Supporto breve nelle prime fasi; prove contrastanti." }
    ],
    attenzione: ["Fiato corto o respiro sibilante", "Febbre alta persistente", "Dolore toracico", "Tosse con sangue", "Sintomi oltre 10 giorni o peggioramento", "Bambini piccoli con difficoltà respiratoria"],
    evidenza: "Miele e lavaggi nasali hanno buone prove sintomatiche. Timo e malva sono tradizionali; l'echinacea ha risultati incoerenti. Gli antibiotici servono solo per infezioni batteriche."
  },

  {
    id: "ciclo",
    titolo: "Ciclo e menopausa",
    icona: "flower",
    sintesi: "Dolori mestruali, sindrome premestruale, vampate e sudorazioni.",
    segnali: ["Crampi mestruali", "Tensione al seno", "Irritabilità premestruale", "Vampate e sudorazioni notturne", "Sonno disturbato"],
    cosaAiuta: [
      "Attività fisica regolare e sonno",
      "Calore locale per i crampi",
      "Ridurre caffeina, alcol e fumo, soprattutto in menopausa",
      "Alimentazione varia, calcio e vitamina D valutati con il medico",
      "Diario del ciclo e dei sintomi",
      "Confronto con ginecologo o consultorio"
    ],
    piante: [
      { id: "salvia", nota: "Tradizionale per sudorazioni e vampate; non in allattamento." },
      { id: "camomilla", nota: "Crampi lievi e tensione." },
      { id: "melissa", nota: "Irritabilità e sonno." },
      { id: "biancospino", nota: "Palpitazioni nervose e tensione." },
      { id: "finocchio", nota: "Tradizione per il gonfiore premestruale; dosi contenute." }
    ],
    attenzione: ["Dolore mestruale che non passa con antidolorifici", "Sanguinamenti abbondanti o tra le mestruazioni", "Sanguinamento dopo la menopausa", "Dolore pelvico persistente", "Gravidanza possibile o in corso"],
    evidenza: "La salvia ha qualche prova sulle sudorazioni; per il resto l'evidenza è limitata. I sintomi ginecologici persistenti richiedono una valutazione specialistica."
  },

  {
    id: "articolazioni",
    titolo: "Articolazioni e muscoli",
    icona: "activity",
    sintesi: "Dolori muscolari, rigidità, piccoli traumi e recupero.",
    segnali: ["Rigidità al risveglio", "Dolore dopo sforzo", "Muscoli tesi", "Gonfiore articolare lieve", "Recupero lento"],
    cosaAiuta: [
      "Movimento regolare e rinforzo muscolare graduale",
      "Calore prima dell'attività, ghiaccio dopo un trauma acuto",
      "Peso corporeo in equilibrio con la salute",
      "Sonno e proteine adeguate",
      "Non forzare un'articolazione gonfia e calda",
      "Valutazione fisioterapica se il dolore persiste"
    ],
    piante: [
      { id: "ortica", nota: "Tradizionale per dolori articolari; radice per la prostata." },
      { id: "rosmarino", nota: "Olio da massaggio diluito, per calore e circolazione." },
      { id: "iperico", nota: "Olio topico per dolori muscolari, attenzione al sole." },
      { id: "rosa-canina", nota: "Polvere di cinorrodi, studi preliminari." },
      { id: "calendula", nota: "Oleolito per piccoli traumi cutanei." }
    ],
    attenzione: ["Articolazione gonfia, calda e rossa", "Febbre", "Trauma con deformità", "Perdita di forza o sensibilità", "Dolore notturno che sveglia", "Dolore dopo caduta"],
    evidenza: "Esercizio e fisioterapia sono centrali. Rosa canina e ortica hanno prove limitate; gli oli topici danno un beneficio sintomatico e di conforto."
  },

  {
    id: "difese",
    titolo: "Difese di stagione",
    icona: "shield",
    sintesi: "Prevenzione ragionevole delle infezioni respiratorie comuni.",
    segnali: ["Raffreddori frequenti", "Recupero lento", "Stanchezza nei mesi freddi", "Gola sensibile"],
    cosaAiuta: [
      "Sonno regolare e gestione dello stress",
      "Alimentazione varia con frutta e verdura",
      "Attività fisica moderata",
      "Igiene delle mani e ventilazione degli ambienti",
      "Vaccinazioni raccomandate",
      "Non fumare"
    ],
    piante: [
      { id: "echinacea", nota: "Supporto breve nelle prime fasi; non uso continuativo." },
      { id: "sambuco", nota: "Fiori cotti in infuso; bacche solo cotte." },
      { id: "rosa-canina", nota: "Fonte di vitamina C, come alimento." },
      { id: "timo", nota: "Gola e tosse." },
      { id: "aglio-orsino", nota: "Alimento di stagione; attenzione ai sosia mortali." }
    ],
    attenzione: ["Febbre alta o persistente", "Fiato corto", "Dolore toracico", "Confusione", "Sintomi gravi in bambini, anziani o immunodepressi"],
    evidenza: "Le misure igieniche e le vaccinazioni hanno l'evidenza più solida. Gli integratori hanno effetti piccoli e incerti; nessuno sostituisce la valutazione medica."
  }

];

NP.months = [
  { mese: 1, nome: "Gennaio", titolo: "Il riposo della terra", testo: "Le piante sono in pausa: è il momento di studiare, riordinare l'erbario e progettare l'orto. In casa si usano le scorte essiccate e gli oleoliti preparati in estate.", lavori: ["Rivedere le scorte e l'etichettatura", "Progettare l'orto aromatico", "Studiare le famiglie botaniche", "Preparare uno sciroppo con erbe essiccate"] },
  { mese: 2, nome: "Febbraio", titolo: "I primi risvegli", testo: "Nei climi miti compaiono le prime rosette e i germogli. È ancora tempo di radici e di potature dell'olivo, da cui si ricavano le foglie per gli infusi.", lavori: ["Raccogliere foglie di olivo dalla potatura", "Preparare talee di rosmarino e salvia", "Controllare le piante aromatiche", "Programmare le semine"] },
  { mese: 3, nome: "Marzo", titolo: "Il verde nuovo", testo: "Esplode la primavera: ortica, tarassaco, cicoria e piantaggine offrono le foglie più tenere. È il mese della fitoalimurgia, ma anche della massima attenzione ai sosia.", lavori: ["Raccogliere ortica e tarassaco", "Preparare il primo pesto selvatico", "Seminare aromatiche", "Riprendere le camminate botaniche"] },
  { mese: 4, nome: "Aprile", titolo: "Fiori e foglie", testo: "Malva, borragine e piantaggine sono al meglio; i primi fiori di biancospino annunciano la stagione. Raccogliere con tempo asciutto e lasciare i fiori per gli insetti.", lavori: ["Raccogliere malva e piantaggine", "Essiccare i primi fiori", "Preparare oleolito di calendula", "Osservare gli impollinatori"] },
  { mese: 5, nome: "Maggio", titolo: "Il mese delle rose", testo: "Rose, sambuco e biancospino fioriscono. È il momento dei profumi e delle prime raccolte di fiori da essiccare o trasformare in sciroppi.", lavori: ["Raccogliere fiori di sambuco", "Preparare sciroppo di sambuco", "Raccogliere petali di rosa", "Essiccare camomilla e lavanda"] },
  { mese: 6, nome: "Giugno", titolo: "Il sole alto", testo: "Camomilla, lavanda, timo e salvia sono in piena fioritura. Le giornate lunghe favoriscono l'essiccazione, ma il caldo richiede attenzione agli oli essenziali, che sono volatili.", lavori: ["Raccogliere lavanda e camomilla", "Distillare o preparare idrolati", "Essiccare le aromatiche", "Preparare un oleolito solare di iperico"] },
  { mese: 7, nome: "Luglio", titolo: "Aromi e calura", testo: "Le aromatiche sono al massimo. Si raccolgono al mattino presto, prima che il sole scaldi troppo. È anche il tempo dei semi di finocchio e delle prime bacche.", lavori: ["Raccogliere timo, origano e rosmarino", "Raccogliere semi di finocchio", "Preparare aceti aromatici", "Conservare le erbe in barattoli scuri"] },
  { mese: 8, nome: "Agosto", titolo: "Il tempo dei semi", testo: "Molte piante completano il ciclo e maturano i semi. Le bacche di sambuco iniziano a scurirsi; le giornate sono ideali per essiccare in un luogo ben ventilato.", lavori: ["Raccogliere semi di finocchio e coriandolo", "Controllare l'essiccazione", "Preparare confetture di stagione", "Raccogliere le prime more e lamponi"] },
  { mese: 9, nome: "Settembre", titolo: "Radici e frutti", testo: "Si torna alle radici: tarassaco, ortica e liquirizia. I cinorrodi colorano le siepi. È il mese giusto per preparare sciroppi e conserve per l'inverno.", lavori: ["Raccogliere radici di tarassaco", "Raccogliere cinorrodi", "Preparare sciroppo di rosa canina", "Piantare aromatiche perenni"] },
  { mese: 10, nome: "Ottobre", titolo: "Il raccolto generoso", testo: "Castagne, noci, bacche e radici. Le foglie cadono e il bosco si prepara al riposo. Si puliscono e si conservano i semi, si preparano i primi decotti serali.", lavori: ["Raccogliere bacche e frutti di bosco", "Essiccare le ultime foglie", "Preparare tinture madri", "Proteggere le piante dal freddo"] },
  { mese: 11, nome: "Novembre", titolo: "Il silenzio", testo: "Le giornate si accorciano. È il momento di riordinare le scorte, controllare le muffe, preparare miscele per l'inverno e dedicarsi alla lettura.", lavori: ["Controllare le scorte essiccate", "Preparare miscele per la tosse", "Pulire e oliare gli attrezzi", "Leggere e aggiornarsi"] },
  { mese: 12, nome: "Dicembre", titolo: "Il cerchio si chiude", testo: "Poche raccolte, molta casa. Le erbe essiccate diventano tisane, decorazioni e regali. È il tempo di ringraziare il territorio e pianificare il nuovo anno.", lavori: ["Preparare tisane regalo", "Fare il bilancio dell'anno", "Progettare nuovi percorsi", "Riposare e stare con le persone care"] }
];
