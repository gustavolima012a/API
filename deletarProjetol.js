async function carregarVendas() {
    try {
        const response = await fetch('http://localhost:3000/ambiental');
        if (!response.ok) throw new Error('Erro ao buscar projetos');
        const vendas = await response.json();

        let html = '<table><tr><th>ID</th><th>Nome do Projeto</th><th>Tipo</th><th>Descrição</th><th>Data Início</th><th>Data Fim</th><th>Ação</th></tr>';

        vendas.forEach(venda => {
            const dataInicio = venda.data_inicio ? venda.data_inicio.split('T')[0] : '';
            const dataFim = venda.data_fim ? venda.data_fim.split('T')[0] : '';
            html += `<tr id="venda-${venda.id}">
                <td>${venda.id}</td>
                <td>${venda.nome_projeto}</td>
                <td>${venda.tipo_projeto}</td>
                <td>${venda.descricao || ''}</td>
                <td>${dataInicio}</td>
                <td>${dataFim}</td>
                <td><button class="btn-deletar" onclick="deletarVenda(${venda.id})">🗑️</button></td>
            </tr>`;
        });

        html += '</table>';
        document.getElementById('tabelaVendas').innerHTML = html;
    } catch (err) {
        document.getElementById('tabelaVendas').innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}

async function deletarVenda(id) {
    if (!confirm(`Excluir projeto ID ${id}?`)) return;

    try {
        const response = await fetch(`http://localhost:3000/ambiental/${id}`, { method: 'DELETE' });
        if (response.ok) {
            document.getElementById(`venda-${id}`).remove();
            document.getElementById('message').textContent = 'Projeto excluído com sucesso!';
            document.getElementById('message').style.color = 'green';
        } else {
            const data = await response.json();
            document.getElementById('message').textContent = 'Erro: ' + (data.error || JSON.stringify(data));
            document.getElementById('message').style.color = 'red';
        }
    } catch (err) {
        document.getElementById('message').textContent = 'Erro na requisição: ' + err.message;
        document.getElementById('message').style.color = 'red';
    }
}

window.onload = carregarVendas;
