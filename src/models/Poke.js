const Sequelize = require('sequelize');
const connect = require('../database/db');
const Pokemon = connect.define(
    "pokemon", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

const initTabela = async () => {
    await Pokemon.sync();
};

initTabela();

module.exports = Pokemon;