/**+---------------------------------------------------+
 * Original Author : Gabriel Jonah (Gabby)                        
 * Copyright : (c) 2022 authorizer
 * version number : 0.0.1 beta
 * +---------------------------------------------------+
*/

const Sequelize = require('sequelize');
const dbConn = require('../db_connection');

const Privileges = dbConn.define('privileges', {
    
 auid : {
   type          : Sequelize.BIGINT,
   allowNull     : false,
   autoIncrement : true,
   primaryKey    : true,
 },
  
  gpid : {
   type   : Sequelize.CHAR(30),
   allowNull : true,
   defaultValue : null,
 },
  

 title : { 
   type: Sequelize.STRING, 
   allowNull: true, 
   defaultValue : null, 
 },

 create : { 
   type: Sequelize.STRING, 
   allowNull: true, 
   defaultValue : null, 

 },

 manage : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue : null,
 },

 list : {
  type: Sequelize.STRING,
  allowNull: true, 
  defaultValue : null,
 },

 view : {
   type: Sequelize.STRING,
   allowNull: true, 
   defaultValue : null,
 },

 edit : {
   type : Sequelize.STRING,
   allowNull : true, 
   defaultValue : null,
 },

 approve : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue: null,
 },

 assign : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue : null,
 },

 revoke : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue: null,
 },

 suspend : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue: null,
 },

 unsuspend : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue: null,
 },

 duplicate : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue : null,
 },

 delete : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue : null,
 },

 }, {
  freezeTableName: true, 
  createdAt: 'created',
  updatedAt: 'updated',
});
 
 module.exports = Privileges;