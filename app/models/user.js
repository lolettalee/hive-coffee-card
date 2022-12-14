const db = require('./../services/db');

class User {
  id;
  name;
  role;
  email;
  stamps;

  constructor(id) {
    this.id = id;
  }

  async fetch() {
    const sql = 'SELECT * FROM user WHERE user_id = ?';
    const [result] = await db.query(sql, [this.id]);
    this.name = result.user_name;
    this.role = result.user_role;
    this.email = result.user_email;
  }
}

module.exports = {
  User
};