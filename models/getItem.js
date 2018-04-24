
var mongoose = require("mongoose");
// items Schema
// Defining data's structure 

var itemSchema = mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    Count:{
        type: Number,
        required: true
    },
    Description:{
        type: String,
        required: false
    }
});

// Make this function access from route, in our case app.js
// For the purpose of encapsulation we are doing this
var item = module.exports = mongoose.model('item', itemSchema);

module.exports.getItem = function(_id,callback){
    Products.findById(_id,callback);
};
