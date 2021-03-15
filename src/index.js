const express = require('express');
const app = express();

app.use(express.json());

let count = 1;
const livros = [{
        "id": 0,
        "titulo": "isso é um título", 
        "descricao": "isso é uma descrição", 
        "edicao": "essa é a edição", 
        "autor": "esse é o autor",
        "isbn": "esse é o isbn"
    },
    {
        "id": 1,
        "titulo": "isso é um títul2", 
        "descricao": "isso é uma descrição2", 
        "edicao": "essa é a edição2", 
        "autor": "esse é o autor2",
        "isbn": "esse é o isbn"
    }
];

app.post('/livros', (req, res, next) => {
    const {titulo, descricao, edicao, autor, isbn} = req.body;
    const livro = {id: count += 1, titulo, descricao, edicao, autor, isbn};
    livros.push(livro);

    return res.status(201).json(livros);
});

app.get('/livros', (req, res, next) => {
    return res.status(200).json(livros);
});

app.put('/livros', (req, res, next) => {
    const {id, titulo, descricao, edicao, autor, isbn} = req.body;
    const livro = livros.find(livro => livro.id == id);
    
    if(!livro) {
        return res.status(400).send();
    }

    livro.titulo = titulo;
    livro.descricao = descricao;
    livro.edicao = edicao;
    livro.autor = autor;
    livro.isbn = isbn;

    return res.status(200).json(livro);
});

app.delete('/livros', (req, res, next) => {
    const {id} = req.body;
    const livroIndex = livros.findIndex(livro => livro.id == id);
    console.log(livroIndex);
    if(livroIndex < 0) {
        return res.status(400).send();
    }

    livros.splice(livroIndex, 1);

    return res.status(200).json(livros);
});

app.listen(3000);