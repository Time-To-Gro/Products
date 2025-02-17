const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const OWNER_EMAIL = process.env.OWNER_EMAIL;

// Signup (Owner Only)
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (email !== OWNER_EMAIL) return res.status(403).json({ message: "Access Denied" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });

  await user.save();
  res.json({ message: "Signup Successful" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email !== OWNER_EMAIL) return res.status(403).json({ message: "Access Denied" });

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
