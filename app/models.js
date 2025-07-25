// PONTO DA APRESENTAÇÃO:
// "A primeira grande mudança com Mongoose é a introdução de Schemas. Um Schema é um
// 'molde' para nossos documentos. Ele define a estrutura, os tipos de dados e até
// regras de validação. Isso traz uma camada de consistência para nosso banco de
// dados que, por natureza, é flexível."

import mongoose from "mongoose";

// Schema para os Autores
const autorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Schema para os Posts
const postSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  // Este é o ponto chave para relacionamentos:
  // Dizemos que 'autor_id' é um ID de objeto e que ele se refere ao Model 'Autor'.
  // Isso habilita o uso do '.populate()' para fazer "joins".
  autor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Autor",
    required: true,
  },
  tags: [String], // Um array de strings
  // Um array de subdocumentos. Cada comentário terá sua própria estrutura.
  comentarios: [
    {
      usuario: String,
      texto: String,
      data: { type: Date, default: Date.now },
    },
  ],
  data_criacao: { type: Date, default: Date.now },
});

// Um Model é a interface que usamos no código para interagir com a coleção no banco.
// Ele é compilado a partir do Schema.
const Autor = mongoose.model("Autor", autorSchema);
const Post = mongoose.model("Post", postSchema);

// Exportamos os Models para serem usados em outros arquivos.
export { Autor, Post };
