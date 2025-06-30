const API_BASE_URL = "https://system-hospital-project.onrender.com/pacientes";

document.addEventListener('DOMContentLoaded', () => {
    carregarPacientes();
});

async function carregarPacientes() {
    const tabela = document.getElementById('tabelaPacientes').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    try {
        const response = await fetch(`${API_BASE_URL}/findAll`);
        if (!response.ok) throw new Error('Erro ao buscar pacientes da API');
        const pacientes = await response.json();

        pacientes.forEach(paciente => {
            const row = tabela.insertRow();
            row.innerHTML = `
                <td>${paciente.id}</td>
                <td>${paciente.nome}</td>
                <td>${paciente.idade}</td>
                <td>
                    <button class="btn-acao btn-editar" onclick="abrirModalEdicao(${paciente.id})">Editar</button>
                    <button class="btn-acao btn-excluir" onclick="confirmarExclusao(${paciente.id})">Excluir</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
        alert('Não foi possível carregar a lista de pacientes.');
    }
}

function abrirModalCadastro() {
    document.getElementById('modalTitulo').innerText = 'Adicionar Paciente';
    document.getElementById('formPaciente').reset();
    document.getElementById('pacienteId').value = '';
    document.getElementById('modalPaciente').classList.remove('hidden');
}

async function abrirModalEdicao(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/findById/${id}`);
        if (!response.ok) throw new Error('Paciente não encontrado');
        const paciente = await response.json();

        document.getElementById('modalTitulo').innerText = 'Editar Paciente';
        document.getElementById('pacienteId').value = paciente.id;
        document.getElementById('nome').value = paciente.nome;
        document.getElementById('idade').value = paciente.idade;
        
        document.getElementById('modalPaciente').classList.remove('hidden');
    } catch (error) {
        console.error('Erro ao buscar dados para edição:', error);
        alert('Não foi possível carregar os dados do paciente para edição.');
    }
}

function fecharModalCadastro() {
    document.getElementById('modalPaciente').classList.add('hidden');
}

async function salvarPaciente(event) {
    event.preventDefault();
    const id = document.getElementById('pacienteId').value;
    const nome = document.getElementById('nome').value;
    const idadeValue = document.getElementById('idade').value;
    const idade = parseInt(idadeValue, 10);

    if (isNaN(idade) || idade <= 0) {
        alert("Por favor, insira uma idade válida e positiva.");
        return;
    }

    const paciente = { nome, idade };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/update/${id}` : `${API_BASE_URL}/create`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paciente)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao salvar paciente');
        }
        fecharModalCadastro();
        carregarPacientes();
    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert(error.message);
    }
}

function confirmarExclusao(id) {
    const modal = document.getElementById('modalExcluir');
    modal.classList.remove('hidden');
    const btnConfirmar = document.getElementById('btnConfirmarExclusao');
    btnConfirmar.onclick = () => excluirPaciente(id);
}

function fecharModalExcluir() {
    document.getElementById('modalExcluir').classList.add('hidden');
}

async function excluirPaciente(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir paciente');
        }
        fecharModalExcluir();
        carregarPacientes();
    } catch (error) {
        console.error('Erro ao excluir:', error);
        alert('Não foi possível excluir o paciente.');
    }
}