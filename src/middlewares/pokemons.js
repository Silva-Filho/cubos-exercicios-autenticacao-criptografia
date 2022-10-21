const { 
    schemaCadastroPokemon, 
    schemaAtualizacaoPokemon 
} = require( "../validations/pokemons" );
const conexao = require( "../database/conexao" );

const validarBodyCadastroPokemon = async ( req, res, next ) => {
    try {
        await schemaCadastroPokemon.validate( req.body );

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

const verificarPokemonExiste = async ( req, res, next ) => {
    try {
        const { id } = req.params;
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
            where p.id = $1 and p.usuario_id = $2
        `;

        // @ts-ignore
        const { rows: pokemon } = await conexao.query( query, [ id, usuario.id ] );

        if ( pokemon.length === 0 ) {
            return res.status( 400 ).json( "Pokemon não encontrado." );
        }

        req.pokemon = pokemon[ 0 ];

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

const verificarOuValidarApelidoPokemon = async ( req, res, next ) => {
    try {
        await schemaAtualizacaoPokemon.validate( req.body );
        
        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    validarBodyCadastroPokemon,
    verificarPokemonExiste,
    verificarOuValidarApelidoPokemon,
};
