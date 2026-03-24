const express = require('express');
const app = express();

app.use(express.json());

// Array com 10 registros iniciais de Livros (com a flag 'deletado: false' do Soft Delete)
let livros = [
    { id: 1, titulo: "1984", autor: "George Orwell", genero: "Distopia", deletado: false },
    { id: 2, titulo: "Dom Quixote", autor: "Miguel de Cervantes", genero: "Romance", deletado: false },
    { id: 3, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", genero: "Fantasia", deletado: false },
    { id: 4, titulo: "Orgulho e Preconceito", autor: "Jane Austen", genero: "Romance", deletado: false },
    { id: 5, titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", genero: "Realismo Mágico", deletado: false },
    { id: 6, titulo: "A Metamorfose", autor: "Franz Kafka", genero: "Ficção Absurda", deletado: false },
    { id: 7, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", genero: "Fábula", deletado: false },
    { id: 8, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", genero: "Fantasia", deletado: false },
    { id: 9, titulo: "O Código Da Vinci", autor: "Dan Brown", genero: "Mistério", deletado: false },
    { id: 10, titulo: "O Alquimista", autor: "Paulo Coelho", genero: "Ficção", deletado: false }
];

let proximoId = 11;

// GET /api/livros - Listar todos (Filtra para não mostrar os deletados)
app.get('/api/livros', (req, res) => {
    const livrosAtivos = livros.filter(l => !l.deletado);
    res.json(livrosAtivos);
});

// GET /api/livros/:id - Buscar por ID
app.get('/api/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id) && !l.deletado);
    
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
    
    res.json(livro);
});

// POST /api/livros - Criar novo
app.post('/api/livros', (req, res) => {
    const { titulo, autor, genero } = req.body;
    
    // Validação de dados exigida no trabalho
    if (!titulo || !autor || !genero) {
        return res.status(400).json({ erro: "Campos obrigatórios faltando (titulo, autor, genero)" });
    }
    
    const novoLivro = { 
        id: proximoId++, 
        titulo, 
        autor, 
        genero, 
        deletado: false // Todo livro novo nasce como não deletado
    };
    
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

// PUT /api/livros/:id - Atualizar
app.put('/api/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id) && !l.deletado);
    
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado para atualização" });
    
    const { titulo, autor, genero } = req.body;
    
    // Validação de dados exigida no trabalho
    if (!titulo || !autor || !genero) {
        return res.status(400).json({ erro: "Campos obrigatórios faltando (titulo, autor, genero)" });
    }
    
    livro.titulo = titulo;
    livro.autor = autor;
    livro.genero = genero;
    
    res.json(livro);
});

// DELETE /api/livros/:id - Remover (Implementando o Soft Delete do Exemplo Bônus)
app.delete('/api/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id));
    
    if (!livro || livro.deletado) return res.status(404).json({ erro: "Livro não encontrado" });
    
    // Marca como deletado ao invés de usar o splice
    livro.deletado = true;
    
    // Status 204 No Content conforme slide do professor
    res.status(204).send();
});

app.listen(3000, () => console.log('🚀 API CRUD de Livros rodando na porta 3000'));