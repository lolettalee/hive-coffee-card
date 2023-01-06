// Import express.js
const express = require('express');

// Create express app
const app = express();

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Add static files location
app.use(express.static('static'));

// Get the functions in the db.js file to use
const db = require('./services/db');
const { User } = require('./models/user');

// Welcome route

app.get('/', function (req, res) {
  res.render('index');
});

// Create a route for customer card

app.get('/card/:id', function (req, res) {
  res.render('card');
});

// Customer's view route
app.get('/mycard/:id', async function (req, res) {
  const cardId = req.params.id;
  const user = new User(cardId);
  await user.fetch();
  res.render('mycard', {user});
});

// All users route
app.get('/users', function (req, res) {
  // var sql = 'select * from user where user_role = "customer" ';
  const sql = 'select user.user_id, user.user_email, user.user_name, user.user_role, stamp.stamp_total, stamp.stamp_datetime from stamp, user where user.user_id = stamp.user_id ';
  db.query(sql).then(results => {
    // Send the results rows to the all-students template
    // The rows will be in a variable called data
    res.render('users', { data: results });
  });
});

// Single user route
app.get('/users/:id', async function (req, res) {
  const userId = req.params.id;
  const user = new User(userId);
  await user.fetch();
  res.render('user', { user });
});

// Single user stamp update
app.get('/updatestamp/:id', async function (req, res) {
  const userId = req.params.id;
  const user = new User(userId);
  
  try {
   await user.UpdateStamp();
    //res.send('Update successful');
   res.render('stamps', { user });
   }
  catch (err) {
    console.error(`Error while updating this user's stamp `, err.message);
}


});



// Create a route for testing the db
app.get('/db_test', function (req, res) {
  // Assumes a table called test_table exists in your database
  sql = 'select user.user_id, user.user_name, user.user_role, stamp.stamp_total, stamp.stamp_datetime from stamp, user where user.user_id = stamp.user_id';
  db.query(sql).then(results => {
    console.log(results);
    res.send(results);
  });
});

// Start server on port 3000
app.listen(3000, function () {
  console.log(`Server running at http://127.0.0.1:3000/`);
});

