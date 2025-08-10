const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const pool = require("../db");
require("dotenv").config();

const router = express.Router();

router.post("/login/manufacturer", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM manufacturers WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: "manufacturer" },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    res.json({ token, role: "manufacturer" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
