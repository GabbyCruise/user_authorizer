/**+---------------------------------------------------+
 * Original Author : Gabriel Jonah (Gabby)                        
 * Copyright : (c) 2022 authorizer
 * version number : 0.0.1 beta
 * +---------------------------------------------------+
*/

const Sequelize = require('sequelize');
const dbConn = require('./../db_connection');

const Products = dbConn.define('products', {
  auid : {
    type          : Sequelize.BIGINT,
    allowNull     : false,
    autoIncrement : true,
    primaryKey  : true,
  },

  gpid : {
    type : Sequelize.CHAR(30),
    allowNull : true,
    defaultValue: null,
  },

  name : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue: null,
  },

  type : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue: null,
  },

  quantity : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue : null,
  },

  price : {
   type : Sequelize.STRING,
   allowNull : false,
  },

}, {
  freezeTableName: true, 
  createdAt: 'created',
  updatedAt: 'updated',
});

module.exports = Products;
