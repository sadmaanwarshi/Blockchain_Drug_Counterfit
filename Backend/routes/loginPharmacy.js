const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const pool = require("../db");
require("dotenv").config(); // To load JWT_SECRET from .env

const router = express.Router();

router.post("/login/pharmacy", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM pharmacy_owners WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: "pharmacy_owner" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: "pharmacy_owner" });
  } catch (err) {
    console.error("Pharmacy login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
