const tipoAtendimento = localStorage.getItem("tipoAtendimento");
const especialidade = localStorage.getItem("especialidade");

const tipoAtendimentoSpan = document.getElementById("tipo-atendimento");
const especialidadeSpan = document.getElementById("especialidade");

tipoAtendimentoSpan.textContent = tipoAtendimento;
especialidadeSpan.textContent = especialidade;

const numeroSenha = "Ate01";
const numeroSenhaH2 = document.getElementById("numero-senha");
numeroSenhaH2.textContent = `Senha: ${numeroSenha}`;
