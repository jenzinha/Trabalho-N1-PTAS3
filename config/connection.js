const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();

const sequelize = new Sequelize( config.development );

try {
  sequelize.authenticate();
  console.log(' autenticado com sucesso ');
} catch (error) {
  console.error(' autenticação falhou ', error);
}

module.exports = { Sequelize, sequelize };