const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db');
const fs = require('node:fs');


//////////////////////////// CLIENT /////////////////////////////
ipcMain.handle("clients:add", (e, data) => {
  const stmt = db.prepare(`
    INSERT INTO clients (
      cnpj_cpf, name, company, email, adress, number, neighborhood,
      city, uf, cep, complement, phone, cell
    ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    data.cnpj_cpf,
    data.name,
    data.company,
    data.email,
    data.adress,
    data.number,
    data.neighborhood,
    data.city,
    data.uf,
    data.cep,
    data.complement,
    data.phone,
    data.cell
  );

  return { success: true };
});

ipcMain.handle("clients:all", () => {
  const stmt = db.prepare("SELECT * FROM clients");
  return stmt.all();
});

ipcMain.handle("clients:getById", (e, id) => {
  const stmt = db.prepare("SELECT * FROM clients WHERE clientId = ?");
  return stmt.get(id);
});

ipcMain.handle("clients:delete", (e, id) => {
  const stmt = db.prepare("DELETE FROM clients WHERE clientId = ?");
  stmt.run(id);
  return { success: true }
});

ipcMain.handle("clients:update", (e, client) => {
  const stmt = db.prepare(`
    UPDATE clients SET cnpj_cpf = ?, name = ?, company = ?, email = ?, adress = ?, number = ?, neighborhood = ?,
      city = ?, uf = ?, cep = ?, complement = ?, phone = ?, cell = ?
  `);

  stmt.run(
    client.cnpj_cpf,
    client.name,
    client.company,
    client.email,
    client.adress,
    client.number,
    client.neighborhood,
    client.city,
    client.uf,
    client.cep,
    client.complement,
    client.phone,
    client.cell
  );

  return { success: true };
});

//////////////////////////// MY INFO ////////////////////////////////////
ipcMain.handle("myInfo:get", () => {
  const stmt = db.prepare("SELECT * FROM myInfo WHERE myInfoId = 1");
  return stmt.get();
});

ipcMain.handle("myInfo:save", (e, data) => {
  const exists = db.prepare("SELECT 1 FROM myInfo WHERE myInfoId = 1").get();

  if (exists) {
    const stmt = db.prepare(`
      UPDATE myInfo SET
        cnpj = ?, name = ?,salesperson =?, email = ?, adress = ?,
        number=?, cep = ?, city = ?, uf = ?, phone = ?, cell =?
      WHERE myInfoId = 1
    `);

    stmt.run(
      data.cnpj,
      data.name,
      data.salesperson,
      data.email,
      data.adress,
      data.number,
      data.cep,
      data.city,
      data.uf,
      data.phone,
      data.cell
    );
  } else {
    const stmt = db.prepare(`
      INSERT INTO myInfo (
        myInfoId, cnpj , name ,salesperson, email , adress,
        number, cep, city, uf, phone, cell
      ) VALUES (
        1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);
    stmt.run(
      data.cnpj,
      data.name,
      data.salesperson,
      data.email,
      data.adress,
      data.number,
      data.cep,
      data.city,
      data.uf,
      data.phone,
      data.cell
    );
  }

  return { success: true };
});


////////////////////////// Servico ///////////////////////////////
ipcMain.handle("services:add", (e, data) => {
  const stmt = db.prepare(`
    INSERT INTO services (
      service, value
    ) VALUES ( ?, ?)
  `);

  stmt.run(
    data.service,
    data.value,
  );

  return { success: true };
});

ipcMain.handle("services:all", () => {
  const stmt = db.prepare("SELECT * FROM services");
  return stmt.all();
});

ipcMain.handle("services:delete", (e, id) => {
  const stmt = db.prepare("DELETE FROM services WHERE serviceId = ?");
  stmt.run(id);
  return { success: true }
});

ipcMain.handle("services:search", (e, term) => {
  const stmt = db.prepare(`
    SELECT * FROM services WHERE service LIKE ?
  `);
  return stmt.all(`%${term}%`);
});

ipcMain.handle("services:update", (e, data) => {
  const stmt = db.prepare(`
    UPDATE services SET service = ?,value = ?
  `);

  stmt.run(
    data.service,
    data.value,
  );


  return { success: true };
});

/////////////////////////////////////
// // Geração de PDF
// ipcMain.handle("pdf:gerar", async (e, html) => {
//   const tempWin = new BrowserWindow({ show: false }); // janela oculta
//   await tempWin.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(html));

//   const pdfBuffer = await tempWin.webContents.printToPDF({});
//   fs.writeFileSync("nota.pdf", pdfBuffer);
//   tempWin.close();
//   return "nota.pdf";
// });

// // Impressão direta
// ipcMain.handle("pdf:imprimir", async (e, html) => {
//   const tempWin = new BrowserWindow({ show: false });
//   await tempWin.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(html));

//   tempWin.webContents.print({ silent: false }); // manda pra impressora
//   return true;
// });
////////////////////////////////////



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