//db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',    // your postgres username
  host: 'localhost',
  database: 'drug_detection',  // your db name
  password: 'Sad@7562',
  port: 5432,
});

module.exports = pool;
