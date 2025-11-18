CREATE DATABASE IF NOT EXISTS ong_ambiental;
USE ong_ambiental;

CREATE TABLE IF NOT EXISTS vendas_combustivel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(50) NOT NULL,
    litros DECIMAL(10,2) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_venda DATE NOT NULL
);
