# **Blog API com MongoDB e Mongoose**

Uma API RESTful para um sistema de blog simples, desenvolvida com Node.js, Express, e MongoDB. Este projeto serve como um exemplo prático para demonstrar os conceitos de bancos de dados NoSQL orientados a documentos, utilizando Mongoose para modelagem de dados e validação.

## **✨ Principais Funcionalidades**

- **Operações CRUD completas** para posts e autores
- **Relacionamento entre coleções** (posts e autores) utilizando o método `.populate()` do Mongoose
- **Uso de subdocumentos** para armazenar comentários dentro dos próprios posts
- **Validação de dados** na camada da aplicação através de Schemas do Mongoose
- **Documentação de API interativa** com Swagger UI (OpenAPI 3.0)
- **Interface gráfica** para visualizar o banco com Mongo Express

## **🚀 Tecnologias Utilizadas**

- **Backend:** Node.js, Express.js
- **Banco de Dados:** MongoDB
- **ODM (Object Data Modeling):** Mongoose
- **Containerização:** Docker, Docker Compose
- **Documentação da API:** Swagger UI Express, Swagger JSDoc

## **📋 Pré-requisitos**

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## **⚙️ Instalação e Configuração**

### **1. Clone o repositório:**
```bash
git clone https://github.com/CaduFalcaoT/mongodb-seminar.git
cd mongodb-seminar
```

### **2. Inicie o ambiente do banco de dados:**
```bash
docker-compose up -d
```
- O MongoDB estará acessível em `mongodb://localhost:27017`
- O Mongo Express estará disponível em http://localhost:8081

### **3. Instale as dependências do projeto:**
```bash
npm install
```

### **4. Popule o banco de dados com dados de exemplo:**
```bash
npm run populate
```

### **5. Inicie o servidor da API:**
```bash
npm start
```

A API estará rodando em http://localhost:3000

## **📚 Documentação da API (Swagger)**

A documentação interativa da API está disponível em:
**http://localhost:3000/docs**

A documentação inclui:
- Descrição detalhada de todos os endpoints
- Exemplos de requisições e respostas
- Esquemas de dados (schemas)
- Interface para testar as rotas diretamente no navegador

## **🛠️ Endpoints Disponíveis**

### **Autores**
- `GET /api/autores` - Lista todos os autores
- `POST /api/autores` - Cria um novo autor

### **Posts**
- `GET /api/posts` - Lista todos os posts (com dados do autor populados)
- `GET /api/posts/{id}` - Busca um post específico por ID
- `POST /api/posts` - Cria um novo post
- `POST /api/posts/{id}/comments` - Adiciona um comentário a um post

## **🧪 Testando a API**

### **Via Swagger UI:**
1. Acesse http://localhost:3000/docs
2. Explore os endpoints disponíveis
3. Use o botão "Try it out" para testar as rotas

### **Via cURL:**

**Listar todos os posts:**
```bash
curl -X GET http://localhost:3000/api/posts
```

**Criar um novo autor:**
```bash
curl -X POST http://localhost:3000/api/autores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "email": "maria@exemplo.com"
  }'
```

**Adicionar um comentário:**
```bash
curl -X POST http://localhost:3000/api/posts/{POST_ID}/comments \
  -H "Content-Type: application/json" \
  -d '{
    "usuario": "João",
    "texto": "Excelente post!"
  }'
```

## **🗂️ Estrutura do Projeto**

```
mongodb-seminar/
├── app/
│   ├── app.js          # Arquivo principal da aplicação
│   ├── models.js       # Definição dos schemas e models
│   ├── routes.js       # Definição das rotas da API
│   └── populate.js     # Script para popular o banco com dados de exemplo
├── docker-compose.yml  # Configuração do Docker Compose
├── package.json        # Dependências e scripts do projeto
└── README.md          # Documentação do projeto
```

## **💾 Estrutura de Dados**

### **Autor**
```javascript
{
  "_id": "ObjectId",
  "nome": "String (obrigatório)",
  "email": "String (obrigatório, único)"
}
```

### **Post**
```javascript
{
  "_id": "ObjectId",
  "titulo": "String (obrigatório)",
  "conteudo": "String (obrigatório)",
  "autor_id": "ObjectId (referência ao Autor)",
  "tags": ["String"],
  "comentarios": [
    {
      "usuario": "String",
      "texto": "String",
      "data": "Date (padrão: Date.now)"
    }
  ],
  "data_criacao": "Date (padrão: Date.now)"
}
```

## **🔧 Scripts Disponíveis**

- `npm start` - Inicia o servidor de produção
- `npm run populate` - Popula o banco com dados de exemplo

## **🌐 Acessos Importantes**

- **API:** http://localhost:3000
- **Documentação Swagger:** http://localhost:3000/docs
- **Mongo Express:** http://localhost:8081
- **MongoDB:** mongodb://localhost:27017

**Credenciais do MongoDB:**
- Usuário: `admin`
- Senha: `pass`
- Database: `blog_api_db`

## **📝 Conceitos Demonstrados**

Este projeto demonstra conceitos importantes do MongoDB e Mongoose:

1. **Schemas e Validação:** Definição de estruturas de dados consistentes
2. **Relacionamentos:** Uso de referências entre documentos
3. **Population:** Substituição de referências por documentos completos
4. **Subdocumentos:** Arrays de objetos incorporados (comentários)
5. **Operações CRUD:** Create, Read, Update, Delete
6. **Indexação:** Índices únicos para campos como email

```
npm install
```

4\. Povoamento do Banco de Dados (Opcional, mas recomendado):  
Execute o script abaixo para popular o banco de dados com dados de exemplo (autores e posts).

```
npm run populate
```

_Você pode verificar se os dados foram inseridos corretamente através do Mongo Express._

## **▶️ Executando a Aplicação**

Para iniciar o servidor da API, execute o seguinte comando:

```
npm start
```

O servidor estará rodando em http://localhost:3000.

## **📖 Documentação da API**

A documentação completa e interativa da API está disponível e é gerada automaticamente pelo Swagger. Após iniciar o servidor, acesse:

[**http://localhost:3000/docs**](http://localhost:3000/docs)

Nesta página, você pode visualizar todos os endpoints disponíveis, seus parâmetros, e testá-los diretamente pelo navegador.

## **📁 Estrutura do Projeto**

```
├── app/
│ ├── app.js \# Configuração do servidor Express e Swagger
│ ├── models.js \# Definição dos Schemas e Models do Mongoose
│ ├── populate.js \# Script para povoar o banco de dados
│ └── routes.js \# Lógica das rotas da API
├── docker-compose.yml \# Arquivo de configuração da infraestrutura Docker
├── package.json \# Dependências e scripts do projeto
└── README.md \# Este arquivo
```
