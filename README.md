# 📋 TaskBoard

Um gerenciador de tarefas moderno para equipes, com autenticação segura via Auth0, interface intuitiva em React, e backend robusto com Node.js, Express e MongoDB.

---

## 🔗 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Funcionalidades](#funcionalidades)
- [Ambientes (.env)](#ambientação)
- [Licença](#licença)

---

## Visão Geral

O **TaskBoard** é uma aplicação de gerenciamento de tarefas voltada para times. Com ele, é possível criar, editar, deletar e acompanhar tarefas com prazos definidos.

✅ Interface moderna  
✅ Controle de autenticação com **Auth0**  
✅ Armazenamento seguro com **MongoDB**  
✅ Separação total entre frontend e backend  

---

## Tecnologias

### Frontend

- [React](https://reactjs.org/)
- [Auth0](https://auth0.com/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/) (opcional)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

---

## Pré-requisitos

- Node.js instalado
- MongoDB local ou Mongo Atlas
- Conta no [Auth0](https://auth0.com/)
- Git

---

## Instalação

```bash
git clone https://github.com/seu-usuario/taskboard.git
cd taskboard

# BACKEND 
cd backend 
npm install 
cd src
node index.js

# FRONTEND
cd ../frontend
npm install
npm start

```

## Funcionalidades

- Cadastro e login de usuários com Auth0

- Criação, edição e exclusão de tarefas

- Integração completa entre frontend e backend 

## Ambientação

Deve ter uma pasta .env no BackEnd e no FrontEnd:

```bash
# BACKEND deve conter informações como:
    PORT=5000
    MONGO_URI=sua_string_do_mongodb
    AUTH0_DOMAIN=seu-dominio.auth0.com
    AUTH0_CLIENT_ID=sua-client-id
    AUTH0_AUDIENCE=https://taskboard-api
    AUTH0_MANAGEMENT_API_TOKEN=seu-token-de-acesso
    AUTH0_CLIENT_SECRET=sua-senha-de-cliente-do-auth
```

```bash

    #FRONTEND deve conter as informações sobre Auth0
    REACT_APP_AUTH0_DOMAIN=seu-dominio.auth0.com
    REACT_APP_AUTH0_CLIENT_ID=sua-client-id
    REACT_APP_AUTH0_AUDIENCE=https://taskboard-api
``` 

## Licença

Este projeto está sob a licença MIT.