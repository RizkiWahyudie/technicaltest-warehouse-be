const db = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = {
  findByEmail: async (email) => {
    const { rows } = await db.query(
      'SELECT u.*, r.role_name FROM "user" u JOIN role r ON u.role_id = r.id WHERE u.email = $1',
      [email]
    );
    return rows[0];
  },

  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};