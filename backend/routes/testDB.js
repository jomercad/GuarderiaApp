// backend/routes/testDb.js
const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  try {
    // Verifica la conexión
    await db.sequelize.authenticate();

    // Realiza una consulta simple, por ejemplo, obtener los primeros 5 estudiantes
    const students = await db.Student.findAll({ limit: 5 });

    res.json({
      message: "Conexión exitosa a la base de datos.",
      data: students,
    });
  } catch (error) {
    console.error("Error en GET /api/test-db:", error);
    res.status(500).json({
      error: "Error en la conexión a la base de datos",
      details: error.message,
    });
  }
});

module.exports = router;
