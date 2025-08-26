const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const isDev = !!process.env.ELECTRON_START_URL; // setado no script de dev

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (isDev) {
        win.loadURL(process.env.ELECTRON_START_URL);
        win.webContents.openDevTools();
    } else {
        // IMPORTANTÍSSIMO: com Vite, use base './' (ver passo 4)
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

// exemplo de IPC (só pra provar que o preload funciona)
ipcMain.handle('ping', () => 'pong');

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
