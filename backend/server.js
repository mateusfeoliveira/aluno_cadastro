const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Banco SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao abrir banco:', err.message);
  } else {
    console.log('Conectado ao banco SQLite.');
  }
});

// Criar tabela alunos se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER,
    curso TEXT
  )
`);

// Listar todos os alunos
// app.get('/api/alunos', (req, res) => {
//   const query = 'SELECT * FROM alunos';
//   db.all(query, [], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(rows);
//   });
// });

app.get('/api/alunos', (req, res) => {
  const { curso } = req.query;
  let query = 'SELECT * FROM alunos';
  const params = [];

  if (curso) {
    query += ' WHERE curso = ?';
    params.push(curso);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Criar novo aluno
app.post('/api/alunos', (req, res) => {
  const { nome, idade, curso } = req.body;
  const query = 'INSERT INTO alunos (nome, idade, curso) VALUES (?, ?, ?)';
  db.run(query, [nome, idade, curso], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Retorna o aluno criado completo no JSON
    res.status(201).json({ id: this.lastID, nome, idade, curso });
  });
});

// Editar aluno
app.put('/api/alunos/:id', (req, res) => {
  const id = req.params.id;
  const { nome, idade, curso } = req.body;
  const query = 'UPDATE alunos SET nome = ?, idade = ?, curso = ? WHERE id = ?';
  db.run(query, [nome, idade, curso, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.json({ message: 'Aluno atualizado com sucesso' });
  });
});

// Deletar aluno
app.delete('/api/alunos/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM alunos WHERE id = ?';
  db.run(query, id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.json({ message: 'Aluno excluído com sucesso' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});