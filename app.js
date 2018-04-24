//we are using node.js packages to handle different web server functionalities
//Express.js is used to handle http request and response
var express = require("express");
var app = express(); //we are creating express app
var bodyParser = require("body-parser"); // for handling post requests
var mongoose = require("mongoose"); // to communicate with database

//Allowes cors calls|cross domain calls
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//To parse json body send in POST requests
app.use(bodyParser.json());


Products = require('./models/products'); 
Users = require('./models/users');
Item = require('./models/getItem');
//Contacts = require('./models/contacts');


//connect to mongoose
mongoose.connect("mongodb://localhost/penguin");
var db = mongoose.connection;

//default root api url
// http:localhost:3000/

app.get('/', function(req, res){
    res.send('Welcome to Pauls Penguin Empire. <br> Please use: <br>/api/users <br> /api/products  <br> /api/contacts ');
});

// Get products from database
// http:localhost:3000/api/products
app.get('/api/products', function(req,res){
    Products.getProducts(function(err, prds){
        if (err){
            throw err;
        }
        res.json(prds);
    })
});


//Get One product from database

app.get('/api/item/:itemid', function(req,res){
    var itmID = req.params.itemid;
    Item.getItem(itmID,function(err, item){
        if (err){
            throw err;
        }
        res.json(item);
    })
});

//Handle Users in website
// Get all users from database
app.get('/api/users', function(req,res){
    Users.getUsers(function(err, usrs){
        if (err){
            throw err;
        }
        res.json(usrs);
    })
});

//add new user to DB
app.post('/api/users', function(req, res){
    var usr = req.body; //access everything that comes into form and store it to usr object
    Users.addUsers(usr,function(err, usr){
        if (err){
            throw err;
        }
        res.json(usr);
    })

});


// Get one user with valid password from database
app.get('/api/users/:usrid/:userpw', function(req,res){
    var uid = req.params.usrid;
    var upw = req.params.userpw;
    
    Users.getUserByLogin(uid,upw,function(err, user){
        if (err){
            throw err;
        }
        res.json(user);
    })
});

//Get One User from database
app.get('/api/users/:usrid', function(req,res){
    var uid = req.params.usrid;
    Users.getUser(uid,function(err, user){
        if (err){
            throw err;
        }
        res.json(user);
    })
});
//End One User



//listening and requesting on local host
app.listen(3000);
console.log("Running on port: 3000");

/*
//adding products to the database
db.products.insertMany([
{"Name": "Pen", "Price": 5, "Count": 15, "Description": "You wont be twiddling your thumbs anymore with this Glitterfall Pen around! A natural way to improve mindfulness and to relieve stress by watching the floating glitter flow from one end to the other."},
{"Name": "Necklace", "Price": 15, "Count": 15, "Description": "Penguin Necklace to add a stylish effortless accent to your look. These necklaces are versatile and suitable for any occasion. Worn alone or with your favorite set, they'll get you lots of compliments on their modern shape and elegance."},
{"Name": "Flash Drive", "Price": 9, "Count": 30, "Description": "USB 2.0 8GB wooden flash drive. They are made out of rubbers. The top snaps on with powerful magnets. Each drive comes engraved with your logo or text."},
{"Name": "Pen Holder", "Price": 12, "Count": 20, "Description": "Bee-approved holder for your office pens and other knick knacks. Shorter spots for things like paper clips and tweezers, larger for pencils, pens, screwdrivers, etc."},
{"Name": "Bracelet Charm", "Price": 25, "Count": 100, "Description": "A unique personalized charm, handmade using high quality materials and lots of love! These lovely charms are universal to fit many bracelet designs. Each charm is made-to-order, meaning the lettering will be customized as per your request. Hole size is 5mm, which fits most bracelet brands."},
{"Name": "Wall Art", "Price": 50, "Count": 5, "Description": "The Great Penguin Painting Print Canvas Wall Art Picture Home Décor Contemporary Artwork Split Canvases Birthday Gift"},
{"Name": "Silver Bracelet", "Price": 40, "Count": 25, "Description": "This adjustable crossover sterling silver bangle has been hand crafted using solid sterling silver. It adds every day elegance to any look with it's graceful wraparound shape and hammered finish that reflects the light wonderfully."},
{"Name": "Beaded Bracelet", "Price": 5, "Count": 30, "Description": "The Serenity Stack is one of Spring's It colors! Each one can be worn by itself or paired with other sprouts designs bracelets for the perfect arm party!"},
{"Name": "Cofee Mug", "Price": 4, "Count": 40, "Description": "Enjoy your coffee with these high quality coffee mugs. Also makes a great gift for everyone."},
{"Name": "Wine Opener", "Price": 15, "Count": 15, "Description": "They may not be able to fly, but at least they can open your wine bottle! This cute little corkscrew uses the penguin's flapping arms to tug the cork out."},
])

//adding users to the database
db.users.insertMany([
    {"FirstName": "Dikshya", "LastName": "Acharya", "Email": "dacharya@neiu.edu", "Password":"dikshya123"},
    {"FirstName": "Jumana", "LastName": "Khwaileh", "Email": "j-khwaileh@neiu.edu", "Password":"jumana123"},
    {"FirstName": "Pradeep", "LastName": "Reddy", "Email": "n-pradeepreddy@neiu.edu ", "Password":"pradeep123"},
])

//adding contacts to the database (given via contact form or registration)
db.contacts.insertMany([
    {"ContactName": "Dikshya Acharya", "Email": "dacharya@neiu.edu", "Message": "Adopt a penguin"},
    {"ContactName": "Jumana Khwaileh", "Email": "j-khwaileh@neiu.edu", "Message": "Visist the penguin store"},
    {"ContactName": "Pradeep Reddy", "Email": "n-pradeepreddy@neiu.edu", "Message": "Great job, keep it up."},    
])


//get contacts from database(stored via contact or registration form)
app.get('/api/contacts', function(req,res){
    Contacts.getContacts(function(err, contacts){
        if (err){
            throw err;
        }
        res.json(contacts);
    })
});


// http:localhost:3000/api/products/:itemid
app.get('/api/products/:itemid', function(req,res){
    var itmID = req.params.itemid;
    Products.getProductById(itmID, function(err, item){
        if (err){
            throw err;
        }
        res.json(item);
    })
});
*/