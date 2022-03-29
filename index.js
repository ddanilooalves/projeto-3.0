require("dotenv").config();
const express = require( 'express' );
const path = require("path");
const app  =  express ( );

const port = process.env.port || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [ 
    {
        nome: 'Vulpix',
        id: 1,
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png',
        descricao: 'À medida que cada cauda cresce, sua pelagem se torna mais brilhante. Quando segurado, ele se sente um pouco quente.',
        categ: 'Incêndio'
    },
    {
        nome: 'Ponyta',
        id: 2,
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png',
        descricao: 'Se você foi aceito por Ponyta, sua juba ardente misteriosamente não está mais quente ao toque.',
        categ: 'Incêndio'
    },
    {
        nome: 'Mew',
        id: 3,
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png',
        descricao: 'Quando visto através de um microscópio, o cabelo curto, fino e delicado deste Pokémon pode ser visto.',
        categ: 'Psíquico'
    },
];

let pokemon = undefined;

app.get("/", (req, res)  => {
    res.render("index", { pokedex, pokemon }); 
});

app.post("/crlh", (req, res) => {
    const pokemon = req.body;
    pokedex.push(pokemon);
    pokemon.id = pokedex.length + 1;
    res.redirect("/");
});

app.get("/details/:id", (req, res) => {
    const id = +req.params.id;
    pokemon = pokedex.find((pokemon) => pokemon.id === id);
    res.redirect("/");
});

app.post("/update/:id", (req, res) => {
    const id = +req.params.id - 1;
    const not = req.body;
    pokedex[id] = not;
    pokemon = undefined;
    not.id = id + 1;
    res.redirect("/");
});

app.get("/delet/:id", (req, res) => {
    const id = +req.params.id - 1;
    delete pokedex[id];
    res.redirect("/");
});

app.listen(port, ( ) => 
console.log(`Servidor rodando em http://localhost:${port}`));