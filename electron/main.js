const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db');


// criar usuario
ipcMain.handle("clients:add", (e, client) => {
    const stmt = db.prepare(`
    INSERT INTO clients (
      id, cnpj_cpf, name, razao, email, adress, number, neighborhood,
      city, uf, complemento, phone, cell
    ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    stmt.run(
        client.id,
        client.cnpj_cpf,
        client.name,
        client.razao,
        client.email,
        client.adress,
        client.number,
        client.neighborhood,
        client.city,
        client.uf,
        client.complemento,
        client.phone,
        client.cell
    );

    return { success: true };
});

ipcMain.handle("clients:all", () => {
    const stmt = db.prepare("SELECT * FROM clients");
    return stmt.all();
});

////////////////////// criar myInfo //////////////////////////
ipcMain.handle("myInfo:get", () => {
    const stmt = db.prepare("SELECT * FROM myInfo WHERE id = 1");
    return stmt.get();
});

ipcMain.handle("myInfo:save", (e, data) => {
    const exists = db.prepare("SELECT 1 FROM myInfo WHERE id = 1").get();

    if (exists) {
        const stmt = db.prepare(`
      UPDATE myInfo SET
        cnpj = ?, name = ?, razao = ?, email = ?, adress = ?,
        number=?, neighborhood = ?, city = ?, uf = ?, complemento = ?, 
        phone = ?, cell =?
      WHERE id = 1
    `);
        stmt.run(
            data.cnpj, data.name, data.razao, data.email, data.adress,
            data.number, data.neighborhood, data.city, data.uf, data.complemento,
            data.phone, data.cell
        );
    } else {
        const stmt = db.prepare(`
      INSERT INTO empresa (
        id, cnpj , name , razao , email , adress,
        number, neighborhood, city, uf, complemento, 
        phone, cell
      ) VALUES (
        1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);
        stmt.run(
            data.cnpj, data.name, data.razao, data.email, data.adress,
            data.number, data.neighborhood, data.city, data.uf, data.complemento,
            data.phone, data.cell
        );
    }

    return { success: true };
});


////////////////////////////////////////////////// criar Servico
ipcMain.handle("services:add", (e, service) => {
    const stmt = db.prepare(`
    INSERT INTO myInfo (
      id, servico, value
    ) VALUES (?, ?, ?)
  `);

    stmt.run(
        service.id,
        service.servico,
        service.value,
    );

    return { success: true };
});

ipcMain.handle("services:all", () => {
    const stmt = db.prepare("SELECT * FROM service");
    return stmt.all();
});





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
        // titleBarStyle: 'hidden'
        // frame: false
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

//TitleBar
// ipcMain.on('minimize-app', () => {
//     BrowserWindow.getFocusedWindow()?.minimize();
// });

// ipcMain.on('maximize-app', () => {
//     const win = BrowserWindow.getFocusedWindow();
//     if (win?.isMaximized()) {
//         win.unmaximize();
//     } else {
//         win?.maximize();
//     }
// });

// ipcMain.on('close-app', () => {
//     BrowserWindow.getFocusedWindow()?.close();
// });