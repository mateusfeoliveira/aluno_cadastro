// Importa o módulo SQLite3 e ativa o modo "verbose" para mostrar mais detalhes de erros
const sqlite3 = require('sqlite3').verbose();

// Cria/abre o banco de dados "alunos.db" (criado na pasta raiz caso não exista)
const db = new sqlite3.Database('./alunos.db');

// Criação da tabela, se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS alunos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      idade INTEGER,
      curso TEXT
    )
  `);
});

module.exports = db;