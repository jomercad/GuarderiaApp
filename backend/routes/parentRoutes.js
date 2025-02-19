// backend/routes/parentRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../models");

// Crear un padre
router.post("/", async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const parent = await db.Parent.create({ name, phone, email });
    res.status(201).json(parent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
