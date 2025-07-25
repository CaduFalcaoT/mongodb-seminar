// "Aqui está a mágica do Mongoose. O código de rotas ficou muito mais limpo e
// legível comparado ao método tradicional. Onde teríamos um '$lookup' complexo, agora temos um simples
// '.populate()'. As buscas por ID e atualizações também são mais diretas."

import { Router } from "express";
import { Post } from "./models.js"; // Importamos nosso Model

const router = Router();

/**
 * @openapi
 * /api/posts:
 * get:
 * summary: Lista todos os posts com informações do autor
 * tags: [Posts]
 * description: |
 * Recupera todos os posts.
 * **Conceito Mongoose:** Demonstra o uso do `.populate()`, que resolve
 * automaticamente as referências a outros documentos, substituindo o `$lookup`.
 * responses:
 * 200:
 * description: Uma lista de posts com dados do autor populados.
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
 * get:
 * summary: Busca um único post pelo seu ID
 * tags: [Posts]
 * description: |
 * Recupera os detalhes completos de um post.
 * **Conceito Mongoose:** Usa o método `findById`, uma forma mais limpa e
 * direta de buscar um documento pelo seu ID.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: O documento do post.
 * 404:
 * description: Post não encontrado.
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
 * post:
 * summary: Adiciona um novo comentário a um post
 * tags: [Posts]
 * description: |
 * Adiciona um novo comentário a um post existente.
 * **Conceito Mongoose:** Usa `findByIdAndUpdate` com o operador `$push`,
 * mostrando como Mongoose facilita atualizações atômicas em documentos.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * usuario:
 * type: string
 * texto:
 * type: string
 * example:
 * usuario: "Novo Leitor"
 * texto: "Que post incrível!"
 * responses:
 * 200:
 * description: O post atualizado com o novo comentário.
 * 404:
 * description: Post não encontrado.
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

export default router;
