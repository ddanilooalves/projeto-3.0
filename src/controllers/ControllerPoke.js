const res = require("express/lib/response");
const Pokemon = require("../models/Poke");
let message = "";
let type = "";
const getAll = async (req, res) => {
    try {
setTimeout(() => {
    message = ""
    type = ""
}, 1000)

        const pokedex = await Pokemon.findAll({order: [["id", "ASC"]]});
        res.render("index", { pokedex, pokemonPut: null, pokemonDel: null, message, type });
    } catch (err) {
        res.status(500).send({err: err.message});
    }
};

const page = (req, res) => {
    try {
        res.render("registration", {message, type})
    } catch (err) {
        res.status(500).send({err: err.message});
    }
};

const creation = async (req, res) => {
    try {
        const pokemon = req.body;
        if(!pokemon.nome || !pokemon.descricao || !pokemon.tipo || !pokemon.imagem) {
            message = "Necessário preencher todos os campos!";
            type = "danger";
            return res.redirect("/registration")
        };
        await Pokemon.create(pokemon);
        message = "Pokemon Cadastrado!";
        type = "success";
        res.redirect("/");
    } catch (err) {
        res.status(500).send({err: err.message});
    }
};

const getBid = async (req, res) => {
    try {
        const method = req.params.method;
        const pokedex = await Pokemon.findAll({order: [["id", "ASC"]]});
        const pokemon = await Pokemon.findByPk(req.params.id);
        if (method == "put") {
            res.render("index", {
                pokedex,
                pokemonPut: pokemon,
                pokemonDel: null,
                message,
                type
            })
        } else {
            res.render("index", {
                pokedex,
                pokemonPut: null,
                pokemonDel: pokemon,
                message,
                type
            });
        } 

    } catch (err) {
        res.status(500).send({err: err.message});
    }
};

const update = async (req, res) => {
    try {
        const pokemon = req.body;
        await Pokemon.update(pokemon, { where: {id: req.params.id}});
        message = "Pokemon Atualizado!";
        type = "success";
        res.redirect("/")
    } catch (err) {
        res.status(500).send({err: err.message});
    }
};

const remove = async (req, res) => {
    try {
        await Pokemon.destroy({ where: { id: req.params.id }});
        message = "Pokemon Removido!";
        type = "success";
        res.redirect("/")
    } catch (err) {
        res.status(500).send({err: err.message});
    }
};

module.exports = {
    getAll,
    page,
    creation,
    getBid,
    update,
    remove
}; 