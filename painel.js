//coleta dos elementos do painel
const senhaChamadaDisplay = document.getElementById("senha-chamada");
const guicheChamadoDisplay = document.getElementById("guiche-chamado");
const historicoLista = document.getElementById("historico-lista");

//array para salvar histórico
let historicoChamadas = [];

//função que vai buscar qual a próxima senha
async function buscarProximaSenha() {
  try {
    //rota que o back usa para chamar próx paciente
    const response = await fetch("http://localhost:5000/chamar-proximo");
    const data = await response.json();

    //se houver senha, atualiza painel
    if (data.senha) {
      atualizarPainel(data);
      adicionarAoHistorico(data);

      //se fila estiver vazia entra no else
    } else {
      senhaChamadaDisplay.textContent = "AGUARDE";
      guicheChamadoDisplay.textContent = "00";
    }
  } catch (error) {
    console.error("Erro ao buscar senha:", error);
    senhaChamadaDisplay.textContent = "ERRO DE CONEXÃO";
    guicheChamadoDisplay.textContent = "00";
  }
}

//função para atualziar principais elementos da tela
function atualizarPainel(paciente) {
  senhaChamadaDisplay.textContent = paciente.senha;
  guicheChamadoDisplay.textContent = paciente.guiche;

  //efeito de piscar na tela para maior interatividade
  const principal = document.querySelector(".chamada-atual");
  principal.classList.add("chamada-nova");
  setTimeout(() => {
    principal.classList.remove("chamada-nova");
  }, 1500);
}

//função para persistência do histórico recente
function adicionarAoHistorico(paciente) {
  const item = `${paciente.senha} - Guichê ${paciente.guiche}`;
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

//chama a função a cada 5 segundos para verificar se houve uma nova senha chamada
setInterval(buscarProximaSenha, 5000);
