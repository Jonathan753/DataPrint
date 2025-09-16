const path = require("path");
const Database = require("better-sqlite3");

// cria (ou abre) o banco no diretório da aplicação
const dbPath = path.join(__dirname, "app.db");
const db = new Database(dbPath);

// exemplo: criar tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cnpj_cpf VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    razao VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    adress VARCHAR(100) NOT NULL,
    number VARCHAR(10) NOT NULL,
    neighborhood VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    complemento VARCHAR(100),
    phone VARCHAR(20),
    cell VARCHAR(20)
  );

  CREATE TABLE IF NOT EXISTS service (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  servico TEXT NOT NULL,
  value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS myInfo (
    id INTEGER PRIMARY KEY CHECK (id=1),
    cnpj VARCHAR(10),
    name VARCHAR(50),
    email VARCHAR(150),
    adress VARCHAR(100),
    number VARCHAR(10),
    cep VARCHAR(50),
    city VARCHAR(50),
    uf VARCHAR(2),
    phone VARCHAR(20),
    cell VARCHAR(20)
  );
`);

module.exports = db;
