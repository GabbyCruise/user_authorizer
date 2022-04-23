const Users       = require('../storage/models/user');
const Role      = require('../storage/models/roles');


const { 
 
 createUser, updateUser, createRole, assignRole
} = require('../middleware/services');


Users.hasMany(Role, {
 onDelete : 'cascade',
 foreignKey : 'userID',
})


exports.homepage = async (req, res) => {
 return res.json('this is the homepage');
};


exports.createUsers = async (req, res) => {
 return res.json('home page is set');
}

exports.createRoles = async (req, res) => {
 return res.json('creating roles');
};

exports.listRoles = async (req, res) => {
 return res.json('list roles page');
};

exports.assignRole = async (req, res) => {
 return res.json('assign roles');
}

//
exports.createRecords = async (req, res) => {
 return res.json('create records for testing');
};

exports.viewRecords = async (req, res) => {
 return res.json('view records');
};

exports.updateRecords = async (req, res) => {
 return res.json('update records page');
};

exports.deleteRecords = async (req, res) => {
 return res.json('delete records')
}