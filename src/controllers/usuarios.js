const protegerSenha = require( "secure-password" );

const conexao = require( "../database/conexao" );

// @ts-ignore
const pwd = protegerSenha();

const cadastrarUsuario = async ( req, res ) => {
    try {
        const { nome, email, senha } = req.body;
        // eslint-disable-next-line no-undef
        const hash = ( await pwd.hash( Buffer.from( senha ) ) ).toString( "hex" );

        const queryCadastro = "insert into usuarios (nome, email, senha) values ($1, $2, $3)";
        const usuario = await conexao.query( queryCadastro, [ nome, email, hash ] );

        if ( usuario.rowCount === 0 ) {
            return res.status( 400 ).json( "Não foi possivel cadastrar o usuário." );
        }

        return res.status( 200 ).json( "Usuário cadastrado com sucesso." );
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    cadastrarUsuario,
};
