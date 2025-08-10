//verify.js
const express = require('express');
const pool = require('../db');
const { addBlock } = require('../blockchain');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../middleware/auth');

router.post('/verify', authenticateJWT, authorizeRole("pharmacy_owner"), async (req, res) => {
  const { tag_id } = req.body;
  try {
    const med = await pool.query(`SELECT * FROM medicines WHERE tag_id=$1`, [tag_id]);
    const found = med.rows.length > 0;
    const block = await addBlock({ type: 'VERIFY', tag_id, found });

    res.json({ found, medicine: found ? med.rows[0] : null, block });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
