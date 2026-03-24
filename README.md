# API de Gerenciamento de Livros (Trabalho 2)

Esta é uma API REST completa desenvolvida para a disciplina, implementando operações de CRUD (Create, Read, Update, Delete) para um catálogo de livros.

##  Diferenciais Implementados
- **Soft Delete (Exemplo Bônus):** Ao invés de excluir o registro permanentemente (Hard Delete com `splice`), o método DELETE altera a flag `deletado` para `true`. O endpoint GET foi ajustado para filtrar e não exibir livros deletados. O status retornado no delete é o `204 No Content`.
- **Validações Completas:** Verificação de campos obrigatórios (`titulo`, `autor`, `genero`) nos métodos POST e PUT.
- **Tratamento de Erros:** Utilização correta dos HTTP Status Codes (`400 Bad Request`, `404 Not Found`, `201 Created`, `204 No Content`).

## Endpoints

| Método   | Rota | Descrição | Status de Sucesso |
| :---     | :--- | :---      | :---              |
| `GET`    | `/api/livros` | Retorna todos os livros ativos. | `200 OK` |
| `GET`    | `/api/livros/:id` | Retorna um livro específico pelo ID. | `200 OK` |
| `POST`   | `/api/livros` | Cria um novo livro. Requer body com dados. | `201 Created` |
| `PUT`    | `/api/livros/:id` | Atualiza um livro existente. Requer body. | `200 OK` |
| `DELETE` | `/api/livros/:id` | Realiza o *soft delete* do livro. | `204 No Content` |

## Como executei o projeto

1. Ter o [Node.js](https://nodejs.org/) instalado.
2. Clonei este repositório.
3. Abri o terminal na pasta do projeto e instalei as dependências:
   ```bash
   npm install express
