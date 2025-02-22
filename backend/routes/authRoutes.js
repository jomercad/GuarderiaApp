const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registro (solo admin)
router.post(
  "/register",
  authenticateJWT,
  authorizeRoles(["admin"]),
  async (req, res) => {
    try {
      const { email, password, role, parentId } = req.body;
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: "El email ya está registrado" });
      }

      const user = await User.create({ email, password, role, parentId });
      res.status(201).json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
