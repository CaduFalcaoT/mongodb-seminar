// "Aqui está a mágica do Mongoose. O código de rotas ficou muito mais limpo e
// legível comparado ao método tradicional. Onde teríamos um '$lookup' complexo, agora temos um simples
// '.populate()'. As buscas por ID e atualizações também são mais diretas."

import { Router } from "express";
import { Post, Autor } from "./models.js"; // Importamos nossos Models

const router = Router();

/**
 * @openapi
 * /api/posts:
 *   get:
 *     summary: Lista todos os posts com informações do autor
 *     tags: [Posts]
 *     description: |
 *       Recupera todos os posts do blog.
 *       **Conceito Mongoose:** Demonstra o uso do `.populate()`, que resolve
 *       automaticamente as referências a outros documentos, substituindo o `$lookup`.
 *     responses:
 *       200:
 *         description: Uma lista de posts com dados do autor populados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/posts", async (req, res) => {
  try {
    // .populate('autor_id') diz ao Mongoose para buscar o documento completo do autor
    // e substituí-lo no campo 'autor_id'.
    const posts = await Post.find().populate("autor_id", "nome email"); // Seleciona apenas nome e email do autor
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @openapi
 * /api/posts/{id}:
 *   get:
 *     summary: Busca um único post pelo seu ID
 *     tags: [Posts]
 *     description: |
 *       Recupera os detalhes completos de um post específico.
 *       **Conceito Mongoose:** Usa o método `findById`, uma forma mais limpa e
 *       direta de buscar um documento pelo seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único do post
 *     responses:
 *       200:
 *         description: O documento do post encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "autor_id",
      "nome"
    );
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @openapi
 * /api/posts/{id}/comments:
 *   post:
 *     summary: Adiciona um novo comentário a um post
 *     tags: [Posts]
 *     description: |
 *       Adiciona um novo comentário a um post existente.
 *       **Conceito Mongoose:** Usa `findByIdAndUpdate` com o operador `$push`,
 *       mostrando como Mongoose facilita atualizações atômicas em documentos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *           example:
 *             usuario: "Novo Leitor"
 *             texto: "Que post incrível!"
 *     responses:
 *       200:
 *         description: O post atualizado com o novo comentário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/posts/:id/comments", async (req, res) => {
  try {
    const { usuario, texto } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comentarios: { usuario, texto } } },
      { new: true } // Opção para retornar o documento modificado
    );

    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "Post não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @openapi
 * /api/autores:
 *   get:
 *     summary: Lista todos os autores
 *     tags: [Autores]
 *     description: |
 *       Recupera todos os autores cadastrados.
 *       **Conceito Mongoose:** Demonstra uma busca simples usando o método `find()`.
 *     responses:
 *       200:
 *         description: Uma lista de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autor'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/autores", async (req, res) => {
  try {
    const autores = await Autor.find();
    res.json(autores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @openapi
 * /api/autores:
 *   post:
 *     summary: Cria um novo autor
 *     tags: [Autores]
 *     description: |
 *       Cria um novo autor no sistema.
 *       **Conceito Mongoose:** Demonstra a criação de um documento usando o construtor do Model.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["nome", "email"]
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do autor
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email único do autor
 *           example:
 *             nome: "João Silva"
 *             email: "joao@exemplo.com"
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Autor'
 *       400:
 *         description: Dados inválidos ou email já existe
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/autores", async (req, res) => {
  try {
    const { nome, email } = req.body;
    const autor = new Autor({ nome, email });
    const savedAutor = await autor.save();
    res.status(201).json(savedAutor);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email já está em uso" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

/**
 * @openapi
 * /api/posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     description: |
 *       Cria um novo post no blog.
 *       **Conceito Mongoose:** Demonstra a criação de um documento com referência a outro documento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["titulo", "conteudo", "autor_id"]
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do post
 *               conteudo:
 *                 type: string
 *                 description: Conteúdo do post
 *               autor_id:
 *                 type: string
 *                 description: ID do autor do post
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associadas ao post
 *           example:
 *             titulo: "Meu Primeiro Post"
 *             conteudo: "Este é o conteúdo do meu primeiro post..."
 *             autor_id: "507f1f77bcf86cd799439011"
 *             tags: ["mongodb", "mongoose", "nodejs"]
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/posts", async (req, res) => {
  try {
    const { titulo, conteudo, autor_id, tags } = req.body;
    const post = new Post({ titulo, conteudo, autor_id, tags });
    const savedPost = await post.save();
    const populatedPost = await Post.findById(savedPost._id).populate("autor_id", "nome email");
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
