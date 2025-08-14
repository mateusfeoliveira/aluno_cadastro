// Lista de alunos em formato de tabela.
const AlunoList = ({ alunos, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Lista de Alunos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Cursos</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((aluno) => (
                        <tr key={aluno.id}>
                            <td>{aluno.nome}</td>
                            <td>{aluno.idade}</td>
                            <td>{aluno.curso}</td>
                            <td>
                                <button onClick={() => onEdit(aluno)}>Editar</button>
                                <button onClick={() => onDelete(aluno.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlunoList;