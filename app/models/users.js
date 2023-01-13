const db = require('./../services/db');
const bcrypt = require("bcryptjs");

class Users {
  id;
  name;
  role;
  email;
  stamps;


  constructor(email) {
    this.email = email;
}

  // Methods for registering and logging in
  // Check if submitted email address exists in user table 
async getIdFromEmail() {
  var sql = "SELECT user_id FROM user WHERE user.user_email = ?";
  const result = await db.query(sql, [this.email]);
  console.log(result);
  // TODO LOTS OF ERROR CHECKS HERE..
  if (JSON.stringify(result) != '[]') {
      this.id = result[0].user_id;
      return this.id;
  }
  else {
      return false;
  }
}

  // Add a password to an existing user
  async setUserPassword(password) {
    const pw = await bcrypt.hash(password, 10);
    var sql = "UPDATE user SET user_password = ? WHERE user.user_id = ?"
    const result = await db.query(sql, [pw, this.id]);
    return pw;
}



  // Add a new record to the users table   
  async addUser(password, username) {
    const pw = await bcrypt.hash(password, 10);
    var sql = "INSERT INTO user (user_name, user_email, user_password, user_role) VALUES (?, ? , ?, 'customer')";
    this.name = username;
    const result = await db.query(sql, [this.name, this.email, pw]);
    this.id = result.insertId;
    return true;
}

  // Test a submitted password against a stored password (authenticate method)
  async authenticate(submitted) {
    // Get the stored, hashed password for the user
    var sql = "SELECT user_password FROM user WHERE user.user_id = ?";
    const result = await db.query(sql, [this.id]);
    const match = await bcrypt.compare(submitted, result[0].user_password);
    if (match == true) {
        return true;
    }
    else {
        return false;
    }
}

}

module.exports = {
  Users
};