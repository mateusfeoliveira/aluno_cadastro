const sqlite3 = require('sqlite3').verbose();
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