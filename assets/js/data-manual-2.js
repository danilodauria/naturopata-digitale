/* ==========================================================================
   Naturopata Digitale · Manuale interattivo, capitoli 5–8
   Licenza dei contenuti: CC BY-NC-SA 4.0 · Danilo D'Auria
   ========================================================================== */

window.NP = window.NP || {};

NP.manual = NP.manual.concat([

  {
    id: "forme-d-uso",
    n: 5,
    parte: "piante",
    titolo: "Le forme d'uso",
    occhiello: "Infuso, decotto, tintura, oleolito, olio essenziale: ogni forma ha le sue regole.",
    tempo: "10 min",
    tags: ["Preparazioni", "Dosi", "Pratica"],
    html: `
      <p>La stessa pianta cambia comportamento a seconda di come viene preparata. Scegliere la forma giusta significa rispettare la chimica della pianta, il tipo di disturbo e la persona. Le dosi che seguono sono <strong>indicative</strong>, tratte dalla tradizione e dalle monografie europee: non sono prescrizioni e non sostituiscono il parere di un professionista.</p>

      <h3>Le forme acquose</h3>
      <ul>
        <li><strong>Infuso:</strong> si versa acqua calda (90–95 °C) sulla droga e si lascia in infusione coperta per 5–10 minuti. Adatto a foglie, fiori e parti tenere. Dose tipica: 1–2 g in 150–200 ml.</li>
        <li><strong>Decotto:</strong> la droga si mette in acqua fredda e si porta a ebollizione per 10–20 minuti. Adatto a radici, cortecce, semi e parti dure. Dose tipica: 1–2 g in 200–250 ml.</li>
        <li><strong>Macerato a freddo:</strong> la droga resta in acqua a temperatura ambiente per 6–12 ore. Utile per mucillagini e composti termolabili. Dose tipica: 1–2 g in 200 ml.</li>
        <li><strong>Sciroppo:</strong> infuso o decotto concentrato e filtrato, addolcito con zucchero o miele. Va conservato in frigorifero e consumato in pochi giorni se fatto in casa.</li>
      </ul>

      <h3>Le forme alcoliche e concentrate</h3>
      <ul>
        <li><strong>Tintura madre:</strong> estrazione con alcol e acqua, in genere in rapporto 1:5. Si dosa in gocce (20–40 gocce, 2–3 volte al giorno), ma il contenuto alcolico non è adatto a bambini, gravidanza e chi evita l'alcol.</li>
        <li><strong>Estratto secco:</strong> polvere concentrata e standardizzata, in capsule o compresse. La dose dipende dal rapporto di estrazione e dal titolo: leggere sempre l'etichetta, non confrontare prodotti diversi a occhio.</li>
        <li><strong>Estratto fluido e macerato glicerico:</strong> forme intermedie, spesso usate in ambito pediatrico o per chi non tollera l'alcol, ma con una minore concentrazione di principi attivi.</li>
      </ul>

      <h3>Le forme oleose</h3>
      <ul>
        <li><strong>Oleolito:</strong> pianta essiccata macerata in olio vegetale per 3–4 settimane, poi filtrata. Si usa sulla pelle; non è un olio essenziale e non va confuso con esso.</li>
        <li><strong>Olio essenziale:</strong> prodotto per distillazione o spremitura, molto concentrato e volatile. Si usa diluito (1–3% in un olio vettore) e solo per uso esterno, salvo prodotti specifici e supervisione. Non ingerire gocce «a caso».</li>
        <li><strong>Idrolato:</strong> acqua aromatica che si ottiene durante la distillazione. È delicata e si usa per tonici, impacchi e cosmetici.</li>
      </ul>

      <h3>Le forme esterne</h3>
      <p><strong>Cataplasma:</strong> pianta fresca schiacciata o decotto su garza, applicato tiepido sulla pelle. <strong>Impacco:</strong> simile, con liquido filtrato. <strong>Unguento e crema:</strong> richiedono una base grassa e una preparazione igienica. <strong>Collutorio e gargarismi:</strong> infusi concentrati, da non deglutire. <strong>Bagno aromatico:</strong> infuso concentrato o olio essenziale disperso in un emulsionante.</p>

      <div class="keybox">
        <h3>Regole d'oro</h3>
        <p>Una forma alla volta, alla dose più bassa ragionevole, per un periodo definito. Se si stanno assumendo farmaci, si è in gravidanza o si tratta un bambino, chiedere prima. Annotare ciò che si assume e da quando: aiuta a riconoscere effetti e interazioni.</p>
      </div>

      <p>Infine, la qualità: una tintura scaduta, un oleolito irrancidito o un infuso lasciato fuori dal frigorifero non sono rimedi innocui. La preparazione conta quanto la pianta.</p>
    `
  },

  {
    id: "raccolta-e-conservazione",
    n: 6,
    parte: "piante",
    titolo: "Raccogliere, essiccare, conservare",
    occhiello: "Dalla pianta al barattolo: qualità e rispetto.",
    tempo: "8 min",
    tags: ["Raccolta", "Essiccazione", "Conservazione"],
    html: `
      <p>Una scheda perfetta non compensa una raccolta sbagliata. La qualità di un rimedio vegetale dipende da dove, quando e come è stata raccolta la pianta, e da come è stata conservata. Prima ancora, dipende dal permesso di raccoglierla.</p>

      <h3>Prima di raccogliere</h3>
      <ul>
        <li><strong>Identificazione certa:</strong> specie, parte utilizzata e stadio di sviluppo. In caso di dubbio, non raccogliere.</li>
        <li><strong>Legalità:</strong> parchi, riserve, aree protette e proprietà private hanno regole proprie; alcune specie sono protette e la raccolta è vietata. Informarsi presso l'ente gestore.</li>
        <li><strong>Luogo sicuro:</strong> evitare bordi di strade trafficate, campi trattati, discariche, aree industriali e zone frequentate da animali. Lavare sempre.</li>
        <li><strong>Sostenibilità:</strong> raccogliere una parte limitata della popolazione, mai le uniche piante presenti, mai le radici se non si è proprietari del terreno. Lasciare fiori e frutti per gli impollinatori e la riproduzione.</li>
      </ul>

      <h3>Il momento giusto</h3>
      <p>Ogni parte ha il suo tempo: foglie prima della fioritura, fiori appena aperti, radici in autunno, frutti maturi, semi quando sono secchi. Raccogliere con tempo asciutto, nelle ore fresche del mattino, evita muffe e perdita di aroma. Non raccogliere dopo la pioggia o con rugiada abbondante.</p>

      <h3>Essiccare bene</h3>
      <p>La droga va pulita, stesa in strato sottile e messa in un luogo aerato, ombreggiato e asciutto. Temperature troppo alte distruggono composti volatili; l'umidità residua favorisce muffe. Foglie e fiori si essiccano appesi in mazzi o su graticci; radici e cortecce tagliate a pezzi. Un essiccatoio elettrico a bassa temperatura (35–45 °C) può aiutare in climi umidi. La droga è pronta quando si spezza con un rumore secco, non quando è semplicemente «asciutta al tatto».</p>

      <h3>Conservare</h3>
      <p>Barattoli di vetro scuro, chiusi, etichettati, in luogo fresco e buio. Le etichette devono riportare nome comune e scientifico, parte usata, luogo e data di raccolta. Durata indicativa: foglie e fiori 6–12 mesi; radici e cortecce 12–24 mesi; oleoliti 3–6 mesi; tinture alcoliche alcuni anni. Controllare odore, colore e presenza di muffe prima di ogni uso.</p>

      <div class="keybox">
        <h3>Il quaderno dell'erborista</h3>
        <p>Annota data, luogo, meteo, specie, parte raccolta, quantità e destinazione. Se in futuro un preparato darà un effetto inatteso, il quaderno aiuterà a ricostruire la filiera. È anche un modo per imparare davvero: la memoria botanica passa dalle mani e dalle note.</p>
      </div>

      <p>Un ultimo punto: la raccolta domestica non è un modo per aggirare i controlli. Le piante selvatiche possono assorbire metalli pesanti, pesticide o inquinanti. Per l'uso terapeutico regolare, affidarsi a produttori che dichiarano origine, analisi e metodi di coltivazione è spesso più sicuro che raccogliere senza conoscere il terreno.</p>
    `
  },

  {
    id: "sicurezza-e-interazioni",
    n: 7,
    parte: "piante",
    titolo: "Sicurezza: le domande da fare",
    occhiello: "Le piante non sono «naturali» per definizione: sono attive.",
    tempo: "10 min",
    tags: ["Sicurezza", "Interazioni", "Farmaci"],
    html: `
      <p>«Naturale» non significa «sicuro». L'acqua è naturale e può annegare; il sole è naturale e può scottare; molte piante sono velenose. La fitoterapia seria si fonda su un principio semplice: <strong>una sostanza attiva è una sostanza che può avere effetti, anche indesiderati</strong>.</p>

      <h3>Sette domande prima di iniziare</h3>
      <ol>
        <li>La pianta è identificata con certezza e la parte usata è quella giusta?</li>
        <li>La preparazione e la dose sono adatte a me, alla mia età e al mio peso?</li>
        <li>Sono incinta, sto allattando o sto cercando una gravidanza?</li>
        <li>Assumo farmaci, anche senza ricetta, o integratori?</li>
        <li>Ho patologie di fegato, reni, cuore, tiroide, coagulazione o epilessia?</li>
        <li>Ho allergie, in particolare a piante della stessa famiglia botanica?</li>
        <li>Dovrò affrontare un intervento o un esame nelle prossime settimane?</li>
      </ol>

      <h3>Le interazioni più importanti</h3>
      <p>Le piante possono modificare l'assorbimento dei farmaci, la loro metabolizzazione o il loro effetto. I meccanismi principali sono tre: <strong>induzione o inibizione degli enzimi epatici</strong> (soprattutto CYP3A4), <strong>competizione sui trasportatori</strong> (P-gp) e <strong>effetti additivi</strong> (sedazione, pressione, coagulazione, glicemia).</p>
      <ul>
        <li><strong>Iperico:</strong> riduce l'efficacia di contraccettivi, anticoagulanti, immunosoppressori e molti altri farmaci; rischio di sindrome serotoninergica con antidepressivi.</li>
        <li><strong>Liquirizia:</strong> ritenzione di sodio, ipokaliemia, ipertensione; interazioni con digossina e diuretici.</li>
        <li><strong>Ginkgo, aglio, curcuma, zenzero:</strong> possibile aumento del rischio emorragico con anticoagulanti.</li>
        <li><strong>Piante sedative</strong> (valeriana, passiflora, melissa, lavanda): sommano l'effetto di alcol, benzodiazepine e antistaminici.</li>
        <li><strong>Mucillagini</strong> (malva, altea, piantaggine): possono ridurre l'assorbimento di farmaci orali; distanziare di almeno 2 ore.</li>
        <li><strong>Finocchio e oli essenziali:</strong> cautela in gravidanza, nei bambini e nelle patologie ormono-dipendenti.</li>
      </ul>

      <h3>Gruppi da proteggere</h3>
      <p><strong>Gravidanza e allattamento:</strong> evitare l'automedicazione; molte piante non hanno dati sufficienti. <strong>Bambini:</strong> le dosi non sono semplici frazioni di quelle adulte e gli oli essenziali possono essere pericolosi. <strong>Anziani:</strong> maggiore sensibilità, politerapie e funzionalità renale/epatica ridotta. <strong>Persone con malattie croniche:</strong> chiedere sempre al medico curante.</p>

      <div class="keybox">
        <h3>Mai sospendere una terapia</h3>
        <p>Nessuna pianta giustifica l'interruzione di un farmaco prescritto. Se un rimedio sembra «funzionare meglio» del farmaco, la strada corretta è parlarne con il medico, non cambiare da soli. E se compare un effetto indesiderato, sospendere il rimedio e consultare un professionista, segnalando anche i prodotti naturali assunti.</p>
      </div>

      <h3>Reazioni avverse</h3>
      <p>Possono essere lievi (nausea, mal di testa, eruzioni cutanee) o gravi (reazioni allergiche, epatotossicità, aritmie, sanguinamenti). In Italia le reazioni avverse a integratori e prodotti vegetali possono essere segnalate al sistema di farmacovigilanza. La segnalazione non è burocrazia: aiuta tutti.</p>

      <p>In sintesi: la prudenza non è nemica del benessere. È la sua condizione.</p>
    `
  },

  {
    id: "etichette-e-qualita",
    n: 8,
    parte: "piante",
    titolo: "Etichette, integratori e qualità",
    occhiello: "Come leggere un prodotto senza farsi incantare dal marketing.",
    tempo: "8 min",
    tags: ["Integratori", "Etichette", "Qualità"],
    html: `
      <p>Un integratore alimentare non è un farmaco. In Europa è disciplinato come alimento, con regole su sicurezza, etichettatura e claims; in Italia la commercializzazione richiede una notifica al Ministero della Salute. Questo significa che non deve dimostrare l'efficacia clinica prima di essere venduto, ma deve essere sicuro e non attribuire proprietà curative.</p>

      <h3>Che cosa deve esserci in etichetta</h3>
      <ul>
        <li><strong>Nome botanico</strong> e parte della pianta utilizzata (foglia, radice, fiore).</li>
        <li><strong>Quantità di estratto</strong> e rapporto droga/estratto (per esempio 1:4), oltre al solvente di estrazione.</li>
        <li><strong>Titolo</strong> in principi attivi o marker, se dichiarato.</li>
        <li><strong>Dose giornaliera</strong> e numero di dosi per confezione.</li>
        <li><strong>Avvertenze</strong> per gravidanza, allattamento, bambini, patologie e interazioni.</li>
        <li><strong>Lotto e scadenza</strong>, nome del produttore e sede.</li>
      </ul>

      <h3>Le trappole del marketing</h3>
      <p>«Detox», «purifica», «rinforza le difese», «equilibra l'energia»: sono formule vaghe, spesso senza definizione scientifica. Attenzione anche alle <em>miscele proprietarie</em> che non dichiarano le quantità dei singoli ingredienti, ai prodotti «miracolosi» con testimonianze, alle promesse di perdita di peso rapida e ai consigli di sospendere cure. Un buon prodotto non ha bisogno di attaccare la medicina.</p>

      <div class="keybox">
        <h3>Qualità: le domande utili</h3>
        <p>Il produttore dichiara l'origine delle piante? Ci sono analisi su metalli pesanti, pesticidi, contaminanti microbici e alcaloidi pirrolizidinici? Esiste una certificazione biologica o un ente terzo? Il prodotto è tracciabile con lotto? Le avvertenze sono chiare? Se mancano queste informazioni, la qualità è un'incognita.</p>
      </div>

      <h3>Dose e durata</h3>
      <p>Più non è meglio. Molti effetti avversi derivano da dosi elevate o da uso prolungato. Per le piante con principi attivi potenti (iperico, liquirizia, aloe lattice, borragine, efedra) il margine è stretto. Per le piante delicate, l'uso occasionale è spesso sufficiente. Gli integratori non sono pensati per sostituire una dieta variata.</p>

      <h3>Conservazione e scadenze</h3>
      <p>Rispettare le indicazioni di conservazione: molti prodotti temono calore e umidità. Non trasferire gli integratori in contenitori anonimi, non mescolare confezioni diverse e non usare prodotti scaduti. Tenere tutto fuori dalla portata dei bambini.</p>

      <p>Infine, una regola di igiene mentale: se un prodotto promette di risolvere un problema complesso con una sola capsula, probabilmente sta semplificando la realtà. Il benessere si costruisce con sonno, cibo, movimento, relazioni e, quando serve, cure appropriate.</p>
    `
  }

]);
