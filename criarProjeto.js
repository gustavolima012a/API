document.getElementById('formVendaCombustivel').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome_projeto = document.getElementById('nome_projeto').value.trim();
    const tipo_projeto = document.getElementById('tipo_projeto').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const data_inicio = document.getElementById('data_inicio').value || null;
    const data_fim = document.getElementById('data_fim').value || null;

    // validação básica
    if (!nome_projeto || !tipo_projeto) {
        document.getElementById('message').textContent = 'Nome e tipo do projeto são obrigatórios.';
        document.getElementById('message').style.color = 'red';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/ambiental', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome_projeto, tipo_projeto, descricao, data_inicio, data_fim })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message').textContent = 'Projeto cadastrado com sucesso!';
            document.getElementById('message').style.color = 'green';
            document.getElementById('formVendaCombustivel').reset();
        } else {
            document.getElementById('message').textContent = 'Erro: ' + (data.error || JSON.stringify(data));
            document.getElementById('message').style.color = 'red';
        }
    } catch (err) {
        document.getElementById('message').textContent = 'Erro na requisição: ' + err.message;
        document.getElementById('message').style.color = 'red';
    }
});
