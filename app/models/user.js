const db = require('./../services/db');

class User {
  id;
  name;
  role;
  email;
  stamps;

  constructor(user_id) {
    this.id = user_id;
  }

  async fetch() {
    const sql = 'select user.user_id, user.user_name, user.user_email, user.user_role, stamp.stamp_total from user left join stamp on user.user_id = stamp.user_id where user.user_id = ?';
    const [result] = await db.query(sql, [this.id]);
    this.name = result.user_name;
    this.role = result.user_role;
    this.email = result.user_email;
    this.stamps= result.stamp_total;
  }

  async UpdateStamp() {
    const sql = "update stamp set stamp_total = if(stamp_total < 9,  1 + stamp_total, 0*stamp_total), stamp_datetime =now() where user_id = ?";
    const results = await db.query(sql, [this.id]);
    this.stamps = results.stamp_total;
    return results;
  
}
}

module.exports = {
  User
};