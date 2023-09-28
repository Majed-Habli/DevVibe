const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Electron",
    width: "1000",
    height: "600",
    webPreferences: {
      // Disable web security (not recommended for production)
      webSecurity: false,
    },
  });

  mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
  });
  mainWindow.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createMainWindow();
});
