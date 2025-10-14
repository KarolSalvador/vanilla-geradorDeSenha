const normalBtn = document.getElementById("normal-btn");
const prioritarioBtn = document.getElementById("prioritario-btn");

const painelSenhasBtn = document.getElementById("painel-senhas");
const painelAtendeteBtn = document.getElementById("painel-atendente");

if (normalBtn) {
  normalBtn.addEventListener("click", () => {
    localStorage.setItem("tipoAtendimento", "normal");
    localStorage.setItem("tipoAtendimentoDisplay", "Atendimento Normal");
    window.location.href = "especialidade.html";
  });
}

if (prioritarioBtn) {
  prioritarioBtn.addEventListener("click", () => {
    localStorage.setItem("tipoAtendimento", "prioritario");
    localStorage.setItem("tipoAtendimentoDisplay", "Atendimento Prioritário");
    window.location.href = "especialidade.html";
  });
}

if (painelSenhasBtn) {
  painelSenhasBtn.addEventListener("click", () => {
    window.location.href = "painel_senhas.html";
  });
}

if (painelAtendeteBtn) {
  painelAtendeteBtn.addEventListener("click", () => {
    window.location.href = "atendente.html";
  });
}
