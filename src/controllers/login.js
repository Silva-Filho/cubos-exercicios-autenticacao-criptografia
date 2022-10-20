const jwt = require( "jsonwebtoken" );

// eslint-disable-next-line no-undef
const jwtSecret = process.env.JWT_SECRET;

const loginUsuario = async ( req, res ) => {
    try {
        const { id, nome/* , email */ } = req.usuario;
        // return res.status( 200 ).json( { req_usuario: req.usuario } );

        const token = jwt.sign( {
            id: id,
            nome: nome,
            // email: email
            // @ts-ignore
        }, jwtSecret, {
            expiresIn: "24h"
        } );

        // eslint-disable-next-line no-unused-vars
        // const { senha: _, ...usuarioLogado } = req.usuario;

        return res.status( 200 ).json( { 
            // usuario: usuarioLogado,
            usuario: {
                id,
                nome,
            },
            token 
        } );
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    loginUsuario
};
