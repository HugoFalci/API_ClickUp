import express from "express";

const app = express();
app.use(express.json()); // Middleware: São utilizados para ter acesso à requisições e respostas, e fazer algumas ações como modificar os objetos, informações extras e etc.

const livros = [
    {
        id: 1,
        titulo: "O senhor dos aneis"
    },
    {
        id: 2,
        titulo: "O Hobbit"
    }
]

function buscaLivro(id) {
    return livros.findIndex(livro => { // FindIndex é um método do JS para encontrar determinado index ou identificador dentro do array
        return livro.id === Number(id); // Retorno o número do ID com o tipo Number caso ele seja igual a algum id cadastrado no array.
    }) 
}

// Passando para o express a responsabilidade por gerencias as rota
app.get("/", (req, res) => {
    res.status(200).send("Curso de NodeJS");
});

// Pegar todos os livros
app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

// Pegar um livro específico
app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    // No caso este get vai pegar a requisição de qual id de livro o usuário quer ver, vai colocar este id para ser comparado pela função buscaLivros
    // este valor vai ficar saldo na variável index. Com isso este get vai retornar que foi um sucesso com o status(200) no formato Json(usando o valor da variável index 
    // como parâmetro de qual id de livro buscar)
    res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
    // req. alguma coisa, é um objeto requisição que está sendo recebido dentro da função que é chamado em app.post
    livros.push(req.body); // O body seria o corpo da requisição

    res.status(201).send("Livro cadastrado com sucesso!");
});

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    // Aqui estou pegando o livro do id utilizado na busca para saber o titulo de qual informação ele quer alterar.
    // E recebo a informação que estiver no parametro titulo descrito no corpo da requisição
    livros[index].titulo = req.body.titulo;

    res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1); // O Splice consegue localizar um elemento para deletar ou substituir. No caso ele recebe o id a ser removido e a quantidade de remoções ele fará

    res.status(200).send("Livro deletado com sucesso!");
});

export default app;