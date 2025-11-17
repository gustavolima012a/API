let editandoId = null;

async function carregarVendas() {
    const response = await fetch('http://localhost:3000/vendaCombustivel');
    const vendas = await response.json();

    let html = '<table><tr><th>ID</th><th>Tipo de Combustível</th><th>Preço</th><th>Volume Abastecido</th><th>Data Abastecimento</th><th>Ação</th></tr>';

    vendas.forEach(venda => {
        const data = venda.data_abastecimento.split('T')[0];
        html += `<tr id="venda-${venda.id}">
        <td>${venda.id}</td>
        <td id="c-${venda.id}-0">${venda.tipo_combustivel}</td>
        <td id="c-${venda.id}-1">${venda.preco}</td>
        <td id="c-${venda.id}-2">${venda.volume_abastecido}</td>
        <td id="c-${venda.id}-3" data-val="${data}">${data}</td>
        <td><button class="btn-editar" onclick="editarVenda(${venda.id})">✏️</button></td>
        </tr>`;
    });

    document.getElementById('tabelaVendas').innerHTML = html + '</table>';
}

function editarVenda(id) {
    if (editandoId) return alert('Salve ou cancele a edição atual primeiro!');

    editandoId = id;
    document.getElementById(`c-${id}-0`).innerHTML = `<input id="i-${id}-0" value="${document.getElementById(`c-${id}-0`).textContent}">`;
    document.getElementById(`c-${id}-1`).innerHTML = `<input type="number" id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-2`).innerHTML = `<input type="number" id="i-${id}-2" value="${document.getElementById(`c-${id}-2`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-3`).innerHTML = `<input type="date" id="i-${id}-3" value="${document.getElementById(`c-${id}-3`).getAttribute('data-val')}">`;

    document.querySelector(`#venda-${id} td:last-child`).innerHTML = `
        <button class="btn-salvar" onclick="salvarVenda(${id})">💾</button>
        <button class="btn-cancelar" onclick="cancelarEdicao()">❌</button>`;
}

async function salvarVenda(id) {
    const response = await fetch(`http://localhost:3000/vendaCombustivel/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tipo_combustivel: document.getElementById(`i-${id}-0`).value,
            preco: document.getElementById(`i-${id}-1`).value,
            volume_abastecido: document.getElementById(`i-${id}-2`).value,
            data_abastecimento: document.getElementById(`i-${id}-3`).value
        })
    });

    if (response.ok) {
        editandoId = null;
        carregarVendas();
    } else {
        alert('Erro ao atualizar!');
    }
}

function cancelarEdicao() {
    editandoId = null;
    carregarVendas();
}

window.onload = carregarVendas;