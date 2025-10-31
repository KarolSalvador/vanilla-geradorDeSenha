# Sistema Gerador de Senhas

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

Um sistema simples de gerenciamento de senhas e filas, contruído com Vanilla JavaScript, HTML, CSS e um Backend em Node.js com Express.

## ✨ Funcionalidades

- Geralção de senhas para diferentes tipos de atendimento (Ex: Prioritário, Normal).
- Painel para acompanhamento das senhas chamadas.
- Interface de atendimento para chamar a próxima senha.

## 🛠️ Tecnologias Utilizadas

**Frontend:**

- HTML5
- CSS3
- JavaScript

**Backend:**

- Node.js
- Express
- Atualmente o projeto está sem Banco de Dados sendo salvo apenas no LocalStorage, mas será implementado em breve o uso de um BD para melhor performance.

## 🏗️ Estrutura do Projeto

A estrutura do diretório é a seguinte:  
.  
├── assets/ # Arquivos de mídia (áudios e imagens)  
├── backend/ # Código do servidor Node.js  
│ ├── server.js # Lógica principal do servidor  
│ └── package.json # Dependências do Node.js  
├── atendente.html # Interface para o atendente chamar senhas  
├── atendente.js # Lógica JS do atendente  
├── especialidade.html # Interface de seleção de especialidade  
├── especialidade.js # Lógica JS da especialidade  
├── index.html # Página inicial  
├── index.js # Lógica JS da página inicial  
├── painel.js # Lógica JS do painel de senhas  
├── painel_senhas.html # Painel de visualização das senhas  
├── senha.html # Página de exibição da senha gerada  
├── senha.js # Lógica JS da página de senha  
└── style.css # Estilos CSS

## ⚙️ Como Instalar e Rodar Localmente

### Pré-requisitos

- Node.js (Versão LTS recomendada)
- npm (gerenciador de pacotes do Node)

### Instalação

1. **Clone o repositório e entre na pasta:**

```bash
git clone https://github.com/KarolSalvador/vanilla-geradorDeSenha.git
cd vanilla-geradordesenha
```

2. **Instale as dependências do backend:**

```bash
cd backend
npm install
```

3. **Inicie o servidor (dentro da pasta `backend`):**

```bash
npm start
# Ou use: node server.js
```

_Obs: O comando `npm start` provavelmente já está configurado no seu `package.json` para rodar o `server.js` com `nodemon` (se instalado), o que ajuda no desenvolvimento._

4. **Acesse a aplicação no seu navegador:**

- Página de Início: `http://localhost:3000/`
