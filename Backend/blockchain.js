//blockchain.js
const crypto = require('crypto');
const pool = require('./db');

async function getLastBlock() {
  const res = await pool.query('SELECT * FROM blockchain ORDER BY index_no DESC LIMIT 1');
  return res.rows[0];
}

async function addBlock(tx) {
  const lastBlock = await getLastBlock();
  const index_no = lastBlock ? lastBlock.index_no + 1 : 0;
  const prev_hash = lastBlock ? lastBlock.hash : '0';
  const timestamp = new Date();
  const payload = `${index_no}|${timestamp.toISOString()}|${JSON.stringify(tx)}|${prev_hash}`;
  const hash = crypto.createHash('sha256').update(payload).digest('hex');

   await pool.query(
    `INSERT INTO blockchain (index_no, timestamp, tx, prev_hash, hash, tag_id) VALUES ($1,$2,$3,$4,$5,$6)`,
    [index_no, timestamp, tx, prev_hash, hash, tx.tag_id || null]
  );

  return { index_no, timestamp, tx, prev_hash, hash, tag_id: tx.tag_id || null };
}

module.exports = { addBlock, getLastBlock };
