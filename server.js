import http from "http";

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-type": "text/plain"});
    res.end("Curso de NodeJS");
});

server.listen(PORT, () => {
    console.log("Servidor escutando!");
});

