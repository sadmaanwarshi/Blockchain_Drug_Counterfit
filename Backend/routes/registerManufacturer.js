const bcrypt = require("bcryptjs");
const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/register/manufacturer", async (req, res) => {
  const { name, license_no, email, password_hash } = req.body;

  if (!name || !license_no || !email || !password_hash) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email is already in use
    const existing = await pool.query(
      "SELECT id FROM manufacturers WHERE email = $1",
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password_hash, 10);

    // Insert into DB
    await pool.query(
      "INSERT INTO manufacturers (name, license_no, email, password_hash) VALUES ($1, $2, $3, $4)",
      [name, license_no, email, hashedPassword]
    );

    res.json({ message: "Manufacturer registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
