const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db');
const fs = require('node:fs');

//////////////////////////// CLIENT /////////////////////////////

// Adicionar CLient
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

//Listar CLient com paginação e filtro
ipcMain.handle("clients:all", (e, { page, limit, searchTerm }) => {

  const offset = (page - 1) * limit;
  const params = [];

  let countSql = `SELECT COUNT(*) as total FROM clients`;
  let dataSql = `SELECT * FROM clients`;

  if (searchTerm) {
    const whereClause = ` WHERE name LIKE ?`;
    countSql += whereClause;
    dataSql += whereClause;
    params.push(`%${searchTerm}%`);
  }

  dataSql += ` ORDER BY clientId DESC`;
  dataSql += ` LIMIT ? OFFSET ?`;

  const dataParams = [...params, limit, offset];

  const countStmt = db.prepare(countSql);
  const { total } = countStmt.get(params);

  const dataStmt = db.prepare(dataSql);
  const data = dataStmt.all(dataParams);

  return { data, totalItems: total };
});

// Mostro o tatal de clientes
ipcMain.handle("clients:totalNumber", () => {
  const stmt = db.prepare("SELECT COUNT(*) AS total FROM clients");
  const result = stmt.get();
  return result.total;
});

//Seleciona o client com base no ID
ipcMain.handle("clients:getById", (e, id) => {
  const stmt = db.prepare("SELECT * FROM clients WHERE clientId = ?");
  return stmt.get(id);
});

//Deleta o cliente
ipcMain.handle("clients:delete", (e, id) => {
  const stmt = db.prepare("DELETE FROM clients WHERE clientId = ?");
  stmt.run(id);
  return { success: true }
});

