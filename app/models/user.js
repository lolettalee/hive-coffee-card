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
    const sql = 'select user.user_id, user.user_name, user.user_email, user.user_role, stamp.stamp_total from user left join stamp on user.user_id = stamp.user_id where user.user_id = ?';
    const [result] = await db.query(sql, [this.id]);
    this.name = result.user_name;
    this.role = result.user_role;
    this.email = result.user_email;
    this.stamps= result.stamp_total;
  }
}

module.exports = {
  User
};