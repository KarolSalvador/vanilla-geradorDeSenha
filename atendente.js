const guicheSelect = document.getElementById("guiche-select");
const chamarBtn = document.getElementById("chamar-btn");
const filaEsperaLista = document.getElementById("fila-espera-lista");

//função que busca e exibe a fila de espera
async function atualizarFilaEmEspera() {
  try {
    //retorna a fila completa e a última chamada
    const response = await fetch("http://localhost:5000/status-fila");
    const status = await response.json();

    //junta ambas as filas para exibir no painel, prioritária em cima
    const filaCompleta = [...status.filaPrioritaria, ...status.filaNormal];

    filaEsperaLista.innerHTML = "";

    if (filaCompleta.length === 0) {
      filaEsperaLista.innerHTML = "<li>Não há pacientes aguardando.</li>";
    } else {
      filaCompleta.forEach((paciente) => {
        const li = document.createElement("li");
        //add classe 'proritario' para estiizar
        if (paciente.tipo === "prioritario") {
          li.classList.add("prioritario");
          li.textContent = `P: ${paciente.especialidade} (Prioritário)`;
        } else {
          li.textContent = `N: ${paciente.especialidade}`;
        }
        filaEsperaLista.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Erro ao buscar status da fila:", error);
    filaEsperaLista.innerHTML = "<li>Erro de conexão com o servidor.</li>";
  }
}

//função para chamar o próximo paciente
async function chamarProximoPaciente() {
  const guicheSelecionado = guicheSelect.value;

  //obrigada atendente a escolher qual guichê
  if (!guicheSelecionado) {
    alert("Por favor, selecione seu guichê.");
    return;
  }

  try {
    //desabilita o botão para não chamar mais de uma vez
    chamarBtn.disabled = true;
    chamarBtn.textContent = "Chamando...";

    //envia para backend qual guiche
    const response = await fetch("http://localhost:5000/chamar-paciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guiche: guicheSelecionado }),
    });

    //armazena em resultado o retorno do json que foi armazenado em response
    const resultado = await response.json();

    if (resultado.paciente) {
      alert(
        `Chamando: ${resultado.paciente.senha} para o Guichê ${resultado.paciente.guiche}`
      );
    } else if (resultado.mensagem === "Fila vazia.") {
      alert("A fila de atendimento está vazia.");
    }

    //atualiza a lista após chamada
    atualizarFilaEmEspera();
  } catch (error) {
    console.error("Erro na chamada de paciente:", error);
    alert("Erro ao tentar chamar paciente. Verifique o servidor.");
  } finally {
    chamarBtn.disabled = false;
    chamarBtn.textContent = "Chamar Próximo Paciente";
  }
}

//inicialização da lógica adiciona ouvinte no botão de chamada
//ao ter um click no botão chamarBtn irá chamar a função chamarProximoPaciente
chamarBtn.addEventListener("click", chamarProximoPaciente);

//inicia a atualização da lista e repete a cada 3 segundos, lista atualziada em tempo real
atualizarFilaEmEspera();
setInterval(atualizarFilaEmEspera, 3000);
