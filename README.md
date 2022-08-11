![](https://i.imgur.com/xG74tOh.png)

# Exercícios - Autenticação e Criptografia

## Exercícios de classe 🏫

1. Criação de API com autenticação

Você acaba de receber uma proposta como freelancer para construir uma API que irá catalogar **Pokemons**. Entretanto, não se trata de uma simples API, pois ela possuirá autenticação para que cada usuario logado possa catalogar seus **Pokemons**.

Sendo assim, vamos aos requisitos proposto pelo contratante.

1 - Deverá existir um banco de dados chamado `catalogo_pokemons` com as tabelas descritas abaixo.

a) Tabela `usuarios` com os campos:

-   id - identificador único do usuário como chave primaria e auto incremento;
-   nome - (obrigatório)
-   email - (obrigatório e único)
-   senha - (obrigatório)

b) Tabela `pokemons` com os campos

-   id - identificador único do pokemon como chave primaria e auto incremento;
-   usuario_id - (obrigatório)
-   nome - (obrigatório)
-   habilidades - (obrigatótio)
-   imagem
-   apelido

2 - Para a entidade `usuarios` deverá ser implementado as seguintes funcionalidades.

a) Cadastro de usuário

-   A senha do usuário deverá ser criptografada usando a biblioteca `secure-password` antes de salvar o cadastro.

b) Login de usuário

-   Validar as credenciais do usuário usando a biblioteca `secure-password`.
-   Gerar o token de autenticação com a biblioteca `jsonwebtoken`.

3 - Para a entidade `pokemons` deverá ser implementado as seguintes funcionalidades.

a) Cadastro do pokemons

b) Atualização apenas do apelido do pokemon

c) Listagem completa dos pokemons

d) Listagem de apenas um pokemon filtrado pelo seu id

e) Exclusão do pokemon

É obrigatório para as funcionalidades da entidade `pokemons`:

-   Receber o token do body da requisição e validar o usuário logado em todos os endpoints.
-   O campo `usuario_id` não deve ser capturado do body da requisição. Deve ser obtido do token recebido no body.
-   No cadastro de pokemon, o campo `habilidades` deverá receber apenas uma string de habilidades separadas por vírgulas.
-   Na listagem de pokemons o campo `habilidades` deverá retornar um array de habilidades.

_Obs.: É preciso realizar todas as validações necessárias para evitar erros no banco de dados_

Exemplo do body para cadastro do pokemon:

```
{
    "nome": "Pikachu",
    "apelido": "pikachu",
    "habilidades": "static, lightning-rod",
    "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
}
```

Exemplo de retorno na listagem de pokemons:

```
[
    {
        "id": 1,
        "usuario": "Nome do usuário responsável"
        "nome": "Pikachu",
        "apelido": "pikachu",
        "habilidades": ["static", "lightning-rod"],
        "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
    },
    {
        "id": 2,
        "usuario": "Nome do usuário responsável"
        "nome": "Bulbasaur",
        "apelido": "bulbasaur",
        "habilidades": ["overgrow", "chlorophyll"],
        "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
    }
]
```

---

Preencha a checklist para fazer os exercícios:

-   [ ] Fazer o fork do repositório para sua conta
-   [ ] Executar `git clone` do seu fork no terminal para clonar o repositório, ou clonar de outra maneira
-   [ ] Após fazer e commitar todos os exercícios fazer o `git push` para seu fork
-   [ ] Copiar a url do seu fork e enviar na plataforma

###### tags: `módulo 3` `modelagem de dados` `exercício de classe` `banco de dados` `nodeJS` `SQL` `postgres` `jwt` `autenticação` `criptografia`
