const conexao = require( "../database/conexao" );

const cadastrarPokemon = async ( req, res ) => {
    try {
        const { nome, habilidades, imagem, apelido } = req.body;
        const { usuario } = req;

        const query = `
            insert into pokemons (usuario_id, nome, habilidades, imagem, apelido) 
            values ($1, $2, $3, $4, $5)
        `;
        // @ts-ignore
        const pokemon = await conexao.query( query, [ usuario.id, nome, habilidades, imagem, apelido ] );

        if ( pokemon.rowCount === 0 ) {
            return res.status( 400 ).json( "Não foi possível cadastrar o pokemon." );
        }

        return res.status( 200 ).json( "Pokemon cadastrado com sucesso." );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

const listarPokemons = async ( req, res ) => {
    try {
        const { usuario } = req;

        const query = `
            select 
                p.id, 
                u.nome as usuario, 
                p.nome, 
                p.apelido, 
                p.habilidades, 
                p.imagem 
            from pokemons p
            left join usuarios u on u.id = p.usuario_id
            where p.usuario_id = $1
        `;

        const { rows: pokemons } = await conexao.query( query, [ usuario.id ] );

        const listaPokemonsAtualizada = pokemons.map( pokemon => {
            return {
                ...pokemon,
                // @ts-ignore
                habilidades: pokemon.habilidades.split( ", " )
            };
        } );

        return res.status( 200 ).json( listaPokemonsAtualizada );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

const mostrarPokemon = async ( req, res ) => {
    try {
        const { pokemon } = req;
        const pokemonAtualizado = {
            ...pokemon,
            habilidades: pokemon.habilidades.split( ", " )
        };

        return res.status( 200 ).json( pokemonAtualizado );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

const atualizarApelidoPokemon = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { apelido } = req.body;

        const query = "update pokemons set apelido = $1 where id = $2";
        await conexao.query( query, [ apelido, id ] );

        return res.status( 200 ).json( "O apelido do pokemon foi atualizado com sucesso." );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

const excluirPokemon = async ( req, res ) => {
    try {
        const { id } = req.params;

        const query = "delete from pokemons where id = $1";
        await conexao.query( query, [ id ] );

        return res.status( 200 ).json( "O pokemon foi excluído com sucesso." );
    } catch ( error ) {
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    cadastrarPokemon,
    listarPokemons,
    mostrarPokemon,
    atualizarApelidoPokemon,
    excluirPokemon
};
