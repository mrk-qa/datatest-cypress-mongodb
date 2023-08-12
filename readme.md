# Data Test com Cypress + MongoDB 💚

<h1 align="center">
    <img width="300px" src="https://github.com/mrk-qa/datatest-cypress-mongodb/assets/102618854/f6ba2d80-4a5f-45b9-a914-8857c488e846" alt="2560px-NTT-Data-Logo">
</h1>


## 🔖 Requisitos

- [Node.js] - v16+
- [Visual Studio Code] - v1.60+
- [Docker Desktop] - v20.10.17
- [MongoDB Compass] - v1.39.1

## 💻  Instalação

Para rodar o projeto de automação de testes na sua máquina, clone o repositório e execute o comando `npm install` para instalar todas as dependências.

Em seguida, com o Docker aberto execute `docker-compose up -d` para subir a imagem do mongodb.

Depois, para popular o banco de dados com as massas para testes, execute o comando `node cypress/mongodb/import.js`. Isso irá realizar um upload do arquivo pokemon.csv dentro da pasta `fixtures`.

*Obs.: para confirmar conexão com o mongodb, sugiro abrir o `MongoDB Compass` e conectar com a imagem do docker que estará disponível, seguindo os dados de USERNAME, PASSWORD, HOST e PORT.*

Após finalizar os passos anteriores, execute `npx cypress open` para abrir a interface do Cypress ou execute `npx cypress run` para rodar os testes em modo headless (terminal).

## 🔮 Apoie este projeto  

Se você deseja apoiar este projeto, deixe um ⭐.  

---

Feito com 💙 &nbsp;por Marco Antonio 👋 &nbsp; [Meu LinkedIn](https://www.linkedin.com/in/mrk-silva/)  