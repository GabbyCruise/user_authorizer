const Sequelize = require('sequelize');
const dbConn = require('./../db_connection');

const Users = dbConn.define('roles', {
    
 auid : {
   type          : Sequelize.BIGINT,
   allowNull     : false,
   autoIncrement : true,
   primaryKey    : true,
 },
  
 roleid : {
   type   : Sequelize.CHAR(20),
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

 view : {
   type: Sequelize.STRING,
   allowNull: true, 
   defaultValue : null,
 },

 update : {
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
 
 module.exports = Users;