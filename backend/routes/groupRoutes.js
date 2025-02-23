// backend/routes/groupRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../models");
const { verifyToken } = require("../middlewares/auth");

// Aplica el middleware de verificación de token a todas las rutas de este router
router.use(verifyToken);

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

// Obtener detalles de un grupo por ID
router.get("/:id", async (req, res) => {
  try {
    const group = await db.Group.findByPk(req.params.id, {
      include: [{ model: db.Student, as: "students" }],
    });
    if (!group) return res.status(404).json({ error: "Grupo no encontrado" });
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar grupo
router.put("/:id", async (req, res) => {
  try {
    const { name, criteria, studentIds } = req.body;
    const group = await db.Group.findByPk(req.params.id);
    if (!group) return res.status(404).json({ error: "Grupo no encontrado" });

    // Actualizar campos
    group.name = name || group.name;
    group.criteria = criteria || group.criteria;
    await group.save();

    // Actualizar estudiantes asociados, si se proporcionan
    if (studentIds && studentIds.length > 0) {
      const students = await db.Student.findAll({ where: { id: studentIds } });
      await group.setStudents(students);
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar grupo
router.delete("/:id", async (req, res) => {
  try {
    const group = await db.Group.findByPk(req.params.id);
    if (!group) return res.status(404).json({ error: "Grupo no encontrado" });
    await group.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
