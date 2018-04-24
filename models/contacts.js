var mongoose = require("mongoose");

// Users Schema
// Defining data's structure 

var contactSchema = mongoose.Schema({
    ContactName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Message:{
        type: String,
        required: true
    }
});

// Make this function access from route, in our case app.js
// For the purpose of encapsulation we are doing this
var Contacts = module.exports = mongoose.model('contacts', contactSchema);

// Get contacts
module.exports.getContacts = function(callback, limit){
    Contacts.find(callback).limit(limit);
};
