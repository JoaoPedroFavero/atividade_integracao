DROP DATABASE IF EXISTS lojinha;

CREATE DATABASE lojinha;
USE lojinha;

CREATE TABLE produtos (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco DOUBLE NOT NULL
);

INSERT INTO produtos (nome, descricao, preco) VALUES
('Notebook Dell', 'Notebook Dell Inspiron 15, 16GB RAM e SSD 512GB', 4599.90),
('Mouse Logitech', 'Mouse sem fio Logitech com conexão USB', 129.90),
('Teclado Mecânico', 'Teclado mecânico RGB com switches blue', 249.90),
('Monitor Samsung', 'Monitor LED Samsung de 24 polegadas Full HD', 899.90),
('Headset Gamer', 'Headset gamer com microfone integrado e áudio estéreo', 199.90),
('Webcam Logitech', 'Webcam Full HD 1080p para reuniões e transmissões', 329.90),
('SSD Kingston', 'SSD Kingston de 1TB com conexão SATA III', 499.90),
('Memória RAM', 'Memória RAM DDR4 de 16GB 3200MHz', 279.90),
('Mousepad Gamer', 'Mousepad gamer extra grande com superfície antiderrapante', 79.90),
('Cadeira Gamer', 'Cadeira gamer ergonômica com apoio lombar ajustável', 1199.90);
