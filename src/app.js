import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

/*--------------CONEXÃ COM MONGODB--------------*/
const conexao = await conectaNaDatabase();

// on é um método que espera por conexões e responde rápido por ela
conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

// once é um método que espera por um evento, no caso um evento de conexão
conexao.once("open", () => {
    console.log("Conexão com o banco feito com sucesso");
});

const app = express();
routes(app);

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

/*---------------------END-CRUD---------------------*/


export default app;
