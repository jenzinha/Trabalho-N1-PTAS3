const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();

const sequelize = new Sequelize( config.development );

try {
  sequelize.authenticate();
  console.log(' conectado ao banco de dados com sucesso ');
} catch (error) {
  console.error(' conexão ao banco de dados falhou ', error);
}

module.exports = { Sequelize, sequelize };