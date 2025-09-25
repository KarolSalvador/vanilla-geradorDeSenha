//PEgaos dados salvos no localStorage
const tipoAtendimentoDisplay = localStorage.getItem("tipoAtendimentoDisplay");
const especialidade = localStorage.getItem("especialidade");
const senhaGerada = localStorage.getItem("senhaGerada");

//Encontrar elementos HTML na página para atualizar
const tipoAtendimentoSpan = document.getElementById("tipo-atendimento");
const especialidadeSpan = document.getElementById("especialidade");
const numeroSenhaH2 = document.getElementById("numero-senha");

//atualiza o conteúdo dos elementos com os dados gerados
tipoAtendimentoSpan.textContent = tipoAtendimentoDisplay;
especialidadeSpan.textContent = especialidade;

//exibe a senha gerada pelo backend
numeroSenhaH2.textContent = `Senha: ${senhaGerada}`;

const voltarBtn = document.getElementById("voltar-btn");

if (voltarBtn) {
  voltarBtn.addEventListener("click", () => {
    //limpa a senha do localStorage para que gerar nova senha
    localStorage.removeItem("tipoAtendimento");
    localStorage.removeItem("tipoAtendimentoDisplay");
    localStorage.removeItem("especialidade");
    localStorage.removeItem("senhaGerada");

    window.location.href = "index.html";
  });
}
