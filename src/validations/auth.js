const { yup } = require( "../configs/Yup" );

const schemaToken = yup.object().shape( {
    token: yup.string().strict().required( "O campo token é obrigatório." ),
} );

module.exports = {
    schemaToken,
};
