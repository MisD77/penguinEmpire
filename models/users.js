var mongoose = require("mongoose");

// Users Schema
// Defining data's structure 

var userSchema = mongoose.Schema({
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    }
});

// Make this function access from route, in our case app.js
// For the purpose of encapsulation we are doing this
var Users = module.exports = mongoose.model('users', userSchema);

// Get all users
module.exports.getUsers = function(callback, limit){
    Users.find(callback).limit(limit);
};

//Add new user to the DB
module.exports.addUsers = function(user, callback){
    Users.create(user,callback);
};

//Get one user from the database
module.exports.getUser = function(_id,callback){
    Users.findById(_id,callback);
};

//Get existing user with same password from database
module.exports.getUserByLogin = function(_uname,_upass,callback){
    Users.find({$and: [{Email: { $eq: _uname }},{ Password: { $eq: _upass }}]},callback);
};



//db.users.find({$and: [{Email: { $eq: "dacharya@neiu.edu" }},{ Password: { $eq: "dikshya123" }}]})