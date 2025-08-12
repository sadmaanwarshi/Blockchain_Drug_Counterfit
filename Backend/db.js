const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:Sad7004431954@db.mvzxffhbtzqksdgdmbze.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
