import express from "express";

const app = express();

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

// Passando para o express a responsabilidade por gerencias as rota
app.get("/", (req, res) => {
    res.status(200).send("Curso de NodeJS");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

export default app;