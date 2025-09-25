const normalBtn = document.getElementById("normal-btn");
const prioritarioBtn = document.getElementById("prioritario-btn");

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
