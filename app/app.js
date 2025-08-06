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
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API - Seminário com Mongoose",
      version: "1.0.0",
      description:
        "API para demonstrar os conceitos de MongoDB usando Mongoose. Esta API demonstra o uso de Schemas, relacionamentos e operações CRUD com MongoDB.",
    },
    servers: [{ url: `http://localhost:${port}` }],
    components: {
      schemas: {
        Autor: {
          type: "object",
          required: ["nome", "email"],
          properties: {
            _id: {
              type: "string",
              description: "ID único do autor"
            },
            nome: {
              type: "string",
              description: "Nome do autor"
            },
            email: {
              type: "string",
              format: "email",
              description: "Email único do autor"
            }
          }
        },
        Post: {
          type: "object",
          required: ["titulo", "conteudo", "autor_id"],
          properties: {
            _id: {
              type: "string",
              description: "ID único do post"
            },
            titulo: {
              type: "string",
              description: "Título do post"
            },
            conteudo: {
              type: "string",
              description: "Conteúdo do post"
            },
            autor_id: {
              type: "string",
              description: "ID do autor do post"
            },
            tags: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Tags associadas ao post"
            },
            comentarios: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  usuario: {
                    type: "string",
                    description: "Nome do usuário que comentou"
                  },
                  texto: {
                    type: "string",
                    description: "Texto do comentário"
                  },
                  data: {
                    type: "string",
                    format: "date-time",
                    description: "Data do comentário"
                  }
                }
              },
              description: "Lista de comentários do post"
            },
            data_criacao: {
              type: "string",
              format: "date-time",
              description: "Data de criação do post"
            }
          }
        },
        Comentario: {
          type: "object",
          required: ["usuario", "texto"],
          properties: {
            usuario: {
              type: "string",
              description: "Nome do usuário que está comentando"
            },
            texto: {
              type: "string",
              description: "Texto do comentário"
            }
          }
        }
      }
    }
  },
  apis: ["./app/routes.js"],
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
