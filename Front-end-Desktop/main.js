const { app, screen, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    icon: "./dev-swipe-desktop/public/Logo1-0.ico",
    width,
    height,
    webPreferences: {
      webSecurity: false,
    },
  });
  mainWindow.on("page-title-updated", function (e) {
    e.preventDefault();
  });

  // mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    protocol: "file",
  });
  mainWindow.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createMainWindow();
});
