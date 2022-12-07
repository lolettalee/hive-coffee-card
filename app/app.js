// Import express.js
const express = require("express");

// Create express app
var app = express();

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for root - /
app.get("/", function(req, res) {
    res.send("Welcome to Hive Coffee Card");
});

// Create a route for customer card
app.get("/card/:id", function(req, res) {
    res.render("card");
});

// Create a route for /mycard/id
app.get("/mycard/:id", function(req, res) {
    console.log(req.params);
    res.send("ID: " + req.params.id);
});

// Create a route for homepage

app.get("/home", function(req, res) {
    var sql = 'select * from user where user_role = "customer" ';
    db.query(sql).then(results => {
    	    // Send the results rows to the all-students template
    	    // The rows will be in a variable called data
        res.render('home', {data: results});
    });
});



// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from user';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});

