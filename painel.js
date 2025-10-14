//coleta dos elementos do painel
const senhaChamadaDisplay = document.getElementById("senha-chamada");
const guicheChamadoDisplay = document.getElementById("guiche-chamado");
const historicoLista = document.getElementById("historico-lista");

//array para salvar histórico
let historicoChamadas = [];
let ultimaSenhaExibida = "";

//Monitora a última chamada feita pelo atendente
async function monitorarChamadas() {
  try {
    const response = await fetch("http://localhost:5000/status-fila");
    const status = await response.json();

    // CORREÇÃO: Usar a chave correta retornada pelo servidor (ultimaSenhaChamada)
    const ultimaChamada = status.ultimaSenhaChamada;

    if (ultimaChamada.senha !== ultimaSenhaExibida) {
      // Se a senha mudou, atualiza a tela
      atualizarPainel(ultimaChamada);
      adicionarAoHistorico(ultimaChamada);
      ultimaSenhaExibida = ultimaChamada.senha;
    }
  } catch (error) {
    console.error("Erro ao buscar status:", error);
  }
}

//função para atualizar os elementos na tela
function atualizarPainel(paciente) {
  senhaChamadaDisplay.textContent = paciente.senha;
  guicheChamadoDisplay.textContent = paciente.guiche;

  //efeito de destaque
  const principal = document.querySelector(".chamada-atual");
  principal.classList.add("chamada-nova");
  setTimeout(() => {
    principal.classList.remove("chamada-nova");
  }, 1500);
}

//função para persistência do histórico recente
function adicionarAoHistorico(paciente) {
  //evita colocar o valor inicial de '--' ao histórico
  if (paciente.senha === "--") return;

  const tipoTexto = paciente.tipo === "prioritario" ? " (P)" : " (N)";
  const item = `${paciente.senha} - Guichê ${paciente.guiche}${tipoTexto}`;
  historicoChamadas.unshift(item); //unshift adiciona ao inicio do array para ter como visualização em cima, mostrando ser o último a ter sido chamado

  //limitar histórico a 5 itens
  if (historicoChamadas.length > 5) {
    historicoChamadas.pop(); //metodo pop() remove o último item do array
  }

  //atualizar a lista HTML
  historicoLista.innerHTML = ""; //limpa a lista existente
  historicoChamadas.forEach((chamada) => {
    //para cada item do historico
    const li = document.createElement("li"); //cria um elemento HTML do tipo li
    li.textContent = chamada; //adiciona a esse elemento o conteudo da chamada
    historicoLista.appendChild(li); // adiciona o novo elemento li como um filho do historicoLista
  });
}

// Inicia o monitoramento a cada 3 segundos
monitorarChamadas();
setInterval(monitorarChamadas, 3000);
