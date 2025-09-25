//importa os módulos
const express = require("express");
const cors = require("cors");

//configura os módulos
const app = express();
const PORT = 5000;

//configuração do Express para usar o JSON e CORS
app.use(express.json());
app.use(cors());

//Lógica das senhas serão let pois vão ser alteradas conforme criação
let senhasEmitidas = 1; //contador das senhas
let filaPrioritaria = []; //prioritária e normal serão um array de senhas
let filaNormal = [];
let proximoGuiche = 1; //contador do guiche

//função para gerar a próxima senha e inserir na fila
function gerarSenha(tipo, especialidade) {
  ///se o tipo for identico a prioritario define como P(prioritario) se não for define como N(normal)
  const prefixo = tipo === "prioritario" ? "P" : "N";

  //define o formato da senha, método padStart(tamanhoDaString, caractere que será usado no inicio) preenche com zeros à esquerda
  const numeroFormatado = String(senhasEmitidas).padStart(3, "0");
  const senha = `${prefixo}${numeroFormatado}`;

  //define a estrutura do objeto JavaScript que será convertido em JSON quando o mandar para o front
  const paciente = {
    senha: senha,
    tipo: tipo,
    especialidade: especialidade,
    guiche: null,
  };

  //lógica para incrementar a senha e adicionar a fila
  if (tipo === "prioritario") {
    filaPrioritaria.push(paciente);
  } else {
    filaNormal.push(paciente);
  }
  senhasEmitidas++;
  return paciente;
}

//criação API para front-end consumir
//ROTA 1: POST para gerar senha que o front vai chamar para pegar a senha gerada
app.post("/gerar-senha", (req, res) => {
  const { tipo, especialidade } = req.body;

  //garante que a senha só será gerada se uma especialidade e tipo de atendimento forem selecionados
  if (!tipo || !especialidade) {
    return res.status(400).json({
      erro: "Tipo de atendimento e especialidade são obrigatórios.",
    });
  }
  const novaSenha = gerarSenha(tipo, especialidade);

  //Retorno da senha gerada com prefixo e númro para o front
  res.json(novaSenha);
});

//ROTA2: GET para chamar próximo da fila
app.get("/chamar-proximo", (req, res) => {
  let pacienteChamado = null;

  if (filaPrioritaria.length > 0) {
    pacienteChamado = filaPrioritaria.shift();
  } else if (filaNormal.length > 0) {
    pacienteChamado = filaNormal.shift();
  }

  if (pacienteChamado) {
    pacienteChamado.guiche = proximoGuiche;
    proximoGuiche++;
    if (proximoGuiche > 10) proximoGuiche = 1;

    res.json(pacienteChamado);
  } else {
    res.jason({ mensagem: "Fila vazia." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando em http://localhost:${PORT}`);
});
