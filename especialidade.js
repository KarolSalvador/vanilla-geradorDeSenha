const tipoAtendimento = localStorage.getItem("tipoAtendimento");

const especialidadeBtns = document.querySelectorAll(
  ".cards-especialidade .card-btn"
);

const voltarBtn = document.getElementById("voltar-btn");

especialidadeBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const especialidade = button.textContent;
    localStorage.setItem("especialidade", especialidade);

    window.location.href = "senha.html";
  });
});

if (voltarBtn) {
  voltarBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
