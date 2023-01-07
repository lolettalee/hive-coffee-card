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
// Set express-sessions for login
var session = require('express-session');
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Welcome route for root /
app.get("/", function(req, res) {
  console.log(req.session);
  if (req.session.uid) {
  res.send('Welcome back, ' + req.session.uid + '!');
} else {
  //res.send('Please login to view this page!');
  res.render("welcome");
}
res.end();
});

// Register route
app.get('/register', function (req, res) {
  res.render('register');
});

// Login
app.get('/login', function (req, res) {
  res.render('login');
});

// Logout
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});



// Create a route for customer card

app.get('/card/:id', async function (req, res) {
  const cardId = req.params.id;
  const user = new User(cardId);
  await user.fetch();
  res.render('card', {user});
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
   await user.fetch();
    //res.send('Update successful');
   res.render('stamps', { user });
   }
  catch (err) {
    console.error(`Error while updating this user's stamp `, err.message);
}


});


// Set password for an existing record or create a new user
app.post('/set-password', async function (req, res) {
  params = req.body;
  var User = new User(params.email);
  try {
      uId = await User.getIdFromEmail();
      if (uId) {
          // If a valid, existing user is found, set the password and redirect to user's page
          await User.setUserPassword(params.password);
          res.redirect('/users/' + uId);
      }
      else {
          // If no existing user is found, add a new one
          newId = await User.addUser(params.email);
          res.send('Test');
      }
  } catch (err) {
      console.error(`Error while adding password `, err.message);
  }
});

// Check submitted email and password pair
app.post('/authenticate', async function (req, res) {
  params = req.body;
  var User = new User(params.email);
  try {
      uId = await user.getIdFromEmail();
      if (uId) {
          match = await user.authenticate(params.password);
          if (match) {
              req.session.uid = uId;
              req.session.loggedIn = true;
              console.log(req.session);
              res.redirect('/users/' + uId);
          }
          else {
              res.send('invalid password');
          }
      }
      else {
          res.send('invalid email');
      }
  } catch (err) {
      console.error(`Error while comparing `, err.message);
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

