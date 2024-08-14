import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import livro from "./models/Livro.js";

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
/*--------------CONEXÃ COM MONGODB--------------*/


const app = express();
app.use(express.json()); // Middleware: São utilizados para ter acesso à requisições e respostas, e fazer algumas ações como modificar os objetos, informações extras e etc.


/*---------------------CRUD---------------------*/
// Passando para o express a responsabilidade por gerencias as rota
app.get("/", (req, res) => {
    res.status(200).send("Curso de NodeJS");
});

// Pegar todos os livros
app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
});

// Pegar um livro específico
app.get("/livros/:id", async (req, res) => {
    const listaLivros = await livro.find({id})
    // No caso este get vai pegar a requisição de qual id de livro o usuário quer ver, vai colocar este id para ser comparado pela função buscaLivros
    // este valor vai ficar saldo na variável index. Com isso este get vai retornar que foi um sucesso com o status(200) no formato Json(usando o valor da variável index 
    // como parâmetro de qual id de livro buscar)
    res.status(200).json(listaLivros);
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

/*---------------------END-CRUD---------------------*/


export default app;
