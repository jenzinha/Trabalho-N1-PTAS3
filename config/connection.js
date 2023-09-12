const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();

const sequelize = new Sequelize( config );

try {
  sequelize.authenticate();
  console.log(' conectado com banco de dados ');
} catch (error) {
  console.error(' conexão falhou  ', error);
}

module.exports = { Sequelize, sequelize };