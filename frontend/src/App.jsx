import { useEffect, useState } from "react";
import AlunoForm from "./components/AlunoForm";
import AlunosList from "./components/AlunosList";
import api from './services/api';
import './App.css';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const carregarAlunos = async () => {
    try {
      const res = await api.get('/alunos'); // endpoint correto
      setAlunos(res.data);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const salvarAlunos = async (aluno) => {
    try {
      if (aluno.id) {
        await api.put(`/alunos/${aluno.id}`, aluno);
      } else {
        await api.post('/alunos', aluno);
      }
      window.location.reload(); // força refresh da tela
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
    }
  };

  const excluirAluno = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir ?")) {
      try {
        await api.delete(`/alunos/${id}`);
        window.location.reload(); // força refresh da tela
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Alunos</h1>
      <AlunoForm
        onSave={salvarAlunos}
        alunoSelecionado={alunoSelecionado}
        limparSelecionado={() => setAlunoSelecionado(null)}
      />
      <AlunosList
        alunos={alunos}
        onEdit={(aluno) => setAlunoSelecionado(aluno)}
        onDelete={excluirAluno}
      />
    </div>
  );
}

export default App;