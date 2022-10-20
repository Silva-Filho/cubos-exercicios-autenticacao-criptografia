const protegerSenha = require( "secure-password" );

const { schemaCadastroUsuario } = require( "../validations/usuarios" );
const conexao = require( "../database/conexao" );

// @ts-ignore
const pwd = protegerSenha();

const validarBodyCadastroUsuario = async ( req, res, next ) => {
    try {
        await schemaCadastroUsuario.validate( req.body );

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

const verificarEmail = async ( req, res, next ) => {
    try {
        const { email } = req.body;
        const { url } = req;
        // return res.status( 400 ).json( { req_url: req.url } );

        const queryVerificarEmail = `
            select 
                id, 
                nome, 
                email, 
                senha 
            from usuarios 
            where email = $1
        `;
        const usuario = await conexao.query( queryVerificarEmail, [ email ] );

        if ( url.includes( "/cadastrar" ) && usuario.rowCount > 0 ) {
            return res.status( 400 ).json( "Este email já foi cadastrado." );
        }

        if ( url.includes( "/login" ) && usuario.rowCount === 0 ) {
            return res.status( 400 ).json( "Email incorreto." );
        }

        req.usuario = usuario.rows[ 0 ];

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

const validarSenhaUsuario = async ( req, res, next ) => {
    try {
        const { email, senha } = req.body;
        const { senha: senhaCadastrada } = req.usuario;
        // eslint-disable-next-line no-undef
        const result = await pwd.verify( Buffer.from( senha ), Buffer.from( senhaCadastrada, "hex" ) );

        switch ( result ) {
        case protegerSenha.INVALID_UNRECOGNIZED_HASH:
        case protegerSenha.INVALID:
            return res.status( 400 ).json( "Senha incorreta." );
        case protegerSenha.VALID:
            break;
        case protegerSenha.VALID_NEEDS_REHASH:
            try {
                // eslint-disable-next-line no-undef
                const hash = ( await pwd.hash( Buffer.from( senha ) ) ).toString( "hex" );

                const query = "update usuarios set senha = $1 where email = $2";
                await conexao.query( query, [ hash, email ] );
                // eslint-disable-next-line no-empty
            } catch {
            }
            break;
        }

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    validarBodyCadastroUsuario,
    verificarEmail,
    validarSenhaUsuario,
};
