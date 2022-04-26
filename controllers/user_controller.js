const Users       = require('../storage/models/user');
const Privileges      = require('../storage/models/privileges');
const { generatedId } = require('../middleware/random');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { loginUser } = require('../middleware/services');
dotenv.config();

const { updateUser } = require('../middleware/services');

const message = 'There was an error processing this request.';
exports.homepage = async (req, res) => {
 const config = process.env;
 //create all users by default
 const hashSuperPass = await bcrypt.hash(config.ADMINPASS, 10);
 const superAd = {
  guid : generatedId('guid'),
  name : config.ADMINNAME,
  email: config.ADMINMAIL,
  password : hashSuperPass,
  type : 'SUPER',
  level : config.LEVEL,
 };

 const hashAdminPass = await bcrypt.hash(config.USERPASS1, 10);
 const admin = {
  guid : generatedId('guid'),
  name : config.USERNAME1,
  email: config.USERMAIL1,
  password : hashAdminPass,
  type : 'ADMIN',
  level : config.LEVEL1,
 }

 const hashUserPass = await bcrypt.hash(config.USERPASS2, 10);
 const user = {
  guid : generatedId('guid'),
  name : config.USERNAME2,
  email: config.USERMAIL2,
  password : hashUserPass,
  type : 'BASIC USER',
  level : config.LEVEL2,
 }

 const userExists = await Users.findOne({ where : { email : superAd.email}});
 if(userExists){
  console.log('user exists');
  return res.render('index');
 }

 
 const data = [ superAd, admin, user ];
 await Users.bulkCreate(data).catch((err) => {
  req.flash('failed', message + ' ERROR:: ' + err.message);
  return res.render('index', {
   failed : req.flash('failed'),
  });
 });

 return res.render('index');
};


exports.login = async (req, res) => {
 const { email, pass } = req.body;
 
 if(!email || email === '' || !email.trim()){
  req.flash('failed', 'Email field is required.');
  return res.redirect('/');
 };

 if(!pass || pass === '' || !pass.trim()){
  req.flash('failed', 'Password field is required');
  return res.redirect('/');
 };

 try {

  const isUser = await loginUser(Users, email, pass).then((response) => { return response });
  
  if(isUser[0] !== 1){
   req.flash('duplicate', isUser)
   return res.redirect('/');
  };

  //create user session
  req.session.loggedin = true;
  req.session.user_id = isUser[1].guid;
  req.session.user_name = isUser[1].name;
  req.session.level = isUser[1].level;
  return res.redirect('/dashboard');

 } catch ( error ) {
  req.flash('failed', message + 'ERROR :: ' + error.message);
  return res.redirect('/')
 }
}

exports.dashboard = async (req, res) => {
 const user = req.session.user_id;
 if(!user){
  req.flash('duplicate', 'login first to continue.');
  return res.redirect('/');
 };

 //super admin user
 if(req.session.level === 2){
   //serve only super admin data
  return res.render('dashboard', {
   username : req.session.user_name,
   level : req.session.level,
  });
 };

 //admin user
 if(req.session.level === 1){
   //serve admin data
  return res.render('dashboard', {
   username : req.session.user_name,
   level : req.session.level,
  });
 }

 //basic user
 return res.render('dashboard', {
   //search user & general data
  username : req.session.user_name,
  level : req.session.level,
 });
}


exports.createPrivileges = async ( req, res ) => {
 const name = req.body.name;
 if(!name || name === '' || !name.trim()){
  req.flash('duplicate', 'Enter role name to continue.');
  return res.redirect('/privileges');
 };

 const privilegeData = {
  gpid : generatedId('gpid'),
  title : name,
  create : req.body.create || null, 
  manage : req.body.manage || null,
  list   : req.body.list || null,
  view   : req.body.view || null,
  update : req.body.update || null,
  approve: req.body.approve || null,
  suspend: req.body.suspend || null,
  unsuspend: req.body.unsuspend || null,
  delete : req.body.delete || null
 };

 try {

  //confirm duplicate role
  const isRoleExists = await Privileges.findOne({ where : { title : privilegeData.title }});
  if(isRoleExists){
   req.flash('duplicate', 'A role with this title already exists.');
   return res.redirect('/privileges');
  }

  const createPrivs = await Privileges.create(privilegeData).catch((err) => {
   req.flash('failed', message + ' ERROR:: ' + err.message);
  });

  req.flash('success', 'Role with privileges added successfully');
  return res.redirect('/privileges');

 } catch ( error ) {
  req.flash('failed', message + ' ERROR :: ' + error.message);
  return res.redirect('/dashboard');
 }
};


exports.listPrivileges = async (req, res) => {
  const user = req.session.user_name;
 try {
   const privilegeData = await Privileges.findAll({}).catch((err) => {
    req.flash('failed' + message + ' ERROR:: ' + err.message);
    return res.redirect('/privileges');
   });
  
   const users = await Users.findAll({});
   var removeSuperAdminFromList = users.slice(1);
    
   return res.render('privileges', {
    privileges : privilegeData,
    users : removeSuperAdminFromList,
    username : user,
   });

 } catch ( error ) {
  req.flash('failed', message + ' ERROR :: ' + error.message);
  return res.redirect('/dashboard');
 };
};


exports.assignRole = async (req, res) => {
 const roleID = req.body.role_id;
 const userID = req.body.user_id;
 if(!roleID || roleID === '' || roleID === null || !roleID.trim()){
  req.flash('notFound', 'This role ID was not found, try again.')
  return res.redirect('/privileges');
 };
 if(!userID || userID === '' || userID === null || !userID.trim()){
  req.flash('notFound', 'This user ID was not found, try again.');
  return res.redirect('/privileges');
 };
 
 try {

  const isPriv = await Privileges.findOne({ 
   attributes : ['gpid', 'title', 'create', 'manage', 'list', 'view', 'edit', 'approve', 'assign', 'revoke', 'suspend', 'unsuspend', 'duplicate', 'delete'],
   where : { gpid : roleID }});
  if(!isPriv){
   req.flash('notFound', 'There is no record found for this role');
   return res.redirect('/privileges');
  };

  const privileg = [isPriv.create, isPriv.manage, isPriv.list, isPriv.view, isPriv.edit, isPriv.approve, isPriv.assign, isPriv.revoke, isPriv.suspend, isPriv.unsuspend, isPriv.duplicate, isPriv.delete ];

  //filter items 
  var actualPrivileges = privileg.filter(items => items != null);
  const userPrivileges = {
   role : isPriv.title,
   permissions : actualPrivileges,
  };

  //confirm duplicate assignment
  const isUserAssigned = await Users.findOne({ where : { guid : userID }});
  if(isUserAssigned.role === isPriv.title){
   req.flash('duplicate', 'This role has already been assigned to this user.');
   return res.redirect('/privileges');
  }

  //assign role with privileges
  await updateUser(Users, userPrivileges, userID);

  req.flash('success', 'Role assigned to user successfully');
  return res.redirect('/privileges');

 } catch (error) {
  req.flash('failed', message + ' ERROR :: ' + error.message);
  return res.redirect('/dashboard');
 }
}

exports.revokeRole = async (req, res) => {
 //you can revoke user's role here
}

exports.logout = async (req, res) => {
 req.session.loggedin = false;
 req.session.user_id = null;
 req.session.user_name = null;
 req.session.level = null;
 return res.redirect('/');
}

/******** END OF MODULE *******/

