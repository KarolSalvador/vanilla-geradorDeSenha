//importa os módulos
const express = require("express");
const cors = require("cors");

//configura os módulos
const app = express();
const PORT = 5000;

//configuração do Express para usar o JSON e CORS
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor da Fila está rodando corretamente!");
});

//Lógica das senhas serão let pois vão ser alteradas conforme criação
let senhasEmitidas = 1; //contador das senhas
let filaPrioritaria = []; //prioritária e normal serão um array de senhas
let filaNormal = [];
// CONTROLE PARA ALTERNÂNCIA 1:1 (Próxima chamada será prioritária)
let ultimoTipoChamado = "normal";
// Armazena a última chamada para o Painel de Senhas
let ultimaSenhaChamada = { senha: "--", guiche: "--", tipo: "--" };

//função para gerar a próxima senha e inserir na fila
function gerarSenha(tipo, especialidade) {
  const tipoPadronizado = tipo.toLowerCase();

  ///se o tipo for identico a prioritario define como P(prioritario) se não for define como N(normal)
  const prefixo = tipoPadronizado === "prioritario" ? "P" : "N";

  //define o formato da senha, método padStart(tamanhoDaString, caractere que será usado no inicio) preenche com zeros à esquerda
  const numeroFormatado = String(senhasEmitidas).padStart(3, "0");
  const senha = `${prefixo}${numeroFormatado}`;

  //define a estrutura do objeto JavaScript que será convertido em JSON quando o mandar para o front
  const paciente = {
    senha: senha,
    tipo: tipoPadronizado,
    especialidade: especialidade,
    guiche: null,
  };

  //lógica para incrementar a senha e adicionar a fila
  if (tipoPadronizado === "prioritario") {
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
app.get("/chamar-paciente", (req, res) => {
  //recebe o número do guichê do atendente
  const { guiche } = req.body;
  let pacienteChamado = null;

  // Lógica para decidir quem chamar:
  // Deve chamar Prioritário se: 1) A última chamada foi Normal E a fila P não está vazia; OU 2) A fila N está vazia.
  const deveChamarPrioritario =
    (ultimoTipoChamado === "normal" && filaPrioritaria.length > 0) ||
    filaNormal.length === 0;

  if (deveChamarPrioritario && filaPrioritaria.length > 0) {
    //chama prioritário
    pacienteChamado = filaPrioritaria.shift();
    ultimoTipoChamado = "prioritario";
  } else if (filaNormal.length > 0) {
    //chama normal
    pacienteChamado = filaNormal.shift();
    ultimoTipoChamado = "normal";
  } else if (filaPrioritaria.length > 0) {
    //se não tiver normal chama prioritário
    pacienteChamado = filaPrioritaria.shift();
    ultimoTipoChamado = "prioritario";
  }

  if (pacienteChamado) {
    //atribui o guiche ao paciente chamado
    pacienteChamado.guiche = guiche;

    //atualiza os dados do json para o painel de senhas consumir e exibir
    ultimaSenhaChamada = {
      senha: pacienteChamado.senha,
      guiche: pacienteChamado.guiche,
      tipo: pacienteChamado.tipo,
    };
    res.json({ mensagem: "Chamada realizada", paciente: pacienteChamado });
  } else {
    res.status(200).json({ mensagem: "Fila vazia." });
  }
});

//Rota GET para o painel atendente buscar o estado atual da fila
app.get("/status-fila", (req, res) => {
  //retorna filas de espera e última senha chaamda
  res.json({
    filaPrioritaria: filaPrioritaria,
    filaNormal: filaNormal,
    ultimaSenhaChamada: ultimaSenhaChamada,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando em http://localhost:${PORT}`);
});
