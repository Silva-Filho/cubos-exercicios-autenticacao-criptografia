const conexao = require("../conexao");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwtSecret");

const cadastrarPokemon = async (req, res) => {
    const { nome, habilidades, imagem, apelido, token } = req.body;

    if (!nome || !habilidades || !token) {
        return res.status(400).json("Os campos nome, habilidades e token são obrigatórios.");
    }

    try {
        const usuario = jwt.verify(token, jwtSecret);

        const query = `
            insert into pokemons (usuario_id, nome, habilidades, imagem, apelido) 
            values ($1, $2, $3, $4, $5)
        `;
        // @ts-ignore
        const pokemon = await conexao.query(query, [usuario.id, nome, habilidades, imagem, apelido]);

        if (pokemon.rowCount === 0) {
            return res.status(400).json("Não foi possível cadastrar o pokemon.");
        }

        return res.status(200).json("Pokemon cadastrado com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const listarPokemons = async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        return res.status(400).json("O campo token é obrigatório.");
    }

    try {
        const usuario = jwt.verify(token, jwtSecret);        
    } catch {
        return res.status(400).json("O token fornecido é inválido.");
    }

    try {
        const query = `
            select 
                p.id, 
                u.nome as usuario, 
                p.nome, 
                p.apelido, 
                p.habilidades, 
                p.imagem 
            from pokemons p
            left join usuarios u on u.id = p.usuario_id
        `;

        const { rows: pokemons } = await conexao.query(query);
        
        const listaPokemonsAtualizada = pokemons.map( pokemon => {
            return {
                ...pokemon,
                // @ts-ignore
                habilidades: pokemon.habilidades.split(", ")
            };
        } );

        return res.status(200).json(listaPokemonsAtualizada);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const mostrarPokemon = async (req, res) => {
    const { id } = req.params;
    const { token } = req.body;

    if (!token) {
        return res.status(400).json("O campo token é obrigatório.");
    }

    try {
        const usuario = jwt.verify(token, jwtSecret);
    } catch {
        return res.status(400).json("O token fornecido é inválido.");
    }

    try {
        const query = `
            select 
                p.id, 
                u.nome as usuario, 
                p.nome, 
                p.apelido, 
                p.habilidades, 
                p.imagem 
            from pokemons p
            left join usuarios u on u.id = p.usuario_id
            where p.id = $1
        `;

        // @ts-ignore
        const { rows: pokemon } = await conexao.query(query, [id]);
            
        const pokemonAtualizado = {
            ...pokemon[0],
            // @ts-ignore
            habilidades: pokemon[0].habilidades.split(", ")
        };

        return res.status(200).json(pokemonAtualizado);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const atualizarApelidoPokemon = async (req, res) => {
    const { id } = req.params;
    const { apelido, token } = req.body;

    if (!apelido) {
        return res.status(400).json("Somente o apelido do pokemon pode ser atualizado.")
    }

    if (!token) {
        return res.status(400).json("O campo token é obrigatório.");
    }

    try {
        const usuario = jwt.verify(token, jwtSecret);
    } catch {
        return res.status(400).json("O token fornecido é inválido.");
    }

    try {
        const query = `update pokemons set apelido = $1 where id = $2`;
        
        await conexao.query(query, [apelido, id]);
            
        return res.status(200).json("O apelido do pokemon foi atualizado com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const excluirPokemon = async (req, res) => {
    const { id } = req.params;
    const { token } = req.body;
    
    if (!token) {
        return res.status(400).json("O campo token é obrigatório.");
    }

    try {
        const usuario = jwt.verify(token, jwtSecret);
    } catch {
        return res.status(400).json("O token fornecido é inválido.");
    }

    try {
        const query = `delete from pokemons where id = $1`;
        
        await conexao.query(query, [id]);
            
        return res.status(200).json("O pokemon foi excluído com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    cadastrarPokemon,
    listarPokemons,
    mostrarPokemon,
    atualizarApelidoPokemon,
    excluirPokemon
};
