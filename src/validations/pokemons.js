const { yup } = require( "../configs/Yup" );

const schemaCadastroPokemon = yup.object().shape( {
    nome: yup.string().strict().required(),
    habilidades: yup.string().strict().required(),
    imagem: yup.string().strict().nullable(),
    apelido: yup.string().strict().nullable(),
    token: yup.string().strict().required( "O campo token é obrigatório." ),
} );

const schemaAtualizacaoPokemon = yup.object().shape( {
    apelido: yup.string().strict().required(),
} );

module.exports = {
    schemaCadastroPokemon,
    schemaAtualizacaoPokemon,
};
