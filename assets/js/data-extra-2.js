/* ==========================================================================
   Naturopata Digitale · Piante tossiche, allarme e interazioni
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.toxic = [

  {
    nome: "Cicuta maggiore",
    latino: "Conium maculatum",
    famiglia: "Apiaceae",
    pericolo: "Mortale",
    caratteri: "Fusto alto con macchie rosso-violacee, foglie finemente divise, ombrelle di fiorellini bianchi, odore sgradevole di topo. Cresce in incolti e bordi strada.",
    sintomi: "Nausea, vomito, salivazione, dolore addominale, poi debolezza muscolare ascendente e paralisi respiratoria.",
    soccorso: "Chiamare subito il 112/118 o un Centro Antiveleni. Non indurre il vomito. Conservare un campione della pianta per l'identificazione.",
    sosia: "Finocchio selvatico, prezzemolo, carota selvatica e altre ombrellifere commestibili."
  },

  {
    nome: "Colchico autunnale",
    latino: "Colchicum autumnale",
    famiglia: "Colchicaceae",
    pericolo: "Mortale",
    caratteri: "In primavera produce foglie larghe e carnose simili a quelle dell'aglio orsino; in autunno fiori viola-lilla che spuntano dal terreno. Tutte le parti sono tossiche.",
    sintomi: "Nausea, vomito, diarrea profusa, disidratazione, insufficienza multiorgano. I sintomi possono ritardare di ore.",
    soccorso: "Emergenza medica immediata. Non indurre il vomito. Portare la pianta o i resti al pronto soccorso.",
    sosia: "Aglio orsino (Allium ursinum), che però profuma nettamente di aglio."
  },

  {
    nome: "Mughetto",
    latino: "Convallaria majalis",
    famiglia: "Asparagaceae",
    pericolo: "Mortale",
    caratteri: "Foglie lanceolate larghe, fiori bianchi a campanella profumati, bacche rosse in autunno. Cresce in boschi e giardini ombrosi.",
    sintomi: "Nausea, vomito, dolore addominale, bradicardia, aritmie, confusione. Contiene glicosidi cardiaci.",
    soccorso: "Chiamare il 112/118. Non indurre il vomito. Serve monitoraggio cardiaco.",
    sosia: "Aglio orsino: il mughetto non ha odore di aglio."
  },

  {
    nome: "Belladonna",
    latino: "Atropa belladonna",
    famiglia: "Solanaceae",
    pericolo: "Molto tossica",
    caratteri: "Arbusto con foglie ovali, fiori viola-marroni a campana e bacche nere lucide, dolciastre. Cresce in boschi e radure.",
    sintomi: "Secchezza delle mucose, pupille dilatate, visione offuscata, tachicardia, agitazione, allucinazioni, convulsioni, coma.",
    soccorso: "Emergenza medica. Non indurre il vomito. Tenere la persona al sicuro e chiamare il 112/118.",
    sosia: "Mirtilli e altre bacche scure commestibili. Mai raccogliere bacche selvatiche senza certezza."
  },

  {
    nome: "Stramonio",
    latino: "Datura stramonium",
    famiglia: "Solanaceae",
    pericolo: "Molto tossica",
    caratteri: "Pianta annuale con fiori a tromba bianchi o violacei e capsule spinose. Cresce in incolti, campi e bordi strada.",
    sintomi: "Agitazione, confusione, allucinazioni, midriasi, tachicardia, convulsioni, ipertermia.",
    soccorso: "Emergenza medica. Non indurre il vomito. Evitare stimoli eccessivi.",
    sosia: "Altre solanacee ornamentali; i fiori a tromba sono caratteristici."
  },

  {
    nome: "Digitale purpurea",
    latino: "Digitalis purpurea",
    famiglia: "Plantaginaceae",
    pericolo: "Mortale",
    caratteri: "Foglie rugose e pelose in rosetta, fiori a forma di dito, rosa-porpora macchiati all'interno. Cresce in boschi acidi e radure.",
    sintomi: "Nausea, vomito, diarrea, visione con aloni gialli o verdi, bradicardia, aritmie, arresto cardiaco.",
    soccorso: "Emergenza medica immediata. Non indurre il vomito. Monitoraggio cardiaco necessario.",
    sosia: "Borragine e consolida (foglie), ma i fiori sono completamente diversi."
  },

  {
    nome: "Aconito",
    latino: "Aconitum napellus",
    famiglia: "Ranunculaceae",
    pericolo: "Mortale",
    caratteri: "Fiori blu-viola a casco, foglie profondamente divise, radice a fittone. Cresce in montagna e in giardini alpini. Anche il contatto cutaneo può essere pericoloso.",
    sintomi: "Formicolio a bocca e arti, nausea, vomito, dolore toracico, aritmie, paralisi, morte rapida.",
    soccorso: "Emergenza medica immediata. Non toccare la pianta a mani nude. Non indurre il vomito.",
    sosia: "Altre piante montane a fiori blu; l'aconito è tra le piante più tossiche d'Europa."
  },

  {
    nome: "Oleandro",
    latino: "Nerium oleander",
    famiglia: "Apocynaceae",
    pericolo: "Mortale",
    caratteri: "Arbusto ornamentale sempreverde con foglie lanceolate simili a quelle dell'olivo e fiori rosa, bianchi o rossi. Tutte le parti sono tossiche, anche il fumo della combustione.",
    sintomi: "Nausea, vomito, dolore addominale, bradicardia, aritmie, iperkaliemia, arresto cardiaco.",
    soccorso: "Emergenza medica. Non indurre il vomito. Non bruciare la pianta.",
    sosia: "Olivo e alloro, per la forma delle foglie."
  },

  {
    nome: "Ricino",
    latino: "Ricinus communis",
    famiglia: "Euphorbiaceae",
    pericolo: "Mortale",
    caratteri: "Pianta ornamentale con foglie palmate e capsule spinose contenenti semi marmorizzati. La ricina è una delle tossine vegetali più potenti.",
    sintomi: "Nausea, vomito, diarrea emorragica, disidratazione, insufficienza epatica e renale. Pochi semi masticati possono essere fatali.",
    soccorso: "Emergenza medica immediata. Non indurre il vomito. Non toccare occhi e mucose.",
    sosia: "Semi di altre euforbiacee e ornamentali; evitare i semi in giardino con bambini e animali."
  },

  {
    nome: "Tasso",
    latino: "Taxus baccata",
    famiglia: "Taxaceae",
    pericolo: "Mortale",
    caratteri: "Albero o arbusto sempreverde con aghi scuri e arilli rossi carnosi in autunno. Tutte le parti sono tossiche tranne l'arillo, ma il seme interno è velenoso.",
    sintomi: "Nausea, vomito, dolore addominale, aritmie, bradicardia, collasso. Può essere fatale anche in piccole quantità.",
    soccorso: "Emergenza medica immediata. Non indurre il vomito. Non mangiare gli arilli.",
    sosia: "Altri sempreverdi ornamentali; i bambini possono essere attratti dagli arilli rossi."
  }

];

NP.redFlags = [
  { sintomo: "Dolore o oppressione al petto", azione: "Chiama il 112/118. Non aspettare, non guidare da solo.", livello: "emergenza" },
  { sintomo: "Difficoltà a respirare o labbra bluastre", azione: "Chiama il 112/118. Siediti, non fare sforzi.", livello: "emergenza" },
  { sintomo: "Perdita di coscienza, convulsioni o debolezza a un lato del corpo", azione: "Chiama il 112/118. Annota l'ora di inizio dei sintomi.", livello: "emergenza" },
  { sintomo: "Sanguinamento abbondante, vomito con sangue o feci nere", azione: "Chiama il 112/118 o vai al pronto soccorso.", livello: "emergenza" },
  { sintomo: "Gonfiore di gola, orticaria diffusa o difficoltà a respirare dopo un contatto", azione: "Reazione allergica grave: chiama il 112/118.", livello: "emergenza" },
  { sintomo: "Ingestione sospetta di una pianta o di un fungo", azione: "Chiama un Centro Antiveleni o il 112/118. Non indurre il vomito.", livello: "emergenza" },
  { sintomo: "Pensieri di farsi del male o di non voler più vivere", azione: "Cerca aiuto immediato: 112/118 o un servizio di ascolto. Non restare solo.", livello: "emergenza" },
  { sintomo: "In gravidanza: sanguinamento, dolore intenso o riduzione dei movimenti fetali", azione: "Contatta subito il pronto soccorso o il ginecologo.", livello: "urgente" },
  { sintomo: "Febbre alta persistente o febbre con confusione e rigidità del collo", azione: "Valutazione medica urgente.", livello: "urgente" },
  { sintomo: "Perdita di peso involontaria o stanchezza che non migliora", azione: "Prenota una visita medica senza rimandare.", livello: "visita" },
  { sintomo: "Sangue nelle feci o cambiamento persistente dell'alvo", azione: "Valutazione medica, soprattutto dopo i 45 anni.", livello: "visita" },
  { sintomo: "Insonnia o ansia che durano settimane e limitano la vita", azione: "Parla con il medico o con uno psicologo.", livello: "visita" }
];

NP.interactions = [
  { pianta: "Iperico", farmaci: "Contraccettivi orali, warfarin, ciclosporina, tacrolimus, antiretrovirali, alcuni chemioterapici, anticonvulsivanti, SSRI, digossina", effetto: "Induzione enzimatica e riduzione dell'efficacia; rischio di sindrome serotoninergica con antidepressivi", livello: "alto" },
  { pianta: "Liquirizia", farmaci: "Digossina, diuretici, corticosteroidi, antipertensivi", effetto: "Ipokaliemia, ritenzione di sodio, ipertensione, tossicità da digossina", livello: "alto" },
  { pianta: "Ginkgo", farmaci: "Anticoagulanti e antiaggreganti", effetto: "Aumento del rischio emorragico", livello: "alto" },
  { pianta: "Aglio e aglio orsino", farmaci: "Anticoagulanti, antiaggreganti, antidiabetici", effetto: "Rischio emorragico e ipoglicemia; sospendere prima di un intervento", livello: "medio" },
  { pianta: "Curcuma", farmaci: "Anticoagulanti, chemioterapici, inibitori di pompa", effetto: "Rischio emorragico e possibile interferenza metabolica", livello: "medio" },
  { pianta: "Zenzero", farmaci: "Anticoagulanti", effetto: "Aumento del rischio emorragico ad alte dosi", livello: "medio" },
  { pianta: "Valeriana e passiflora", farmaci: "Benzodiazepine, sedativi, alcol, antistaminici", effetto: "Sonnolenza additiva, riduzione della vigilanza", livello: "medio" },
  { pianta: "Menta piperita", farmaci: "Antiacidi, inibitori di pompa, farmaci a stretto indice terapeutico", effetto: "Possibile riduzione dell'efficacia e alterazione dell'assorbimento", livello: "basso" },
  { pianta: "Malva, altea, piantaggine", farmaci: "Qualsiasi farmaco orale", effetto: "Riduzione dell'assorbimento per effetto delle mucillagini; distanziare 2 ore", livello: "basso" },
  { pianta: "Echinacea", farmaci: "Immunosoppressori, corticosteroidi", effetto: "Possibile riduzione dell'effetto immunosoppressivo; cautela nelle malattie autoimmuni", livello: "medio" },
  { pianta: "Biancospino", farmaci: "Digossina, antipertensivi, nitrati", effetto: "Effetti additivi su cuore e pressione", livello: "medio" },
  { pianta: "Olivo (foglie)", farmaci: "Antipertensivi, antidiabetici, diuretici", effetto: "Possibile sommazione ipotensiva e ipoglicemizzante", livello: "medio" },
  { pianta: "Aloe (lattice)", farmaci: "Digossina, diuretici, corticosteroidi", effetto: "Ipokaliemia e disidratazione; non usare a lungo", livello: "alto" },
  { pianta: "Borragine", farmaci: "Farmaci epatotossici", effetto: "Sovraccarico epatico per gli alcaloidi pirrolizidinici", livello: "alto" }
];

NP.sources = [
  { titolo: "EMA — European Medicines Agency, Herbal medicines", url: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products", nota: "Monografie europee sulle piante medicinali, usi tradizionali e avvertenze." },
  { titolo: "WHO — Traditional, Complementary and Integrative Medicine", url: "https://www.who.int/health-topics/traditional-complementary-and-integrative-medicine", nota: "Documenti internazionali e monografie." },
  { titolo: "Cochrane Library", url: "https://www.cochranelibrary.com/", nota: "Revisioni sistematiche indipendenti su efficacia e sicurezza." },
  { titolo: "NIH — Office of Dietary Supplements", url: "https://ods.od.nih.gov/", nota: "Schede informative basate sull'evidenza." },
  { titolo: "NIH — NCCIH, Herbs at a Glance", url: "https://www.nccih.nih.gov/health/herbsataglance", nota: "Sintesi divulgative su singole piante." },
  { titolo: "EFSA — European Food Safety Authority", url: "https://www.efsa.europa.eu/", nota: "Valutazioni su sicurezza, contaminanti e sostanze botaniche." },
  { titolo: "Ministero della Salute — Integratori alimentari", url: "https://www.salute.gov.it/portale/integratoriAlimentari/homeIntegratoriAlimentari.jsp", nota: "Normativa e registro degli integratori in Italia." },
  { titolo: "Epicentro ISS", url: "https://www.epicentro.iss.it/", nota: "Dati e guide di salute pubblica." },
  { titolo: "ISS — Centri Antiveleni (CAV)", url: "https://www.iss.it/-/cnsc-cav", nota: "Numeri utili in caso di ingestione sospetta." },
  { titolo: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/", nota: "Banca dati della letteratura biomedica." }
];
