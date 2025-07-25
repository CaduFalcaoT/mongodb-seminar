# **Blog API com MongoDB e Mongoose**

Uma API RESTful para um sistema de blog simples, desenvolvida com Node.js, Express, e MongoDB. Este projeto serve como um exemplo prático para demonstrar os conceitos de bancos de dados NoSQL orientados a documentos, utilizando Mongoose para modelagem de dados e validação.

## **✨ Principais Funcionalidades**

- **Operações CRUD completas** para posts e autores.
- **Relacionamento entre coleções** (posts e autores) utilizando o método .populate() do Mongoose.
- **Uso de subdocumentos** para armazenar comentários dentro dos próprios posts.
- **Validação de dados** na camada da aplicação através de Schemas do Mongoose.
- **Documentação de API interativa** gerada automaticamente com Swagger (OpenAPI).

## **🚀 Tecnologias Utilizadas**

- **Backend:** Node.js, Express.js
- **Banco de Dados:** MongoDB
- **ODM (Object Data Modeling):** Mongoose
- **Containerização:** Docker, Docker Compose
- **Documentação da API:** Swagger UI Express, Swagger JSDoc

## **📋 Pré-requisitos**

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## **⚙️ Instalação e Configuração**

Siga os passos abaixo para configurar e executar o projeto localmente.

**1\. Clone o repositório:**

git clone https://github.com/seu-usuario/nome-do-repositorio.git  
cd nome-do-repositorio

2\. Inicie o ambiente do banco de dados:  
Este comando utiliza o Docker Compose para iniciar um contêiner com o MongoDB e outro com o Mongo Express (uma interface gráfica para o banco).

```
docker-compose up \-d
```

- O banco de dados estará acessível em mongodb://localhost:27017.
- A interface Mongo Express estará disponível em http://localhost:8081.

**3\. Instale as dependências do projeto:**

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
