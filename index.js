const normalBtn = document.getElementById("normal-btn");
const prioritarioBtn = document.getElementById("prioritario-btn");

if (normalBtn) {
  normalBtn.addEventListener("click", () => {
    localStorage.setItem("tipoAtendimento", "normal");
    window.location.href = "especialidade.html";
  });
}

if (prioritarioBtn) {
  prioritarioBtn.addEventListener("click", () => {
    localStorage.setItem("tipoAtendimento", "Prioritário");
    window.location.href = "especialidade.html";
  });
}
