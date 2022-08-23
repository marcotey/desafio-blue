## 💻 Sobre o projeto

Esse é um pequeno projeto feito para atender ao teste prático proposto pela contratante.

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

-   [Node.js][nodejs]
-   [TypeScript][typescript]

## 🚀 Como executar o projeto

### Pré-requisitos

Você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js][nodejs] e o [Docker].

E das seguintes extensões também!
[EditorConfig for VS Code][vceditconfig] |
[ESlint][vceslint] |
[Prettier][prettier]

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/xxxxx

# execute o comando abaixo para levantar a instância do docker com os componentes necessários.
$ docker-compose up -d

# O servidor inciará na porta:3333 - acesse http://localhost:3333

# Os testes podem ser feitos localmente por questões de conexão entre o jest e o redis dentro do container.

# Para tanto, é necessário instalar todas as dependências do projeto.
$ npm install -g yarn

# Depois executa o comando abaixo para instalar as dependências.
$ yarn

# Depois basta executar o comando abaixo para executar a suit de testes do jest.
$ yarn test

# Caso seja necessário, atualize a versão do node.
```

### Observações sobre a autenticação

```bash

```

Feito por Marco Antonio 👋🏽 [Entre em contato!](https://www.linkedin.com/in/marcoantonio12111992/)

[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[yarn]: https://yarnpkg.com/
[vscode]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
