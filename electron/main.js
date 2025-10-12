const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const db = require('./db');
const fs = require('node:fs');
const puppeteer = require('puppeteer');
const { gerarQrCodePixNode } = require('./pix-node');

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
ipcMain.handle("receipt:getReceipt", (e, id) => {

  const stmt = db.prepare(` SELECT * FROM receipts WHERE receiptId = ?`);
  return stmt.get(id);
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

ipcMain.handle("receipt_services:getByIdService", (e, id) => {
  const stmt = db.prepare
    (`SELECT
      s.receiptId,
      s.serviceId,
      s.qtd,
      s.valueUnitario,
      s.valueTotal,
      n.service
    FROM receipt_services s
    JOIN services n ON s.serviceId = n.serviceId
    WHERE s.receiptId = ?`);
  return stmt.all(id);
});

ipcMain.handle("receipt_services:all", () => {
  const stmt = db.prepare("SELECT * FROM receipt_services");
  return stmt.all();
});


/////////////// PDF

 // Importe a função de gerar QR Code para o Node.js

ipcMain.handle("receipt:generate-pdf", async (event, receiptId) => {
  try {
    console.log(`Gerando PDF para o recibo ID: ${receiptId}`);

    // ETAPA 1: Buscar TODOS os dados necessários
    const myInfo = db.prepare("SELECT * FROM myInfo WHERE myInfoId = 1").get();
    const receipt = db.prepare("SELECT * FROM receipts WHERE receiptId = ?").get(receiptId);
    if (!receipt) throw new Error("Recibo não encontrado");
    const client = db.prepare("SELECT * FROM clients WHERE clientId = ?").get(receipt.clientId);
    if (!client) throw new Error("Cliente não encontrado");
    const services = db.prepare(`
            SELECT s.serviceId, s.service, rs.qtd, rs.valueUnitario, rs.valueTotal
            FROM receipt_services rs
            JOIN services s ON s.serviceId = rs.serviceId
            WHERE rs.receiptId = ?
        `).all(receiptId);

    // ETAPA 2: Preparar o HTML
    let htmlTemplate = fs.readFileSync(path.join(__dirname, 'recibo-template.html'), 'utf-8');

    // Gerar QR Code e Logo em Base64 para embutir no HTML
    const qrCodeBase64 = await gerarQrCodePixNode(receipt.totalLiquido, myInfo.pix, myInfo.name, myInfo.city);
    const logoPath = path.join(__dirname, 'assets', 'logo_newDataPrint.svg'); // Crie uma pasta 'assets' e coloque seu logo lá
    const logoBase64 = `data:image/svg+xml;base64,${fs.readFileSync(logoPath, 'base64')}`;

    // Substituir os placeholders
    const dataEmissao = new Date(receipt.date);
    const replacements = {
      '{{LOGO_BASE64}}': logoBase64,
      '{{EMPRESA_NOME}}': myInfo.name || '',
      '{{EMPRESA_ENDERECO}}': `${myInfo.adress || ''}, ${myInfo.number || ''}`,
      '{{EMPRESA_CIDADE}}': myInfo.city || '',
      '{{EMPRESA_UF}}': myInfo.uf || '',
      '{{EMPRESA_CEP}}': myInfo.cep || '',
      '{{EMPRESA_TELEFONE}}': myInfo.phone || '',
      '{{EMPRESA_CELULAR}}': myInfo.cell || '',
      '{{EMPRESA_EMAIL}}': myInfo.email || '',
      '{{EMPRESA_CNPJ}}': myInfo.cnpj || '',
      '{{VENDEDOR}}': myInfo.salesperson || '',
      '{{PEDIDO_ID}}': receiptId,
      '{{DATA_EMISSAO}}': dataEmissao.toLocaleDateString('pt-BR'),
      '{{HORA_EMISSAO}}': dataEmissao.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      '{{CLIENTE_NOME}}': client.name || '',
      '{{CLIENTE_RAZAO}}': client.company || '',
      '{{CLIENTE_CNPJ_CPF}}': client.cnpj_cpf || '',
      '{{CLIENTE_ENDERECO}}': client.adress || '',
      '{{CLIENTE_NUMERO}}': client.number || '',
      '{{CLIENTE_BAIRRO}}': client.neighborhood || '',
      '{{CLIENTE_COMPLEMENTO}}': client.complement || '',
      '{{CLIENTE_CIDADE}}': client.city || '',
      '{{CLIENTE_UF}}': client.uf || '',
      '{{CLIENTE_CEP}}': client.cep || '',
      '{{CLIENTE_EMAIL}}': client.email || '',
      '{{OBSERVACOES}}': receipt.obs || 'Sem observações.',
      '{{TOTAL_BRUTO}}': (receipt.totalBruto / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      '{{DESCONTO}}': `${(receipt.desconto / 100).toFixed(2)} %`,
      '{{ACRESCIMO}}': `${(receipt.acrescimo / 100).toFixed(2)} %`,
      '{{TOTAL_LIQUIDO}}': (receipt.totalLiquido / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      '{{QRCODE_BASE64}}': qrCodeBase64,
    };
    for (const key in replacements) {
      htmlTemplate = htmlTemplate.replace(new RegExp(key, 'g'), replacements[key]);
    }

    // Montar as linhas da tabela
    const servicesRows = services.map(s => `
            <tr>
                <td>${s.serviceId}</td>
                <td>${s.service}</td>
                <td>${s.qtd}</td>
                <td>${(s.valueUnitario / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td class="text-right">${(s.valueTotal / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
        `).join('');
    htmlTemplate = htmlTemplate.replace('{{SERVICOS_ROWS}}', servicesRows);

    // ETAPA 3: Usar o Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
    await browser.close();

    // ETAPA 4: Salvar o arquivo
    const { filePath } = await dialog.showSaveDialog({ title: 'Salvar Recibo', defaultPath: `recibo-${receiptId}.pdf`, filters: [{ name: 'Arquivos PDF', extensions: ['pdf'] }] });
    if (filePath) {
      fs.writeFileSync(filePath, pdfBuffer);
      return { success: true, path: filePath };
    }
    return { success: false, error: 'Salvamento cancelado' };

  } catch (err) {
    console.error("Erro ao gerar PDF:", err);
    return { success: false, error: err.message };
  }
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
