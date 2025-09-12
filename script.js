const normalBtn = document.getElementById("normal-btn");
const prioritarioBtn = document.getElementById("prioritario-btn");
const voltarBtn = document.getElementById("voltar-btn");

const tipoAtendimento = localStorage.getItem("tipoAtendimento");
console.log(tipoAtendimento);

const especialidadeBtns = document.querySelectorAll(
  ".cards-especialidade .card-btn"
);

especialidadeBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const especialidade = button.textContent;
    localStorage.setItem("especialidade", especialidade);
    const dadosCompletos = {
      tipo: tipoAtendimento,
      especialidade: especialidade,
    };
    console.log(dadosCompletos);
  });
});

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
