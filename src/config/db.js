const { Pool } = require('pg');
require('dotenv').config();

// Konfigurasi koneksi database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
    process.exit(1);
  }
  console.log('Successfully connected to PostgreSQL database');
});

// Export pool untuk digunakan di seluruh aplikasi
module.exports = {
  query: (text, params) => pool.query(text, params),
};