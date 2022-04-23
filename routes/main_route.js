const express = require('express');
const userControllers = require('../controllers/user_controller');


const routes = express.Router();

routes.get('/', userControllers.createUsers);
module.exports = routes;