const { yup } = require( "../configs/Yup" );

const schemaCadastroUsuario = yup.object().shape( {
    nome: yup.string().strict().required(),
    email: yup.string().email().required(),
    senha: yup.string().strict().required(),
} );

module.exports = {
    schemaCadastroUsuario,
};
