const express = require('express');
const pool = require('../db');
const { addBlock } = require('../blockchain');
const crypto = require('crypto');
const { authenticateJWT, authorizeRole } = require('../middleware/auth'); // ✅ Import middleware

const router = express.Router();

function generateTagId() {
  return crypto.randomBytes(16).toString('hex');
}

router.post(
  '/register',
  authenticateJWT,          // ✅ Must be logged in
  authorizeRole("manufacturer"), // ✅ Must be manufacturer
  async (req, res) => {
    const { name, batch, expiry, manufacturer } = req.body;
    const tag_id = generateTagId();

    try {
      await pool.query(
        `INSERT INTO medicines (tag_id, name, batch, expiry, manufacturer) VALUES ($1,$2,$3,$4,$5)`,
        [tag_id, name, batch, expiry, manufacturer]
      );

      const block = await addBlock({ type: 'REGISTER', tag_id, name, batch, expiry, manufacturer });
      res.json({ ok: true, tag_id, block });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
