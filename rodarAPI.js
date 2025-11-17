const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Criar vendas de combustível
app.post('/vendaCombustivel', (req, res) => {
    const { tipo_combustivel, preco, volume_abastecido, data_abastecimento } = req.body;

    const codigoDoMySQL = 'INSERT INTO postos_de_gasolina (tipo_combustivel, preco, volume_abastecido, data_abastecimento) VALUES (?, ?, ?, ?)';

    acessaBancoNoServidor.query(codigoDoMySQL, [tipo_combustivel, preco, volume_abastecido, data_abastecimento], (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao cadastrar' });
        }
        res.json({ message: 'Venda de combustível cadastrada!' });
    });
});

// Listar vendas de combustível
app.get('/vendaCombustivel', (req, res) => {
    const codigoDoMySQL = 'SELECT * FROM postos_de_gasolina';

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao buscar' });
        }
        res.json(results);
    });
});

// Deletar venda de combustível
app.delete('/vendaCombustivel/:id', (req, res) => {
    const id = req.params.id;
    const codigoDoMySQL = 'DELETE FROM postos_de_gasolina WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar venda' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }

        res.json({ message: 'Venda excluída com sucesso!' });
    });
});

// Atualizar venda de combustível
app.put('/vendaCombustivel/:id', (req, res) => {
    const id = req.params.id;
    const { tipo_combustivel, preco, volume_abastecido, data_abastecimento } = req.body;

    const codigoDoMySQL = 'UPDATE postos_de_gasolina SET tipo_combustivel = ?, preco = ?, volume_abastecido = ?, data_abastecimento = ? WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [tipo_combustivel, preco, volume_abastecido, data_abastecimento, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar venda' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }

        res.json({ message: 'Venda atualizada com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
