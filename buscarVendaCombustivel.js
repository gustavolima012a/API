async function listarTodos() {
    try {
        const buscaNoBancoDeDados = await fetch('http://localhost:3000/projetoAmbiental');
        if (!buscaNoBancoDeDados.ok) throw new Error('Erro ao listar projetos');
        const respostaObtida = await buscaNoBancoDeDados.json();
        console.log(respostaObtida);
        let html = '<table border="1"><tr><th>id</th><th>Nome do Projeto</th><th>Tipo</th><th>Descrição</th><th>Data Início</th><th>Data Fim</th></tr>';

        respostaObtida.forEach(projeto => {
            const dataInicio = projeto.data_inicio ? projeto.data_inicio.split('T')[0] : '';
            const dataFim = projeto.data_fim ? projeto.data_fim.split('T')[0] : '';
            const desc = projeto.descricao ? projeto.descricao : '';
            html += `<tr>
                <td>${projeto.id}</td>
                <td>${projeto.nome_projeto}</td>
                <td>${projeto.tipo_projeto}</td>
                <td>${desc}</td>
                <td>${dataInicio}</td>
                <td>${dataFim}</td>
            </tr>`;
        });

        html += '</table>';
        document.getElementById('resultado').innerHTML = html;
    } catch (err) {
        document.getElementById('resultado').innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}
