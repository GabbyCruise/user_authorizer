
/**+---------------------------------------------------+
 * Original Author : Gabriel Jonah (Gabby)                        
 * Copyright : (c) 2022 authorizer
 * version number : 0.0.1 beta
 * +---------------------------------------------------+
*/
const { generatedId } = require('./random');
const bcrypt = require('bcryptjs');
const Users = require('../storage/models/user');


async function loginUser(Table, email, password){
 const isUser = await Table.findOne({ where : { email : email}});
 if(!isUser){
  let msg = 'There is no user found for this email';
  return msg;
 };

 //confirm password
 const isPassword = await bcrypt.compare(password, isUser.password);
 if(!isPassword){
  let msg = 'Your password did not match, try again.';
  return msg;
 };

 //generate user token
 const userTokenDetails = {
  token : generatedId('token'),
 };

//update user with new token
 await updateUser(Users, userTokenDetails,  isUser.guid);
 const user =  [ 1, isUser ];
 return user;
}


async function updateUser(Table, data, id ){
 await Table.update(data, { where : { guid : id }}).catch((err) => {
  console.log('user update failure : Error: ' + err);
  return err;
 });
};


//--------- COMFIRM ADMIN AUTHORIZATION ----------//
async function isUserAuthorized(userGuid, item){
 const is_user = await Users.findOne({ where : { guid : userGuid}});  

 if(!is_user || is_user === null){
   let msg = 'You do not have the permission to perform this operation, contact the admin';
   return msg;
 };

 if(is_user.permissions === null || is_user.permissions === ''){
   let msg = 'You are not authorized to perform this operation. Contact the admin for assistance';
   return msg; 
 };
 const userPrivs = is_user.permissions;
 const valid = userPrivs.includes(item, userPrivs);

 if(valid === false){
  let msg = 'You do not have The right Privilege to perform this operation, contact the admin';
  return msg;
 }
 const response =  [ 1, valid];
 return response;
};

async function listProducts(){

}

module.exports = {
 loginUser, updateUser, isUserAuthorized
}