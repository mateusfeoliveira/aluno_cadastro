// Importa o framework Express
const express = require('express');

// Cria um roteador para gerenciar rotas específicas
const router = express.Router();

// Importa a conexão com o banco de dados SQLite
const db = require('../db/database');

//  ROTA: GET /api/alunos
router.get('/', (req, res) => {
  db.all('SELECT * FROM alunos', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
    // Retorna os resultados como JSON
    res.json(rows);
  });
});

// ROTA: POST /api/alunos

router.post('/', (req, res) => {
  const { nome, idade, curso } = req.body; 

  // Validação básica para garantir que todos os campos foram enviados

  if (!nome || !idade || !curso) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Executa comando SQL para inserir o novo aluno
  db.run(
    'INSERT INTO alunos (nome, idade, curso) VALUES (?, ?, ?)',
    [nome, idade, curso],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Erro ao cadastrar aluno' });
      }
      // Retorna o ID do novo aluno criado
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Exporta o roteador para ser usado no servidor principal
module.exports = router;