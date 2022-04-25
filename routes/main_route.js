/**+---------------------------------------------------+
 * Original Author : Gabriel Jonah (Gabby)                        
 * Copyright : (c) 2022 authorizer
 * version number : 0.0.1 beta
 * +---------------------------------------------------+
*/

const express = require('express');
const userControllers = require('../controllers/user_controller');
const productController = require('../controllers/product_controller');


const routes = express.Router();

routes.get('/', userControllers.homepage);

routes.post('/', userControllers.login);

routes.get('/dashboard', userControllers.dashboard);

routes.route('/privileges')
.get(userControllers.listPrivileges)
.post(userControllers.createPrivileges);

routes.post('/roles/assign', userControllers.assignRole);

routes.get('/logout', userControllers.logout);



// PRODUCT ROUTES
routes.route('/products')
.get(productController.listProducts)
.post(productController.createProducts);

routes.get('/products/details', productController.viewProducts);

routes.get('/products/delete/:productid', productController.deleteProducts);






module.exports = routes;