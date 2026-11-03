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

    A.page(
      '<div class="page-head" style="margin-bottom:1.4rem"><p class="eyebrow">Neura · intelligenza locale</p><h1>Chiedi, capisci, controlla.</h1>' +
        '<p class="lead">Un assistente che lavora solo sui contenuti di questo programma. Niente cloud, niente account: le tue domande restano qui.</p></div>' +
      '<div class="neura-layout">' +
        '<section class="chat-panel" aria-label="Conversazione con Neura">' +
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

          '<div class="card voice-panel">' +
            "<h2>Voce</h2>" +
            '<p class="text-small">Il pulsante dell\'altoparlante in alto attiva o disattiva la lettura. Puoi fermarla con Stop, con «Ferma l\'audio» nella barra in alto o con Esc.</p>' +
            '<label class="voice-label" for="voiceSelect">Voce del dispositivo</label>' +
            '<select class="select" id="voiceSelect"><option value="">Automatica (consigliata)</option></select>' +
            '<div class="voice-ritmo"><label class="voice-label" for="voiceRitmo">Velocità di lettura</label>' +
              '<div class="ritmo-riga"><input type="range" id="voiceRitmo" min="0.7" max="1.4" step="0.05" value="1" aria-describedby="voiceRitmoValore"><output class="ritmo-valore" id="voiceRitmoValore" for="voiceRitmo">100%</output></div>' +
              '<p class="text-small muted mb-0">Vale per tutte le voci del sistema.</p></div>' +
            '<p class="text-small muted" id="voiceNote">Voci lette dal sistema: in lettura…</p>' +
            '<div class="pill-row"><button type="button" class="chip" id="voiceRileggi" title="Rilegge l\'elenco delle voci installate">Rileggi l\'elenco</button></div>' +
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
      selVoce.innerHTML = '<option value="">Automatica (consigliata)</option>' +
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
        const scelta = vp.impostaVoce(selVoce.value);
        if (A.toast) A.toast(selVoce.value ? "Voce impostata: " + selVoce.value + "." : (scelta ? "Torno alla voce automatica." : "Nessuna voce: Neura resta muta."));
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

      document.addEventListener("np:voci", riempiVoci);

      const stop = document.getElementById("neuraStop");
      if (stop) stop.addEventListener("click", () => {
        const fermato = vp.ferma();
        if (A.toast) A.toast(fermato ? "Voce fermata." : "Nessuna voce in corso.");
      });
    }
  };

  views.sendNeura = send;
})();
