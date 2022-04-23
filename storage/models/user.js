const Sequelize = require('sequelize');
const dbConn = require('./../db_connection');

const Users = dbConn.define('users', {
  auid : {
    type          : Sequelize.BIGINT,
    allowNull     : false,
    autoIncrement : true,
    primaryKey  : true,
  },

  guid : {
    type : Sequelize.CHAR(40),
    allowNull : true,
    defaultValue: null,
  },

  name : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue: null,
  },

  email : {
   type : Sequelize.STRING,
   allowNull : false,
  },

  password : {
   type : Sequelize.STRING,
   allowNull : false,
  },

  type : {
   type : Sequelize.STRING,
   allowNull : false,
   defaultValue: 'BASIC',
  },

  level : {
   type : Sequelize.STRING,
   allowNull : true,
   defaultValue: null,
  },

  status : {
   type : Sequelize.STRING,
   allowNull : false,
   defaultValue : 'ACTIVE',
  },

  token: {
   type : Sequelize.CHAR(100),
   allowNull : true,
   defaultValue : null,
  },

  session : {
    type : Sequelize.STRING(100),
    allowNull : true,
    defaultValue : null,
  },

}, {
  freezeTableName: true, 
  createdAt: 'created',
  updatedAt: 'updated',
});

module.exports = Users;
