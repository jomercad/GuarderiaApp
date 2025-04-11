// config/database.js
const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Desactiva los logs de SQL en producción
});
