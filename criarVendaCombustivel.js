document.getElementById('formVendaCombustivel').addEventListener('submit', async function (e) {
    e.preventDefault();

    const tipo_combustivel = document.getElementById('tipo_combustivel').value;
    const preco = document.getElementById('preco').value;
    const volume_abastecido = document.getElementById('volume_abastecido').value;
    const data_abastecimento = document.getElementById('data_abastecimento').value;

    const response = await fetch('http://localhost:3000/vendaCombustivel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo_combustivel, preco, volume_abastecido, data_abastecimento })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').textContent = 'Venda de combustível cadastrada!';
        document.getElementById('formVendaCombustivel').reset();
    } else {
        document.getElementById('message').textContent = 'Erro: ' + data.error;
    }
});


