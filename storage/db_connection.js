// /**+---------------------------------------------------+
//  * Original Author : Gabriel Jonah (Gabby)                        
//  * Copyright : (c) 2022 authorizer. ALl right reserved
//  * version number : 0.0.1 beta
//  * +---------------------------------------------------+
// */
const Sequelize = require('sequelize');
const dbConfig  = require('./db_config');

//----------- SEQUELIZE CONNECTION ----------//
const dbConnection = new Sequelize(
 dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host    : dbConfig.HOST,
  dialect : dbConfig.dialect,
  operationAliases : 0,

  pool   : {
   max     : dbConfig.pool.max,
   min     : dbConfig.pool.min,
   acquire : dbConfig.pool.acquire,
   idle    : dbConfig.pool.idle,
  },
 },
);

 //----------- TRIGGER CONNECTION ---------//
 dbConnection.sync().then((connect) => {
  console.log('Connected to authorizer successfully');
  return;
  }).catch((error) => {
  console.log('Could not establish a connection, check details and try again ');
  console.log('Main Error : ' + error);
 });

module.exports = dbConnection;