// "Nosso script de povoamento usa os Models do Mongoose. Em vez de inserir
// objetos JSON genéricos, nós criamos instâncias dos nossos Models. O Mongoose
// valida os dados contra o Schema antes de enviá-los ao banco, garantindo
// que tudo esteja correto. Assim não precisamos validar manualmente, evitando código repetitivo, verboso e em baixo nível"

import mongoose from "mongoose";
import { Autor, Post } from "../02-api/models.js"; // Importa os models

const uri = "mongodb://admin:pass@localhost:27017/blog_api_db?authSource=admin";

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Conectado ao banco de dados via Mongoose!");

    console.log("Limpando coleções antigas...");
    await Autor.deleteMany({});
    await Post.deleteMany({});

    console.log("Inserindo autores...");
    const autores = await Autor.create([
      { nome: "Ana Coder", email: "ana.coder@example.com" },
      { nome: "Beto DevOps", email: "beto.devops@example.com" },
    ]);
    console.log("Autores inseridos com sucesso.");

    const autorAnaId = autores[0]._id;
    const autorBetoId = autores[1]._id;

    console.log("Inserindo posts...");
    await Post.create([
      {
        titulo: "Desvendando o Mongoose",
        conteudo: "Mongoose adiciona uma camada de modelagem de objetos...",
        autor_id: autorAnaId,
        tags: ["mongoose", "nosql", "nodejs"],
        comentarios: [
          { usuario: "Carlos", texto: "Agora sim, muito mais organizado!" },
        ],
      },
      {
        titulo: "Docker para Desenvolvedores",
        conteudo: "Aprenda a usar Docker para otimizar seu ambiente de dev.",
        autor_id: autorBetoId,
        tags: ["docker", "devops", "infra"],
        comentarios: [],
      },
    ]);
    console.log("Posts inseridos com sucesso.");
    console.log("\nBanco de dados povoado com sucesso usando Mongoose!");
  } catch (error) {
    console.error("Erro ao povoar o banco:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Conexão Mongoose fechada.");
  }
}

run();
