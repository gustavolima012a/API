
USE ong_ambiental;

CREATE TABLE ambiental (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_projeto VARCHAR(100) NOT NULL,
    tipo_projeto VARCHAR(50) NOT NULL, -- reflorestamento, reciclagem, limpeza, etc.
    descricao TEXT,
    data_inicio DATE,
    data_fim DATE
);

SELECT * FROM ambiental;
