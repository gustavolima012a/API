let editandoId = null;

async function carregarVendas() {
    try {
        const response = await fetch('http://localhost:3000/projetoAmbiental');
        if (!response.ok) throw new Error('Erro ao buscar projetos');
        const projetos = await response.json();

        let html = '<table><tr><th>ID</th><th>Nome do Projeto</th><th>Tipo</th><th>Descrição</th><th>Data Início</th><th>Data Fim</th><th>Ação</th></tr>';

        projetos.forEach(proj => {
            const dataInicio = proj.data_inicio ? proj.data_inicio.split('T')[0] : '';
            const dataFim = proj.data_fim ? proj.data_fim.split('T')[0] : '';
            const descricaoCurta = proj.descricao ? (proj.descricao.length > 80 ? proj.descricao.slice(0, 77) + '...' : proj.descricao) : '';
            html += `<tr id="venda-${proj.id}">
                <td>${proj.id}</td>
                <td id="c-${proj.id}-0">${proj.nome_projeto}</td>
                <td id="c-${proj.id}-1">${proj.tipo_projeto}</td>
                <td id="c-${proj.id}-2">${descricaoCurta}</td>
                <td id="c-${proj.id}-3" data-val="${dataInicio}">${dataInicio}</td>
                <td id="c-${proj.id}-4" data-val="${dataFim}">${dataFim}</td>
                <td><button class="btn-editar" onclick="editarVenda(${proj.id})">✏️</button></td>
            </tr>`;
        });

        document.getElementById('tabelaVendas').innerHTML = html + '</table>';
    } catch (err) {
        document.getElementById('tabelaVendas').innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}

function editarVenda(id) {
    if (editandoId) return alert('Salve ou cancele a edição atual primeiro!');

    editandoId = id;
    const nome = document.getElementById(`c-${id}-0`).textContent;
    const tipo = document.getElementById(`c-${id}-1`).textContent;
    const descricao = document.getElementById(`c-${id}-2`).textContent;
    const dataInicio = document.getElementById(`c-${id}-3`).getAttribute('data-val') || '';
    const dataFim = document.getElementById(`c-${id}-4`).getAttribute('data-val') || '';

    document.getElementById(`c-${id}-0`).innerHTML = `<input id="i-${id}-0" value="${escapeHtml(nome)}">`;
    document.getElementById(`c-${id}-1`).innerHTML = `<input id="i-${id}-1" value="${escapeHtml(tipo)}">`;
    document.getElementById(`c-${id}-2`).innerHTML = `<textarea id="i-${id}-2" rows="2">${escapeHtml(descricao)}</textarea>`;
    document.getElementById(`c-${id}-3`).innerHTML = `<input type="date" id="i-${id}-3" value="${dataInicio}">`;
    document.getElementById(`c-${id}-4`).innerHTML = `<input type="date" id="i-${id}-4" value="${dataFim}">`;

    document.querySelector(`#venda-${id} td:last-child`).innerHTML = `
        <button class="btn-salvar" onclick="salvarVenda(${id})">💾</button>
        <button class="btn-cancelar" onclick="cancelarEdicao()">❌</button>`;
}

async function salvarVenda(id) {
    try {
        const payload = {
            nome_projeto: document.getElementById(`i-${id}-0`).value,
            tipo_projeto: document.getElementById(`i-${id}-1`).value,
            descricao: document.getElementById(`i-${id}-2`).value,
            data_inicio: document.getElementById(`i-${id}-3`).value,
            data_fim: document.getElementById(`i-${id}-4`).value
        };

        const response = await fetch(`http://localhost:3000/projetoAmbiental/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            editandoId = null;
            carregarVendas();
        } else {
            const err = await response.json();
            alert('Erro ao atualizar: ' + (err.error || JSON.stringify(err)));
        }
    } catch (err) {
        alert('Erro na requisição: ' + err.message);
    }
}

function cancelarEdicao() {
    editandoId = null;
    carregarVendas();
}

function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

window.onload = carregarVendas;
