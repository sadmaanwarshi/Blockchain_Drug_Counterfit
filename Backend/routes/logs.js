const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get blockchain logs for a specific medicine by tag_id
router.get("/blockchain/logs/:tag_id", async (req, res) => {
  const { tag_id } = req.params;

  try {
    const logs = await pool.query(
      "SELECT * FROM blockchain WHERE tag_id = $1 ORDER BY timestamp DESC",
      [tag_id]
    );

    if (logs.rows.length === 0) {
      return res.status(404).json({ message: "No logs found for this tag ID" });
    }

    res.json({ logs: logs.rows });
  } catch (err) {
    console.error("Error fetching blockchain logs:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
