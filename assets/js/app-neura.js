/* ==========================================================================
   Naturopata Digitale · interfaccia di Neura
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

(function () {
  "use strict";

  const A = NP.app;
  const views = A.views;
  const esc = A.esc;

  let micAscoltoCollegato = false;

  const WELCOME = '<p><strong>Ciao, sono Neura.</strong> Sono l\'assistente locale di Naturopata Digitale: leggo le schede, il manuale e le tabelle di sicurezza, e provo a risponderti con chiarezza.</p>' +
    '<p>Posso spiegarti una pianta, riassumere le avvertenze, suggerirti un tema di benessere, controllare un rimedio rispetto a farmaci e condizioni, oppure farti una domanda di quiz.</p>' +
    '<p class="muted mb-0">Non sono un medico, non invento risposte e non invio nulla in rete. In caso di sintomi importanti, rivolgiti a un professionista sanitario.</p>';

  function renderLog(typing) {
    const log = document.getElementById("chatLog");
    if (!log) return;
    log.innerHTML = A.state.chat.map((m) =>
      '<div class="msg ' + m.role + '"><span class="msg-avatar" aria-hidden="true">' + (m.role === "neura" ? "N" : "Tu") + '</span><div class="msg-body">' + m.html + "</div></div>"
    ).join("") + (typing ? '<div class="msg neura typing"><span class="msg-avatar" aria-hidden="true">N</span><div class="msg-body" aria-label="Neura sta scrivendo"><i></i><i></i><i></i></div></div>' : "");
    log.scrollTop = log.scrollHeight;
  }

  function checkHTML(result) {
    const items = result.items.map((i) =>
      '<div class="check-item lvl-' + i.level + '"><strong>' + esc(i.titolo) + "</strong><span>" + esc(i.testo) + "</span></div>"
    ).join("");
    return (result.urgent ? '<div class="callout danger" style="margin:.2rem 0 .6rem"><span aria-hidden="true">🚨</span><p class="mb-0"><strong>Segnale di allarme.</strong> ' + esc(result.summary) + "</p></div>" : "") +
      '<p class="text-small" style="margin-bottom:.5rem"><strong>' + esc(result.summary) + "</strong></p>" + items +
      '<p class="text-small muted mb-0">Controllo informativo basato sulle schede del programma. Non sostituisce il parere di medico o farmacista.</p>';
  }

  function checkFromChat(text) {
    const flags = {};
    const n = text.toLowerCase();
    flags.gravidanza = /gravidanz|incint/.test(n);
    flags.allattamento = /allatt|allattamento/.test(n);
    flags.bambini = /bambin|figlio|neonat|pediatr/.test(n);
    flags.fegato = /fegato|epatic/.test(n);
    flags.reni = /reni|renale/.test(n);
    flags.chirurgia = /intervento|operazione|chirurg/.test(n);
    flags.farmaci = /farmac|medicine|pillola|terapia/.test(n);
    return NP.neura.check(text, flags);
  }

  function send(text) {
    const clean = String(text || "").trim();
    if (!clean) return;
    if (!A.state.chat.length) A.state.chat.push({ role: "neura", html: WELCOME });
    A.state.chat.push({ role: "user", html: "<p>" + esc(clean) + "</p>" });
    renderLog(true);
    const input = document.getElementById("neuraInput");
    if (input) input.value = "";

    setTimeout(() => {
      let html;
      if (/^(controlla|verifica)\b/.test(clean.toLowerCase()) && NP.neura.findPlants(clean).length) {
        html = checkHTML(checkFromChat(clean));
      } else {
        html = NP.neura.answer(clean).html;
      }
      A.state.chat.push({ role: "neura", html: html });
      renderLog(false);
      if (NP.voce && NP.voce.letturaAttiva()) NP.voce.parla(html);
    }, 320);
  }

  function checkPanelResult() {
    const text = (document.getElementById("checkText") || {}).value || "";
    const flags = {};
    ["gravidanza", "allattamento", "bambini", "fegato", "reni", "farmaci", "chirurgia"].forEach((k) => {
      const el = document.getElementById("chk-" + k);
      flags[k] = !!(el && el.checked);
    });
    const res = NP.neura.check(text, flags);
    const box = document.getElementById("checkResult");
    if (box) box.innerHTML = checkHTML(res);
  }

  views.neura = function () {
    if (!A.state.chat.length) A.state.chat.push({ role: "neura", html: WELCOME });

    const suDesktop = !!(window.npDesktop && window.npDesktop.platform);
    const piattaforma = (window.npDesktop && window.npDesktop.platform) || "";

    A.page(
      '<div class="page-head" style="margin-bottom:1.4rem"><p class="eyebrow">Neura · intelligenza locale</p><h1>Chiedi, capisci, controlla.</h1>' +
        '<p class="lead">Un assistente che lavora solo sui contenuti di questo programma. Niente cloud, niente account: le tue domande restano qui.</p></div>' +
      '<div class="neura-layout">' +
        '<section class="chat-panel" id="chat" aria-label="Conversazione con Neura">' +
          '<header class="chat-head"><span class="neura-orb" aria-hidden="true"></span><div><h2>Neura</h2><p>Conoscenza locale · nessun dato inviato</p></div><button class="chip chat-stop" type="button" id="neuraStop" title="Zittisci la voce">Stop</button><span class="chat-status">pronta</span></header>' +
          '<div class="chat-log" id="chatLog" role="log" aria-live="polite"></div>' +
          '<div class="chat-suggestions" id="chatSuggestions">' +
            NP.neura.suggestions.slice(0, 4).map((s) => '<button class="chip" type="button" data-suggestion="' + esc(s) + '">' + esc(s) + "</button>").join("") +
          "</div>" +
          '<div class="chat-composer"><label style="flex:1"><span class="sr-only">Scrivi a Neura</span><textarea class="textarea" id="neuraInput" rows="2" maxlength="700" placeholder="Scrivi una domanda: «a cosa serve la malva?»"></textarea></label><button class="chat-send chat-mic" type="button" id="neuraMic" aria-label="Detta la domanda" title="Detta la domanda" hidden>' + A.ico("wave") + '</button><button class="chat-send" type="button" id="neuraSend" aria-label="Invia a Neura">' + A.ico("arrow") + "</button></div>" +
          '<p class="chat-note">Neura è un motore di conoscenza locale, non un modello generativo: risponde con i contenuti del programma e, se non sa, te lo dice. Non è un medico. <button class="btn btn-ghost btn-small" type="button" data-clear-chat style="padding:0 .2rem;font-size:.68rem">Svuota chat</button></p>' +
        "</section>" +

        '<aside class="neura-side">' +
          '<div class="neura-intro"><h2>Che cosa posso fare</h2><ul>' +
            "<li>Spiegare una pianta e le sue preparazioni.</li>" +
            "<li>Riassumere avvertenze e interazioni.</li>" +
            "<li>Suggerire piante e abitudini per un tema.</li>" +
            "<li>Farti domande di quiz.</li>" +
            "<li>Controllare un rimedio con farmaci e condizioni.</li>" +
          "</ul><p class=\"text-small muted mt-2 mb-0\">Non faccio diagnosi, non prescrivo e non sostituisco il medico.</p></div>" +

          '<div class="check-panel">' +
            "<h2>Controlla un rimedio</h2>" +
            '<p>Scrivi pianta e farmaci. Seleziona le condizioni che ti riguardano.</p>' +
            '<label><span class="sr-only">Rimedio e farmaci</span><textarea class="textarea" id="checkText" placeholder="Es.: camomilla e liquirizia, assumo warfarin…"></textarea></label>' +
            '<div class="check-grid">' +
              '<label class="check"><input type="checkbox" id="chk-gravidanza"> Gravidanza</label>' +
              '<label class="check"><input type="checkbox" id="chk-allattamento"> Allattamento</label>' +
              '<label class="check"><input type="checkbox" id="chk-bambini"> Bambini</label>' +
              '<label class="check"><input type="checkbox" id="chk-fegato"> Fegato</label>' +
              '<label class="check"><input type="checkbox" id="chk-reni"> Reni</label>' +
              '<label class="check"><input type="checkbox" id="chk-farmaci"> Farmaci</label>' +
              '<label class="check"><input type="checkbox" id="chk-chirurgia"> Intervento</label>' +
            "</div>" +
            '<button class="btn btn-primary btn-small btn-block" type="button" id="checkBtn">' + A.ico("shield") + " Controlla</button>" +
            '<div class="check-result" id="checkResult" aria-live="polite"></div>' +
          "</div>" +

          '<div class="card voice-panel" id="voce">' +
            "<h2>Voce</h2>" +
            '<p class="text-small">Il pulsante dell\'altoparlante in alto attiva o disattiva la lettura. Puoi fermarla con Stop, con «Ferma l\'audio» nella barra in alto o con Esc.</p>' +
            '<label class="voice-label" for="voiceSelect">Voce del dispositivo</label>' +
            '<select class="select" id="voiceSelect"><option value="">Automatica (consigliata)</option></select>' +
            '<div class="voice-ritmo"><label class="voice-label" for="voiceRitmo">Velocità di lettura</label>' +
              '<div class="ritmo-riga"><input type="range" id="voiceRitmo" min="0.7" max="1.4" step="0.05" value="1" aria-describedby="voiceRitmoValore"><output class="ritmo-valore" id="voiceRitmoValore" for="voiceRitmo">100%</output></div>' +
              '<p class="text-small muted mb-0">Vale per tutte le voci del sistema.</p></div>' +
            '<p class="text-small muted" id="voiceNote">Voci lette dal sistema: in lettura…</p>' +
            '<div class="pill-row" id="voiceAzioni"><button type="button" class="chip" id="voiceRileggi" title="Rilegge l\'elenco delle voci installate">Rileggi l\'elenco</button>' +
              (suDesktop && piattaforma !== "linux" ? '<button type="button" class="chip" id="voiceImpostazioni" title="Apre le impostazioni voce del sistema">Aggiungi una voce</button>' : "") +
            "</div>" +
            '<div class="voice-naturale" id="voiceNaturale" hidden>' +
              '<p class="text-small muted mb-0" id="voiceNaturaleNota"></p>' +
              '<div class="pill-row" id="voiceNaturaleVoci"></div>' +
              '<div class="pill-row">' +
                '<button type="button" class="chip" id="voiceNaturaleConfronta" title="Fa sentire la stessa frase con le voci installate, una dopo l\'altra" hidden>Confronta le voci</button>' +
                '<button type="button" class="chip" id="voiceNaturaleRimuovi" title="Libera lo spazio occupato dalle voci naturali" hidden>Rimuovi le voci naturali</button>' +
              "</div>" +
            "</div>" +
            '<p class="text-small muted">Chrome ed Edge aggiungono voci online che il programma installato non vede: qui puoi usarle, nell\'app installata restano quelle del sistema.</p>' +
            '<p class="text-small muted mb-0">La voce usa il sintetizzatore del dispositivo: nessun audio lascia il computer. Su Windows la più naturale è quella «Natural», su macOS quella «Premium»: se non compare, si aggiunge dalle impostazioni di sistema.</p>' +
          "</div>" +
        "</aside>" +
      "</div>",
      "view-neura"
    );

    renderLog(false);
    const sendBtn = document.getElementById("neuraSend");
    const input = document.getElementById("neuraInput");
    if (sendBtn) sendBtn.addEventListener("click", () => send(input ? input.value : ""));
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input.value); }
      });
    }
    document.querySelectorAll("[data-suggestion]").forEach((b) => {
      b.addEventListener("click", () => send(b.getAttribute("data-suggestion")));
    });
    const clear = document.querySelector("[data-clear-chat]");
    if (clear) clear.addEventListener("click", () => {
      A.state.chat = [{ role: "neura", html: WELCOME }];
      renderLog(false);
    });
    const checkBtn = document.getElementById("checkBtn");
    if (checkBtn) checkBtn.addEventListener("click", checkPanelResult);

    // Dettatura: il pulsante compare solo se il browser la offre davvero.
    const mic = document.getElementById("neuraMic");
    if (mic && NP.voce && NP.voce.supporto().dettatura) {
      mic.hidden = false;
      mic.addEventListener("click", () => {
        if (NP.voce.staAscoltando()) { NP.voce.fermaAscolto(); return; }
        NP.voce.ascolta(
          (testo) => { if (!testo) return; if (input) input.value = testo; send(testo); },
          () => { if (A.toast) A.toast("Dettatura non disponibile: puoi scrivere la domanda."); }
        );
      });
      if (!micAscoltoCollegato) {
        document.addEventListener("np:voce", () => {
          const el = document.getElementById("neuraMic");
          if (el) el.setAttribute("data-active", NP.voce && NP.voce.staAscoltando() ? "true" : "false");
        });
        micAscoltoCollegato = true;
      }
    }

    // Pannello Voce: voce del dispositivo, velocità di lettura, rilettura.
    const vp = NP.voce;
    const selVoce = document.getElementById("voiceSelect");
    const ritmoBox = document.getElementById("voiceRitmo");
    const ritmoValore = document.getElementById("voiceRitmoValore");
    const notaVoci = document.getElementById("voiceNote");

    const contaVoci = () => {
      const g = vp ? vp.voci() : { italiane: [], altre: [] };
      return { n: g.italiane.length + g.altre.length, it: g.italiane.length };
    };

    const scriviNota = () => {
      if (!notaVoci) return;
      const c = contaVoci();
      notaVoci.textContent = "Voci lette dal sistema: " + c.n + (c.it ? " (" + c.it + " in italiano)" : "") + ".";
    };

    const riempiVoci = () => {
      if (!selVoce || !vp) return;
      const g = vp.voci();
      const opzione = (v) => '<option value="' + esc(v.name) + '">' + esc(v.name + (v.lang ? " · " + v.lang : "")) + "</option>";
      // Le voci naturali installate stanno in cima: sono quelle che suonano
      // come una persona, e si riconoscono dal nome.
      const naturali = vp.naturalePronte().map((v) =>
        '<option value="__naturale__:' + esc(v.id) + '">Naturale · ' + esc(v.nome) + "</option>"
      ).join("");
      selVoce.innerHTML = '<option value="">Automatica (consigliata)</option>' + naturali +
        g.italiane.map(opzione).join("") + g.altre.map(opzione).join("");
      selVoce.value = vp.nomeVoce() || "";
      scriviNota();
    };

    if (vp) {
      riempiVoci();

      const mostraRitmo = (v) => {
        if (ritmoValore) ritmoValore.textContent = Math.round(v * 100) + "%";
        if (ritmoBox) ritmoBox.value = String(v);
      };
      mostraRitmo(vp.ritmo());

      if (selVoce) selVoce.addEventListener("change", () => {
        const valore = selVoce.value;
        const naturale = /^__naturale__:/.test(valore) ? valore.split(":")[1] : "";
        const scelta = naturale ? vp.impostaNaturale(naturale) : vp.impostaVoce(valore);
        const nome = naturale
          ? ((vp.naturaleVoci().filter((v) => v.id === naturale)[0] || {}).nome || "naturale")
          : valore;
        if (A.toast) A.toast(valore ? "Voce impostata: " + nome + "." : (scelta ? "Torno alla voce automatica." : "Nessuna voce: Neura resta muta."));
        vp.parla("<p>Ecco come suono. Se ti va bene, andiamo avanti.</p>");
      });

      if (ritmoBox) {
        ritmoBox.addEventListener("input", () => mostraRitmo(vp.impostaRitmo(ritmoBox.value)));
        ritmoBox.addEventListener("change", () => {
          const v = vp.impostaRitmo(ritmoBox.value);
          mostraRitmo(v);
          if (A.toast) A.toast(v < 0.95 ? "Leggo più piano." : (v > 1.05 ? "Leggo più veloce." : "Velocità normale."));
          vp.parla("<p>Ecco come leggo a questa velocità.</p>");
        });
        ritmoBox.addEventListener("dblclick", () => { mostraRitmo(vp.impostaRitmo(1)); if (A.toast) A.toast("Velocità normale."); });
      }

      const rileggi = document.getElementById("voiceRileggi");
      if (rileggi) rileggi.addEventListener("click", () => {
        const prima = contaVoci().n;
        riempiVoci();
        const dopo = contaVoci().n;
        if (!dopo) { if (A.toast) A.toast("Nessuna voce leggibile: aggiungine una dalle impostazioni del sistema."); }
        else if (dopo !== prima) { if (A.toast) A.toast("Ora il sistema offre " + dopo + " voci."); }
        else { if (A.toast) A.toast("Sono sempre " + dopo + ": se ne hai appena aggiunta una, chiudi e riapri il programma."); }
      });

      // Voce naturale facoltativa: si scarica una volta e resta nel computer.
      const scatolaNaturale = document.getElementById("voiceNaturale");
      const notaNaturale = document.getElementById("voiceNaturaleNota");
      const vociNaturale = document.getElementById("voiceNaturaleVoci");
      const rimuoviNaturale = document.getElementById("voiceNaturaleRimuovi");
      const confrontaNaturale = document.getElementById("voiceNaturaleConfronta");

      const disegnaNaturale = (s) => {
        if (!scatolaNaturale || !notaNaturale) return;
        const stato = s || vp.naturale();
        const voci = Array.isArray(stato.voci) ? stato.voci : vp.naturaleVoci();
        const pronte = voci.filter((v) => v.installata);

        if (vociNaturale) {
          const scelta = vp.naturaleScelta();
          vociNaturale.innerHTML = voci.map((v) => {
            const attiva = v.installata && v.id === scelta;
            const testo = v.installata
              ? esc(v.nome) + " · " + esc(v.genere) + " · " + vp.pesoNaturale(v) + " MB" + (attiva ? " ✓" : "")
              : "Installa " + esc(v.nome) + " · " + v.mb + " MB";
            const pulsante = '<button type="button" class="chip' + (attiva ? " is-active" : "") + '" data-voce="' + esc(v.id) + '"' +
              (v.installata ? ' aria-pressed="' + (attiva ? "true" : "false") + '"' : "") + ">" + testo + "</button>";
            return v.installata
              ? '<span class="voce-naturale-riga">' + pulsante +
                '<button type="button" class="chip chip-togli" data-rimuovi="' + esc(v.id) +
                '" title="Togli ' + esc(v.nome) + ' e libera ' + vp.pesoNaturale(v) + ' MB">Togli</button></span>'
              : pulsante;
          }).join("");
        }

        if (stato.disponibile === false) {
          // Su Mac il motore locale non c'è (gli archivi ufficiali non
          // contengono le librerie che servono): la voce naturale sono quelle
          // «Premium» di Apple, che il programma usa come voci del sistema.
          if (/^darwin/.test(String(stato.motivo || ""))) {
            notaNaturale.innerHTML = "Su Mac la voce naturale è quella <strong>«Premium» di Apple</strong>: si scarica una volta da Impostazioni di Sistema → Accessibilità → Contenuto pronunciato → Gestisci voci, poi compare qui nell'elenco.";
          } else {
            notaNaturale.textContent = "La voce naturale si scarica per Windows e Linux, su processori Intel e ARM: su questo sistema restano le voci del sistema.";
          }
          if (vociNaturale) vociNaturale.innerHTML = "";
          if (rimuoviNaturale) rimuoviNaturale.hidden = true;
          if (confrontaNaturale) confrontaNaturale.hidden = true;
          return;
        }

        if (pronte.length) {
          notaNaturale.innerHTML = "<strong>Voci naturali pronte: " +
            pronte.map((v) => esc(v.nome)).join(" e ") + ".</strong> " +
            (stato.spazio ? "Occupano " + stato.spazio + " MB sul disco, motore compreso. " : "") +
            "Sono generate sul tuo computer: nessun testo esce da qui.";
        } else {
          notaNaturale.textContent = "Voce naturale (facoltativa): suona come una persona, non come un robot. Si scarica una volta sola" +
            (stato.peso ? " (circa " + stato.peso + " MB)" : "") + " e poi funziona anche senza Internet.";
        }
        if (rimuoviNaturale) rimuoviNaturale.hidden = pronte.length === 0;
        if (confrontaNaturale) confrontaNaturale.hidden = pronte.length < 2;
      };

      if (vp.naturaleDisponibile()) {
        if (scatolaNaturale) scatolaNaturale.hidden = false;
        vp.aggiornaNaturale().then((s) => { disegnaNaturale(s); riempiVoci(); });

        vp.progressoNaturale((st) => {
          if (!notaNaturale || !st) return;
          notaNaturale.textContent = "Scarico la voce naturale… " + (st.percentuale || 0) + "%";
        });

        if (vociNaturale) vociNaturale.addEventListener("click", (e) => {
          const bottone = e.target && e.target.closest ? e.target.closest("[data-voce],[data-rimuovi]") : null;
          if (!bottone) return;

          if (bottone.hasAttribute("data-rimuovi")) {
            const togli = bottone.getAttribute("data-rimuovi");
            bottone.disabled = true;
            vp.rimuoviNaturaleVoce(togli).then((s) => {
              disegnaNaturale(s);
              riempiVoci();
              const nome = (vp.naturaleVoci().filter((v) => v.id === togli)[0] || {}).nome || togli;
              if (A.toast) A.toast("Voce naturale rimossa: " + nome +
                (s && s.liberati ? " · liberati " + s.liberati + " MB" : "") + ".");
            }).catch(() => { if (A.toast) A.toast("Non sono riuscito a rimuovere quella voce."); });
            return;
          }

          const id = bottone.getAttribute("data-voce");
          const voce = vp.naturaleVoci().filter((v) => v.id === id)[0];
          if (!voce) return;

          if (voce.installata) {
            vp.impostaNaturale(id);
            disegnaNaturale();
            riempiVoci();
            if (A.toast) A.toast("Voce naturale: " + voce.nome + ".");
            vp.parla("<p>Ecco come suono con questa voce.</p>");
            return;
          }

          bottone.disabled = true;
          if (notaNaturale) notaNaturale.textContent = "Scarico " + voce.nome + ": ci vuole un minuto e non serve altro.";
          if (A.toast) A.toast("Scarico la voce naturale…");
          vp.scaricaNaturale(id).then((s) => {
            if (s && s.ok && s.installata) {
              vp.impostaNaturale(id);
              disegnaNaturale(s);
              riempiVoci();
              if (A.toast) A.toast("Voce naturale pronta: " + voce.nome + ".");
            } else {
              disegnaNaturale();
              if (A.toast) A.toast("Voce naturale non installata: " + ((s && (s.errore || s.motivo)) || "riprova") + ".");
            }
          }).catch(() => {
            disegnaNaturale();
            if (A.toast) A.toast("Voce naturale non installata: controlla la connessione e riprova.");
          });
        });

        if (rimuoviNaturale) rimuoviNaturale.addEventListener("click", () => {
          vp.rimuoviNaturaleTutto().then((s) => {
            disegnaNaturale(s);
            riempiVoci();
            if (A.toast) A.toast("Voce naturale rimossa: torno alle voci del sistema.");
          }).catch(() => { if (A.toast) A.toast("Non sono riuscito a rimuovere la voce naturale."); });
        });

        if (confrontaNaturale) confrontaNaturale.addEventListener("click", () => {
          if (!notaNaturale) return;
          const avviato = vp.confrontaNaturale((voce) => {
            if (!notaNaturale) return;
            if (voce) {
              notaNaturale.textContent = "Confronto: adesso parla " + voce.nome + ". La frase è la stessa per tutte e due.";
              return;
            }
            vp.aggiornaNaturale().then((st) => disegnaNaturale(st));
          });
          if (!avviato && A.toast) A.toast("Servono due voci installate per il confronto.");
        });
      }

      // Il pannello delle voci si apre dal processo principale: la pagina non
      // può lanciare da sola i collegamenti di sistema.
      const imposta = document.getElementById("voiceImpostazioni");
      if (imposta) imposta.addEventListener("click", () => {
        const d = window.npDesktop;
        const apri = d && d.sistema && d.sistema.impostazioniVoce;
        if (typeof apri !== "function") { if (A.toast) A.toast("Le impostazioni voce si aprono dal sistema."); return; }
        Promise.resolve(apri()).then((r) => {
          if (A.toast) A.toast(r && r.ok ? "Aperte le impostazioni voce del sistema." : "Non sono riuscito ad aprire le impostazioni: cercale nel sistema.");
        }).catch(() => { if (A.toast) A.toast("Non sono riuscito ad aprire le impostazioni."); });
      });

      document.addEventListener("np:voci", () => { disegnaNaturale(); riempiVoci(); });

      const stop = document.getElementById("neuraStop");
      if (stop) stop.addEventListener("click", () => {
        const fermato = vp.ferma();
        if (A.toast) A.toast(fermato ? "Voce fermata." : "Nessuna voce in corso.");
      });
    }
  };

  views.sendNeura = send;
})();
