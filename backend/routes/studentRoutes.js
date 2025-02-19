// backend/routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../models");

// Crear un estudiante y sus padres
router.post("/", async (req, res) => {
  try {
    const { name, dateOfBirth, gender, allergies, parents } = req.body;

    // Validar datos básicos del estudiante
    if (!name || !dateOfBirth) {
      return res
        .status(400)
        .json({ error: "Nombre y fecha de nacimiento son requeridos" });
    }

    // Crear estudiante
    const student = await db.Student.create({
      name,
      dateOfBirth: new Date(dateOfBirth).toISOString().split("T")[0], // Asegurar formato DATEONLY
      gender,
      allergies,
    });

    // Validar y procesar padres
    if (parents && parents.length > 0) {
      const parentRecords = await Promise.all(
        parents
          .filter((p) => p.name && p.email) // Solo padres válidos
          .map(async (parent) => {
            const [record] = await db.Parent.findOrCreate({
              where: { email: parent.email }, // Buscar por email
              defaults: {
                name: parent.name,
                phone: parent.phone || null,
                email: parent.email,
              },
            });
            return record;
          })
      );

      // Asociar padres al estudiante
      if (parentRecords.length > 0) {
        await student.setParents(parentRecords);
      }
    }

    // Obtener el estudiante con sus relaciones
    const studentWithRelations = await db.Student.findByPk(student.id, {
      include: [
        { model: db.Parent, as: "parents" }, // Incluir padres
        { model: db.Group, as: "group" },
        { model: db.Attendance, as: "attendances" },
      ],
    });

    res.status(201).json(studentWithRelations);
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({
      error: "Error en el servidor",
      details: error.message,
    });
  }
});

// Listar todos los estudiantes
router.get("/", async (req, res) => {
  try {
    const students = await db.Student.findAll({
      include: [{ model: db.Parent, as: "parents" }], // Incluir padres
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener detalle de un estudiante
router.get("/:id", async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id, {
      include: [
        { model: db.Parent, as: "parents" },
        { model: db.Group, as: "groups" },
        { model: db.Attendance, as: "attendances" },
      ],
    });
    if (!student) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Editar un estudiante
router.put("/:id", async (req, res) => {
  try {
    const { name, dateOfBirth, gender, allergies, parents } = req.body;
    const student = await db.Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    // Actualizar datos del estudiante
    student.name = name;
    student.dateOfBirth = dateOfBirth;
    student.gender = gender;
    student.allergies = allergies;
    await student.save();

    // Actualizar padres (si se proporcionan)
    if (parents && parents.length > 0) {
      const parentRecords = await Promise.all(
        parents
          .filter((p) => p.name && p.email) // Solo padres válidos
          .map(async (parent) => {
            const [record] = await db.Parent.findOrCreate({
              where: { email: parent.email },
              defaults: {
                name: parent.name,
                phone: parent.phone || null,
                email: parent.email,
              },
            });
            return record;
          })
      );

      // Asociar nuevos padres al estudiante
      await student.setParents(parentRecords);
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un estudiante
router.delete("/:id", async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    await student.destroy();
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
