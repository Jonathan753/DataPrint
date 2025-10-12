const path = require("path");
const Database = require("better-sqlite3");

// cria (ou abre) o banco no diretório da aplicação
const dbPath = path.join(__dirname, "storage.db");
const db = new Database(dbPath);

// exemplo: criar tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    clientId INTEGER PRIMARY KEY AUTOINCREMENT,
    cnpj_cpf VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    company VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    adress VARCHAR(100) NOT NULL,
    number VARCHAR(10) NOT NULL,
    neighborhood VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    uf VARCHAR(10) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    complement VARCHAR(100),
    phone VARCHAR(20),
    cell VARCHAR(20),
    active BOOLEAN NOT NULL
  );

  CREATE TABLE IF NOT EXISTS services (
  serviceId INTEGER PRIMARY KEY AUTOINCREMENT,
  service TEXT NOT NULL,
  value INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS myInfo (
    myInfoId INTEGER PRIMARY KEY CHECK (myInfoId=1),
    cnpj VARCHAR(10),
    name VARCHAR(50),
    salesperson VARCHAR(50),
    email VARCHAR(150),
    adress VARCHAR(100),
    number VARCHAR(10),
    cep VARCHAR(50),
    city VARCHAR(50),
    uf VARCHAR(2),
    phone VARCHAR(20),
    cell VARCHAR(20),
    pix VARCHAR(50)
  );

  CREATE TABLE IF NOT EXISTS receipts (
  receiptId INTEGER PRIMARY KEY AUTOINCREMENT,
  clientId INTEGER,
  date TEXT,
  totalBruto INTEGER NOT NULL,
  desconto INTEGER DEFAULT 0,
  acrescimo INTEGER DEFAULT 0,
  obs TEXT,
  totalLiquido INTEGER NOT NULL,
  FOREIGN KEY (clientId) REFERENCES clients(clientId)
  );

  CREATE TABLE IF NOT EXISTS receipt_services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  receiptId INTEGER NOT NULL,
  serviceId INTEGER NOT NULL,
  qtd INTEGER NOT NULL DEFAULT 1,
  valueUnitario INTEGER NOT NULL,
  valueTotal INTEGER NOT NULL,
  FOREIGN KEY (receiptId) REFERENCES receipts(receiptId),
  FOREIGN KEY (serviceId) REFERENCES services(serviceId)
);
`);

module.exports = db;
