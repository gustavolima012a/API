async function listarTodos() {
    const resultado = document.getElementById('resultado');

    try {
        const resposta = await fetch('http://localhost:3000/ambiental');

        if (!resposta.ok) {
            throw new Error('Erro ao listar projetos');
        }

        const projetos = await resposta.json();

        // Monta a tabela
        let html = `
            <table border="1">
                <tr>
                    <th>ID</th>
                    <th>Nome do Projeto</th>
                    <th>Tipo</th>
                    <th>Descrição</th>
                    <th>Data Início</th>
                    <th>Data Fim</th>
                </tr>
        `;

        projetos.forEach(projeto => {
            const dataInicio = projeto.data_inicio ? projeto.data_inicio.split('T')[0] : '';
            const dataFim = projeto.data_fim ? projeto.data_fim.split('T')[0] : '';

            html += `
                <tr>
                    <td>${projeto.id}</td>
                    <td>${projeto.nome_projeto}</td>
                    <td>${projeto.tipo_projeto}</td>
                    <td>${projeto.descricao ?? ''}</td>
                    <td>${dataInicio}</td>
                    <td>${dataFim}</td>
                </tr>
            `;
        });

        html += `</table>`;
        resultado.innerHTML = html;

    } catch (err) {
        resultado.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}
