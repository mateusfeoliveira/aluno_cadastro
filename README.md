 Teste Prático — Cadastro de Alunos

## 📚 Parte Teórica

### 1. Diferença entre `var`, `let` e `const` no JavaScript
Todas as palavras-chave mencionadas no enunciado são usadas para declarar variáveis, mas apresentam diferenças significativas em relação ao escopo e à reatribuição.  
- **`var`**: Escopo global ou de função. Sofre *hoisting*, mas inicializa como `undefined`.  
- **`let`**: Escopo de bloco. Sofre *hoisting*, mas entra em *Temporal Dead Zone* até a declaração.  
- **`const`**: Semelhante ao `let` no escopo, mas não permite reatribuição. Objetos/arrays podem ter conteúdo alterado.

---

### 2. O que é async/await e como facilita o trabalho com código assíncrono?
`async` declara uma função assíncrona, que retorna sempre uma *Promise*.  
`await` pausa a execução até que a *Promise* seja resolvida ou rejeitada, permitindo escrever código assíncrono de forma sequencial e mais legível, geralmente junto a `try/catch` para tratamento de erros.

---

### 3. O que é uma API e seu papel na comunicação entre frontend e backend?
API (*Application Programming Interface*) é um intermediário que permite que sistemas diferentes troquem dados ou funcionalidades sem conhecer detalhes internos um do outro. No contexto web, o frontend faz requisições para a API, que processa, acessa banco de dados ou outros serviços e retorna as respostas para o frontend.

---

### 4. Dois métodos HTTP e seus usos
- **GET**: Solicita dados do servidor sem alterar o estado do recurso. Usado para buscar informações.  
- **POST**: Envia dados ao servidor para criar ou atualizar recursos. Usado para cadastro, envio de formulários, etc.

---

### 5. Tratamento de respostas do backend
**a) Sucesso**: Exibir os dados retornados e/ou mensagem de sucesso, como “Operação concluída com sucesso”.  
**b) Erro**:  
- 404: Mensagem clara como “Recurso não encontrado”.  
- 500: Mensagem genérica “Erro no servidor, tente novamente mais tarde”.  
**c) Resposta lenta**: Mostrar indicador de carregamento (*loading*) e definir um *timeout* para cancelar requisições muito demoradas, informando ao usuário.

---

## 🛠 Parte Prática — Cadastro de Alunos

Aplicação **fullstack** simples para gerenciar alunos (CRUD), com backend em **Node.js + Express + SQLite** e frontend em **React + Vite**.

### Funcionalidades
- 📌 Cadastrar novo aluno (nome, idade, curso)
- 📋 Listar todos os alunos
- ✏️ Editar aluno
- 🗑️ Excluir aluno
- 💾 Banco de dados SQLite (arquivo local)

---

## 🚀 Como executar

### Requisitos
- Node.js LTS (versão 20 recomendada)
- npm

### 1️⃣ Backend
```bash
cd backend
npm install
npm run dev    # ou node server.js
# Servirá em http://localhost:3000