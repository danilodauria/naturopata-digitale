/* ==========================================================================
   Naturopata Digitale · Erbario, parte quarta
   Nuove schede E–M: usi tradizionali, sicurezza e fonti.
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.plants = NP.plants.concat([

  {
    id: "equiseto",
    nome: "Equiseto",
    latino: "Equisetum arvense",
    famiglia: "Equisetaceae",
    nomi: ["Coda di cavallo", "Erba canella", "Rasparella"],
    tono: 2,
    categorie: ["Officinale"],
    sintesi: "Fusti sottili e ruvidi come carta vetrata: un diuretico tradizionale, ricco di minerali.",
    descrizione: "Pianta perenne senza fiori, con rizoma strisciante e due tipi di fusti: quelli fertili, bruni e carnosi, compaiono in primavera e portano le spore; quelli sterili, verdi, articolati e con rametti a spirale, crescono in estate. Il fusto è ruvido per i cristalli di silice. Cresce in terreni umidi, argini e fossi.",
    parti: ["Fusti sterili"],
    habitat: "Terreni umidi, argini, fossi, prati allagati e bordi di corsi d'acqua.",
    raccolta: { mesi: [6, 7, 8], nota: "Si tagliano i fusti sterili verdi, senza i fusti fertili; essiccare rapidamente all'ombra." },
    proprieta: ["Diuretica", "Remineralizzante tradizionale", "Astringente", "Antinfiammatoria lieve", "Vulneraria"],
    usi: [
      "Disturbi urinari minori, come coadiuvante del lavaggio delle vie urinarie",
      "Ritenzione idrica lieve",
      "Tradizione per capelli e unghie fragili",
      "Piccole ferite, per uso esterno",
      "Supporto remineralizzante, con evidenza limitata"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1–2 g di fusti essiccati in 200 ml di acqua a 90 °C per 10 minuti.", dose: "Una tazza due volte al giorno, per non più di 2–4 settimane." },
      { nome: "Impacco", ricetta: "Infuso filtrato e raffreddato, su garza per 10 minuti.", dose: "Uso esterno su cute integra." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare le preparazioni medicinali: dati insufficienti e possibile effetto sulla diuresi.",
      allattamento: "Dati insufficienti: evitare gli estratti concentrati.",
      bambini: "Non usare come diuretico sotto i 12 anni senza parere medico.",
      controindicazioni: ["Insufficienza cardiaca o renale con restrizione idrica", "Edemi da cause cardiache o renali", "Calcoli renali", "Alcolismo cronico (per il contenuto di tiaminasi)"],
      interazioni: ["Diuretici: effetto additivo", "Digossina: rischio per squilibri di potassio", "Litio: possibile riduzione dell'eliminazione"],
      nota: "L'equiseto contiene tiaminasi, che può ridurre la vitamina B1: non usare per periodi prolungati né in chi ha carenze o abusa di alcol. Non cura le infezioni urinarie. Le specie palustri e i prodotti contaminati vanno evitati."
    },
    sosia: [
      { nome: "Equiseto palustre e altre specie", rischio: "Alcune specie di Equisetum sono tossiche o protette. Raccogliere solo fusti sterili di E. arvense in luoghi puliti." }
    ],
    fito: { commestibile: false, parti: "Nessuna", stagione: "—", cucina: "Non alimentare: i fusti contengono silice e tiaminasi.", nota: "Non masticare i fusti: sono abrasivi e non commestibili." },
    evidenza: "L'effetto diuretico è documentato dalla tradizione e da studi piccoli; l'evidenza clinica è limitata. Per capelli e unghie le prove sono aneddotiche.",
    curiosita: "L'equiseto è un fossile vivente: le sue forme simili esistevano già nel Carbonifero, oltre 300 milioni di anni fa. La silice sulla superficie è responsabile dell'effetto abrasivo.",
    fonti: [
      { t: "EMA · Equiseti herba", u: "https://www.ema.europa.eu/en/medicines/herbal/equiseti-herba" },
      { t: "PubMed · Equisetum arvense", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Equisetum+arvense" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "escolzia",
    nome: "Escolzia",
    latino: "Eschscholzia californica",
    famiglia: "Papaveraceae",
    nomi: ["Papavero della California", "California poppy"],
    tono: 1,
    categorie: ["Officinale"],
    sintesi: "Il papavero arancione della California: un sedativo delicato per le sere difficili.",
    descrizione: "Pianta annuale o perenne con foglie finemente divise, glauche, e fiori a coppa di un arancione intenso che si chiudono di notte. È il fiore simbolo della California. Le parti aeree contengono alcaloidi, tra cui la protopina, con effetto sedativo lieve. Non contiene morfina e non va confusa con il papavero da oppio.",
    parti: ["Parti aeree fiorite"],
    habitat: "Prati aridi e pendii della California; coltivata in Europa come ornamentale e officinale.",
    raccolta: { mesi: [5, 6, 7, 8], nota: "Si raccolgono le sommità durante la fioritura, con tempo asciutto, e si essiccano all'ombra." },
    proprieta: ["Sedativa lieve", "Ansiolitica", "Antispasmodica", "Leggermente analgesica"],
    usi: [
      "Difficoltà ad addormentarsi",
      "Tensione nervosa lieve",
      "Irrequietezza serale",
      "Tensione muscolare leggera",
      "Supporto nei periodi di stress, non come terapia dell'ansia"
    ],
    preparazioni: [
      { nome: "Infuso serale", ricetta: "1–2 g di parti aeree essiccate in 200 ml di acqua a 90 °C per 8 minuti.", dose: "Una tazza 30–60 minuti prima di coricarsi." },
      { nome: "Tintura", ricetta: "Tintura madre secondo le indicazioni del produttore.", dose: "Solo per brevi periodi; non guidare dopo l'assunzione." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare: dati insufficienti e possibile effetto sedativo sul feto.",
      allattamento: "Evitare: non ci sono dati sufficienti.",
      bambini: "Solo su indicazione del pediatra; non usare oli essenziali o tinture alcoliche.",
      controindicazioni: ["Allergia alle Papaveraceae", "Uso di sedativi o alcol", "Guida e lavori che richiedono vigilanza", "Depressione respiratoria"],
      interazioni: ["Benzodiazepine e sedativi: effetto additivo", "Alcol: potenziamento della sonnolenza", "Antidepressivi: cautela teorica", "Farmaci metabolizzati dal fegato: cautela"],
      nota: "L'effetto è lieve ma reale: può causare sonnolenza e ridurre i riflessi. Non associare a sonniferi o alcol senza parere. Non usare come sostituto della terapia cognitivo-comportamentale per l'insonnia."
    },
    sosia: [
      { nome: "Papavero comune e altri papaveri", rischio: "I papaveri si somigliano; non raccogliere specie spontanee senza identificazione. L'escolzia coltivata è la fonte sicura." }
    ],
    fito: { commestibile: false, parti: "Nessuna", stagione: "—", cucina: "Non alimentare.", nota: "Non usare i semi come quelli del papavero da forno: la composizione è diversa." },
    evidenza: "Studi piccoli suggeriscono un effetto ansiolitico e sedativo lieve, con buona tollerabilità a breve termine. Mancano studi grandi e di lunga durata.",
    curiosita: "Il nome ricorda il naturalista tedesco Johann Friedrich von Eschscholtz, che la descrisse durante una spedizione in California. I fiori si chiudono al tramonto e nelle giornate nuvolose.",
    fonti: [
      { t: "EMA · Eschscholziae herba", u: "https://www.ema.europa.eu/en/medicines/herbal/eschscholziae-herba" },
      { t: "PubMed · Eschscholzia californica", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Eschscholzia+californica" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "ginepro",
    nome: "Ginepro",
    latino: "Juniperus communis",
    famiglia: "Cupressaceae",
    nomi: ["Ginepro comune", "Bacche di ginepro"],
    tono: 3,
    categorie: ["Officinale", "Aromatica"],
    sintesi: "Bacche scure dal profumo resinoso: aromatizzano il gin e sostengono la digestione, con cautela per i reni.",
    descrizione: "Arbusto o piccolo albero sempreverde, con aghi pungenti e appariscenti falsi frutti sferici, verdi e poi blu-neri, coperti di pruina. Il profumo è resinoso e intenso. Cresce in terreni aridi e soleggiati, dal piano alla montagna. Le «bacche» sono in realtà galbuli e impiegano due anni a maturare.",
    parti: ["Galbuli (bacche)"],
    habitat: "Terreni aridi, pascoli, brughiere e boschi aperti, dal piano alla montagna.",
    raccolta: { mesi: [9, 10, 11], nota: "Si raccolgono i galbuli maturi, blu-neri, battendo delicatamente i rami; essiccare all'ombra." },
    proprieta: ["Carminativa", "Digestiva", "Diuretica", "Antimicrobica lieve", "Aromatizzante"],
    usi: [
      "Dispepsia, gonfiore e meteorismo",
      "Perdita temporanea di appetito",
      "Disturbi urinari minori, come coadiuvante",
      "Aromatizzazione di gin, carni e conserve",
      "Tradizione popolare per i reumatismi"
    ],
    preparazioni: [
      { nome: "Infuso di galbuli", ricetta: "3–5 galbuli schiacciati in 200 ml di acqua a 90 °C per 10 minuti.", dose: "Una tazza dopo i pasti, per brevi periodi." },
      { nome: "Decotto per ambiente", ricetta: "Galbuli in acqua bollente per profumare la casa; non è una fumigazione terapeutica.", dose: "Uso ambientale, non inalatorio intenso." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare: possibile effetto uterino e dati insufficienti. Non usare oli essenziali.",
      allattamento: "Dati insufficienti: evitare preparazioni medicinali.",
      bambini: "Non usare come diuretico sotto i 12 anni; le bacche come spezia solo in piccole quantità.",
      controindicazioni: ["Malattie renali gravi", "Infezioni urinarie acute", "Calcoli renali", "Allergia alle Cupressaceae", "Uso prolungato ad alte dosi"],
      interazioni: ["Diuretici: effetto additivo", "Antidiabetici: possibile ipoglicemia", "Farmaci per la pressione: possibile potenziamento"],
      nota: "L'uso prolungato o ad alte dosi può irritare i reni. Il ginepro non cura le infezioni urinarie e non va usato con dolore al fianco o febbre. L'olio essenziale è concentrato e non va ingerito senza indicazione professionale."
    },
    sosia: [
      { nome: "Ginepro nano e altre conifere", rischio: "Alcune conifere hanno galbuli simili ma non commestibili. Raccogliere solo J. communis con aghi e portamento tipici." }
    ],
    fito: { commestibile: true, parti: "Galbuli", stagione: "Autunno", cucina: "Spezia per carni, crauti, gin e conserve; 2–3 bacche bastano per insaporire.", nota: "Le bacche sono aromatiche e amare: non mangiarle in grandi quantità. Il gin non è un rimedio." },
    evidenza: "L'effetto digestivo e carminativo è tradizionale; gli studi clinici sono scarsi. L'effetto diuretico è plausibile ma va bilanciato con il rischio renale.",
    curiosita: "Il gin prende il nome dal ginepro: le bacche sono l'aroma principale della bevanda. In Europa è usato da secoli anche per affumicare e conservare.",
    fonti: [
      { t: "EMA · Juniperi galbulus", u: "https://www.ema.europa.eu/en/medicines/herbal/juniperi-galbulus-pseudo-fructus" },
      { t: "PubMed · Juniperus communis", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Juniperus+communis" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "ginseng",
    nome: "Ginseng",
    latino: "Panax ginseng",
    famiglia: "Araliaceae",
    nomi: ["Ginseng coreano", "Ginseng asiatico", "Panax"],
    tono: 3,
    categorie: ["Officinale"],
    sintesi: "La radice a forma di uomo: tonico tradizionale, utile forse per la stanchezza, non per tutto.",
    descrizione: "Pianta erbacea perenne con radice carnosa, ramificata, spesso somigliante a una figura umana. Cresce nelle foreste montane fresche dell'Asia orientale e viene coltivata per anni prima della raccolta. Il sapore è amaro e leggermente dolce. È una delle piante più studiate, ma anche una delle più sopravvalutate.",
    parti: ["Radice"],
    habitat: "Foreste montane fresche e ombrose dell'Asia nord-orientale; coltivato.",
    raccolta: { mesi: [9, 10], nota: "Le radici si raccolgono dopo 4–6 anni di crescita; si essiccano o si trasformano in estratto." },
    proprieta: ["Tonico-adattogeno", "Stimolante lieve", "Antiossidante", "Immunomodulante discusso", "Ipoglicemizzante lieve"],
    usi: [
      "Astenia e stanchezza temporanea",
      "Recupero dopo periodi di stress",
      "Supporto alla concentrazione, con evidenza modesta",
      "Tradizione per la funzione sessuale maschile",
      "Supporto immunitario, con prove contrastanti"
    ],
    preparazioni: [
      { nome: "Infuso di radice", ricetta: "1–2 g di radice essiccata in 200 ml di acqua a 90 °C per 10–15 minuti.", dose: "Una tazza al mattino, per 2–4 settimane." },
      { nome: "Estratto standardizzato", ricetta: "Prodotti con ginsenosidi dichiarati, secondo il foglietto.", dose: "Solo per brevi cicli; evitare la sera per non disturbare il sonno." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Sconsigliato da EMA: dati insufficienti e possibile rischio. Evitare.",
      allattamento: "Sconsigliato: non ci sono dati sufficienti.",
      bambini: "Non usare sotto i 18 anni senza indicazione medica.",
      controindicazioni: ["Ipertensione non controllata", "Disturbi d'ansia e insonnia", "Malattie cardiache", "Ipertiroidismo", "Uso di stimolanti"],
      interazioni: ["Warfarin: possibile riduzione dell'effetto anticoagulante", "Antidiabetici: ipoglicemia", "Antidepressivi e IMAO: cautela", "Statine: possibile interazione", "Farmaci per la pressione: effetto variabile"],
      nota: "Il ginseng può causare insonnia, nervosismo, mal di testa e aumento della pressione. Non è un energizzante sicuro per tutti e non sostituisce il riposo. Interrompere se compaiono palpitazioni o agitazione."
    },
    sosia: [
      { nome: "Eleuterococco e ginseng americano", rischio: "Sono specie diverse con effetti simili ma non identici: leggere l'etichetta botanica." }
    ],
    fito: { commestibile: false, parti: "Radice (integratore)", stagione: "—", cucina: "Non è un alimento comune; si usa in estratti e tisane.", nota: "Le caramelle al ginseng contengono spesso dosi minime e molto zucchero." },
    evidenza: "Gli studi sulla stanchezza sono eterogenei: qualche beneficio soggettivo, ma risultati incoerenti. Per memoria, immunità e longevità le prove sono insufficienti.",
    curiosita: "Il nome Panax deriva dal greco panakeia, «rimedio per tutto», un nome ambizioso che la ricerca non ha confermato. La forma antropomorfa della radice alimenta la tradizione.",
    fonti: [
      { t: "EMA · Ginseng radix", u: "https://www.ema.europa.eu/en/medicines/herbal/ginseng-radix" },
      { t: "NCCIH · Asian ginseng", u: "https://www.nccih.nih.gov/health/asian-ginseng" },
      { t: "PubMed · Panax ginseng", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Panax+ginseng+fatigue" }
    ]
  },

  {
    id: "gramigna",
    nome: "Gramigna",
    latino: "Elymus repens",
    famiglia: "Poaceae",
    nomi: ["Agropyron repens", "Erba canina", "Couch grass"],
    tono: 2,
    categorie: ["Officinale"],
    sintesi: "Il rizoma infestante dei campi, usato dalla tradizione per favorire la diuresi.",
    descrizione: "Graminacea perenne con lunghi rizomi biancastri e striscianti, fusti eretti e spighe sottili. È considerata un'infestante difficile da eliminare negli orti. Il rizoma, dolce e mucillaginoso, è la parte usata: contiene carboidrati, sali di silice e un olio essenziale in tracce.",
    parti: ["Rizoma"],
    habitat: "Campi, orti, incolti e bordi strada, dal piano alla collina.",
    raccolta: { mesi: [3, 4, 9, 10, 11], nota: "Si estraggono i rizomi in primavera o autunno, si lavano bene e si essiccano." },
    proprieta: ["Diuretica", "Emolliente", "Antinfiammatoria lieve", "Depurativa tradizionale"],
    usi: [
      "Disturbi urinari minori, come coadiuvante del lavaggio delle vie urinarie",
      "Ritenzione idrica lieve",
      "Tradizione per cistiti ricorrenti, senza sostituire la cura",
      "Irritazioni delle vie urinarie, come conforto",
      "Supporto alla diuresi nei periodi caldi"
    ],
    preparazioni: [
      { nome: "Decotto di rizoma", ricetta: "2 g di rizoma essiccato e tagliato in 250 ml di acqua, bollire 10 minuti a fuoco basso.", dose: "Una tazza due volte al giorno, per brevi periodi." },
      { nome: "Infuso", ricetta: "1 g di rizoma in 200 ml di acqua a 90 °C per 10 minuti.", dose: "Una tazza dopo i pasti." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare le preparazioni medicinali: dati insufficienti.",
      allattamento: "Dati insufficienti: evitare.",
      bambini: "Non usare come diuretico sotto i 12 anni senza parere.",
      controindicazioni: ["Insufficienza cardiaca o renale con restrizione idrica", "Edemi da cause cardiache o renali", "Calcoli renali", "Allergia alle Poaceae"],
      interazioni: ["Diuretici: effetto additivo", "Digossina: rischio per squilibri di potassio", "Litio: possibile riduzione dell'eliminazione"],
      nota: "La gramigna non è un antibiotico e non cura da sola una cistite. Con bruciore, febbre o sangue nelle urine serve una visita. Raccogliere i rizomi solo in terreni non trattati."
    },
    sosia: [
      { nome: "Altre graminacee con rizomi", rischio: "Molte specie simili: la gramigna comune è la più usata, ma la raccolta richiede esperienza." }
    ],
    fito: { commestibile: false, parti: "Nessuna di uso comune", stagione: "—", cucina: "Non è una verdura: il rizoma si usa in decotto.", nota: "I rizomi vanno lavati molto bene: crescono nel terreno e possono trattenere sabbia e contaminanti." },
    evidenza: "L'effetto diuretico è tradizionale e plausibile per il contenuto di sali e mucillagini; mancano studi clinici solidi.",
    curiosita: "La gramigna è tra le piante infestanti più diffuse al mondo: un piccolo pezzo di rizoma può generare una nuova pianta. Il nome latino repens significa strisciante.",
    fonti: [
      { t: "ESCOP · Monografie", u: "https://www.escop.com/escop-products/publications/" },
      { t: "PubMed · Elymus repens", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Elymus+repens" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "issopo",
    nome: "Issopo",
    latino: "Hyssopus officinalis",
    famiglia: "Lamiaceae",
    nomi: ["Issopo officinale", "Erba di San Giovanni (improprio)"],
    tono: 2,
    categorie: ["Officinale", "Aromatica"],
    sintesi: "Aromatica alpina dal sapore amaro: utile alla gola, ma il suo olio essenziale è da maneggiare con guanti.",
    descrizione: "Piccolo arbusto sempreverde con fusti legnosi alla base, foglie lanceolate e fiori blu-viola riuniti in spighe. Il profumo è intenso, mentolato e canforaceo. Cresce su pendii aridi e muri, spesso coltivato negli orti. L'olio essenziale contiene pinocamfone, un composto neurotossico.",
    parti: ["Sommità fiorite", "Foglie"],
    habitat: "Pendii aridi, muri, terreni calcarei; coltivato negli orti.",
    raccolta: { mesi: [6, 7, 8], nota: "Si tagliano le sommità fiorite al mattino, prima del caldo; si essiccano all'ombra." },
    proprieta: ["Espettorante tradizionale", "Antispasmodica", "Digestiva", "Aromatizzante", "Antimicrobica lieve"],
    usi: [
      "Tosse e catarro, come supporto di conforto",
      "Gola irritata, in gargarismi",
      "Digestione difficile e gonfiore",
      "Aromatizzazione di liquori e piatti",
      "Tradizione popolare per le vie respiratorie"
    ],
    preparazioni: [
      { nome: "Infuso", ricetta: "1 g di sommità essiccate in 200 ml di acqua a 90 °C per 8 minuti.", dose: "Una tazza due volte al giorno, per brevi periodi." },
      { nome: "Gargarismo", ricetta: "Infuso più concentrato, raffreddato e filtrato.", dose: "Gargarismi due volte al giorno, senza ingerire." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Evitare: dati insufficienti e possibile effetto emmenagogo tradizionale. Mai olio essenziale.",
      allattamento: "Evitare: dati insufficienti.",
      bambini: "Non usare preparazioni medicinali sotto i 12 anni; mai olio essenziale.",
      controindicazioni: ["Epilessia", "Disturbi convulsivi", "Allergia alle Lamiaceae", "Uso interno di olio essenziale"],
      interazioni: ["Anticonvulsivanti: cautela", "Sedativi: effetto additivo", "Farmaci per la pressione: cautela teorica"],
      nota: "L'olio essenziale di issopo non va ingerito né applicato puro: il pinocamfone può causare convulsioni. La tisana con le sommità è la forma più prudente, ma non è un farmaco per l'asma."
    },
    sosia: [
      { nome: "Salvia, rosmarino e altre Lamiaceae", rischio: "Le aromatiche si somigliano; l'issopo ha fiori blu-viola in spighe e profumo canforaceo." }
    ],
    fito: { commestibile: true, parti: "Foglie, fiori", stagione: "Estate", cucina: "Spezia per carni, legumi e liquori; i fiori in insalata.", nota: "Il sapore è amaro e forte: usarne poco. Non usare olio essenziale in cucina." },
    evidenza: "L'effetto espettorante e digestivo è tradizionale; gli studi clinici sono scarsi. L'attenzione maggiore riguarda la tossicità dell'olio essenziale.",
    curiosita: "L'issopo era usato nella tradizione ebraica per la purificazione e compare in alcuni salmi. Il nome greco hyssopos è citato già da Dioscoride.",
    fonti: [
      { t: "PubMed · Hyssopus officinalis", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Hyssopus+officinalis" },
      { t: "EMA · Monografie erboristiche", u: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products/european-union-monographs-list-entries" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "lampone",
    nome: "Lampone (foglia)",
    latino: "Rubus idaeus",
    famiglia: "Rosaceae",
    nomi: ["Foglia di lampone", "Lampone rosso"],
    tono: 1,
    categorie: ["Officinale", "Alimentare"],
    sintesi: "Le foglie del cespuglio che dà i frutti: astringenti, tradizionali per i crampi mestruali.",
    descrizione: "Arbusto perenne con fusti spinosi biennali, foglie composte e frutti rossi aggregati. Le foglie sono la parte officinale, ricche di tannini e flavonoidi. Il frutto è un alimento, non un medicinale. Cresce in radure, margini di bosco e terreni acidi.",
    parti: ["Foglie", "Frutti (alimento)"],
    habitat: "Radure, margini di bosco, terreni acidi e freschi, dal piano alla montagna.",
    raccolta: { mesi: [5, 6, 7], nota: "Si raccolgono le foglie giovani prima della fruttificazione; i frutti in estate." },
    proprieta: ["Astringente", "Antispasmodica", "Antiossidante", "Leggermente diuretica", "Ricca di tannini"],
    usi: [
      "Crampi mestruali lievi",
      "Irritazioni di bocca e gola, in gargarismi",
      "Diarrea lieve, per tradizione",
      "Frutti come alimento ricco di fibre e vitamina C",
      "Tradizione popolare per preparare il parto, con evidenza debole e cautela"
    ],
    preparazioni: [
      { nome: "Infuso di foglie", ricetta: "1–2 g di foglie essiccate in 200 ml di acqua a 90 °C per 8 minuti.", dose: "Una tazza due volte al giorno, per brevi periodi." },
      { nome: "Gargarismo", ricetta: "Infuso filtrato e tiepido, con un pizzico di sale.", dose: "Due o tre volte al giorno." }
    ],
    sicurezza: {
      livello: "giallo",
      gravidanza: "Non usare per «preparare il parto»: l'evidenza è debole e la sicurezza non è stabilita. In gravidanza chiedere sempre al ginecologo.",
      allattamento: "Dati insufficienti: evitare gli estratti concentrati.",
      bambini: "L'infuso occasionale è usato dalla tradizione; sotto i 12 anni chiedere al pediatra.",
      controindicazioni: ["Allergia alle Rosaceae", "Stitichezza cronica (per l'astringenza)", "Calcoli renali (ossalati)", "Gravidanza senza parere"],
      interazioni: ["Farmaci orali: i tannini possono ridurre l'assorbimento; distanziare", "Anticoagulanti: cautela teorica"],
      nota: "Le foglie di lampone non sono un sostituto dell'ossitocina né della assistenza al parto. I frutti sono sicuri come alimento; le foglie in dosi medicinali vanno usate con parere."
    },
    sosia: [
      { nome: "Rovo comune e more", rischio: "Le foglie di Rubus si somigliano; i frutti aiutano il riconoscimento in estate." }
    ],
    fito: { commestibile: true, parti: "Frutti, foglie giovani", stagione: "Estate", cucina: "Frutti freschi, confetture, sciroppi; foglie in tisane e infusi.", nota: "Le foglie si usano essiccate; i frutti vanno lavati e consumati freschi o cotti." },
    evidenza: "Per i crampi mestruali e le irritazioni della bocca esistono studi piccoli e tradizione consolidata. Per l'induzione del parto le prove sono insufficienti e non va usato a questo scopo.",
    curiosita: "Il lampone è un frutto composto: ogni piccola sfera è un frutto detto drupeto. Le foglie erano usate dalle levatrici, ma la tradizione non è una prova di efficacia.",
    fonti: [
      { t: "EMA · Rubi idaei folium", u: "https://www.ema.europa.eu/en/medicines/herbal/rubi-idaei-folium" },
      { t: "PubMed · Raspberry leaf", u: "https://pubmed.ncbi.nlm.nih.gov/?term=raspberry+leaf+pregnancy" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  },

  {
    id: "mirtillo-nero",
    nome: "Mirtillo nero",
    latino: "Vaccinium myrtillus",
    famiglia: "Ericaceae",
    nomi: ["Mirtillo", "Bilberry", "Mirtillo selvatico"],
    tono: 5,
    categorie: ["Officinale", "Alimentare"],
    sintesi: "Piccole bacche blu dei boschi: antociani per la vista e tannini per l'intestino.",
    descrizione: "Piccolo arbusto a foglie caduche, con bacche sferiche blu-nerastre e polpa viola. Cresce nei boschi acidi e nelle brughiere di montagna. I frutti sono ricchi di antociani; le foglie hanno composizione e usi diversi e non vanno confuse con il frutto essiccato.",
    parti: ["Frutti maturi", "Foglie (uso diverso)"],
    habitat: "Boschi di conifere, brughiere e terreni acidi, in montagna.",
    raccolta: { mesi: [7, 8, 9], nota: "Si raccolgono i frutti maturi a mano; le foglie in estate, ma non sono equivalenti al frutto." },
    proprieta: ["Antiossidante", "Vasoprotettiva", "Astringente", "Antinfiammatoria", "Ricca di antociani"],
    usi: [
      "Diarrea lieve, con frutti essiccati",
      "Risciacqui per lievi infiammazioni della bocca",
      "Affaticamento visivo e microcircolazione, con evidenza modesta",
      "Alimento ricco di fibre e antociani",
      "Tradizione per la glicemia, senza prove solide"
    ],
    preparazioni: [
      { nome: "Decotto di frutti essiccati", ricetta: "1–2 g di frutti essiccati in 200 ml di acqua, bollire 10 minuti e filtrare.", dose: "Due o tre tazze al giorno per brevi periodi." },
      { nome: "Frutta fresca", ricetta: "Frutti lavati, da consumare freschi o in confettura senza zucchero eccessivo.", dose: "Una porzione al giorno, come alimento." }
    ],
    sicurezza: {
      livello: "verde",
      gravidanza: "I frutti come alimento sono sicuri. Evitare estratti concentrati e foglie: dati insufficienti.",
      allattamento: "Frutto come alimento compatibile; evitare integratori concentrati.",
      bambini: "Frutto come alimento. Non usare estratti o foglie senza parere.",
      controindicazioni: ["Allergia alle Ericaceae", "Calcoli renali (ossalati)", "Stitichezza cronica (per l'astringenza)"],
      interazioni: ["Anticoagulanti: cautela teorica con alte dosi", "Farmaci per la glicemia: possibile potenziamento", "Ferro: i tannini possono ridurre l'assorbimento"],
      nota: "Le indicazioni EMA riguardano il frutto essiccato, non le foglie. La diarrea con febbre, sangue o disidratazione richiede una visita, soprattutto nei bambini."
    },
    sosia: [
      { nome: "Mirtillo rosso e altre bacche", rischio: "Le bacche blu si somigliano; alcune specie sono tossiche. Raccogliere solo Vaccinium myrtillus con polpa viola." }
    ],
    fito: { commestibile: true, parti: "Frutti", stagione: "Estate", cucina: "Freschi, in confetture, sciroppi, dolci e salse per carni.", nota: "Le bacche macchiano mani e tessuti. Lavarle bene; non consumare grandi quantità di foglie." },
    evidenza: "Per la diarrea lieve l'effetto astringente è tradizionale. Per la vista e la microcircolazione gli studi sono piccoli e con risultati modesti; non cura la retinopatia diabetica.",
    curiosita: "Il mirtillo nero è diverso dal mirtillo rosso americano (cranberry), spesso usato per le vie urinarie. La polpa viola è un buon carattere distintivo.",
    fonti: [
      { t: "EMA · Myrtilli fructus siccus", u: "https://www.ema.europa.eu/en/medicines/herbal/myrtilli-fructus-siccus" },
      { t: "PubMed · Vaccinium myrtillus", u: "https://pubmed.ncbi.nlm.nih.gov/?term=Vaccinium+myrtillus" },
      { t: "NCCIH · Erbe e interazioni", u: "https://www.nccih.nih.gov/health/providers/digest/herb-drug-interactions-science" }
    ]
  }

]);
