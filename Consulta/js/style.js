let consultaAtual = null; // Usado para edição

function findAllCon() {
  fetch('https://system-hospital-project.onrender.com/consultas/findAll')
    .then(resposta => resposta.json())
    .then(consultas => {
      const tabela = document.querySelector('.tal-con');

      // Limpa as linhas antigas (menos o cabeçalho)
      while (tabela.rows.length > 1) {
        tabela.deleteRow(1);
      }

      // Adiciona cada item na tabela
      consultas.forEach(item => {
        const novaLinha = tabela.insertRow();

        const colPaciente = novaLinha.insertCell(0);
        const colEspecialidade = novaLinha.insertCell(1);
        const colData = novaLinha.insertCell(2);
        const colAcoes = novaLinha.insertCell(3);

        // Dados reais
        colPaciente.innerText = item.paciente.nome;
        colEspecialidade.innerText = item.medico.especialidade;
        colData.innerText = `${item.data} às ${item.horario}`;

        // Botões de ação
        colAcoes.innerHTML = `
          <button onclick='editar(${JSON.stringify(item)})'><img src="./imgs/edit.png"></button>
          <button onclick='verDetalhes(${JSON.stringify(item)})'><img src="./imgs/student.png"></button>
          <button onclick='excluir(${item.id})'><img src="./imgs/bin.png"></button>
        `;
      });
    })
    .catch(erro => {
      console.error('Erro ao buscar dados:', erro);
    });
}


// #region Início do Editar
function editar(item) {
  consultaAtual = item;
  
  document.getElementById('editarId').value = item.id; 
  document.getElementById('editarDescricao').value = item.descricao;
  document.getElementById('editarData').value = formatarDataISO(item.data);
  document.getElementById('editarHora').value = item.horario;
  document.getElementById('editarMedicoId').value = item.medico.id;
  document.getElementById('editarPacienteId').value = item.paciente.id;
  document.getElementById('modalEditar').classList.remove('hidden'); 
}

function fecharModalEditar(){
  document.getElementById('modalEditar').classList.add('hidden');
}

function salvarEdicao(event){
  event.preventDefault();

  const id = document.getElementById('editarId').value;
  const descricao = document.getElementById('editarDescricao').value;
  const data = document.getElementById('editarData').value;
  const horario = document.getElementById('editarHora').value;
  const medico_id = document.getElementById('editarMedicoId').value;
  const paciente_id = document.getElementById('editarPacienteId').value;

  const [ano, mes, dia] = data.split('-');
  const dataFormatada = `${dia}/${mes}/${ano}`;

  fetch(`https://system-hospital-project.onrender.com/consultas/update/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      descricao,
      data: formatarDataBR(data),
      horario,
      medico_id,
      paciente_id
    })
  })
  .then(res => {
    if(res.ok){
      alert('Consulta atualizada!');
      fecharModalEditar();
      findAllCon();
    }else{
      alert('Erro ao atualizar.')
    }
  });
}

function formatarDataISO(dataBR) {
  const [dia, mes, ano] = dataBR.split('/');
  return `${ano}-${mes}-${dia}`;
}

function formatarDataBR(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}
// #endregion Fim do Editar

// #region  Início de Detalhes
function verDetalhes(item) {
  const texto = `
  <strong>Paciente: </strong> ${item.paciente.nome} (${item.paciente.idade} anos)<br>
  <strong>Médico: </strong> ${item.medico.nome}<br>
  <strong>Especialidade: </strong> ${item.medico.especialidade} <br>
  <strong>Data: </strong> ${item.data} às ${item.horario} <br>
  <strong>Descrição: </strong> ${item.descricao}
  `;
  
  document.getElementById('detalhesTexto').innerHTML = texto;
  document.getElementById('modal').classList.remove('hidden');
}

function fecharModal(){
  document.getElementById('modal').classList.add('hidden')
}
// #endregion  Fim de Detalhes

// #region Início do Excluir
function excluir(id) {
  const confirmar = confirm("Tem certeza que deseja excluir?");

  if(!confirmar) return

  fetch(`https://system-hospital-project.onrender.com/consultas/delete/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if(res.ok){
      alert('Consulta cancelada com sucesso.');
      findAllCon();
    }else{
      alert('Erro ao excluir.');
    }
  });
}
// #endregion Fim do Excluir

// #region Início do Adicionar

function abrirModalAdd(){
  document.getElementById('modalAdicionar').classList.remove('hidden');
}

function fecharModalAdd(){
  document.getElementById('modalAdicionar').classList.add('hidden');
}

function salvarNovaCon(event){
  event.preventDefault();

  const descricao = document.getElementById('novaDescricao').value;
  const data = document.getElementById('novaData').value;
  const horario = document.getElementById('novaHora').value;
  const medico_id = document.getElementById('novaMedicoId').value;
  const paciente_id = document.getElementById('novaPacienteId').value;

  fetch("https://system-hospital-project.onrender.com/consultas/create", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      descricao,
      data: formatarDataBR(data),
      horario,
      medico_id,
      paciente_id
    })
  })
  .then(async res => {
    if (res.ok) {
      alert("Consulta adicionada!");
      fecharModalAdd();
      findAllCon();
    } else {
      const mensagem = await res.text(); // tenta obter mensagem do backend
      alert("Erro ao adicionar: " + mensagem);
    }
  })
  .catch(err => {
    console.error('Erro de rede ou JS:', err);
    alert("Erro de rede ou backend.");
  });
}

// #endregion Fim do Adicionar

window.onload = findAllCon;