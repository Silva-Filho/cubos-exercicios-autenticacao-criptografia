const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database:"catalogo_pokemons",
    password: "Hn#1zTj&",
    port: 5432
});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query
}
