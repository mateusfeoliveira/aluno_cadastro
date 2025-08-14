const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/alunos
router.get('/', (req, res) => {
  db.all('SELECT * FROM alunos', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
    res.json(rows);
  });
});

// POST /api/alunos
router.post('/', (req, res) => {
  const { nome, idade, curso } = req.body;

  if (!nome || !idade || !curso) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  db.run(
    'INSERT INTO alunos (nome, idade, curso) VALUES (?, ?, ?)',
    [nome, idade, curso],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Erro ao cadastrar aluno' });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

module.exports = router;