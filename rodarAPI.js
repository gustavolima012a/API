const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

/**
 * ROTAS CRUD para Projetos Ambientais (tabela: ambiental)
 *
 * POST   /projetoAmbiental        -> criar novo projeto
 * GET    /projetoAmbiental        -> listar todos
 * PUT    /projetoAmbiental/:id    -> atualizar
 * DELETE /projetoAmbiental/:id    -> excluir
 */

// Criar projeto ambiental
app.post('/projetoAmbiental', (req, res) => {
    const { nome_projeto, tipo_projeto, descricao, data_inicio, data_fim } = req.body;

    if (!nome_projeto || !tipo_projeto) {
        return res.status(400).json({ error: 'nome_projeto e tipo_projeto são obrigatórios' });
    }

    const sql = 'INSERT INTO ambiental (nome_projeto, tipo_projeto, descricao, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)';
    acessaBancoNoServidor.query(
        sql,
        [nome_projeto, tipo_projeto, descricao || null, data_inicio || null, data_fim || null],
        (err, results) => {
            if (err) {
                console.error('DB error (INSERT):', err);
                return res.status(500).json({ error: 'Erro ao cadastrar projeto' });
            }
            res.status(201).json({ message: 'Projeto cadastrado!', id: results.insertId });
        }
    );
});

// Listar projetos
app.get('/projetoAmbiental', (req, res) => {
    const sql = 'SELECT * FROM ambiental';
    acessaBancoNoServidor.query(sql, (err, results) => {
        if (err) {
            console.error('DB error (SELECT):', err);
            return res.status(500).json({ error: 'Erro ao buscar projetos' });
        }
        res.json(results);
    });
});

// Atualizar projeto
app.put('/projetoAmbiental/:id', (req, res) => {
    const id = req.params.id;
    const { nome_projeto, tipo_projeto, descricao, data_inicio, data_fim } = req.body;

    if (!nome_projeto || !tipo_projeto) {
        return res.status(400).json({ error: 'nome_projeto e tipo_projeto são obrigatórios' });
    }

    const sql = 'UPDATE ambiental SET nome_projeto = ?, tipo_projeto = ?, descricao = ?, data_inicio = ?, data_fim = ? WHERE id = ?';
    acessaBancoNoServidor.query(
        sql,
        [nome_projeto, tipo_projeto, descricao || null, data_inicio || null, data_fim || null, id],
        (err, result) => {
            if (err) {
                console.error('DB error (UPDATE):', err);
                return res.status(500).json({ error: 'Erro ao atualizar projeto' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Projeto não encontrado' });
            }

            res.json({ message: 'Projeto atualizado com sucesso!' });
        }
    );
});

// Deletar projeto
app.delete('/projetoAmbiental/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM ambiental WHERE id = ?';

    acessaBancoNoServidor.query(sql, [id], (err, result) => {
        if (err) {
            console.error('DB error (DELETE):', err);
            return res.status(500).json({ error: 'Erro ao deletar projeto' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }

        res.json({ message: 'Projeto excluído com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
