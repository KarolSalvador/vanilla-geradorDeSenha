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

    //Enviar dados da solicitação para o backend
    fetch("http://localhost:5000/gerar-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosCompletos),
    })
      .then((response) => response.json())
      .then((data) => {
        //recebe a resposta e salva a senha
        if (data.senha) {
          localStorage.setItem("senhaGerada", data.senha);
          //redireciona para tela de senha
          window.location.href = "senha.html";
        } else {
          console.error("Erro ao gerar senha:", data.erro);
          alert("Não foi possível gerar a senha. Tente novamente.");
        }
      })
      .catch((error) => {
        console.error("Erro na comunicação com o servidor:", error);
        alert(
          "Erro de conexão. Verifique se o servidor Node.js está rodando na porta 5000."
        );
      });
  });
});

if (voltarBtn) {
  voltarBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
