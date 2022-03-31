const conexao = require("../conexao");
const protegerSenha = require("secure-password");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwtSecret");

// @ts-ignore
const pwd = protegerSenha();

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json("Os campos nome, email e senha são obrigatórios.");
    }

    try {
        const queryVerificarEmail = "select * from usuarios where email = $1";
        const usuario = await conexao.query(queryVerificarEmail, [email]);

        if (usuario.rowCount > 0) {
            return res.status(400).json("Este email já foi cadastrado.");
        }
    } catch (error) {
        return res.status(400).json(error.message);
    }

    try {
        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");

        const queryCadastro = `insert into usuarios (nome, email, senha) values ($1, $2, $3)`;
        const usuario = await conexao.query(queryCadastro, [nome, email, hash]);

        if (usuario.rowCount === 0) {
            return res.status(400).json("Não foi possivel cadastrar o usuário.");
        }

        return res.status(200).json("Usuário cadastrado com sucesso.")
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json("Os campos email e senha são obrigatórios.");
    }

    try {
        const query = 'select * from usuarios where email = $1';
        const usuario = await conexao.query(query, [email]);

        if (usuario.rowCount === 0) {
            return res.status(400).json("Email ou senha incorretos.");
        }

        const usuarioCadastrado = usuario.rows[0];

        // @ts-ignore
        const result = await pwd.verify(Buffer.from(senha), Buffer.from(usuarioCadastrado.senha, "hex"));

        switch (result) {
            case protegerSenha.INVALID_UNRECOGNIZED_HASH:
            case protegerSenha.INVALID:
                return res.status(400).json("Email ou senha incorretos.");
            case protegerSenha.VALID:
                break;
            case protegerSenha.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
                    const query = 'update usuarios set senha = $1 where email = $2';

                    await conexao.query(query, [hash, email]);
                } catch {
                }
                break;
        }

        const token = jwt.sign({
            // @ts-ignore
            id: usuarioCadastrado.id,
            // @ts-ignore
            nome: usuarioCadastrado.nome,
            // @ts-ignore
            email: usuarioCadastrado.email
        }, jwtSecret, {
            expiresIn: "24h"
        });
        /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6IkFsYmVydG8gUm9kcmlndWV6IiwiZW1haWwiOiJhbGJlcnRvLnJvZHJpZ3Vlc0BlbWFpbC5jb20iLCJpYXQiOjE2NDg3NTU4NTcsImV4cCI6MTY0ODg0MjI1N30.J0oWx_Sz4oATyFH3TFPZLM_XC7Ncg6CCMCirlI8nHQg */

        return res.status(200).json(token);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    cadastrarUsuario,
    loginUsuario
};
