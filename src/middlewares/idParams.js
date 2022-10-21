const { schemaIdParams } = require( "../validations/idParams" );

const validarIdParams = async ( req, res, next ) => {
    try {
        await schemaIdParams.validate( req.params );

        next();
    } catch ( error ) {
        console.log( error.message );
        return res.status( 400 ).json( error.message );
    }
};

module.exports = {
    validarIdParams,
};