//Altera os dados do cliente
ipcMain.handle("clients:update", async (e, client) => {
  const stmt = db.prepare(`
    UPDATE clients SET cnpj_cpf = ?, name = ?, company = ?, email = ?, adress = ?, number = ?, neighborhood = ?,
      city = ?, uf = ?, cep = ?, complement = ?, phone = ?, cell = ? WHERE clientId = ?
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
    client.cell,
    client.clientId
  );

  return { success: true };
});

//////////////////////////// MY INFO ////////////////////////////////////
//Pega a informação da Empresa
ipcMain.handle("myInfo:get", () => {
  const stmt = db.prepare("SELECT * FROM myInfo WHERE myInfoId = 1");
  return stmt.get();
});

//Salva ou Altera a informação da empresa
ipcMain.handle("myInfo:save", (e, data) => {
  const exists = db.prepare("SELECT 1 FROM myInfo WHERE myInfoId = 1").get();

  if (exists) {
    const stmt = db.prepare(`
      UPDATE myInfo SET
        cnpj = ?, name = ?,salesperson =?, email = ?, adress = ?,
        number=?, cep = ?, city = ?, uf = ?, phone = ?, cell =?, pix =?
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
      data.cell,
      data.pix
    );
  } else {
    const stmt = db.prepare(`
      INSERT INTO myInfo (
        myInfoId, cnpj , name ,salesperson, email , adress,
        number, cep, city, uf, phone, cell, pix
      ) VALUES (
        1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
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
      data.cell,
      data.pix
    );
  }

  return { success: true };
});


////////////////////////// Servico ///////////////////////////////
//Adiciona um serviço
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

//Lista os serviços com paginação e filtro
ipcMain.handle("services:all", (e, { page, limit, searchTerm }) => {

  const offset = (page - 1) * limit;
  const params = [];

  let countSql = `SELECT COUNT(*) as total FROM services`;
  let dataSql = `SELECT * FROM services`;

  if (searchTerm) {
    const whereClause = ` WHERE name LIKE ?`;
    countSql += whereClause;
    dataSql += whereClause;
    params.push(`%${searchTerm}%`);
  }

  dataSql += ` ORDER BY serviceId DESC`;
  dataSql += ` LIMIT ? OFFSET ?`;

  const dataParams = [...params, limit, offset];

  const countStmt = db.prepare(countSql);
  const { total } = countStmt.get(params);

  const dataStmt = db.prepare(dataSql);
  const data = dataStmt.all(dataParams);

  return { data, totalItems: total };
});

//Busca para Adicionar na nota
ipcMain.handle("services:search", (e, term) => {
  const stmt = db.prepare(`SELECT * FROM services WHERE service LIKE ?`);
  return stmt.all(`%${term}%`);
});

//Alterar dado do serviço
ipcMain.handle("services:update", (e, data) => {
  const stmt = db.prepare(`
    UPDATE services SET service = ?,value = ? WHERE serviceId = ?
  `);

  stmt.run(
    data.service,
    data.value,
    data.serviceId,
  );


  return { success: true };
});

//Seleciona o serviço
ipcMain.handle("services:getById", (e, id) => {
  const stmt = db.prepare("SELECT * FROM services WHERE serviceId = ?");
  return stmt.get(id);
});
/////////////////////////////// RECEIPT //////////
//Adiona a nota no BD
ipcMain.handle("receipt:add", async (e, data) => {

  const insertReceipt = db.prepare(`
      INSERT INTO receipts (clientId, date, totalBruto, desconto, acrescimo, totalLiquido)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

  const result = insertReceipt.run(
    data.clientId,
    data.dataEmissao,
    data.totalBruto,
    data.desconto,
    data.acrescimo,
    data.totalLiquido
  );

  const receiptId = result.lastInsertRowid;

  const insertItem = db.prepare(`
      INSERT INTO receipt_services (receiptId, serviceId, qtd, valueUnitario, valueTotal)
      VALUES (?, ?, ?, ?, ?)
    `);

  for (const item of data.services) {
    insertItem.run(
      receiptId,
      item.serviceId,
      item.qtd,
      item.valueUnitario,
      item.valueTotal
    );
  }

  return { success: true, receiptId };
});

//Apresenta lista de Nota
ipcMain.handle("receipt:all", () => {

  const stmt = db.prepare(`
    SELECT 
      n.receiptId,
      n.clientId,
      c.name AS clientName,
      n.totalLiquido,
      n.date AS date
    FROM receipts n
    JOIN clients c ON c.clientId = n.clientId
    ORDER BY n.receiptId DESC
  `);

  return stmt.all();
});

//Apresenta as Notas com base no ID do client
ipcMain.handle("receipt:getClient", (e, id) => {
  const stmt = db.prepare("SELECT * FROM receipts WHERE clientId = ?");
  return stmt.all(id);
});

//Saber o maximo de notas
ipcMain.handle("receipt:getMaxNumber", () => {
  const stmt = db.prepare("SELECT MAX(receiptId) as maxId FROM receipts");
  const result = stmt.get();
  return result?.maxId || 0;
});


ipcMain.handle("receipt:paginated", (e, { page, limit, searchTerm }) => {
  // Calcula o OFFSET para pular os itens das páginas anteriores
  const offset = (page - 1) * limit;

  // Parâmetros para a query SQL. Usamos um array para construir de forma segura.
  const params = [];

  // Base da query para buscar o total de itens (para calcular o total de páginas)
  let countSql = `
    SELECT COUNT(*) as total
    FROM receipts n
    JOIN clients c ON c.clientId = n.clientId
  `;

  // Base da query para buscar os dados da página atual
  let dataSql = `
    SELECT 
      n.receiptId,
      n.clientId,
      c.name AS clientName,
      n.totalLiquido,
      n.totalBruto,
      n.date AS date
    FROM receipts n
    JOIN clients c ON c.clientId = n.clientId
  `;

  // Se um termo de busca for fornecido, adiciona a condição WHERE
  if (searchTerm) {
    const whereClause = ` WHERE c.name LIKE ?`;
    countSql += whereClause;
    dataSql += whereClause;
    params.push(`%${searchTerm}%`); // O '%' é o coringa para o LIKE
  }

  // Ordena os resultados
  dataSql += ` ORDER BY n.receiptId DESC`;

  // Adiciona a paginação (LIMIT e OFFSET) na query de dados
  dataSql += ` LIMIT ? OFFSET ?`;

  // Adiciona os parâmetros de paginação
  const dataParams = [...params, limit, offset];

  // Executa as queries
  const countStmt = db.prepare(countSql);
  const { total } = countStmt.get(params); // Conta o total de itens que correspondem ao filtro

  const dataStmt = db.prepare(dataSql);
  const data = dataStmt.all(dataParams); // Busca os itens da página atual

  return { data, totalItems: total }; // Retorna os dados e o total de itens
});

//Lista de Notas de um cliente
ipcMain.handle("receipt:client", (e, { page, limit, id }) => {

  const clientId = Number(id);
  if (isNaN(clientId)) {
    return { data: [], totalItems: 0 };
  }
  const offset = (page - 1) * limit;

  const countSql = `SELECT COUNT(*) as total FROM receipts WHERE clientId = ?`;
  const countStmt = db.prepare(countSql);
  const { total } = countStmt.get(clientId);

  if (total === 0) {
    return { data: [], totalItems: 0 }
  }

  let dataSql = `SELECT * FROM receipts WHERE clientId = ? ORDER BY receiptId DESC LIMIT ? OFFSET ?`;

  const dataStmt = db.prepare(dataSql);
  const data = dataStmt.all(clientId, limit, offset); // Busca os itens da página atual
  return { data, totalItems: total }; // Retorna os dados e o total de itens
});
/////////////////////////
ipcMain.handle("receipt_services:getById", (e, id) => {
  const stmt = db.prepare("SELECT * FROM receipt_services WHERE receiptId = ?");
  return stmt.all(id);
});

ipcMain.handle("receipt_services:all", () => {
  const stmt = db.prepare("SELECT * FROM receipt_services");
  return stmt.all();
});


//////////////////// Aplicação principal do electron
const isDev = !!process.env.ELECTRON_START_URL; // setado no script de dev

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    // titleBarStyle: 'hiddenInset',
    titleBarStyle: 'hidden',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Funções da barra de navegação (TitleBar)
  ipcMain.on('minimize-app', () => {
    win.minimize();
  });

  ipcMain.on('maximize-app', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('close-app', () => {
    win.close();
  });


  if (isDev) {
    win.loadURL(process.env.ELECTRON_START_URL);
    win.webContents.openDevTools();
  } else {
    // IMPORTANTÍSSIMO: com Vite, use base './' (ver passo 4)
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // exemplo de IPC (só pra provar que o preload funciona)
  ipcMain.handle('ping', () => 'pong');

}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
