# **Seminário: API REST com MongoDB e Mongoose**

Este repositório demonstra a construção de uma API REST usando MongoDB com a biblioteca Mongoose, que adiciona uma camada de modelagem de dados, validação e outras conveniências. O projeto está organizado com a infraestrutura na raiz e toda a lógica da aplicação na pasta app/.

## **Roteiro de Apresentação ao Vivo**

### **1\. Preparando o Ambiente**

**O que mostrar:** O arquivo docker-compose.yml na raiz do projeto.

**O que dizer:** "Para começar, vamos preparar nosso ambiente. Com este arquivo docker-compose.yml na raiz do projeto, podemos subir nossa infraestrutura — o banco de dados MongoDB e uma interface gráfica — com um único comando."

**Comando para executar (na raiz do projeto):**

docker-compose up \-d

_Após executar, abra http://localhost:8081 no navegador para mostrar o Mongo Express, a interface gráfica do nosso banco._

### **2\. Povoando o Banco com Mongoose**

**O que mostrar:** Os arquivos app/models.js e app/populate.js.

**O que dizer:** "Com o banco no ar, vamos definir a estrutura dos nossos dados usando Mongoose. No arquivo app/models.js, criamos **Schemas**, que são como moldes para garantir a consistência dos nossos documentos. Em seguida, o script app/populate.js usa esses **Models** para criar e validar dados de exemplo antes de salvá-los no banco."

**Comandos para executar (na raiz do projeto):**

npm install  
npm run populate

_Após executar, atualize o Mongo Express e mostre as coleções autores e posts que foram criadas no banco blog_api_db._

### **3\. Explorando a API com Mongoose**

**O que mostrar:** Os arquivos app/app.js, app/routes.js e a interface do Swagger.

**O que dizer:** "Agora, vamos iniciar nossa API. O arquivo app/app.js configura o servidor Express e a documentação interativa com Swagger. Toda a lógica das nossas consultas está em app/routes.js, onde usamos os métodos do Mongoose, como o .populate(), para criar um código limpo e legível. Vamos ver isso na prática através da documentação."

**Comando para executar (na raiz do projeto):**

npm start

_Após executar, abra http://localhost:3000/docs e siga o roteiro abaixo._

#### **Roteiro na Interface do Swagger:**

1. **GET /api/posts**:
   - **Explicação:** "Esta rota usa .populate('autor_id'). O Mongoose 'vê' a referência no nosso Schema e automaticamente busca os dados do autor, substituindo o ID pelo documento completo. É o 'join' do Mongoose, de forma muito mais elegante."
   - **Ação:** Clique em "Try it out" e "Execute". Mostre como os dados do autor vêm junto com o post.
2. **GET /api/posts/{id}**:
   - **Explicação:** "A busca por ID agora usa Post.findById(), um atalho do Mongoose que é mais limpo e direto."
   - **Ação:** Copie um ID, cole e execute.
3. **POST /api/posts/{id}/comments**:
   - **Explicação:** "Para adicionar um comentário, usamos findByIdAndUpdate com o operador $push. O Mongoose nos dá um controle fino sobre as atualizações atômicas, e a opção { new: true } nos retorna o documento já atualizado, o que é muito útil."
   - **Ação:** Pegue um ID, adicione um novo comentário e execute. Mostre o post retornado já com o novo comentário.
