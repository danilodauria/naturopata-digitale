/* ==========================================================================
   Naturopata Digitale · benvenuto di Neura
   Licenza del codice: MIT · Danilo D'Auria
   --------------------------------------------------------------------------
   All'apertura Neura si presenta in una scheda discreta, chiudibile e che non
   blocca nulla. La voce usa il sintetizzatore del dispositivo; chi non vuole
   ascoltare può fermarla o nascondere la scheda per sempre.
   ========================================================================== */

(function () {
  "use strict";

  const A = NP && NP.app;
  if (!A) return;

  const CHIAVE_NASCOSTO = A.PREFIX + "welcome-nascosto";
  const CHIAVE_SESSIONE = A.PREFIX + "welcome-visto";

  const TESTO = "<p><strong>Ciao, sono Neura.</strong> Sono l'assistente locale di Naturopata Digitale: leggo le schede delle piante, il manuale e le tabelle di sicurezza, e provo a risponderti con chiarezza.</p>" +
    "<p>Non sono un medico, non faccio diagnosi e non invento risposte. Conosco ogni pagina di questo programma e non mando niente in rete.</p>" +
    '<p class="mb-0">Cominciamo da una domanda semplice: <strong>che pianta ti interessa?</strong></p>';

  const PRESENTAZIONE = "Sono Neura, l'assistente locale di Naturopata Digitale. Leggo le schede delle piante, il manuale e le tabelle di sicurezza. Non sono un medico, non faccio diagnosi e non invento risposte. Cominciamo da una domanda semplice: che pianta ti interessa?";

  function leggi(chiave) {
    try { return localStorage.getItem(chiave); } catch (e) { return null; }
  }

  function scrivi(chiave, valore) {
    try { localStorage.setItem(chiave, valore); } catch (e) { /* storage negato */ }
  }

  function giaVista() {
    try { return sessionStorage.getItem(CHIAVE_SESSIONE) === "1"; } catch (e) { return false; }
  }

  function segnaVista() {
    try { sessionStorage.setItem(CHIAVE_SESSIONE, "1"); } catch (e) { /* niente */ }
  }

  function parla() {
    if (NP.voce && NP.voce.parla(PRESENTAZIONE)) return true;
    return false;
  }

  function chiudi(pannello, definitivo) {
    if (definitivo) scrivi(CHIAVE_NASCOSTO, "1");
    if (NP.voce) NP.voce.fermaVoce();
    pannello.classList.remove("is-open");
    window.setTimeout(function () { pannello.remove(); }, 200);
  }

  function costruisci() {
    const pannello = document.createElement("aside");
    pannello.className = "welcome-panel is-open no-print";
    pannello.setAttribute("role", "complementary");
    pannello.setAttribute("aria-label", "Benvenuto di Neura");

    pannello.innerHTML =
      '<div class="welcome-head"><span class="welcome-orb" aria-hidden="true"></span>' +
        '<div><strong>Neura</strong><span class="welcome-role">ascolto guidato</span></div>' +
        '<button type="button" class="welcome-x" data-welcome="close" aria-label="Chiudi il benvenuto">×</button></div>' +
      '<div class="welcome-body">' + TESTO + "</div>" +
      '<div class="welcome-actions">' +
        '<button type="button" class="btn btn-secondary btn-small" data-welcome="speak">' + A.ico("wave") + "Ascolta</button>" +
        '<a class="btn btn-ghost btn-small" href="#/neura" data-welcome="chat">Parla con Neura</a>' +
        '<button type="button" class="btn btn-ghost btn-small" data-welcome="hide">Non mostrarmelo più</button>' +
      "</div>";

    document.body.appendChild(pannello);

    pannello.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-welcome]");
      if (!btn) return;
      const azione = btn.getAttribute("data-welcome");
      if (azione === "speak") { parla(); return; }
      if (azione === "chat") { chiudi(pannello, false); return; }
      chiudi(pannello, azione === "hide");
    });

    return pannello;
  }

  function avvia() {
    if (leggi(CHIAVE_NASCOSTO) === "1") return;
    if (giaVista()) return;

    const pannello = costruisci();
    segnaVista();

    const supporto = NP.voce && NP.voce.supporto ? NP.voce.supporto() : { voce: false };
    if (supporto.voce) {
      window.setTimeout(function () {
        if (document.body.contains(pannello)) parla();
      }, 700);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", avvia);
  } else {
    avvia();
  }
})();
