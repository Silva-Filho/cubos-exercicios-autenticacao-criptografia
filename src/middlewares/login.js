const { schemaLogin } = require( "../validations/login" );

const validarBodyLogin = async ( req, res, next ) => {
    try {
        await schemaLogin.validate( req.body );

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    validarBodyLogin
};
