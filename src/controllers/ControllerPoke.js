const Pokemon = require("../models/Poke");
const getAll = async (req, res) => {
    try {
        const pokedex = await Pokemon.findAll();
        res.render("index", { pokedex, pokemonPut: null, pokemonDel: null });
    } catch (err) {
        res.status(500).send({err: err.message});
    }
};

const page = (req, res) => {
    try {
        res.render("registration")
    } catch (err) {
        res.status(500).send({err: err.message});
    }
};

const creation = async (req, res) => {
    try {
        const pokemon = req.body;
        if(!pokemon) {
            return res.redirect("/registration")
        };
        await Pokemon.create(pokemon);
        res.redirect("/");
    } catch (err) {
        res.status(500).send({err: err.message});
    }
};

const getBid = async (req, res) => {
    try {
        const method = req.params.method;
        const pokedex = await Pokemon.findAll();
        const pokemon = await Pokemon.findByPk(req.params.id);
        if (method == 'put') {
            res.render("index", {
                pokedex,
                pokemonPut: pokemon,
                pokemonDel: null
            })
        } else {
            res.render("index", {
                pokedex,
                pokemonPut: null,
                pokemonDel: pokemon
            });
        } 

    } catch (err) {
        res.status(500).send({err: err.message});
    }
};

const update = (req, res) => {};

module.exports = {
    getAll,
    page,
    creation,
    getBid
}; 