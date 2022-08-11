CREATE DATABASE catalogo_pokemons;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

DROP TABLE IF EXISTS pokemons;

CREATE TABLE pokemons (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    nome VARCHAR(150) NOT NULL,
    habilidades TEXT NOT NULL,
    imagem TEXT,
    apelido VARCHAR(150)
);
