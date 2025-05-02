let metodoSelecionado = "";

function alterarQuantidade(id, valor) {
  const quantidadeSpan = document.getElementById(`quantidade-${id}`);
  let atual = parseInt(quantidadeSpan.innerText);
  atual = Math.max(0, atual + valor);
  quantidadeSpan.innerText = atual;
}

function selecionarPagamento(botao, metodo) {
  document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('selected'));
  botao.classList.add('selected');
  metodoSelecionado = metodo;

  // Mostrar inputs de nome e sala ao selecionar o método
  document.getElementById('detalhes-pedido').style.display = 'flex';
}

function enviarMensagem() {
  if (!metodoSelecionado) {
    alert("Por favor, selecione um método de pagamento.");
    return;
  }

  const clientes = document.getElementById("nomeCliente").value.trim();
  const velorio = document.getElementById("salaVelorio").value.trim();

  if (clientes === "" || velorio === "") {
    alert("Por favor, preencha o nome do responsável e a sala de velório para a identificação");
    return;
  }


  const itens = [
    { id: 1, nome: "Croissant", preco: 9.00 },
    { id: 2, nome: "Pão de queijo", preco: 8.00 },
    { id: 3, nome: "Pão de queijo (90g)", preco: 6.00 },
    { id: 4, nome: "Pão de Batata", preco: 9.00 },
    { id: 5, nome: "Esfiha", preco: 9.00 },
    { id: 6, nome: "Bauru", preco: 9.00 },
    { id: 7, nome: "Hamburgão", preco: 9.00 },
    { id: 8, nome: "Suco", preco: 8.00 },
    { id: 9, nome: "Café Expresso", preco: 8.00 },
    { id: 10, nome: "Café com leite", preco: 9.00 },
    { id: 11, nome: "Refrigerante", preco: 9.00 },
    { id: 12, nome: "Agua", preco: 9.00 },
    { id: 13, nome: "Agua de coco", preco: 8.00 },
    { id: 14, nome: "Buffet Completo", preco: 300.00 },
    { id: 15, nome: "Reposição de café", preco: 70.00 },
    { id: 16, nome: "Reposição de Água", preco: 30.00 },
    { id: 17, nome: "Combo 1", preco: 14.00 },
    { id: 18, nome: "Combo 2", preco: 16.00 },
    { id: 19, nome: "Combo 3", preco: 28.00 },
  
  ];

  let mensagem = "Olá! Gostaria de fazer um pedido:%0A\n";
  let total = 0;

  itens.forEach(item => {
    const quantidade = parseInt(document.getElementById(`quantidade-${item.id}`).innerText);
    if (quantidade > 0) {
      mensagem += `• ${item.nome} ${quantidade}x = R$ ${(item.preco * quantidade).toFixed(2)}%0A\n`;
      total += item.preco * quantidade;
    }
  });

  if (total === 0) {
    alert("Adicione ao menos um item ao pedido.");
    return;
  }

  mensagem += `Total: R$ ${total.toFixed(2)}%0A`;
  mensagem += `Pagamento: ${metodoSelecionado}%0A`;

  // Capturar nome e sala
  const nome = document.getElementById("nomeCliente")?.value.trim();
  const sala = document.getElementById("salaVelorio")?.value.trim();

  if (nome || sala) {
    mensagem += `%0A📝 Informações do pedido:%0A`;
    if (nome) mensagem += `• Nome: ${nome}%0A`;
    if (sala) mensagem += `• Sala de velório: ${sala}%0A`;
  }

  const telefone = "976035628";
  window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
}

function scrollPara(id) {
  const destino = document.getElementById(id);
  destino.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function () {
  const avisoAberto = document.getElementById("aviso-aberto");
  const avisoFechado = document.getElementById("aviso-horario");

  // Define o horário de funcionamento
  const horaAbertura = 7;
  const minutoAbertura = 30;
  const horaFechamento = 15;
  const minutoFechamento = 30;

  // Pega o horário atual
  const agora = new Date();
  const horaAtual = agora.getHours();
  const minutoAtual = agora.getMinutes();

  // Converte para minutos totais para facilitar a comparação
  const minutosAtuais = horaAtual * 60 + minutoAtual;
  const minutosAbertura = horaAbertura * 60 + minutoAbertura;
  const minutosFechamento = horaFechamento * 60 + minutoFechamento;

  if (minutosAtuais >= minutosAbertura && minutosAtuais <= minutosFechamento) {
    avisoAberto.style.display = "inline-block";
    avisoFechado.style.display = "none";
  } else {
    avisoAberto.style.display = "none";
    avisoFechado.style.display = "inline-block";
  }
});


  if (dentroDoHorario) {
    botao.disabled = false;
    botao.textContent = "Pedir pelo WhatsApp";
    botao.style.backgroundColor = "#25D366";
    botao.style.cursor = "pointer";
    avisoAberto.style.display = "inline-block";
    avisoFechado.style.display = "none";
  } else {
    botao.disabled = true;
    botao.textContent = "Fora do horário de atendimento";
    botao.style.backgroundColor = "gray";
    botao.style.cursor = "not-allowed";
    avisoFechado.style.display = "inline-block";
    avisoAberto.style.display = "none";
  }


// Chamar quando carregar a página
verificarHorario();

// Mostrar inputs ao selecionar forma de pagamento
document.querySelectorAll('.payment-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('detalhes-pedido').style.display = 'flex';
  });
});

