const express = require("express");

const usuarios = require("./controllers/usuarios");
const pokemons = require("./controllers/pokemons");

const rotas = express();

//     usuários
rotas.post("/cadastrar", usuarios.cadastrarUsuario);
rotas.post("/login", usuarios.loginUsuario);

//     pokemons
rotas.get("/pokemons", pokemons.listarPokemons);
rotas.post("/pokemons", pokemons.cadastrarPokemon);
rotas.get("/pokemons/:id", pokemons.mostrarPokemon);
rotas.put("/pokemons/:id", pokemons.atualizarApelidoPokemon);
rotas.delete("/pokemons/:id", pokemons.excluirPokemon);

module.exports = {
    rotas
};
