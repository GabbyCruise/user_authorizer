/**+---------------------------------------------------+
 * Original Author : Gabriel Jonah (Gabby)                        
 * Copyright : (c) 2022 authorizer
 * version number : 0.0.1 beta
 * +---------------------------------------------------+
*/

const morgan   = require('morgan');
const flash    = require('connect-flash');
const session  = require('cookie-session');
const dotenv   = require('dotenv');
const ejs      = require('ejs');
const parser   = require('body-parser');
const layout   = require('express-ejs-layouts');
dotenv.config();

module.exports = (app) => {
 app.use(morgan('dev'));
 app.use(parser.json());
 app.use(parser.urlencoded({ extended: true }));

 app.use(session({
  cookie: { maxAge: 604800000},
  secret: 'th-ankful-ness--for-life--God-gavetoh-manity',
  resave: false,
  saveUninitialized: false
 }));

 app.use(flash());
 app.use(function (req, res, next){
  res.locals.failed = req.flash('failed');
  res.locals.duplicate = req.flash('duplicate');
  res.locals.notFound = req.flash('notFound');
		res.locals.success = req.flash('success');
  next();
 });


 app.use(layout);
 app.set('layout', './layouts/root');
 app.set('view engine', 'ejs');

 return app;
};