const { yup } = require( "../configs/Yup" );

const schemaIdParams = yup.object( {
    id: yup
        .string()
        .matches(
            /^[0-9]+$/,
            {
                message: "ID informado não é um número inteiro."
            }
        ),
} );

module.exports = {
    schemaIdParams,
};
