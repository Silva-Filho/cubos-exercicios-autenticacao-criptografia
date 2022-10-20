const { Pool } = require( "pg" );

const pool = new Pool( {
    // eslint-disable-next-line no-undef
    user: process.env.DB_USER,
    // eslint-disable-next-line no-undef
    host: process.env.DB_HOST,
    // eslint-disable-next-line no-undef
    database: process.env.DB_DATABASE,
    // eslint-disable-next-line no-undef
    password: process.env.DB_PASSWORD,
    port: 5432
} );

const query = ( text, param ) => {
    return pool.query( text, param );
};

module.exports = {
    query
};
