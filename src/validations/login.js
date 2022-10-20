const { yup } = require( "../configs/Yup" );

const schemaLogin = yup.object().shape( {
    email: yup.string().email().required(),
    senha: yup.string().strict().required(),
} );

module.exports = {
    schemaLogin,
};
