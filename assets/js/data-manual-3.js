/* ==========================================================================
   Naturopata Digitale · Manuale interattivo, capitoli 9–12
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.manual = NP.manual.concat([

  {
    id: "fitoalimurgia",
    n: 9,
    parte: "raccolto",
    titolo: "Fitoalimurgia: raccogliere con rispetto",
    occhiello: "Le piante selvatiche in cucina, dentro regole chiare.",
    tempo: "8 min",
    tags: ["Fitoalimurgia", "Etica", "Sicurezza"],
    html: `
      <p>La <strong>fitoalimurgia</strong> è l'uso alimentare delle piante spontanee: erbe di campo, frutti di siepe, radici, semi e fiori che la natura offre senza bisogno di semina. Non è una moda recente: è una conoscenza contadina antica, oggi riscoperta per il gusto, la biodiversità e il legame con i territori. Ma è anche un'attività che richiede responsabilità.</p>

      <h3>Le regole del raccolto gentile</h3>
      <ol>
        <li><strong>Certezza botanica.</strong> Raccogliere solo ciò che si riconosce senza dubbi. Una foto o un'app non bastano per una decisione alimentare.</li>
        <li><strong>Legalità.</strong> Rispettare parchi, riserve, aree protette e proprietà private. Alcune specie sono protette: la raccolta è vietata.</li>
        <li><strong>Misura.</strong> Prelevare poco, mai l'intera popolazione, mai le uniche piante di una specie in un luogo. Lasciare fiori e frutti per la riproduzione e per gli animali.</li>
        <li><strong>Radici.</strong> Non estirpare radici se non si è proprietari del terreno o autorizzati: è la parte che uccide la pianta.</li>
        <li><strong>Luoghi puliti.</strong> Evitare bordi di strade trafficate, campi trattati, discariche, aree industriali e zone frequentate da animali.</li>
        <li><strong>Igiene.</strong> Lavare bene, cuocere quando necessario, non consumare piante crude se non si è sicuri.</li>
        <li><strong>Una novità alla volta.</strong> Introdurre una nuova pianta in piccole quantità, per verificare tolleranza e allergie.</li>
        <li><strong>Nel dubbio, lascia stare.</strong> La rinuncia è sempre un'opzione sicura.</li>
      </ol>

      <div class="keybox">
        <h3>Il principio della doppia certezza</h3>
        <p>Per le piante commestibili è prudente chiedere conferma a due fonti indipendenti (un esperto, un buon manuale, un erbario) e verificare più caratteri: foglia, fusto, fiore, odore, lattice, habitat. Se manca un carattere, non è abbastanza.</p>
      </div>

      <h3>Perché raccogliere</h3>
      <p>La raccolta responsabile ha valore culturale, nutrizionale e ambientale: molte erbe spontanee sono ricche di fibre, minerali e vitamine, e la loro presenza racconta la salute di un territorio. Raccogliere significa anche imparare a riconoscere le stagioni, a cucinare con ciò che c'è e a ridurre gli sprechi. Ma non è un modo per «depurarsi»: le piante sono alimenti, non medicine miracolose.</p>

      <h3>Specie da conoscere, non da saccheggiare</h3>
      <p>Alcune specie sono diventate rare per la raccolta intensiva e la perdita di habitat. Altre sono protette da leggi regionali o internazionali. Prima di raccogliere, informarsi sulle liste locali; in caso di dubbio, coltivare in giardino è la scelta più sostenibile. Anche le piante comuni possono essere sovrasfruttate se raccolte in modo industriale.</p>

      <p>La fitoalimurgia più bella è quella che lascia il posto più ricco di prima: si prende il necessario, si osservano i margini, si proteggono i semi. È un'arte di misura, prima che di cucina.</p>
    `
  },

  {
    id: "riconoscere-e-sosia",
    n: 10,
    parte: "raccolto",
    titolo: "Riconoscere senza sbagliare",
    occhiello: "I caratteri che contano, le famiglie utili e i sosia da temere.",
    tempo: "10 min",
    tags: ["Botanica", "Sosia", "Tossicità"],
    html: `
      <p>Riconoscere una pianta non è memorizzare una foto: è osservare caratteri stabili. Le app di riconoscimento sono utili per orientarsi, ma sbagliano spesso sulle specie selvatiche, soprattutto quando la pianta è giovane o senza fiore. Per l'uso alimentare serve un metodo più solido.</p>

      <h3>Un metodo in sei passi</h3>
      <ol>
        <li><strong>Habitat:</strong> dove cresce? Bosco umido, prato arido, bordo strada, ambiente calcareo. Ogni specie ha il suo contesto.</li>
        <li><strong>Portamento:</strong> erba, arbusto, albero, rosetta basale, fusto eretto o strisciante.</li>
        <li><strong>Foglie:</strong> forma, margine, nervature, disposizione sul fusto, pelosità, profumo.</li>
        <li><strong>Fiori e frutti:</strong> colore, simmetria, numero di petali, tipo di infiorescenza. Sono i caratteri più diagnostici.</li>
        <li><strong>Odore e lattice:</strong> strofinare una foglia (non assaggiare) e osservare se esce lattice bianco o colorato.</li>
        <li><strong>Confronto:</strong> verificare con due fonti e, se possibile, con un esperto. Controllare anche i sosia.</li>
      </ol>

      <h3>Le famiglie che aiutano</h3>
      <ul>
        <li><strong>Lamiaceae</strong> (menta, salvia, timo, rosmarino): fusto quadrangolare, foglie opposte, forte aroma. In genere facili e sicure, ma non tutte commestibili.</li>
        <li><strong>Asteraceae</strong> (tarassaco, cicoria, camomilla, calendula): capolini con fiori a linguetta e a tubo. Famiglia vasta, con specie tossiche: attenzione.</li>
        <li><strong>Apiaceae/Ombrellifere</strong> (finocchio, carota selvatica, prezzemolo): infiorescenze a ombrella. Contiene alcune delle piante più velenose d'Europa: massima prudenza.</li>
        <li><strong>Rosaceae</strong> (rosa, biancospino, prugnolo): fiori a cinque petali, frutti carnosi. Alcuni semi contengono amigdalina.</li>
        <li><strong>Brassicaceae</strong> (senape, crescione, borsa del pastore): fiori a quattro petali, frutti a siliqua.</li>
        <li><strong>Polygonaceae</strong> (acetosa, romice): foglie acidule, guaine al nodo. L'acetosa contiene ossalati.</li>
      </ul>

      <div class="keybox">
        <h3>I sosia mortali da conoscere</h3>
        <p><strong>Cicuta maggiore</strong> (Conium maculatum) somiglia al finocchio e ad altre ombrellifere commestibili; <strong>colchico autunnale</strong> (Colchicum autumnale) ha foglie simili all'aglio orsino; <strong>mughetto</strong> (Convallaria majalis) somiglia all'aglio orsino ma non profuma di aglio; <strong>oleandro</strong> ha foglie simili all'olivo; <strong>belladonna</strong>, <strong>stramonio</strong>, <strong>aconito</strong> e <strong>digitale</strong> sono altre piante da riconoscere per evitarle. In caso di ingestione sospetta, chiamare subito il 112/118 o un Centro Antiveleni.</p>
      </div>

      <h3>Errori tipici</h3>
      <p>Raccogliere in base al solo profumo, confondere le foglie giovani, fidarsi di un'app, mescolare specie diverse nello stesso cestino, usare piante da bordi strada, dare per scontato che «se la mangiano gli animali, è commestibile» (falso: molte piante tossiche per l'uomo sono mangiate da altri animali).</p>

      <p>La conoscenza botanica è un patrimonio che si costruisce lentamente. Meglio una specie conosciuta bene che dieci riconosciute a metà.</p>
    `
  },

  {
    id: "cucina-selvatica",
    n: 11,
    parte: "raccolto",
    titolo: "In cucina con le erbe selvatiche",
    occhiello: "Gusti amari, cotture giuste e conserve sicure.",
    tempo: "7 min",
    tags: ["Cucina", "Ricette", "Conservazione"],
    html: `
      <p>Le erbe selvatiche hanno gusti intensi: amaro, acidulo, aromatico, talvolta piccante. In cucina si usano come verdure, aromi, decorazioni e conserve. La regola è semplice: trattarle come alimenti freschi, con igiene e cottura adeguate, e non come medicine.</p>

      <h3>Preparare le erbe</h3>
      <ul>
        <li><strong>Lavaggio:</strong> più acque, eliminando terra, insetti e parti morte. Per le foglie raccolte in zone polverose, un ammollo breve aiuta.</li>
        <li><strong>Cottura:</strong> molte erbe contengono composti amari o irritanti che si riducono con l'ebollizione. Ortica, borragine e sambuco richiedono cottura. Altre, come la valeriana, si usano crude.</li>
        <li><strong>Assaggio:</strong> introdurre una nuova specie in piccola quantità, soprattutto se si hanno allergie o problemi digestivi.</li>
      </ul>

      <h3>Tre preparazioni di base</h3>
      <p><strong>Risotto alle ortiche:</strong> soffriggere una cipolla, aggiungere riso e brodo, poi le foglie di ortica sbollentate e tritate. Mantecare con formaggio. L'ortica cotta perde completamente l'effetto urticante.</p>
      <p><strong>Insalata di tarassaco e cicoria:</strong> foglie tenere lavate, condite con olio, limone, sale e, se piace, una fetta di mela. L'amaro si attenua con un breve ammollo e con un condimento acidulo.</p>
      <p><strong>Sciroppo di sambuco:</strong> fiori raccolti con tempo asciutto, infusi in acqua con zucchero e limone, poi filtrati e imbottigliati. Il prodotto va conservato in frigorifero e consumato in tempi brevi; i fiori vanno usati solo se si è certi dell'identificazione.</p>

      <div class="keybox">
        <h3>Conserve sicure</h3>
        <p>Le conserve fatte in casa possono favorire la crescita di batteri se non sono acide o zuccherine a sufficienza e se non vengono sterilizzate correttamente. Usare barattoli puliti, rispettare tempi e temperature, conservare in frigorifero e non consumare prodotti con odore, colore o consistenza anomali. In caso di dubbio, scartare.</p>
      </div>

      <h3>Chi deve fare più attenzione</h3>
      <p>Bambini, donne in gravidanza o allattamento, anziani fragili e persone immunodepresse dovrebbero evitare le erbe selvatiche crude e le conserve domestiche. Anche le persone allergiche alle Asteraceae o alle Apiaceae devono prestare attenzione alle famiglie botaniche corrispondenti.</p>

      <h3>Il gusto si educa</h3>
      <p>L'amaro è un gusto poco frequentato nella cucina moderna, ma è prezioso: apre il pasto, stimola la digestione e bilancia i sapori. Iniziare con piccole quantità, abbinare a ingredienti dolci o grassi e variare le specie è il modo migliore per imparare ad apprezzarlo.</p>
    `
  },

  {
    id: "sonno-e-ritmi",
    n: 12,
    parte: "pratica",
    titolo: "Sonno, luce e ritmi",
    occhiello: "La notte non si «compra» con una tisana: si prepara durante il giorno.",
    tempo: "8 min",
    tags: ["Sonno", "Ritmi", "Benessere"],
    html: `
      <p>Il sonno è un processo biologico, non una scelta di volontà. Dipende dalla pressione omeostatica (quanto a lungo siamo stati svegli), dal ritmo circadiano (l'orologio interno sincronizzato dalla luce) e dallo stato di attivazione del sistema nervoso. Una tisana può accompagnare, ma non compensa orari caotici, luce notturna o stress cronico.</p>

      <h3>Le basi dell'igiene del sonno</h3>
      <ul>
        <li><strong>Orari regolari:</strong> svegliarsi alla stessa ora, anche nel fine settimana, è più efficace di andare a letto a orari variabili.</li>
        <li><strong>Luce del mattino:</strong> 10–30 minuti di luce naturale al risveglio aiutano a sincronizzare l'orologio interno.</li>
        <li><strong>Caffeina:</strong> evitarla nel pomeriggio; ha un'emivita di circa 5–6 ore e può restare attiva a lungo.</li>
        <li><strong>Alcol:</strong> favorisce l'addormentamento ma frammenta il sonno e riduce la qualità.</li>
        <li><strong>Schermi:</strong> la luce intensa la sera ritarda la melatonina; meglio abbassare luminosità e usare modalità notturne.</li>
        <li><strong>Camera:</strong> buio, fresco e silenzioso. Il letto dovrebbe essere associato al sonno, non al lavoro.</li>
        <li><strong>Movimento:</strong> attività fisica regolare, ma non intensa nelle ore serali.</li>
      </ul>

      <div class="keybox">
        <h3>Se non riesci a dormire</h3>
        <p>Se dopo 20–30 minuti non arriva il sonno, alzati, vai in una stanza con luce bassa e fai qualcosa di tranquillo finché non senti sonnolenza. Restare a letto a rimuginare rinforza l'associazione tra letto e veglia. La terapia cognitivo-comportamentale per l'insonnia (CBT-I) è il trattamento di prima linea raccomandato dalle linee guida.</p>
      </div>

      <h3>Le piante della sera</h3>
      <p>Camomilla, melissa, passiflora, valeriana e lavanda hanno una tradizione solida e un profilo di sicurezza generalmente favorevole alle dosi usuali. L'effetto è modesto e variabile: possono aiutare a creare un rito, ma non sono ipnotici potenti. Valeriana e passiflora possono aumentare la sonnolenza se associate ad alcol o sedativi; non guidare dopo l'assunzione.</p>

      <h3>Quando chiedere aiuto</h3>
      <p>L'insonnia che dura più di tre settimane, il russamento con pause respiratorie, la sonnolenza diurna incapacitante, il sonno che non ristora e l'associazione con umore basso o ansia intensa richiedono una valutazione medica. Le apnee notturne, in particolare, non si curano con le tisane.</p>

      <p>Un buon sonno non è un lusso: è un pilastro della salute metabolica, immunitaria e mentale. Vale la pena trattarlo con la stessa serietà di una dieta o di un allenamento.</p>
    `
  }

]);
