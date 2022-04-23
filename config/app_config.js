const express  = require('express');
const morgan   = require('morgan');
const flash    = require('connect-flash');
const session  = require('cookie-session');
const dotenv   = require('dotenv');
const ejs      = require('ejs');
const parser   = require('body-parser');
const layout   = require('express-ejs-layouts');
// const dbConn   = require('./../db/db_connection');
dotenv.config();

module.exports = (app) => {
 app.use(morgan('dev'));
 app.use(parser.json());
 app.use(parser.urlencoded({ extended: true }));


 //----------- TRIGGER CONNECTION ---------//
// dbConn.sync().then((connect) => {
//  console.log('Connected to harvestPAD successfully');
//  return;
// }).catch((error) => {
//  console.log('Could not establish a connection, check details and try again ');
//  console.log('Main Error : ' + error);
// });


 //------------ SESSION CONFIG ------------//
 app.use(session({
  cookie: { maxAge: 604800000},//up to 5 days in miliseconds
  secret: 'th-ankful-ness--for-life--God-gavetoh-manity',
  resave: false,
  saveUninitialized: false
 }));


 //---------- PROMPT MESSAGES -----------//
 app.use(flash());
 app.use(function (req, res, next){
  res.locals.processError = req.flash('processError');
  res.locals.duplicate = req.flash('duplicate');
		res.locals.success = req.flash('success');
  next();
 });

 
 //---------- EJS VIEW ENGINE -----------//
 app.use(layout);
 app.set('layout', './layouts/root');
 app.set('view engine', 'ejs');

 return app;
}