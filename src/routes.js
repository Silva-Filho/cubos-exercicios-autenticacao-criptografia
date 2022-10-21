const express = require( "express" );

// middlewares
const usuariosMiddlewares = require( "./middlewares/usuarios" );
const loginMiddlewares = require( "./middlewares/login" );
const { verificarOuValidarToken } = require( "./middlewares/auth" );
const pokemonsMiddleware = require( "./middlewares/pokemons" );
const { validarIdParams } = require( "./middlewares/idParams" );

// controllers
const usuariosController = require( "./controllers/usuarios" );
const loginController = require( "./controllers/login" );
const pokemonsController = require( "./controllers/pokemons" );

const rotas = express();

//     usuários
rotas.post(
    "/cadastrar",
    usuariosMiddlewares.validarBodyCadastroUsuario,
    usuariosMiddlewares.verificarEmail,
    usuariosController.cadastrarUsuario
);

//     login
rotas.post(
    "/login",
    loginMiddlewares.validarBodyLogin,
    usuariosMiddlewares.verificarEmail,
    usuariosMiddlewares.validarSenhaUsuario,
    loginController.loginUsuario
);

//     autenticação
rotas.use( verificarOuValidarToken );

//     pokemons
rotas.post(
    "/pokemons",
    pokemonsMiddleware.validarBodyCadastroPokemon,
    pokemonsController.cadastrarPokemon
);
rotas.get(
    "/pokemons",
    pokemonsController.listarPokemons
);
//     id
// rotas.use( validarIdParams );
rotas.get(
    "/pokemons/:id",
    validarIdParams,
    pokemonsMiddleware.verificarPokemonExiste,
    pokemonsController.mostrarPokemon
);
rotas.patch(
    "/pokemons/:id",
    validarIdParams,
    pokemonsMiddleware.verificarPokemonExiste,
    pokemonsMiddleware.verificarOuValidarApelidoPokemon,
    pokemonsController.atualizarApelidoPokemon
);
rotas.delete(
    "/pokemons/:id",
    validarIdParams,
    pokemonsMiddleware.verificarPokemonExiste, 
    pokemonsController.excluirPokemon
);

module.exports = {
    rotas
};
