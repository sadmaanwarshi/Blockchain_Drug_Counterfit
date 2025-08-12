const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:Sad@7562@db.mvzxffhbtzqksdgdmbze.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
