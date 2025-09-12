const normalBtn = document.getElementById("normal-btn");
const prioritarioBtn = document.getElementById("prioritario-btn");
const voltarBtn = document.getElementById("voltar-btn");

if (voltarBtn) {
  voltarBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

if (normalBtn) {
  normalBtn.addEventListener("click", () => {
    localStorage.setItem("tipoAtendimento", "normal");
    window.location.href = "especialidade.html";
  });
}

if (prioritarioBtn) {
  prioritarioBtn.addEventListener("click", () => {
    localStorage.setItem("tipoAtendimento", "prioritario");
    window.location.href = "especialidade.html";
  });
}
