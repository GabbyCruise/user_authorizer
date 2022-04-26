/**+---------------------------------------------------+
 * Original Author : Gabriel Jonah (Gabby)                        
 * Copyright : (c) 2022 authorizer
 * version number : 0.0.1 beta
 * +---------------------------------------------------+
*/

const { generatedId } = require('../middleware/random');
const Products      = require('../storage/models/products');


const { 
 isUserAuthorized, SearchRecords
} = require('../middleware/services');


const message = 'There was an error processing this request.';
exports.createProducts = async (req, res) => {

 const user = req.session.user_id;
 const userLevel = req.session.level;
 if(!user){
  req.flash('duplicate', 'Login first to continue..');
  return res.redirect('/');
 };

 const { name, type, quantity, price } = req.body;
 if(!name || name === '' || name === null || !name.trim()){
  req.flash('duplicate', 'This product name field is required.');
  return res.redirect('/products');
 };

 if(!type || type === '' || type === null || !type.trim()){
  req.flash('duplicate', 'This product name field is required.');
  return res.redirect('/products');
 };

 if(!quantity || quantity === '' || quantity === null || !quantity.trim()){
  req.flash('duplicate', 'This product name field is required.');
  return res.redirect('/products');
 };

 if(!price || price === '' || price === null || !price.trim()){
  req.flash('duplicate', 'This product name field is required.');
  return res.redirect('/products');
 };

 try {

  //confirm user level and provilege
  if(userLevel != 2){
    const authorization = await isUserAuthorized(user, 'create').then((confirm) => { return confirm});
   
    if(authorization[0] !== 1){
      req.flash('duplicate', authorization);
      return res.redirect('/products');
    };
  }

  const productExists = await Products.findOne({ where : { name : name }});
  if(productExists){
   req.flash('duplicate', 'A product with this title already exists');
   return res.redirect('/products');
  };

  //create product
  const productDetails = {
   gpid : generatedId('gpid'),
   name : name,
   type : type,
   quantity : quantity,
   price : price,
  };
  
  await Products.create(productDetails).catch((err) => {
   req.flash('failed', 'There was an error creating this product. ERROR:: ' + err.message);
   return res.redirect('/products');
  });

  req.flash('success', 'Product created successfully');
  return res.redirect('/products');

 } catch ( error ) {
  req.flash('failed', message + ' ERROR :: ' + error);
  return res.redirect('/products');
 };
};


exports.listProducts = async (req, res) => {
 const user = req.session.user_id;
 const username = req.session.user_name;
 if(!user){
  req.flash('duplicate', 'Login first to continue..');
  return res.redirect('/');
 };

 try {
  const allProducts = await Products.findAll({});
  return res.render('products', {
   username : username,
   products : allProducts
  });
 } catch (error) {
  req.flash('failed', message + ' ERROR :: ' + error.message);
  return res.redirect('/products');
 };
};



exports.viewProducts = async (req, res) => {
 const user = req.session.user_id;
 const username = req.session.user_name;
 const productID = req.params.productid;
 if(!user){
  req.flash('duplicate', 'Login first to continue..');
  return res.redirect('/');
 };

 try {

  const productDetails = await Products.findOne({ 
   attributes : ['name', 'type', 'quantity', 'price'],
   where : { gpid : productID }});

   if(!productDetails || productDetails === null){
    req.flash('duplicate', 'There is no record found for this product ID');
    return res.redirect('/products');
   };

   return res.render('products/details', {
    details : productDetails,
    username : username,
   })

 } catch ( error ) {
  req.flash('failed', message + ' ERROR :: ' + error.message);
  return res.redirect('/products');
 }

};

exports.updateProducts = async (req, res) => {
  //update product details
};

exports.deleteProducts = async (req, res) => {
 const user = req.session.user_id;
 const userLevel = req.session.level;
 const productID = req.params.productid;
 if(!user){
  req.flash('duplicate', 'Login first to continue..');
  return res.redirect('/');
 };

 try {

   //confirm user level and provilege
   if(userLevel != 2){
     const authorization = await isUserAuthorized(user, 'create').then((confirm) => { return confirm});
    
     if(authorization[0] !== 1){
       req.flash('duplicate', authorization);
       return res.redirect('/products');
     };
   }

   await Products.destroy({ where : { gpid : productID}}).catch((err) => {
    req.flash('failed', 'There was an error creating this product. ERROR:: ' + err.message);
    return res.redirect('/products');
   });

   req.flash('success', 'Product created successfully');
   return res.redirect('/products');

 } catch ( error ) {
  req.flash('failed', message + ' ERROR :: ' + error);
  return res.redirect('/products');
 };
};

/********* END OF PRODUCT MODULE **********/