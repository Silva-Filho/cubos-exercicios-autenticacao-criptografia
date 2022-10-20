const jwt = require( "jsonwebtoken" );

const { schemaToken } = require( "../validations/auth" );
// eslint-disable-next-line no-undef
const jwtSecret = process.env.JWT_SECRET;

const verificarOuValidarToken = async ( req, res, next ) => { 
    try {
        await schemaToken.validate( req.body );

        const { token } = req.body;
        // @ts-ignore
        const usuario = jwt.verify( token, jwtSecret );

        req.usuario = usuario;

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    verificarOuValidarToken, 
};
