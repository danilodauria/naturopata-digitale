/* ==========================================================================
   Naturopata Digitale · contenitore desktop
   Carica l'app statica da desktop/app, senza server e senza rete.
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

const HOME = path.join(__dirname, "app", "index.html");

function isExternal(url) {
  return /^https?:\/\//i.test(url);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1240,
    height: 840,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: "#f5f1e6",
    title: "Naturopata Digitale",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false
    }
  });

  win.once("ready-to-show", () => win.show());
  win.loadFile(HOME);

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isExternal(url)) shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith("file://")) return;
    if (isExternal(url)) shell.openExternal(url);
    event.preventDefault();
  });

  return win;
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
