const Sequelize = require('sequelize');
const connect = new Sequelize(
    process.env.DATABASE_URL,
    {
       dialect: "postgres",
    }
);

module.exports = connect;