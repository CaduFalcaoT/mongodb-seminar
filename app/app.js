// O Mongoose gerencia o pool de conexões.
// Nós apenas chamamos 'mongoose.connect()' uma vez e ele cuida do resto.
// Não precisamos passar a instância do banco para as rotas."

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import mongoose from "mongoose";
import blogRoutes from "./routes.js";

const app = express();
const port = 3000;
// Adicionamos '?authSource=admin' à URI para a autenticação com Mongoose
const uri = "mongodb://admin:pass@localhost:27017/blog_api_db?authSource=admin";

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API - Seminário com Mongoose",
      version: "1.0.0",
      description:
        "API para demonstrar os conceitos de MongoDB usando Mongoose.",
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ["./02-api/routes.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

async function startServer() {
  try {
    await mongoose.connect(uri);
    console.log("API conectada ao banco de dados via Mongoose.");

    // As rotas agora funcionam sem precisar receber a instância do 'db'
    app.use("/api", blogRoutes);

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
      console.log(
        `Documentação da API disponível em http://localhost:${port}/docs`
      );
    });
  } catch (error) {
    console.error("Falha ao conectar ao banco de dados", error);
    process.exit(1);
  }
}

startServer();
