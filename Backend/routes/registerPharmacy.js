const bcrypt = require("bcryptjs");
const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/register/pharmacy", async (req, res) => {
  const { name, license_no, email, password } = req.body;

  if (!name || !license_no || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email exists + ..... 
    const existing = await pool.query(
      "SELECT id FROM pharmacy_owners WHERE email = $1",
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    await pool.query(
      "INSERT INTO pharmacy_owners (name, license_no, email, password) VALUES ($1, $2, $3, $4)",
      [name, license_no, email, hashedPassword]
    );

    res.json({ message: "Pharmacy owner registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
