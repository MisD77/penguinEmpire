var mongoose = require("mongoose");

// creating Product schema for application but not for actual database
var productSchema = mongoose.Schema({
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

// module.exports can make (Product) object accessible from anywhere, in our case app.js
var Products = module.exports = mongoose.model('products', productSchema);

// Function to get Products that take callback which pas through the route file
module.exports.getProducts = function(callback, limit){
    Products.find(callback).limit(limit);
};

//find one product by Id
module.exports.getProductById = function(id, callback){
    Products.findById(id, callback);
};
