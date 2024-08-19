import mongoose from "mongoose";

// Praticamente a tabela criada aqui para enviar dados aos campos do banco de dados
const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, require: true }, // required é para definir se este tipo é obrigatório
    editora: { type: String },
    preco: { type: Number, required: true },
    paginas: { type: Number }
}, { versionKey: false }); // versionamento do mongodb

const livro = mongoose.model("livros", livroSchema);

export default livro;
