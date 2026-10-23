/* ==========================================================================
   Naturopata Digitale · Manuale interattivo, capitoli 1–4
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.manualParts = [
  { id: "fondamenti", titolo: "Parte I · Fondamenti", descrizione: "Che cosa è la naturopatia, da dove viene, come si misura e con quali limiti." },
  { id: "piante", titolo: "Parte II · Il linguaggio delle piante", descrizione: "Principi attivi, forme d'uso, raccolta, sicurezza e qualità." },
  { id: "raccolto", titolo: "Parte III · Fitoalimurgia", descrizione: "Raccogliere e cucinare le piante selvatiche senza rischi." },
  { id: "pratica", titolo: "Parte IV · Olistica pratica", descrizione: "Sonno, stress, digestione, pelle, aromaterapia e nutrizione." },
  { id: "consapevolezza", titolo: "Parte V · Consapevolezza", descrizione: "Quando rivolgersi al medico, sostenibilità e strumenti." }
];

NP.manual = [

  {
    id: "cos-e-la-naturopatia",
    n: 1,
    parte: "fondamenti",
    titolo: "Cos'è la naturopatia",
    occhiello: "Una disciplina del benessere, non una medicina alternativa.",
    tempo: "7 min",
    tags: ["Fondamenti", "Olismo", "Ruolo"],
    html: `
      <p>La naturopatia è un insieme di pratiche di sostegno al benessere che si richiama a un principio semplice: la persona non è un elenco di sintomi, ma un sistema vivente inserito in un ambiente, in una storia e in una rete di relazioni. Nasce nell'Ottocento come movimento di riforma dello stile di vita e oggi si presenta, nelle versioni più serie, come una disciplina <strong>complementare</strong> e non sostitutiva della medicina.</p>

      <h3>I principi che la orientano</h3>
      <p>Le scuole di naturopatia formulano principi diversi, ma alcuni ricorrono:</p>
      <ul>
        <li><strong>Centralità della persona:</strong> si parte da come vive, mangia, dorme, si muove e sta nelle relazioni, non solo dalla diagnosi.</li>
        <li><strong>Autoregolazione:</strong> il corpo possiede meccanismi di equilibrio; il compito è rimuovere gli ostacoli e sostenere le risorse, non «forzare» il sistema.</li>
        <li><strong>Prevenzione:</strong> agire sui fattori di rischio e sui ritmi quotidiani prima che compaia il problema.</li>
        <li><strong>Educazione:</strong> spiegare, rendere consapevoli, costruire autonomia. Un buon percorso non crea dipendenza.</li>
        <li><strong>Natura come contesto:</strong> luce, movimento, cibo, piante e contatto con l'ambiente sono parte della cura.</li>
      </ul>

      <div class="keybox">
        <h3>La parola chiave</h3>
        <p><strong>Complementare</strong> significa «insieme a», non «al posto di». La naturopatia non diagnostica malattie, non prescrive farmaci, non interpreta esami e non invita a sospendere terapie. Chi lo fa esce dal proprio perimetro e mette a rischio la salute.</p>
      </div>

      <h3>Che cosa non è</h3>
      <p>Non è una medicina alternativa con una propria nosologia. Non è un metodo per «depurare il sangue», «alzare le difese immunitarie» o «sciogliere le tossine»: sono espressioni evocative, non diagnosi. Non è nemmeno un insieme di rimedi universali validi per tutti: la stessa pianta può essere utile a una persona e inadatta a un'altra, per interazioni, gravidanza, età o patologie.</p>

      <h3>Il modello biopsicosociale</h3>
      <p>La medicina moderna ha adottato da decenni un modello biopsicosociale: biologia, psiche e contesto sociale si influenzano. La naturopatia insiste su questo punto, ma deve fare i conti con la complessità: «olistico» non significa che ogni sintomo abbia una causa emotiva, né che una pratica funzioni perché «tratta la persona intera». L'olismo è un atteggiamento clinico, non una prova di efficacia.</p>

      <h3>Un esempio concreto</h3>
      <p>Una persona con insonnia cronica non ha bisogno soltanto di una tisana. Ha bisogno di valutare luce, caffeina, orari, stress, respirazione, eventuali apnee e depressione. La camomilla può accompagnare la sera, ma non sostituisce la valutazione medica se il disturbo dura da mesi. Questo è il senso di un approccio integrato: <em>il rimedio giusto al posto giusto, dentro una visione più ampia</em>.</p>

      <p>Nei prossimi capitoli vedremo da dove viene questa tradizione, che cosa dice la ricerca, come si usano le piante in modo competente e dove finisce il territorio del fai-da-te.</p>
    `
  },

  {
    id: "storia-e-figure",
    n: 2,
    parte: "fondamenti",
    titolo: "Un sapere antico, una pratica moderna",
    occhiello: "Dalle erbe di Dioscoride alle associazioni professionali di oggi.",
    tempo: "8 min",
    tags: ["Storia", "Professione", "Italia"],
    html: `
      <p>L'uso delle piante per il benessere accompagna la storia umana. Le prime raccolte scritte di rimedi vegetali risalgono a migliaia di anni fa; in Europa, la <em>Materia medica</em> di Dioscoride (I secolo d.C.) è rimasta un riferimento per secoli. Nei monasteri medievali si coltivavano orti medicinali e si copiavano ricette; la Scuola medica salernitana fuse sapere greco, arabo e latino; tra Settecento e Ottocento, la fitoterapia scientifica cominciò a isolare principi attivi e a studiarne gli effetti.</p>

      <h3>La nascita del movimento naturopatico</h3>
      <p>La parola «naturopathy» compare alla fine dell'Ottocento negli Stati Uniti, in un clima di riforma igienista. Figure come Benedict Lust e, in Europa, Sebastian Kneipp — noto per l'idroterapia — contribuirono a costruire un insieme di pratiche basate su acqua, aria, luce, movimento, alimentazione e riposo. Nel Novecento il movimento si è diversificato, avvicinandosi talvolta a posizioni antiscientifiche e talvolta a un approccio più rigoroso e integrato.</p>

      <h3>La situazione italiana</h3>
      <p>In Italia la naturopatia <strong>non è una professione sanitaria</strong> e non esiste un albo statale. La legge 14 gennaio 2013, n. 4 disciplina le professioni non organizzate in ordini o collegi e richiede il rispetto di requisiti deontologici e di competenza; esistono associazioni di categoria e una norma tecnica volontaria (UNI 11491:2013) che definisce conoscenze e abilità del naturopata. Questo non equivale a un riconoscimento sanitario: il naturopata non può fare diagnosi, prescrivere farmaci o sostituirsi al medico.</p>

      <div class="keybox">
        <h3>Chi fa cosa</h3>
        <p><strong>Medico</strong>: diagnosi, terapie, prescrizioni. <strong>Farmacista</strong>: farmaci, interazioni, consiglio. <strong>Dietista</strong>: valutazione e terapia nutrizionale. <strong>Fisioterapista</strong>: riabilitazione. <strong>Erborista</strong>: preparazioni e consiglio su piante, nei limiti di legge. <strong>Naturopata</strong>: educazione allo stile di vita e sostegno al benessere, senza atti sanitari.</p>
      </div>

      <h3>Perché la storia conta</h3>
      <p>Conoscere la storia aiuta a distinguere tre cose che spesso si confondono: la <strong>tradizione</strong> (ciò che è stato tramandato), la <strong>sperimentazione</strong> (ciò che è stato verificato) e il <strong>marketing</strong> (ciò che viene venduto come antico e quindi vero). Una pianta usata per secoli ha una plausibilità da esplorare, non una patente automatica di efficacia.</p>

      <p>La storia insegna anche umiltà: molte pratiche del passato sono state abbandonate perché dannose, altre sono state recuperate perché utili. Il criterio non è l'anzianità, ma la qualità delle prove e la sicurezza per la persona.</p>

      <h3>Una tradizione che cambia</h3>
      <p>La naturopatia contemporanea più credibile parla di <em>stili di vita</em>, non di «cure naturali». Integra sonno, alimentazione, movimento, gestione dello stress e contatto con la natura; collabora con la medicina quando serve e riconosce i propri limiti. È questa la versione che questo programma prova a raccontare.</p>
    `
  },

  {
    id: "scienza-ed-evidenza",
    n: 3,
    parte: "fondamenti",
    titolo: "Cosa dice la scienza",
    occhiello: "Tradizione, prove e buon senso: come leggere un'affermazione sul benessere.",
    tempo: "9 min",
    tags: ["Evidenza", "Metodo", "Placebo"],
    html: `
      <p>«Funziona» è una frase che merita una domanda: <em>per chi, per quale problema, con quale preparazione, rispetto a cosa e con quale prova?</em> La scienza non è un tribunale che dice sì o no alle piante; è un metodo per ridurre gli errori. Anche le piante, come i farmaci, possono avere effetti reali, effetti nulli ed effetti dannosi.</p>

      <h3>La piramide delle prove</h3>
      <p>Al vertice stanno le revisioni sistematiche e le meta-analisi di studi clinici controllati; poi gli studi clinici randomizzati; più in basso gli studi osservazionali, gli studi su animali e le osservazioni di laboratorio. La tradizione e il racconto di un singolo caso sono punti di partenza, non prove di efficacia. Un rimedio usato per secoli può essere utile, ma può anche essere solo un rito che funzionava per altre ragioni.</p>

      <h3>Perché gli studi si contraddicono</h3>
      <p>Le piante sono variabili: specie, chemiotipo, parte usata, stagione di raccolta, metodo di estrazione, dose. Due studi «sulla camomilla» possono aver usato prodotti diversissimi. A questo si aggiungono campioni piccoli, conflitti di interesse, esiti misurati male e pubblicazione selettiva dei risultati positivi. Per questo le revisioni sistematiche pesano i lavori e cercano di correggere il rumore.</p>

      <div class="keybox">
        <h3>Il placebo non è una bugia</h3>
        <p>L'effetto placebo è reale e misurabile: aspettative, rituale, attenzione e relazione influenzano sintomi come dolore, ansia e nausea. Non significa che «sia tutto in testa»: significa che la mente e il corpo dialogano. Un trattamento efficace deve funzionare <em>meglio</em> del placebo, non solo produrre un miglioramento.</p>
      </div>

      <h3>Assenza di prove non è prova di assenza</h3>
      <p>Quando mancano studi, la risposta onesta è «non lo sappiamo», non «funziona» né «non funziona». In fitoterapia questo accade spesso: molte piante hanno una tradizione solida e una ricerca clinica scarsa. In questi casi si può scegliere un uso prudente, a basse dosi, informando la persona e monitorando gli effetti — ma non si può affermare che sia provato.</p>

      <h3>Le fonti da conoscere</h3>
      <ul>
        <li><strong>EMA/HMPC</strong>: monografie europee sulle piante medicinali, con usi tradizionali e avvertenze.</li>
        <li><strong>ESCOP</strong>: monografie scientifiche europee.</li>
        <li><strong>WHO</strong>: monografie e linee guida sulla medicina tradizionale.</li>
        <li><strong>Cochrane Library</strong>: revisioni sistematiche indipendenti.</li>
        <li><strong>NIH ODS e NCCIH</strong>: schede divulgative statunitensi, utili e aggiornate.</li>
        <li><strong>EFSA</strong>: sicurezza di aromi, contaminanti e integratori.</li>
      </ul>

      <h3>I segnali di allarme</h3>
      <p>Diffida di chi promette guarigioni, usa la parola «detox» senza definirla, attacca la medicina come complotto, vende un prodotto mentre sconsiglia le cure, chiede di sospendere farmaci o interpreta esami senza essere medico. L'atteggiamento scientifico è il contrario: dubita di sé, cerca conferme indipendenti, dichiara i limiti.</p>

      <p>In questo programma troverai spesso la formula «evidenza limitata»: è un'informazione, non una sconfitta. Sapere quanto sappiamo è la prima forma di rispetto per chi ci legge.</p>
    `
  },

  {
    id: "principi-attivi",
    n: 4,
    parte: "piante",
    titolo: "Il linguaggio delle piante",
    occhiello: "Alcaloidi, flavonoidi, terpeni, mucillagini: che cosa contiene una pianta.",
    tempo: "9 min",
    tags: ["Botanica", "Chimica", "Qualità"],
    html: `
      <p>Una pianta non è una medicina già pronta: è un piccolo laboratorio chimico. Contiene centinaia di molecole, alcune responsabili dell'effetto, altre del sapore, del profumo o della difesa contro i predatori. Conoscere le grandi famiglie di composti aiuta a capire perché la stessa pianta può essere utile, delicata o pericolosa.</p>

      <h3>Le principali classi</h3>
      <ul>
        <li><strong>Alcaloidi</strong>: molecole azotate, spesso potenti e talvolta tossiche. Esempi: caffeina, morfina, atropina, colchicina, alcaloidi pirrolizidinici. La dose è decisiva.</li>
        <li><strong>Glicosidi</strong>: zucchero legato a una molecola attiva. I glicosidi cardiaci della digitale sono un esempio di efficacia e pericolosità.</li>
        <li><strong>Flavonoidi e polifenoli</strong>: antiossidanti e modulatori di enzimi; danno colore ai frutti e contribuiscono all'effetto di molte piante.</li>
        <li><strong>Terpeni e oli essenziali</strong>: molecole volatili e profumate, con attività antimicrobica e irritante. Sono concentrati e vanno maneggiati con cura.</li>
        <li><strong>Mucillagini</strong>: polisaccaridi che formano gel e proteggono le mucose (malva, altea, piantaggine).</li>
        <li><strong>Tannini</strong>: astringenti, legano proteine e riducono infiammazioni superficiali; in eccesso possono irritare lo stomaco.</li>
        <li><strong>Saponine</strong>: schiumose, con effetti diversi su mucose, colesterolo e assorbimento.</li>
      </ul>

      <div class="keybox">
        <h3>Sinergia e variabilità</h3>
        <p>L'effetto di un infuso non è la somma degli effetti delle singole molecole. Più composti possono agire insieme, influenzarsi o modulare la tossicità. Allo stesso tempo, la composizione cambia con specie, varietà, terreno, clima, stagione e metodo di estrazione: per questo «la camomilla» non è una sostanza unica.</p>
      </div>

      <h3>Chemiotipi: stesso nome, chimica diversa</h3>
      <p>Alcune specie esistono in «chemiotipi» differenti: il timo, per esempio, può essere ricco di timolo, carvacrolo o altri composti a seconda della popolazione. L'olio essenziale di un chemiotipo può avere proprietà e rischi diversi da un altro. Per gli oli essenziali professionali il chemiotipo è indicato in etichetta; per le piante essiccate è raramente disponibile.</p>

      <h3>Standardizzazione e marker</h3>
      <p>Gli estratti commerciali possono essere «standardizzati» su un composto marker, per garantire una quantità costante. Attenzione: il marker non è sempre la molecola che produce l'effetto. La standardizzazione migliora la riproducibilità, non garantisce l'efficacia.</p>

      <h3>Perché la forma d'uso conta</h3>
      <p>Acqua, alcol, olio e vapore estraggono composti diversi. Un infuso estrae soprattutto sostanze idrosolubili; una tintura estrae anche molecole lipofile; un oleolito estrae i composti liposolubili; l'olio essenziale è una concentrazione di volatili. La stessa pianta può quindi comportarsi in modo diverso in base alla preparazione. Ne parliamo nel capitolo successivo.</p>

      <p>La conseguenza pratica è semplice: <strong>non improvvisare conversioni tra forme</strong>. «Dieci gocce di tintura» e «dieci gocce di olio essenziale» non sono equivalenti, e un infuso non si può «concentrare» quanto un estratto secco.</p>
    `
  }

];
