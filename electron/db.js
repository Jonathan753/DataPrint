const path = require("path");
const Database = require("better-sqlite3");

// cria (ou abre) o banco no diretório da aplicação
const dbPath = path.join(__dirname, "app.db");
const db = new Database(dbPath);

// exemplo: criar tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(10) PRIMARY KEY UNIQUE NOT NULL,
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
`);

module.exports = db;
