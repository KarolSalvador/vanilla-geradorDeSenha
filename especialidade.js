const tipoAtendimento = localStorage.getItem("tipoAtendimento");

const especialidadeBtns = document.querySelectorAll(
  ".cards-especialidade .card-btn"
);
const voltarBtn = document.getElementById("voltar-btn");

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
