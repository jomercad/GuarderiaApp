// backend/routes/groupRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../models");

// Crear un grupo y asignar estudiantes
router.post("/", async (req, res) => {
  try {
    const { name, criteria, studentIds } = req.body;
    const group = await db.Group.create({ name, criteria });
    if (studentIds && studentIds.length > 0) {
      const students = await db.Student.findAll({ where: { id: studentIds } });
      await group.setStudents(students);
    }
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos los grupos con sus estudiantes asignados
router.get("/", async (req, res) => {
  try {
    // Si tienes relaciones, asegúrate de incluirlas correctamente
    const groups = await db.Group.findAll({
      include: [{ model: db.Student, as: "students" }],
    });
    res.json(groups);
  } catch (error) {
    console.error("Error en GET /api/groups:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al obtener grupos" });
  }
});

module.exports = router;
