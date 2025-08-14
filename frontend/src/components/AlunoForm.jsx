import { useState, useEffect } from "react";

// Formulário de cadastro/edição de alunos.
const AlunoForm = ({ onSave, alunoSelecionado, limparSelecionado }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [curso, setCurso] = useState('');

  // useEffect para preencher o formulário quando um aluno for selecionado para edição.
  // Caso não haja aluno selecionado, o formulário é resetado.
  useEffect(() => {
    if (alunoSelecionado) {
      setNome(alunoSelecionado.nome);
      setIdade(alunoSelecionado.idade);
      setCurso(alunoSelecionado.curso);
    } else {
      setNome('');
      setIdade('');
      setCurso('');
    }
  }, [alunoSelecionado]);

  // Função para tratar o envio do formulário.
  const handleSubmit = (e) => {
    e.preventDefault();
      // Garante que idade seja número e envia o ID apenas se for edição
    onSave({ 
      id: alunoSelecionado?.id, 
      nome, 
      idade: parseInt(idade), 
      curso 
    });

    limparSelecionado();
  };

  return (
    <form onSubmit={handleSubmit}>
    {/* Título muda dinamicamente se for cadastro ou edição */}
      <h2>{alunoSelecionado ? "Editar Aluno" : "Cadastrar Aluno"}</h2>

      <label>Nome:</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <label>Idade:</label>
      <input
        type="number"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        required
      />

      <label>Curso:</label>
      <input
        type="text"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
        required
      />

      <button type="submit">{alunoSelecionado ? "Atualizar" : "Salvar"}</button>
    </form>
  );
};

export default AlunoForm;